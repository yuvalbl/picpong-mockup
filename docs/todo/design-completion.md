# Design Completion Plan - finishing Phase 1 design & spec work

Covers the gap between the current mockup (`mockup-v5`, an identical fork of the audited `mockup-v4`) and the meeting-2 (2026-06-16) client refinement checklist. Audit date: 2026-07-04.

## Executive summary

Skim layer. The interaction architecture is essentially complete and higher-fidelity than the "UI-only/inert" framing implies (full lead-capture round-trip is wired and demonstrable). What is NOT finished divides into four buckets. Lead with the TODOs.

### Real assets (TODO - the largest bucket)
- [ ] TODO: Product/catalog photography - every catalog and product image is a hand-drawn SVG placeholder; shoot studio product photos.
- [ ] TODO: Hero video - `assets/video/hero.webm|mp4` do not exist; `assets/video/` dir is absent; currently falls back to a still poster.
- [ ] TODO: Journal video post - static poster + play icon only, no real clip.
- [ ] TODO: Social profile URLs - all `href="#"` placeholders across nav and footer on every page.
- [ ] TODO: Client logos - low-res 2018 PNGs; re-source as SVG (clean SVGs already sit unused in `assets/brand/logos/`).
- [ ] TODO: Project galleries - only one real hero per project; galleries reuse other projects' images as stand-ins; re-shoot/curate.
- [ ] TODO: Eco certification documents - to be attached before publication.
- [ ] TODO: WhatsApp Business number - Twilio sandbox placeholder still in place (OQ-2).

### Design gaps (TODO)
- [ ] IN PROGRESS (A1): Loud, CSR-targeted sustainability section with nature imagery - currently a quiet two-column split, not a primary eco hero; being implemented in v5 now.
- [ ] IN PROGRESS (A2): Service taxonomy rename "Exhibitions" -> "Conventions" (client wanted Events, Conventions, Trade show booths); being implemented in v5 now.
- [ ] TODO: Products eco module - no dedicated "Recycle / Resistance" paired-pillar block; eco messaging is scattered across badges + spec strip + sustainability split.

### Behavior decisions (TODO)
- [ ] TODO: Add-to-selection toast rule is inverted vs the ask - fix so confirmation shows on FIRST add only, then quiet accumulation (currently silent-first, toast-on-every-subsequent).
- [ ] TODO: Hebrew-first defaulting - every page hardcodes `lang="en" dir="ltr"` and the engine defaults to EN; a Hebrew-first product should default HE (or geo-detect).
- [ ] TODO: WhatsApp message enrichment - carries item titles only; decide whether to add per-item `/m/<id>` links (thumbnails not possible via wa.me text).
- [ ] TODO: Confirm display font - v5 uses Rubik, not the Fraunces named in CLAUDE.md (Rubik covers Hebrew; confirm intentional).

### Housekeeping (TODO, found during audit)
- [ ] TODO: Remove/gate the Dev menu so it does not ship in production markup (currently injected on every page).
- [ ] TODO: Fix stale code comments in `app.js` that call the "+" and fab "inert / reserved for PRD 2" when they are fully live.
- [ ] TODO: Reserve bottom scroll-padding on mobile so the always-expanded contact-fab does not float over page-bottom content.
- [ ] TODO: Derive catalog filter counts instead of hardcoding them (drift risk).

### Open questions (need Yuval + Kuki)
- [ ] OPEN (OQ-1): Form contact requirement - at-least-one Email/Phone (current) vs force-both vs Email-only.
- [ ] OPEN (OQ-2): Real WhatsApp Business number for launch (sandbox set).
- [ ] OPEN (OQ-3): Home has three "our work" surfaces; keep both the journal strip and the projects teaser, or move the teaser to the Projects page.

### Baseline that is already DONE (no action)
- [x] DONE-baseline: Per-media "+ / I want this" affordance on every image across all pages.
- [x] DONE-baseline: Multi-item accumulating quote list with thumbnail chips + live count badge (toast rule aside).
- [x] DONE-baseline: WhatsApp compose with correct "PicPong" opener (no "PingPong" anywhere).
- [x] DONE-baseline: Consolidated sales-rep email preview (per-item thumbnail + deep link) via Dev menu.
- [x] DONE-baseline: Quote form pre-bound to clicked item, thumbnail shown, email default + WhatsApp alternative.
- [x] DONE-baseline: Persistent floating contact + quote element on every page (mobile obscuring is a minor tweak).
- [x] DONE-baseline: Studio Journal feed (home strip + full dated `latest.html` with empty/loading states).
- [x] DONE-baseline: Featured Works section, separate from the journal (placement is OQ-3).
- [x] DONE-baseline: Catalog vs Projects visual differentiation (catalog light/quiet, projects dark/visual).
- [x] DONE-baseline: Per-project page - one main image + several independently attachable supporting media.
- [x] DONE-baseline: Full bilingual i18n engine + real RTL CSS (default-language decision aside).

