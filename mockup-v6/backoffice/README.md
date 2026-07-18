# Picpong Backoffice - mockup foundation

A static, no-build staff workspace mockup living under `mockup-v6/backoffice/`.
Two roles: **Admin / Operator** (Operator sees both leads and content). No real auth, no
backend, no security - all demo data lives in `localStorage` under the `bo:`
namespace and is seeded on first load by `js/bo.js`. It deploys as static files
and must work opened directly under `/backoffice/`.

This file is the contract for the agents building the role screens. Follow it so
every page shares one shell, one data layer, and one visual register.

> **Text rule for everything you write** (HTML copy, JS strings, comments): never
> use long dashes (em or en dash). Use a plain hyphen `-`.

---

## Page skeleton (copy this for every new screen)

Every backoffice page is English-only chrome: `lang="en" dir="ltr"`. Content
FIELDS inside editors (project title/lines, etc.) are **bilingual** - each record
carries `he` and `en` objects; render both in the editors.

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Leads - Picpong Backoffice</title>
  <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..700;1,300..600&family=Hanken+Grotesk:wght@400..700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../css/styles.css" />   <!-- site tokens FIRST -->
  <link rel="stylesheet" href="css/backoffice.css" />  <!-- tool register AFTER -->
</head>
<body>
  <script src="js/bo.js"></script>
  <script>
    // 1. gate by role (redirects to login/dashboard if not allowed)
    var session = BO.requireRole(["Admin", "Operator"]);
    if (session) {
      // 2. render the shell + get the <main> to fill
      var main = BO.mountShell({ active: "leads.html", title: "Leads" });
      // 3. build your page HTML into main.innerHTML
      main.innerHTML = "...";
    }
  </script>
