"use client";

import { useEffect, useState } from "react";
import { ctaClass } from "./styles";

/**
 * Mobile-only bar. Shown once the hero CTA has scrolled away and until the closing
 * CTA block comes into view, so it never sits on top of a CTA that is already visible.
 */
export function StickyCta({ href, label, external }: { href: string; label: string; external: boolean }) {
  const [pastHero, setPastHero] = useState(false);
  const [beforeFinal, setBeforeFinal] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const final = document.getElementById("final-cta");
    if (!hero || !final) return;

    const heroObserver = new IntersectionObserver(([entry]) => {
      setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    const finalObserver = new IntersectionObserver(([entry]) => {
      setBeforeFinal(!entry.isIntersecting && entry.boundingClientRect.top > 0);
    });
    heroObserver.observe(hero);
    finalObserver.observe(final);
    return () => {
      heroObserver.disconnect();
      finalObserver.disconnect();
    };
  }, []);

  const show = pastHero && beforeFinal;

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 px-4 py-3 backdrop-blur transition-transform duration-300 motion-reduce:transition-none md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={href}
        tabIndex={show ? 0 : -1}
        {...(external ? { rel: "noopener" } : {})}
        className={`${ctaClass} w-full`}
      >
        {label}
      </a>
    </div>
  );
}
