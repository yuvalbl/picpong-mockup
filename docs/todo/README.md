# TODO - Picpong website, finishing Phase 1

> Index of the working plans for finishing the Phase-1 design/spec. Active working copy: **`mockup-v5/`** (forked from `mockup-v4` on 2026-07-04, after the 2026-06-16 client review). Context: `docs/human-review/meeting2-16-6-2026/meeting2-analysis.md`.

## Execution log (2026-07-05)

The five plans below were executed against `mockup-v5` by an orchestrated agent team on 2026-07-05, across five commits on `main`: `a03e742` (palette warmth, landed a day earlier as part of the same pass), `901e9f4` (a11y contrast + font-size floors), `b4b491e` (structural HTML: RTL default, skip links, legal pages, dash sweep), `d263445` (backoffice UI mockup), `b14c7b4` (behavior pass: HE-first default, live regions, motion pause, focus trap). Phases 1-3 passed their acceptance gates. Phase 4 (assets) is partially blocked: C1 (wiring the existing logo SVGs) was attempted and reverted - the SVGs turned out to be corrupt/fake logos, see `../prd/open-questions.md` OQ-7; C2-C4 are still waiting on Kuki. Phase 5 (backoffice) shipped, but as a UI mockup rather than a real P1 build, per an owner decision made the same day. Remaining open: Kuki-owned assets (C1-C4) and decisions D1-D6 - D1/D2/D3 now have owner interim positions recorded in `../prd/open-questions.md`; D4-D6 are still pending Kuki.

## Executive summary

The plans, one line each (open each file for the summary-first detail):

