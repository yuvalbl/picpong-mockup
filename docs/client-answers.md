# Picpong — Client Answers (redesign-plan Phase 2 — Client Meeting)

> **Status:** Partial. Captures the 4 decisions locked on the 2026-05-31 client call. Remaining questions in `redesign-plan.md` §4 are deferred to build time (fast-track to mockups agreed).
> ⚠️ **Some 2026-05-31 decisions were amended at the 2026-06-03 concept-review meeting — see the [2026-06-03 update](#2026-06-03-update-concept-review) at the bottom.** Where a locked decision below is superseded, it is flagged inline.
> **Last updated:** 2026-06-09

## Locked decisions (2026-05-31)

1. **Primary reference:** https://cartonlab.com/en — "I want just like it" from every perspective (look, structure, UX, copy). Mediagarden demoted to secondary (commerce/SKU-table ideas only).

2. **Commerce model:** Full e-commerce — cart + checkout + online payment. (Note: cartonlab itself is quote-only / "Contact us"; real commerce is our addition. Keep cartonlab's dual-funnel: a buy-now lane **and** a project-enquiry lane.)
   > ⚠️ **AMENDED 2026-06-03 (concept review):** Commerce is **out of Phase 1** — Phase 1 is a lead-gen catalog (browse-only, quote/contact only); cart/checkout/payment/account move to **Phase 2**. See the [2026-06-03 update](#2026-06-03-update-concept-review) below.

3. **Brand/material angle:** Lead with eco/cardboard like cartonlab. X-Board is the hero story. Impact-led messaging, eco as proof (FSC + recyclable + made-to-order/no-waste).

4. **Product scope/content:** Mirror cartonlab's content set — cardboard products for **conferences / events / exhibitions** only. Other Picpong lines (point-of-sale, interior, retail) out of scope for this build.

## Mockup blockers — RESOLVED (2026-05-31)
- **Fonts:** ✅ designer's choice (Yuval delegated). Following cartonlab logic — light high-contrast serif display + neo-grotesque body. No client font/brand-guide dependency.
- **Brand colors / logo:** ✅ **extract from the existing picpong.biz site** (no separate brand guide). Brand-extraction crawl → `docs/analysis/picpong/brand.md`. These override the cartonlab placeholder accents in `visual-direction-v1.md`.
- **Full page-list sign-off + pages to remove** — still open, but IA in `docs/ia/sitemap.md` is our proposed default; proceed on it unless client objects.

### Non-blocking for mockup
- Hi-res product photos: mockups use Picpong's existing shots + cartonlab-style placeholders/stand-ins; real shoot is a build-time risk. (Use placeholders, flag in mocks.)
- Stockable-vs-quote product split: mockups show BOTH buy lane and quote lane regardless.

## SKIPPED for mockup — build-time only (do NOT chase now)
- Payment methods, VAT/tax, shipping zones, returns policy
- Real eco certs (FSC/ISO docs) — mockups use placeholder eco claims; real certs needed before publish
- CMS, CRM/ERP, analytics, payment-provider choices (→ `build-plan.md` PoC)
- Hebrew RTL timing (English-first mockups)
  > ⚠️ **AMENDED 2026-06-03:** Hebrew + RTL are now **in Phase 1**, geo-detected (Israel → Hebrew, else English). See below.

---

## 2026-06-03 update (concept review)

> **Meeting:** 2026-06-03 concept review · Yuval (design/product) × Kuki Saad (sales/business).
> **Source of truth:** `docs/human-review/meeting1-analysis.md` (full requirements analysis: FR/NFR/CR). Embodied in `docs/prd/01-foundation-structure.md` (PRD 1 — Foundation).
> **What this is:** the 2026-06-03 concept-review meeting **amended scope** away from several 2026-05-31 locked decisions. The items below supersede the conflicting locked decisions; history above is preserved and flagged inline.
> **Phasing note:** in this update, **"Phase 1 / Phase 2" mean the build phases** (Phase 1 = the lead-gen catalog we build now; Phase 2 = the later commerce build) — *not* `redesign-plan.md`'s process Phases 0–6 (where "Phase 2" is the client-meeting step that gives this file its title).

### What changed (vs. the 2026-05-31 locks)

1. **Commerce → Phase 2.** Phase 1 is a **lead-generation catalog**, not a shop: browse-only, no cart/checkout/payment/account. *"בוא נעשה את זה phase שתיים… אני לא מוכן במאת האחוזים לשופ מיידי."* The mediagarden-style SKU + price + spec tables go with it to Phase 2. **(Supersedes locked decision #2.)**
2. **Hebrew + English from day 1, with RTL in Phase 1.** Both languages supported from launch; default language is **geo-detected** (Israel → Hebrew; unknown/other → English) with a manual switch. **Full RTL** is a Phase-1 requirement, first-class (not an afterthought). **(Supersedes the "English-first; Hebrew RTL phase 2" note.)**
3. **Eco-only and colorful** — show only finished, **colorful** cardboard event work; hide raw-cardboard brown, signage, perspex, old catalogs. This explicitly **rejects cartonlab's brown raw-cardboard look**: *"הצבע החום… לא מעניין; השער הצבעוני… מאוד מעניין."* (A small "and more" sector may hold the rest.) **(Refines locked decision #3.)**
4. **Client prefers pastels.** Pastel palette is the stated client preference (*"העדיף פסטלים."*); Yuval to supply options. **(Supersedes the vibrant/orange mockup-v3 direction for the new mockup track.)**

### New Phase-1 requirements captured

- **Per-media "+" → quote-with-thumbnail.** Every media item (image *or* video) carries a fixed "+ / more info" affordance; tapping it opens a quote/contact form **pre-bound to that item**, showing its **thumbnail** so both visitor and Picpong know which piece the lead is about. One-click intent: *"one click כזה של אהבתי את זה, תחזרו אליי."*
- **Floating contact form** persistent on **every page**. Minimal fields (name / phone / email / message — exact set still open).
- **Lead routing → email + WhatsApp**, switchable, managed in one place (WhatsApp preferred).
- **Daily-publish CMS** — a non-technical editor (Marina) uploads the best photo of the day + ~4 lines, daily, without dev help; controls which text/images are editable. Video uploadable (~quarterly).
- **Custom build confirmed (not Shopify/off-the-shelf)** — bespoke interactions + daily CMS justify custom: *"אחרי שהבנתי למה אתה מכוון… עדיף לעשות custom."*

### Reference & brand

- **Reference split:** cartonlab (Spanish) **composition** for the catalog/projects; mediagarden (Swedish) clean spec/price-table style is **reserved for the Phase-2 shop**. *"ניראה כמו השוודים בחנות ואת כל השאר כמו ספרדים."*
- **Wordmark:** "Pic Pong.biz" (the `.biz` is part of the mark).

### Still open (resolve before/while building)

- Quote-form behavior when "+" is on a **video** vs. an image; "+" round button vs. a "more-info" text link; exact form field set (minimal vs. fuller); SEO approach for cardboard-booth searches; projects tile display (one big image vs. slideshow); autoplay-video size on the homepage; exactly what a rep shares when deep-linking a project page. *(See `meeting1-analysis.md` §8 Open Questions Q1–Q8.)*
