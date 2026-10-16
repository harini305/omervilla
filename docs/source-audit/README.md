# Omer Villa & Retreat — Source Website Audit (Phase 1)

**Site:** https://omervilla.com/ · **Audit date:** 2026-10-15 · **Scope:** investigation only; no redesign or implementation.

## Documents

| File | Contents |
|---|---|
| [01-page-route-inventory.md](01-page-route-inventory.md) | All routes, navigation, shared components, page-by-page section order, responsive notes |
| [02-content-preservation.md](02-content-preservation.md) | Verbatim copy checklist for every page: rates, prices, testimonials, contact facts, SEO metadata status |
| [03-asset-inventory.md](03-asset-inventory.md) | Page → asset mapping, logos, videos, unused media, icon/font sources |
| [asset-inventory.csv](asset-inventory.csv) | One row per media file (119): local path, real dimensions/bytes, pages using it, source URL |
| [04-brand-typography-colors.md](04-brand-typography-colors.md) | Fonts, type scale, verified color tokens, logo/imagery/motion/tone |
| [05-functionality-dependencies.md](05-functionality-dependencies.md) | Stack, every interactive feature, backend/integration risks |
| [06-gaps-and-open-questions.md](06-gaps-and-open-questions.md) | Audit limitations, missing assets, site issues, questions for the client |
| [evidence/](evidence/) | Raw HTML snapshots of every page, text outlines, compiled theme CSS, REST JSON (pages, posts, media) |
| [`/source-assets/uploads/`](../../source-assets/uploads/) | All 119 original media files downloaded from the site (101.8 MB), same `YYYY/MM/` paths as WordPress |

## Method
1. Discovered routes from `robots.txt` → `/wp-sitemap.xml` (posts, pages, categories), the WP REST API, and links in the header, footer and body; probed common routes (`/about`, `/gallery`, `/booking`, `/blog`, 404, search).
2. Fetched the rendered HTML of every route and extracted headings, text, links, images, backgrounds, forms and component configuration (Salient/WPBakery `data-*` attributes).
3. Read the compiled theme stylesheet (`salient-dynamic-styles.css`) for fonts, sizes and color tokens, plus inline element styles.
4. Pulled the media library from `/wp-json/wp/v2/media`, downloaded every file, checked real dimensions and sizes against the WP metadata, and mapped each file to the pages that use it.
5. Visually inspected the logo files and sample photography.

**Limitation:** no browser screenshots were taken. Visual and responsive notes come from markup and theme settings (see 06-gaps A1).

## Key facts at a glance
- **9 content routes:** Home, Rooms & Rates, Event & Venue, Food & Beverage, Yoga & Wellness, Cultural & Spiritual Activities, Family & Groups, 20% OFF First Stay, Contact Us. Plus system pages (category/author archives, search, 404).
- **Stack:** WordPress 6.7.10 · Salient 17.0.2 + WPBakery · Forminator · Smash Balloon Instagram · Click-to-Chat WhatsApp · Site Kit (GA `GT-P8RZGKRG`) · Hostinger / LiteSpeed.
- **Brand:** accent **#9c8f74** (taupe), **#f2ecde** (cream), white; **Georgia** serif headings/body; **Roboto 300** letter-spaced eyebrows; lotus-and-yogi logo (PNG only).
- **Conversion paths:** inquiry form, WhatsApp **+62 821-4798-1342**, Airbnb profile. **No booking engine.** No phone/email/address published.
- **Critical backend dependencies for the rebuild:** form delivery, Instagram feed, content editing (CMS decision).
- **Stale content:** room rates are stated as valid only until **15 Dec 2024**.

## Implementation notes for Phase 2 (not started)
- Target: Next.js (App Router, JavaScript), React, GSAP + ScrollTrigger, responsive.
- Set `images.unoptimized = true` in `next.config` (no Vercel Image Optimization), and **pre-compress** images and videos.
- Keep existing slugs; redirect `/food` → `/food-beverage`; handle `/category/*`, `/author/*` and `/wp-sitemap.xml`.
- Redesign the layout, but keep the verbatim copy (02), original assets (03) and brand tokens (04).
- Fix the structural leftovers (duplicate H1s, blog bylines, comments) and add the missing SEO metadata, using existing copy only and with client approval.
- The design direction is still to be decided after this audit is reviewed.

## Confirmation
No redesign, UI components, application code, package installs or project configuration were created. Nothing was pushed to GitHub or deployed to Vercel. The only files added to the workspace are this `docs/source-audit/` folder and the downloaded original media in `source-assets/uploads/`. The workspace was empty beforehand, so nothing was modified or overwritten.
