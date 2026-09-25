/**
 * GSAP masonry for the FarmBro gallery.
 * Layout and entrance motion follow the supplied MasonryGallery, fitted to
 * the white / ink / jade page: no color wash and no caption bar on the photos.
 */

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

const COLUMN_QUERIES = ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)", "(min-width: 400px)"];
const COLUMN_VALUES = [5, 4, 3, 2];

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => {
    if (typeof window === "undefined") return defaultValue;
    const match = queries.findIndex((q) => window.matchMedia(q).matches);
    return values[match] !== undefined ? values[match] : defaultValue;
  };

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get());
    const lists = queries.map((q) => window.matchMedia(q));
    lists.forEach((list) => list.addEventListener("change", handler));
    return () => lists.forEach((list) => list.removeEventListener("change", handler));
  }, [queries, values]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        }),
    ),
  );
};

export interface MasonryItem {
  id: string;
  img: string;
  url?: string;
  /** Relative frame height. 400 matches the column width; larger values make a taller tile. */
  height: number;
  title?: string;
}

interface GridItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MasonryGalleryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  className?: string;
  itemClassName?: string;
}

export const MasonryGallery = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  className,
  itemClassName,
}: MasonryGalleryProps) => {
  const columns = useMedia(COLUMN_QUERIES, COLUMN_VALUES, 1);
  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);
  const hasMounted = useRef(false);

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === "random") {
      const dirs = ["top", "bottom", "left", "right"] as const;
      direction = dirs[Math.floor(Math.random() * dirs.length)];
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: window.innerWidth + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    let cancelled = false;
    setImagesReady(false);
    preloadImages(items.map((item) => item.img)).then(() => {
      if (!cancelled) setImagesReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [items]);

  const { grid, containerHeight } = useMemo(() => {
    if (!width) return { grid: [] as GridItem[], containerHeight: 0 };

    const colHeights = new Array(columns).fill(0);
    const gap = 24;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    const gridItems = items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = (child.height / 400) * columnWidth;
      const y = colHeights[col];
      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });

    return { grid: gridItems, containerHeight: Math.max(...colHeights, 0) };
  }, [columns, items, width]);

  useLayoutEffect(() => {
    if (!imagesReady || !grid.length || !containerRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    grid.forEach((item, index) => {
      const element = containerRef.current?.querySelector<HTMLElement>(`[data-key="${item.id}"]`);
      if (!element) return;

      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (reduce) {
        gsap.set(element, { opacity: 1, filter: "none", scale: 1, ...animProps });
        return;
      }

      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(
          element,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: "blur(20px)" }),
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: "blur(0px)" }),
            duration: 1.2,
            ease: "power3.out",
            delay: index * stagger,
          },
        );
      } else {
        gsap.to(element, {
          ...animProps,
          duration,
          ease,
          overwrite: "auto",
        });
      }
    });

    if (grid.length > 0) hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (element: HTMLElement) => {
    if (!scaleOnHover) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(element, { scale: hoverScale, duration: 0.4, ease: "power2.out" });
    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay");
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.4 });
    }
  };

  const handleMouseLeave = (element: HTMLElement) => {
    if (!scaleOnHover) return;
    gsap.to(element, { scale: 1, duration: 0.4, ease: "power2.out" });
    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay");
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.4 });
    }
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)} style={{ height: containerHeight, minHeight: "400px" }}>
      {grid.map((item) => (
        <div
          key={item.id}
          data-key={item.id}
          className={cn("absolute overflow-hidden bg-[#FFFFFF]", item.url && "cursor-pointer", itemClassName)}
          style={{ willChange: "transform, width, height, opacity, filter" }}
          onClick={() => item.url && window.open(item.url, "_blank", "noopener")}
          onMouseEnter={(event) => handleMouseEnter(event.currentTarget)}
          onMouseLeave={(event) => handleMouseLeave(event.currentTarget)}
        >
          <img src={item.img} alt={item.title ?? ""} className="h-full w-full object-cover" />
          {colorShiftOnHover && (
            <div className="color-overlay pointer-events-none absolute inset-0 bg-[#1B8F6A]/30 opacity-0" />
          )}
        </div>
      ))}
    </div>
  );
};

export default MasonryGallery;
