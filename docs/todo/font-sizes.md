# Font-size audit and fix plan

Covers every text font-size in mockup-v5 (an identical fork of the audited mockup-v4): the type-scale tokens, all six page HTML files (including inline styles), and the shared CSS/JS. Verdicts against a >=16px floor for reading/form text and a >=12px floor for supporting text. Date: 2026-07-04.

> Line-number caveat: this doc predates the v5 code edits. A ~47-line sustainability block was inserted in `styles.css` around line 485, so every `styles.css:###` below ~485 has drifted +47 (e.g. `.qf input` is now 549, `.placeholder-cap` 559). Locate rules by their selector via `grep`, not by the raw line number in the enumeration table. The `.eyebrow` size + color end-state is pinned authoritatively in README Phase 1 - apply that value.

## Executive summary

**All items below done, gate passed 2026-07-05** (see `../todo/README.md` Phase 1 gate):

- [x] BUG: `.proj-search input` (the inline `<style>` rule in `projects.html`) is a real `<input>` at 15px with NO mobile 16px override, so iOS Safari zooms on focus (every other form field got the fix, this one was missed).
- [x] Make the form-input 16px rule global, not gated behind the `@media (max-width:600px)` block (the `.field input, .qf input, .qf select, .qf textarea { font-size: 16px }` rule): tablets/narrow desktops are still WebKit and still zoom. Add `.proj-search input` to the selector list.
- [x] Prose below 16px: raise `.pdp__quote p` to >=16px.
- [x] Prose below 16px: raise `.lead-drawer__intro` to >=16px.
- [x] Prose below 16px: raise `.feed-card__lines` (14.72px) and `.feed-card--compact .feed-card__lines` (13.76px) to >=16px.
- [x] Prose below 16px: raise `.repmail__contact` and `.repmail__item-title` to >=16px.
- [x] Prose below 16px: raise `.spec-table td` PDP spec values to 16px or explicitly re-scope as caption data.
- [x] Low-contrast + too-small: `.eyebrow` 11px in `--kraft-deep` on cream (approx 3.4:1, fails AA) is used site-wide; raise to >=12px and darken color - use the pinned end-state in README Phase 1 (`--t-eyebrow: 0.75rem`, `.eyebrow` color `#8a5a2a`, `--kraft-deep` token unchanged).
- [x] Low-contrast + too-small: `.repmail__badge` 11.52px white-on-orange (approx 2.9:1, fails AA); bump size and/or use `--orange-deep`.
- [x] Sub-12px cluster to raise to a 12px floor: `.feed-card__date` 11.84px, `.spotlight-tag` 11.52px, `.contact-fab__badge` 11.52px, `.ribbon` 11px, `.tile__badge` 11px, `.project__client` 11px over photo, `.sticker text` 11px, `.feed-card__videotag` 10.88px, `.slideshow .ctile__card-m` 10.56px.
- [x] Mobile collage title `.slideshow .ctile__card-k` shrinks to 13.76px: it is a title, keep it near 15px, not caption size.
- [x] `.qf-error` 13px red: verify contrast; error text is high-stakes, consider 14-16px.
- [x] Optional conversion win: bump primary CTAs `.btn` and `.contact-fab` from 15px to 16px.

## Details

### Root base (rem conversion)

`html` sets no explicit `font-size` (styles.css:56 has only `scroll-behavior` / `-webkit-text-size-adjust`), and `:root` (styles.css:7-53) defines color / type-scale / layout tokens but no root px override either. So the browser default 1rem = 16px is the base used for every rem/em conversion below.

### Type-scale tokens (`:root`, styles.css:29-39)

| token | value | computed px | role |
|---|---|---|---|
| `--t-display` | `clamp(2.7rem,6.4vw,5.25rem)` | 43.2-84px | hero display heading |
| `--t-h1` | `clamp(2.4rem,5.4vw,4.25rem)` | 38.4-68px | h1 |
| `--t-h2` | `clamp(1.9rem,4.2vw,3.25rem)` | 30.4-52px | h2 |
| `--t-h3` | `clamp(1.4rem,2.6vw,2.125rem)` | 22.4-34px | h3 |
| `--t-h4` | `clamp(1.15rem,1.8vw,1.5rem)` | 18.4-24px | h4 |
| `--t-lead` | `1.125rem` | 18px | lead paragraph |
| `--t-body` | `1rem` | 16px | body text (comment: "comfortable reading floor") |
| `--t-ui` | `0.9375rem` | 15px | comment "(was 14px)" |
| `--t-meta` | `0.8125rem` | 13px | comment "captions (was 12px)" |
| `--t-eyebrow` | `0.6875rem` | 11px | comment "legit tiny eyebrow" |

