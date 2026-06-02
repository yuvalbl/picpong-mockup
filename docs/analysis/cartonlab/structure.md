# Cartonlab — Structure & Information Architecture Analysis

Reference site: <https://cartonlab.com/en>
Analyzed: 2026-05-31
Purpose: IA reference for Picpong (printing house for conferences / events / exhibitions). Focus = how they present PRODUCTS for events, exhibitions and conferences.

**Tech stack (observed):** WordPress + WooCommerce + Yoast SEO, multilingual (likely WPML/Polylang). Crawled via Yoast sitemaps + ~18 distinct page fetches.

**Headline finding:** Cartonlab presents itself as an e-commerce shop (cart icon, "Add to cart" buttons, product categories, collections) but it is functionally a **lead-generation / quote-request catalog**. No product shows a price, SKU, or working purchase flow — every path ultimately funnels to **"Contact us"**. The shop UI is a styled product showcase, not a transactional store. This hybrid "catalog that looks like a store but converts to enquiry" is the single most relevant pattern for Picpong.

---

## 1. Full Sitemap / Page Inventory

Source: Yoast sitemap index `https://cartonlab.com/en/sitemap.xml` →
`post-sitemap`, `page-sitemap`, `product-sitemap`, `proyecto-sitemap`, `empleado-sitemap`, `servicio-sitemap`, `category-sitemap`, `product_cat-sitemap`, `categoria_proyecto-sitemap`, `author-sitemap`.

Note the dual taxonomy: WooCommerce `product` + `product_cat` for the shop, and custom post type `proyecto` + `categoria_proyecto` for the portfolio. Plus custom types `empleado` (employees) and `servicio` (services).

```
cartonlab.com/en/                                    [HOME]
│
├── shop-cartonlab/                                  [SHOP LANDING — product showcase]
│   └── collections/                                 [EDITORIAL — branded collections (TARAY, MIMOSA, OHM, FINGERPOST)]
│
├── shop/                                            [WooCommerce product_cat tree]
│   ├── cardboard-furniture/                         [CATEGORY "Sustainable furniture"]
│   │   ├── benchs-and-chairs/                       [CATEGORY]
│   │   ├── bars-and-tables/                         [CATEGORY]
│   │   ├── shelves/                                 [CATEGORY]
│   │   └── stools/                                  [CATEGORY]
│   ├── event-solutions/                             [CATEGORY "Events solutions"]
│   │   ├── events-furniture/                        [CATEGORY]
│   │   ├── cardboard-photocall/                     [CATEGORY]
│   │   ├── cardboard-trees/                         [CATEGORY]
│   │   ├── ecologic-modular-stands/                 [CATEGORY]
│   │   └── exhibitions-holders-and-totems/          [CATEGORY]
│   ├── product-display/                             [CATEGORY "Exhibition displays" — currently EMPTY ("No products were found")]
│   │   ├── drinks-displays/                         [CATEGORY]
│   │   ├── fashion-displays/                        [CATEGORY]
│   │   ├── footwear-displays/                       [CATEGORY]
│   │   ├── food-displays/                           [CATEGORY]
│   │   └── books-displays/                          [CATEGORY]
│   ├── decoration/                                  [CATEGORY]
│   │   ├── cardboard-lamps/                         [CATEGORY]
│   │   └── christmas-decoration/                    [CATEGORY]
│   └── childrens-designs/                           [CATEGORY]
│       ├── cardboard-toys/                          [CATEGORY]
│       └── childish-furniture/                      [CATEGORY]
│
├── product/                                         [PRODUCT DETAIL — only 7 live products]
│   ├── taray-chair/                                 "Taray | Cardboard chair"
│   ├── taray-cardboard-table/                       "Taray | Cardboard table"
│   ├── taray-cardboard-bench/                       "TARAY | Cardboard bench"
│   ├── tensa-cardboard-counter/                     "OHM | Cardboard counter" (slug≠title)
│   ├── fingerpost-signage-solution/                 "FINGERPOST | Cardboard signage solution"
│   ├── mimosa-foldable-pop-up-chair/                "MIMOSA | Foldable Pop Up cardboard chair"
│   └── azero-display-panel/                         "AZERO Display Panel"
│
├── projects/                                        [PROJECTS LANDING — portfolio/case studies]
│   ├── events/                                      [PROJECT CATEGORY]
│   ├── exhibitions/                                 [PROJECT CATEGORY]
│   ├── retail-design/                               [PROJECT CATEGORY — nav label "Interior Design"]
│   ├── structural-design/                           [PROJECT CATEGORY — nav label "Product Design"]
│   └── trade-show-booths/                           [PROJECT CATEGORY]
│
├── project/                                         [PROJECT DETAIL — ~95 case studies, e.g.:]
│   ├── paper-booth/                                 (Flint, CES Las Vegas)
│   ├── eco-friendly-booth-agricultural-trade-show/  (Sunkist, IFPA)
│   ├── americas-food-beverage-booth/                (WTC Miami)
│   ├── stand-pink-lady/                             (Pink Lady)
│   ├── cardboard-booth-healthcare-company/          (Quantificare)
│   ├── cardboard-shell-caixaforum-auditorium/       (Caixaforum)
│   ├── tedxmadrid/  ... (≈95 total — full list below)
│
├── about-us/                                        [EDITORIAL — company/team]
├── blog/                                            [EDITORIAL — post archive]
├── contact/                                         [CONTACT — static info, no form]
│
└── Legal / utility:
    ├── legal-notice/
    ├── cookie-notice/
    ├── privacy-policy/
    ├── terms-of-purchase/
    ├── faqs/
    ├── checkout-page/                               (listed in sitemap; renders as home — non-functional)
    ├── contact-form/                               (orphan page)
    ├── legal-notice-privacy-and-cookies/           (orphan/legacy)
    ├── collections/
    ├── services-fr/                                 (FR services, orphan in /en sitemap)
    └── pagina-ejemplo/                             (WP "sample page" leftover)
```

