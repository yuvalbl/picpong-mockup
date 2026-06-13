# Implementation estimate — Picpong lead-gen site (PRD 1–3)

> **What this estimates:** the **real production build** of the bilingual lead-generation catalog described by PRD 1–3 — i.e. turning the signed-off `mockup-v4` into a live site.
> **NOT in scope:** commerce (cart/checkout/payments/pricing) and the interactive sales-rep portal — both are **Phase 2**.
> **Team assumption:** one expert developer building **entirely with Claude Code** (agent-orchestrated). Framework-conventional coding is held to a fast pace (e.g. dynamic OG ≈ 1 day, lead-email ≈ 1 day); work with a human/wall-clock floor is named separately and **not** compressed.
> **Stack:** Next.js (App Router) + TS, headless CMS (Sanity or Payload), Vercel, Resend/SendGrid, Tailwind + the mockup's tokens.
> **Method:** bottoms-up, re-derived from a fresh read of the actual mockup (1,257-line `app.js`, 1,867-line `styles.css`, 858 bilingual attribute pairs already authored). A day = ~6 focused dev-hours. Ranges are honest, not padded.
> **Status:** estimate for a client go/no-go. Date: 2026-06.

---

## 1. The head-start that makes this cheap

The expensive, ambiguous part of a web project — UX, IA, content model, every interaction, the bilingual/RTL behaviour, and the copy — is **already done and demonstrable** in `mockup-v4`. The headline machinery that *looks* like the hard part (the "+"/lead drawer, running selection + chips, share + clipboard, deep-link highlight-on-arrival, lightbox, live search, the rep-email demo) is **already built and debugged** and ports cheaply. So this is a **greenfield port of a finished design into a real stack** — the most AI-favourable kind of work — plus wiring the backend the mockup only represents.

## 2. Bottoms-up work breakdown

Each package tagged **[code]** (fast/conventional — held to the calibrated pace), **[judgement]** (modelling/QA — AI helps only modestly), **[wall-clock]** (approval/DNS — calendar, not dev-effort), or **[content]** (client-supplied).

| Group | Package | Tag | Days |
|---|---|---|---|
| **A. Scaffold** | Next.js+TS+Tailwind, port `styles.css` tokens → theme | code | 0.5–1 |
| | Vercel project, envs, preview deploys, domain | code | 0.5 |
| **B. i18n/RTL** | `/{he\|en}` routing, locale middleware, hreflang/canonical | code | 1–1.5 |
| | **RTL/bidi done right + pixel-match both directions** | judgement | 2–3 |
| **C. Port UI** | 7 pages → components + global chrome | code | 2.5–4 |
| | Re-wire interactions in React (drawer/selection/search/highlight/share/lightbox) | code | 1.5–2.5 |
| **D. CMS** | **Bilingual content model design** (types, paired EN/HE fields, refs, meta/OG, slug≠id) | judgement | 2–3 |
| | Schema → typed queries, image pipeline, render into components | code | 1.5–2.5 |
| | **Draft → preview → publish** (bilingual preview) | judgement | 1–2 |
| **E. URLs** | Slug rules (unique/auto-suffix), immutability + **301 on rename**, id≠slug | judgement | 1–1.5 |
| | `/m/<id>` resolver → 301 → canonical#item | code | 0.5 |
| **F. SEO/OG** | **Dynamic per-item OG images** (`opengraph-image.tsx`, per lang; +Hebrew font in OG runtime) | code | 1–1.5 |
| | Per-page title/meta/OG/Twitter from CMS, per lang; alt | code | 0.5–1 |
| | JSON-LD + per-language sitemap + robots | code | 0.5–1 |
| **G. Lead delivery** | Form → API → **templated rep email** (Resend + react-email) + deep links + validation | code | 1–1.5 |
| | `wa.me` hand-off (real number) | code | 0.25 |
| | Email sender-domain / SPF-DKIM verification | wall-clock | ~0 dev / 1–3 cal-days |
| **H. Search/states** | **Full-archive search** (whole published set, niqqud-normalized, AND chips) | judgement | 1.5–2.5 |
| | Loading skeletons / empty states → real fetches | code | 0.5 |
| **I. QA/launch** | **Design-fidelity + RTL/bidi QA** (pixel-match both dirs, real-device mobile) | judgement | 2–3 |
| | a11y + cross-browser + perf (video hero, image sizing) | judgement | 1–1.5 |
| | Launch: analytics, redirects, sitemap submit, deploy debugging | code | 0.5–1 |
| **J. Content** | Load real bilingual copy/alt/meta into CMS (gated by client supplying copy/translations/photos) | content | 1–3 dev (supply-gated) |

## 3. The number

- **Dev-effort: ≈ 25–37 developer-days → midpoint ~30 (≈ 6 weeks of pure dev).**
- **Realistic calendar: ~7–10 weeks → quote the client ~8 weeks** to a production-ready bilingual site *with real content loaded*.

