/* ============================================================
   PICPONG backoffice - shared layer (bo.js)
   Mockup only: no real auth, no backend, no security. Demo data
   is seeded into localStorage under the "bo:" namespace on first
   load. The shell (sidebar + topbar) is rendered from here so nav
   lives in ONE place. Role screens call BO.mountShell(...) and
   read data via the BO.* API documented in README.md.
   ============================================================ */
(function (global) {
  "use strict";

  var NS = "bo:";
  var K = {
    leads: NS + "leads",
    users: NS + "users",
    settings: NS + "settings",
    session: NS + "session",
    seeded: NS + "seeded"
  };

  /* ---- demo rep list (also part of USERS below) ---- */
  var REPS = ["Noa Bar-Levi", "Daniel Amrani", "Maya Cohen"];

  /* ---- REAL media items reused from the marketing pages.
     ids / titles / thumbs match data-media-* in the site HTML so
     thumbnails actually render in the backoffice. ---- */
  var MEDIA = {
    "feed-microsoft-teardown":   { title: "Microsoft · Teardown day",            thumb: "../assets/projects/microsoft.jpg" },
    "feed-landa-letters":        { title: "Landa · Illuminated letters",         thumb: "../assets/projects/landa.jpg" },
    "feed-king-solomon-floor":   { title: "King Solomon · On the show floor",    thumb: "../assets/projects/king-solomon.jpg" },
    "feed-google-cloud-welcome": { title: "Google Cloud · Welcome build",        thumb: "../assets/projects/google-cloud.jpg" },
    "feed-synamedia-lounge":     { title: "Synamedia · Booth & lounge",          thumb: "../assets/projects/synamedia.jpg" },
    "feed-deep-instinct-launch": { title: "Deep Instinct · Office launch",       thumb: "../assets/projects/deep-instinct.jpg" },
    "feed-bluevine-brand":       { title: "BlueVine · Brand event",              thumb: "../assets/projects/bluevine.jpg" },
    "feed-redefine-meat-rebrand":{ title: "Redefine Meat · Rebrand booth",       thumb: "../assets/projects/redefine-meat.jpg" },
    "proj-priority":             { title: "Priority · Maccabi Tel Aviv",         thumb: "../assets/projects/priority-maccabi.jpg" },
    "proj-meetmind":             { title: "Meet&Mind · Conference build",        thumb: "../assets/projects/meetmind.jpg" },
    "prod-demo-counter":         { title: "X-Board Demo Counter",                     thumb: "../assets/brand/puffer.png" },
    "prod-totem":                { title: "Free-Standing Totem",                      thumb: "../assets/brand/puffer.png" },
    "prod-shelf":                { title: "Modular Shelf Unit",                       thumb: "../assets/brand/puffer.png" }
  };

  function item(id) {
    var m = MEDIA[id] || { title: id, thumb: "../assets/brand/puffer.png" };
    return { id: id, title: m.title, thumb: m.thumb };
  }

  /* -------------------------------------------------- *
   *  SEED DATA
   * -------------------------------------------------- */
  function daysAgo(d, h, min) {
    var t = new Date();
    t.setDate(t.getDate() - d);
    if (h != null) t.setHours(h, min || 0, 0, 0);
    return t.toISOString();
  }

  function seedLeads() {
    return [
      {
        id: "L-1042", name: "Tomer Shani", company: "TechEvents IL",
        email: "tomer@techevents.co.il", phone: "+972 52-441-9082",
        channel: "whatsapp", language: "he",
        message: "צריכים דוכן לכנס ברירן, ~40 מ\"ר. אפשר הצעה?",
        items: [item("feed-microsoft-teardown"), item("prod-demo-counter"), item("prod-totem")],
        status: "new", assigned: null, createdAt: daysAgo(0, 8, 20),
        notes: []
      },
      {
        id: "L-1041", name: "Rachel Green", company: "Deep Instinct",
        email: "rachel.green@deepinstinct.com", phone: "+972 54-220-1177",
        channel: "email", language: "en",
        message: "Planning an office launch in September. Loved the recycled build - can you quote a welcome wall + counter?",
        items: [item("feed-deep-instinct-launch"), item("prod-shelf")],
        status: "new", assigned: null, createdAt: daysAgo(0, 10, 5),
        notes: []
      },
      {
        id: "L-1040", name: "Yael Dromi", company: "Expo Group Tel Aviv",
        email: "yael@expogroup.co.il", phone: "+972 50-778-3321",
        channel: "whatsapp", language: "he",
        message: "דוכן תצוגה לתערוכה בגני התערוכה. מחפשת משהו צבעוני.",
        items: [item("feed-king-solomon-floor"), item("proj-priority")],
        status: "contacted", assigned: "Noa Bar-Levi", createdAt: daysAgo(1, 14, 40),
        notes: [{ at: daysAgo(1, 16, 0), by: "Noa Bar-Levi", text: "Called - sending options for a 3x3 colour-block stand." }]
      },
      {
        id: "L-1039", name: "Amir Levy", company: "Landa Digital Printing",
        email: "amir.levy@landanano.com", phone: "+972 52-909-4410",
        channel: "email", language: "he",
        message: "רוצים אותיות מוארות בגובה 1.4 מטר לכנס.",
        items: [item("feed-landa-letters")],
        status: "quoted", assigned: "Daniel Amrani", createdAt: daysAgo(2, 9, 15),
        notes: [{ at: daysAgo(2, 11, 0), by: "Daniel Amrani", text: "Quote #Q-338 sent - 4 illuminated letters, kraft finish." }]
      },
      {
        id: "L-1038", name: "Sarah Klein", company: "Google Cloud IL",
        email: "sklein@google.com", phone: "+972 54-661-2093",
        channel: "whatsapp", language: "en",
        message: "Spring party welcome arch - flat-pack was a huge plus last time. Repeat build possible?",
        items: [item("feed-google-cloud-welcome")],
        status: "won", assigned: "Noa Bar-Levi", createdAt: daysAgo(4, 13, 25),
        notes: [{ at: daysAgo(3, 10, 0), by: "Noa Bar-Levi", text: "Signed - repeat of last year's arch, delivery 12 days." }]
      },
      {
        id: "L-1037", name: "Daniel Roth", company: "Synamedia",
        email: "daniel.roth@synamedia.com", phone: "+44 7700 900412",
        channel: "email", language: "en",
        message: "Booth + seating lounge, entirely from board, for a London expo. Can you ship?",
        items: [item("feed-synamedia-lounge"), item("prod-shelf"), item("prod-totem")],
        status: "contacted", assigned: "Maya Cohen", createdAt: daysAgo(5, 11, 50),
        notes: []
      },
      {
        id: "L-1036", name: "Michal Barak", company: "BlueVine",
        email: "michal@bluevine.com", phone: "+972 53-330-9981",
        channel: "whatsapp", language: "he",
        message: "אירוע מותג פנימי. רוצים קיר צילום ושילוט.",
        items: [item("feed-bluevine-brand"), item("prod-demo-counter")],
        status: "lost", assigned: "Daniel Amrani", createdAt: daysAgo(8, 15, 10),
        notes: [{ at: daysAgo(6, 9, 30), by: "Daniel Amrani", text: "Went with an in-house vendor this round. Re-approach in Q4." }]
      },
      {
        id: "L-1035", name: "Idan Peretz", company: "Redefine Meat",
        email: "idan@redefinemeat.com", phone: "+972 50-114-7756",
        channel: "email", language: "he",
        message: "דוכן מיתוג מחדש לתערוכת מזון. תקציב גמיש.",
        items: [item("feed-redefine-meat-rebrand"), item("proj-meetmind")],
        status: "new", assigned: null, createdAt: daysAgo(0, 7, 45),
        notes: []
      }
    ];
  }

  function seedUsers() {
    return [
      { id: "U-1", name: "Noa Bar-Levi",  email: "noa@picpong.biz",    role: "Operator", active: true },
      { id: "U-2", name: "Daniel Amrani", email: "daniel@picpong.biz", role: "Operator", active: true },
      { id: "U-3", name: "Maya Cohen",    email: "maya@picpong.biz",   role: "Operator", active: true },
      { id: "U-4", name: "Eitan Golan",   email: "eitan@picpong.biz",  role: "Admin",    active: true },
      { id: "U-5", name: "Liat Mizrahi",  email: "liat@picpong.biz",   role: "Operator", active: false }
    ];
  }

  function seedSettings() {
    return {
      whatsappNumber: "14155238886",      // Twilio sandbox
      routingEmail: "leads@picpong.biz",
      social: {
        instagram: "https://instagram.com/picpong",
        facebook: "https://facebook.com/picpong",
        linkedin: "https://linkedin.com/company/picpong"
      },
      defaultLanguage: "he"
    };
  }

  /* -------------------------------------------------- *
   *  STORAGE
   * -------------------------------------------------- */
  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }

  function seed(force) {
    if (!force && localStorage.getItem(K.seeded)) return;
    write(K.leads, seedLeads());
    write(K.users, seedUsers());
    write(K.settings, seedSettings());
    localStorage.setItem(K.seeded, "1");
  }

  /* -------------------------------------------------- *
   *  DATA API
   * -------------------------------------------------- */
  // Always newest-first (by createdAt desc). Defensive: keeps order right
  // regardless of seed order or where saveLead upserts an item.
  function getLeads()    {
    return read(K.leads, []).slice().sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }
  function getLead(id)   { return getLeads().filter(function (l) { return l.id === id; })[0] || null; }
  function saveLead(l)   {
    var all = getLeads(), i = -1;
    all.forEach(function (x, idx) { if (x.id === l.id) i = idx; });
    if (i >= 0) all[i] = l; else all.unshift(l);
    write(K.leads, all); return l;
  }
  function getUsers()    { return read(K.users, []); }
  function saveUsers(u)  { write(K.users, u); return u; }
  function getSettings() { return read(K.settings, seedSettings()); }
  function saveSettings(s) { write(K.settings, s); return s; }
  function getReps()     { return REPS.slice(); }
  function getMedia()    { return MEDIA; }

  /* -------------------------------------------------- *
   *  SESSION + ROLES
   * -------------------------------------------------- */
  function getSession() { return read(K.session, null); }
  function setSession(s) { write(K.session, s); }
  function logout() {
    localStorage.removeItem(K.session);
    location.href = "login.html";
  }
  function requireRole(roles) {
    var s = getSession();
    if (!s) { location.href = "login.html"; return null; }
    if (roles && roles.indexOf(s.role) === -1) {
      // Not authorised for this page in the mock: send to dashboard.
      location.href = "dashboard.html"; return null;
    }
    return s;
  }

  /* -------------------------------------------------- *
   *  UTILITIES
   * -------------------------------------------------- */
  function initials(name) {
    return (name || "?").split(/\s+/).slice(0, 2).map(function (w) { return w.charAt(0); }).join("").toUpperCase();
  }
  function fmtDate(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }
  function fmtDateTime(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }) + ", " +
      d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  }
  function timeAgo(iso) {
    var s = (Date.now() - new Date(iso).getTime()) / 1000;
    if (s < 60) return "just now";
    if (s < 3600) return Math.floor(s / 60) + "m ago";
    if (s < 86400) return Math.floor(s / 3600) + "h ago";
    return Math.floor(s / 86400) + "d ago";
  }
  function pillClass(status) { return "bo-pill bo-pill--" + status; }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function isToday(iso) {
    var d = new Date(iso), n = new Date();
    return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth() && d.getDate() === n.getDate();
  }

  var _toastTimer = null;
  function toast(msg) {
    var el = document.querySelector(".bo-toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "bo-toast";
      document.body.appendChild(el);
    }
    el.innerHTML = msg;
    // reflow so the transition replays
    void el.offsetWidth;
    el.classList.add("show");
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2600);
  }

  /* -------------------------------------------------- *
   *  ICONS (inline, so no asset requests)
   * -------------------------------------------------- */
  var ICON = {
    dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>',
    leads: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    projects: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
    catalog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
    homepage: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5 12 3l9 6.5"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1 3.6 3.7-1A10 10 0 1 0 12 2zm0 1.7a8.3 8.3 0 0 1 7 12.7l-.2.3.6 2.2-2.3-.6-.3.2A8.3 8.3 0 1 1 12 3.7zm-3 3.6c-.2 0-.5 0-.7.4-.3.4-.9 1-.9 2.4s1 2.8 1.1 3c.2.2 2 3.2 5 4.4 2.5 1 3 .8 3.5.7.6 0 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4-.3-.1-1.7-.9-2-1-.3 0-.5-.1-.6.2-.2.3-.7.9-.8 1-.2.2-.3.2-.6 0-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5.3-.5v-.5c-.1-.1-.6-1.5-.9-2-.2-.5-.4-.4-.6-.4z"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>'
  };

  /* -------------------------------------------------- *
   *  NAV MODEL (role-aware)
   * -------------------------------------------------- */
  // group: which sidebar section; roles: who sees the item
  var NAV = [
    { group: "Overview", items: [
      { href: "dashboard.html", label: "Dashboard", icon: "dashboard", roles: ["Admin", "Operator"] }
    ]},
    { group: "Leads", items: [
      { href: "leads.html", label: "Leads", icon: "leads", roles: ["Admin", "Operator"], badge: "unreadLeads" }
    ]},
    { group: "Content", items: [
      { href: "homepage.html", label: "Homepage", icon: "homepage", roles: ["Admin", "Operator"] },
      { href: "projects.html", label: "Projects", icon: "projects", roles: ["Admin", "Operator"] },
      { href: "catalog-manager.html", label: "Catalog", icon: "catalog", roles: ["Admin", "Operator"] }
      /* Media library destination removed - becomes an in-editor asset-picker in Phase-2 */
    ]},
    { group: "Admin", items: [
      { href: "users.html", label: "Users", icon: "users", roles: ["Admin"] },
      { href: "settings.html", label: "Settings", icon: "settings", roles: ["Admin"] }
    ]}
  ];

  function unreadLeadCount() {
    return getLeads().filter(function (l) { return l.status === "new"; }).length;
  }

  /* -------------------------------------------------- *
   *  SHELL RENDERER
   *  opts: { active: "leads.html", title: "Leads" }
   * -------------------------------------------------- */
  function mountShell(opts) {
    opts = opts || {};
    var session = getSession();
    if (!session) { location.href = "login.html"; return; }
    var role = session.role;
    var active = opts.active || "";
    var unread = unreadLeadCount();

    document.body.classList.add("bo-body");

    // ---- sidebar nav html ----
    var navHtml = "";
    NAV.forEach(function (grp) {
      var visible = grp.items.filter(function (it) { return it.roles.indexOf(role) !== -1; });
      if (!visible.length) return;
      navHtml += '<div class="bo-nav__group">' + esc(grp.group) + "</div>";
      visible.forEach(function (it) {
        var cur = it.href === active ? ' aria-current="page"' : "";
        var badge = "";
        if (it.badge === "unreadLeads" && unread > 0) {
          badge = '<span class="bo-nav__badge">' + unread + "</span>";
        }
        navHtml += '<a class="bo-nav__link" href="' + it.href + '"' + cur + ">" +
          ICON[it.icon] + "<span>" + esc(it.label) + "</span>" + badge + "</a>";
      });
    });

    // ---- notification dropdown (newest leads) ----
    var newest = getLeads().slice(0, 5);
    var notifHtml = newest.map(function (l) {
      var thumb = (l.items && l.items[0] && l.items[0].thumb) || "../assets/brand/puffer.png";
      return '<a class="bo-notif" href="lead-detail.html?id=' + encodeURIComponent(l.id) + '">' +
        '<img src="' + esc(thumb) + '" alt="" />' +
        '<span><span class="bo-notif__name">' + esc(l.name) + "</span><br>" +
        '<span class="bo-notif__meta">' + esc(l.company) + " · " + timeAgo(l.createdAt) + "</span></span></a>";
    }).join("");

    // ---- shell markup ----
    var mark = '<span class="bo-brand__mark"><img src="../assets/brand/puffer.svg" alt="" onerror="this.src=\'../assets/brand/puffer.png\'"></span>';

    var shellHtml =
      '<a class="bo-skip" href="#bo-main">Skip to content</a>' +
      '<div class="bo-scrim" data-bo-scrim></div>' +
      '<div class="bo-shell">' +
        '<aside class="bo-sidebar" aria-label="Backoffice navigation">' +
          '<div class="bo-brand">' + mark +
            '<div><div class="bo-brand__name">Picpong</div><div class="bo-brand__sub">Backoffice</div></div>' +
          '</div>' +
          '<nav class="bo-nav">' + navHtml + '</nav>' +
          '<div class="bo-sidebar__foot">UI mockup - demo data only. No real accounts.</div>' +
        '</aside>' +
        '<div class="bo-main">' +
          '<header class="bo-topbar">' +
            '<button class="bo-menu-toggle" type="button" aria-label="Open menu" data-bo-menu>' + ICON.menu + '</button>' +
            '<h1 class="bo-topbar__title">' + esc(opts.title || "Dashboard") + '</h1>' +
            '<div class="bo-topbar__spacer"></div>' +
            '<div class="bo-bell">' +
              '<button class="bo-iconbtn" type="button" aria-label="Notifications" aria-haspopup="true" aria-expanded="false" data-bo-bell>' +
                ICON.bell + (unread > 0 ? '<span class="bo-iconbtn__dot">' + unread + '</span>' : '') +
              '</button>' +
              '<div class="bo-dropdown" data-bo-notif hidden role="menu" aria-label="Recent leads">' +
                '<div class="bo-dropdown__head"><span>Recent leads</span><a href="leads.html">View all</a></div>' +
                (notifHtml || '<div class="bo-empty">No leads yet</div>') +
              '</div>' +
            '</div>' +
            '<div style="position:relative">' +
              '<button class="bo-userchip" type="button" aria-haspopup="true" aria-expanded="false" data-bo-user>' +
                '<span class="bo-avatar">' + esc(initials(session.name)) + '</span>' +
                '<span><span class="bo-userchip__name">' + esc(session.name) + '</span><br>' +
                '<span class="bo-userchip__role">' + esc(role) + '</span></span>' +
              '</button>' +
              '<div class="bo-usermenu" data-bo-usermenu hidden role="menu">' +
                '<div style="padding:0.5rem 0.6rem"><span class="bo-rolebadge">' + esc(role) + '</span></div>' +
                '<hr class="bo-divider" style="margin:0.3rem 0">' +
                '<button type="button" data-bo-logout>Sign out</button>' +
              '</div>' +
            '</div>' +
          '</header>' +
          '<main class="bo-content" id="bo-main"></main>' +
        '</div>' +
      '</div>';

    var host = document.getElementById("bo-app") || document.body;
    if (host === document.body) {
      // build a wrapper so page content stays in <main>
      var wrap = document.createElement("div");
      wrap.id = "bo-app";
      wrap.innerHTML = shellHtml;
      document.body.appendChild(wrap);
    } else {
      host.innerHTML = shellHtml;
    }

    wireShell();
    return document.getElementById("bo-main");
  }

  function wireShell() {
    var body = document.body;
    function closeAll() {
      var n = document.querySelector("[data-bo-notif]"), u = document.querySelector("[data-bo-usermenu]");
      if (n) { n.hidden = true; document.querySelector("[data-bo-bell]").setAttribute("aria-expanded", "false"); }
      if (u) { u.hidden = true; document.querySelector("[data-bo-user]").setAttribute("aria-expanded", "false"); }
    }
    function toggle(sel, btnSel) {
      var el = document.querySelector(sel), btn = document.querySelector(btnSel);
      var willOpen = el.hidden;
      closeAll();
      el.hidden = !willOpen;
      btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
    }
    var bell = document.querySelector("[data-bo-bell]");
    if (bell) bell.addEventListener("click", function (e) { e.stopPropagation(); toggle("[data-bo-notif]", "[data-bo-bell]"); });
    var user = document.querySelector("[data-bo-user]");
    if (user) user.addEventListener("click", function (e) { e.stopPropagation(); toggle("[data-bo-usermenu]", "[data-bo-user]"); });
    document.addEventListener("click", closeAll);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeAll(); body.classList.remove("bo-nav-open"); } });

    var logout = document.querySelector("[data-bo-logout]");
    if (logout) logout.addEventListener("click", BO.logout);

    var menu = document.querySelector("[data-bo-menu]");
    if (menu) menu.addEventListener("click", function () { body.classList.toggle("bo-nav-open"); });
    var scrim = document.querySelector("[data-bo-scrim]");
    if (scrim) scrim.addEventListener("click", function () { body.classList.remove("bo-nav-open"); });
  }

  /* -------------------------------------------------- *
   *  SHARED MOCK IMAGE MANAGER  (catalog + homepage)
   *  Gallery strip: first item = cover, rest = views. "Add"
   *  opens a file picker; the picked file is shown via an
   *  object URL - preview only, session-only, no real upload
   *  or persistence (serverless mock). Mutates the passed
   *  images array IN PLACE and calls onChange() to re-render.
   *  images: [{ src, label }]
   * -------------------------------------------------- */
  var IMG_ICON = {
    star:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15 9 22 9 16.5 13.5 18.5 21 12 16.5 5.5 21 7.5 13.5 2 9 9 9"/></svg>',
    left:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
    x:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    plus:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>'
  };

  function imageStripHtml(images, opts) {
    opts = opts || {};
    images = images || [];
    var addLabel = opts.addLabel || "Add image";
    var coverLabel = opts.coverLabel || "Cover";   // e.g. "Main" for projects
    var max = opts.max || Infinity;   // single-image slots pass max:1
    var thumbs = images.map(function (im, i) {
      var isCover = i === 0;
      return '<div class="im-thumb' + (isCover ? " is-cover" : "") + '">' +
        '<img src="' + esc(im.src) + '" alt="' + esc(im.label || "") + '" />' +
        (isCover ? '<span class="im-coverbadge">' + esc(coverLabel) + '</span>' : "") +
        '<div class="im-thumbactions">' +
          (isCover ? "" : '<button type="button" class="im-iconbtn" data-imcover="' + i + '" aria-label="Set as cover" title="Set as cover">' + IMG_ICON.star + '</button>') +
          '<button type="button" class="im-iconbtn" data-imleft="' + i + '" aria-label="Move earlier"' + (i === 0 ? " disabled" : "") + '>' + IMG_ICON.left + '</button>' +
          '<button type="button" class="im-iconbtn" data-imright="' + i + '" aria-label="Move later"' + (i === images.length - 1 ? " disabled" : "") + '>' + IMG_ICON.right + '</button>' +
          '<button type="button" class="im-iconbtn im-iconbtn--danger" data-imremove="' + i + '" aria-label="Remove image">' + IMG_ICON.x + '</button>' +
        '</div>' +
      '</div>';
    }).join("");
    var addTile = images.length >= max ? "" :
      '<button type="button" class="im-add" data-imadd aria-label="' + esc(addLabel) + '">' + IMG_ICON.plus + '<span>' + esc(addLabel) + '</span></button>';
    return '<div class="im-strip">' + thumbs + addTile + '</div>' +
      (images.length ? "" : '<span class="im-empty">' + esc(opts.emptyLabel || "No images yet - add one") + '</span>');
  }

  // Wire the strip inside `scope` (a DOM element). onChange fires after each edit.
  function imageStripWire(scope, images, onChange) {
    function fire() { if (onChange) onChange(); }
    function idx(b, attr) { return parseInt(b.getAttribute(attr), 10); }
    Array.prototype.forEach.call(scope.querySelectorAll("[data-imcover]"), function (b) {
      b.addEventListener("click", function () { images.unshift(images.splice(idx(b, "data-imcover"), 1)[0]); fire(); });
    });
    Array.prototype.forEach.call(scope.querySelectorAll("[data-imleft]"), function (b) {
      b.addEventListener("click", function () { var i = idx(b, "data-imleft"); if (i <= 0) return; var t = images[i]; images[i] = images[i - 1]; images[i - 1] = t; fire(); });
    });
    Array.prototype.forEach.call(scope.querySelectorAll("[data-imright]"), function (b) {
      b.addEventListener("click", function () { var i = idx(b, "data-imright"); if (i >= images.length - 1) return; var t = images[i]; images[i] = images[i + 1]; images[i + 1] = t; fire(); });
    });
    Array.prototype.forEach.call(scope.querySelectorAll("[data-imremove]"), function (b) {
      b.addEventListener("click", function () { images.splice(idx(b, "data-imremove"), 1); fire(); });
    });
    var add = scope.querySelector("[data-imadd]");
    if (add) add.addEventListener("click", function () {
      var input = document.createElement("input");
      input.type = "file"; input.accept = "image/*";
      input.addEventListener("change", function () {
        var f = input.files && input.files[0];
        if (!f) return;
        images.push({ src: URL.createObjectURL(f), label: f.name });
        toast("Added <b>" + esc(f.name) + "</b> - preview only, not saved");
        fire();
      });
      input.click();
    });
  }

  /* -------------------------------------------------- *
   *  EXPORT
   * -------------------------------------------------- */
  var BO = {
    // storage / session
    seed: seed, resetDemo: function () { seed(true); },
    getSession: getSession, setSession: setSession, logout: logout, requireRole: requireRole,
    // data
    getLeads: getLeads, getLead: getLead, saveLead: saveLead,
    getUsers: getUsers, saveUsers: saveUsers,
    getSettings: getSettings, saveSettings: saveSettings,
    getReps: getReps, getMedia: getMedia,
    unreadLeadCount: unreadLeadCount,
    // shell
    mountShell: mountShell, ICON: ICON,
    // shared mock image manager
    imageStrip: { html: imageStripHtml, wire: imageStripWire },
    // utils
    initials: initials, fmtDate: fmtDate, fmtDateTime: fmtDateTime, timeAgo: timeAgo,
    isToday: isToday, pillClass: pillClass, esc: esc, toast: toast
  };

  // Seed on first load of any page that includes bo.js.
  seed(false);

  global.BO = BO;
})(window);
