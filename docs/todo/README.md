# TODO - Picpong website, finishing Phase 1

> Index of the working plans for finishing the Phase-1 design/spec. Active working copy: **`mockup-v5/`** (forked from `mockup-v4` on 2026-07-04, after the 2026-06-16 client review). Context: `docs/human-review/meeting2-16-6-2026/meeting2-analysis.md`.

## Executive summary

The plans, one line each (open each file for the summary-first detail):

- [ ] [design-completion.md](design-completion.md) - what design/spec work is left to finish Phase 1 (the interaction architecture is already done; assets + 2 design gaps + a few decisions remain)
- [ ] [missing-ui-and-backoffice.md](missing-ui-and-backoffice.md) - client-facing gaps + the greenfield backoffice for 3 roles (Admin / Content Manager / Sales Manager)
- [ ] [accessibility-il-5568.md](accessibility-il-5568.md) - IS 5568 / WCAG 2.0 AA audit; 4 blockers, 5 major, plus the legally-required accessibility statement page
- [ ] [font-sizes.md](font-sizes.md) - font-size audit; one real iOS-zoom bug + a handful of sub-16px prose spots + a sub-12px cluster
- [ ] [palette-refinement.md](palette-refinement.md) - warm up the home page: demote pond blue from the hero, cut coral, enforce one-accent-per-section (color *cohesion*, not the contrast fix already in the a11y/font todos)

The implementation sequencing, the master execution plan, and the client-blocked decisions live below.

---

## Implementation sequencing (collision-safe order)

**Why this section exists:** the five plans above are NOT independent - several edit the same files, and some edit the same CSS rules. Running them in parallel or in the wrong order guarantees merge conflicts and rework. Collision hotspots:

- **`styles.css` `:root` tokens + shared component rules** are edited by THREE plans: palette-refinement (demote `--pond`, cut `--coral`), accessibility M1 (darken `--orange` / `--kraft-deep` / `--orange-deep` for contrast), font-sizes (type scale + form-input sizes). The `.eyebrow`, `.btn--brand`, and the on-dark text alphas are each touched by more than one plan.
- **Every page's `<html lang/dir>`** is changed by both accessibility (M4) and design-completion (B2). Do it once.
- **Every page's footer** gains links from both accessibility (statement page) and missing-ui (privacy/legal). Do it once.
- **`app.js`** is edited by design-completion (B1 toast, B4 cleanup) and accessibility (M2/M3 form aria, M5 live regions, un-nest buttons).

**Governing rule:** one owner per file at a time; batch overlapping concerns into a single pass; never run two agents on the same file concurrently. Partition by file/subsystem and sequence:

- [ ] **Phase 0 - Decisions (unblock).** Resolve D1-D6 with Kuki. They gate: A2 wording (D4), form rule (D1), home layout (D3), WhatsApp number (D2), sustainability intensity (D6), audience (D5). Do not implement a gated item before its decision. *[no code]*
- [ ] **Phase 1 - Styling pass** *(owner: `styles.css`, + one line in `projects.html`)*. ONE coordinated edit, in this internal order so shared rules are decided once: (a) palette-refinement sets the warm per-section accents (demote pond, cut coral) -> (b) accessibility M1 darkens those accents until they pass AA -> (c) font-sizes locks the type scale (eyebrow 11->12, prose spots ->16, form inputs unconditional 16px incl. `.proj-search input`). *Merges: palette-refinement + a11y-M1 + font-sizes.*
- [ ] **Phase 2 - Structural HTML pass** *(owner: all `*.html` + small structural CSS)*. Touch each page once: default `lang="he" dir="rtl"` (a11y M4 / B2); skip-link + `<main>` landmark (a11y B3); footer links (a11y B1 + missing-ui A-1/A-2); optional dash-sweep of Hebrew copy (mechanical, same files). Then create the new static pages `accessibility.html`, `privacy.html`, `404.html` (missing-ui MVP). Mobile-menu markup/aria here; its behavior in Phase 3.
- [ ] **Phase 3 - Behavior pass** *(owner: `app.js`, + fab rule in `styles.css`)*. After the DOM is settled: toast first-add-only (B1); form aria + required + live errors (a11y M2/M3); live regions on toast/success (M5); un-nest zoom buttons (a11y minor); mobile-menu focus trap + `aria-expanded` (a11y B4); mobile fab bottom-padding (B3); stale-comment fix + dev-menu gating (B4); form contact rule once D1 is set.
- [ ] **Phase 4 - Content / assets** *(owner: `index.html` + `assets/`)*. Low-risk, anytime after Phase 2: wire logo SVGs (C1); swap real photos/video/galleries as Kuki delivers (C2-C4).
- [ ] **Phase 5 - Backoffice** *(own application, file-isolated)*. The only track that shares no files with the marketing site, so it can run in parallel with Phases 1-4. Build the true-MVP subset only (daily journal editor + minimal leads inbox); buy auth/CRM off-the-shelf. See missing-ui PART B/C.

