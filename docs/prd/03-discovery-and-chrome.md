# PRD 3 — Discovery & Chrome (mockup-v4)

> **Product:** `mockup-v4/` — a **UI-only mockup** (vanilla HTML/CSS/JS, no framework, no build, no backend), forked from `mockup-v3/`. Source of truth for a future real build; nothing behind the glass is real.
> **This PRD covers:** how things get **found, addressed, and shared**, plus the remaining **chrome** PRD 1 reserved slots for — **projects search**, **SEO-shaped markup** (incl. dynamic per-item social previews), **the URL & item-addressing system** (deep-link to a *specific media item* + visible highlight, the rep-share affordances, a simple resolver), **social links**, a **static representation of the daily-publish CMS**, **content states**, and the **end-to-end lead-delivery flow** (templated email to the rep, shown as a static template). Real CMS, real routing, real email/social integrations are **represented, not built** — flagged as build notes.
> **Inputs:** `docs/human-review/meeting1-analysis.md` (FR-3, FR-12/13, FR-15, FR-24/25/26, FR-27/28; Q3/Q5/Q8), `docs/prd/01-foundation-structure.md` (IA, slugs, search field, H1/H2, social slot, content model), `docs/prd/02-lead-capture-ui.md` (the media `data-media-id` contract, the drawer, the `wa.me` builder), the already-built v4 pages.
> **Sibling PRDs:** PRD 1 — Foundation (done); PRD 2 — Lead-capture UI (done); Phase-2 PRD — Shop (commerce) + the interactive rep-receiving experience.
> **Status:** Draft for review.

---

## 0. Decisions (locked + resolved here)

Rows marked **(locked, session 2026-06-13)** were settled with Yuval in the pre-write discussion. Rows marked **(this PRD)** are calls I made to keep momentum — flag any you disagree with. Each notes the open question it resolves.

