# Implementation Plan — Lead-Capture UI (PRD 2), mockup-v4

> Working plan for implementing `docs/prd/02-lead-capture-ui.md`. Status: **approved, not yet executed.**

## Context

PRD 2 specifies the **behavior** for the slots PRD 1 reserved — the site's whole job: let a visitor say *"I liked this, get back to me"* about a specific media item in one click, with that item's **thumbnail** carried into a quote form. The v4 foundation already ships the inert pieces (`.media__more` "+" buttons with `data-media-id/title/thumb`, a `.contact-fab`, `#toast`, and an already-collapsed four-field inline form). This plan wires the real behavior: a **shared four-field form**, a **side drawer** host, a **hybrid "+" → select/collect/submit** flow, **thumbnail chips**, a **WhatsApp** representation, and full **HE/EN + RTL + reduced-motion**. Everything is UI-only/mock — no backend; real routing + unified inbox stay build notes.

## Decisions (locked into this plan)

- **Drawer is injected by JS** into `<body>` on load (single source; no per-page drawer markup across the 5 HTML files).
- **One canonical field-set helper** `quoteFieldsHTML()` feeds both the drawer form and (by reference/comment) the inline form, so they can't drift. Drawer form uses `-d`-suffixed ids to avoid id collisions; validate/submit scope to `form.querySelector`, never `getElementById`.
- **Minimize = close the modal `<dialog>` + show a non-modal pill.** `showModal()` traps focus and inert-locks the page, which is incompatible with "keep browsing"; so minimize/close are the same close, and reopening calls `showModal()` again.
- **Email-OR-Phone validation lives in one swappable predicate** (`contactRuleOK`) — OQ-1 (`docs/prd/open-questions.md`) may flip it to "both" or "email only".
- Reuse existing machinery: `toast()`, `applyLang()` + `picpong:langchange` event, the lightbox `<dialog>` open/close pattern, `reduceMotion`, and CSS tokens (`--ease`, `--speed`, `--speed-slow`, `--radius*`, color vars). Drawer close button reuses `.lightbox__close`; drawer form reuses `.quote-form`/`.qf`/`.quote-grid`.

## Changes by file

### `mockup-v4/js/app.js` (all inside the existing IIFE)

**Add a Lead module** (insert after `toast()`/`applyLang` (~line 58), before `renderProjectDetail` ~line 74):
- **Selection state:** `selection = [{id,title,thumb}]` + `selIndexOf/selAdd/selRemove/selToggle/selClear`. (Optional `sessionStorage` mirror left as a commented stub — PRD §15 nicety, not wired.)
- **`buildDrawer()`** — runs once on load; injects `<dialog id="leadDrawer" class="lead-drawer">` (panel, header w/ `.lightbox__close`, `.lead-chiprow`, the shared form via `quoteFormHTML()`, a "Keep browsing" minimize button, a hidden `.lead-success` panel) and a hidden `.lead-pill` button into `<body>`; then `applyLang(currentLang())` to localize injected nodes.
- **`quoteFieldsHTML()` / `quoteFormHTML(ctx)`** — the four `.qf` rows (Name required; Email; Phone; Message) with all `data-en/data-he/data-en-ph/data-he-ph`, per-field `.qf-error` slots, primary `.btn--brand` submit (`data-i18n-html`), `.placeholder-cap` disclaimer, and the secondary `.lead-wa` WhatsApp link. Root carries `data-quote`.
- **Open/close/minimize/focus:** `openDrawer()` (renderChips → reset → `showModal()` → rAF focus first field; also toggle an `.is-open` class one frame after showModal so the panel transform animates), `closeDrawer()`/`minimizeDrawer()` (= `dialog.close()`; native `close` handler flips `drawerOpen`, re-shows pill if selection non-empty, restores focus to trigger), backdrop-click + native Escape (mirror lightbox lines 270–272).
- **`renderChips()`** (removable thumbnail chips; `[data-rm=id]` ✕ → `selRemove`+`syncTiles`+`renderChips`+`updatePill`, drawer stays open), **`syncTiles()`** (set `.is-added` + swap "+"/✓ SVG path + `.media__more__label` text "I want this"/"אני רוצה כזה" ⇄ "Selected"/"נבחר" from current lang), **`updatePill()`** (count + show/hide).

