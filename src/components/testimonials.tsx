"use client";

import { motion } from "framer-motion";
import { CH, FR, IN, KE, TG, US } from "country-flag-icons/react/3x2";
import { useDictionary } from "@/i18n/provider";
import { Reveal } from "@/components/reveal";

// Add the matching import when adding a country to `testimonials.countries`.
const FLAGS: Record<string, typeof FR> = { CH, FR, IN, KE, TG, US };

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function CountryFlag({
  code,
  name,
  x,
  y,
  index,
}: {
  code: string;
  name: string;
  x: number;
  y: number;
  index: number;
}) {
  const Flag = FLAGS[code];
  if (!Flag) return null;

  return (
    <div
      className="flag-float absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        animationDelay: `${-index * 1.3}s`,
      }}
    >
      <div
        className="flag-pulse h-6 w-6 overflow-hidden rounded-full border-[1.5px] border-white/80 shadow-sm sm:h-7 sm:w-7"
        style={{
          animationDuration: `${3.2 + index * 0.7}s`,
          animationDelay: `${index * 0.9}s`,
        }}
      >
        <Flag
          title={name}
          className="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        />
      </div>
    </div>
  );
}

function TestimonialCard({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role: string;
}) {
  return (
    <article className="relative flex w-[282px] shrink-0 flex-col gap-4 overflow-hidden rounded-[20px] bg-[#f4f1ea] p-5 sm:w-[320px]">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-32 w-40 bg-[radial-gradient(circle,rgba(0,0,0,0.12)_1px,transparent_1.2px)] [background-size:10px_10px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
      />
      <div className="relative flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
          {initials(author)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold text-foreground">
            {author}
          </p>
          <p className="truncate text-xs text-muted">{role}</p>
        </div>
      </div>
      <p className="relative text-sm leading-relaxed text-foreground/80">
        {quote}
      </p>
    </article>
  );
}

export function Testimonials() {
  const { testimonials } = useDictionary();
  const words = testimonials.headline.split(" ");
  const { items } = testimonials;
  // A marquee only reads well with enough cards to fill the row.
  const scroll = items.length >= 3;
  // Each half of the track must be wider than the viewport, so repeat short lists.
  const half = scroll
    ? Array.from({ length: Math.ceil(6 / items.length) }, () => items).flat()
    : items;
  const cards = scroll ? [...half, ...half] : items;

  return (
    <section className="bg-[#fdf6ef] py-24 sm:py-32">
      <div className="mx-auto max-w-[1260px] px-4 sm:px-6">
        <Reveal className="text-center">
          <h2 className="font-serif text-5xl tracking-tight text-foreground sm:text-6xl">
            {testimonials.title}
          </h2>
        </Reveal>

        {/* Capsule with the rotating sweep */}
        <div className="relative mx-auto mt-10 min-h-[20rem] max-w-[600px] overflow-hidden rounded-[2.5rem] sm:mt-12 md:aspect-[1200/614] md:min-h-0 md:rounded-full">
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 aspect-square w-[260%] -translate-x-1/2 -translate-y-1/2 md:w-[180%]"
          >
            <div className="sweep-spin h-full w-full bg-[conic-gradient(#fdf6ef_0deg,#ffb690_360deg)]" />
          </div>

          <div aria-hidden className="absolute inset-0">
            {testimonials.countries.map((country, i) => (
              <CountryFlag key={country.code} index={i} {...country} />
            ))}
          </div>

          <div className="relative flex h-full min-h-[20rem] flex-col items-center justify-center px-12 text-center md:min-h-0">
            <h3 className="max-w-sm font-serif text-2xl leading-tight text-foreground sm:text-3xl">
              {words.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                  {i < words.length - 1 && " "}
                </motion.span>
              ))}
            </h3>
            <motion.p
              className="mt-2 max-w-xs text-sm leading-relaxed text-foreground/70"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: words.length * 0.08 + 0.1 }}
            >
              {testimonials.subtitle}
            </motion.p>
          </div>
        </div>

        {/* Cards */}
        <div
          className={`mt-6 ${scroll ? "marquee-group overflow-hidden" : ""}`}
          style={
            scroll
              ? {
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
                  maskImage:
                    "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
                }
              : undefined
          }
        >
          <div
            className={
              scroll
                ? "marquee-track flex w-max gap-5 pr-5"
                : "flex flex-wrap justify-center gap-5"
            }
            style={scroll ? { animationDuration: `${half.length * 8}s` } : undefined}
          >
            {cards.map((item, i) => (
              <div key={`${item.author}-${i}`} className="flex" aria-hidden={i >= items.length || undefined}>
                <TestimonialCard {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
