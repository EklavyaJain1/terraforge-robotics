import { useState } from "react";
import { Menu, MoveUpRight, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useOrderForm } from "@/contexts/OrderContext";

const navItems = [
  { label: "Home", href: "/" },
  { label: "FarmBro", href: "/farmbro" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function AppMark({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="tf-focus flex items-center gap-2" aria-label="TerraForge Robotics home">
      <img src="/images/mark-fallback.svg" alt="" className={`h-8 w-8 object-contain ${dark ? "brightness-0 invert" : ""}`} />
      <span className={`text-[11px] font-semibold tracking-[.14em] ${dark ? "text-white" : "text-[#111311]"}`}>TERRAFORGE</span>
    </Link>
  );
}

export { AppMark };

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const { openOrderForm } = useOrderForm();

  const handleOrderNow = () => {
    setMenuOpen(false);
    openOrderForm();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#0B0F0D]/30 text-white backdrop-blur-[10px]">
      <div className="tf-container flex h-[72px] items-center justify-between">
        <AppMark dark />
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`tf-focus relative text-[11px] font-medium transition-colors hover:text-white ${
                  isActive ? "text-white after:absolute after:-bottom-[27px] after:left-0 after:h-[2px] after:w-full after:bg-[#1B8F6A]" : "text-white/70"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleOrderNow}
            className="tf-focus tf-btn tf-btn-primary hidden min-h-[38px] px-4 text-[11px] sm:inline-flex"
          >
            Order Now <MoveUpRight size={13} />
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="tf-focus inline-flex h-10 w-10 items-center justify-center lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-white/15 bg-[#111311] px-6 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`tf-mono text-[11px] hover:text-[#1B8F6A] ${location === item.href ? "text-[#53C98B]" : "text-white/80"}`}
              >
                {item.label}
              </Link>
            ))}
            <button type="button" onClick={handleOrderNow} className="tf-btn tf-btn-primary mt-2 w-full text-[11px]">
              Order Now <MoveUpRight size={14} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
