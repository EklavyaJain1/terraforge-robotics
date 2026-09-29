/**
 * Contract shared between the React client and the Express API.
 * Both sides import the same zod schemas, so validation can never drift.
 */
import { z } from "zod";

/** Machine ids mirror client/src/data/catalog.ts machineChoiceIds. */
export const orderMachineIds = [
  "m1",
  "m2",
  "m3",
  "m4",
  "fleet",
  "gov-civil",
  "gov-defence",
  "attachment-only",
  "undecided",
] as const;

export const orderRequestSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  // Order form packs phone+email+address into one string — allow a full address.
  contact: z.string().trim().min(5, "Add a phone number or email").max(400),
  machine: z.enum(orderMachineIds),
  quantity: z.coerce.number().int().min(1).max(99),
  notes: z.string().trim().max(1000).optional(),
});
export type OrderRequest = z.infer<typeof orderRequestSchema>;

/** Demo checkout payload — create a payment order for the cart total. */
export const paymentRequestSchema = z.object({
  /** Amount in paise (₹1 = 100). Server clamps to the demo catalog range. */
  amount: z.coerce.number().int().min(100).max(50000000),
  notes: z.string().trim().max(300).optional(),
});
export type PaymentRequest = z.infer<typeof paymentRequestSchema>;

/** Server response: either a demo checkout handle or a real Razorpay order id. */
export interface PaymentOrderResponse {
  orderId: string;
  demo?: {
    complete: () => Promise<boolean>;
  };
}

export const paymentVerifySchema = z.object({
  orderId: z.string().trim().min(4).max(80),
});
export type PaymentVerify = z.infer<typeof paymentVerifySchema>;

export const contactRequestSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  contact: z.string().trim().min(5, "Add a phone number or email").max(120),
  topic: z.string().trim().min(2).max(120),
  message: z.string().trim().max(2000),
});
export type ContactRequest = z.infer<typeof contactRequestSchema>;

export interface ApiError {
  error: string;
  details?: Record<string, string[]>;
}