Mobile override in the `@media (max-width:600px)` block: `--t-display` becomes `clamp(2.9rem,12vw,3.6rem)` (46.4-57.6px), `.lead` drops to `1.08rem` (17.28px, still >=16), and `.field input, .qf input, .qf select, .qf textarea` get forced to `16px` to stop iOS auto-zoom. That fix is narrower than the actual set of form fields in the codebase (see enumeration).

Headings / display / lead are all fine by any standard. The real risk lives in `--t-ui` (15px) and everything smaller, wherever it lands on body/list/reading text or on a real `<input>`.

### Full enumeration

Legend: OK = meets its category floor; too-small-body = reading/paragraph/list/form text <16px; too-small-support = caption/meta/badge <12px; borderline = 12-15.9px on something content-like, or a UI label under 16px.

| px | usage / component | file:line | verdict | fix |
|---|---|---|---|---|
| 16 | `body` base text | styles.css:63 | OK | - |
| 18 | `.lead` | styles.css:112 | OK | - |
| 18 | `.checklist li` (list items) | styles.css:480 | OK | - |
| 18 | `.acc__btn` (accordion header) | styles.css:605 | OK | - |
| 18 | `.lead-success__msg` | styles.css:1578 | OK | - |
| 18 (fallback 16.8) | `.search-empty` (`var(--t-lead,1.05rem)`) | styles.css:1599 | OK | - |
| 16 | `.footer__story` | styles.css:525 | OK | - |
| 16 | `.footer__col h4` | styles.css:526 | OK | - |
| 16 | `.repmail__hello` (email-preview greeting) | styles.css:1696 | OK | - |
| 15 | `.btn` (all buttons/CTAs incl. quote/enquiry) | styles.css:172 | borderline | UI label; bump primary CTAs to 16px |
| 15 | `.nav__links a` (desktop nav) | styles.css:243 | borderline | 14-16px common for nav; acceptable |
| 15 | `.footer__col a` (footer links) | styles.css:528 | borderline | same as nav |
| 15 | `.chip` (project filter chips) | styles.css:460 | borderline | UI control label |
| 15 | `.spec__label` (spec-strip captions) | styles.css:413 | OK (caption) | - |
| 15 | `.field input` (newsletter email) | styles.css:490 | too-small-body (form input) | only fixed to 16px under 600px (css:644); raise base to 16px |
| 15 | `.qf input, .qf select, .qf textarea` (quote + lead-drawer form) | styles.css:502 | too-small-body (form input) | 16px only applied under the 600px query; make unconditional |
| 15 | `.proj-search input` (projects search field) | projects.html:33 | too-small-body (form input), NOT covered by the mobile 16px fix at all | add to the 16px rule / set 16px unconditionally |
| 15 | `.qf-chip` (funnel chip buttons) | styles.css:507 | borderline | UI control |
| 15 | `.opt` (PDP variant/swatch buttons) | styles.css:587 | borderline | UI control |
| 15 | `.pdp__quote p` (PDP quote paragraph) | styles.css:598 | too-small-body | real prose; raise to >=16px |
| 15 | `.spec-table td` (PDP spec values) | styles.css:611 | too-small-body/borderline | tabular reading content; raise to 16px or scope as caption |
| 15 | `.facet button` (shop/catalog filters) | styles.css:624 | borderline | UI control |
| 15 | `.shop__count` ("X products") | styles.css:630 | OK (caption) | - |
| 15 | `.media__more__label` (hover "more info") | styles.css:1207 | borderline | UI micro-label |
| 15 | `.contact-fab` (floating CTA label) | styles.css:1253 | borderline | primary CTA; recommend 16px |
| 15 | `.tile__browse-cue` (catalog "browse" cue) | styles.css:1357 | borderline | UI label |
| 15 | `.lead-drawer__intro` (drawer intro copy) | styles.css:1531 | too-small-body | real intro sentence; raise to >=16px |
| 15 | `.lead-chip__t` (selected-item chip label) | styles.css:1543 | borderline | short label, acceptable |
| 15 | `.lead-keep` / `.lead-wa` (drawer action links) | styles.css:1557, 1564 | borderline | link/button label |
| 13 | `.meta` (generic caption utility) | styles.css:114 | OK | - |
| 13 | `.btn--sm` | styles.css:182 | OK (small button) | - |
| 13 | `.hero__media-tag` (photo tag chip) | styles.css:291 | OK | - |
| 13 | `.qf label` (form field labels) | styles.css:500 | OK | - |
| 13 | `.placeholder-cap` | styles.css:511 | OK | - |
| 13 | `.footer__bottom` (copyright row) | styles.css:534 | OK | - |
| 13 | `.crumb` (breadcrumb) | styles.css:560 | OK | - |
| 13 | `.optgroup__label` | styles.css:584 | OK | - |
| 13 | `.facet h4` | styles.css:622 | OK | - |
| 13 | `.ctile__card-m` (collage-card meta) | styles.css:730 | OK | - |
| 13 | `.ctile__live` (video "live" tag) | styles.css:737 | OK | - |
| 13 | `.contact-fab` @520px (padding-shrunk) | styles.css:1285 | OK | - |
| 13 | `.lang-switch [data-lang]` | styles.css:1302 | OK | - |
| 13 | `.qf-error` (form validation message) | styles.css:1570 | borderline + likely low-contrast | `#c0392b` red at 13px; check contrast, consider 14-16px |
| 12.8 | `.pdp__price small` | styles.css:581 | OK | - |
| 12.8 | `.lightbox__share` | styles.css:1662 | OK | - |
| 12.8 | `.repmail__note`, `.repmail__seed` | styles.css:1722, 1723 | OK (at floor) | - |
| 12.48 | `.devmenu__btn` (dev-only) | styles.css:1729 | OK (not customer-facing) | - |
| 12.16 | `.repmail__item-link code` | styles.css:1717 | OK (at floor) | - |
| 11.84 | `.feed-card__date` | styles.css:1814 | too-small-support | bump to >=12px |
| 11.52 | `.contact-fab__badge` (item-count) | styles.css:1274 | too-small-support | acceptable only as 1-2 digit numeral; watch legibility |
| 11.52 | `.spotlight-tag` | styles.css:1626 | too-small-support | bump |
| 11.52 | `.repmail__badge` | styles.css:1684 | too-small-support + low-contrast (white on `--orange` approx 2.9:1, fails AA) | bump size and/or use `--orange-deep` |
| 11 | `.eyebrow` (hero, sections, site-wide) | styles.css:118 | too-small-support + low-contrast (`--kraft-deep` on cream approx 3.4:1, fails AA) | raise to 12px min, darken color, or treat as logo-adjacent mark |
| 11 | `.project__client` (client name over photo) | styles.css:435 | too-small-support | 11px over busy photo is a real legibility risk |
| 11 | `.ribbon` (top announcement bar) | styles.css:208 | too-small-support | page-wide banner; worth >=12px |
| 11 | `.tile__badge` (catalog "eco" badge) | styles.css:388 | too-small-support | bump |
| 11 | `.sticker text` (rotating SVG sticker) | styles.css:760 | too-small-support | decorative stamp; lower priority |
| 12 | `.project__tag` (project card top badge) | styles.css:447 | OK (at floor) | - |
| 10.88 | `.feed-card__videotag` | styles.css:1852 | too-small-support | bump |
| 10.56 | `.slideshow .ctile__card-m` (mobile collage meta) | styles.css:868 | too-small-support | smallest real UI text in the file; bump |
| 13.76 | `.slideshow .ctile__card-k` (mobile collage title) | styles.css:867 | borderline | this is a title; keep near 15px, not caption size |
| 13.76 | `.feed-card--compact .feed-card__lines` (Home strip body) | styles.css:1833 | too-small-support (borderline body) | sentence-like summary; raise |
| 14.72 | `.feed-card__lines` (feed-page card body) | styles.css:1826 | too-small-body | reads as prose; raise to >=16px |
| 15.68 | `.feed-card--compact .feed-card__title` | styles.css:1832 | borderline (near floor) | fine as compact title |
| 16.8 | `.feed-card__title` | styles.css:1824 | OK | - |
| 17.92 | `.feed .feed-card .feed-card__title` (feed page) | styles.css:1861 | OK | - |
| 13.44 | `.share-btn` (page share row) | styles.css:1640 | borderline | button label; small for a clickable row |
| 14.72 | `.repmail__contact` (contact block + message) | styles.css:1699 | too-small-body | actual prose; raise |
| 13.76 | `.repmail__meta` (From/To/Subject lines) | styles.css:1690 | borderline | header metadata; dense at 1.7 line-height |
| 14.72 | `.repmail__item-title` | styles.css:1714 | borderline/too-small-body | product-name title; read closer to 16px |
| 15.2 | `.repmail__items-h` | styles.css:1703 | OK (caption subhead) | - |
| 13.6 | `.repmail__arrow` | styles.css:1721 | OK | - |
| 14.08 | `.devmenu__pop button` | styles.css:1743 | OK (dev-only) | - |
| 23.2 | `.brand__word` (logo wordmark) | styles.css:238 | OK (brand mark) | - |
| 32 | `.mobile-menu nav a` | styles.css:271 | OK | - |
| 20 | `.lane__num` | styles.css:302 | OK (decorative) | - |
| 22.4 | `.lane--panel .lane__num` | styles.css:928 | OK | - |
| 22.4 | `.acc__btn .pm` (+/- glyph) | styles.css:606 | OK (icon) | - |
| 20-30.4 | `.marquee__item` | styles.css:317 | OK | - |
| 44.8-72 | `.spec__num` | styles.css:408 | OK | - |
| 36.8-62.4 | `.ctile--headline .display` | styles.css:701 | OK | - |
| 17.28 | `.ctile__card-k` (desktop collage title) | styles.css:729 | OK | - |
| 27.2-34.4 | `.slogan .line` default | styles.css:1037 | OK | - |
| 18.4-27.2 / 17.6-27.2 | `.slogan .line` mobile/desktop-narrow | styles.css:1045, 1107 | OK | - |
| 32-44 | `.footer__brand .display` | styles.css:523 | OK | - |
| 32 | `.pdp__price` | styles.css:580 | OK | - |
| 28px / 40px (SVG, decorative) | "X-BOARD" watermark | catalog.html:130, product.html:71 | not real content | ignore (illustration graphic) |
| 34px (SVG, decorative) | "ships flat" watermark | product.html:78 | not real content | ignore |
| 16.1-28.6 (0.42em of `.h1`) | product subtitle span in `<h1>` | product.html:86 | OK (floors ~16.1px) | fine; an explicit px/rem would be safer than em off a clamp() parent |

