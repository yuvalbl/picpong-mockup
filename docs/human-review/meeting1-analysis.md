# Meeting 1 — Requirements Analysis (input to the PRD)

> **Purpose:** Distill the concept-review meeting into the **requirements** for the Picpong website, as the basis for the **PRD**. This is the focus of the document — everything else (context, conflicts, open questions) exists to support writing those requirements.
> **Source:** `meeting1-summary.md` + `meeting1-transcript.md` (this folder).
> **Meeting:** 2026-06-03 · **Participants:** Yuval (design/product) × Kuki Saad (sales/business).
> **Status:** Analysis for review. Where a requirement contradicts an earlier *locked* decision (`client-answers.md`, 2026-05-31), it is **flagged as a decision the PRD must settle** — not silently applied.

---

## 1. Product goal & positioning

- **What it is:** a **lead-generation catalog** website for Picpong's **green (cardboard / X-Board)** event work. **Not a shop** in this phase.
- **Primary job:** **generate leads** and let a visitor **express interest in a specific item in one click**. Baseline today: 2–3 leads/day *despite* a site Kuki calls *"פח אשפה"* that loses visitors fast.
- **Secondary job:** a **sales tool** Kuki can show a **potential Czech manufacturing partner** — the partnership is about doing across Europe what Picpong does in Israel. The current site can't be shown: *"אני לא יכול… להראות את האתר הנוכחי שהוא בלגן."*
- **Positioning:** eco/green-led and **colorful** — *"בוא תעזור לנו להציל את העולם, בוא נהיה ירוקים."* Show only finished, colorful cardboard work; hide raw-cardboard, signage, perspex.

## 2. Target users

| User | Need | Implication for the site |
|---|---|---|
| **Event producers** (agencies) | Find a supplier, gauge capability fast | Strong visual proof; fast, low-friction enquiry |
| **Hi-tech employees** running an internal event (Microsoft/Google-type) | "I saw something I like, I can't describe it" | **Tap an image → request a quote on *that* image** |
| **Sales reps** (internal) | Send a customer **straight to a specific item** | **Deep-linkable** project/product pages |
| **Czech / Europe partner** | Judge Picpong as a partner | Polished, international-feeling, English-ready |
| **Content editor** (Marina) | Publish the day's best work quickly | **Daily-publish CMS**, 1 photo + ~4 lines |

## 3. Scope — Phase 1 vs Phase 2

**In (Phase 1):** product catalog (browse, no buy) · projects index + per-project pages · per-media quote capture · floating contact form · lead routing (email + WhatsApp) · daily-publish CMS + video · Hebrew/English (geo-detect, RTL) · SEO · social links.

**Out (→ Phase 2):** cart · checkout · online payment · account / order history · mediagarden-style SKU + price + spec tables (the "shop"). *"בוא נעשה את זה phase שתיים… אני לא מוכן במאת האחוזים לשופ מיידי."*

---

## 4. Functional requirements (the spine of the PRD)

> IDs are stable handles for the PRD to reference. "Source" = the meeting evidence justifying the requirement.

### 4.1 Chrome — header, social, language
- **FR-1 — Persistent header** with logo, primary nav, language switch, social icons.
- **FR-2 — Wordmark is "Pic Pong.biz"** (the `.biz` is part of the mark). *Source: Kuki insists on "Pic Pong.biz", not "Pic Pong".*
- **FR-3 — Social icons** for Facebook, Instagram, LinkedIn in the header/chrome (TikTok later).

### 4.2 Internationalization
- **FR-4 — Hebrew + English** supported in Phase 1.
- **FR-5 — Geo-detected default language**: Israel → Hebrew; unknown/other → English; with a **manual switch**. *Source: "אם זה ישראל שיזהה אותי ויתן לי עברית… ואם לא מזהה שייתן אנגלית."*
- **FR-6 — Full RTL** for Hebrew (layout, components, type).