| # | Decision | Rationale |
|---|---|---|
| **L-1** | **Mockup URLs stay `?p=<slug>` — NOT the real format.** No REST paths / no Firebase rewrites in the mockup. The real site uses the canonical scheme in §4. *(locked)* | The mockup is static files openable off disk; path routing would force always-run-the-server and lose double-click-to-open, for cosmetic gain. The query-param form is a **mockup stand-in only** — see the emphasized note in §4.1. |
| **L-2** | **Real-site URL scheme = clean REST-style paths with a language prefix:** `/{he\|en}/{projects\|catalog}/{slug}`. *(locked; resolves the slug-scheme open Q)* | One clean, canonical, crawlable URL per language is the robust way to rank Hebrew and English separately — the stated #1 driver. |
| **L-3** | **Slugs are English in both languages**, descriptive (client + event), **uniqueness enforced by the CMS** (auto-suffix on collision). A **stable internal id is separate from the slug.** *(locked; resolves "multiple Microsoft projects")* | `microsoft` can't be a slug — many Microsoft projects exist. Descriptive unique slugs + an immutable id keep URLs human/SEO-friendly *and* shared links durable across renames. |
| **L-4** | **Daily CMS content surfaces as a Home "Latest" strip + a dedicated feed page.** *(locked; resolves the CMS-surface open Q)* | Most room to show the daily-publish rhythm without bloating the projects collage. |
| **L-5** | **Everything is CMS-editable, bilingual (EN+HE) with NO auto-translation**; plus a **draft → preview → publish** (staging) flow. *(locked; resolves Q3 reframed)* | Marina authors both languages; Facebook is just one source she curates from — no special handling. Preview lets Picpong see the page before the public does. |
| **L-6** | **Lead delivery = a templated email to the sales rep** containing the client's inputs + the deep links. Represented in the mockup as **one static, elegant email template, opened via a Dev menu.** *(locked)* | The real mechanic; the static template is enough to demo and pitch. **No rep-side portal in Phase 1.** |
| **L-7** | **The interactive rep-receiving experience and a WhatsApp-formatted rep view → Phase 2** (if the client commissions it). *(locked)* | Out of Phase-1 scope; the visitor's own `wa.me` path (PRD 2) already represents "links in a WhatsApp message." |
| **L-8** | **Share links are single-item and independent:** one link per item; the rep gets a list and opens each separately, landing on that item highlighted. *(locked; shapes Q8)* | Simpler than multi-highlight; matches how reps actually forward "look at this, and this." |
| **D-1** | **Media-level deep-linking with on-arrival highlight.** Every addressable item (project/event, product, image-in-a-gallery, client logo) carries a **stable id**; a link can target it; on load the page **scrolls to and visibly spotlights** that exact item. *(this PRD; expands FR-15/Q8)* | Serves the rep side of *"I saw something, I can't describe it"* — the prospect lands on the precise piece, lit up. |
| **D-2** | **Specific item = a `#item-<id>` hash** on the page; the page/container is the indexable URL. *(this PRD)* | Hashes are ignored by crawlers (no duplicate URLs, SEO-safe), auto-scroll natively, and give image-level granularity without minting a thin page per image. |
| **D-3** | **Simple resolver `/m/<id>` → 301 → canonical page + `#item-<id>`.** Keys off the **stable id, not the slug**. *(this PRD; resolves the resolver open Q)* | Durable share links that survive slug edits/content moves. Mockup represents it; real = a tiny redirect endpoint. |
| **D-4** | **Rep-share affordances (Q8) = "Copy link" + "Share on WhatsApp"** at page level, **plus a "copy link to this image"** inside the lightbox for image-level shares. *(this PRD; resolves Q8)* | Reps live in WhatsApp (same channel as PRD 2 routing); copy-link covers email/SMS; the lightbox is the natural place to grab one exact image. |
| **D-5** | **Projects search = live, type-to-filter** over the rendered tiles, indexing **title / H2 / tag / client**, **AND-composed** with the filter chips, with an **empty-result state.** *(this PRD; resolves search-scope Q / Q5 context)* | Lowest-friction, no submit; composes with the chips already built (`[data-filterbar]`). |
| **D-6** | **Social links = placeholder `href="#"` + build note** (unless real handles are supplied). *(this PRD; FR-3)* | Same treatment as PRD 2's `wa.me` number — markup/placement now, real URLs are content. |
| **D-7** | **SEO = best-practice markup now; a dedicated SEO analysis pass runs after the site's content is mostly in.** *(this PRD; resolves Q5)* | No structural decision pending — only disciplined markup + a scheduled follow-up audit. |
| **D-8** | **Per-item metadata + OG/social-preview image must be DYNAMIC on the real site** (per product/event/image, per language). Mockup hand-sets them static. *(this PRD; hard build requirement)* | In WhatsApp the unfurled link card *is* the item; as products/events change, previews must follow automatically. |
| **D-9** | **Images live on detail pages; listing pages only highlight items.** An **image-level** id (`…-<n>`/`…-hero`) always resolves to the **detail page that owns the image** (which already has the lightbox `<dialog>`) and opens that frame. **Listing pages** (Home, projects index, catalog grid) do **tile-level highlight only** — no per-image lightbox there. *(this PRD)* | An image's canonical home is its project's gallery (matches the §4.2 hash-on-its-page model). Reuses the single existing `<dialog>`, avoids a second lightbox to build/maintain, and lands the prospect in full project context instead of a lone photo floating over an unrelated grid. |

**Still open:** **OQ-1** (form contact requirement — at-least-one of Email/Phone vs both vs Email-only) remains unresolved; this PRD writes the share/email copy around the current PRD 2 spec (at-least-one) and leaves OQ-1 in `open-questions.md`.

---

## 1. Objective

Turn the v4 catalog from a pretty gallery into something **discoverable, addressable, and shareable**: a visitor (or Google, or a sales rep) can **find** the right work, **link to the exact item** that matters, and **hand it off** so the recipient lands on precisely that piece — and the daily-fresh content that keeps the site alive is shown as an editable, bilingual, preview-able CMS. Everything real (routing, email send, social, CMS) is **represented** so nothing here requires the backend to exist, while the spec records exactly how the real build must do it.

## 2. Scope

**In (this PRD — behavior/markup in the mockup):**
- **Projects search** behavior (live filter, chip composition, empty state).
- **SEO-shaped markup:** per-page `<title>`/meta-description patterns, H1+H2 discipline, the Hebrew/English keyword map, `alt` conventions, a structured-data (JSON-LD) note, and **static** per-item OG tags.
- **The URL & addressing system** *as represented in the mockup*: the `?p=` stand-in, the `#item-<id>` highlight, the highlight-on-arrival experience, the share affordances, and a represented `/m/<id>` resolver.
- **Social links** markup/placement (header + footer), placeholder hrefs.
- **CMS representation (static):** which regions/fields are editable vs fixed, the bilingual content model, the Home "Latest" strip + feed page, the daily 1-photo+~4-lines pattern, quarterly video, and the draft/preview state — all static placeholders.
- **Content states:** mock loading/empty placeholders where the CMS will feed.
- **End-to-end lead-delivery flow:** the static rep-email template + Dev-menu trigger, with live deep links.

