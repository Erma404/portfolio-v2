import Link from "next/link";
import type { CaseStudy } from "@/lib/case-studies";
import { localizePath, type Locale } from "@/i18n/config";
import { CoverArt } from "@/components/works/cover-art";

/** Grid card: the cover sits on the project's tint, a dark caption bar overlaps the bottom. */
export function WorkCard({ study, locale }: { study: CaseStudy; locale: Locale }) {
  const { cover } = study;

  return (
    <Link
      href={localizePath(locale, `/works/${study.slug}`)}
      className="group relative block aspect-[648/560] overflow-hidden rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${study.tint}`} />

      <CoverArt cover={cover} sizes="(min-width: 768px) 45vw, 90vw" />

      <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-[#141414] px-5 py-4 text-white sm:inset-x-4 sm:bottom-4 sm:px-6 sm:py-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/55">
            {study.client}
            {study.period && ` · ${study.period}`}
          </span>
          <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white/80">
            {study.kind}
          </span>
        </div>
        <h3 className="mt-2 font-serif text-xl leading-snug sm:text-2xl">
          {study.title}
        </h3>
      </div>
    </Link>
  );
}
