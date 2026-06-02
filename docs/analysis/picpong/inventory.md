# Picpong (picpong.biz) — Current-Site Asset Inventory for Redesign

**Date:** 2026-05-31
**Redesign scope:** Conference / events / exhibition products only — cardboard / eco / X-Board, mirroring cartonlab.com. Point-of-sale, interior, and retail lines are OUT of scope (noted, not deep-catalogued).
**Crawl methods:** live site (`https://www.picpong.biz/en`), WordPress XML sitemaps, WordPress REST API, WebFetch page renders, WebSearch (X-Board spec recovery), Wayback CDX (URL history). ~30 URLs touched.

---

## How to read the "loads?" status

The current Picpong site is a normal server-rendered WordPress (Yoast SEO, WPML `/en/` tree, `portfolio` custom post type). It is fully crawlable — sitemaps, REST API, and page HTML all return real content. Image-load status below is recorded as:

- **loads** = the URL is referenced in the live rendered page AND/OR returned a real image body on direct request.
- **loads (low-res)** = loads but is a small/down-rezzed asset (logo strips, 2018-era phone photos).
- **placeholder** = WebFetch rendered this slot as a placeholder/blank GIF (client-logo row — see §5; needs human confirmation in a real browser).
- **404 / missing** = direct request returned 404 or no image body.

> Note on the "first crawl found many broken images": that earlier pass mis-read a slow/partial render. On this crawl the media library is **live** — project hero images, the PP logo, and client logos are all referenced and served from `wp-content/uploads`. The genuine *asset* problem is not 404s, it is **low resolution and inconsistent quality** (phone snapshots, tiny logo PNGs, Hebrew-named files), which is the real driver of the reuse flags in §7. A few client-logo slots did render as placeholder GIFs in one WebFetch pass and are flagged for browser re-verification.

---

## 1. Sitemap

Source of truth: `sitemap_index.xml` → `page-sitemap.xml`, `portfolio-sitemap.xml`, `category-sitemap.xml`, `post-sitemap.xml`, `articals-sitemap.xml`, `landpage-sitemap.xml`, `post_tag-sitemap.xml`. The site is bilingual (Hebrew default at `/`, English under `/en/`). Only the English tree is detailed here. `[IN]` in-scope, `[OUT]` out-of-scope, `[N/A]` utility.

```
picpong.biz/  (Hebrew default — mirror of everything below)              [N/A]
└── /en/  (English / WPML)
    ├── /en/picpong/  .................... Homepage (EN), brand + X-Board story  [N/A core]
    ├── /en/x-board/  ................... X-Board material page                  [IN] ★core
    ├── /en/exhibition-design/  ......... Exhibition Design                      [IN] ★core
    ├── /en/conferences-and-events/  .... Conferences and Events                 [IN] ★core
    ├── /en/activity-compounds/  ........ Activity Compounds                     [IN] ★core
    ├── /en/point-of-sale/  ............. Point of Sale                          [OUT]
    ├── /en/interior-and-space-design/  . Interior and Space Design             [OUT]
    ├── /en/picpong-products-for-businesses/  .. Products catalog (hub)         [IN/mixed]
    │     ├── modular-xboard-stands/  ........ Modular X-Board stands           [IN]
    │     ├── modular-walls-made-of-x-board/ . Modular X-Board walls            [IN]
    │     ├── branded-furniture/  ............ Branded furniture (X-Board)      [IN]
    │     ├── designed-gates/  ............... Designed gates                   [IN]
    │     ├── display-installations/  ........ Display installations            [IN]
    │     ├── counters/  ..................... Counters                         [IN/mixed]
    │     ├── central-table/, bulkhead/, special/, pictures/, mobiles/         [mixed]
    │     ├── floor-based-points-of-sale/, desktop-points-of-sale/             [OUT]
    │     ├── signs/, decals/, wallpapers/, shelf-extenders/                    [OUT]
    │     ├── flags-print-on-satin/, fsu-cutout/                                [OUT]
    ├── /en/projects/  .................. Portfolio landing                      [IN/mixed]
    ├── /en/portfolio/  ................. Portfolio archive (74+ case studies)   [IN/mixed] ← see §3
    │     └── /en/portfolio/<slug>/  .... individual case studies (74+)
    ├── /en/about-us/  .................. About                                  [N/A]
    ├── /en/contact-us/  ................ Contact                                [N/A]
    ├── /en/category/x-board/  .......... Taxonomy: X-Board                      [IN]
    ├── /en/category/product/  .......... Taxonomy: product                     [mixed]
    ├── /en/topics/...  ................. Yoast topic taxonomies (exhibition-design,
    │                                      conferences-and-events, activity-compounds,
    │                                      x-board, modular-stands, modular-walls, …)
    └── Utility: /en/feed/, /en/?s=, /shop/, /cart/, /checkout/, /my-account/   [N/A]
        (WooCommerce is installed but the shop is not the focus)
```

