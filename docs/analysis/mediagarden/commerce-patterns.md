# Media Garden (mediagarden.se/en) — Commerce / B2B Pattern Pass

> Secondary reference for the Picpong redesign. Scope: **only** the commerce / B2B
> sales-structure patterns that our primary reference (cartonlab.com) lacks. Look &
> feel out of scope — cartonlab covers that.
>
> Source: live SSR'd site (Wix/Thunderbolt — content is server-rendered, fully
> readable). Pages reviewed: `/en` (home), `/en/katalog` (catalogs), `/en/produktdisplay`,
> `/en/fotovaggselfievagg`, `/en/skyltar`, `/en/broschyrstall`, `/en/massmonter`,
> `/en/podierochbord`, `/en/inredning`, `/en/kontakt`, `/en/re-board`, `/en/tjanster`.

---

## 0. What Media Garden is (context)

Swedish (Höganäs) B2B maker of **retail displays, POS units, exhibition booths, signage,
furniture and interiors built from Re-board** (100% paper board, FSC-certified, CFC-free,
100% recyclable). Same category as cartonlab — but unlike cartonlab it runs **a real,
public, per-SKU priced catalog**, which is exactly the "real e-commerce" layer Picpong
needs. It is a **priced catalog → enquiry** model: prices are shown openly, but there is
no cart; the order is consultative. The whole nav funnels to two parallel entry points:
**"Products & Prices"** and **"Catalogs"**. Repeated line: *"For price and inspiration,
see our Products (or browse our catalogs)."*

---

## 1. SKU / price tables  ← the most important borrow

Every product is **one discrete SKU with a structured article number**, and finish/print
are sold as **price modifiers on that SKU** (not as separate SKUs).

**Article scheme:** `MGP-XXX-NNN`
- `MGP` = brand prefix (Mediagården Produktion)
- `XXX` = product-family code: `GD` product displays, `SEL` selfie/photo walls,
  `SK` signs, `BS` brochure stands / bookshelves, `POB`/`PO`/`DK`/`ET` podiums & tables,
  `SA` interior podiums, `SS`/`DK` crash bars/totems.
- `NNN` = zero-padded sequence (`001`, `002`, …)

**Per-row fields (consistent across every family):**
`Product name · Article # · Dimensions H×W×D (mm) · Print/finish variant · Base price (SEK) · Weight · Max load · Price modifiers`

**Real example table (product displays, `/en/produktdisplay`):**

| Product | Article # | Dim H×W×D (mm) | Print | Price | Weight | Max load |
|---|---|---|---|---|---|---|
| Round display, small | MGP-GD-001 | 1810×600×348 | Single/Double | 2 300 SEK | ~4 kg | 8 kg |
| Round display, large | MGP-GD-002 | 1810×600×600 | Single/Double | 3 000 SEK | ~6.5 kg | 10 kg |
| Open display, wide | MGP-GD-003 | 1580×825×545 | Single/Double | 3 900 SEK | ~9 kg | 10 kg |
| Classic display | MGP-GD-006 | 1387×400×400 | Single/Double | 3 100 SEK | ~4.1 kg | 45 kg |
| Interior display, large | MGP-GD-009 | 1800×880×410 | Single | 7 600 SEK | ~14 kg | 20 kg |

**Price-modifier pattern (the clever bit):** base price is single-sided print; options
adjust it inline, e.g. on `MGP-SEL-001` "Selfie wall, small": **base 1 500 SEK**,
*Double-sided +300 SEK*, *Protective laminate +900 SEK*. "Without print" is a *negative*
modifier (e.g. signs: −200 to −1 300 SEK). MOQ shows up where relevant (tabletop brochure
stand = "minimum 10 units"). Prices scale across families from **170 SEK** (small table
sign `MGP-SK-005`) to **85 000 SEK** (largest exhibition booth).

So: **one SKU per product + an inline +/− option list**, not a combinatorial SKU
explosion. Spec, price, and options all live on the family page as a comparison matrix.

---

## 2. Quote-vs-buy / B2B flow

**Priced catalog → human enquiry. No cart, no checkout, no add-to-cart button anywhere.**
1. Browse **Products & Prices** (or a catalog PDF) → see article #, dimensions, price,
   options.
2. Convert via **direct contact** — named people, phone, email. Category pages embed a
   contextual mailto, e.g. exhibition page: *"Interested in an Exhibition? Contact us
   here"* → `mattias@mediagarden.se` with a pre-filled subject.
3. **Services page** (`/en/tjanster`) frames the journey as a guided, full-service
   handoff: *concept → design → construction → project management → production →
   logistics → assembly → shipping*, "all under one roof," "from the first sketch to a
   finished solution." Prices set expectations; a person closes.

**Named account managers — YES, and this is a strong pattern.** Contact page
(`/en/kontakt`) lists real individuals with role + direct mobile + personal email:
- **Mattias Thene** (Sales & Project Mgmt) — 076 344 38 04 — mattias@mediagarden.se
- **Ulrika Sundvall** (Sales & Project Mgmt) — 073 521 53 73 — ulrika@mediagarden.se
- **Dov Gatmon** (CEO & HR), **Tindra Pavlicek** (Production), **Katarina Lafoot**
  (Finance), **Sofia Rönn** (Marketing/Design) — each with a personal `@mediagarden.se`.
- General switchboard `+46 42 311 08 00` / `info@mediagarden.se` as fallback.

