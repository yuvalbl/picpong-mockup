# Picpong — Moodboard (Phase 4)

> Visual reference collage for the redesign. Anchor = cartonlab.com (client's "just like it"). Picpong brand (orange `#E67A2F` + pufferfish) folded onto cartonlab's warm-minimal editorial spine. Pairs with `visual-direction-final.md` (the token-level system) and `concept.html` (the rendered visual concept).
> **Tokens are authoritative in `visual-direction-final.md`** — this moodboard is the *mood*, that doc is the *spec*. Where they touch (palette, type, motion), they match.
> **Last updated:** 2026-05-31

---

## 1. The one-line feel
**"A design-monograph for cardboard."** Warm paper canvas, light serif headlines, the products and the proof (74+ blue-chip events) doing the shouting. Eco is the story; orange + pufferfish are the wink.

---

## 2. Reference screens to pull (curate 6–8, no generic mood-collage)
| # | Source | What to capture | Why |
|---|--------|-----------------|-----|
| 1 | cartonlab.com **home** | dual-funnel "You choose how to start", cream canvas, light-serif hero | core structure + tone |
| 2 | cartonlab **product detail** | spec tabs, customization upsell, white-on-cream card stage | our PDP skeleton |
| 3 | cartonlab **projects** (dark mode) | `#333` gallery band, serif titles over in-situ shots | our project archive look |
| 4 | cartonlab **product tile hover** | two-image swap + card lift | signature interaction |
| 5 | Aesop product page | restraint, type-led, generous whitespace | craft bar |
| 6 | Pentagram case study | editorial grid, image scale rhythm | layout discipline |
| 7 | Patagonia Provisions | eco-as-proof not guilt-trip | eco tone |
| 8 | Picpong **X-Board** + best 2021–22 project hero | real assets we keep | grounding in reality |

> Store captures under `docs/design/moodboard/` when pulled (screenshots). Annotate each with 1 line: "steal this / avoid this".
> **Companion visual concept:** `docs/design/concept.html` renders this mood as a live one-page concept (palette, type, motion, the 4 ownable moves, pufferfish) — show it alongside this doc at the gate.

---

## 3. Color mood
Warm cream `#F7F7F1` fields · near-black `#1A1A1A` ink · dark `#333` gallery bands · warm **kraft `#C49A6C`** as a cardboard-toned texture/feature-band tone (our addition off the clone line — see final §3) · **Picpong orange `#E67A2F`** as the single hot accent (CTAs, hovers, the mascot) · mascot-blue `#2A9BD0` sparingly. Greys are warm-shifted, never cool. No pure black/white, no accent backgrounds.

## 4. Type mood
Light high-contrast serif (**Fraunces** Light) headlines at 52–76px with negative tracking — literary, gallery-label feel. Sturdy neo-grotesque (**Hanken Grotesk**) for everything functional. UPPERCASE only on tiny eyebrows. The serif/grotesque tension = the premium signal.

## 5. Imagery mood
Two registers: (a) **clean studio product shots** 1:1 on white — X-Board pieces floating, true cardboard tones; (b) **cinematic in-situ event shots** — real booths/stands at Microsoft/Intel/Google events, warmer, on dark bands.
- **Studio:** soft, even, slightly warm key light; honest cardboard browns (no over-saturation); minimal natural props (a folded panel, a tool) to read "made, not stock"; subtle contact shadow only.
- **In-situ:** available-light/event grade, warm, people incidental (the booth is the subject); shot wide to show scale.
- Real people foregrounded on About only. Natural grade, no filters/duotones, 12px rounded containers. **Stock is placeholder-only and must be labelled in mocks** (a top generic tell — audit fix).

## 6. Motion mood
Calm. **One easing curve** (`cubic-bezier(0.62,0.37,0.1,0.95)`, 0.25–0.5s). Gentle fade-ups, subtle card lift, color-swap button hovers, a blurred page transition, optional one marquee of the "we print on everything" line, and the **pufferfish inflating** on load. ~85% restraint, ~15% Picpong wink (up from the timid 5% in v1 — see final §0). Respect `prefers-reduced-motion`.

## 7. The wink — the 4 ownable Picpong moves (what makes it NOT a cartonlab clone)
The pufferfish + orange are the surface; underneath sit **four ownable moves** (full detail in final §2):
1. **Cardboard-native UI** — corrugated-edge dividers, fold/die-cut crease lines, occasional kraft-texture bands. The UI is *made of* the medium.
2. **The pufferfish has a job** — not a one-off sticker but a recurring guide (loading inflate, empty cart, 404, footer mark, back-to-top). Carries the "puff up big" equity. Commission a clean SVG redraw.
3. **"We print on everything" as texture** — headlines occasionally printed *onto* a material (kraft, fabric, foamcore), not flat text. Cartonlab structurally can't copy this.
4. **Spec-as-hero** — Picpong's real X-Board numbers (60-ton press · 100% recycled · flame-retardant · water-resistant · reusable) as a confident stat strip. Numbers as personality.

> These keep us in cartonlab's calm family (client wants it) while owning a distinct identity. Restraint is still the base; the wink is the seasoning.

---

## 8. The two directions presented (sign-off choice)
The client picks **one** at the gate (§6.6 of redesign-plan):
- **Direction A — "Cardboard monograph" (recommended, default).** The system in `visual-direction-final.md` + `concept.html`: cartonlab's warm-minimal editorial spine, made ownably Picpong via the 4 moves above. The expected pick — it honours "just like it" while still being distinct.
- **Direction B — "Printed-material" (bolder, more differentiated).** Same warm neutral spine, same tokens/type/motion, but the **print-on-everything texture motif (move 3) becomes the whole organizing idea**: drop the 3-col WooCommerce-grid feel, lean into headlines/sections printed onto real materials, heavier use of the dark gallery + kraft bands, slightly bolder display weight. A real alternative if the client wants more distance from cartonlab — but A is the recommendation. (Detailed in final §12.)

---

**Sign-off gate (§6.6):** present this + `visual-direction-final.md` + `concept.html`. Client approves Direction A (or requests B) → Phase 6 hi-fi mockups. Only open item: final page-list sign-off (proceeding on `docs/ia/sitemap.md`).
