import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Blocks, Check, ChevronDown, Fuel, Mountain, Radio } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import SectionKicker from "@/components/SectionKicker";
import { useOrderForm } from "@/contexts/OrderContext";
import { useLanguage } from "@/contexts/LanguageContext";
import usePageTitle from "@/hooks/usePageTitle";
import { robots } from "@/data/catalog";

const proofBar = [
  { value: "1,200+", key: "proofAcres" },
  { value: "9", key: "proofPlatforms" },
  { value: "100%", key: "proofRemote" },
  { value: "IND", key: "proofIndia" },
] as const;

const pillars = [
  { icon: Radio, title: "Remote controlled", copy: "The operator works from a safe distance — never on the machine, never in the cut." },
  { icon: Fuel, title: "Hybrid & electric", copy: "Hybrid power for long mulching days; electric for quiet, fume-free passes in tight blocks." },
  { icon: Blocks, title: "Modular implements", copy: "One implement rail: tiller, sprayer, cutter, trailer — swapped in minutes." },
  { icon: Mountain, title: "Slope capable", copy: "The Mini Mulcher holds and works slopes up to 45° where tractors stall." },
];

const faqs = [
  ["Do I need a robotics background to operate it?", "No. FarmBro machines are remote-controlled with a workflow that feels familiar from the first session. We train operators on the machine, the attachment, and the safety checks before a field trial."],
  ["Can the machine work without a cellular connection?", "Core driving and attachment controls remain available locally. Connected features such as live status and remote diagnostics use the available network connection."],
  ["How do field demonstrations work?", "We start with a short call, then bring the machine to a representative patch of your farm. The output is a practical operating plan — not a showroom demonstration."],
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  usePageTitle("FarmBro Robotics — More acres. Fewer compromises.");
  const { openOrderForm } = useOrderForm();
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div id="top" className="tf-page">
      <Navbar />

      <main>
        {/* Hero — the field film and the thesis, no audience tabs */}
        <section
          className="tf-scanline relative min-h-[720px] overflow-hidden bg-[#111311] text-white sm:min-h-[860px] lg:min-h-[100svh]"
          aria-label="FarmBro Robotics introduction"
        >
          <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover object-center">
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="hero-fade absolute inset-0" />

          <div className="tf-container relative flex min-h-[720px] flex-col justify-end pb-[210px] pt-32 sm:min-h-[860px] sm:pb-[136px] lg:min-h-[100svh]">
            <div className="max-w-[620px]">
              <h1 className="reveal text-[clamp(2.6rem,7.5vw,6.5rem)] font-medium leading-[.92] tracking-[-.07em] text-white">
                {t.heroTitleA}
                <br />
                <span className="text-[#B9F4D4]">{t.heroTitleB}</span>
              </h1>
              <p className="reveal reveal-delay-1 mt-6 max-w-[430px] text-sm leading-6 text-white/75 sm:text-base">
                {t.heroSub}
              </p>

              <div className="reveal reveal-delay-2 mt-8">
                <button type="button" onClick={() => scrollToId("machines")} className="tf-btn tf-btn-primary">
                  {t.heroCta} <ArrowDownRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Proof slate — the season log, docked to the video's bottom edge */}
          <div className="absolute inset-x-0 bottom-0 border-t border-white/15 bg-[#0B0F0D]/45 backdrop-blur-[6px]">
            <div className="tf-container grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
              {proofBar.map((item) => (
                <div key={item.key} className="px-4 py-4 first:pl-0 sm:px-6 sm:py-5">
                  <div className="text-xl font-medium tracking-[-.03em] text-white sm:text-2xl">{item.value}</div>
                  <div className="tf-mono mt-1 text-[9px] uppercase tracking-[.08em] text-white/50">{t[item.key]}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => scrollToId("machines")}
            className="tf-focus absolute bottom-[128px] left-1/2 hidden -translate-x-1/2 items-center gap-2 text-white/70 lg:flex"
            aria-label="Scroll to the machines section"
          >
            <span className="tf-mono text-[9px]">{t.scrollHint}</span>
            <ChevronDown size={14} />
          </button>
        </section>

        {/* 01 — The machines: e-commerce cards; every card opens its product page */}
        <section className="tf-surface border-b border-[#111311]/15 py-16 sm:py-20" id="machines">
          <div className="tf-container">
            <div className="grid items-end gap-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
              <div>
                <SectionKicker number="01" label="The machines" />
                <h2 className="mt-7 max-w-[420px] text-4xl font-medium leading-[.98] tracking-[-.055em] sm:text-6xl">A small machine for a very big season.</h2>
              </div>
              <p className="max-w-[460px] text-base leading-7 text-[#3F4B45] lg:justify-self-end">
                Four machines, one remote in the operator's hands. Open any machine to see its configuration, gallery, and full specification.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {robots.map((robot) => (
                <ProductCard key={robot.id} robot={robot} />
              ))}
            </div>

            {/* Technology pillars — what evaluators scan for */}
            <div className="mt-16 grid gap-px border-y border-[#111311]/15 bg-[#111311]/15 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="bg-[#FFFFFF] p-6 sm:p-7">
                  <pillar.icon size={19} className="text-[#1B8F6A]" />
                  <h3 className="mt-5 text-lg font-medium">{pillar.title}</h3>
                  <p className="mt-2 max-w-[240px] text-sm leading-6 text-[#59655F]">{pillar.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 02 — Questions */}
        <section className="tf-surface py-20 sm:py-24" id="faq">
          <div className="tf-container">
            <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
              <div>
                <SectionKicker number="02" label="Questions" />
                <h2 className="mt-7 max-w-[370px] text-4xl font-medium leading-[.98] tracking-[-.055em] sm:text-6xl">The practical answers.</h2>
              </div>
              <div className="border-t border-[#111311]/20">
                {faqs.map(([question, answer], index) => (
                  <div key={question} className="border-b border-[#111311]/20">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      aria-expanded={openFaq === index}
                      className="tf-focus flex w-full items-center justify-between gap-5 py-6 text-left"
                    >
                      <span className="text-base font-medium sm:text-lg">{question}</span>
                      <ChevronDown size={17} className={`shrink-0 text-[#1B8F6A] transition-transform duration-200 ${openFaq === index ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === index && <div className="max-w-[650px] pb-7 pr-10 text-sm leading-6 text-[#59655F]">{answer}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 03 — Make it practical */}
        <section id="order" className="relative overflow-hidden bg-[#1B8F6A] py-20 text-white sm:py-24">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[40px] border-white/10" />
          <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full border-[1px] border-white/15" />
          <div className="tf-container relative">
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
              <div>
                <SectionKicker number="03" label="Make it practical" light />
                <h2 className="mt-7 max-w-[480px] text-4xl font-medium leading-[.96] tracking-[-.055em] sm:text-6xl">Bring us the row you actually run.</h2>
                <p className="mt-6 max-w-[390px] text-base leading-7 text-white/80">Tell us what is slowing the season down. We'll come back with a machine, a tool, and a realistic next step.</p>
              </div>
              <div className="flex flex-col items-start justify-center gap-6">
                <button type="button" onClick={() => openOrderForm()} className="tf-btn tf-btn-quiet text-sm">
                  Request a machine <ArrowUpRight size={15} />
                </button>
                <div className="grid w-full gap-px border border-white/20 bg-white/20 sm:grid-cols-3">
                  <a href="tel:+919154153925" className="tf-focus bg-[#1B8F6A] px-4 py-4 transition-colors hover:bg-[#0F6F51]">
                    <span className="tf-mono block text-[9px] text-white/60">CALL</span>
                    <span className="mt-1 block text-sm font-medium">+91 91541 53925</span>
                  </a>
                  <a href="https://wa.me/919154153925" target="_blank" rel="noreferrer" className="tf-focus bg-[#1B8F6A] px-4 py-4 transition-colors hover:bg-[#0F6F51]">
                    <span className="tf-mono block text-[9px] text-white/60">WHATSAPP</span>
                    <span className="mt-1 block text-sm font-medium">Message the field team</span>
                  </a>
                  <a href="mailto:hello@farmbro.example" className="tf-focus bg-[#1B8F6A] px-4 py-4 transition-colors hover:bg-[#0F6F51]">
                    <span className="tf-mono block text-[9px] text-white/60">EMAIL</span>
                    <span className="mt-1 block text-sm font-medium">hello@farmbro.example</span>
                  </a>
                </div>
                <p className="flex items-center gap-2 text-xs text-white/70">
                  <Check size={14} /> Every enquiry gets a reply from an engineer, not a bot.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <a
        href="https://wa.me/919154153925"
        target="_blank"
        rel="noreferrer"
        className="tf-focus fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#53C98B] text-[#0B0F0D] shadow-[0_10px_30px_rgba(31,34,31,.22)] transition-transform hover:scale-105"
        aria-label="Chat with FarmBro on WhatsApp"
      >
        <span className="text-lg font-semibold">W</span>
      </a>
    </div>
  );
}
