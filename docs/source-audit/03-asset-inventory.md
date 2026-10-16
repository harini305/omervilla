# 03 — Asset Inventory & Page Mapping

- **Full per-file table:** [asset-inventory.csv](asset-inventory.csv) (119 rows). Columns: WP media id, file, local path, MIME type, dimensions, bytes, WP parent post, alt text, pages using it, source URL.
- **Local copies:** the whole WordPress media library was downloaded at original resolution into [`/source-assets/uploads/`](../../source-assets/uploads/), mirroring the WP `YYYY/MM/` paths. Files were only downloaded; none were renamed, edited or re-encoded.
- **Source:** WP REST `/wp-json/wp/v2/media` (119 items, ~103 MB total; the 2 videos are ~77 MB of that).
- **Pre-existing workspace assets:** none. `D:\omervilla` was empty before this audit.
- All 119 files downloaded (101.8 MB). "Original" means the largest file the server currently holds. Most photos top out at **1280px** on the long edge; logos are 990px; `omer-*.jpg` are 1500px; `MATANAI_MNR_111506-copy.jpg` is 1600×2400. Higher-resolution masters do **not** exist on the server (see 06-gaps).
- ⚠ **WordPress metadata is stale.** 117 of 119 files differ in byte size from the size recorded in WordPress, because a server-side optimizer recompressed them after upload. Three images were also **downscaled**: `Omer-Villa-front-joglo-night.jpg` and `Omer-Villa-front-joglo.jpg` are 1600×1200 (WP says 2400×1800), and `pray4.jpg` is 1600×402 (WP says 1891×475). The CSV records both the real local values (`local_*`) and the WP values (`wp_meta_*`). Dimensions quoted elsewhere in these docs come from WP metadata unless stated; always treat `local_*` as the truth.

---

## 1. Brand marks

| File | Size | Use |
|---|---|---|
| `2024/09/Omer-Logo-clear-black.png` | 990×990 PNG, transparent | Header logo on solid (scrolled) header and mobile |
| `2024/09/Omer-Logo-clear-white.png` | 990×990 PNG, transparent | Header logo while transparent over hero |
| `2024/10/Omer-Logo-Footer.png` | 813×250 PNG | Footer logo (horizontal lockup) |
| `2024/10/Ig-icon.png` | 148×149 PNG | Footer Instagram icon (raster) |
| `2024/10/facebook-icon.png` | 148×148 PNG | Footer Facebook icon (raster) |

No SVG logo and no favicon exist on the site.

## 2. Video

| File | Spec | Page / section |
|---|---|---|
| `2024/09/Short.mp4` | 1920×1080 landscape, 24.2 MB | Home hero background (autoplay, muted loop) |
| `2024/10/Omer.mp4` | 1080×1920 **portrait**, 52.5 MB | Cultural & Spiritual Activities: main content video |

Both are large. Plan to compress or transcode them during implementation, without changing the footage.

## 3. Page → asset mapping