## Details

Full depth. Reference paths are `mockup-v5` (identical fork of the audited `mockup-v4`).

### What is already DONE (the framing)

The interaction architecture is essentially complete and higher-fidelity than the repo's own "UI-only/inert" comments imply. The header comment in `js/app.js` (lines 1-10) and inline notes (L138, L802) describe the media "+" and the contact-fab as "inert (real behaviour = PRD 2)." This is stale. The full lead-capture module (PRD 2) is in fact implemented and wired (app.js lines 482-840). The entire lead-capture round-trip is live and demonstrable: per-media "+", accumulating selection, drawer form with thumbnail chips, WhatsApp compose, sales-rep email preview, shareable `#item-<id>` deep links with on-arrival spotlight, live project search + filters, native `<dialog>` lightbox, and the language switch + RTL. The remaining work is therefore mostly content (real assets), two design decisions, a couple of behavior tweaks, and three open questions - not core wiring.

### Meeting-2 checklist verdicts

**1. Per-media "+ / I want this" on every image - DONE.**
`.media__more` buttons with `data-media-id/title/thumb` appear on every media element across all pages: home hero video + slideshow + sticker + catalog/project/journal tiles + sustainability image (`index.html` L138, 163, 186, 285, 298, 313, 326, 365, 490-514, 547); catalog all 6 tiles (`catalog.html` L132-217); projects all 10 tiles (`projects.html` L105-168); project-detail hero + every gallery thumb (injected by `mediaMoreBtn()`, app.js L158-219); latest all 8 posts (`latest.html`); product main image + "pairs well with" tiles (`product.html` L73, 179-187). On hover/focus the circle expands into an "I want this / אני רוצה כזה" pill (app.js `enhanceMediaMore` L232-245).

**2. Multi-item accumulating quote list - DONE, but the toast rule is INVERTED vs the ask.**
Accumulation works: `selection[]` array, toggle add/remove, thumbnail chips in the drawer, live count badge on the fab (app.js L500-627). However the checklist wants "confirmation/toast on FIRST add only, not every add." Current behavior (app.js L814-824) is the opposite: the first add silently opens the drawer (no toast), and every subsequent add fires an "Added - N items" toast. If the intent is "one confirmation then quiet accumulation," this needs reworking. Remove-add also toasts "Removed."

**3. WhatsApp routing - PARTIAL. Opener is correct ("PicPong", no "PingPong").**
`buildWaText()` (app.js L739-751) composes: `"Hi PicPong, I'd like a quote on these items:"` / Hebrew `"היי PicPong, אשמח להצעת מחיר על הפריטים הבאים:"`, then a bulleted list of item titles, then name/phone. No "PingPong" anywhere in HTML/JS/CSS (grep clean). Gaps vs spec: the message carries item titles only - no per-item links and no thumbnail (wa.me text cannot carry an image, and the durable `/m/<id>` links are not injected into the WA body). Number is the Twilio sandbox `14155238886` (app.js L738), still a placeholder (OQ-2). The share-row WhatsApp buttons on product/project pages (numberless `wa.me/?text=`, L306) send page title + URL.

**4. Consolidated sales-rep email preview - DONE (as a spec/demo).**
`repEmailDemo()` (app.js L350-480) renders a full templated email in a dialog: From/To/Subject, contact block, message, and one row per item with thumbnail + a `picpong.biz/m/<id>` deep link. Opened via a floating "Dev" menu or `?dev` URL param. Seeds from the visitor's real last submit, else a sample lead. This is the strongest "spec-made-visible" artifact in the build.

**5. Quote form pre-bound to clicked item with thumbnail; email default + WhatsApp alt - DONE.**
The injected side drawer (app.js `buildDrawer` L531-588) hosts the shared 4-field form (Name/Email/Phone/Message), a chip row showing each selected item's thumbnail + title (`renderChips` L591-602), a primary "Send request" submit (email/mock default), and an "or message us on WhatsApp" alternative link (L554). Clicking a "+" pre-binds that item into the selection before opening.

