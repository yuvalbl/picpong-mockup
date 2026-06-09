# PRD 2 — Lead-capture UI (mockup-v4)

> **Product:** `mockup-v4/` — a **UI-only mockup** (vanilla HTML/CSS/JS, no framework, no build, no backend), forked from `mockup-v3/`. Source of truth for a future real build; nothing behind the glass is real.
> **This PRD covers:** the **behavior** of the lead-capture interactions whose *slots* PRD 1 reserved — the media "+" → quote-with-thumbnail flow (the headline feature), the floating contact trigger, and the single shared quote/contact form. Email/WhatsApp routing and a unified inbox are **represented, not built** (flagged as build notes).
> **Inputs:** `docs/human-review/meeting1-analysis.md` (FR-16–23), `docs/prd/01-foundation-structure.md` (the reserved slots), `mockup-v3/` quote form (the thing we evolve), the **already-built v4 placeholders** (`.media__more`, `.contact-fab`, `#toast`).
> **Sibling PRDs:** PRD 1 — Foundation (done); PRD 3 — Discovery & chrome (projects search, real social links, SEO); Phase-2 PRD — Shop (commerce).
> **Status:** Draft for review.

---

## 0. Decisions (locked + resolved here)

The three rows marked **(2026-06-09, locked)** came from the brief. The three marked **(this PRD)** resolve the brief's open questions — flag any you disagree with.

| # | Decision | Rationale |
|---|---|---|
| **L-1** | **One shared form component.** The inline home contact section, the floating quote menu, and the media "+" flow all render the *same* four-field form. The "+" flow only adds the selected item(s)' thumbnail(s). *(2026-06-09, locked)* | One component to build, style, translate, and validate. No per-context variants to drift. |
| **L-2** | **Minimal field set: Name, Email, Phone, Message.** No company / dates / venue / budget. *(2026-06-09, locked; resolves Q4)* | "one click — I liked this, get back to me." Friction near zero. |
| **L-3** | **Floating trigger reuses the shared form** (not a bespoke menu). *(2026-06-09, locked)* | Same as L-1; the fab is just another way to open the one form. |
| **D-1** | **"+" interaction = HYBRID.** A first tap opens the form immediately, pre-bound to that one item (the one-click headline path); the visitor can minimize and keep tapping "+" on other tiles to build a multi-item enquiry, then submit once. *(this PRD; resolves the "+" model open Q)* | Honors the meeting verbatim ("one click… תחזרו אליי") for the common case, while serving "I liked these three" without forcing a separate enquiry per item. Reuses the `is-added` state already built. |
| **D-2** | **Form presentation = SIDE DRAWER**, sliding from `inset-inline-end` (right in LTR, left in RTL — opposite the `.contact-fab`). *(this PRD; resolves modal-vs-drawer-vs-inline)* | Leaves the browsed media visible behind it (you keep seeing what you liked); echoes a familiar pattern; the "minimize and keep browsing" half of D-1 is natural for a drawer and awkward for a centered modal. |
| **D-3** | **WhatsApp = secondary link** under the primary Send button; **Email is the primary path.** WhatsApp opens a prefilled `wa.me` link (representation). *(this PRD; FR-22)* | Keeps one obvious primary action (low friction) while honoring Kuki's WhatsApp preference. Real routing + unified inbox = build note. |
| **D-4** | **"+" affordance = round icon button, kept** (the built `.media__more`), with a hover/focus **text label**. *(this PRD; resolves Q2)* | A persistent icon is consistent across image, video, cards, and collage tiles; the on-hover/focus label supplies the "more info" clarity without a second affordance style. |
| **D-5** | **Video "+" behaves identically to image "+"**; the thumbnail chip uses the video's poster still (`data-media-thumb`). *(this PRD; resolves Q1)* | The lead is about "the thing I saw"; a poster frame identifies it as well as an image does. No separate video path to build. |

---

