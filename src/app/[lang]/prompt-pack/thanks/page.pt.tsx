import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { MeshCard, PackHeader } from "@/components/prompt-pack/parts";
import { ctaClass } from "@/components/prompt-pack/styles";
import { localizePath } from "@/i18n/config";
import { promptPackConfig as config } from "@/lib/prompt-pack-config";
import { giftPdf, promptPackLive } from "@/lib/prompt-pack-state";

// Named page.pt.tsx on purpose: next.config.ts only registers the "pt.tsx" extension when
// the gift can really be downloaded (published, email form set, PDF present in public/),
// or in development. Otherwise this route does not exist.
// English only: /fr/prompt-pack/thanks is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }];
}

// Never indexed, never in the sitemap.
export const metadata: Metadata = {
  title: "Your 5 prompts are ready | Ernestine Matjabo",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

// Typed by hand: generated route types do not list the page while it is not built.
export default async function ThanksPage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  if (lang !== "en") notFound();

  return (
    <>
      {/* Opaque layer over the sticky footer (see the home page). */}
      <div className="relative z-10 flex flex-1 flex-col bg-background">
        {!promptPackLive && (
          <p className="bg-[#141414] px-4 py-2 text-center text-sm text-white">
            Development preview. This page is only built in production once the page is published and the PDF exists.
          </p>
        )}

        <PackHeader />

        <main className="flex-1">
          <section className="mx-auto -mt-[52px] max-w-[1260px] px-3 pb-24 pt-3 sm:-mt-[60px] sm:px-4 sm:pb-32 sm:pt-4">
            <MeshCard>
              <div className="flex flex-col items-center px-6 pb-20 pt-32 text-center sm:pb-28 sm:pt-40">
                <h1 className="hero-rise max-w-3xl text-balance font-serif text-[clamp(2.4rem,5.6vw,4.6rem)] leading-[1.05] tracking-tight text-foreground">
                  Your 5 prompts are ready
                </h1>

                {giftPdf.ok ? (
                  <a
                    href={config.freeGiftPdfPath}
                    download
                    style={{ animationDelay: "0.15s" }}
                    className={`${ctaClass} hero-rise mt-10`}
                  >
                    Download the PDF
                  </a>
                ) : (
                  <p className="mt-10 max-w-md text-base text-foreground/70">
                    Development preview. No download button: freeGiftPdfPath is empty or the file is missing from
                    public/.
                  </p>
                )}

                <p
                  style={{ animationDelay: "0.3s" }}
                  className="hero-rise mt-8 max-w-md text-lg text-foreground/70"
                >
                  I also sent the link to your inbox. Check your spam folder if it does not arrive.
                </p>

                <a
                  href={`${localizePath("en", "/prompt-pack")}/`}
                  className="mt-8 text-base font-medium text-foreground underline underline-offset-4 hover:text-[#b84a17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b84a17]"
                >
                  Back to the Prompt Pack
                </a>
              </div>
            </MeshCard>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