</body>
</html>
```

`mountShell` injects the sidebar (role-aware) + topbar (bell with unread-lead
badge, user chip, logout) and returns the `<main id="bo-main">` element. It also
adds a skip link and mobile menu. **Nav lives only in bo.js** - do not hand-roll
sidebars. Pass `active` = the current file name so the nav highlights correctly.

The shell renders `<main>` as a landmark and includes the skip link; keep your
page content inside the returned `main`. Add a `.bo-pagehead` block at the top for
the H1 + description.

### File names the nav already links to

Build your screens at exactly these paths (the sidebar + deep links expect them):

| File | Role visibility | Purpose |
|---|---|---|
| `dashboard.html` | all | role home (built) |
| `leads.html` | Admin, Operator | leads table/list |
| `lead-detail.html?id=L-xxxx` | Admin, Operator | single lead + notes + status |
| `projects.html` | Admin, Operator | projects manager |
| `project-editor.html?id=...` | Admin, Operator | edit a project |
| `catalog-manager.html` | Admin, Operator | catalog/products manager |
| `users.html` | Admin | staff accounts |
| `settings.html` | Admin | WhatsApp / routing / social / language |

Deep links from the dashboard already point at `leads.html` and
`lead-detail.html?id=` - keep those query params.

`featured.html` (homepage-featured picker) and `media.html` (media library) are
removed. The homepage now auto-shows the latest 5 projects (no curation). Media
library becomes an in-editor asset-picker in Phase-2.

---

## `BO` JavaScript API (global, from `js/bo.js`)

### Session + roles
- `BO.getSession()` -> `{ name, role, email }` or `null`. `role` is `"Admin" | "Operator"`.
- `BO.setSession(obj)` - used by login only.
- `BO.requireRole([roles])` -> session, or redirects (to `login.html` if signed
  out, to `dashboard.html` if signed in but not permitted). Returns `null` on redirect - guard on it.
- `BO.logout()` - clears session, back to login (wired into the user chip already).
- `BO.mountShell({ active, title })` -> the `<main>` element to fill.

### Data (all read from / written to localStorage)
- `BO.getLeads()` -> `Lead[]` (newest first).
- `BO.getLead(id)` -> `Lead | null`.
- `BO.saveLead(lead)` - upserts by `id`, persists.
- `BO.getUsers()` -> `User[]`.
- `BO.saveUsers(users)` - replaces the whole array.
- `BO.getSettings()` -> `Settings`.
- `BO.saveSettings(settings)`.
- `BO.getReps()` -> `string[]` of rep names (for the "assigned" dropdown).
- `BO.getMedia()` -> the id -> `{title, thumb}` map of real marketing-site media items.
- `BO.unreadLeadCount()` -> count of `status === "new"`.
- `BO.resetDemo()` - re-seeds demo data (handy for a Settings "reset" button).

### Utilities
- `BO.fmtDate(iso)` -> `"8 Jun 2026"`.
- `BO.fmtDateTime(iso)` -> `"8 Jun, 14:20"`.
- `BO.timeAgo(iso)` -> `"3h ago"`.
- `BO.isToday(iso)` -> boolean.
- `BO.initials(name)` -> `"NB"`.
- `BO.pillClass(status)` -> e.g. `"bo-pill bo-pill--new"` (works for lead statuses).
- `BO.esc(str)` - HTML-escape before injecting into innerHTML. **Always escape user/demo strings.**
- `BO.toast(html)` - bottom toast; pass a short message, `<b>` allowed.
- `BO.ICON` - map of inline SVG strings: `dashboard, leads, projects, catalog, users, settings, bell, menu, whatsapp, email`.

---

## Data shapes

### Lead
```js
{
  id: "L-1042",                 // display id, also the ?id= param
  name: "Tomer Shani",
  company: "TechEvents IL",
  email: "tomer@techevents.co.il",
  phone: "+972 52-441-9082",
  channel: "whatsapp",          // "whatsapp" | "email"
  language: "he",               // "he" | "en" (the lead's language)
  message: "…",                 // free text, may be Hebrew
  items: [                      // 1-4 selected media items (REAL site items)
    { id: "feed-microsoft-teardown", title: "Microsoft · Teardown day", thumb: "../assets/projects/microsoft.jpg" }
  ],
  status: "new",                // "new" | "contacted" | "quoted" | "won" | "lost"
  assigned: null,               // rep name string, or null
  createdAt: "2026-07-05T08:20:00.000Z",  // ISO
  notes: [ { at: "<iso>", by: "Noa Bar-Levi", text: "Called - …" } ]
}
```

### User
```js
{ id: "U-1", name: "Noa Bar-Levi", email: "noa@picpong.biz", role: "Operator", active: true }
// role: "Admin" | "Operator"
```

### Settings
```js
{
  whatsappNumber: "14155238886",       // Twilio sandbox
  routingEmail: "leads@picpong.biz",
  social: { instagram, facebook, linkedin },  // URLs
  defaultLanguage: "he"                // "he" | "en"
}
```

---

## CSS building blocks (`css/backoffice.css`)

All classes are `bo-` prefixed and sit on top of the site tokens. Use these
instead of inventing new ones so screens stay consistent.

- **Layout / page**: `.bo-pagehead` (`h1` + `p`), `.bo-card` (`.bo-card__head` with
  `h2`/`h3` + optional `.bo-card__more` link), `.bo-grid` + `.bo-grid--2/3/4`.
- **Stat tiles**: `.bo-stat` (`.bo-stat__label`, `.bo-stat__num`, `.bo-stat__foot`),
  `.bo-stat--accent` for the highlighted one.
- **Status pills**: `.bo-pill` + a modifier - `--new --contacted --quoted --won
  --lost` (leads). Use `BO.pillClass(status)`.
- **Channel / meta chips**: `.bo-chip` (put `BO.ICON.whatsapp` / `.email` inside).
- **Role badge**: `.bo-rolebadge`.
- **Tables**: wrap in `.bo-tablewrap` (handles horizontal scroll), then
  `<table class="bo-table">`. `.bo-cellname` for a name + `<small>` sub-line.
- **Item thumbnails**: `.bo-thumbs` (overlapping avatars, use `.bo-thumbs__more`
  for the `+N`) for compact rows; `.bo-itemrow` (`img` + `.bo-itemrow__title` +
  `.bo-itemrow__id`) for a full list of a lead's selected items.
- **Buttons**: `.bo-btn` (dark default), `.bo-btn--brand` (bright orange + ink text, AA-safe),
  `.bo-btn--ghost`, plus `.bo-btn--sm` / `.bo-btn--block`. Put a `BO.ICON.*` first.
- **Forms**: `.bo-form` wrapper; `.bo-field` (`label` + control) with optional
  `.bo-field__hint`; controls `.bo-input`, `.bo-select`, `.bo-textarea` (all 16px);
  `.bo-field--row` to lay fields side by side. Segmented picker: `.bo-segment`
  (radio + label, see login).
- **Lists**: `.bo-list` with `.bo-list__row` (flex; `.bo-list__name`,
  `.bo-list__meta`, `.bo-list__spacer` to push a pill to the end).
- **Misc**: `.bo-empty` (empty state), `.bo-divider`.

### Colour + contrast rules (do not break)
Orange has **two roles - never mix them**:
- **CTA / badge FIELDS** (anything with an orange fill): use the bright brand
  orange `--bo-cta` (`#E67A2F`) with **ink** text (`--ink`, ~5.96:1), matching the
  marketing site. Hover/active fields darken to `--bo-cta-hover` (`#E45C01`), still
  ink (~4.83:1). This is what `.bo-btn`, `.bo-btn--brand`, the nav-active item, the
  notification dot, and the numbered/step badges use. **White text on orange is
  banned** - it fails AA.
