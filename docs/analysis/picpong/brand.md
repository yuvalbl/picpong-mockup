# Picpong (פיקפונג) — Brand Identity Extraction

Source: https://www.picpong.biz (Hebrew root `/`, RTL `he-IL`) and `/en` (→ `/en/picpong/`).
**Platform: WordPress 5.9** on the **"Definity" theme** (`definity` + `definity-child`), built with WPBakery Page Builder and Slider Revolution. Brand colors below come from the theme's **inline dynamic-css** (the authoritative token source — it sets button, selection, and font), cross-checked against the actual logo + favicon image files (downloaded and visually inspected).

Site title: `דפוס דיגיטלי פיק פונג - בגדול מדפיסים על הכל! | Picpong` ("Digital print Picpong — we print on everything in a big way").

---

## 1. Logo

| Asset | URL | Format | Loads? |
|-------|-----|--------|--------|
| **Header logo** (primary) | `https://www.picpong.biz/wp-content/uploads/2018/12/PP_Logo.png` | PNG 280×70, RGBA transparent | Yes (200) |
| **Footer logo** (mascot only) | `https://www.picpong.biz/wp-content/uploads/2018/03/logo-n.png` | PNG 137×93, RGBA transparent | Yes (200) |
| **Favicon 32×32** | `https://www.picpong.biz/wp-content/uploads/2018/03/logo-favicon-100x100.jpg` | JPG | Yes (200) |
| **Favicon 192 / apple-touch / MS tile** | `https://www.picpong.biz/wp-content/uploads/2018/03/logo-favicon.jpg` | JPG 137×137 | Yes (200) |

Header logo markup:
```html
<a href="https://www.picpong.biz/" class="d-nav-logo">
  <img src="https://www.picpong.biz/wp-content/uploads/2018/12/PP_Logo.png" alt="www.picpong.biz">
</a>
```

**Logomark description (verified by inspecting the actual image files):**
- The logo is a **character mascot, not a wordmark**: a glossy **3D-rendered cartoon pufferfish / blowfish** (the spiky "balloon" fish).
- **Colors:** bright **orange** body with darker orange spikes/fins, large friendly **blue eyes** (cyan-blue iris ~`#2A9BD0` with white highlights), a small open smiling mouth. Pixar-style shaded 3D render with soft highlights and a drop shadow.
- The **header logo** (PP_Logo.png) places the mascot on the left, facing right (into the RTL Hebrew text), with the **Hebrew tagline "בגדול מדפיסים על הכל!"** ("We print on everything, in a big way!") set beside it in the **brand orange**. No "picpong" Latin wordmark in the header image itself — the mark is mascot + Hebrew tagline.
- The **footer logo** (logo-n.png) and **favicon** are the same pufferfish mascot isolated (favicon on a flat dark-gray ground).
- Style: playful, friendly, cartoonish, kid-friendly — explicitly NOT corporate/minimal. The puffer fish is the brand's whole personality.
- **No vector/SVG version exists** — mascot is a raster 3D render only. Header/footer PNGs have transparency; favicon is a flattened JPG on gray.

---

## 2. Color Palette

From the theme's inline `dynamic-css` (real brand tokens) plus the mascot artwork. **Orange is unambiguously the brand color** — it is the mascot body, the button background, AND the text-selection highlight.

| Role | HEX | Source / where used |
|------|-----|---------------------|
| **Primary brand — orange** | `#e67a2f` | **Button background** (`.btn,a.btn,input[type=submit].btn{background:#e67a2f}`) and **text-selection** (`::selection{background:#e67a2f}`). The core action color; matches the mascot body. |
| Brand orange — hover | `rgba(230,122,47,0.7)` | Button `:hover` (70% of `#e67a2f`). |
| Brand orange — bright variant | `#f58729` | Brighter orange used in accents/headings (3× in CSS); close to the mascot's lit highlights. |
| Brand orange — deep variant | `#E45C01` / `#BC0C06` | Darker orange / red-orange (spikes, gradients, emphasis). |
| **Mascot accent — blue** | `~#2A9BD0` (eyes) | Cyan-blue of the pufferfish eyes — the only secondary color in the actual artwork. A natural complementary accent. |
| **Text — near-black** | `#111111` | Headings / link-hover (`.bpt-title-color`, breadcrumb hover). |
| Text — body gray | `#777777` | Subheadings, breadcrumbs, muted copy. |
| Text — light gray | `#999999` | De-emphasized / current item. |
| **Background — white** | `#ffffff` | Dominant canvas + overlay text (used 13×). |
| Background — off-white | `#f8f8f8` / `#ececec` | Section/panel fills. |
| Dark overlay | `rgba(0,0,0,0.3–0.7)` | Nav bar + hero-photo scrims (`.d-nav-c-style`). |

