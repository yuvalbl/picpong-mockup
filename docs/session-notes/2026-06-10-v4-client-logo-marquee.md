# Session: v4 client-logo marquee — real logos, dark band, stepped like the original

**Date:** 2026-06-10
**Goal:** Replace the v4 "Trusted on the show floor by" logo wall with the real Picpong client logos, animated like the original site.

## Reference: original site's client logos

The live site's "Our clients include" logos are at `picpong.biz/wp-content/uploads/2018/03|12/...`
(Microsoft, mifold, Electra, Clalit, HOT, Brink's, Azrieli = `siteNewLogo-1.png`, Pashut Tari = `download-1.png`, plus `instagram.png` which is a social link, not a client). They are **white-on-transparent 120×90 thumbnails** → only show on a dark background.

**Caveat:** two assets carry baked-in extras — `HOT` has a tagline (sits taller), `Pashut Tari` has its own bordered plate — so the row looks uneven. Inherent to the source PNGs; would need per-logo cropping or re-sourcing as SVG to fix.

## Reference: original logo animation (Slick carousel)

Measured live via Playwright (sampling `.slick-track` transform):
- Library: **Slick** (`slick-track` / `slick-slide`), steps **one slide at a time**.
- Slide width **198px** (logo 120px + padding); step move **≈520ms** eased; then **hold ~2–3s**, repeat.
- It's a discrete step-and-pause, NOT a smooth scroll.

## Decisions Made

| Decision | Rationale |
| --- | --- |
| White client logos on `band--dark on-dark` panel | Logos are white-on-transparent; reuse the site's existing dark section style, not a one-off |
| Replicate Slick step-and-pause in pure CSS | No build step / no JS dep; a keyframe with hold+move stops matches the feel |
| Relocate kraft text marquee above the spec strip (not between spec & projects) | Two marquees can't sit adjacent; spec→projects is a deliberately-fused `padding-top:0` claim/proof pair — splitting it breaks intent. (User later chose their own spot anyway — between spec & projects — so the projects `padding-top:0` was removed to restore spacing.) |

## Techniques That Worked

- **Seamless stepped marquee, CSS-only:** duplicate the N logos (2N items), drive `translateX` 0→−50% so −50% = exactly one set; use **per-item `margin-right` (not flex `gap`)** so `-50%` lands precisely one cell per step. Keyframe = 8 segments, each holds ~80% then moves ~20% → quick eased slide + pause. Verified by sampling the rendered transform (−184px == one cell, 501ms move, ~2s hold).
- **Measure live-site motion with Playwright** by polling `getComputedStyle(track).transform` on an interval and grouping samples into move-bursts vs holds — derives exact timing without reading minified plugin code.
