import { Check, Languages, MoveUpRight } from "lucide-react";
import { House, Images, Info, Mail, Tractor, Wrench } from "lucide-react";
import { Link } from "wouter";
import AuthControls from "@/components/AuthControls";
import NavbarLanguagePicker from "@/components/NavbarLanguagePicker";
import { FloatingDock } from "@/components/ui/floating-dock";
import { useOrderForm } from "@/contexts/OrderContext";
import { useLanguage } from "@/contexts/LanguageContext";

function AppMark() {
  const { t } = useLanguage();
  return (
    <Link href="/" className="tf-focus group flex items-center gap-2" aria-label={t.appMarkAria}>
      <img src="/images/mark-fallback.svg" alt="" className="h-6 w-6 object-contain brightness-0 invert" />
      <span className="relative text-[10px] font-semibold tracking-[.14em] text-white">
        FARM BRO
        {/* Underline slides out from the left on hover */}
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#B9F4D4] transition-transform duration-300 ease-out group-hover:scale-x-100"
        />
      </span>
    </Link>
  );
}

export { AppMark };

export default function Navbar() {
  const { openOrderForm } = useOrderForm();
  const { t } = useLanguage();

  const navItems = [
    { title: t.home, href: "/", icon: <House className="h-full w-full" /> },
    { title: t.farmbro, href: "/farmbro", icon: <Tractor className="h-full w-full" /> },
    { title: t.services, href: "/services", icon: <Wrench className="h-full w-full" /> },
    { title: t.gallery, href: "/gallery", icon: <Images className="h-full w-full" /> },
    { title: t.about, href: "/about", icon: <Info className="h-full w-full" /> },
    { title: t.contact, href: "/contact", icon: <Mail className="h-full w-full" /> },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/12 bg-[#0B0F0D]/55 text-white backdrop-blur-xl">
        <div className="tf-container flex h-[52px] items-center justify-between gap-3">
          <AppMark />

          {/* Floating dock — the primary navigation, top-center */}
          <nav aria-label={t.navAria} className="contents">
            <FloatingDock
              items={navItems}
              desktopClassName="fixed left-1/2 top-1 -translate-x-1/2"
              mobileClassName="fixed left-1/2 top-1 -translate-x-1/2"
            />
          </nav>

          <div className="flex items-center gap-2">
            <NavbarLanguagePicker />
            <AuthControls />
            <button
              type="button"
              onClick={() => openOrderForm()}
              className="tf-focus tf-btn tf-btn-primary min-h-[34px] px-3.5 text-[11px]"
            >
              {t.orderNow} <MoveUpRight size={13} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
