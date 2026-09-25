"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useDictionary } from "@/i18n/provider";

type Entry = {
  marker: string;
  period: string;
  role: string;
  org: string;
  text: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;

/** One row lights up while it crosses the middle of the viewport. */
function JourneyRow({ entry }: { entry: Entry }) {
  const ref = useRef<HTMLLIElement>(null);
  const active = useInView(ref, { margin: "-42% 0px -42% 0px" });

  return (
    <li
      ref={ref}
      className="grid grid-cols-[4.5rem_1px_minmax(0,1fr)] gap-x-5 sm:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] sm:gap-x-10"
    >
      <motion.span
        className="pt-4 text-right font-serif text-3xl leading-none sm:text-5xl"
        animate={{ opacity: active ? 1 : 0.18 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {entry.marker}
      </motion.span>

      <span className="relative bg-white/10">
        <motion.span
          className="absolute inset-x-0 top-0 h-full origin-top bg-[#e2632a]"
          animate={{ scaleY: active ? 1 : 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        />
      </span>

      <motion.div
        className="mb-10 rounded-2xl bg-white/[0.06] p-5 sm:mb-16 sm:p-6"
        animate={{ opacity: active ? 1 : 0.35, y: active ? 0 : 8 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <h3 className="font-serif text-xl text-white sm:text-2xl">{entry.role}</h3>
        <p className="mt-1 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
          <span>{entry.org}</span>
          <span>{entry.period}</span>
        </p>
        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">{entry.text}</p>
      </motion.div>
    </li>
  );
}

export function Journey() {
  const { aboutPage } = useDictionary();

  return (
    <section className="mx-auto max-w-[1260px] px-3 sm:px-4">
      <div className="rounded-[2rem] bg-[#141414] px-5 py-16 text-white sm:rounded-[3rem] sm:px-10 sm:py-24">
        <h2 className="text-center font-serif text-4xl tracking-tight sm:text-5xl md:text-6xl">
          {aboutPage.journeyTitle}
        </h2>
        <ol className="mx-auto mt-14 max-w-4xl sm:mt-20">
          {aboutPage.journey.map((entry) => (
            <JourneyRow key={`${entry.marker}-${entry.org}`} entry={entry} />
          ))}
        </ol>
      </div>
    </section>
  );
}
