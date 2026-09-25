"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Target,
  Search,
  FlaskConical,
  ListChecks,
  Check,
  MousePointer2,
  Languages,
  Map as MapIcon,
  Layers,
  BarChart3,
} from "lucide-react";
import { useDictionary } from "@/i18n/provider";
import { RevealGroup, RevealItem } from "@/components/reveal";

const ICONS: Record<string, React.ElementType> = {
  target: Target,
  search: Search,
  flask: FlaskConical,
  list: ListChecks,
  map: MapIcon,
  layers: Layers,
  chart: BarChart3,
};

const LEAF = "M0 0 C4.5 -4 4.5 -12 0 -17 C-4.5 -12 -4.5 -4 0 0 Z";

/** Quadratic bezier stem, leaves alternating outer/inner along it. */
const LAUREL_LEAVES = (() => {
  const p0 = [52, 126];
  const p1 = [-22, 68];
  const p2 = [50, 10];
  const leaves: { x: number; y: number; r: number; s: number }[] = [];
  const steps = 6;
  for (let i = 0; i <= steps; i++) {
    const t = 0.1 + (i / steps) * 0.86;
    const x = (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t ** 2 * p2[0];
    const y = (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t ** 2 * p2[1];
    const dx = 2 * (1 - t) * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]);
    const dy = 2 * (1 - t) * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]);
    const angle = (Math.atan2(dx, -dy) * 180) / Math.PI;
    const s = 1.05 + (1 - Math.abs(t - 0.5) * 2) * 0.3;
    leaves.push({ x, y, r: angle - 42, s });
    if (i < steps) leaves.push({ x, y, r: angle + 38, s: s * 0.95 });
  }
  return leaves;
})();

function Laurel({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="-4 -8 70 146"
      className={className}
      fill="currentColor"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden
    >
      {LAUREL_LEAVES.map((leaf, i) => (
        <path
          key={i}
          d={LEAF}
          transform={`translate(${leaf.x.toFixed(2)} ${leaf.y.toFixed(2)}) rotate(${leaf.r.toFixed(1)}) scale(${leaf.s.toFixed(2)})`}
        />
      ))}
    </svg>
  );
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** Counts from `from` to `to`, holds, then restarts — only while visible. */
function LoopingCounter({
  from,
  to,
  suffix = "",
  suffixClassName,
}: {
  from: number;
  to: number;
  suffix?: string;
  suffixClassName?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const duration = 1400;
    const hold = 2600;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(from + (to - from) * eased));
        if (t < 1) raf = requestAnimationFrame(tick);
        else timeout = setTimeout(run, hold);
      };
      raf = requestAnimationFrame(tick);
    };
    run();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [inView, reduce, from, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {inView && !reduce ? value : to}
      {suffix && <span className={suffixClassName}>{suffix}</span>}
    </span>
  );
}

function parseStat(raw: string) {
  const match = raw.match(/^(\d+)(.*)$/);
  return match
    ? { value: Number(match[1]), suffix: match[2] }
    : { value: 0, suffix: raw };
}

/** Collaborator cursor with a name tag, drifting over the card. */
function CollabCursor({
  label,
  color,
  path,
  duration,
  delay = 0,
}: {
  label: string;
  color: string;
  path: { x: string[]; y: string[] };
  duration: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="pointer-events-none absolute z-10 flex items-start"
      initial={{ left: path.x[0], top: path.y[0] }}
      animate={reduce ? undefined : { left: path.x, top: path.y }}
      transition={{
        duration,
        delay,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      }}
    >
      <MousePointer2
        className="h-3.5 w-3.5 -rotate-3"
        style={{ color, fill: color }}
      />
      <span
        className="mt-3 -ml-0.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-black shadow-sm"
        style={{ backgroundColor: color }}
      >
        {label}
      </span>
    </motion.div>
  );
}

