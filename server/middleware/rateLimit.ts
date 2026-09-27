import rateLimit from "express-rate-limit";

const json = (message: string) => ({ error: message });

/** Strict tier: order/contact submissions and webhooks. */
export const strictLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: json("Too many requests — please try again later."),
});

/** General tier: every other API route. */
export const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 120,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: json("Too many requests — please slow down."),
});
