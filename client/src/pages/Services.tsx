import { MoveUpRight } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionKicker from "@/components/SectionKicker";
import { useOrderForm } from "@/contexts/OrderContext";
import usePageTitle from "@/hooks/usePageTitle";

const services = [
  {
    number: "S01",
    name: "Field trials on your soil",
    copy: "We bring the right platform and attachment to a representative patch of your farm and run the actual job — not a showroom demo. You get a written operating plan and honest coverage numbers.",
    stat: "Free for qualifying farms",
  },
  {
    number: "S02",
    name: "Operator training",
    copy: "Two sessions on your field: machine handling, attachment changes, daily safety checks, and the remote-control workflow. Your operator signs off only when they are confident without us standing there.",
    stat: "Included with every machine",
  },
  {
    number: "S03",
    name: "Season service contract",
    copy: "Scheduled maintenance, battery health checks, firmware updates, and priority response during the season window. One flat price per platform, per season.",
    stat: "₹18,000 / platform / season",
  },
  {
    number: "S04",
    name: "Attachment fitting and calibration",
    copy: "Track width, tool geometry, and depth settings configured for your row spacing and soil. Includes a calibration pass recorded for future reference.",
    stat: "₹4,500 per visit",
  },
  {
    number: "S05",
    name: "Fleet advisory for contractors",
    copy: "For service providers running multiple machines across villages: deployment planning, charging schedules, and per-acre cost modelling before you commit capital.",
    stat: "By engagement",
  },
];

export default function Services() {
  usePageTitle("Services — FarmBro Robotics");
  const { openOrderForm } = useOrderForm();

  return (
    <div className="tf-page">
      <Navbar />
      <main className="pt-[72px]">
        <section className="tf-surface py-16 sm:py-24">
          <div className="tf-container">
            <SectionKicker number="WORK" label="Services" />
            <h1 className="mt-7 max-w-[720px] text-5xl font-medium leading-[.95] tracking-[-.055em] sm:text-7xl">
              We stand behind the machine.
            </h1>
            <p className="mt-6 max-w-[460px] text-base leading-7 text-[#3F4B45]">
              A robot is only worth its field days. Every FarmBro service exists to keep the season moving — before purchase, through the season, and across years.
            </p>
          </div>
        </section>

        <section className="tf-dark py-16 sm:py-20">
          <div className="tf-container">
            <div className="grid gap-px bg-white/15 sm:grid-cols-2">
              {services.map((service) => (
                <div key={service.number} className="bg-[#111311] p-6 sm:p-8">
                  <div className="tf-mono text-[10px] text-[#B9F4D4]">{service.number}</div>
                  <h2 className="mt-6 text-2xl font-medium text-white">{service.name}</h2>
                  <p className="mt-3 max-w-[420px] text-sm leading-6 text-white/60">{service.copy}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-4">
                    <span className="text-sm text-[#8BE2B2]">{service.stat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="tf-surface py-16 sm:py-20">
          <div className="tf-container flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="max-w-[520px] text-3xl font-medium tracking-[-.04em] sm:text-4xl">Start with a field trial, not a purchase order.</h2>
              <p className="mt-3 max-w-[440px] text-sm leading-6 text-[#59655F]">
                Most customers meet the machine on their own soil first. Book a trial, or go straight to the lineup.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => openOrderForm("Not sure yet")} className="tf-btn tf-btn-primary">
                Book a field trial <MoveUpRight size={14} />
              </button>
              <Link href="/farmbro" className="tf-btn tf-btn-outline">
                Browse FarmBro
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
