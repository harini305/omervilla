# 06 — Missing Assets, Inaccessible Items, Content Issues & Open Questions

## A. Audit limitations (what this audit could NOT do)
| # | Limitation | Impact |
|---|---|---|
| A1 | **No real-browser rendering or screenshots.** The audit used HTTP fetches of the server-rendered HTML, CSS and REST API; no headless browser was available in this session | Layout, spacing and responsive observations come from theme settings and markup [I], not visual confirmation. Before the redesign, review the live site in a browser at 1440 / 1024 / 768 / 390px |
| A2 | Contact form **not submitted** (to avoid sending a fake inquiry to the business) | Delivery target and auto-responses are unknown |
| A3 | WordPress admin not accessed | Unknown: form notification email, Instagram token, menus as configured (REST menus endpoint returns 401), drafts or private pages, plugin settings |
| A4 | H2–H4 desktop font sizes are Salient defaults that were not emitted in the dynamic CSS | Recorded as estimates in 04-brand |
| A5 | Instagram feed content changes continuously | The captured posts are a snapshot (newest dated about Oct 2026) |
| A6 | Accordion's initial open/closed state and the exact video autoplay attributes were inferred | Minor |

## B. Missing / unavailable assets
| # | Item | Status |
|---|---|---|
| B1 | Vector logo (SVG/AI/EPS) | Not on the server; only PNG (990px). **Request from client** |
| B2 | Favicon / app icons | Never configured. Can be derived from the logo mark once approved |
| B3 | High-resolution photo masters | The server holds ≤1280px for most photos (≤1600px for a few). The optimizer has already recompressed every file and downscaled 3 (hero night/day shots now 1600×1200). **Ask the client or photographer (MATANAI) for originals**, especially for full-bleed heroes on large screens |
| B4 | "Lovelo" font | Referenced in CSS, no file loaded; never actually rendered |
| B5 | Instagram images | Remote only; not downloadable as site assets |
| B6 | Brand guidelines | None found |
| B7 | Photo credits / usage rights | Unknown (MATANAI_MNR wedding series is probably a third-party photographer's work) |

## C. Inaccessible / broken / odd items found on the live site
| # | Finding | Evidence |
|---|---|---|
| C1 | Footer "Dining" links to `/food/` (not a real slug); it only works because WordPress redirects it to `/food-beverage` | curl redirect |
| C2 | Footer links use `http://` and trailing slashes; canonicals are `https://` without slashes | HTML |
| C3 | Content pages are WP **posts**: they show author "nsurya.wijaya", a "No Comments" link, a category pill, share buttons, and **a duplicated title (two H1s)** | HTML |
| C4 | Comments are open on Event & Venue only (inconsistent with the other posts) | REST `comment_status` |
| C5 | Category and author archives are publicly reachable, with an empty "Recent Comments" sidebar | HTML |
| C6 | `/about`, `/gallery`, `/booking`, `/blog` → 404 (there was never an About page) | curl |
| C7 | No meta descriptions, OG tags, structured data or favicon; almost no image alt text | HTML |
| C8 | Copy errors: "What you can do while stay at Omer", "Price are per night", "Price are per hour", "ect.", "Villa's", "Additional room need to be booked"; inconsistent brand casing (OMER / Omer); home Discover paragraph has no final period | Content |
| C9 | 1 Bedroom Joglo has no maximum capacity stated | Content |
| C10 | Home list mentions **Surfing** and **VW Tours**, which have no supporting content anywhere | Content |
| C11 | Cultural & Spiritual Activities page has a single paragraph; two attached images (`pray2/3.jpg`) are not shown | Content / media |
| C12 | No phone, email or address anywhere; Contact page has no map | Content |
| C13 | Very heavy videos (24 MB hero, 52 MB portrait) | Media |
| C14 | WPForms installed but unused; Salient Portfolio installed but unused; theme preset colors (cyan, gradients) unused | Config |

## D. Open questions for the client (needed before or during implementation)
1. **Rates:** the published rates say "Valid for bookings and stays from September to December 15, 2024." What are the current rates, and what date ranges define Low / High / Peak season?
2. **1 Bedroom Joglo:** maximum capacity? Is it bookable on its own and also as part of the 5-bedroom configuration?
3. **20% OFF First Stay:** is it still active? What are the terms, expiry and redemption method (code? mention in the inquiry?)
4. **Event pricing** (IDR 19,999,999 / 999,999 per hour; last updated 2025-09-01): still current?
5. **Contact form:** which inbox should receive inquiries? Should there be an auto-reply? Which fields are required?
6. Publish a **phone number, email and/or address**? Currently only WhatsApp +62 821-4798-1342.
7. **Testimonials:** where are they from (Airbnb/Google)? OK to show the names? Add a source link or rating?
8. **Copy corrections:** may we fix the typos in C8, or must the text stay verbatim?
9. **Surfing / VW Tours:** add content, or drop them from the activities list?
10. **Content editing after launch:** does the client need to update rates and promos themselves (implies a headless CMS), or is a developer-maintained static site acceptable?
11. **Instagram feed:** keep a live feed (needs a token/widget) or use a curated static gallery?
12. **Analytics:** keep Google tag `GT-P8RZGKRG`? Is there a Meta Pixel?
13. **Logo:** vector files available? Is the wordmark font known?
14. **Photography:** higher-resolution originals? Rights and credit for the MATANAI wedding photos? May the 25 currently unused library images be used?
15. **Search, comments, share buttons, category/author pages:** OK to drop?
16. **Site name:** "Omer Villas" (WP title and copyright) vs "Omer Villa & Retreat" (logo and copy). Which is canonical for SEO titles?
17. **Domain / email:** does omervilla.com host business email (MX) that must survive a DNS move?