### Home `/`
| Section | Asset(s) |
|---|---|
| Hero | `2024/09/Short.mp4` + poster/bg `2024/09/Omer-Villa-front-joglo-night.jpg` (2400×1800) |
| Feature grid cards | Rooms → `2024/10/Omer-Bedrooms-1.jpg` · Event → `2024/10/MATANAI_MNR_110931.jpg` · Food → `2024/10/DSC03429.jpg` · Yoga → `2024/10/omer-11.jpg` · Cultural → `2024/10/Omer-Spiritual-Activities-3.jpg` · Family → `2024/10/DSCF8625-2.jpg` (these are the posts' featured images) |
| Discover | `2024/10/omer-28.jpg` (1010×1500 portrait) |
| Instagram feed | Remote images from Instagram via plugin. **Not stored in WP; not downloaded** |
| Promotion card | `2024/10/IMG_4276.jpeg` (1280×1280) |

### Rooms & Rates `/rooms-rates`
| Section | Asset(s) |
|---|---|
| Post header + hero | `2024/10/Omer-Bedrooms-1.jpg` |
| Villa gallery carousel + 2–5 bedroom rates carousel | `2024/10/Omer-Villa-and-Retreat{22,16,15,17,18,19,20,21,10,9,4,1,2,3,8,5,6,7,11,12,13,14}.jpg` (22 photos, all 1280×960; this is the order shown) |
| 1 Bedroom Joglo carousel | `2024/10/Omer-Villa-Joglo{11,10,1,12,6,7,8,9,5,4,3,2}.jpg` (12 photos) |
| Feature icons | Font Awesome 4: `fa-bed`, `fa-tint`, `fa-pagelines` |

### Event & Venue `/event-venue`
| Section | Asset(s) |
|---|---|
| Post header | `2024/10/MATANAI_MNR_110931.jpg` |
| Hero row bg | `2024/09/MATANAI_MNR_111509-e1727740449225.jpg` (WP-cropped 1280×834) |
| Wedding carousel (23, in order) | `2024/10/c8648cd6-3f85-433e-a779-ada3e6ba9e2e.jpg`, `MATANAI_MNR_109969`, `_110931`, `_111124`, `_112230`, `_113230`, `_115084`, `_109944`, `_109979`, `_111641`, `_111984`, `_112097`, `_112599`, `_112708`, `_112786`, `_113140`, `_113442`, `_113446`, `_113494`, `_113641`, `_115907` (all `2024/10/…jpg`) |

"MATANAI_MNR" files appear to come from a photographer's wedding shoot. Image rights and credit need confirming (06-gaps).

### Food & Beverage `/food-beverage`
Header/hero `2024/10/DSC03429.jpg`. Carousel (13): `2024/10/IMG_8409-copy.jpg`, `DSC03429.jpg`, `Omer-Food1…7.jpg`, `2024/09/DSCF7459.jpg`, `2024/10/IMG_8465.jpg`, `IMG_8452.jpg`, `MATANAI_MNR_113122.jpg`.

### Yoga & Wellness `/yoga-wellness`
Post header `2024/10/omer-11.jpg`; hero bg `2024/10/omer-5.jpg`. Carousel (7): `omer-3`, `omer-4`, `omer-5`, `omer-07`, `omer-11`, `omer-13`, `omer-28` (all `2024/10/`, up to 1500px).

### Cultural & Spiritual Activities `/cultural-spiritual-activities`
Post header `2024/10/Omer-Spiritual-Activities-3.jpg`; hero bg `2024/10/pray4.jpg` (1891×475 panoramic strip); video `2024/10/Omer.mp4`.
Also attached to this post in WP but **not shown**: `pray2.jpg`, `pray3.jpg`.

### Family & Groups `/family-groups`
Header/hero `2024/10/DSCF8625-2.jpg`. Carousel (6): `2024/10/DSCF8526.jpg`, `DSCF8577.jpg`, `2024/09/IMG_9386-copy.jpg`, `2024/10/DSCF8625-2.jpg`, `IMG_8959-copy.jpg` (alt "Omer Pool fence"), `DSCF8552.jpg`.
Also attached but not shown: `Omer-Kids-Safety.jpg`, `IMG_9218.jpeg`.

### 20% OFF First Stay `/20-off-first-stay`
Post header + content image `2024/10/IMG_4276.jpeg`; hero bg `2024/10/omer-28.jpg`.

### Contact Us `/contact-us`
Hero bg `2024/10/Omer-Villa-and-Retreat17.jpg`; testimonials bg `2024/10/DSCF8577.jpg`.

### Shared (every page)
Header logos (black/white), footer logo, IG/FB icons, `IMG_4276.jpeg` (footer "Omer Specials" thumbnail).

## 4. Media library files not used on any live page (25)

These are in the library and downloaded locally, but no audited page renders them. They are useful as **extra original photography** for the redesign, subject to client approval:

`2024/09/`: `IMG_0937.jpg`, `IMG_0937b.jpg`, `IMG_0938.jpg`, `IMG_8959-e1727698030505.jpg`, `IMG_8961.jpg`, `MATANAI_MNR_111506-copy.jpg` (1600×2400, attached to Home), `MATANAI_MNR_111896.jpg`, `MATANAI_MNR_111984.jpg`, `MATANAI_MNR_113446.jpg`, `MATANAI_MNR_114913.jpg`, `Omer-Villa-front-joglo.jpg` (2400×1800 **daytime** version of the hero, attached to Home)
`2024/10/`: `1bfeab55-84ba-4588-a6b9-cd3e38e55482.jpg`, `IMG_8776-2-copy.jpg`, `IMG_9218.jpeg`, `MATANAI_MNR_110959.jpg`, `MATANAI_MNR_110964.jpg`, `MATANAI_MNR_110971.jpg`, `MATANAI_MNR_111038.jpg`, `Omer-Bedrooms-e1727740467447.jpg` (WP crop of Omer-Bedrooms), `Omer-Kids-Safety.jpg`, `Omer-Promo.jpeg` (1080×1350 promo artwork, probably the original 20%-off creative), `Omer-Spiritual-Activities-2.jpg`, `Omer-Yoga-Shala.jpg`, `pray2.jpg`, `pray3.jpg`

Some files duplicate each other: `2024/09/MATANAI_MNR_111984|113446` = the `2024/10/` copies (same byte size); `-e17277…` files are WordPress edit-crops of other images.

## 5. Icons & fonts delivered by the theme (not in media library)

| Asset | Source | Used for |
|---|---|---|
| Font Awesome 4.7 | `salient/css/font-awesome.min.css` | `fa-bed`, `fa-tint`, `fa-pagelines`, `fa-instagram` |
| Steadysets icon font | Salient | `steadysets-icon-heart` (Discover), `steadysets-icon-map` (Location) |
| Linecons (VC) | WPBakery | `vc_li-tag` (Promotion) |
| Salient `icon-button-arrow` | Salient | Airbnb button arrow |
| Google Fonts: Open Sans 300/400/600/700, Roboto 300 | fonts.googleapis.com | See 04-brand |
| Georgia | System font, no file | Body + headings |
| "Lovelo" | **Referenced in CSS but no font file is loaded** | Falls back to sans-serif |

All of these are generic library icons, not brand assets. The rebuild may use equivalent icons (for example a modern icon set with the same glyph meanings) without breaking brand identity.

## 6. Not available / not captured
- Instagram feed images: live, third-party content. The rebuild must embed or fetch the feed.
- Favicon / app icons: never set up.
- Vector (SVG/AI/EPS) logo: not on the server. Ask the client.
- Brand guidelines document: none found.
