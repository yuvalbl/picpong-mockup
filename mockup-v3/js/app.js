/* ============================================================
   PICPONG — mockup-v1 — shared behaviour
   Cart (localStorage) · drawer · mobile menu · scroll reveal ·
   projects filter · PDP gallery/options/accordion.
   No dependencies. Respects prefers-reduced-motion via CSS.
   ============================================================ */
(function () {
  "use strict";

  var STORE = "picpong_cart_v1";
  var fmt = function (n) { return "$" + n.toLocaleString("en-US"); };

  /* ---------- cart state ---------- */
  function read() {
    try { return JSON.parse(localStorage.getItem(STORE)) || []; }
    catch (e) { return []; }
  }
  function write(items) {
    try { localStorage.setItem(STORE, JSON.stringify(items)); } catch (e) {}
    render();
  }
  function add(item) {
    var items = read();
    var found = items.find(function (i) { return i.id === item.id; });
    if (found) { found.qty += item.qty || 1; }
    else { items.push({ id: item.id, name: item.name, meta: item.meta || "", price: item.price, qty: item.qty || 1 }); }
    write(items);
  }
  function setQty(id, qty) {
    var items = read().map(function (i) { return i.id === id ? Object.assign(i, { qty: qty }) : i; })
      .filter(function (i) { return i.qty > 0; });
    write(items);
  }
  function remove(id) { write(read().filter(function (i) { return i.id !== id; })); }
  function count() { return read().reduce(function (s, i) { return s + i.qty; }, 0); }
  function total() { return read().reduce(function (s, i) { return s + i.qty * i.price; }, 0); }

  /* ---------- tiny cardboard art (for cart line thumbs) ---------- */
  var THUMB = '<svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><rect width="56" height="56" fill="#e6d9c4"/><g stroke="#b98c52" stroke-width="1.4" opacity="0.6"><path d="M0 20h56M0 36h56"/></g><rect x="16" y="14" width="24" height="28" fill="#cfa46a"/><path d="M16 14h24v6H16z" fill="#bb8c4f"/></svg>';

  /* inline pufferfish (animatable in empty-cart state) */
  var PUFFER = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="puffing" style="width:84px;height:84px"><g fill="#E45C01"><g transform="rotate(0 50 50)"><polygon points="44,24 56,24 50,8"/></g><g transform="rotate(30 50 50)"><polygon points="44,24 56,24 50,8"/></g><g transform="rotate(60 50 50)"><polygon points="44,24 56,24 50,8"/></g><g transform="rotate(90 50 50)"><polygon points="44,24 56,24 50,8"/></g><g transform="rotate(120 50 50)"><polygon points="44,24 56,24 50,8"/></g><g transform="rotate(150 50 50)"><polygon points="44,24 56,24 50,8"/></g><g transform="rotate(180 50 50)"><polygon points="44,24 56,24 50,8"/></g><g transform="rotate(210 50 50)"><polygon points="44,24 56,24 50,8"/></g><g transform="rotate(240 50 50)"><polygon points="44,24 56,24 50,8"/></g><g transform="rotate(270 50 50)"><polygon points="44,24 56,24 50,8"/></g><g transform="rotate(300 50 50)"><polygon points="44,24 56,24 50,8"/></g><g transform="rotate(330 50 50)"><polygon points="44,24 56,24 50,8"/></g></g><circle cx="50" cy="52" r="29" fill="#E67A2F"/><path d="M30 60 a23 23 0 0 0 40 0 a26 26 0 0 1 -40 0 z" fill="#F58729" opacity="0.6"/><path d="M66 56 q12 4 11 12 q-9 -1 -14 -7 z" fill="#E45C01"/><circle cx="42" cy="46" r="9" fill="#fff"/><circle cx="43.5" cy="47" r="5" fill="#2A9BD0"/><circle cx="45" cy="45.5" r="1.8" fill="#0e2a33"/><circle cx="40.5" cy="44" r="1.6" fill="#fff"/><path d="M52 62 q6 6 12 1" fill="none" stroke="#7a3209" stroke-width="2.4" stroke-linecap="round"/></svg>';

  /* ---------- render cart UI ---------- */
  function render() {
    var c = count();
    document.querySelectorAll(".cart-count").forEach(function (el) {
      el.textContent = c;
      el.classList.toggle("show", c > 0);
    });
    var list = document.getElementById("cartItems");
    if (!list) return;
    var items = read();
    if (!items.length) {
      list.innerHTML =
        '<div class="drawer__empty">' +
          PUFFER +
          '<p class="h4" style="font-family:Fraunces;margin:.4rem 0">Nothing in here yet</p>' +
          '<p class="meta">Add a piece and the pufferfish puffs up.</p>' +
        "</div>";
    } else {
      list.innerHTML = items.map(function (i) {
        return (
          '<div class="cart-line">' +
            '<div class="cart-line__art">' + THUMB + "</div>" +
            "<div>" +
              '<div class="cart-line__name">' + i.name + "</div>" +
              (i.meta ? '<div class="cart-line__meta">' + i.meta + "</div>" : "") +
              '<div class="qty" data-id="' + i.id + '">' +
                '<button data-act="dec" aria-label="Decrease">&minus;</button>' +
                "<span>" + i.qty + "</span>" +
                '<button data-act="inc" aria-label="Increase">+</button>' +
              "</div>" +
            "</div>" +
            "<div style=\"text-align:right\">" +
              '<div class="cart-line__price">' + fmt(i.price * i.qty) + "</div>" +
              '<button class="cart-line__remove" data-remove="' + i.id + '">Remove</button>' +
            "</div>" +
          "</div>"
        );
      }).join("");
    }
    var t = document.getElementById("cartTotal");
    if (t) t.textContent = fmt(total());
    var foot = document.getElementById("cartFoot");
    if (foot) foot.style.display = items.length ? "" : "none";
  }

  /* ---------- drawer open/close ---------- */
  function openCart() {
    var d = document.getElementById("drawer"), s = document.getElementById("scrim");
    if (d) d.classList.add("open");
    if (s) s.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    var d = document.getElementById("drawer"), s = document.getElementById("scrim");
    if (d) d.classList.remove("open");
    if (s) s.classList.remove("open");
    document.body.style.overflow = "";
  }

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

  /* ---------- wire up ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-add]");
    if (t) {
      e.preventDefault();
      add({
        id: t.getAttribute("data-add"),
        name: t.getAttribute("data-name"),
        meta: t.getAttribute("data-meta") || "",
        price: parseFloat(t.getAttribute("data-price")) || 0,
        qty: parseInt(t.getAttribute("data-qty"), 10) || 1
      });
      var badge = document.querySelector(".cart-count");
      if (badge) { badge.classList.remove("pulse"); void badge.offsetWidth; badge.classList.add("pulse"); }
      // pufferfish inflates when something lands in the cart (mascot with a job)
      var mark = document.querySelector(".brand__mark");
      if (mark) { mark.classList.remove("puffing"); void mark.offsetWidth; mark.classList.add("puffing"); }
      toast("Added <b>" + t.getAttribute("data-name") + "</b> to cart");
      if (t.hasAttribute("data-open")) openCart();
      return;
    }
    if (e.target.closest("[data-cart-open]")) { e.preventDefault(); openCart(); return; }
    if (e.target.closest("[data-cart-close]")) { e.preventDefault(); closeCart(); return; }

    var rm = e.target.closest("[data-remove]");
    if (rm) { remove(rm.getAttribute("data-remove")); return; }

    var q = e.target.closest(".qty button");
    if (q) {
      var wrap = q.closest(".qty"); var id = wrap.getAttribute("data-id");
      var item = read().find(function (i) { return i.id === id; });
      if (item) setQty(id, item.qty + (q.getAttribute("data-act") === "inc" ? 1 : -1));
      return;
    }
  });

  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeCart(); closeMenu(); } });

  /* ---------- mobile menu ---------- */
  function openMenu() { var m = document.getElementById("mobileMenu"); if (m) { m.classList.add("open"); document.body.style.overflow = "hidden"; } }
  function closeMenu() { var m = document.getElementById("mobileMenu"); if (m) { m.classList.remove("open"); document.body.style.overflow = ""; } }
  var mb = document.getElementById("menuBtn"); if (mb) mb.addEventListener("click", openMenu);
  var mc = document.getElementById("menuClose"); if (mc) mc.addEventListener("click", closeMenu);
  document.querySelectorAll("#mobileMenu a").forEach(function (a) { a.addEventListener("click", closeMenu); });

  /* ---------- motion preference ---------- */
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* draw-on: stroke the SVG doodles inside a revealed .draw tile.
     Driven from JS (inline) for reliability across the cascade. */
  var DRAW_EASE = "cubic-bezier(0.62,0.37,0.1,0.95)";
  function drawDoodles(el) {
    var ps = el.querySelectorAll("[pathLength]");
    ps.forEach(function (p, i) {
      if (reduceMotion) { p.style.strokeDashoffset = "0"; return; }
      p.style.animation = "drawOn 1.05s " + DRAW_EASE + " " + Math.min(i * 0.05, 0.5).toFixed(2) + "s forwards";
    });
  }

  /* ---------- scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  function revealEl(el) { el.classList.add("in"); if (el.classList.contains("draw")) drawDoodles(el); }
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
        // progress: -1 (below viewport) → 1 (above), 0 at center
        var prog = ((r.top + r.height / 2) - vh / 2) / vh;
        var f = parseFloat(el.getAttribute("data-parallax")) || 0;
        var shift = -prog * f * 100; // px; small factors keep it subtle
        el.style.transform = "translate3d(0," + shift.toFixed(1) + "px,0)";
      });
      ticking = false;
    };
    var onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(applyParallax); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
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

    // restart the active bar's fill from 0 (reflow forces the reset); earlier bars stay full
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

    if (reduceMotion) { // hold first slide, fill bars, no cycling
      bars.forEach(function (b) { b.classList.add("is-done"); });
      return;
    }
    runBar(0);

    var i = 0;
    setInterval(function () {
      var prev = i;
      i = (i + 1) % slides.length;
      // the outgoing frame sits one layer down so the incoming wipe reveals
      // over the *previous* image (not the tile background) — no edge flash
      slides.forEach(function (s) { s.classList.remove("is-prev"); });
      slides[prev].classList.remove("is-active");
      slides[prev].classList.add("is-prev");
      slides[i].classList.add("is-active");
      runBar(i);
      var s = slides[i];
      if (card && s.dataset.k) {
        // defer the caption swap to the NEXT frame so its forced layout reads
        // (offsetWidth) don't pile onto the same tick as the slide cut — keeps
        // the wipe frame from dropping. The cut itself is pure class toggles.
        requestAnimationFrame(function () {
          var oldW = card.offsetWidth;          // lock the current box width
          card.style.width = oldW + "px";
          card.classList.add("is-swapping");    // text lifts + fades out
          setTimeout(function () {
            if (cardK) cardK.textContent = s.dataset.k;
            if (cardM) cardM.textContent = s.dataset.m || "";
            // measure the new natural width, then ease the box from old → new.
            // (all synchronous, so the browser never paints the auto-width frame)
            card.style.width = "auto";
            var newW = card.offsetWidth;
            card.style.width = oldW + "px";
            void card.offsetWidth;              // reflow so the transition catches
            card.style.width = newW + "px";
            card.classList.remove("is-swapping"); // text settles back in
          }, 300);
        });
      }
    }, SLIDE_MS);
  });

  /* ---------- dynamic slogan: rotating phrases + highlighter sweep ----------
     One phrase shows for ~7s, then lifts away and the next settles in. Marked
     words get a hand-drawn marker sweep, alternating ping-pong orange / coral.
     Pauses when scrolled out of view so it never runs unseen. */
  (function () {
    var slogan = document.querySelector("[data-slogan-cycle]");
    if (!slogan) return;

    // Each phrase = array of line HTML. Markers alternate orange / coral.
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
      void slogan.offsetWidth; // reflow → restart the line-settle/sweep animations
      slogan.classList.add("is-in");
    }
    function advance() {
      slogan.classList.remove("is-in");
      slogan.classList.add("is-out");
      setTimeout(function () {
        idx = (idx + 1) % PHRASES.length;
        slogan.innerHTML = render(PHRASES[idx]);
        settle();
      }, 480); // covers the .is-out lift (transition + stagger)
    }
    function start() { if (timer) return; settle(); timer = setInterval(advance, 7000); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    if (!("IntersectionObserver" in window)) { start(); return; }
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { start(); } else { stop(); } });
    }, { threshold: 0.35 });
    sio.observe(slogan);
  })();

  /* ---------- projects filter ---------- */
  document.querySelectorAll("[data-filterbar]").forEach(function (bar) {
    bar.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip"); if (!chip) return;
      bar.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
      chip.setAttribute("aria-pressed", "true");
      var f = chip.getAttribute("data-filter");
      document.querySelectorAll("[data-cat]").forEach(function (card) {
        var show = f === "all" || card.getAttribute("data-cat") === f;
        card.style.display = show ? "" : "none";
      });
    });
  });

  /* ---------- generic option toggles (PDP, swatches) ---------- */
  document.querySelectorAll("[data-optgroup]").forEach(function (grp) {
    grp.addEventListener("click", function (e) {
      var b = e.target.closest("[data-opt]"); if (!b) return;
      grp.querySelectorAll("[data-opt]").forEach(function (o) { o.setAttribute("aria-pressed", "false"); });
      b.setAttribute("aria-pressed", "true");
      syncPdp();
    });
  });

  /* ---------- PDP: reflect chosen options in price, meta + add button ---------- */
  function syncPdp() {
    var add = document.getElementById("pdpAdd");
    if (!add) return;
    var base = parseFloat(add.getAttribute("data-base") || add.getAttribute("data-price")) || 0;
    var extra = 0, parts = [];
    document.querySelectorAll("[data-optgroup]").forEach(function (grp) {
      var sel = grp.querySelector('[data-opt][aria-pressed="true"]');
      if (!sel) return;
      extra += parseFloat(sel.getAttribute("data-delta")) || 0;
      parts.push(sel.getAttribute("data-short") || sel.textContent.trim());
    });
    var price = base + extra;
    add.setAttribute("data-price", price);
    add.setAttribute("data-meta", parts.join(" · "));
    var priceEl = document.getElementById("pdpPrice");
    if (priceEl) priceEl.firstChild.textContent = "$" + price + " ";
  }
  syncPdp();

  /* ---------- PDP stepper ---------- */
  var stepper = document.getElementById("pdpStepper");
  if (stepper) {
    var span = stepper.querySelector("span");
    stepper.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      var v = parseInt(span.textContent, 10) + (b.getAttribute("data-act") === "inc" ? 1 : -1);
      v = Math.max(1, v); span.textContent = v;
      var addBtn = document.getElementById("pdpAdd");
      if (addBtn) addBtn.setAttribute("data-qty", v);
    });
  }

  /* ---------- PDP gallery ---------- */
  document.querySelectorAll("[data-gallery]").forEach(function (g) {
    var main = g.querySelector("[data-gallery-main]");
    g.querySelectorAll(".gallery__thumb").forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        g.querySelectorAll(".gallery__thumb").forEach(function (t) { t.setAttribute("aria-current", "false"); });
        thumb.setAttribute("aria-current", "true");
        if (main) main.innerHTML = thumb.innerHTML;
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
      toast("Thanks — we'll be in touch <b>" + (input.value.split("@")[0] || "") + "</b>");
      form.reset();
    });
  });

  /* ---------- quote form (the real custom-project funnel, mock submit) ---------- */
  document.querySelectorAll("[data-quote]").forEach(function (form) {
    form.addEventListener("click", function (e) {
      var chip = e.target.closest(".qf-chip"); if (!chip) return;
      e.preventDefault();
      chip.setAttribute("aria-pressed", chip.getAttribute("aria-pressed") === "true" ? "false" : "true");
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (form.querySelector('[name="name"]') || {}).value || "there";
      toast("Brief received, <b>" + name.split(" ")[0] + "</b> — we'll reply within 1 working day");
      form.reset();
      form.querySelectorAll('.qf-chip').forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
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

  render();
})();
