# Omer Villa & Retreat — frontend rebuild (Phase 2)

Next.js 16 (App Router, JavaScript) · React 19 · GSAP 3 + ScrollTrigger · Leaflet · CSS Modules.
Content, routes and assets come from the Phase 1 audit in `docs/source-audit/`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
npm start        # serve out/ locally
```

## Hosting (Vercel, low usage)

The site is a **fully static export** (`output: "export"` in `next.config.mjs`). Every page is
pre-built HTML, so Vercel only serves files from its CDN: no serverless functions, no image
optimisation, no runtime.

- `vercel.json` treats the project as a plain static site (`framework: null`, output `out/`),
  and holds the redirects (`/food` → `/food-beverage`, old WordPress `/category/*`, `/author/*`,
  `/wp-sitemap.xml`) plus one-year browser caching for `/media/*` and `/_next/static/*`.
- `scripts/fix-export.mjs` runs after `next build` and copies Next 16's prefetch files to the names
  the browser requests, so client-side navigation never 404s on a static host.
- Only the 90 photographs the site actually uses are deployed (`public/media`, about 35 MB with
  the two films). Unused library photos are skipped by `npm run media`.
- Cached media is marked immutable for a year: if you replace a photo, give the new file a new
  name so returning visitors see it.

## Structure

| Path | Purpose |
|---|---|
| `src/app/<route>/page.js` | The nine audited routes, each with its own layout module |
| `src/data/content.js` | Verbatim page copy (typos kept and marked `[sic]` until the client approves fixes) |
| `src/data/site.js` | Verified contact facts, links, navigation |
| `src/data/media.js` | Alt text and responsive `srcset` for every photograph |
| `src/components/` | Header, footer, CTA band, gallery + lightbox, rates accordion, testimonials, map, contact form, motion layer |
| `scripts/prepare-media.py` | Builds `public/media/*.webp` (480 / 960 / full width) and trimmed logos from `source-assets/uploads/` |
| `scripts/fix-export.mjs` | Post-build fix for the static export (see Hosting) |

The original WordPress downloads (`source-assets/uploads/`, 102 MB) are **not in this repository**:
the site never loads them. Keep them locally to re-run `npm run media`; they are never modified.

## Media

- **Images:** `next.config.mjs` sets `images.unoptimized: true`. Photographs are pre-sized WebP files
  (`npm run media`, requires Python + Pillow) served through `srcset`. Logos use `next/image`, which
  therefore emits the static file directly.
- **Videos:** transcoded with ffmpeg (originals untouched):
  - `Short.mp4` 1920×1080, 24.2 MB → `public/media/video/Short-720p.mp4` 1280×720, H.264 CRF 27, no audio, 5.8 MB
  - `Omer.mp4` 1080×1920, 52.5 MB → `public/media/video/Omer-720p.mp4` 720×1280, H.264 CRF 26, AAC 96k, 8.6 MB

  ```bash
  ffmpeg -i Short.mp4 -an -vf scale=1280:-2 -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart Short-720p.mp4
  ffmpeg -i Omer.mp4 -vf scale=720:-2 -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart Omer-720p.mp4
  ```

## Open items for the client

- **Rates** are shown as published, clearly marked as stated valid until 15 Dec 2024; season dates are unknown.
- **Contact form** has no backend: it validates and hands the inquiry to WhatsApp (or the clipboard). Nothing is sent from the site.
- **Instagram** is a static selection of villa photographs linking to the profile; no live feed.
- **20% OFF** terms, validity and redemption are unpublished; the page says so.
- Copy typos are preserved verbatim (see `[sic]` markers in `content.js`).
- Photo credits/rights for the MATANAI wedding series; use of `pray2.jpg`, `pray3.jpg` (attached to the Cultural post but not previously shown).
