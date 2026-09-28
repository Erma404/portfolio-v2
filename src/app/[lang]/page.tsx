import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ExpertiseMarquee } from "@/components/expertise-marquee";
import { WhatIDo } from "@/components/what-i-do";
import { Work } from "@/components/work";
import { ToolsShowcase } from "@/components/tools-showcase";
import { AboutBento } from "@/components/about-bento";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { hasLocale, localizePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { absoluteUrl, jsonLd, personJsonLd } from "@/lib/seo";

export default async function Home(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return null;
  const { meta, faq } = getDictionary(lang);
  const url = absoluteUrl(localizePath(lang, "/"));
  const structuredData = {
    "@graph": [
      personJsonLd(lang),
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        url,
        name: "Ernestine Matjabo",
        description: meta.description,
        inLanguage: lang,
        publisher: { "@id": absoluteUrl("/#person") },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: lang,
        mainEntity: faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      {/* Opaque layer over the sticky footer: it covers the header zone too,
          so the footer only shows once the page has scrolled past it. */}
      <div className="relative z-10 flex flex-1 flex-col bg-background">
        <Header />
        <main className="relative flex-1">
          <Hero />
          <ExpertiseMarquee />
          <WhatIDo />
          <Work />
          <ToolsShowcase />
          <AboutBento />
          <Testimonials />
          <Faq />
          <Contact />
        </main>
      </div>
      <Footer />
    </>
  );
}
