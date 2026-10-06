/* Small enhancements only. The page reads fine without this file. */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var weeks = Array.prototype.slice.call(document.querySelectorAll("details.week"));

  /* --- open a week when its route cell or a link to it is used --- */
  function openWeek(id) {
    var el = id ? document.getElementById(id) : null;
    if (el && el.tagName === "DETAILS") {
      el.open = true;
      return el;
    }
    return null;
  }

  function fromHash() {
    var el = openWeek(location.hash.slice(1));
    if (el) {
      el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  }
  window.addEventListener("hashchange", fromHash);
  if (location.hash) { fromHash(); }

  Array.prototype.forEach.call(document.querySelectorAll("a[href^='#week-']"), function (a) {
    a.addEventListener("click", function () {
      openWeek(a.getAttribute("href").slice(1));
    });
  });

  /* --- route readout: show the theme of the week under the cursor or focus --- */
  var readout = document.getElementById("route-readout");
  var idle = readout ? readout.getAttribute("data-idle") : "";
  Array.prototype.forEach.call(document.querySelectorAll(".cell"), function (cell) {
    function show() { if (readout) { readout.textContent = cell.getAttribute("data-readout"); } }
    function hide() { if (readout) { readout.textContent = idle; } }
    cell.addEventListener("mouseenter", show);
    cell.addEventListener("focus", show);
    cell.addEventListener("mouseleave", hide);
    cell.addEventListener("blur", hide);
  });

  /* --- expand or collapse every week --- */
  var toggleAll = document.getElementById("toggle-all");
  function syncToggle() {
    if (!toggleAll) { return; }
    var allOpen = weeks.every(function (d) { return d.open; });
    toggleAll.textContent = allOpen ? "Collapse all weeks" : "Expand all weeks";
    toggleAll.setAttribute("aria-expanded", String(allOpen));
  }
  if (toggleAll) {
    toggleAll.addEventListener("click", function () {
      var allOpen = weeks.every(function (d) { return d.open; });
      weeks.forEach(function (d) { d.open = !allOpen; });
      syncToggle();
    });
    weeks.forEach(function (d) { d.addEventListener("toggle", syncToggle); });
    syncToggle();
  }

  /* --- rubric: switch between speaking and writing --- */
  var tool = document.querySelector(".rubric-tool");
  if (tool) {
    var buttons = tool.querySelectorAll(".modes button");
    Array.prototype.forEach.call(buttons, function (btn) {
      btn.addEventListener("click", function () {
        tool.setAttribute("data-mode", btn.getAttribute("data-mode"));
        Array.prototype.forEach.call(buttons, function (b) {
          b.setAttribute("aria-pressed", String(b === btn));
        });
      });
    });
  }

  /* --- highlight the section you are reading in the top navigation --- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav li a"));
  if ("IntersectionObserver" in window && links.length) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && map[entry.target.id]) {
          links.forEach(function (a) { a.removeAttribute("aria-current"); });
          map[entry.target.id].setAttribute("aria-current", "true");
          var list = map[entry.target.id].closest("ul");
          if (list && list.scrollWidth > list.clientWidth) {
            list.scrollLeft = map[entry.target.id].offsetLeft - 16;
          }
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    Object.keys(map).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) { io.observe(sec); }
    });
  }

  /* --- print: open every week so nothing is hidden on paper --- */
  window.addEventListener("beforeprint", function () {
    weeks.forEach(function (d) { d.open = true; });
  });
})();
