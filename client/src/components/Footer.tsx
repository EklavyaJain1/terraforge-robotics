import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  // `group` on each anchor drives the hover arrow reveal below.
  const linkCls =
    "tf-focus group inline-flex items-center gap-1 text-sm text-white/70 transition-colors duration-200 hover:text-[#B9F4D4]";
  const arrow = (
    <ArrowUpRight
      size={12}
      className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
    />
  );

  return (
    <footer className="tf-dark border-t border-white/10 py-10 sm:py-14">
      <div className="tf-container">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <img src="/images/mark-fallback.svg" alt="" className="h-6 w-6 object-contain brightness-0 invert" />
              <span className="text-[10px] font-semibold tracking-[.14em] text-white">FARM BRO</span>
            </div>
            <p className="mt-5 max-w-[260px] text-sm leading-6 text-white/45">{t.footerTagline}</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="tf-mono text-[10px] text-white/35">{t.footerExplore}</div>
            <a href="/" className={linkCls}>{t.footerHome}{arrow}</a>
            <a href="/farmbro" className={linkCls}>{t.footerFarmbro}{arrow}</a>
            <a href="/services" className={linkCls}>{t.footerServices}{arrow}</a>
            <a href="/about" className={linkCls}>{t.footerAbout}{arrow}</a>
          </div>
          <div className="flex flex-col gap-3">
            <div className="tf-mono text-[10px] text-white/35">{t.footerConnect}</div>
            <a href="mailto:hello@farmbro.example" className={linkCls}>{t.footerEmailTeam}{arrow}</a>
            <a href="/contact" className={linkCls}>{t.footerBookVisit}{arrow}</a>
            <a href="https://wa.me/919154153925" target="_blank" rel="noreferrer" className={linkCls}>{t.footerWhatsapp}{arrow}</a>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-[10px] text-white/35">
          <span className="tf-mono">{t.footerMade}</span>
          <span>{t.footerAutonomy}</span>
        </div>
      </div>
    </footer>
  );
}
