import { useState } from "react";
import { Check, MoveUpRight } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SavingsCalculator from "@/components/SavingsCalculator";
import SectionKicker from "@/components/SectionKicker";
import { useOrderForm } from "@/contexts/OrderContext";
import usePageTitle from "@/hooks/usePageTitle";
import { attachments, robots, type Robot } from "@/data/catalog";

const audiences = [
  {
    number: "B2C",
    label: "Progressive farmers",
    copy: "Indicative from-pricing, seasonal booking, and field training on your land. Start with one machine and grow the fleet as the season proves it.",
    cta: "Order as a farmer",
    robot: "Not sure yet",
  },
  {
    number: "B2B",
    label: "Agri enterprises & estates",
    copy: "Multi-machine fleets with dashboards, operator certification for your crews, and pilot programmes before capital commitment.",
    cta: "Request fleet pricing",
    robot: "Fleet / B2B order",
  },
  {
    number: "GOV",
    label: "Government & defence",
    copy: "Make-in-India compliance documentation, institutional procurement support, and deployment engineering for large public programmes.",
    cta: "Start institutional enquiry",
    robot: "Government / Defence enquiry",
  },
];

function RobotCard({ robot }: { robot: Robot }) {
  const { openOrderForm } = useOrderForm();
  return (
    <article className={`relative flex flex-col border bg-[#111311] p-6 sm:p-8 ${robot.badge ? "border-[#1B8F6A]" : "border-white/15"}`}>
      {robot.badge && (
        <span className="absolute -top-3 left-6 bg-[#1B8F6A] px-3 py-1 text-[10px] font-semibold text-white">{robot.badge}</span>
      )}
      <div className="tf-mono text-[10px] text-[#B9F4D4]">{robot.number} / {robot.tier}</div>
      <h3 className="mt-3 text-4xl font-medium tracking-[-.06em] text-white">{robot.name}</h3>
      <p className="mt-1 text-base text-white/75">{robot.tagline}</p>
      <p className="mt-4 max-w-[430px] text-sm leading-6 text-white/55">{robot.body}</p>

      <div className="relative mt-6 h-[190px] overflow-hidden bg-[#17201B] sm:h-[220px]">
        <img src={robot.image} alt={`FarmBro ${robot.name} agricultural robot`} className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111311]/85 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4 grid grid-cols-3 gap-3">
          {robot.specs.map(([label, value]) => (
            <div key={label}>
              <div className="tf-mono text-[8px] text-white/45">{label}</div>
              <div className="mt-0.5 text-xs text-white">{value}</div>
            </div>
          ))}
        </div>
      </div>

      <ul className="mt-6 space-y-2">
        {robot.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2 text-sm text-white/75">
            <Check size={14} className="mt-0.5 shrink-0 text-[#53C98B]" />
            {highlight}
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-wrap items-end justify-between gap-4 border-t border-white/15 pt-5">
        <div>
          <div className="tf-mono text-[9px] text-white/40">Indicative price</div>
          <div className="mt-1 text-3xl font-medium tracking-[-.05em] text-white">{robot.priceLabel}</div>
          <div className="mt-1 text-[11px] text-[#8BE2B2]">{robot.institutionalNote}</div>
          <div className="mt-1 text-[11px] text-white/45">{robot.availability}</div>
        </div>
        <button type="button" onClick={() => openOrderForm(robot.name)} className="tf-btn tf-btn-primary">
          Order {robot.name} <MoveUpRight size={14} />
        </button>
      </div>
    </article>
  );
}

