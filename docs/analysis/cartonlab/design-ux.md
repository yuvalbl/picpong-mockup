# Cartonlab.com — Visual Design & UI/UX Reference Analysis

Reference site: https://cartonlab.com/en
Purpose: redesign target for **Picpong** (printing house for conference/event/exhibition products). Client brief: "I want just like it" — capture the design language precisely enough to reproduce.

Method: fetched homepage + shop category + product category + projects + about pages; pulled and parsed the raw theme stylesheet (`/wp-content/themes/cartonlab2025/style.css`, 178 KB) and individual ACF block stylesheets; cross-checked stack via web search. Hex values, font names, and sizes below are taken **directly from the live CSS**, not inferred.

---

## 0. Tech stack (context for reproduction)

- **WordPress** (custom theme `cartonlab2025`) + **WooCommerce** for the shop, Stripe gateway.
- **Custom ACF "blocks"** — the whole site is assembled from bespoke content blocks, each with its own stylesheet (e.g. `cl25-bloque-dos-caminos`, `cl25-slider-scroll-productos-destacados`, `cl25-bloque-mensajes-movimiento`, `cl25-banners-categorias-productos`). This modular block system is why every section feels purpose-built rather than templated.
- **Swiper.js** for carousels/sliders. **AOS** (Animate On Scroll) for scroll reveals.
- **Two licensed/custom premium webfonts** self-hosted as `.woff2` — this is a major part of the "expensive" feel (see Typography). Not Google Fonts.

The takeaway for Picpong: the polish does **not** come from a premium theme. It comes from (a) two paid typefaces, (b) a tightly constrained color/spacing system expressed as CSS variables, and (c) one consistent easing curve applied to restrained motion. All three are reproducible on any stack (Next.js/Tailwind, etc.).

---

## 1. Overall design direction — the vibe

**Warm-minimal editorial, with a confident contemporary-Swiss/gallery sensibility and a playful sustainable streak.**

- Not cold/techy minimal, not industrial. The cream paper-like background and a refined serif give it a **warm, tactile, "design studio / art book"** feel — appropriate for a company whose material is literally cardboard/paper.
- It reads like a **design portfolio crossed with a boutique e-commerce shop**. Shop pages feel calm and product-forward; Projects pages flip into a darker, more dramatic "gallery/case-study" mode.
- Personality comes through in **copy + small playful gestures** (rotated badge, a scrolling marquee of messages, color-swapping button hovers) layered on an otherwise disciplined, whitespace-rich grid. The restraint is the point: 95% calm, 5% wink.
- Sustainability is signaled through **material honesty and tone**, not green clichés — the lime/teal accents are used sparingly as energy, not as a "we're eco" banner.

---

## 2. Color system

Colors are defined as named CSS variables (e.g. `--Neutral-1A1A1A`, `--Brand-FF7038`). Frequency counts are from the main stylesheet.

### Neutrals (the foundation — ~90% of surfaces)
| Role | Hex | Notes |
|---|---|---|
| Page background | **`#F7F7F1`** | Signature warm off-white / paper cream. Used on `body` and most sections. The single most important color on the site. |
| Primary text / ink | **`#1A1A1A`** | Near-black, never pure black. Default body color. |
| Pure white | `#FFFFFF` | Cards, product image backgrounds, button fills. |
| Dark surface | **`#333333`** | "Editorial mode" background — Projects pages, dark cards, the dark nav bar. |
| Mid grey (secondary text) | `#6E6E6E` | Breadcrumbs, captions, secondary labels. |
| Warm light grey | `#B7B7AD` | Borders / muted text (warm-tinted, not neutral grey). |
| Warm border / divider | `#E0E0D7` | Hairlines, dividers (again warm-tinted). |
| Near-white alt | `#FDFDF7` | Subtle alternate panel. |

> Note the neutrals are **warm-shifted** (greenish-grey rather than blue-grey). `#F7F7F1`, `#B7B7AD`, `#E0E0D7` all sit on a warm axis. Picpong should resist the default cool grays of most frameworks — that single substitution is what would make a copy feel "off."

