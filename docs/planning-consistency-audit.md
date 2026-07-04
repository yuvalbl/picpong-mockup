# Planning Consistency Audit — 2026-07-04

A cross-document review of the Picpong planning track (PRDs, todos, design docs, master/build plans, IA, meeting analyses) for internal soundness, mutual consistency, and contradictions. Four independent reviewers each read the full core set through one lens; this is the synthesis.

## Verdict

**Not fully consistent — but the incoherence is concentrated and diagnosable, not a design disagreement.**

Root cause: **two layers of planning docs, never reconciled after the June 2026 pivot.**

- **Current layer** — `prd/01|02|03`, `prd/open-questions.md`, `docs/todo/*`, `implementation-plan/estimate-lead-gen-build.md`, `mockup-v5` — is internally sound, well-sequenced, and self-aware (explicit label conventions, acknowledged intermediate states, get-ahead-of-decision notes). On *what to build now*, these agree.
- **Older layer** — `redesign-plan.md`, `build-plan.md`, `design/visual-direction-final.md`, `design/phase4-signoff.md`, root `CLAUDE.md` — still describes the pre-pivot world (dual-funnel commerce, Fraunces, wireframe→hi-fi gate). Superseded but, until this audit, not retired or bannered.

Almost every contradiction is **old-doc-vs-new-reality**, not new-vs-new. Scope discipline holds (events/exhibitions only; no POS/interior/retail creep) and the e-commerce→Phase-2 deferral is coherent phasing flagged wherever it appears.

## Real defects (beyond staleness)

| # | Defect | Where | Status |
|---|--------|-------|--------|
| D-1 | **"Phase 1/2" overloaded** — "Phase 1" = site-analysis step *and* the catalog mockup; "Phase 2" = client-meeting step *and* deferred commerce *and* the priced lead-gen build. Leaks into cost talk: `todo/README.md:88` "Phase-2 build price" = the work the estimate calls Phase 1. | `redesign-plan.md:12,21` §3/§4 titles; `estimate:4,84`; `todo/README.md:87-88`; `client-answers.md:41` | **Open — decision needed** (pick one vocabulary, sweep) |
| D-2 | **Backoffice scope hole in the estimate** — Sales leads-inbox + auth + admin are **MVP** ("business cannot run without") in `todo/missing-ui-and-backoffice.md` (PART B/C), but the estimate neither costs nor excludes them, and it contradicts `prd/03` L-6/L-7 ("no rep-side portal in Phase 1"). | `todo/missing-ui-and-backoffice.md` PART B/C; `estimate §2,§8`; `prd/03` L-6/L-7 | **Open — decision needed** (in/out + cost) |
| D-3 | **Typography: docs say Fraunces, v5 ships Rubik** — zero `Fraunces` hits in `mockup-v5/`; every heading is Rubik (`css/styles.css:92,240,…`). Defeats the signed-off anti-generic move (`visual-direction-final.md` §2.1/§11). Hebrew face `Assistant` specified but not loaded → Hebrew body falls back to system-ui on a Hebrew-first site. | `mockup-v5/index.html:27`, `css/styles.css`; `visual-direction-final.md` §4; `CLAUDE.md:29` | **Open — decision needed** (Fraunces vs Rubik) |
| D-4 | **`prd/03` self-contradicts on IDs** — §4.3 says `data-media-id` is **page-unique** ("cross-page repeats fine and intended"); §12 AC#2 demanded **globally-unique**. v5 ships per-page. | `prd/03` §4.3 vs §12 AC#2 | ✅ **Fixed** (AC#2 + the §6 handle line reworded to page-unique) |
| D-5 | **`open-questions.md` wasn't canonical** — claimed to be the single home for pending decisions but listed only OQ-1/2/3, omitting the live Meeting-2 blockers D4/D5/D6 (and Q-C/D/E/G) that `todo/README.md` treats as gating. Undercounted open state. | `prd/open-questions.md` vs `todo/README.md:78-84`; `meeting2-analysis.md:123-135` | ✅ **Fixed** (D4/D5/D6 mirrored in as OQ-4/5/6 + Q-C/D/E/G noted) |

