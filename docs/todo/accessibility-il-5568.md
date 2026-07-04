# Accessibility audit - IS 5568 / WCAG 2.0 AA

This covers an accessibility audit of the bilingual (Hebrew-first RTL / English LTR) lead-generation catalog `mockup-v5`, an identical fork of the audited `mockup-v4` (six page-level HTML files: index, catalog, product, projects, project-detail, latest; one `css/styles.css`; one `js/app.js`). Standard: IS 5568 (תקן ישראלי 5568), which adopts WCAG 2.0 Level AA, plus Israeli legal specifics. Date: 2026-07-04.

## Executive summary

Top 10 changes to reach IS 5568 / WCAG 2.0 AA, ordered by severity (Blockers first):

- [ ] B1 - Publish an accessibility statement page (הצהרת נגישות) with a named accessibility coordinator + contact, linked in every footer.
- [ ] B4 - Fix the mobile menu: make it inert/hidden when closed so off-screen links leave the tab order; add focus-in, focus-trap, focus-return, and aria-expanded on the hamburger.
- [ ] B3 - Add a skip-to-content link and wrap page content in `<main>` on all six pages.
- [ ] B2 - Provide a keyboard-reachable pause for the marquees, slideshow, slogan, and hero video (or auto-stop after 5s); do not rely on hover or reduced-motion alone.
- [ ] M1 - Raise contrast on brand orange: darken button orange for white text (~4.6:1), darken eyebrow kraft-deep and orange-deep links, and lighten on-dark 0.5-alpha meta/breadcrumb text.
- [ ] M2 - Associate and announce form errors: aria-describedby from input to its error span + role="alert".
- [ ] M3 - Indicate required fields and the email-or-phone rule in-form, with aria-required.
- [ ] M4 - Default the page to Hebrew RTL (or make `<html lang>` match the Hebrew `<title>`/content at first load).
- [ ] M5 - Make toast and success panels live regions (role="status" aria-live="polite").
- [ ] Minor cluster - Un-nest interactive controls (zoom role=button must not contain the `+` button, and every zoom trigger needs an accessible name); normalize heading levels and aria-hidden decorative SVGs.

## Details

> Line-number caveat: this doc predates the v5 code edits, so raw `file:###` citations have drifted (a ~47-line sustainability block was inserted in `styles.css` around line 485, pushing later CSS lines +47; `index.html` lines below the hero shifted +3..+6; `.btn--brand` is now at `styles.css:187`). Locate code by the named selector / class / function via `grep`, not by the line number. The three shared token end-states (button orange, `.eyebrow`, on-dark alphas) are pinned authoritatively in README Phase 1 - apply those values, not any that may be restated here.

General note - what is already done well: icon-only buttons are well-handled across the board. `media__more`, `menuBtn`/`menuClose`, `contact-fab`, share buttons, gallery thumbs, lightbox close, and lang buttons all have accessible names (`aria-label` or visible text), and they are bilingual via `data-*-aria`. Client-logo alt text and the decorative duplicate-set `aria-hidden` are done correctly. The lightbox uses a native `<dialog>` (real focus trap + Esc + focus return). The drawer also uses a native `<dialog>` and returns focus to its trigger. Those are the strong points; the findings below are what breaks compliance.

IS 5568 adopts WCAG 2.0 Level AA. A few WCAG 2.1 criteria are flagged (marked "2.1") because Israeli enforcement increasingly expects them, but they are not strictly in-standard.

### Blockers

**B1. No accessibility statement page (הצהרת נגישות) - Israeli legal requirement**
- Component: whole site / footer.
- Israeli regulations (Equal Rights for Persons with Disabilities (Service Accessibility) Regulations, 2013, which mandate IS 5568) require a published accessibility statement naming the site's accessibility coordinator (רכז נגישות) with contact details, the conformance level, date, and known limitations.
- Evidence: no such page exists; footer link lists are Catalog / Studio / Trusted by only (e.g. `index.html:625-627`), no accessibility link anywhere.
- Fix: add `accessibility.html` (bilingual), link it in every footer, name a coordinator + phone/email, state "IS 5568 / WCAG 2.0 AA" and last-review date.

