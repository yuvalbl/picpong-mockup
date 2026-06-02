# Picpong — Mockup v2

> v2 = v1 refined per a `/product-design-review` and an `/anti-generic-design` pass.
> **Key changes:** real structured **quote funnel** (was a dead-end newsletter); **Fraunces variable axes**
> (opsz/SOFT/WONK — the spec's #1 anti-generic fix); the **pufferfish now has a job** (inflates on
> add-to-cart, empty cart, back-to-top); **true corrugated-flute dividers** + visible kraft texture +
> die-cut crease on cards; louder **spec numbers**; global **focus-visible** states; 44px tap targets;
> on-brand hero image; PDP options now drive **price**; a new **project-detail** page; accent no longer
> fails contrast. See `../mockup-v1/` for the original.

A minimal, high-fidelity HTML/CSS/JS mockup of the Picpong redesign, built on the signed-off
**"Cardboard monograph"** direction (`docs/design/visual-direction-final.md`): cartonlab's warm-minimal
editorial system, made ownably Picpong (orange `#E67A2F`, pufferfish, cardboard motifs, spec-as-hero).

No build step, no dependencies. Just open `index.html`.

## Pages
| File | Page | Highlights |
|---|---|---|
| `index.html` | **Home** | Dual-funnel hero, "print on everything" kraft marquee, trust lockup, shop preview, X-Board spec strip, featured projects, sustainability split, About teaser, **structured quote form** + newsletter |
| `shop.html` | **Shop** | Filter rail + live count, 3-col product grid, dual-funnel (buy + quote), in-grid project CTA |
| `product.html` | **Product (PDP)** | SVG gallery + thumbs, finish/size pickers that **update price**, qty stepper, add-to-cart **and** request-a-quote, spec accordion, related products |
| `projects.html` | **Projects** | Dark "gallery mode", recolored nav, filterable feature grid of real event builds → each links to a case study |
| `project-detail.html` | **Project (case study)** | Credits row, build narrative, gallery, related work, CTA |

## Design system
- `css/styles.css` — tokens, type (Fraunces + Hanken Grotesk), buttons, cards, spec strip, drawer, etc.
- `js/app.js` — cart (localStorage) + drawer, mobile menu, scroll-reveal, projects filter, PDP gallery/options/accordion, toast.

## Working interactions
- **Cart**: add from any tile or the PDP → badge pulses, toast, slide-in drawer with qty steppers; persists in `localStorage`.
- **Projects filter**, **mobile menu**, **PDP gallery/variants/accordion**, **newsletter** (mock submit).
- Respects `prefers-reduced-motion`.

## Hero collage slideshow — engineering notes (mobile Safari gotchas)

The hero `.slideshow` (auto-advancing reel: opacity for show/hide, a `clip-path`
diagonal **wipe** entrance, an orange `mix-blend` light-streak, and a continuous
shared **zoom** on the `.slideshow__stage` wrapper) hit two **mobile WebKit / iOS
Safari** rendering bugs. Both are load-bearing — keep these rules when touching it:

1. **Drive resting slide visibility with `opacity`, never with a held `clip-path`.**
   Mobile Safari intermittently **drops an `animation-fill-mode` (`forwards`/`both`)
   clip-path value once the keyframes end**, so a slide revealed by a clip-path
   wipe *disappeared ~1s after the wipe*. Fix: `opacity` owns show/hide (active +
   prev = 1, others = 0); `clip-path` is a **decorative entrance only**. Then even
   if the held clip is dropped, the active frame stays painted (`opacity:1`, no clip).

2. **Never put a `clip-path` child under an animated-`transform` ancestor on mobile.**
   The continuous zoom is an animated `transform` on `.slideshow__stage`, the parent
   of the clip-path slides. Mobile WebKit **fails to paint clip-path children under
   an animated-transform parent** (made worse by the `mix-blend-mode` streak pseudo),
   so the slideshow **blanked the instant the zoom started** (on load). Fix: the zoom
   `animation` + `will-change:transform` are scoped to `@media (min-width: 760px)`.
   Mobile gets a **static stage** (image always visible) with the wipe as its motion;
   desktop keeps the full cinematic zoom.

> Rule of thumb for this codebase: on mobile, transient `clip-path`/`mix-blend`
> effects are fine, but **steady-state visibility and animated-transform ancestors
> over clipped children are not** — gate those behind a width query and let
> `opacity` carry persistence. Always verify hero motion on a real iOS device;
> these bugs don't reproduce on desktop.

## Images (from picpong.biz, per the brief)
Real event photos curated from Picpong's 2021–22 archive are downloaded into `assets/projects/`.
The mascot is redrawn as a clean **`assets/brand/puffer.svg`** (the brief flags the original as raster-only).
Product shots are honest **labelled SVG placeholders** — no studio product photography exists yet (flagged for re-shoot
in `docs/analysis/picpong/inventory.md`).

> Mockup only — eco claims and specs use Picpong's existing X-Board copy; certs to be attached before publication.
