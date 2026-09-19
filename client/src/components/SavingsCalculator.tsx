import { useMemo, useState } from "react";
import { Check, TrendingDown, TrendingUp, Users, Calendar, Sprout, Coins } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type CalculatorKey = "acres" | "workers" | "days" | "cycles" | "wage";

const fieldIcons: Record<CalculatorKey, typeof Sprout> = {
  acres: Sprout,
  workers: Users,
  days: Calendar,
  cycles: TrendingUp,
  wage: Coins,
};

export default function SavingsCalculator() {
  const { t } = useLanguage();

  const fields: { key: CalculatorKey; label: string; suffix: string }[] = [
    { key: "acres", label: t.calcAcres, suffix: t.calcAcresSuffix },
    { key: "workers", label: t.calcWorkers, suffix: t.calcWorkersSuffix },
    { key: "days", label: t.calcDays, suffix: t.calcDaysSuffix },
    { key: "cycles", label: t.calcCycles, suffix: t.calcCyclesSuffix },
    { key: "wage", label: t.calcWage, suffix: t.calcWageSuffix },
  ];

  const [calculator, setCalculator] = useState<Record<CalculatorKey, string>>({
    acres: "120",
    workers: "8",
    days: "12",
    cycles: "2",
    wage: "650",
  });

  const savings = useMemo(() => {
    const acres = Number(calculator.acres) || 0;
    const workers = Number(calculator.workers) || 0;
    const days = Number(calculator.days) || 0;
    const cycles = Number(calculator.cycles) || 0;
    const wage = Number(calculator.wage) || 0;
    const traditional = acres * workers * days * wage * cycles;
    const operatorCost = acres * Math.max(1, days * 0.16) * wage * cycles;
    const annual = Math.max(0, traditional - operatorCost);
    return { annual, traditional, operatorCost, percent: traditional ? Math.round((annual / traditional) * 100) : 0 };
  }, [calculator]);

  const formatRupees = (value: number) => `₹${Math.round(value).toLocaleString("en-IN")}`;

  return (
    <section id="calculator" className="relative overflow-hidden bg-[#0B0F0D] py-20 sm:py-28">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#1B8F6A]/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#B9F4D4]/5 blur-3xl" />
      </div>

      <div className="tf-container relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="tf-mono inline-block rounded-full border border-[#1B8F6A]/30 bg-[#1B8F6A]/10 px-4 py-1.5 text-[10px] uppercase tracking-[.16em] text-[#B9F4D4]">
            {t.calcKickerLabel}
          </div>
          <h2 className="mx-auto mt-6 max-w-[600px] text-4xl font-medium leading-[.98] tracking-[-.055em] text-white sm:text-6xl">
            {t.calcHeading}
          </h2>
          <p className="mx-auto mt-5 max-w-[480px] text-base leading-7 text-white/50">
            {t.calcSub}
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="mx-auto max-w-[1000px]">
          {/* Input Fields */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {fields.map((field) => {
              const Icon = fieldIcons[field.key];
              return (
                <div
                  key={field.key}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:border-[#1B8F6A]/30 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center gap-2">
                    <Icon size={14} className="text-[#1B8F6A]" />
                    <span className="tf-mono text-[9px] uppercase tracking-wider text-white/40">{field.label}</span>
                  </div>
                  <div className="relative mt-3 flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-3 py-2 transition-colors focus-within:border-[#1B8F6A]">
                    <input
                      type="number"
                      value={calculator[field.key]}
                      onChange={(event) => setCalculator({ ...calculator, [field.key]: event.target.value })}
                      className="w-full border-none bg-transparent text-2xl font-medium text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <span className="shrink-0 text-[10px] text-white/30">{field.suffix}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Results Section */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {/* Traditional Cost */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-2">
                <TrendingDown size={14} className="text-red-400/70" />
                <span className="tf-mono text-[9px] uppercase tracking-wider text-white/40">Traditional Cost</span>
              </div>
              <div className="mt-3 text-2xl font-medium tracking-tight text-white/60 line-through decoration-red-400/40">
                {formatRupees(savings.traditional)}
              </div>
            </div>

            {/* With FarmBro */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-[#1B8F6A]" />
                <span className="tf-mono text-[9px] uppercase tracking-wider text-white/40">With FarmBro</span>
              </div>
              <div className="mt-3 text-2xl font-medium tracking-tight text-white">
                {formatRupees(savings.operatorCost)}
              </div>
            </div>

            {/* Your Savings */}
            <div className="relative overflow-hidden rounded-2xl border border-[#1B8F6A]/30 bg-gradient-to-br from-[#1B8F6A]/20 to-[#1B8F6A]/5 p-6">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#1B8F6A]/10 blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#B9F4D4]" />
                  <span className="tf-mono text-[9px] uppercase tracking-wider text-[#B9F4D4]/70">{t.calcResultLabel}</span>
                </div>
                <div className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  {formatRupees(savings.annual)}
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#1B8F6A]/20 px-3 py-1 text-xs font-medium text-[#B9F4D4]">
                  <Check size={12} /> {t.calcUpTo.replace("{percent}", String(savings.percent))}
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mx-auto mt-8 max-w-[600px]">
            <div className="flex items-center justify-between text-[10px] text-white/30">
              <span>0%</span>
              <span className="text-[#B9F4D4]">{savings.percent}% savings</span>
              <span>100%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#1B8F6A] to-[#B9F4D4] transition-all duration-700 ease-out"
                style={{ width: `${Math.min(100, savings.percent)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
