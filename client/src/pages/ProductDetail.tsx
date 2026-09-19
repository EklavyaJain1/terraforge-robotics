import { useState } from "react";
import { ArrowLeft, BookOpenIcon, Check, ChevronLeft, ChevronRight, LinkIcon, MoveUpRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionKicker from "@/components/SectionKicker";
import { Card, CardContent } from "@/components/ui/card";
import BentoGallery, { type BentoCard } from "@/components/ui/bento-gallery";
import FillButton from "@/components/ui/fill-button";
import { useOrderForm } from "@/contexts/OrderContext";
import { useLanguage } from "@/contexts/LanguageContext";
import usePageTitle from "@/hooks/usePageTitle";
import { robots } from "@/data/catalog";
import { motion } from "framer-motion";

/** Highlight card — the v-card-15 pattern in FarmBro's jade-on-ivory theme. */
function HighlightCard({ index, label, copy, visit }: { index: string; label: string; copy: string; visit: string }) {
  return (
    <Card className="product-card w-full gap-0 rounded-none border-[#111311]/15 bg-white p-0 shadow-[0_14px_34px_rgba(17,19,17,.08)] transition-transform duration-300 ease-out hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="border-b border-[#111311]/12 px-4 py-3">
          <div className="flex items-center gap-2 text-[#3F4B45] [&_svg]:size-4 [&_svg]:text-[#1B8F6A]">
            <BookOpenIcon aria-hidden="true" />
            <span className="tf-mono text-[10px] uppercase tracking-[.14em]">{index}</span>
            <span className="text-sm font-medium text-[#111311]">{label}</span>
          </div>
        </div>
        <div className="space-y-3 p-4">
          <p className="text-sm leading-relaxed text-[#59655F]">{copy}</p>
          <a
            className="group/link inline-flex items-center gap-1 text-xs font-medium text-[#1B8F6A] hover:underline"
            href="#specifications"
          >
            <LinkIcon aria-hidden="true" className="size-2.5 shrink-0 transition-transform duration-200 group-hover/link:translate-x-0.5" />
            {visit}
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProductDetail() {
  const [location] = useLocation();
  const { openOrderForm } = useOrderForm();
  const { t } = useLanguage();
  const robot = robots.find((r) => r.slug === location.split("/").pop());
  const m = robot ? t.machines[robot.id] : undefined;
  const [activeImage, setActiveImage] = useState(0);

  usePageTitle(robot && m ? `${m.name} — FarmBro` : t.pdNotFoundTitle);

  if (!robot || !m) {
    return (
      <div className="tf-page">
        <Navbar />
        <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 pt-[72px] text-center">
          <p className="tf-mono text-[10px] uppercase tracking-[.14em] text-[#64736C]">{t.pdMissingKicker}</p>
          <h1 className="max-w-[420px] text-4xl font-medium tracking-[-.05em] sm:text-5xl">{t.pdMissingHeading}</h1>
          <Link href="/farmbro" className="tf-btn tf-btn-primary">
            <ArrowLeft size={15} /> {t.pdMissingCta}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const related = robots.filter((r) => r.id !== robot.id);

  const bentoCards: BentoCard[] = robot.gallery.map((src, index) => ({
    id: index + 1,
    thumbnail: src,
    alt: t.pdImageAlt.replace("{name}", m.name).replace("{n}", String(index + 1)),
    className: index % 3 === 0 ? "sm:col-span-2 h-[260px] sm:h-[320px]" : "h-[260px] sm:h-[320px]",
    content: (
      <p className="tf-mono text-[10px] uppercase tracking-[.16em] text-white/85">
        {t.pdShowImage.replace("{n}", String(index + 1))}
      </p>
    ),
  }));

  return (
    <div className="tf-page">
      <Navbar />
      <main className="pt-[72px]">
        {/* Breadcrumb */}
        <div className="tf-container pt-10">
          <nav aria-label={t.pdBreadAria} className="flex items-center gap-2 text-[11px] text-[#64736C]">
            <Link href="/farmbro" className="tf-focus hover:text-[#1B8F6A]">{t.pdStore}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#111311]">{m.configuration}</span>
          </nav>
        </div>

        {/* Hero: configuration chip, name, description, CTAs — left. Carousel — right. */}
        <section className="tf-container grid items-start gap-10 pt-8 pb-16 sm:pt-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-14">
          <div>
            <span className="tf-mono inline-flex items-center gap-2 rounded-full border border-[#111311]/15 px-3 py-1.5 text-[10px] uppercase tracking-[.16em] text-[#3F4B45]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1B8F6A]" aria-hidden="true" />
              {m.tier}
            </span>
            <h1 className="mt-6 max-w-[520px] text-4xl font-medium leading-[1.02] tracking-[-.04em] sm:text-6xl">{m.name}</h1>
            <p className="tf-mono mt-5 text-sm italic tracking-[.08em] text-[#1B8F6A]">{t.configLabel} {m.configuration}</p>
            {m.valueNote && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 flex items-center gap-3"
              >
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1B8F6A] opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#1B8F6A]"></span>
                </span>
                <span className="text-sm font-medium leading-relaxed text-[#1B8F6A]">{m.valueNote}</span>
              </motion.div>
            )}
            <p className="mt-6 max-w-[480px] text-base leading-7 text-[#3F4B45]">{m.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <FillButton type="button" onClick={() => openOrderForm(robot.id)}>
                {t.cardOrderNow} <MoveUpRight size={15} />
              </FillButton>
              <a href="#specifications" className="tf-btn tf-btn-outline">{t.pdViewSpecs}</a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[#111311]/12 pt-6 text-sm text-[#3F4B45]">
              <span className="font-medium">{m.priceLabel}</span>
              <span className="text-[12px] text-[#59655F]">{m.availability}</span>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#17201B]">
              {robot.gallery[activeImage].endsWith(".mp4") ? (
                <video
                  src={robot.gallery[activeImage]}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={robot.gallery[activeImage]}
                  alt={t.pdImageAlt.replace("{name}", m.name).replace("{n}", String(activeImage + 1))}
                  fetchPriority="high"
                  decoding="sync"
                  className="h-full w-full object-cover"
                />
              )}
              <button
                type="button"
                aria-label={t.pdPrevImage}
                onClick={() => setActiveImage((activeImage - 1 + robot.gallery.length) % robot.gallery.length)}
                className="tf-focus absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#111311] shadow-md transition-transform duration-200 hover:scale-105 hover:bg-white"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label={t.pdNextImage}
                onClick={() => setActiveImage((activeImage + 1) % robot.gallery.length)}
                className="tf-focus absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#111311] shadow-md transition-transform duration-200 hover:scale-105 hover:bg-white"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            {/* Thumbnails — the e-commerce gallery strip */}
            <div className="mt-3 grid grid-cols-4 gap-3">
              {robot.gallery.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={t.pdShowImage.replace("{n}", String(index + 1))}
                  aria-pressed={activeImage === index}
                  className={`tf-focus aspect-[4/3] overflow-hidden border-2 transition-all duration-200 hover:-translate-y-0.5 ${
                    activeImage === index ? "border-[#1B8F6A]" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  {src.endsWith(".mp4") ? (
                    <video src={src} autoPlay loop muted playsInline className="h-full w-full object-cover" />
                  ) : (
                    <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Highlights — v-card-15 pattern cards */}
        <section className="border-y border-[#111311]/12 bg-[#FAFAF7] py-14">
          <div className="tf-container">
            <SectionKicker number="01" label={t.pdWhyKicker} />
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {m.highlights.map((highlight, i) => (
                <HighlightCard
                  key={highlight}
                  index={String(i + 1).padStart(2, "0")}
                  label={t.pdHighlightLabel.replace("{n}", String(i + 1))}
                  copy={highlight}
                  visit={t.cardVisit}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section id="specifications" className="py-16 sm:py-20">
          <div className="tf-container grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
            <div>
              <SectionKicker number="02" label={t.pdSpecsKicker} />
              <h2 className="mt-7 max-w-[320px] text-4xl font-medium leading-[.98] tracking-[-.05em]">{t.pdSpecsHeading}</h2>
              <p className="mt-5 max-w-[300px] text-sm leading-6 text-[#59655F]">{t.pdSpecsSub}</p>
            </div>
            <dl className="border-t border-[#111311]/15">
              {m.specs.map(([label, value]) => (
                <div key={label} className="tf-row-link grid grid-cols-[1fr_auto] gap-6 border-b border-[#111311]/15 py-5 transition-transform duration-300 ease-out hover:translate-x-1.5">
                  <dt className="tf-mono text-[10px] uppercase tracking-[.14em] text-[#64736C]">{label}</dt>
                  <dd className="text-right text-base font-medium text-[#111311]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Gallery — hover-only bento grid */}
        <section className="border-y border-[#111311]/12 bg-[#FAFAF7] py-16 sm:py-20">
          <div className="tf-container">
            <SectionKicker number="03" label={t.pdGalleryKicker} />
            <h2 className="mt-7 max-w-[420px] text-4xl font-medium leading-[.98] tracking-[-.05em]">{t.galleryHeading}</h2>
            <div className="mt-10">
              <BentoGallery cards={bentoCards} />
            </div>
          </div>
        </section>

        {/* Order strip */}
        <section className="tf-dark py-16 sm:py-20">
          <div className="tf-container flex flex-col items-start justify-between gap-6 border border-white/15 bg-[#17201B] p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="max-w-[440px] text-3xl font-medium tracking-[-.04em] text-white sm:text-4xl">
                {t.pdOrderHeading.replace("{config}", m.configuration)}
              </h2>
              <p className="mt-3 max-w-[440px] text-sm leading-6 text-white/60">
                {t.pdOrderSub.replace("{availability}", m.availability)}
              </p>
            </div>
            <FillButton type="button" onClick={() => openOrderForm(robot.id)} className="shrink-0">
              {t.cardOrderNow} <MoveUpRight size={14} />
            </FillButton>
          </div>
        </section>

        {/* Related machines */}
        <section className="py-16 sm:py-20">
          <div className="tf-container">
            <div className="flex items-end justify-between gap-6">
              <h2 className="max-w-[360px] text-3xl font-medium tracking-[-.04em] sm:text-4xl">{t.pdCompareHeading}</h2>
              <Link href="/farmbro" className="tf-btn tf-btn-outline shrink-0">{t.pdViewAll}</Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {related.map((r) => {
                const rm = t.machines[r.id];
                return (
                  <Link key={r.id} href={`/farmbro/${r.slug}`} className="tf-focus product-card group flex items-center gap-5 rounded-none p-4">
                    <img src={r.image} alt="" loading="lazy" decoding="async" className="h-20 w-24 shrink-0 object-cover" />
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-medium text-[#111311]">{rm.name}</h3>
                      <p className="tf-mono mt-1 text-[10px] uppercase tracking-[.14em] text-[#64736C]">{rm.configuration}</p>
                    </div>
                    <span aria-hidden="true" className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#111311]/15 text-[#111311] transition-all duration-300 group-hover:rotate-45 group-hover:border-[#1B8F6A] group-hover:bg-[#1B8F6A] group-hover:text-white">
                      <MoveUpRight size={14} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