**Deferred / not built (build notes):** real server routing & clean REST URLs; the real `/m/<id>` resolver + 301s; real email send; dynamic OG/meta generation; real social URLs; the live CMS (auth, daily publish, preview/staging, FB import); structured-data emission; a real SEO audit.

**Out (Phase 2 / other PRDs):** commerce (cart/checkout/payment/SKU tables); the **interactive rep-receiving experience** and a **WhatsApp-formatted rep view** (L-7).

## 3. Base & approach — wire the inert slots PRD 1/2 left

The foundation already ships every slot this PRD activates:
- **`[data-search]`** projects field exists and currently just toasts *"coming in PRD 3"* (`app.js` ~L922) — **this PRD replaces that with live filtering** (D-5).
- **`[data-filterbar]` / `[data-filter]` / `[data-cat]`** filter logic exists (`app.js` ~L854) — search **composes with** it; do not fork a second visibility system.
- **`data-media-id` / `data-media-title` / `data-media-thumb`** are on every media item (PRD 1 §6.1, used by PRD 2) — this PRD makes `data-media-id` the **globally-unique, addressable** handle (§4.3).
- **`.nav__social` / `.footer__social`** exist with placeholder hrefs — finalize placement/labels (§5).
- **`?p=<slug>`** deep-links already shape `project-detail.html` links — keep, and add the `#item-<id>` highlight layer (§4).
- **i18n convention** (`data-en/-he`, `-ph`, `-aria`, `data-i18n-html`, `[data-lang-switch]`) and **`#toast`** are reused verbatim.
- The **lightbox `<dialog>`** (`data-zoom`) is the host for image-level share (D-4) and image-level highlight.

---

## 4. The URL & item-addressing system (the spine of this PRD)

This section defines how every item is **named, linked, resolved, and highlighted**. It has a **real-site contract** (what to build) and a **mockup representation** (what ships in `mockup-v4/`).

### 4.1 ⚠️ Mockup URLs are a stand-in, not the real format

> **EMPHASIZED BUILD NOTE.** The URLs in `mockup-v4/` (`project-detail.html?p=king-solomon`, `…#item-…`) are a **mockup-only convenience** so the static files open without a server. **They are NOT the production URL format.** The real website MUST implement the canonical scheme in §4.2 (clean REST-style paths, language prefix, slug rules, resolver, hreflang/canonical). Do not ship `?p=` to production; do not treat it as a spec. Every place the mockup uses `?p=` maps to a real path per §4.2.

### 4.2 Real-site canonical URL scheme (build spec)

**Page/resource URLs:**
```
/{he|en}/{projects|catalog}/{slug}[#item-<id>]

/en/projects/microsoft-winter-event
/he/projects/microsoft-winter-event           (same project, Hebrew content; English slug)
/en/catalog/modular-counter
/he/projects/microsoft-winter-event#item-7f3a  (Hebrew page, one image highlighted)
```

Rules the real build MUST follow:
1. **Clean path per resource** at the page level (`/projects/<slug>`, `/catalog/<slug>`). **Do NOT** create deeper indexable sub-resource URLs per image (e.g. `/projects/x/images/3`) — an image is a highlight on its page, addressed by `#item-<id>`, never its own page. (Thin/duplicate pages hurt SEO.)
2. **Language as a path prefix** (`/he/…`, `/en/…`). Each language is its own crawlable URL. Pair them with `<link rel="alternate" hreflang="he|en|x-default">` and one `<link rel="canonical">` per page. Only the **content language** changes; slug + layout are identical.
3. **Slug = English, descriptive, unique** (L-3): auto-generated from the project/product title (e.g. `microsoft-winter-event`); on collision the CMS appends a numeric suffix (`microsoft-winter-event-2`) and may include a year. The slug is the public, SEO-facing handle.
4. **Slug is immutable once published**; if an editor changes it, the old slug **301-redirects** to the new one (preserve SEO + old shared links).
5. **Stable internal id** (number/UUID), separate from the slug, lives on every addressable item. The id, not the slug, anchors the highlight (`#item-<id>`) and the resolver (§4.4) — so renames never break shared links.