export default function FarmBro() {
  usePageTitle("FarmBro — robot lineup for sale");
  const { openOrderForm } = useOrderForm();
  const [compare, setCompare] = useState(false);

  return (
    <div className="tf-page">
      <Navbar />
      <main className="pt-[72px]">
        <section className="tf-dark py-16 sm:py-24">
          <div className="tf-container">
            <SectionKicker number="SHOP" label="FarmBro store" light />
            <div className="mt-7 flex flex-wrap items-end justify-between gap-8">
              <div>
                <h1 className="max-w-[640px] text-5xl font-medium leading-[.95] tracking-[-.055em] text-white sm:text-7xl">
                  FarmBro.
                  <br />
                  <span className="text-[#B9F4D4]">Three machines. One field system.</span>
                </h1>
                <p className="mt-6 max-w-[420px] text-base leading-7 text-white/60">
                  Field X agriculture platforms for sale — engineered in India for estate-scale farming. Pick the machine that matches your acreage; every one ships field-ready with training included.
                </p>
              </div>
              <button type="button" onClick={() => setCompare(!compare)} className="tf-btn tf-btn-quiet" aria-pressed={compare}>
                {compare ? "Hide spec comparison" : "Compare all specs"}
              </button>
            </div>
          </div>
        </section>

        {compare && (
          <section className="tf-dark border-y border-white/10 py-10" aria-label="Specification comparison">
            <div className="tf-container overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="pb-3 pr-4"><span className="tf-mono text-[9px] text-white/40">Model</span></th>
                    {robots.map((robot) => (
                      <th key={robot.id} className="pb-3 pr-4 text-sm font-medium text-white">{robot.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(["price", "payload", "endurance", "coverage"] as const).map((rowKey) => (
                    <tr key={rowKey} className="border-b border-white/10">
                      <td className="py-3 pr-4 capitalize text-white/50"><span className="tf-mono text-[9px]">{rowKey}</span></td>
                      {robots.map((robot) => {
                        const keywords = rowKey === "endurance" ? ["endurance", "flight time"] : rowKey === "coverage" ? ["coverage"] : [rowKey];
                        const spec = robot.specs.find(([label]) => keywords.some((k) => label.toLowerCase().includes(k)));
                        return (
                          <td key={robot.id} className="py-3 pr-4 text-sm text-white/85">
                            {rowKey === "price" ? robot.priceLabel : spec ? spec[1] : "—"}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className="tf-dark py-16 sm:py-20">
          <div className="tf-container grid gap-6 lg:grid-cols-2">
            {robots.map((robot) => (
              <RobotCard key={robot.id} robot={robot} />
            ))}
          </div>
        </section>

        <SavingsCalculator />

        <section className="tf-surface py-16 sm:py-20">
          <div className="tf-container">
            <SectionKicker number="ADD-ONS" label="Attachments" />
            <h2 className="mt-7 max-w-[560px] text-4xl font-medium leading-[.98] tracking-[-.055em] sm:text-5xl">Tools that ship with your machine.</h2>
            <div className="mt-10 grid gap-px border border-[#111311]/15 bg-[#111311]/15 sm:grid-cols-2 lg:grid-cols-4">
              {attachments.map((item) => (
                <div key={item.number} className="bg-white p-6">
                  <div className="flex items-start justify-between">
                    <span className="tf-mono text-[10px] text-[#1B8F6A]">{item.number}</span>
                    <span className="text-2xl font-light text-[#111311]/30">{item.icon}</span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium">{item.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#59655F]">{item.copy}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-[#111311]/15 pt-3">
                    <span className="tf-mono text-[9px] text-[#64736C]">{item.stat}</span>
                    <span className="text-sm font-semibold text-[#111311]">{item.priceLabel}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button type="button" onClick={() => openOrderForm("Attachment only")} className="tf-btn tf-btn-primary">
                Order attachments <MoveUpRight size={14} />
              </button>
              <p className="text-sm text-[#59655F]">Every attachment fits the FarmX-500 implement rail — no adapters needed.</p>
            </div>
          </div>
        </section>

        <section className="tf-surface py-16 sm:py-20">
          <div className="tf-container">
            <SectionKicker number="WHO" label="Who we build for" />
            <h2 className="mt-7 max-w-[560px] text-4xl font-medium leading-[.98] tracking-[-.055em] sm:text-5xl">One field system. Three kinds of buyers.</h2>
            <div className="mt-10 grid gap-px border border-[#111311]/15 bg-[#111311]/15 lg:grid-cols-3">
              {audiences.map((audience) => (
                <div key={audience.number} className="flex flex-col bg-white p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="tf-mono text-[10px] text-[#1B8F6A]">{audience.number}</span>
                    <span className="h-px w-8 bg-[#111311]/20" />
                  </div>
                  <h3 className="mt-8 text-xl font-medium">{audience.label}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-[#59655F]">{audience.copy}</p>
                  <button type="button" onClick={() => openOrderForm(audience.robot)} className="tf-btn tf-btn-outline mt-6 w-fit">
                    {audience.cta} <MoveUpRight size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="tf-dark py-16 sm:py-20">
          <div className="tf-container flex flex-col items-start justify-between gap-6 border border-white/15 bg-[#17201B] p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="text-3xl font-medium tracking-[-.04em] text-white sm:text-4xl">Not sure which machine fits?</h2>
              <p className="mt-3 max-w-[440px] text-sm leading-6 text-white/60">
                Tell us your crop, acreage, and the job that hurts most. We will recommend the machine — even if it is the smaller one.
              </p>
            </div>
            <button type="button" onClick={() => openOrderForm("Not sure yet")} className="tf-btn tf-btn-primary shrink-0">
              Get a recommendation <MoveUpRight size={14} />
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
