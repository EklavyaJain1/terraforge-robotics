/**
 * Sentry instrumentation for the FarmBro API.
 * Import this FIRST — before any other module — so the SDK can patch
 * the runtime (module loaders, globals) before Express loads.
 */
import * as Sentry from "@sentry/node";

const dsn = process.env.SENTRY_DSN;

Sentry.init({
  // No DSN configured → SDK no-ops (safe locally; add DSN in .env to enable).
  dsn,
  environment: process.env.NODE_ENV ?? "development",
  // Sample 100% of transactions in dev, 20% in production — tune as traffic grows.
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1.0,
  // (sendDefaultPii stays off by default) — and never leak form values
  // (names, phones, messages) to Sentry via this redaction hook.
  beforeSend(event) {
    if (event.request?.data && typeof event.request.data === "object") {
      const redacted = { ...(event.request.data as Record<string, unknown>) };
      for (const key of Object.keys(redacted)) {
        redacted[key] = "[redacted]";
      }
      event.request.data = redacted;
    }
    return event;
  },
});

export { Sentry };
