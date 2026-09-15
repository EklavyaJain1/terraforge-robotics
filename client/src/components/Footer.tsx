import { MoveUpRight } from "lucide-react";
import { AppMark } from "./Navbar";
import { useOrderForm } from "@/contexts/OrderContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { openOrderForm } = useOrderForm();
  const { t } = useLanguage();

  return (
    <footer className="tf-dark border-t border-white/10 py-10 sm:py-14">
      <div className="tf-container">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
          <div>
            <AppMark />
            <p className="mt-5 max-w-[260px] text-sm leading-6 text-white/45">{t.footerTagline}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 sm:gap-x-16">
            <div className="tf-mono text-[10px] text-white/35">{t.footerExplore}</div>
            <div className="tf-mono text-[10px] text-white/35">{t.footerConnect}</div>
            <a href="/" className="text-sm text-white/70 hover:text-[#B9F4D4]">{t.footerHome}</a>
            <a href="mailto:hello@farmbro.example" className="text-sm text-white/70 hover:text-[#B9F4D4]">{t.footerEmailTeam}</a>
            <a href="/farmbro" className="text-sm text-white/70 hover:text-[#B9F4D4]">{t.footerFarmbro}</a>
            <a href="/contact" className="text-sm text-white/70 hover:text-[#B9F4D4]">{t.footerBookVisit}</a>
            <a href="/services" className="text-sm text-white/70 hover:text-[#B9F4D4]">{t.footerServices}</a>
            <a href="https://wa.me/919154153925" target="_blank" rel="noreferrer" className="text-sm text-white/70 hover:text-[#B9F4D4]">{t.footerWhatsapp}</a>
            <a href="/about" className="text-sm text-white/70 hover:text-[#B9F4D4]">{t.footerAbout}</a>
            <span className="text-sm text-white/35">© 2026 FarmBro</span>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 text-[10px] text-white/35 sm:flex-row">
          <span className="tf-mono">{t.footerMade}</span>
          <span>{t.footerAutonomy}</span>
        </div>
      </div>
    </footer>
  );
}
