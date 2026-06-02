# Picpong — Visual Direction v1 (Phase 4)

> **Direction A — "Warm-minimal editorial" (faithful cartonlab system, Picpong-tuned).** This is the default we present; client locked "just like it". Tokens pulled from `docs/analysis/cartonlab/design-ux.md` and adapted.
> **Status:** draft for client sign-off gate (§6.6). No hi-fi mockups until this clears.
> **Last updated:** 2026-05-31

---

## 1. Design principle
Calm, paper-like, gallery-grade editorial canvas where the **products and projects are the loud part** and the UI stays quiet. ~95% restraint, 5% wink. Warmth is load-bearing. Eco/cardboard is the story, told through *impact first, eco as proof*.

---

## 2. Color system

### Neutrals (≈90% of every surface)
| Token | Hex | Role |
|---|---|---|
| `cream` (bg) | `#F7F7F1` | page background — signature warm off-white |
| `ink` | `#1A1A1A` | primary text (never pure black) |
| `white` | `#FFFFFF` | cards, product stage, button fills |
| `gallery` | `#333333` | dark sections (Projects "gallery mode"), dark nav |
| `muted` | `#6E6E6E` | secondary text, captions, breadcrumbs |
| `stone` | `#B7B7AD` | warm light grey |
| `line` | `#E0E0D7` | borders / dividers |

> Greys are **warm-shifted** (greenish, not blue). Do not substitute cool greys.

### Accents (interaction punches only — NOT background fields, NOT body text)
**Resolved:** accents now come from Picpong's REAL brand (extracted from picpong.biz, see `docs/analysis/picpong/brand.md`), not cartonlab placeholders. Picpong's equity is its **warm orange + pufferfish mascot**.

| Token | Hex | Use |
|---|---|---|
| `brand` (primary) | `#E67A2F` | primary CTA / hover / links — Picpong orange (exact, from CSS) |
| `brand-bright` | `#F58729` | hover-lift / highlight variant |
| `brand-deep` | `#E45C01` | pressed / dark-bg variant |
| `pond` (secondary) | `#2A9BD0` | sparing secondary accent — mascot eye-blue (≈, eyeball-estimated) |

> Picpong's orange replaces cartonlab's `#FF7038` 1:1 (they're nearly identical — lucky). Cartonlab's lime/teal/lilac are dropped; if we ever want extra energy they can return as tertiary punches, but the brand is **orange-led**. Accents fail WCAG as small text on cream — use as fills with `ink`/`white` labels, or large-only.

**Mascot:** the orange pufferfish is the only non-generic brand asset. Keep it, but it's **raster-only — needs a clean SVG redraw** for the redesign (logo task, flag for client/designer). Use it as a playful accent (cartonlab's "5% wink"), not the dominant motif.

### Tailwind tokens
```js
// tailwind.config — theme.extend.colors
colors: {
  cream:   '#F7F7F1',
  ink:     '#1A1A1A',
  gallery: '#333333',
  muted:   '#6E6E6E',
  stone:   '#B7B7AD',
  line:    '#E0E0D7',
  brand: { DEFAULT:'#E67A2F', bright:'#F58729', deep:'#E45C01' }, // Picpong orange
  pond:    '#2A9BD0', // mascot blue, secondary
}
```

---

## 3. Typography

