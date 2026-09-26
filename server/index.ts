/**
 * FarmBro Robotics — Express API.
 *
 * Security model:
 *  - Sentry instruments everything (imported FIRST, before other modules)
 *  - helmet security headers on every response
 *  - rate limiting: strict on webhooks/writes, general on everything else
 *  - Clerk authentication: public routes stay public (marketing site),
 *    order submission requires a signed-in user via getAuth()
 *  - Clerk webhooks verified against the svix signature (CLERK_WEBHOOK_SECRET)
 *  - all request bodies validated with shared zod schemas (shared/api.ts)
 */
import "./instrument";
import express, { type ErrorRequestHandler, type NextFunction, type Request, type Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { config as loadEnv } from "dotenv";
import { clerkMiddleware, getAuth, clerkClient } from "@clerk/express";
import { Webhook } from "svix";
import { readFile, appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { strictLimiter, generalLimiter } from "./middleware/rateLimit";
import { requireAuth } from "./middleware/auth";
import { orderRequestSchema, contactRequestSchema, type OrderRequest, type ContactRequest } from "../shared/api";
import { Sentry } from "./instrument";

loadEnv();

const app = express();
const isProd = process.env.NODE_ENV === "production";
const dataDir = process.env.DATA_DIR ?? path.resolve(import.meta.dirname, "data");

/* ── Trust proxy: required behind a reverse proxy so express-rate-limit sees
      the real client IP. ───────────────────────────────────────────────────── */
app.set("trust proxy", 1);

/* ── CORS: browser clients from other origins only call the API cross-origin in
      dev. Same-origin static serving needs no CORS. ────────────────────────── */
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN?.split(",").filter(Boolean) ?? false,
    methods: ["GET", "POST"],
    credentials: false,
  }),
);

/* ── Clerk webhooks need the RAW body for svix signature verification, so this
      router mounts before express.json(). Rate limited on the strict tier. ─── */
app.use(
  "/api/webhooks",
  strictLimiter,
  express.raw({ type: "application/json", limit: "64kb" }),
  (req: Request, res: Response) => {
    const secret = process.env.CLERK_WEBHOOK_SECRET;
    if (!secret) {
      return res.status(503).json({ error: "Webhook not configured" });
    }

    const svixHeaders = {
      "svix-id": req.headers["svix-id"] as string | undefined,
      "svix-timestamp": req.headers["svix-timestamp"] as string | undefined,
      "svix-signature": req.headers["svix-signature"] as string | undefined,
    };
    if (!svixHeaders["svix-id"] || !svixHeaders["svix-timestamp"] || !svixHeaders["svix-signature"]) {
      return res.status(400).json({ error: "Missing svix headers" });
    }

    let event: { type: string; data: { id?: string } };
    try {
      event = new Webhook(secret).verify(JSON.stringify(req.body), svixHeaders as Record<string, string>) as unknown as typeof event;
    } catch {
      Sentry.captureMessage("Clerk webhook signature verification failed", "warning");
      return res.status(400).json({ error: "Invalid webhook signature" });
    }

    // Audit-log user lifecycle events; extend here when user sync is needed.
    if (event.type === "user.created" || event.type === "user.deleted") {
      void appendFile(
        path.join(dataDir, "users-audit.jsonl"),
        JSON.stringify({ type: event.type, userId: event.data.id, at: new Date().toISOString() }) + "\n",
        "utf8",
      ).catch(() => undefined);
    }
    res.json({ received: true });
  },
);

app.use(express.json({ limit: "16kb" }));
app.use(helmet());
app.use(generalLimiter);

/* ── Clerk: mount its middleware only when a secret key is configured. Without
      keys it throws on every request (500 on even /api/health). Auth-gated
      routes fail closed with 503 via requireAuth in that case. ─────────────── */
if (process.env.CLERK_SECRET_KEY) {
  app.use(clerkMiddleware());
}

/* ── Storage: JSON-lines files until a real database is wired. Single-process
      only — move to a database before scaling horizontally. ────────────────── */
