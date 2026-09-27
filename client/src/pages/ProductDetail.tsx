import { useRef } from "react";
import { ArrowLeft, MoveUpRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useOrderForm } from "@/contexts/OrderContext";
import { useLanguage } from "@/contexts/LanguageContext";
import usePageTitle from "@/hooks/usePageTitle";
import { attachments, robots, type RobotId } from "@/data/catalog";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const giantWord: Record<RobotId, string> = {
  "mulcher-hybrid": "Hybrid",
  "mulcher-sprayer-cargo": "6×6",
  "mini-mulcher-electric": "45°",
  "canopy-scout": "Scout",
};

const buyerChoice = ["", "fleet", "gov-civil"] as const;

function isVideo(src: string) {
  return src.endsWith(".mp4");
}

function FrameMedia({ src, alt, className }: { src: string; alt: string; className: string }) {
  if (isVideo(src)) {
    return <video src={src} className={className} autoPlay muted loop playsInline />;
  }
  return <img src={src} alt={alt} className={className} />;
}

export default function ProductDetail() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();
  const { openOrderForm } = useOrderForm();
  const { t } = useLanguage();
  const robot = robots.find((r) => r.slug === location.split("/").pop());
  const m = robot ? t.machines[robot.id] : undefined;

  usePageTitle(robot && m ? `${m.name} — FarmBro` : t.pdNotFoundTitle);

  useGSAP(
    () => {
      if (!robot || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = SplitText.create(".pd-hero-title", {
        type: "words",
        autoSplit: true,
        aria: "auto",
        onSplit(self) {
          return gsap.from(self.words, {
            y: 36,
            autoAlpha: 0,
            stagger: 0.035,
            duration: 0.7,
            ease: "power3.out",
          });
        },
      });

      gsap.from(".pd-glass", {
        x: 56,
        autoAlpha: 0,
        duration: 0.85,
        delay: 0.15,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>(".pd-reveal").forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
          },
        });
      });

      gsap.to(".pd-giant", {
        xPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: ".pd-giant-wrap",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      return () => split.revert();
    },
    { scope: rootRef, dependencies: [robot?.id], revertOnUpdate: true },
  );

  if (!robot || !m) {
    return (
      <div ref={rootRef} className="tf-page bg-[#111311] text-white">
        <Navbar />
        <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 pt-[72px] text-center">
          <p className="tf-mono text-[10px] uppercase tracking-[.14em] text-white/50">{t.pdMissingKicker}</p>
          <h1 className="max-w-[420px] text-4xl font-medium tracking-[-.05em] sm:text-5xl">{t.pdMissingHeading}</h1>
          <Link href="/farmbro" className="tf-btn tf-btn-primary">
            <ArrowLeft size={15} /> {t.pdMissingCta}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const heroSrc = robot.hoverVideo ?? robot.image;
  const related = robots.filter((r) => r.id !== robot.id);
  const frames = robot.gallery.map((src, index) => ({
    src,
    index,
    title: m.highlights[index] ?? m.specs[index]?.[0] ?? t.pdShowImage.replace("{n}", String(index + 1)),
    copy: m.highlights[index] ? m.tagline : (m.specs[index]?.[1] ?? m.availability),
  }));

  return (
    <div ref={rootRef} className="tf-page bg-[#111311] pb-20 text-white lg:pb-0">
      <Navbar />
      <main>
        <section className="relative min-h-[100svh] w-full overflow-hidden">
          <FrameMedia
            src={heroSrc}
            alt={m.name}
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111311] via-[#111311]/20 to-[#111311]/40" />

          <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-28 pt-28 sm:px-10 lg:w-[calc(100%-400px)] lg:px-14 lg:pb-24">
            {m.badge && <p className="tf-mono mb-4 text-[#B9F4D4]">{m.badge}</p>}
            <h1 className="pd-hero-title max-w-4xl text-5xl font-medium uppercase leading-[0.88] tracking-[-.05em] sm:text-7xl lg:text-[6.2vw]">
              {m.tagline}
            </h1>
            <p className="tf-mono mt-6 text-[#B9F4D4]">{m.name}</p>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75">{m.body}</p>
          </div>

          <aside className="pd-glass relative z-20 border-t border-white/10 bg-[#111311]/75 px-6 py-8 backdrop-blur-xl sm:px-10 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[400px] lg:border-l lg:border-t-0 lg:px-12 lg:py-0">
            <div className="flex h-full flex-col justify-center gap-8">
              <dl className="grid gap-6">
                {m.specs.map(([label, value]) => (
                  <div key={label}>
                    <dt className="tf-mono mb-2 text-white/40">{label}</dt>
                    <dd className="text-xl font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-sm text-white/70">
                {m.priceLabel}
                <span className="mt-1 block text-white/45">{m.availability}</span>
              </p>
              <div className="flex flex-col gap-3">
                <button type="button" onClick={() => openOrderForm(robot.id)} className="tf-btn tf-btn-primary w-full">
                  {t.cardOrderNow}
                </button>
                <button
                  type="button"
                  onClick={() => openOrderForm(robot.id)}
                  className="tf-btn w-full border border-white/25 bg-transparent text-white hover:bg-white/10"
                >
                  {t.servicesBookTrial}
                </button>
              </div>
            </div>
          </aside>
        </section>

        <section className="bg-[#111311] py-20 sm:py-28">
          <div className="tf-container pd-reveal mb-10">
            <h2 className="text-3xl font-medium tracking-tight">{t.pdWhyKicker}</h2>
          </div>
          <div className="pd-reveal flex gap-6 overflow-x-auto px-6 pb-2 sm:px-10 lg:px-14 [scrollbar-width:none]">
            {frames.map((frame) => (
              <figure key={`${frame.src}-${frame.index}`} className="relative h-[320px] w-[78vw] max-w-[560px] shrink-0 sm:h-[400px]">
                <FrameMedia
                  src={frame.src}
                  alt={t.pdImageAlt.replace("{name}", m.name).replace("{n}", String(frame.index + 1))}
                  className="h-full w-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B0F0D] to-transparent p-6">
                  <span className="tf-mono text-2xl text-[#1B8F6A]">{String(frame.index + 1).padStart(2, "0")}</span>
                  <p className="mt-3 max-w-xs text-lg font-medium leading-snug">{frame.title}</p>
                  <p className="mt-2 max-w-xs text-sm text-white/65">{frame.copy}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="pd-giant-wrap overflow-hidden border-y border-white/10 py-16 sm:py-24">
          <div className="tf-container flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <h2 className="pd-giant text-[22vw] font-medium uppercase leading-none tracking-[-.06em] text-[#1B8F6A] lg:text-[14vw]">
              {giantWord[robot.id]}
            </h2>
            <p className="pd-reveal max-w-md text-2xl font-light leading-relaxed text-white/85">{m.body}</p>
          </div>
        </section>

        <section id="specifications" className="py-20 sm:py-28">
          <div className="tf-container grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="pd-reveal">
              <h2 className="text-4xl font-medium tracking-tight sm:text-5xl">{t.pdSpecsHeading}</h2>
              <p className="mt-4 max-w-sm text-white/55">{t.pdSpecsSub}</p>
            </div>
            <dl className="pd-reveal border-t-4 border-white">
              {m.specs.map(([label, value]) => (
                <div key={label} className="grid gap-2 border-b border-white/15 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline">
                  <dt className="tf-mono text-white/45">{label}</dt>
                  <dd className="text-lg font-medium sm:text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="pb-20 sm:pb-28">
          <div className="tf-container">
            <div className="pd-reveal mb-10 flex items-end justify-between gap-6">
              <h2 className="text-3xl font-medium tracking-tight">{t.attachmentsKicker}</h2>
              <span className="tf-mono text-white/40">{t.attachmentsFitNote}</span>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {attachments.map((item) => {
                const a = t.attachments[item.id];
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => openOrderForm("attach")}
                    className="pd-reveal flex min-h-64 flex-col justify-between border border-white/10 bg-[#17201B] p-8 text-left transition-transform duration-300 hover:-translate-y-1 hover:border-[#1B8F6A]"
                  >
                    <div>
                      <p className="tf-mono text-[#1B8F6A]">{item.number}</p>
                      <h3 className="mt-4 text-3xl font-medium">{a.name}</h3>
                      <p className="mt-3 max-w-sm text-white/55">{a.copy}</p>
                    </div>
                    <div className="mt-8 flex items-end justify-between">
                      <span className="text-sm font-medium">{item.priceLabel}</span>
                      <span className="tf-mono text-white/40">{a.stat}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-3">
          {t.audiences.map((audience, index) => (
            <button
              key={audience.label}
              type="button"
              onClick={() => openOrderForm(buyerChoice[index] || robot.id)}
              className={`pd-reveal flex min-h-[420px] flex-col justify-between p-8 text-left sm:p-12 ${
                index === 1 ? "bg-[#1B8F6A]" : index === 2 ? "bg-[#0B0F0D]" : "bg-[#17201B]"
              }`}
            >
              <div>
                <span className="tf-mono text-white/60">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-4xl font-medium leading-tight">{audience.label}</h3>
                <p className={`mt-4 text-lg leading-relaxed ${index === 1 ? "text-white/85" : "text-white/60"}`}>{audience.copy}</p>
              </div>
              <span className="tf-mono mt-10 inline-flex items-center gap-2">
                {audience.cta} <MoveUpRight size={14} />
              </span>
            </button>
          ))}
        </section>

        <section className="bg-[#111311] py-20 sm:py-28">
          <div className="tf-container grid gap-12 lg:grid-cols-[320px_1fr]">
            <div className="pd-reveal">
              <h2 className="text-5xl font-medium tracking-tight">{t.faqHeadingB}</h2>
              <p className="mt-4 text-white/45">{t.pdSpecsSub}</p>
            </div>
            <div>
              {t.faqs.slice(0, 4).map((item) => (
                <article key={item.q} className="pd-reveal border-t-4 border-white py-8">
                  <h3 className="text-2xl font-medium">{item.q}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-white/60">{item.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#1B8F6A] py-16 text-white sm:py-20">
          <div className="tf-container flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-4xl font-medium tracking-tight sm:text-5xl">{t.pdOrderHeading.replace("{config}", m.configuration)}</h2>
              <p className="mt-3 max-w-xl text-lg text-white/80">{t.pdOrderSub.replace("{availability}", m.availability)}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="tel:+919154153925" className="text-xl font-medium">
                +91 91541 53925
              </a>
              <a href="https://wa.me/919154153925" target="_blank" rel="noreferrer" className="tf-btn border border-white/40 bg-white/10 text-white">
                {t.whatsappCta}
              </a>
              <button type="button" onClick={() => openOrderForm(robot.id)} className="tf-btn bg-white text-[#1B8F6A] hover:bg-[#B9F4D4]">
                {t.cardOrderNow}
              </button>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="tf-container">
            <h2 className="pd-reveal text-3xl font-medium tracking-tight">{t.pdCompareHeading}</h2>
            <div className="mt-8 grid gap-4">
              {related.map((item) => {
                const copy = t.machines[item.id];
                return (
                  <Link key={item.id} href={`/farmbro/${item.slug}`} className="pd-reveal flex items-center gap-5 border border-white/10 bg-[#17201B] p-4">
                    <img src={item.image} alt="" className="h-20 w-28 object-cover" />
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-medium">{copy.name}</h3>
                      <p className="tf-mono mt-1 text-white/45">{copy.configuration}</p>
                    </div>
                    <MoveUpRight className="ml-auto shrink-0" size={16} />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0B0F0D]/90 p-3 backdrop-blur lg:hidden">
        <button type="button" onClick={() => openOrderForm(robot.id)} className="tf-btn tf-btn-primary w-full">
          {t.cardOrderNow}
        </button>
      </div>
      <Footer />
    </div>
  );
}
