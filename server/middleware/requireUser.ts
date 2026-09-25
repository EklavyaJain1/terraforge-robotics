import { getAuth } from "@clerk/express";
import type { RequestHandler } from "express";
import { clerkConfigured } from "../env.ts";

export const requireUser: RequestHandler = (req, res, next) => {
  if (!clerkConfigured) {
    res.status(503).json({ error: "Authentication is not configured." });
    return;
  }
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
};
