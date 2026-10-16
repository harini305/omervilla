# 01 — Page & Route Inventory (omervilla.com)

Audit date: 2026-10-15. Source: live site, WordPress sitemap (`/wp-sitemap.xml`), WP REST API (`/wp-json/wp/v2/pages|posts|media`), and rendered HTML snapshots in [evidence/html/](evidence/html/).

Legend: **[V]** verified from HTML/REST · **[I]** inferred from theme settings / class names (not visually confirmed) · **[?]** unknown

---

## 1. Route table

| # | Route | WP type | Title tag | Linked from | Status |
|---|---|---|---|---|---|
| 1 | `/` | Page (id 7, slug `omer-villa-bali`, set as front page) | `Omer Villas` | Logo, main nav "Home" | 200 [V] |
| 2 | `/rooms-rates` | Post (id 93, cat Feature) | `Rooms & Rates – Omer Villas` | Main nav, footer "Rates", home grid | 200 [V] |
| 3 | `/event-venue` | Post (id 80, cat Feature) | `Event & Venue – Omer Villas` | Main nav, footer "Venue", home grid | 200 [V] |
| 4 | `/food-beverage` | Post (id 91, cat Feature) | `Food & Beverage – Omer Villas` | Home grid; footer "Dining" (via redirect, see below) | 200 [V] |
| 5 | `/yoga-wellness` | Post (id 85, cat Feature) | `Yoga & Wellness – Omer Villas` | Footer "Wellness", home grid | 200 [V] |
| 6 | `/cultural-spiritual-activities` | Post (id 88, cat Feature) | `Cultural & Spiritual Activities – Omer Villas` | Footer "Experience", home grid | 200 [V] |
| 7 | `/family-groups` | Post (id 82, cat Feature) | `Family & Groups – Omer Villas` | Footer, home grid | 200 [V] |
| 8 | `/20-off-first-stay` | Post (id 312, cat Promo) | `20% OFF First Stay – Omer Villas` | Home "Promotion", footer "Omer Specials" | 200 [V] |
| 9 | `/contact-us` | Page (id 302) | `Contact Us – Omer Villas` | Main nav, footer, CTA band on every page | 200 [V] |
| 10 | `/#location` | Anchor on home | — | Footer "Location" | anchor exists (`id="location"`) [V] |
| 11 | `/category/feature` | Category archive | `Feature – Omer Villas` | Category labels on cards | 200 [V] — system page |
| 12 | `/category/promo` | Category archive | `Promo – Omer Villas` | Category labels on cards | 200 [V] — system page |
| 13 | `/author/nsurya-wijaya` | Author archive | — | Post header byline | 200 [V] — system page |
| 14 | `/?s={query}` | Search results | `Results For "…"` | Header search overlay | 200, works [V] |
| 15 | any unknown path | 404 template | `Page not found – Omer Villas` | — | 404 with "Back Home" button [V] |

**Probed, do not exist (404):** `/about`, `/about-us`, `/gallery`, `/booking`, `/blog`.

**Redirect:** the footer "Dining" link points to `http://omervilla.com/food/`, which redirects to `/food-beverage` through WordPress's slug guessing. It is not a real route. Footer links also use `http://` with trailing slashes, while canonical URLs use `https://` without them.

**Important structural note:** six of the seven content "pages" are WordPress **posts**, not pages. Each post has a category label, an author byline (`nsurya.wijaya`), a "No Comments" link and share buttons. These are blog-post leftovers that read as accidental on a villa site. Treat each post as a normal content page in the rebuild.

### Navigation sets
- **Main nav (desktop header + mobile off-canvas):** Home · Rooms & Rates · Event & Venue · Contact Us. No dropdowns. [V]
- **Footer quick links:** Rates · Venue · Wellness · Location · Dining · Experience · Family & Groups · Contact Us. [V]
- **Feature hub:** the home page post grid links to all six feature posts. Food & Beverage, Yoga & Wellness, Cultural & Spiritual Activities and Family & Groups are **not in the main nav**.

