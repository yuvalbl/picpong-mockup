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
          '<img src="assets/brand/puffer.svg" alt="" />' +
          '<p class="h4" style="font-family:Fraunces;margin:0 0 .4rem">Nothing in here yet</p>' +
          '<p class="meta">The pufferfish stays flat until you add something.</p>' +
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

  /* ---------- scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

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
    });
  });

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

  render();
})();