### Brand accents (used as small punches, not fields)
| Role | Hex | Where |
|---|---|---|
| Primary accent — orange | **`#FF7038`** | Primary hover state, key CTAs (`boton-naranja`). The "hot" brand color. |
| Lime / chartreuse | **`#D4EB34`** | Energetic accent, `boton-verde`, hover targets. |
| Teal-green | **`#09B891`** | Secondary green (`boton-verde-oscuro`), green hover. |
| Lavender / lilac | **`#CABECE`** | Soft accent (3rd most-used color in CSS); section tints / illustration accents. |

Accents are deployed as **fills on small elements and hover transitions**, almost never as large background fields. The base experience is cream + ink; color arrives on interaction.

### Background treatment
- Default: flat warm cream `#F7F7F1`. No gradients on content surfaces.
- Editorial/Projects sections: flat dark `#333333` with white text — a deliberate **light↔dark mode switch by context**.
- Cards and product stages: white `#FFFFFF` with rounded corners, floating on the cream. No heavy shadows.

---

## 3. Typography

Two self-hosted webfonts. This pairing is the core of the look.

### The two families
1. **Harriet Text** (a high-contrast transitional **serif**, by Okay Type) — loaded in **Light** and **Light Italic** weights only (`HarrietText-Light-2v1.woff2`). Used for **large display headlines and emotional/editorial statements**. Refined, literary, "design monograph" feel.
2. **Residenz Grotesk** (a neo-grotesque **sans**) — loaded in **Regular**, **SemiBold**, and **SemiBoldWide**. The workhorse: body text, nav, labels, buttons, product titles. SemiBoldWide is a slightly extended cut used for special emphasis.

> Pairing logic: **delicate light serif for the big poetic headlines, sturdy grotesque sans for everything functional.** This serif-display + grotesque-body contrast is the single biggest driver of the "premium" impression. Reproducing with generic fonts (e.g. Playfair + Inter) will read as a cheap imitation; choose a *light-weight* high-contrast serif and a genuine neo-grotesque.

### Scale (from live CSS, root = 16px)
| Level | Font | Size | Tracking | Line-height |
|---|---|---|---|---|
| Hero / page display | Harriet Text Light | **4.75rem (76px)** | **−0.11875rem** (very tight) | 108% |
| Large display (alt) | Harriet Text Light | 4.5rem (72px) | tight negative | — |
| Section headline | Harriet Text Light | **3.25rem (52px)** | −0.065rem | 96–108% |
| Sub-headline | Harriet Text Light | 2.125rem (34px) | −0.03188rem | 106% |
| Big sans statement | Residenz SemiBold | 3rem / 2.25rem | slightly negative | — |
| Card / block title | Residenz SemiBold or Harriet | 1.5rem (24px) | ±0.015–0.0225rem | — |
| Body / lead | Residenz Regular | **1.125rem (18px)** | +0.0225rem | ~108% |
| Default body | Residenz Regular | 1rem (16px) | — | — |
| Button label | Residenz SemiBold | **0.875rem (14px)** | +0.00875rem | 112% |
| Small label / caption | Residenz Regular | 0.75rem (12px) | +0.0125rem | — |
| Eyebrow / category (UPPERCASE) | Residenz | **0.625–0.6875rem (10–11px)** | +0.0125–0.01375rem | — |

### Letter-spacing rules (a real signature — copy this exactly)
- **Large display type → negative tracking** (tightened). The bigger the serif headline, the tighter: up to −0.11875rem at 76px. This is what makes headlines look typeset, not default.
- **Small/UI text → small positive tracking** (loosened ~+0.009–0.0225rem). Body, buttons, labels are slightly opened up for legibility/refinement.

### Case
- **Mostly sentence case.** Headlines and product titles are sentence/Title case, never shouty.
- **UPPERCASE is reserved exclusively for tiny eyebrow/category labels** (10–11px with positive tracking) — only ~9 uppercase rules in the whole stylesheet. Sparse, deliberate.
- Product titles use a `NAME | descriptor` pattern (e.g. `MIMOSA | Foldable Pop Up cardboard chair`) — collection name in caps, descriptor in sentence case.

