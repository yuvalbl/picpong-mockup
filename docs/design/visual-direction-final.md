# Picpong — Visual Direction (FINAL, for sign-off)

> ⚠️ **PARTIALLY SUPERSEDED (2026-07).** Dated 2026-05-31, pre-pivot. Still authoritative on the *look* (warm-paper canvas, pufferfish, four ownable moves, orange `#E67A2F`), but three things are overtaken: (1) **§8 "Commerce-on-calm"** (cart/checkout/account) — commerce deferred to Phase 2, not in v5; (2) **§4 type** names **Fraunces** display + **Assistant** Hebrew — v5 actually ships **Rubik**, no Assistant loaded (decide before build); (3) the fixed px **type scale** is superseded by `../todo/font-sizes.md`. See [`../planning-consistency-audit.md`](../planning-consistency-audit.md).
>
> **Direction A — "Cardboard monograph": cartonlab's warm-minimal editorial system, made ownably Picpong.** Supersedes `visual-direction-v1.md`. Incorporates the `anti-generic-design` audit (scorecard §11). A more differentiated **Direction B** is offered as a real choice in §12.
> **Reference:** cartonlab.com (structure/tone, client's "just like it") · brand extracted from picpong.biz.
> **Companion docs:** `moodboard.md` (the mood) · `concept.html` (the rendered one-page visual concept) · `phase4-signoff.md` (client sign-off package).
> **Status:** ready for client sign-off gate (§6.6 of redesign-plan). No hi-fi mockups until this clears.
> **Last updated:** 2026-05-31

---

## 0. The anti-clone principle (READ FIRST)
The audit's one real risk: cartonlab's look + a near-identical orange = a **cartonlab copy**, not Picpong. We keep cartonlab's *structure and restraint* (client wants it) but earn a distinct identity through four ownable moves Picpong has and cartonlab doesn't (§2). Target: keep ~85% cartonlab calm, spend ~15% on Picpong personality — up from the timid 5% in v1.

---

## 1. Design principle
Calm, paper-like, gallery-grade editorial canvas where **products + blue-chip proof are the loud part** and the UI stays quiet. Eco/cardboard is the story — *impact first, eco as proof*. Picpong's warmth (playful Israeli B2B, "we print on everything, big") is the seasoning, not the base.

---

## 2. Ownable Picpong moves (the differentiators)
These are what make it NOT cartonlab:

1. **Cardboard-native UI motifs.** A **corrugated-edge rule** (thin double-wave line) as section divider; subtle **fold / die-cut crease lines** on cards and CTAs; occasional **kraft-paper texture** on dark/feature bands (not flat `#333` everywhere). Cardboard is the medium, so the UI is *made of it*. Cartonlab stays flat; we don't.
2. **The pufferfish has a job.** Not a one-off sticker — a recurring guide: loading state (inflates), empty cart, 404 character, footer mark, "back to top" button. Carries existing "puff up big" equity. Keep it 1-color line/flat in-system (commission a clean **SVG redraw** — current logo is raster-only).
3. **"We print on everything" as a texture idea.** Picpong prints on *any* surface (cartonlab = cardboard only). Express it: hero/section backgrounds occasionally show the headline *printed onto* a material (kraft, fabric, foamcore) rather than flat text. A differentiator cartonlab structurally can't copy.
4. **Spec-as-hero.** Picpong's real X-Board specs (60-ton press, 100% recycled, flame-retardant, water-resistant, reusable) become a **confident spec/stat strip** — bigger and prouder than cartonlab's quiet spec tabs. Numbers as personality.

---

## 3. Color system

### Neutrals (≈90% of surfaces)
| Token | Hex | Role |
|---|---|---|
| `cream` (bg) | `#F7F7F1` | page background — warm off-white |
| `ink` | `#1A1A1A` | primary text (never pure black) |
| `white` | `#FFFFFF` | cards, product stage, button fills |
| `gallery` | `#333333` | dark bands (Projects), dark nav |
| `kraft` | `#C49A6C` | warm cardboard tone — texture bands, accents (Picpong-ownable, NOT in cartonlab) |
| `muted` | `#6E6E6E` | secondary text, captions |
| `stone` | `#B7B7AD` | warm light grey |
| `line` | `#E0E0D7` | borders / dividers |

> Greys **warm-shifted** (greenish, not blue). `kraft` is our addition — gives a cardboard warmth cartonlab's cooler palette lacks, and pulls us off the clone line.

### Accents (interaction punches only — not fields, not body text)
| Token | Hex | Use |
|---|---|---|
| `brand` | `#E67A2F` | primary CTA / hover / links — Picpong orange (exact) |
| `brand-bright` | `#F58729` | hover/highlight variant |
| `brand-deep` | `#E45C01` | pressed / dark-bg variant |
| `pond` | `#2A9BD0` | sparing secondary — mascot blue (≈) |

### Tailwind tokens
```js
colors: {
  cream:'#F7F7F1', ink:'#1A1A1A', white:'#FFFFFF', gallery:'#333333',
  kraft:'#C49A6C', muted:'#6E6E6E', stone:'#B7B7AD', line:'#E0E0D7',
  brand:{ DEFAULT:'#E67A2F', bright:'#F58729', deep:'#E45C01' },
  pond:'#2A9BD0',
}
```
**Rules:** orange as fills (ink/white labels), not small text on cream (fails WCAG). No accent backgrounds. No cool greys, no pure #000/#FFF.

---

## 4. Typography

**Pairing (designer's pick, no client dependency):** light high-contrast serif display + neo-grotesque body, **self-hosted woff2**.
- **Display: Fraunces** (variable, OFL/free). **Audit fix — do NOT use defaults** (avoids the trending-Fraunces tell): set a distinctive optical character — high `opsz`, Light weight (≈300) at large sizes, modest `SOFT`, slight `WONK` for the engraved-monograph feel. Negative tracking at 52–76px. Premium upgrade path: Canela / GT Sectra Light.
- **Body/UI: Hanken Grotesk** (Regular/SemiBold, OFL). Alt: Schibsted Grotesk. Premium path: GT Walsheim / Söhne. **Avoid Inter/Poppins.**
- **Hebrew (phase 2 RTL): Assistant** (Picpong already uses it). Pair Latin Fraunces/Hanken ↔ Hebrew Assistant per locale.

### Scale (root 16px)
| Level | Font | Size | Tracking | LH |
|---|---|---|---|---|
| Hero display | Fraunces Light | 76px | −0.119rem | 108% |
| Section H | Fraunces Light | 52px | −0.065rem | 100% |
| Sub-H | Fraunces Light | 34px | −0.032rem | 106% |
| Big sans statement | Hanken SemiBold | 48 / 36px | slight − | — |
| Card title | Hanken SB / Fraunces | 24px | ± small | — |
| Body / lead | Hanken Regular | 18px | +0.022rem | 108% |
| Spec/stat number | Fraunces Light | 40–64px | −0.03rem | 100% |
| Button | Hanken SemiBold | 14px | +0.009rem | 112% |
| Caption | Hanken Regular | 12px | +0.012rem | — |
| Eyebrow (UPPERCASE) | Hanken | 10–11px | +0.013rem | — |

Large display → negative tracking. UPPERCASE only for 10–11px eyebrows. Product titles `NAME | descriptor`.

---

## 5. Layout & spacing
- Container max ~1920px, side gutters ~30px → expansive. **Left-aligned editorial**, not centered.
- Product grid 3-col desktop; white rounded **12px** cards on cream, **near-zero shadow** (separation via white-on-cream + radius). Drop shadows = forbidden.
- Section rhythm via **light↔dark bands** (cream / white-card / gallery `#333` / occasional **kraft-texture** band), separated by the **corrugated-edge rule** (§2.1).
- Breakpoint 960px; fluid 960–1920 band; some display type in `vw`. Base spacing on 8px scale (cartonlab's recurring `0.5/0.625/1.875rem`).

---

## 6. Motion (one house language)
- **Single easing** `cubic-bezier(0.62,0.37,0.1,0.95)`, durations 0.25–0.5s.
- Card hover lift `translateY(-0.75rem)`; image zoom `scale(1.033)`; **button hover = color swap** (white→orange, orange→kraft…).
- Scroll reveal = gentle `fade-up` only.
- Blurred full-screen page transition (`blur(12px)`, 0.4s).
- **Picpong details:** pufferfish *inflates* on loading; optional 40s marquee of the "we print on everything" line.
- Respect `prefers-reduced-motion`. **Forbidden:** multiple curves, bounce/spring, parallax overkill, autoplay-loud.

---

## 7. Component cues (full set in Phase 6)
- **Buttons:** full pill (`radius 18.75rem`), 14px SemiBold + inline SVG icon, color-swap hover; optional die-cut crease detail.
- **Product tile:** white 12px card, **two images swap on hover**, small-caps category eyebrow, left title, cart button bottom-right, whole-card lift.
- **Project card:** image fills rounded `cover`, Fraunces title (light), client credit small sans, on dark/kraft.
- **Spec strip:** the §2.4 stat hero — big Fraunces numbers + tiny eyebrow labels (60t · 100% recycled · flame-retardant · water-resistant · reusable).
- **Nav:** slim sticky ~64px cream→ink; Products mega-menu w/ thumbnails; recolors dark on Projects.
- **Forms:** low-chrome inputs, hairline `0.5px` borders, pill quantity stepper.

---

## 8. Commerce-on-calm (our addition — cartonlab has none)
Cart drawer, checkout, account wear the same skin: white-on-cream, pill buttons, one motion curve, Fraunces for confirmation moments. **Dual-funnel everywhere:** *Add to cart / Buy* + *Tell us about your project*. SKU model borrowed from mediagarden: article numbers + inline price modifiers + public price/spec tables.

---

## 9. Imagery direction (photography brief)
- **Studio product** 1:1 on white, X-Board floating, true cardboard tones — *to shoot*. **Lighting:** soft even key, slightly warm, single soft contact shadow (no hard drop shadows). **Props:** minimal and honest — a folded panel, a die-cut offcut, a hand assembling — to read "made, not stock". **Grade:** honest browns, no over-saturation.
- **In-situ project** cinematic, real Microsoft/Intel/Google/Landa events, warmer, on dark/kraft bands — *curate from 2021–22 archive; re-shoot weak 2018–19*. **Framing:** wide enough to show booth scale; people incidental (the build is the subject); available-light event grade.
- Real people foregrounded on **About only**. Natural grade, no filters/duotones, 12px rounded containers. Ratios: product 1:1, project 4:3 / 16:9, hero full-bleed.
- **Mockup rule:** use real Picpong 2021–22 heroes; any stock is a temporary placeholder and **must be labelled** in the mock (audit fix — stock photography is a top generic tell).

---

## 10. Accessibility
- `ink` on `cream` ≈15:1 (AAA). White on `gallery` ≈11:1 (AAA).
- `muted #6E6E6E` on cream ≈4.6:1 — AA body only.
- Accents (orange/kraft/pond) FAIL as small text on cream → fills with ink/white labels or large-only.
- `kraft #C49A6C` on cream is low-contrast — decorative/texture only, never text.
- Respect reduced-motion; support dynamic type.

---

## 11. anti-generic-design audit scorecard (2026-05-31)
| Axis | v1 | After fixes | Fix applied |
|---|---|---|---|
| Color | 8 | 8 | added `kraft` to pull off cartonlab's exact palette |
| Typography | 7 | 8 | Fraunces variable-axis spec (no defaults) |
| Layout | 8 | 8 | + corrugated-edge dividers, kraft bands |
| Spacing | 7 | 7 | unchanged |
| Imagery | 8 | 8 | real-heroes rule, label stock |
| Motion | 8 | 8 | pufferfish inflate detail |
| **Personality** | **5** | **8** | **4 ownable moves (§2): cardboard motifs, mascot-with-a-job, print-on-everything texture, spec-as-hero** |
| Details | 7 | 8 | die-cut creases, inflate, mascot states |
| Brand expression | 6 | 8 | orange + puffer + kraft now load-bearing, not shy |
| Memorability | 7 | 8 | cardboard-monograph + working mascot |
| **Total** | **71** | **≈ 81** | "distinctive & memorable" threshold |

**Residual risk:** still recognizably in cartonlab's family (intentional — client wants it). If client wants more distance, that's **Direction B (§12)**.

---

## 12. Direction B — "Printed-material" (the bolder alternative)
Offered so the gate is a real choice, not a rubber-stamp (per §6.6 — "present 2 directions, client picks one"). **A is the recommendation; B is the more differentiated option.**

- **Same foundations, unchanged:** cream/ink/kraft palette + orange `#E67A2F` (§3), Fraunces + Hanken type scale (§4), single motion curve (§6), pufferfish-with-a-job (§2.2). Nothing locked is lowered — B is a *layout/emphasis* shift, not a new system.
- **What changes:** the **print-on-everything texture motif (§2.3) becomes the whole organizing idea** rather than an occasional accent.
  - Headlines and whole section bands are **printed onto real materials** (kraft, fabric, foamcore, corrugated) as the default, not flat type on cream.
  - **Drop the 3-col WooCommerce-style product grid** in favour of larger, editorial, asymmetric material-blocks (closer to a printed monograph than a shop).
  - **Heavier use of the dark gallery + kraft-texture bands**; cream becomes the rest-state between bolder material spreads.
  - **Slightly bolder display weight** (Fraunces ~Regular vs Light) for more presence.
- **Trade-off:** more ownable and further from cartonlab, but harder to keep calm and to fit a conventional commerce grid onto — heavier design + build cost, and a small risk to the "just like it" brief the client locked.
- **Recommendation:** present A as default; reach for B only if the client explicitly wants more distance from cartonlab.

---

**Sign-off gate:** client approves **Direction A** (or requests **Direction B**, §12) → unlock Phase 6 hi-fi mockups. Open client item: final page-list sign-off (proceeding on `docs/ia/sitemap.md`).
