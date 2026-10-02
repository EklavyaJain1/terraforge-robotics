import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/**
 * Editorial feature rows — the 21st.dev "features-2" block adapted to the
 * FarmBro dark surface. Alternating claim/figure rows: a mono spec label and
 * icon chip, the operator-facing claim, the published figure that backs it,
 * and a captioned frame from the machine gallery. Hairline separators divide
 * the rows. No invented testimonials — the figure is the proof.
 *
 * Scroll animation contract: ProductDetail's GSAP hook targets `.fr-row`,
 * `.fr-reveal` (staggered text), `.fr-media` (frame) and `.fr-sep` (rule draw).
 * The header uses the page-wide `.pd-reveal` reveal.
 */

export interface FeatureRow {
  id: string;
  /** Mono category above the claim — a published spec label such as "Configuration". */
  eyebrow: string;
  /** The operator-facing claim. */
  title: string;
  /** The published figure that backs the claim. */
  value: string;
  /** Frame source — an .mp4 loops silently, anything else renders as an image. */
  media: string;
  mediaAlt: string;
  /** Caption shown on the frame's bottom bar. */
  caption: string;
  Icon: LucideIcon;
  cta?: { label: string; href: string };
}

export interface FeatureRowsProps {
  /** Mono chip above the heading, e.g. the machine tier. */
  kicker?: string;
  heading: string;
  rows: FeatureRow[];
  className?: string;
}

export function FeatureRows({ kicker, heading, rows, className }: FeatureRowsProps) {
  return (
    <section className={cn("bg-[#111311] py-20 sm:py-28", className)}>
      <div className="tf-container">
        <header className="pd-reveal mx-auto flex max-w-2xl flex-col items-center text-center">
          {kicker && (
            <Badge
              variant="outline"
              className="tf-mono mb-6 rounded-none border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-medium text-[#B9F4D4]"
            >
              {kicker}
            </Badge>
          )}
          <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-.05em] sm:text-6xl">
            {heading}
          </h2>
        </header>

        <div className="mt-12 flex flex-col sm:mt-16">
          {rows.map((row, index) => {
            const reversed = index % 2 === 1;
            return (
              <div key={row.id}>
                <div
                  className={cn(
                    "fr-row flex flex-col gap-10 py-12 sm:py-16 md:flex-row md:items-center md:gap-12 lg:gap-20",
                    reversed && "md:flex-row-reverse",
                  )}
                >
                  <div className="flex flex-1 flex-col items-start gap-6">
                    <div className="fr-reveal flex items-center gap-2.5">
                      <span className="flex size-7 shrink-0 items-center justify-center border border-white/15 bg-white/5">
                        <row.Icon className="size-3.5 text-[#B9F4D4]" aria-hidden="true" />
                      </span>
                      <span className="tf-mono text-[10px] font-medium text-[#B9F4D4]">{row.eyebrow}</span>
                    </div>

                    <h3 className="fr-reveal text-balance text-2xl font-semibold leading-snug tracking-[-.03em] sm:text-[1.75rem]">
                      {row.title}
                    </h3>

                    <p className="fr-reveal flex items-center gap-3">
                      <span className="flex size-[18px] shrink-0 items-center justify-center bg-[#1B8F6A] text-white">
                        <Check className="size-3" aria-hidden="true" />
                      </span>
                      <span className="tf-mono text-xs text-white/70">{row.value}</span>
                    </p>

                    {row.cta && (
                      <a href={row.cta.href} className="fr-reveal tf-btn tf-btn-quiet tf-focus min-h-[40px] px-4 text-xs">
                        {row.cta.label}
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>

                  <figure className="w-full flex-1">
                    <div className="fr-media relative aspect-[4/3] w-full overflow-hidden border border-white/10 bg-[#17201B]">
                      {row.media.endsWith(".mp4") ? (
                        <video src={row.media} className="size-full object-cover" autoPlay muted loop playsInline />
                      ) : (
                        <img
                          src={row.media}
                          alt={row.mediaAlt}
                          className="size-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                      <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 border-t border-white/10 bg-[#0B0F0D]/85 px-4 py-2.5 backdrop-blur-sm">
                        <span className="flex size-5 shrink-0 items-center justify-center border border-white/15 bg-[#0B0F0D]">
                          <row.Icon className="size-3 text-[#B9F4D4]" aria-hidden="true" />
                        </span>
                        <span className="tf-mono truncate text-[10px] text-white/60">{row.caption}</span>
                      </figcaption>
                    </div>
                  </figure>
                </div>

                {index < rows.length - 1 && <Separator className="fr-sep bg-white/10" />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