### 4.3 Item identity — the `data-media-id` contract (mockup)

Every addressable item carries a **page-unique** `data-media-id` (the on-arrival reader resolves the `#item-<id>` hash by querying this attribute; a DOM `id="item-<id>"` mirror is optional). The grammar **matches what `app.js` already emits** (`mediaMoreBtn()` at ~L196/L207) — do **not** introduce a second convention:

| Item type | `data-media-id` pattern | Example | Notes |
|---|---|---|---|
| Project / event | `proj-<slug>` | `proj-microsoft-winter-event` | The project tile/page. |
| Gallery **hero** image | `proj-<slug>-hero` | `proj-microsoft-winter-event-hero` | The lead image (first in the array). |
| Gallery image **n** | `proj-<slug>-<n>` | `proj-microsoft-winter-event-3` | **1-based, excludes the hero** (n=1 is the *second* image). As emitted today. |
| Product (catalog item) | `prod-<slug>` | `prod-modular-counter` | |
| Product gallery image | `prod-<slug>-hero` / `prod-<slug>-<n>` | `prod-modular-counter-2` | Same hero/n rule. |
| Client logo | `client-<slug>` | `client-intel` | |
| Daily feed post | `feed-<slug>` | `feed-microsoft-teardown` | Each `latest.html` post (and its Home-strip twin) shares one id. |

> **Grammar note:** image ids use a **single-dash** suffix (`-hero`, `-<n>`), not `__img-<n>` — this is the string `mediaMoreBtn()` constructs, so the hash, the highlight reader, and the lightbox all key off the *same* value with no translation layer.

