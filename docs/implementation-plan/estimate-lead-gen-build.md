# Implementation estimate — Picpong lead-gen site (PRD 1–3)

> **What this estimates:** the **real production build** of the bilingual lead-generation catalog described by PRD 1 (foundation), PRD 2 (lead capture), and PRD 3 (discovery & chrome) — i.e. turning the signed-off `mockup-v4` into a live site.
> **NOT in scope:** commerce (cart / checkout / payments / variant pricing) and the interactive sales-rep portal — both are **Phase 2**.
> **Team assumption:** one senior developer who builds primarily with **Claude Code** (agent-orchestrated, not hand-typed).
> **Status:** estimate for a client go/no-go. Ranges, not a fixed bid (see §6).
> **Date:** 2026-06.

---

## 1. The big head-start

The expensive, ambiguous part of a web project — UX, information architecture, content model, every interaction, the bilingual/RTL behaviour, and the actual copy — is **already done and demonstrable** in `mockup-v4`. This is roughly what a discovery + design phase normally produces, delivered as a clickable artifact the client can sign off. So this build is **mostly a greenfield *port* of a finished design into a real stack**, which is the most AI-favourable kind of work (see §4).

**Recommended stack** (from `docs/build-plan.md`, minus commerce): Next.js 15 (App Router) + TypeScript, a headless CMS (Sanity managed, or Payload self-hosted), Vercel hosting, an email provider (Resend/SendGrid) for lead delivery. Tailwind + the existing design tokens.

## 2. Work breakdown

Two columns: a **traditional** senior-dev estimate, and an **AI-adjusted** one. The adjustment is applied *per phase* — aggressively to code-generation work, barely at all to judgement / integration / QA / content work (the evidence for why is in §4).

| # | Work package | Type | Traditional (days) | AI-adjusted (days) |
|---|---|---|---|---|
| 1 | Scaffold: Next.js + TS + Tailwind/tokens + lint/test/CI + Vercel | code | 2–4 | 1–2 |
| 2 | **Port the mockup UI → React components** (all pages + drawer, lightbox, search, share, highlight, lead flow) | code (bulk) | 6–10 | 3–5 |
| 3 | i18n: he/en, RTL, path-prefix routing, no auto-translate | mixed (RTL = judgement) | 3–5 | 2–4 |
| 4 | CMS setup + bilingual content model (projects/products/feed/clients, paired EN+HE fields, per-item meta/OG) | judgement | 5–8 | 4–7 |
| 5 | Draft → preview → publish (staging) | code | 2–4 | 1.5–3 |
| 6 | Real URLs: slug rules (unique/immutable/301), hreflang/canonical, `/m/<id>` resolver | code | 4–6 | 2–4 |
| 7 | Dynamic per-item SEO + **OG-image generation** per item/language | code | 3–5 | 2–3.5 |
| 8 | Lead delivery: form → templated rep email + live deep links | mixed (sender-domain approval = wall-clock) | 3–5 | 2.5–4.5 |
| 9 | Full-archive search (Pagefind/Fuse or CMS query) | code | 2–4 | 1–2.5 |
| 10 | JSON-LD + sitemap + robots + analytics | code | 2–3 | 1–2 |
| 11 | Content modelling + load real/sample content (client supplies copy/photos/translations) | client/judgement | 3–5 | 3–5 |
| 12 | QA / a11y / perf / **RTL** / cross-browser / Lighthouse / launch | judgement/review | 4–7 | 4–6.5 |
| | **Core subtotal** | | **≈ 40–66** | **≈ 27–49** |

**Variable add-ons** (price separately, in or out per the client):

| Add-on | Traditional | AI-adjusted |
|---|---|---|
| WhatsApp Business API + unified inbox | 4–8 | 3–6 |
| Automated Facebook curation/import (vs. manual paste) | 4–6 | 3–5 |

## 3. The number

- **Core build (AI-adjusted): ≈ 27–49 developer-days → roughly 6–10 working weeks → ~1.5–2.5 months** for one senior dev.
- **With likely add-ons + normal coordination/revision overhead: ~2–3 months** (≈ 35–60 dev-days).

Compared with the traditional estimate (~40–66 core dev-days, ~2–3 months), the AI adjustment **trims roughly a quarter to a third off the project**, concentrated in the code-generation phases. It does **not** halve the project — see §4 for why.

## 4. Why "all Claude Code" does NOT mean "10× faster project" (the honest correction)

A common instinct is that an all-Claude-Code shop should cut estimates by 80–90%. The 2025–2026 evidence says otherwise: **AI speedups are real but task-dependent, and the headline multipliers are measured on the slice of work that compresses, not on whole projects.**

