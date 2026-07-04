# Missing-UI and Backoffice Inventory

This covers the client-facing screen/state gaps and the greenfield backoffice (three roles: Admin, Content Manager, Sales Manager) for mockup-v5, an identical fork of the audited mockup-v4. Date: 2026-07-04.

## Executive summary

Skim layer. Each line is exactly one missing screen/state, tagged `(priority . role)`. Client-facing MVP first, then backoffice MVP by role (Sales, Content, Admin), then everything deferred.

Client-facing (MVP):
- [ ] (MVP . legal) Accessibility statement page (הצהרת נגישות) - legally required in Israel
- [ ] (MVP . legal) Privacy policy page
- [ ] (MVP . client) 404 / not-found page (dead deep-links)
- [ ] (DEFERRED . client) Form send-failure state (retry / WhatsApp fallback) - real-build / post-mockup: it needs a live backend that can actually fail, so there is nothing to build in the UI-only mockup phase

Backoffice - Sales Manager (MVP):
- [ ] (MVP . Sales) Leads inbox / list (with selected-item thumbnails + deep links)
- [ ] (MVP . Sales) Lead detail
- [ ] (MVP . Sales) Status / pipeline (new/contacted/quoted/won/lost)
- [ ] (MVP . Sales) Assignment to field reps
- [ ] (MVP . Sales) New-lead notifications
- [ ] (MVP . Sales) Filters / search over leads (basic)
- [ ] (MVP . Sales) Notes per lead

Backoffice - Content Manager (MVP):
- [ ] (MVP . Content) Studio Journal post editor (1 photo + ~4 lines, HE/EN)
- [ ] (MVP . Content) Journal feed manager
- [ ] (MVP . Content) Draft to Preview to Publish flow
- [ ] (MVP . Content) Featured Works curation / ordering
- [ ] (MVP . Content) Projects / case-study editor (main image + attachable supporting media)
- [ ] (MVP . Content) Catalog & product management (real photos, specs, eco badges)
- [ ] (MVP . Content) Media library / asset uploads (image + video, poster stills)
- [ ] (MVP . Content) HE/EN parity enforcement per field
- [ ] (MVP . Content) Video upload / poster tooling

Backoffice - Admin (MVP):
- [ ] (MVP . Admin) User management
- [ ] (MVP . Admin) Role management (Admin/Content/Sales)
- [ ] (MVP . Admin) Global settings: comms (WhatsApp Business number, routing email)
- [ ] (MVP . Admin) Site settings: social URLs + default/geo language

Backoffice - Shared (MVP):
- [ ] (MVP . Shared) Login (email+password / SSO)
- [ ] (MVP . Shared) Password reset / forgot
- [ ] (MVP . Shared) Session / logout
- [ ] (MVP . Shared) Role-based access gate
- [ ] (MVP . Shared) Role-appropriate dashboard / home (Sales first)

Later / deferred:
- [ ] (later . legal) Terms / legal notice page
- [ ] (later . legal) Cookie / consent notice (conditional on analytics)
- [ ] (later . client) Dedicated About / company page
- [ ] (later . client) Generic error / 500 page
- [ ] (later . client) Offline / no-connection handling
- [ ] (later . client) Standalone thank-you / confirmation screen
- [ ] (later . client) Loading / skeleton states for catalog & projects grids
- [ ] (later . client) Empty states for catalog & featured works
- [ ] (later . client) Deep-link to deleted/unpublished item handling
- [ ] (later . client) Newsletter signup states
- [ ] (later . client) Language/geo mismatch prompt
- [ ] (later . Sales) Unified comms thread (email + WhatsApp in one timeline)
- [ ] (later . Sales) Export (CSV)
- [ ] (later . Sales) AI lead-research brief panel (FR-40, optional)
- [ ] (later . Content) Per-field editable-vs-fixed control
- [ ] (later . Content) Per-item SEO/OG editor
- [ ] (later . Content) Home layout / section toggles
- [ ] (later . Content) Facebook photo import / curation
- [ ] (later . Admin) Lead-routing / assignment rules
- [ ] (later . Admin) Audit / activity log
- [ ] (later . Admin) Admin dashboard / analytics
- [ ] (later . Admin) Rep-email template config
- [ ] (later . Admin) Backup / data-retention settings
- [ ] (later . Shared) Account / profile / change password
- [ ] (later . Shared) Global notification center