**Footer / external:** `tel:1-700-501-508`, `mailto:info@picpong.biz`, Facebook `facebook.com/picpongb2b/`, Instagram `instagram.com/picpongbiz`, LinkedIn `linkedin.com/company/picpong/`, YouTube `youtube.com/user/picpong1`. Site designed by zivit-design.

**Out-of-scope lines (noted only):** Point of Sale, Interior & Space Design, Signs/Decals/Wallpapers/Flags/Shelf-extenders, and the generic print-shop product sub-pages. These remain in the catalog but should NOT be foregrounded in the eco/event redesign.

---

## 2. Products / services in scope

### 2.1 X-Board — CORE material/eco product
- **URL:** `https://www.picpong.biz/en/x-board/`
- **What it is (verbatim from page + search-cached copy):**
  - *"PICPONG is the exclusive importer of X-Board raw material – recycled cardboard panels."*
  - *"X-BOARD … a very dense, environmentally friendly panel – made of 100% recycled cardboard."*
  - Headlines on page: *"Would you believe that all of the elements shown here are made of X-BOARD?"* and *"X-BOARD … If [you] don't read, how will you know what you are missing ..?"*
  - *"we create products using the aforementioned raw material- from planning and design to printing and installation"*
- **Specs (verbatim — this is gold, see §6):** pressing capacity of **60 tons**; contains **flame retardants**; **water resistant / "will not disintegrate even after coming in contact with water"**; **100% recycled cardboard**; lightweight; **can be disassembled and reused / recycled**; you can **print directly onto the panels**.
- **Images:** page-level images load; primary on-page image references `…/2018/03/logo-n.png` (low-res). Real product photography lives in the portfolio (§3), not on this page.
- **Reuse:** copy = **reuse/rewrite** (specs are reusable verbatim; framing should be tightened and eco-led). Imagery = **re-shoot**.

### 2.2 Exhibition Design
- **URL:** `https://www.picpong.biz/en/exhibition-design/`
- **What it is:** trade-show / exhibition stands & booths built from X-Board.
- **Copy (verbatim):**
  - Headline: *"Trade show and exhibition design."* · Sub: *"The parts that make up the whole"*
  - Hook: *"The actor Yankale Ben Sira once said in a well-known advertisement – 'drywall – what's so great about drywall?' Instead, we say, cardboard – What's so good about cardboard?"*
  - X-Board benefits listed: direct printing onto panels · lightweight · disassemblable & reusable · flexible install locations · recyclable · versatile (booths, chairs, shelving).
  - Close: *"PICPONG.BIZ – Basically… We print on everything!"*
- **Images:** load; mostly sourced from portfolio galleries. On-page asset `…/2018/06/table-1.gif` (low-res).
- **Reuse:** copy **reuse/rewrite** (the cardboard-vs-drywall hook is a keeper); imagery **curate from portfolio + re-shoot hero**.

### 2.3 Conferences and Events
- **URL:** `https://www.picpong.biz/en/conferences-and-events/`
- **What it is:** event production — branded event environments, activations, conferences.
- **Copy (verbatim):**
  - Headline: *"Events and conferences that are larger than life ..."* · Sub: *"a range of branding products that will blow your customer's mind …"*
  - *"Is a customer event, business event, conference or company event coming up soon? … We've got you covered … PICPONG is a one stop shop..."*
  - *"We offer design solutions that add presence, color and uniqueness to your event."*
  - CTA: *"Make life easy on yourself. Tell us what your vision is, and we will do the rest!"* / *"Be in touch. We promise to surprise …"*
  - NOTE: current copy leans heavily on **decals/stickers** ("our decals do not leave glue behind…"), not X-Board structures — off-strategy for an eco/cardboard redesign.
