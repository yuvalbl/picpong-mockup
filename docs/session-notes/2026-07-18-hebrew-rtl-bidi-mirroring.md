# Session: Hebrew RTL polish - fix mirrored numbers, translate UI labels (v6)

**Date:** 2026-07-18
**Goal:** Sweep mockup-v6 in Hebrew, fix RTL rendering bugs (mirrored numbers) and untranslated English UI.

## What Broke and Why

### LTR content mirrors inside RTL blocks

An untranslated address (`40 Ha Hagana St … info@picpong.biz`) and a spec dimension (`120 × 50 cm`) rendered scrambled in Hebrew - the house number `40` jumped to the far end, and the dimension flipped to `cm 50 × 120`. Cause: a multi-run LTR string (numbers joined by neutral separators like `×` / `·`, unit only at the end) sitting in an RTL block has no single strong-LTR anchor, so the bidi base direction reorders the runs right-to-left.

**Fix:** Wrap the dimension in `<span dir="ltr">`, and translate the address to Hebrew (each number then sits in natural RTL flow). Isolate phone/email as `dir="ltr"`.
**Lesson:** Plain hyphen ranges (`5-7`, `2021-22`) are safe - bidi keeps them one numeric run. The danger is neutral separators (`×`, `·`, `/`) between numeric/latin runs in an RTL container; isolate those with `dir="ltr"` or a `bdi`.

### `perl -CSD` without `-Mutf8` double-encodes Hebrew

Adding `data-media-title-he="דלפק…"` via a `perl -CSD -i -pe` one-liner wrote mojibake (`×××¤×§…`) - visible only when the drawer rendered it. `-CSD` sets UTF-8 I/O, but without `use utf8` the Hebrew literals in the script are treated as bytes and get re-encoded on output.

**Fix:** Strip the bad attrs with an ASCII-only perl (`s/ data-media-title-he="[^"]*"//g`), re-add with Python (default UTF-8).
**Lesson:** For non-ASCII string edits, use Python or the Edit tool, not a perl one-liner - or ensure both `-Mutf8` and `-CSD`. Always verify non-ASCII edits by rendering, not just by grep count.

### QA screenshots clobbered tracked repo files

Saved full-page screenshots as `he-index.png` at repo root; those filenames already existed as committed files, so the writes overwrote them and the later cleanup `rm` deleted repo content (recovered with `git checkout HEAD --`).

**Fix:** `git checkout HEAD -- he-index.png he-index2.png`.
**Lesson:** Write scratch/QA files to the session scratchpad dir, never the repo root. (Playwright MCP restricts screenshot paths to the repo/`.playwright-mcp` - use `.playwright-mcp/` and clean it up.)

### Playwright MCP profile lock

`browser_navigate` failed with "Browser is already in use … use --isolated" - a stale Chrome from a prior run held `SingletonLock`.

**Fix:** `ps aux | grep mcp-chrome-<id>`, kill the PID owning `…/SingletonLock`, then navigate. Recurs across the session.

## Decisions Made

| Decision | Rationale |
| --- | --- |
| Localize drawer names via `data-media-title-he`, chosen at click time when `lang==he` | Drawer captures title on click; `applyLang` doesn't touch `data-media-title`. Falls back to English. |
| Keep client/brand names (Microsoft, BlueVine…) English; translate only UI chrome | Brand names are brand names; badges/tags/model-names are localizable UI. |
| Ask before translating (badges/tags/names/marquee) rather than assume scope | "fix mirrored numbers" is a rendering-bug ask; untranslated English is a separate content call the owner should size. |
| Split Photocall name into words + `<span dir="ltr">2×2.4m</span>` | Keeps the `×` dimension from mirroring while translating the words. |

## Techniques That Worked

- **Objective mirroring detection:** for each char in a string, `Range.getBoundingClientRect().left`, sort ascending → true visual left-to-right order. Proves whether a number is mirrored instead of eyeballing.
- **Reliable full-page shots:** inject a style forcing `.reveal{opacity:1;transform:none}` + kill animations before screenshotting - scroll-reveal elements are otherwise blank in a full-page capture.
- **Untranslated-text scan:** walk leaf elements, flag those with Latin + no Hebrew + no `data-he`/`data-en` (skip `[aria-hidden]`) to inventory missing translations per page.