**Page-type counts:** 1 home, 1 shop landing, ~16 product categories (1 empty top-level), **7 live product detail pages**, 1 projects landing, 5 project categories, **~95 project detail pages**, about, blog, contact, ~9 legal/utility.

**Key asymmetry to note:** the portfolio is ~95 case studies deep, but the "shop" only has 7 real products. The catalog is a thin showroom; the **portfolio is the real depth** of the site. Trust/credibility is carried by projects, not by SKU breadth.

### Full project detail URL list (~95)
`cardboard-stand-at-montreal`, `cardboard-christmas-at-orlando-museum-of-art`, `art-in-miami`, `pet-product-display-at-global-pet-expo`, `customized-booth-at-superzoo-pet-expo`, `cardboard-booth-for-design-thinking-initiative-jeffdesign`, `sustainable-booth-for-oil-spill-conference`, `cardboard-booth-at-natural-products-expo`, `cardboard-booth-arduino-maker-faire-rome`, `10-x-10-cardboard-booth-at-nsta`, `cardboard-vintage-bakery-booth-miami`, `giant-cardboard-duck`, `art-made-of-cardboard`, `cardboard-stand-for-eyewear-brand-in-italy`, `cardboard-event-by-tech-brand-asus`, `cardboard-lounge-for-google`, `4-cardboard-walls-printed-with-shelves-in-nyc`, `cardboard-booth-for-book-expo-chicago`, `nordic-semiconductor-cardboard-booth-california`, `cardboard-booth-in-hawaii-iucn-congress`, `nyc-comicon-and-toyfair`, `cardboard-pop-up-store-la-roca`, `the-biggest-cardboard-bunny`, `cardboard-furniture-for-events-madrid`, `cardboard-shelves`, `comic-library-murcia`, `cardboard-geodesic-dome`, `christmas-decoration-design-cardboard`, `stand-summit-weather`, `live-stream-event-design`, `tourism-fair-booth-cardboard`, `competition-ideas-packaging`, `street-marketing-munich`, `exhibitor-stands-for-trade-fairs-firarq-architectural`, `custom-packaging-design-repsol`, `stand-for-world-olive-oil-exhibition`, `exhibitions-design-lamps`, `international-exhibitions-design`, `sustainable-event-design`, `exhibition-holders-alicante`, `exhibition-design-piensa-sol`, `itinerant-archeological-exhibition-design-minateda-deposit`, `exhibition-design-uam-50th-anniversary`, `cardboard-corporeals-design-interapothek`, `ceiling-lamps-cardboard-origami-design-mares-madrid`, `pop-up-store-front`, `concept-store-in-madrid-dada-concept`, `pop-up-shop-design`, `the-circular-lab-ecoembes`, `urbact-city-festival-lisbon`, `sustainable-event-fsc-general-assembly`, `girls-not-brides-event-kuala-lumpur`, `tedxmadrid`, `crs-marketplace-foretica`, `cardboard-furniture-at-the-post-street`, `urbact-city-festival-lisboa`, `pitti-uomo-booth-for-munich`, `cardboard-kayak-on-water`, `cardboard-stand-for-a-chemical-company`, `cardboard-stand-for-children-brand`, `cardboard-stand-origami`, `cardboard-trees-tables-chairs-and-others-for-a-retail-store-in-europe`, `corner-kit-for-children-at-sprint-retail-stores-in-florida`, `curved-cardboard-stand`, `designing-for-community-engagement`, `decoration-bread-butter-berlin`, `oval-shaped-stand-for-organic-cosmetic-brand`, `extensible-lamp-project`, `fitur-3500-square-feet-cardboard-stand`, `high-tech-cardboard-bay-area`, `icex-cardboard-booth`, `lego-stand-at-momad`, `making-of-a-trade-booth-amsterdam`, `modular-trade-show-booth-at-supercorrexpo-in-orlando`, `munich-pop-up-store`, `pop-up-store-cardboard-furniture`, `origami-cranes-for-freedom-of-speech`, `pop-up-store-at-prado-museum-spain`, `spring-fest-stand`, `pop-up-store-retail-design`, `dockatot-booth-at-jpma`, `honeycomb-cardboard-nidokraft-booth-at-cprint`, `paper-booth`, `eco-friendly-booth-agricultural-trade-show`, `americas-food-beverage-booth`, `cardboard-shell-caixaforum-auditorium`, `design-ecological-message`, `sustainable-events-hotels`, `pop-up-sustainable-new-york`, `cardboard-booth-healthcare-company`, `cardboard-trade-show-booth-ces`, `design-interior-hotel-subup`, `stand-pink-lady`, `sustainable-booth-design`, `lamp-cardboard-origami`, `when-im-gone-scenography-design-for-television`.

