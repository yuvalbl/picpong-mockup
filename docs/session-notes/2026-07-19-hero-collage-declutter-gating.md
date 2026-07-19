# Session: v6 hero collage - proof strip, mobile declutter, in-view animation gating

**Date:** 2026-07-19
**Goal:** Fill the desktop headline tile's dead zone, calm the cluttered mobile collage, and gate the hero's many concurrent animations by visibility.

## What Broke and Why

### Media-query hide defeated by later base rule

`.ctile--slogan { display: none }` inside the mobile query (~line 1038) lost to the base `.ctile--slogan { display: flex }` at ~1223 - equal specificity, later source order wins; media queries add nothing to the cascade. The tile stayed visible on phones.

**Fix:** repeat the hide in a media query placed after the base rule.
**Lesson:** v6 `styles.css` orders collage-layout sections before component sections - any override written into the early layout queries must re-check what the later component blocks declare.

### Late RTL block overrode the mobile fish tuck

The mobile `inset-inline-end: 0.6rem` tuck (0,2,0) lost to the non-media-scoped `[dir="rtl"] .ctile--headline .fish` rule at ~1690 (0,3,0), loosening the tuck in the primary Hebrew locale. The reviewer's suggested fix (same selector inside the mobile query, earlier in source) would ALSO have lost - equal specificity, earlier placement.

**Fix:** repeat the RTL rule in a mobile query placed after the ~1690 RTL section.
**Lesson:** the `[dir="rtl"]` override section near the file end beats earlier media-query rules; verify cascade fixes with in-browser `getComputedStyle`, not by reasoning about the suggested patch.

### Reveal transition fakes layout measurements

A full-width tile measured 324.95px instead of 335px right after scrolling - the `.reveal` entrance animates scale ~0.97, and `getBoundingClientRect()` mid-transition returns the scaled box. Looked like a grid bug; wasn't.

**Fix:** none needed - re-measure after the transition settles.
**Lesson:** when verifying layout with Playwright on this site, wait out the reveal transition (or screenshot) before trusting geometry.

## Decisions Made

| Decision | Rationale |
| --- | --- |
| One focal point / one moving element per viewport | Root cause of mobile "hectic" feel was 6 concurrent motion sources in one screen |
| Proof tile = spec strip (60-ton / flame / water), not logos | Spec-as-hero motif; "100% recycled" already lives in the hero badge; Hebrew reused verbatim from #material |
| Slogan + sticker + proof tiles `display: none` on mobile | Slogan duplicates the headline's job on a phone; fewer, full-width tiles read calmer |
| In-view gating is an AND with `motion-paused`/`reduceMotion`, never a replacement | The WCAG pause toggle and OS setting must always win |
| `is-offstage` class pauses CSS loops; default (no class / no JS) leaves them running | Progressive enhancement - no-JS visitors keep working decoration |
| Video in-view handler listens on `picpong:motion` (fired at end of `applyMotionState`) | Runs after the global handler, so it has final say; a global "resume" while offstage stays paused |

## Techniques That Worked

- **Parallel implementers on disjoint files with an upfront class-name contract:** HTML/CSS agent and JS agent ran concurrently, coupled only by the agreed `is-offstage` name - no worktrees needed.
- **Behavioral verification via `browser_evaluate`:** scroll, wait, then assert `video.paused` / class lists - confirmed the gating actually fires, which screenshots can't show.