## 1. Objective

Make the site **do its one job**: let a visitor say *"I liked this, get back to me"* about a **specific media item, in one click**, and give Picpong a lead that carries the **thumbnail** of exactly what was seen — because the hi-tech buyer *"לא יודע להגיד מה ראה."* Everything here is the conversion event the whole catalog is built around. Same shared form also serves the always-available floating contact trigger and the inline home contact section.

## 2. Scope

**In (this PRD):**
- The **shared quote/contact form component** — markup, the four fields, validation, states, RTL, i18n. Evolved from v3's `[data-quote]` form.
- The **three triggers** that open it: inline home section (already in place), floating `.contact-fab`, and the media `.media__more` "+".
- The **hybrid "+" flow** (quick single-item open · minimize-and-collect · multi-item submit) and the **selection tray**.
- The **side drawer** host: open/close, focus management, backdrop, RTL, mobile sheet.
- **Thumbnail injection** from `data-media-id/title/thumb` into the drawer, for both image and video media.
- **States** (empty / filled / submitting / success / error) — all mocked — and the existing `#toast`.
- **Email/WhatsApp routing representation** (secondary WhatsApp link, prefilled `wa.me`).

**Deferred / not built (build notes):** real lead delivery, the unified comms inbox, email send, WhatsApp Business routing, geo/language default, persistence of leads.

**Out (Phase 2 / other PRDs):** cart/checkout/payment (Phase 2); projects search behavior, real social links, SEO (PRD 3).

## 3. Base & approach — evolve, don't reinvent

The v4 foundation already ships the slots; this PRD wires their behavior and **collapses the inline form to four fields**. Current state to evolve:

- **`[data-quote]` inline form** (`index.html`) still carries v3's **fuller** field set — project-type chips + Name, Company, Email, Event dates, Venue, Budget, Brief. **PRD 2 reduces it to the shared four-field component** (L-2). Keep the section's left-column copy and `data-en/data-he` i18n attributes.
- **`.media__more`** "+" buttons exist on every media item with `data-media-id` / `data-media-title` / `data-media-thumb` and a placeholder `is-added` toggle + "Added to quote" toast. **PRD 2 replaces the placeholder** with the real D-1 flow (the `is-added` visual state is reused to mark collected tiles).
- **`.contact-fab`** exists (bottom `inset-inline-start`) and currently toasts "coming in PRD 2". **PRD 2 wires it** to open the drawer (empty/general enquiry).
- **`#toast`** and the i18n attribute convention (`data-en`, `data-he`, `data-en-ph`, `data-he-ph`) are reused verbatim.
- The v3 cart **`.drawer`/`#scrim` were torn out in PRD 1 §10** — the lead drawer is **built fresh**, modeled on the native `<dialog>` already used for the image lightbox (`showModal`/backdrop/`Escape`), so it gets focus-trap and inert-background for free.

## 4. The shared form component (the single source)

One component, three triggers, one field set.

### 4.1 Fields (L-2)
Exactly four, in this order. Reuse the existing label/placeholder i18n pattern.

| Field | `name` | Type | Required | HE label / placeholder |
|---|---|---|---|---|
| Name | `name` | text | **required** | שם / השם שלך |
| Email | `email` | email | conditional* | אימייל / you@company.com |
| Phone | `phone` | tel | conditional* | טלפון / מספר טלפון |
| Message | `message` | textarea | optional | הודעה / מה אהבתם? נחזור אליכם |

\* **At least one of Email or Phone is required** (so we can reply). This directly supports Kuki's WhatsApp/phone preference — a visitor can leave just a phone. Mocked validation message (HE): *"השאירו אימייל או טלפון כדי שנחזור אליכם."* Drop the company/dates/venue/budget fields and the project-type chip row.

