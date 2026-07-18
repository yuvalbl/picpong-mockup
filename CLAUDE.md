# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> ⚠️ **Current state (2026-07, read first).** Parts of this file predate the June 2026 pivot. What's true now:
> - **Live/deployed = `mockup-v5`** (`firebase.json` `public: "mockup-v5"`), forked from `mockup-v4`. `mockup-v3` is no longer the deployed copy.
> - **Single lead-gen funnel**, not dual. It's a browse-only catalog with quote/contact capture; **e-commerce (cart/checkout/pay) is deferred to Phase 2**. No live cart.
> - **Hebrew-first + RTL is in Phase 1** (geo-detected in the real build).
> - **Display face = `Rubik`** (decision 2026-07-05; the old `Fraunces` design spec was dropped). Note: Hebrew **body** still lacks a Hebrew-glyph face (`Hanken Grotesk` has none) — open a11y gap on a Hebrew-first site.
> - **Phase vocabulary (canonical, 2026-07-05):** "Phase N" means the **product roadmap** only — **P1** = the lead-gen catalog site (the build now), **P2** = commerce (cart/checkout/pay), **P3** = backoffice/rep portal. `redesign-plan.md`'s process "Phases 0-6" are a *separate, retired* axis — don't cross-reference them as "Phase N".
> - **Canonical planning now = `docs/prd/01|02|03`, `docs/prd/open-questions.md`, and `docs/todo/`** (the Meeting-2 absorption layer). `redesign-plan.md` / `build-plan.md` / the `design/` sign-off docs are pre-pivot history — read the PRDs + todo for current scope. See `docs/planning-consistency-audit.md` for the full drift list.
> - **Backoffice UI mockup lives at `mockup-v5/backoffice/`** (mock auth, localStorage demo data, URL-only access, English chrome) - a sales-support/spec artifact per an owner decision on 2026-07-05, not a real P1 or P3 build.

## What this repo is

Static HTML/CSS/JS **mockups** for the **Picpong** website redesign — for client review, not a production app. Picpong is an Israeli printing house for conferences/events/exhibitions (booths, stands, displays) built from **X-Board** recycled cardboard. The redesign mirrors **cartonlab.com** (the client's "I want just like it" reference): warm-minimal editorial, eco/cardboard-led, with a dual funnel (e-commerce **and** project-enquiry). There is **no build step, no framework, no dependencies** — open the HTML directly or serve statically.

## Commands

```bash
npm run serve            # Firebase Hosting emulator (serves the `mockup-v5` dir per firebase.json)
npm run deploy           # firebase deploy --only hosting  (project: picpong-mockup)
npm run deploy:preview   # firebase hosting:channel:deploy preview
```

There are no tests, linters, or bundlers. To view a mockup without Firebase, open any `mockup-v*/index.html` in a browser.

**Verifying mobile/responsive + RTL:** use Playwright MCP (`browser_resize` genuinely emulates the viewport); claude-in-chrome `resize_window` resizes the OS window but not the page viewport, so `@media` breakpoints never engage. Note the site is Hebrew-first RTL, where horizontal scroll containers rest at a non-zero `scrollLeft` and fire a load-time scroll event.

## Architecture

**Three mockup generations**, each fully self-contained (no shared code between them — they are iterations, not modules):

- `mockup-v1/` — first hi-fi pass.
- `mockup-v2/` — refined per design-review/anti-generic passes (real quote funnel, Fraunces variable axes, working pufferfish mascot). See `mockup-v2/README.md`.
- `mockup-v3/` — **the live/deployed version** (`firebase.json` `public: "mockup-v3"`). "Alive collage" redesign with a motion system and real project photography. Has `index.html` plus `index-dynamic.html` / `index-readable.html` variants.

Each generation has the same shape: page-level `*.html` (`index`, `shop`, `product`, `projects`, `project-detail`) + one `css/styles.css` (design tokens, type scale, components) + one `js/app.js` (cart via `localStorage`, drawer, mobile menu, scroll-reveal, projects filter, PDP gallery/variants, toast) + `assets/` (`brand/`, `projects/`, and in v3 `doodles/`). Pages share CSS/JS within a generation; interactions are vanilla JS, progressive-enhancement style, and respect `prefers-reduced-motion`.

**Design system (consistent across generations):** display serif **Fraunces** (uses its variable opsz/SOFT/WONK axes) + body **Hanken Grotesk**; brand orange **`#E67A2F`** (extracted from the current Picpong site); **pufferfish** mascot; cardboard/kraft-flute motifs; "spec-as-hero" (X-Board's 60-ton press / 100% recycled / flame-retardant / water-resistant claims). When editing visuals, match these — don't introduce generic AI-aesthetic defaults.

## `docs/` — planning track (read before changing direction)

- `redesign-plan.md` — master plan (mockup track, Phases 0–6). The source of truth for scope and process.
- `build-plan.md` — real-code build/QA/launch; **parked** until hi-fi mockups are signed off.
- `client-answers.md` — **locked client decisions** (full e-commerce; lead with eco/cardboard; cartonlab is primary reference; scope = conferences/events/exhibitions only — POS/interior/retail are out of scope).
- `ia/sitemap.md`, `ia/user-flows.md` — information architecture the mockups follow.
- `design/` — `visual-direction-final.md` (signed-off "Cardboard monograph" direction), `moodboard.md`, `concept.html`, `phase4-signoff.md`.
- `analysis/` — competitor teardowns (`cartonlab/`, `mediagarden/`) and the Picpong source-asset library (see below).

## Asset map — source images from the current Picpong site

`docs/analysis/picpong/` is the **map of everything pulled from the live site `picpong.biz`**, so you always know where a mockup image came from and whether it's reusable.

- **`asset-map.md`** — START HERE. Master human catalog of every image: which event/group it belongs to, its source URL (provenance), what it represents, dimensions, and a reuse flag. Organized into: 🎟️ brand-name events & conferences (2019–2022), 🏗️ 2018 job-archive projects (booths/builds), 📦 X-Board products, 🏷️ client logos, 🎨 brand/chrome, ❓ unattached.
- **`asset-map.json`** — machine-readable index of the same (groups → assets with metadata).
- **`assets/<group>/`** — the downloaded images, organized by event/source; each folder has a `README.md` describing its provenance and listing every image. Buckets: `projects/<slug>/`, `products/<page>/`, `logos/`, `brand/`.
- **`inventory.md`** / **`brand.md`** — the original written inventory (scope, reusable copy blocks, X-Board spec claims verbatim, brand color/mascot notes).
- **`scripts/`** — the reproducible extraction pipeline: `01_fetch_media.py` (WP REST media), `02_map_posts.py` + `02b_resolve_parents.py` (portfolio pages → post IDs/titles/categories), `03_build_map.py` (join + classify → `asset-map.json` + `download-list.tsv`), `04_download.py` (fetch images; gentle — picpong.biz rate-limits bursts), `05_write_catalog.py` (write `asset-map.md` + folder READMEs). Re-run `04`/`05` to resume/refresh.

How sourcing works (important when judging image quality): **gen2-page** assets are 2019–2022 brand events — the live site publishes only a hero + a `top-` banner per project, so that's the complete *public* set (the 2021–22 ones are reuse-quality). **gen1-rest** assets are the 2018 job archive — full multi-image batches exist but are lower-res phone photos (re-shoot for hero use). Client logos and brand marks are tiny 2018 PNGs — re-source as SVG. POS/decal/interior groups are out of scope.