- [x] [design-completion.md](design-completion.md) - what design/spec work is left to finish Phase 1 (the interaction architecture is already done; the two design gaps A1/A2 are now implemented in v5 pending D6/D4 confirmation; real assets + a few decisions remain) - **2026-07-05: behavior + housekeeping TODOs done; real-asset TODOs and the three open questions remain.**
- [x] [missing-ui-and-backoffice.md](missing-ui-and-backoffice.md) - client-facing gaps + the greenfield backoffice for 3 roles (Admin / Content Manager / Sales Manager) - **2026-07-05: client-facing MVP (A-1/A-2/A-6) done; backoffice built as a UI mockup, not the real P1/P3 build.**
- [x] [accessibility-il-5568.md](accessibility-il-5568.md) - IS 5568 / WCAG 2.0 AA audit; 4 blockers, 5 major, plus the legally-required accessibility statement page - **2026-07-05: all 10 items done, gate passed.**
- [x] [font-sizes.md](font-sizes.md) - font-size audit; one real iOS-zoom bug + a handful of sub-16px prose spots + a sub-12px cluster - **2026-07-05: all items done, gate passed.**
- [x] [palette-refinement.md](palette-refinement.md) - warm up the home page: KEEP the hero pond (the fish's water, bookended with the sustainability ocean), warm funnel lane 02, cut coral, one-accent-per-section (color *cohesion*, not the contrast fix already in the a11y/font todos) - **2026-07-05: done, gate passed.**

The implementation sequencing, the master execution plan, and the client-blocked decisions live below.

---

## Implementation sequencing (collision-safe order)

**Why this section exists:** the five plans above are NOT independent - several edit the same files, and some edit the same CSS rules. Running them in parallel or in the wrong order guarantees merge conflicts and rework. Collision hotspots:

- **`styles.css` `:root` tokens + shared component rules** are edited by THREE plans: palette-refinement (warm lane-02 `--pond`->orange + cut `--coral`; hero `panel--pond` kept), accessibility M1 (darken `--orange` / `--kraft-deep` / `--orange-deep` for contrast), font-sizes (type scale + form-input sizes). The `.eyebrow`, `.btn--brand`, and the on-dark text alphas are each touched by more than one plan.
- **Every page's `<html lang/dir>`** is changed by both accessibility (M4) and design-completion (B2). Do it once.
- **Every page's footer** gains links from both accessibility (statement page) and missing-ui (privacy/legal). Do it once.
- **`app.js`** is edited by design-completion (DC-B1 toast, DC-B4 cleanup) and accessibility (a11y-M2/M3 form aria, a11y-M5 live regions, un-nest buttons).

**Label convention (avoid B* collisions).** Two of the audit docs use the label `B1..B4` for DIFFERENT things, so this README qualifies every reference:
- `a11y-B*` = accessibility-il-5568.md: a11y-B1 accessibility statement page, a11y-B2 pause/stop auto-motion, a11y-B3 skip-link + `<main>`, a11y-B4 mobile menu.
- `DC-B*` = design-completion.md / section B below: DC-B1 toast rule, DC-B2 Hebrew-RTL default, DC-B3 mobile fab, DC-B4 dev-menu / stale comments.

Bare `B1`/`B3`/`B4` is ambiguous - always write the prefix.

**Governing rule:** one owner per file at a time; batch overlapping concerns into a single pass; never run two agents on the same file concurrently. Partition by file/subsystem and sequence:

- [ ] **Phase 0 - Decisions (unblock).** Resolve D1-D6 with Kuki. They gate: A2 wording (D4), form rule (D1), home layout (D3), WhatsApp number (D2), sustainability intensity (D6), audience (D5). Do not implement a gated item before its decision. NOTE: A1 (sustainability section) and A2 (taxonomy) were already implemented in v5 ahead of their gating decisions (D6 / D4) - a deliberate get-ahead-of-decision, not an error. They are flagged "implemented, pending confirmation" (see section A); D6/D4 may still adjust intensity / final wording. Also record here D1's chosen contact rule, since it must be applied to two surfaces (see D1). *[no code]*
- [x] **Phase 1 - Styling pass** *(owner: `css/styles.css`, + inline `style=""` contrast spots in `projects.html`, `project-detail.html`, `product.html`)*. ONE coordinated edit, in this internal order so shared rules are decided once: (a) palette-refinement sets the warm per-section accents (warm lane-02 pond->orange, cut coral; keep the hero pond as water depiction) -> (b) accessibility a11y-M1 darkens those accents until they pass AA -> (c) font-sizes locks the type scale (eyebrow 11->12, prose spots ->16, form inputs unconditional 16px incl. `.proj-search input`). The inline-style contrast spots belong to THIS phase, not just `styles.css`: the white-on-`#2A9BD0` "Water-resistant" badge (`.tile__badge` inline `style` in `product.html`), and the on-dark `rgba(247,247,241,0.5/0.55)` meta/breadcrumb text (inline `style` on `.meta` / `.crumb` in `projects.html` and `project-detail.html`). *Merges: palette-refinement + a11y-M1 + font-sizes.*

  **Authoritative shared end-states.** Three rules are touched by more than one plan (palette, a11y-M1, font-sizes each state a value). Decide them HERE, once; font-sizes / accessibility / palette all defer to these:
  - **`--orange` (the accent):** KEEP the global `--orange` token at `#E67A2F` - it is THE page accent, do NOT darken it. Fix white-on-orange contrast at the button ONLY: either `.btn--brand` switches its text to ink, or introduce a scoped `--orange-btn: #C85A16` used by `.btn--brand` (and the `.btn--*:hover` states). Target: white text on the button field >= 4.5:1 (button labels are 15px/600 = normal text, so 4.5:1, not the 3:1 large-text allowance).
  - **`.eyebrow`:** size `--t-eyebrow: 0.75rem` (12px). Change the base `.eyebrow` rule's color (currently `var(--kraft-deep)`) to `#8a5a2a` on cream, target >= 4.5:1 - but do NOT change the `--kraft-deep` token itself (it stays the cardboard neutral used by `.marquee--kraft`, `.lane__num`, `.tile__cat`, etc.). Re-verify each override still passes AA after the change: `.on-dark .eyebrow` (-> `--orange-bright`) and the `.panel--orange/ink/kraft/pond .eyebrow` colors.
  - **on-dark muted text alphas:** raise the `rgba(247,247,241,0.5)` / `0.55` meta, breadcrumb, and `.proj-search input::placeholder` text to alpha >= 0.7 over `--gallery` `#2b2b2b` / `--ink`. Target >= 4.5:1.
- [x] **Phase 2 - Structural HTML pass** *(owner: all `*.html` + small structural CSS)*. Touch each page once: default `<html lang="he" dir="rtl">` (a11y-M4 / DC-B2) - NOTE this markup change alone reverts to English on load, because `initLang()` still defaults EN; HE-first is incomplete and visibly broken until the Phase 3 `initLang()` change ships with it; skip-link + `<main>` landmark (a11y-B3); footer links (a11y-B1 accessibility statement + missing-ui A-1/A-2 privacy/legal); MANDATORY site-wide dash-sweep (see below). Then create the new static pages `accessibility.html`, `privacy.html`, `404.html` (missing-ui MVP). Mobile-menu markup/aria here; its behavior in Phase 3.

  **Dash-sweep (MANDATORY, not optional; site-wide, not Hebrew-only).** The global no-em-dash rule bans em/en dashes (`—` `–`) in all output. This is a required Phase 2 sweep across: English AND Hebrew HTML copy, `app.js` strings (e.g. the `"Added — "` toast, the share/copy strings, the rep-email demo strings), and CSS comments - roughly 115 lines in total (`styles.css` ~53, `app.js` ~24, the six HTML files ~38). Replace each with a plain hyphen (spaced when it joins clauses). Verification: `grep -rn "—\|–" mockup-v5/*.html mockup-v5/css/styles.css mockup-v5/js/app.js` returns zero.
- [x] **Phase 3 - Behavior pass** *(owner: `app.js`, + fab rule in `styles.css`)*. After the DOM is settled: toast first-add-only (DC-B1); form aria + required + live errors (a11y-M2/M3); live regions on toast/success (a11y-M5); pause/stop for auto-motion (a11y-B2, see below); un-nest zoom buttons (a11y minor); mobile-menu focus trap + `aria-expanded` (a11y-B4); mobile fab bottom-padding (DC-B3); stale-comment fix + dev-menu gating (DC-B4); change the `initLang()` default to Hebrew or geo-detect (currently `applyLang(stored === "he" ? "he" : "en")`) so HE-first actually holds on load - this completes DC-B2 / a11y-M4 begun in Phase 2; apply D1's chosen contact rule to BOTH the inline `#contact` form and the drawer once D1 is set.

  **a11y-B2 - pause/stop auto-motion (WCAG 2.2.2).** This blocker was previously in no phase; it lands HERE. Touch points: the text marquee and logo marquee need pause on `:focus-within` (they pause on `:hover` only today); the hero slideshow `setInterval` (the `SLIDE_MS` loop, `app.js` ~line 969) and the rotating slogan `setInterval` (`app.js` ~line 1053) need a keyboard-reachable pause control (or auto-stop after 5s); the hero video needs a visible pause/`controls` toggle.
- [ ] **Phase 4 - Content / assets** *(owner: `index.html` + `assets/`)*. Low-risk, anytime after Phase 2: wire logo SVGs (C1); swap real photos/video/galleries as Kuki delivers (C2-C4). **2026-07-05: C1 attempted - blocked. The 8 SVGs in `assets/brand/logos/` turned out to be corrupt/fake logos (7 of 8 have wrong letterforms), so wiring them was reverted rather than shipped; see `../prd/open-questions.md` OQ-7. C2-C4 still with Kuki.**
- [x] **Phase 5 - Backoffice** *(own application, file-isolated)*. The only track that shares no files with the marketing site, so it can run in parallel with Phases 1-4. Build the true-MVP subset only (daily journal editor + minimal leads inbox); buy auth/CRM off-the-shelf. See missing-ui PART B/C. **2026-07-05: built as a UI mockup in `mockup-v5/backoffice/` per owner decision the same day (full MVP screen list, not just the true-MVP subset; see missing-ui-and-backoffice.md).**

**Parallelism:** Phases 1 -> 2 -> 3 are sequential (they chain through shared files; 4 follows 2). Phase 5 is the only safely-parallel track. Phase 0 runs alongside everything but blocks its gated items.

### Per-phase verification (acceptance gate)

No phase is "done" until its gate passes. One row per phase.

| Phase | Acceptance gate |
|---|---|
| 0 | Each of D1-D6 has a recorded one-line answer in `docs/prd/open-questions.md` before any gated item is implemented. |
| 1 | For each pair - `.btn--brand`/white, `.eyebrow`/cream, on-dark 0.5-alpha text, `--orange-deep` link, `.placeholder-cap`, the pond "Water-resistant" badge - compute and record the post-change contrast ratio and assert >= 4.5:1 (>= 3:1 for large text). `grep` proves the form-input 16px rule is unconditional (no longer inside `@media (max-width:600px)`) and includes `.proj-search input`. `grep` for `--coral` on the home flow returns zero; `panel--pond` appears on exactly one home-flow element - the hero headline tile (the deliberate fish-pond) - and NOT on the lane-02 funnel panel. **Passed 2026-07-05.** |
| 2 | Each page has exactly one `<main>` and a skip link as the first focusable element. `grep -L 'lang="he" dir="rtl"' *.html` is empty. Every footer links the accessibility + privacy pages. `accessibility.html` / `privacy.html` / `404.html` exist and are linked. `grep` for em/en dashes returns zero. **Passed 2026-07-05.** |
| 3 | Toast fires on first add only. Closed mobile menu is `inert` (Tab skips it), traps focus when open, `aria-expanded` toggles, focus returns on close. Toast + success panel are `role="status" aria-live="polite"`. Keyboard pause stops ALL auto-motion. Invalid field announces its reason (`aria-describedby` + `role="alert"`). Dev menu gated behind `?dev`. `initLang()` default is Hebrew. **Passed 2026-07-05.** |
| 4 | `assets/video/hero.{webm,mp4}` exist. Catalog/product images are real `<img>`, not inline SVG. Logos are real SVGs. No social `href="#"` remains. **Not passed - blocked 2026-07-05: the logo SVGs are corrupt/fake (C1 reverted); C2-C4 (photos/video/galleries/social) still with Kuki.** |
| 5 | Journal editor round-trips a HE+EN post: draft -> preview -> publish. Leads inbox lists a lead with item thumbnails + working deep link + status + rep assignment. Off-the-shelf auth wired. **Passed 2026-07-05 - verified in browser; auth is mock per mockup scope (any credentials, role picker), not off-the-shelf auth.** |

---

## The finish-the-design plan (A / B / C / D)

Grounded in the three audits above. "A" is now implemented in `mockup-v5` (pending decision confirmation, see below); B/C/D remain.

### A. Design gaps - IMPLEMENTED in v5, pending decision confirmation
Both A1 and A2 are DONE in the code, built ahead of their gating decisions (a deliberate get-ahead-of-decision, see Phase 0). They are flagged "implemented, pending confirmation" rather than final, because D6 / D4 may still adjust them.
- [x] A1 - Loud, primary sustainability section (nature imagery, CSR-manager framing, "no PVC / no vinyl / no single-use plastic") replacing the modest `index.html` split: **implemented in v5. Pending confirmation of D6 (sustainability intensity) + the real nature-photo asset** (the section currently uses a placeholder image).
- [x] A2 - English service taxonomy fixed: the `projects.html` filter chips + `data-cat` tags + filter logic now read **Conventions / Events / Trade show booths** (`data-cat="conventions|events|booths"`); the old "Exhibitions" taxonomy is gone (zero "Exhibition" remains in the chips/tags/filter). **Implemented in v5. Pending confirmation of D4 (final taxonomy wording).** (Note: "exhibition" still appears as a plain common noun in some body copy, e.g. "exhibition stands" - that is prose, not the taxonomy, and is out of A2's scope.)

### B. Behavior / polish - executable now
Labelled `DC-B*` (design-completion) to avoid collision with the a11y doc's `B*` - see the Label convention in the sequencing section.
- [x] DC-B1 - Flip the toast rule: confirm on the first add, then accumulate quietly (currently inverted; the toast fires in the `.media__more` add handler, the `t("Added — ", ...)` call in `app.js`). **Done 2026-07-05: toast is now first-add-only, singular bilingual copy.**
- [x] DC-B2 - Default the site to Hebrew RTL. Pages hardcode `<html lang="en" dir="ltr">` and `initLang()` defaults EN (`applyLang(stored === "he" ? "he" : "en")`). Two-part: the markup `lang/dir` flip is Phase 2, the `initLang()` default is Phase 3 - the markup change alone reverts on load, so both must ship together. **Done 2026-07-05: both parts shipped together; `initLang()` defaults Hebrew.**
- [x] DC-B3 - Stop the floating quote pill obscuring content on mobile (reserve bottom scroll-padding, or shrink to an icon). **Done 2026-07-05: mobile fab bottom padding reserved.**
- [x] DC-B4 - Make it a clean spec deliverable: fix the stale "inert / UI-only" comments in the `app.js` file-header block; gate the Dev menu behind `?dev`/env so it can't ship. **Done 2026-07-05: stale comments fixed; dev menu gated behind `?dev` / `localStorage picpong:dev`.**

### C. Assets to gather (drive from Kuki)
- [ ] C1 - Quick self-serve win: wire the real client-logo SVGs already in `assets/brand/logos/` into the home marquee. **Attempted 2026-07-05, blocked: the 8 SVGs turned out to be corrupt/fake logos (7 of 8 have wrong letterforms - e.g. `wix.svg` renders "VIX", `amdocs.svg` is an unrelated Mastercard-style mark; only `landa.svg` is correct). Wiring was reverted rather than shipping fakes. Also surfaced: the home marquee roster and the footer "Trusted by" roster are two different, unrelated client lists - Kuki must confirm the canonical roster before this is re-attempted with real assets. See `../prd/open-questions.md` OQ-7.**
- [ ] C2 - From Kuki: product/catalog photography (replacing SVG placeholders).
- [ ] C3 - From Kuki: hero video + journal video clip (files don't exist yet).
- [ ] C4 - From Kuki: full multi-image project galleries; eco certification docs; real social URLs.

### D. Decisions blocked on Kuki (get these before over-polishing)
- [ ] D1 - Form contact rule: email-or-phone vs force both vs email-only (OQ-1). RECONCILIATION REQUIRED: the two lead surfaces disagree today - the inline `#contact` form marks its email input `required` (email mandatory, `#qe` in `index.html`), while the drawer JS `contactRuleOK` allows email OR phone (`return !!(v.email || v.phone)` in `app.js`). Whatever rule D1 picks MUST be applied to BOTH surfaces; add "update both `#contact` and the drawer" to D1's acceptance. **2026-07-05: owner decision - skipped for now, both surfaces keep their current, distinct rules; each now visibly states its own rule (a11y-M3). Still open pending Kuki; see OQ-1.**
- [ ] D2 - Real WhatsApp Business number (still the Twilio sandbox) (OQ-2). **2026-07-05: owner decision - keep the Twilio sandbox for now; the number is now also editable in the backoffice mockup's Admin settings screen. Still open pending Kuki; see OQ-2.**
- [ ] D3 - Home layout: keep both journal strip + projects teaser, or move the teaser to the Projects page (OQ-3). **2026-07-05: owner decision - leave the home layout as-is for now, for Kuki to review. Still open; see OQ-3.**
- [ ] D4 - Final taxonomy wording (drives A2) (meeting Q-B). Pending Kuki confirmation; A2 ships as-built in the meantime.
- [ ] D5 - Which audience segment leads the core messaging (meeting Q-A). Untouched, still open.
- [ ] D6 - How loud the sustainability message should be (drives A1) (meeting Q-F). Pending Kuki confirmation; A1 ships as-built in the meantime.

---

## Strategic note

The client balked at the **Phase-1 (lead-gen) build price** (100-200h). *[Phase vocabulary: P1 = the lead-gen catalog site we build now, P2 = commerce, P3 = backoffice/portal — the product roadmap, not `redesign-plan.md`'s process phases; see `../ia/sitemap.md` phasing note.]* Finishing the design is the cheap half (~12.5h left) and is the best lever to either re-justify the build price or cleanly trim P1 scope. Get the section-D answers before sinking hours into A/B/C, so the polish isn't spent on choices Kuki may overturn. **Backoffice (owner decision 2026-07-05): NOT in P1** — leads are delivered by templated email / WhatsApp (`prd/03` L-6), no rep-side portal; the leads inbox + journal editor + auth/CRM move to P3. See [missing-ui-and-backoffice.md](missing-ui-and-backoffice.md). *(Later the same day, a separate owner decision had a backoffice UI mockup built at `mockup-v5/backoffice/` - a sales-support/spec artifact reached only by direct URL, with mock auth and localStorage demo data. It does not change the P1 build scope above: production leads still go by templated email/WhatsApp, and a real P3 build with off-the-shelf auth/CRM is unaffected.)*