**6. Persistent floating contact + quote on every page - DONE; mobile obscuring is a MINOR risk.**
`.contact-fab` is in the static markup of all six pages, fixed bottom-right with a live count badge (CSS L1238-1286). On mobile (`max-width:520px`) it only tightens padding and keeps the full "Request a quote" text label - it does not shrink to an icon, and no bottom scroll-padding is reserved on `<body>`, so the pill floats over page-bottom content. The lead drawer goes full-width on mobile (`width:100vw` at <=560px, CSS L1583), which is fine. Net: functional, but the always-expanded pill over unpadded content is exactly the "obscures content on mobile" edge to tighten.

**7. Studio Journal auto-updating feed - DONE (as static representation).**
Home has a `.latest-strip` teaser of 4 dated posts -> `latest.html` (`index.html` L266-337). `latest.html` is a full dated feed of 8 posts with day-level `<time>`, multi-line diary copy, a video post, plus content-state scaffolding: a `feed-empty` empty state (L90) and a commented-out skeleton-loading card (L95-99), and a build-note explaining the draft -> preview -> publish daily CMS pattern (L247). Feed content is static (no live CMS), as expected for a mockup.

**8. Featured Works as a SEPARATE curated section - DONE, but flagged for possible removal.**
Home has a distinct "Selected work / Trusted on the world's biggest show floors" projects teaser (`index.html` L480-521), separate from the journal strip. Note OQ-3 (still open) recommends moving this teaser off Home onto the Projects page precisely because it and the journal strip risk reading as "projects... and more projects." So this section exists but its placement is an unresolved design decision.

**9. Catalog vs Projects visual differentiation - DONE.**
Catalog is light/quiet: cream background, illustrated SVG board placeholders, sidebar facets, calm grid (`catalog.html`). Projects is dark/visual: `body.on-dark` + `background:var(--gallery)` dark, photographic collage grid, search field, filter chips (`projects.html` L29, 41). The two read as clearly different registers.

**10. Per-project: one main image + several independently-attachable supporting media - DONE.**
`renderProjectDetail()` (app.js L165-225) renders a lead hero image (its own "+", id `proj-<slug>-hero`) plus a compact gallery of the remaining images, each with its own "+" (`proj-<slug>-1..n`) and each lightbox-zoomable. King Solomon carries 10 images to prove it scales (app.js L86-90). This directly supports "a project may contain several booths, each quotable."

**11. Products section with eco messaging, placeholder vs real - PLACEHOLDER (by design, flagged).**
All catalog/product imagery is hand-drawn inline SVG board illustrations, not photos (`catalog.html` L130-215, `product.html` L71-78). Every such surface carries a visible cap: "Illustrated placeholders. Studio product photography to be shot for launch" (`catalog.html` L228, `index.html` L439, `product.html` L80). Eco badges exist ("100% recycled", "Reusable", "Ships flat", "Water-resistant"). There is no explicit "Recycle / Resistance" paired-pillar block as such - eco messaging is spread across badges + the spec strip + the sustainability section rather than a dedicated products-eco module.

**12. Loud/primary sustainability section (nature imagery, hi-tech CSR target) - PARTIAL / largely MISSING. IN PROGRESS in v5 (A1).**
Sustainability exists but is not "loud/primary." It is a standard two-column `.split` (text + one reused project photo `redefine-meat.jpg`) with a checklist (`index.html` L527-555), supported by the dark "X-Board by the numbers" spec strip (L448-463) and a kraft marquee. There is no dedicated prominent eco hero, no ocean/rainforest nature imagery, and no CSR-manager-targeted framing. Eco claims carry a "certification documents to be attached before publication" caveat (L542). This is the biggest content/design gap on the checklist relative to the stated goal, and is being implemented in v5 now.

**13. English service taxonomy - PARTIAL; still uses the disallowed "Exhibitions". IN PROGRESS in v5 (A2).**
Primary nav is section-based (Catalog / Projects / Latest / Sustainability / About / Contact), not a service taxonomy. The projects filter chips (`projects.html` L91-94) read "All work / Exhibitions / Events / Trade-show booths" and project tags read "Exhibition / Event / Booth." The client asked for "Events, Conventions, Trade show booths" - so "Exhibitions" should become "Conventions" (or be reconsidered), and "Conventions" is currently absent. Catalog facets are product-type categories (Counters / Stands / Shelving / Photocall walls / Gates & arches), which is a separate axis and fine. Being implemented in v5 now.

