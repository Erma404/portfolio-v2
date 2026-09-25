"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useDictionary } from "@/i18n/provider";
import { Reveal } from "@/components/reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  const id = useId();

  return (
    <div className="rounded-2xl bg-[#fbf9f5] transition-colors hover:bg-white">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 rounded-2xl px-6 py-6 text-left text-base font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-lg"
        >
          <span>{question}</span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/15 text-muted"
          >
            <Plus className="h-4 w-4" strokeWidth={1.5} />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 pr-16 text-sm leading-relaxed text-muted sm:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const { faq } = useDictionary();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#fdf6ef] py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1260px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
        <Reveal>
          <h2 className="max-w-md font-serif text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            {faq.title}
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
            {faq.intro}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col gap-2.5 rounded-3xl border border-black/5 bg-[#f1ede6] p-2.5">
            {faq.items.map((item, i) => (
              <FaqItem
                key={item.question}
                {...item}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
