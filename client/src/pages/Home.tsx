import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Blocks, Check, ChevronDown, CircleDot, Cpu, Factory, Footprints, Globe, Layers, PlugZap, Radar } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import SectionKicker from "@/components/SectionKicker";
import { useOrderForm } from "@/contexts/OrderContext";
import { useLanguage } from "@/contexts/LanguageContext";
import usePageTitle from "@/hooks/usePageTitle";
import { robots } from "@/data/catalog";
import { trackSpotlight } from "@/lib/spotlight";

const pillars = [
  { icon: Radar },
  { icon: Footprints },
  { icon: Blocks },
  { icon: PlugZap },
];

const whyIcons = [CircleDot, Layers, Globe, Cpu, PlugZap, Factory];

/** Dashed jade connectors fanning from the centered pillars headline to the four card columns. */
function NetworkLines() {
  const branches = [150, 450, 750, 1050];
  return (
    <svg className="net-lines mx-auto mt-9 hidden h-20 w-full max-w-[1180px] lg:block" viewBox="0 0 1200 80" aria-hidden="true">
      {branches.map((x) => (
        <path key={x} d={`M600 0 C600 46 ${x} 34 ${x} 80`} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}

function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  if (window.__lenis) window.__lenis.scrollTo(target, { offset: -64 });
  else target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const { t } = useLanguage();
  usePageTitle(t.homeTitle);
  const { openOrderForm } = useOrderForm();

  // Light parallax: the hero film drifts up slightly slower than the page scrolls.
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroVideoY = useTransform(heroProgress, [0, 1], ["0%", "10%"]);

  // The jade highlight sweeps across "Why FarmBro." as the section scrolls into view.
  // Driven by a direct rAF scroll listener: deterministic under Lenis, no re-renders.
  const sweepRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = sweepRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.backgroundSize = "100% 100%";
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.9; // highlight begins as the heading enters the viewport
      const end = vh * 0.45;  // and completes as it climbs toward mid-screen
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      el.style.backgroundSize = `${progress * 100}% 100%`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div id="top" className="tf-page">
      <Navbar />

      <main>
        {/* Hero — the field film and the thesis */}
        <section
          ref={heroRef}
          className="tf-scanline relative min-h-[720px] overflow-hidden border-b border-white/10 bg-[#111311] text-white sm:min-h-[860px] lg:min-h-[100svh]"
          aria-label="FarmBro Robotics introduction"
        >
          <motion.video
            autoPlay loop muted playsInline
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={{ y: heroVideoY, scale: 1.1 }}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </motion.video>
          <div className="hero-fade absolute inset-0" />

          <div className="tf-container relative flex min-h-[720px] flex-col justify-end pb-32 pt-32 sm:min-h-[860px] sm:pb-40 lg:min-h-[100svh]">
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

          <button
            type="button"
            onClick={() => scrollToId("machines")}
            className="tf-focus absolute bottom-10 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-white/70 lg:flex"
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
              <SectionKicker number="01" label={t.machinesKicker} />
              <h2 className="mt-7 text-[clamp(1.7rem,5.2vw,3.75rem)] font-medium leading-[1.05] tracking-[-.05em]">
                {t.machinesTitleA}
                <br />
                <span className="text-[#1B8F6A]">{t.machinesTitleB}</span>
              </h2>
              <p className="mt-5 max-w-[520px] text-base leading-7 text-[#3F4B45]">
                {t.machinesSub}
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {robots.map((robot) => (
                <ProductCard key={robot.id} robot={robot} />
              ))}
            </div>

            {/* Four engineering pillars — centered headline, network lines down to the cards */}
            <div className="mt-20">
              <div className="text-center">
                <div className="tf-mono text-[10px] uppercase tracking-[.16em] text-[#64736C]">{t.pillarsKicker}</div>
                <h3 className="mx-auto mt-3 max-w-[460px] text-3xl font-medium leading-[1.02] tracking-[-.04em] sm:text-4xl">{t.pillarsHeading}</h3>
              </div>
              <NetworkLines />
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {pillars.map((pillar, index) => (
                  <motion.div
                    key={t.pillars[index].title}
                    onPointerMove={trackSpotlight}
                    className="product-card p-7"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <pillar.icon size={19} className="text-[#1B8F6A]" />
                    <h4 className="mt-5 text-lg font-medium leading-snug">{t.pillars[index].title}</h4>
                    <p className="mt-2 text-sm leading-6 text-[#59655F]">{t.pillars[index].copy}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 02 — Why FarmBro: bento grid */}
        <section className="tf-surface border-b border-[#111311]/12 py-20 sm:py-24" id="why">
          <div className="tf-container">
            <div className="flex justify-center">
              <SectionKicker number="02" label={t.whyKicker} />
            </div>
            <h2 className="mt-7 text-center text-4xl font-medium leading-[.98] tracking-[-.055em] sm:text-6xl">
              <motion.span
                ref={sweepRef}
                className="bg-[linear-gradient(to_right,rgba(27,143,106,.16),rgba(27,143,106,.16))] bg-no-repeat px-2"
                style={{ backgroundSize: "0% 100%" }}
              >
                {t.whyHeading}
              </motion.span>
            </h2>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Anchor cell — the positioning statement */}
              <div className="relative overflow-hidden bg-[#1B8F6A] p-8 text-white shadow-[0_18px_50px_rgba(27,143,106,.24)] transition-transform duration-300 hover:-translate-y-1 sm:row-span-2">
                <CircleDot size={20} className="text-white/85" />
                <h3 className="mt-16 text-2xl font-medium leading-tight tracking-[-.03em] sm:mt-28">{t.whyItems[0].title}</h3>
                <p className="mt-3 max-w-[260px] text-sm leading-6 text-white/85">{t.whyItems[0].copy}</p>
              </div>

              {t.whyItems.slice(1, 5).map((item, i) => {
                const Icon = whyIcons[i + 1];
                return (
                  <div key={item.title} onPointerMove={trackSpotlight} className="product-card p-7">
                    <Icon size={19} className="text-[#1B8F6A]" />
                    <h3 className="mt-5 text-lg font-medium leading-snug">{item.title}</h3>
                    <p className="mt-2 max-w-[320px] text-sm leading-6 text-[#59655F]">{item.copy}</p>
                  </div>
                );
              })}

              {/* Closing wide cell — centered icon above centered copy */}
              <div onPointerMove={trackSpotlight} className="product-card flex flex-col items-center gap-4 p-8 text-center sm:col-span-2 lg:col-span-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1B8F6A] text-white">
                  <Factory size={19} />
                </span>
                <div>
                  <h3 className="text-lg font-medium sm:text-xl">{t.whyItems[5].title}</h3>
                  <p className="mx-auto mt-1 max-w-[440px] text-sm leading-6 text-[#59655F]">{t.whyItems[5].copy}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03 — Make it practical */}
        <section id="order" className="relative overflow-hidden border-b border-white/15 bg-[#1B8F6A] py-20 text-white sm:py-24">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[40px] border-white/10" />
          <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full border-[1px] border-white/15" />
          <div className="tf-container relative">
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
              <div>
                <SectionKicker number="03" label={t.orderKicker} light />
                <h2 className="mt-7 max-w-[480px] text-4xl font-medium leading-[.96] tracking-[-.055em] sm:text-6xl">{t.orderHeading}</h2>
              </div>
              <div className="flex flex-col items-start justify-center gap-6">
                <button type="button" onClick={() => openOrderForm()} className="tf-btn tf-btn-quiet text-sm">
                  {t.orderCta} <ArrowUpRight size={15} />
                </button>
                <div className="grid w-full gap-px border border-white/20 bg-white/20 sm:grid-cols-3">
                  <a href="tel:+919154153925" className="tf-focus bg-[#1B8F6A] px-4 py-4 transition-colors hover:bg-[#0F6F51]">
                    <span className="tf-mono block text-[9px] text-white/60">{t.orderCallLabel}</span>
                    <span className="mt-1 block text-sm font-medium">+91 91541 53925</span>
                  </a>
                  <a href="https://wa.me/919154153925" target="_blank" rel="noreferrer" className="tf-focus bg-[#1B8F6A] px-4 py-4 transition-colors hover:bg-[#0F6F51]">
                    <span className="tf-mono block text-[9px] text-white/60">{t.orderWhatsappLabel}</span>
                    <span className="mt-1 block text-sm font-medium">{t.whatsappCta}</span>
                  </a>
                  <a href="mailto:hello@farmbro.example" className="tf-focus bg-[#1B8F6A] px-4 py-4 transition-colors hover:bg-[#0F6F51]">
                    <span className="tf-mono block text-[9px] text-white/60">{t.orderEmailLabel}</span>
                    <span className="mt-1 block text-sm font-medium">hello@farmbro.example</span>
                  </a>
                </div>
                <p className="flex items-center gap-2 text-base font-medium text-white">
                  <Check size={16} className="shrink-0" />
                  <span className="rounded bg-white/15 px-2.5 py-1">{t.engineerNote}</span>
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
