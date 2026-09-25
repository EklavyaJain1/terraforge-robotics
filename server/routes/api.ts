import { clerkClient, getAuth } from "@clerk/express";
import { verifyWebhook } from "@clerk/express/webhooks";
import { randomUUID } from "node:crypto";
import { Router } from "express";
import { clerkConfigured, env } from "../env.ts";
import { enquiryLimiter, webhookLimiter } from "../middleware/security.ts";
import { requireUser } from "../middleware/requireUser.ts";
import { addEnquiry, listEnquiriesForUser } from "../store/enquiries.ts";
import { enquirySchema } from "../../shared/enquiry.ts";

export const api = Router();

api.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "farmbro-api",
    auth: clerkConfigured,
    sentry: Boolean(env.SENTRY_DSN),
  });
});

api.get("/me", requireUser, async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const user = await clerkClient.users.getUser(userId);
    const email = user.emailAddresses.find((item) => item.id === user.primaryEmailAddressId)?.emailAddress ?? null;
    res.json({
      id: user.id,
      email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      enquiries: listEnquiriesForUser(user.id).map((item) => ({
        id: item.id,
        topic: item.topic,
        createdAt: item.createdAt,
      })),
    });
  } catch (error) {
    next(error);
  }
});

api.post("/enquiries", enquiryLimiter, (req, res) => {
  const parsed = enquirySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid enquiry", issues: parsed.error.flatten().fieldErrors });
    return;
  }
  if (parsed.data.companyWebsite) {
    res.status(204).end();
    return;
  }
  const { userId } = clerkConfigured ? getAuth(req) : { userId: null };
  const saved = addEnquiry({
    id: randomUUID(),
    userId: userId ?? null,
    name: parsed.data.name,
    contact: parsed.data.contact,
    topic: parsed.data.topic,
    message: parsed.data.message,
    createdAt: new Date().toISOString(),
  });
  res.status(201).json({ id: saved.id, createdAt: saved.createdAt });
});

api.post("/webhooks/clerk", webhookLimiter, async (req, res) => {
  if (!env.CLERK_WEBHOOK_SIGNING_SECRET) {
    res.status(503).json({ error: "Webhook signing secret is not configured." });
    return;
  }
  try {
    const event = await verifyWebhook(req, { signingSecret: env.CLERK_WEBHOOK_SIGNING_SECRET });
    res.json({ received: true, type: event.type });
  } catch {
    res.status(400).json({ error: "Webhook verification failed" });
  }
});

api.get("/debug/sentry", (_req, res, next) => {
  if (env.ENABLE_SENTRY_TEST !== "1") {
    res.status(404).json({ error: "Not found" });
    return;
  }
  next(new Error(`Sentry test error ${new Date().toISOString()}`));
});
