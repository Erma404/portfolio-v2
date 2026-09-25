"use client";

import { useDictionary } from "@/i18n/provider";

export function ExpertiseMarquee() {
  const { expertise } = useDictionary();
  const loop = [...expertise, ...expertise];

  return (
    <section className="bg-[#fdf6ef] py-10 sm:py-14">
      <div className="mx-auto max-w-[1260px] px-3 sm:px-4">
        <div
          className="marquee-group overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="marquee-track flex w-max items-center gap-5">
            {loop.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="inline-flex shrink-0 items-center gap-3 rounded-full border border-[#f5824f]/25 bg-white px-7 py-4 shadow-[0_2px_14px_rgba(245,130,79,0.12)]"
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#e2543c]" />
                <span className="font-serif text-2xl font-medium text-foreground sm:text-3xl">
                  {item}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
