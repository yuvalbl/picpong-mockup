# PRD 3 — Discovery & Chrome  ·  BRIEF (not yet written)

> **This file is a brief, not a spec.** It tells whoever writes PRD 3 what it's for, what it must contain, what to read first, and the meeting context that shaped it. The contents below are a scaffold, not final requirements.
> **Build context:** **UI-only** in `mockup-v4/`. The CMS and real integrations are **represented with static placeholders**, not built — flagged as build notes.

## 1. Purpose

Specify how visitors (and Google, and sales reps) **find** things, plus the remaining **chrome** that PRD 1 only reserved slots for. This is what turns the catalog from a pretty gallery into something discoverable and shareable: **projects search**, **SEO-shaped markup**, **social links**, and a static **representation of the daily-publish CMS**.

## 2. What this PRD will contain

1. **Projects search** (behavior for the field PRD 1 §7.4 placed): client-side search over project tiles (title / H2 / tag / client), and how it composes with the existing filter chips (`[data-filterbar]`). Empty-result state. (resolves Open Q5/Q8 context)
2. **SEO-shaped markup:** per-page **H1 + H2** discipline (already structural in PRD 1 §7.4/7.5 — here, define the *strategy*): `<title>`/meta-description patterns, **target keywords** ("דוכן מקרטון", "דלפק מקרטון", "שולחן מקרטון", "תערוכה מקרטון"), the **project slug scheme** for deep-links, image `alt` conventions, and a note on structured data. (FR-27/28)
3. **Deep-link / share for reps:** what a sales rep sees/shares when sending a prospect to a specific project page (resolves Open Q8) — e.g. clean slug, share affordance.
4. **Social links:** finalize Facebook / Instagram / LinkedIn (TikTok later) — real URLs and final placement (header and/or footer). Note: **Facebook is the source of the pro photos** (Open Q3). (FR-3)
5. **CMS representation (static):** show what *"daily-updated"* content looks like using static placeholders; **document which regions/fields are editable vs fixed** (extends the "media item" content model from PRD 1 §6.1); represent the **1 photo + ~4 lines** daily-publish pattern and quarterly video. Real CMS = build note. (FR-24/25/26)
6. **Content states:** placeholders for loading/empty where relevant (mock).

Covers requirements: **FR-3, FR-12/13 (search behavior), FR-24/25/26 (CMS representation), FR-27/28** (see `meeting1-analysis.md` §4.1, §4.5, §4.9, §4.10).

## 3. Read before writing this PRD

- `docs/human-review/meeting1-analysis.md` — esp. **§4.1** (chrome/social), **§4.5** (projects/search), **§4.9** (CMS), **§4.10** (SEO), and Open Questions **Q3, Q5, Q8**.
- `docs/prd/01-foundation-structure.md` — esp. **§4** (IA / filenames / slugs), **§5** (social slot), **§6.2** (project tile + searchable text), **§7.4/7.5** (search field placement, H1/H2), **§6.1** (content model to extend for the CMS).
- `mockup-v3/projects.html` + `mockup-v3/js/app.js` — the existing **filter bar** (`[data-filterbar]` / `[data-filter]`) that search must compose with.
- `docs/analysis/picpong/asset-map.md` + `docs/analysis/picpong/` — the real project/asset library and provenance, for slugs, alt text, and which images exist (relevant to Q3 Facebook photos).
- *(optional)* `docs/ia/sitemap.md` — current URL/slug scheme (note: being revised per the meeting; reconcile).
- *(optional)* `docs/analysis/cartonlab/copy.md` — voice/keywords reference.

## 4. Context from the concept-review meeting (2026-06-03)

- **SEO is a stated driver, not an afterthought:** *"הרבה אנשים מחפשים דוכן מקרטון. זאת מילה מובילה… אני רוצה שיגיעו אלינו."* Ranking for these high-intent Hebrew searches is a core goal.
- **Rep deep-linking:** *"אנשי המכירות שולחים בן אדם… לעמוד ספציפי באתר."* Project pages must be cleanly linkable/shareable.
- **Facebook = photo source:** there's a large library of professionally-shot images on Picpong's Facebook (Q3) — relevant to both the homepage collage and the CMS.
- **Daily publishing by a non-technical editor (Marina):** *"כל יום… בוחרת את התמונה הכי טובה ומעלה ורושמת ארבע שורות."* The CMS must feel that simple; videos roughly quarterly.
- **Hebrew-first:** keyword and copy work leads in Hebrew (English parallel).

## 5. Open questions to resolve while writing it

- **Q3** — how to use the Facebook pro-photo library on the homepage/projects.
- **Q5** — concrete SEO approach to capture "cardboard booth"-type searches.
- **Q8** — exactly what a rep sees/shares for a specific project page.
- Search scope (fields indexed) and the final **slug scheme** for deep-links.

---

> **Note — Phase 2 (Shop):** commerce (cart/checkout/payment/account, SKU+price+spec tables in the mediagarden style) is **out of scope** for mockup-v4 and will get its **own future PRD**. Not part of PRD 1–3.