## Details

### Baseline: what already exists (so "missing" is accurate)

Client-facing, already built in mockup-v4: lead drawer with success panel (`data-lead-success`), inline validation errors (`data-qf-error`), submitting state, `#toast`, projects search + empty state, journal feed empty state + loading skeleton (`latest.html` only), lightbox, HE/EN + RTL switch, deep-link `#item-` highlight, share affordances, and a front-end "sales-rep email preview" demo behind a Dev menu.

Backoffice: nothing exists. Zero auth, zero admin, zero CMS, zero leads DB. All of PART B is greenfield. The rep-email "preview" is a static pitch prop, not a real inbox.

### PART A - Client-facing gaps

| # | Screen / state | What it is | Why needed | Priority |
|---|---|---|---|---|
| A-1 | Accessibility statement page (הצהרת נגישות) | Standalone page describing conformance, contact for a11y issues, coordinator details | Legally required in Israel (IS 5568 / Equal Rights for Persons with Disabilities regs) for any commercial site. Non-optional. | MVP |
| A-2 | Privacy policy page | How lead data (name/phone/email/message) is stored, used, retained | Site's whole job is collecting PII via the form; Israeli Privacy Protection Law + basic trust. | MVP |
| A-3 | Terms / legal notice page | Company legal identity, usage terms | Standard; also the Czech-partner "polished/legitimate" use case (NFR-6). | Later (MVP-lite: 1 combined legal page ok) |
| A-4 | Cookie / consent notice | Banner + preferences, only if analytics/pixels/WhatsApp tracking added | Conditional - not needed if the launched site sets no non-essential cookies. Decide once analytics is chosen. | Conditional / Later |
| A-5 | Dedicated About / company page | Real page, not just the home `#about` anchor (DM-6 kept it a section) | Producers + Czech partner want a "who are you, capability, factory" story; a home anchor is thin for that audience. | Later (MVP: home section acceptable) |
| A-6 | 404 / not-found page | Branded page for bad URLs incl. dead deep-links | Reps forward deep links (FR-15); a slug rename or typo currently dies ungracefully. Needs "not found to search / talk to us." | MVP |
| A-7 | Generic error / 500 page | Server-error fallback | Real build has a backend (email send, resolver `/m/<id>`); needs a non-blank failure page. | Later |
| A-8 | Form send-failure state | Inline "couldn't send - retry / use WhatsApp" in the drawer | PRD 2 section 10 explicitly ships no network-error path ("nothing sends"). Real form can fail; the one conversion event must not dead-end silently. | Deferred (real build, post-mockup) - no failure path exists to handle while the form is UI-only |
| A-9 | Offline / no-connection handling | Detect failed submit, preserve typed input + selection, offer retry | Mobile users (FR-39) on flaky connections; losing a typed lead = losing the only KPI. | Later |
| A-10 | Standalone thank-you / confirmation | A confirmable post-submit screen (currently only an in-drawer panel that auto-closes) | Fine as-is for mockup; real build may want a persistent confirmation (esp. for WhatsApp hand-off round-trip + analytics conversion pixel). | Later |
| A-11 | Loading / skeleton states for CMS-fed grids | Skeletons exist only on `latest.html`; catalog grid, projects collage, home Latest strip, featured works have none | Once these are CMS-fed (async), they need the same loading treatment PRD 3 section 9 mandates. | Later (MVP: journal only) |
| A-12 | Empty states for catalog & featured works | "No items in this category yet" / empty featured section | Search empty (projects) + feed empty exist; catalog facets, an empty category, and an unpopulated Featured Works don't. | Later |
| A-13 | Deep-link to a deleted/unpublished item | Graceful landing when `#item-<id>` / `/m/<id>` resolves to removed content | PRD 3 section 4.5 handles unknown id to no highlight, but not "this project was unpublished" - a rep's old link should still explain itself, not silently load a random page. | Later |
| A-14 | Newsletter signup states | Home footer newsletter has no success/error/duplicate states | Low stakes but currently just toasts; real build needs confirm + error. | Later |
| A-15 | Language/geo mismatch prompt | "You're viewing HE - switch to EN?" | FR-5 geo-detect is a build note; a mismatch nudge is polish for the international audience. | Later |

