import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  contact: z.string().trim().min(5).max(160),
  topic: z.string().trim().min(1).max(80),
  message: z.string().trim().min(1).max(2000),
  /** Honeypot — must stay empty. */
  companyWebsite: z.string().optional().default(""),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
