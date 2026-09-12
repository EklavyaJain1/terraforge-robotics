"use client";
import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { Link } from "wouter";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute left-1/2 top-full mt-3 flex -translate-x-1/2 flex-col items-center gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <Link
                  href={item.href}
                  aria-label={item.title}
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-[#17201B]/90 text-white/85 shadow-[0_8px_28px_rgba(0,0,0,.45)] backdrop-blur-md"
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1B8F6A] text-white shadow-[0_10px_32px_rgba(27,143,106,.45)] transition-colors hover:bg-[#0F6F51]"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "hidden h-10 items-center gap-2.5 md:flex",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [32, 44, 32]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [32, 44, 32]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [16, 22, 16]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [16, 22, 16],
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href} aria-label={title}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-white/[.12] transition-colors hover:bg-white/[.2]"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="tooltip"
              initial={{ opacity: 0, y: -8, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -4, x: "-50%" }}
              className="absolute left-1/2 top-full mt-2 w-fit whitespace-pre rounded-md border border-white/15 bg-[#0B0F0D]/90 px-2 py-0.5 text-xs text-white/80 backdrop-blur-md"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex h-full w-full items-center justify-center text-white/75"
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}

export default FloatingDock;
