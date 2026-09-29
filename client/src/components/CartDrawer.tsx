import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth, useClerk } from "@clerk/react";
import { Check, Minus, MoveUpRight, Plus, Trash2, X } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { catalogItem, formatINR, robots, type Robot } from "@/data/catalog";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart, type CartLine } from "@/contexts/CartContext";
import { createDemoPayment, verifyDemoPayment } from "@/lib/api";
import { ADDED_FLASH_MS } from "@/contexts/CartContext";

/* ── Cart line row: thumbnail, name, price, qty stepper, remove ─────────────── */

function LineRow({ line }: { line: CartLine }) {
  const { t } = useLanguage();
  const { removeLine, setQty, lastAdded } = useCart();
  const item = catalogItem(line.kind, line.id);
  const machine = line.kind === "robot" ? t.machines[line.id as keyof typeof t.machines] : undefined;
  const attachmentStrings = line.kind === "attachment" ? t.attachments[line.id as keyof typeof t.attachments] : undefined;
  const name = machine?.name ?? attachmentStrings?.name ?? item?.name ?? line.id;
  const isHot = !!lastAdded && lastAdded.kind === line.kind && lastAdded.id === line.id;

  return (
    <li className="relative overflow-hidden border-b border-white/10 last:border-b-0">
      {/* The 2s reveal: a mint flash sweeping across the row when the item is added */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[#B9F4D4]"
        initial={false}
        animate={isHot ? { opacity: [0.9, 0.25] } : { opacity: 0 }}
        transition={{ duration: ADDED_FLASH_MS / 1000, ease: "easeOut" }}
      />
      <div className="relative z-10 flex items-center gap-4 py-4">
        {item && (line.kind === "robot" ? (
          <img src={item.image} alt="" className="size-16 shrink-0 rounded-lg border border-white/10 object-cover" loading="lazy" decoding="async" />
        ) : (
          <span aria-hidden="true" className="flex size-16 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#17201B] text-2xl text-[#B9F4D4]">{item.image}</span>
        ))}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">{name}</p>
          {machine && <p className="tf-mono mt-0.5 text-[10px] text-white/45">{machine.configuration}</p>}
          <p className="mt-1 text-sm font-semibold text-[#B9F4D4] tabular-nums">{item ? formatINR(item.price * 100) : "—"}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full border border-white/15">
            <button type="button" onClick={() => setQty(line.kind, line.id, line.qty - 1)} aria-label={t.cartQtyDecAria} className="tf-focus flex size-7 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white">
              <Minus size={13} />
            </button>
            <span className="w-6 text-center text-xs font-semibold text-white tabular-nums">{line.qty}</span>
            <button type="button" onClick={() => setQty(line.kind, line.id, line.qty + 1)} aria-label={t.cartQtyIncAria} className="tf-focus flex size-7 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white">
              <Plus size={13} />
            </button>
          </div>
          <button type="button" onClick={() => removeLine(line.kind, line.id)} aria-label={t.cartRemoveAria.replace("{name}", name)} className="tf-focus flex size-8 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-red-500/15 hover:text-red-400">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </li>
  );
}

/* ── Catalogue carousel: other robots, add-to-cart inline ──────────────────── */

function CatalogueCarousel({ excludeId }: { excludeId?: string }) {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const others = robots.filter((r) => r.id !== excludeId);
  if (others.length === 0) return null;

  return (
    <div className="border-t border-white/10 px-6 py-5">
      <p className="tf-mono text-[10px] uppercase text-white/40">{t.checkoutCatalogueKicker}</p>
      <h3 className="mt-1 text-lg font-medium text-white">{t.checkoutCatalogueHeading}</h3>
      <div className="mt-4 flex snap-x gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {others.map((robot: Robot) => {
          const m = t.machines[robot.id];
          return (
            <div key={robot.id} className="w-[200px] shrink-0 snap-start rounded-xl border border-white/10 bg-[#17201B] p-3">
              <img src={robot.image} alt="" className="h-20 w-full rounded-lg object-cover" loading="lazy" decoding="async" />
              <p className="mt-2 truncate text-xs font-medium text-white">{m.name}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#B9F4D4] tabular-nums">{formatINR(robot.price * 100)}</span>
                <button
                  type="button"
                  onClick={() => addItem("robot", robot.id)}
                  className="tf-focus rounded-full bg-[#1B8F6A] px-3 py-1 text-[11px] font-semibold text-white transition-colors hover:bg-[#0F6F51]"
                >
                  {t.checkoutCatalogueAdd}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Checkout: Clerk-gated details + demo Razorpay payment ─────────────────── */

type CheckoutStage = "details" | "success";

function CheckoutPanel({ onBack }: { onBack: () => void }) {
  const { t } = useLanguage();
  const { isSignedIn, isLoaded } = useAuth();
  const clerk = useClerk();
  const { lines, subtotal, clear } = useCart();
  const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined;

  const [stage, setStage] = useState<CheckoutStage>("details");
  const [paying, setPaying] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setStage("details");
    setOrderId(null);
  }, []);

  async function handlePay(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPaying(true);
    try {
      const amount = subtotal;
      // Demo gateway by default; if the server has real Razorpay keys this
      // returns a real test-mode order and the official checkout script loads.
      const order = await createDemoPayment({ amount, notes: `FarmBro cart — ${lines.length} line(s)` });
      const paid = order.demo ? await order.demo.complete() : false;
      if (!paid) throw new Error("cancelled");

      const check = await verifyDemoPayment({ orderId: order.orderId });
      if (!check.verified) throw new Error("unverified");

      setOrderId(order.orderId);
      setStage("success");
      clear();
    } catch {
      toast.error(t.checkoutError);
    } finally {
      setPaying(false);
    }
  }

  if (!isLoaded) {
    return <div className="flex min-h-[300px] items-center justify-center px-6"><span className="tf-mono text-[10px] text-white/40">…</span></div>;
  }

  if (!isSignedIn || !clerkKey) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-5 px-6 text-center">
        <p className="max-w-[260px] text-sm leading-6 text-white/60">{t.checkoutLoginPrompt}</p>
        <button type="button" onClick={() => clerk.openSignIn()} className="tf-btn tf-btn-primary w-full">
          {t.checkoutLoginBtn} <MoveUpRight size={14} />
        </button>
        <button type="button" onClick={onBack} className="tf-focus text-xs text-white/45 underline-offset-4 hover:underline">
          {t.cartTitle}
        </button>
      </div>
    );
  }

  if (stage === "success") {
    return (
      <div className="flex min-h-[380px] flex-col items-center justify-center px-6 text-center">
        <div className="flex size-12 items-center justify-center rounded-md bg-[#1B8F6A] text-white">
          <Check size={22} />
        </div>
        <h3 className="mt-5 text-2xl font-medium tracking-tight text-white">{t.checkoutSuccessTitle}</h3>
        <p className="mt-3 max-w-[300px] text-sm leading-6 text-white/60">{t.checkoutSuccessBody}</p>
        {orderId && <p className="tf-mono mt-4 text-[10px] text-white/35">{t.checkoutOrdersLine.replace("{id}", orderId)}</p>}
        <CatalogueCarousel />
        <button type="button" onClick={onBack} className="tf-focus mt-5 text-xs text-white/45 underline-offset-4 hover:underline">
          {t.cartTitle}
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handlePay} className="flex min-h-[380px] flex-col">
      <div className="flex-1 space-y-4 px-6 py-5">
        <p className="tf-mono text-[10px] uppercase text-white/40">
          {t.checkoutSignedInAs} · clerk
        </p>
        <label className="block">
          <span className="tf-mono text-[9px] text-[#1B8F6A]/80">{t.checkoutPhoneLabel}</span>
          <input
            required
            type="tel"
            inputMode="numeric"
            pattern="[0-9+ -]{8,15}"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t.checkoutPhonePlaceholder}
            className="order-input mt-2 h-[36px] w-full rounded-[5px] border border-[#1B8F6A]/40 bg-[#1a211d] px-3 text-[13px] font-semibold text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-transparent focus:bg-[#242e28] focus:shadow-[0_0_0_2px_rgba(27,143,106,0.4)]"
          />
        </label>
        <label className="block">
          <span className="tf-mono text-[9px] text-[#1B8F6A]/80">{t.checkoutDeliveryLabel}</span>
          <textarea
            required
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={t.checkoutDeliveryPlaceholder}
            className="order-input mt-2 w-full resize-none rounded-[5px] border border-[#1B8F6A]/40 bg-[#1a211d] px-3 py-2.5 text-[13px] font-semibold text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-transparent focus:bg-[#242e28] focus:shadow-[0_0_0_2px_rgba(27,143,106,0.4)]"
          />
        </label>
        <div className="grid gap-1.5 border-t border-white/10 pt-4 text-sm">
          <div className="flex justify-between text-white/60">
            <span>{t.cartSubtotal}</span>
            <span className="tabular-nums">{formatINR(subtotal)}</span>
          </div>
          <div className="flex justify-between text-white/60">
            <span>{t.cartShipping}</span>
            <span className="text-xs">{t.cartShippingNote}</span>
          </div>
          <div className="mt-1 flex justify-between border-t border-white/10 pt-2 text-base font-semibold text-white">
            <span>{t.checkoutPay.replace("{amount}", "")}</span>
            <span className="tabular-nums">{formatINR(subtotal)}</span>
          </div>
        </div>
        <p className="tf-mono text-[9px] text-white/30">{t.checkoutDemoNote}</p>
      </div>
      <div className="px-6 pb-6">
        <button type="submit" disabled={paying || lines.length === 0} className="tf-btn tf-btn-primary w-full disabled:opacity-60">
          {paying ? t.checkoutPaying : t.checkoutPay.replace("{amount}", formatINR(subtotal))}
        </button>
      </div>
    </form>
  );
}

