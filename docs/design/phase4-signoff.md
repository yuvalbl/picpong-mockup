# Picpong — Phase 4 Visual Direction: Client Sign-Off Package

> **What this is:** the one-page approval doc for the visual direction. Approve the items in §5 and we unlock Phase 6 (hi-fi page mockups). No mockups are built until this gate clears.
> **Read alongside:** `concept.html` (the rendered visual concept — open it in a browser) · `visual-direction-final.md` (the full token-level spec) · `moodboard.md` (the mood + reference screens).
> **Last updated:** 2026-05-31

---

## 1. The direction, in one paragraph
**"A design-monograph for cardboard."** We take cartonlab.com's warm-minimal, gallery-grade editorial language — the look you picked, "just like it" — and make it unmistakably Picpong. A calm warm-paper canvas where the products and the blue-chip proof (74+ events: Microsoft, Intel, Google, IBM, Landa…) do the talking, eco/cardboard is the story (X-Board, told impact-first), and the UI stays quiet. Picpong's own equity — the orange, the pufferfish, the "we print on everything, big" spirit — is the seasoning, expressed through four ownable moves (§3) that cartonlab structurally can't copy. We add the one thing cartonlab refuses to build: real commerce (cart, checkout, pay) kept inside the same calm. Direction A below is our recommendation; a bolder Direction B is offered as a real alternative (§6).

---

## 2. The locked system at a glance

### Palette (warm — no cool greys, no pure black/white)
| Token | Hex | Role |
|---|---|---|
| cream | `#F7F7F1` | page background (warm paper) |
| ink | `#1A1A1A` | primary text (never pure black) |
| white | `#FFFFFF` | cards, product stage, button fills |
| gallery | `#333333` | dark bands (Projects), dark nav |
| kraft | `#C49A6C` | cardboard-tone texture / feature bands (Picpong-ownable) |
| muted / stone / line | `#6E6E6E` / `#B7B7AD` / `#E0E0D7` | secondary text · warm light grey · borders |
| **brand (orange)** | **`#E67A2F`** | primary CTA / hover / links — Picpong orange (exact) |
| brand-bright / brand-deep | `#F58729` / `#E45C01` | hover / pressed variants |
| pond (blue) | `#2A9BD0` | sparing secondary — mascot eye-blue |

> Accents are interaction punches only — never background fields, never small text on cream.

### Type (self-hosted, designer's pick — no client font dependency)
- **Display: Fraunces** (light, high-contrast serif) — negative tracking at 52–76px, set with a distinctive optical character (not defaults).
- **Body / UI: Hanken Grotesk** (Regular / SemiBold).
- **Hebrew (phase 2): Assistant** (Picpong already uses it).
- **Scale:** 76 / 52 / 34 display · 48–36 big sans statement · 24 card title · 18 body · 40–64 spec numbers · 14 button · 12 caption · 10–11 UPPERCASE eyebrow.

### Motion (one house language)
- **Single easing** `cubic-bezier(0.62,0.37,0.1,0.95)`, durations 0.25–0.5s.
- Card lift `translateY(-0.75rem)` · image zoom `scale(1.033)` · button hover = color swap · fade-up on scroll · blurred page transition · pufferfish *inflates* on load.
- ~85% calm, ~15% Picpong wink. Respects reduced-motion. Forbidden: multiple curves, bounce/spring, parallax overkill, drop shadows for depth.

---

## 3. The 4 ownable Picpong moves (what makes it NOT a cartonlab clone)
1. **Cardboard-native UI.** Corrugated-edge section dividers, fold / die-cut crease lines on cards and CTAs, occasional kraft-paper texture on feature bands. The UI is *made of* the medium.
2. **The pufferfish has a job.** Not a one-off sticker — a recurring guide: loading state (inflates), empty cart, 404 character, footer mark, back-to-top. Carries the existing "puff up big" equity. (Needs a clean SVG redraw — current logo is raster-only.)
3. **"We print on everything" as texture.** Headlines occasionally printed *onto* a material (kraft, fabric, foamcore) rather than flat text — a differentiator cartonlab can't structurally copy.
4. **Spec-as-hero.** Picpong's real X-Board specs (60-ton press · 100% recycled · flame-retardant · water-resistant · reusable) become a confident, proud stat strip. Numbers as personality.

---

## 4. The page list being proposed (from `docs/ia/sitemap.md`)
Scope = conferences / events / exhibitions, eco/cardboard-led, full commerce + quote dual-funnel.

| Page | Purpose |
|---|---|
| **Home** | dual funnel — Shop lane + Projects/enquiry lane |
| **Products** (`/products/`) | shop category index (use-case taxonomy) |
| Product categories | exhibition-stands · event-furniture · displays-totems · photocall-walls · modular-eco-stands · decor-trees |
| **Product detail (PDP)** | gallery · spec tabs · price + cart · customization · quote alternative |
| **Projects** (`/projects/`) | filterable case-study gallery (Events / Exhibitions / Trade-Show Booths) |
| Project detail | credits → narrative → related → CTA |
| **Sustainability** | why cardboard / X-Board hero — FSC, recyclable, made-to-order proof |
| **About** | studio story, founders (2004), team, milestones |
| **Contact** | structured quote/enquiry form + details |
| **Catalogs** | downloadable catalogs (email capture) |
| **Cart · Checkout · Order confirmation · Account** | commerce flow (Stripe — build-plan) |
| **Legal** | privacy · terms · returns · cookies |
| Blog | *optional — confirm* |
| `/he/…` | Hebrew + RTL mirror (phase 2) |

---

## 5. Decisions the client must approve to unlock Phase 6
Please confirm each:

1. **Direction A — "Cardboard monograph"** as the visual system (or request Direction B, §6).
2. **Palette:** cream / ink / kraft warm neutrals + Picpong orange `#E67A2F` as the single hot accent (mascot blue sparingly).
3. **Typography:** Fraunces (display) + Hanken Grotesk (body) — self-hosted; Assistant for Hebrew in phase 2.
4. **Motion discipline:** one easing curve, calm-first, ~85/15 restraint-to-wink.
5. **The 4 ownable moves** (§3) — especially: keep & redraw the **pufferfish as a working mascot** (SVG redraw is a small commission), and lead with the **X-Board eco/spec story**.
6. **Commerce-on-calm:** real cart/checkout/account wearing the same editorial skin, with the dual-funnel (buy + enquire) everywhere.
7. **Page list (§4)** — approve as proposed, or flag pages to add/remove (incl. the optional Blog).

---

## 6. The choice on the table
- **Direction A — "Cardboard monograph" (recommended).** Honours "just like it" while owning a distinct identity via the 4 moves. This is what `concept.html` renders.
- **Direction B — "Printed-material" (bolder alternative).** Same palette / type / motion, but the print-on-everything texture motif becomes the whole organizing idea: material-printed headlines as default, editorial asymmetric blocks instead of the 3-col grid, heavier dark/kraft bands, slightly bolder display weight. More ownable, further from cartonlab, higher design/build cost. Full detail in `visual-direction-final.md` §12.

---

## 7. Open item (does not block this gate)
- **Final page-list sign-off + any pages to remove** — still formally open. We are proceeding on the proposed list (§4 / `docs/ia/sitemap.md`) as the default unless the client objects.

---

**Next:** client approves Direction A (or requests B) + the page list → **Phase 5 (lo-fi wireframes) and Phase 6 (hi-fi mockups)** begin. Until then, no mockups are built.
