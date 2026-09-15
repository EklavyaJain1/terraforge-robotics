import { useMemo, useState } from "react";
import { ArrowUpRight, Check, CircleHelp } from "lucide-react";
import SectionKicker from "@/components/SectionKicker";
import { useOrderForm } from "@/contexts/OrderContext";
import { useLanguage } from "@/contexts/LanguageContext";

type CalculatorKey = "acres" | "workers" | "days" | "cycles" | "wage";

export default function SavingsCalculator() {
  const { openOrderForm } = useOrderForm();
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
    return { annual, percent: traditional ? Math.round((annual / traditional) * 100) : 0 };
  }, [calculator]);

  const formatRupees = (value: number) => `₹${Math.round(value).toLocaleString("en-IN")}`;

  return (
    <section id="calculator" className="tf-dark py-20 sm:py-28">
      <div className="tf-container">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
          <div>
            <SectionKicker number="COST" label={t.calcKickerLabel} light />
            <h2 className="mt-7 max-w-[450px] text-4xl font-medium leading-[.98] tracking-[-.055em] text-white sm:text-6xl">{t.calcHeading}</h2>
            <p className="mt-6 max-w-[380px] text-base leading-7 text-white/60">{t.calcSub}</p>
            <div className="mt-8 flex items-center gap-3 text-white/50">
              <CircleHelp size={16} className="text-[#B9F4D4]" />
              <span className="text-xs">{t.calcNote}</span>
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
              <div className="tf-mono text-[10px] text-[#B9F4D4]">{t.calcResultLabel}</div>
              <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
                <div className="text-5xl font-medium tracking-[-.07em] text-white sm:text-7xl">{formatRupees(savings.annual)}</div>
                <div className="flex items-center gap-2 pb-2 text-sm text-[#8BE2B2]">
                  <Check size={15} /> {t.calcUpTo.replace("{percent}", String(savings.percent))}
                </div>
              </div>
              <div className="mt-6 h-2 bg-white/10">
                <div className="h-full bg-[#1B8F6A] transition-all duration-300" style={{ width: `${Math.min(100, savings.percent)}%` }} />
              </div>
            </div>
            <button type="button" onClick={() => openOrderForm("unsure")} className="tf-btn tf-btn-primary mt-8">
              {t.calcCta} <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