JS (`js/app.js`): no `font-size` occurrences at all (confirmed via grep). All sizing is CSS-driven; JS only toggles classes/attributes, so there is no dynamically-injected small text to audit there.

### Headline problems (the ones that actually matter)

1. Real bug, not just a floor violation: `.proj-search input` (the inline `<style>` rule in `projects.html`) is a genuine `<input>` at 15px with no mobile 16px override. Every other form field in the codebase got the iOS-zoom fix inside the `@media (max-width:600px)` block, but this one was missed. iOS Safari will zoom in on focus.
2. Several places render actual paragraph/prose reading text at 14.7-15px instead of 16px: `.pdp__quote p`, `.lead-drawer__intro`, `.feed-card__lines`, `.repmail__contact`, `.repmail__item-title`.
3. Two low-contrast plus too-small combinations: `.eyebrow` (kraft-deep on cream, approx 3.4:1) and `.repmail__badge` (white on orange, approx 2.9:1). Both fail WCAG AA for small text, compounding the size problem.
4. A cluster of sub-12px badges/tags (`.eyebrow` 11px, `.ribbon` 11px, `.tile__badge` 11px, `.project__client` 11px, `.feed-card__videotag` 10.9px, `.slideshow .ctile__card-m` 10.6px). Individually minor, but they are the site's actual smallest live text and several sit on top of photography, which is a legibility risk regardless of the raw contrast math.

