/**
 * Sentry browser SDK. Import this FIRST in client/src/main.tsx.
 * No DSN configured → SDK no-ops; set VITE_SENTRY_DSN to enable (farmbro-web project).
 */
import * as Sentry from "@sentry/react";

const dsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;

Sentry.init({
  dsn,
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

export { Sentry };
