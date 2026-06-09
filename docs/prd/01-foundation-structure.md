# PRD 1 — Foundation: Structure & Layout (mockup-v4)

> **Product:** `mockup-v4/` — a **UI-only mockup** (vanilla HTML/CSS/JS, no framework, no build, no backend), **forked from `mockup-v3/`**. It is the **source of truth** for a future real build, but nothing behind the glass is real.
> **This PRD covers:** the foundation — information architecture, page templates/layouts, global chrome, the reusable media component, and RTL/language structure. **Design (palette/pastels, type, motion) is out of scope here** and handled later.
> **Inputs:** `docs/human-review/meeting1-analysis.md` (requirements FR/NFR/CR), `mockup-v3/` (the base).
> **Sibling PRDs (later):** PRD 2 — Lead-capture UI (the "+" → quote-with-thumbnail + floating form *behavior*); PRD 3 — Discovery & chrome (projects search, social links, SEO markup); Phase-2 PRD — Shop (commerce).
> **Status:** Draft for review.

---

## 0. Decisions I made (confirm or correct)

These are choices the meeting didn't settle. I made the call to keep momentum — flag any you disagree with.

| # | Decision | Rationale |
|---|---|---|
| DM-1 | **Rename `shop.html` → `catalog.html`.** | It's a browse catalog, not a shop (commerce → Phase 2). |
| DM-2 | **Keep `product.html` as a browse-only item page** (strip price/cart/qty/checkout; keep gallery, specs, and a "request a quote on this" CTA). | Catalog items still need a detail view; conversion is the quote, not a purchase. |
| DM-3 | **Use `index.html` as the home base; ignore `index-dynamic.html` and `index-readable.html`.** v4 carries only `index.html`. | One home file as the source of truth; the other two variants are not carried into v4. |
| DM-4 | **Slim `project-detail.html`** to H1 + H2 + one-or-more images (+ a "+"/quote CTA and a light "more work" link). Drop the rich credits grid + long narrative. | Matches FR-14 ("not a rolling multi-image gallery"); we lack the image depth. |
| DM-5 | **Remove all commerce** from v4: cart drawer, cart button/badge, add-to-cart, localStorage cart, price displays, the "buy" lane of the dual-path home. | C1/D1 — commerce is Phase 2. |
| DM-6 | **Keep Sustainability / About / Contact as home sections + nav anchors** (as in v3), not separate pages, for now. | Lead-gen catalog; fewer pages to maintain in the mockup. |

---

## 1. Objective

Restructure the v3 mockup into a **lead-generation catalog** whose every page is built to (a) showcase green/colorful cardboard work via image **and video**, and (b) funnel the visitor into a **quote/contact request** — including a per-media request tied to the specific item. The foundation must **host** every Phase-1 capability (reserve its slots and define its components) even where the *behavior* ships in PRD 2/3, so nothing requires structural rework later.

## 2. Scope

**In (this PRD):**
- IA / page set / nav / filenames.
- Page templates & section order for: Home, Catalog, Product (item), Projects index, Project detail.
- Global chrome: header (wordmark, nav, language switch, social slot), footer, mobile menu, design ribbon. Removal of cart chrome.
- The reusable **media component** (image *or* video) with a reserved **"+"/"more info" slot**.
- The **floating contact-form anchor** (placement only, present on every page).
- **Video hero** structure on the homepage (desktop + mobile).
- **RTL + language** structure (dir handling, language switch, Hebrew rendering).
- Responsive structure.

**Deferred to PRD 2 (Lead-capture UI):** the "+" → quote-form *behavior*, thumbnail injection, the floating form's open/submit/validation, email/WhatsApp routing representation.

**Deferred to PRD 3 (Discovery & chrome):** projects search behavior, real social links, SEO-shaped metadata, content states.

**Out / Phase 2:** cart, checkout, payment, account, SKU+price+spec tables (mediagarden style).

## 3. Base & approach

