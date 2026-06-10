# Session: Lead-capture UI (PRD 2) — quote drawer + dynamic WhatsApp

**Date:** 2026-06-10
**Goal:** Implement PRD 2 in mockup-v4 (shared quote form, side drawer, thumbnail chips, hybrid "+", dynamic WhatsApp, HE/EN+RTL), then verify and commit.

## What Broke and Why

### Reviewer flagged a non-existent "clobbered CSS rule"
Opus code-review called a CSS edit a blocker, reading the diff as if a valid `[dir=rtl]` font rule had lost its selector. `git show HEAD` showed the selector-less `{…}` block was pre-existing garbage; the edit deleted it and kept the valid rule intact (styles.css:1438–1442).

**Fix:** Verified against HEAD; no change needed — the orphan was removed, not created.
**Lesson:** Adjudicate review findings against `git show HEAD`/the file before acting — diff direction is easy to mis-read and reviewers raise false positives.

### Phantom `aria-invalid` with no message
The email-OR-phone failure marked both email and phone `aria-invalid`, but only email got a message → phone showed a red border with no text.

**Fix:** Mark only the email field (it carries the shared "add email or phone" message).
**Lesson:** Don't set `aria-invalid` on a field you aren't also giving a message — a red field with no text reads as a glitch.

## Decisions Made

| Decision | Rationale |
|---|---|
| Drawer = native `<dialog>` injected once by JS into `<body>` | One instance serves all 5 pages; no per-page markup drift |
| Minimize = `dialog.close()` + non-modal pill (not CSS-hide) | `showModal()` traps focus + inert-locks the page → incompatible with "keep browsing" |
| `novalidate` on every `[data-quote]` form | JS owns the email-OR-phone rule; neutralizes native `required` left in shared inline markup without editing HTML |
| Email-OR-phone behind one `contactRuleOK` predicate | OQ-1 still open; flipping the rule stays a one-liner |
| WhatsApp text built from the whole `selection` array, recomputed on every change | Spec: link must list every tagged item, live |

## Techniques That Worked

- **`<dialog>` slide-in:** add `.is-open` (transform → 0) one `requestAnimationFrame` after `showModal()`; CSS can't transition the show itself.
- **No-recursion i18n:** `applyLang()` re-dispatches `picpong:langchange`, so the langchange listener must re-localize JS-derived strings directly and never call `applyLang` back.
- **RTL drawer:** logical props (`inset-inline-end`) auto-flip; only the closed-state `translateX` needs a `[dir=rtl]` override.
- **Coordination:** Sonnet+caveman subagent drove Playwright verification (9/9 pass, 0 console errors); Opus subagent reviewed the diff; main session adjudicated both.
