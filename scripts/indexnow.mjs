// Runs after each deploy (see .github/workflows/deploy-pages.yml).
//
// Tells IndexNow engines (Bing, Yandex, Seznam, Naver...) that every page in
// the live sitemap may have changed, so they recrawl within hours instead of
// weeks. Bing's index also feeds Copilot and ChatGPT search.
//
// The key is public by design: IndexNow checks that the file
// https://ernestinematjabo.com/<key>.txt contains it, proving we own the host.
//
// Never fails the workflow: a missed ping only delays recrawling.

const SITE = "https://ernestinematjabo.com";
const KEY = "28715e3c861d9a84b59978df19de405f";
const KEY_LOCATION = `${SITE}/${KEY}.txt`;

const warn = (message) => console.log(`::warning::IndexNow: ${message}`);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// GitHub Pages can take a moment to serve a fresh deploy: wait for the key file.
async function waitForKey() {
  for (let attempt = 1; attempt <= 12; attempt++) {
    const res = await fetch(KEY_LOCATION, { cache: "no-store" }).catch(() => null);
    if (res?.ok && (await res.text()).trim() === KEY) return true;
    await sleep(10_000);
  }
  return false;
}

async function sitemapUrls() {
  const res = await fetch(`${SITE}/sitemap.xml`, { cache: "no-store" });
  if (!res.ok) throw new Error(`sitemap.xml returned HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

try {
  if (!(await waitForKey())) {
    warn(`key file not served at ${KEY_LOCATION}, skipping`);
    process.exit(0);
  }
  const urlList = await sitemapUrls();
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  // 200 = accepted, 202 = accepted and key validation pending.
  if (res.status === 200 || res.status === 202) {
    console.log(`IndexNow: submitted ${urlList.length} URLs (HTTP ${res.status}).`);
  } else {
    warn(`HTTP ${res.status} ${await res.text()}`);
  }
} catch (error) {
  warn(error.message);
}