/* ── Drawer shell: right slide-in, cart list ↔ checkout stages ─────────────── */

export default function CartDrawer() {
  const { t } = useLanguage();
  const { isOpen, closeCart, lines, subtotal, count } = useCart();
  const [mode, setMode] = useState<"cart" | "checkout">("cart");

  useEffect(() => {
    if (isOpen) setMode("cart");
  }, [isOpen]);

  const itemsLabel = count === 1 ? t.cartItemsOne : t.cartItemsMany.replace("{n}", String(count));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[60] bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={closeCart}
          />
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label={mode === "cart" ? t.cartTitle : t.checkoutTitle}
            className="fixed inset-y-0 right-0 z-[60] flex h-dvh w-full max-w-[420px] flex-col border-l border-white/10 bg-[#0B0F0D] text-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
          >
            <div className="flex h-[56px] shrink-0 items-center justify-between border-b border-white/10 px-5">
              <h2 className="text-sm font-bold uppercase tracking-[.1em]">
                {mode === "cart" ? t.cartTitle : t.checkoutTitle}
              </h2>
              <button type="button" onClick={closeCart} aria-label="Close" className="tf-focus flex size-8 items-center justify-center rounded-full text-white/60 transition-colors hover:text-white">
                <X size={16} />
              </button>
            </div>

            {mode === "cart" ? (
              <>
                {lines.length === 0 ? (
                  <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                    <p className="text-sm text-white/60">{t.cartEmpty}</p>
                    <p className="max-w-[240px] text-xs leading-5 text-white/40">{t.cartEmptySub}</p>
                    <Link href="/farmbro" onClick={closeCart} className="tf-btn tf-btn-outline mt-2">
                      {t.cartBrowse}
                    </Link>
                  </div>
                ) : (
                  <>
                    <ul className="flex-1 overflow-y-auto px-5">
                      {lines.map((line) => (
                        <LineRow key={`${line.kind}-${line.id}`} line={line} />
                      ))}
                    </ul>
                    <div className="shrink-0 border-t border-white/10 px-5 py-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">{t.cartSubtotal}</span>
                        <span className="font-semibold tabular-nums">{formatINR(subtotal)}</span>
                      </div>
                      <div className="mt-1 flex items-center justify-between text-xs text-white/45">
                        <span>{t.cartShipping}</span>
                        <span>{t.cartShippingNote}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setMode("checkout")}
                        className="tf-btn tf-btn-primary mt-4 w-full"
                      >
                        {t.cartProceed} <MoveUpRight size={14} />
                      </button>
                      <p className="tf-mono mt-2 text-center text-[9px] text-white/30">{itemsLabel}</p>
                    </div>
                  </>
                )}
              </>
            ) : (
              <CheckoutPanel onBack={() => setMode("cart")} />
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