- **Images:** load; sourced from portfolio (35+ thumbnails on page).
- **Reuse:** copy **rewrite** (re-point from decals → X-Board structures); imagery **curate from portfolio + re-shoot hero**.

### 2.4 Activity Compounds
- **URL:** `https://www.picpong.biz/en/activity-compounds/`
- **What it is:** branded activity/display compounds in malls (e.g. "Activity complexes at Azrieli Malls").
- **Copy (verbatim):**
  - Headline: *"Activity and display compounds in malls."*
  - *"Thanks to our special X-Board panels, we are able [to] plan, design and install for you a complex that will be the most outstanding one in the mall!"*
  - *"Our panels are made from recycled materials, massive, easy to carry, and easy to disassemble and reassemble.."*
  - *"…using PICPONG's KEDEM products."* (note "KEDEM" = the Hebrew product sub-brand; verify naming.)
- **Images:** load; sourced from portfolio.
- **Reuse:** copy **reuse/rewrite** (eco language already strong here); imagery **curate from portfolio**.

### 2.5 In-scope catalog sub-products (X-Board systems) — under `/en/picpong-products-for-businesses/`
Reusable as a product taxonomy for the redesign:
- **Modular X-Board stands** `/modular-xboard-stands/`
- **Modular walls made of X-Board** `/modular-walls-made-of-x-board/`
- **Branded furniture** `/branded-furniture/`
- **Designed gates** `/designed-gates/`
- **Display installations** `/display-installations/`
- **Counters** `/counters/`
Each has an icon PNG (2018/06–08, low-res — see §7). **Reuse the taxonomy; re-shoot the icons/photos.**

### Out of scope (noted, not catalogued): Point of Sale, Interior & Space Design, Signs, Decals, Wallpapers, Flags, Shelf-extenders, FSU cutout, Mobiles, Pictures.

---

## 3. Projects (portfolio archive)

- **Index URLs:** `https://www.picpong.biz/en/projects/` and the archive `https://www.picpong.biz/en/portfolio/`
- **Intro copy (verbatim):** *"In short, we print on everything... We stand behind that statement - Here's a collection of projects showcasing the variety of materials with which we work."* (also rendered *"PIC PONG – In short, we print on everything …"*)
- **FLAG — the 60+ archive is real and live: 74+ individual case-study pages exist** as a `portfolio` custom post type (`portfolio-sitemap.xml`). Each is its own URL with a hero image (and typically a multi-image gallery). Hebrew-titled slugs are URL-encoded.
- **Image load status (measured):** project hero images load and were dimension-checked: `king-solomon-9.jpg` 1024×576 (87 KB), `hackathon-2019-16.jpeg` 1600×777 (128 KB), `google-cloud-4.jpg` 1200×801 (89 KB), `Landa-Digital-Printing-2.jpg` 1024×768 (58 KB), Intel `…14.jpeg` 1600×1200 (273 KB). So heroes are **web-resolution (≈1024–1600px), acceptable for web but not retina/print**; 2018–2019 entries are phone/WhatsApp exports, 2021–2022 entries are cleaner.
- **Per-project page content:** individual portfolio pages expose the hero + a short caption via server HTML; full galleries appear to be a JS lightbox, so **exact per-project image counts are not reliably extractable without a real browser**. Confirmed captions are short, e.g. King Solomon Expo: *"…we were there to set up colorful and professional booths for the show (exactly! From X-board, our recycled and exclusive material)"*; Hackathon 2019: *"Stickers and X-board"*; Intel: *"The event was held in Shefayim"*; Landa: *"Wallpapers, stickers, illuminated letters … | Design: Nushka Design workshop."*

**In-scope, brand-name case studies (highest reuse value — conference/event/exhibition with recognizable clients):**

