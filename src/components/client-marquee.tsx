import { clientLogos } from "@/lib/content-archive";
import { Reveal } from "@/components/reveal";

export function ClientMarquee() {
  const loop = [...clientLogos, ...clientLogos];

  return (
    <section className="border-y border-border bg-white py-10">
      <Reveal className="mx-auto max-w-[1260px] px-6 sm:px-10">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted">
          Proudly worked with
        </p>
      </Reveal>
      <div className="marquee-group overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-16 pl-6 sm:pl-10">
          {loop.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 text-xl font-display font-medium text-foreground/30 sm:text-2xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
