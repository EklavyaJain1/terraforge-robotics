import * as Sentry from "@sentry/node";
import type { ErrorRequestHandler, RequestHandler } from "express";
import { isProduction } from "../env.ts";

export const notFoundApi: RequestHandler = (_req, res) => {
  res.status(404).json({ error: "Not found" });
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }
  Sentry.captureException(err);
  const status = typeof err.status === "number" ? err.status : 500;
  res.status(status).json({
    error: status >= 500 ? "Internal server error" : (err.message ?? "Request failed"),
    ...(isProduction ? {} : { detail: err instanceof Error ? err.message : String(err) }),
  });
};
