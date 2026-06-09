# PRD 2 — Lead-capture UI  ·  BRIEF (not yet written)

> **This file is a brief, not a spec.** It tells whoever writes PRD 2 what it's for, what it must contain, what to read first, and the context from the concept-review meeting that shaped it. Do **not** treat the contents below as final requirements — they are the scaffold for writing them.
> **Build context:** all of this is **UI-only** in `mockup-v4/` (vanilla HTML/CSS/JS, no backend). Anything "behind the glass" (real delivery, inbox) is **represented, not built**, and flagged as a build note.

## 1. Purpose

Specify the **behavior** of the lead-capture interactions whose *slots* PRD 1 reserved. This is the heart of Phase 1 — the site's whole job is to **generate leads**, and the signature mechanism is letting a visitor say *"I liked this, get back to me"* about a **specific media item**, in one click.

## 2. What this PRD will contain

1. **Media "+" → quote interaction** (the headline feature):
   - What the `.media__more` "+" opens (modal? side drawer? inline panel?) — pick one, justify.
   - How the **selected item's thumbnail** is injected into the form (uses the `data-media-id` / `data-media-title` / `data-media-thumb` hooks defined in PRD 1 §6.1).
   - Behavior for **both image and video** media (resolves Open Q1).
   - Fields, validation, and the mock submit → confirmation (toast/inline success). No real send.
2. **Floating contact form** behavior (the `.contact-fab` placed in PRD 1 §5): open/close, and whether it shares one component with the per-media form or is a variant.
3. **Form field set** — decide minimal vs. fuller (name / phone / email / message) (resolves Open Q4).
4. **Affordance style** — round "+" button vs. a "more info" text link, applied consistently (resolves Open Q2).
5. **Email/WhatsApp routing — representation only:** how to *show* the email-vs-WhatsApp choice (e.g. a "send via WhatsApp" action) and the idea of a single comms inbox. Real routing/inbox = build note.
6. **States:** empty / filled / submitting / success / error (all mocked), and **RTL** rendering of the form.
7. **Evolve, don't reinvent:** base the form on v3's existing quote form rather than starting fresh.

Covers requirements: **FR-16 (behavior), FR-17, FR-18, FR-19, FR-20 (behavior), FR-21, FR-22, FR-23** (see `meeting1-analysis.md` §4.6–4.8).

## 3. Read before writing this PRD

- `docs/human-review/meeting1-analysis.md` — esp. **§4.6** (media "+"), **§4.7** (global form), **§4.8** (routing), and Open Questions **Q1, Q2, Q4**.
- `docs/prd/01-foundation-structure.md` — esp. **§6.1** (the media component + reserved data hooks), **§5** (floating contact trigger), **§7.3** (the product "request a quote on this" CTA). PRD 2 must stay consistent with the slots PRD 1 defined.
- `mockup-v3/index.html` + `mockup-v3/js/app.js` — the **existing quote form** (`[data-quote]` section + its submit handler) and the **toast** (`#toast`). This is the form to evolve.
- *(optional reference)* `docs/analysis/mediagarden/commerce-patterns.md` — named-contact / enquiry patterns; `docs/analysis/cartonlab/` — how the reference handles "Contact us" (it's quote-only, like our Phase 1).

## 4. Context from the concept-review meeting (2026-06-03)

- **One-click intent:** *"one click כזה של אהבתי את זה, תחזרו אליי."* Keep friction near zero — no payment, minimal fields.
- **Why the thumbnail matters:** hi-tech buyers *can't describe what they saw* — *"הם לא יודעים להגיד מה ראו"*; tying the lead to the exact image/video is the point. *"שיהיה בתוך הform את הthumbnail."*
- **WhatsApp:** Kuki sometimes prefers WhatsApp over a form, and wants **one place to manage all communication**.
- **It's a sales tool too:** reps drive prospects to specific items; the quote request is the conversion event the whole site is built around.
- **Mock only:** submit shows a confirmation (toast) and does nothing real.

## 5. Open questions to resolve while writing it

- **Q1** — exact form behavior when "+" is on a **video** vs an image.
- **Q2** — "+" button vs "more info" text (consistency).
- **Q4** — minimal vs fuller field set.
- Modal vs drawer vs inline for the form; one shared component vs per-context variants.