### 4.2 Header / context region
Above the fields, a context region that differs only in content per trigger:
- **General** (fab / inline, no item): heading *"בקשת הצעת מחיר"* / "Request a quote", short lead.
- **Item(s) selected** (from "+"): the heading plus a **row of removable thumbnail chips** — one per selected item (see §6, §8).

### 4.3 Actions
- Primary: **`btn--brand` "שלחו"/"Send the request"`** (mock submit, §10).
- Secondary, beneath: **"או דברו איתנו ב-WhatsApp" / "or message us on WhatsApp"** link (§9).
- A small mock-disclaimer cap (reuse `.placeholder-cap`): *"טופס הדגמה — מאמת ומאשר, לא שולח."*

### 4.4 i18n & RTL
- All labels, placeholders, headings, buttons carry `data-en/data-he` (text) and `data-en-ph/data-he-ph` (placeholders), matching the existing language-switch wiring.
- The drawer, chip row, fields, and actions must render correctly in RTL; the drawer itself slides from `inset-inline-end` so it is mirror-correct without per-direction code.

## 5. The three triggers → one form

| Trigger | Opens | Item context |
|---|---|---|
| Inline home contact section (`#contact`, `[data-quote]`) | **Stays inline** (not the drawer) — it is the page's own section. Same four fields. | None |
| Floating `.contact-fab` (every page) | **Drawer**, general enquiry | None (unless a selection is in progress — then it reopens that selection) |
| Media `.media__more` "+" | **Drawer**, item-bound | The tapped item (and any others collected) |
| Product/Project "request a quote on this" CTA | **Drawer**, single item-bound | That one item |

The inline section and the drawer render the *same* field markup (L-1); only the host (in-page vs. drawer) and the header/chip region differ. Build them from one template/string so they cannot drift.

## 6. The hybrid "+" flow (D-1) — the headline feature

State lives in a transient in-page **selection** array (item id/title/thumb). No `localStorage` (that was commerce); `sessionStorage` is an optional nicety, not required.

**Quick path (the one click):**
1. Visitor taps **"+"** on a media item not yet selected.
2. The item is added to the selection **and the drawer opens immediately**, pre-bound to that item — its thumbnail chip in the header, four empty fields. This is the literal *"one click — get back to me"*.

**Collect path (I liked several):**
3. From the open drawer, **"המשיכו לעיין" / "Keep browsing"** minimizes the drawer to a small **selection pill** (a count badge near the fab). The page is fully usable.
4. Tapping **"+"** on more tiles **appends** them (toast: *"נוסף — 2 פריטים"* / "Added — 2 items"); those tiles show the `is-added` state. The drawer need not reopen on each add while minimized.
5. Tapping the **"+"** of an already-selected tile **removes** it from the selection (toggle), updating `is-added`, the count, and the chip row.
6. The **pill** (or the **fab**, or any "+") **reopens the drawer** with the full selection listed as chips.

**Submit:** one form, one submit, for the whole selection (§10). On success the selection clears and all `is-added` states reset.

**Edge cases:**
- Fab with an **empty** selection → general enquiry (no chips).
- Fab/"+" with a **non-empty** selection → reopens that selection (don't silently start over).
- A selection chip's **✕** removes that item (and clears its tile's `is-added`); removing the last chip leaves a valid general enquiry.

## 7. The side drawer (D-2) — host

- **Structure:** a panel pinned to `inset-inline-end`, full viewport height, above a dimmed backdrop. Build as a native `<dialog>` (or a div with `role="dialog" aria-modal="true"` + focus trap) — mirror the lightbox's `showModal`/backdrop-click/`Escape`-close wiring already in `app.js`.
- **Open:** slide-in on the inline axis (`transform: translateX` toward 0), backdrop fades in, focus moves to the first field (or the close button), background inert, body scroll locked. Respect `prefers-reduced-motion` (no slide → simple fade/appear).
- **Close:** ✕ button, backdrop click, `Escape`. Closing the drawer **does not clear** the selection (so "keep browsing" works); only submit-success or removing all chips clears it.
- **Minimize:** "Keep browsing" hides the panel but keeps the selection + pill (distinct from close, which also keeps it — minimize just additionally surfaces the pill). Keep this simple: one "minimize/keep browsing" affordance.
- **Mobile:** the drawer becomes a **near-full-width bottom-or-side sheet** (whichever is cleaner at the breakpoint); the "+" affordance and chips remain reachable; the keyboard must not occlude the submit button (let the sheet scroll).
- **RTL:** because it is anchored with `inset-inline-end`, it appears on the correct side automatically; verify the slide direction and chip row flow.

