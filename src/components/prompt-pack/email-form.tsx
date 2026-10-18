"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { ctaClass } from "./styles";

type Status = "idle" | "sending" | "success" | "error";

const ROLES = ["Junior PO", "PO", "Senior PO", "PM", "Other"];

// Same family as the contact form fields (rounded, soft fill, accent focus ring), with a
// stronger border so the field edge stays visible on the gradient cards.
const fieldClass =
  "w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-base text-foreground outline-none transition placeholder:text-black/45 focus:border-[#b84a17] focus:ring-2 focus:ring-[#b84a17]/25 motion-reduce:transition-none";

/**
 * Plain HTML form that POSTs to the email provider, so it works without JavaScript.
 * With JavaScript it submits in the background and shows the result in place. If the
 * provider refuses cross-origin requests (the fetch itself fails), it falls back to a
 * normal form submit, which lands on the provider's own confirmation page.
 */
export function EmailForm({
  action,
  emailFieldName,
  roleFieldName,
  privacyPolicyUrl,
}: {
  action: string;
  emailFieldName: string;
  roleFieldName: string;
  privacyPolicyUrl: string;
}) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        form.reset();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      // Blocked cross-origin request or network failure: let the browser submit normally.
      form.submit();
    }
  }

  return (
    <div className="text-left">
      <form ref={formRef} method="post" action={action} onSubmit={onSubmit} className="flex flex-col gap-3">
        <div>
          <label htmlFor={`${uid}-email`} className="mb-1.5 block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id={`${uid}-email`}
            type="email"
            name={emailFieldName}
            required
            autoComplete="email"
            inputMode="email"
            placeholder="you@company.com"
            className={fieldClass}
          />
        </div>

        {roleFieldName && (
          <div>
            <label htmlFor={`${uid}-role`} className="mb-1.5 block text-sm font-medium text-foreground">
              Your role
            </label>
            <select id={`${uid}-role`} name={roleFieldName} defaultValue="" className={fieldClass}>
              <option value="">Select (optional)</option>
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" disabled={status === "sending"} className={`${ctaClass} mt-1 disabled:opacity-70`}>
          Send me the 5 free prompts
        </button>
      </form>

      <p aria-live="polite" role="status" className="min-h-0 text-sm font-medium text-foreground">
        {status === "success" && <span className="mt-3 block">Thank you. Your request has been sent.</span>}
        {status === "error" && (
          <span className="mt-3 block text-[#b3261e]">Something went wrong. Please try again.</span>
        )}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-muted">
        I&apos;ll send you the free prompts and occasional emails about product ownership and AI.
        Unsubscribe anytime.
        {privacyPolicyUrl && (
          <>
            {" "}
            <a href={privacyPolicyUrl} className="underline underline-offset-2 hover:text-foreground">
              Privacy policy
            </a>
          </>
        )}
      </p>
    </div>
  );
}