interface StoredOrder extends OrderRequest {
  userId: string | null;
  receivedAt: string;
}
interface StoredContact extends ContactRequest {
  receivedAt: string;
}

async function appendJsonl(file: string, record: unknown) {
  await mkdir(dataDir, { recursive: true });
  await appendFile(path.join(dataDir, file), JSON.stringify(record) + "\n", "utf8");
}

async function readJsonl<T>(file: string): Promise<T[]> {
  try {
    const raw = await readFile(path.join(dataDir, file), "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as T);
  } catch {
    return [];
  }
}

/* ── Routes ────────────────────────────────────────────────────────────────── */

// Liveness probe — no auth, no side effects.
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ ok: true, service: "farmbro-api", time: new Date().toISOString() });
});

// Session check used by the client.
app.get("/api/me", (req: Request, res: Response) => {
  // Without Clerk configured there are no sessions — report signed-out.
  const { userId } = process.env.CLERK_SECRET_KEY ? getAuth(req) : { userId: null };
  res.json({ userId: userId ?? null });
});

// Profile for signed-in users (Clerk → our API).
app.get("/api/me/profile", requireAuth, async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  const user = await clerkClient.users.getUser(userId as string);
  res.json({
    id: user.id,
    name: [user.firstName, user.lastName].filter(Boolean).join(" ") || null,
    email: user.primaryEmailAddress?.emailAddress ?? null,
  });
});

// Order enquiry — requires a signed-in user (Clerk session).
app.post("/api/orders", strictLimiter, requireAuth, async (req: Request, res: Response) => {
  const parsed = orderRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid order request", details: parsed.error.flatten().fieldErrors });
  }

  const { userId } = getAuth(req);
  const order: StoredOrder = { ...parsed.data, userId: userId ?? null, receivedAt: new Date().toISOString() };
  await appendJsonl("orders.jsonl", order);
  res.status(201).json({ ok: true, id: order.receivedAt });
});

// Contact enquiry — public: the marketing site's main lead form.
app.post("/api/contact", strictLimiter, async (req: Request, res: Response) => {
  const parsed = contactRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid contact request", details: parsed.error.flatten().fieldErrors });
  }

  const lead: StoredContact = { ...parsed.data, receivedAt: new Date().toISOString() };
  await appendJsonl("contacts.jsonl", lead);
  res.status(201).json({ ok: true, id: lead.receivedAt });
});

// Admin: list stored enquiries. Requires the Clerk `admin` role on the session.
app.get("/api/admin/enquiries", requireAuth, async (req: Request, res: Response) => {
  const { has, userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Sign in required" });
  if (!(await has({ role: "admin" }))) return res.status(403).json({ error: "Admin role required" });

  const [orders, contacts] = await Promise.all([
    readJsonl<StoredOrder>("orders.jsonl"),
    readJsonl<StoredContact>("contacts.jsonl"),
  ]);
  res.json({ orders, contacts });
});

/* ── Static client in production ───────────────────────────────────────────── */
if (isProd) {
  const clientDir = path.resolve(import.meta.dirname, "../dist/public");
  app.use(express.static(clientDir));
  app.get("*", (_req, res) => res.sendFile(path.join(clientDir, "index.html")));
}

/* ── Error handling: Sentry first (reports), then a JSON responder that keeps
      stack traces out of API responses. ────────────────────────────────────── */
Sentry.setupExpressErrorHandler(app);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  Sentry.captureException(err);
  const status = typeof (err as { status?: number })?.status === "number" ? (err as { status: number }).status : 500;
  res.status(status).json({ error: status === 500 ? "Internal server error" : (err as Error).message });
};
app.use(errorHandler);

// Default 3005 keeps local dev clear of the Vite dev server on 3000
// (vite.config.ts proxies /api here — keep the two in sync).
const port = Number(process.env.PORT) || 3005;
app.listen(port, () => {
  console.log(`FarmBro API listening on :${port} (${isProd ? "production" : "development"})`);
});
