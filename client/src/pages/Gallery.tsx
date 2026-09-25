import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionKicker from "@/components/SectionKicker";
import { useLanguage } from "@/contexts/LanguageContext";
import { agriImages, attachments } from "@/data/catalog";
import usePageTitle from "@/hooks/usePageTitle";

/** Gallery captions/tags are keyed by asset so the dictionary carries the copy. */
import MasonryGallery from "@/components/ui/MasonryGallery";

const galleryItems = [
  { src: agriImages.hero, captionKey: 0, tagKey: "platform" },
  { src: agriImages.wide, captionKey: 1, tagKey: "fieldOps" },
  { src: agriImages.farmx, captionKey: 2, tagKey: "platform" },
  { src: agriImages.rancher, captionKey: 3, tagKey: "platform" },
  { src: agriImages.canopy, captionKey: 4, tagKey: "fieldOps" },
  { src: agriImages.division, captionKey: 5, tagKey: "attachments" },
] as const;

type FilterId = "all" | "platform" | "attachments" | "fieldOps";

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

/** Entrance choreography. Staggered like an operator checklist; transform/opacity only. */
const rise = {
  hidden: { opacity: 0, y: 18 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: EASE_OUT },
  }),
};

export default function Gallery() {
  const { t } = useLanguage();
  usePageTitle(t.galleryTitle);
  const prefersReducedMotion = useReducedMotion();

  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  /** Header chips drive the grid; same tag ids the captions already use. */
  const visibleItems = useMemo(
    () => galleryItems.filter((item) => activeFilter === "all" || item.tagKey === activeFilter),
    [activeFilter],
  );

  const masonryItems = visibleItems.map((item, index) => ({
    id: String(index),
    img: item.src,
    height: [400, 300, 500, 350, 450, 280][index],
  }));

  const filters: { id: FilterId; label: string; count: number }[] = [
    { id: "all", label: t.filterAll, count: galleryItems.length },
    { id: "platform", label: t.filterPlatform, count: galleryItems.filter((i) => i.tagKey === "platform").length },
    { id: "fieldOps", label: t.filterFieldOps, count: galleryItems.filter((i) => i.tagKey === "fieldOps").length },
    { id: "attachments", label: t.filterAttachments, count: galleryItems.filter((i) => i.tagKey === "attachments").length },
  ];

  // Gentle parallax on the photo panel. Direct rAF scroll listener: deterministic under Lenis.
  const photoRef = useRef<HTMLDivElement>(null);
  const photoY = useMotionValue(0);
  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = photoRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const progress = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0), 1);
        photoY.set((progress - 0.5) * 36);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [prefersReducedMotion, photoY]);

  /** Reduced motion: elements render in their final state, no entrance choreography. */
  const enter = prefersReducedMotion
    ? { animate: { opacity: 1 } as const }
    : { initial: "hidden" as const, animate: "show" as const };

  const headingWords = t.galleryHeading.split(" ");

  return (
    <div className="tf-page">
      <Navbar />
      <main className="pt-[72px]">
        {/* ── Header: contact-sheet direction — dark, photo-led, film metadata ── */}
        <section className="tf-dark tf-scanline relative overflow-hidden">
          {/* Mono contour rows echoing plantation rows; masked so they read as atmosphere, not grid. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(185,244,212,.05) 0, rgba(185,244,212,.05) 1px, transparent 1px, transparent 72px)",
              maskImage: "radial-gradient(ellipse 90% 85% at 50% 20%, black 25%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse 90% 85% at 50% 20%, black 25%, transparent 75%)",
            }}
          />

          <div className="tf-container relative py-14 sm:py-20">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
              {/* ── Copy column ── */}
              <div>
                <SectionKicker number="PROOF" label={t.galleryKicker} light />

                {/* Film-sheet metadata rail: the frame's provenance, in operator mono. */}
                <motion.div
                  {...enter}
                  variants={rise}
                  custom={0.05}
                  className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1"
                >
                  <span className="h-1 w-1 rounded-full bg-[#1B8F6A]" />
                  <span className="tf-mono text-[10px] text-white/55">{t.galleryMetaOne}</span>
                  <span className="h-px w-5 bg-white/25" />
                  <span className="h-1 w-1 rounded-full bg-[#1B8F6A]" />
                  <span className="tf-mono text-[10px] text-white/55">{t.galleryMetaTwo}</span>
                </motion.div>

                <h1 className="mt-7 max-w-[680px] text-5xl font-medium leading-[.95] tracking-[-.055em] text-white sm:text-7xl">
                  {headingWords.map((word, i) => (
                    <motion.span
                      key={`${word}-${i}`}
                      {...enter}
                      variants={rise}
                      custom={0.12 + i * 0.08}
                      className="inline-block whitespace-pre"
                    >
                      {word + (i < headingWords.length - 1 ? " " : "")}
                    </motion.span>
                  ))}
                </h1>

                {/* The hairline draws itself — the surveyor's rule, marking the sheet. */}
                <motion.div
                  aria-hidden="true"
                  initial={prefersReducedMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.45, ease: EASE_OUT }}
                  className="mt-7 h-px w-16 origin-left bg-[#1B8F6A]"
                />

                <motion.p
                  {...enter}
                  variants={rise}
                  custom={0.5}
                  className="mt-6 max-w-[440px] text-base leading-7 text-white/70"
                >
                  {t.gallerySub}
                </motion.p>

                {/* Filter chips: functional, driven by the same tag ids as the grid. */}
                <motion.div
                  {...enter}
                  variants={rise}
                  custom={0.62}
                  className="mt-10"
                >
                  <span className="tf-mono text-[10px] text-white/45">{t.galleryFilterLabel}</span>
                  <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={t.galleryFilterLabel}>
                    {filters.map((f) => {
                      const active = activeFilter === f.id;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setActiveFilter(f.id)}
                          aria-pressed={active}
                          className={`tf-focus relative flex min-h-[36px] items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-200 ${
                            active
                              ? "border-[#1B8F6A] text-white"
                              : "border-white/20 text-white/65 hover:border-white/45 hover:text-white"
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId="gallery-filter-pill"
                              className="absolute inset-0 rounded-full bg-[#1B8F6A]/20"
                              transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                            />
                          )}
                          <span className="relative">{f.label}</span>
                          <span className={`tf-mono text-[10px] ${active ? "text-[#B9F4D4]" : "text-white/40"}`}>
                            {String(f.count).padStart(2, "0")}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

              {/* ── Photo panel: one wide duotone frame, blur-to-focus entrance + gentle parallax ── */}
              <motion.div
                ref={photoRef}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.04, filter: "blur(14px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.1, delay: 0.35, ease: EASE_OUT }}
                style={{ y: prefersReducedMotion ? 0 : photoY }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-[4px] border border-white/12">
                  <img
                    src={agriImages.wide}
                    alt={t.galleryCaptions[1]}
                    className="h-[300px] w-full object-cover sm:h-[420px] lg:h-[480px]"
                    style={{ filter: "grayscale(1) brightness(.82)" }}
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-[#1B8F6A]/12" />
                  <div className="hero-fade absolute inset-0 opacity-60" />
                </div>

                {/* Frame label: mono plate, part of the sheet. */}
                <motion.div
                  {...enter}
                  variants={rise}
                  custom={0.75}
                  className="absolute bottom-3 left-3 flex max-w-[calc(100%-24px)] items-center gap-2 rounded-[2px] border border-white/15 bg-[#111311]/80 px-3 py-2 backdrop-blur-sm"
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-[#1B8F6A]" />
                  <span className="tf-mono truncate text-[10px] text-white/80">{t.galleryCaptions[1]}</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Frames grid: the masonry continues the dark band without a seam ── */}
        <section className="tf-dark border-t border-white/10 py-14 sm:py-20">
          <div className="tf-container">
            <MasonryGallery
              items={masonryItems}
              animateFrom="bottom"
              blurToFocus={true}
              stagger={0.08}
              scaleOnHover={true}
              hoverScale={0.96}
            />
          </div>
        </section>

        <section className="tf-surface py-14 sm:py-20">
          <div className="tf-container">
            <SectionKicker number="TOOLS" label={t.toolsKicker} />
            <div className="mt-8 grid gap-px border border-[#111311]/15 bg-[#111311]/15 sm:grid-cols-2 lg:grid-cols-4">
              {attachments.map((item) => {
                const a = t.attachments[item.id];
                return (
                  <div key={item.id} className="bg-white p-6">
                    <div className="flex items-start justify-between">
                      <span className="tf-mono text-[10px] text-[#1B8F6A]">{item.number}</span>
                      <span className="text-2xl font-light text-[#111311]/30">{item.icon}</span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium">{a.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#59655F]">{a.copy}</p>
                  </div>
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
