# Picpong — Mockup v1

A minimal, high-fidelity HTML/CSS/JS mockup of the Picpong redesign, built on the signed-off
**"Cardboard monograph"** direction (`docs/design/visual-direction-final.md`): cartonlab's warm-minimal
editorial system, made ownably Picpong (orange `#E67A2F`, pufferfish, cardboard motifs, spec-as-hero).

No build step, no dependencies. Just open `index.html`.

## Pages
| File | Page | Highlights |
|---|---|---|
| `index.html` | **Home** | Dual-funnel hero, "print on everything" marquee, trust strip, shop preview, X-Board spec strip, featured projects, sustainability split, About teaser, contact/newsletter |
| `shop.html` | **Shop** | Filter rail + live count, 3-col product grid, dual-funnel (buy + quote), in-grid project CTA |
| `product.html` | **Product (PDP)** | SVG gallery + thumbs, finish/size variant pickers, qty stepper, add-to-cart **and** request-a-quote, spec accordion, related products |
| `projects.html` | **Projects** | Dark "gallery mode", recolored nav, filterable feature grid of real event builds |

## Design system
- `css/styles.css` — tokens, type (Fraunces + Hanken Grotesk), buttons, cards, spec strip, drawer, etc.
- `js/app.js` — cart (localStorage) + drawer, mobile menu, scroll-reveal, projects filter, PDP gallery/options/accordion, toast.

## Working interactions
- **Cart**: add from any tile or the PDP → badge pulses, toast, slide-in drawer with qty steppers; persists in `localStorage`.
- **Projects filter**, **mobile menu**, **PDP gallery/variants/accordion**, **newsletter** (mock submit).
- Respects `prefers-reduced-motion`.

## Images (from picpong.biz, per the brief)
Real event photos curated from Picpong's 2021–22 archive are downloaded into `assets/projects/`.
The mascot is redrawn as a clean **`assets/brand/puffer.svg`** (the brief flags the original as raster-only).
Product shots are honest **labelled SVG placeholders** — no studio product photography exists yet (flagged for re-shoot
in `docs/analysis/picpong/inventory.md`).

> Mockup only — eco claims and specs use Picpong's existing X-Board copy; certs to be attached before publication.