- **Orange TEXT / icons / borders on light surfaces** (links, `.bo-card__more`,
  `.bo-rolebadge`, stat numbers, tab labels): keep the dark `--bo-orange`
  (`#B14E0F`). Bright orange as text on cream fails AA; dark orange clears it
  (>= 4.6:1 on cream / bg / tint).
- Inputs are `font-size: 16px` (stops iOS zoom, meets the floor). No text under 12px.
- Reuse tokens: `--cream --ink --kraft --muted --line --orange --orange-deep` from
  the site; `--bo-cta --bo-cta-hover` (bright CTA fills, ink text), `--bo-orange`
  (dark orange text on light), `--bo-bg --bo-surface --bo-orange-tint --bo-line`
  from this layer.

---

## Accessibility baseline (bake into every page)
- Skip link + `<main>` landmark: provided by `mountShell`. On the standalone auth
  pages they are inline - keep them.
- Every input has a real `<label for=…>`. Visible focus is styled - do not remove.
- `dir="ltr"` on the chrome; if you render a Hebrew content string that should read
  RTL, wrap just that value in `dir="rtl"` (e.g. `<span dir="rtl">…</span>`).
- Use `BO.esc()` on any demo/user string before `innerHTML`.

---

## Notes
- **No link from the marketing pages to the backoffice** - it is reached by URL only.
- Real media ids/thumbs reused in demo leads: `feed-microsoft-teardown`,
  `feed-landa-letters`, `feed-king-solomon-floor`, `feed-google-cloud-welcome`,
  `feed-synamedia-lounge`, `feed-deep-instinct-launch`, `feed-bluevine-brand`,
  `feed-redefine-meat-rebrand`, `proj-priority`, `proj-meetmind`,
  `prod-demo-counter`, `prod-totem`, `prod-shelf`. Their thumbs point at
  `../assets/projects/*.jpg` (and `../assets/brand/puffer.png` for products), which
  resolve because backoffice sits one level under `mockup-v6/`.
- Fonts are loaded from Google Fonts per page `<head>` (Rubik + Hanken Grotesk),
  matching the marketing site.