### Recommended floors per category, and the verdict on "all fonts 16px+"

"All fonts should be >=16px" is too strict, and it would break the design system already documented in the CSS's own comments (`--t-meta: 13px captions`, `--t-eyebrow: 11px - legit tiny eyebrow`). A blanket 16px floor would flatten the deliberate hierarchy between headline / body / caption / badge that this type scale is built around, and it does not match any real accessibility requirement: WCAG sets no minimum font-size at all; it is a size-independent contrast/reflow standard. The "16px everywhere" instinct comes from iOS-zoom folklore, but that folklore applies specifically to `<input>` / `<select>` / `<textarea>`, not to all text.

Recommended floors by category (what the codebase is already trying to do, but does not fully enforce):

- Body / paragraph / list / reading text: >=16px, no exceptions. Fix the spots that dropped to 14.7-15px (`.pdp__quote p`, `.lead-drawer__intro`, `.feed-card__lines` + compact variant, `.repmail__contact`, `.repmail__item-title`).
- Form inputs specifically: >=16px unconditionally, not gated behind a `max-width:600px` media query. A tablet in landscape or a desktop user with a narrow window is still real Safari/WebKit and still zooms. Today `.field` / `.qf` fields only get the fix under 600px, and `.proj-search input` never gets it. Make the 16px rule global (drop the media query or widen it, and add `.proj-search input` to the selector list).
- Buttons / nav links / UI chrome labels (the `--t-ui` 15px tier): 15-16px is a reasonable floor; treat these as interactive-UI text, not reading text. 15px is defensible, though bumping primary CTAs (`.btn`, `.contact-fab`) to 16px is a cheap legibility/conversion win given they are the core enquiry funnel.
- Supporting text (captions / meta / breadcrumbs / labels): >=12px, which most of `--t-meta` (13px) already satisfies. The real gap is the 11px / 10.9px / 10.6px cluster (`--t-eyebrow` and several bespoke badge/tag sizes); raise those to a 12px floor, and separately fix the two low-contrast color pairs since size and contrast compound each other at this scale.
- Decorative / illustration text (SVG watermarks, the "X-BOARD" mockup graphics): exempt; it is part image, not copy a user is meant to read.
