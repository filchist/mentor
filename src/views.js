(function () {
  "use strict";
  var KB = window.KB;

  function idx(list) { var o = {}; list.forEach(function (x) { o[x.id] = x; }); return o; }

  var V = window.V = {
    A: idx(KB.authors), T: idx(KB.tools), C: idx(KB.cases),
    S: idx(KB.stages), D: idx(KB.directions), R: idx(KB.archetypes),
    author: function (id) { return V.A[id] || { name: "—" }; },
    dir: function (id) { return V.D[id] || { title: "—" }; },
    stage: function (id) { return V.S[id] || { num: "—", title: "—" }; },
    iconMentor: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8.2"/><path d="M15.4 8.6l-2 4.8-4.8 2 2-4.8z"/></svg>',
    iconMenti: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M8 2.6c1.6 0 2.9 1.6 2.9 3.5S9.6 9.6 8 9.6 5.1 8 5.1 6.1 6.4 2.6 8 2.6zm8 3.2c1.6 0 2.9 1.6 2.9 3.5s-1.3 3.5-2.9 3.5-2.9-1.6-2.9-3.5 1.3-3.5 2.9-3.5zM6.4 12c2.5 0 4.5 2.3 4.5 5.1s-2 4.3-4.5 4.3S1.9 19.9 1.9 17.1 3.9 12 6.4 12zm11.2 1.6c2.2 0 4 2 4 4.4s-1.8 4-4 4-4-1.7-4-4 1.8-4.4 4-4.4z"/></svg>'
  };

  V.voice = function (kind, label, text) {
    return '<div class="voice voice--' + kind + '"><div class="voice__label">' +
      (kind === "mentor" ? V.iconMentor : V.iconMenti) + label + '</div><p class="voice__text">' + text + '</p></div>';
  };
  V.tags = function (list) {
    return '<div class="tags">' + list.map(function (p) { return '<span class="tag tag--goal">' + p + '</span>'; }).join("") + '</div>';
  };
  V.toolChip = function (id) {
    var t = V.T[id]; if (!t) return "";
    return '<a class="chip" href="#/tool/' + id + '">' + t.title + '</a>';
  };
  V.caseChip = function (id) {
    var c = V.C[id]; if (!c) return "";
    return '<a class="chip chip--case" href="#/case/' + id + '">Кейс ' + c.num + '</a>';
  };
  V.archChip = function (id) {
    var a = V.R[id]; if (!a) return "";
    return '<a class="chip" href="#/archetypes?id=' + id + '">' + a.name + '</a>';
  };
  V.toolMini = function (id) {
    var t = V.T[id]; if (!t) return "";
    return '<a class="mini" href="#/tool/' + id + '"><b>' + t.title + '</b><span>' +
      V.author(t.author).name + ' · ' + V.dir(t.dir).title + '</span></a>';
  };
  V.caseMini = function (id) {
    var c = V.C[id]; if (!c) return "";
    var st = V.stage(c.stage);
    return '<a class="mini" href="#/case/' + id + '"><b>' + c.num + '. ' + c.title + '</b><span>Этап ' +
      st.num + ': ' + st.title + '</span></a>';
  };

  function hero() {
    return '<section class="hero"><div class="wrap hero__in">' +
      '<div class="hero__copy">' +
      '<p class="hero__kicker">Клуб менторов · база знаний</p>' +
      '<h1>Путь Маугли</h1>' +
      '<p class="hero__sub">Из джунглей к людям — через обучение и наставничество</p>' +
      '<p class="hero__lead">Девять шагов Маугли и девять ответных ходов наставника — от Совета скалы до весеннего бега. Выберите клетку: внутри сцена, две позиции и инструменты, которые называли на встречах клуба.</p>' +
      '<div class="hero__stats">' +
      '<div class="hero__stat"><b>' + KB.cases.length + '</b><span>кейсов</span></div>' +
      '<div class="hero__stat"><b>' + KB.tools.length + '</b><span>инструментов</span></div>' +
      '<div class="hero__stat"><b>' + KB.archetypes.length + '</b><span>архетипа</span></div>' +
      '<div class="hero__stat"><b>' + KB.authors.length + '</b><span>авторов</span></div>' +
      '</div>' +
      '<a class="hero__next" href="#board" data-scroll="board">К игровому полю ↓</a>' +
      '</div>' +
      '<figure class="hero__figure"><div class="hero__frame" role="img" aria-label="Гравюра: мальчик и чёрная пантера идут по тропе через джунгли"></div>' +
      '<figcaption>Маугли и Багира. Тропа к людям.</figcaption></figure>' +
      '</div></section>';
  }

  function tile(c) {
    var st = V.stage(c.stage);
    return '<a class="tile tile--' + c.id + '" href="#/case/' + c.id + '" aria-label="Кейс ' + c.num + ': ' + c.title + '">' +
      '<span class="tile__img" aria-hidden="true"></span>' +
      '<span class="tile__num" aria-hidden="true">' + c.num + '</span>' +
      '<span class="tile__body"><span class="tile__stage">Шаг ' + c.num + ' · ' + st.title + '</span>' +
      '<span class="tile__title">' + c.title + '</span>' +
      '<span class="tile__move">Ментор: ' + c.move + '</span>' +
      '<span class="tile__open">Открыть разбор →</span></span></a>';
  }

  function routeStrip() {
    return '<ol class="route">' + KB.stages.map(function (st) {
      var c = KB.cases.filter(function (x) { return x.stage === st.id; })[0];
      return '<li><a href="#/case/' + (c ? c.id : "") + '"><b>' + st.num + '</b><span>' + st.title + '</span></a></li>';
    }).join("") + '</ol>';
  }

  V.path = function () {
    return hero() +
      '<div class="wrap">' +
      '<section class="board-section" id="board">' +
      '<div class="section-head" style="padding-top:30px">' +
      '<p class="eyebrow">Игровое поле · 9 шагов и 9 ходов</p>' +
      '<h2>9 шагов менти и 9 ходов ментора</h2>' +
      '<p>Каждая клетка — шаг Маугли и ответный ход наставника. Номер — шаг менти; под названием сцены — ход ментора. Внутри: две позиции и инструменты.</p>' +
      '</div>' +
      routeStrip() +
      '<div class="board">' + KB.cases.map(tile).join("") + '</div>' +
      '<div class="board-foot"><p>Номер — шаг менти. Внутри — ход ментора, две позиции и инструменты.</p>' +
      '<a class="btn" href="#/archetypes">Архетипы менторов</a></div>' +
      '</section>' +
      '<div class="quick-links">' +
      '<a href="#/about"><b>Ментору</b><span>что смотреть на каждом этапе</span></a>' +
      '<a href="#/about"><b>Менти</b><span>как устроена работа и чего ждать</span></a>' +
      '<a href="#/about"><b>Администратору</b><span>активности и поддержка программы</span></a>' +
      '</div>' +
      '</div>';
  };

  function toolCard(t) {
    return '<article class="tool">' +
      '<div class="tool__top"><span class="tool__dir">' + V.dir(t.dir).title + '</span>' + V.tags(t.purpose) + '</div>' +
      '<h3 class="tool__title"><a href="#/tool/' + t.id + '">' + t.title + '</a></h3>' +
      '<p class="tool__author">Автор: <b>' + V.author(t.author).name + '</b>' + (t.coAuthors.length ? ' · вместе с ' + t.coAuthors.map(function (id) { return V.author(id).name; }).join(", ") : "") + '</p>' +
      '<p class="tool__essence">' + t.essence + '</p>' +
      '<p class="tool__when"><b>Когда:</b> ' + t.when + '</p>' +
      '<div class="tool__body">' +
      '<div class="tool__role"><b>Ментору</b>' + t.mentor + '</div>' +
      '<div class="tool__role tool__role--menti"><b>Менти</b>' + t.menti + '</div>' +
      '</div>' +
      '<div class="tool__foot">' + t.cases.map(V.caseChip).join("") +
      '<a class="tool__more" href="#/tool/' + t.id + '">Разобрать</a></div>' +
      '</article>';
  }

  function matches(t, q) {
    if (!q) return true;
    var hay = (t.title + " " + t.essence + " " + t.when + " " + V.author(t.author).name + " " + t.source).toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  V.toolsShell = function (state) {
    var counts = {};
    KB.tools.forEach(function (t) { counts[t.dir] = (counts[t.dir] || 0) + 1; });
    var side = '<aside class="tools-side">' +
      '<p class="side-title">Направления</p><div class="side-nav">' +
      '<button type="button" data-dir-btn="all" aria-pressed="' + (state.dir === "all") + '">Все <small>' + KB.tools.length + '</small></button>' +
      KB.directions.map(function (d) {
        return '<button type="button" data-dir-btn="' + d.id + '" aria-pressed="' + (state.dir === d.id) + '">' + d.title + ' <small>' + (counts[d.id] || 0) + '</small></button>';
      }).join("") +
      '</div>' +
      '<p class="side-title">Указатель</p>' +
      '<ul class="tool-index">' + KB.tools.map(function (t) { return '<li><a href="#/tool/' + t.id + '">' + t.title + '</a></li>'; }).join("") + '</ul>' +
      '</aside>';

    var options = KB.directions.map(function (d) {
      var list = KB.tools.filter(function (t) { return t.dir === d.id; });
      return '<optgroup label="' + d.title + '">' + list.map(function (t) {
        return '<option value="#/tool/' + t.id + '">' + t.title + '</option>';
      }).join("") + '</optgroup>';
    }).join("");

    var main = '<div class="tools-main">' +
      '<div class="tool-toolbar">' +
      '<label class="tool-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>' +
      '<input id="toolSearch" type="search" placeholder="Найти по названию, цели или автору" value="' + state.q + '" aria-label="Поиск по инструментам"></label>' +
      '<select id="toolJump" class="tool-select" aria-label="Перейти к инструменту"><option value="">Перейти к инструменту…</option>' + options + '</select>' +
      '</div>' +
      '<p class="tool-count" id="toolCount">' + V.toolCountText(state) + '</p>' +
      '<div id="toolsList">' + V.toolsList(state) + '</div>' +
      '</div>';

    return '<div class="wrap"><div class="view-head"><p class="eyebrow">Инструменты · по направлениям</p>' +
      '<h2>Чем работает ментор и чем пользуется менти</h2>' +
      '<p class="lead">35 приёмов с целью, шагами и примерной фразой. У каждого — автор и встреча; у каждого есть применение с двух сторон. Нажмите на карточку, чтобы открыть полный разбор.</p></div>' +
      '<div class="tools-layout">' + side + main + '</div></div>';
  };

  V.filteredTools = function (state) {
    var q = (state.q || "").trim().toLowerCase();
    var dirs = state.dir === "all" ? KB.directions : KB.directions.filter(function (d) { return d.id === state.dir; });
    var out = [];
    dirs.forEach(function (d) {
      var items = KB.tools.filter(function (t) { return t.dir === d.id && matches(t, q); });
      if (items.length) out.push({ dir: d, items: items });
    });
    return out;
  };

  V.toolsList = function (state) {
    var groups = V.filteredTools(state);
    if (!groups.length) {
      return '<p class="empty">Ничего не найдено. Попробуйте другое слово или сбросьте направление.</p>';
    }
    return groups.map(function (g) {
      return '<section class="dir-block" id="dir-' + g.dir.id + '">' +
        '<div class="dir-head"><h3>' + g.dir.title + '</h3><span>' + g.items.length + '</span></div>' +
        '<p class="dir-note">' + g.dir.note + '</p>' +
        '<div class="tools-grid">' + g.items.map(toolCard).join("") + '</div></section>';
    }).join("");
  };

  V.toolCountText = function (state) {
    var n = V.filteredTools(state).reduce(function (s, g) { return s + g.items.length; }, 0);
    var d = state.dir === "all" ? "все направления" : V.dir(state.dir).title;
    return "Показано " + n + " из " + KB.tools.length + " · " + d;
  };

  V.tool = function (t) {
    var a = V.author(t.author);
    var i = KB.tools.indexOf(t);
    var prev = KB.tools[i - 1], next = KB.tools[i + 1];
    var support = t.support.map(V.toolMini).join("");
    return '<div class="wrap detail">' +
      '<div class="print-only" style="margin-bottom:12px;border-bottom:2px solid #000;padding-bottom:6px"><b>Путь Маугли</b> · база знаний клуба менторов</div>' +
      '<a class="detail__back" href="#/tools">← Ко всем инструментам</a>' +
      '<div class="tool-head"><div style="flex:1 1 420px">' +
      '<div class="tool-meta"><span>Инструмент</span><span>·</span><a href="#/tools">' + V.dir(t.dir).title + '</a></div>' +
      '<h1>' + t.title + '</h1>' +
      '<p class="tool-source">Автор: <b><a href="#/authors?id=' + t.author + '">' + a.name + '</a></b>' +
      (t.coAuthors.length ? ' · вместе с ' + t.coAuthors.map(function (id) { return '<a href="#/authors?id=' + id + '">' + V.author(id).name + '</a>'; }).join(", ") : "") +
      '<span>' + t.source + '</span></p>' +
      '</div><button class="print-btn" type="button" id="printTool">Распечатать инструмент</button></div>' +
      V.tags(t.purpose) +
      '<p class="tool-lead" style="margin-top:12px">' + t.essence + '</p>' +
      '<div class="tool-when"><b>Когда использовать</b>' + t.when + '</div>' +
      '<div class="detail__voices">' +
      V.voice("mentor", "Ментору", t.mentor) +
      V.voice("menti", "Менти", t.menti) +
      '</div>' +
      '<p class="detail__section-title">Как это делается</p>' +
      '<ol class="steps">' + t.steps.map(function (s) { return '<li>' + s + '</li>'; }).join("") + '</ol>' +
      '<blockquote class="phrase"><b>Фраза, с которой можно начать</b>' + t.phrase + '</blockquote>' +
      '<div class="watch"><b>За чем следить.</b> ' + t.watch + '</div>' +
      '<div class="detail__risk"><b>Где ломается.</b> ' + t.risk + '</div>' +
      '<p class="detail__section-title">Поддерживающие инструменты</p>' +
      '<div class="support-grid">' + support + '</div>' +
      '<p class="detail__section-title">Кейсы, где инструмент работает</p>' +
      '<div class="detail__grid">' + t.cases.map(V.caseMini).join("") + '</div>' +
      '<div class="detail__nav">' +
      (prev ? '<a href="#/tool/' + prev.id + '">← ' + prev.title + '</a>' : '<span></span>') +
      (next ? '<a href="#/tool/' + next.id + '">' + next.title + ' →</a>' : '<span></span>') +
      '</div></div>';
  };

  V.notFound = function () {
    return '<div class="wrap detail"><h1>Страница не найдена</h1><p><a href="#/path">Вернуться к пути</a></p></div>';
  };
})();