---

## 4. Layout & grid

- **Container max-width: `120.375rem` (≈1926px), hard-capped at `1920px`.** This is a **very wide, near-full-bleed** layout — content breathes edge-to-edge on large screens rather than sitting in a narrow centered column. Distinctive vs typical 1200–1280px sites.
- **Page side gutters: `1.88rem` (~30px).** Tight relative to the canvas width → content feels expansive.
- **Product grid: 3 columns on desktop.** Projects: grid/masonry mix with featured-large + standard tiles.
- **Whitespace density: generous but not sparse.** Large vertical rhythm between sections; sections are full-width bands that alternate cream / white-card / dark (`#333`). Section-to-section contrast (light vs dark) creates the rhythm more than dividers do.
- **Alignment: predominantly left-aligned**, editorial. Headlines and body left-flush; small badges/CTAs occasionally pinned right. Not centered/symmetric (centering would instantly make a copy feel generic).
- Internal element gaps are consistent multiples: `0.5rem`, `0.625rem`, `1.875rem`, `1.88rem` recur as the spacing tokens.

---

## 5. Imagery treatment

- **Studio product photography on clean white/transparent backgrounds** for shop tiles — square (1:1) PNGs (300×300 thumb / 600–700px detail). Crisp, evenly lit, e-commerce-grade, no harsh shadows; the product floats.
- **In-situ / lifestyle and documentary project photography** on Projects — real installations at events/exhibitions, shown larger and more cinematic, often on the dark `#333` stage.
- **Real people present**, especially on About ("Real people, cardboard obsessed") — founder and team portraits in a grid; humanizes the brand. Shop imagery itself is mostly people-free product hero shots.
- **Color grade: natural, warm, true-to-material.** Cardboard browns, whites, real-world color. No heavy filters or duotones. The warmth of the photography matches the cream UI.
- **Framing/ratios:** square for products; landscape/cover-cropped (`object-fit: cover`, `background-size: cover`) for project and banner imagery. Images sit in rounded containers (12px radius) — never bleed raw to a hard rectangle inside cards.

---

## 6. Component inventory

### Buttons — a full pill system (`border-radius: 18.75rem` = fully rounded)
All buttons: pill-shaped, **Residenz Grotesk SemiBold 14px**, line-height 112%, tracking +0.00875rem, padding ~`0.625rem 1.5rem` (10/24px) up to `0.75rem 2.25rem`, often with a small inline SVG icon (gap 0.625rem). Variants by class:
| Class | Fill | Text | Hover |
|---|---|---|---|
| `boton-blanco` | White | Ink `#1A1A1A` | → **orange `#FF7038`** |
| `boton-verde` | Lime `#D4EB34` | Ink | → teal `#09B891` |
| `boton-verde-oscuro` | Teal `#09B891` | Ink | → lime |
| `boton-negro` | `#333` | White | → orange `#FF7038` |
| `boton-naranja` | Orange `#FF7038` | — | → lime `#D4EB34` |

> **Signature interaction: buttons change *fill color* on hover** (white→orange, lime→teal, black→orange) rather than darkening/lifting. Playful, brand-y, and very recognizable. All transitions use the house easing (below).

### Navigation
- **Slim sticky top bar** (~64px tall; padding `1.125rem 1.88rem`), background = cream `#F7F7F1`, ink text. Thin **wordmark logo (~118×18px)**.
- Nav items in Residenz Grotesk, gap `1.88rem`, no underlines. Dropdown mega-menus for Shop/Projects categories (with thumbnail images for some items).
- Right side: search, account, cart (with item-count badge that has a `grow-shrink` animation), language switcher (EN/ES/FR).
- **Context-aware recolor:** on Projects pages the nav bar flips to dark `#333` + white text — matching the editorial dark mode of those pages.