---

## 2. Navigation Structure

### Primary nav (header, persistent)
`Shop` · `Projects` · `About us` · `Blog` · `Contact` — plus a **cart icon** "Cart (0)" and a **language selector** (ES / EN / FR).

Two of the five primary items are **dropdown mega-menus** (Shop and Projects). The other three are direct links.

**`Shop` mega-menu** — grouped by top category, with sub-items:
- *Sustainable Furniture:* Benchs and chairs · Bars and tables · Shelves · Stools
- *Events Solutions:* Events furniture · Cardboard photocall · Cardboard trees · Ecologic Modular stands · Exhibitions holders and totems
- *Decoration:* Cardboard lamps · Christmas decoration
- *Children's Designs:* Cardboard toys · Childish furniture
- *Exhibition Displays:* Drinks displays · Fashion displays · Footwear displays · Food displays · Books displays

**`Projects` dropdown** — 5 items: Events · Exhibitions · Interior Design (→ `/retail-design/`) · Product Design (→ `/structural-design/`) · Trade Show Booths.
(Note: nav labels differ from URL slugs — "Interior Design" maps to `retail-design`, "Product Design" maps to `structural-design`. Labels are market-facing; slugs are legacy.)

### Footer nav (3 columns + social)
- **Cartonlab:** Projects · About us · Blog · Contact
- **Shop:** Decoration · Sustainable furniture · Events solutions · Exhibition displays · Children's designs
- **Information:** Legal Notice · Cookie Notice · Terms of Purchase · Privacy Policy
- **Social:** LinkedIn · Instagram · YouTube · Pinterest · Behance
- Contact block: `info@cartonlab.com`, address (Molina de Segura, Murcia, Spain)

### Secondary / in-page nav
- **Category filter rail** inside shop & project listings (see templates below).
- **Breadcrumbs** on product pages: `Home > Shop > {Top category} > {Sub category} > {Product}` (e.g. "Home Shop / Sustainable furniture / Benchs and chairs / Taray").

---

## 3. Page-Type Templates (sections in render order)