Note: it's **named-people-with-direct-lines but NO contact form / structured quote
module** — engagement is raw email/phone. That's the gap Picpong can beat (add a real
quote-request form + per-product "Request quote" button).

---

## 3. Catalog / downloads  (`/en/katalog`)

"Catalogs" is a **top-level nav item, parallel to "Products & Prices."** Presented as a
**3-card grid**, each card = thumbnail + description + DOWNLOAD button. The three catalogs
map almost exactly onto Picpong's Retail/Fair/Furniture brief:

1. **Retail & Event Display** — *"Everything you need to boost visibility, amplify your
   message, and strengthen your brand."* (also "VIEW THE ENGLISH VERSION" link)
2. **Fair & Events** — *"Design and build a standout exhibition stand using our modular
   event system."*
3. **Furniture & Interior Design** — *"Furnish your office, store, or home with our smart
   and sustainable furniture."*

**Gating: NONE — direct PDF, ungated.** Consistent with their public-price transparency.
No file size/type shown. (For Picpong, the *opposite* choice — light email gating for
lead capture — is likely worth more; MG just shows the ungated end of the spectrum.)

---

## 4. Product spec presentation

Compact, inline, comparative — never buried in tabs:
- **Dimensions** always as H × W × D in mm.
- **Weight + max load capacity** given per SKU (e.g. Classic display ~4.1 kg / max 45 kg)
  — a nice trust/practical detail cartonlab omits.
- **Material**: Re-board, stated plainly and repeated on every product.
- **Finish/print** is a first-class spec driving the price modifiers (single/double-sided,
  laminate, no-print).
- Everything sits next to price + article # on the family page → the spec list doubles as
  a side-by-side comparison matrix. No drill-down to separate PDP needed.

---

## 5. Trust / sustainability proof modules

Sustainability is a **primary sales axis**, not a footer afterthought. Dedicated
"Environment" nav section with sub-pages **Re-board** and **ISO**.

- **Material story as hero** (`/en/re-board`, headline "OUR ECO-FRIENDLY MATERIALS"):
  *"100% paper board from Re-board Technology — FSC-certified, CFC-free, available in
  various finishes and thicknesses"*; *"Light, strong & 100% recyclable."*
- **Spec cards** for the material itself: thicknesses (10 mm, 16 mm) and finishes
  (standard / black / brown / white) shown as variant cards.
- **Certs named explicitly:** FSC, CFC-free, ISO (ISO gets its own nav page).
- **Repeated inline** on every product family + mission framing ("a more sustainable
  future," "climate-smart Re-board").
- **No badge/logo strip and NO per-SKU CO2e number** — that's a gap Picpong can leapfrog
  with actual carbon figures + visible cert logos.

---

## 6. What's worth borrowing for Picpong — ranked

Picpong needs the real-commerce layer cartonlab lacks. Ranked by value:

1. **Structured article numbers + one-SKU-per-product with inline +/− option modifiers.**
   The single biggest borrow. `PP-FAM-NNN`, base price = simplest config, options adjust
   price inline (double-sided +X, no-print −X, laminate +X, MOQ where needed). Avoids
   combinatorial SKU sprawl while still being "real" SKUs. *(Section 1)*

2. **Public per-SKU price + full spec in a comparison table on each family page.** Show
   price + H×W×D + weight + max load + options in one scannable matrix; don't hide behind
   "contact us." Anchors value and qualifies the buyer before enquiry. *(Sections 1, 4)*

3. **Twin top-level entry points: "Products & Prices" and "Catalogs."** Two parallel
   routes to the same conversion; segment catalogs as Retail / Fair / Furniture (MG's
   exact split — directly reusable for Picpong). *(Sections 1, 3)*

4. **Named account managers with role + direct mobile + personal email.** B2B converts on
   a human. MG already does this well — copy it, and go further with contextual per-
   category mailto CTAs (MG's "Interested in an Exhibition? Contact us here →
   mattias@…"). *(Section 2)*

5. **Priced-catalog → consultative enquiry model + a "sketch-to-finished" service flow.**
   Prices sell; a guided full-service journey closes custom/bulk work. *(Section 2)*

6. **Sustainability as a sales axis:** canonical material/cert page (FSC/ISO/recycled +
   thickness/finish spec cards) plus repeated inline mentions on every product.
   *(Section 5)*

### Where Picpong should BEAT Media Garden (gaps, not patterns)
- **Real cart/checkout for standard stock SKUs** — MG has none; Picpong wants actual
  e-commerce. Offer a **dual path**: cart for stock SKUs + "Request quote" for custom/bulk.
- **Structured quote-request form / per-product "Request quote" button** — MG only has raw
  email/phone; add a real lead-capturing module.
- **Light-gated catalog downloads** — MG leaves PDFs fully open; Picpong can trade a PDF
  for an email to build a lead list.
- **Per-product CO2e figure + visible cert logos** — MG names FSC/ISO/CFC but shows no
  carbon number and no badge strip; Picpong can quantify and badge.

---

### Confidence
All findings read from the live SSR'd site and are **observed**, including the article-
number scheme, real price/spec tables (GD/SEL/SK/BS/POB families), the price-modifier
mechanism, the three named catalogs and their ungated PDFs, named account managers with
direct lines, and the FSC/ISO/Re-board framing. Not every numeric price across all ~14
families was transcribed (light pass) — re-fetch a specific family page if a full price
matrix is needed.
