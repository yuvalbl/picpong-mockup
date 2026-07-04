# Picpong — Sitemap & IA (Phase 3, fast-track)

> Derived from cartonlab's IA × Picpong content × locked decisions (`client-answers.md`). Scope = conferences / events / exhibitions, eco/cardboard-led.
> ⚠️ **AMENDED 2026-06-03 (concept review):** Phase 1 is a **single-funnel lead-gen catalog** — commerce (cart/checkout/account) is **Phase 2**; the shop is now a browse-only **catalog**; the Hebrew `/he/` mirror is **promoted to Phase 1**. Source: `docs/human-review/meeting1-analysis.md`; embodied in `docs/prd/01-foundation-structure.md`. Amended items are flagged inline below; history preserved.
> **Last updated:** 2026-06-09

## 1. Sitemap

> **Phasing note:** here "Phase 1 / Phase 2" are the **build phases** (Phase 1 = the lead-gen catalog we build now; Phase 2 = the later commerce build) — *not* `redesign-plan.md`'s process Phases 0–6.

### Phase 1 (this build — lead-gen catalog)

```
/                            Home — single enquiry/quote funnel (video-first; collage; per-media "+")
/products/                   Catalog — category index, browse-only (no cart). Use-case taxonomy.
  /products/exhibition-stands/      category landing (intro + filter rail + grid)
    /products/exhibition-stands/<product>/   Item page (browse-only): gallery, spec info, "request a quote on this" CTA + per-media "+"  — NO price/cart
  /products/event-furniture/
  /products/displays-totems/
  /products/photocall-walls/        (selfie / photo / press walls)
  /products/modular-eco-stands/
  /products/decor-trees/            (cardboard trees, decor)
/projects/                   Projects index — searchable, variable-size collage of project tiles
  /projects/<slug>/          Project page (lightweight): H1 + H2 + one-or-more images + quote CTA (keyword-rich slug)
/sustainability/             Why cardboard / X-Board hero — FSC, recyclable, made-to-order proof
/about/                      Studio story, founders, team, dated milestones
/contact/                    Structured quote/enquiry form (cartonlab lacks this — we add it) + details  [†]
/legal/                      privacy · terms · returns · cookies
/he/...                      Hebrew + RTL mirror — Phase 1 (geo-detected default; manual switch)
/blog/                       (optional — confirm with client)
```

**Global components (every page, both languages):**
- **Floating contact form** — persistent/floating on every page (name / phone / email / message; exact field set open).
- **Per-media "+" / quote affordance** — every media item (image *or* video) carries a fixed "+ / more info" button that opens the quote form pre-bound to that item, showing its thumbnail.

> **Catalog = browse-only.** "Shop" is renamed **Catalog** for Phase 1; `/products/<product>/` is a browse/detail page (gallery + spec info + a "request a quote on this" CTA), **not** a PDP with price/cart. Option chips are informational specs, not price modifiers.

> **[†] Contact:** In the **v4 mockup**, Contact is a **home section + the global floating contact form** (per `prd/01-foundation-structure.md` DM-6), not a standalone page. `/contact/` remains a destination in the **production IA** above. The two don't disagree — the mockup just consolidates pages.

### Phase 2 (not in this build — commerce)

```
/cart/                       Cart
/checkout/                   Checkout (Stripe) — build-plan
/order-confirmation/
/account/                    Order history, saved artwork/templates
```

> These commerce pages, plus the mediagarden-style SKU + price + spec tables and add-to-cart on the catalog/item pages, are **deferred to Phase 2** per the 2026-06-03 concept review. *(Source: `meeting1-analysis.md` §3; `client-answers.md` 2026-06-03 update.)*

**Content note:** like cartonlab, the **project gallery carries credibility** (cartonlab = ~95 projects vs 7 products). Plan for a deep, searchable, named-client project archive — Picpong already has 60+ cases to migrate. Note the per-project page is intentionally **lightweight** (H1 + H2 + image(s)), not a rolling multi-image case study — we lack enough quality images per project (`meeting1-analysis.md` FR-14).

## 2. URL scheme
- **Catalog URL deliberately stays `/products/`** even though the page is labeled "Catalog" and the v4 mockup file is `catalog.html` — the public URL is kept as `/products/` because it's a browse catalog and keyword-rich/SEO-friendly. The "Catalog" rename is a label/nav change, not a URL change.
- Categories hierarchical: `/products/<category>/`, products flat-ish under category: `/products/<category>/<product>/`.
- Projects flat with keyword-rich slugs: `/projects/cardboard-booth-<event>-<city>/`.
- Language prefix `/he/` for Hebrew (English at root). **Phase 1** (was phase 2) — default is geo-detected (Israel → `/he/`, else root), with a manual switch.

## 3. Nav design
- **Primary header (slim, sticky, cream→ink):** Catalog · Projects · Sustainability · About · Contact + search · social icons (FB/IG/LinkedIn) · lang (EN/HE). *(Phase 1: **no account, no cart badge** — those return in Phase 2.)*
- **Catalog = mega-menu** with category thumbnails (cartonlab pattern).
- **Projects = dropdown** (Events / Exhibitions / Trade-Show Booths).
- **Context recolor:** Projects pages flip nav to dark `#333` + white (cartonlab "gallery mode").
- Footer: multi-column (Picpong / Catalog / Info) + social + eco/cert logos + lang/legal.

## 4. Single enquiry/quote funnel (Phase 1)

> ⚠️ **AMENDED 2026-06-03:** the cartonlab **dual-funnel** home (buy lane + enquiry lane) is collapsed to a **single enquiry/quote funnel** for Phase 1, since commerce is Phase 2. Original dual-funnel intent preserved below for the Phase-2 shop.

**Phase 1:** one lead path — *"Tell us about your project / request a quote."* Every page funnels to a quote: the floating contact form, the per-media "+" (quote pre-bound to a specific item, with thumbnail), and section CTAs. No buy/add-to-cart lane.

**Phase 2 (deferred — cartonlab carryover):** "You choose how to start" → **Route A: Shop online** (ready-to-order products, price + cart) · **Route B: Custom project** (tailored solutions → enquiry). Two CTA lanes: *Add to cart* / *Buy* + *Tell us about your project*. The mediagarden style is reserved for this Phase-2 shop.
