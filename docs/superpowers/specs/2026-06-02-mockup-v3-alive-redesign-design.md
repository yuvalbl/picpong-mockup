# Mockup V3 — "Alive" Redesign Spec

Date: 2026-06-02
Author: Claude (Opus 4.8) + Yuval
Status: Approved — building

## Problem

Mockup V2 (deployed at https://picpong-mockup.web.app) reads "dry / 2010" — a static
image for the main content. Client wants it **alive, vibrant, in motion**, in the language
of cartonlab.com (mobile especially): a mixed-media **collage hero**, hand-drawn line
illustrations, bold color panels, looping video, and restrained-but-pervasive motion.

## Reference (from live cartonlab.com/en, mobile, captured 2026-06-02)

- Hero = **autoplay muted loop video** (`banner-derecha`) + a **5-tile collage**
  (`bloque-5-banners`): product photo with **hand-drawn line people sketched over it**,
  overlapping white info card, full-bleed lime/teal panels, installation photo, **rotated
  curved sticker text**, cardboard-fold detail photo.
- **Hand-drawn line illustrations** (walking box, figure hugging a lightbulb) on dark `#333`
  panels — the playful, human signal.
- **AOS `fade-up`** on every block; marquee ticker; color-swap pill buttons; one house
  easing `cubic-bezier(0.62,0.37,0.1,0.95)`; light↔dark mode by section context.

See `docs/analysis/cartonlab/design-ux.md` and `structure.md` for the full teardown.

## Decisions (locked with client)

1. **Scope:** full 5-page redesign (index, shop, product, projects, project-detail).
2. **Hero motion:** combined — animated collage + line-art draw-on + a looping video tile.
3. **Video tile:** **CSS cinemagraph** — a real Picpong image with slow Ken-Burns pan + a
   subtle moving element. No external video file (no copyright/weight/sourcing risk).
4. **Doodles:** yes — custom hand-authored SVG line art (pufferfish, ping-pong paddle+ball,
   large-format printer, rolled banner, idea lightbulb, hand-folding paper), draw-on animated.
5. **Palette:** Picpong tokens only (cream `#F7F7F1`, ink `#1A1A1A`, orange `#E67A2F`,
   pond `#2A9BD0`, kraft `#C49A6C`) + **full-bleed bold color panels**. No cartonlab colors.

## Constraints / non-goals

- Static HTML/CSS/JS, **no build step**, no framework. Vanilla JS extends existing `app.js`.
- Reuse **real Picpong images** already in the repo (`mockup-v2/assets/...`,
  `docs/analysis/picpong/assets/`). Do **not** ship cartonlab's images (copyright).
- Keep the existing fonts. Keep house easing.
- `prefers-reduced-motion`: disable parallax, draw-on, cinemagraph pan, marquee; keep all
  content visible and legible. No silent loss of information.
- Keep the deployed Firebase setup (`firebase.json` public dir flips to `mockup-v3` at deploy
  time, or we deploy v3 as the live target — decided at deploy step).

## Architecture

New dir `mockup-v3/` = copy of `mockup-v2/`, then layered with:

### CSS (additive, in `css/styles.css`)
- **Collage system:** `.collage` CSS grid; tile classes `.tile--media/--panel/--video/--sticker/--detail`; asymmetric masonry on `min-width:960px`, single-column stack on mobile; overlapping `.tile__card` info card; `.sticker` rotated curved text.
- **Bold panels:** `.panel--orange/--pond/--dark` full-bleed bands; light↔dark rhythm.
- **Motion utilities:** `.reveal` (fade-up base + `.is-in` state), `[data-parallax]`, `.draw` (stroke-dashoffset), `.cinemagraph` (Ken-Burns `@keyframes`), `.marquee`.
- All transitions use the single house easing + 0.25/0.3/0.5s durations.

### JS (additive, in `js/app.js`)
- `initReveal()` — IntersectionObserver adds `.is-in`, staggers children via `--i`.
- `initParallax()` — rAF-throttled transform on `[data-parallax]` (skipped if reduced-motion).
- `initDraw()` — triggers SVG `.draw` when its tile reveals.
- `initMarquee()` — duplicate content for seamless loop (CSS-driven; JS only pauses on hover).
- Single `prefers-reduced-motion` guard gates parallax/draw/cinemagraph.

### Assets
- `assets/doodles/*.svg` — hand-authored line art, single-stroke paths suited to draw-on.
- Cinemagraph uses an existing raster; no new binary video.

### Units / boundaries
Each unit answers what/how/depends: motion fns are independent, each reads only `data-*`
hooks + DOM, no shared mutable state beyond the IO instances. Collage is pure CSS given
markup. Doodles are static SVG assets consumed by `initDraw`.

## Per-page plan

| Page | Treatment |
|---|---|
| index | Collage hero · dual-path chooser · logo wall · projects highlight · category cards · marquee · FAQ |
| shop | Vibrant category banners; product cards (hover crossfade + lift); doodle accents |
| product | Gallery + spec tabs + customization pitch + quote CTA + doodle |
| projects | Masonry gallery in **dark editorial mode**; filter; rotated stickers |
| project-detail | Cinematic case study; dark stage; narrative content blocks |

## Build order (incremental, deploy between phases)

- **Phase 0** — copy v2→v3; design-system + motion CSS; author doodle SVGs.
- **Phase 1** — homepage collage hero + motion (the headline). Deploy → client reviews live.
- **Phase 2** — shop. **Phase 3** — product. **Phase 4** — projects. **Phase 5** — project-detail.
- **Final** — deploy, live-verify every page at 1×/2×/3×, confirm reduced-motion path.

## Testing / verification

- Playwright (installed, 1.60.0) mobile + desktop screenshots per page after each phase.
- Live-verify deployed pages (header/hero/doodles/motion) at multiple densities.
- Reduced-motion check: emulate `prefers-reduced-motion: reduce`, confirm content intact.
- No console errors; cache-bust `styles.css?v=` on each deploy (v2 stale-cache lesson).

## Risks

- **Motion overload** → looks gimmicky. Mitigate: one easing, fade-up dominant, parallax subtle (<12px), reduced-motion honored. Discipline = the cartonlab lesson.
- **Doodle quality** — hand-authored SVG must not look generic/clipart. Iterate; keep rough single-stroke feel.
- **Collage on small screens** — must stack cleanly, no overlap clipping. Mobile-first.
