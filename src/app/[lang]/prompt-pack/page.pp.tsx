import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { EmailForm } from "@/components/prompt-pack/email-form";
import { PriceLine } from "@/components/prompt-pack/price-line";
import { StickyCta } from "@/components/prompt-pack/sticky-cta";
import { MeshCard, PackHeader } from "@/components/prompt-pack/parts";
import { ctaClass } from "@/components/prompt-pack/styles";
import { localizePath } from "@/i18n/config";
import {
  currentPrice,
  isLaunchPriceActive,
  promptPackConfig as config,
  withTrailingSlash,
} from "@/lib/prompt-pack-config";
import { promptPackLive, promptPackVisible, showFreeForm } from "@/lib/prompt-pack-state";
import { absoluteUrl, jsonLd, pageMetadata, personJsonLd } from "@/lib/seo";

const PATH = "/prompt-pack";
const TITLE = "25 AI Prompts for Product Owners | Ernestine Matjabo";
const DESCRIPTION =
  "25 AI prompts for Product Owners to turn meeting notes into user stories, acceptance criteria and PRDs. PDF + Notion. 30-day money-back guarantee.";

const BUY_LABEL = "Get the Prompt Pack";
const FREE_LABEL = "Send me the 5 free prompts";

// This file is named page.pp.tsx on purpose: next.config.ts only registers the "pp.tsx"
// extension when the page is live (or in development). Otherwise the route does not exist
// at all, so production has a real 404 and no HTML file is exported.
// English only: /fr/prompt-pack is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }];
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata = pageMetadata({ lang: "en", path: PATH, title: TITLE, description: DESCRIPTION });
  return {
    ...metadata,
    // No French version: canonical only, no hreflang pairs.
    alternates: { canonical: localizePath("en", PATH) },
    robots: promptPackLive ? undefined : { index: false, follow: false },
  };
}

const beforeAfter = {
  note: "This example is anonymized and rebuilt from typical cases, not taken from a real client.",
  before: {
    label: "A first-attempt prompt",
    prompt: "Write a user story for password reset",
    story: "As a user, I want to reset my password so that I can log in.",
    criteria: "The user can reset their password.",
  },
  after: {
    label: "A prompt from this pack",
    story:
      "As a returning customer who forgot my password, I want to reset it from the login page so that I can get back into my account without contacting support.",
    criteria: [
      "Given I enter an email linked to an account, when I request a reset, then I receive a reset link by email.",
      "Given I enter an email not linked to any account, when I request a reset, then I see the same confirmation message as above, so account existence is not revealed.",
      "Given I open a reset link after it has expired, when the page loads, then I see an expiry message and a way to request a new link.",
      "Given I request several resets in a short time, when I exceed the limit, then I am asked to wait before trying again.",
    ],
  },
  conclusion: "Same tool, same five minutes. The second version is something a dev team can estimate.",
};

const blocks = [
  {
    title: "Stories (6 prompts)",
    text: "Turn raw notes into user stories, split a story that is too big, rewrite a story around user value.",
  },
  {
    title: "Acceptance criteria (5 prompts)",
    text: "Generate Given/When/Then criteria, surface edge cases and error cases, review criteria you already have.",
  },
  {
    title: "PRD and scoping (5 prompts)",
    text: "One-page PRD, problem statement and non-goals, the questions to ask before you write anything.",
  },
  {
    title: "Prioritization (4 prompts)",
    text: "RICE-style scoring from partial data, a prioritization argument you can bring to stakeholders.",
  },
  {
    title: "Retros and ceremonies (5 prompts)",
    text: "Retro summaries, theme grouping, a refinement agenda, a sprint review write-up.",
  },
];

