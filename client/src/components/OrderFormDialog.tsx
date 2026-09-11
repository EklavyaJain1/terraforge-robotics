import { useEffect, useState } from "react";
import { Check, MoveUpRight } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { machineChoices } from "@/data/catalog";

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

const robotChoices = machineChoices;

export default function OrderFormDialog({ open, onOpenChange, defaultRobot }: OrderFormDialogProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", robot: "", quantity: "1", notes: "" });

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setForm((prev) => ({ ...prev, robot: defaultRobot ?? (prev.robot || machineChoices[0]) }));
    }
  }, [open, defaultRobot]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    toast.success("Order request received", {
      description: "A TerraForge specialist will call you to confirm configuration and delivery timing.",
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-[460px] overflow-y-auto border-white/15 bg-[#111311] p-0 text-white sm:w-[460px] sm:rounded-none">
        {submitted ? (
          <div className="flex min-h-[380px] flex-col items-start justify-center p-8">
            <div className="flex h-12 w-12 items-center justify-center bg-[#1B8F6A] text-white">
              <Check size={22} />
            </div>
            <DialogTitle className="mt-6 text-3xl font-medium tracking-[-.05em]">Order request received.</DialogTitle>
            <DialogDescription className="mt-3 max-w-[320px] text-sm leading-6 text-white/60">
              We will call you on the number you shared to confirm the configuration, attachments, and delivery window.
            </DialogDescription>
            <button type="button" onClick={() => onOpenChange(false)} className="tf-btn tf-btn-primary mt-8 w-fit">
              Done
            </button>
          </div>
        ) : (
          <div className="p-7 sm:p-8">
            <DialogTitle className="text-2xl font-medium tracking-[-.04em]">Order TerraForge</DialogTitle>
            <DialogDescription className="mt-2 text-sm leading-6 text-white/55">
              Tell us the machine and quantity. A field specialist confirms pricing, attachments, and delivery.
            </DialogDescription>
            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="tf-mono text-[9px] text-white/45">Your name</span>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Full name"
                    className="tf-focus mt-2 w-full border-b border-white/25 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-white/30 focus:border-[#1B8F6A]"
                  />
                </label>
                <label className="block">
                  <span className="tf-mono text-[9px] text-white/45">Phone or email</span>
                  <input
                    required
                    type="text"
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    placeholder="How should we reach you?"
                    className="tf-focus mt-2 w-full border-b border-white/25 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-white/30 focus:border-[#1B8F6A]"
                  />
                </label>
              </div>
              <div className="grid gap-5 sm:grid-cols-[1fr_110px]">
                <label className="block">
                  <span className="tf-mono text-[9px] text-white/45">Machine</span>
                  <select
                    required
                    value={form.robot}
                    onChange={(e) => setForm({ ...form, robot: e.target.value })}
                    className="tf-focus mt-2 w-full border-b border-white/25 bg-[#111311] px-0 py-3 text-sm outline-none focus:border-[#1B8F6A]"
                  >
                    {robotChoices.map((choice) => (
                      <option key={choice} value={choice}>
                        {choice}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="tf-mono text-[9px] text-white/45">Quantity</span>
                  <input
                    required
                    type="number"
                    min={1}
                    max={99}
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                    className="tf-focus mt-2 w-full border-b border-white/25 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#1B8F6A]"
                  />
                </label>
              </div>
              <label className="block">
                <span className="tf-mono text-[9px] text-white/45">Anything we should know?</span>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Crop, acreage, preferred delivery window"
                  className="tf-focus mt-2 w-full resize-none border-b border-white/25 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-white/30 focus:border-[#1B8F6A]"
                />
              </label>
              <button type="submit" className="tf-btn tf-btn-primary mt-2 w-full">
                Submit order request <MoveUpRight size={15} />
              </button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