**Replace the placeholder click handler (lines 277–313)** with delegation:
- `.media__more` → `selToggle` + `syncTiles`/`renderChips`/`updatePill`; **auto-open the drawer only when it's the first item (`selection.length === 1` after add) and the drawer is closed**; subsequent adds while minimized just toast "Added — N items"/"נוסף — N פריטים".
- `.contact-fab` → `openDrawer()` (general if empty; reopens current selection if not).
- `.lead-pill` → `openDrawer()`.

**Replace the quote submit handler (lines 604–619)** with a shared `validateLead(form)` + submit bound to every `[data-quote]` (inline + drawer):
- `contactRuleOK(v) = !!(v.email || v.phone)` (OQ-1 comment), Name required.
- Errors → localized inline `.qf-error` messages, focus first invalid; live-clear on `input`.
- Valid → submitting (~600ms, disable + "Sending…"/"שולח…") → success panel (names items if any) + `toast()` → `form.reset()` + `selClear()` + `syncTiles()` + `updatePill()`; drawer auto-closes shortly after.
- `enhanceInlineForm()` ensures the inline `#contact` form also gets the `.lead-wa` link + `.lead-success` panel (shared states).

**WhatsApp (dynamic, full-selection message):** `WA_NUMBER` placeholder (build-note comment) + `buildWaHref(form)` → `https://wa.me/<WA_NUMBER>?text=` + `encodeURIComponent(text)`, where `text` is built **per current lang** from the **entire `selection` array** (every item the user added), the typed Name, and Phone:
- **With items** (EN): `"Hi PicPong, I'd like a quote on these items:\n" + selection.map(s => "• " + s.title).join("\n") + "\nName: <name>\nPhone: <phone>"`. HE: `"היי PicPong, אשמח להצעת מחיר על הפריטים הבאים:\n• …\nשם: <name>\nטלפון: <phone>"`. Use real newlines (`\n`) — they encode to `%0A` and render as line breaks in WhatsApp. Omit the Name/Phone lines if those fields are empty.
- **No items** (fab/general enquiry): a generic line — EN `"Hi PicPong, I'd like a quote."`, HE `"היי PicPong, אשמח להצעת מחיר."` (+ Name/Phone if filled).
- **Always current:** `refreshWa()` recomputes the href so it reflects the *latest full selection* and typed name/phone. Call it from `openDrawer`, `renderChips` (every add/remove/chip-✕), the form's `input` listener, and the `picpong:langchange` listener. So if the user tags 3 items then opens WhatsApp, the message lists all 3; remove one and it drops from the message.

**i18n:** every injection calls `applyLang(currentLang())`; `picpong:langchange` listener re-runs `updatePill()`/`refreshWa()` and any count-dependent strings.