---

## 2. Shared components (appear on every page)

| Component | Contents | Notes |
|---|---|---|
| **Header** | Logo (black/white PNG swap), nav (4 items), search icon. Mobile: search + hamburger | Transparent over hero, turns solid white on scroll with a large shadow. Logo is 80px tall on desktop and 70px on mobile; it shrinks on scroll (`data-header-resize=1`, shrink 6). Animated-underline hover. Breakpoint **1000px**. [V settings] |
| **Search overlay** | Full-width input, placeholder "Search", close button | Material style, slides down. [V] |
| **Off-canvas mobile menu** | Slides in from right; same 4 links; "Close Menu" | `slide-out-from-right`; backdrop `rgba(0,0,0,0.8)`. [V] |
| **Pre-footer CTA band** | H3 "Send your inquiry. We are happy to assist you." + buttons **CONTACT US** (outline white) and **FIND US ON AIRBNB** (filled `#ff7575`, arrow icon) | Accent-colored (`#9c8f74`) full-width row. Present on all pages except Contact Us and the 404. [V] |
| **Footer** | Footer logo (`Omer-Logo-Footer.png`), 8 quick links, "Keep close with Omer" + Instagram/Facebook image icons, "Omer Specials" recent-promo widget (thumbnail + "20% OFF First Stay" excerpt), copyright bar | Footer bg `#f2ecde`, text `#0a0a0a`; copyright bar bg `#9c8f74`, white text. [V] |
| **Copyright** | `© 2026 Omer Villas. A website by SuryaNirmala` (link → http://suryanirmala.com) | Year appears auto-generated. [V] |
| **WhatsApp floating button** | Fixed bottom-right (15px/15px), green `#25D366`, number **+62 821-4798-1342** | "Click to Chat" plugin; opens in new tab; fires GA/GTM/FB events. [V] |
| **Back-to-top button** | Rounded, `rgba(0,0,0,0.25)` | Salient default. [I] |
| **Feature post layout** | 550px Salient post header (featured image, category pill, H1, byline, "No Comments") → full-width WPBakery hero (H1 + H6 subtitle) → content → share bar (Facebook/Twitter/LinkedIn/Pinterest) → CTA band → footer | **The title is repeated twice** (post header, then hero row). [V] |

---

## 3. Page-by-page section inventory

### 3.1 Home `/`
| # | Section | Content summary | Assets | Components / interaction |
|---|---|---|---|---|
| 1 | **Hero** (full-viewport, content-bottom, parallax) | No text, only background media | Video `2024/09/Short.mp4` (1920×1080, 24 MB); fallback/poster image `2024/09/Omer-Villa-front-joglo-night.jpg` | Background video + parallax (fast) + fade-in; overlay enabled; header text is light over the hero |
| 2 | **Welcome intro** | H6 "– Welcome to Omer Villa & Retreat –" / H2 "Gather with loved ones, unwind, reconnect with yourself and nature." / 1 paragraph | — | Centered text block |
| 3 | **Feature post grid** | Six cards: Rooms & Rates, Event & Venue, Food & Beverage, Yoga & Wellness, Cultural & Spiritual Activities, Family & Groups. Each card shows a "Feature" label and the title | Post featured images (see 03-asset-inventory) | `nectar-post-grid`: 4-column **masonry**, zoom on hover, "Read" see-through cursor indicator |
| 4 | **Discover** | H5 "Discover" / H2 "Omer Villa and Retreat" / paragraph / H5 "What you can do while stay at Omer" / two lists (6 items) / pull-quote | `2024/10/omer-28.jpg` (portrait, x-large shadow, fade in from left); heart icon | Fancy unordered list (animated, 500ms delay) |
| 5 | **Location** (`#location`) | H2 "Location" + 4 paragraphs | Map icon | **Leaflet map** (500px tall), centered on lat −8.6011391, lng 115.1608734, zoom 13, accent-colored marker, info window "Omer Villa & Retreat" open by default |
| 6 | **Keep connected with Omer** | H2 + Instagram feed (4 latest posts, 4 columns) + "Load More" + "Follow on Instagram" | Live from Instagram (not stored locally) | Smash Balloon Instagram Feed; lightbox |
| 7 | **Promotion** | H2 "Promotion" + one card "20% OFF First Stay" with a "Promo" button-style label | `2024/10/IMG_4276.jpeg` | Post grid as a Flickity carousel: 3 columns, 50vh height, 10px radius, text bottom-left on shadow, animated underline + zoom |
| 8 | CTA band + footer | shared | | |

### 3.2 Rooms & Rates `/rooms-rates`
| # | Section | Content | Assets | Components |
|---|---|---|---|---|
| 0 | Post header (550px) | "Feature" · H1 "Rooms & Rates" · byline | `Omer-Bedrooms-1.jpg` | |
| 1 | Hero row | H1 "Rooms" / H6 "– Gallery & Rates –" | `Omer-Bedrooms-1.jpg` | |
| 2 | Discover intro | H6 "— Discover —" / H2 "Omer Villa and Retreat" / paragraph (same as home) | — | Split heading |
| 3 | **Villa gallery carousel** | 22 photos, each linking to the full-size image | `Omer-Villa-and-Retreat1…22.jpg` (600×400 thumbnails) | Flickity: autoplay 4s, free scroll, drag; lightbox (fancybox) |
| 4 | **Features** (3 columns) | 5 Bedrooms · Private Pool · Open-Air Living Spaces (title + text each) | Font Awesome icons `fa-bed`, `fa-tint`, `fa-pagelines` (accent color) | Icon + text |
| 5 | **Rates: whole villa** | H2 "Rates" + **accordion** with 4 items (5, 4, 3, 2 Bedroom). Each item has Low/High/Peak season prices and maximum capacity. Footnote with terms | Carousel of the same 22 villa photos (1024×768) | Minimal-style toggles + Flickity (autoplay 4s, touch_total controls) |
| 6 | **Rates: 1 Bedroom Joglo** | H2 + 3 season prices + footnote | `Omer-Villa-Joglo1…12.jpg` carousel | Flickity |
| 7 | Share bar, CTA, footer | | | |

### 3.3 Event & Venue `/event-venue`
| # | Section | Content | Assets |
|---|---|---|---|
| 0 | Post header | H1 "Event & Venue" | `MATANAI_MNR_110931.jpg` |
| 1 | Hero row | H1 "Event & Venue" / H6 "– Celebrate Life's Moments –" | `2024/09/MATANAI_MNR_111509-e1727740449225.jpg` |
| 2 | Intro + pricing | H2, H6 tagline, 2 paragraphs, two price blocks (Event/Party/Retreat/Gathering; Venue Rental for Photoshoot) with footnotes | — |
| 3 | Wedding photo carousel | 23 images, lightbox | `c8648cd6-…jpg`, `MATANAI_MNR_*.jpg` (see CSV) |
| 4 | **Comment form** "Leave a Reply" (comment, name, email, website, save-cookie checkbox) | Comments are **open** on this post only | — |
| 5 | Share bar, CTA, footer | | |

### 3.4 Food & Beverage `/food-beverage`
Post header (`DSC03429.jpg`) → Hero H1 "Food & Beverage" / H6 "– Fresh, Local, and Flavorful –" (`DSC03429.jpg`) → H2 + H6 tagline + 2 paragraphs → image carousel of 13 photos (`IMG_8409-copy`, `DSC03429`, `Omer-Food1…7`, `2024/09/DSCF7459`, `IMG_8465`, `IMG_8452`, `MATANAI_MNR_113122`) → share/CTA/footer.

### 3.5 Yoga & Wellness `/yoga-wellness`
Post header (`omer-11.jpg`) → Hero H1 "Yoga & Wellness" / H6 "– Revitalize Your Spirit –" (`omer-5.jpg`) → H2 + H6 tagline + 2 paragraphs → carousel of 7 photos (`omer-3, -4, -5, -07, -11, -13, -28`) → share/CTA/footer.

### 3.6 Cultural & Spiritual Activities `/cultural-spiritual-activities`
Post header (`Omer-Spiritual-Activities-3.jpg`) → Hero H1 "Cultural & Spiritual" / H6 "– Activities –" (`pray4.jpg`, 1891×475 banner) → section `#about` with **portrait video** `2024/10/Omer.mp4` (1080×1920, 52.5 MB) beside H2 + 1 paragraph → share/CTA/footer. **This is the thinnest page: one paragraph, no gallery.**

### 3.7 Family & Groups `/family-groups`
Post header (`DSCF8625-2.jpg`) → Hero H1 "Family & Groups" / H6 "– Create Unforgettable Memories –" (`DSCF8625-2.jpg`) → H2 + H6 tagline + 3 paragraphs → carousel of 6 photos (`DSCF8526`, `DSCF8577`, `2024/09/IMG_9386-copy`, `DSCF8625-2`, `IMG_8959-copy` [alt "Omer Pool fence"], `DSCF8552`) → share/CTA/footer.

### 3.8 20% OFF First Stay `/20-off-first-stay`
Post header (category "Promo", `IMG_4276.jpeg`) → Hero H1 "20% OFF" / H6 "– First Stay –" (`omer-28.jpg`) → `#about` row with image `IMG_4276.jpeg` + H2 "Get 20% off your first stay at OMER Villa & Retreat!" + 1 sentence → share/CTA/footer. **There is no booking link, promo code, terms or expiry on the page.**

### 3.9 Contact Us `/contact-us`
| # | Section | Content | Assets / components |
|---|---|---|---|
| 1 | Hero (top-level row) | H1 "Contact Us" / H6 "– We are happy to assist you –" | `Omer-Villa-and-Retreat17.jpg` |
| 2 | Inquiry form | H2 "We love to hear from you" / H5 "Send us your inquiry." + **Forminator form #301** (fields in 05-functionality) | Split heading with "twist-in" animation |
| 3 | **Testimonials** | 4 guest quotes with names | Background `DSCF8577.jpg`; minimal testimonial slider, auto-rotates every 9s |
| 4 | Footer (no CTA band) | | |

**No phone number, email address, street address or map appears on the Contact page.** The only direct channels are the form, WhatsApp, Airbnb, Instagram and Facebook.

### 3.10 System pages (rebuild optional)
- **Category archives** (`/category/feature`, `/category/promo`): title header, post cards, sidebar with Search, Recent Posts and an empty Recent Comments widget.
- **Search results**: lists matching pages and posts, labelled "Page" or "Blog Post".
- **404**: H1 "404", H2 "Page Not Found", button "Back Home".

---

## 4. Responsive observations
No real-browser screenshots were taken in this audit (see 06-gaps). The points below come from theme settings and markup. **[I]**
- Header breakpoint is 1000px. Below it, the nav collapses into a hamburger and an off-canvas panel from the right; the mobile header stays fixed (`data-mobile-fixed=1`) with a 70px logo.
- Container side padding is 90px on desktop (`--container-padding:90px`).
- Salient's responsive breakpoints are 1300 / 999 / 690px. H1 scales 42px → 31.5px → 29.4px → 27.3px; H2 drops to 28.9px at 1000–1300px; body stays 14px/26px at every size.
- Columns stack at ≤690px (WPBakery `vc_col-sm-*`). Two `vc_col-xs-*` columns keep side-by-side layout on phones, likely the lists in the home "Discover" section. Some rows reset left/right padding to 0 on phones (`left_padding_phone_0px`).
- Carousels (Flickity) support touch drag. The masonry post grid reflows to fewer columns.
- The hero video plays on mobile too (no mobile poster override found). The 24 MB and 52 MB videos are heavy on mobile data.
- The mobile user agent receives identical HTML, so responsiveness is pure CSS. [V]
