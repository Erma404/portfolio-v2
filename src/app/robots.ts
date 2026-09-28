import type { MetadataRoute } from "next";
import { siteUrl } from "@/i18n/config";

export const dynamic = "force-static";

// Open to search engines and AI assistants alike: the goal is to be found and cited.
// The client portal and admin pages are private and stay out of the index.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin/", "/espace-client/"] },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
    host: siteUrl,
  };
}
