import type { Locale } from "@/i18n/config";
import { caseStudiesEn } from "@/i18n/case-studies/en";
import { caseStudiesFr } from "@/i18n/case-studies/fr";

// Case studies shown on /works and /works/[slug].
// Content rule: only facts confirmed by Ernestine. Missing figures are left out,
// never estimated.

export type Visual = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /**
   * "browser" wraps a site capture in a window frame; "photo" is a full-bleed
   * mockup photo; "plain" shows the image as-is.
   */
  frame?: "browser" | "photo" | "plain";
  caption?: string;
};

export type Stat = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  summary: string;
  period: string;
  kind: string;
  /** Tailwind gradient classes for the card and hero backdrop. */
  tint: string;
  cover: Visual;
  meta: { role: string; period: string; tools: string; team: string };
  context: string[];
  problem?: { intro: string; points?: string[] };
  role: { title: string; text: string }[];
  approach?: { intro?: string; steps: { title: string; text: string }[] };
  gallery: Visual[];
  impact?: { intro?: string; stats?: Stat[]; points?: string[] };
  learnings?: string[];
};


const byLocale: Record<Locale, CaseStudy[]> = { en: caseStudiesEn, fr: caseStudiesFr };

/** Case studies in display order (most recent first). */
export function getCaseStudies(locale: Locale) {
  return byLocale[locale];
}

export function getCaseStudy(locale: Locale, slug: string) {
  return byLocale[locale].find((c) => c.slug === slug);
}