### PART B - Backoffice / admin (three roles)

Nothing below exists. Each row maps to the requirement that justifies it.

#### B.0 Shared / cross-role

| Screen | Purpose | Req / evidence | Priority |
|---|---|---|---|
| Login | Email+password (or SSO) sign-in | Any of FR-23/24 implies authenticated staff | MVP |
| Password reset / forgot | Email reset flow | Basic auth hygiene | MVP |
| Session / logout + "stay signed in" | Session handling | Basic | MVP |
| Role-based access gate | Route/screen guard by role (Admin/Content/Sales) | Client defined 3 distinct roles | MVP |
| Role-appropriate dashboard / home | Landing per role (Sales to today's leads; Content to publish; Admin to system) | Meeting2 section 4 (dedicated lead responder needs an at-a-glance surface) | MVP (Sales) / Later (rich dashboards) |
| Account / profile / change password | Self-service profile | Standard | Later |
| Global notification center | In-app alerts (new lead, etc.) | FR-23; Meeting2 section 4 "respond immediately" | Later (MVP: email/WhatsApp push only) |

#### B.1 Sales Manager - leads & the "single place for all communication" (FR-23)

This is the operational heart - Meeting2 section 4 says a full-time person's only job is working these leads. Highest-value backoffice.

| Screen | Purpose | Req / evidence | Priority |
|---|---|---|---|
| Leads inbox / list | All incoming leads, newest first; each row = contact + selected-item thumbnails + channel (email/WhatsApp) + status | FR-23, FR-31 (consolidated payload is "the primary work-surface of a real human role") | MVP |
| Lead detail | Full lead: contact block, message, every selected item with thumbnail + deep link (click to highlighted item), source page, timestamp, language | FR-18/31, FR-15, Meeting2 section 4 | MVP |
| Status / pipeline | new to contacted to quoted to won to lost | Implied by a staffed lead-response operation | MVP |
| Assignment to field reps | Assign/hand-off a lead to a specific sales rep | Meeting2 section 4 "hand them off to field sales reps" | MVP |
| Unified comms thread | Email and WhatsApp history for a lead in one timeline; reply from here | FR-23 ("single place to manage all communication"), FR-22/30 | Later (hard to build; MVP can link out to Gmail/WhatsApp) |
| Filters / search over leads | By status, rep, channel, date, item, keyword | Volume grows (hundreds of items to many leads) | MVP (basic) / Later (advanced) |
| Notes / activity log per lead | Internal notes, call outcomes | Standard CRM need for the responder role | MVP (notes) |
| New-lead notifications | Real-time ping to the responder (email/WhatsApp/in-app) | Meeting2 section 4 "respond immediately" | MVP |
| Export (CSV) | Pull leads out / into other tools | Standard | Later |
| AI lead-research brief panel | Auto company/person brief on the lead | FR-40 (explicitly Phase-2+, optional) | Later (optional) |

#### B.2 Content Manager - the daily CMS (FR-24/25/26, 32-37, L-5)

Non-technical editor (Marina) publishes daily. Bilingual, no auto-translation, draft to preview to publish.

| Screen | Purpose | Req / evidence | Priority |
|---|---|---|---|
| Studio Journal post editor | Create a daily post: 1 photo + ~4 lines, HE + EN fields, alt text; draft to preview to publish | FR-24, FR-33, L-5 (staging), NFR-5 (minutes, non-technical) | MVP |
| Journal feed manager | List/reorder/unpublish/schedule journal posts | FR-33 (auto-updating feed) | MVP |
| Draft to Preview to Publish flow | Private preview of a page before public | L-5 ("preview lets Picpong see the page before the public") | MVP |
| Featured Works curation | Hand-pick + order showcase works, distinct from the auto feed | FR-34 (separate curated section) | MVP |
| Projects / case-study editor | Create/edit a project: H1, H2, one main image + several supporting media, each independently attachable to a quote, tag, client, slug | FR-36, FR-12/14, L-3 (slug rules) | MVP |
| Catalog & product management | Add/edit catalog items: gallery (real Picpong photos, FR-37), spec fields, eco badges (Recycle/Resistance), option chips | FR-37, FR-10 | MVP (catalog is a primary front door) |
| Media library / asset uploads | Upload/manage images and video (quarterly pro video), set poster stills (`data-media-thumb`), reuse across pages | FR-26, FR-37, PRD 2 section 8 (video poster contract) | MVP |
| Video upload / poster tooling | Upload video, muted/autoplay flags, poster frame | FR-26, FR-7/8 | MVP (upload) / Later (transcode) |
| Per-field editable-vs-fixed control | Editor decides which regions are editable vs template-locked | FR-25 ("what you want to control, we'll decide") | Later (MVP: fixed content model) |
| HE/EN parity enforcement per field | Warn/block publish when one language is empty; side-by-side bilingual editing | L-5 (paired fields, no auto-translation) | MVP (parity is core to the bilingual promise) |
| Per-item SEO/OG editor | Per-page `<title>`, meta description, og:image/title/desc, per language | FR-27/28, D-8 (dynamic OG is a hard build requirement) | MVP (fields) / Later (auto-gen) |
| Home layout / section toggles | Turn Featured Works / Journal strip on-off, arrange home sections | FR-34 ("both optional"), OQ-3 (journal vs teaser) | Later |
| Facebook photo import / curation | Pull from the FB pro-photo library the editor curates from | Q3, L-5 ("Facebook is one source she curates from") | Later (MVP: manual upload) |

#### B.3 Admin - users, config, system

| Screen | Purpose | Req / evidence | Priority |
|---|---|---|---|
| User management | Create/disable staff accounts | 3-role model defined by client | MVP |
| Role management | Assign Admin / Content / Sales; permissions | 3-role model | MVP |
| Global settings: comms | WhatsApp Business number (OQ-2), routing email(s), reply-window copy | FR-22, OQ-2, D-3 | MVP |
| Lead-routing / assignment rules | Default rep, round-robin, per-source routing | FR-22, Meeting2 section 4 (hand-off model) | Later (MVP: single inbox) |
| Site settings | Social URLs (FR-3/D-6), default language + geo-detect rules (FR-5), service taxonomy strings (FR-38) | FR-3, FR-5, FR-38 | MVP (social+lang) / Later |
| Audit / activity log | Who changed/published/deleted what | Governance for a multi-editor CMS + leads | Later |
| Admin dashboard / analytics | Leads-per-day, conversion, top items, publish cadence | NFR-1 (retention is the core KPI); baseline 2-3 leads/day to beat | Later |
| Rep-email template config | Edit the templated sales-rep email (L-6) | L-6 (real send/template = build note) | Later |
| Backup / data retention settings | Lead retention window (ties to privacy A-2) | Privacy law | Later |

### PART C - Scope recommendation (given the price pushback)

The client balked at a 100-200h build, so the true backoffice MVP is only the two surfaces that the business literally cannot run without, and everything else should be deferred or bought off-the-shelf. Build custom, and only these: (1) the daily Studio Journal post editor with HE/EN paired fields and draft to preview to publish (FR-24/25/L-5) - this is the one capability that forced "custom, not Wix" (NFR-2), because Marina must publish daily in minutes without a developer; and (2) a minimal leads inbox - list + detail with the selected-item thumbnails, live deep links, a status field, and rep-assignment (FR-23/31, Meeting2 section 4), since a full-time person's entire job is working these. Defer to Phase 2+: the true unified email+WhatsApp comms thread (FR-23's hardest piece), audit logs, analytics dashboards, routing-rule engines, FB import, and the AI research brief (FR-40, already flagged optional). Hand to off-the-shelf instead of building: auth/roles (Firebase Auth, Auth0, or Clerk - do not hand-roll login/reset/sessions); the "single place for all communication" can start as a shared inbox / WhatsApp Business app / lightweight CRM (HubSpot free, Trello) that the site just emails into, rather than a bespoke CRM; media storage via the CMS/Firebase Storage; and the required legal pages (accessibility A-1, privacy A-2) plus a 404 are cheap static pages that must ship in MVP regardless of budget because A-1/A-2 are legal obligations in Israel, not features.
