import { Reveal } from "@/components/reveal";

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  serif = false,
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  serif?: boolean;
}) {
  return (
    <Reveal
      className={
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      }
    >
      <span
        className={
          serif
            ? "font-serif text-lg italic text-muted"
            : "text-xs font-medium uppercase tracking-[0.2em] text-accent"
        }
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-3 text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl ${
          serif ? "font-serif" : "font-display font-semibold"
        }`}
      >
        {title}
      </h2>
    </Reveal>
  );
}
