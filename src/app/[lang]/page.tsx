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

export default function Home() {
  return (
    <>
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