Remove the dead `.qf-chip` click code (it's inside the replaced block).

### `mockup-v4/css/styles.css` (append after lightbox block ~line 1392)

- `.lead-drawer` (`<dialog>` anchored `inset-inline-end`, `height:100vh`, `width:min(440px,92vw)`, transparent) + `::backdrop` (reuse `rgba(12,12,12,0.82)`+blur).
- `.lead-drawer__panel` (`background:var(--cream)`, column, scroll, `translateX(100%)` → `0` on `.is-open`, `--speed-slow`/`--ease`). **RTL layer:** `[dir=rtl]` panel closed `translateX(-100%)` → `0`.
- `.lead-chiprow` / `.lead-chip` (thumb img + title + `.lead-chip__x`), `.lead-pill` (fixed, z-index 191, near fab), `.qf-error` + `input[aria-invalid=true]`, `.lead-success`, `.lead-wa`.
- Drawer form reuses `.quote-form`/`.qf`/`.quote-grid` (give the injected form `class="quote-form"`).
- **Mobile:** `@media (max-width:560px) { .lead-drawer{width:100vw} }` + keyboard-safe `padding-block-end`.
- **Reduced motion:** the existing global `prefers-reduced-motion` rule already kills the slide → panel simply appears (desired); verify it lands fully visible.

### HTML (all 5 pages — minimal)

- **Bump `js/app.js?v=12` → `?v=13`** on index/catalog/product/projects/project-detail (only guaranteed cross-file edit).
- **Verify** every `<video>` media item carries `data-media-thumb` (poster still); add if missing.
- Inline four-field form already satisfies AC-4 — no field changes needed.

## Critical files
- `mockup-v4/js/app.js` — placeholder handler (277–313) + submit (604–619) replaced; Lead module added; reuse `toast`/`applyLang`/lightbox pattern/`mediaMoreBtn`.
- `mockup-v4/css/styles.css` — new drawer/chip/pill/error/success/wa classes + RTL + mobile.
- `mockup-v4/index.html` (+ 4 sibling pages) — `?v=` bump, video thumb check.
- `docs/prd/02-lead-capture-ui.md` — the spec; `docs/prd/open-questions.md` — OQ-1.

## Sequencing
CSS → app.js scaffold (state + buildDrawer) → open/close/minimize/focus → chips/pill/syncTiles → replace "+" handler → shared validate/submit + states + enhanceInlineForm → WhatsApp → langchange re-localize → `?v=13` bump + video-thumb check → verify.

## Risks
Duplicate ids across two form instances (use `-d` suffix + scoped queries); `<dialog>` transform won't animate without the rAF `.is-open` toggle; minimize must `close()` not CSS-hide (focus trap); precise auto-open condition (first item only); inject-then-`applyLang` timing for Hebrew; RTL closed-transform override; don't bypass CSS reduced-motion with JS slides.

## Verification (manual, in browser — `npm run serve` or open the file)
1. **"+" flow:** click "+" on an image → drawer slides from the right, item chip shown, focus in Name. Same on a **video** tile (poster thumb).
2. **Hybrid:** "Keep browsing" → drawer closes, pill shows count; "+" two more → toast "Added — N items", tiles show Selected, drawer does NOT reopen; re-"+" a selected tile removes it; click pill/fab/any "+" reopens with all chips; chip ✕ removes one, last removal leaves a general enquiry.
3. **Triggers:** fab (empty → general; non-empty → reopens selection); inline `#contact` form validates/submits identically.
4. **Validation/states:** empty submit → Name + contact errors, focus first invalid; Name+Phone valid, Name+Email valid, Name+neither invalid; valid → "Sending…" ~600ms → success panel + toast → reset + selection cleared + tiles reset → drawer auto-closes; typing clears errors.
5. **WhatsApp:** secondary link present; with 3 items selected, opening it shows a WhatsApp draft listing **all 3** titles (one per line) + Name/Phone; remove one item → it drops from the draft; with no items → generic quote message; toggling HE/EN reword the draft; disclaimer visible (nothing really sends).
6. **i18n/RTL:** toggle HE before open and while open → all drawer/chip/pill/error/success/button/WhatsApp + "N פריטים" counts localize; in RTL the drawer is on the LEFT (opposite fab) and slides from the left; chips/arrows mirror; toggle back to EN mirrors back.
7. **Close:** Escape / backdrop / ✕ close without clearing selection (pill persists); focus returns to trigger.
8. **Reduced motion:** drawer appears without sliding, no spinner; still fully functional.
9. **Cross-page:** fab + drawer + "+" work on all 5 pages (incl. project-detail's JS-injected buttons); `?v=13` confirmed loading.

Optional after manual pass: run the `ad-hoc-test` skill (Playwright MCP) to drive the "+" → drawer → submit flow and capture LTR + RTL screenshots.