## 8. Thumbnail injection (FR-18) — image *and* video

- Each `.media__more` already exposes `data-media-id`, `data-media-title`, `data-media-thumb`. On add, push `{id, title, thumb}` to the selection.
- Render each as a **chip** in the drawer header: the `thumb` image + the `title` + a remove ✕. The chip's purpose is so *"כולם רואים שזה"* — both visitor and Picpong see exactly which piece.
- **Video (D-5):** identical; `data-media-thumb` is the video's poster still. Authoring note: every `<video>` media item must carry a `data-media-thumb` pointing at a representative frame (the foundation already sets these — keep that contract).
- Submission payload (mock) includes the selected ids/titles so the success copy can name them.

## 9. Email + WhatsApp representation (FR-22/23, D-3)

- **Primary** Send = the email lead path (mock).
- **Secondary** "message us on WhatsApp" link builds a **prefilled `wa.me`** URL: the message text seeds with the selected item title(s) and any typed name/phone, e.g. `https://wa.me/<number>?text=<encoded: "היי, אשמח להצעת מחיר על: <titles>. שם: <name>">`. Opening it is *representation* — it hands off to WhatsApp and sends nothing through any backend.
- **Build notes (not built):** real email delivery; WhatsApp Business API; and the **single unified inbox** where Picpong manages all incoming comms (FR-23). Mark these clearly in the UI's mock-disclaimer and in code comments so no one mistakes them for working.

## 10. States (all mocked) + toast

| State | Behavior |
|---|---|
| **Empty** | Fields blank; primary Send enabled (validation on submit). Chips show if items selected. |
| **Filled** | Normal input; live-clear field errors as the user fixes them. |
| **Submitting** | On valid submit: disable Send, show a brief mock pending (~600 ms, button → "שולח…/Sending…" or spinner). |
| **Success** | Replace the form body with an inline success panel (✓ + *"קיבלנו — נחזור אליכם בתוך יום עסקים"* / "Got it — we'll reply within a working day", naming the item(s) if any), **and** fire the existing `#toast`. Reset fields, **clear the selection**, reset all `is-added`. Auto-close the drawer after a short beat or on a "done" tap. |
| **Error** | Mock validation only: missing Name, or neither Email nor Phone → inline field messages (HE/EN). No network-error path (nothing sends); include a representational error style in case a build later needs it, but do not fabricate failures. |

Toast copy stays lead-flavored (replace the cart-flavored "Added to quote"): adding → *"נוסף — N פריטים"*; success reuses the §10 success message.

## 11. Affordance spec (D-4, resolves Q2)

- Keep the round **`.media__more`** "+" in its consistent corner on every media item (image, video, catalog card, project tile, collage tile, product gallery).
- It shows a **text label on hover/focus** — resting label lead-flavored: *"אני רוצה כזה" / "I want this"* (already built); selected state: *"נבחר" / "Selected"* (rename from "Added" to drop the cart metaphor).
- Single affordance style site-wide — no mixing "+" buttons and "more info" text links.
- Accessible name describes the action (e.g. `aria-label="Request a quote on this build"`), already present; keep it translated via `data-en-aria/data-he-aria` like the fab.

## 12. `app.js` + markup impact

