import type { Locale } from "@/i18n/config";
import { en, type Dictionary } from "./en";
import { fr } from "./fr";

const dictionaries: Record<Locale, Dictionary> = { en, fr };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