The calendar exceeds the dev-effort because two things gate launch independent of coding speed: **email DNS verification** (1–3 wall-clock days) and, far more, **content supply + bilingual design-fidelity review loops** (the single most likely cause of slippage — see §4).

> This supersedes the earlier ~27–49-day figure: a fresh, unanchored re-estimate against the actual mockup landed lower, because the conventional-coding line items (OG, email, metadata, resolver, JSON-LD) genuinely collapse to hours-to-a-day each, and the heavy UX is already built.

## 4. Where the cost actually is

Conventional coding is cheap here, so the cost concentrates in **three buckets, none of which are "writing code":**

1. **CMS modelling + bilingual preview (D, ~4.5–7.5 d)** — paired-field strategy, references, slug/id invariants, working bilingual preview. Judgement; a wrong model means re-work after content loads.
2. **RTL/bidi + design-fidelity QA (B-RTL + I, ~5–7.5 d)** — pixel-matching a finished mockup in *both* directions on real devices is iterative human review, not generation. (The mockup being done makes this *cheaper* — clear target — but it's still the biggest pure-effort bucket.)
3. **Full-archive search (H, ~1.5–2.5 d)** — the one feature the mockup genuinely fakes (it filters rendered DOM); production needs a real index with Hebrew niqqud normalization.

**The line a skeptical client should hear:** the expensive-looking interaction design is the cheap part *because the mockup did it*; the money is in CMS judgement and bilingual QA. And the calendar's outer bound is set by **content supply, not engineering.**

## 5. Why "all Claude Code" ≠ a 90% cut (the honest frame)

The conventional coding genuinely collapses (Next.js has `opengraph-image.tsx`, react-email, `generateMetadata` built-in; the mockup ports near-1:1). But the 2025–26 evidence is consistent that AI compresses *code generation*, not *judgement/QA/integration*: Stanford's 100k-dev study measures 30–40% gains on greenfield-simple work dropping to ~0–10% on complex/legacy; METR's 2025 RCT even found experienced devs 19% *slower* on code they know deeply, while *feeling* faster. So the floors above (CMS modelling, RTL QA, content, DNS/approvals, review loops) stay roughly uncompressed. That's why this lands at ~30 dev-days, not ~5 — the cut is "the heavy UX was pre-built and conventional coding is hours," not "AI does everything in an afternoon."
*(Sources: METR RCT 2025 / arXiv 2507.09089; Stanford "100k developers" (Denisov-Blanch); GitClear 2025; DORA 2025.)*

## 6. The swing factors (worth more than a spec)

1. **CMS choice & getting the bilingual model right first time** (Sanity hosted vs Payload self-hosted) — swings group D by ±3–4 days; a wrong paired-field strategy forces a re-model after content loads.
2. **Content & translation supply** — swings the *calendar* by weeks independent of dev. Prompt final HE+EN copy/alt/photos → ~8 weeks; trickling content or re-shoots → open-ended.
3. **Search scope & RTL-QA tolerance** — "search the rendered set" (≈ the mockup, cheap) vs "full archive, niqqud-normalized" (+1.5–2.5 d, maybe a hosted-search dependency); and "good" vs "indistinguishable-from-mockup in Hebrew on a phone" swings QA by 2–3 days.

## 7. Recommendation on the spec & pricing

- **Don't write a full tech spec before the client agrees** — the mockup + PRDs already removed the expensive ambiguity. The variance that remains is the three *decisions* in §6, answerable in a 60–90 min call, not a spec.
- If the client wants a **fixed price**, propose a small **paid discovery sprint (2–3 days)** producing a stack-decision + data model + firm quote — only once they're a yes-in-principle.
- **Pricing model:** price on value/outcome/fixed-scope, not hourly. When AI makes conventional coding hours-cheap, hourly billing hands the client the discount for identical output; weight the price toward the phases that don't compress (CMS modelling, bilingual QA, content ops).

## 8. Explicitly excluded (so the number isn't misread)

- All Phase 2 commerce (cart/checkout/payments/pricing/SKU).
- Sales-rep portal / interactive rep-receiving experience / WhatsApp-format rep view (PRD 3 L-7). Only the **static templated rep email** (G) is in.
- **WhatsApp Business API** + unified inbox (the build uses the visitor's own `wa.me`, which needs no approval).
- Live Facebook import/curation into the CMS (Marina curates manually).
- Photo re-shoot / asset re-sourcing (real source images are thin, low-res 2018 phone photos — a client/production task).
- Dedicated Hebrew/English **SEO audit** (PRD D-7 schedules it *after* content lands — budget separately).
- Content creation (copywriting, translation, photography), CMS training for the editor, and ongoing maintenance.
