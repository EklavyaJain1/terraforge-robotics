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
  contact: z.string().trim().min(5, "Add a phone number or email").max(120),
  machine: z.enum(orderMachineIds),
  quantity: z.coerce.number().int().min(1).max(99),
  notes: z.string().trim().max(1000).optional(),
});
export type OrderRequest = z.infer<typeof orderRequestSchema>;

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
