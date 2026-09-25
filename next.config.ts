import type { NextConfig } from "next";

/**
 * English is served without a prefix ("/works"), French under "/fr".
 * Pages live in app/[lang]; these rules map the unprefixed URLs to "/en/…".
 * They're declared here rather than in a proxy so the client-side router
 * knows about them too (Link navigation between English pages).
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // One address per page: "/en/…" is the same as the unprefixed URL.
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
    ];
  },
  async rewrites() {
    return {
      // Client portal (static HTML carried over from the previous site): each
      // folder's index.html answers at the folder URL, e.g. /espace-client/fichiers/.
      // beforeFiles rules chain, so subfolders come first: otherwise "/admin" would
      // become "/admin/index.html" and then match "/admin/:path+" again.
      beforeFiles: [
        { source: "/admin/:path+", destination: "/admin/:path+/index.html" },
        { source: "/espace-client/:path+", destination: "/espace-client/:path+/index.html" },
        { source: "/admin", destination: "/admin/index.html" },
        { source: "/espace-client", destination: "/espace-client/index.html" },
      ],
      // afterFiles run after public files and static pages, but before the
      // dynamic [lang] route would swallow "/works" as a locale.
      afterFiles: [
        { source: "/", destination: "/en" },
        {
          source: "/:path((?!en(?:/|$)|fr(?:/|$)|_next/|admin(?:/|$)|espace-client(?:/|$)).*)",
          destination: "/en/:path",
        },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