/** Steps get checked one after another, the line fills, then it all resets. */
function ProcessTimeline() {
  const processSteps = useDictionary().about.process;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const total = processSteps.length;
  const [active, setActive] = useState(reduce ? total - 1 : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => {
      // One extra beat at the end so the fully-checked state holds.
      setActive((a) => (a >= total ? 0 : a + 1));
    }, 800);
    return () => clearInterval(id);
  }, [inView, reduce, total]);

  const done = Math.min(active, total - 1);
  const progress = total > 1 ? done / (total - 1) : 1;

  return (
    <div ref={ref} className="relative mt-7">
      <div className="absolute inset-x-4 top-4 hidden h-0.5 rounded-full bg-border sm:block sm:top-5 sm:inset-x-5">
        <motion.div
          className="h-full origin-left rounded-full bg-accent"
          animate={{ scaleX: progress }}
          transition={{ duration: 0.6, ease: EASE }}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 sm:flex-nowrap sm:justify-between">
        {processSteps.map((step, i) => {
          const checked = i <= done;
          return (
            <div key={step.step} className="flex flex-col items-center gap-2 text-center">
              <motion.span
                className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border sm:h-10 sm:w-10"
                animate={{
                  backgroundColor: checked ? "var(--accent)" : "#ffffff",
                  borderColor: checked ? "var(--accent)" : "var(--border)",
                  scale: checked && i === done ? [1, 1.15, 1] : 1,
                }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <motion.span
                  animate={{ opacity: checked ? 1 : 0, scale: checked ? 1 : 0.4 }}
                  transition={{ duration: 0.3 }}
                >
                  <Check className="h-4 w-4 text-white" strokeWidth={3} />
                </motion.span>
              </motion.span>
              <span
                className={`text-xs font-medium transition-colors duration-300 sm:text-sm ${
                  checked ? "text-foreground" : "text-muted"
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Warm orange mesh behind the bento, blobs drift slowly like the reference. */
function AnimatedGradient() {
  const reduce = useReducedMotion();
  const drift = (x: number[], y: number[], duration: number) =>
    reduce
      ? undefined
      : {
          animate: { x: x.map((v) => `${v}%`), y: y.map((v) => `${v}%`) },
          transition: {
            duration,
            ease: "easeInOut" as const,
            repeat: Infinity,
            repeatType: "mirror" as const,
          },
        };

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-[#f4a672]">
      <motion.div
        className="absolute -left-[15%] -top-[25%] h-[75%] w-[60%] rounded-full bg-[#e9e4f7] blur-[110px]"
        {...drift([0, 10, -4], [0, 8, 14], 16)}
      />
      <motion.div
        className="absolute -right-[10%] top-[5%] h-[80%] w-[55%] rounded-full bg-[#f27a3a] blur-[120px]"
        {...drift([0, -12, 4], [0, 10, -6], 18)}
      />
      <motion.div
        className="absolute -bottom-[30%] -left-[10%] h-[70%] w-[55%] rounded-full bg-[#f58a4a] blur-[110px]"
        {...drift([0, 14, 6], [0, -10, 4], 20)}
      />
      <motion.div
        className="absolute bottom-[-20%] left-[35%] h-[60%] w-[40%] rounded-full bg-[#fde2c8] blur-[100px]"
        {...drift([0, -10, 8], [0, -12, -4], 14)}
      />
    </div>
  );
}

export function AboutBento() {
  const { hero, about } = useDictionary();
  const experience = parseStat(about.experience.value);
  const clients = parseStat(about.clients.value);
  const craftLoop = [...about.craft.items, ...about.craft.items];
  return (
    <section id="about" aria-label={about.eyebrow} className="relative overflow-hidden py-16 sm:py-24">
      <AnimatedGradient />
      <div className="relative mx-auto max-w-[1260px] px-4 sm:px-6">
        <RevealGroup className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:grid-rows-[repeat(4,minmax(11rem,auto))]">
          {/* Photo */}
          <RevealItem className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm md:aspect-auto md:col-start-1 md:row-start-1 md:row-span-3">
            <Image
              src="/img/ernestine.jpg"
              alt={hero.fullName}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          </RevealItem>

          {/* Product Craft */}
          <RevealItem className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:col-start-2 md:row-start-1">
            <h3 className="font-serif text-xl text-foreground">
              {about.craft.title}
            </h3>
            <div
              className="marquee-group -mx-6 mt-5 overflow-hidden"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 18%, black 82%, transparent)",
                maskImage:
                  "linear-gradient(to right, transparent, black 18%, black 82%, transparent)",
              }}
            >
              <div
                className="marquee-track flex w-max items-center"
                style={{ animationDuration: "14s" }}
              >
                {craftLoop.map((item, i) => {
                  const Icon = ICONS[item.icon];
                  return (
                    <div
                      key={`${item.label}-${i}`}
                      aria-hidden={i >= about.craft.items.length}
                      className="flex w-32 shrink-0 flex-col items-center gap-2.5"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft">
                        <Icon className="h-5 w-5 text-accent" />
                      </span>
                      <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </RevealItem>

          {/* Craftmanship / philosophy */}
          <RevealItem className="relative rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:col-start-3 md:row-start-1">
            <motion.span
              className="absolute right-7 top-6 text-foreground"
              animate={{ x: [0, 6, -2, 0], y: [0, 4, 8, 0], rotate: [0, -6, 4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >
              <MousePointer2 className="h-4 w-4" />
            </motion.span>
            <h3 className="font-serif text-xl text-foreground">
              {about.philosophy.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {about.philosophy.quote}
            </p>
          </RevealItem>

          {/* Experience (black card) */}
          <RevealItem className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#141414] p-7 text-white md:col-start-2 md:row-start-2 md:row-span-2">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(196,98,40,0.55),rgba(120,56,24,0.25)_45%,transparent_70%)] blur-2xl"
            />
            <div className="relative">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                {about.experience.eyebrow}
              </span>
              <div className="mt-4 flex items-center justify-center gap-2 sm:gap-4">
                <Laurel className="h-32 w-16 shrink-0 text-[#e9a73b] sm:h-40 sm:w-20" />
                <div className="min-w-[5.5rem] text-center">
                  <div className="text-5xl font-semibold leading-none tracking-tight text-white sm:text-6xl">
                    <LoopingCounter
                      from={1}
                      to={experience.value}
                      suffix={experience.suffix}
                      suffixClassName="align-top text-[0.6em] text-[#e8772e]"
                    />
                  </div>
                  <div className="mt-2 font-serif text-2xl text-white/75 sm:text-3xl">
                    {about.experience.label}
                  </div>
                </div>
                <Laurel flip className="h-32 w-16 shrink-0 text-[#e9a73b] sm:h-40 sm:w-20" />
              </div>
            </div>
            <div className="relative mt-8">
              <h3 className="font-serif text-3xl leading-tight text-white">
                {about.experience.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-white/60">
                {about.experience.description}
              </p>
            </div>
          </RevealItem>

          {/* Collaboration */}
          <RevealItem className="relative overflow-hidden rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:col-start-3 md:row-start-2">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {about.collaboration.eyebrow}
            </span>
            <h3 className="mt-2 font-serif text-lg text-foreground">
              {about.collaboration.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {about.collaboration.description}
            </p>
            <div className="absolute inset-0" aria-hidden>
              {about.collaboration.roles.map((role, i) => (
                <CollabCursor
                  key={role.label}
                  label={role.label}
                  color={role.color}
                  duration={i === 0 ? 5.5 : 6.5}
                  delay={i * 0.6}
                  path={
                    i === 0
                      ? { x: ["55%", "30%", "12%", "40%"], y: ["70%", "62%", "80%", "58%"] }
                      : { x: ["70%", "62%", "48%", "66%"], y: ["18%", "52%", "72%", "40%"] }
                  }
                />
              ))}
            </div>
            <span className="sr-only">
              {about.collaboration.withLabel}{" "}
              {about.collaboration.roles.map((r) => r.label).join(` ${about.collaboration.and} `)}
            </span>
          </RevealItem>

          {/* Clients */}
          <RevealItem className="rounded-3xl border border-accent-soft bg-accent-soft p-6 md:col-start-3 md:row-start-3">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {about.clients.label}
            </span>
            <div className="mt-3 flex items-end justify-between gap-4">
              <p className="max-w-[65%] text-sm leading-relaxed text-foreground/70">
                {about.clients.description}
              </p>
              <span className="font-serif text-4xl text-accent sm:text-5xl">
                <LoopingCounter
                  from={Math.max(clients.value - 9, 0)}
                  to={clients.value}
                  suffix={clients.suffix}
                />
              </span>
            </div>
          </RevealItem>

          {/* Languages */}
          <RevealItem className="relative overflow-hidden rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:col-start-1 md:row-start-4">
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -right-3 -top-3 text-black/[0.06]"
              initial={{ opacity: 0, x: 16, y: -16 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
            >
              <Languages className="h-24 w-24" strokeWidth={1.5} />
            </motion.span>
            <span className="relative text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {about.languagesTitle}
            </span>
            <div className="relative mt-5 grid grid-cols-2 gap-x-6 gap-y-5">
              {about.languages.map((lang, i) => (
                <div key={lang.name}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground/80">
                      {lang.name}
                    </span>
                    <span className="text-[10px] text-muted">{lang.label}</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/10">
                    <motion.div
                      className="h-full rounded-full bg-[#e2632a]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: EASE, delay: 0.3 + i * 0.15 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </RevealItem>

          {/* Process */}
          <RevealItem className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:col-start-2 md:col-span-2 md:row-start-4">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
              {about.processTitle}
            </span>
            <ProcessTimeline />
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
