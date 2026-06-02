# Picpong — Sitemap & IA (Phase 3, fast-track)

> Derived from cartonlab's IA × Picpong content × locked decisions (`client-answers.md`). Scope = conferences / events / exhibitions, eco/cardboard-led, full commerce + quote dual-funnel.
> **Last updated:** 2026-05-31

## 1. Sitemap

```
/                            Home — dual funnel (Shop lane + Projects/enquiry lane)
/products/                   Shop — category index (use-case taxonomy, like cartonlab)
  /products/exhibition-stands/      category landing (intro + filter rail + 3-col grid)
    /products/exhibition-stands/<product>/   PDP: gallery, specs tabs, price+cart, customization, quote-alt
  /products/event-furniture/
  /products/displays-totems/
  /products/photocall-walls/        (selfie / photo / press walls)
  /products/modular-eco-stands/
  /products/decor-trees/            (cardboard trees, decor)
/projects/                   Case-study gallery — filterable (Events / Exhibitions / Trade-Show Booths)
  /projects/<slug>/          Project detail — credits → narrative → related → CTA (keyword-rich slug)
/sustainability/             Why cardboard / X-Board hero — FSC, recyclable, made-to-order proof
/about/                      Studio story, founders, team, dated milestones
/contact/                    Structured quote/enquiry form (cartonlab lacks this — we add it) + details
/catalogs/                   Downloadable catalogs (email capture)
/cart/                       Cart
/checkout/                   Checkout (Stripe) — build-plan
/order-confirmation/
/account/                    Order history, saved artwork/templates
/blog/                       (optional — confirm with client)
/legal/                      privacy · terms · returns · cookies
/he/...                      Hebrew + RTL mirror (phase 2)
```

**Content note:** like cartonlab, the **project gallery carries credibility** (cartonlab = ~95 projects vs 7 products). Plan for a deep, filterable, named-client project archive — Picpong already has 60+ cases to migrate.

## 2. URL scheme
- Categories hierarchical: `/products/<category>/`, products flat-ish under category: `/products/<category>/<product>/`.
- Projects flat with keyword-rich slugs: `/projects/cardboard-booth-<event>-<city>/`.
- Language prefix `/he/` for Hebrew (English at root).

## 3. Nav design
- **Primary header (slim, sticky, cream→ink):** Products · Projects · Sustainability · About · Contact + search · account · **cart (badge)** · lang (EN/HE).
- **Products = mega-menu** with category thumbnails (cartonlab pattern).
- **Projects = dropdown** (Events / Exhibitions / Trade-Show Booths).
- **Context recolor:** Projects pages flip nav to dark `#333` + white (cartonlab "gallery mode").
- Footer: multi-column (Picpong / Products / Info) + social + eco/cert logos + lang/legal.

## 4. Dual-funnel home (cartonlab carryover)
"You choose how to start" → **Route A: Shop online** (ready-to-order products, price + cart) · **Route B: Custom project** (tailored solutions → enquiry). Two CTA lanes everywhere: *Add to cart* / *Buy* + *Tell us about your project*.
