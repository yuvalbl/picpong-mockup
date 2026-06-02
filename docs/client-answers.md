# Picpong — Client Answers (Phase 2)

> **Status:** Partial. Captures the 4 decisions locked on the 2026-05-31 client call. Remaining questions in `redesign-plan.md` §4 are deferred to build time (fast-track to mockups agreed).
> **Last updated:** 2026-05-31

## Locked decisions (2026-05-31)

1. **Primary reference:** https://cartonlab.com/en — "I want just like it" from every perspective (look, structure, UX, copy). Mediagarden demoted to secondary (commerce/SKU-table ideas only).

2. **Commerce model:** Full e-commerce — cart + checkout + online payment. (Note: cartonlab itself is quote-only / "Contact us"; real commerce is our addition. Keep cartonlab's dual-funnel: a buy-now lane **and** a project-enquiry lane.)

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
