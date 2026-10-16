# 04 — Brand Identity: Typography, Color & Visual Language

Sources: `salient-dynamic-styles.css` (theme options compiled by Salient 17.0.2; saved in [evidence/](evidence/salient-dynamic-styles.css)), inline element styles in the page HTML, Google Fonts links, and visual inspection of the downloaded logo and photo files.
**[V]** = exact value read from CSS/HTML · **[E]** = estimate · **[I]** = inferred

---

## 1. Typography

### 1.1 Font families in use

| Role | Family | Weight / treatment | Status |
|---|---|---|---|
| Body text, nav links, bold, forms | **Georgia, serif** | 400; bold → 600 | [V] Georgia is a system font. **No webfont file is loaded** |
| H1–H5 | **Georgia, serif** | **300** (light; Georgia has no light cut, so browsers render it at regular 400) | [V] |
| H6 (eyebrow / kicker lines, e.g. "– Gallery & Rates –") | **Roboto** (Google Fonts) | **300**, `letter-spacing: 2px` | [V] |
| Search overlay input | **Open Sans** (Google Fonts, 300/400/600/700 loaded) | 700, uppercase, letter-spacing 1px | [V]. Open Sans also appears in some theme/plugin UI (buttons, form widgets) [I] |
| Footer/sidebar widget H4 | "Lovelo", sans-serif | 300 | [V] declared, **but no @font-face or file is loaded**, so it renders as the generic sans-serif fallback. Lovelo is effectively not part of the live brand |
| Logo wordmark "OMER / Villa & Retreat" | Raster image; the letterforms look like **Georgia** or a very close transitional serif (all-caps "OMER", title-case "Villa & Retreat") | — | [E] from visual inspection; the actual typeface is unconfirmed |

**Summary:** the live identity is a **Georgia serif** system (elegant, classic) with **Roboto Light, letter-spaced** eyebrows. Keep both in the rebuild. Georgia can stay a system font; Roboto 300 comes from Google Fonts or `next/font/google`. Open Sans is a theme default and not a deliberate brand choice [I]; confirm before dropping it.

### 1.2 Type scale

| Element | Desktop (>1300px) | 1000–1300px | 691–999px | ≤690px |
|---|---|---|---|---|
| Body | 14px / 26px | 14 / 26 | 14 / 26 | 14 / 26 | [V]
| H1 | 42px / 62px, wt 300 | 31.5 / 46.5 | 29.4 / 43.4 | 27.3 / 40.3 | [V]
| H2 | Salient Material default ≈ 34–36px [E] | 28.9 / 35.7 [V] | theme default [E] | theme default [E] |
| H3 | ≈ 22–24px [E] | | | |
| H4 | ≈ 18–20px [E] (used for prices, e.g. "IDR 6,500,000 /night") | | | |
| H5 | 16px / 26px | | | | [V]
| H6 | 14px / 24px, Roboto 300, letter-spacing 2px | | | | [V]

Some homepage post-grid titles use a custom fluid size class (`custom_font_size_1-8vw`, about 1.8vw) [V].

### 1.3 Text treatments
- Eyebrow pattern: an H6 wrapped in dashes, e.g. "– Celebrate Life's Moments –", "— Discover —", "— Welcome to Omer Villa & Retreat —". This is the signature typographic device. [V]
- Hero pattern on inner pages: big H1 plus a dashed H6 subtitle, white text over a photo. [V]
- Headings are light-weight, sentence case or title case, never all-caps. CTA buttons are ALL CAPS ("CONTACT US", "FIND US ON AIRBNB"). [V]
- Split-heading reveal animations (default, plus "twist-in" on the Contact page). [V]

---

## 2. Color palette

### 2.1 Theme tokens (verified)

| Token | Hex | Where it is used |
|---|---|---|
| **Accent / primary**: warm taupe-khaki | **`#9c8f74`** | Links, icon color, accordion & tab active states, header nav hover, map marker, buttons (accent), CTA band background, copyright bar background, input focus border, `rgba(156,143,116,0.3)` underline highlights |
| **Extra color 1**: cream / sand | **`#f2ecde`** | Footer background, off-canvas tints |
| Extra color 2: cyan | `#2AC4EA` | Theme preset; **not visibly used** on any audited page [I] |
| Extra color 3: charcoal | `#333333` | Theme preset; default dark text tone |
| Background | `#ffffff` | Page background, solid header background |
| Footer text | `#0a0a0a` | Footer links and text |
| Footer widget headings | `#777777` | |
| Header text over hero | `#ffffff` at 75% opacity, 100% on hover | |
| Header text, solid header | `#444444` at 75% opacity (dark-text state) [V] | |
| Copyright bar | bg `#9c8f74`, text `#ffffff` | |
| Off-canvas backdrop | `rgba(0,0,0,0.8)` | |
| Theme gradients (`#ff1053→#3452ff`, `#32d6ff→#2AC4EA`) | — | Salient presets, **unused** [I]. Do not adopt |

