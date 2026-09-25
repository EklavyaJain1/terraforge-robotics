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
import { robots, agriImages } from "@/data/catalog";
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
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

      <main className="relative">
        {/* Hero — the field film and the thesis */}
        <section
          ref={heroRef}
          className="tf-scanline sticky top-0 z-0 h-[100svh] min-h-[720px] overflow-hidden border-b border-white/10 bg-[#111311] text-white sm:min-h-[860px]"
          aria-label={t.heroAria}
        >
          <motion.video
            autoPlay loop muted playsInline
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={prefersReducedMotion ? { scale: 1.1 } : { y: heroVideoY, scale: 1.1 }}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </motion.video>
          <div className="hero-fade absolute inset-0" />          <div className="relative flex min-h-[720px] flex-col justify-end px-6 pb-24 pt-32 sm:min-h-[860px] sm:px-10 sm:pb-28 lg:min-h-[100svh] lg:px-14 lg:pb-32">
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
            className="tf-focus absolute bottom-10 left-14 hidden items-center gap-2 text-white/70 lg:flex"
            aria-label={t.scrollAria}
          >
            <span className="tf-mono text-[9px]">{t.scrollHint}</span>
            <ChevronDown size={14} />
          </button>
        </section>

        {/* 01 — The machines: e-commerce cards; every card opens its product page */}
        <section className="tf-surface relative z-10 border-b border-[#111311]/15 bg-[#F5F7F5] py-16 sm:py-20" id="machines">
          <div className="tf-container">
            <motion.div 
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionKicker number="01" label={t.machinesKicker} className="mx-auto" />
              <h2 className="mt-7 max-w-[800px] text-[clamp(1.7rem,5.2vw,3.75rem)] font-medium leading-[1.05] tracking-[-.05em]">
                {t.machinesTitleA}
                <br />
                <span className="text-[#1B8F6A]">{t.machinesTitleB}</span>
              </h2>
              <p className="mt-5 max-w-[520px] text-base leading-7 text-[#3F4B45]">
                {t.machinesSub}
              </p>
            </motion.div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {robots.map((robot, i) => (
                <motion.div
                  key={robot.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProductCard robot={robot} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* In-Field Performance Section */}
        <section className="tf-surface relative z-10 border-b border-[#111311]/15 bg-white py-20 sm:py-28" id="performance">
          <div className="tf-container">
            <motion.div 
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionKicker number="02" label={t.perfKicker} className="mx-auto" />
              <h2 className="mt-7 max-w-[800px] text-[clamp(1.7rem,5.2vw,3.75rem)] font-medium leading-[1.05] tracking-[-.05em]">
                {t.perfHeadingA} <span className="text-[#1B8F6A]">{t.perfHeadingB}</span>
              </h2>
              <p className="mt-5 max-w-[520px] text-base leading-7 text-[#3F4B45]">
                {t.perfSub}
              </p>
            </motion.div>

            <div className="mt-16 grid gap-4 sm:grid-cols-3">
              {[
                { video: "/videos/Farm Bro Remote Controlled Mulcher.mp4" },
                { video: "/videos/farm-bro-sprayer-cargo.mp4" },
                { video: "/videos/farm-bro-canopy-scout.mp4" },
              ].map((item, i) => (
                <motion.div 
                  key={item.video}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-black"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <video
                    src={item.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-medium tracking-tight">{t.perfVideos[i]}</h3>
                    <div className="mt-2 flex items-center gap-2 text-sm text-[#B9F4D4]">
                      <span>{t.perfWatch}</span> <ArrowUpRight size={14} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 03 — Engineering Pillars (Sticky Scroll) */}
        <section id="pillars" className="relative z-10 border-b border-white/10 bg-[#111311] py-20 text-white sm:py-32">
          <div className="tf-container">
            <div className="grid gap-16 lg:grid-cols-2">
              
              {/* Sticky Left Column: Image/Visual */}
              <div className="hidden lg:block">
                <div className="sticky top-24 overflow-hidden rounded-2xl bg-[#17201B]">
                  <img 
                    src={agriImages.wide} 
                    alt="FarmBro Engineering" 
                    className="h-[600px] w-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111311] via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10">
                    <div className="tf-mono text-[10px] uppercase tracking-[.16em] text-[#B9F4D4]">{t.pillarsKicker}</div>
                    <h3 className="mt-3 max-w-[320px] text-3xl font-medium leading-[1.02] tracking-[-.04em]">
                      {t.pillarsHeading}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Scrolling Right Column: Pillar Cards */}
              <div className="flex flex-col gap-12 lg:gap-32 lg:py-32">
                <div className="lg:hidden">
                  <div className="tf-mono text-[10px] uppercase tracking-[.16em] text-[#B9F4D4]">{t.pillarsKicker}</div>
                  <h3 className="mt-3 text-3xl font-medium leading-[1.02] tracking-[-.04em]">{t.pillarsHeading}</h3>
                </div>

                {pillars.map((pillar, index) => (
                  <motion.div
                    key={t.pillars[index].title}
                    className="relative flex flex-col gap-4 border-l-2 border-[#1B8F6A]/30 pl-8 transition-colors hover:border-[#1B8F6A]"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1B8F6A]/10">
                      <pillar.icon size={24} className="text-[#1B8F6A]" />
                    </span>
                    <div>
                      <h4 className="text-2xl font-medium leading-snug">{t.pillars[index].title}</h4>
                      <p className="mt-3 text-base leading-7 text-white/70">{t.pillars[index].copy}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </section>


        {/* 02 — Why FarmBro: bento grid */}
        <section className="tf-surface relative z-10 border-b border-[#111311]/12 bg-white py-20 sm:py-24" id="why">
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

        {/* Our Mission */}
        <section className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center overflow-hidden bg-[#111311] py-24 text-center sm:py-32">
          <div className="absolute inset-0">
            <img src={agriImages.farmx} alt="Mission Background" className="h-full w-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111311] via-[#111311]/50 to-[#111311]" />
          </div>
          <div className="tf-container relative z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionKicker number="03" label="Company" light className="mx-auto" />
              <h2 className="mt-6 text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-none tracking-[-.04em] text-white uppercase">
                {t.missionKicker}
              </h2>
              <p className="mx-auto mt-8 max-w-[1200px] text-[clamp(1.15rem,2.2vw,2.25rem)] font-medium leading-[1.4] tracking-wide text-white/90">
                {t.missionHeadingA} <span className="text-[#B9F4D4]">{t.missionHighlight}</span>{t.missionHeadingB}
              </p>
            </motion.div>
          </div>
        </section>

        {/* 04 — Make it practical */}
        <section id="order" className="relative z-10 overflow-hidden border-b border-white/15 bg-[#1B8F6A] py-20 text-white sm:py-24">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[40px] border-white/10" />
          <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full border-[1px] border-white/15" />
          <div className="tf-container relative">
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
              <div>
                <SectionKicker number="03" label={t.orderKicker} light />
                <h2 className="mt-7 max-w-[480px] text-4xl font-medium leading-[.96] tracking-[-.055em] sm:text-6xl">{t.orderHeading}</h2>
              </div>
              <div className="flex flex-col items-start justify-center gap-6">
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
                <div className="flex flex-wrap items-center gap-4">
                  <button type="button" onClick={() => openOrderForm()} className="tf-btn tf-btn-quiet text-sm">
                    {t.orderCta} <ArrowUpRight size={15} />
                  </button>
                  <p className="flex items-center gap-2 text-base font-medium text-white">
                    <Check size={16} className="shrink-0" />
                    <span className="rounded bg-white/15 px-2.5 py-1">{t.engineerNote}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="relative z-10 border-b border-[#111311]/10 bg-[#F5F7F5] py-20 sm:py-28">
          <div className="tf-container max-w-[800px]">
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionKicker number="05" label={t.faqKicker} className="mx-auto" />
              <h2 className="mt-7 text-[clamp(1.7rem,5.2vw,3.75rem)] font-medium leading-[1.05] tracking-[-.05em]">
                {t.faqHeadingA} <span className="text-[#1B8F6A]">{t.faqHeadingB}</span>
              </h2>
            </motion.div>

            <div className="mt-14 flex flex-col gap-3">
              {t.faqs.map((item, i) => (
                <motion.details
                  key={i}
                  className="group rounded-xl border border-[#111311]/10 bg-white px-6 py-5 transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] [&[open]]:shadow-[0_4px_20px_rgba(27,143,106,0.08)]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <summary className="flex cursor-pointer items-center justify-between text-base font-medium leading-snug text-[#111311] sm:text-lg [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <ChevronDown size={18} className="shrink-0 text-[#1B8F6A] transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-[#59655F] sm:text-base">{item.a}</p>
                </motion.details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />


    </div>
  );
}
