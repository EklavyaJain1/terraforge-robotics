import { useMemo, useState } from "react";
import { ArrowUpRight, Check, CircleHelp } from "lucide-react";
import SectionKicker from "@/components/SectionKicker";
import { useOrderForm } from "@/contexts/OrderContext";

const fields = [
  { key: "acres", label: "Acres under cultivation", suffix: "acres" },
  { key: "workers", label: "Workers on a typical pass", suffix: "people" },
  { key: "days", label: "Working days per cycle", suffix: "days" },
  { key: "wage", label: "Average daily wage", suffix: "₹ / day" },
] as const;

type CalculatorKey = (typeof fields)[number]["key"];

export default function SavingsCalculator() {
  const { openOrderForm } = useOrderForm();
  const [calculator, setCalculator] = useState<Record<CalculatorKey, string>>({
    acres: "120",
    workers: "8",
    days: "12",
    wage: "650",
  });

  const savings = useMemo(() => {
    const acres = Number(calculator.acres) || 0;
    const workers = Number(calculator.workers) || 0;
    const days = Number(calculator.days) || 0;
    const wage = Number(calculator.wage) || 0;
    const traditional = acres * workers * days * wage;
    const operatorCost = acres * Math.max(1, days * 0.16) * wage;
    const annual = Math.max(0, traditional - operatorCost);
    return { annual, percent: traditional ? Math.round((annual / traditional) * 100) : 0 };
  }, [calculator]);

  const formatRupees = (value: number) => `₹${Math.round(value).toLocaleString("en-IN")}`;

  return (
    <section id="calculator" className="tf-dark py-20 sm:py-28">
      <div className="tf-container">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
          <div>
            <SectionKicker number="COST" label="Savings calculator" light />
            <h2 className="mt-7 max-w-[450px] text-4xl font-medium leading-[.98] tracking-[-.055em] text-white sm:text-6xl">See what one operator can move in a season.</h2>
            <p className="mt-6 max-w-[380px] text-base leading-7 text-white/60">Use your current labour profile for a quick directional estimate. We'll turn it into a farm-specific plan together.</p>
            <div className="mt-8 flex items-center gap-3 text-white/50">
              <CircleHelp size={16} className="text-[#B9F4D4]" />
              <span className="text-xs">Estimates are directional, not a quote.</span>
            </div>
          </div>
          <div className="border border-white/15 bg-[#1B241F] p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map((field) => (
                <label key={field.key} className="block">
                  <span className="tf-mono text-[9px] text-white/45">{field.label}</span>
                  <div className="relative mt-2">
                    <input
                      type="number"
                      value={calculator[field.key]}
                      onChange={(event) => setCalculator({ ...calculator, [field.key]: event.target.value })}
                      className="tf-focus w-full border border-white/15 bg-[#111311] px-4 py-3 pr-20 text-lg text-white outline-none transition-colors focus:border-[#1B8F6A]"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-white/35">{field.suffix}</span>
                  </div>
                </label>
              ))}
            </div>
            <div className="mt-8 border-t border-white/15 pt-7">
              <div className="tf-mono text-[10px] text-[#B9F4D4]">Potential annual labour savings</div>
              <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
                <div className="text-5xl font-medium tracking-[-.07em] text-white sm:text-7xl">{formatRupees(savings.annual)}</div>
                <div className="flex items-center gap-2 pb-2 text-sm text-[#8BE2B2]">
                  <Check size={15} /> up to {savings.percent}% less labour cost
                </div>
              </div>
              <div className="mt-6 h-2 bg-white/10">
                <div className="h-full bg-[#1B8F6A] transition-all duration-300" style={{ width: `${Math.min(100, savings.percent)}%` }} />
              </div>
            </div>
            <button type="button" onClick={() => openOrderForm("Not sure yet")} className="tf-btn tf-btn-primary mt-8">
              Talk through my numbers <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
