import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionKicker from "@/components/SectionKicker";
import { useLanguage } from "@/contexts/LanguageContext";
import { agriImages } from "@/data/catalog";
import usePageTitle from "@/hooks/usePageTitle";

import MasonryGallery from "@/components/ui/MasonryGallery";

gsap.registerPlugin(useGSAP);

/** All six frames, always on the sheet — the page is the proof, not a query. */
const masonryItems = [
  { id: "0", img: agriImages.hero, height: 400 },
  { id: "1", img: agriImages.wide, height: 300 },
  { id: "2", img: agriImages.farmx, height: 500 },
  { id: "3", img: agriImages.rancher, height: 350 },
  { id: "4", img: agriImages.canopy, height: 450 },
  { id: "5", img: agriImages.division, height: 280 },
];

export default function Gallery() {
  const { t } = useLanguage();
  usePageTitle(t.galleryTitle);
  const rootRef = useRef<HTMLDivElement>(null);

  /**
   * Header choreography — one GSAP pass, transform/opacity only:
   * kicker rises, headline words rise one by one, the surveyor's rule
   * draws outward from center, sub copy and the provenance rail follow.
   * The contour rows drift as the single ambient layer.
   * Reduced motion: skipped entirely — everything renders in final state.
   */
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".gallery-underlay", {
        autoAlpha: 0,
        scale: 1.06,
        duration: 1.2,
        ease: "power2.out",
      });

      gsap.from(".gallery-kicker", {
        autoAlpha: 0,
        y: 12,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from(".gallery-title span", {
        y: 42,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.from(".gallery-rule", {
        scaleX: 0,
        transformOrigin: "50% 50%",
        duration: 0.9,
        delay: 0.5,
        ease: "power3.out",
      });

      gsap.from(".gallery-sub", {
        autoAlpha: 0,
        y: 18,
        duration: 0.7,
        delay: 0.62,
        ease: "power2.out",
      });

      gsap.from(".gallery-meta", {
        autoAlpha: 0,
        duration: 0.7,
        delay: 0.78,
        ease: "power2.out",
      });

      gsap.to(".gallery-contours", {
        xPercent: -3,
        duration: 16,
        yoyo: true,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: rootRef, dependencies: [t.galleryHeading], revertOnUpdate: true },
  );

  const headingWords = t.galleryHeading.split(" ");

  return (
    <div ref={rootRef} className="tf-page">
      <Navbar />
      <main className="pt-[72px]">
        {/* ── Header: the contact sheet, centered — dark, mono metadata, one rule ── */}
        <section className="tf-dark tf-scanline relative overflow-hidden">
          {/* Underlay photo, treated like the other page headers: low opacity,
              gradient vignetted into the band so copy stays readable. */}
          <div aria-hidden="true" className="gallery-underlay absolute inset-0">
            <img src={agriImages.wide} alt="" className="h-full w-full object-cover opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111311] via-[#111311]/50 to-[#111311]" />
          </div>

          {/* Mono contour rows echoing plantation rows; masked so they read as atmosphere.
              GSAP drifts the whole layer slowly — the sheet breathes. */}
          <div
            aria-hidden="true"
            className="gallery-contours pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(185,244,212,.05) 0, rgba(185,244,212,.05) 1px, transparent 1px, transparent 72px)",
              maskImage: "radial-gradient(ellipse 90% 85% at 50% 20%, black 25%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse 90% 85% at 50% 20%, black 25%, transparent 75%)",
            }}
          />

          <div className="tf-container relative z-10 flex flex-col items-center py-16 text-center sm:py-24">
            <SectionKicker number="PROOF" label={t.galleryKicker} light className="gallery-kicker justify-center" />

            <h1 className="gallery-title mt-8 max-w-[900px] text-5xl font-medium leading-[.95] tracking-[-.055em] text-white sm:text-7xl lg:text-8xl">
              {headingWords.map((word, i) => (
                <span key={`${word}-${i}`} className="inline-block whitespace-pre">
                  {word + (i < headingWords.length - 1 ? " " : "")}
                </span>
              ))}
            </h1>

            {/* The surveyor's rule draws itself outward from center. */}
            <div aria-hidden="true" className="gallery-rule mt-9 h-px w-16 bg-[#1B8F6A]" />

            <p className="gallery-sub mt-7 max-w-[460px] text-base leading-7 text-white/70">{t.gallerySub}</p>

            {/* Film-sheet provenance, in operator mono — the sheet's own stamp. */}
            <div className="gallery-meta mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <span className="h-1 w-1 rounded-full bg-[#1B8F6A]" />
              <span className="tf-mono text-[10px] text-white/55">{t.galleryMetaOne}</span>
              <span className="h-px w-5 bg-white/25" />
              <span className="h-1 w-1 rounded-full bg-[#1B8F6A]" />
              <span className="tf-mono text-[10px] text-white/55">{t.galleryMetaTwo}</span>
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
      </main>
      <Footer />
    </div>
  );
}