| # | Project | URL (`…/en/portfolio/`) | Client | Hero image | Loads? |
|---|---|---|---|---|---|
| 1 | Hackathon 2019, Microsoft | `hackathon-2019-microsoft/` | Microsoft | `…/2019/09/hackathon-2019-16.jpeg` | loads (low-res) |
| 2 | Intel Family Event | `intel-family-event/` | Intel | `…/2019/08/אינטל-אירוע-משפחות-בשפיים-14.jpeg` | loads (low-res) |
| 3 | Google cloud spring party | `…google-cloud/` (HE slug) | Google Cloud | `…/2019/07/google-cloud-4.jpg` | loads |
| 4 | Microsoft new office | `…מיקרוסופט/` (HE slug) | Microsoft | `…/2022/02/microsoft-new-office-3.jpg` | loads |
| 5 | Space Action – Microsoft | `…חלל-מיקרוסופט/` (HE slug) | Microsoft | `…/2021/12/האקתון-חלל-2.jpg` | loads |
| 6 | Microsoft – Winter Event | `microsoft-winter-event/` | Microsoft | (portfolio) | loads |
| 7 | Microsoft-queen-event | `microsoft-queen-event/` | Microsoft | `…/2019/02/microsoft-Queen-event-9.jpeg` | loads (low-res) |
| 8 | Microsoft | `microsoft/` | Microsoft | (portfolio) | loads |
| 9 | IBM conference | `ibm-conference/` | IBM | (portfolio) | loads |
| 10 | Landa Digital Printing | `landa-digital-printing/` | Landa | `…/2021/12/Landa-Digital-Printing-2.jpg` | loads |
| 11 | Synamedia Event | `…synamedia/` (HE slug) | Synamedia | `…/2021/12/Synamedia-event-5.jpg` | loads |
| 12 | Deep Instinct office inauguration | `…deep-instinct/` (HE slug) | Deep Instinct | `…/2021/12/Deep-Instinct-2.jpg` | loads |
| 13 | BlueVine branding event | `bluevine-…/` (HE slug) | BlueVine | `…/2022/02/BlueVine-3-1.jpg` | loads |
| 14 | Redefine Meat Rebranding | `redefine-meat-…/` (HE slug) | Redefine Meat | `…/2022/02/Redefine-Meat-2.jpg` | loads |
| 15 | SciPlay "Desert Queen Event" | `…sciplay…/` (HE slug) | SciPlay | `…/2021/12/SciPlay-מלכת-המדבר-6.jpg` | loads |
| 16 | Amdocs stand in Milan | `amdocs-stand-in-milan/` | Amdocs | `…/2019/04/דוכן-לאמדוקס-במילאנו-10.jpg` | loads |
| 17 | NeuroDerm | `neuroderm/` | NeuroDerm | `…/2019/03/NeuroDerm-12.jpg` | loads |
| 18 | Carmel Winery | `carmel-winery/` | Carmel | `…/2019/08/כרמל-מזרחי-3.jpeg` | loads (low-res) |
| 19 | Priority VIP room – Maccabi TLV | `…מ/` (HE slug) | Maccabi Tel Aviv | `…/2022/02/Priority-3.jpg` | loads |
| 20 | King Solomon Expo | `king-solomon-expo/` | King Solomon | `…/2022/02/king-solomon-9.jpg` | loads |
| 21 | Pavilion – Orbit satellite expo | `…אורבית/` (HE slug) | Orbit | `…/2021/11/ביתן-אורביט…-6.jpg` | loads |
| 22 | Meet&Mind | `meetmind/` | Meet&Mind | `…/2021/12/MeetMind-1.jpg` | loads |
| 23 | Leonardo Cosmetics Offices | `…לאונרדו…/` (HE slug) | Leonardo | `…/2021/09/לאונרדו-קוסמטיקה-5.jpeg` | loads (low-res) |
| 24 | Toyga | `toyga/` | Toyga | `…/2019/03/טויגה-6.jpg` | loads |
| 25 | TAT | `tat/` | TAT | `…/2019/04/TAT-2.jpeg` | loads (low-res) |
| 26 | Activity complexes at Azrieli Malls | `activity-complexes-at-azrieli-malls/` | Azrieli | (portfolio) | loads |
| 27 | Amit Network Renewal Conference | `…אמית/` (HE slug) | Amit Network | `…/2021/12/אמית-כנס-התחדשות-13.jpg` | loads |
| 28 | Electra salon | `electra-salon/` | Electra | (portfolio) | loads |

