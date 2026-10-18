This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## PO Prompt Pack landing page

English-only landing page at `/prompt-pack` for "The PO Prompt Pack". Everything you edit lives in `src/lib/prompt-pack-config.ts`; the page is `src/app/[lang]/prompt-pack/page.pp.tsx`.

**Visibility.** The route only exists when `published` is true and the fields required by the mode are filled (`waitlist`: `emailFormAction`, `sale`: `gumroadUrl`). Otherwise `next.config.ts` leaves `page.pp.tsx` out of the build: production has a real 404, no HTML file, no sitemap entry. `published: true` with a missing field prints a `[prompt-pack]` warning at build and behaves as unpublished. In `next dev` the page is always visible (with a banner when unpublished). Restart `next dev` after changing `published` or `mode`.

**Preview locally.** `npm run dev`, open http://localhost:3000/prompt-pack. To preview the sale state, set `mode: "sale"` and a `gumroadUrl` temporarily.

**Modes.** `waitlist`: email form is the main CTA, no price, no buy button. `sale`: Gumroad button is the main CTA with the price block; the free-prompts form shows only if `emailFormAction` is filled. Product JSON-LD is emitted only in sale mode.

**Price.** The price on the page must always match the price shown on Gumroad. With `launchPriceEndDate` in the future the page shows "Launch price: $12 until {date}. Then $15."; otherwise only the regular price. The browser re-checks the date, but the JSON-LD price and the server HTML are computed at build time: rebuild (push to `main`) on the end date, or the structured data keeps the launch price.

**Connecting the email form (MailerLite or Kit).** The form is a plain HTML POST to `emailFormAction`, so it works without JavaScript. With JavaScript it posts in the background and shows a success or error message; if the provider blocks cross-origin requests, it falls back to a normal submit and the visitor lands on the provider's own confirmation page.
- Kit: create a form, copy its form action URL (the `action` of the embed code, `https://app.kit.com/forms/<id>/subscriptions`), set `emailFormAction` to it and keep `emailFieldName: "email_address"` (Kit's field name; change it from the default `"email"`).
- MailerLite: create an embedded form, copy the `action` of its HTML embed code, set `emailFieldName: "fields[email]"`.
- Role dropdown: create a custom field for the role at the provider and put its field name in `roleFieldName` (for example `fields[role]` on MailerLite, `fields[role]` on Kit). While empty, the dropdown is hidden.
Check the exact action URL and field names in the provider's embed code; they are the source of truth.

**Not included on purpose.** No link from the header or home, no analytics events (the site has no analytics), no privacy policy text (set `privacyPolicyUrl` once a page exists).
