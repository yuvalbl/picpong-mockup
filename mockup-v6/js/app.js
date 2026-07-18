/* ============================================================
   PICPONG · mockup-v6 · shared behaviour
   Commerce REMOVED (cart/localStorage/drawer/stepper/PDP price-sync).
   Kept: mobile menu · scroll reveal · count-up · toast · slideshow ·
   parallax · slogan rotation · filter bar · accordion · gallery ·
   doodle draw.
   Language switch (lang/dir flip + copy swap, Hebrew default).
   Lead capture is LIVE: the media "+" and the contact-fab open the quote
   drawer and carry the selected item into it (mock submit, sends nothing).
   Pause-motion toggle halts every auto-moving element (WCAG 2.2.2).
   No dependencies. Respects prefers-reduced-motion via CSS.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- toast ---------- */
  var toastTimer;
  function toast(msg) {
    var el = document.getElementById("toast");
    if (!el) return;
    el.innerHTML = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2400);
  }

  /* ---------- i18n: language switch (structural, in scope this PRD) ----------
     Flips <html lang/dir> and swaps every [data-en]/[data-he] node's text.
     Hebrew copy ships in the markup as data-he attributes (English is the
     element's default text, mirrored in data-en). Geo-detection is NOT mocked. */
  var LANG_KEY = "picpong_lang_v4";
  function applyLang(lang) {
    var he = lang === "he";
    var root = document.documentElement;
    root.setAttribute("lang", he ? "he" : "en");
    root.setAttribute("dir", he ? "rtl" : "ltr");
    document.querySelectorAll("[data-en]").forEach(function (el) {
      var val = he ? el.getAttribute("data-he") : el.getAttribute("data-en");
      if (val == null) return;
      // some nodes carry inline markup (e.g. <b>, <em>), swap as HTML when flagged
      if (el.hasAttribute("data-i18n-html")) { el.innerHTML = val; }
      else { el.textContent = val; }
    });
    document.querySelectorAll("[data-en-ph]").forEach(function (el) {
      var val = he ? el.getAttribute("data-he-ph") : el.getAttribute("data-en-ph");
      if (val != null) el.setAttribute("placeholder", val);
    });
    document.querySelectorAll("[data-en-aria]").forEach(function (el) {
      var val = he ? el.getAttribute("data-he-aria") : el.getAttribute("data-en-aria");
      if (val != null) el.setAttribute("aria-label", val);
    });
    document.querySelectorAll("[data-lang-switch]").forEach(function (sw) {
      sw.querySelectorAll("[data-lang]").forEach(function (opt) {
        opt.setAttribute("aria-pressed", opt.getAttribute("data-lang") === lang ? "true" : "false");
      });
    });
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    // notify JS-rendered copy (slogan, slideshow captions) that aren't [data-en] nodes
    document.dispatchEvent(new CustomEvent("picpong:langchange", { detail: { lang: he ? "he" : "en" } }));
  }
  (function initLang() {
    var stored = null;
    try { stored = localStorage.getItem(LANG_KEY); } catch (e) {}
    // BUILD NOTE: production should geo-detect (IL → he) on first visit; not mocked here.
    // Hebrew-first: a stored preference wins, otherwise default to Hebrew.
    applyLang(stored === "en" ? "en" : "he");
    document.querySelectorAll("[data-lang-switch]").forEach(function (sw) {
      sw.addEventListener("click", function (e) {
        var opt = e.target.closest("[data-lang]");
        if (!opt) return;
        e.preventDefault();
        applyLang(opt.getAttribute("data-lang"));
      });
    });
  })();

  /* ---------- project-detail: data-driven template ----------
     Reads ?p=<slug> and renders that project's H1/H2/images from PROJECTS.
     Slugs = image basenames. Each project is bilingual (en/he fields). The
     compact gallery + <dialog> lightbox applies to ALL projects. */
  var IMG = "assets/projects/";
  var PROJECTS = {
    "king-solomon": {
      tag: { en: "Convention", he: "כנס" },
      eyebrow: { en: "King Solomon · Expo", he: "קינג סולומון · אקספו" },
      title: { en: "Colourful booths, struck and re-staged", he: "ביתנים צבעוניים, מפורקים ומורכבים מחדש" },
      subtitle: { en: "A full set of vivid expo booths in 100% recycled X-Board, printed, installed, then struck down to be reused.", he: "סט מלא של ביתני אקספו צבעוניים ב-X-Board ממוחזר 100%, מודפסים, מותקנים, ואז מפורקים לשימוש חוזר." },
      // the 10-image project; proves the compact gallery + lightbox scales
      images: [
        "king-solomon.jpg", "microsoft.jpg", "google-cloud.jpg", "landa.jpg",
        "synamedia.jpg", "deep-instinct.jpg", "bluevine.jpg", "redefine-meat.jpg",
        "priority-maccabi.jpg", "meetmind.jpg"
      ]
    },
    "google-cloud": {
      tag: { en: "Event", he: "אירוע" },
      eyebrow: { en: "Google Cloud · Spring party", he: "גוגל קלאוד · מסיבת אביב" },
      title: { en: "Spring-party welcome build", he: "מבנה קבלת פנים למסיבת אביב" },
      subtitle: { en: "A bright welcome environment for Google Cloud's spring party, lightweight X-Board, gone without a trace.", he: "סביבת קבלת פנים מוארת למסיבת האביב של גוגל קלאוד, X-Board קל משקל, נעלם ללא עקבות." },
      images: ["google-cloud.jpg", "bluevine.jpg", "microsoft.jpg"]
    },
    "landa": {
      tag: { en: "Convention", he: "כנס" },
      eyebrow: { en: "Landa · Digital Printing", he: "לנדא · דפוס דיגיטלי" },
      title: { en: "Illuminated letters & graphics", he: "אותיות מוארות וגרפיקה" },
      subtitle: { en: "Illuminated lettering and large-format graphics on recycled X-Board for Landa's show presence.", he: "אותיות מוארות וגרפיקה בפורמט גדול על X-Board ממוחזר לנוכחות התערוכה של לנדא." },
      images: ["landa.jpg", "synamedia.jpg"]
    },
    "microsoft": {
      tag: { en: "Event", he: "אירוע" },
      eyebrow: { en: "Microsoft · New-office launch", he: "מיקרוסופט · השקת משרד חדש" },
      title: { en: "New-office launch environment", he: "סביבת השקה למשרד חדש" },
      subtitle: { en: "A full welcome environment in 100% recycled X-Board, branded, lightweight, and gone without a trace.", he: "סביבת קבלת פנים מלאה ב-X-Board ממוחזר 100%, ממותגת, קלת משקל, ונעלמת ללא עקבות." },
      images: ["microsoft.jpg", "deep-instinct.jpg", "bluevine.jpg"]
    },
    "synamedia": {
      tag: { en: "Booth", he: "ביתן" },
      eyebrow: { en: "Synamedia · Conference", he: "סינמדיה · כנס" },
      title: { en: "Conference booth & lounge", he: "ביתן כנס וטרקלין" },
      subtitle: { en: "A conference booth with a built-in lounge, all in recycled X-Board, struck flat after the show.", he: "ביתן כנס עם טרקלין מובנה, הכל מ-X-Board ממוחזר, מפורק לאחר התערוכה." },
      images: ["synamedia.jpg", "meetmind.jpg"]
    },
    "deep-instinct": {
      tag: { en: "Event", he: "אירוע" },
      eyebrow: { en: "Deep Instinct · Office inauguration", he: "דיפ אינסטינקט · חנוכת משרד" },
      title: { en: "Office inauguration", he: "חנוכת משרד" },
      subtitle: { en: "A branded inauguration environment for Deep Instinct's new office, built entirely from recycled X-Board.", he: "סביבת חנוכה ממותגת למשרד החדש של דיפ אינסטינקט, בנויה כולה מ-X-Board ממוחזר." },
      images: ["deep-instinct.jpg", "microsoft.jpg"]
    },
    "bluevine": {
      tag: { en: "Event", he: "אירוע" },
      eyebrow: { en: "BlueVine · Branding event", he: "בלוויין · אירוע מיתוג" },
      title: { en: "Branding event environment", he: "סביבת אירוע מיתוג" },
      subtitle: { en: "A branded event environment in recycled X-Board, bold colour, light to ship, simple to strike.", he: "סביבת אירוע ממותגת ב-X-Board ממוחזר, צבע נועז, קל למשלוח, פשוט לפירוק." },
      images: ["bluevine.jpg", "google-cloud.jpg"]
    },
    "redefine-meat": {
      tag: { en: "Booth", he: "ביתן" },
      eyebrow: { en: "Redefine Meat · Rebranding", he: "רידיפיין מיט · מיתוג מחדש" },
      title: { en: "Rebranding showcase", he: "תצוגת מיתוג מחדש" },
      subtitle: { en: "A rebranding showcase booth on recycled X-Board, fully printed, fast to install, fully reusable.", he: "ביתן תצוגת מיתוג מחדש על X-Board ממוחזר, מודפס במלואו, מהיר להתקנה, ניתן לשימוש חוזר." },
      images: ["redefine-meat.jpg", "synamedia.jpg"]
    },
    "priority-maccabi": {
      tag: { en: "Event", he: "אירוע" },
      eyebrow: { en: "Priority · Maccabi Tel Aviv", he: "פריוריטי · מכבי תל אביב" },
      title: { en: "VIP room build-out", he: "בניית חדר VIP" },
      subtitle: { en: "A VIP room build-out for Priority at Maccabi Tel Aviv, premium feel from recycled X-Board.", he: "בניית חדר VIP לפריוריטי במכבי תל אביב, תחושה יוקרתית מ-X-Board ממוחזר." },
      images: ["priority-maccabi.jpg", "bluevine.jpg"]
    },
    "meetmind": {
      tag: { en: "Convention", he: "כנס" },
      eyebrow: { en: "Meet&Mind · Convention", he: "מיט אנד מיינד · כנס" },
      title: { en: "Convention presence", he: "נוכחות בכנס" },
      subtitle: { en: "A full convention presence built from recycled X-Board, designed, printed and installed in-house.", he: "נוכחות כנס מלאה הבנויה מ-X-Board ממוחזר, מעוצבת, מודפסת ומותקנת בבית." },
      images: ["meetmind.jpg", "landa.jpg"]
    }
  };
  var PROJECT_ORDER = Object.keys(PROJECTS);

  function mediaMoreBtn(id, title, thumb) {
    return '<button class="media__more" type="button" aria-label="Request a quote on a build like this"' +
      ' data-en-aria="Request a quote on a build like this" data-he-aria="בקשת הצעת מחיר על מבנה דומה"' +
      ' data-media-id="' + id + '" data-media-title="' + title.replace(/"/g, "&quot;") + '"' +
      ' data-media-thumb="' + thumb + '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>';
  }

  // dedicated keyboard-reachable zoom trigger; a real <button> so it never has to
  // wrap (or be wrapped by) the "+" - the two controls sit side by side in .media.
  function mediaZoomBtn() {
    return '<button class="media__zoom" type="button" aria-label="Enlarge image"' +
      ' data-en-aria="Enlarge image" data-he-aria="הגדלת תמונה">' +
      '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg></button>';
  }

  (function renderProjectDetail() {
    var gallery = document.querySelector("[data-project-gallery]");
    if (!gallery) return; // not the detail page

    var params = new URLSearchParams(window.location.search);
    var slug = params.get("p");
    if (!slug || !PROJECTS[slug]) { slug = PROJECT_ORDER[0]; } // invalid/missing → first project
    var p = PROJECTS[slug];
    var titleEn = p.title.en;

    // crumb + eyebrow + H1 + H2 (bilingual via data-en/data-he; applyLang re-run below)
    function setI18n(sel, en, he) {
      var el = document.querySelector(sel);
      if (!el) return;
      el.setAttribute("data-en", en);
      el.setAttribute("data-he", he);
      el.textContent = en;
    }
    setI18n("[data-project-crumb]", titleEn, p.title.he);
    setI18n("[data-project-eyebrow]", p.eyebrow.en, p.eyebrow.he);
    setI18n("[data-project-title]", titleEn, p.title.he);
    setI18n("[data-project-subtitle]", p.subtitle.en, p.subtitle.he);
    function setDocTitle() {
      var he = document.documentElement.getAttribute("lang") === "he";
      document.title = he
        ? p.title.he + " | פרויקטים · PicPong.biz"
        : titleEn + ": X-Board build | PicPong.biz Projects";
    }
    setDocTitle();
    document.addEventListener("picpong:langchange", setDocTitle);

    // lead image (hero, two-column); first image
    var heroMedia = document.querySelector("[data-project-hero-media]");
    var lead = p.images[0];
    if (heroMedia) {
      heroMedia.innerHTML =
        '<img src="' + IMG + lead + '" alt="' + titleEn + ' built from X-Board" loading="eager" />' +
        '<span class="hero__media-tag" data-en="From the Picpong archive" data-he="מארכיון Picpong">From the Picpong archive</span>' +
        mediaZoomBtn() +
        mediaMoreBtn("proj-" + slug + "-hero", p.eyebrow.en, IMG + lead);
      heroMedia.setAttribute("data-zoom", IMG + lead); // hero is lightbox-able too (PRD 3 §4.6)
    }

    // wire the page-level share box to THIS project (PRD 3 §4.6)
    var shareBox = document.querySelector("[data-share]");
    if (shareBox) {
      shareBox.setAttribute("data-share-id", "proj-" + slug);
      shareBox.setAttribute("data-share-title", titleEn);
    }

    // compact thumbnail gallery; remaining images (or all if only one)
    var galleryImgs = p.images.length > 1 ? p.images.slice(1) : p.images;
    var html = "";
    galleryImgs.forEach(function (file, i) {
      html +=
        '<div class="media" data-media data-zoom="' + IMG + file + '">' +
        '<img src="' + IMG + file + '" alt="' + titleEn + ', detail ' + (i + 1) + '" loading="lazy" />' +
        mediaZoomBtn() +
        mediaMoreBtn("proj-" + slug + "-" + (i + 1), p.eyebrow.en + " · detail", IMG + file) +
        '</div>';
    });
    gallery.innerHTML = html;

    // re-apply current language to the freshly injected nodes
    var cur = document.documentElement.getAttribute("lang") === "he" ? "he" : "en";
    applyLang(cur);
  })();

  /* ---------- media "+" → expanding "I want this" pill ----------
     Every .media__more (static markup AND the ones mediaMoreBtn() injects on
     project-detail) gets a bilingual label appended after its SVG. On hover /
     keyboard focus the circle grows into a pill revealing the label (CSS).
     Runs after renderProjectDetail so the generated thumbs are present. */
  (function enhanceMediaMore() {
    document.querySelectorAll(".media__more").forEach(function (btn) {
      if (btn.querySelector(".media__more__label")) return;
      var span = document.createElement("span");
      span.className = "media__more__label";
      span.setAttribute("data-en", "I want this");
      span.setAttribute("data-he", "אני רוצה כזה");
      span.textContent = "I want this";
      btn.appendChild(span);
    });
    // apply current language to the freshly added label nodes
    var cur = document.documentElement.getAttribute("lang") === "he" ? "he" : "en";
    applyLang(cur);
  })();

  /* ---------- lightbox (native <dialog>) ----------
     thumbnail click/Enter → show larger image; Esc / backdrop / × → close.
     PRD 3: remembers the opened image's data-media-id so the in-lightbox
     "copy link to this image" share (§4.6) can bake #item-<id> into the URL. */
  (function lightbox() {
    var dlg = document.getElementById("lightbox");
    if (!dlg || typeof dlg.showModal !== "function") return;
    var img = document.getElementById("lightboxImg");
    var closeBtn = document.getElementById("lightboxClose");
    var shareBtn = dlg.querySelector("[data-lightbox-share]");
    var currentId = null;

    function open(src, alt, id) {
      if (dlg.open) return; // guard: real zoom buttons fire click natively; never double-open
      img.src = src; img.alt = alt || "";
      currentId = id || null;
      if (shareBtn) shareBtn.hidden = !currentId; // only show when the frame is addressable
      dlg.showModal();
    }
    function close() { if (dlg.open) dlg.close(); }
    function openFromZoom(zoom) {
      var thumb = zoom.querySelector("img");
      var more = zoom.querySelector(".media__more");
      open(zoom.getAttribute("data-zoom"), thumb ? thumb.alt : "", more ? more.getAttribute("data-media-id") : null);
    }

    // open on thumbnail click (but NOT when the "+" button is pressed). The
    // dedicated .media__zoom <button> handles keyboard natively (Enter/Space →
    // click), so no separate keydown branch is needed.
    document.addEventListener("click", function (e) {
      if (e.target.closest(".media__more")) return;
      var zoom = e.target.closest("[data-zoom]");
      if (!zoom) return;
      e.preventDefault();
      openFromZoom(zoom);
    });
    if (shareBtn) shareBtn.addEventListener("click", function () {
      if (currentId) copyShareLink(itemShareUrl(currentId)); // copy link to THIS frame
    });
    if (closeBtn) closeBtn.addEventListener("click", close);
    // backdrop click closes (click landing on the dialog element itself = backdrop)
    dlg.addEventListener("click", function (e) { if (e.target === dlg) close(); });
    dlg.addEventListener("close", function () { img.src = ""; currentId = null; });
  })();

  /* ---------- share affordances (PRD 3 §4.6) ----------
     Page-level "Copy link" + "Share on WhatsApp" on project/product pages, and
     the lightbox image-share above. Clipboard with an execCommand fallback +
     toast - navigator.clipboard rejects on file://, exactly how the mockup
     opens by double-click, so we never fail silently.
     BUILD NOTE: real links use the durable resolver /m/<id> (PRD §4.4); the
     mockup copies the direct ?p=<slug>#item-<id> form as a stand-in (§4.1). */
  function pageShareUrl() { return location.origin + location.pathname + location.search; }
  function itemShareUrl(id) { return pageShareUrl() + "#item-" + id; }
  function waShareUrl(text) { return "https://wa.me/?text=" + encodeURIComponent(text); } // numberless = share to any contact

  function fallbackCopy(text) {
    try {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", "");
      ta.style.position = "fixed"; ta.style.top = "-1000px"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      var ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch (e) { return false; }
  }
  function copyShareLink(text) {
    function done(ok) {
      toast(ok ? t("Link copied", "הקישור הועתק")
               : t("Couldn't copy - select the address bar to copy the URL", "ההעתקה נכשלה - העתיקו את הכתובת מהדפדפן"));
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(fallbackCopy(text)); });
    } else { done(fallbackCopy(text)); }
  }

  document.querySelectorAll("[data-share]").forEach(function (box) {
    function url() { var id = box.getAttribute("data-share-id"); return id ? itemShareUrl(id) : pageShareUrl(); }
    function title() { return box.getAttribute("data-share-title") || document.title; }
    var copyBtn = box.querySelector("[data-share-copy]");
    var waBtn = box.querySelector("[data-share-wa]");
    if (copyBtn) copyBtn.addEventListener("click", function () { copyShareLink(url()); });
    if (waBtn) waBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.open(waShareUrl(title() + " - " + url()), "_blank", "noopener");
    });
  });

  /* ---------- DEV MENU + rep-email demo (PRD 3 §10.2) ----------
     A static, elegant representation of the templated email the SALES REP gets
     when a visitor sends a brief: contact block + one deep link per flagged
     item. Opened from a subtle Dev launcher so it can be shown in a pitch.
     Seeds from the visitor's real last submit when present, else a sample lead.
     BUILD NOTES: real email send + template render; the /m/<id> resolver; the
     interactive rep-receiving experience + WhatsApp-format view → Phase 2 (L-7).
     The links DISPLAY the durable /m/<id> form (§4.4) but navigate via the
     working ?p=…#item-… mockup URL through this local resolver shim (§4.1). */
  (function repEmailDemo() {
    // id → working mockup URL (the shim that stands in for the real resolver)
    var RESOLVER = (function () {
      var m = {};
      Object.keys(PROJECTS).forEach(function (slug) {
        var p = PROJECTS[slug], base = "project-detail.html?p=" + slug;
        m["proj-" + slug] = base;                                     // whole project
        m["proj-" + slug + "-hero"] = base + "#item-proj-" + slug + "-hero";
        var imgs = p.images.length > 1 ? p.images.slice(1) : p.images;
        for (var i = 1; i <= imgs.length; i++) m["proj-" + slug + "-" + i] = base + "#item-proj-" + slug + "-" + i;
      });
      return m;
    })();
    function resolveHref(id) {
      if (!id) return "#";
      if (RESOLVER[id]) return RESOLVER[id];
      if (id.indexOf("prod-") === 0) return (id === "prod-demo-counter" ? "product.html" : "catalog.html") + "#item-" + id;
      return "projects.html#item-" + id; // index-tile ids highlight on the projects page
    }

    var SAMPLE = {
      data: {
        name: "Dana Cohen", email: "dana@bewell.co.il", phone: "054-123-4567",
        message: { en: "Hi - we have a launch event in March, ~120 sqm. Loved these three. Can you quote?",
                   he: "היי - יש לנו אירוע השקה במרץ, בערך 120 מ\"ר. אהבנו את שלושת אלה. אפשר הצעת מחיר?" }
      },
      items: [
        { id: "proj-microsoft-1", title: "Microsoft · New-office launch - detail", thumb: IMG + "microsoft.jpg" },
        { id: "proj-landa-hero",  title: "Landa · Illuminated letters", thumb: IMG + "landa.jpg" },
        { id: "prod-demo-counter", title: "Demo Counter - recycled X-Board", thumb: "" }
      ]
    };

    function seed() {
      if (lastLead && lastLead.items && lastLead.items.length) {
        return { data: { name: lastLead.data.name, email: lastLead.data.email, phone: lastLead.data.phone,
                         message: { en: lastLead.data.message, he: lastLead.data.message } },
                 items: lastLead.items, live: true };
      }
      if (selection && selection.length) return { data: SAMPLE.data, items: selection.slice(), live: true };
      return { data: SAMPLE.data, items: SAMPLE.items, live: false };
    }

    var dlg = null;
    function build() {
      dlg = document.createElement("dialog");
      dlg.className = "repmail";
      dlg.setAttribute("aria-label", "Sales-rep email preview");
      document.body.appendChild(dlg);
      dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    }

    function rowHtml(it) {
      var href = resolveHref(it.id);
      var thumb = it.thumb
        ? '<img class="repmail__thumb" src="' + esc(it.thumb) + '" alt="" />'
        : '<span class="repmail__thumb repmail__thumb--ph" aria-hidden="true"></span>';
      return '<li class="repmail__item">' + thumb
        + '<div class="repmail__item-body">'
        + '<span class="repmail__item-title">' + esc(it.title || it.id) + '</span>'
        + '<a class="repmail__item-link" href="' + esc(href) + '">'
        + '<code>picpong.biz/m/' + esc(it.id) + '</code> '
        + '<span class="repmail__arrow" data-en="View item →" data-he="צפו בפריט ←">View item →</span></a>'
        + '</div></li>';
    }

    function render() {
      var s = seed(), d = s.data, he = currentLang() === "he";
      var first = (d.name || "").split(" ")[0] || "";
      var msg = d.message ? (he ? (d.message.he || d.message.en) : (d.message.en || d.message.he)) : "";
      var contact = [];
      if (d.email) contact.push('<a href="mailto:' + esc(d.email) + '">' + esc(d.email) + '</a>');
      if (d.phone) contact.push('<a href="tel:' + esc(d.phone.replace(/\s/g, "")) + '">' + esc(d.phone) + '</a>');

      dlg.innerHTML =
        '<div class="repmail__head">'
        + '<span class="repmail__badge" data-en="Demo - nothing is actually sent" data-he="הדמיה - לא נשלח דבר">Demo - nothing is actually sent</span>'
        + '<button class="repmail__close lead-drawer__close" type="button" data-repmail-close aria-label="Close" data-en-aria="Close" data-he-aria="סגור"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>'
        + '</div>'
        + '<div class="repmail__meta">'
        + '<div><span class="repmail__k">' + (he ? "מאת" : "From") + '</span> PicPong.biz &lt;leads@picpong.biz&gt;</div>'
        + '<div><span class="repmail__k">' + (he ? "אל" : "To") + '</span> ' + (he ? "צוות מכירות" : "Sales team") + ' &lt;sales@picpong.biz&gt;</div>'
        + '<div><span class="repmail__k">' + (he ? "נושא" : "Subject") + '</span> '
          + (he ? ("ליד חדש - " + esc(d.name) + " · " + s.items.length + " פריטים")
                : ("New lead - " + esc(d.name) + " · " + s.items.length + " item" + (s.items.length === 1 ? "" : "s"))) + '</div>'
        + '</div>'
        + '<div class="repmail__body">'
        + '<p class="repmail__hello">' + (he ? ("התקבלה פנייה חדשה מ-" + esc(first) + ".") : ("New enquiry from " + esc(first) + ".")) + '</p>'
        + '<div class="repmail__contact">'
        + '<div><span class="repmail__k">' + (he ? "שם" : "Name") + '</span> ' + esc(d.name) + '</div>'
        + (contact.length ? '<div><span class="repmail__k">' + (he ? "יצירת קשר" : "Contact") + '</span> ' + contact.join(" · ") + '</div>' : '')
        + (msg ? '<div class="repmail__msg"><span class="repmail__k">' + (he ? "הודעה" : "Message") + '</span> ' + esc(msg) + '</div>' : '')
        + '</div>'
        + '<p class="repmail__items-h">' + (he ? ("הפריטים שסומנו (" + s.items.length + "):") : ("Items they flagged (" + s.items.length + "):")) + '</p>'
        + '<ul class="repmail__items">' + s.items.map(rowHtml).join("") + '</ul>'
        + '<p class="repmail__note" data-en="Each link opens the exact piece, highlighted on the page. Real emails use the durable picpong.biz/m/&lt;id&gt; resolver." data-he="כל קישור פותח את הפריט המדויק, מודגש בעמוד. במיילים האמיתיים נשתמש ב-picpong.biz/m/&lt;id&gt; הקבוע.">Each link opens the exact piece, highlighted on the page. Real emails use the durable picpong.biz/m/&lt;id&gt; resolver.</p>'
        + (s.live ? '' : '<p class="repmail__seed" data-en="(sample lead - submit the quote form to see a real one)" data-he="(ליד לדוגמה - שלחו את טופס ההצעה כדי לראות אמיתי)">(sample lead - submit the quote form to see a real one)</p>')
        + '</div>';
      dlg.querySelector("[data-repmail-close]").addEventListener("click", function () { dlg.close(); });
      // links navigate the same tab → close the modal first so nav isn't trapped
      dlg.querySelectorAll(".repmail__item-link").forEach(function (a) {
        a.addEventListener("click", function () { dlg.close(); });
      });
      applyLang(currentLang());
    }

    function openEmail() { if (!dlg) build(); render(); if (!dlg.open) dlg.showModal(); }

    // v6: the Dev affordance is always visible (no ?dev / localStorage gate).

    /* ---- Dev launcher: subtle fixed button → small menu ---- */
    var dev = document.createElement("div");
    dev.className = "devmenu";
    dev.innerHTML =
      '<button class="devmenu__btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Developer menu" title="Dev menu">'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'
      + '<span data-en="Dev" data-he="Dev">Dev</span></button>'
      + '<div class="devmenu__pop" hidden role="menu">'
      + '<button type="button" role="menuitem" data-dev-email data-en="📧 Preview sales-rep email" data-he="📧 תצוגת מייל למכירות">📧 Preview sales-rep email</button>'
      + '<a role="menuitem" href="backoffice/login.html" data-en="🗂️ Open backoffice" data-he="🗂️ פתיחת המערכת הפנימית">🗂️ Open backoffice</a>'
      + '</div>';
    document.body.appendChild(dev);
    var devBtn = dev.querySelector(".devmenu__btn");
    var devPop = dev.querySelector(".devmenu__pop");
    function toggleDev(open) {
      var show = open === undefined ? devPop.hidden : open;
      devPop.hidden = !show; devBtn.setAttribute("aria-expanded", show ? "true" : "false");
    }
    devBtn.addEventListener("click", function () { toggleDev(); });
    dev.querySelector("[data-dev-email]").addEventListener("click", function () { toggleDev(false); openEmail(); });
    document.addEventListener("click", function (e) { if (!dev.contains(e.target)) toggleDev(false); });
    // ?dev in the URL opens the email straight away (handy for a deep-linked pitch)
    if (/[?&]dev\b/.test(location.search)) setTimeout(openEmail, 120);
  })();

  /* ============================================================
     LEAD-CAPTURE MODULE (PRD 2)
     The site's core job: "I liked this - get back to me" in one click, with
     the item's thumbnail carried into a quote form. One JS-injected side
     drawer hosts a shared four-field form; three triggers feed it (the media
     "+", the floating fab, the minimized pill); a running selection of
     thumbnail chips travels with the visitor. UI-only/mock - nothing sends;
     real routing + a unified WhatsApp/email inbox stay BUILD NOTES. */

  function currentLang() { return document.documentElement.getAttribute("lang") === "he" ? "he" : "en"; }
  function t(en, he) { return currentLang() === "he" ? he : en; }
  function itemsLabel(n) { return currentLang() === "he" ? (n + " פריטים") : (n + (n === 1 ? " item" : " items")); }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ---- selection state: the items the visitor has tagged ---- */
  var selection = []; // [{ id, title, thumb }]
  var lastLead = null; // snapshot of the visitor's last submit → seeds the rep-email demo (§10.2)
  // BUILD NOTE: a sessionStorage mirror (survive page nav within a visit) is a
  // PRD §15 nicety, left unwired for the mockup.
  function selIndexOf(id) { for (var i = 0; i < selection.length; i++) { if (selection[i].id === id) return i; } return -1; }
  function selToggle(it) { var i = selIndexOf(it.id); if (i >= 0) { selection.splice(i, 1); return false; } selection.push(it); return true; }
  function selRemove(id) { var i = selIndexOf(id); if (i >= 0) selection.splice(i, 1); }
  function selClear() { selection.length = 0; }

  function drawerEl() { return document.getElementById("leadDrawer"); }
  function drawerIsOpen() { var d = drawerEl(); return !!(d && d.open); }

  /* ---- shared four-field form markup (Name / Email / Phone / Message) ---- */
  // a visible "*" required marker (aria-hidden) + an sr-only "(required)" so it is
  // conveyed both ways; the input also carries aria-required="true".
  var REQ_MARK = ' <span class="req" aria-hidden="true">*</span>'
    + '<span class="sr-only" data-en=" (required)" data-he=" (חובה)"> (required)</span>';
  function fieldRows(sfx) {
    return '<div class="quote-grid">'
      + '<div class="qf qf--full"><label for="qn' + sfx + '"><span data-en="Name" data-he="שם">Name</span>' + REQ_MARK + '</label>'
      + '<input id="qn' + sfx + '" name="name" autocomplete="name" aria-required="true" placeholder="Your name" data-en-ph="Your name" data-he-ph="השם שלך" />'
      + '<span class="qf-error" id="qn' + sfx + '-err" role="alert" data-qf-error></span></div>'
      + '<div class="qf"><label for="qe' + sfx + '" data-en="Email" data-he="אימייל">Email</label>'
      + '<input id="qe' + sfx + '" type="email" name="email" autocomplete="email" placeholder="you@company.com" data-en-ph="you@company.com" data-he-ph="you@company.com" />'
      + '<span class="qf-error" id="qe' + sfx + '-err" role="alert" data-qf-error></span></div>'
      + '<div class="qf"><label for="qp' + sfx + '" data-en="Phone" data-he="טלפון">Phone</label>'
      + '<input id="qp' + sfx + '" type="tel" name="phone" autocomplete="tel" placeholder="Phone number" data-en-ph="Phone number" data-he-ph="מספר טלפון" />'
      + '<span class="qf-error" id="qp' + sfx + '-err" role="alert" data-qf-error></span></div>'
      + '<div class="qf qf--full"><label for="qm' + sfx + '" data-en="Message" data-he="הודעה">Message</label>'
      + '<textarea id="qm' + sfx + '" name="message" placeholder="Tell us what you need…" data-en-ph="Tell us what you need…" data-he-ph="ספרו לנו מה אתם צריכים…"></textarea></div>'
      + '</div>';
  }

  /* ---- build the drawer + pill once, inject into <body> ---- */
  function buildDrawer() {
    if (drawerEl()) return;
    var dlg = document.createElement("dialog");
    dlg.id = "leadDrawer";
    dlg.className = "lead-drawer";
    dlg.setAttribute("aria-label", "Request a quote");
    dlg.innerHTML =
      '<div class="lead-drawer__panel">'
      + '<div class="lead-drawer__head">'
      + '<div>'
      + '<p class="eyebrow" data-en="Request a quote" data-he="בקשת הצעת מחיר">Request a quote</p>'
      + '<h2 class="h3 lead-drawer__title" data-lead-title data-en="Your selection" data-he="הבחירה שלך">Your selection</h2>'
      + '</div>'
      + '<button class="lightbox__close lead-drawer__close" type="button" data-lead-close aria-label="Close" data-en-aria="Close" data-he-aria="סגור"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>'
      + '</div>'
      + '<p class="lead-drawer__intro" data-en="Tell us how to reach you and we\'ll reply within a working day." data-he="ספרו לנו איך ליצור איתכם קשר ונחזור אליכם תוך יום עסקים.">Tell us how to reach you and we\'ll reply within a working day.</p>'
      + '<div class="lead-chiprow" data-lead-chiprow hidden></div>'
      + '<form class="quote-form" data-quote data-lead-form novalidate aria-label="Quote request" aria-describedby="leadRule-d">'
      + '<p class="form-rule" id="leadRule-d" data-en="Name is required. Add an email or a phone so we can reply." data-he="יש להזין שם. הוסיפו אימייל או טלפון כדי שנוכל לחזור אליכם.">Name is required. Add an email or a phone so we can reply.</p>'
      + fieldRows("-d")
      + '<div class="lead-actions">'
      + '<button class="btn btn--brand" type="submit" data-i18n-html data-en="Send request <span class=&quot;arrow&quot;>&rarr;</span>" data-he="שליחת בקשה <span class=&quot;arrow&quot;>&rarr;</span>">Send request <span class="arrow">&rarr;</span></button>'
      + '<button class="lead-keep" type="button" data-lead-keep data-en="Keep browsing" data-he="להמשיך לעיין">Keep browsing</button>'
      + '</div>'
      + '<a class="lead-wa" data-lead-wa href="#" target="_blank" rel="noopener" data-en="or message us on WhatsApp" data-he="או שלחו לנו הודעה בוואטסאפ">or message us on WhatsApp</a>'
      + '<p class="placeholder-cap" data-en="Mockup form: validates &amp; confirms, sends nothing" data-he="טופס הדגמה: מאמת ומאשר, לא שולח דבר">Mockup form: validates &amp; confirms, sends nothing</p>'
      + '</form>'
      + '<div class="lead-success" data-lead-success role="status" aria-live="polite" hidden><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg><p class="lead-success__msg" data-lead-success-msg></p></div>'
      + '</div>';
    document.body.appendChild(dlg);

    // inject the live item-count badge into every floating fab (the count lives
    // on the ever-present trigger; replaces the old separate minimized pill)
    document.querySelectorAll(".contact-fab").forEach(function (fab) {
      if (fab.querySelector(".contact-fab__badge")) return;
      var b = document.createElement("span");
      b.className = "contact-fab__badge";
      b.hidden = true;
      fab.appendChild(b);
    });

    // close button + Keep browsing both minimize; backdrop click + native Esc close
    dlg.querySelector("[data-lead-close]").addEventListener("click", closeDrawer);
    dlg.querySelector("[data-lead-keep]").addEventListener("click", closeDrawer);
    dlg.addEventListener("click", function (e) { if (e.target === dlg) closeDrawer(); });
    dlg.addEventListener("close", function () {
      syncBadge();
      if (lastTrigger && lastTrigger.focus) { try { lastTrigger.focus(); } catch (e) {} }
    });
    // chip ✕ removal (delegated; drawer stays open)
    dlg.querySelector("[data-lead-chiprow]").addEventListener("click", function (e) {
      var x = e.target.closest("[data-rm]"); if (!x) return;
      selRemove(x.getAttribute("data-rm"));
      renderChips(); syncTiles(); syncBadge(); refreshWa(); updateDrawerTitle();
    });

    // localize the freshly-injected nodes to the current language
    applyLang(currentLang());
  }

  /* ---- chips: one removable thumbnail per selected item ---- */
  function renderChips() {
    var row = document.querySelector("[data-lead-chiprow]"); if (!row) return;
    if (!selection.length) { row.innerHTML = ""; row.hidden = true; return; }
    row.hidden = false;
    row.innerHTML = selection.map(function (s) {
      return '<span class="lead-chip">'
        + '<img src="' + esc(s.thumb) + '" alt="" />'
        + '<span class="lead-chip__t">' + esc(s.title) + '</span>'
        + '<button class="lead-chip__x" type="button" data-rm="' + esc(s.id) + '" aria-label="' + t("Remove", "הסרה") + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>'
        + '</span>';
    }).join("");
  }

  /* ---- reflect selection on every "+" tile (✓ / "Selected" state) ---- */
  function syncTiles() {
    document.querySelectorAll(".media__more").forEach(function (btn) {
      var on = selIndexOf(btn.getAttribute("data-media-id")) >= 0;
      btn.classList.toggle("is-added", on);
      var path = btn.querySelector("path");
      if (path) path.setAttribute("d", on ? "M5 13l4 4L19 7" : "M12 5v14M5 12h14");
      var label = btn.querySelector(".media__more__label");
      if (label) {
        label.setAttribute("data-en", on ? "Selected" : "I want this");
        label.setAttribute("data-he", on ? "נבחר" : "אני רוצה כזה");
        label.textContent = label.getAttribute(currentLang() === "he" ? "data-he" : "data-en");
      }
    });
  }

  /* ---- fab badge (live count of tagged items) ---- */
  function syncBadge() {
    var n = selection.length;
    document.querySelectorAll(".contact-fab__badge").forEach(function (b) {
      b.textContent = n;
      b.hidden = n === 0;
    });
  }

  function updateDrawerTitle() {
    var h = document.querySelector("[data-lead-title]"); if (!h) return;
    var has = selection.length > 0;
    h.setAttribute("data-en", has ? "Your selection" : "Request a quote");
    h.setAttribute("data-he", has ? "הבחירה שלך" : "בקשת הצעת מחיר");
    h.textContent = h.getAttribute(currentLang() === "he" ? "data-he" : "data-en");
  }

  /* ---- open / close (minimize) ---- */
  var lastTrigger = null;
  function openDrawer(trigger) {
    var dlg = drawerEl(); if (!dlg) return;
    lastTrigger = trigger || null;
    // reset to the form view (in case a previous success panel is showing)
    var form = dlg.querySelector("[data-quote]");
    var succ = dlg.querySelector("[data-lead-success]");
    if (form) { form.hidden = false; clearErrors(form); }
    if (succ) succ.hidden = true;
    renderChips(); updateDrawerTitle(); refreshWa(); syncBadge();
    if (!dlg.open) dlg.showModal();
    // animate the panel in one frame after showModal (transform needs the toggle)
    requestAnimationFrame(function () { var p = dlg.querySelector(".lead-drawer__panel"); if (p) p.classList.add("is-open"); });
    // focus the first field (showModal initially focuses the close button)
    requestAnimationFrame(function () { var f = dlg.querySelector('[name="name"]'); if (f) f.focus(); });
  }
  function closeDrawer() {
    var dlg = drawerEl(); if (!dlg || !dlg.open) return;
    var p = dlg.querySelector(".lead-drawer__panel");
    if (p) p.classList.remove("is-open");
    var done = function () { if (dlg.open) dlg.close(); }; // native "close" handler shows the pill
    if (reduceMotion) done(); else setTimeout(done, 320);
  }

  /* ---- validation (Name required · email-OR-phone) + mock submit ---- */
  function readForm(form) {
    function v(n) { var el = form.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ""; }
    return { name: v("name"), email: v("email"), phone: v("phone"), message: v("message") };
  }
  // OQ-1 (docs/prd/open-questions.md): currently "at least one of email/phone".
  // Flip THIS predicate to change the rule (both → `v.email && v.phone`; email-only → `!!v.email`).
  function contactRuleOK(v) { return !!(v.email || v.phone); }
  function isEmail(s) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s); }

  function clearErrors(form) {
    form.querySelectorAll("[data-qf-error]").forEach(function (s) { s.textContent = ""; });
    form.querySelectorAll('[aria-invalid="true"]').forEach(function (i) {
      i.removeAttribute("aria-invalid"); i.removeAttribute("aria-describedby");
    });
  }
  function setError(form, name, msg) {
    var input = form.querySelector('[name="' + name + '"]');
    if (!input) return null;
    input.setAttribute("aria-invalid", "true");
    var slot = input.parentNode.querySelector("[data-qf-error]");
    if (slot) {
      if (msg) slot.textContent = msg;
      // point the field at its live error span only while invalid (WCAG 3.3.1)
      if (slot.id) input.setAttribute("aria-describedby", slot.id);
    }
    return input;
  }
  function validateLead(form) {
    clearErrors(form);
    var v = readForm(form), firstBad = null;
    // The two lead surfaces keep DIFFERENT contact rules on purpose (OQ-1 pending):
    // the inline #contact form requires an email; the drawer accepts email OR phone.
    var inline = !form.closest(".lead-drawer");
    if (!v.name) firstBad = setError(form, "name", t("Please add your name", "נא להזין שם"));
    if (v.email && !isEmail(v.email)) { var e1 = setError(form, "email", t("Check the email format", "בדקו את כתובת האימייל")); firstBad = firstBad || e1; }
    if (inline) {
      if (!v.email) {
        var e3 = setError(form, "email", t("Add your email so we can reply", "הוסיפו אימייל כדי שנחזור אליכם"));
        firstBad = firstBad || e3;
      }
    } else if (!contactRuleOK(v)) {
      // mark ONE field (email) with the shared message - a second red field with
      // no message of its own reads as a glitch, so phone is left unmarked.
      var e2 = setError(form, "email", t("Add an email or phone so we can reply", "הוסיפו אימייל או טלפון כדי שנחזור אליכם"));
      firstBad = firstBad || e2;
    }
    return { ok: !firstBad, first: firstBad, data: v };
  }

  function showSuccessFor(form, data) {
    var box = form.parentNode.querySelector("[data-lead-success]");
    if (!box) return;
    var msg = box.querySelector("[data-lead-success-msg]");
    var first = (data.name.split(" ")[0]) || "";
    var on = selection.length ? selection.map(function (s) { return s.title; }).join(", ") : "";
    if (msg) {
      msg.textContent = currentLang() === "he"
        ? ("תודה " + first + " - הבקשה התקבלה" + (on ? (" על " + on) : "") + ". נחזור אליכם תוך יום עסקים.")
        : ("Thanks " + first + " - your request is in" + (on ? (" for " + on) : "") + ". We'll reply within a working day.");
    }
    form.hidden = true;
    box.hidden = false;
  }

  function submitLead(form, data) {
    var btn = form.querySelector('button[type="submit"]');
    var orig = btn ? btn.innerHTML : "";
    if (btn) { btn.disabled = true; btn.innerHTML = t("Sending…", "שולח…"); }
    setTimeout(function () {
      if (btn) { btn.disabled = false; btn.innerHTML = orig; }
      var isDrawer = !!form.closest(".lead-drawer");
      // snapshot for the rep-email demo BEFORE the selection is cleared (§10.2)
      lastLead = { data: data, items: selection.slice() };
      showSuccessFor(form, data);
      var first = (data.name.split(" ")[0]) || "";
      toast(t("Brief received, <b>" + first + "</b>. We'll reply within 1 working day",
              "הבריף התקבל, <b>" + first + "</b>. נחזור אליך תוך יום עסקים"));
      form.reset();
      if (isDrawer) {
        selClear(); renderChips(); syncTiles(); syncBadge();
        setTimeout(closeDrawer, 1600);
      }
    }, 600);
  }

  /* ---- WhatsApp: a live, full-selection prefilled message (representation) ----
     BUILD NOTE: replace WA_NUMBER with Picpong's real WhatsApp Business number;
     production also routes WhatsApp + email + form into ONE inbox.
     Currently the Twilio WhatsApp sandbox number (+1 415 523 8886) for testing. */
  var WA_NUMBER = "14155238886"; // Twilio WhatsApp sandbox (+1 415 523 8886)
  function buildWaText(form) {
    var v = form ? readForm(form) : { name: "", phone: "" };
    var lines = [];
    if (selection.length) {
      lines.push(t("Hi PicPong, I'd like a quote on these items:", "היי PicPong, אשמח להצעת מחיר על הפריטים הבאים:"));
      selection.forEach(function (s) { lines.push("• " + s.title); });
    } else {
      lines.push(t("Hi PicPong, I'd like a quote.", "היי PicPong, אשמח להצעת מחיר."));
    }
    if (v.name) lines.push(t("Name: ", "שם: ") + v.name);
    if (v.phone) lines.push(t("Phone: ", "טלפון: ") + v.phone);
    return lines.join("\n"); // real newlines → %0A → line breaks in WhatsApp
  }
  function refreshWa() {
    document.querySelectorAll("[data-lead-wa]").forEach(function (a) {
      a.href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(buildWaText(a.closest("[data-quote]")));
    });
  }

  /* ---- ensure inline #contact forms share the drawer's states ---- */
  function enhanceFormStates(form) {
    if (form.closest(".lead-drawer")) return; // drawer markup already has these
    form.querySelectorAll(".qf").forEach(function (qf) {
      if (!qf.querySelector("[data-qf-error]")) {
        var s = document.createElement("span"); s.className = "qf-error";
        s.setAttribute("data-qf-error", ""); s.setAttribute("role", "alert");
        var inp = qf.querySelector("[name]");
        if (inp && inp.id) s.id = inp.id + "-err";
        qf.appendChild(s);
      }
    });
    if (!form.querySelector("[data-lead-wa]")) {
      var a = document.createElement("a");
      a.className = "lead-wa"; a.setAttribute("data-lead-wa", ""); a.href = "#"; a.target = "_blank"; a.rel = "noopener";
      a.setAttribute("data-en", "or message us on WhatsApp"); a.setAttribute("data-he", "או שלחו לנו הודעה בוואטסאפ");
      a.textContent = t("or message us on WhatsApp", "או שלחו לנו הודעה בוואטסאפ");
      form.appendChild(a);
    }
    if (!form.parentNode.querySelector("[data-lead-success]")) {
      var box = document.createElement("div");
      box.className = "lead-success"; box.setAttribute("data-lead-success", ""); box.hidden = true;
      box.setAttribute("role", "status"); box.setAttribute("aria-live", "polite");
      box.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg><p class="lead-success__msg" data-lead-success-msg></p>';
      form.parentNode.insertBefore(box, form.nextSibling);
    }
  }

  function bindLeadForm(form) {
    if (form.__leadBound) return; form.__leadBound = true;
    form.setAttribute("novalidate", "novalidate"); // JS owns validation (email-OR-phone)
    enhanceFormStates(form);
    form.addEventListener("input", function (e) {
      var el = e.target;
      if (el && el.name) {
        el.removeAttribute("aria-invalid");
        el.removeAttribute("aria-describedby");
        var slot = el.parentNode && el.parentNode.querySelector && el.parentNode.querySelector("[data-qf-error]");
        if (slot) slot.textContent = "";
      }
      refreshWa();
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var res = validateLead(form);
      if (!res.ok) { if (res.first) res.first.focus(); return; }
      submitLead(form, res.data);
    });
  }

  /* ---- triggers: media "+", floating fab, minimized pill ---- */
  document.addEventListener("click", function (e) {
    var more = e.target.closest(".media__more");
    if (more) {
      e.preventDefault();
      var titleHe = more.getAttribute("data-media-title-he");
      var isHe = document.documentElement.getAttribute("lang") === "he";
      var item = {
        id: more.getAttribute("data-media-id"),
        title: (isHe && titleHe ? titleHe : more.getAttribute("data-media-title")) || "",
        thumb: more.getAttribute("data-media-thumb") || ""
      };
      var nowOn = selToggle(item);
      syncTiles(); renderChips(); syncBadge(); refreshWa();
      if (nowOn) {
        // FIRST add (0 → 1) confirms with a toast; the drawer also opens. Every
        // later add is silent - the fab count badge is the running feedback.
        if (selection.length === 1) {
          if (!drawerIsOpen()) openDrawer(more);
          // fires only on the FIRST add, so the copy is singular (no count/plural)
          toast('<span class="toast__check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>' + t("Added to your quote list", "הפריט נוסף לרשימת ההצעה"));
        }
      } else {
        toast(t("Removed", "הוסר"));
      }
      return;
    }
    if (e.target.closest(".contact-fab")) { e.preventDefault(); openDrawer(e.target.closest(".contact-fab")); return; }
  });

  /* ---- re-localize JS-derived strings on language switch (no applyLang here → no recursion) ---- */
  document.addEventListener("picpong:langchange", function () {
    syncBadge(); refreshWa(); syncTiles(); updateDrawerTitle();
  });

  /* ---- init: build the drawer, bind every quote form, sync initial state ---- */
  buildDrawer();
  document.querySelectorAll("[data-quote]").forEach(bindLeadForm);
  syncTiles();
  refreshWa();
  syncBadge();

  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeMenu(); } });

  /* ---------- mobile menu (with focus management, WCAG 2.4.3 / 4.1.2) ----------
     Closed: the panel is `inert` so it leaves the tab order entirely. Open: focus
     moves inside, Tab is trapped, aria-expanded on the hamburger is synced, and
     focus returns to the hamburger on close (Esc / link / × all route here). */
  var mobileMenu = document.getElementById("mobileMenu");
  var menuBtnEl = document.getElementById("menuBtn");
  if (mobileMenu) mobileMenu.setAttribute("inert", ""); // start out of the tab order
  function menuFocusables() {
    return mobileMenu ? mobileMenu.querySelectorAll('a[href], button:not([disabled])') : [];
  }
  function openMenu() {
    if (!mobileMenu) return;
    // remove inert BEFORE focusing, so the target is focusable in the same tick
    mobileMenu.removeAttribute("inert");
    mobileMenu.classList.add("open");
    document.body.style.overflow = "hidden";
    if (menuBtnEl) menuBtnEl.setAttribute("aria-expanded", "true");
    var closeEl = document.getElementById("menuClose");
    var f = menuFocusables();
    var first = closeEl || (f.length ? f[0] : null);
    if (first) {
      // focus synchronously (beats the pointer's focus-on-click on the hamburger);
      // a 0ms backup covers the case where inert removal needs a reflow first
      try { first.focus(); } catch (e) {}
      if (document.activeElement !== first) {
        setTimeout(function () { try { first.focus(); } catch (e) {} }, 0);
      }
    }
  }
  function closeMenu() {
    if (!mobileMenu) return;
    var wasOpen = mobileMenu.classList.contains("open");
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
    if (menuBtnEl) menuBtnEl.setAttribute("aria-expanded", "false");
    // move focus back to the trigger BEFORE re-inerting: if focus were still inside
    // the menu when inert is set, the browser would drop it to <body> instead.
    if (wasOpen && menuBtnEl) { try { menuBtnEl.focus(); } catch (e) {} }
    mobileMenu.setAttribute("inert", "");
  }
  if (menuBtnEl) menuBtnEl.addEventListener("click", openMenu);
  var mc = document.getElementById("menuClose"); if (mc) mc.addEventListener("click", closeMenu);
  document.querySelectorAll("#mobileMenu a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  if (mobileMenu) mobileMenu.addEventListener("keydown", function (e) {
    if (e.key !== "Tab") return;
    var f = Array.prototype.slice.call(menuFocusables());
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); try { last.focus(); } catch (er) {} }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); try { first.focus(); } catch (er) {} }
  });

  /* ---------- motion preference ---------- */
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- pause auto-motion (WCAG 2.2.2) ----------
     One toggle halts everything that moves on its own: the CSS marquees + Ken-
     Burns + decorative loops (via body.motion-paused), the hero <video>, and the
     JS-driven slideshow + slogan intervals (which listen for picpong:motion).
     State persists across visits (localStorage) so it survives page loads and the
     language re-render. Runs before the slideshow/slogan initialisers so they can
     read the class on init. */
  var MOTION_KEY = "picpong_motion_v5";
  // default follows the OS "reduce motion" preference; an explicit choice overrides it
  var motionPaused = reduceMotion;
  try {
    var storedMotion = localStorage.getItem(MOTION_KEY);
    if (storedMotion === "paused") motionPaused = true;
    else if (storedMotion === "playing") motionPaused = false;
  } catch (e) {}
  function applyMotionState() {
    document.body.classList.toggle("motion-paused", motionPaused);
    document.querySelectorAll("video.hero-video").forEach(function (v) {
      try {
        if (motionPaused) { v.pause(); }
        else { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
      } catch (e) {}
    });
    document.querySelectorAll("[data-motion-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", motionPaused ? "true" : "false");
      var en = motionPaused ? "Resume motion" : "Pause motion";
      var he = motionPaused ? "הפעלת תנועה" : "השהיית תנועה";
      // keep the i18n source attrs current so a later language flip stays correct
      btn.setAttribute("data-en-aria", en); btn.setAttribute("data-he-aria", he);
      var label = currentLang() === "he" ? he : en;
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label); // tooltip for sighted mouse users
      var lbl = btn.querySelector(".motion-toggle__label");
      if (lbl) {
        lbl.setAttribute("data-en", en); lbl.setAttribute("data-he", he);
        lbl.textContent = label;
      }
    });
    document.dispatchEvent(new CustomEvent("picpong:motion", { detail: { paused: motionPaused } }));
  }
  function setMotionPaused(p) {
    motionPaused = !!p;
    try { localStorage.setItem(MOTION_KEY, motionPaused ? "paused" : "playing"); } catch (e) {}
    applyMotionState();
  }
  document.querySelectorAll("[data-motion-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () { setMotionPaused(!motionPaused); });
  });
  applyMotionState(); // reflect stored state (and set body.motion-paused) before init below

  /* draw-on: stroke the SVG doodles inside a revealed .draw tile. */
  var DRAW_EASE = "cubic-bezier(0.62,0.37,0.1,0.95)";
  function drawDoodles(el) {
    var ps = el.querySelectorAll("[pathLength]");
    ps.forEach(function (p, i) {
      if (reduceMotion) { p.style.strokeDashoffset = "0"; return; }
      p.style.animation = "drawOn 1.05s " + DRAW_EASE + " " + Math.min(i * 0.05, 0.5).toFixed(2) + "s forwards";
    });
  }

  /* count-up: tick [data-countup] numbers from 0 to target on reveal. */
  function countUp(scope) {
    scope.querySelectorAll("[data-countup]").forEach(function (node) {
      var target = parseInt(node.getAttribute("data-countup"), 10) || 0;
      if (reduceMotion) { node.textContent = target; return; }
      var dur = 1100, start = null;
      function tick(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        node.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick); else node.textContent = target;
      }
      requestAnimationFrame(tick);
    });
  }

  /* ---------- scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  function revealEl(el) {
    el.classList.add("in");
    if (el.classList.contains("draw")) drawDoodles(el);
    if (el.querySelector && el.querySelector("[data-countup]")) countUp(el);
  }
  if (!("IntersectionObserver" in window)) {
    reveals.forEach(revealEl);
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { revealEl(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- collage parallax (gentle, scroll-linked) ---------- */
  var pxEls = reduceMotion ? [] : Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  if (pxEls.length) {
    var ticking = false;
    var applyParallax = function () {
      var vh = window.innerHeight;
      pxEls.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var prog = ((r.top + r.height / 2) - vh / 2) / vh;
        var f = parseFloat(el.getAttribute("data-parallax")) || 0;
        var shift = -prog * f * 100;
        var sc = parseFloat(el.getAttribute("data-parallax-scale")) || 1;
        el.style.transform = "translate3d(0," + shift.toFixed(1) + "px,0) scale(" + sc + ")";
      });
      ticking = false;
    };
    var onScrollPx = function () { if (!ticking) { ticking = true; requestAnimationFrame(applyParallax); } };
    window.addEventListener("scroll", onScrollPx, { passive: true });
    window.addEventListener("resize", onScrollPx, { passive: true });
    applyParallax();
  }

  /* ---------- collage slideshow: reel player (zoom-cut + story bars) ---------- */
  document.querySelectorAll("[data-slideshow]").forEach(function (box) {
    var SLIDE_MS = 4200;
    var slides = box.querySelectorAll(".slide");
    if (slides.length < 2) return;
    var cardK = box.querySelector("[data-card-k]");
    var cardM = box.querySelector("[data-card-m]");
    var card = box.querySelector(".ctile__card");
    var bars = box.querySelectorAll(".slideshow__bars .bar");
    box.style.setProperty("--slide-ms", SLIDE_MS + "ms");

    // caption text for the current language (falls back to EN when no HE variant)
    function slideK(s) {
      var he = document.documentElement.getAttribute("lang") === "he";
      return (he && s.dataset.kHe) ? s.dataset.kHe : (s.dataset.k || "");
    }
    function slideM(s) {
      var he = document.documentElement.getAttribute("lang") === "he";
      return (he && s.dataset.mHe) ? s.dataset.mHe : (s.dataset.m || "");
    }

    function runBar(idx) {
      bars.forEach(function (b, k) {
        b.classList.remove("is-running");
        b.classList.toggle("is-done", k < idx);
      });
      var b = bars[idx];
      if (!b) return;
      void b.offsetWidth;
      b.classList.add("is-running");
    }

    var i = 0; // index of the currently-active slide (kept across language switches)

    // paint the visible caption in the current language
    function paintCaption() {
      var s = slides[i];
      if (cardK) cardK.textContent = slideK(s);
      if (cardM) cardM.textContent = slideM(s);
    }
    paintCaption(); // initial caption renders in the right language on load
    // re-paint the currently-visible caption immediately when the language flips
    document.addEventListener("picpong:langchange", paintCaption);

    if (reduceMotion) {
      bars.forEach(function (b) { b.classList.add("is-done"); });
      return;
    }

    function step() {
      var prev = i;
      i = (i + 1) % slides.length;
      slides.forEach(function (s) { s.classList.remove("is-prev"); });
      slides[prev].classList.remove("is-active");
      slides[prev].classList.add("is-prev");
      slides[i].classList.add("is-active");
      runBar(i);
      var s = slides[i];
      if (card && s.dataset.k) {
        requestAnimationFrame(function () {
          var oldW = card.offsetWidth;
          card.style.width = oldW + "px";
          card.classList.add("is-swapping");
          setTimeout(function () {
            if (cardK) cardK.textContent = slideK(s);
            if (cardM) cardM.textContent = slideM(s);
            card.style.width = "auto";
            var newW = card.offsetWidth;
            card.style.width = oldW + "px";
            void card.offsetWidth;
            card.style.width = newW + "px";
            card.classList.remove("is-swapping");
          }, 300);
        });
      }
    }

    // pause-aware player: the pause toggle (picpong:motion) stops/restarts it
    var ssTimer = null;
    function startSS() {
      if (ssTimer || document.body.classList.contains("motion-paused")) return;
      runBar(i);
      ssTimer = setInterval(step, SLIDE_MS);
    }
    function stopSS() { if (ssTimer) { clearInterval(ssTimer); ssTimer = null; } }
    startSS();
    document.addEventListener("picpong:motion", function (e) {
      if (e.detail && e.detail.paused) stopSS(); else startSS();
    });
  });

  /* ---------- dynamic slogan: rotating phrases + highlighter sweep ---------- */
  (function () {
    var slogan = document.querySelector("[data-slogan-cycle]");
    if (!slogan) return;

    // 3 bilingual slogans, each 4 lines, two highlight spans (orange = the bold/
    // standing word, deep = the vanishing word). Hebrew is native marketing copy,
    // not a literal translation; it carries the same "striking presence, no trace"
    // paradox in idiomatic, denser Hebrew that rhymes/parallels for a native ear.
    var PHRASES = {
      en: [
        ['<span class="mark mark--orange">Remarkable</span>', 'events, made', 'to impact.', '<span class="mark mark--deep">no trace.</span>'],
        ['Built to', 'be <span class="mark mark--orange">seen</span>,', 'designed', 'to <span class="mark mark--deep">vanish.</span>'],
        ['Loud at', 'the <span class="mark mark--orange">show.</span>', 'Light on', 'the <span class="mark mark--deep">earth.</span>']
      ],
      he: [
        ['<span class="mark mark--orange">חותם</span>', 'שנשאר', 'גם כשהכל', '<span class="mark mark--deep">כבר נעלם.</span>'],
        ['נבנה', '<span class="mark mark--orange">לבלוט</span>,', 'ונועד', '<span class="mark mark--deep">להיעלם.</span>'],
        ['רועשת', '<span class="mark mark--orange">באולם.</span>', 'נעלמת', 'בלי <span class="mark mark--deep">חתימה.</span>']
      ]
    };
    function phrases() {
      return document.documentElement.getAttribute("lang") === "he" ? PHRASES.he : PHRASES.en;
    }

    function render(lines) {
      return lines.map(function (h, n) {
        return '<span class="line" style="--l:' + n + '">' + h + "</span>";
      }).join("");
    }

    var idx = 0, timer = null;

    slogan.innerHTML = render(phrases()[idx]);
    // re-render the SAME slot in the new language when the switch fires
    document.addEventListener("picpong:langchange", function () {
      slogan.innerHTML = render(phrases()[idx]);
    });

    if (reduceMotion) { slogan.classList.add("is-in"); return; }

    function settle() {
      slogan.classList.remove("is-out");
      void slogan.offsetWidth;
      slogan.classList.add("is-in");
    }
    function advance() {
      slogan.classList.remove("is-in");
      slogan.classList.add("is-out");
      setTimeout(function () {
        idx = (idx + 1) % phrases().length;
        slogan.innerHTML = render(phrases()[idx]);
        settle();
      }, 480);
    }
    // rotate only while in view AND motion isn't paused (pause toggle → picpong:motion)
    var inView = false;
    var paused = document.body.classList.contains("motion-paused");
    function start() { if (timer || paused) return; settle(); timer = setInterval(advance, 7000); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    document.addEventListener("picpong:motion", function (e) {
      paused = !!(e.detail && e.detail.paused);
      if (paused) stop(); else if (inView) start();
    });

    if (!("IntersectionObserver" in window)) { inView = true; start(); return; }
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { inView = en.isIntersecting; if (inView && !paused) start(); else stop(); });
    }, { threshold: 0.35 });
    sio.observe(slogan);
  })();

  /* ---------- projects + catalog filter + live search: ONE visibility system ----------
     A [data-cat] card is visible IFF it passes BOTH the active filter chip AND
     the search query (projects only). The chip handler and the search input
     both funnel through applyVisibility() - never writing style.display
     independently - so they can't fight (PRD 3 §11). Matches any element
     carrying data-filter (projects .chip; catalog facet sidebar). */
  var activeFilter = "all";
  function applyVisibility(card) {
    var passCat = activeFilter === "all" || card.getAttribute("data-cat") === activeFilter;
    var passSearch = card.getAttribute("data-hidden-by-search") !== "1";
    card.style.display = (passCat && passSearch) ? "" : "none";
  }
  function applyVisibilityAll() { document.querySelectorAll("[data-cat]").forEach(applyVisibility); }

  document.querySelectorAll("[data-filterbar]").forEach(function (bar) {
    bar.addEventListener("click", function (e) {
      var chip = e.target.closest("[data-filter]");
      if (!chip || !bar.contains(chip)) return;
      bar.querySelectorAll("[data-filter]").forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
      chip.setAttribute("aria-pressed", "true");
      activeFilter = chip.getAttribute("data-filter");
      applyVisibilityAll();
    });
    // derive each facet's item count from the real tiles so the numbers can't
    // drift from the grid (only facet buttons that carry a .ct badge, e.g. catalog).
    var tiles = document.querySelectorAll("[data-cat]");
    bar.querySelectorAll("[data-filter]").forEach(function (btn) {
      var ct = btn.querySelector(".ct");
      if (!ct) return;
      var f = btn.getAttribute("data-filter"), n = 0;
      tiles.forEach(function (tl) { if (f === "all" || tl.getAttribute("data-cat") === f) n++; });
      ct.textContent = n;
    });
  });

  /* ---------- generic option toggles (PDP option chips; informational only) ----------
     No price sync any more: chips just reflect the chosen spec visually. */
  document.querySelectorAll("[data-optgroup]").forEach(function (grp) {
    grp.addEventListener("click", function (e) {
      var b = e.target.closest("[data-opt]"); if (!b) return;
      grp.querySelectorAll("[data-opt]").forEach(function (o) { o.setAttribute("aria-pressed", "false"); });
      b.setAttribute("aria-pressed", "true");
    });
  });

  /* ---------- PDP gallery ----------
     Swap ONLY the inner art node (.gallery__main-art), never the whole .media
     wrapper; otherwise the reserved "+" button (.media__more) gets wiped. */
  document.querySelectorAll("[data-gallery]").forEach(function (g) {
    var main = g.querySelector("[data-gallery-main]");
    var art = main && (main.querySelector(".gallery__main-art") || main);
    g.querySelectorAll(".gallery__thumb").forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        g.querySelectorAll(".gallery__thumb").forEach(function (t) { t.setAttribute("aria-current", "false"); });
        thumb.setAttribute("aria-current", "true");
        var src = thumb.querySelector(".gallery__thumb-art") || thumb;
        if (art) art.innerHTML = src.innerHTML;
      });
    });
  });

  /* ---------- accordion ---------- */
  document.querySelectorAll(".acc__btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".acc__item");
      var panel = item.querySelector(".acc__panel");
      var open = item.classList.toggle("open");
      panel.style.maxHeight = open ? panel.scrollHeight + "px" : 0;
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* ---------- newsletter (mock) ---------- */
  document.querySelectorAll("[data-newsletter]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector("input");
      var he = document.documentElement.getAttribute("lang") === "he";
      var who = (input.value.split("@")[0] || "");
      toast(he ? "תודה! נהיה בקשר <b>" + who + "</b>" : "Thanks! We'll be in touch <b>" + who + "</b>");
      form.reset();
    });
  });

  /* quote-form behaviour now lives in the LEAD-CAPTURE MODULE above
     (validateLead / submitLead / bindLeadForm) - shared by the inline #contact
     form and the injected drawer form. */

  /* ---------- live project search (PRD 3 §7) ----------
     Type-to-filter over the rendered tiles; indexes client + title + category
     in the ACTIVE language (textContent already reflects it after applyLang),
     case/diacritic-insensitive (Latin diacritics + Hebrew niqqud stripped).
     Composes with the chips through the shared applyVisibility(). */
  function normText(s) {
    return String(s).toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")  // Latin diacritics
      .replace(/[֑-ׇ]/g, "")                   // Hebrew niqqud / cantillation
      .replace(/\s+/g, " ").trim();
  }
  document.querySelectorAll("[data-search]").forEach(function (form) {
    var input = form.querySelector("input");
    if (!input) return;
    var tiles = document.querySelectorAll(".collage-projects .project");
    var empty = document.querySelector("[data-search-empty]");
    var tmr;
    function run() {
      var q = normText(input.value);
      var anyVisible = false;
      tiles.forEach(function (tile) {
        var hay = normText(tile.textContent + " " + (tile.getAttribute("data-cat") || ""));
        var hit = q === "" || hay.indexOf(q) >= 0;
        tile.setAttribute("data-hidden-by-search", hit ? "0" : "1");
        applyVisibility(tile);
        if (tile.style.display !== "none") anyVisible = true;
      });
      if (empty) empty.hidden = !(q !== "" && !anyVisible);
    }
    form.addEventListener("submit", function (e) { e.preventDefault(); run(); });
    input.addEventListener("input", function () { clearTimeout(tmr); tmr = setTimeout(run, 120); });
  });

  /* ---------- on-arrival highlight (PRD 3 §4.5) ----------
     A shared link lands as <page>#item-<id>. Find the item, FORCE it visible
     (reset chips + search so a filtered-out target can't silently no-op),
     scroll it to centre, spotlight + label it, and - for an image-level id on a
     page that owns the lightbox - open that frame. Unknown id = clean no-op. */
  (function arrivalHighlight() {
    var PREFIX = "#item-";
    var handled = null;     // last hash acted on - idempotent across load/hashchange
    var activeClear = null; // tears down the current spotlight before a new one

    function findNode(id) {
      var hit = null;
      document.querySelectorAll("[data-media-id]").forEach(function (el) {
        if (!hit && el.getAttribute("data-media-id") === id) hit = el;
      });
      return hit;
    }

    function run() {
      // read the hash FRESH each call - capturing it at script-eval time races
      // the navigation commit on data-driven pages (detail gallery injected late).
      var hash = location.hash || "";
      if (hash.indexOf(PREFIX) !== 0) return;
      if (hash === handled) return;
      var id = decodeURIComponent(hash.slice(PREFIX.length));
      if (!id) return;
      var node = findNode(id);
      if (!node) return; // unknown / not-on-this-page id → clean no-op
      handled = hash;
      if (activeClear) activeClear(); // retire any previous spotlight first

      // force-reveal: undo any chip filter or search query hiding the target
      activeFilter = "all";
      document.querySelectorAll("[data-filterbar] [data-filter]").forEach(function (c) {
        c.setAttribute("aria-pressed", c.getAttribute("data-filter") === "all" ? "true" : "false");
      });
      document.querySelectorAll("[data-search] input").forEach(function (i) { i.value = ""; });
      document.querySelectorAll("[data-cat]").forEach(function (card) {
        card.removeAttribute("data-hidden-by-search"); applyVisibility(card);
      });
      var emptyEl = document.querySelector("[data-search-empty]"); if (emptyEl) emptyEl.hidden = true;

      var target = node.closest(".project, .media, .feed-card, .product-card, article") || node;
      var zoom = node.closest("[data-zoom]"); // image-level lives inside a lightbox-able .media
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
      spotlight(target);
      if (zoom) { try { zoom.click(); } catch (e) {} } // open the lightbox on that frame
    }

    function spotlight(target) {
      target.classList.add("is-spotlit");
      var tag = document.createElement("span");
      tag.className = "spotlight-tag";
      tag.textContent = t("Here's the piece you asked about", "זה הפריט שביקשתם לראות");
      target.appendChild(tag);
      var veil = document.createElement("div");
      veil.className = "spotlight-veil";
      document.body.appendChild(veil);
      requestAnimationFrame(function () { veil.classList.add("is-out"); });
      setTimeout(function () { if (veil.parentNode) veil.parentNode.removeChild(veil); }, 1500);

      function clear() {
        target.classList.remove("is-spotlit");
        if (tag.parentNode) tag.parentNode.removeChild(tag);
        if (veil.parentNode) veil.parentNode.removeChild(veil);
        document.removeEventListener("keydown", onKey);
        document.removeEventListener("click", onClick, true);
        if (activeClear === clear) activeClear = null;
      }
      function onKey(e) { if (e.key === "Escape") clear(); }
      function onClick() { clear(); } // first deliberate click dismisses the spotlight
      activeClear = clear;
      document.addEventListener("keydown", onKey);
      setTimeout(function () { document.addEventListener("click", onClick, true); }, 700);
    }

    // run once layout + any data-driven galleries are in place, and on later hash changes
    if (document.readyState === "complete") run();
    else window.addEventListener("load", run);
    window.addEventListener("hashchange", function () { handled = null; run(); });
  })();

  /* ---------- Latest strip: mobile "swipe for more" cue ----------
     Auto-hides after the first scroll (or if the strip doesn't overflow).
     Tapping it advances ~one card, direction-aware for LTR/RTL. */
  (function () {
    var scroller = document.querySelector(".latest-strip__scroller");
    if (!scroller) return;
    var row = scroller.querySelector(".latest-strip__row");
    var cue = scroller.querySelector("[data-strip-cue]");
    if (!row || !cue) return;

    var retired = false;
    function retire() { retired = true; scroller.classList.add("is-scrolled"); }

    // Nothing to scroll (wide screens / few cards) -> no cue.
    function syncOverflow() {
      if (row.scrollWidth - row.clientWidth <= 8) retire();
    }
    syncOverflow();
    window.addEventListener("resize", syncOverflow);

    // Retire on a real user scroll. Measure distance from the resting position,
    // NOT absolute scrollLeft: in RTL (and with scroll-snap) the row rests at a
    // non-zero scrollLeft and fires a scroll event on load, which must not count.
    var restLeft = row.scrollLeft;
    row.addEventListener("scroll", function () {
      if (retired) return;
      if (Math.abs(row.scrollLeft - restLeft) > 48) retire();
    }, { passive: true });

    cue.addEventListener("click", function () {
      var rtl = document.documentElement.getAttribute("dir") === "rtl";
      var amt = Math.round(row.clientWidth * 0.85);
      row.scrollBy({ left: rtl ? -amt : amt, behavior: "smooth" });
      retire();
    });
  })();
})();
