import { useState } from "react";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, MoveUpRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionKicker from "@/components/SectionKicker";
import { useOrderForm } from "@/contexts/OrderContext";
import { useLanguage } from "@/contexts/LanguageContext";
import usePageTitle from "@/hooks/usePageTitle";
import { robots } from "@/data/catalog";

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
            <p className="mt-6 max-w-[480px] text-base leading-7 text-[#3F4B45]">{m.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button type="button" onClick={() => openOrderForm(robot.id)} className="tf-btn tf-btn-primary">
                {t.cardOrderNow} <MoveUpRight size={15} />
              </button>
              <a href="#specifications" className="tf-btn tf-btn-outline">{t.pdViewSpecs}</a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[#111311]/12 pt-6 text-sm text-[#3F4B45]">
              <span className="font-medium">{m.priceLabel}</span>
              <span className="text-[12px] text-[#59655F]">{m.institutionalNote}</span>
              <span className="text-[12px] text-[#59655F]">{m.availability}</span>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#17201B]">
              <img
                src={robot.gallery[activeImage]}
                alt={t.pdImageAlt.replace("{name}", m.name).replace("{n}", String(activeImage + 1))}
                fetchPriority="high"
                decoding="sync"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                aria-label={t.pdPrevImage}
                onClick={() => setActiveImage((activeImage - 1 + robot.gallery.length) % robot.gallery.length)}
                className="tf-focus absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#111311] shadow-md transition-colors hover:bg-white"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label={t.pdNextImage}
                onClick={() => setActiveImage((activeImage + 1) % robot.gallery.length)}
                className="tf-focus absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#111311] shadow-md transition-colors hover:bg-white"
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
                  className={`tf-focus aspect-[4/3] overflow-hidden border-2 transition-colors ${
                    activeImage === index ? "border-[#1B8F6A]" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="border-y border-[#111311]/12 bg-[#FAFAF7] py-14">
          <div className="tf-container">
            <SectionKicker number="01" label={t.pdWhyKicker} />
            <div className="mt-8 grid gap-px border border-[#111311]/15 bg-[#111311]/15 sm:grid-cols-2">
              {m.highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-3 bg-white p-5">
                  <Check size={16} className="mt-0.5 shrink-0 text-[#1B8F6A]" />
                  <p className="text-sm leading-6 text-[#3F4B45]">{highlight}</p>
                </div>
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
                <div key={label} className="grid grid-cols-[1fr_auto] gap-6 border-b border-[#111311]/15 py-5">
                  <dt className="tf-mono text-[10px] uppercase tracking-[.14em] text-[#64736C]">{label}</dt>
                  <dd className="text-right text-base font-medium text-[#111311]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Gallery */}
        <section className="border-y border-[#111311]/12 bg-[#FAFAF7] py-16 sm:py-20">
          <div className="tf-container">
            <SectionKicker number="03" label={t.pdGalleryKicker} />
            <h2 className="mt-7 max-w-[420px] text-4xl font-medium leading-[.98] tracking-[-.05em]">{t.galleryHeading}</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {robot.gallery.map((src, index) => (
                <figure key={src + index} className="group relative overflow-hidden bg-[#17201B]">
                  <img
                    src={src}
                    alt={`${m.name} — ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="h-[260px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-[320px]"
                  />
                  {index === 0 && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B0F0D]/85 to-transparent p-5 text-sm text-white">
                      {m.tagline}
                    </figcaption>
                  )}
                </figure>
              ))}
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
            <button type="button" onClick={() => openOrderForm(robot.id)} className="tf-btn tf-btn-primary shrink-0">
              {t.cardOrderNow} <MoveUpRight size={14} />
            </button>
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
                  <Link key={r.id} href={`/farmbro/${r.slug}`} className="tf-focus group flex items-center gap-5 border border-[#111311]/15 bg-white p-4 transition-shadow hover:shadow-[0_14px_40px_rgba(17,19,17,.1)]">
                    <img src={r.image} alt="" loading="lazy" decoding="async" className="h-20 w-24 shrink-0 object-cover" />
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-medium text-[#111311]">{rm.name}</h3>
                      <p className="tf-mono mt-1 text-[10px] uppercase tracking-[.14em] text-[#64736C]">{rm.configuration}</p>
                    </div>
                    <span aria-hidden="true" className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#111311]/15 text-[#111311] transition-colors group-hover:border-[#1B8F6A] group-hover:bg-[#1B8F6A] group-hover:text-white">
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