**Other notable case studies (public-sector / education / health / events — mixed scope):** Home Front Command TV studio; Memorial Wall – Air Force; Israeli Air Force event in Hatzerim; Family day – Air Force; "Our IDF" Exhibition; MRI rooms at Sheba Tel Hashomer; CLALIT Health Services (several); Maccabi Health Services; Weizmann Institute (Hanukkah); Moriah Jerusalem Dev. Co.; Shafir Regional Council; Ministry of Education event; 2018 Annual Conference (religious schools); 100 years for the rabbinate; Learning spaces in schools; Ogen Real Estate; Shikun & Binui; Arava Agricultural Center; Gilat summer camp; A decade for Assuta; Hass waffle stand; Moden case stands; plus event/celebration one-offs (Halloween, Pillow Fight, Super Heroes, Bar/Bat Mitzvah, Purim DSP, Instagram event, AHAVA, Daiso, Hasidism Fair, NeuroDerm, Noam House, King Solomon School, Skylook, Wish Tree, Schwartz Cosmetics stand, Metro Mall).

> Total portfolio CPT entries discovered: **74+** (confirmed via `portfolio-sitemap.xml` + index render). This is the "60+ archive" referenced in the brief — it is **live and reusable as a content source**, though most pre-2020 imagery is low-res.

---

## 4. Reusable copy blocks (verbatim)

**Brand taglines / promises (homepage `/en/picpong/`):**
- *"In short, we can print on everything!"* / *"IN SHORT, WE CAN PRINT ON EVERYTHING!"*
- *"Basically… We print on everything!"* / *"Picpong.biz – Basically… We print on everything!"*
- *"We stand behind that statement"* (used to introduce the portfolio)
- Section headers: *"BEAUTIFULLY CRAFTED"*, *"FOLLOW YOUR PASSION"*, *"MAKE THINGS HAPPEN"*
- Positioning line: *"A WIDE RANGE OF ADVERTISING, BRANDING, MARKETING AND DESIGN PRODUCTS"*

**Brand-voice / mission (verbatim):**
- *"PICPONG brings your dreams and fantasies into action"*
- *"Idea, dream or fantasy are performed with great professionalism and high precision"*
- *"we create products using the aforementioned raw material- from planning and design to printing and installation"*

> Note: the brief mentions *"your wish is our command."* That exact phrase was **not found verbatim** on the current English site; the equivalent current line is *"PICPONG brings your dreams and fantasies into action."* Treat "your wish is our command" as a candidate new tagline, not an existing reusable asset.

**Company / capability story (from `/en/picpong/` + `/en/about-us/`):**
- *"PICPONG is the exclusive importer of X-Board raw material – recycled cardboard panels which meet strict quality standards."*
- *"PICPONG has the most advanced dedicated printing systems in the world, allowing them to create an infinite variety of products where all stages of production are done in-house."* (in-house, end-to-end production claim — reusable.)
- *"an insatiable passion to innovate and surprise"* · *"the world's most advanced equipment and machinery [in Israel]"* · *"Everything begins and ends with our team members—people with big hearts and great minds"* (designers, engineers, operators "leaders in their field").

**Founder / origin story (EXISTS — verbatim, `/en/about-us/`) — strong reusable asset:**
- *"Our story begins with a redhead and a man with a ponytail..."*
- **Kuki and David established PICPONG in 2004.** Shortly after, **Yoram Ravimi** joined as a partner and became integral to the company's success. The three founders each bring distinct expertise generating *"PICPONG's wide variety of unique branding, marketing and design products."*
- Collaboration ethos: sometimes executing prepared concepts, other times building from scratch *"while actively listening to the client's requests."*
- **Reuse:** this is a genuine, charming founder narrative (2004, three named founders) — **reuse/lightly rewrite**, do NOT treat as a gap.