- **Fork** `mockup-v3/` → `mockup-v4/` (copy the directory; keep `css/styles.css`, `js/app.js`, `assets/`).
- Home derives from v3's `index.html`. v4 carries **only** `index.html` — do **not** copy `index-dynamic.html` or `index-readable.html`.
- Carry over v3's layout primitives unchanged where reusable: `.band`, `.split`, `.wrap`, `.grid-products`, `.grid-projects`, `.btn*`, `.reveal`, `.marquee`, `.footer`, `.mobile-menu`, `.to-top`, `.toast`.
- Remove commerce code paths from `app.js` (cart/localStorage/drawer/stepper/PDP price-sync) — see §11.

## 4. Information architecture

**Page set (v4):**

| File | Page | Derived from | Key change |
|---|---|---|---|
| `index.html` | Home | v3 index.html | Video-first hero; single enquiry path; media "+"; pastel/colorful (design later) |
| `catalog.html` | Catalog (browse) | v3 shop.html | No add-to-cart; cards link to item; quote CTA |
| `product.html` | Catalog item | v3 product.html | Commerce stripped; "request a quote on this" + media "+" |
| `projects.html` | Projects index | v3 projects.html | Searchable, variable-size collage; media "+" per tile |
| `project-detail.html` | Project page | v3 project-detail.html | Slim: H1 + H2 + image(s) + quote CTA |

No `/cart`, `/checkout`, `/account` pages (none existed as pages in v3 either).

**Primary nav (header):** Catalog · Projects · Sustainability · About · Contact · **[HE/EN] · [social icons]**. (Removed: cart button + badge.)

## 5. Global chrome

- **Wordmark:** brand text becomes **"Pic Pong.biz"** (`.brand__word`), keep the pufferfish `.brand__mark`. *(FR-2)*
- **Language switch:** add a control to `.nav__actions` (HE/EN). Flips document `dir` and swaps copy (see §9). *(FR-4/5; geo-detection is a build note, not mocked.)*
- **Social slot:** reserve a `.nav__social` group (Facebook, Instagram, LinkedIn) in header (and/or footer). Real links = PRD 3; markup + placement here. *(FR-3)*
- **Floating contact trigger:** a persistent element (e.g. `.contact-fab`) present on **every page**, anchored bottom corner, that will open the contact/quote form. Placement + markup here; open/submit behavior = PRD 2. *(FR-20)*
- **Cart removal:** delete `.cart-btn`, `.cart-count`, `.drawer`, `#scrim` cart usage, and the "Shop" footer column's commerce links. Keep `#scrim` only if reused by the floating form/menu.
- **Mobile menu:** keep `.mobile-menu`; update links to the new nav; CTA becomes "Request a quote" (not "Start a project"/buy).
- **Design ribbon:** keep, update label to "Design mockup — v4".
- **Footer:** keep 4-column `.footer`; replace the "Shop" commerce column with "Catalog" (browse links); add social icons + language; keep "Trusted by" logos.

## 6. Reusable foundation components

### 6.1 Media component (the keystone) — *new*
A single reusable wrapper used **everywhere media appears** (collage tiles, project tiles, catalog cards, product gallery, project images):

