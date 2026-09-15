import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import type { Robot } from "@/data/catalog";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackSpotlight } from "@/lib/spotlight";

export default function ProductCard({ robot }: { robot: Robot }) {
  const { t } = useLanguage();
  const m = t.machines[robot.id];

  return (
    <Link
      href={`/farmbro/${robot.slug}`}
      onPointerMove={trackSpotlight}
      className="product-card tf-focus group flex flex-col"
      aria-label={t.cardViewAria.replace("{name}", m.name)}
    >
      <div className="overflow-hidden bg-[#17201B]">
        <img
          src={robot.image}
          alt={m.name}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="relative z-[2] flex flex-1 flex-col p-6">
        <span
          aria-hidden="true"
          className="absolute right-5 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-[#111311]/15 text-[#111311] transition-colors duration-300 group-hover:border-[#1B8F6A] group-hover:bg-[#1B8F6A] group-hover:text-white"
        >
          <ArrowUpRight size={16} />
        </span>
        <h3 className="max-w-[320px] pr-12 text-[22px] font-medium leading-[1.18] tracking-[-.03em] text-[#111311]">{m.name}</h3>
        <div className="tf-mono mt-4 text-[10px] uppercase tracking-[.14em] text-[#64736C]">
          {t.configLabel} <span className="ml-2 text-[#1B8F6A]">{m.configuration}</span>
        </div>
        {m.valueNote && (
          <p className="tf-chip-jade mt-6 w-fit px-3 py-2 text-xs leading-5">{m.valueNote}</p>
        )}
      </div>
    </Link>
  );
}