**Named clients (verbatim from About "clients" list):** Wix · Instagram · Maccabi (Health Care Services) · Babyland · Microsoft · Facebook · Electra · Brink's · Ministry of Defense · Israeli Air Force · Landa · Micro Focus. (Plus portfolio-evidenced: Intel, Google Cloud, IBM, Amdocs, Synamedia, Deep Instinct, BlueVine, Redefine Meat, SciPlay, NeuroDerm, Maccabi Tel Aviv, Azrieli, Carmel, Leonardo, Orbit.)

**Contact block (reuse verbatim):** 40 Ha Hagana Street, Rishon LeZion · Tel 1-700-501-508 · Fax 03-6205006 · info@picpong.biz.

---

## 5. Client logos

A client-logo wall exists (referenced from homepage and `page-sitemap.xml`). Files found:

All client-logo files resolve but are **tiny 120×90 px PNGs (1.5–4 KB)** — thumbnail/strip-grade, **not reusable at quality**. The homepage logo wall itself renders as **base64 placeholder GIFs** (lazy-loaded slider; the real PNGs sit behind it).

| Brand | Asset URL | Loads? | Measured |
|---|---|---|---|
| Microsoft | `…/2018/12/Microsoft_logo.png` | loads | 120×90, 1.5 KB |
| Clalit (health) | `…/2018/03/Clalit-800-1.png` | loads | 120×90, 2.8 KB |
| Brink's | `…/2018/03/Brinks_Logo_White-1.png` | loads | 120×90, 2.2 KB (white — needs dark bg) |
| Electra | `…/2018/03/electra_biglogo-1.png` | loads | 120×90, 2.1 KB |
| HOT | `…/2018/03/logo-hot-1.png` | loads | 120×90, 4.1 KB |
| Mifold | `…/2018/03/Mifold-1.png` | loads | 120×90, 2.5 KB |
| (unidentified) | `…/2018/03/download-1.png` | loads | 3.5 KB (generic filename) |
| (unidentified) | `…/2018/03/siteNewLogo-1.png` | loads | 3.2 KB (generic filename) |

Additional big-name clients are **evidenced by the portfolio** even if a dedicated logo file wasn't on the wall: **Intel, Google Cloud, IBM, Amdocs, Landa, Synamedia, Deep Instinct, BlueVine, Redefine Meat, SciPlay, NeuroDerm, Maccabi Tel Aviv, Azrieli, Carmel, Leonardo, Toyga, Orbit, Meet&Mind**.

> One WebFetch pass reported the logo row as placeholder GIFs. The individual PNG files do resolve, so the likely cause is a lazy-load/slider that doesn't paint without JS. **Action: re-verify the logo wall in a real browser; regardless, re-source clean vector (SVG) logos with permission** rather than reusing tiny 2018 PNGs. Resolution: these are small web PNGs (logo-strip sized), **not** print/retina grade.

---

## 6. Eco / X-Board material story (LEAD with this)

All verbatim, recovered from `/en/x-board/` and search-cached page copy. This is the strongest reusable asset for an eco-led redesign:

- *"X-BOARD … a very dense, environmentally friendly panel – made of **100% recycled cardboard**."*
- *"a pressing capacity of **60 tons**"* (load/strength claim)
- *"contains **flame retardants**"* (safety)
- *"**will not disintegrate even after coming in contact with water**"* / **water resistant** ("crash-proof")
- *"You can **print directly onto** the X-BOARD cardboard panels."*
- *"X-BOARD panels are **lightweight** and a facility built from X-BOARD can be **disassembled and reused**."*
- *"X-BOARD facilities can be **recycled** and can be used to build almost anything."* — *"environmentally friendly building"* that can be *"disassembled… easily, and reassembled for your next event."*
- Provenance/credibility: *"PICPONG is the **exclusive importer** of X-Board raw material … which meet strict quality standards."*
- Showcase hook: *"Would you believe that all of the elements shown here are made of X-BOARD?"*

