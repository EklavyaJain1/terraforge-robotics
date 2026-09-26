import type { NextFunction, Request, Response } from "express";
import { getAuth } from "@clerk/express";

/**
 * Route guard for API endpoints. clerkMiddleware() must run before this.
 * Returns 401 JSON (API clients, not browser redirects).
 *
 * If Clerk is not configured (no CLERK_SECRET_KEY) the request never reached
 * clerkMiddleware, so getAuth() would throw — fail closed with 503 instead.
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!process.env.CLERK_SECRET_KEY) {
    return res.status(503).json({ error: "Authentication is not configured (CLERK_SECRET_KEY missing)" });
  }
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: "Sign in required" });
  }
  next();
}