**B2. Auto-moving content cannot be paused - WCAG 2.2.2 Pause, Stop, Hide (Level A)**
- Component: hero video, text marquee, logo marquee, hero slideshow, rotating slogan. (Scheduled as a11y-B2 in README Phase 3.)
- Multiple things auto-animate for >5s in parallel with content, with no keyboard-operable pause/stop. `prefers-reduced-motion` is honored (good for 2.3.3) but does not satisfy 2.2.2 for users who have not set that OS flag.
- Evidence (locate by selector):
  - Hero video: the hero `<video>` (`muted autoplay loop`, no `controls`, no pause button); even with no video file the CSS Ken-Burns (`.cinemagraph` -> `@keyframes kenburns` in `styles.css`) loops forever.
  - Marquee text: the `.marquee__track` animation in `styles.css`; pauses only on `.marquee:hover`, unreachable by keyboard/touch.
  - Client logo marquee: the `.logo-marquee__track` animation in `styles.css`, hover-only pause (`.logo-marquee:hover`).
  - Hero slideshow: the `SLIDE_MS` `setInterval` in `app.js` (~line 969, every 4.2s); story bars.
  - Rotating slogan: the slogan `setInterval` in `app.js` (~line 1053, every 7s).
- Fix: add a single visible "pause motion" control (or auto-stop after 5s), and make marquee pause reachable via `:focus-within` too. Video: add `controls` or a pause toggle.

**B3. No skip link + no `<main>` landmark - WCAG 2.4.1 Bypass Blocks (Level A) / 1.3.1**
- Component: all pages, global chrome.
- No page has a skip-to-content link, and no page has a `<main>` element; `<section>`s are direct children of `<body>` after `<header>`. Keyboard/SR users must traverse the full nav (brand + 6 links + 3 social + 2 lang + hamburger) on every page with no bypass.
- Evidence: `index.html` header ends `:67`, content sections start `:91`, no `<main>`; same on all pages. `.sr-only` exists (`styles.css:1111`) but is used only once for the slogan (`index.html:173`), not for a skip link.
- Fix: add `<a class="skip-link" href="#main">` as the first focusable element, wrap the page body in `<main id="main" tabindex="-1">`.

**B4. Mobile menu keeps focusable links off-screen when closed - WCAG 2.4.3 Focus Order / 1.3.2 / 4.1.2**
- Component: mobile menu + hamburger button.
- `.mobile-menu` is `position:fixed; inset:0` moved off-screen with `transform:translateX(100%)` (`styles.css:262-268`). When closed it is not `display:none`, `hidden`, `inert`, or `aria-hidden`, so its 6 nav links + close button stay in the tab order. On mobile the inline `nav__links` are `display:none` until 920px (`styles.css:242,257`), so keyboard users on phones tab into invisible off-screen links. Open/close is class-toggle only, with no focus management:
  - `app.js:845-846` `openMenu`/`closeMenu` toggle `.open` + `body.overflow`; no focus moved into the menu, no focus trap, no `aria-hidden` on the background, no focus return.
  - The hamburger (`index.html:62`) has no `aria-expanded`/`aria-controls`, and `openMenu` never updates it. (Esc does close it via `app.js:842`, the one good part.)
- Fix: when closed, add `inert`/`hidden` (or `visibility:hidden`) so links leave the tab order; on open move focus into the menu, trap it, set `aria-hidden` on the rest, toggle `aria-expanded` on the button, and return focus on close.

### Major (WCAG 2.0 AA)

