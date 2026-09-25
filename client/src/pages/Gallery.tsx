import { useState } from "react";
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

export default function Gallery() {
  const { t } = useLanguage();
  usePageTitle(t.galleryTitle);

  const masonryItems = galleryItems.map((item, index) => ({
    id: String(index),
    img: item.src,
    height: [400, 300, 500, 350, 450, 280][index],
  }));

  return (
    <div className="tf-page">
      <Navbar />
      <main className="pt-[72px]">
        <section className="tf-surface py-16 sm:py-24">
          <div className="tf-container">
            <SectionKicker number="PROOF" label={t.galleryKicker} />
            <h1 className="mt-7 max-w-[680px] text-5xl font-medium leading-[.95] tracking-[-.055em] sm:text-7xl">
              {t.galleryHeading}
            </h1>
            <p className="mt-6 max-w-[440px] text-base leading-7 text-[#3F4B45]">
              {t.gallerySub}
            </p>
          </div>
        </section>

        <section className="tf-dark py-14 sm:py-20">
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