### Cards
- **Product tile:** white, 12px radius (`0.75rem`), **two stacked product images that crossfade/swap on hover** (front view → alternate angle). Small-caps eyebrow category (10px, tracked) above title; product title left-aligned below; an add-to-cart icon button (cart SVG) bottom-right. **Whole card lifts `translateY(-0.75rem)` on hover** (0.5s, house easing). No border; minimal/no shadow — separation comes from the white-on-cream contrast.
- **Project card:** image fills a rounded container (`cover`), title overlaid or below in white Harriet serif on dark; client credit line in small sans. Same hover lift.
- **Category/banner cards:** larger rounded panels (12px), some circular (`border-radius: 50%`, `aspect-ratio: 1/1`) icon-stage variants; image `scale` on hover.

### Galleries / sliders
- **Swiper-powered carousels.** Featured-products slider; a horizontal **scroll-driven product slider** (`slider-scroll-productos-destacados`) tied to scroll position. Swiper arrows are minimal ink chevrons that fade (`opacity 0.2`) on hover and disappear when disabled.
- A rotated badge element (`transform: rotate(-14deg)`) used as a playful sticker on a slide.

### Forms
- Newsletter + WooCommerce checkout. Inputs are clean, low-chrome; quantity stepper is a pill with a hairline border (`0.5px solid #1A1A1A`). Consistent with the calm aesthetic.

### Modals
- Cart mini-popup (`popup-minicarrito`) and an order-confirmation modal whose success message uses the **Harriet serif at 3.25rem** — even transactional moments get the editorial display type.
- **Full-screen page-transition overlay** (see Motion).

### Footer
- Multi-column: link columns, contact (address in Molina de Segura, Murcia, Spain; info@cartonlab.com), social icons (note green LinkedIn icon variant), language, legal, and EU/Spanish-government funding logos. Calm, ink-on-cream, generous padding.

---

## 7. Motion / interaction

The motion system is **disciplined and unified** — this is a big part of why it feels expensive.

- **One house easing curve everywhere:** `cubic-bezier(0.62, 0.37, 0.1, 0.95)`. Memorize this — it is applied to virtually every transition. A custom ease-in-out with a snappy finish. Durations are short and consistent: **0.25s / 0.3s / 0.5s**.
- **Card hover lift:** `translateY(-0.75rem)` (cards), `translateY(-0.25rem)` (smaller elements), 0.5s, house easing.
- **Image hover zoom:** `transform: scale(1.033)` — very subtle, not flashy.
- **Button hover = color swap** (not scale/shadow), 0.25s.
- **Scroll reveals via AOS:** almost entirely **`fade-up`** (53 instances; one `fade-right`). Uniform, gentle upward fade-in as sections enter viewport. Nothing bouncy or staggered-chaotic — restraint is deliberate.
- **Marquee ticker** ("messages in movement" block): infinite horizontal scroll, `40s linear infinite`, translateX 0→−100%, pausable. The one continuously-moving element — a small kinetic accent.
- **Page-transition overlay:** a fixed full-screen layer with **`backdrop-filter: blur(12px)`** that fades on navigation (`load-page` / `exitPage` keyframes, 0.4s) over the cream background — gives a smooth, app-like between-page transition instead of a hard reload flash.
- **Cart badge micro-animation** (`grow-shrink`) when an item is added.

**Restrained vs flashy:** Restrained = scroll reveals (single fade-up), subtle zoom, color-swap buttons, blur page transition. Flashy-but-controlled = the rotated sticker, the marquee, the scroll-linked product slider. Nothing autoplay-loud; no parallax overkill.

---

## 8. Mobile / responsive behavior

- **Primary breakpoint: 960px.** `@media (max-width:959px)` = mobile/tablet; `(min-width:960px)` = desktop.
- A **fluid desktop band `960px–1920px`** with a separate rule for `≥1921px` — i.e. layout scales smoothly across large desktops then caps. Some sizes use `vw` units (e.g. `0.824vw`, `4.55vw`) so display type scales fluidly with viewport.
- Grid collapses from 3-col products toward fewer columns; nav collapses to a mobile menu; header has dedicated mobile cart icon vs desktop cart text (`mobile-cart-icon` / `desktop-cart-icon` swap).
- Spacing/type step down at the 960 breakpoint (smaller display sizes defined in the `max-width:959px` block).

---

