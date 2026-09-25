"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ClipboardList, BarChart3 } from "lucide-react";
import { SiJira, SiFramer, SiFigma, SiClaude } from "react-icons/si";
import { useDictionary } from "@/i18n/provider";
import { RevealGroup, RevealItem, Reveal } from "@/components/reveal";

const ICONS: Record<string, React.ElementType> = {
  planner: ClipboardList,
  jira: SiJira,
  figma: SiFigma,
  claude: SiClaude,
  contentsquare: BarChart3,
  framer: SiFramer,
};

const COLORS: Record<string, string> = {
  planner: "#31752F",
  jira: "#0052CC",
  figma: "#F24E1E",
  claude: "#D97757",
  contentsquare: "#E93379",
  framer: "#0055FF",
};

export function ToolsShowcase() {
  const { toolsShowcase } = useDictionary();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const xRaw = useTransform(scrollYProgress, [0, 1], [120, -200]);
  const x = useSpring(xRaw, { stiffness: 80, damping: 24, mass: 0.6 });

  return (
    <section ref={sectionRef} className="bg-[#0a0a0a] py-24 sm:py-32">
      <div className="mx-auto max-w-[1260px] px-6 sm:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <Reveal className="max-w-xl">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              {toolsShowcase.eyebrow}
            </span>
            <h2 className="mt-3 font-serif text-3xl leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              {toolsShowcase.title}
            </h2>
          </Reveal>

          <div
            className="w-full overflow-hidden md:w-[420px] lg:w-[520px]"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
              maskImage:
                "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            }}
          >
            <motion.div className="flex flex-nowrap gap-4 sm:gap-5" style={{ x }}>
              {toolsShowcase.logos.map((key) => {
                const Icon = ICONS[key];
                return (
                  <div
                    key={key}
                    className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full sm:h-24 sm:w-24"
                    style={{ backgroundColor: `${COLORS[key]}33` }}
                  >
                    <Icon
                      className="h-8 w-8 sm:h-9 sm:w-9"
                      style={{ color: COLORS[key] }}
                    />
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {toolsShowcase.featured.map((tool) => {
            const Icon = ICONS[tool.icon];
            return (
              <RevealItem key={tool.name}>
                <div className="group relative h-full">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-2 -z-10 rounded-[2rem] bg-gradient-to-br from-[#f5824f] via-[#f9a94f] to-[#facc15] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
                  />
                  <div className="relative h-full rounded-3xl border border-white/[0.06] bg-[#161616] p-7 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-white/15 group-hover:bg-[#1c1c1c] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${tool.color}26` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: tool.color }} />
                    </div>
                    <h3 className="mt-6 font-serif text-2xl tracking-tight text-white">
                      {tool.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/50">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
