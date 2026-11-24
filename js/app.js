// OffAir website: small progressive touches. Every page reads fine without it.
(function () {
  "use strict";

  var root = document.documentElement;

  // Theme: the visitor's pick (remembered), else the system preference.
  var toggle = document.querySelector("[data-theme-toggle]");
  function current() {
    var set = root.getAttribute("data-theme");
    if (set) return set;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "day" : "night";
  }
  function label() {
    if (!toggle) return;
    var next = current() === "day" ? "night" : "day";
    toggle.setAttribute("aria-label", next === "day" ? "Switch to daylight theme" : "Switch to night theme");
  }
  if (toggle) {
    label();
    toggle.addEventListener("click", function () {
      var next = current() === "day" ? "night" : "day";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("offair-theme", next);
      } catch (e) {}
      label();
    });
  }

  // App bar edge once the page scrolls under it.
  var bar = document.querySelector(".appbar");
  if (bar) {
    var onScroll = function () {
      bar.classList.toggle("scrolled", window.scrollY > 4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Shelf filter chips, like the hub's.
  var chips = document.querySelectorAll("[data-filter]");
  var carts = document.querySelectorAll(".cart[data-cat]");
  var count = document.querySelector("[data-count]");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var cat = chip.getAttribute("data-filter");
      var shown = 0;
      chips.forEach(function (c) {
        c.setAttribute("aria-pressed", c === chip ? "true" : "false");
      });
      carts.forEach(function (cart) {
        var on = cat === "all" || cart.getAttribute("data-cat") === cat;
        cart.hidden = !on;
        if (on) shown++;
      });
      if (count) count.textContent = shown === 1 ? "1 game" : shown + " games";
    });
  });

  // Footer year.
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