### 2.2 Element-level colors (from inline styles)

| Element | Value |
|---|---|
| "FIND US ON AIRBNB" button | bg **`#ff7575`** (coral, an Airbnb-ish pink), white text, white arrow icon |
| "CONTACT US" button | transparent, 2px border `#ffffff`, text `#ffffff`; hover: white fill, text `#000000` |
| WhatsApp floating button | `#25D366` (WhatsApp brand green) |
| Pre-footer CTA band | `#9c8f74` |
| Contact form section | `#ffffff` |
| Post-grid hover indicator | bg `#000`, text `#fff`, "Read" |
| Body text | theme default ≈ `#676767`–`#333` [E]; not set explicitly in the theme options |

### 2.3 Suggested design tokens for the rebuild (naming only; values are unchanged)
```
--omer-accent:      #9c8f74   /* primary brand: taupe */
--omer-sand:        #f2ecde   /* secondary: cream */
--omer-ink:         #0a0a0a
--omer-charcoal:    #333333
--omer-muted:       #777777
--omer-white:       #ffffff
--omer-airbnb:      #ff7575   /* Airbnb CTA only */
--omer-whatsapp:    #25D366   /* WhatsApp CTA only */
```
Accessibility note: white text on `#9c8f74` has a contrast ratio of about 3.2:1 [E]. That passes for large text only, not body text. Keep body text dark on cream or white, or use the accent for large headings and buttons only. Get a decision before darkening the token.

---

## 3. Brand elements

| Element | Observation |
|---|---|
| **Logo** | Mark: a stylised **lotus** (5 leaves) cradling a **figure with arms raised overhead, hands joined in prayer** (yoga/meditation pose); the hands form a flame or bud tip. Wordmark: "OMER" in serif caps over "Villa & Retreat" in title-case serif. Single color, supplied in black and in white. Two lockups exist: stacked square (990×990) and horizontal (813×250, footer). Raster PNG only. [V visual] |
| **Logo usage** | White logo on the transparent header over the hero; black logo once the header turns solid on scroll; horizontal black lockup in the footer on cream. Header logo is 80px tall (70px mobile) and shrinks on scroll. [V] |
| **Icons** | Generic outline/solid icon fonts (Font Awesome 4, Steadysets, Linecons) in the accent color, about 20–25px padding. Social icons are small raster PNGs. No custom icon set. [V] |
| **Image treatment** | Bright, natural, warm, high-saturation photography with **no filters, duotones or overlays** apart from Salient's default dark overlay on hero rows. Recurring subjects: dark-timber **Javanese joglo** roofs, white arched lime-plaster walls, a turquoise pool against rice fields, bougainvillea, yoga, breakfast plates, families in the pool, Balinese ritual and offerings, and wedding photography (MATANAI series). Quality is mixed: professional shoots (MATANAI, `omer-*` yoga, DSCF family series) sit alongside phone photos (`IMG_*`). [V visual] |
| **Corners** | Theme border radius 4px; slightly rounded buttons with shadow (`slightly_rounded_shadow`); promotion cards 10px radius; post grid square corners. [V] |
| **Shadows** | Large header shadow on scroll; "x_large_depth" shadow on the Discover image; button hover shadows. [V] |
| **Borders** | Theme border thickness 2px; header bottom border hidden. [V] |
| **Decorative motifs** | Dash-wrapped eyebrow titles; thin divider lines (`divider-wrap`); curly-quote glyphs on testimonials and the pull-quote. No patterns or textures. [V] |
| **Motion** | Background fade-in, parallax heroes, fade-in-from-left images, staggered list reveal, split-heading reveals, autoplay carousels (4s), testimonial rotation (9s), hover zoom on cards. [V] |
| **Tone / personality** | Calm, warm, earthy, spiritual-wellness, family-friendly, "luxury in harmony with nature". Key words used in the copy: *gather, unwind, reconnect, nature, serene, soulful sanctuary, eco-conscious, Balinese traditions*. Instagram uses "Nature, Gather, Reconnect, Unwind. 🤍". [V] |

**Brand essence to preserve:** taupe `#9c8f74` + cream `#f2ecde` + white; a Georgia serif voice with letter-spaced Roboto Light eyebrows; the lotus/yogi mark; sunlit, natural Bali photography; a quiet, unhurried tone.
