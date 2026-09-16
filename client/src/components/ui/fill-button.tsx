import { useCallback, useLayoutEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Fill-from-pointer button — adapted from the OriginButton pattern.
 * Instead of the provided component's black/white theme tokens, the fill uses
 * the site's jade ink so the radial wipe reads as a jade flood on light CTAs.
 */
type FillButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { children?: ReactNode };

function getCoverDiameter(width: number, height: number, x: number, y: number) {
  return Math.ceil(
    2 * Math.max(Math.hypot(x, y), Math.hypot(width - x, y), Math.hypot(x, height - y), Math.hypot(width - x, height - y))
  );
}

export function FillButton({ children, className, disabled = false, onClick, onPointerDown, ...props }: FillButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [coverSize, setCoverSize] = useState(0);

  const updateOrigin = useCallback((x: number, y: number) => {
    const node = buttonRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    setOrigin({ x, y });
    setCoverSize(getCoverDiameter(rect.width, rect.height, x, y));
  }, []);

  const showFill = !disabled && hovered;

  useLayoutEffect(() => {
    const node = buttonRef.current;
    if (!(node && showFill)) return;
    const measure = () => {
      const rect = node.getBoundingClientRect();
      setCoverSize(getCoverDiameter(rect.width, rect.height, origin.x, origin.y));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [showFill, origin.x, origin.y]);

  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        "relative inline-flex cursor-pointer touch-manipulation select-none items-center justify-center overflow-hidden",
        "min-h-[46px] rounded-full border border-transparent px-5 text-[13px] font-semibold",
        "bg-[#1B8F6A] text-white shadow-[0_6px_22px_rgba(27,143,106,.2)]",
        "transition-[color] duration-300 ease-[cubic-bezier(.16,1,.3,1)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B8F6A]/60 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        showFill && "text-[#1B8F6A]",
        className
      )}
      onBlur={() => setHovered(false)}
      onClick={onClick}
      onPointerEnter={(e) => {
        if (disabled) return;
        const rect = e.currentTarget.getBoundingClientRect();
        updateOrigin(e.clientX - rect.left, e.clientY - rect.top);
        setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onPointerDown={onPointerDown}
      ref={buttonRef}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]"
        style={{
          height: coverSize,
          width: coverSize,
          left: origin.x,
          top: origin.y,
          transform: `translate(-50%, -50%) scale(${showFill && coverSize > 0 ? 1 : 0})`,
        }}
      />
      <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
    </button>
  );
}

export default FillButton;
