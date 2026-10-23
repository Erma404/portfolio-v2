/**
 * The PO Prompt Pack landing page (/prompt-pack): the only file to edit before launch.
 * See "PO Prompt Pack landing page" in README.md for what each field does.
 *
 * Data and pure helpers only, so client components can import it. What is live and
 * what is missing is computed in prompt-pack-state.ts (it reads the file system).
 */
export const promptPackConfig = {
  /** false: 404 in production, noindex, absent from the sitemap. */
  published: true,
  /** "waitlist": email form only, no price. "sale": Gumroad button and price. */
  mode: "sale" as "waitlist" | "sale",
  /** Full Gumroad product URL. Required in "sale" mode. */
  gumroadUrl: "https://ernestine61.gumroad.com/l/jjlbt",
  /** URL the email form POSTs to (MailerLite or Kit form). Required in "waitlist" mode. */
  emailFormAction: "https://app.kit.com/forms/10062604/subscriptions",
  emailFieldName: "email_address",
  /** Public path of the free PDF, e.g. "/downloads/po-prompts-3f9a1c7e2b64d081.pdf". The file must exist in public/. Required in "waitlist" mode. */
  freeGiftPdfPath: "/downloads/po-prompts-aaeefe27bfe6215b.pdf",
  /** Where the form sends the visitor after a successful signup. The page itself is app/[lang]/prompt-pack/thanks. */
  thankYouPath: "/prompt-pack/thanks",
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

/** Folder URLs on this site end with a slash (static export). Query and file extensions are left alone. */
export function withTrailingSlash(path: string) {
  return /[?#]|\.[a-z0-9]+$/i.test(path) ? path : path.replace(/\/?$/, "/");
}
