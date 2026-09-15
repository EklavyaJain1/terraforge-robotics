import type { RobotId } from "@/data/catalog";
import { en, type AttachmentStrings, type MachineStrings, type UiStrings } from "./en";
import { gu } from "./gu";
import { hi } from "./hi";
import { kn } from "./kn";
import { ml } from "./ml";
import { pa } from "./pa";
import { te } from "./te";

export type { AttachmentStrings, MachineStrings, UiStrings };
export type { RobotId };

export type LanguageCode = "en" | "hi" | "ml" | "te" | "kn" | "gu" | "pa";

export interface Language {
  code: LanguageCode;
  /** Native name, shown in the picker. */
  native: string;
  /** English name, for accessibility labels. */
  english: string;
}

export const languages: Language[] = [
  { code: "en", native: "English", english: "English" },
  { code: "hi", native: "हिन्दी", english: "Hindi" },
  { code: "ml", native: "മലയാളം", english: "Malayalam" },
  { code: "te", native: "తెలుగు", english: "Telugu" },
  { code: "kn", native: "ಕನ್ನಡ", english: "Kannada" },
  { code: "gu", native: "ગુજરાતી", english: "Gujarati" },
  { code: "pa", native: "ਪੰਜਾਬੀ", english: "Punjabi" },
];

/** Every language ships a complete dictionary — TypeScript enforces it. */
export const dictionaries: Record<LanguageCode, UiStrings> = { en, hi, ml, te, kn, gu, pa };

/** Minimal {var} interpolation for translated templates. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}
