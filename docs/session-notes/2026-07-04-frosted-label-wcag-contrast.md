# Session: Frosted hero caption labels + WCAG AA contrast (IS 5568)

**Date:** 2026-07-04
**Goal:** Restyle the v5 hero video-tile caption to match the slideshow slide label, make it recede on mobile, then unify both and prove IS 5568 (WCAG 2.0 AA) contrast.

## What Broke and Why

### Translucent card over photos silently fails AA for muted text

Making `.ctile__card` frosted (`rgba(cream,0.66)` + blur) so the photo shows through drops text contrast below 4.5:1 - not against the card color but against the *composited* background, which darkens with whatever photo pixels sit behind it. The muted meta `#6b6b63` (≈4.7:1 on solid cream) fell to **2.2-3.5:1** over dark photo patches on all 5 slideshow images. The ink title stayed fine (7-14:1); only the muted line failed.

**Fix:** Raise card opacity to 0.87 and darken meta `#6b6b63` → `#3a3a35`. Worst-case measured: title 12-14:1, meta 8-9:1.
**Lesson:** For any "recede into the image" label, AA must be checked against the composited bg over the *darkest* region behind the text, not the card's own color - and a semi-transparent light card can't keep a light-muted text color compliant.

### "The gray is hard to read" = the same failure the math flagged

User's readability complaint landed on the exact meta line the contrast check had failed. Eye and metric agreed.
**Lesson:** A muted-gray caption that "looks designery" is often already an AA problem; treat a legibility complaint as a contrast bug, not a taste preference.

## Decisions Made

| Decision | Rationale |
| --- | --- |
| Unify both captions on one base `.ctile__card` rule | Only 2 labels exist (both in index.html); shared rule keeps them identical, drops the video-only override |
| Opacity 0.87 (not lower) + darker meta, vs near-opaque | Sweep showed keeping muted `#6b6b63` needs ~0.95 opacity (kills the frost); darkening meta lets a still-translucent card pass with margin |
| Extend the mobile card-shrink to the video tile | It was inheriting desktop card sizing on a half-width tile and swallowing the photo - the original mobile bug |

## Techniques That Worked

- **Canvas worst-case contrast measurement:** draw each background image to a canvas, scan the card footprint in 8px blocks (approximates the blur), alpha-composite each block with the card color in sRGB, compute WCAG luminance/contrast vs each text color, take the min. Ran a 2D sweep of opacity × text-darkness to pick a compliant combo. Same-origin localhost images avoid canvas taint.
- **Verify AA in both dir + both breakpoints:** color fix is language-agnostic, but confirmed LTR/RTL and mobile/desktop render since the project is Hebrew-first under IS 5568.

## Numbers

| Meta line contrast (worst patch, all 5 photos) | Before | After |
| --- | --- | --- |
| `#6b6b63` @ 0.66 opacity | 2.2-3.5:1 (fail) | - |
| `#3a3a35` @ 0.87 opacity | - | 8.0-9.3:1 (pass) |
