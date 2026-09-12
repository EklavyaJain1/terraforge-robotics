import { Check, Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { languages, useLanguage, type LanguageCode } from "@/contexts/LanguageContext";

/** Compact globe picker in the header — switches UI chrome language instantly. */
export default function NavbarLanguagePicker() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`${t.changeLanguage} — ${language.english}`}
        className="tf-focus flex min-h-[34px] items-center gap-1.5 rounded-full border border-white/20 bg-white/[.06] px-2.5 text-[11px] font-medium text-white/85 transition-colors hover:bg-white/[.14] data-[state=open]:bg-white/[.18] sm:px-3"
      >
        <Languages size={14} className="text-[#B9F4D4]" />
        {/* Full native name ≥640px; bare code below — keeps the right header
            group clear of the centered dock toggle at phone widths. */}
        <span className="hidden sm:inline">{language.native}</span>
        <span className="uppercase sm:hidden">{language.code}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="min-w-[190px] rounded-xl border-white/15 bg-[#0B0F0D]/95 py-1.5 text-white shadow-[0_18px_50px_rgba(0,0,0,.5)] backdrop-blur-xl"
      >
        <p className="tf-mono px-3 pb-1.5 pt-1 text-[9px] uppercase tracking-[.14em] text-white/40">
          {t.chooseLanguage}
        </p>
        {languages.map((option) => (
          <DropdownMenuItem
            key={option.code}
            onSelect={() => setLanguage(option.code as LanguageCode)}
            className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm data-[highlighted]:bg-white/10 ${
              option.code === language.code ? "text-[#B9F4D4]" : "text-white/85"
            }`}
          >
            <span>{option.native}</span>
            {option.code === language.code && <Check size={14} className="text-[#B9F4D4]" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