**Claims worth foregrounding in the new site:** 100% recycled · recyclable · reusable/demountable (circular) · lightweight + 60-ton press strength (durable despite being cardboard) · flame-retardant · water-resistant · print-direct. These map almost 1:1 to cartonlab's material pitch and are the spine of the eco story.

---

## 7. Asset reuse table

Flags: `reuse` | `re-shoot` | `rewrite` | `discard`.

| Asset | URL / location | Loads? | Flag | One-line reason |
|---|---|---|---|---|
| X-Board spec claims (60t, 100% recycled, flame-retardant, water-resistant, reusable) | `/en/x-board/` + search cache | loads | **reuse** | Concrete, credible, eco-led — keep verbatim; spine of new site. |
| Tagline "We print on everything" | `/en/picpong/` | loads | **rewrite** | Strong but print-shop-generic; recast to lead with eco/events. |
| "PICPONG brings your dreams and fantasies into action" | `/en/picpong/` | loads | **rewrite** | Good intent; tighten for B2B event buyers. |
| "Exclusive importer of X-Board" + "all production in-house" | `/en/picpong/`, `/en/about-us/` | loads | **reuse** | Differentiators worth keeping verbatim. |
| Contact block (addr/phone/fax/email) | `/en/contact-us/` | loads | **reuse** | Real, current details. |
| Social links (FB/IG/LI/YT) | footer | loads | **reuse** | Valid handles. |
| Portfolio archive (74+ case studies, CPT) | `/en/portfolio/` | loads | **reuse (as source) + curate** | Real proof; cherry-pick best in-scope, fix HE slugs. |
| Brand-name project heroes 2021–2022 (Landa, Synamedia, Deep Instinct, BlueVine, Redefine Meat, SciPlay, Priority/Maccabi, King Solomon, Microsoft new office) | `…/2021/…`–`…/2022/…` | loads | **reuse (curate)** | Newer = acceptable quality; usable now. |
| Brand-name project heroes 2018–2019 (Intel, Hackathon MS, Google Cloud, Carmel, Leonardo, TAT, Amdocs, NeuroDerm) | `…/2018/…`–`…/2019/…` | loads (low-res) | **re-shoot** | Phone/WhatsApp-grade JPEGs; not hero/retina quality. |
| Product-icon PNGs (ex-stant, stands, counters, wall, gate…) | `…/2018/06–08/…` | loads (low-res) | **re-shoot / redraw** | Tiny dated icons; redo as clean illustrations or photos. |
| Client-logo wall PNGs (MS, Clalit, Brink's, Electra, HOT, Mifold) | `…/2018/03/…` | loads (low-res) / placeholder | **re-shoot (re-source SVG)** | Small 2018 PNGs + lazy-load issue; get permissioned vectors. |
| PP logo / brand mark | `…/2018/12/PP_Logo.png`, `…/2018/03/logo-n.png` | loads (low-res) | **re-shoot/redo** | Low-res; redesign brand mark anyway. |
| Product taxonomy (modular X-Board stands/walls, branded furniture, gates, display installations, counters) | `/en/picpong-products-for-businesses/…` | loads | **reuse (structure)** | Good IA skeleton for the X-Board catalog. |
| Hebrew-encoded portfolio slugs | many `…/en/portfolio/%D7…/` | loads | **rewrite (slugs)** | Normalize to clean English slugs for SEO/UX. |
| Founder / origin story ("redhead and a man with a ponytail", Kuki + David 2004, Yoram Ravimi) | `/en/about-us/` | loads | **reuse / lightly rewrite** | Genuine, charming, dated to 2004 — keep it, don't reinvent. |
| Named client list (Wix, Microsoft, Facebook, Landa, Electra, Brink's, MoD, IAF, Micro Focus…) | `/en/about-us/` | loads | **reuse** | Real social proof; verify permissions, re-source logos. |
| "Cardboard — what's so good about cardboard?" hook | `/en/exhibition-design/` | loads | **reuse** | Memorable eco/cardboard hook worth keeping. |
| "Your wish is our command" tagline | (not on site) | n/a | **rewrite (new)** | Brief's phrase isn't present; closest is "PICPONG brings your dreams and fantasies into action." |
| WooCommerce shop/cart/checkout | `/shop/`, `/cart/`, … | loads | **discard (for this scope)** | Not relevant to event/exhibition redesign. |
| Out-of-scope pages (POS, interior, signs, decals, wallpapers, flags) | `/en/point-of-sale/`, etc. | loads | **discard (de-emphasize)** | Keep minimal or drop; off-strategy for eco/events. |

---

## 8. Gaps vs cartonlab.com

What cartonlab has that Picpong lacks today (redesign must close these):

1. **Consistent, high-quality product photography.** Cartonlab uses clean, well-lit studio + in-situ shots. Picpong's library loads but is uneven — strong-ish 2021–22 shots, weak 2018–19 phone snaps, Hebrew-named files. → **Curate the best, re-shoot hero + the X-Board catalog.**
2. **Specs presented as specs.** Picpong HAS great spec claims (60t, 100% recycled, flame-retardant, water-resistant) but they're buried in prose. Cartonlab surfaces material specs cleanly. → **Promote Picpong's existing claims into a structured spec/feature section.**
3. **Eco-first narrative & visual language.** Picpong leads with "we print on everything"; eco is secondary. Cartonlab leads with material/sustainability. → **Re-sequence: lead with the (already-strong) X-Board eco story.**
4. **Clean product taxonomy in English.** Picpong's catalog is real but mixes EN/HE slugs and buries X-Board products among POS/signage. → **Rebuild a focused English X-Board/event IA; drop off-scope lines from the hero nav.**
5. **Pricing / structured quote pathway.** None found on Picpong (WooCommerce exists but isn't a project-quote flow). Cartonlab drives project inquiries. → **Add a project/quote inquiry flow.**
6. **Polished, browsable case studies.** Picpong's 74+ archive is a content goldmine but presentation is dated and gallery quality varies. → **Reuse the content, rebuild the case-study template, curate to the strongest in-scope brand-name projects (Microsoft/Intel/Google/IBM/Amdocs/Landa…).**
7. **Founder / company human story.** NOT a gap — Picpong's About has a strong origin story (redhead + ponytail, Kuki & David 2004, Yoram Ravimi). The gap vs cartonlab is *presentation*, not content. → **Reuse and design it well.**
8. **Retina/vector brand + client assets.** Picpong's logos and client marks are tiny 120×90 / sub-300px 2018 PNGs. → **Re-source SVGs (with permission) and a new brand mark.**

---

## Appendix — evidence trail (verified facts)

- Homepage HTML 200, ~129 KB; nav links resolve to `/en/picpong/`, `/en/x-board/`, `/en/exhibition-design/`, `/en/conferences-and-events/`, `/en/point-of-sale/`, `/en/activity-compounds/`, `/en/interior-and-space-design/`, `/en/picpong-products-for-businesses/`, `/en/about-us/`, `/en/contact-us/`, `/en/projects/`.
- `sitemap_index.xml` lists 7 child sitemaps incl. `portfolio-sitemap.xml` and `page-sitemap.xml`; WordPress + Yoast + WPML + WooCommerce confirmed.
- REST API live: `/wp-json/wp/v2/pages` (17 KB JSON), `/wp-json/wp/v2/posts` (15 KB JSON) returned real JSON.
- Projects index render listed 74+ portfolio URLs with real `wp-content/uploads` hero images and intro copy "we print on everything… we stand behind that statement."
- X-Board specs recovered verbatim via WebSearch of picpong.biz X-Board page (60-ton press, 100% recycled, flame-retardant, water-resistant, printable, demountable/recyclable).
- Client-logo PNGs (Microsoft, Clalit, Brink's, Electra, HOT, Mifold) referenced from homepage and present in `page-sitemap.xml` under `…/2018/03/` and `…/2018/12/`.
- Wayback CDX: site archived since 2018; English tree (`/en/...`) and 70+ `/en/portfolio/...` URLs captured 200 historically — confirms longevity and that the archive predates the redesign.
- Contact: 40 Ha Hagana St, Rishon LeZion · 1-700-501-508 · fax 03-6205006 · info@picpong.biz.
```