**Uniqueness — the real invariant is per-page, refined during implementation.** The `#item-<id>` hash only ever resolves *within the loaded page*, so the binding constraint is: **no two elements on the same page share an id.** That was already true in the mockup — so the highlight works without a destructive re-mint. Cross-page repeats of the *same logical item* (e.g. `proj-google` on both the Home teaser and the projects-index tile) are **fine and intended**: same item, same id, different page; the resolver (§4.4) just picks one canonical page per id (a build-note, not a markup bug). What the sweep actually does:
- **Normalize placeholder ids to the grammar** so products read as `prod-<slug>` (done: `counter-demo`→`prod-demo-counter`, `totem-fs`→`prod-totem`, `shelf-mod`→`prod-shelf`, `wall-photocall`→`prod-photocall-wall`).
- Keep cross-page same-item ids consistent (a Home teaser and its listing tile carry the *same* `proj-<slug>` id; per D-9 the resolver's canonical page for an image-level id is the detail page).
- The earlier "globally unique across the whole site" wording was stricter than the per-page reality requires — corrected here.

**Implementation note (built):** the highlight reader keys off `data-media-id` directly (querying the attribute), so a separate DOM `id="item-<id>"` mirror is *not* required for it to work — though `latest.html` posts also carry the mirror harmlessly. The detail-page **hero is addressable and lightbox-able** (`proj-<slug>-hero` opens the lightbox), matching gallery images.

> **Real-site note:** in production these public ids are the **stable internal id** (§4.2.5), not the slug-derived string — the mockup uses readable slug-based ids only for legibility. The contract (every addressable item has a unique id; the highlight + resolver key off it) is identical.

This **extends** PRD 1/2's media contract rather than inventing a parallel system: the same `data-media-id` that the lead drawer collects is the handle the share link points at.

### 4.4 The resolver `/m/<id>` (simple)

- **Real site:** a tiny endpoint. `GET /m/<id>` → look up the id → **301** to `/{lang}/{type}/{slug}#item-<id>` (language from the request/preferred locale). One small map; survives slug changes and content moves. That is the **durable share format** the email/links use.
- **Mockup:** represented — share affordances build the *direct* `?p=<slug>#item-<id>` link (no real redirect server). A code comment + the Dev-menu/email disclaimer note that production uses `/m/<id>`.

### 4.5 On-arrival highlight (the visible spotlight)

When a page loads with a `#item-<id>` hash, `app.js`:
1. **Finds** the element whose id/`data-media-id` matches; if none, **load normally, no highlight, no error** (graceful fallback).
2. **Force-reveals the target first (critical — prevents a silent no-op).** If the matched item is hidden by an active filter chip or a search query, the highlight reader **resets the filter bar to "All" and clears the search field** before scrolling. `scrollIntoView` on a `display:none` element silently does nothing, so the headline rep flow would otherwise fail invisibly when a link lands on a filtered-out tile. Reset state → ensure the item is rendered/visible → then continue.
3. **Scrolls it to center** (`scrollIntoView({behavior:'smooth', block:'center'})`; jump, not smooth, under `prefers-reduced-motion`).
4. **Spotlights it** — a brief dim/blur of the surroundings + a glowing ring on the item, settling into a persistent thin outline so it stays obvious after the animation. The dim/spotlight overlay is **dismissable** (click-away / scroll / Esc) — never a stuck modal layer.
5. **Labels it** — a small caption tag written for the person who *lands* on it (the prospect), second-person/arrival-framed, e.g. *"זה הפריט שביקשתם לראות"* / "Here's the piece you asked about" (i18n via the standard attributes).
6. **Image-level ids (`…-hero` / `…-<n>`) resolve to the detail page that owns them (D-9):** on that detail page they additionally **open the lightbox** on that frame (reuse the existing `data-zoom` `<dialog>`). A bare `proj-…`/`prod-…` id highlights the tile/page only. **Listing pages do not open a lightbox** — if an image-level hash ever reaches a listing page, fall back to highlighting the parent project tile (no error).

Respect reduced-motion throughout; the highlight must render in both LTR and RTL and on mobile.

### 4.6 Share affordances (Q8 → D-4)

- **Page level** (project & product pages): a **"Copy link"** control and a **"Share on WhatsApp"** control (builds a `wa.me` link whose text names the item + its URL). Both use the resolver form conceptually; mockup uses the direct link.
- **Image level (detail/product pages only — where the lightbox exists, per D-9):** inside the **lightbox**, a **"copy link to this image"** control that copies the URL *with the `#item-<slug>-<n>` (or `-hero`) hash baked in* — grab the exact frame from the moment you're viewing it. Listing pages have no lightbox, so they expose page/tile-level share only.
- **Context-aware:** the page-level share captures the current page; the lightbox share captures the active image.
- **Copy feedback + `file://` fallback (required):** "Copy link" MUST confirm with a `#toast` ("הקישור הועתק" / "Link copied"). `navigator.clipboard` **fails silently on `file://`** — exactly how the mockup opens by double-click — so wrap it in a `try` with a `document.execCommand('copy')` fallback (hidden textarea), and only toast on actual success. The Dev menu / README note that opening via `npm run serve` gives reliable clipboard.
- **Per-item OG dependency:** because pasted links unfurl from OG tags, each page/item must set its own `og:image`/`og:title`/`og:description` (§6.4 / D-8) so the shared preview shows the right item — not a generic site cover.

---

## 5. Social links (FR-3)

- Finalize **Facebook · Instagram · LinkedIn** (TikTok later) in **both** the header `.nav__social` and the footer `.footer__social` (both already present). Keep the existing inline SVG icons.
- **Hrefs = placeholder `#` + build note** (D-6) until real handles are supplied; each `<a>` keeps a translated `aria-label`. Facebook is also the photo source the editor curates from (Q3) — no special markup, just the link.
- **Build note:** real profile URLs are content; drop them into the `href`s at build.

---

## 6. SEO-shaped markup (FR-27/28, Q5 → D-7/D-8)

Best-practice markup now; a real SEO audit after content lands (D-7).

### 6.1 Title / meta-description patterns
- Per page, unique `<title>` and `meta[name=description]`, **authored per language** (no auto-translation), front-loading the target keyword.
- Patterns:
  - Home: `PicPong.biz — דוכנים ותצוגות מקרטון ממוחזר לאירועים ותערוכות` / English parallel.
  - Projects index: `פרויקטים — דוכני קרטון לאירועים ותערוכות | PicPong.biz`.
  - Project page: `<project title> — <type> מקרטון | PicPong.biz`.
  - Catalog item: `<product> — <type> מקרטון | PicPong.biz`.

### 6.2 Target-keyword map (Hebrew leads; English parallel)
Map the high-intent searches Kuki named to pages, so H1/H2/title/alt reinforce them:

| Keyword | Primary page(s) |
|---|---|
| **דוכן מקרטון** (cardboard booth) | Projects index; booth/exhibition projects; relevant catalog items |
| **דלפק מקרטון** (cardboard counter) | Catalog (counters); product pages |
| **שולחן מקרטון** (cardboard table) | Catalog (tables); product pages |
| **תערוכה מקרטון** (cardboard exhibition) | Projects index; exhibition projects |

### 6.3 H1/H2 discipline & alt conventions
- **One `<h1>` per page** (the page/project/product title); **`<h2>`** the one-line subtitle — already structural from PRD 1 §7.4/7.5; here it's keyword-aware.
- **`alt` per image:** descriptive + keyword-bearing where honest (e.g. *"דוכן מקרטון ממוחזר לכנס Microsoft"* / "recycled cardboard booth for the Microsoft conference"), authored per language in the CMS. Decorative/chrome images get empty `alt`.

### 6.4 Per-item social-preview (OG) — **dynamic on the real site (D-8)**
- Each project, product, and (where shared) image exposes its own `og:title` / `og:description` / `og:image` + Twitter equivalents, **per language**.
- **Mockup:** hand-set static OG tags per page (replace the single shared `og-cover.png` currently on every page).
- **HARD BUILD REQUIREMENT:** the real site MUST **generate these dynamically from CMS content** — adding/editing a product, event, or image automatically updates its `<title>`, meta description, and social-preview image+text. This is what makes the WhatsApp/email link previews (§4.6, §8) reflect current content as the catalog grows.

### 6.5 Structured data (note)
- **Build note:** emit JSON-LD — `Organization` site-wide; `CreativeWork`/`ImageObject` (or `Project`-like) per project; `Product` (no price in Phase 1) per catalog item; `BreadcrumbList` on inner pages. Not emitted in the mockup; documented here so the real build includes it.

---

## 7. Projects search (FR-12/13 → D-5)

Wire the inert `[data-search]` field:
- **Live, type-to-filter** (`input` event, debounced) over the **rendered project tiles**; no submit/navigation. Indexed text per tile: **title (H3/H4) + H2/subtitle + tag + client** (and any `data-search-text` we add). Match is case/diacritic-insensitive, substring.
- **Composes with the chips (AND):** a tile shows only if it satisfies **both** the active `[data-filter]` category **and** the query. Reuse the chips' visibility rather than a competing display toggle — both read the same `data-cat` + a new `data-hidden-by-search` flag so they don't fight.
- **Empty-result state:** when nothing matches, show an inline empty message (i18n) — e.g. *"לא נמצאו פרויקטים. נסו מונח אחר או דברו איתנו."* / "No projects match — try another term or talk to us," with a link to the contact/quote flow. Clearing the query restores the chip-filtered set.
- **Scope note (mockup):** search operates over the tiles present on the page; the "64 more in the archive" copy stays a content note. In the real (CMS-fed) site, search covers the full published set — build note.
- **RTL:** field, icon, and empty state render correctly in Hebrew.

---

## 8. CMS representation (FR-24/25/26 → L-4/L-5)

Static placeholders that show what *"daily-updated"* looks like and document the content model. **No real CMS** (auth, persistence, publish, FB import) — all build notes.

### 8.1 Content model — editable vs fixed, bilingual
- **Everything content-bearing is an editable field** (L-5): headings, body copy, the daily lines, images, alt text, per-item meta/OG. Structural chrome (nav labels, layout, legal) is template-fixed but still translatable.
- **Bilingual, paired fields, NO auto-translation** (L-5): every text field stores an **EN value and an HE value** (`title_en`/`title_he`, the ~4 daily lines per language, `alt_en`/`alt_he`, `meta`/`og` per language). The editor writes both. The mockup represents this with the existing `data-en`/`data-he` attributes.
- **Per-item meta/OG fields** are part of the model (ties to §6.4/D-8).
- **Draft → preview → publish (staging):** an editor can preview the page privately before it goes public. Represented as a documented state; real = build note.

### 8.2 The daily-publish pattern (L-4)
- **Home "Latest" strip:** a horizontally-scannable strip of recent daily posts — each a **1 photo + ~4 lines** card (the format Marina publishes), newest first; links into the feed page.
- **Dedicated feed page** (`latest.html` / "יומן"): the chronological stream of those daily posts; the canonical home of the daily content.
- **Quarterly video:** the model supports a video post (professional videos ~quarterly) rendered through the §6.1 media component (muted/poster), not just stills.
- **A "media item"** in the feed reuses PRD 1's media component (so it carries the "+" and a `data-media-id` — feed items are addressable/shareable like everything else).
- **Mockup:** the strip + feed page ship with **static sample posts** standing in for the daily stream; a small cap notes the live daily publish + preview/staging + FB curation are build notes.

---

## 9. Content states (mock)

- **Loading:** for CMS-fed regions (Latest strip, feed page, projects collage), a lightweight skeleton/shimmer placeholder pattern (static; reduced-motion safe).
- **Empty:** the search empty state (§7); an empty feed state (*"עוד לא פורסם — חזרו בקרוב"* / "Nothing published yet — check back soon").
- All states are **representational**; no real fetch occurs. Documented so the real build has the contract.

---

## 10. End-to-end flow & lead-delivery (the round-trip)

Ties the addressing system (§4) to PRD 2's capture, and shows what the rep receives — **as a static email template** (L-6), **no rep portal** (L-7).

### 10.1 The scenario
1. **Client** browses, taps **"+"** on the pieces they like (image-in-project, product, event, logo — anything with a `data-media-id`), fills the four-field form, **Sends** (PRD 2).
2. **Delivery (real mechanic):** the server emails the **sales rep** a **templated email** containing the client's inputs (name, phone/email, message) + **one deep link per selected item** (resolver `/m/<id>` form).
3. **Rep** opens each link **separately** (L-8) → lands on that item's page with it **highlighted** (§4.5). The addressing system + highlight is **Phase 1 and real in the mockup**, so these links genuinely work.

### 10.2 Mockup representation
- **A single static, elegant email template** rendering the lead as the rep receives it: contact block + a list of item rows (thumbnail + title + client/type + a **"צפו בפריט ←"/"View item"** link). Capped as a demo (*"הדמיה — לא נשלח דבר"* / "Demo — nothing is actually sent").
- **Opened via a Dev menu** (or `?dev`/hidden trigger) so Yuval/Kuki can pull it up in a pitch. Seed it with the **live selection** when arriving from a real submit, **or** with a **sample lead** when opened cold from the Dev menu.
- **The links inside the template are live** → clicking opens the page + highlight, closing the loop on screen.
- **Build notes:** real email send/template rendering; the resolver; dynamic OG previews inside the email; the interactive rep-receiving experience + WhatsApp-format view (→ Phase 2, L-7). The *visitor's* own WhatsApp hand-off with item links already exists (PRD 2 `wa.me` builder).

---

## 11. `app.js` + markup impact

**Replace:**
- The inert `[data-search]` submit-toast → live filter (§7), composing with the existing `[data-filterbar]` handler.
- The chip handler's direct `card.style.display` toggle → a **single `applyVisibility(tile)`** that a tile is visible **iff** it passes **both** the active chip **and** the search query (read both `data-cat` and a `data-hidden-by-search` flag). Both the chip click and the search `input` call the same function — they must not write `style.display` independently or they will fight (a chip change would un-hide a search-excluded tile).

**Add:**
- **Highlight-on-arrival** reader (§4.5): parse `#item-<id>`, scroll/spotlight/label, open lightbox for `…__img-n`, graceful no-op on miss.
- **Share affordances** (§4.6): page-level "Copy link" + "Share on WhatsApp"; lightbox "copy link to this image" (clipboard + `wa.me` builder, reusing PRD 2's link builder).
- **Dev-menu** trigger + the **static rep-email template** render (§10.2), seedable from a live selection or a sample lead.
- The **Home "Latest" strip** + **`latest.html` feed page** with static sample posts (§8.2); **content-state** placeholders (§9).

**Change markup:**
- **First, the id-uniqueness sweep (precondition, §4.3):** audit `index.html`/`projects.html`/catalog+product/feed for duplicate `data-media-id`s (today: `proj-google|landa|microsoft` cross-page, `counter-demo` ×3); collapse same-project duplicates to one canonical id on the canonical listing, give the Home teaser a *link* not a re-minted id, and rename demo placeholders. Only then mirror each `data-media-id` to a DOM `id="item-<id>"` and wire any hash/highlight code.
- Per-page static **OG/meta** tags (replace the shared cover) (§6.4); per-language `alt`.
- Finalize `.nav__social`/`.footer__social` (§5).

**Keep untouched:** the PRD 2 lead drawer/chips/validation, the language switch, mobile menu, scroll-reveal, accordion, back-to-top, the lightbox plumbing (extended, not replaced).

---

## 12. Acceptance criteria ("done")

1. **Search:** typing in the projects field live-filters the tiles by title/H2/tag/client, **AND-composed** with the active chip; no matches shows the empty state; clearing restores the chip-filtered set; works in RTL.
2. **Addressing:** every project/product/feed/logo item has a **globally-unique** `data-media-id` (no cross-page duplicates) mirrored to `id="item-<id>"`; gallery images use the emitted `…-hero` / `…-<n>` grammar (single-dash), not `__img-n`.
3. **Highlight:** opening a page with `#item-<id>` **first resets any active chip/search so the target is visible**, then scrolls to and **visibly spotlights + labels** it (label is prospect-facing, dim layer dismissable); an image-level id resolves to the **detail page** and opens the lightbox on that frame; on a listing page an image-level id falls back to highlighting the parent tile; an unknown id loads the page cleanly with no highlight and no error; reduced-motion respected.
4. **Share:** project/product pages expose **"Copy link"** + **"Share on WhatsApp"**; the lightbox (detail/product only) exposes **"copy link to this image"** with the `#item-<slug>-<n>` hash baked in; **"Copy link" confirms with a toast and works on `file://`** (clipboard with `execCommand` fallback).
5. **SEO markup:** each page has a unique per-language `<title>` + meta-description, one `<h1>` + an `<h2>`, keyword-aware `alt`, and **its own** static OG tags (not the shared cover).
6. **Social:** Facebook/Instagram/LinkedIn icons present in header **and** footer with translated `aria-label`s (placeholder hrefs + build note).
7. **CMS representation:** a Home **"Latest" strip** and a **feed page** render static daily-style posts (1 photo + ~4 lines), bilingual via `data-en/-he`, with a cap documenting live daily-publish + preview/staging + FB curation as build notes; quarterly-video supported by the media component.
8. **Content states:** loading skeletons + empty states are present (representational).
9. **End-to-end:** a **static rep-email template** (contact block + item links) opens from a **Dev menu**, seedable from a live submit or a sample lead; its **links are live** (click → page + highlight); capped as a demo.
10. **URL caveat:** the mockup's `?p=`/`#item-` URLs work, and the PRD's §4.1 build note that this is a **mockup-only stand-in** (real site = §4.2 REST scheme) is honored in code comments.

## 13. Requirement traceability

| Req | Where | Status in v4 |
|---|---|---|
| FR-3 social icons | §5 | Markup/placement (real URLs = build note) |
| FR-12/13 projects collage + search | §7 | Search behavior — this PRD |
| FR-15 deep-linkable project pages | §4 (addressing + highlight + share) | This PRD (expanded to item-level) |
| FR-24/25/26 CMS / daily publish / video | §8 (+ §9 states) | Static representation; real CMS = build note |
| FR-27/28 SEO, H1/H2, per-item OG | §6 | Best-practice markup now; dynamic OG + audit = build note |
| Q3 Facebook / content | §8 (L-5) | Resolved — all CMS-editable, editor curates; preview/staging |
| Q5 SEO approach | §6 (D-7) | Resolved — best practice now, audit after content |
| Q8 rep sees/shares | §4.5/4.6 (D-1..D-4) | Resolved — item-level deep-link + highlight + copy/WhatsApp share |
| Slug scheme | §4.2/4.3 (L-2/L-3) | Resolved — REST paths, unique English slug, id≠slug (real); `?p=` mockup |
| Search scope | §7 (D-5) | Resolved — title/H2/tag/client, live, AND chips |
| OQ-1 form contact requirement | (open) | **Open** — see `open-questions.md` |

## 14. Open questions / build notes carried forward

- **OQ-1** — form contact requirement (Email/Phone) — still open; share/email copy written around the at-least-one spec.
- **Real routing & URLs** — clean REST paths + language prefix + hreflang/canonical + slug uniqueness/immutability/301s (§4.2); the **mockup's `?p=` is a stand-in only** (§4.1).
- **Resolver** `/m/<id>` — real redirect endpoint (§4.4).
- **Dynamic OG/meta** — generated from CMS content per item, per language (§6.4/D-8) — **hard requirement** for the real site.
- **Live CMS** — auth, daily publish, **draft/preview/publish (staging)**, Facebook import/curation, bilingual authoring (§8) — all build.
- **Structured data** — JSON-LD emission (§6.5).
- **SEO audit** — a dedicated pass once content is mostly in (D-7).
- **Real social URLs** — content (§5/D-6).
- **Real email send + template** — and, in Phase 2, the **interactive rep-receiving experience + WhatsApp-format view** (§10, L-7).
- **Full-archive search** — real search covers the whole published set, not just rendered tiles (§7).
