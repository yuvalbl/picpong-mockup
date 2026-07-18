# Session: Mobile "Latest projects" strip - peek fix + RTL swipe cue

**Date:** 2026-07-18
**Goal:** Fix the mobile Latest-projects strip getting cut mid-title, and add a "swipe for more" cue (mockup-v6).

## What Broke and Why

### RTL scroll container rests at a non-zero scrollLeft

The cue's auto-hide used `Math.abs(row.scrollLeft) > 12`. On the RTL (Hebrew-default) site the scroll-snap strip rests at `scrollLeft: -20` and fires a `scroll` event on load as it settles, so the check tripped immediately and the cue was hidden before the user touched anything. Looked like the feature "wasn't there".

**Fix:** Capture `restLeft = row.scrollLeft` once, then retire on `Math.abs(row.scrollLeft - restLeft) > 48` (distance from rest, not absolute).
**Lesson:** In RTL (and with scroll-snap) a horizontal scroller does not rest at 0 and emits a load-time scroll event; gate scroll-driven UI on distance from the initial resting position, never on absolute scrollLeft.

### resize_window can't verify mobile CSS

`mcp__claude-in-chrome__resize_window` reported success but `innerWidth` stayed 1586 at every size, so `@media (max-width: 599px)` never engaged - the mobile layout was untestable that way, and manual DOM-measurement hacks gave misleading results (absolute-positioning rules inside the media query didn't apply, so the cue fell into static flow).

**Fix:** Used Playwright MCP `browser_resize` (390x844) - it truly emulates the viewport, so the media query and the RTL bug both reproduced.
**Lesson:** For responsive/mobile verification use Playwright MCP, not claude-in-chrome resize; the latter resizes the OS window, not the page viewport.

## Decisions Made

| Decision | Rationale |
| --- | --- |
| Mobile card width `84vw` (`max-width:599px`) | One full card + a thin ~16vw sliver reads as "scroll for more"; any partial card wide enough to show text looks broken. |
| Cue positioned at `inset-inline-end`, direction from `<html dir>` | "More content" is always at inline-end (right in EN, left in RTL); logical props + a dir-based chevron flip cover both with no JS branching for placement. |
| Cue is `aria-hidden` / `tabindex=-1` | It only duplicates native scrolling; native swipe/scroll stays available to AT and keyboard users. |

## Techniques That Worked

- **Clear a stale Playwright MCP lock:** `pkill -f ms-playwright-mcp` when it errors "Browser is already in use ... use --isolated" (a leftover instance holds the persistent profile).
- **Partial-stage one file's hunks non-interactively:** write a patch of just the wanted hunks and `git apply --cached patch.diff` (index.html also held unrelated in-progress i18n work; `git add -p` is unavailable in this harness).
