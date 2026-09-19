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
      className="product-card rounded-2xl overflow-hidden border border-[#111311]/15 tf-focus group flex flex-col bg-white shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(27,143,106,0.18)] hover:border-[#1B8F6A]/60"
      aria-label={t.cardViewAria.replace("{name}", m.name)}
    >
      <div className="relative overflow-hidden bg-[#17201B] rounded-t-2xl">
          <img
            src={robot.image}
            alt={m.name}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111311]/90 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 w-full translate-y-4 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {m.specs.slice(0, 4).map(([label, value]) => (
              <div key={label}>
                <div className="tf-mono text-[8px] text-white/45">{label}</div>
                <div className="mt-0.5 text-xs text-white">{value}</div>
              </div>
            ))}
          </div>
        </div>
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

      </div>
    </Link>
  );
}
