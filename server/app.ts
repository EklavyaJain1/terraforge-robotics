import { clerkMiddleware } from "@clerk/express";
import * as Sentry from "@sentry/node";
import express from "express";
import { nanoid } from "nanoid";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { clerkConfigured, env, isProduction } from "./env.ts";
import { errorHandler, notFoundApi } from "./middleware/errors.ts";
import { corsGuard, globalLimiter, securityHeaders } from "./middleware/security.ts";
import { api } from "./routes/api.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp() {
  const app = express();
  app.disable("x-powered-by");
  app.set("trust proxy", 1);

  app.use(securityHeaders());
  app.use(corsGuard());
  app.use((req, res, next) => {
    const id = typeof req.headers["x-request-id"] === "string" ? req.headers["x-request-id"] : nanoid();
    req.headers["x-request-id"] = id;
    res.setHeader("X-Request-Id", id);
    next();
  });

  app.use("/api/webhooks/clerk", express.raw({ type: "application/json", limit: "64kb" }));
  app.use((req, res, next) => {
    if (req.path === "/api/webhooks/clerk") {
      next();
      return;
    }
    express.json({ limit: "32kb" })(req, res, next);
  });
  app.use((req, res, next) => {
    if (req.path === "/api/webhooks/clerk") {
      next();
      return;
    }
    express.urlencoded({ extended: false, limit: "32kb" })(req, res, next);
  });
  app.use(globalLimiter);

  if (clerkConfigured) {
    app.use(clerkMiddleware());
  }

  app.use("/api", api);
  app.use("/api", notFoundApi);

  if (isProduction) {
    const staticPath = path.resolve(__dirname, "public");
    app.use(express.static(staticPath, { maxAge: "1h", index: false }));
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api")) {
        next();
        return;
      }
      res.sendFile(path.join(staticPath, "index.html"));
    });
  }

  Sentry.setupExpressErrorHandler(app);
  app.use(errorHandler);
  return app;
}
