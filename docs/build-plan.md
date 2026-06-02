# Picpong Website — Build & Launch Plan (Phase 7–8)

> **Status:** PARKED. Future engagement. Do not start until the mockup track ([`redesign-plan.md`](./redesign-plan.md), Phases 0–6) is complete and the hi-fi mockups are signed off by the client.
> **Scope:** This file holds the real-code build: tech-stack PoC, full production build, QA, launch. It was split out of `redesign-plan.md` to keep the design/mockup track separate from the build track.
> **Owner:** Yuval
> **Reference competitor (primary):** https://cartonlab.com/en
> **Reference competitor (secondary):** https://www.mediagarden.se/en

---

## Table of Contents

1. [Phase 7 — Tech-Stack PoC (Order Flow)](#1-phase-7--tech-stack-poc-order-flow)
2. [Phase 8 — Build, QA, Launch](#2-phase-8--build-qa-launch)
3. [Skill Cheat-Sheet (build phases)](#3-skill-cheat-sheet-build-phases)

---

## 1. Phase 7 — Tech-Stack PoC (Order Flow)

### TOC
- [1.1 Why PoC first](#11-why-poc-first)
- [1.2 Recommended stack](#12-recommended-stack)
- [1.3 PoC scope](#13-poc-scope)
- [1.4 Decision gate](#14-decision-gate)

### 1.1 Why PoC first
Order flow is the **highest-risk part**: custom-sized printed goods, variant pricing, quote-vs-buy split, possible PO checkout, multilingual + multi-currency, eco add-ons. Validate stack before full build.

### 1.2 Recommended stack
- **Next.js 15 (App Router) + TypeScript** — flexibility, SSR, edge-friendly.
- **Headless commerce:** Shopify Storefront API **or** Medusa (open-source, self-hosted, fully customizable). Pick after PoC.
- **CMS:** Sanity (best DX) or Payload (TS-native, OSS, lives in repo).
- **Payments:** Stripe + (Israel-specific) Tranzila / Bit if local cards required.
- **Styling:** Tailwind + shadcn/ui base, customized.
- **Hosting:** Vercel.
- **Forms / quote requests:** route to CRM (per client answer #18) + fallback email.

### 1.3 PoC scope
Build one product category end-to-end:
- Catalog page with filters
- Product detail with variants + price calc + add-to-cart **and** quote-request alternative
- Cart drawer
- Checkout with Stripe sandbox
- Order confirmation + admin notification
- Sanity/Payload CMS editing the product

### 1.4 Decision gate
Compare Shopify vs Medusa on: customization headroom, multilingual support, B2B quote flow, hosting cost, dev velocity. Lock stack.

**Skills to use here:**
- `setup-dev-tools` → scaffold dev menu + test-user tooling (per project skill).
- `setup-tests-and-lint` → ESLint, Prettier, Husky, Vitest, Playwright from day 1.
- `setup-code-quality` → project-specific `/code-quality` skill so the whole team enforces the same standards.

**Output:** working PoC at `apps/web/` + decision memo at `docs/tech/stack-decision.md`.

---

## 2. Phase 8 — Build, QA, Launch

### TOC
- [2.1 Build order](#21-build-order)
- [2.2 QA](#22-qa)
- [2.3 Pre-launch checklist](#23-pre-launch-checklist)
- [2.4 Launch & post-launch](#24-launch--post-launch)

### 2.1 Build order
1. Design tokens + component library code parity with Figma.
2. Layout shell (nav, footer).
3. Home.
4. Product detail (most complex template).
5. Product category.
6. Projects index + detail.
7. Sustainability, About, Contact, Catalogs.
8. Cart → Checkout → Order confirmation.
9. Account area.
10. Legal pages.
11. Hebrew + RTL (phase 2).

### 2.2 QA
- Lighthouse on every key page (target ≥ 90 perf/a11y/SEO).
- Real-device mobile Safari + Chrome for cart/checkout.
- Sandbox payment for 3 representative orders.
- Axe / Pa11y accessibility audit.
- Cross-browser smoke (Chrome, Safari, Firefox, Edge).
- Visual regression: Playwright screenshot diffs against approved mocks.

**Skills to use here:**
- `ad-hoc-test` → after each feature, visually verify in real browser before claiming "done".
- `simplify` → review changed code for reuse & clarity at end of each PR.
- `code-review:code-review` / `pr-review-toolkit:review-pr` → PR review before merge.
- `security-review` → before launch, full security pass.

### 2.3 Pre-launch checklist
- SEO meta + Open Graph per page.
- Sitemap.xml + robots.txt.
- 301s from old picpong URLs to new equivalents.
- GA4 + consent banner (GDPR).
- Privacy + terms + returns published.
- Catalog PDFs uploaded.
- Domain + SSL + CDN.

### 2.4 Launch & post-launch
- Staged launch on subdomain → QA → DNS cutover.
- Monitor: error tracking (Sentry), uptime, Stripe webhook reliability.
- Week-1 client review of analytics + first conversions.

**Output:** live site + post-launch retrospective at `docs/launch-retrospective.md`.

---

## 3. Skill Cheat-Sheet (build phases)

| Phase | Activity | Skill to invoke | Why |
|-------|----------|-----------------|-----|
| 7 (PoC) | Scaffold dev tooling, test users, dev menu | `setup-dev-tools` | One-shot scaffold of Supabase test users + DEV menu |
| 7 (PoC) | Test + lint infrastructure | `setup-tests-and-lint` | ESLint 9, Prettier, Husky, Vitest, Playwright |
| 7 (PoC) | Project-specific code-quality skill | `setup-code-quality` | Generates `/code-quality` skill scoped to our stack |
| 8 (build) | Build component or page | `frontend-design:frontend-design` | Default for any React/Next component work |
| 8 (build) | After every UI change | `ad-hoc-test` | Real-browser Playwright verification |
| 8 (build) | After every PR | `simplify` + `code-review:code-review` | Quality gate |
| 8 (pre-launch) | Security pass | `security-review` | Full audit of pending changes |

---

**Entry condition:** mockups signed off (`redesign-plan.md` Phase 6 gate cleared).
