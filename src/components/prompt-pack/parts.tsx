import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { localizePath } from "@/i18n/config";

/** The rounded card with the soft peach, pink and blue wash used by the home hero. */
export function MeshCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative isolate overflow-hidden rounded-[2rem] bg-[#fdf6ef] sm:rounded-[3rem] ${className}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-32 h-[26rem] w-[26rem] rounded-full bg-[#ffd9a8] opacity-70 blur-3xl" />
        <div className="absolute left-1/2 top-1/4 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[#f6c9e0] opacity-60 blur-3xl" />
        <div className="absolute -right-40 -top-24 h-[30rem] w-[30rem] rounded-full bg-[#c9dcf9] opacity-70 blur-3xl" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/** Floating pill, as on the other pages. The optional CTA replaces the contact button. */
export function PackHeader({ cta }: { cta?: { href: string; label: string; external?: boolean } }) {
  return (
    <header className="sticky top-4 z-50 flex justify-center px-4">
      <div className="flex w-full max-w-[46rem] items-center gap-2 rounded-full border border-black/5 bg-white/90 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md sm:p-2.5">
        <Link
          href={localizePath("en", "/")}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-full pr-2 text-base font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b84a17] sm:text-lg"
        >
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full sm:h-14 sm:w-14">
            <Image src="/img/ernestine-sm.jpg" alt="" fill sizes="56px" className="object-cover" />
          </span>
          <span className="truncate">Ernestine Matjabo</span>
        </Link>
        {cta && (
          <a
            href={cta.href}
            {...(cta.external ? { rel: "noopener" } : {})}
            className="hidden shrink-0 whitespace-nowrap rounded-full bg-foreground px-5 py-3.5 text-base font-medium text-background transition-colors hover:bg-[#b84a17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b84a17] focus-visible:ring-offset-2 motion-reduce:transition-none sm:block md:px-6"
          >
            {cta.label}
          </a>
        )}
      </div>
    </header>
  );
}