**M1. Color contrast failures - WCAG 1.4.3 Contrast (Minimum)**
- Component: buttons, eyebrow labels, on-dark text, orange links, captions.
- The three shared token end-states (button orange, `.eyebrow`, on-dark alphas) are pinned in README Phase 1 - apply THOSE values. The notes below are the failing pairs + target ratios. Needed: 4.5:1 normal text, 3:1 large text (>= 18.66px bold / 24px).
  - Primary CTA buttons: white `#fff` on brand orange `--orange #E67A2F` - the `.btn--brand` rule in `styles.css` (also the `.btn--primary:hover` / `.btn--onDark:hover` states). Approximately 3.1:1, FAILS (button text is 15px/600, not "large"). Every "Request a quote / Send message / Browse catalog" button. Fix per README Phase 1: keep the global `--orange`, fix white-on-orange at the button only (ink text, or a scoped `--orange-btn: #C85A16`); target >= 4.5:1.
  - Eyebrow labels (on nearly every section): the `.eyebrow` rule's `color: var(--kraft-deep)` (`--kraft-deep #a87d4f`) on cream, 11px/600 uppercase. Approximately 3.4:1, FAILS. Fix per README Phase 1: change the `.eyebrow` base color to `#8a5a2a` (do NOT change the `--kraft-deep` token); target >= 4.5:1.
  - On-dark muted text at `rgba(247,247,241,0.5)` over `--gallery #2b2b2b`: project/gallery meta (inline `style` on the `.meta` paragraphs in `projects.html` and `project-detail.html`) and breadcrumb links at `0.55` (inline `style` on the `.crumb` nav in both). Approximately 4.2:1, FAILS (crumb about 4.6, borderline). Fix per README Phase 1: raise alpha to >= 0.7; target >= 4.5:1.
  - Orange links on cream: `--orange-deep #E45C01` inline links, e.g. the catalog facet "Request a quote" link (the `.meta` paragraph link in `catalog.html`). Approximately 3.7:1, FAILS. Fix: darker, or add underline + darker; target >= 4.5:1.
  - `.placeholder-cap` captions: `--muted-2 #8a8a80` on cream (the `.placeholder-cap` rule in `styles.css`), 13px. Approximately 3.2:1, FAILS; target >= 4.5:1.
  - Minor/borderline: "Water-resistant" badge, white on `--pond #2A9BD0` (the inline-`style` `.tile__badge` in `product.html`) approximately 3:1; on-dark search placeholder `.proj-search input::placeholder` `rgba(247,247,241,0.5)` approximately 4.2:1.

**M2. Form errors not programmatically associated / not announced - WCAG 3.3.1 Error Identification**
- Component: quote/lead forms (inline `#contact` + injected drawer).
- `setError` (`app.js:676-683`) sets `aria-invalid="true"` and writes the message into a sibling `<span class="qf-error" data-qf-error>` (markup `app.js:518` / `fieldRows`), but the span is not linked to the input via `aria-describedby`, and it has no `role="alert"`/`aria-live`. A screen-reader user landing on the invalid field (focus is moved there, `app.js:797`) hears "invalid" but never the reason, and appearing errors are not announced.
- Fix: give each error span an `id`, add `aria-describedby` on the input, and `role="alert"` (or an `aria-live="assertive"` container).

**M3. Required fields + "email OR phone" rule not conveyed - WCAG 3.3.2 Labels or Instructions**
- Component: quote/lead forms.
- The injected drawer form inputs have no `required` attribute and no `aria-required` (`fieldRows`, `app.js:514-528`); the inline `#contact` form has `required` (`index.html:586-589`) but neither form states the actual validation rule ("give us an email or a phone"). Sighted and AT users get no advance indication of what is mandatory; the rule only surfaces as an error after submit (`validateLead`, `app.js:684-696`).
- Fix: mark required fields visually + `aria-required`, and add a short instruction ("Name required. Add an email or phone so we can reply.") associated with the group.

