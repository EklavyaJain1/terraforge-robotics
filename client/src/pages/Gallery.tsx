import { useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionKicker from "@/components/SectionKicker";
import { useLanguage } from "@/contexts/LanguageContext";
import { agriImages, attachments } from "@/data/catalog";
import usePageTitle from "@/hooks/usePageTitle";

/** Gallery captions/tags are keyed by asset so the dictionary carries the copy. */
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
  const [filter, setFilter] = useState<string>("all");
  const tags: { id: string; label: string }[] = [
    { id: "all", label: t.filterAll },
    { id: "platform", label: t.filterPlatform },
    { id: "attachments", label: t.filterAttachments },
    { id: "fieldOps", label: t.filterFieldOps },
  ];
  const tagLabel = (key: string) => tags.find((tag) => tag.id === key)?.label ?? key;
  const visible = galleryItems.filter((item) => filter === "all" || item.tagKey === filter);

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
            <div className="mt-10 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => setFilter(tag.id)}
                  aria-pressed={filter === tag.id}
                  className={`tf-focus tf-mono border px-4 py-2.5 text-[10px] transition-colors ${
                    filter === tag.id
                      ? "border-[#1B8F6A] bg-[#1B8F6A] text-white"
                      : "border-[#111311]/25 text-[#3F4B45] hover:border-[#1B8F6A]"
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="tf-dark py-14 sm:py-20">
          <div className="tf-container grid gap-4 sm:grid-cols-2">
            {visible.map((item) => {
              const caption = t.galleryCaptions[item.captionKey];
              return (
                <figure key={item.src} className="group relative overflow-hidden bg-[#17201B]">
                  <img src={item.src} alt={caption} loading="lazy" className="h-[280px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-[340px]" />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[#0B0F0D]/90 to-transparent p-5">
                    <span className="max-w-[280px] text-sm text-white">{caption}</span>
                    <span className="tf-mono shrink-0 text-[9px] text-[#B9F4D4]">{tagLabel(item.tagKey)}</span>
                  </figcaption>
                </figure>
              );
            })}
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
