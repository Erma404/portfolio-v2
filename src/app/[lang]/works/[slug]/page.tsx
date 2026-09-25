import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { CaseVisual } from "@/components/works/case-visual";
import { WorkCard } from "@/components/works/work-card";
import { getCaseStudies, getCaseStudy } from "@/lib/case-studies";
import { alternatesFor, hasLocale, localizePath, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    getCaseStudies(lang).map((study) => ({ lang, slug: study.slug })),
  );
}

export async function generateMetadata(
  props: PageProps<"/[lang]/works/[slug]">,
): Promise<Metadata> {
  const { lang, slug } = await props.params;
  if (!hasLocale(lang)) return {};
  const study = getCaseStudy(lang, slug);
  if (!study) return {};
  const { works } = getDictionary(lang);
  return {
    title: `${study.client} — ${works.labels.caseStudy} — Ernestine Matjabo`,
    description: study.summary,
    alternates: alternatesFor(`/works/${slug}`, lang),
  };
}

/** Label on the left (sticky on desktop), content on the right. */
function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal className="grid gap-6 border-t border-black/10 py-14 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-12 md:py-20">
      <h2 className="font-serif text-3xl leading-tight tracking-tight text-foreground sm:text-4xl md:sticky md:top-28 md:self-start">
        {title}
      </h2>
      <div>{children}</div>
    </Reveal>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-5 text-lg leading-relaxed text-foreground/75">
      {items.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-base leading-relaxed text-foreground/75 sm:text-lg"
        >
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e2632a]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function CaseStudyPage(
  props: PageProps<"/[lang]/works/[slug]">,
) {
  const { lang, slug } = await props.params;
  if (!hasLocale(lang)) notFound();
  const study = getCaseStudy(lang, slug);
  if (!study) notFound();
  const caseStudies = getCaseStudies(lang);
  const { works } = getDictionary(lang);
  const t = works.labels;

  const meta = [
    { label: t.role, value: study.meta.role },
    { label: t.period, value: study.meta.period },
    { label: t.tools, value: study.meta.tools },
    { label: t.team, value: study.meta.team },
  ].filter((item) => item.value);

  const index = caseStudies.findIndex((c) => c.slug === study.slug);
  const others = [1, 2].map(
    (step) => caseStudies[(index + step) % caseStudies.length],
  );

  return (
    <>
      {/* Opaque layer over the sticky footer: it covers the header zone too,
          so the footer only shows once the page has scrolled past it. */}
      <div className="relative z-10 flex flex-1 flex-col bg-background">
        <Header />
        <main className="relative flex-1">
          <article className="mx-auto max-w-[1260px] px-4 pt-24 sm:px-6 sm:pt-32">
            {/* Hero */}
            <Reveal>
              <Link
                href={localizePath(lang, "/works")}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                {works.back}
              </Link>
              <p className="mt-10 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {study.client} · {study.kind}
              </p>
              <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {study.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
                {study.summary}
              </p>

              <dl className="mt-12 grid gap-x-8 gap-y-6 border-t border-black/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
                {meta.map((item) => (
                  <div key={item.label}>
                    <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                      {item.label}
                    </dt>
                    <dd className="mt-2 text-base leading-snug text-foreground">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* Cover */}
            <Reveal className="mt-12 sm:mt-16">
              {study.cover.frame === "photo" ? (
                <CaseVisual
                  visual={study.cover}
                  priority
                  sizes="(min-width: 1260px) 1200px, 95vw"
                  className="rounded-[2rem] sm:rounded-[2.5rem]"
                />
              ) : (
                <div
                  className={`flex justify-center overflow-hidden rounded-[2rem] bg-gradient-to-b px-6 pt-10 sm:rounded-[2.5rem] sm:px-16 sm:pt-16 ${study.tint} ${
                    study.cover.frame === "browser" ? "" : "pb-10 sm:pb-16"
                  }`}
                >
                  <CaseVisual
                    visual={study.cover}
                    priority
                    sizes="(min-width: 1260px) 1100px, 90vw"
                    className={
                      study.cover.frame === "browser"
                        ? "w-full max-w-5xl rounded-b-none"
                        : "w-full max-w-3xl"
                    }
                  />
                </div>
              )}
            </Reveal>

            <div className="mt-8">
              <Block title={t.context}>
                <Paragraphs items={study.context} />
              </Block>

              {study.problem && (
                <Block title={t.problem}>
                  <p className="text-lg leading-relaxed text-foreground/75">
                    {study.problem.intro}
                  </p>
                  {study.problem.points && (
                    <div className="mt-6 rounded-3xl bg-[#fbe9dd] p-6 sm:p-8">
                      <Bullets items={study.problem.points} />
                    </div>
                  )}
                </Block>
              )}

              <Block title={t.myRole}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {study.role.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm"
                    >
                      <h3 className="font-serif text-xl text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </Block>

              {study.approach && (
                <Block title={t.approach}>
                  {study.approach.intro && (
                    <p className="mb-8 text-lg leading-relaxed text-foreground/75">
                      {study.approach.intro}
                    </p>
                  )}
                  <ol className="space-y-6">
                    {study.approach.steps.map((step, i) => (
                      <li key={step.title} className="flex gap-5">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {step.title}
                          </h3>
                          <p className="mt-1 leading-relaxed text-muted">
                            {step.text}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </Block>
              )}

              {study.gallery.length > 0 && (
                <Block title={t.gallery}>
                  <div className="space-y-10">
                    {study.gallery.map((visual) => (
                      <figure key={visual.src}>
                        {visual.frame === "photo" ? (
                          <CaseVisual
                            visual={visual}
                            sizes="(min-width: 1260px) 760px, 90vw"
                            className="rounded-[1.75rem]"
                          />
                        ) : (
                          <div
                            className={`rounded-[1.75rem] bg-gradient-to-b p-4 sm:p-8 ${study.tint}`}
                          >
                            <CaseVisual
                              visual={visual}
                              sizes="(min-width: 1260px) 760px, 90vw"
                              className={
                                visual.frame === "browser" ||
                                visual.width > visual.height
                                  ? ""
                                  : "mx-auto max-w-md"
                              }
                            />
                          </div>
                        )}
                        {visual.caption && (
                          <figcaption className="mt-3 text-sm text-muted">
                            {visual.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                </Block>
              )}

              {study.impact && (
                <Block title={t.impact}>
                  {study.impact.intro && (
                    <p className="mb-8 text-lg leading-relaxed text-foreground/75">
                      {study.impact.intro}
                    </p>
                  )}
                  {study.impact.stats && (
                    <div className="mb-8 grid gap-4 sm:grid-cols-3">
                      {study.impact.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-3xl bg-[#141414] p-6 text-white"
                        >
                          <p className="font-serif text-4xl text-[#f0a574]">
                            {stat.value}
                          </p>
                          <p className="mt-2 text-sm leading-snug text-white/65">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  {study.impact.points && (
                    <Bullets items={study.impact.points} />
                  )}
                </Block>
              )}

              {study.learnings && (
                <Block title={t.learnings}>
                  <Bullets items={study.learnings} />
                </Block>
              )}
            </div>
          </article>

          {/* Other case studies */}
          <section className="mx-auto max-w-[1260px] px-4 pb-24 pt-8 sm:px-6 sm:pb-32">
            <div className="flex items-end justify-between gap-6 border-t border-black/10 pt-14">
              <h2 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
                {t.others}
              </h2>
              <Link
                href={localizePath(lang, "/works")}
                className="link-underline shrink-0 text-sm font-medium text-foreground"
              >
                {works.back}
              </Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
              {others.map((other) => (
                <WorkCard key={other.slug} study={other} locale={lang} />
              ))}
            </div>
          </section>

          <Contact />
        </main>
      </div>
      <Footer />
    </>
  );
}
