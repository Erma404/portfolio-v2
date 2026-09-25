"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function AnimatedBadgeWord({
  words,
  interval = 1200,
}: {
  words: { text: string; color: string }[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  const current = words[index];

  return (
    <motion.span
      layout
      animate={{ backgroundColor: current.color }}
      style={{ rotate: -3 }}
      transition={{
        backgroundColor: { duration: 0.35, ease: "easeInOut" },
        layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      }}
      className="relative inline-flex items-center justify-center overflow-hidden rounded-xl border-[3px] border-black px-3 py-0.5 align-middle text-black shadow-[3px_4px_0_rgba(0,0,0,0.15)]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current.text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {current.text}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
