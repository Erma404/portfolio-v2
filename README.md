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

English-only landing page at `/prompt-pack` for "The PO Prompt Pack", plus a thank-you page at `/prompt-pack/thanks` where the free PDF is downloaded. Everything you edit lives in `src/lib/prompt-pack-config.ts`. Pages: `src/app/[lang]/prompt-pack/page.pp.tsx` and `.../thanks/page.pt.tsx`. What is live is computed in `src/lib/prompt-pack-state.ts`.

**Visibility.** The landing page only exists as a route when `published` is true and the fields required by the mode are filled and valid:
- `waitlist`: `emailFormAction` and a `freeGiftPdfPath` that points to a file really present in `public/`.
- `sale`: `gumroadUrl`.

Otherwise `next.config.ts` leaves the page out of the build: real 404 in production, no HTML file, no sitemap entry. `published: true` with something missing prints a `[prompt-pack]` warning at build that names the missing field (or the PDF path that does not exist) and behaves as unpublished. The thank-you page (`pt.tsx` extension) is only built when the gift can really be downloaded (published, `emailFormAction` set, PDF present), so there is never a dead download button. In `next dev` both pages are always visible, with a banner when they would not be built. Restart `next dev` after changing `published`, `mode` or the PDF path.

**Preview locally.** `npm run dev`, open http://localhost:3000/prompt-pack and http://localhost:3000/prompt-pack/thanks. To preview the sale state, set `mode: "sale"` and a `gumroadUrl` temporarily.

**Modes.** `waitlist`: the email form is the main CTA, no price, no buy button. `sale`: the Gumroad button is the main CTA with the price block; the free-prompts form shows only if `emailFormAction` is filled and the PDF exists. Product JSON-LD is emitted only in sale mode.

**Price.** The price on the page must always match the price shown on Gumroad. With `launchPriceEndDate` in the future the page shows "Launch price: $12 until {date}. Then $15."; otherwise only the regular price. The browser re-checks the date, but the JSON-LD price and the server HTML are computed at build time: rebuild (push to `main`) on the end date, or the structured data keeps the launch price.

### Free gift: the PDF

The gift is one PDF served from this site (no Notion version: Notion is for the paid pack). No placeholder PDF is committed.
1. Pick an unguessable file name: `openssl rand -hex 8` gives a suffix, for example `po-prompts-3f9a1c7e2b64d081.pdf`.
2. Put the file in `public/downloads/` (create the folder if needed). The build copies it to `/downloads/` on the site.
3. Set `freeGiftPdfPath: "/downloads/po-prompts-3f9a1c7e2b64d081.pdf"` in the config.
4. If the path is set but the file is missing, the build warns and treats the page as unpublished (waitlist) or disables the free form (sale).

**Not indexed.** The thank-you page has `noindex, nofollow` and is never in the sitemap. `robots.txt` disallows `/downloads/`. On a server build (`next start`, Vercel) `/downloads/*` also gets `X-Robots-Tag: noindex, nofollow`; GitHub Pages cannot send custom headers, so there only `robots.txt` and the unguessable name apply. `robots.txt` is a request to well-behaved crawlers, not access control: anyone who knows or is given the PDF address can open it.

**What the email contains.** Two options, both work:
- Link to the thank-you page `https://ernestinematjabo.com/prompt-pack/thanks/` (the page can change later without touching sent emails, and keeps the download button in one place).
- Direct link to the PDF `https://ernestinematjabo.com/downloads/<your file>.pdf` (one click fewer, but a sent link stays tied to that file name; if you rename the file, old emails break).

### Connecting the email form (MailerLite or Kit)

The form is a plain HTML POST to `emailFormAction`, so it works without JavaScript. With JavaScript it posts in the background and, on success, opens the thank-you page (`thankYouPath`). If the provider blocks cross-origin requests, the form falls back to a normal submit and the visitor lands on the provider's own confirmation page: set the provider's "after signup" redirect to `https://ernestinematjabo.com/prompt-pack/thanks/` so both paths end in the same place. `thankYouPath` only changes where the form redirects; the page itself stays at `/prompt-pack/thanks`.
- Kit: create a form, copy its form action URL (the `action` of the embed code, `https://app.kit.com/forms/<id>/subscriptions`), set `emailFormAction` to it and `emailFieldName` to Kit's field name (`email_address`).
- MailerLite: create an embedded form, copy the `action` of its HTML embed code, set `emailFieldName: "fields[email]"`.
- Role dropdown: create a custom field for the role at the provider and put its field name in `roleFieldName`. While empty, the dropdown is hidden.
Check the exact action URL and field names in the provider's embed code; they are the source of truth.

**Not included on purpose.** No link from the header or home, no analytics events (the site has no analytics), no privacy policy text (set `privacyPolicyUrl` once a page exists).