- **By task type** (Stanford "100k developers" study): **30–40%** faster on greenfield low-complexity (boilerplate/CRUD/UI), dropping to **0–10%** on legacy/complex work; blended average **~15–20%** *after* netting out rework. Practitioner decomposition (Wilkins): **~10× on scaffolding/boilerplate**, **~2× on complex logic/debugging**, **~1× on architecture/planning** — so a project that *looks* 12× faster weights down to **~3×** once you account for the real task mix, and lower still once non-coding work is included.
- **The honest counter-weight** (METR RCT, 2025): experienced devs were **19% *slower*** with AI on tasks in codebases they knew deeply — while *believing* they were faster. The slowdown is concentrated in deep-expertise/legacy work, i.e. the opposite of this build. (Stanford and METR agree: gain is near-zero on familiar/complex work, positive on greenfield/simple work.)
- **What does NOT speed up** (the human-time floor): architecture & data/CMS modelling, stakeholder/client review loops, third-party integration approvals (email-sender domain verification, WhatsApp Business API review — wall-clock waits), **design-fidelity QA and RTL/Hebrew/i18n edge cases** (exactly the "hallucination-prone" zone for models), and deployment/infra debugging (DORA 2025: AI raises throughput but *worsens* delivery stability — time shifts from writing to auditing).
- **Rework tax:** GitClear finds AI-era code churn and duplication rising (copy-paste up ~48% relative; refactoring down); budget a ~10–15% rework buffer on the AI-generated portion.

**Applied to this project:** it sits in the most AI-favourable quadrant (greenfield + popular stack + design already done), so the *coding* layer genuinely collapses (~2× and locally much more). But coding is only ~half the work; the CMS modelling, RTL QA, integrations, content, and review loops — the other ~40–50% — barely move. Net realistic blended multiplier vs. a traditional senior-dev estimate: **~1.5–2.5× (≈2×) on the build**, which is why the project trims ~25–35%, not 90%.

> **Estimation discipline:** estimate *per phase*, apply the aggressive multiplier only to scaffolding/CRUD/UI, keep ~1× on architecture/integration/QA/RTL/review, and add a rework buffer. Beware the "felt faster than it was" perception gap (METR) — estimating from felt speed systematically under-quotes.

## 5. The four decisions that move the number (instead of a spec)

You do **not** need a full tech spec to quote this — the mockup already removed the expensive ambiguity. The variance that remains is four *business* decisions, answerable in a 60–90 min call:

1. **CMS** — managed SaaS (Sanity: faster, built-in preview + i18n, monthly fee) vs. self-hosted (Payload: no licence, in-repo, more build). *Biggest single swing.*
2. **WhatsApp Business API + unified inbox** — Phase 1 or deferred? (API approval is calendar time.)
3. **Hosting/runtime** — Vercel + Next.js assumed; confirm.
4. **Who supplies content** — Hebrew + English copy, photography, translations. (Dev chasing content balloons the estimate.)

## 6. Recommendation on the spec, and on pricing

- **Don't write a full tech spec before the client agrees** — it's days of unpaid work and the mockup + PRDs already de-risk the scope. A **ranged ballpark** (this document) is honest and standard for a proposal.
- If the client wants a **fixed price** (not time-and-materials), propose a small **paid discovery sprint (3–5 days)** that produces a stack-decision memo + data model + a firm quote — but only once they're a yes-in-principle.
- **Pricing model:** the 2025–2026 agency trend is *away from hourly billing*, because hourly literally "pays you for inefficiency" — if AI cuts a 20-hr task to 5, hourly billing hands the client a 75% discount for identical output. Price on **value / outcome / fixed-scope**, and let the internal day-count drop. Weight the visible price toward the phases that *don't* compress (discovery, content, integrations, QA).

## 7. Explicitly excluded (so the number isn't misread)

- Commerce: cart / checkout / payments / variant pricing (Phase 2).
- Interactive sales-rep portal + WhatsApp-format rep view (Phase 2 / PRD 3 L-7).
- Content creation: photography, copywriting, **translation** (client or separate vendor).
- Hebrew/English SEO audit and ongoing marketing.
- Third-party licence/hosting fees (CMS SaaS, email provider, hosting).
- WhatsApp Business *account approval* lead time (calendar, not dev).

---

### Sources for the §4 multipliers
METR RCT (metr.org, 2025; arXiv 2507.09089) · Stanford "100k developers" (Denisov-Blanch; Proxify/Aviator summaries) · Wilkins, "The Claude Code Productivity Paradox" (2026) · GitClear AI Code Quality 2025 · DORA 2025 (Google Cloud) · DigitalApplied & Digital Agency Network, AI-era agency pricing 2026.