**14. Language Hebrew-first + English, RTL - PARTIAL. Full bilingual + RTL engine works, but default is EN, not Hebrew-first.**
The i18n engine is solid: `applyLang()` flips `<html lang/dir>`, swaps `[data-en]/[data-he]` text, placeholders, aria-labels, and re-localizes JS-rendered strings (slogan, slideshow, injected drawer) via a `picpong:langchange` event (app.js L25-72). Every page ships parallel Hebrew copy in `data-he`. RTL has real dedicated CSS (styles.css L1447-1587: logical-property flips, arrow mirroring, Hebrew font stack, drawer slide direction). Gaps: (a) every page hardcodes `<html lang="en" dir="ltr">` and `initLang()` defaults to EN unless localStorage says otherwise - a Hebrew-first product should default HE (geo-detect is explicitly left as a build-note, app.js L62); (b) the display font is Rubik, not the Fraunces named in the project CLAUDE.md - Rubik does cover Hebrew, so this is a reasonable deviation but worth confirming as intentional.

**15. Mobile polish - mostly solid; a few rough edges.**
Responsive grids, sticky sidebars, `prefers-reduced-motion` handling, and a full mobile menu are all present. Rough edges to note: the always-expanded contact-fab over unpadded page bottoms (item 6); heavy reliance on inline `style="..."` attributes throughout the HTML (dozens per page) which will complicate build-time maintenance; the Dev menu button also floats fixed and would ship unless gated.

**16. Placeholder images/assets needing real Picpong content - several, all flagged in-file.**
Product/catalog photography (all SVG illustrations, "to be shot for launch"); hero video (`assets/video/hero.webm|mp4` do not exist, `assets/video/` dir absent, falls back to a project still poster, `index.html` L148-169 build note); journal video post (static poster + play icon only, `latest.html` L138-140); social profile URLs (all `href="#"` placeholders); client logos (low-res 2018 PNGs in `assets/brand/clients/`; clean SVGs sit unused in `assets/brand/logos/`); project heroes (real 2021-22 archive photos but only one hero per project, galleries reuse other projects' images, copy admits "earlier entries to be re-shot," `projects.html` L176, `project-detail.html` L98); eco certification docs (to be attached, `index.html` L542); WhatsApp Business number (Twilio sandbox placeholder, OQ-2).

### The four buckets

**Bucket 1 - Real assets (largest).** Product/catalog studio photography; hero video file(s); journal video clip; SVG client logos; real per-project galleries; eco certification documents; social profile URLs; real WhatsApp Business number. All are flagged with visible build-notes in the files today.

**Bucket 2 - Design gaps.** A1 (in progress): a loud, CSR-manager-targeted sustainability section with nature imagery, replacing the current quiet split. A2 (in progress): service taxonomy rename "Exhibitions" -> "Conventions" so filters/tags read Events, Conventions, Trade show booths. Also open: a dedicated products eco module (Recycle / Resistance pillars) rather than scattered badges.

**Bucket 3 - Behavior decisions.** Fix the inverted add-to-selection toast rule (confirm on first add only). Decide Hebrew-first defaulting (default HE or geo-detect vs the current EN default). Decide WhatsApp message enrichment (add per-item `/m/<id>` links; thumbnails are not possible via wa.me text). Confirm the Rubik-vs-Fraunces font choice.

**Bucket 4 - Housekeeping found during audit.** Gate/remove the Dev menu from production markup. Correct the stale "inert" comments in `app.js`. Reserve mobile bottom scroll-padding under the contact-fab. Derive catalog filter counts instead of hardcoding them. Note the two parallel quote entry points (home `#start` "Tell us about your project" lane links to the inline `#contact` form, not the drawer). Note that `assets/doodles/pingpong.svg` exists as an (unused) filename - not a copy error.

### Open questions (need Yuval + Kuki)

- OQ-1 - Form contact requirement: whether "at least one of Email/Phone" (current rule, enforced at app.js L669 `contactRuleOK`) is right, vs forcing both, vs Email-only. Open.
- OQ-2 - WhatsApp number: prefill points at the Twilio sandbox (`WA_NUMBER` = `14155238886`); needs Picpong's real WhatsApp Business number. Open (sandbox set).
- OQ-3 - Home has three "our work" surfaces (logo marquee + journal strip + projects teaser); do we keep both the journal strip (b) and the projects teaser (c)? Assistant recommendation logged: move the projects teaser (c) to the Projects page, keep the journal strip (b) on Home reworked into a genuine dated diary register so it does not read as "projects again." Open.
