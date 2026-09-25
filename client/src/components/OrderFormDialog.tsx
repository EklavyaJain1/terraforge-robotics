import { useEffect, useState } from "react";
import { Check, MoveUpRight } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { machineChoiceIds, type MachineChoiceId } from "@/data/catalog";
import { useLanguage } from "@/contexts/LanguageContext";

/** Callers pass either a machine-choice id ("m1", "fleet", ...) or a robot id
    ("mulcher-hybrid", ...). Robot ids map onto their machine-choice option so
    the controlled select always matches an <option> value. */
const robotToChoice: Record<string, MachineChoiceId> = {
  "mulcher-hybrid": "m1",
  "mulcher-sprayer-cargo": "m2",
  "mini-mulcher-electric": "m3",
  "canopy-scout": "m4",
};

export interface OrderRequest {
  name: string;
  contact: string;
  robot: string;
  quantity: number;
  notes?: string;
}

interface OrderFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultRobot?: string;
}

export default function OrderFormDialog({ open, onOpenChange, defaultRobot }: OrderFormDialogProps) {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", robot: "", quantity: "1", notes: "" });

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      const choice = defaultRobot ? robotToChoice[defaultRobot] ?? (defaultRobot as MachineChoiceId) : undefined;
      setForm((prev) => ({ ...prev, robot: choice ?? (prev.robot || machineChoiceIds[0]) }));
    }
  }, [open, defaultRobot]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    toast.success(t.orderToastTitle, {
      description: t.orderToastDesc,
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-[440px] overflow-y-auto border-0 bg-transparent p-0 shadow-none sm:w-[440px]">
        {submitted ? (
          /* ── Success state ──────────────────────────────────── */
          <div className="rounded-[19px] border border-white/10 bg-[#111311] p-8 shadow-[0px_47px_47px_rgba(0,0,0,0.09),0px_12px_26px_rgba(0,0,0,0.1)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#1B8F6A] text-white">
              <Check size={22} />
            </div>
            <DialogTitle className="mt-6 text-3xl font-medium tracking-[-.05em] text-white">{t.orderSuccessTitle}</DialogTitle>
            <DialogDescription className="mt-3 max-w-[320px] text-sm leading-6 text-white/60">
              {t.orderSuccessBody}
            </DialogDescription>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="mt-8 flex items-center justify-center gap-2.5 rounded-[7px] border border-[#1B8F6A] bg-[#1B8F6A]/60 px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0px_0.5px_0.5px_rgba(27,143,106,0.75)] transition-all duration-300 hover:bg-[#1B8F6A]/80"
            >
              {t.orderDone}
            </button>
          </div>
        ) : (
          /* ── Card form ──────────────────────────────────────── */
          <div className="order-card grid gap-0 overflow-hidden rounded-[19px] bg-[#111311] shadow-[0px_105px_63px_rgba(0,0,0,0.05),0px_47px_47px_rgba(0,0,0,0.09),0px_12px_26px_rgba(0,0,0,0.1)]">

            {/* ── Cart section: title ──────────────────────────── */}
            <div className="flex h-[44px] items-center border-b border-[#1B8F6A]/40 px-5">
              <DialogTitle className="text-[11px] font-bold uppercase tracking-[.1em] text-white">
                {t.orderTitle}
              </DialogTitle>
            </div>

            {/* ── Cart section: form fields ───────────────────── */}
            <form onSubmit={handleSubmit} className="grid gap-0">
              <div className="space-y-0 px-5 pt-5 pb-4">
                <DialogDescription className="mb-5 text-[11px] font-semibold leading-5 text-white/50">
                  {t.orderSub}
                </DialogDescription>

                {/* Step 1: Name & Contact */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="tf-mono text-[9px] text-[#1B8F6A]/80">{t.orderNameLabel}</span>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={t.orderNamePlaceholder}
                      className="order-input mt-2 h-[36px] w-full rounded-[5px] border border-[#1B8F6A]/40 bg-[#1a211d] px-3 text-[13px] font-semibold text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-transparent focus:bg-[#242e28] focus:shadow-[0_0_0_2px_rgba(27,143,106,0.4)]"
                    />
                  </label>
                  <label className="block">
                    <span className="tf-mono text-[9px] text-[#1B8F6A]/80">{t.orderContactLabel}</span>
                    <input
                      required
                      type="text"
                      value={form.contact}
                      onChange={(e) => setForm({ ...form, contact: e.target.value })}
                      placeholder={t.orderContactPlaceholder}
                      className="order-input mt-2 h-[36px] w-full rounded-[5px] border border-[#1B8F6A]/40 bg-[#1a211d] px-3 text-[13px] font-semibold text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-transparent focus:bg-[#242e28] focus:shadow-[0_0_0_2px_rgba(27,143,106,0.4)]"
                    />
                  </label>
                </div>
              </div>

              {/* ── Divider ───────────────────────────────────── */}
              <div className="mx-5 h-px bg-[#1B8F6A]/25" />

              {/* Step 2: Machine & Quantity (promo-style row) */}
              <div className="space-y-4 px-5 pt-4 pb-4">
                <div className="grid gap-4 sm:grid-cols-[1fr_100px]">
                  <label className="block">
                    <span className="tf-mono text-[9px] text-[#1B8F6A]/80">{t.orderMachineLabel}</span>
                    <select
                      required
                      value={form.robot}
                      onChange={(e) => setForm({ ...form, robot: e.target.value })}
                      className="order-input mt-2 h-[36px] w-full rounded-[5px] border border-[#1B8F6A]/40 bg-[#1a211d] px-3 text-[13px] font-semibold text-white outline-none transition-all duration-300 focus:border-transparent focus:bg-[#242e28] focus:shadow-[0_0_0_2px_rgba(27,143,106,0.4)]"
                    >
                      {machineChoiceIds.map((id, i) => (
                        <option key={id} value={id}>
                          {t.orderMachineOptions[i] ?? id}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="tf-mono text-[9px] text-[#1B8F6A]/80">{t.orderQuantityLabel}</span>
                    <input
                      required
                      type="number"
                      min={1}
                      max={99}
                      value={form.quantity}
                      onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                      className="order-input mt-2 h-[36px] w-full rounded-[5px] border border-[#1B8F6A]/40 bg-[#1a211d] px-3 text-[13px] font-semibold text-white outline-none transition-all duration-300 focus:border-transparent focus:bg-[#242e28] focus:shadow-[0_0_0_2px_rgba(27,143,106,0.4)]"
                    />
                  </label>
                </div>
              </div>

              {/* ── Divider ───────────────────────────────────── */}
              <div className="mx-5 h-px bg-[#1B8F6A]/25" />

              {/* Step 3: Notes (payments-style detail) */}
              <div className="px-5 pt-4 pb-5">
                <label className="block">
                  <span className="tf-mono text-[9px] text-[#1B8F6A]/80">{t.orderNotesLabel}</span>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder={t.orderNotesPlaceholder}
                    className="order-input mt-2 w-full resize-none rounded-[5px] border border-[#1B8F6A]/40 bg-[#1a211d] px-3 py-2.5 text-[13px] font-semibold text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-transparent focus:bg-[#242e28] focus:shadow-[0_0_0_2px_rgba(27,143,106,0.4)]"
                  />
                </label>
              </div>

              {/* ── Checkout footer ───────────────────────────── */}
              <div className="flex items-center justify-between rounded-b-[19px] bg-[#1B8F6A]/20 px-5 py-3">
                <span className="text-[11px] font-semibold text-white/40">FarmBro</span>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2.5 rounded-[7px] border border-[#1B8F6A] bg-[#1B8F6A]/60 px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0px_0.5px_0.5px_rgba(27,143,106,0.75)] transition-all duration-300 hover:bg-[#1B8F6A]/80 active:scale-[.97]"
                >
                  {t.orderSubmit} <MoveUpRight size={14} />
                </button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

