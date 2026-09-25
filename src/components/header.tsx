"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localizePath, stripLocale } from "@/i18n/config";
import { useDictionary, useLocale } from "@/i18n/provider";

/** EN / FR switch that keeps the visitor on the same page. */
function LanguageToggle({ path }: { path: string }) {
  const locale = useLocale();
  const { nav } = useDictionary();

  return (
    <div
      role="group"
      aria-label={nav.switchTo}
      className="flex shrink-0 items-center rounded-full bg-black/[0.05] p-1 text-[11px] font-semibold uppercase tracking-wide sm:text-xs"
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          // Plain <a>: switching language swaps the root layout (<html lang>),
          // which needs a full page load.
          <a
            key={code}
            href={localizePath(code, path)}
            hrefLang={code}
            lang={code}
            aria-current={active ? "true" : undefined}
            aria-label={active ? undefined : nav.switchTo}
            className={`rounded-full px-2 py-1.5 transition-colors sm:px-2.5 ${
              active ? "bg-white text-foreground shadow-sm" : "text-foreground/50 hover:text-foreground"
            }`}
          >
            {code}
          </a>
        );
      })}
    </div>
  );
}

export function Header() {
  const locale = useLocale();
  const { nav, hero } = useDictionary();
  // Locale-free path, e.g. "/works/stefcos" for both "/works/stefcos" and "/fr/works/stefcos".
  const path = stripLocale(usePathname());

  // "Home" hides on phones: the portrait already links home, and FR labels are long.
  const links = [
    { label: nav.home, href: "/#top", active: path === "/", mobile: false },
    { label: nav.work, href: "/works", active: path.startsWith("/works"), mobile: true },
    { label: nav.about, href: "/about", active: path.startsWith("/about"), mobile: true },
  ];

  return (
    <header className="sticky top-4 z-50 flex justify-center px-4">
      <div className="flex w-full max-w-[46rem] items-center gap-1.5 rounded-full border border-black/5 bg-white/90 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md sm:gap-2 sm:p-2.5">
        <Link
          href={localizePath(locale, "/#top")}
          aria-label={nav.home}
          className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full sm:mr-1 sm:h-14 sm:w-14"
        >
          <Image
            src="/img/ernestine-sm.jpg"
            alt={hero.fullName}
            fill
            sizes="56px"
            className="object-cover"
          />
          <span className="absolute right-0.5 top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-accent" />
        </Link>

        <nav className="flex min-w-0 flex-1 items-center justify-center gap-0.5 sm:gap-1">
          {links.map((link) => {
            const { active } = link;
            return (
              <Link
                key={link.href}
                href={localizePath(locale, link.href)}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap rounded-full px-2.5 py-2.5 text-[15px] font-medium transition-colors sm:px-3 sm:text-base md:px-4 md:text-lg ${
                  link.mobile ? "" : "hidden sm:block"
                } ${active ? "text-accent" : "text-foreground/90 hover:text-foreground"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <LanguageToggle path={path} />

        <a
          href="#contact"
          aria-label={nav.cta}
          className="flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-foreground px-3.5 text-base font-medium text-background transition-colors hover:bg-accent sm:h-auto sm:px-5 sm:py-3.5 md:px-6"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="shrink-0">
            <path
              d="M3 7.5A1.5 1.5 0 0 1 4.5 6h11A1.5 1.5 0 0 1 17 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-7Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <path
              d="M7 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1M3 10.5h14"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="hidden sm:inline">{nav.cta}</span>
        </a>
      </div>
    </header>
  );
}
