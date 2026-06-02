# Picpong Website Redesign — Master Plan

> **Scope:** MOCKUP TRACK ONLY (Phases 0–6). The real-code build, QA, and launch (former Phases 7–8) live in [`build-plan.md`](./build-plan.md) and are PARKED until the hi-fi mockups are signed off.
> **Owner:** Yuval
> **Last updated:** 2026-05-18
> **Primary reference (client's pick — "I want just like it"):** https://cartonlab.com/en
> **Secondary reference:** https://www.mediagarden.se/en
> **Current client site:** https://www.picpong.biz/en
>
> **Locked decisions (client call, 2026-05-31):** (1) Full e-commerce — cart + checkout + online pay (note: cartonlab is quote-only, so commerce is *our* addition on top of its look). (2) Lead with eco/cardboard like cartonlab; X-Board is the hero story. (3) Cartonlab is primary, mediagarden demoted to secondary. (4) Product scope mirrors cartonlab's content set (cardboard products for conferences / events / exhibitions).

---

## Table of Contents

1. [Context & Goal](#1-context--goal)
2. [Phase 0 — First-Pass Findings (already done)](#2-phase-0--first-pass-findings-already-done)
3. [Phase 1 — Deep Site Analysis (UI / UX / Visual)](#3-phase-1--deep-site-analysis-ui--ux--visual)
4. [Phase 2 — Client Meeting & Open Questions](#4-phase-2--client-meeting--open-questions)
5. [Phase 3 — Information Architecture & Page Map](#5-phase-3--information-architecture--page-map)
6. [Phase 4 — Visual Direction & Moodboard](#6-phase-4--visual-direction--moodboard)
7. [Phase 5 — Wireframes (lo-fi)](#7-phase-5--wireframes-lo-fi)
8. [Phase 6 — Hi-Fi Mockups, Page by Page](#8-phase-6--hi-fi-mockups-page-by-page)
9. [Build & Launch — moved to `build-plan.md`](#9-build--launch--moved-to-build-planmd)
10. [Skill Cheat-Sheet — Which UI/UX Skill, When](#10-skill-cheat-sheet--which-uiux-skill-when)
11. [Deliverables Index](#11-deliverables-index)
12. [Open Risks](#12-open-risks)

---

## 1. Context & Goal

### TOC
- [1.1 Client](#11-client)
- [1.2 Problem with current site](#12-problem-with-current-site)
- [1.3 Goal](#13-goal)
- [1.4 Constraints](#14-constraints)
- [1.5 Success criteria](#15-success-criteria)

### 1.1 Client
**Picpong** — printing house specializing in conferences, conventions, exhibitions: booths, cubes, signs, roll-ups, eco-friendly printed materials. Founded 2004 (Kuki Saad, David Hazan, Yoram Ravimi).

### 1.2 Problem with current site
- Outdated UI (especially homepage).
- Missing / broken product photography.
- No pricing, no SKUs, no cart, no online order flow.
- Weak product discovery, no testimonials, no quantified case studies.

### 1.3 Goal
Rebuild as a **modern, distinctive, e-commerce-enabled** site that matches **cartonlab.com's** look, structure, and tone (the client's explicit "just like it" reference) — warm-minimal editorial, eco/cardboard-led — while adding what cartonlab lacks: real **online order + pay** (cart, checkout, payments). Mediagarden is a secondary reference, used mainly for its commerce/SKU-table ideas.

### 1.4 Constraints
- English-first; Hebrew + RTL in phase 2.
- Global market.
- TypeScript stack preferred. Order flow is unique → need high flexibility (Next.js + headless commerce favored over off-the-shelf Shopify theme).
- CMS required (client edits content).
- Budget + timeline: TBD (dynamic for now).

### 1.5 Success criteria
- Cartonlab-grade visual quality (warm-minimal editorial), **better** UI than both reference and current.
- Lighthouse ≥ 90 on key pages.
- Working sandbox order end-to-end for at least one product family.
- Mobile-first parity.
- Sign-off from client at each phase gate.

**Output of this section:** alignment doc for client review (this section itself).

---

## 2. Phase 0 — First-Pass Findings (already done)

### TOC
- [2.1 Cartonlab snapshot (PRIMARY reference)](#21-cartonlab-snapshot-primary-reference)
- [2.2 Mediagarden snapshot (secondary)](#22-mediagarden-snapshot-secondary)
- [2.3 Picpong snapshot](#23-picpong-snapshot)
- [2.4 Working design direction](#24-working-design-direction)

### 2.1 Cartonlab snapshot (PRIMARY reference)
Full deep-analysis done — see `docs/analysis/cartonlab/{structure,design-ux,copy}.md`. Highlights:

- **Stack/model:** WordPress + WooCommerce + Stripe, but **catalog-as-showroom**: cart icon + "Add to cart" UI exist, yet **no prices, no working checkout** — every product ends at "Contact us". A store skin over a quote/lead-gen business. (We diverge here: client wants *real* commerce.)
- **Dual-funnel home:** "You choose how to start" → Route A "Shop online / 100 exclusive designs ready to order" vs Route B "Tailored solutions for unique ideas / Our projects". Two CTA lanes (buy now + tell-us-about-your-project) — maps exactly to our hybrid commerce + quote need.
- **Content asymmetry:** ~95 case studies vs only 7 live products. The **project gallery**, not the catalog, carries credibility. Use-case-first taxonomy (Events / Exhibitions / Trade Show Booths), not by print technique. Keyword-rich project slugs.
- **Product model worth copying:** spec-tab PDP (Dimensions · Weight · Resistance/Load · Assembly time · Certified material · 100% recyclable), per-product **customization upsell** ("Integrate your graphics…"), 5-step print flow on printable items.
- **Visual language (the "just like it"):** warm-minimal editorial / gallery feel. Cream `#F7F7F1` bg + near-black `#1A1A1A` ink (never pure black/white), warm-shifted greys, dark `#333` "gallery mode" for projects. Accent punches: orange `#FF7038`, lime `#D4EB34`, teal `#09B891`, lilac `#CABECE` — used on hovers/CTAs only, never as background fields.
- **Typography (biggest driver of premium feel):** light high-contrast serif **Harriet Text (Light)** for display headlines (76/52px, *negative* tracking) + neo-grotesque **Residenz Grotesk** for body/UI. Self-hosted woff2. UPPERCASE reserved for 10–11px eyebrows.
- **Layout:** very wide ~1920px container, tight ~30px gutters, left-aligned, 3-col product grid, white rounded (12px) cards on cream with **near-zero shadow**, light↔dark section rhythm.
- **Motion:** one house easing `cubic-bezier(0.62,0.37,0.1,0.95)`; gentle AOS fade-ups, subtle card lift `translateY(-0.75rem)`, image zoom `scale(1.033)`, **color-swap button hovers**, blurred full-screen page transitions, a 40s marquee, a rotated sticker. ~95% calm, 5% wink.
- **Voice:** confident + craft-proud + eco-led + playful. Signature device = paradox two-liners ("Design to amaze. Build to disappear.", "Temporary is Extraordinary", "impact without a trace"). Leads with *impact*, eco as proof (FSC + 100% recyclable + made-to-order/no-waste). Sign-off "Keep Imagining".
- **Generic-wrong traps (must avoid):** cheap font subs (Inter+Playfair), cool greys instead of warm, pure #000/#FFF, zero tracking on big headlines, drop shadows on cards, many easing curves/parallax, centered narrow 1200px layout, shouty uppercase, accents as background fields.

### 2.2 Mediagarden snapshot (secondary)
- **Model:** B2B lead-gen. No cart. Named account managers (Mattias, Ulrika, Dov), direct phone numbers, email.
- **Nav:** Catalogs · Services · Inspiration · Contact.
- **Product categories (~16):** exhibition booths, expo walls, cubes, fold-up roll-ups, signage, podiums/tables, interior, brochure stands, product displays, dividers, ballot booths, photo/selfie walls, activity installs, trees, waste bins.
- **Sustainability proof:** FSC certified Re-board®, ISO 9001 + 14001, CO2e study (roll-up = 1/60th vinyl alternative), waste library, fossil-free transport.
- **Tone:** professional + warm + values-led. Quotes: *"You found us!"*, *"A whole fair in two bags"*, *"We ask you to reconsider."*
- **UI wins:** generous whitespace, clear SKU + price tables, named contacts, downloadable catalogs (Retail / Fair / Furniture), zoom-on-press galleries.
- **UI losses (we will beat):** product discovery buried in dropdown, no pricing on homepage, low interactivity, weak hero anchor.

### 2.3 Picpong snapshot
- **Sitemap:** Home · X-Board · Point of Sale · Exhibition Design · Activity Compounds · Interior & Space · Products for Businesses · Conferences & Events · Projects (60+) · About · Contact. Hebrew at root.
- **Reusable copy:** *"Basically… we print on everything"*, *"Your wish is our command"*, X-Board eco story, founder story.
- **Reusable client logos:** Microsoft, Intel, Google, Facebook, Maccabi, Clalit, Weizmann, Sheba, IDF/MoD, Daiso, Leonardo.
- **Reusable projects:** 60+ case studies under `/en/projects/` — but most images failed to load in first crawl, need fresh capture or re-shoot.
- **Critical gaps:** no real product photography, no pricing, no SKUs, no cart, no testimonials, no specs/dimensions, no order flow.

### 2.4 Working design direction
**"Cartonlab warm-minimal editorial + real commerce"** — clone cartonlab's visual + structural language (cream `#F7F7F1` canvas, Harriet-style light serif display + grotesque body, wide left-aligned editorial grid, white-on-cream 12px cards, one calm motion curve, eco/cardboard-led voice with paradox headlines) and **add what cartonlab refuses to**: visible pricing/specs, a working cart, checkout, and online payment — without breaking the calm. Dual-funnel home (buy-now lane + project-enquiry lane) carried over directly. Mediagarden kept only as a source for SKU/price-table layout ideas. Primary reference set = cartonlab; supporting references for craft level: Aesop, Are.na, Pentagram, Patagonia Provisions.

**Output of Phase 0:** This summary + the three `docs/analysis/cartonlab/` dossiers. Carries forward into Phase 4 moodboard.

---

## 3. Phase 1 — Deep Site Analysis (UI / UX / Visual)

> ⭐ **This is the most important phase. Execution quality here determines the quality of every later artifact.**
> Run AFTER the client meeting (Phase 2), so we crawl with confirmed scope, not assumptions.
>
> **STATUS (2026-05-31): Phase 1 ✅ COMPLETE.**
> - **Cartonlab** (primary) ✅ — `docs/analysis/cartonlab/{structure,design-ux,copy}.md` (IA, design/UX + copy-ready CSS tokens, voice).
> - **Picpong inventory** ✅ — `docs/analysis/picpong/inventory.md`. Correction: site is **healthy & content-rich** (the old "broken images" was a bad first render). Real work = curate + re-shoot + re-sequence to lead eco. Goldmine assets: **X-Board spec claims** (60-ton press, 100% recycled, flame-retardant, water-resistant, reusable), **74+ project archive** (Microsoft/Intel/Google/IBM/Landa…), **2004 founder story**.
> - **Picpong brand** ✅ — `docs/analysis/picpong/brand.md`. Brand orange **`#E67A2F`** (exact), pufferfish mascot (raster-only, needs SVG redraw), font Assistant (Hebrew).
> - **Mediagarden** (secondary, light commerce pass) ✅ — `docs/analysis/mediagarden/commerce-patterns.md`. Article-number SKUs + inline price modifiers + public price/spec tables + named account managers.

### TOC
- [3.1 Tooling setup](#31-tooling-setup)
- [3.2 Crawl Mediagarden — full sweep](#32-crawl-mediagarden--full-sweep)
- [3.3 Crawl Picpong — full sweep](#33-crawl-picpong--full-sweep)
- [3.4 Visual & motion deep-dive](#34-visual--motion-deep-dive)
- [3.5 Asset download (images + copy)](#35-asset-download-images--copy)
- [3.6 Gap matrix](#36-gap-matrix)
- [3.7 UX-pattern catalog](#37-ux-pattern-catalog)
- [3.8 Outputs of Phase 1](#38-outputs-of-phase-1)

### 3.1 Tooling setup
- **Primary:** Playwright MCP (interactive crawl, full-page screenshots, network capture for image URLs).
- **Fallback:** Browser MCP / direct WebFetch + `curl` for image download.
- **Secondary:** `wget --mirror` for static asset fetch (whitelist images only, respect robots.txt).
- **Storage:** all artifacts under `/docs/analysis/` in the repo.

**Output:** `docs/analysis/README.md` describing folder layout + how to reproduce.

### 3.2 Crawl Cartonlab (PRIMARY) — ✅ done + Mediagarden (secondary) — light pass

**Cartonlab — DONE.** Full structural / design-UX / copy dossiers in `docs/analysis/cartonlab/`. The design-UX file includes a copy-ready CSS token appendix (colors, fonts, motion curve, geometry) — this is the spine of Phase 4. If anything is missing for Phase 4/5, top it up rather than re-crawl.

**Mediagarden — light secondary pass only.** Do NOT do the full per-page sweep below for mediagarden. Capture just: their SKU/price-table layouts, B2B quote-vs-buy patterns, and named-contact module — the commerce ideas cartonlab lacks. Everything else is superseded by cartonlab.

The full per-page sweep procedure below now applies to **Picpong (§3.3)** as the asset-source crawl. (Retained here as the canonical method.) For **every** page:

1. Capture **full-page screenshot** at desktop (1440 wide) and mobile (390 wide). → `docs/analysis/mediagarden/screens/desktop/<slug>.png`, `…/mobile/<slug>.png`.
2. Save **DOM section outline**: list of sections in render order (hero, social-proof, product-grid, testimonial, FAQ, footer, etc.). → `docs/analysis/mediagarden/sections/<slug>.md`.
3. Save **all H1/H2/H3 text + every CTA** (label, position, destination). → `docs/analysis/mediagarden/copy/<slug>.md`.
4. Save **SKU / price tables** as CSV when present. → `docs/analysis/mediagarden/skus.csv` (single combined).
5. Record **image URLs** with alt text + dimensions. → `docs/analysis/mediagarden/images.json`.
6. Record **interaction states** (hover, click, carousel auto-advance timing). → `docs/analysis/mediagarden/interactions.md`.

**Output:** complete annotated archive of mediagarden in `docs/analysis/mediagarden/`. Sitemap JSON at `docs/analysis/mediagarden/sitemap.json`.

### 3.3 Crawl Picpong — full sweep
Same as 3.2, plus:

1. Crawl **all 60+ projects** under `/en/projects/`. Capture every gallery image at original resolution.
2. Capture the **Hebrew site** at `/` for content parity (phase-2 translation source).
3. Extract every reusable **copy block** (tagline, value props, founder bio, X-Board copy, client testimonials if any).
4. Extract every **client logo** at highest available resolution.
5. Flag every **low-res or broken image** that will need re-shoot or replacement.

**Output:** `docs/analysis/picpong/` mirror of 3.2 structure + `docs/analysis/picpong/inventory.json` listing every asset (image, copy block, client logo, project case) with reuse-readiness flag (`reuse | re-shoot | rewrite | discard`).

### 3.4 Visual & motion deep-dive
For each site separately:

1. **Color extraction:** sample dominant + accent colors per page using a script (e.g., `node-vibrant`). → `docs/analysis/<site>/colors.md` with hex swatches.
2. **Typography audit:** record font-family, weights, sizes, line-heights for H1/H2/H3/body/caption from computed styles. → `docs/analysis/<site>/typography.md`.
3. **Spacing system:** measure section padding, container width, grid gutters. → `docs/analysis/<site>/spacing.md`.
4. **Imagery treatment:** ratio, framing, color grading style, presence/absence of people, props, lifestyle vs studio. → `docs/analysis/<site>/imagery.md`.
5. **Motion inventory:** every transition, hover state, scroll trigger, carousel, lightbox. Note timing curves where visible. → `docs/analysis/<site>/motion.md`.
6. **Component inventory:** buttons, cards, form fields, nav, modal, breadcrumb. Screenshot each. → `docs/analysis/<site>/components/`.

**Output:** two parallel visual-language dossiers ready to feed Phase 4 moodboard.

### 3.5 Asset download (images + copy)
- Download **every product image** from picpong.biz at original resolution into `docs/analysis/picpong/assets/products/`.
- Download **every project gallery image** into `docs/analysis/picpong/assets/projects/<project-slug>/`.
- Download **every client logo** into `docs/analysis/picpong/assets/logos/`.
- Save **all body copy** as plain markdown per page in `docs/analysis/picpong/copy/`.
- Respect copyright: mediagarden images are **reference only** (screenshots), do NOT bulk-download their full-res image files.

**Output:** local repo-hosted asset library; CSV manifest mapping each asset to its source URL + reuse status.

### 3.6 Gap matrix
A spreadsheet-style markdown table comparing **every mediagarden page** vs **the equivalent picpong page**, with columns:

| Mediagarden page | Equivalent Picpong page | What we already have | What's missing | Who creates (copy / shoot / dev) | Priority |

→ `docs/analysis/gap-matrix.md`.

**Output:** the master checklist of work to create.

### 3.7 UX-pattern catalog
Catalog of reusable patterns observed (good and bad), with screenshot + 1-line verdict:

- Mega-menu vs simple dropdown
- Hero variants
- Product card variants
- Filter / facet UI for product index
- Cart drawer vs cart page
- Quote-builder vs add-to-cart
- Trust strip (logos)
- Sustainability proof callout
- Testimonial layouts
- Newsletter capture

→ `docs/analysis/ux-patterns.md`.

**Output:** pattern library ready for Phase 5 wireframing.

### 3.8 Outputs of Phase 1
1. `docs/analysis/mediagarden/` — full annotated archive
2. `docs/analysis/picpong/` — full inventory + downloaded assets
3. `docs/analysis/gap-matrix.md`
4. `docs/analysis/ux-patterns.md`
5. Reproducibility README

✅ **Quality bar:** if a designer can open `docs/analysis/` and reproduce both sites' look without ever visiting them, Phase 1 succeeded.

---

## 4. Phase 2 — Client Meeting & Open Questions

### TOC
- [4.1 Brand & visual](#41-brand--visual)
- [4.2 Business model & order flow](#42-business-model--order-flow)
- [4.3 Content & proof](#43-content--proof)
- [4.4 Technical & integrations](#44-technical--integrations)
- [4.5 Scope & pages](#45-scope--pages)
- [4.6 Project ops](#46-project-ops)

### 4.1 Brand & visual
1. Existing brand guide / logo / colors / fonts — exist? Evolve or full rebrand?
2. Approve "editorial minimalism" direction, or different vibe (bold, playful, industrial, eco-organic)?
3. Hebrew RTL phase-2 confirmed? Any third language?

### 4.2 Business model & order flow
4. Which products are truly stockable (fixed SKU + price + cart) vs quote-only (custom dimensions/print)? Most likely **hybrid** — need their list.
5. Pricing public, or behind B2B login?
6. Payment methods (credit card, PO/invoice for enterprise, Bit / PayPal / Apple Pay)?
7. Tax / VAT — Israel only, EU, global? Shipping zones?
8. Order fulfilment timeline shown at checkout?
9. Delivery + installation — bundled in price or add-on?
10. Returns / cancellation policy?

### 4.3 Content & proof
11. Real eco certifications (FSC, ISO, recycled %) — documents available, or marketing claim only?
12. Testimonials / quantified case-study results — can we collect from past clients?
13. Hi-res product photos exist anywhere? If not — funding for shoot?
14. Founder / team bios + photos — comfortable on site?
15. Press, awards, conference appearances?

### 4.4 Technical & integrations
16. Confirm stack: **Next.js + headless commerce** (recommended for flexibility) vs Shopify Hydrogen vs Webflow+Snipcart vs WooCommerce.
17. CMS preference — Sanity, Payload, Strapi, Shopify admin?
18. CRM / ERP integration — HubSpot, Salesforce, Priority, Pipedrive, none?
19. Email marketing — Mailchimp, Klaviyo, none?
20. Analytics — GA4 + Meta Pixel + Hotjar?
21. Live chat — Intercom, WhatsApp Business, none?
22. Quote-request form destination — email, CRM, both?

### 4.5 Scope & pages
23. Confirm page list:
    - Home
    - Product category landings (one per mediagarden equivalent)
    - Individual product pages (variants + price + add-to-cart OR quote)
    - Projects index + project detail
    - About / team
    - Sustainability / eco-materials
    - Catalogs / downloads
    - Contact
    - Cart / Checkout / Order confirmation / Account
    - Blog (yes/no?)
    - Legal (privacy, terms, returns)
24. Pages from current Picpong they want **removed**?

### 4.6 Project ops
25. Day-to-day client contact for approvals?
26. Sign-off process: wireframe → hi-fi → dev → review cycles?
27. Hosting preference (Vercel, AWS, client-owned)?

**Output:** Filled-in answers doc at `docs/client-answers.md`. Locks scope for Phases 3–8.

---

## 5. Phase 3 — Information Architecture & Page Map

### TOC
- [5.1 Sitemap proposal](#51-sitemap-proposal)
- [5.2 URL scheme](#52-url-scheme)
- [5.3 Nav design](#53-nav-design)
- [5.4 User flows](#54-user-flows)

### 5.1 Sitemap proposal
Tree diagram derived from mediagarden structure × picpong inventory × client answers.

### 5.2 URL scheme
- `/` (homepage)
- `/products/` (category index)
- `/products/<category-slug>/`
- `/products/<category-slug>/<product-slug>/`
- `/projects/` + `/projects/<slug>/`
- `/sustainability/`
- `/about/`
- `/contact/`
- `/catalogs/`
- `/cart/`, `/checkout/`, `/account/`
- Hebrew: `/he/...` mirror.

### 5.3 Nav design
- Primary: Products · Projects · Sustainability · About · Contact · Cart icon.
- Mega-menu for Products (category grid with visual previews).
- Sticky on scroll, transparent over hero on home.

### 5.4 User flows
Diagram (Mermaid) for: (a) buy a stock product, (b) request quote for custom, (c) browse case study → contact, (d) download catalog → email capture.

**Output:** `docs/ia/sitemap.md`, `docs/ia/user-flows.md` (with Mermaid diagrams).

---

## 6. Phase 4 — Visual Direction & Moodboard

### TOC
- [6.1 Reference brands](#61-reference-brands)
- [6.2 Color system](#62-color-system)
- [6.3 Typography system](#63-typography-system)
- [6.4 Imagery direction](#64-imagery-direction)
- [6.5 Motion principles](#65-motion-principles)
- [6.6 Client sign-off gate](#66-client-sign-off-gate)

> **Note:** the client locked cartonlab as "just like it", so Phase 4 is **derive-from-cartonlab**, not explore-from-scratch. Direction A = a faithful Picpong-ified cartonlab system (the default we present). Direction B (optional) = one *slightly* more differentiated variant so the client has a real choice, but A is the expected pick. Pull tokens straight from `docs/analysis/cartonlab/design-ux.md`.

### 6.1 Reference brands
Cartonlab is the anchor. Supporting craft references only where they raise the bar: Aesop, Are.na, Pentagram, Patagonia Provisions. Curate 6–8 screens max — the moodboard should read as "Picpong in cartonlab's language", not a generic mood collage.

### 6.2 Color system
Direction A starts from cartonlab's tokens: cream `#F7F7F1` canvas, ink `#1A1A1A`, dark gallery `#333333`, warm-shifted greys (`#6E6E6E`, `#B7B7AD`, `#E0E0D7`), accents orange `#FF7038` / lime `#D4EB34` / teal `#09B891` / lilac `#CABECE` (interaction punches only). Re-tune accents to Picpong's brand if a brand guide exists (client answer #1). Output hex + Tailwind tokens. **Warmth is load-bearing — no cool greys, no pure #000/#FFF.**

### 6.3 Typography system
Direction A mirrors cartonlab's logic: a **light high-contrast serif** for display (negative tracking at large sizes) + a **neo-grotesque sans** for body/UI, self-hosted woff2. Cartonlab uses Harriet Text + Residenz Grotesk — for Picpong, license those or pick close equivalents (avoid Inter/Poppins + Playfair — instant generic tell). UPPERCASE only for 10–11px eyebrows. Show the full scale (76 / 52 / 34 / 18 / 14 / 12 / 10px ladder).

### 6.4 Imagery direction
Photography brief: studio + on-location, props, lighting, color grade. Examples pulled into moodboard.

### 6.5 Motion principles
Copy cartonlab's motion discipline: **one** house easing (`cubic-bezier(0.62,0.37,0.1,0.95)`), durations 0.25–0.5s. Allowed: gentle fade-up on scroll, card lift `translateY(-0.75rem)`, image zoom `scale(1.033)`, color-swap button hovers, blurred full-screen page transition, optional marquee. **Forbidden** (cartonlab avoids these and so do we): multiple easing curves, bouncy/spring anims, heavy parallax, autoplay-loud carousels, drop shadows for depth.

### 6.6 Client sign-off gate
Present moodboard + 2 directions. Client picks one. **No mockups until this gate clears.**

> **STATUS (2026-05-31): Phase 4 deliverables ✅ COMPLETE — gate AWAITING CLIENT SIGN-OFF.**
> - Moodboard ✅ `docs/design/moodboard.md` (reconciled to the final system; references `concept.html`).
> - Visual direction (final) ✅ `docs/design/visual-direction-final.md` — Direction A "Cardboard monograph" + a real **Direction B "Printed-material"** (§12), so the gate is a genuine 2-direction choice. Includes the `anti-generic-design` scorecard (≈81/100).
> - Visual concept ✅ `docs/design/concept.html` (rendered one-page companion — palette, type, motion, the 4 ownable moves, pufferfish).
> - **Client sign-off package ✅ `docs/design/phase4-signoff.md`** — one-paragraph summary, palette/type/motion at a glance, the 4 ownable moves, the proposed page list, the explicit approve-to-unlock checklist, and the open item.
> - **Awaiting:** client picks Direction A (recommended) or B + approves the page list → unlocks Phase 5/6. Only open item: final page-list sign-off (proceeding on `docs/ia/sitemap.md`).

**Skills to use here:**
- `ui-ux-pro-max:ui-ux-pro-max` → palette and pairing generation, style references.
- `anti-generic-design` → audit moodboard for cookie-cutter patterns before presenting.

**Output:** `docs/design/moodboard.md`, `docs/design/visual-direction-final.md` (supersedes `visual-direction-v1.md`), `docs/design/concept.html`, `docs/design/phase4-signoff.md`.

---

## 7. Phase 5 — Wireframes (lo-fi)

### TOC
- [7.1 Template wireframes first](#71-template-wireframes-first)
- [7.2 Page wireframes](#72-page-wireframes)
- [7.3 Review loop](#73-review-loop)

### 7.1 Template wireframes first
Three templates unlock the rest:
1. **Home** — hero, category browser, sustainability proof, featured projects, testimonial, CTA, newsletter.
2. **Product category** — filter rail, grid, intro copy, comparison table.
3. **Product detail** — gallery, variant picker, price/quote toggle, specs, eco-credentials, related products, add-to-cart / request-quote.

### 7.2 Page wireframes
After templates approved, wireframe: Projects index, Project detail, Sustainability, About, Contact, Cart, Checkout, Account, Catalogs.

### 7.3 Review loop
Each wireframe presented in Figma; client comments inline; max 2 revision rounds per page before escalation.

**Skills to use here:**
- `product-design-review` → critique each wireframe BEFORE sending to client.
- `frontend-design:frontend-design` → only if we prototype any wireframe in code.

**Output:** Figma file `Picpong / Wireframes v1` + per-page screenshots committed to `docs/wireframes/<page>.png` for record.

---

## 8. Phase 6 — Hi-Fi Mockups, Page by Page

### TOC
- [8.1 Order of work](#81-order-of-work)
- [8.2 Per-page deliverable](#82-per-page-deliverable)
- [8.3 Component library](#83-component-library)

### 8.1 Order of work
Home → Product detail → Product category → Project detail → Projects index → Sustainability → About → Contact → Cart → Checkout → Account → Legal.

### 8.2 Per-page deliverable
For each page: desktop frame, mobile frame, hover/active states, empty/error states, loading skeleton. Plus a short markdown spec at `docs/design/pages/<page>.md` documenting copy, image specs, behavior.

### 8.3 Component library
Figma library: buttons, inputs, cards, nav, modal, drawer, tabs, accordion, breadcrumb, tag, badge, toast. Tokens mapped to Tailwind config in the eventual codebase.

**Skills to use here:**
- `ui-ux-pro-max:ui-ux-pro-max` → component design with proven patterns (shadcn/ui integrations).
- `anti-generic-design` → audit each hi-fi mockup before client review.
- `product-design-review` → critique whole-page mocks for hierarchy, conversion, accessibility.
- `frontend-design:frontend-design` → distinctive frontend code when we prototype in React/Next.

**Output:** Figma `Picpong / UI v1` + `docs/design/pages/` markdown specs.

---

## 9. Build & Launch — moved to `build-plan.md`

The real-code build (tech-stack PoC, full production build, QA, launch — former Phases 7–8) has been split into [`build-plan.md`](./build-plan.md). It is **parked** until the mockup track (Phases 0–6) clears the Phase 6 client sign-off gate.

---

## 10. Skill Cheat-Sheet — Which UI/UX Skill, When

| Phase | Activity | Skill to invoke | Why |
|-------|----------|-----------------|-----|
| 3 (analysis) | Compare reference + current site visuals | (no skill — use Explore agents + Playwright MCP) | Skills are for creation/review, analysis is research |
| 4 (visual direction) | Generate palette / font pairings / style options | `ui-ux-pro-max:ui-ux-pro-max` | 161 palettes, 57 pairings, 50+ styles — exactly the curation we need |
| 4 (visual direction) | Audit moodboard for generic patterns | `anti-generic-design` | Prevent cookie-cutter direction before client sees it |
| 5 (wireframes) | Critique each wireframe before client review | `product-design-review` | Catches hierarchy / flow issues early |
| 5 (wireframes) | If prototyping a wireframe in React | `frontend-design:frontend-design` | Avoids generic AI-looking code |
| 6 (hi-fi mockups) | Component design, layout, design system | `ui-ux-pro-max:ui-ux-pro-max` | shadcn/ui integration + proven patterns |
| 6 (hi-fi mockups) | Audit each finished mock before client | `anti-generic-design` + `product-design-review` | Two-pass: distinctiveness + product critique |
| 6 (hi-fi mockups) | Prototype any page in code for client demo | `frontend-design:frontend-design` | High-design distinctive code |

> Build-phase skills (`setup-dev-tools`, `setup-tests-and-lint`, `setup-code-quality`, `ad-hoc-test`, `simplify`, `code-review`, `security-review`) live in [`build-plan.md`](./build-plan.md).

**Rule of thumb (mockup track):** **analyze with agents, design with `ui-ux-pro-max`, audit with `anti-generic-design` + `product-design-review`, prototype with `frontend-design`.**

---

## 11. Deliverables Index

| Phase | Deliverable | Path |
|-------|-------------|------|
| 0 | This plan | `docs/redesign-plan.md` |
| 1 | Mediagarden archive (screens, copy, sections, SKUs, interactions, colors, typography, motion, components) | `docs/analysis/mediagarden/` |
| 1 | Picpong inventory (same + downloaded assets) | `docs/analysis/picpong/` |
| 1 | Gap matrix | `docs/analysis/gap-matrix.md` |
| 1 | UX pattern catalog | `docs/analysis/ux-patterns.md` |
| 2 | Client answers | `docs/client-answers.md` |
| 3 | Sitemap + user flows | `docs/ia/` |
| 4 | Moodboard + visual direction | `docs/design/moodboard.md`, `docs/design/visual-direction-final.md` |
| 5 | Wireframes | Figma + `docs/wireframes/` |
| 6 | Hi-fi mockups + page specs | Figma + `docs/design/pages/` |
| 7–8 | PoC, build, launch | **moved → [`build-plan.md`](./build-plan.md)** |

---

## 12. Open Risks

1. **Product photography quality (downgraded from "blocker")** — inventory confirms Picpong HAS a live image library + 74+ project archive, but it's uneven (good 2021–22, weak phone-grade 2018–19, no clean studio product shots like cartonlab's). For **mockups** we use existing 2021–22 heroes + placeholders. For **build/launch** the bar still needs a phased shoot (top-10 X-Board products + hero re-shoots) — that's the real cost, not content recovery.
2. **Commerce grafted onto a calm quote-catalog** — cartonlab has NO cart/checkout/account (it's "Contact us" only). We're adding real e-commerce that cartonlab never had to design. Risk: cart/checkout/account UI breaks the editorial calm. Mitigation: design those flows in cartonlab's language from the start (white-on-cream, pill buttons, one motion curve), keep the dual-funnel (buy-now + project-enquiry) lanes.
3. **Premium font licensing** — the premium feel rides on Harriet Text + Residenz Grotesk (or close equivalents). These are paid, self-hosted. Budget + license the pair early; cheap substitutes (Inter/Playfair) kill the look instantly.
4. **Custom-print order flow** — unique requirements may force Medusa over Shopify; lock at end of the build-plan PoC (see `build-plan.md`).
5. **Hebrew RTL parity** — if done badly, will require rework. Plan for RTL from component-library stage, not retrofit. (Cartonlab is LTR-only — no RTL reference to crib from.)
6. **Eco claims without proof** — risk of greenwashing perception. Since we now *lead* with eco/cardboard (X-Board), this risk rises: need real FSC/recyclable certs before publishing strong eco messaging.
7. **Old-URL SEO loss** — must inventory current ranking pages and map 301s before cutover.
8. **Scope creep** — phase gates with sign-off mitigate, but client expectations on "online ordering" need careful expectation-setting if some products stay quote-only.

---

**Next action:** **Phases 1–4 ✅ complete; Phase 4 gate AWAITING CLIENT SIGN-OFF.** Mockup blockers resolved (fonts = Fraunces + Hanken Grotesk; brand = Picpong orange `#E67A2F` + pufferfish). Phase 4 deliverables done: `docs/design/moodboard.md`, `visual-direction-final.md` (Direction A + Direction B §12, anti-generic scorecard ≈81), `concept.html` (rendered concept), and the client sign-off package `docs/design/phase4-signoff.md`. → **Present `phase4-signoff.md` + `concept.html` to the client.** On approval of Direction A (or B) + the page list, unlock **Phase 5 (lo-fi wireframes) → Phase 6 (hi-fi mockups)**. Only open client item: final page-list sign-off (proceeding on `docs/ia/sitemap.md` as default).
