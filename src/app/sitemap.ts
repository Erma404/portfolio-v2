import type { MetadataRoute } from "next";
import { localizePath, locales, siteUrl } from "@/i18n/config";
import { getCaseStudies } from "@/lib/case-studies";

export const dynamic = "force-static";

const url = (path: string) => new URL(path, siteUrl).toString();

/** Every page in both languages, each entry listing its translations. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/works", "/about", ...getCaseStudies("en").map((c) => `/works/${c.slug}`)];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      // Static export serves folders, so pages live at a trailing-slash URL.
      url: url(localizePath(locale, path).replace(/\/?$/, "/")),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : path.startsWith("/works/") ? 0.7 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, url(localizePath(l, path).replace(/\/?$/, "/"))]),
        ),
      },
    })),
  );
}
