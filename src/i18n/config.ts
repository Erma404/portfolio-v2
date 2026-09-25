export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

/** English is served without a prefix ("/works"), French under "/fr" ("/fr/works"). */
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = { en: "English", fr: "Français" };

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** "/works" → "/works" in English, "/fr/works" in French. Keeps "#hash" suffixes. */
export function localizePath(locale: Locale, path: string) {
  if (locale === defaultLocale) return path;
  if (path === "/") return `/${locale}`;
  if (path.startsWith("/#")) return `/${locale}${path.slice(1)}`;
  return `/${locale}${path}`;
}

/** Strips the locale prefix: "/fr/works" → "/works", "/fr" → "/". */
export function stripLocale(pathname: string) {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname;
}

/** Locale of a browser pathname (no prefix means the default locale). */
export function localeFromPath(pathname: string): Locale {
  const first = pathname.split("/")[1];
  return first && hasLocale(first) ? first : defaultLocale;
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ernestinematjabo.com";

/** hreflang alternates for a locale-free path such as "/works/stefcos". */
export function alternatesFor(path: string, locale: Locale) {
  return {
    canonical: localizePath(locale, path),
    languages: {
      en: localizePath("en", path),
      fr: localizePath("fr", path),
      "x-default": localizePath(defaultLocale, path),
    },
  };
}
