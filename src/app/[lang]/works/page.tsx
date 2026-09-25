import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { WorkCard } from "@/components/works/work-card";
import { getCaseStudies } from "@/lib/case-studies";
import { alternatesFor, hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata(
  props: PageProps<"/[lang]/works">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const { works } = getDictionary(lang);
  return {
    title: works.metaTitle,
    description: works.text,
    alternates: alternatesFor("/works", lang),
  };
}

export default async function WorksPage(props: PageProps<"/[lang]/works">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const { works: worksIntro } = getDictionary(lang);
  const caseStudies = getCaseStudies(lang);

  return (
    <>
      {/* Opaque layer over the sticky footer: it covers the header zone too,
          so the footer only shows once the page has scrolled past it. */}
      <div className="relative z-10 flex flex-1 flex-col bg-background">
        <Header />
        <main className="relative flex-1">
          {/* Hero panel: same frame as the home hero, tucked under the floating header. */}
          <section className="mx-auto -mt-[52px] max-w-[1260px] px-3 pt-3 sm:-mt-[60px] sm:px-4 sm:pt-4">
            <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#c9d7f8] sm:rounded-[3rem]">
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute -left-24 bottom-[-30%] h-[28rem] w-[36rem] rotate-[-18deg] rounded-full bg-[#f6e3f4] opacity-80 blur-3xl" />
                <div className="absolute left-[40%] top-[-20%] h-[26rem] w-[30rem] rounded-full bg-[#dbe4fb] opacity-90 blur-3xl" />
                <div className="absolute -right-24 bottom-[-35%] h-[30rem] w-[40rem] rounded-full bg-[#fcf1dc] blur-3xl" />
                <div className="absolute right-[18%] top-[30%] h-[18rem] w-[22rem] rounded-full bg-[#f3e2f5] opacity-70 blur-3xl" />
              </div>

              <Reveal className="relative max-w-4xl px-6 pb-16 pt-32 sm:px-12 sm:pb-24 sm:pt-44 lg:px-16">
                <span className="inline-flex rounded-full border border-foreground/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-foreground sm:text-sm">
                  {worksIntro.eyebrow}
                </span>
                <h1 className="mt-5 font-serif text-[clamp(2.75rem,6vw,5.25rem)] leading-[1.05] tracking-tight text-foreground">
                  {worksIntro.title}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70">
                  {worksIntro.text}
                </p>
              </Reveal>
            </div>
          </section>

          <section className="mx-auto max-w-[1260px] px-4 pb-20 pt-14 sm:px-6 sm:pb-28 sm:pt-20">
            <RevealGroup className="grid gap-5 md:grid-cols-2 md:gap-6">
              {caseStudies.map((study) => (
                <RevealItem key={study.slug}>
                  <WorkCard study={study} locale={lang} />
                </RevealItem>
              ))}
            </RevealGroup>
          </section>

          <Contact />
        </main>
      </div>
      <Footer />
    </>
  );
}