### 4.3 Homepage
- **FR-7 — Video-first hero**: the homepage structure must feature **large video**, on **desktop and mobile**. *Source: #1 action item — restructure the homepage for video.*
- **FR-8 — Autoplay video is muted by default.**
- **FR-9 — Collage layout** of projects/events (Microsoft, Google, etc.) in **varying tile sizes**, in cartonlab-style composition. *Source: "תמונה מפה, תמונה משם… בכל מיני מידות."*

### 4.4 Product catalog (browse only)
- **FR-10 — Catalog of product categories** (e.g. modular X-Board stands) browsable, **no purchase** in Phase 1.
- **FR-11 — Show only green/colorful work**; exclude signage, perspex, raw-cardboard, and the old messy catalogs. *Source: "לא רוצה להראות את הקטלוגים… זה בלגן."*

### 4.5 Projects
- **FR-12 — Projects index** = a **searchable collage** of project tiles in **various sizes**, each linking to its project page.
- **FR-13 — Search** within projects, so reps and visitors reach a specific project fast.
- **FR-14 — Per-project page** = **H1 + H2 + one or more images** (lightweight; *not* a cartonlab-style rolling multi-image gallery — we lack enough quality images: *"לא יהיה לנו מספיק תמונות איכותיות שמגלגלות את כל הפרויקט"*).
- **FR-15 — Deep-linkable** project pages so a sales rep can send a customer straight to one. *Source: "אנשי המכירות שולחים בן אדם… לעמוד ספציפי."*

### 4.6 Media-level lead capture (the headline feature)
- **FR-16 — Every media item (image *or* video) carries a fixed "+ / more info" affordance.** *Source: "בכל אחד מהם יהיה איזשהו פלוס קטן… 'עוד מידע'."*
- **FR-17 — Clicking it opens a quote/contact form** pre-bound to that item.
- **FR-18 — The form shows a thumbnail of the selected item**, so both visitor and Picpong know which piece the lead is about. *Source: "שיהיה בתוך הform את הthumbnail… כולם רואים שזה."*
- **FR-19 — One-click intent:** the experience is "I liked this, get back to me" — minimal friction, no payment. *Source: "one click כזה של אהבתי את זה, תחזרו אליי."*

### 4.7 Global contact form
- **FR-20 — A contact form available on every page** (floating/persistent). *Source: Kuki wants the form to float on every page.*
- **FR-21 — Fields: name, phone, email, message** (final minimal-vs-fuller set = open question Q4).

### 4.8 Lead routing & management
- **FR-22 — Leads route to email and WhatsApp**, with the ability to switch between them. *Source: "אופציות אימייל ו-WhatsApp… העדיף WhatsApp."*
- **FR-23 — A single place to manage all incoming communication.** *Source: "צריך להיות מקום אחד בו מנהלים את כל התקשורת."*

### 4.9 Content management (CMS)
- **FR-24 — Daily-publish CMS**: an editor uploads the **best photo of the day + ~4 lines** of text, daily, without developer help. *Source: "כל יום… בוחרת תמונה ומעלה ורושמת ארבע שורות."*
- **FR-25 — Editors control which text and images are editable** vs. fixed in the template. *Source: "מה שתרצה לשלוט בו נחליט."*
- **FR-26 — Video content** uploadable (professional videos roughly quarterly).

### 4.10 SEO & discoverability
- **FR-27 — Rank for high-intent Hebrew keywords**: "דוכן מקרטון", "דלפק מקרטון", "שולחן מקרטון", "תערוכה מקרטון". *Source: "זאת מילה מובילה… אני רוצה שיגיעו אלינו."*
- **FR-28 — Each project/page exposes a semantic H1 + H2** (supports both SEO and the project-page structure in FR-14).

---

## 5. Non-functional requirements

