"use client";

import { motion } from "framer-motion";
import { useDictionary } from "@/i18n/provider";
import { AnimatedBadgeWord } from "@/components/animated-badge-word";
import dynamic from "next/dynamic";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

// Client-only: the board restores the visitor's drawing from localStorage.
const DoodleCanvas = dynamic(
  () => import("@/components/doodle-canvas").then((m) => m.DoodleCanvas),
  { ssr: false },
);

export function Hero() {
  const { hero } = useDictionary();

  return (
    <section
      id="top"
      className="mx-auto -mt-[52px] max-w-[1260px] px-3 pt-3 sm:-mt-[60px] sm:px-4 sm:pt-4"
    >
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#fdf6ef] sm:rounded-[3rem]">
        {/* mesh gradient background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-32 h-[26rem] w-[26rem] rounded-full bg-[#ffd9a8] opacity-70 blur-3xl" />
          <div className="absolute left-1/2 top-1/4 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[#f6c9e0] opacity-60 blur-3xl" />
          <div className="absolute -right-40 -top-24 h-[30rem] w-[30rem] rounded-full bg-[#c9dcf9] opacity-70 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center px-6 pb-20 pt-28 text-center sm:pb-28 sm:pt-32">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {hero.status}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.05] tracking-tight text-foreground"
          >
            {hero.titleStart} <AnimatedBadgeWord words={hero.badgeWords} />
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.05] tracking-tight text-foreground"
          >
            {hero.titleEnd}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-xl text-lg text-foreground/70"
          >
            {hero.pitch}
          </motion.p>

          <div className="relative w-full">
            {/* Lives outside the tilted card, whose frame would clip it. */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 right-[4%] z-20 hidden flex-col items-center md:flex lg:right-[7%]"
            >
              <p className="font-hand text-2xl text-foreground/80">{hero.doodleHint}</p>
              <svg
                width="40"
                height="48"
                viewBox="0 0 40 48"
                fill="none"
                className="mt-2 text-foreground/70"
              >
                <path
                  d="M12 3c14 4 20 16 14 28-2 4-6 8-11 11M15 42l-1-9M15 42l8-3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <ContainerScroll titleComponent={<></>}>
              <DoodleCanvas />
            </ContainerScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