**Pairing (RESOLVED — designer's pick, no client dependency):** light high-contrast serif display + neo-grotesque body/UI, **self-hosted woff2**.
- **Display:** **Fraunces** (Light, high optical contrast) — free/OFL, variable, gives the cartonlab "light serif at 76px with negative tracking" look without a paid license. Premium upgrade path if budget appears: Canela / GT Sectra Light. **Avoid Playfair** (generic tell).
- **Body/UI:** **Hanken Grotesk** (Regular/SemiBold) — free/OFL neo-grotesque, clean and sturdy. Alt: Schibsted Grotesk. Premium path: GT Walsheim / Söhne. **Avoid Inter/Poppins.**
- **Hebrew (phase 2 RTL):** **Assistant** (Picpong already uses it; strong Hebrew face) for both display+body in Hebrew, since Fraunces/Hanken lack Hebrew. Pair Latin Fraunces/Hanken ↔ Hebrew Assistant per locale.

### Scale (root 16px)
| Level | Font | Size | Tracking | LH |
|---|---|---|---|---|
| Hero display | serif Light | 76px | −0.119rem | 108% |
| Section H | serif Light | 52px | −0.065rem | 100% |
| Sub-H | serif Light | 34px | −0.032rem | 106% |
| Big sans statement | sans SemiBold | 48 / 36px | slight − | — |
| Card title | sans SB / serif | 24px | ± small | — |
| Body / lead | sans Regular | 18px | +0.022rem | 108% |
| Button | sans SemiBold | 14px | +0.009rem | 112% |
| Caption | sans Regular | 12px | +0.012rem | — |
| Eyebrow (UPPERCASE) | sans | 10–11px | +0.013rem | — |

**Rules:** large display → *negative* tracking (the typeset look). UPPERCASE only for 10–11px eyebrows. Mostly sentence/Title case. Product titles `NAME | descriptor`.

---

## 4. Layout & spacing
- Container max ~1920px, side gutters ~30px (tight vs wide canvas = expansive).
- **Left-aligned editorial**, not centered. Product grid 3-col desktop.
- White rounded **12px** cards on cream, **near-zero shadow** (separation via white-on-cream + radius). Drop shadows = forbidden (generic SaaS tell).
- Section rhythm via **light↔dark bands** (cream / white-card / gallery `#333`), not dividers.
- Breakpoint 960px; fluid 960–1920 band; some display type in `vw` for fluid scale.
- Spacing tokens recur: `0.5 / 0.625 / 1.875rem` — base an 8px-ish scale on these.

---

## 5. Motion (one house language)
- **Single easing:** `cubic-bezier(0.62, 0.37, 0.1, 0.95)`. Durations 0.25 / 0.3 / 0.5s.
- Card hover lift `translateY(-0.75rem)`; small elements `-0.25rem`.
- Image hover zoom `scale(1.033)` (subtle).
- **Button hover = color swap** (white→orange, lime→teal…), not darken/scale.
- Scroll reveal = gentle `fade-up` only (uniform).
- Blurred full-screen page transition (`backdrop-filter: blur(12px)`, 0.4s).
- Optional: 40s marquee ticker, one rotated sticker.
- **Forbidden:** multiple curves, bounce/spring, parallax overkill, autoplay-loud.

---

## 6. Component cues (preview — full set in Phase 6)
- **Buttons:** full pill (`radius 18.75rem`), 14px SemiBold label + inline SVG icon, color-swap hover. Variants: white→orange, lime→teal, teal→lime, gallery→orange, orange→lime.
- **Product tile:** white 12px card, **two images swap on hover** (front→alt angle), small-caps category eyebrow, left title, cart button bottom-right, whole-card lift.
- **Project card:** image fills rounded `cover`, serif title (light), client credit small sans, on dark.
- **Nav:** slim sticky ~64px cream→ink; Products mega-menu w/ thumbnails; recolors dark on Projects.
- **Forms:** low-chrome inputs, hairline `0.5px` borders, pill quantity stepper.

---

## 7. Commerce-on-calm (our addition — cartonlab has none)
Cart drawer, checkout, account must wear the same skin: white-on-cream, pill buttons, one motion curve, serif for confirmation moments (cartonlab uses serif 52px on its order-confirm modal — keep that). Keep the **dual-funnel** everywhere: *Add to cart / Buy* + *Tell us about your project*.

---

## 8. Accessibility checks
- `ink #1A1A1A` on `cream #F7F7F1` ≈ 15:1 — AAA. ✅
- `muted #6E6E6E` on cream ≈ 4.6:1 — AA body, not for <18px critical text.
- Accents (orange/lime/teal) as **text on cream FAIL** small-text AA — restrict to fills with ink/white labels or large display. ⚠️
- White text on `gallery #333` ≈ 11:1 — AAA. ✅
- Respect `prefers-reduced-motion`: drop fade-ups + page-transition blur.

---

## 9. Direction B (optional, more differentiated)
Same neutral spine, but swap accent family to a single more ownable Picpong hue + deeper use of the dark gallery mode, slightly bolder display weight. Present only if client wants a contrast to A. **Expected pick = A.**

**Sign-off gate:** client approves A (or B) → rename to `visual-direction-final.md` → unlock Phase 6.
