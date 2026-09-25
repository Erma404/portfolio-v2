"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { useDictionary } from "@/i18n/provider";

/** Name tag with a cursor, like a collaborator pointer on a design canvas. */
function CursorTag({
  label,
  tone,
  className,
  delay,
}: {
  label: string;
  tone: "orange" | "dark";
  className: string;
  delay: number;
}) {
  const reduce = useReducedMotion();
  const orange = tone === "orange";

  return (
    <motion.div
      aria-hidden
      className={`absolute z-20 flex items-start gap-1 ${className}`}
      // Visible from the first paint; the drift is only an extra.
      animate={reduce ? undefined : { y: [0, -6, 0], x: [0, 4, 0] }}
      transition={{
        y: { duration: 5, delay, repeat: Infinity, ease: "easeInOut" },
        x: { duration: 6, delay, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {!orange && <MousePointer2 className="mt-5 h-4 w-4 -scale-x-100 fill-white text-foreground" />}
      <span
        className={`rounded-full px-3.5 py-1.5 text-sm font-semibold shadow-lg sm:text-base ${
          orange
            ? "bg-[#e2632a] text-white ring-2 ring-white/80"
            : "border border-white/80 bg-[#141414] text-white"
        }`}
      >
        {label}
      </span>
      {orange && <MousePointer2 className="mt-5 h-4 w-4 fill-[#e2632a] text-[#e2632a]" />}
    </motion.div>
  );
}

/** Warm light trails behind the portrait, a nod to the motion-blur photo of the reference. */
function LightTrails() {
  const reduce = useReducedMotion();
  const trails = [
    // Widths stop at the hair line so the trails never cross the face.
    { top: "30%", width: "42%", height: 14, delay: 0 },
    { top: "40%", width: "47%", height: 22, delay: 0.4 },
    { top: "52%", width: "40%", height: 12, delay: 0.8 },
    { top: "61%", width: "44%", height: 18, delay: 1.2 },
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {trails.map((trail, i) => (
        <motion.span
          key={i}
          className="absolute left-0 rounded-r-full bg-gradient-to-r from-transparent via-[#f28a3c]/70 to-[#ff6a1a] blur-md"
          style={{ top: trail.top, width: trail.width, height: trail.height }}
          initial={{ scaleX: 1, opacity: 0.9, originX: 0 }}
          animate={
            reduce ? undefined : { scaleX: [1, 0.86, 1], opacity: [0.9, 0.6, 0.9] }
          }
          transition={{
            duration: 3.2,
            delay: trail.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function AboutHero() {
  const { aboutPage } = useDictionary();

  return (
    // Same frame as the other page heroes, tucked under the floating header.
    <section className="mx-auto -mt-[52px] max-w-[1260px] px-3 pt-3 sm:-mt-[60px] sm:px-4 sm:pt-4">
      <div className="relative isolate h-[26rem] overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#a9a6a2] via-[#c9c6c1] to-[#dedbd6] sm:h-[32rem] sm:rounded-[3rem] lg:h-[36rem]">
        <LightTrails />

        {/* Multiply drops the photo's white background onto the grey panel. It sits on
            the wrapper: the translate makes it its own layer, so blending on the img
            alone would have nothing underneath to blend with. */}
        <div className="absolute inset-y-0 left-1/2 w-[min(28rem,80%)] -translate-x-[35%] mix-blend-multiply sm:w-[26rem] lg:w-[30rem]">
          <Image
            src="/img/about/portrait.jpg"
            alt={aboutPage.portraitAlt}
            fill
            priority
            sizes="(min-width: 1024px) 480px, 80vw"
            className="object-cover object-top grayscale"
          />
        </div>

        <CursorTag
          label={aboutPage.tagName}
          tone="orange"
          className="right-[3%] top-[20%] sm:right-[18%] sm:top-[34%]"
          delay={0.6}
        />
        <CursorTag
          label={aboutPage.tagRole}
          tone="dark"
          className="bottom-[14%] left-[6%] sm:bottom-[16%] sm:left-[22%]"
          delay={0.9}
        />
      </div>
    </section>
  );
}