## Staleness (superseded docs)

All now bannered (2026-07) unless noted:

- **`build-plan.md`** — entirely commerce-scoped; put Hebrew/RTL in "phase 2", contradicting the *locked* "Hebrew in Phase 1" (`client-answers.md:32,46`). ✅ banner added.
- **`visual-direction-final.md`** §8 commerce, §4 Fraunces/Assistant, fixed px scale — superseded. ✅ partial-supersede banner added (look still authoritative).
- **`phase4-signoff.md`** — Cart/Checkout/Account page list, full-commerce dual-funnel, bypassed hi-fi gate. ✅ banner added.
- **`redesign-plan.md`** — self-flagged already; §5 URL scheme still lists `/cart/ /checkout/ /account/`, body still cartonlab-brown, wireframe→hi-fi gate bypassed. ✅ amendment note extended.
- **root `CLAUDE.md`** — said v3 live, dual-funnel, `shop.html`, Fraunces. ✅ current-state banner added + serve comment fixed.
- **`client-answers.md:54`** — "WhatsApp preferred"; Meeting 2 + PRD 2 D-3 settle **email primary**. ⚠️ not yet edited (minor string).
- **`estimate` header** — "signed-off `mockup-v4`"; v4 was never signed off and is now superseded by v5; estimate predates Meeting-2 additions. ⚠️ not yet edited (needs re-estimate against v5 + backoffice, tied to D-2).

## Gaps (specced/built but not everywhere)

- **`Latest` feed page** exists in `mockup-v5/latest.html` + nav + `prd/03` (L-4), but is **missing from `ia/sitemap.md` and both nav specs** (`sitemap.md` §1/§3, `prd/01` §4/§5). ⚠️ not yet reconciled.
- **`/catalogs/` + user-flow (e)** ("download catalog → email capture") point to a page that was **never built or PRD'd**. `ia/sitemap.md` §1, `ia/user-flows.md` flow (e). ⚠️ decide: build, or drop from IA.
- **Palette drift** — orange consistent (`#E67A2F` everywhere). But gallery `#333`→v5 `#2b2b2b`/`#222`, muted `#6E6E6E`→`#6b6b63`, and v5 adds undocumented `--coral*`/`--forest*` tokens. `todo/palette-refinement.md` is the (unapplied) intended cleanup. ⚠️ track under palette-refinement.
- **a11y remediation under-scoped in estimate** — IS-5568 (4 blockers + statement page + audit) is MVP in `todo/accessibility-il-5568.md` + `missing-ui`, but the estimate carries only a generic QA line. Ties to D-2. ⚠️.

## What's clean (no action)

Scope boundaries · commerce phasing (reconciled, flagged) · the entire `todo/` + PRD + v5 layer's internal sequencing (self-aware: label conventions, acknowledged HE-first intermediate state, get-ahead-of-decision A1/A2) · OQ machinery (all three original OQs genuinely open, no dangling refs) · `visual-direction-v1` correctly superseded by `-final` · eco-led positioning (strengthened by Meeting 2's "sustainability must scream").

## Remaining decisions for Yuval (not mechanical)

1. **Phase vocabulary** (D-1) — choose one naming and I'll sweep all docs.
2. **Fraunces vs Rubik** (D-3) — keep Rubik (update the design docs) or restore Fraunces in v5 (code change).
3. **Backoffice** (D-2) — in Phase 1 or deferred, and re-scope/re-cost the estimate accordingly (also folds in the a11y + v5 delta).
4. Minor: build vs drop `/catalogs/`; back-propagate `Latest` into sitemap/nav specs.

---
*Generated by a 4-lens parallel review (scope/decisions · phasing/sequencing · IA/design/spec · open-questions/staleness). Line numbers were current at 2026-07-04; v4-era inline cites in some docs are approximate against the v5 tree.*