Ignore — these are stock Gutenberg block-palette defaults, NOT Picpong brand: `#ff6900`, `#fcb900`, `#7bdcb5`, `#00d084`, `#8ed1fc`, `#0693e3`, `#9b51e0`, `#cf2e2e`, `#f78da7`, `#abb8c3`, `#a2d729`, `#26ffe6`.

**Net story:** warm **orange (`#e67a2f`)** as the one true brand color (mascot + buttons + selection), an incidental **blue** from the mascot's eyes as a possible secondary, on **white** with **near-black/gray** text and **dark scrims** over photography.

---

## 3. Existing Fonts

Web-font links in `<head>` (all Google Fonts):
- `Montserrat:400,500,600,700` + `Open Sans:300,400,600,700,800` (theme default enqueue).
- `Assistant:400` and `Assistant:400,700` (theme/Redux options).
- Combined link: `Open Sans:800,300 | Arimo:400,300 | Assistant:400,700 | Montserrat:700`.

Actual `font-family` rules in the dynamic CSS (what really renders):
- **Body:** `font-family: Assistant; font-weight: normal;`
- **Headings h1–h6 + `.h-alt`:** `font-family: Assistant;`
- **Nav items, footer widget titles, copyright:** `font-family: Assistant;`

In practice the site runs almost entirely on **Assistant** (Google's Hebrew+Latin sans, strong for RTL Hebrew). Montserrat/Open Sans/Arimo are enqueued but largely overridden. **No distinct heading face** — headings and body are both Assistant, separated only by size/weight.

Icon fonts (UI glyphs, not brand type): Font Awesome, Linea, ET-Lineicons, Cryptocoins, Dashicons.

---

## 4. Other Brand Elements

- **Favicon / app icons:** the pufferfish mascot as JPG (see §1), wired at 32 / 192 / apple-touch / MS-tile sizes.
- **Open Graph:** `og:title`, `og:description`, `og:locale he_IL` (+ alt `en_US`), `og:url`, `og:site_name=www.picpong.biz`, `twitter:card=summary_large_image`. **No `og:image`** is set in the HTML — a gap to fix in the redesign (good place for the mascot or a product shot).
- **Mascot as brand device:** the pufferfish is the central brand element — appears in header, footer, and favicon. It embodies the "puff up big / print big" idea tied to the tagline "בגדול מדפיסים על הכל".
- **Photography style:** real product/event photos (branded merch, signage, print jobs) as full-bleed section backgrounds with dark translucent scrims and white overlaid text.
- **Client logos** as social proof (Microsoft, Clalit, HOT, Electra, Brinks, Mifold, Instagram) — not Picpong assets, ignore for identity.
- **No pattern system, no custom line-icon set** beyond the generic theme icon fonts.

---

## 5. Brand Summary

Picpong's current identity is a **2018-era WordPress "Definity" theme** centered on one strong, ownable, and genuinely distinctive asset: a **glossy 3D cartoon orange pufferfish mascot** with big blue eyes, paired with the Hebrew tagline "בגדול מדפיסים על הכל!" ("we print on everything, big"). The single brand color is a **warm orange (`#e67a2f`)** that runs through the mascot, every button, and even the text-selection highlight. Typography is **Assistant** for everything (good Hebrew RTL, but no heading/body contrast). Everything else is generic theme furniture: white/gray neutrals, dark scrims over product photography, no pattern, no custom icons, no `og:image`.

**Keep:** the **orange `#e67a2f`** (carries all the equity) and the **pufferfish mascot** — it's the one truly memorable, non-generic element and ties to the brand name/tagline; Assistant as the Hebrew workhorse; the product-photo-forward content.
**Replace:** the dark-scrim WordPress template feel, the flat white/cold-gray base (move to warm cream), the everything-is-Assistant flatness (add a display/heading face), the missing `og:image`, and the raster-only mascot (commission a clean vector/SVG so it scales). For a cartonlab-style warm-minimal redesign, the mascot can stay but should be re-rendered cleaner (or used more sparingly as an accent) so it doesn't fight a minimal layout.

---

## 6. Recommended Brand Tokens

Fold Picpong's real orange into a cartonlab-style warm-minimal neutral spine (cream `#F7F7F1` / ink `#1A1A1A`). **Picpong orange `#e67a2f` becomes the single accent**; the mascot's eye-blue is an optional secondary; neutrals carry the layout; keep Assistant for Hebrew and add a display face for headings.

```js
// tailwind.config.js — theme.extend.colors
colors: {
  // --- Cartonlab-style warm neutral spine ---
  cream: '#F7F7F1', // primary background (warm paper) — replaces #FFFFFF/#F8F8F8
  ink:   '#1A1A1A', // primary text / near-black — replaces #111111
  sand:  '#ECE9E0', // secondary surface / card fill
  line:  '#DEDACF', // hairline borders on cream
  muted: '#6E6A60', // secondary text (warm gray) — replaces cold #777777

  // --- Picpong brand accent (the real mascot/button orange) ---
  brand: {
    DEFAULT: '#E67A2F', // Picpong orange — primary CTA, links, mascot, active states
    700:     '#C75F1A', // pressed (≈ the deep #E45C01 family)
    600:     '#D86A22', // hover
    400:     '#F58729', // brighter accent already used on the site
    200:     '#F4C29A', // soft tint — badges, focus rings, hover backgrounds
    50:      '#FBEEE2', // wash — subtle section highlight
  },

  // --- Optional secondary (mascot eye-blue) ---
  pond: {
    DEFAULT: '#2A9BD0', // mascot blue — use sparingly as a single counter-accent
    600:     '#2484B3',
  },
}
```

Token mapping / usage:
- **Background:** `cream` (#F7F7F1) instead of stark white + cold `#f8f8f8`/`#ececec`.
- **Text:** `ink` (#1A1A1A); secondary `muted` (#6E6A60).
- **Accent / primary CTA / links / selection:** `brand` (#E67A2F), hover `brand-600`, pressed `brand-700` — mirrors the existing button + `::selection` orange.
- **Surfaces / cards:** `sand`; borders `line`.
- **Secondary accent (optional):** `pond` blue from the mascot's eyes for a single highlight; do not let it compete with orange.
- **Typography:** keep **Assistant** for Hebrew body/Latin fallback; add a warmer **display face for headings** to fix the all-Assistant flatness. Keep the playful mascot character; redraw it as **SVG** for scaling.
- **Add an `og:image`** (currently missing) — the mascot on cream, or a product shot.

### Real values cheat-sheet (the most load-bearing outputs)
- **Brand color (definitive):** `#E67A2F` (theme button + `::selection`, matches mascot). Variants: `#F58729`, `#E45C01`. Mascot eye-blue ≈ `#2A9BD0`.
- **Header logo URL:** `https://www.picpong.biz/wp-content/uploads/2018/12/PP_Logo.png` (orange 3D pufferfish + Hebrew tagline, 280×70 PNG)
- **Footer logo URL:** `https://www.picpong.biz/wp-content/uploads/2018/03/logo-n.png` (mascot only, 137×93 PNG)
- **Favicon URL:** `https://www.picpong.biz/wp-content/uploads/2018/03/logo-favicon.jpg`
- **Font:** Assistant (Google Fonts), used for both headings and body.
