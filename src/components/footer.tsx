"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { localizePath } from "@/i18n/config";
import { useDictionary, useLocale } from "@/i18n/provider";

/** Types each word, holds, deletes it, then moves to the next. */
function Typewriter({ words }: { words: readonly string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const word = words[index];
    let delay = deleting ? 55 : 95;
    if (!deleting && length === word.length) delay = 1600;
    if (deleting && length === 0) delay = 350;

    const id = setTimeout(() => {
      if (!deleting && length === word.length) setDeleting(true);
      else if (deleting && length === 0) {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else setLength((l) => l + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(id);
  }, [reduce, words, index, length, deleting]);

  const text = reduce ? words[0] : words[index].slice(0, length);

  return (
    <span className="inline-flex items-baseline">
      <span className="sr-only">{words[0]}</span>
      <span aria-hidden>{text}</span>
      <span
        aria-hidden
        className="typewriter-caret ml-2 inline-block h-[0.85em] w-[3px] translate-y-[0.08em] rounded-full bg-[#f08a4b]"
      />
    </span>
  );
}

/** "Available" text set on a circle, slowly spinning around a mail icon. */
function AvailableBadge() {
  const { contact, footer } = useDictionary();
  const label = footer.badge;
  return (
    <a
      href={`mailto:${contact.email}`}
      aria-label={footer.badgeLabel}
      className="group relative flex h-36 w-36 shrink-0 items-center justify-center sm:h-40 sm:w-40"
    >
      <svg
        viewBox="0 0 200 200"
        className="badge-spin absolute inset-0 h-full w-full text-white/85"
        aria-hidden
      >
        <defs>
          <path
            id="footer-badge-circle"
            d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"
          />
        </defs>
        <text
          className="fill-current text-[17px] font-medium uppercase"
          style={{ letterSpacing: "0.32em" }}
        >
          <textPath href="#footer-badge-circle" textLength="440">
            {label}
          </textPath>
        </text>
      </svg>
      <Mail
        className="h-8 w-8 text-white transition-transform duration-300 group-hover:scale-110"
        strokeWidth={1.25}
        aria-hidden
      />
    </a>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group inline-flex items-center gap-1.5 text-base text-white/70 transition-colors hover:text-white"
    >
      {label}
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        strokeWidth={1.5}
        aria-hidden
      />
    </a>
  );
}

/**
 * Sits under the page (sticky bottom-0, z-0): the content above scrolls away
 * and uncovers it, which gives the parallax reveal.
 */
export function Footer() {
  const locale = useLocale();
  const { contact, footer } = useDictionary();
  return (
    // As tall as possible so the reveal lasts longer, but it must stay shorter than
    // the screen minus the header zone, or its top edge peeks out above the page.
    <footer className="sticky bottom-0 z-0 flex min-h-[calc(100svh-7rem)] bg-[#121212] text-white">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col justify-between gap-16 px-4 pb-10 pt-24 sm:px-6 sm:pt-32">
        <div className="flex flex-1 flex-col items-start justify-center gap-12 md:flex-row md:items-center md:justify-between">
          <h2 className="font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[1.02] tracking-tight">
            {/* min-height keeps the line when the word is fully erased. */}
            <span className="block min-h-[1.02em] text-white">
              <Typewriter words={footer.words} />
            </span>
            <span className="block text-white/45">{footer.tagline}</span>
          </h2>
          <AvailableBadge />
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <FooterLink href={contact.linkedin} label="LinkedIn" />
          <nav aria-label={footer.navLabel} className="flex flex-wrap gap-8">
            {footer.links.map((link) => (
              <FooterLink
                key={link.href}
                label={link.label}
                href={localizePath(locale, link.href)}
              />
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
