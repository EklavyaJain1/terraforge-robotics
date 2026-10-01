import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MoveUpRight, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import usePageTitle from "@/hooks/usePageTitle";
import { attachments, formatINR, robots, type RobotId } from "@/data/catalog";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const giantWord: Record<RobotId, string> = {
  "mulcher-hybrid": "Hybrid",
  "mulcher-sprayer-cargo": "6×6",
  "mini-mulcher-electric": "Mini",
  "canopy-scout": "Scout",
};

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
  const { addItem, openCheckout } = useCart();
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
  // One row per gallery frame: the statement from the highlights, with the
  // matching spec as its support line. The closing frame carries the tagline.
  const frames = robot.gallery.map((src, index) => ({
    src,
    index,
    title: m.highlights[index] ?? m.tagline,
    spec: m.highlights[index] ? m.specs[index] : undefined,
  }));

  /** Direct buy: the machine lands in the cart and the drawer opens on checkout. */
  const buyNow = () => {
    addItem("robot", robot.id);
    openCheckout();
  };

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

          <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-28 pt-28 sm:px-10 lg:px-14 lg:pb-24">
            {m.badge && <p className="tf-mono mb-4 text-[#B9F4D4]">{m.badge}</p>}
            <h1 className="pd-hero-title max-w-4xl text-5xl font-medium uppercase leading-[0.88] tracking-[-.05em] sm:text-7xl lg:text-[6.2vw]">
              {m.tagline}
            </h1>
            <p className="tf-mono mt-6 text-[#B9F4D4]">{m.name}</p>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75">{m.body}</p>
            <p className="mt-7 text-2xl font-medium tabular-nums text-white">{formatINR(robot.price * 100)}</p>
          </div>
        </section>

        {/* Why operators pick it — centered statement, every image left, copy top-aligned beside it.
            Each element slides in from its own side of the row as it enters the viewport. */}
        <section className="bg-[#111311] py-20 sm:py-28">
          <motion.div
            className="tf-container mb-14 flex flex-col items-center text-center sm:mb-20"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-.05em] sm:text-6xl">
              {t.pdWhyKicker}
            </h2>
          </motion.div>
          <div className="tf-container flex flex-col gap-20 sm:gap-28">
            {frames.map((frame) => (
              <div
                key={`${frame.src}-${frame.index}`}
                className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14"
              >
                <motion.figure
                  initial={{ opacity: 0, x: -64 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative h-[300px] w-full overflow-hidden sm:h-[440px] lg:h-[540px]"
                >
                  <FrameMedia
                    src={frame.src}
                    alt={t.pdImageAlt.replace("{name}", m.name).replace("{n}", String(frame.index + 1))}
                    className="h-full w-full object-cover"
                  />
                </motion.figure>
                <motion.div
                  initial={{ opacity: 0, x: 64 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:pt-1"
                >
                  <h3 className="text-balance text-3xl font-semibold leading-[1.05] tracking-[-.04em] sm:text-4xl">
                    {frame.title}
                  </h3>
                  {frame.spec && (
                    <p className="mt-5 text-lg leading-7 text-white/65">
                      <span className="tf-mono mr-3 text-[10px] text-[#B9F4D4]">{frame.spec[0]}</span>
                      {frame.spec[1]}
                    </p>
                  )}
                </motion.div>
              </div>
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
            <dl className="border-t-4 border-white">
              {m.specs.map(([label, value], i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="grid gap-2 border-b border-white/15 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline"
                >
                  <dt className="tf-mono text-white/45">{label}</dt>
                  <dd className="text-lg font-medium tabular-nums sm:text-right">{value}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </section>

        {/* Attachments — centered headline, add-to-cart per item */}
        <section className="pb-20 sm:pb-28">
          <div className="tf-container">
            <div className="pd-reveal mb-10 flex flex-col items-center text-center">
              <h2 className="text-3xl font-medium tracking-tight">{t.attachmentsKicker}</h2>
              <span className="tf-mono mt-3 text-white/40">{t.attachmentsFitNote}</span>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {attachments.map((item) => {
                const a = t.attachments[item.id];
                return (
                  <div
                    key={item.id}
                    className="pd-reveal flex min-h-64 flex-col justify-between border border-white/10 bg-[#17201B] p-8 transition-colors duration-300 hover:border-[#1B8F6A]/60"
                  >
                    <div>
                      <p className="tf-mono text-[#1B8F6A]">{item.number}</p>
                      <h3 className="mt-4 text-3xl font-medium">{a.name}</h3>
                      <p className="mt-3 max-w-sm text-white/55">{a.copy}</p>
                    </div>
                    <div className="mt-8 flex items-center justify-between gap-4">
                      <div>
                        <span className="block text-sm font-semibold tabular-nums">{formatINR(item.price * 100)}</span>
                        <span className="tf-mono text-[10px] text-white/40">{a.stat}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => addItem("attachment", item.id)}
                        className="tf-btn tf-btn-primary shrink-0 min-h-[40px] px-4 text-xs"
                      >
                        <ShoppingCart size={14} /> {t.cardAddToCart}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Place order — the page's buy step, sitting right after specifications and attachments */}
        <section id="place-order" className="pb-20 sm:pb-28">
          <div className="tf-container">
            <div className="pd-reveal grid gap-10 border border-white/15 bg-[#17201B] p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="tf-mono text-[10px] text-[#B9F4D4]">{t.pdPlaceKicker}</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-.04em] sm:text-4xl">{t.pdPlaceHeading}</h2>
                <p className="mt-4 max-w-lg leading-7 text-white/60">{t.pdPlaceSub}</p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-4">
                  <span className="tf-mono text-[10px] text-white/45">{t.configLabel}</span>
                  <span className="text-white/80">{m.configuration}</span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="tf-mono text-[10px] text-white/45">{m.tier}</span>
                  <span className="text-3xl font-medium tabular-nums">{formatINR(robot.price * 100)}</span>
                </div>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <button type="button" onClick={buyNow} className="tf-btn tf-btn-primary flex-1">
                    {t.cardOrderNow}
                  </button>
                  <button
                    type="button"
                    onClick={() => addItem("robot", robot.id)}
                    className="tf-btn flex-1 border border-white/25 bg-transparent text-white hover:bg-white/10"
                  >
                    <ShoppingCart size={15} /> {t.cardAddToCart}
                  </button>
                </div>
                <a
                  href="https://wa.me/919401352202"
                  target="_blank"
                  rel="noreferrer"
                  className="tf-focus text-sm text-white/55 underline-offset-4 hover:text-white hover:underline"
                >
                  {t.whatsappCta}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ — centered headline */}
        <section className="bg-[#111311] py-20 sm:py-28">
          <div className="tf-container">
            <div className="pd-reveal mb-12 flex flex-col items-center text-center">
              <h2 className="text-4xl font-medium tracking-tight sm:text-5xl">
                {t.faqHeadingA} {t.faqHeadingB}
              </h2>
            </div>
            <div className="mx-auto max-w-[760px]">
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
              <p className="mt-3 max-w-xl text-lg text-white/80">{t.pdOrderSub}</p>
            </div>
            <div className="flex flex-col gap-4">
              <a href="tel:+919401352202" className="whitespace-nowrap text-xl font-medium tabular-nums">
                +91 94013 52202
              </a>
              <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
                <a href="https://wa.me/919401352202" target="_blank" rel="noreferrer" className="tf-btn border border-white/40 bg-white/10 text-white">
                  {t.whatsappCta}
                </a>
                <Link href="/farmbro" className="tf-btn bg-white text-[#1B8F6A] hover:bg-[#B9F4D4]">
                  {t.cardOrderNow}
                </Link>
              </div>
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
        <div className="flex gap-3">
          <button type="button" onClick={() => addItem("robot", robot.id)} className="tf-btn w-full border border-white/25 bg-transparent text-white hover:bg-white/10">
            <ShoppingCart size={15} /> {t.cardAddToCart}
          </button>
          <Link href="/farmbro" className="tf-btn tf-btn-primary w-full">
            {t.cardOrderNow}
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
