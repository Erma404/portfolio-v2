"use client";

import Link from "next/link";
import { localizePath } from "@/i18n/config";
import { useDictionary, useLocale } from "@/i18n/provider";
import { SectionHeading } from "@/components/section-heading";
import { CoverArt } from "@/components/works/cover-art";
import { getCaseStudies } from "@/lib/case-studies";

export function Work() {
  const locale = useLocale();
  const { work } = useDictionary();
  // Same projects, order and covers as /works.
  const studies = getCaseStudies(locale);

  return (
    <section id="work" className="bg-[#fafafa] py-24 sm:py-32">
      <SectionHeading
        eyebrow={work.eyebrow}
        title={work.title}
        align="center"
        serif
      />

      <div className="mx-auto mt-14 max-w-[1200px] px-4">
        {studies.map((study, i) => (
          <div
            key={study.slug}
            className="sticky"
            style={{ top: `${88 + i * 4}px` }}
          >
            <div className="mb-8 grid min-h-[420px] grid-cols-1 items-center gap-8 rounded-[2.5rem] border border-black/5 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:p-8 md:grid-cols-2 md:gap-10">
              <div className="flex h-full flex-col">
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                  {study.period}
                </span>
                <h3 className="mt-3 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                  {study.client}
                </h3>
                <p className="mt-4 max-w-sm text-base leading-relaxed text-muted">
                  {study.summary}
                </p>
                <Link
                  href={localizePath(locale, `/works/${study.slug}`)}
                  className="link-underline mt-5 self-start text-sm font-medium text-foreground"
                >
                  {work.viewCase}
                </Link>

                <div className="mt-auto flex flex-wrap gap-2 pt-10">
                  <span className="rounded-full bg-accent-soft px-4 py-2 text-sm text-foreground/80">
                    {study.kind}
                  </span>
                </div>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] md:aspect-auto md:h-[360px]">
                <div className={`absolute inset-0 bg-gradient-to-b ${study.tint}`} />
                <CoverArt cover={study.cover} sizes="(min-width: 768px) 40vw, 80vw" />

                <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-white/10 bg-black/40 py-2.5 backdrop-blur-sm">
                  <div className="marquee-group overflow-hidden">
                    <div className="marquee-track flex w-max items-center gap-3">
                      {[...Array(6)].map((_, idx) => (
                        <span
                          key={idx}
                          className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/80"
                        >
                          {study.kind}
                          <span className="text-white/40">◆</span>
                          {study.client}
                          <span className="text-white/40">◆</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-4 flex justify-center">
        <Link
          href={localizePath(locale, "/works")}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-colors hover:bg-accent"
        >
          {work.more}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M3.5 12.5L12.5 3.5M12.5 3.5H5.5M12.5 3.5V10.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
