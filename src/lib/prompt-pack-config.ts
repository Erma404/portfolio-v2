/**
 * The PO Prompt Pack landing page (/prompt-pack): the only file to edit before launch.
 * See "PO Prompt Pack landing page" in README.md for what each field does.
 */
export const promptPackConfig = {
  /** false: 404 in production, noindex, absent from the sitemap. */
  published: false,
  /** "waitlist": email form only, no price. "sale": Gumroad button and price. */
  mode: "waitlist" as "waitlist" | "sale",
  /** Full Gumroad product URL. Required in "sale" mode. */
  gumroadUrl: "",
  /** URL the email form POSTs to (MailerLite or Kit form). Required in "waitlist" mode. */
  emailFormAction: "",
  emailFieldName: "email",
  /** Name of the provider's custom field for the role. Empty: the role dropdown is hidden. */
  roleFieldName: "",
  /** USD. Must match the price shown on Gumroad. */
  launchPrice: 12,
  regularPrice: 15,
  /** YYYY-MM-DD, last day of the launch price. Empty: only the regular price is shown. */
  launchPriceEndDate: "",
  /** true shows "Tested on real backlog items." Only switch on if it is true. */
  showTestedClaim: false,
  /** Shown next to the guarantee. */
  contactEmail: "",
  /** Linked under the email form. The site has no privacy page yet. */
  privacyPolicyUrl: "",
};

const cfg = promptPackConfig;

const isDev = process.env.NODE_ENV === "development";

/** Fields the chosen mode cannot work without. */
const missingFields: string[] =
  cfg.mode === "sale"
    ? cfg.gumroadUrl ? [] : ["gumroadUrl"]
    : cfg.emailFormAction ? [] : ["emailFormAction"];

/** Published and complete: the only state in which production serves the page. */
export const promptPackLive = cfg.published && missingFields.length === 0;

/** Live, or any state while developing locally. */
export const promptPackVisible = promptPackLive || isDev;

if (cfg.published && missingFields.length > 0) {
  console.warn(
    `\n[prompt-pack] published is true but mode "${cfg.mode}" needs: ${missingFields.join(", ")}. ` +
      `The page is treated as NOT published (404, noindex, not in the sitemap).\n`,
  );
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** True while the launch price still applies (the end date counts as included). */
export function isLaunchPriceActive(now: Date = new Date()) {
  const end = cfg.launchPriceEndDate;
  return DATE_RE.test(end) && end >= now.toISOString().slice(0, 10);
}

/** "2026-11-30" becomes "November 30, 2026". */
export function formatPriceEndDate(end: string) {
  return new Date(`${end}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** The price a visitor pays today, for structured data. */
export function currentPrice(now: Date = new Date()) {
  return isLaunchPriceActive(now) ? cfg.launchPrice : cfg.regularPrice;
}
