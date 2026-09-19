import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type BentoCard = {
  id: number;
  /** Content shown on hover (bottom overlay). */
  content: ReactNode;
  className: string;
  thumbnail: string;
  alt: string;
};

/**
 * Bento layout-grid — adapted from the provided LayoutGrid pattern with the
 * click-to-expand response removed entirely, per request. Cards respond to
 * hover only: the image lifts and the caption overlay fades in. Nothing is
 * clickable, so no order response exists to remove.
 */
export function BentoGallery({ cards }: { cards: BentoCard[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <motion.figure
          key={card.id}
          className={cn(
            "group relative overflow-hidden bg-[#17201B] shadow-[0_18px_44px_rgba(17,19,17,.12)]",
            card.className
          )}
          whileHover="hover"
          initial="rest"
          animate="rest"
        >
          {card.thumbnail.endsWith(".mp4") ? (
            <motion.video
              src={card.thumbnail}
              autoPlay
              loop
              muted
              playsInline
              variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <motion.img
              src={card.thumbnail}
              alt={card.alt}
              loading="lazy"
              decoding="async"
              variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <motion.div
            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#0B0F0D]/85 via-[#0B0F0D]/10 to-transparent p-6"
          >
            {card.content}
          </motion.div>
        </motion.figure>
      ))}
    </div>
  );
}

export default BentoGallery;