## 9. What makes it premium / distinctive — the "secret sauce" (and how to not get it generic-wrong)

**The secret sauce, ranked:**
1. **The typeface pairing** — *light-weight high-contrast serif (Harriet Text Light) for display + a true neo-grotesque (Residenz Grotesk) for everything else.* The serif used at large sizes with **negative tracking** is the single most "designed" signal. This alone carries 50% of the feel.
2. **The warm cream `#F7F7F1` + near-black `#1A1A1A` base, with warm-shifted greys.** Paper-like, calm, material-honest. Color accents arrive only on interaction.
3. **One unified motion language** — a single custom easing curve, short durations, uniform `fade-up` reveals, subtle lifts/zooms. Consistency reads as craft.
4. **Color-swapping pill-button hovers** + **context-aware dark/light mode** (cream shop vs `#333` projects) + **blurred page transitions.** Small set of signature gestures, used everywhere.
5. **Very wide container (~1920px) with tight 30px gutters**, left-aligned editorial composition, white cards floating on cream with 12px radii and almost no shadow.

**Easy ways a copy goes generic-wrong (avoid these for Picpong):**
- **Substituting cheap fonts.** Inter/Poppins + Playfair will instantly betray the imitation. Pick a genuinely light high-contrast serif and a real grotesque; load them as woff2.
- **Using cool/neutral greys** (`#F5F5F5`, `#888`) instead of warm-shifted ones. The warmth is load-bearing.
- **Pure black `#000` text** and **pure-white `#FFF` page background.** They use `#1A1A1A` on `#F7F7F1` — softer, warmer.
- **Default (zero) letter-spacing on big headlines.** Without the negative tracking, large serif type looks loose and amateur.
- **Drop shadows on cards.** They rely on white-on-cream contrast + radius, not shadows. Adding shadows = generic SaaS look.
- **Too many easing curves / bouncy animations / parallax.** The calm comes from one curve and gentle fade-ups. Variety here reads as noise.
- **Centered, narrow (1200px) layouts.** Loses the expansive editorial feel.
- **Over-using the accent colors as backgrounds.** Orange/lime/teal/lilac are interaction punches, not fields. Flooding sections with them kills the gallery calm.
- **Shouty uppercase.** Reserve caps for 10–11px eyebrows only.

---

## Appendix — copy-ready tokens for the Picpong build

```
/* Color */
--ink:            #1A1A1A;
--paper:          #F7F7F1;   /* page bg */
--white:          #FFFFFF;   /* cards / product stage */
--dark:           #333333;   /* editorial/projects bg + dark nav */
--text-secondary: #6E6E6E;
--border-warm:    #E0E0D7;
--grey-warm:      #B7B7AD;
--accent-orange:  #FF7038;   /* primary hover / CTA */
--accent-lime:    #D4EB34;
--accent-teal:    #09B891;
--accent-lilac:   #CABECE;

/* Type — substitute licensed/closest equivalents */
--font-display: "Harriet Text", light high-contrast serif; /* Light/300, display only */
--font-sans:    "Residenz Grotesk", neo-grotesque;          /* Regular + SemiBold */

/* Motion */
--ease: cubic-bezier(0.62, 0.37, 0.1, 0.95);
--dur-fast: .25s; --dur: .3s; --dur-slow: .5s;

/* Geometry */
--radius-card: 0.75rem;     /* 12px */
--radius-lg:   1.25rem;     /* 20px */
--radius-pill: 18.75rem;    /* fully rounded buttons */
--container-max: 1920px;
--gutter: 1.88rem;          /* ~30px */
--breakpoint: 960px;

/* Signature behaviors */
card:hover     { transform: translateY(-0.75rem); }   /* lift */
image:hover    { transform: scale(1.033); }           /* subtle zoom */
button:hover   { background: <swap to accent>; }       /* color swap, not darken */
reveal         { AOS fade-up; }
headline-large { font: 300 4.75rem Harriet; letter-spacing: -0.11875rem; }
eyebrow-label  { font: 0.625rem Residenz; text-transform: uppercase; letter-spacing: 0.0125rem; }
```