**M4. Page language mismatch at initial load - WCAG 3.1.1 Language of Page**
- Component: document `<html>` + `<head>` metadata, all pages.
- Every page ships `<html lang="en" dir="ltr">` (`*.html:2`) while the `<title>` and meta descriptions are Hebrew (e.g. `index.html:6-7`, all pages). For an Israeli Hebrew-first site the declared page language does not match the primary content, and the initial render is English body under a Hebrew title. The JS switch flips `lang`/`dir` correctly (`app.js:30-34`), but the static default is wrong for the audience and for 3.1.1.
- Fix: default to `lang="he" dir="rtl"` (with Hebrew as the default visible copy), or server-render the correct language; ensure `<title>` language matches `<html lang>`.

**M5. Status messages not announced - WCAG 4.1.3 (2.1 AA) / supports 3.3.1**
- Component: toast + form success panel.
- The toast (`<div class="toast" id="toast">`, e.g. `index.html:636`; driven `app.js:16-23`) and the success panel `[data-lead-success]` (`app.js:557`) have no `role="status"`/`aria-live`. Submission confirmation ("Brief received...") and add/remove selection feedback are never announced. (4.1.3 is WCAG 2.1, but it also weakens the 3.3.1 success-criterion story.)
- Fix: `role="status" aria-live="polite"` on the toast container and the success panel.

### Minor

- Nested interactive controls (4.1.2): zoomable media get `role="button" tabindex="0"` while containing the real `<button class="media__more">` inside them - hero (`app.js:198-199`) and gallery thumbs (`app.js:214`). A button inside a button is invalid and confuses AT. Also the injected hero zoom container gets `role=button` with no `aria-label` (unlike the gallery items which get `aria-label="Enlarge image"`). Fix: make the zoom trigger a real `<button>`/link that does not wrap the `+` button, or move the `+` outside.
- Heading order (1.3.1): level skips - footer `<h2 class="display">` jumps to `<h4>` column headings with no h3 (all pages, e.g. `index.html:615/625`); catalog aside `<h4>` facet headings appear under the page `<h1>` with no h2/h3 (`catalog.html:90,103,111`); `latest.html:79` uses `<h2 class="lead">` for an intro sentence. Fix: normalize levels (or use non-heading elements for the footer/aside labels).
- Decorative inline SVGs not hidden (1.1.1): checklist checkmarks (`index.html:536-539`, `578-579`) and various board-illustration SVGs lack `aria-hidden="true"` (inconsistent - catalog SVGs have it, index catalog-preview SVGs use `role="img"` labels). Low impact; tidy up with `aria-hidden` on purely decorative ones.
- Target size (2.5.5 is AAA in 2.0; 2.5.8 24px is 2.2): `.media__more` is 2.4rem, about 38px (`styles.css:1179-1180`) - above the 24px 2.2 minimum, below the 44px comfort target. Not an AA-2.0 failure; note for touch usability.
- Autocomplete (1.3.5, 2.1 AA): the inline `#contact` form inputs (`index.html:586-589`) and newsletter (`index.html:601`) lack `autocomplete`. The drawer form does set `autocomplete=name/email/tel` (good); mirror that on the inline form.
- Reflow/zoom (1.4.4/1.4.10) and text spacing (1.4.12): layout is rem/`clamp`/CSS-grid throughout with logical properties and RTL overrides - broadly compliant. Spot risk only: the sticky nav + fixed `contact-fab` + top `ribbon` can overlap content at 400% zoom on short viewports; verify no text is clipped by the JS-set `acc__panel` `max-height` (`app.js:1120`) under 200% text-spacing. Likely OK; confirm in testing.
- Accessibility widget (Israeli practice): an on-page accessibility menu (font size / contrast / etc.) is a common Israeli expectation (EqualWeb/Nagich style). Not present. Not a WCAG requirement and does not substitute for real conformance; mention to client as a common add-on, do not overweight.
