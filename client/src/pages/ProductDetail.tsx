import { useState } from "react";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, MoveUpRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionKicker from "@/components/SectionKicker";
import { useOrderForm } from "@/contexts/OrderContext";
import usePageTitle from "@/hooks/usePageTitle";
import { robots } from "@/data/catalog";

export default function ProductDetail() {
  const [location] = useLocation();
  const { openOrderForm } = useOrderForm();
  const robot = robots.find((r) => r.slug === location.split("/").pop());
  const [activeImage, setActiveImage] = useState(0);

  usePageTitle(robot ? `${robot.name} — FarmBro` : "Machine not found — FarmBro");

  if (!robot) {
    return (
      <div className="tf-page">
        <Navbar />
        <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 pt-[72px] text-center">
          <p className="tf-mono text-[10px] uppercase tracking-[.14em] text-[#64736C]">This machine isn't in the store</p>
          <h1 className="max-w-[420px] text-4xl font-medium tracking-[-.05em] sm:text-5xl">We couldn't find that machine.</h1>
          <Link href="/farmbro" className="tf-btn tf-btn-primary">
            <ArrowLeft size={15} /> Back to the lineup
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
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] text-[#64736C]">
            <Link href="/farmbro" className="tf-focus hover:text-[#1B8F6A]">Store</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#111311]">{robot.configuration}</span>
          </nav>
        </div>

        {/* Hero: configuration chip, name, description, CTAs — left. Carousel — right. */}
        <section className="tf-container grid items-start gap-10 pt-8 pb-16 sm:pt-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-14">
          <div>
            <span className="tf-mono inline-flex items-center gap-2 rounded-full border border-[#111311]/15 px-3 py-1.5 text-[10px] uppercase tracking-[.16em] text-[#3F4B45]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1B8F6A]" aria-hidden="true" />
              {robot.tier}
            </span>
            <h1 className="mt-6 max-w-[520px] text-4xl font-medium leading-[1.02] tracking-[-.04em] sm:text-6xl">{robot.name}</h1>
            <p className="tf-mono mt-5 text-sm italic tracking-[.08em] text-[#1B8F6A]">Configuration {robot.configuration}</p>
            <p className="mt-6 max-w-[480px] text-base leading-7 text-[#3F4B45]">{robot.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button type="button" onClick={() => openOrderForm(robot.name)} className="tf-btn tf-btn-primary">
                Order now <MoveUpRight size={15} />
              </button>
              <a href="#specifications" className="tf-btn tf-btn-outline">View specifications</a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[#111311]/12 pt-6 text-sm text-[#3F4B45]">
              <span className="font-medium">{robot.priceLabel}</span>
              <span className="text-[12px] text-[#59655F]">{robot.institutionalNote}</span>
              <span className="text-[12px] text-[#59655F]">{robot.availability}</span>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#17201B]">
              <img
                src={robot.gallery[activeImage]}
                alt={`${robot.name} — view ${activeImage + 1}`}
                fetchPriority="high"
                decoding="sync"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => setActiveImage((activeImage - 1 + robot.gallery.length) % robot.gallery.length)}
                className="tf-focus absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#111311] shadow-md transition-colors hover:bg-white"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next image"
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
                  aria-label={`Show image ${index + 1}`}
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
            <SectionKicker number="01" label="Why operators pick it" />
            <div className="mt-8 grid gap-px border border-[#111311]/15 bg-[#111311]/15 sm:grid-cols-2">
              {robot.highlights.map((highlight) => (
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
              <SectionKicker number="02" label="Specifications" />
              <h2 className="mt-7 max-w-[320px] text-4xl font-medium leading-[.98] tracking-[-.05em]">The spec sheet.</h2>
              <p className="mt-5 max-w-[300px] text-sm leading-6 text-[#59655F]">
                Published figures only. The full engineering sheet ships with every enquiry.
              </p>
            </div>
            <dl className="border-t border-[#111311]/15">
              {robot.specs.map(([label, value]) => (
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
            <SectionKicker number="03" label="Gallery" />
            <h2 className="mt-7 max-w-[420px] text-4xl font-medium leading-[.98] tracking-[-.05em]">The machine, working.</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {robot.gallery.map((src, index) => (
                <figure key={src + index} className="group relative overflow-hidden bg-[#17201B]">
                  <img
                    src={src}
                    alt={`${robot.name} in the field — image ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="h-[260px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-[320px]"
                  />
                  {index === 0 && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B0F0D]/85 to-transparent p-5 text-sm text-white">
                      {robot.tagline}
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
              <h2 className="max-w-[440px] text-3xl font-medium tracking-[-.04em] text-white sm:text-4xl">Put the {robot.configuration} to work on your rows.</h2>
              <p className="mt-3 max-w-[440px] text-sm leading-6 text-white/60">
                We'll bring this machine to a representative patch of your farm. {robot.availability}.
              </p>
            </div>
            <button type="button" onClick={() => openOrderForm(robot.name)} className="tf-btn tf-btn-primary shrink-0">
              Order now <MoveUpRight size={14} />
            </button>
          </div>
        </section>

        {/* Related machines */}
        <section className="py-16 sm:py-20">
          <div className="tf-container">
            <div className="flex items-end justify-between gap-6">
              <h2 className="max-w-[360px] text-3xl font-medium tracking-[-.04em] sm:text-4xl">Compare with the rest of the lineup.</h2>
              <Link href="/farmbro" className="tf-btn tf-btn-outline shrink-0">View all</Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.id} href={`/farmbro/${r.slug}`} className="tf-focus group flex items-center gap-5 border border-[#111311]/15 bg-white p-4 transition-shadow hover:shadow-[0_14px_40px_rgba(17,19,17,.1)]">
                  <img src={r.image} alt="" loading="lazy" decoding="async" className="h-20 w-24 shrink-0 object-cover" />
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-medium text-[#111311]">{r.name}</h3>
                    <p className="tf-mono mt-1 text-[10px] uppercase tracking-[.14em] text-[#64736C]">{r.configuration}</p>
                  </div>
                  <span aria-hidden="true" className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#111311]/15 text-[#111311] transition-colors group-hover:border-[#1B8F6A] group-hover:bg-[#1B8F6A] group-hover:text-white">
                    <MoveUpRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