**Parallelism:** Phases 1 -> 2 -> 3 are sequential (they chain through shared files; 4 follows 2). Phase 5 is the only safely-parallel track. Phase 0 runs alongside everything but blocks its gated items.

---

## The finish-the-design plan (A / B / C / D)

Grounded in the three audits above. "A" is being implemented now in `mockup-v5`.

### A. Design gaps - executable now (IN PROGRESS)
- [ ] A1 - Build a loud, primary sustainability section (nature imagery, CSR-manager framing, "no PVC / no vinyl / no single-use plastic"), replacing the modest `index.html` split. *In progress in v5.*
- [ ] A2 - Fix the English service taxonomy: "Exhibitions" -> **Events / Conventions / Trade show booths** in `projects.html` chips + tile tags + filter logic. *In progress in v5.*

### B. Behavior / polish - executable now
- [ ] B1 - Flip the toast rule: confirm on the first add, then accumulate quietly (currently inverted, `app.js` ~L814).
- [ ] B2 - Default the site to Hebrew RTL (pages hardcode `lang="en" dir="ltr"`; `initLang()` defaults EN).
- [ ] B3 - Stop the floating quote pill obscuring content on mobile (reserve bottom scroll-padding, or shrink to an icon).
- [ ] B4 - Make it a clean spec deliverable: fix the stale "inert / UI-only" comments in `app.js` (L1-10); gate the Dev menu behind `?dev`/env so it can't ship.

### C. Assets to gather (drive from Kuki)
- [ ] C1 - Quick self-serve win: wire the real client-logo SVGs already in `assets/brand/logos/` into the home marquee.
- [ ] C2 - From Kuki: product/catalog photography (replacing SVG placeholders).
- [ ] C3 - From Kuki: hero video + journal video clip (files don't exist yet).
- [ ] C4 - From Kuki: full multi-image project galleries; eco certification docs; real social URLs.

### D. Decisions blocked on Kuki (get these before over-polishing)
- [ ] D1 - Form contact rule: email-or-phone vs force both vs email-only (OQ-1).
- [ ] D2 - Real WhatsApp Business number (still the Twilio sandbox) (OQ-2).
- [ ] D3 - Home layout: keep both journal strip + projects teaser, or move the teaser to the Projects page (OQ-3).
- [ ] D4 - Final taxonomy wording (drives A2) (meeting Q-B).
- [ ] D5 - Which audience segment leads the core messaging (meeting Q-A).
- [ ] D6 - How loud the sustainability message should be (drives A1) (meeting Q-F).

---

## Strategic note

The client balked at the Phase-2 build price (100-200h). Finishing the design is the cheap half (~12.5h left) and is the best lever to either re-justify the build price or cleanly trim Phase-2 scope. Get the section-D answers before sinking hours into A/B/C, so the polish isn't spent on choices Kuki may overturn. For backoffice scope, see the PART C recommendation in [missing-ui-and-backoffice.md](missing-ui-and-backoffice.md): build only the daily journal editor + a minimal leads inbox custom; buy auth/CRM off-the-shelf.