### A. Home (`/en/`)
1. Featured product hero — "Taray | Cardboard chair" with an "Add to cart" button.
2. Brand CTA band — "Remarkable events made stunning…", heading **"You choose how to start"**.
3. **Dual-path chooser** — two big cards: *Shop online* and *Projects* (the site's two entry funnels).
4. Client logo wall — each logo links to its case study (WTC Miami, Ecoembes, Pink Lady, Sunkist, Munich, IDB, Quantificare, Caixaforum, NUHU).
5. Success stories — "Our projects" link + 2 highlighted case studies.
6. Category cards (4) — Sustainable furniture · Exhibition displays · Events solutions · Decoration.
7. Featured product rows — TENSA/OHM counter, Taray table, AZERO panel, FINGERPOST signage (each with "Add to cart").
8. Featured products carousel — Taray chair, MIMOSA chair.
9. Customization & assembly explainer — "Online Shop" / "See Modulars" CTAs.
10. FAQ accordion.
11. Footer.

### B. Shop landing (`/shop-cartonlab/`)
1. Header + branded hero.
2. **Filter bar**: Collection dropdown (All · FINGERPOST · MIMOSA · OHM · TARAY) + Sort (Featured products · Best sellers · New products).
3. Featured products grid (8 cards).
4. Category navigation block (all 5 top categories with sub-items).
5. "Add to cart" icon on every card. Footer.

### C. Product category (`/shop/{cat}/` and `/shop/{cat}/{subcat}/`)
1. **Category intro paragraph** (sustainability/assembly copy, e.g. "Lightweight, robust and easy to assemble. 100% recyclable…").
2. **Filter rail**: Collection filter (e.g. All · OHM), Sort (Featured/Best sellers/New), sibling category filters (Benches and chairs · Bars and tables · Shelves · Stools).
3. **Product grid** — cards with: main image + lifestyle/hover image, product name, **category label**, "Add to cart" icon. **No price, no SKU.**
4. Empty state: "No products were found matching your selection." (seen on `product-display/`).
5. Footer.

### D. Product detail (`/product/{slug}/`)
1. Breadcrumbs.
2. Image gallery (main + ~5 thumbnails).
3. Title + subtitle (e.g. "Taray" / "Cardboard chair") + tagline ("Full of possibilities at your business, commerces and events").
4. **"Features" tab** — spec list: Dimensions (imperial, e.g. 30″H×18″W×22″D), Weight (e.g. 5.5 lb), Material ("Brown Kraft Style"), Assembly time ("Less than 5 minutes"), Load capacity ("Up to 320 lb").
5. **"Manufacturing details" tab** — production location, FSC certification, material composition, "100% recyclable and reusable".
6. **"CUSTOMIZABLE PRODUCTS"** block — "Integrate your graphics into the furniture. Stronger visual impact and a consistent brand identity…".
7. **"Contact us" CTA** (replaces add-to-cart — see §4).
8. Related products / collection browsing.
9. Footer.

### E. Projects landing (`/projects/`)
1. Hero — "Your idea, endless possibilities with cartonlab projects" + "Some projects need more than off-the-shelf solutions. That's where we come in." + Contact button.
2. **Filter bar**: category filters (Todos/All · Events · Exhibitions · Interior Design · Product design · Trade Show Booths) + Sort (Featured projects · Date).
3. Project card grid — title, client name, image, link.
4. Bottom CTA — **"Got an idea? Let´s make it real"**.
5. Footer.

### F. Project category (`/projects/{cat}/`)
Same as projects landing, pre-filtered. Adds aspirational taglines, e.g. trade-show-booths page: **"Great ideas don't need to last forever. Temporary can be extraordinary."** / **"Designed to amaze. Built to disappear."** ~12 cards. CTAs "Contact Us" / "Reach us".

### G. Project detail / case study (`/project/{slug}/`)
1. Title + **credits metadata** (Client · Design · Production/Assembly · Photography · Video edit).
2. Intro headline + body (scope, e.g. "56 sqm booth…").
3. Hero image gallery (multiple angles).
4. **Narrative content blocks with their own headings** — e.g. "Technical decisions shaped by the space", "Designed for interaction and demonstration", "A shared commitment to sustainability" — interleaved with photos.
5. **Key metadata** surfaced inline: Location, Material (e.g. "10 mm structural cardboard, kraft finish"), Size (sqm), Event/Year.
6. **"You may be interested in"** — 4 related projects.
7. **"Got an idea? Let´s make it real"** CTA. Footer.

### H. About us (`/about-us/`)
Hero ("Real people, cardboard obsessed.") → mission → **timeline 1999–2026** (6 milestones) → **leadership** (3 co-founders + LinkedIn) → **team by function** (Designing / Organizing-Communicating / Producing / Strategic Partners) → FAQ accordion → "Got an idea? Let's make it real" CTA → footer.

### I. Contact (`/contact/`)
**No form.** Static contact blocks per region: España (`info@cartonlab.com`), France (`bonjour@cartonlab.com`), USA (`hello@cartonlab.com`, Miami address). No phone, no map, no quote form on this page. (A separate orphan `/contact-form/` page exists but is not linked from primary nav.)

---

## 4. Product Presentation Model

| Attribute | Present? | Notes |
|---|---|---|
| Price | **No** | Zero prices anywhere — not on cards, categories, or detail pages. |
| SKU | **No** | Not displayed. |
| Add-to-cart (functional) | **No** | "Add to cart" labels/icons appear on home & category cards (WooCommerce theme default), but product detail pages have **no working add-to-cart** — they show **"Contact us"** instead. Cart shows "Cart (0)"; `/checkout-page/` renders as the homepage (non-functional). |
| Quantity selector | No | — |
| Variations / configurator | No formal configurator | Replaced by the **"CUSTOMIZABLE PRODUCTS"** narrative ("Integrate your graphics into the furniture"). Customization is sales-led, not self-serve. |
| Quote request | **Yes (implicit)** | The conversion mechanism. Every product → "Contact us" → email. |
| Downloadable specs / PDF | No | Specs are inline in "Features" / "Manufacturing details" tabs. |
| Specs table | **Yes** | Dimensions, weight, material, assembly time, load capacity. Imperial units (US-targeted). |
| Reviews | No | — |
| Related products | Yes | Collection-based browsing at bottom. |
| Breadcrumbs | Yes | Full category path. |

**Layout summary:** image gallery (left) + title/tagline/spec-tabs (right) + customization pitch + "Contact us". It reads like an e-commerce PDP but behaves like a spec sheet with an enquiry CTA. The "store" framing builds product credibility and SEO; the conversion is always a conversation.

---

## 5. URL Scheme / Slug Patterns

- Language prefix: `/en/`, `/fr/`; Spanish (default) has **no prefix** (`cartonlab.com/`).
- Shop categories: `/shop/{top-category}/{sub-category}/` — hierarchical, human-readable, trailing slash.
- Products: **flat** `/product/{slug}/` (not nested under category — standard WooCommerce). Slugs are descriptive: `taray-chair`, `azero-display-panel`. One mismatch: `/product/tensa-cardboard-counter/` now titled "OHM" (renamed product, slug kept — minor SEO debt).
- Project categories: `/projects/{slug}/`; project details: flat `/project/{slug}/`.
- Project slugs are **long, descriptive, keyword-rich** ("what + where/who"): `paper-booth`, `eco-friendly-booth-agricultural-trade-show`, `10-x-10-cardboard-booth-at-nsta`, `cardboard-booth-for-book-expo-chicago`. Strong for SEO ("cardboard booth + event/city").
- Nav-label ≠ slug in places: "Interior Design"→`retail-design`, "Product Design"→`structural-design`. Custom-post-type bases are Spanish-origin (`proyecto`, `categoria_proyecto`) in sitemaps but `/project/` and `/projects/` on the front end.
- Collection browsing uses search params: `/shop-cartonlab/?s=Taray%20|` rather than dedicated collection pages.
- All URLs lowercase, hyphen-delimited, trailing slash, Yoast canonical.

---

## 6. Language Handling

- 3 languages: **Español** (default, no prefix), **English** (`/en/`), **Français** (`/fr/`). Selector labeled "ES / EN / FR" in header.
- **All LTR. No RTL** anywhere (not relevant for Picpong if Hebrew is needed — would require RTL handling they don't demonstrate).
- FR nav is partially localized: "Shop · Projets · Nous · Contact" (note "Shop" left in English, "Nous" for About). Translation coverage is uneven — some EN-sitemap pages are FR (`/services-fr/`), suggesting incomplete multilingual hygiene.
- Per-region contact identities (ES/FR/US emails + a Miami office) — localization is also commercial/geographic, not just linguistic. Specs in **imperial units** on EN pages signal a US-market focus.

---

## 7. Conversion Paths

The home explicitly forks visitors via **"You choose how to start"** into two funnels:

1. **Shop funnel (off-the-shelf intent):**
   Home/Shop → category → product detail → read specs → **"Contact us"** → email enquiry.
   The cart/add-to-cart is decorative; there is no checkout. Goal = qualified product enquiry.

2. **Projects funnel (custom intent):**
   Home → Projects → filter by Events/Exhibitions/Trade Show Booths → case study → **"Got an idea? Let´s make it real"** → contact.
   This is the credibility-driven path: ~95 case studies with named clients (Google, LEGO, Pink Lady, Sunkist, Caixaforum) do the selling.

Both funnels terminate at the **same low-friction CTA pattern** ("Contact us" / "Let's make it real") and ultimately an **email** (no form on `/contact/`). Conversion is deliberately conversation-first, not transactional. Client logos on the home double as conversion proof and as links into case studies.

---

## 8. Notable Content-Organization Patterns Worth Copying for Picpong

1. **Catalog-as-showroom, convert-by-quote.** Present products with rich specs, galleries, and category structure — but route to enquiry instead of cart. Ideal for a printing house where every job is custom/priced-on-spec. Picpong can mirror this: browsable product types (banners, stands, photocalls, signage, displays) with "Request a quote" replacing "Add to cart."

2. **Two explicit funnels on the home: "Shop" (standard products) vs "Projects" (custom work).** The "You choose how to start" fork cleanly serves both buyers who know what they want and buyers who need bespoke help. Directly applicable to Picpong (off-the-shelf prints vs. full event/booth projects).

3. **Portfolio depth carries trust, not SKU count.** ~95 case studies vs 7 products. For an events/exhibition print house, a deep, filterable **projects gallery with named clients + event names** is the strongest asset. Filter projects by use-case (Events · Exhibitions · Trade Show Booths) — exactly Picpong's segments.

4. **Use-case-first taxonomy.** Categories are organized by *where the product is used* (Events solutions, Exhibition displays, Trade show booths) and by *audience* (Children's designs), not by manufacturing process. Buyers shop by their event need. Picpong should taxonomize by event/use-case (conference, exhibition booth, photocall, signage) rather than by print technique.

5. **Spec-tab pattern on product pages** (Features + Manufacturing details): dimensions, weight, material, assembly time, certifications. Concrete, scannable, builds confidence. Picpong equivalent: size, material/finish, turnaround time, file/format requirements, eco credentials.

6. **Customization pitch baked into every PDP** ("Integrate your graphics… consistent brand identity") — turns a stock product into a branded-deliverable conversation. Perfect framing for a printing house.

7. **Consistent closing CTA across every template** — "Got an idea? Let's make it real." A single, warm, repeated conversion line reduces decision friction.

8. **Keyword-rich descriptive slugs** for case studies (`cardboard-booth-for-book-expo-chicago`) — strong long-tail SEO for "[product] + [event/city]". Picpong should slug projects by client/event.

9. **Branded product collections** (TARAY, MIMOSA, OHM, FINGERPOST) layered over functional categories — gives a premium, designed feel and cross-sell ("the TARAY family": chair/bench/table).

### Things NOT to copy
- **Fake cart UI** ("Add to cart" + "Cart (0)" with no checkout) is confusing — either build a real cart or label CTAs honestly ("Request quote", "Enquire"). Picpong should pick one model.
- **Contact page with no form** (email-only). Adding a structured quote form (with product/event/quantity/deadline fields) would reduce friction and pre-qualify leads — a clear improvement opportunity over the reference.
- **Slug/label drift and orphan pages** (`tensa-…` titled "OHM", `pagina-ejemplo`, `/services-fr/` in EN sitemap, broken `test.dagic.es` links seen in a FAQ block) — multilingual/maintenance hygiene gaps to avoid.
- **Empty category pages** ("No products were found" on Exhibition displays) shipped live — hurts trust; hide or seed empty categories.
