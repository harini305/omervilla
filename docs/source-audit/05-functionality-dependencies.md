# 05 — Functionality & Technical Dependencies

Legend: **Observed** = present in markup or config · **Verified** = exercised during the audit (an HTTP request returned the expected result) · **Unconfirmed** = cannot be known from the outside

No forms were submitted during the audit. That was deliberate: a test submission would send a real inquiry to the business.

---

## 1. Platform stack (current site)

| Layer | Detail | Status |
|---|---|---|
| CMS | WordPress **6.7.10** | Verified (generator meta) |
| Theme | **Salient 17.0.2** + empty `salient-child` theme (no customizations) | Verified |
| Page builder | WPBakery (js_composer_salient 7.8.1) + Salient Core + Salient Portfolio (portfolio unused) | Verified |
| Hosting | Hostinger (Hostinger tools/AI assistant/onboarding plugins, `hcdn` CDN server header, LiteSpeed Cache) | Verified (REST namespaces, headers) |
| Security | Wordfence + Wordfence Login Security | Verified (REST namespaces) |
| Forms | **Forminator** (active form #301). WPForms is also installed, but no WPForms form is rendered | Verified |
| Analytics | Google Site Kit 1.187.0 → Google tag **`GT-P8RZGKRG`** | Verified |
| Other REST namespaces | `wpmudev_pcs`, `hub-connector` (WPMU DEV), `mcp`, `wp-abilities` | Observed |

---

## 2. Feature-by-feature

| # | Feature | Where | What happens | Status | Rebuild consideration |
|---|---|---|---|---|---|
| 1 | **Navigation & routing** | Global | Plain links: 4-item header nav, 8 footer links, home post grid | Verified (all 200) | Static Next.js routes. Keep the same slugs so existing links and SEO survive: `/rooms-rates`, `/event-venue`, `/food-beverage`, `/yoga-wellness`, `/cultural-spiritual-activities`, `/family-groups`, `/20-off-first-stay`, `/contact-us`. Add a redirect `/food` → `/food-beverage` (the footer currently relies on it) |
| 2 | **Inquiry form** (Forminator #301) | /contact-us | AJAX POST to WP `admin-ajax.php` (`action=forminator_submit_form_custom-forms`) with a nonce. Fields: `name-1` (text), `email-1` (email), `date-1` Check In (datepicker), `date-2` Check Out (datepicker), `number-1` pax (number, min 1), `select-1[]` Requirement (multi-select: 5/4/3/2/1 Bedroom), `textarea-1` message. **Every field is marked not required** (`aria-required="false"`) | Observed; submission **not tested** | ⚠ **Backend dependency.** Where submissions go (email recipient, stored entries, auto-reply) is unconfirmed. The rebuild needs its own handler, e.g. a Next.js Route Handler with an email service (Resend/SMTP), Formspree, or a booking engine. Get the recipient address from the client. Add proper validation (the original has almost none) and spam protection |
| 3 | **Date pickers** | Contact form | Forminator jQuery-UI datepicker | Observed | Use an accessible date-range picker; add a check-out-after-check-in rule |
| 4 | **WhatsApp chat** | Floating, all pages | Click to Chat (HoliThemes) v4.40 → opens `wa.me/6282147981342` in a new tab; no prefilled text; shown on desktop and mobile; fires GA event "click to chat", GTM "Click to Chat" and a FB Pixel event | Observed (config read) | Pure link; easy to rebuild. Keep the analytics event if tracking matters |
| 5 | **Airbnb** | CTA band | External link to the host profile `airbnb.com/users/show/650556914` | Verified (200) | External link only. No listing embed, no availability sync |
| 6 | **Booking / availability / payment** | — | **None.** No booking engine, calendar, pricing calculator or checkout exists | Verified absent | Booking is inquiry-based (form, WhatsApp, Airbnb). Do not imply instant booking in the redesign unless the client adds a booking system |
| 7 | **Site search** | Header overlay | WordPress `?s=` search across pages and posts; results label items "Page" or "Blog Post" | Verified (works) | Low value with 9 pages. Decide whether to drop it or replace it with a static client-side search |
| 8 | **Instagram feed** | Home "Keep connected with Omer" | Smash Balloon Instagram Feed 6.11.4, feed `*1`: 4 posts, 4 columns, "Load More" (AJAX), "Follow on Instagram", lightbox, carousel-post icons. Fetches data via a Meta Graph API token stored in WP | Observed (rendered posts present) | ⚠ **Third-party API dependency.** Options: Instagram Basic Display/Graph API with a token refresh job, an embed widget (Behold, Elfsight, SnapWidget), or static curated images. The access token lives in WP and cannot be extracted |
| 9 | **Map** | Home `#location` | Salient Leaflet map (OpenStreetMap tiles), center −8.6011391 / 115.1608734, zoom 13, accent marker, info window "Omer Villa & Retreat" open on load, 500px tall. No API key needed | Observed | Rebuild with Leaflet/react-leaflet (free) or a Google Maps embed. Consider a "Get directions" link (currently missing) |
| 10 | **Image carousels** | Rooms (×3), Event, Food, Yoga, Family | Flickity: autoplay 4000ms, drag, wrap, some free-scroll, "touch_total" controls | Observed | Rebuild with a lightweight carousel or GSAP-driven slider |
| 11 | **Lightbox** | Carousel images link to full-size files; Instagram | Fancybox 3.3.1 | Observed | Needs a lightbox component |
| 12 | **Accordion** | Rooms › Rates (5/4/3/2 Bedroom) | Salient minimal toggles. The initial open state could not be determined from markup (`data-starting="default"`) [I: all closed] | Observed | Accordion or tabs |
| 13 | **Testimonial slider** | Contact | Minimal style, auto-rotate 9000ms | Observed | Slider/fade |
| 14 | **Post grids** | Home (feature masonry; promo carousel), footer widget, category archives | Dynamic WP queries by category | Observed | Static data in the rebuild (content file or JSON) |
| 15 | **Comments** | /event-venue only (comments open) | WP comment form → `wp-comments-post.php`. Zero comments exist | Verified | Recommend dropping; it is a blog leftover. Confirm with the client |
| 16 | **Social share buttons** | All feature posts | Facebook, Twitter, LinkedIn, Pinterest (Salient), with JS-only `#` hrefs | Observed | Optional |
| 17 | **Header behaviour** | Global | Transparent over hero → solid white + shadow on scroll; logo swaps white ↔ black; logo shrinks; animated underline on hover; fixed on mobile | Observed (settings) | Rebuild with ScrollTrigger |
| 18 | **Off-canvas mobile menu** | <1000px | Slide-out from right, dark backdrop | Observed | Rebuild |
| 19 | **Animations** | Global | Parallax hero backgrounds, fade-ins, list stagger, split-heading reveals, hover zooms | Observed | Good fit for GSAP + ScrollTrigger; respect `prefers-reduced-motion` |
| 20 | **Background video** | Home hero, Cultural page | HTML5 `<video>` autoplay/muted/loop (Salient) | Observed | Compress the 24 MB / 52 MB files; add a poster and `playsinline`; consider skipping autoplay on slow connections |
| 21 | **Login / accounts** | — | None public (wp-admin only) | Verified absent | None needed |
| 22 | **E-commerce** | — | None (`data-cart="false"`) | Verified absent | — |
| 23 | **Analytics / tracking** | Global | Google tag `GT-P8RZGKRG`; WhatsApp click events to GA, GTM and FB Pixel (the pixel ID was not found in the markup) | Observed | Ask the client whether to keep GA (needs the measurement ID / GTM container), and whether a Meta Pixel actually exists |

---

## 3. Backend / integration risks for a frontend-only rebuild

1. **Contact form delivery:** the most important item. The new site has no WordPress to post to. Choose an email/storage provider and confirm the recipient inbox.
2. **Instagram feed:** needs a token or a third-party widget. The existing token is inaccessible.
3. **Content management:** today the client can edit text and rates in WP-admin. A static Next.js build removes that ability unless a headless CMS is added (or the existing WP is kept as a headless source through its REST API, which is publicly readable). **This is a decision for the client.**
4. **Media hosting:** about 102 MB of original media is now local. It ships with the Next.js `public/` folder (or goes to Blob/CDN storage). Per the project requirement, set `images: { unoptimized: true }` in `next.config` so Vercel Image Optimization is never used. Images should therefore be **pre-sized and compressed at build time or manually** (WebP/AVIF variants) to keep pages fast.
5. **Domain / DNS / email:** moving omervilla.com to Vercel affects DNS. Check MX records before changing nameservers so business email (if any) is not broken. Out of scope for this phase.
6. **SEO continuity:** keep the slugs. Redirect `/category/*` and `/author/*` to `/` or to sensible pages, and keep `/wp-sitemap.xml` → `/sitemap.xml`.