- **NFR-1 — Retention:** the site must **not lose visitors fast** the way the current one does — clear, fast, low-friction. This is the core problem being solved.
- **NFR-2 — Custom build, not Shopify/off-the-shelf**, to allow the bespoke interactions and the daily CMS. *Source: "אחרי שהבנתי למה אתה מכוון… עדיף לעשות custom."*
- **NFR-3 — RTL quality** must be first-class (Hebrew is a primary, not an afterthought).
- **NFR-4 — Video** plays muted, autoplay, sized to feel like a hero (exact size = Q7).
- **NFR-5 — CMS usability:** a non-technical editor (Marina) can publish daily in minutes.
- **NFR-6 — International-ready feel** for the Czech-partner use case (English parity, polished).

## 6. Content & visual rules (constraints, not layout)

- **CR-1 — Eco/green only**: show only colorful finished cardboard event work. Hide raw-cardboard brown, signage, perspex, old catalogs. A small "and more" sector may hold the rest.
- **CR-2 — Colorful, not brown**: explicitly **not** cartonlab's brown raw-cardboard aesthetic. *Source: "הצבע החום… לא מעניין; השער הצבעוני… מאוד מעניין."*
- **CR-3 — Pastel palette** (client preference) — Yuval to supply options. *Source: "העדיף פסטלים."*
- **CR-4 — Reference split**: cartonlab (Spanish) **composition** for catalog/projects; mediagarden (Swedish) clean spec/price-table style is **reserved for the Phase-2 shop**. *Source: "ניראה כמו השוודים בחנות ואת כל השאר כמו ספרדים."*

---

## 7. Decisions the PRD must settle (conflicts with locked decisions)

These contradict the 2026-05-31 locked decisions and must be resolved in the PRD:

| ID | Locked (2026-05-31) | Meeting (2026-06-03) | PRD must decide |
|---|---|---|---|
| **D1 — Commerce** | Full e-commerce (cart/checkout/pay) | Catalog + leads only; **shop → Phase 2** | Confirm commerce is **out** of Phase 1 |
| **D2 — Language** | English-first; Hebrew/RTL phase 2 | **Hebrew + English from day 1**, geo-detect | Confirm Hebrew + RTL **in** Phase 1 |
| **D3 — Eco look** | Lead with eco *like cartonlab* | Green-only and **colorful**, not brown | Confirm colorful eco-only content rule |
| **D4 — Palette** | Vibrant/orange (mockup-v3) | **Pastels** | Confirm pastel direction |

## 8. Open questions (resolve before/while writing the PRD)

| # | Question | Owner |
|---|---|---|
| Q1 | How does the quote form look/behave when "+" is clicked on a **video** (vs. an image)? | Yuval + Kuki |
| Q2 | "+" round button on every media, **or** a "more info" text link — which, for consistency? | Yuval |
| Q3 | How to use the large library of **Facebook** pro photos on the homepage? | Kuki + Yuval |
| Q4 | Form field set — **minimal vs. fuller** (name/phone/email/message)? | Kuki |
| Q5 | **SEO** approach to capture "cardboard booth"-type searches? | Both |
| Q6 | Projects display per tile — **one big image vs. slideshow**? | Yuval (to propose) |
| Q7 | **Autoplay video size** on the homepage? | Yuval |
| Q8 | Exactly what does a rep see/share when sending a customer to a **specific project page**? | Kuki |

## 9. Out of scope / parked

- **Commerce (cart/checkout/payment/account, SKU+price tables)** → Phase 2 (see D1).
- **"Texas" workstream** — a separate project (an Excel/brief Kuki will review and reject items on; items pending with Marina and David, incl. PayPal). The **Czech "poker" manufacturer** thread is business backdrop for *why the site must be a sales tool*, but the Texas tasks themselves are **not** website requirements.

---

## 10. Next steps (process, not requirements)

- Turn this into the **PRD**.
- Iterate the concept with Kuki one screen/page at a time (he expects an iterative loop of follow-up meetings).
- Open items owned by Kuki: connect Marina to start engineering the projects site; review the Texas Excel. *(The Hebrew action item "ובעיות מתן" is ambiguous — pending Yuval's clarification of whether "מתן" is a person or "handover/delivery"; excluded from requirements either way.)*
