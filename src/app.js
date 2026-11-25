(function () {
  "use strict";

  var KB = window.KB, V = window.V;
  var main = document.getElementById("main");
  var state = { dir: "all", q: "" };

  var AUTHORS = {}, CASES = {}, TOOLS = {};
  KB.authors.forEach(function (a) { AUTHORS[a.id] = a; });
  KB.cases.forEach(function (c) { CASES[c.id] = c; });
  KB.tools.forEach(function (t) { TOOLS[t.id] = t; });

  function parseHash() {
    var raw = location.hash.replace(/^#\/?/, "");
    var parts = raw.split("?");
    var seg = parts[0].split("/").filter(Boolean);
    var query = {};
    if (parts[1]) {
      parts[1].split("&").forEach(function (pair) {
        var kv = pair.split("=");
        query[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || "");
      });
    }
    return { seg: seg, query: query };
  }

  function setActiveNav(view) {
    document.querySelectorAll(".topnav a").forEach(function (a) {
      var on = a.getAttribute("data-nav") === view;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  function flash(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.style.outline = "3px solid var(--gold)";
    el.style.outlineOffset = "4px";
    setTimeout(function () { el.scrollIntoView({ block: "center" }); }, 60);
  }

  function render() {
    var route = parseHash();
    var seg = route.seg;
    var view = "path", html = "", title = "Путь Маугли";

    if (!seg.length || seg[0] === "path") {
      html = V.path(); view = "path"; title = "Путь Маугли";
    } else if (seg[0] === "tools") {
      html = V.toolsShell(state); view = "tools"; title = "Инструменты";
    } else if (seg[0] === "tool" && TOOLS[seg[1]]) {
      html = V.tool(TOOLS[seg[1]]); view = "tools"; title = TOOLS[seg[1]].title;
    } else if (seg[0] === "case" && CASES[seg[1]]) {
      html = V.case(CASES[seg[1]]); view = "path"; title = "Кейс " + CASES[seg[1]].num;
    } else if (seg[0] === "archetypes") {
      html = V.archetypes(); view = "archetypes"; title = "Архетипы";
    } else if (seg[0] === "about") {
      html = V.about(); view = "about"; title = "Как пользоваться";
    } else if (seg[0] === "authors") {
      html = V.authors(); view = "authors"; title = "Благодарности";
    } else {
      html = V.notFound(); title = "Не найдено";
    }

    main.innerHTML = html;
    document.title = title === "Путь Маугли"
      ? "Путь Маугли · база знаний клуба менторов"
      : title + " · Путь Маугли";
    setActiveNav(view);
    window.scrollTo(0, 0);

    if (route.query.id && (seg[0] === "authors" || seg[0] === "archetypes")) {
      flash((seg[0] === "authors" ? "author-" : "arch-") + route.query.id);
    }
  }

  function refreshTools() {
    var list = document.getElementById("toolsList");
    if (!list) return;
    list.innerHTML = V.toolsList(state);
    var count = document.getElementById("toolCount");
    if (count) count.textContent = V.toolCountText(state);
    document.querySelectorAll("[data-dir-btn]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-dir-btn") === state.dir ? "true" : "false");
    });
  }

  document.addEventListener("click", function (e) {
    var scrollLink = e.target.closest("[data-scroll]");
    if (scrollLink) {
      e.preventDefault();
      var target = document.getElementById(scrollLink.getAttribute("data-scroll"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (e.target.closest("#printTool")) { window.print(); return; }
    var dirBtn = e.target.closest("[data-dir-btn]");
    if (dirBtn) {
      state.dir = dirBtn.getAttribute("data-dir-btn");
      refreshTools();
    }
  });

  document.addEventListener("input", function (e) {
    if (e.target && e.target.id === "toolSearch") {
      state.q = e.target.value;
      refreshTools();
    }
  });

  document.addEventListener("change", function (e) {
    if (e.target && e.target.id === "toolJump" && e.target.value) {
      location.hash = e.target.value;
    }
  });

  window.addEventListener("hashchange", render);
  render();
})();