const bonuses = [
  {
    title: "The Context Block",
    text: "A half-page template you fill in once (product, users, vocabulary, constraints) and paste at the top of any prompt. This is what stops the answers from sounding generic.",
  },
  {
    title: "The AI Story Review Checklist",
    text: "One page to check an AI-written story before you show it to the team: testable, independent, right-sized, no hidden assumptions.",
  },
  {
    title: "The Refinement Question Bank",
    text: "20 questions developers ask most often in refinement. Run your own stories against them before the meeting.",
  },
];

const faq = [
  {
    q: "Who is this for?",
    a: "Junior to mid-level Product Owners and Product Managers working in an agile team, who already use an AI assistant and want better first drafts.",
  },
  {
    q: "Which AI tools does it work with?",
    a: "The prompts are plain text, so you can paste them into the AI assistant you already use.",
  },
  {
    q: "Do I need Notion?",
    a: "No. The PDF contains everything. The Notion database is a convenience.",
  },
  {
    q: "Will the AI replace my judgment?",
    a: "No, and the pack is built on that idea. The review checklist and the \"where AI gets this wrong\" notes are there so you check the output before it reaches your team.",
  },
  {
    q: "Can I use the prompts at work?",
    a: "Yes. They are yours to use in your own work. Please don't resell or redistribute the pack itself.",
  },
  {
    q: "What if it doesn't help?",
    a: "Email me within 30 days for a full refund.",
  },
];

const sale = config.mode === "sale";
const showFreeBlock = showFreeForm;

function Form() {
  return (
    <EmailForm
      action={config.emailFormAction}
      emailFieldName={config.emailFieldName}
      roleFieldName={config.roleFieldName}
      privacyPolicyUrl={config.privacyPolicyUrl}
      thankYouPath={withTrailingSlash(config.thankYouPath)}
    />
  );
}

function BuyButton({ className = "" }: { className?: string }) {
  return (
    <a href={config.gumroadUrl || "#"} rel="noopener" className={`${ctaClass} ${className}`}>
      {BUY_LABEL}
    </a>
  );
}

/** Section title as on the home page: serif, centered. */
function SectionTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="mx-auto max-w-2xl text-center font-serif text-3xl leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
    >
      {children}
    </h2>
  );
}

const card = "rounded-3xl bg-white shadow-[0_10px_30px_-18px_rgba(0,0,0,0.25)]";
const prose = "text-base leading-relaxed text-foreground/75 sm:text-lg";

