import cors from "cors";
import type { RequestHandler } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { env, isProduction } from "../env.ts";

export function securityHeaders(): RequestHandler {
  return helmet({
    contentSecurityPolicy: isProduction
      ? {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://*.clerk.accounts.dev", "https://*.clerk.com"],
            connectSrc: [
              "'self'",
              "https://*.ingest.us.sentry.io",
              "https://*.clerk.accounts.dev",
              "https://*.clerk.com",
            ],
            imgSrc: ["'self'", "data:", "https:"],
            frameSrc: ["https://*.clerk.accounts.dev", "https://*.clerk.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
          },
        }
      : false,
    crossOriginEmbedderPolicy: false,
  });
}

export function corsGuard() {
  const origins = env.CORS_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean);
  return cors({
    origin(origin, callback) {
      if (!origin || origins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Request-Id"],
    maxAge: 600,
  });
}

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skip: (req) => req.path === "/api/health",
});

export const enquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 12,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

export const webhookLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
