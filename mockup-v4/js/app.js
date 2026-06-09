/* ============================================================
   PICPONG — mockup-v4 — shared behaviour
   Commerce REMOVED (cart/localStorage/drawer/stepper/PDP price-sync).
   Kept: mobile menu · scroll reveal · count-up · toast · slideshow ·
   parallax · slogan rotation · filter bar · accordion · gallery ·
   back-to-top · doodle draw.
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
      // some nodes carry inline markup (e.g. <b>, <em>) — swap as HTML when flagged
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

  /* ---------- inert "+" media trigger + floating contact trigger ----------
     Behaviour ships in PRD 2 (quote capture w/ thumbnail). Here: placeholder. */
  document.addEventListener("click", function (e) {
    var more = e.target.closest(".media__more");
    if (more) {
      e.preventDefault();
      var heM = document.documentElement.getAttribute("lang") === "he";
      toast(heM ? "לכידת הצעת מחיר — בקרוב (PRD 2)" : "Quote capture — coming in PRD 2");
      return;
    }
    var fab = e.target.closest(".contact-fab");
    if (fab) {
      e.preventDefault();
      var heF = document.documentElement.getAttribute("lang") === "he";
      toast(heF ? "טופס יצירת קשר צף — בקרוב (PRD 2)" : "Floating contact form — coming in PRD 2");
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

    if (reduceMotion) {
      bars.forEach(function (b) { b.classList.add("is-done"); });
      return;
    }
    runBar(0);

    var i = 0;
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
            if (cardK) cardK.textContent = s.dataset.k;
            if (cardM) cardM.textContent = s.dataset.m || "";
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

    var PHRASES = [
      ['<span class="mark mark--orange">Remarkable</span>', 'events, made', 'to impact —', '<span class="mark mark--coral">no trace.</span>'],
      ['Built to', 'be <span class="mark mark--orange">seen</span> —', 'designed', 'to <span class="mark mark--coral">vanish.</span>'],
      ['Bold while', 'it <span class="mark mark--orange">stands.</span>', 'Gentle', 'when it <span class="mark mark--coral">goes.</span>']
    ];

    function render(lines) {
      return lines.map(function (h, n) {
        return '<span class="line" style="--l:' + n + '">' + h + "</span>";
      }).join("");
    }

    slogan.innerHTML = render(PHRASES[0]);
    if (reduceMotion) { slogan.classList.add("is-in"); return; }

    var idx = 0, timer = null;

    function settle() {
      slogan.classList.remove("is-out");
      void slogan.offsetWidth;
      slogan.classList.add("is-in");
    }
    function advance() {
      slogan.classList.remove("is-in");
      slogan.classList.add("is-out");
      setTimeout(function () {
        idx = (idx + 1) % PHRASES.length;
        slogan.innerHTML = render(PHRASES[idx]);
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

  /* ---------- generic option toggles (PDP option chips — informational only) ----------
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
     wrapper — otherwise the reserved "+" button (.media__more) gets wiped. */
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
      toast(he ? "תודה — נהיה בקשר <b>" + who + "</b>" : "Thanks — we'll be in touch <b>" + who + "</b>");
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
      toast(he ? "הבריף התקבל, <b>" + first + "</b> — נחזור אליך תוך יום עסקים" : "Brief received, <b>" + first + "</b> — we'll reply within 1 working day");
      form.reset();
      form.querySelectorAll('.qf-chip').forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
    });
  });

  /* ---------- project search field (inert this PRD — behaviour = PRD 3) ---------- */
  document.querySelectorAll("[data-search]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // BUILD NOTE: live project search ships in PRD 3 (filter the collage by query).
      var he = document.documentElement.getAttribute("lang") === "he";
      toast(he ? "חיפוש פרויקטים — בקרוב (PRD 3)" : "Project search — coming in PRD 3");
    });
  });

  /* ---------- back-to-top — the pufferfish, doing a job ---------- */
  var top = document.getElementById("toTop");
  if (top) {
    var onScroll = function () { top.classList.toggle("show", window.scrollY > 700); };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    top.addEventListener("click", function () {
      var img = top.querySelector("img");
      if (img) { img.classList.remove("puffing"); void img.offsetWidth; img.classList.add("puffing"); }
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