**Replace (the placeholder):**
- The `.media__more` click handler currently just toggles `is-added` and toasts. Replace with the §6 selection logic (add/remove, drawer open, pill, chips).
- The `.contact-fab` handler currently toasts "coming in PRD 2". Wire it to open the drawer (§5).

**Add:**
- The **drawer** markup + open/close/minimize/focus-trap (model on the lightbox `<dialog>`).
- The shared **form template** (one definition rendered into both the inline section and the drawer).
- The **selection** model, **pill/count badge**, **chip row** render, **WhatsApp link** builder.
- Mock **submit + validation** for the shared form (supersedes the current `[data-quote]` submit, which only toasts).

**Change markup:**
- Collapse the inline `[data-quote]` form to the four fields (remove the chip row, Company/dates/venue/budget). Keep section copy + i18n attributes.
- Ensure every `<video>` media item carries `data-media-thumb` (poster still).

**Keep untouched:** mobile menu, scroll-reveal, slideshow, slogan rotation, parallax, filter bar, accordion, back-to-top, doodles, the language switch, the lightbox.

## 13. Acceptance criteria ("done")

1. Clicking **"+"** on any media item (image **or** video) opens the drawer with that item's **thumbnail chip** and the four-field form — in one click.
2. A visitor can **collect multiple items** (minimize → tap more "+") and submit **one** enquiry listing all selected thumbnails; selected tiles show the `is-added` state; chips are individually removable.
3. The **floating `.contact-fab`** opens the **same** form (general enquiry when nothing is selected; the in-progress selection when there is one).
4. The **inline home contact section** renders the **same four fields** (Name, Email, Phone, Message) — no company/dates/venue/budget remain anywhere.
5. **Validation** is mocked: Name required, **at least one of Email/Phone** required; submit shows **submitting → success** with a toast, resets, and clears the selection. Nothing is sent.
6. A **WhatsApp** secondary link is present and opens a **prefilled `wa.me`** message naming the selected item(s); a visible mock-disclaimer states nothing is really sent and the unified inbox is a build note.
7. The whole flow — drawer, chips, fields, actions — renders correctly in **Hebrew/RTL** (drawer on the correct side) and in English/LTR, via the existing language switch.
8. `prefers-reduced-motion` is respected (no slide animation); `Escape` and backdrop close the drawer; closing keeps the selection, success clears it.

## 14. Requirement traceability

| Req | Where | Status in v4 |
|---|---|---|
| FR-16 media "+" affordance | §11 (foundation built it; behavior here) | Behavior — this PRD |
| FR-17 "+" opens item-bound form | §6 quick path, §7 drawer | This PRD |
| FR-18 form shows item thumbnail | §8 chips | This PRD |
| FR-19 one-click intent / minimal friction | §6, §4.1 | This PRD |
| FR-20 contact form on every page (floating) | §5 fab → drawer | This PRD (anchor placed in PRD 1) |
| FR-21 fields name/phone/email/message | §4.1 (L-2 minimal) | This PRD |
| FR-22 email + WhatsApp routing | §9 (representation) | This PRD (real routing = build note) |
| FR-23 single comms inbox | §9 | **Build note** (represented only) |
| Q1 video vs image "+" | §8, D-5 | Resolved — identical, poster thumb |
| Q2 "+" button vs "more info" text | §11, D-4 | Resolved — round "+" with hover label |
| Q4 minimal vs fuller fields | §4.1, L-2 | Resolved — minimal four |

## 15. Open questions / build notes carried forward

- **wa.me number & message template** — final WhatsApp number and exact prefilled copy (placeholder used in the mock). *(content; Kuki)*
- **Unified inbox** — the real "one place to manage all communication" is a build concern, only represented here. *(NFR / build)*
- **Lead persistence & spam control** — none in the mock; flag for the real build (basic validation, honeypot/rate-limit).
- **Selection persistence across pages** — the mock keeps the selection in memory within a page; whether it survives navigation (sessionStorage) is a nicety to confirm during build.
