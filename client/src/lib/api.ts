/**
 * Typed browser client for the FarmBro API.
 * Validates payloads with the same zod schemas the server uses (shared/api.ts),
 * so a request that would be rejected locally never leaves the browser.
 */
import { orderRequestSchema, contactRequestSchema, type OrderRequest, type ContactRequest, type ApiError } from "@shared/api";

const BASE = "/api";

async function post<TBody>(path: string, body: TBody): Promise<{ ok: true } | { ok: false; error: string; details?: Record<string, string[]> }> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (res.ok) return { ok: true };

  let apiError: ApiError | null = null;
  try {
    apiError = (await res.json()) as ApiError;
  } catch {
    /* non-JSON error body */
  }

  return {
    ok: false,
    error: apiError?.error ?? `Request failed (${res.status})`,
    details: apiError?.details,
  };
}

export interface SubmitOrderInput {
  name: string;
  contact: string;
  machine: string;
  quantity: string | number;
  notes?: string;
}

/** Returns null on success, or a human-readable error message. */
export async function submitOrder(input: SubmitOrderInput): Promise<string | null> {
  const parsed = orderRequestSchema.safeParse(input);
  if (!parsed.success) {
    const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
    return first ?? "Please check the form fields";
  }
  const result = await post<OrderRequest>("/orders", parsed.data);
  return result.ok ? null : (result.details ? `${result.error}: ${Object.values(result.details).flat()[0]}` : result.error);
}

export interface SubmitContactInput {
  name: string;
  contact: string;
  topic: string;
  message: string;
}

/** Returns null on success, or a human-readable error message. */
export async function submitContact(input: SubmitContactInput): Promise<string | null> {
  const parsed = contactRequestSchema.safeParse(input);
  if (!parsed.success) {
    const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
    return first ?? "Please check the form fields";
  }
  const result = await post<ContactRequest>("/contact", parsed.data);
  return result.ok ? null : (result.details ? `${result.error}: ${Object.values(result.details).flat()[0]}` : result.error);
}
