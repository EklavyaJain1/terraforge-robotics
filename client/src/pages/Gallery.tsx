import { useMemo } from "react";
import Footer from "@/components/Footer";
import MasonryGallery, { type MasonryItem } from "@/components/MasonryGallery";
import Navbar from "@/components/Navbar";
import SectionKicker from "@/components/SectionKicker";
import { useLanguage } from "@/contexts/LanguageContext";
import { agriImages, attachments } from "@/data/catalog";
import usePageTitle from "@/hooks/usePageTitle";

/** Natural frame heights, scaled so 400 equals the column width. */
const galleryItems: MasonryItem[] = [
  { id: "hero", img: agriImages.hero, height: 225, title: "" },
  { id: "wide", img: agriImages.wide, height: 256, title: "" },
  { id: "farmx", img: agriImages.farmx, height: 300, title: "" },
  { id: "rancher", img: agriImages.rancher, height: 300, title: "" },
  { id: "canopy", img: agriImages.canopy, height: 300, title: "" },
  { id: "division", img: agriImages.division, height: 492, title: "" },
];

export default function Gallery() {
  const { t } = useLanguage();
  usePageTitle(t.galleryTitle);
  const items = useMemo(
    () =>
      galleryItems.map((item, index) => ({
        ...item,
        title: t.galleryCaptions[index] ?? item.title,
      })),
    [t],
  );

  return (
    <div className="tf-page bg-[#FFFFFF] text-[#111311]">
      <Navbar />
      <main className="pt-[72px]">
        <section className="bg-[#FFFFFF] py-16 sm:py-24">
          <div className="tf-container">
            <SectionKicker number="PROOF" label={t.galleryKicker} />
            <h1 className="mt-7 max-w-[680px] text-5xl font-medium leading-[.95] tracking-[-.055em] text-[#111311] sm:text-7xl">
              {t.galleryHeading}
            </h1>
            <p className="mt-6 max-w-[440px] text-base leading-7 text-[#3F4B45]">{t.gallerySub}</p>
          </div>
        </section>

        <section className="bg-[#FFFFFF] pb-16 sm:pb-24">
          <div className="tf-container">
            <MasonryGallery
              items={items}
              animateFrom="bottom"
              blurToFocus
              stagger={0.08}
              scaleOnHover
              hoverScale={0.96}
              colorShiftOnHover={false}
              itemClassName="border border-[#111311]/15"
            />
          </div>
        </section>

        <section className="bg-[#FFFFFF] py-14 sm:py-20">
          <div className="tf-container">
            <SectionKicker number="TOOLS" label={t.toolsKicker} />
            <div className="mt-8 grid gap-px border border-[#111311]/15 bg-[#111311]/15 sm:grid-cols-2 lg:grid-cols-4">
              {attachments.map((item) => {
                const a = t.attachments[item.id];
                return (
                  <div key={item.id} className="bg-[#FFFFFF] p-6">
                    <div className="flex items-start justify-between">
                      <span className="tf-mono text-[10px] text-[#1B8F6A]">{item.number}</span>
                      <span className="text-2xl font-light text-[#111311]/30">{item.icon}</span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-[#111311]">{a.name}</h3>
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
