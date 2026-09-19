import { useState } from "react";
import { MoveUpRight } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SavingsCalculator from "@/components/SavingsCalculator";
import SectionKicker from "@/components/SectionKicker";
import TiltCard from "@/components/ui/tilt-card";
import { useOrderForm } from "@/contexts/OrderContext";
import { useLanguage } from "@/contexts/LanguageContext";
import usePageTitle from "@/hooks/usePageTitle";
import { attachments, robots, agriImages, type Robot } from "@/data/catalog";
import { motion, AnimatePresence } from "framer-motion";
import { FlowButton } from "@/components/ui/flow-button";

function CompareRow({ label, keywords, machineField }: { label: string; keywords: string[]; machineField?: "power" | "slope" }) {
  const { t } = useLanguage();
  const labelKey =
    label === "price" ? t.comparePrice : label === "configuration" ? t.compareConfiguration : label === "power" ? t.comparePower : t.compareSlope;
  return (
    <tr className="border-b border-white/10">
      <td className="py-3 pr-4 capitalize text-white/50"><span className="tf-mono text-[9px]">{labelKey}</span></td>
      {robots.map((robot) => {
        const m = t.machines[robot.id];
        // power/slope resolve from dedicated fields (compare-table contract);
        // other rows fall back to spec-label matching within the active language.
        const value =
          label === "price"
            ? m.priceLabel
            : label === "configuration"
              ? m.configuration
              : machineField && m[machineField]
                ? m[machineField]
                : m.specs.find(([specLabel]) => keywords.some((k) => specLabel.toLowerCase().includes(k)))?.[1] ?? "—";
        return (
          <td key={robot.id} className="py-3 pr-4 text-sm text-white/85">{value}</td>
        );
      })}
    </tr>
  );
}

