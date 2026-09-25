import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/header";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { AboutHero } from "@/components/about/about-hero";
import { Journey } from "@/components/about/journey";
import { alternatesFor, hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata(props: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const { aboutPage } = getDictionary(lang);
  return {
    title: aboutPage.metaTitle,
    description: aboutPage.metaDescription,
    alternates: alternatesFor("/about", lang),
  };
}

export default async function AboutPage(props: PageProps<"/[lang]/about">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const { aboutPage } = getDictionary(lang);

  return (
    <>
      {/* Opaque layer over the sticky footer (see the home page). */}
      <div className="relative z-10 flex flex-1 flex-col bg-background">
        <Header />
        <main className="relative flex-1">
          <AboutHero />

          {/* Intro */}
          <section className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
            <Reveal>
              <h1 className="font-serif text-4xl tracking-tight text-foreground sm:text-5xl">
                {aboutPage.title}
              </h1>
              <p className="mt-5 text-lg font-semibold leading-snug text-foreground sm:text-xl">
                {aboutPage.lead}
              </p>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/70 sm:text-lg">
                {aboutPage.body}
              </p>
              <a
                href="#contact"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#141414] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent"
              >
                {aboutPage.cta}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </Reveal>

            <RevealGroup className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {aboutPage.stats.map((stat) => (
                <RevealItem
                  key={stat.label}
                  className="flex flex-col items-center justify-center rounded-3xl bg-white px-4 py-8 text-center shadow-[0_10px_30px_-18px_rgba(0,0,0,0.25)]"
                >
                  <span className="font-serif text-4xl text-[#e2632a] sm:text-5xl">{stat.value}</span>
                  <span className="mt-3 text-sm leading-snug text-foreground/70">{stat.label}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </section>

          <Journey />

          <div className="h-20 sm:h-28" />
          <Contact />
        </main>
      </div>
      <Footer />
    </>
  );
}
