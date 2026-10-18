/**
 * What is actually live, computed from prompt-pack-config.ts. Server and build only:
 * it checks the free PDF on disk. Relative imports, because next.config.ts loads it.
 */
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { promptPackConfig as cfg } from "./prompt-pack-config";

const isDev = process.env.NODE_ENV === "development";

const publicDir = path.join(process.cwd(), "public");

/** The free PDF: set in the config, and present in public/ (inside it, not elsewhere). */
function checkGiftPdf() {
  const p = cfg.freeGiftPdfPath;
  if (!p) return { set: false, ok: false, problem: "" };
  const file = path.resolve(publicDir, `.${p.startsWith("/") ? p : `/${p}`}`);
  if (!p.startsWith("/") || !file.startsWith(publicDir + path.sep)) {
    return { set: true, ok: false, problem: `freeGiftPdfPath "${p}" must be a public path starting with "/"` };
  }
  if (!existsSync(file) || !statSync(file).isFile()) {
    return {
      set: true,
      ok: false,
      problem: `freeGiftPdfPath "${p}" points to a file that does not exist (expected at public${p})`,
    };
  }
  return { set: true, ok: true, problem: "" };
}

export const giftPdf = checkGiftPdf();

/** Fields the chosen mode cannot work without. */
const missing: string[] = [];
if (cfg.mode === "sale") {
  if (!cfg.gumroadUrl) missing.push("gumroadUrl");
} else {
  if (!cfg.emailFormAction) missing.push("emailFormAction");
  if (!giftPdf.ok) missing.push(giftPdf.set ? giftPdf.problem : "freeGiftPdfPath");
}

/** Published and complete: the only state in which production serves the page. */
export const promptPackLive = cfg.published && missing.length === 0;

/** Live, or any state while developing locally. */
export const promptPackVisible = promptPackLive || isDev;

/** The free-gift form can only be offered when its confirmation page has a file to hand out. */
export const giftFormReady = Boolean(cfg.emailFormAction) && giftPdf.ok;

/** Sale mode shows the free form only when it works end to end. */
export const showFreeForm = cfg.mode === "sale" && giftFormReady;

/** The thank-you page exists in production only when the gift can actually be downloaded. */
export const thanksVisible = (promptPackLive && giftPdf.ok && giftFormReady) || isDev;

if (cfg.published && missing.length > 0) {
  console.warn(
    `\n[prompt-pack] published is true but mode "${cfg.mode}" needs: ${missing.join("; ")}. ` +
      `The page is treated as NOT published (404, noindex, not in the sitemap).\n`,
  );
}
if (cfg.published && giftPdf.set && !giftPdf.ok && cfg.mode === "sale") {
  console.warn(`\n[prompt-pack] ${giftPdf.problem}. The free-prompts form and the thank-you page are disabled.\n`);
}
