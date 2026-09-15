import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dictionaries, languages, type Language, type LanguageCode, type UiStrings } from "@/i18n";

// Re-exported for existing consumers (NavbarLanguagePicker).
export { languages };
export type { Language, LanguageCode };

interface LanguageContextValue {
  language: Language;
  setLanguage: (code: LanguageCode) => void;
  /** UI strings for the active language. */
  t: UiStrings;
}

const STORAGE_KEY = "farmbro-language";

function readStoredLanguage(): LanguageCode {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && Object.prototype.hasOwnProperty.call(dictionaries, stored)) return stored as LanguageCode;
  } catch {
    /* storage unavailable — English stays the default */
  }
  return "en";
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState<LanguageCode>(readStoredLanguage);

  // The choice survives reloads; <html lang> follows so assistive tech
  // announces pages in the right language.
  useEffect(() => {
    document.documentElement.lang = code;
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
  }, [code]);

  const setLanguage = useCallback((next: LanguageCode) => setCode(next), []);

  const value = useMemo<LanguageContextValue>(() => {
    const language = languages.find((l) => l.code === code) ?? languages[0];
    return { language, setLanguage, t: dictionaries[code] };
  }, [code, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
