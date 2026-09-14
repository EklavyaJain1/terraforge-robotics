import { ArrowDownRight, ArrowUpRight, Blocks, Check, ChevronDown, CircleDot, Cpu, Factory, Footprints, Globe, Layers, PlugZap, Radar } from "lucide-react";
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
  { icon: Radar, title: "Remote Controlled / Semi Autonomous", copy: "Remote control with intelligent assistance for semi-autonomous operation." },
  { icon: Footprints, title: "Tethered Follow Me Mode", copy: "Automatically follows the operator while maintaining a safe distance." },
  { icon: Blocks, title: "Modular Architecture", copy: "Interchangeable modules enable rapid adaptation across different applications." },
  { icon: PlugZap, title: "Drivetrain Options: Hybrid & Electric", copy: "Hybrid and electric drivetrains optimized for different operational requirements." },
];

const whyFarmBro = [
  { icon: CircleDot, title: "Remove \"Autonomous\"", copy: "Simplifying field operations through reliable, purpose-built vehicle platforms." },
  { icon: Layers, title: "Compact to heavy duty — Mini UGV to heavy haulers", copy: "A scalable platform range spanning utility vehicles to heavy haulers." },
  { icon: Globe, title: "Designed for India, scalable globally", copy: "Engineered for Indian conditions with capabilities suited for global markets." },
  { icon: Cpu, title: "Deep domain expertise", copy: "Expertise spanning automotive, agriculture, embedded systems, and robotics." },
  { icon: PlugZap, title: "Drivetrain options — hybrid & electric", copy: "Flexible powertrains designed for efficient, sustainable field mobility." },
  { icon: Factory, title: "Make in India", copy: "Fully designed, engineered, and manufactured in India." },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  usePageTitle("FarmBro Robotics — More acres. Fewer compromises.");
  const { openOrderForm } = useOrderForm();
  const { t } = useLanguage();

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
            <div>
              <SectionKicker number="01" label="The machines" />
              <h2 className="mt-7 text-[clamp(2rem,5.2vw,3.75rem)] font-medium leading-[1.05] tracking-[-.05em]">
                Engineered for the field.
                <br />
                <span className="text-[#1B8F6A]">Built for the mission.</span>
              </h2>
              <p className="mt-5 max-w-[520px] text-base leading-7 text-[#3F4B45]">
                Four purpose-built machines, one command interface. Select a unit to explore its configuration, gallery, and full specification.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {robots.map((robot) => (
                <ProductCard key={robot.id} robot={robot} />
              ))}
            </div>

            {/* Four engineering pillars — below the listing */}
            <div className="mt-20">
              <div className="tf-mono text-[10px] uppercase tracking-[.16em] text-[#64736C]">Four engineering pillars</div>
              <h3 className="mt-3 max-w-[460px] text-3xl font-medium leading-[1.02] tracking-[-.04em] sm:text-4xl">Built on proven foundations.</h3>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {pillars.map((pillar) => (
                  <div key={pillar.title} className="product-card p-7">
                    <pillar.icon size={19} className="text-[#1B8F6A]" />
                    <h4 className="mt-5 text-lg font-medium leading-snug">{pillar.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-[#59655F]">{pillar.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 02 — Why FarmBro: bento grid */}
        <section className="tf-surface py-20 sm:py-24" id="why">
          <div className="tf-container">
            <SectionKicker number="02" label="Why FarmBro" />
            <h2 className="mt-7 max-w-[460px] text-4xl font-medium leading-[.98] tracking-[-.055em] sm:text-6xl">Why FarmBro.</h2>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Anchor cell — the positioning statement */}
              <div className="relative overflow-hidden bg-[#1B8F6A] p-8 text-white shadow-[0_18px_50px_rgba(27,143,106,.24)] transition-transform duration-300 hover:-translate-y-1 sm:row-span-2">
                <CircleDot size={20} className="text-white/85" />
                <h3 className="mt-16 text-2xl font-medium leading-tight tracking-[-.03em] sm:mt-28">{whyFarmBro[0].title}</h3>
                <p className="mt-3 max-w-[260px] text-sm leading-6 text-white/85">{whyFarmBro[0].copy}</p>
              </div>

              {whyFarmBro.slice(1, 5).map((item) => (
                <div key={item.title} className="product-card p-7">
                  <item.icon size={19} className="text-[#1B8F6A]" />
                  <h3 className="mt-5 text-lg font-medium leading-snug">{item.title}</h3>
                  <p className="mt-2 max-w-[320px] text-sm leading-6 text-[#59655F]">{item.copy}</p>
                </div>
              ))}

              {/* Closing wide cell — the closer */}
              <div className="product-card flex flex-col gap-5 p-7 sm:col-span-2 sm:flex-row sm:items-center sm:p-8 lg:col-span-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1B8F6A] text-white">
                  <Factory size={19} />
                </span>
                <div>
                  <h3 className="text-lg font-medium sm:text-xl">{whyFarmBro[5].title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#59655F]">{whyFarmBro[5].copy}</p>
                </div>
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
