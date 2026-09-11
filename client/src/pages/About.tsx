import { MoveUpRight } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionKicker from "@/components/SectionKicker";
import { useOrderForm } from "@/contexts/OrderContext";
import usePageTitle from "@/hooks/usePageTitle";

const principles = [
  { metric: "01", label: "Operator-first", copy: "Controls that make sense before the second cup of tea." },
  { metric: "02", label: "Serviceable", copy: "Built to be understood, maintained, and improved in the field." },
  { metric: "03", label: "Measured", copy: "We report the work done — not just the technology used." },
];

export default function About() {
  usePageTitle("About — TerraForge Robotics");
  const { openOrderForm } = useOrderForm();

  return (
    <div className="tf-page">
      <Navbar />
      <main className="pt-[72px]">
        <section className="tf-surface py-16 sm:py-24">
          <div className="tf-container">
            <SectionKicker number="WHO" label="About TerraForge" />
            <h1 className="mt-7 max-w-[720px] text-5xl font-medium leading-[.95] tracking-[-.055em] sm:text-7xl">
              Built for the row you run.
            </h1>
            <p className="mt-6 max-w-[480px] text-base leading-7 text-[#3F4B45]">
              TerraForge started with a simple observation: the machines that could help growers were either too expensive to own or too fragile to trust. We build field-ready autonomous platforms that earn their place one season at a time.
            </p>
          </div>
        </section>

        <section className="tf-dark py-16 sm:py-20">
          <div className="tf-container grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
            <div>
              <SectionKicker number="HOW" label="What we believe" light />
              <h2 className="mt-7 max-w-[380px] text-4xl font-medium leading-[.98] tracking-[-.055em] text-white sm:text-5xl">
                Good automation doesn't ask the farm to change.
              </h2>
            </div>
            <div className="space-y-6 text-base leading-7 text-white/70">
              <p>
                We design around the conditions that don't make the brochure: uneven ground, tight rows, and a weather window that starts now. Track width, tool geometry, and navigation are configured for the crop you actually run.
              </p>
              <p>
                Every platform is electric, quiet, and cheap to run. One operator supervises the pass instead of spending the day behind a tool. And because we service what we sell, the machine gets better every season it stays in the field.
              </p>
              <p>
                We measure ourselves the way you would: acres covered, cost per pass, and days the season kept moving.
              </p>
            </div>
          </div>
          <div className="tf-container mt-14 grid border-y border-white/15 sm:grid-cols-3">
            {principles.map((item) => (
              <div key={item.metric} className="border-b border-white/15 py-6 last:border-0 sm:border-b-0 sm:border-r sm:px-7 sm:first:pl-0 sm:last:border-0">
                <div className="tf-mono text-[10px] text-[#53C98B]">{item.metric}</div>
                <h3 className="mt-3 text-lg font-medium text-white">{item.label}</h3>
                <p className="mt-2 max-w-[240px] text-sm leading-6 text-white/60">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="tf-surface py-16 sm:py-20">
          <div className="tf-container flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="max-w-[520px] text-3xl font-medium tracking-[-.04em] sm:text-4xl">Come see the machine on real soil.</h2>
              <p className="mt-3 max-w-[440px] text-sm leading-6 text-[#59655F]">
                Meet the lineup on FarmBro, or talk to the field team about a trial on your farm.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => openOrderForm()} className="tf-btn tf-btn-primary">
                Order now <MoveUpRight size={14} />
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
