/**
 * Typed browser client for the FarmBro API.
 * Validates payloads with the same zod schemas the server uses (shared/api.ts),
 * so a request that would be rejected locally never leaves the browser.
 * Full-shaped POST helper with typed payloads — payments use narrow wrappers above.
 */
import { orderRequestSchema, contactRequestSchema, paymentRequestSchema, paymentVerifySchema, type OrderRequest, type ContactRequest, type PaymentRequest, type PaymentVerify, type PaymentOrderResponse, type ApiError } from "@shared/api";

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

/** Demo checkout: create a payment order. Real Razorpay keys on the server
    switch this to a genuine test-mode order (demo handle absent). */
export async function createDemoPayment(input: { amount: number; notes?: string }): Promise<PaymentOrderResponse> {
  const parsed = paymentRequestSchema.safeParse(input);
  if (!parsed.success) {
    const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
    throw new Error(first ?? "Invalid payment request");
  }
  const res = await fetch(`${BASE}/payments/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data satisfies PaymentRequest),
  });
  if (!res.ok) throw new Error(`Payment create failed (${res.status})`);
  return (await res.json()) as PaymentOrderResponse;
}

/** Demo checkout: confirm the payment server-side before clearing the cart. */
export async function verifyDemoPayment(input: { orderId: string }): Promise<{ verified: boolean }> {
  const parsed = paymentVerifySchema.safeParse(input);
  if (!parsed.success) return { verified: false };
  const res = await fetch(`${BASE}/payments/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data satisfies PaymentVerify),
  });
  if (!res.ok) return { verified: false };
  return (await res.json()) as { verified: boolean };
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
