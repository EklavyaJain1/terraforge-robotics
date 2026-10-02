import { useRef } from "react";
import {
  ArrowLeft, Container, FileText, Layers, Mountain, MoveUpRight, Radar, Radio, ScanEye, ShoppingCart, Sprout, Truck, Wrench, Zap, type LucideIcon,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { FeatureRows, type FeatureRow } from "@/components/ui/feature-rows";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import usePageTitle from "@/hooks/usePageTitle";
import { attachments, formatINR, robots, type RobotId } from "@/data/catalog";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/** One icon per spec row, in catalog order — kept per machine so translated
    spec labels can never break the icon match. */
const whyIcons: Record<RobotId, LucideIcon[]> = {
  "mulcher-hybrid": [Truck, Zap, Radio, Sprout],
  "mulcher-sprayer-cargo": [Truck, Radio, Layers, Container],
  "mini-mulcher-electric": [Truck, Zap, Radio, Mountain],
  "canopy-scout": [Radar, Radio, ScanEye, FileText],
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

      // Why-operators rows: the frame rises while its media settles from a
      // slight zoom, then the text children cascade in — one timeline per row.
      gsap.utils.toArray<HTMLElement>(".fr-row").forEach((row) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 78%" },
        });
        const media = row.querySelector(".fr-media");
        if (media) {
          tl.from(media, { y: 48, opacity: 0, duration: 0.9, ease: "power3.out" }, 0);
          const inner = media.querySelector("img, video");
          if (inner) tl.from(inner, { scale: 1.15, duration: 1.2, ease: "power3.out" }, 0);
        }
        tl.from(
          row.querySelectorAll(".fr-reveal"),
          { y: 28, opacity: 0, duration: 0.7, stagger: 0.09, ease: "power3.out" },
          0.15,
        );
      });

      // Hairline rules between rows draw themselves from the left.
      gsap.utils.toArray<HTMLElement>(".fr-sep").forEach((sep) => {
        gsap.from(sep, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: sep, start: "top 94%" },
        });
      });

      // Specification rows rise one by one as the list scrolls through.
      gsap.utils.toArray<HTMLElement>(".spec-row").forEach((el) => {
        gsap.from(el, {
          y: 24,
          opacity: 0,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%" },
        });
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
  // One row per highlight: the claim, the published spec figure that backs it,
  // and a frame from the gallery. All four come straight from the catalog.
  const whyRows: FeatureRow[] = m.highlights.map((title, index) => {
    const [label, value] = m.specs[index] ?? [m.tier, m.configuration];
    return {
      id: `${robot.id}-${index}`,
      eyebrow: label,
      title,
      value,
      media: robot.gallery[index] ?? robot.image,
      mediaAlt: t.pdImageAlt.replace("{name}", m.name).replace("{n}", String(index + 1)),
      caption: m.shortName ?? m.name,
      Icon: whyIcons[robot.id][index] ?? Wrench,
      cta: { label: t.pdViewSpecs, href: "#specifications" },
    };
  });

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

        {/* Why operators pick it — alternating claim/figure rows (21st.dev features-2
            pattern, restyled to the FarmBro dark surface). One row per highlight. */}
        <FeatureRows kicker={m.tier} heading={t.pdWhyKicker} rows={whyRows} className="pb-24 sm:pb-32" />

        <section id="specifications" className="border-t border-white/10 py-20 sm:py-28">
          <div className="tf-container">
            <div className="pd-reveal mx-auto mb-12 flex max-w-2xl flex-col items-center text-center sm:mb-16">
              <h2 className="text-balance text-4xl font-medium tracking-tight sm:text-5xl">{t.pdSpecsHeading}</h2>
              <p className="mt-4 max-w-md text-pretty text-white/55">{t.pdSpecsSub}</p>
            </div>
            <dl className="pd-reveal mx-auto max-w-[820px] border-t-4 border-white pt-10">
              {m.specs.map(([label, value]) => (
                <div
                  key={label}
                  className="spec-row grid gap-2 border-b border-white/15 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline"
                >
                  <dt className="tf-mono text-white/45">{label}</dt>
                  <dd className="text-lg font-medium tabular-nums sm:text-right">{value}</dd>
                </div>
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
