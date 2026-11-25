(function () {
  "use strict";
  var V = window.V, KB = window.KB;

  V.case = function (c) {
    var st = V.stage(c.stage);
    var i = KB.cases.indexOf(c);
    var prev = KB.cases[i - 1], next = KB.cases[i + 1];
    return '<div class="wrap detail">' +
      '<a class="detail__back" href="#/path">← К игровому полю</a>' +
      '<div class="case-hero case-hero--' + c.id + '"><span class="case-hero__num">Кейс ' + c.num + ' · ' + c.chapter + '</span></div>' +
      '<div class="detail__meta"><span>Шаг менти ' + c.num + ' из ' + KB.cases.length + '</span><span>·</span><span>Этап ' + st.num + ': ' + st.title + '</span></div>' +
      '<h1>' + c.title + '</h1>' +
      '<div class="case-pair">' +
      '<div class="case-pair__menti"><b>Шаг менти ' + c.num + '</b><p>' + c.step + '</p></div>' +
      '<div class="case-pair__mentor"><b>Ход ментора ' + c.num + '</b><p>' + c.move + '</p></div>' +
      '</div>' +
      '<p class="stage-note"><b>Этап ' + st.num + ' · ' + st.title + '.</b> ' + st.note + '</p>' +
      '<p class="detail__scene">' + c.scene + '</p>' +
      '<p class="detail__move"><b>Ход ментора.</b> ' + c.mentorMove + '</p>' +
      '<div class="detail__voices">' +
      V.voice("mentor", "Позиция ментора", c.mentorView) +
      V.voice("menti", "Позиция менти", c.mentiView) +
      '</div>' +
      '<div class="detail__risk"><b>Где ломается.</b> ' + c.risk + '</div>' +
      '<p class="detail__lesson">' + c.lesson + '</p>' +
      '<p class="detail__section-title">Архетипы в этой сцене</p>' +
      '<div class="chips">' + c.archetypes.map(V.archChip).join("") + '</div>' +
      '<p class="detail__section-title">Инструменты этого кейса</p>' +
      '<div class="detail__grid">' + c.tools.map(V.toolMini).join("") + '</div>' +
      '<details class="prompt-box"><summary>Описание иллюстрации для генерации</summary><p>' + c.prompt + '</p></details>' +
      '<div class="detail__nav">' +
      (prev ? '<a href="#/case/' + prev.id + '">← ' + prev.num + '. ' + prev.title + '</a>' : '<span></span>') +
      (next ? '<a href="#/case/' + next.id + '">' + next.num + '. ' + next.title + ' →</a>' : '<span></span>') +
      '</div></div>';
  };

  V.archetypes = function () {
    var cards = KB.archetypes.map(function (a) {
      return '<article class="arch arch--' + a.id + '" id="arch-' + a.id + '">' +
        '<div class="arch__media" role="img" aria-label="Портрет: ' + a.name + '"></div>' +
        '<div class="arch__body">' +
        '<span class="arch__badge">' + a.badge + '</span>' +
        '<h2 class="arch__name">' + a.name + '</h2>' +
        '<p class="arch__role">' + a.role + '</p>' +
        '<p class="arch__line">' + a.line + '</p>' +
        '<p class="arch__summary">' + a.summary + '</p>' +
        '<div class="arch__why"><b>Почему это ментор или нет</b>' + a.why + '</div>' +
        '<div class="arch__cols">' +
        '<div><h4>Сильные стороны</h4><ul>' + a.strengths.map(function (x) { return '<li>' + x + '</li>'; }).join("") + '</ul></div>' +
        '<div><h4>Риски</h4><ul>' + a.risks.map(function (x) { return '<li>' + x + '</li>'; }).join("") + '</ul></div>' +
        '</div>' +
        '<div class="arch__cols">' +
        '<div><h4>Что взять</h4><ul>' + a.take.map(function (x) { return '<li>' + x + '</li>'; }).join("") + '</ul></div>' +
        '<div><h4>Что не копировать</h4><ul>' + a.dont.map(function (x) { return '<li>' + x + '</li>'; }).join("") + '</ul></div>' +
        '</div>' +
        '<div class="arch__links">' + a.tools.map(V.toolChip).join("") + a.cases.map(V.caseChip).join("") + '</div>' +
        '</div></article>';
    }).join("");

    return '<div class="wrap">' +
      '<div class="view-head"><p class="eyebrow">Архетипы · четыре роли</p>' +
      '<h2>Кто в джунглях ментор, а кто только кажется им</h2>' +
      '<p class="lead">Один и тот же персонаж может быть наставником в одной сцене и помехой в другой. Ниже — четыре роли, их сильные стороны, риски и то, что стоит забрать в практику.</p></div>' +
      '<div class="callout callout--gold"><h3>Зачем это</h3><p>Инструменты легко превращаются в чек-лист. Архетипы возвращают вопрос «кто я в этой ситуации?»: стратег, тёплый учитель, приглашённый эксперт или анти-ментор. Полезно примерять все четыре, а не выбирать одну «правильную».</p></div>' +
      '<div class="arch-list">' + cards + '</div>' +
      '<div class="callout"><h3>Ментор или анти-ментор: шесть признаков</h3>' +
      '<ol>' +
      '<li><b>На чей результат работает?</b> Ментор — на рост менти. Анти-ментор — на свою власть и статус.</li>' +
      '<li><b>Что происходит с ошибкой?</b> Ментор разбирает. Анти-ментор наказывает и стыдит.</li>' +
      '<li><b>Можно ли уйти?</b> У ментора есть финал и дверь. У анти-ментора — долг и чувство вины.</li>' +
      '<li><b>Откуда берётся мотивация?</b> У ментора — из интереса и маленьких побед. У анти-ментора — из страха.</li>' +
      '<li><b>Кто принимает решения?</b> Ментор отдаёт авторство. Анти-ментор забирает его обратно.</li>' +
      '<li><b>Что остаётся после?</b> У ментора — навык и следующий шаг. У анти-ментора — зависимость и усталость.</li>' +
      '</ol></div>' +
      '<p style="padding-bottom:50px"><a class="btn" href="#/about">Как этим пользоваться →</a></p>' +
      '</div>';
  };

  V.about = function () {
    return '<div class="wrap">' +
      '<div class="view-head"><p class="eyebrow">Как пользоваться</p>' +
      '<h2>Зачем эта база и кому она нужна</h2>' +
      '<p class="lead">Это не учебник по менторству и не готовый сценарий встреч. Это карта: девять шагов менти и девять ходов ментора, 35 инструментов и четыре роли. Ниже — три способа входа, в зависимости от того, кто вы в программе.</p></div>' +
      '<div class="audience-grid">' +
      '<article class="audience"><h3>Ментору</h3><p class="who">Подсмотреть, на что обращать внимание</p>' +
      '<ul><li>К каждому этапу — описание, ход ментора и риск, который стоит заметить.</li><li>Инструменты с шагами и примерной фразой: можно взять и попробовать.</li><li>Архетипы — чтобы заметить, в какую роль вас заносит.</li></ul>' +
      '<p class="do"><b>Как работать.</b> Перед встречей откройте этап, выберите один инструмент. После — запишите, что сработало и что нет. Не берите больше двух новых приёмов за раз.</p></article>' +
      '<article class="audience"><h3>Менти</h3><p class="who">Понять, как устроена работа</p>' +
      '<ul><li>Менторинг — регулярная работа с целью, а не консультация и не терапия.</li><li>Ментор задаёт рамку и вопросы, но решения и шаги — ваши.</li><li>У ментора есть границы времени и компетенции: это нормально.</li></ul>' +
      '<p class="do"><b>Как получить максимум.</b> Приходите с одним вопросом и маленьким выполненным шагом. Говорите, если не совпало или обидно. Просите не ответ, а критерии.</p></article>' +
      '<article class="audience"><h3>Администратору</h3><p class="who">Увидеть путь целиком</p>' +
      '<ul><li>Девять этапов — каркас программы: где нужны активности, а где поддержка.</li><li>Риски этапов: пропавшие менти, несовпадение ожиданий, выгорание менторов.</li><li>Инструменты можно собирать в методичку и передавать новым менторам.</li></ul>' +
      '<p class="do"><b>Как работать.</b> Отметьте, какие активности закрывают каждый этап. Считайте не только закрытые пары, но и выходы в практику, и возвращаемость менторов.</p></article>' +
      '</div>' +
      '<div class="how-grid">' +
      '<article class="how"><h3>Как читать кейс</h3><ol><li><b>Пара.</b> Номер — шаг менти; рядом — ответный ход ментора.</li><li><b>Сцена.</b> Что происходит в книге — без морали.</li><li><b>Две позиции.</b> Отдельно для ментора и для менти.</li><li><b>Где ломается.</b> Риск, который стоит заметить заранее.</li><li><b>Инструменты.</b> Чем именно это делается.</li></ol></article>' +
      '<article class="how"><h3>Как читать инструмент</h3><ol><li><b>Цель.</b> Доверие, запрос, мотивация, границы, завершение.</li><li><b>Когда.</b> В какой момент он уместен.</li><li><b>Две роли.</b> Что делает ментор и что делает менти.</li><li><b>Шаги и фраза.</b> Как это выглядит в разговоре.</li><li><b>Поддержка.</b> Какие инструменты усиливают друг друга.</li></ol></article>' +
      '</div>' +
      '<div class="section-head"><p class="eyebrow">С чего начать</p><h2>Три шага</h2></div>' +
      '<ol class="start-list">' +
      '<li>Определите свою роль: ментор, менти или администратор.</li>' +
      '<li>Откройте игровое поле и найдите этап, в котором вы сейчас.</li>' +
      '<li>Возьмите один инструмент и одну фразу. Попробуйте на следующей встрече — и вернитесь к разбору.</li>' +
      '</ol>' +
      '<div class="callout" style="margin-top:26px"><h3>Честность и ограничения</h3>' +
      '<p>База собрана по четырём встречам клуба (23.10, 30.10, 05.11, 20.11.2026). Встреча 30.10 записана с двумя участниками — Филиппом и Марией. Формулировки инструментов — редакторская переработка, а не дословные цитаты.</p>' +
      '<p>Сцены Киплинга пересказаны; кейс «Медвежьи радости» помечен как версия Disney 1967 года. Это не методика сертификации, не супервизия и не замена профессиональной подготовке.</p></div>' +
      '<p style="padding-bottom:50px"><a class="btn" href="#/authors">Кто принёс эти инструменты →</a></p>' +
      '</div>';
  };

  V.authors = function () {
    var cards = KB.authors.map(function (a) {
      var tools = KB.tools.filter(function (t) { return t.author === a.id || t.coAuthors.indexOf(a.id) !== -1; });
      return '<article class="author" id="author-' + a.id + '">' +
        '<div class="author__head"><div class="author__mono" aria-hidden="true">' + a.monogram + '</div>' +
        '<div><h3 class="author__name">' + a.name + '</h3><p class="author__role">' + a.role + '</p></div></div>' +
        '<div class="author__meetings"><span>Встречи:</span>' + a.meetings.map(function (m) { return '<span>' + m + '</span>'; }).join("") + '</div>' +
        '<ul class="author__brought">' + a.brought.map(function (b) { return '<li>' + b + '</li>'; }).join("") + '</ul>' +
        '<blockquote class="author__quote">«' + a.quote + '»</blockquote>' +
        '<p style="font-size:.86rem;color:#555a46">' + a.note + '</p>' +
        '<div class="author__tools">' + tools.map(function (t) { return '<a class="chip" href="#/tool/' + t.id + '">' + t.title + '</a>'; }).join("") + '</div>' +
        '</article>';
    }).join("");

    return '<div class="wrap">' +
      '<div class="view-head"><p class="eyebrow">Благодарности · справочник авторов</p>' +
      '<h2>Инструменты пришли из разговоров, а не из воздуха</h2>' +
      '<p class="lead">Эта база — способ сказать спасибо людям, которые на встречах клуба называли свои приёмы, ошибки и находки. Ниже — кто что принёс, в каких встречах участвовал и какие инструменты с ним связаны.</p></div>' +
      '<div class="callout callout--moss"><h3>Правило сохранения авторства</h3><p>Инструмент подписан именем того, кто его озвучил, и датой встречи. Если приём называли несколько человек, авторов несколько. Формулировки — редакторская переработка: мы сохраняли смысл, но не выдавали пересказ за дословную цитату.</p></div>' +
      '<div class="authors-grid">' + cards + '</div>' +
      '<div class="view-head" style="padding-top:20px"><p class="eyebrow">Внешние опоры</p><h2>То, на что опирались в разговорах</h2></div>' +
      '<div class="authors-grid" style="grid-template-columns:repeat(auto-fill,minmax(300px,1fr))">' +
      '<article class="author"><h3 class="author__name">Светлана Харченко</h3><p class="author__role">Школа менторинга</p><p>На неё ссылаются Анастасия (23.10 и 05.11) как на источник классической рамки: сначала запрос, потом результат сессии и сверка. Мы не пересказываем программу — только отмечаем, откуда пришла дисциплина вопросов.</p></article>' +
      '<article class="author"><h3 class="author__name">Редьярд Киплинг</h3><p class="author__role">«Книга джунглей», 1894–1895</p><p>Сюжет и сцены пересказаны своими словами, без дословных цитат. Кейс «Медвежьи радости» помечен как версия Disney 1967 года и не выдаётся за текст Киплинга.</p></article>' +
      '<article class="author"><h3 class="author__name">Генрих Альтшуллер</h3><p class="author__role">Цитата, прозвучавшая на встрече</p><p>На встрече 05.11 Мария привела фразу о цели, которая больше жизни. Первоисточник мы не проверяли — поэтому оставляем это как след разговора, а не как установленный факт.</p></article>' +
      '<article class="author"><h3 class="author__name">Иосиф Бродский</h3><p class="author__role">Строка о провинции у моря</p><p>Александр процитировал её на встрече 20.11, приглашая коллег в Калининград. Строка приведена как часть разговора, а не как аргумент в методике.</p></article>' +
      '</div>' +
      '<div class="view-head" style="padding-top:20px"><p class="eyebrow">Методика</p><h2>Как собрана эта база</h2></div>' +
      '<div class="callout"><h3>Источники</h3><p>Четыре встречи клуба менторов: 23.10.2026, 30.10.2026, 05.11.2026, 20.11.2026.</p>' +
      '<h3 style="margin-top:14px">Что здесь интерпретация</h3><p>Сцены «Книги джунглей» — пересказ, а не цитаты. Связка «сцена → этап работы ментора» — наша интерпретация, а не утверждение Киплинга о менторстве. Инструменты — редакторская реконструкция реплик; точные слова смотрите в записях.</p>' +
      '<h3 style="margin-top:14px">Чего здесь нет</h3><p>Это не методика сертификации, не супервизия и не замена профессиональной подготовки.</p></div>' +
      '<p style="padding-bottom:50px"><a class="btn" href="#/about">Как пользоваться базой →</a></p>' +
      '</div>';
  };
})();
