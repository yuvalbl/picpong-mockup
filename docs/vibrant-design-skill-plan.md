# Plan: `vibrant-design` — a global "vibrant designer" skill

**Date:** 2026-06-05
**Status:** ✅ delivered — skill live at `~/.claude/skills/vibrant-design/` (verified: renders, no overflow desktop/mobile, reduced-motion safe, zero brand leakage).

**2026-06-05 · enhancement pass** (from a teardown of three Hebrew info-product landing pages — thenextlevel/CLAUDE-CODE, /CLAUDE-CODE-FREE, business-express/milion-play). Added three engine/reference additions, all verified (no console errors, no overflow at 1280/375, reduced-motion shows full line + zero hidden cards):
- **Scroll spine** (`[data-spine]`) — a connecting line that draws on scroll and lights numbered steps; the "winding-road" sales-page device straightened into a robust primitive (+ SVG winding-road variant in `collage.md`). New CSS + JS hook + live demo in `effects.html` §10.
- **Focal glow halo** (`.glow-halo`) — one accent glow ringing the single hero CTA/video.
- **Guardrails** — the long-page "vibrant hero, dead body" negative example (a real 19k-px page that went motionless below the fold), plus dial-it-back checks for blocking on-load modals and over-spent ambient particle fields.

## Goal
A global Claude skill that makes web pages feel **alive, dynamic, young, hype — but slick
and smooth, never over-the-top or annoying** (the "exact amount"). It teaches the judgment
plus ships a **de-branded motion engine** and **two interactive catalogs** (effects + palettes)
as drop-in resources.

## Decisions (locked)
- Tech: **vanilla, framework-agnostic** (plain HTML/CSS/JS, no deps).
- Positioning: **fully standalone** (no cross-references to other design skills).
- Catalog: **two separate pages** — `effects.html` + `palettes.html`.
- Aesthetic registers: editorial-collage, bold color-pop, neo-retro/Y2K, premium-smooth,
  **plus fresh punchy/vibrant proposals**.
- Effects engine: **de-branded** — no PicPong references, no `#E67A2F`, no mascot.
  Generic custom-prop tokens (`--accent`, `--ink`, `--paper`).

## Skill layout (global)
```
~/.claude/skills/vibrant-design/
  SKILL.md                  # overview, when-to-use, "exact amount" philosophy,
                            #   quick-ref tables, process, common mistakes
  references/
    typography.md           # expressive type, variable axes, display pairing, kinetic text
    motion.md               # easing, timing, stagger, reduced-motion, restraint
    dynamism.md             # scroll-reveal, parallax, hover, depth — making a page feel live
    collage.md              # composing a proper editorial collage (overlap, rotation, rhythm)
    color.md                # vibrant palettes without going garish
  assets/
    effects.js              # de-branded motion engine (data-attribute driven, no deps)
    effects.css             # keyframes + custom-prop tokens, reduced-motion safe
    effects.html            # interactive motion gallery — live demos, copy-paste
    palettes.html           # vibrant palette catalog — swatches across registers, copy hex/CSS
```

## Phase 1 — Parallel research (read-only sub-agents)
- **R-big / R1–R3 · Session miners** — split the 12 transcripts in
  `~/.claude/projects/-Users-yuval-develop-repos-picpong-website/` (the 18 MB one solo).
  Extract design decisions, before→after changes + WHY, motion/typography/color/collage
  techniques, the "dial it back" calibration moments, mobile-Safari gotchas. Grep/extract,
  not read-whole.
- **D1 · Docs historian** — `docs/design/*`, `redesign-plan.md`, mockup READMEs, and the
  **git history** of design docs to trace how principles evolved.
- **C1 · Code extractor** — inventory effect implementations in `mockup-v3` (+ v2)
  `js/app.js` + `css/styles.css`, so `effects.js` is grounded in real working code.

## Phase 2 — Author & build
- Write `SKILL.md` + five `references/*.md` from synthesized insight.
- Extract & de-brand the engine → `effects.js` / `effects.css`.
- Dedicated palette agent curates vibrant palettes across all registers + fresh proposals
  → `palettes.html`.
- Build `effects.html` gallery + newly-proposed punchy effects.

## Phase 3 — Verify & install
- Open both catalogs in a browser; confirm effects run and `prefers-reduced-motion` honored.
- Lightweight skill-application test.
- Confirm discoverable at `~/.claude/skills/`.
