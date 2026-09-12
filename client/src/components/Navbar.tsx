import { House, Images, Info, Mail, MoveUpRight, Tractor, Wrench } from "lucide-react";
import { Link } from "wouter";
import { FloatingDock } from "@/components/ui/floating-dock";
import { useOrderForm } from "@/contexts/OrderContext";

const navItems = [
  { title: "Home", href: "/", icon: <House className="h-full w-full" /> },
  { title: "FarmBro", href: "/farmbro", icon: <Tractor className="h-full w-full" /> },
  { title: "Services", href: "/services", icon: <Wrench className="h-full w-full" /> },
  { title: "Gallery", href: "/gallery", icon: <Images className="h-full w-full" /> },
  { title: "About", href: "/about", icon: <Info className="h-full w-full" /> },
  { title: "Contact", href: "/contact", icon: <Mail className="h-full w-full" /> },
];

function AppMark() {
  return (
    <Link href="/" className="tf-focus flex items-center gap-2" aria-label="FarmBro home">
      <img src="/images/mark-fallback.svg" alt="" className="h-8 w-8 object-contain brightness-0 invert" />
      <span className="text-[11px] font-semibold tracking-[.14em] text-white">FARM BRO</span>
    </Link>
  );
}

export { AppMark };

export default function Navbar() {
  const { openOrderForm } = useOrderForm();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/12 bg-[#0B0F0D]/55 text-white backdrop-blur-xl">
        <div className="tf-container flex h-[64px] items-center justify-between gap-4">
          <AppMark />

          {/* Floating dock — the primary navigation, top-center */}
          <nav aria-label="Primary navigation" className="contents">
            <FloatingDock
              items={navItems}
              desktopClassName="fixed left-1/2 top-3 -translate-x-1/2"
              mobileClassName="fixed left-1/2 top-3 -translate-x-1/2"
            />
          </nav>

          <button
            type="button"
            onClick={() => openOrderForm()}
            className="tf-focus tf-btn tf-btn-primary min-h-[38px] px-4 text-[11px]"
          >
            Order Now <MoveUpRight size={13} />
          </button>
        </div>
      </header>
    </>
  );
}
