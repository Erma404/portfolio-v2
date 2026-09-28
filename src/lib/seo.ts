import type { Metadata } from "next";
import { alternatesFor, localizePath, siteUrl, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const SITE_NAME = "Ernestine Matjabo";
const OG_LOCALE: Record<Locale, string> = { en: "en_US", fr: "fr_FR" };

type Image = { url: string; width: number; height: number; alt: string };

/**
 * Title, description, hreflang, Open Graph and Twitter tags for a page.
 * Child segments replace `openGraph` wholesale, so every page builds it here.
 */
export function pageMetadata({
  lang,
  path,
  title,
  description,
  image,
  type = "website",
}: {
  lang: Locale;
  path: string;
  title: string;
  description: string;
  image?: Image;
  type?: "website" | "article" | "profile";
}): Metadata {
  const og = image ?? {
    url: `/img/og/og-${lang}.jpg`,
    width: 1200,
    height: 630,
    alt: getDictionary(lang).meta.title,
  };
  return {
    title,
    description,
    alternates: alternatesFor(path, lang),
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: OG_LOCALE[lang],
      alternateLocale: lang === "en" ? OG_LOCALE.fr : OG_LOCALE.en,
      url: localizePath(lang, path),
      title,
      description,
      images: [og],
    },
    twitter: { card: "summary_large_image", title, description, images: [og.url] },
  };
}

export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString();

/** The site owner, referenced by @id from every other JSON-LD block. */
export function personJsonLd(lang: Locale) {
  const { contact } = getDictionary(lang);
  return {
    "@type": "Person",
    "@id": absoluteUrl("/#person"),
    name: SITE_NAME,
    url: absoluteUrl("/"),
    image: absoluteUrl("/img/ernestine.jpg"),
    jobTitle: "Product Manager / Product Owner",
    email: `mailto:${contact.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
    knowsLanguage: ["fr", "en", "es"],
    sameAs: [contact.linkedin],
  };
}

/** Serialises JSON-LD for a <script> tag, escaping "<" so content can't close it. */
export function jsonLd(data: object) {
  return JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c");
}
