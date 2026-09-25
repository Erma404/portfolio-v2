// Runs after `PAGES_BUILD=1 next build` (see package.json "build:pages").
//
// The app keeps every page under /[lang]/, so the static export produces
// out/en/... and out/fr/.... On Vercel, rewrites serve English at the root;
// GitHub Pages has no rewrites, so English pages are moved to the root here:
//   out/en/index.html        -> out/index.html
//   out/en/works/index.html  -> out/works/index.html   (and their RSC .txt payloads)
// French stays under out/fr/. The /en/ copy is then removed so each page has
// a single address, matching the canonical/hreflang URLs.

import { cp, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";

const out = path.resolve("out");
const en = path.join(out, "en");

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

if (!(await exists(en))) {
  console.error("pages-postbuild: out/en not found — run `PAGES_BUILD=1 next build` first.");
  process.exit(1);
}

// Never let a moved page overwrite something already at the root
// (portal pages, assets, _next): fail loudly instead.
for (const entry of await readdir(en)) {
  const target = path.join(out, entry);
  if (entry !== "index.html" && entry !== "index.txt" && (await exists(target))) {
    const isDir = (await stat(target)).isDirectory();
    if (!isDir) {
      console.error(`pages-postbuild: refusing to overwrite out/${entry}`);
      process.exit(1);
    }
  }
}

await cp(en, out, { recursive: true, force: true });
await rm(en, { recursive: true, force: true });

console.log("pages-postbuild: English pages moved to the root of out/.");
