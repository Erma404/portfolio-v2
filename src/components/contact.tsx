"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useDictionary } from "@/i18n/provider";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { Reveal } from "@/components/reveal";

const FIELD =
  "w-full rounded-xl border border-black/5 bg-[#f7f5f0] px-4 py-3 text-[15px] text-foreground outline-none transition placeholder:text-black/35 focus:border-accent/40 focus:bg-white focus:ring-2 focus:ring-accent/15";

type Status = "idle" | "sent" | "error";

function buildMessage(data: Record<string, string>, form: Dictionary["contact"]["form"]) {
  return [
    form.greeting,
    ``,
    data.message,
    ``,
    `— ${data.name}`,
    `Email : ${data.email}`,
    data.subject ? `${form.subjectLine} : ${data.subject}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

/** Soft white-to-peach wash that drifts slowly behind the card. */
function Backdrop() {
  const reduce = useReducedMotion();
  const drift = (x: number[], y: number[], duration: number) =>
    reduce
      ? {}
      : {
          animate: { x: x.map((v) => `${v}%`), y: y.map((v) => `${v}%`) },
          transition: {
            duration,
            ease: "easeInOut" as const,
            repeat: Infinity,
            repeatType: "mirror" as const,
          },
        };

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden bg-gradient-to-b from-white via-[#fdf1e8] to-[#f6c3a2]"
    >
      <motion.div
        className="absolute -bottom-[35%] -left-[10%] h-[80%] w-[55%] rounded-full bg-[#f4a67a] blur-[100px]"
        {...drift([0, 10, -4], [0, -8, 4], 16)}
      />
      <motion.div
        className="absolute -bottom-[30%] right-[20%] h-[60%] w-[35%] rounded-full bg-[#f7f3ee] blur-[90px]"
        {...drift([0, -14, 6], [0, -6, 8], 13)}
      />
      <motion.div
        className="absolute -right-[10%] bottom-[5%] h-[55%] w-[35%] rounded-full bg-[#f3a47a] blur-[110px]"
        {...drift([0, -8, 4], [0, 10, -4], 18)}
      />
    </div>
  );
}

export function Contact() {
  const { contact } = useDictionary();
  const { form: t } = contact;
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(
      new FormData(form).entries(),
    ) as Record<string, string>;

    if (!contact.whatsapp) {
      setStatus("error");
      return;
    }

    const url = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
      buildMessage(data, t),
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setStatus("sent");
    form.reset();
  }

  return (
    <section
      id="contact"
      className="relative -mb-px bg-[linear-gradient(to_bottom,#fdf6ef_50%,#121212_50%)] pb-px pt-16 sm:pt-24"
    >
      <div className="mx-auto max-w-[1260px] px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] shadow-[0_0_50px_-10px_rgba(255,196,120,0.35)] sm:rounded-[3rem]">
          <Backdrop />

          <div className="relative grid items-center gap-10 px-5 py-12 sm:px-12 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-20 lg:py-28">
            {/* Form */}
            <Reveal className="order-2 lg:order-1">
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl bg-white p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)] sm:p-7"
              >
                <div className="space-y-5">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-foreground">
                      {t.name}
                    </span>
                    <input
                      name="name"
                      required
                      autoComplete="name"
                      placeholder={t.namePlaceholder}
                      className={FIELD}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-foreground">
                      {t.email}
                    </span>
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder={t.emailPlaceholder}
                      className={FIELD}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-foreground">
                      {t.subject}
                    </span>
                    <input name="subject" placeholder={t.subjectPlaceholder} className={FIELD} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-foreground">
                      {t.message}
                    </span>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder={t.messagePlaceholder}
                      className={`${FIELD} resize-y`}
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1b1b1b] px-5 py-3.5 text-[15px] font-semibold text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <FaWhatsapp className="h-4 w-4" aria-hidden />
                  {t.submit}
                </button>

                <p role="status" aria-live="polite" className="mt-3 min-h-5 text-center text-xs text-muted">
                  {status === "sent" &&
                    t.sent}
                  {status === "error" && (
                    <>
                      {t.unavailable}{" "}
                      <a href={`mailto:${contact.email}`} className="underline">
                        {contact.email}
                      </a>
                      .
                    </>
                  )}
                </p>
              </form>
            </Reveal>

            {/* Pitch */}
            <Reveal delay={0.1} className="order-1 lg:order-2">
              <h2 className="font-serif text-4xl leading-[1.1] tracking-tight text-foreground sm:text-5xl">
                {contact.title}
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-foreground/70">
                {contact.text}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