function CompareTable() {
  const rows: { label: string; keywords: string[]; machineField?: "power" | "slope" }[] = [
    { label: "price", keywords: [] },
    { label: "configuration", keywords: ["configuration"] },
    { label: "power", keywords: ["power"], machineField: "power" },
    { label: "slope", keywords: ["slope"], machineField: "slope" },
  ];
  const { t } = useLanguage();
  return (
    <section className="tf-dark border-y border-white/10 py-10" aria-label={t.compareAria}>
      <div className="tf-container overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-white/15">
              <th className="pb-3 pr-4"><span className="tf-mono text-[9px] text-white/40">{t.compareModel}</span></th>
              {robots.map((robot) => (
                <th key={robot.id} className="pb-3 pr-4 text-sm font-medium text-white">{t.machines[robot.id].name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <CompareRow key={row.label} label={row.label} keywords={row.keywords} machineField={row.machineField} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function RobotCard({ robot }: { robot: Robot }) {
  const { openOrderForm } = useOrderForm();
  const { t } = useLanguage();
  const m = t.machines[robot.id];
  return (
    <TiltCard className="h-full">
      <article className="group relative flex h-full flex-col rounded-2xl bg-black text-white shadow-[0_22px_54px_rgba(0,0,0,.5)] border border-white/10 transition-colors duration-500 hover:border-[#1B8F6A]/50">
        {m.badge && (
          <span className="absolute top-4 right-4 z-20 rounded-full bg-[#1B8F6A] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white shadow-lg">
            {m.badge}
          </span>
        )}
        <Link href={`/farmbro/${robot.slug}`} aria-label={t.cardViewAria.replace("{name}", m.name)} className="tf-focus flex flex-1 flex-col">
          <div className="relative -mt-px overflow-hidden rounded-t-2xl">
            {robot.hoverVideo ? (
              <>
                <img src={robot.image} alt={m.name} className="h-[270px] w-full object-cover object-top transition-opacity duration-500 group-hover:opacity-0" loading="lazy" decoding="async" />
                <video src={robot.hoverVideo} autoPlay loop muted playsInline className="absolute inset-0 h-[270px] w-full object-cover object-top opacity-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100" />
              </>
            ) : (
              <img src={robot.image} alt={m.name} className="h-[270px] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
            )}
            <div className="pointer-events-none absolute bottom-0 z-10 h-32 w-full bg-gradient-to-t from-black to-transparent"></div>
          </div>
          <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
            <h3 className="border-b border-gray-800 pb-5 text-2xl font-medium leading-snug tracking-tight text-white transition-colors group-hover:text-[#B9F4D4]">
              {m.name}
            </h3>
            <p className="mt-5 flex-1 text-sm leading-relaxed text-gray-400">
              {m.tagline}
            </p>
            <div className="mt-6 flex items-center justify-between">
              <span className="bg-gradient-to-r from-[#B9F4D4] to-[#1B8F6A] bg-clip-text text-sm font-medium text-transparent">
                {m.priceLabel}
              </span>
              <div className="inline-flex items-center gap-2 text-xs font-medium text-white transition-colors group-hover:text-[#B9F4D4]">
                {t.cardVisit} <MoveUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>
        </Link>
      </article>
    </TiltCard>
  );
}

export default function FarmBro() {
  const { t } = useLanguage();
  usePageTitle(t.storeTitle);
  const { openOrderForm } = useOrderForm();
  const [compare, setCompare] = useState(false);

  return (
    <div className="tf-page">
      <Navbar />
      <main className="pt-[72px]">
        <section className="tf-dark relative flex min-h-[calc(100vh-72px)] items-center overflow-hidden bg-[#0B0F0D]">
          {/* Background image with overlay */}
          <div className="absolute inset-0 z-0">
            <img src={agriImages.wide} className="h-full w-full object-cover opacity-30 mix-blend-luminosity" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0D] via-[#0B0F0D]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F0D] via-transparent to-[#0B0F0D]" />
          </div>
          <div className="tf-container relative z-10 flex flex-col items-center text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <SectionKicker number="SHOP" label={t.farmbroEyebrow} light className="mx-auto" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-7 max-w-[800px] text-5xl font-medium leading-[.95] tracking-[-.055em] text-white sm:text-7xl"
            >
              {t.farmbroTitleA}{" "}
              <span className="bg-gradient-to-r from-[#B9F4D4] to-[#1B8F6A] bg-clip-text text-transparent">{t.farmbroTitleB}</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-[540px] text-base leading-7 text-white/70"
            >
              {t.farmbroSub}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10"
            >
              <FlowButton text={compare ? t.compareHide : t.compareShow} onClick={() => setCompare(!compare)} />
            </motion.div>
          </div>
        </section>

        {compare && <CompareTable />}

        <section className="tf-dark pb-16 sm:pb-20">
          <div className="tf-container grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {robots.map((robot) => (
              <RobotCard key={robot.id} robot={robot} />
            ))}
          </div>
        </section>

        <SavingsCalculator />

        <section className="tf-surface py-16 sm:py-20">
          <div className="tf-container">
            <SectionKicker number="ADD-ONS" label={t.attachmentsKicker} />
            <h2 className="mt-7 max-w-[560px] text-4xl font-medium leading-[.98] tracking-[-.055em] sm:text-5xl">Add On</h2>
            <div className="mt-10 grid gap-px border border-[#111311]/15 bg-[#111311]/15 sm:grid-cols-2 lg:grid-cols-4">
              {attachments.map((item) => {
                const a = t.attachments[item.id];
                return (
                  <div key={item.id} className="bg-white p-6">
                    <div className="flex items-start justify-between">
                      <span className="tf-mono text-[10px] text-[#1B8F6A]">{item.number}</span>
                      <span className="text-2xl font-light text-[#111311]/30">{item.icon}</span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium">{a.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#59655F]">{a.copy}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-[#111311]/15 pt-3">
                      <span className="tf-mono text-[9px] text-[#64736C]">{a.stat}</span>
                      <span className="text-sm font-semibold text-[#111311]">{item.priceLabel}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button type="button" onClick={() => openOrderForm("attach")} className="tf-btn tf-btn-primary">
                {t.attachmentsCta} <MoveUpRight size={14} />
              </button>
            </div>
          </div>
        </section>



        <section className="tf-dark py-16 sm:py-20">
          <div className="tf-container flex flex-col items-start justify-between gap-6 border border-white/15 bg-[#17201B] p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="text-3xl font-medium tracking-[-.04em] text-white sm:text-4xl">{t.notSureHeading}</h2>
              <p className="mt-3 max-w-[440px] text-sm leading-6 text-white/60">{t.notSureBody}</p>
            </div>
            <button type="button" onClick={() => openOrderForm("unsure")} className="tf-btn tf-btn-primary shrink-0">
              {t.notSureCta} <MoveUpRight size={14} />
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
