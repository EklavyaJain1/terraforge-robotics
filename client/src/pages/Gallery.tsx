import { useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionKicker from "@/components/SectionKicker";
import { agriImages, attachments } from "@/data/catalog";
import usePageTitle from "@/hooks/usePageTitle";

const galleryItems = [
  { src: agriImages.hero, caption: "The hybrid mulcher on an estate trial row", tag: "Platform" },
  { src: agriImages.wide, caption: "Open field trial, black soil", tag: "Field ops" },
  { src: agriImages.farmx, caption: "Remote Controlled Mulcher (Hybrid) at work", tag: "Platform" },
  { src: agriImages.rancher, caption: "Mulcher, Sprayer & Cargo Carrier between plantation rows", tag: "Platform" },
  { src: agriImages.canopy, caption: "Canopy Scout on hard ground", tag: "Field ops" },
  { src: agriImages.division, caption: "Implement rail study, pre-season", tag: "Attachments" },
];

export default function Gallery() {
  usePageTitle("Gallery — FarmBro Robotics");
  const [filter, setFilter] = useState<string>("All");
  const tags = ["All", "Platform", "Attachments", "Field ops"];
  const visible = galleryItems.filter((item) => filter === "All" || item.tag === filter);

  return (
    <div className="tf-page">
      <Navbar />
      <main className="pt-[72px]">
        <section className="tf-surface py-16 sm:py-24">
          <div className="tf-container">
            <SectionKicker number="PROOF" label="Gallery" />
            <h1 className="mt-7 max-w-[680px] text-5xl font-medium leading-[.95] tracking-[-.055em] sm:text-7xl">
              The machine, working.
            </h1>
            <p className="mt-6 max-w-[440px] text-base leading-7 text-[#3F4B45]">
              Photographs from field trials and operator days — unretouched conditions, real rows.
            </p>
            <div className="mt-10 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setFilter(tag)}
                  aria-pressed={filter === tag}
                  className={`tf-focus tf-mono border px-4 py-2.5 text-[10px] transition-colors ${
                    filter === tag
                      ? "border-[#1B8F6A] bg-[#1B8F6A] text-white"
                      : "border-[#111311]/25 text-[#3F4B45] hover:border-[#1B8F6A]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="tf-dark py-14 sm:py-20">
          <div className="tf-container grid gap-4 sm:grid-cols-2">
            {visible.map((item) => (
              <figure key={item.src + item.caption} className="group relative overflow-hidden bg-[#17201B]">
                <img src={item.src} alt={item.caption} loading="lazy" className="h-[280px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-[340px]" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[#0B0F0D]/90 to-transparent p-5">
                  <span className="max-w-[280px] text-sm text-white">{item.caption}</span>
                  <span className="tf-mono shrink-0 text-[9px] text-[#B9F4D4]">{item.tag}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="tf-surface py-14 sm:py-20">
          <div className="tf-container">
            <SectionKicker number="TOOLS" label="Attachment studies" />
            <div className="mt-8 grid gap-px border border-[#111311]/15 bg-[#111311]/15 sm:grid-cols-2 lg:grid-cols-4">
              {attachments.map((item) => (
                <div key={item.number} className="bg-white p-6">
                  <div className="flex items-start justify-between">
                    <span className="tf-mono text-[10px] text-[#1B8F6A]">{item.number}</span>
                    <span className="text-2xl font-light text-[#111311]/30">{item.icon}</span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium">{item.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#59655F]">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
