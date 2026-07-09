# Brian & Chimango — Wedding Website

A one-page wedding website for Brian & Chimango, 26 August 2026. Built with
Next.js (App Router), TypeScript and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Windows note:** this repo lives under a folder containing `&`, which
> breaks npm's generated `.bin` shims on Windows. `package.json` scripts
> already work around it by invoking Next.js/ESLint directly via `node`
> (`node node_modules/next/dist/bin/next dev`, etc.), so `npm run dev` /
> `npm run build` / `npm run lint` work as normal. No action needed unless
> you add new CLI-based scripts — apply the same pattern for those.

## Project structure

- `src/lib/wedding-data.ts` — **single source of truth** for all editable
  content: couple names, wedding date, ceremony/reception venues, the
  schedule, RSVP contacts, outfit inspo items and gallery images.
- `src/lib/rsvp-service.ts` — RSVP submission logic, isolated from the form
  UI. Uses `NEXT_PUBLIC_RSVP_API_URL` when set, otherwise falls back to a
  mock submission (logs to console, resolves success after ~1s).
- `src/types/rsvp.ts` — shared RSVP types.
- `src/components/` — one component per section (`Hero`, `OurStory`,
  `WeddingDetails`, `Schedule`, `Countdown`, `Gallery`, `OutfitInspo`,
  `Rsvp`/`RsvpForm`, `Nav`, `Footer`), plus shared primitives
  (`SectionHeading`, `RevealOnScroll`).
- `public/images/` — the four couple photos used across the site.

## Updating content

### Schedule
Edit the `schedule` array in `src/lib/wedding-data.ts`. Each entry is
`{ time, title, description }` — add, remove or reorder freely; the
Schedule section re-renders automatically.

### Outfit inspiration images
Edit the `outfitInspo` array in `src/lib/wedding-data.ts`. Each item is
`{ label, note, image }`. Drop new images into `public/images/` and set
`image: "/images/your-file.jpg"` — cards without an `image` show an
elegant "coming soon" placeholder automatically, so you can add real
photos one at a time.

### Wedding date, venues, RSVP contacts
All in `src/lib/wedding-data.ts` — `weddingDate`, `ceremony`, `reception`,
`rsvpContacts`. `weddingDate.iso` drives the live countdown, so keep it in
sync with `weddingDate.display`.

## Connecting the RSVP form to a real backend

The form currently submits via `submitRsvp()` in `src/lib/rsvp-service.ts`,
which mocks success when `NEXT_PUBLIC_RSVP_API_URL` is unset. The `server/`
directory contains a ready-to-deploy Python (FastAPI) + SQLite backend that
matches the expected `RsvpPayload` shape — see [server/README.md](server/README.md)
for deployment steps and, importantly, **how to check the RSVP list**
(browser admin page, CSV export, or JSON API).

To go live:

1. Deploy `server/` to your VPS (guide in `server/README.md`).
2. Copy `.env.local.example` to `.env.local` and set
   `NEXT_PUBLIC_RSVP_API_URL` to that backend's base URL.
3. Add the same env var in Vercel's Project Settings → Environment
   Variables for production/preview.

No component code needs to change — `submitRsvpRemote` will be used
automatically once the env var is present.

## Deploying on Vercel

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import it in [Vercel](https://vercel.com/new) — framework preset
   "Next.js" is detected automatically.
3. Add `NEXT_PUBLIC_RSVP_API_URL` under Environment Variables once the RSVP
   backend exists (optional at first launch; the mock handler works fine
   for a soft launch).
4. Deploy.