- Markup: `[data-media]` wrapper containing **either** `<img loading="lazy">` **or** `<video muted autoplay loop playsinline preload="metadata">`.
- Reserved affordance: a fixed-position **`.media__more`** button (the "+"/"more info") in a consistent corner of every media item. *(FR-16)*
- Reserved data hooks for PRD 2: `data-media-id`, `data-media-title`, `data-media-thumb` (so the quote form can show the item's thumbnail). **No behavior wired in this PRD** — the button is inert (or shows a "PRD 2" placeholder toast).
- Must render correctly for both image and video, and in RTL.

### 6.2 Cards
- **Catalog card** — fork `.tile`; **remove** `.tile__badge` price and the add button; the card is a link to `product.html`; include the media component (so the "+" is available on the card image). *(FR-10)*
- **Project tile** — fork `.project`; support **variable sizes** for the collage (size modifiers, e.g. `.project--wide` / `.project--tall`); include the media component; tile links to `project-detail.html`; carries `data-cat` (filter) and will carry search-indexable text. *(FR-12)*

### 6.3 Carried-over primitives (unchanged structurally)
`.band`, `.split`, `.wrap(--narrow)`, `.grid-products`, `.grid-projects(--feature)`, `.btn(--primary/brand/ghost/onDark/block)`, `.reveal(--slide)`, `.marquee`, `.acc` (accordion, reused on product specs), `.to-top`, `.toast`, `.collage` (home hero grid).

## 7. Page templates

### 7.1 Home (`index.html`)
Section order (deltas from v3 in **bold**):
1. **Hero collage with a real video tile** — keep `.collage` 5-tile grid, but the media tiles use the §6.1 component; **at least one large `<video>`** (muted autoplay), prominent on **desktop and mobile**. *(FR-7/8/9, NFR-4)*
2. **Single enquiry path** — replace the dual `.funnels` (Shop vs Project) with **one** lead path ("Tell us about your project / request a quote"). **Remove the buy lane.** *(D1)*
3. Marquee — keep.
4. Trust logos — keep.
5. **Catalog preview** (was "Shop preview") — 3 catalog cards (§6.2), link "See the full catalog". **No prices/add buttons.**
6. Spec strip — keep (X-Board claims).
7. **Projects teaser** — featured tiles using the media component; link "View all projects".
8. Sustainability split — keep.
9. About teaser — keep.
10. **Contact** — keep the quote-form section; it now also pairs with the global floating trigger (§5). Newsletter — keep.
11. Footer.

### 7.2 Catalog (`catalog.html`)
1. Header band (breadcrumb, title, lead).
2. Two-column `.shop` layout: facets sidebar (category/finish filters) + grid of **catalog cards** (§6.2, no price/cart). Sort bar: drop price sorting.
3. "Can't find it? Tell us" band → routes to contact/quote.
4. Footer.

### 7.3 Catalog item (`product.html`)
1. Breadcrumb.
2. `.pdp` two-column: left `.gallery` (media component; supports video; "+" present) · right `.pdp__info` = title, eco/spec badges, description, informational option chips (Finish/Height as *spec info*, **not** price modifiers), **"Request a quote on this" CTA** (carries the item to the form). **Remove** price, quantity stepper, add-to-cart. Keep the `.acc` specs accordion (Specs / Printing / Shipping). *(FR-19, DM-2)*
3. "Pairs well with" — 3 catalog cards.
4. Footer.

### 7.4 Projects index (`projects.html`)
1. Header band (breadcrumb, title, lead) + **search field** (markup/placement here; behavior PRD 3) + filter chips (keep `[data-filterbar]`). *(FR-13)*
2. **Variable-size collage** of project tiles (§6.2) — replaces the uniform `.grid-projects--feature`; tiles in mixed sizes (FR-12). Each tile: media component (+ "+"), tag, client, title; links to its project page; deep-linkable. *(FR-12/15)*
3. "Your show is next" CTA → quote.
4. Footer.

### 7.5 Project page (`project-detail.html`) — slimmed
1. Breadcrumb + **H1** (title). *(FR-28)*
2. **H2** (subtitle/one-liner). *(FR-14/28)*
3. **One or more images** via the media component (supports video; "+" present). No mandatory credits grid or long narrative.
4. Quote CTA (request a quote on this project) + a light "More work" link back to the index.
5. Footer.

## 8. Internationalization & RTL (structure)

- Document carries `lang` + `dir`; **language switch** toggles `lang="he" dir="rtl"` ⇄ `lang="en" dir="ltr"`. *(FR-4/5)*
- CSS must be **RTL-safe**: prefer logical properties (margin/padding-inline, inset-inline) or add a `[dir="rtl"]` override layer where v3 used physical left/right. *(FR-6, NFR-3)*
- The mockup **ships Hebrew copy** for the templates (it's the source of truth and Kuki is Hebrew-first); English is the parallel. Geo-detection is **not** mocked — add a build note.
- Verify the hero collage, nav, cards, forms, and footer all render in RTL.

## 9. Responsive

- Maintain v3's breakpoints. The **video hero must be designed for both desktop and mobile** (not desktop-only). *(FR-7, NFR-4)*
- The projects collage reflows from multi-column variable sizes (desktop) to a single column (mobile) without losing the "+" affordance.

## 10. Removed from v3 (commerce teardown)

Delete or neutralize: `.cart-btn`, `.cart-count`, `.drawer`/`#cartItems`/`.drawer__foot`/checkout button, `[data-add]`/`[data-remove]`, `#pdpStepper`, PDP price-sync (`syncPdp`, `#pdpPrice`, `data-delta`), `localStorage` cart (`STORE`), price fields on cards, the buy lane in `.funnels`. Keep option chips only as **informational specs** (no `data-delta`).

## 11. `app.js` impact

- **Remove:** cart/localStorage, drawer open/close, stepper, PDP price-sync, add/remove handlers.
- **Keep:** mobile menu, scroll-reveal, toast, slideshow (if retained in hero alongside video), slogan rotation, parallax, filter bar, accordion, back-to-top, doodle draw.
- **Add (markup-only this PRD; behavior later):** language-switch toggle (dir/lang swap can be wired here since it's structural, not "behind-the-glass"), inert `.media__more` and `.contact-fab` triggers (real behavior = PRD 2).

## 12. Acceptance criteria (foundation "done")

1. `mockup-v4/` exists as a self-contained fork; the 5 pages open standalone in a browser.
2. No commerce UI remains (no cart, price, or add-to-cart anywhere).
3. Every media item across all pages renders through the shared media component and shows the reserved "+" affordance in a consistent position.
4. Home hero contains a real, muted, autoplaying video, working on desktop and mobile widths.
5. Projects index is a variable-size collage with a search field present; each tile deep-links to a slim project page (H1 + H2 + image(s)).
6. The language switch flips the whole document to Hebrew/RTL and back, with all foundation templates legible in both.
7. A floating contact trigger is present on every page.
8. Nav shows Catalog · Projects · Sustainability · About · Contact + language + social slot; wordmark reads "Pic Pong.biz".

## 13. Requirement traceability

| Req | Where | Status in v4 |
|---|---|---|
| FR-1/2/3 chrome, wordmark, social slot | §5 | Foundation |
| FR-4/5/6 i18n/RTL | §8 | Foundation (geo-detect = build note) |
| FR-7/8/9 video hero, collage | §7.1, §9 | Foundation |
| FR-10/11 catalog browse, eco-only content | §7.2, §7.3 | Foundation (content curation ongoing) |
| FR-12/13/14/15 projects collage/search/slim page/deep-link | §7.4, §7.5 | Foundation (search behavior → PRD 3) |
| FR-16 media "+" slot | §6.1 | Foundation (behavior → PRD 2) |
| FR-17/18/19 quote form + thumbnail | — | **PRD 2** |
| FR-20/21 floating form | §5 placement | Foundation anchor; behavior → PRD 2 |
| FR-22/23 email/WhatsApp routing | — | **PRD 2** (representation) |
| FR-24/25/26 CMS | — | **PRD 3** (static placeholder) / build |
| FR-27/28 SEO, H1/H2 | §7.4/7.5 H1/H2 | Foundation markup; strategy → PRD 3 |
| NFR-1 retention | whole structure | Foundation |
| NFR-2 custom build | n/a (mockup) | build note |
| NFR-3 RTL quality | §8 | Foundation |
| NFR-4 video | §7.1/§9 | Foundation |
| CR-1/2/3/4 content & visual rules | noted | **design phase** (out of scope here) |