export default async function PromptPackPage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  if (lang !== "en" || !promptPackVisible) notFound();

  const launchActive = isLaunchPriceActive();

  const productJsonLd = sale && promptPackLive && {
    "@type": "Product",
    name: "The PO Prompt Pack",
    description: DESCRIPTION,
    url: absoluteUrl(`${localizePath("en", PATH)}/`),
    image: absoluteUrl("/img/og/og-en.jpg"),
    brand: { "@type": "Brand", name: "Ernestine Matjabo" },
    author: personJsonLd("en"),
    offers: {
      "@type": "Offer",
      price: String(currentPrice()),
      priceCurrency: "USD",
      url: config.gumroadUrl,
      availability: "https://schema.org/InStock",
    },
  };

  const headerHref = sale ? config.gumroadUrl || "#" : "#final-cta";

  return (
    <>
      {productJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(productJsonLd) }} />
      )}

      {/* Opaque layer over the sticky footer (see the home page). */}
      <div className="relative z-10 flex flex-1 flex-col bg-background">
        {!promptPackLive && (
          <p className="bg-[#141414] px-4 py-2 text-center text-sm text-white">
            Development preview. This page is not published: it returns a 404 in production.
          </p>
        )}

        <PackHeader cta={{ href: headerHref, label: sale ? BUY_LABEL : FREE_LABEL, external: sale }} />

        <main className="flex-1">
          {/* Hero: tucked under the pill like the home hero */}
          <section className="mx-auto -mt-[52px] max-w-[1260px] px-3 pt-3 sm:-mt-[60px] sm:px-4 sm:pt-4">
            <MeshCard>
              <div className="flex flex-col items-center px-6 pb-16 pt-28 text-center sm:pb-24 sm:pt-36">
                <h1 className="hero-rise max-w-4xl text-balance font-serif text-[clamp(2.4rem,5.6vw,4.6rem)] leading-[1.05] tracking-tight text-foreground">
                  User stories your dev team won&apos;t send back: 25 AI prompts for product owners
                </h1>
                <p
                  style={{ animationDelay: "0.15s" }}
                  className="hero-rise mt-8 max-w-xl text-lg text-foreground/70"
                >
                  A Lead PO&apos;s prompts for turning meeting notes into user stories, acceptance criteria
                  and PRDs. PDF + Notion. 30-day money-back guarantee.
                </p>
                <div
                  id="hero-cta"
                  style={{ animationDelay: "0.3s" }}
                  className="hero-rise mt-10 w-full max-w-md"
                >
                  {sale ? <BuyButton /> : <Form />}
                </div>
              </div>
            </MeshCard>
          </section>

          {/* The problem */}
          <section className="bg-[#fafafa] px-4 py-24 sm:px-6 sm:py-32" aria-labelledby="problem">
            <SectionTitle id="problem">The problem</SectionTitle>
            <div className="mx-auto mt-10 max-w-2xl space-y-5">
              <p className={prose}>
                You already use AI to write stories. The output looks fine at first glance, then
                refinement starts.
              </p>
              <p className={prose}>
                The developers ask what happens when the user has no email. The acceptance criteria
                can&apos;t be tested. The story is really three stories. So you spend your evening
                rewriting what the AI gave you in thirty seconds.
              </p>
              <p className="font-serif text-2xl leading-snug text-foreground sm:text-3xl">
                The problem is rarely the tool. It is the prompt. A generic prompt gets a generic story.
              </p>
            </div>
          </section>

          {/* Before / after */}
          <section className="bg-[#fdf6ef] px-4 py-24 sm:px-6 sm:py-32" aria-labelledby="difference">
            <SectionTitle id="difference">What the difference looks like</SectionTitle>
            <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-muted sm:text-base">
              {beforeAfter.note}
            </p>

            <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2 md:gap-6">
              <div className={`${card} p-6 sm:p-8`}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                  {beforeAfter.before.label}
                </h3>
                <p className="mt-3 rounded-xl bg-[#f7f5f0] px-4 py-3 text-base text-foreground">
                  &quot;{beforeAfter.before.prompt}&quot;
                </p>
                <p className="mt-5 text-base leading-relaxed text-foreground/80">
                  <strong className="font-semibold text-foreground">Story:</strong> {beforeAfter.before.story}
                </p>
                <p className="mt-3 text-base leading-relaxed text-foreground/80">
                  <strong className="font-semibold text-foreground">Acceptance criteria:</strong>{" "}
                  {beforeAfter.before.criteria}
                </p>
              </div>

              {/* Dark card, like the footer: the better prompt is the one that stands out. */}
              <div className="rounded-3xl bg-[#141414] p-6 text-white shadow-[0_10px_30px_-18px_rgba(0,0,0,0.5)] sm:p-8">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[#f08a4b]">
                  {beforeAfter.after.label}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-white/85">
                  <strong className="font-semibold text-white">Story:</strong> {beforeAfter.after.story}
                </p>
                <p className="mt-3 text-base font-semibold text-white">Acceptance criteria:</p>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-base leading-relaxed text-white/85 marker:text-[#f08a4b]">
                  {beforeAfter.after.criteria.map((criterion) => (
                    <li key={criterion}>{criterion}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-6 text-center">
              <p className="font-serif text-2xl leading-snug text-foreground sm:text-3xl">
                {beforeAfter.conclusion}
              </p>
              {sale ? (
                <BuyButton />
              ) : (
                <a href="#final-cta" className={ctaClass}>
                  {FREE_LABEL}
                </a>
              )}
            </div>
          </section>

          {/* What's inside */}
          <section className="bg-[#fafafa] px-4 py-24 sm:px-6 sm:py-32" aria-labelledby="inside">
            <SectionTitle id="inside">What&apos;s inside</SectionTitle>
            <p className={`${prose} mx-auto mt-6 max-w-2xl text-center`}>
              25 prompts in five blocks. Each prompt comes with a context block to fill in, the prompt to
              copy, a sample input, a sample output, and one pitfall to watch for.
            </p>

            <ol className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {blocks.map((block, i) => (
                <li
                  key={block.title}
                  className={`${card} p-6 ${i >= 3 ? "lg:col-span-3" : "lg:col-span-2"}`}
                >
                  <span aria-hidden className="font-serif text-4xl text-[#e2632a]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">{block.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-foreground/75">{block.text}</p>
                </li>
              ))}
            </ol>

            <div className="mx-auto mt-12 max-w-2xl space-y-4">
              <p className={prose}>
                You get two formats: a clean PDF (one prompt per page) and a Notion database you can
                duplicate and filter by task.
              </p>
              <p className={prose}>
                Every prompt includes a short note: &quot;Why this works in refinement&quot; or
                &quot;Where AI gets this wrong.&quot;
              </p>
              {config.showTestedClaim && <p className={prose}>Tested on real backlog items.</p>}
            </div>
          </section>

          {/* Bonuses */}
          <section className="bg-[#fdf6ef] px-4 py-24 sm:px-6 sm:py-32" aria-labelledby="bonuses">
            <SectionTitle id="bonuses">Three bonuses, included</SectionTitle>
            <ul className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
              {bonuses.map((bonus) => (
                <li
                  key={bonus.title}
                  className="rounded-3xl border border-[#f5824f]/25 bg-white p-6 shadow-[0_2px_14px_rgba(245,130,79,0.12)]"
                >
                  <h3 className="flex items-center gap-3 font-serif text-2xl text-foreground">
                    <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#e2543c]" />
                    {bonus.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-foreground/75">{bonus.text}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* About the author */}
          <section className="bg-[#fafafa] px-4 py-24 sm:px-6 sm:py-32" aria-labelledby="author">
            <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-[160px_1fr] sm:items-start sm:gap-10">
              <Image
                src="/img/ernestine.jpg"
                alt="Ernestine Matjabo"
                width={160}
                height={160}
                className="h-32 w-32 rounded-3xl object-cover shadow-[0_10px_30px_-18px_rgba(0,0,0,0.25)] sm:h-40 sm:w-40"
              />
              <div className="space-y-4">
                <h2
                  id="author"
                  className="font-serif text-3xl leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
                >
                  About the author
                </h2>
                <p className={prose}>
                  I&apos;m Ernestine, a Lead Product Owner and Senior Product Manager with 9+ years in
                  digital product, fintech and e-commerce. I have written and defended a lot of backlog
                  items in refinement, and I built these prompts to get usable drafts faster.
                </p>
                <p className={prose}>
                  I use AI every day in my own work and in my freelance projects (web, SEO audits,
                  prototyping). The prompts are the ones I wanted when I started.
                </p>
              </div>
            </div>
          </section>

          {/* Guarantee: the peach wash of the contact section */}
          <section className="mx-auto max-w-[1260px] px-3 pb-24 sm:px-4 sm:pb-32" aria-labelledby="guarantee">
            <div className="overflow-hidden rounded-[2rem] bg-gradient-to-b from-white via-[#fdf1e8] to-[#f6c3a2] px-6 py-16 text-center sm:rounded-[3rem] sm:py-24">
              <SectionTitle id="guarantee">Guarantee</SectionTitle>
              <p className={`${prose} mx-auto mt-6 max-w-xl text-foreground/80`}>
                Use the prompts on your real backlog. If they don&apos;t make your next refinement easier,
                email me within 30 days and I&apos;ll refund you. No questions asked.
              </p>
              {config.contactEmail && (
                <p className={`${prose} mt-3`}>
                  <a
                    href={`mailto:${config.contactEmail}`}
                    className="font-medium text-foreground underline underline-offset-4 hover:text-[#b84a17]"
                  >
                    {config.contactEmail}
                  </a>
                </p>
              )}
            </div>
          </section>

          {/* Closing CTA: price + buy, or the waitlist */}
          <section
            id="final-cta"
            aria-labelledby={sale ? "price" : "waitlist"}
            className="mx-auto max-w-[1260px] scroll-mt-6 px-3 pb-24 sm:px-4 sm:pb-32"
          >
            <MeshCard>
              <div className="flex flex-col items-center px-6 py-16 text-center sm:py-24">
                {sale ? (
                  <>
                    <h2 id="price" className="sr-only">
                      Price
                    </h2>
                    <PriceLine buildTimeActive={launchActive} />
                    <p className={`${prose} mt-4 max-w-md`}>
                      Instant access after purchase. One-time payment, no subscription.
                    </p>
                    <div className="mt-8">
                      <BuyButton />
                    </div>
                  </>
                ) : (
                  <>
                    <h2
                      id="waitlist"
                      className="font-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl"
                    >
                      Launching soon.
                    </h2>
                    <p className={`${prose} mt-4 max-w-xl text-foreground/80`}>
                      Join the list for 5 of the prompts for free, plus first access to the launch price
                      when the pack goes live.
                    </p>
                    <div className="mt-8 w-full max-w-md">
                      <Form />
                    </div>
                    <p className="mt-6 text-sm text-muted">
                      Already convinced?{" "}
                      <a
                        href="https://ernestine61.gumroad.com/l/jjlbt"
                        rel="noopener"
                        className="text-foreground underline underline-offset-4 hover:text-[#b84a17]"
                      >
                        Get the full pack for $12 →
                      </a>
                    </p>
                  </>
                )}
              </div>
            </MeshCard>
          </section>

          {showFreeBlock && (
            <section className="bg-[#fafafa] px-4 pb-24 sm:px-6 sm:pb-32" aria-labelledby="free-prompts">
              <SectionTitle id="free-prompts">Not ready yet? Get 5 of the prompts for free.</SectionTitle>
              <div className="mx-auto mt-8 max-w-md">
                <Form />
              </div>
            </section>
          )}

          {/* FAQ: same cream panel as the home FAQ */}
          <section className="bg-[#fdf6ef] py-24 sm:py-32" aria-labelledby="faq">
            <div className="mx-auto grid max-w-[1260px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-16">
              <h2
                id="faq"
                className="font-serif text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:sticky lg:top-28"
              >
                FAQ
              </h2>
              <div className="flex flex-col gap-2.5 rounded-3xl border border-black/5 bg-[#f1ede6] p-2.5">
                {faq.map((item) => (
                  <details key={item.q} className="group rounded-2xl bg-[#fbf9f5] transition-colors hover:bg-white">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-2xl px-6 py-6 text-left text-base font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-[#b84a17] sm:text-lg [&::-webkit-details-marker]:hidden">
                      <span>{item.q}</span>
                      <span
                        aria-hidden
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/15 text-2xl leading-none text-muted transition-transform group-open:rotate-45 motion-reduce:transition-none"
                      >
                        +
                      </span>
                    </summary>
                    <p className="px-6 pb-6 pr-16 text-sm leading-relaxed text-muted sm:text-base">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* Room for the fixed mobile bar */}
          <div className="h-20 md:hidden" aria-hidden />
        </main>
      </div>

      <StickyCta
        href={sale ? config.gumroadUrl || "#" : "#final-cta"}
        label={sale ? BUY_LABEL : FREE_LABEL}
        external={sale}
      />
      <Footer />
    </>
  );
}
