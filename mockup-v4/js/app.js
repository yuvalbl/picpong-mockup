/* ============================================================
   PICPONG · mockup-v4 · shared behaviour
   Commerce REMOVED (cart/localStorage/drawer/stepper/PDP price-sync).
   Kept: mobile menu · scroll reveal · count-up · toast · slideshow ·
   parallax · slogan rotation · filter bar · accordion · gallery ·
   doodle draw.
   Added (structural): language switch (lang/dir flip + copy swap),
   inert media "+" and contact-fab triggers (real behaviour = PRD 2).
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
    applyLang(stored === "he" ? "he" : "en");
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
      tag: { en: "Exhibition", he: "תערוכה" },
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
      tag: { en: "Exhibition", he: "תערוכה" },
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
      tag: { en: "Exhibition", he: "תערוכה" },
      eyebrow: { en: "Meet&Mind · Exhibition", he: "מיט אנד מיינד · תערוכה" },
      title: { en: "Exhibition presence", he: "נוכחות בתערוכה" },
      subtitle: { en: "A full exhibition presence built from recycled X-Board, designed, printed and installed in-house.", he: "נוכחות תערוכה מלאה הבנויה מ-X-Board ממוחזר, מעוצבת, מודפסת ומותקנת בבית." },
      images: ["meetmind.jpg", "landa.jpg"]
    }
  };
  var PROJECT_ORDER = Object.keys(PROJECTS);

  function mediaMoreBtn(id, title, thumb) {
    return '<button class="media__more" type="button" aria-label="Request a quote on a build like this"' +
      ' data-media-id="' + id + '" data-media-title="' + title.replace(/"/g, "&quot;") + '"' +
      ' data-media-thumb="' + thumb + '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>';
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
    document.title = titleEn + ": X-Board build | PicPong.biz Projects";

    // lead image (hero, two-column); first image
    var heroMedia = document.querySelector("[data-project-hero-media]");
    var lead = p.images[0];
    if (heroMedia) {
      heroMedia.innerHTML =
        '<img src="' + IMG + lead + '" alt="' + titleEn + ' built from X-Board" loading="eager" />' +
        '<span class="hero__media-tag" data-en="From the Picpong archive" data-he="מארכיון Picpong">From the Picpong archive</span>' +
        mediaMoreBtn("proj-" + slug + "-hero", p.eyebrow.en, IMG + lead);
    }

    // compact thumbnail gallery; remaining images (or all if only one)
    var galleryImgs = p.images.length > 1 ? p.images.slice(1) : p.images;
    var html = "";
    galleryImgs.forEach(function (file, i) {
      html +=
        '<div class="media" data-media data-zoom="' + IMG + file + '" role="button" tabindex="0"' +
        ' aria-label="Enlarge image">' +
        '<img src="' + IMG + file + '" alt="' + titleEn + ', detail ' + (i + 1) + '" loading="lazy" />' +
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
     thumbnail click/Enter → show larger image; Esc / backdrop / × → close. */
  (function lightbox() {
    var dlg = document.getElementById("lightbox");
    if (!dlg || typeof dlg.showModal !== "function") return;
    var img = document.getElementById("lightboxImg");
    var closeBtn = document.getElementById("lightboxClose");

    function open(src, alt) {
      img.src = src; img.alt = alt || "";
      dlg.showModal();
    }
    function close() { if (dlg.open) dlg.close(); }

    // open on thumbnail click (but NOT when the "+" button is pressed)
    document.addEventListener("click", function (e) {
      if (e.target.closest(".media__more")) return;
      var zoom = e.target.closest("[data-zoom]");
      if (!zoom) return;
      e.preventDefault();
      var thumb = zoom.querySelector("img");
      open(zoom.getAttribute("data-zoom"), thumb ? thumb.alt : "");
    });
    // keyboard open (Enter/Space on focused thumb)
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var zoom = e.target.closest && e.target.closest("[data-zoom]");
      if (!zoom) return;
      e.preventDefault();
      var thumb = zoom.querySelector("img");
      open(zoom.getAttribute("data-zoom"), thumb ? thumb.alt : "");
    });
    if (closeBtn) closeBtn.addEventListener("click", close);
    // backdrop click closes (click landing on the dialog element itself = backdrop)
    dlg.addEventListener("click", function (e) { if (e.target === dlg) close(); });
    dlg.addEventListener("close", function () { img.src = ""; });
  })();

  /* ---------- inert "+" media trigger + floating contact trigger ----------
     Behaviour ships in PRD 2 (quote capture w/ thumbnail). Here: placeholder. */
  document.addEventListener("click", function (e) {
    var more = e.target.closest(".media__more");
    if (more) {
      e.preventDefault();
      var added = more.classList.toggle("is-added");
      var path = more.querySelector("path");
      var label = more.querySelector(".media__more__label");
      var he = document.documentElement.getAttribute("lang") === "he";

      if (added) {
        if (path) path.setAttribute("d", "M20 6L9 17l-5-5");
        if (label) {
          label.setAttribute("data-en", "Added");
          label.setAttribute("data-he", "נוסף");
          label.textContent = he ? "נוסף" : "Added";
        }
        toast(he ? "נוסף להצעת המחיר" : "Added to quote");
      } else {
        if (path) path.setAttribute("d", "M12 5v14M5 12h14");
        if (label) {
          label.setAttribute("data-en", "I want this");
          label.setAttribute("data-he", "אני רוצה כזה");
          label.textContent = he ? "אני רוצה כזה" : "I want this";
        }
      }
      return;
    }
    var fab = e.target.closest(".contact-fab");
    if (fab) {
      e.preventDefault();
      var heF = document.documentElement.getAttribute("lang") === "he";
      toast(heF ? "טופס יצירת קשר צף: בקרוב (PRD 2)" : "Floating contact form: coming in PRD 2");
      return;
    }
  });

  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeMenu(); } });

  /* ---------- mobile menu ---------- */
  function openMenu() { var m = document.getElementById("mobileMenu"); if (m) { m.classList.add("open"); document.body.style.overflow = "hidden"; } }
  function closeMenu() { var m = document.getElementById("mobileMenu"); if (m) { m.classList.remove("open"); document.body.style.overflow = ""; } }
  var mb = document.getElementById("menuBtn"); if (mb) mb.addEventListener("click", openMenu);
  var mc = document.getElementById("menuClose"); if (mc) mc.addEventListener("click", closeMenu);
  document.querySelectorAll("#mobileMenu a").forEach(function (a) { a.addEventListener("click", closeMenu); });

  /* ---------- motion preference ---------- */
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    runBar(0);

    setInterval(function () {
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
    }, SLIDE_MS);
  });

  /* ---------- dynamic slogan: rotating phrases + highlighter sweep ---------- */
  (function () {
    var slogan = document.querySelector("[data-slogan-cycle]");
    if (!slogan) return;

    // 3 bilingual slogans, each 4 lines, two highlight spans (orange = the bold/
    // standing word, coral = the vanishing word). Hebrew is native marketing copy,
    // not a literal translation; it carries the same "striking presence, no trace"
    // paradox in idiomatic, denser Hebrew that rhymes/parallels for a native ear.
    var PHRASES = {
      en: [
        ['<span class="mark mark--orange">Remarkable</span>', 'events, made', 'to impact.', '<span class="mark mark--coral">no trace.</span>'],
        ['Built to', 'be <span class="mark mark--orange">seen</span>,', 'designed', 'to <span class="mark mark--coral">vanish.</span>'],
        ['Bold while', 'it <span class="mark mark--orange">stands.</span>', 'Gentle', 'when it <span class="mark mark--coral">goes.</span>']
      ],
      he: [
        ['<span class="mark mark--orange">חותם</span>', 'שנשאר', 'גם כשהכל', '<span class="mark mark--coral">כבר נעלם.</span>'],
        ['נבנה', '<span class="mark mark--orange">לבלוט</span>,', 'ונועד', '<span class="mark mark--coral">להיעלם.</span>'],
        ['נועז', 'כשהוא <span class="mark mark--orange">עומד.</span>', 'עדין', 'כשהוא <span class="mark mark--coral">הולך.</span>']
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
    function start() { if (timer) return; settle(); timer = setInterval(advance, 7000); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    if (!("IntersectionObserver" in window)) { start(); return; }
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { start(); } else { stop(); } });
    }, { threshold: 0.35 });
    sio.observe(slogan);
  })();

  /* ---------- projects + catalog filter ----------
     Matches any element carrying data-filter (projects uses .chip; the catalog
     facet sidebar uses .chip-text / plain <button data-filter>). Keying off
     [data-filter] makes both bars work with one handler. */
  document.querySelectorAll("[data-filterbar]").forEach(function (bar) {
    bar.addEventListener("click", function (e) {
      var chip = e.target.closest("[data-filter]");
      if (!chip || !bar.contains(chip)) return;
      bar.querySelectorAll("[data-filter]").forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
      chip.setAttribute("aria-pressed", "true");
      var f = chip.getAttribute("data-filter");
      document.querySelectorAll("[data-cat]").forEach(function (card) {
        var show = f === "all" || card.getAttribute("data-cat") === f;
        card.style.display = show ? "" : "none";
      });
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

  /* ---------- quote form (mock submit) ---------- */
  document.querySelectorAll("[data-quote]").forEach(function (form) {
    form.addEventListener("click", function (e) {
      var chip = e.target.closest(".qf-chip"); if (!chip) return;
      e.preventDefault();
      chip.setAttribute("aria-pressed", chip.getAttribute("aria-pressed") === "true" ? "false" : "true");
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (form.querySelector('[name="name"]') || {}).value || "there";
      var he = document.documentElement.getAttribute("lang") === "he";
      var first = name.split(" ")[0];
      toast(he ? "הבריף התקבל, <b>" + first + "</b>. נחזור אליך תוך יום עסקים" : "Brief received, <b>" + first + "</b>. We'll reply within 1 working day");
      form.reset();
      form.querySelectorAll('.qf-chip').forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
    });
  });

  /* ---------- project search field (inert this PRD; behaviour = PRD 3) ---------- */
  document.querySelectorAll("[data-search]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // BUILD NOTE: live project search ships in PRD 3 (filter the collage by query).
      var he = document.documentElement.getAttribute("lang") === "he";
      toast(he ? "חיפוש פרויקטים: בקרוב (PRD 3)" : "Project search: coming in PRD 3");
    });
  });
})();
