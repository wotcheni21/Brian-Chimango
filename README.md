# Brian & Chimango - Wedding Website

A one-page wedding website for Brian & Chimango, 26 August 2026. Built with
Next.js App Router, TypeScript and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Windows note:** this repo lives under a folder containing `&`, which
> breaks npm's generated `.bin` shims on Windows. `package.json` scripts
> already work around it by invoking Next.js/ESLint directly via `node`.

## Project structure

- `src/lib/wedding-data.ts` - single source of truth for editable wedding
  content: couple names, date, venues, schedule, RSVP contacts, outfit inspo
  items and gallery images.
- `src/lib/rsvp-service.ts` - RSVP submission logic. Uses
  the same-origin `/api/rsvp` proxy so HTTPS frontends can safely reach the
  VPS API.
- `src/types/rsvp.ts` - shared RSVP types.
- `src/components/` - one component per section plus shared primitives.
- `public/images/` - couple photos used across the site.
The reusable API now lives beside this frontend at
`D:\Projects\Weddings\wed api`.

## Updating content

### Schedule

Edit the `schedule` array in `src/lib/wedding-data.ts`. Each entry is
`{ time, title, description }`.

### Outfit inspiration images

Edit the `outfitInspo` array in `src/lib/wedding-data.ts`. Drop new images
into `public/images/` and set `image: "/images/your-file.jpg"`. Cards without
an image show a "coming soon" placeholder.

### Wedding date, venues, RSVP contacts

All live in `src/lib/wedding-data.ts`. `weddingDate.iso` drives the countdown,
so keep it in sync with `weddingDate.display`.

## Connecting the RSVP form to the reusable API

The backend in `D:\Projects\Weddings\wed api` is designed to become the
universal `wedding-rsvp-api` repo. It can serve many wedding frontends by
separating responses with a wedding slug.

Recommended repo layout:

```txt
wedding-rsvp-api
brian-chimango-wedding-site
future-couple-wedding-site
```

For this frontend, set:

```env
RSVP_API_URL=http://75.119.141.13
NEXT_PUBLIC_WEDDING_SLUG=brian-chimango
```

Then this site submits to:

```txt
POST /api/rsvp/weddings/brian-chimango/rsvp
```

See the API README at
`D:\Projects\Weddings\wed api\README.md` for deployment, admin page, CSV
export, and backup instructions.

## Deploying on Vercel

1. Push this frontend repo to GitHub/GitLab/Bitbucket.
2. Import it in [Vercel](https://vercel.com/new). The Next.js preset is
   detected automatically.
3. Add `RSVP_API_URL=http://75.119.141.13` and
   `NEXT_PUBLIC_WEDDING_SLUG=brian-chimango` under Environment Variables.
4. Deploy.
