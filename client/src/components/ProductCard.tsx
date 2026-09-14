import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import type { Robot } from "@/data/catalog";
import { trackSpotlight } from "@/lib/spotlight";

/** Store card in the reference e-commerce style: image, name, configuration line,
    optional value chip, arrow affordance. The whole card opens the product page.
    Depth: soft resting shadow, lift on hover, and a cursor-tracked jade spotlight
    (transform/opacity only, disabled for touch and reduced-motion users). */
export default function ProductCard({ robot }: { robot: Robot }) {
  return (
    <Link
      href={`/farmbro/${robot.slug}`}
      onPointerMove={trackSpotlight}
      className="product-card tf-focus group flex flex-col"
      aria-label={`View ${robot.name}`}
    >
      <div className="overflow-hidden bg-[#17201B]">
        <img
          src={robot.image}
          alt={robot.name}
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
        <h3 className="max-w-[320px] pr-12 text-[22px] font-medium leading-[1.18] tracking-[-.03em] text-[#111311]">{robot.name}</h3>
        <div className="tf-mono mt-4 text-[10px] uppercase tracking-[.14em] text-[#64736C]">
          Configuration <span className="ml-2 text-[#1B8F6A]">{robot.configuration}</span>
        </div>
        {robot.valueNote && (
          <p className="tf-chip-jade mt-6 w-fit px-3 py-2 text-xs leading-5">{robot.valueNote}</p>
        )}
      </div>
    </Link>
  );
}
