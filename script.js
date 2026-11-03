/* Allison Freitas — comportamento da página.
   Sem dependências. Só transform/opacity/variáveis CSS; tudo em rAF; nada roda
   fora da tela; prefers-reduced-motion desliga o movimento e deixa tudo visível. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ─────────── Idioma ─────────── */
  var EN = {
    'skip': 'Skip to content',
    'nav.vision': 'Visão', 'nav.work': 'Work', 'nav.path': 'Path', 'nav.contact': 'Contact',
    'cta.talk': 'Get in touch', 'cta.work': 'See the work', 'cta.cv': 'Résumé', 'cta.cvpdf': 'Résumé PDF',
    'cta.repo': 'View repository', 'cta.live': 'See it live', 'cta.code': 'Code', 'cta.contracts': 'Contracts', 'cta.ui': 'Interface',
    'cv.file': 'Allison_Freitas_Software_Engineer_CV.pdf',
    'hero.left': '[ Software engineer ]<br>Full-stack · Backend · AI<br>Varginha, MG — Brazil',
    'hero.right': '[ Available ]<br>Open to relocation<br>Netherlands · European Union',
    'hero.lede': 'I build systems that keep running when nobody is watching, from production APIs to agents with memory.',
    'hero.loop': 'Build<br>Test<br>Leave it running',
    'seal': 'SYSTEMS THAT RUN ON THEIR OWN ✦ SYSTEMS THAT RUN ON THEIR OWN ✦ ',
    'seal2': 'OPEN TO OFFERS ✦ OPEN TO OFFERS ✦ OPEN TO OFFERS ✦ OPEN TO OFFERS ✦ ',
    'proof.apis': 'REST APIs in production at F2',
    'proof.systems': 'Own systems, open source',
    'proof.gb': 'SM83 opcodes validated in the emulator',
    'proof.since': 'Coding since · professionally since 2025',
    'vision.kicker': '[ Featured ] Personal research · 2026',
    'vision.status': 'Phases 0–6 and 9 built',
    'vision.lede': 'A persistent cognitive architecture around a swappable LLM: curated autobiographical memory, uncertainty-driven search, reflection and goals that survive across conversations.',
    'vision.note': 'The agent is born without a name and deliberates about its own. The system does not claim consciousness, feelings or life.',
    'vision.f0': 'Curated, opt-in memory', 'vision.f1': 'Curiosity with cited sources', 'vision.f2': 'Goals only run with approval',
    'vision.f3': 'Versioned, reversible adaptation', 'vision.f4': 'Self-hosted voice', 'vision.f5': 'Budget and cost per call',
    'vision.roadmap': 'Roadmap · phases 0–9',
    'legend.done': 'Done', 'legend.built': 'Built', 'legend.planned': 'Planned',
    'state.memory': 'memory', 'state.curiosity': 'curiosity', 'state.reflection': 'reflection', 'state.goals': 'goals',
    'work.title': 'Systems', 'work.count': '[ 05 projects ]',
    'work.auris.kind': 'Desktop · Audio + LLM',
    'work.auris.desc': 'A sales-call copilot: summary, next steps and the follow-up already written. It transcribes on your own machine, and no bot joins the meeting.',
    'work.gb.kind': 'Emulator · Go',
    'work.gb.desc': 'A Game Boy (DMG) emulator in Go: full SM83 CPU, pixel-perfect PPU on dmg-acid2, 4-channel audio and battery saves.',
    'work.thoth.kind': 'SaaS · LLM',
    'work.thoth.desc': 'Train and chat with models over your own documents. Source-grounded RAG, async fine-tuning and recurring billing through Stripe.',
    'work.mb.kind': 'Web3 · Real estate',
    'work.mb.desc': 'Rentals where the contract is the system: Solidity keeps the status, applies a 10% late fee and closes the lease on its own.',
    'work.hook.kind': 'Infra · Go · in progress',
    'work.hook.desc': 'A self-hosted webhook gateway. It accepts events from any source and writes the event and its pending delivery in the same transaction before answering 202, so nothing gets lost. Next up: the redelivery worker with scheduled retries.',
    'work.open': 'All the code is open ↗',
    'chain.created': 'created', 'chain.active': 'active', 'chain.fine': '10% fee', 'chain.paid': 'paid',
    'hook.queue': 'queue', 'hook.deliver': 'deliver',
    'path.title': 'Path', 'path.stack': 'Stack',
    'path.f2.when': 'Mar 2025 — now',
    'path.f2.title': 'F2 Tecnologia · Full-Stack Engineer',
    'path.f2.desc': 'Two REST APIs in production, with webhooks connecting the platform to ERPs. Deploys on Cloudflare Workers and Pages. Automations with n8n and LLMs. Working in English with code review on GitHub.',
    'path.edu.title': 'B.Sc. Computer Science · UNIS-MG',
    'path.edu.desc': 'Completed at Centro Universitário do Sul de Minas.',
    'contact.kicker': '[ Contact ] Native Portuguese · fluent English',
    'contact.l1': "Let's", 'contact.l2': 'build.',
    'contact.lede': 'Got a system that needs to run without supervision? I want to hear about it.',
    'footer.note': 'Hand-written in HTML, CSS and JavaScript. No frameworks.'
  };

  var nodesText = $$('[data-i18n]');
  var nodesHtml = $$('[data-i18n-html]');
  var nodesHref = $$('[data-i18n-href]');
  var PT = { text: nodesText.map(function (n) { return n.textContent; }),
             html: nodesHtml.map(function (n) { return n.innerHTML; }),
             href: nodesHref.map(function (n) { return n.getAttribute('href'); }) };
  var langBtn = $('#lang');

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  function setLang(lang) {
    var en = lang === 'en';
    nodesText.forEach(function (n, i) { var k = n.getAttribute('data-i18n'); n.textContent = en && EN[k] ? EN[k] : PT.text[i]; });
    nodesHtml.forEach(function (n, i) { var k = n.getAttribute('data-i18n-html'); n.innerHTML = en && EN[k] ? EN[k] : PT.html[i]; });
    nodesHref.forEach(function (n, i) { var k = n.getAttribute('data-i18n-href'); n.setAttribute('href', en && EN[k] ? EN[k] : PT.href[i]); });
    root.lang = en ? 'en' : 'pt-BR';
    if (langBtn) {
      langBtn.setAttribute('aria-label', en ? 'Mudar idioma para português' : 'Switch language to English');
      $$('[data-lang-opt]', langBtn).forEach(function (o) { o.classList.toggle('is-on', o.getAttribute('data-lang-opt') === (en ? 'en' : 'pt')); });
    }
    currentLang = lang;
  }
  var currentLang = 'pt';
  var saved = store('af-lang');
  var initial = saved || ((navigator.language || 'pt').toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en');
  setLang(initial);
  if (langBtn) langBtn.addEventListener('click', function () {
    var next = currentLang === 'pt' ? 'en' : 'pt';
    setLang(next); store('af-lang', next);
  });

  /* ─────────── Entrada do hero (CSS faz o trabalho; aqui só o gatilho) ─────────── */
  if (root.classList.contains('intro')) {
    var fired = false;
    var go = function () { if (fired) return; fired = true; requestAnimationFrame(function () { root.classList.add('go'); }); };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(go);
    setTimeout(go, 900); /* nunca espera a fonte mais que isso */
  }

  /* ─────────── Revelação ao rolar ─────────── */
  var vh = window.innerHeight;
  var revealEls = $$('[data-reveal]');
  var countEls = $$('[data-count]');
  var roadmap = $('#roadmap');

  function countUp(el) {
    var to = parseFloat(el.getAttribute('data-count'));
    var from = parseFloat(el.getAttribute('data-count-from') || '0');
    var t0 = performance.now(), dur = 1500;
    el.textContent = String(from);
    (function step(now) {
      var p = clamp((now - t0) / dur, 0, 1);
      var e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = String(Math.round(lerp(from, to, e)));
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  if (!reduce && 'IntersectionObserver' in window) {
    revealEls.forEach(function (el) {
      if (el.getBoundingClientRect().top > vh * 0.9) el.classList.add('pre');
    });
    if (roadmap && roadmap.getBoundingClientRect().top > vh * 0.9) {
      roadmap.classList.add('arm');
      $$('.ph', roadmap).forEach(function (ph, i) { ph.style.setProperty('--d', (0.25 + i * 0.07) + 's'); });
    }

    var batch = [], flushQueued = false;
    var flush = function () {
      flushQueued = false;
      batch.forEach(function (el, i) {
        el.style.setProperty('--d', (i * 0.08) + 's');
        el.classList.add('in');
        $$('[data-count]', el).forEach(countUp);
        setTimeout(function () { el.classList.remove('pre', 'in'); el.style.removeProperty('--d'); }, 1200 + i * 80);
      });
      batch = [];
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        if (en.target === roadmap) { roadmap.classList.remove('arm'); return; }
        if (!en.target.classList.contains('pre')) return;
        batch.push(en.target);
        if (!flushQueued) { flushQueued = true; requestAnimationFrame(flush); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
    if (roadmap) io.observe(roadmap);
  }

  /* ─────────── O olho: a pupila do hero acompanha o cursor ─────────── */
  var hero = $('.hero');
  var heroOrb = $('#hero-orb');
  var heroPupil = heroOrb && $('.orb-pupil', heroOrb);
  var orbPar = $('#orb-par');
  var lines = $$('.hero-name .line');
  var heroVisible = true;

  var eye = { tx: 0, ty: 0, x: 0, y: 0, last: 0 };
  var pointerAt = -1e9;

  if (heroOrb && !reduce) {
    if (canHover) {
      window.addEventListener('pointermove', function (e) {
        if (e.pointerType === 'touch') return;
        eye.tx = clamp((e.clientX / window.innerWidth) * 2 - 1, -1, 1);
        eye.ty = clamp((e.clientY / window.innerHeight) * 2 - 1, -1, 1);
        pointerAt = performance.now();
        wake();
      }, { passive: true });
    }

    var running = false;
    var wake = function () { if (!running && heroVisible) { running = true; requestAnimationFrame(tick); } };
    var tick = function (now) {
      if (!heroVisible) { running = false; return; }
      if (now - pointerAt > 2600) {
        /* ocioso: deriva lenta, como quem observa a sala */
        var t = now / 1000;
        eye.tx = Math.sin(t * 0.55) * 0.55;
        eye.ty = Math.cos(t * 0.42) * 0.35;
      }
      eye.x = lerp(eye.x, eye.tx, 0.07);
      eye.y = lerp(eye.y, eye.ty, 0.07);
      var size = heroOrb.offsetWidth;
      var max = size * 0.15;
      heroPupil.style.transform = 'translate(' + (eye.x * max).toFixed(2) + 'px,' + (eye.y * max).toFixed(2) + 'px)';
      heroOrb.style.setProperty('--lx', (32 + eye.x * 9).toFixed(2) + '%');
      heroOrb.style.setProperty('--ly', (28 + eye.y * 9).toFixed(2) + '%');
      requestAnimationFrame(tick);
    };

    new IntersectionObserver(function (es) {
      heroVisible = es[0].isIntersecting;
      if (heroVisible) wake();
    }).observe(hero);
    wake();
  }

  /* ─────────── Rolagem: parallax leve no hero + cabeçalho ─────────── */
  var topbar = $('#topbar');
  var lastY = window.scrollY, scrollQueued = false;

  function onScroll() {
    scrollQueued = false;
    var y = window.scrollY;
    var hH = hero.offsetHeight;

    if (!reduce && y < hH * 1.1) {
      var p = clamp(y / hH, 0, 1);
      lines.forEach(function (l) {
        var dir = parseFloat(l.getAttribute('data-par')) || 0;
        l.style.transform = 'translate3d(' + (dir * p * 7).toFixed(3) + '%,0,0)';
      });
      if (orbPar) orbPar.style.transform = 'translate3d(0,' + (p * 22).toFixed(3) + '%,0) scale(' + (1 - p * 0.1).toFixed(4) + ')';
    }

    if (topbar) {
      topbar.classList.toggle('is-scrolled', y > hH - topbar.offsetHeight);
      var dy = y - lastY;
      if (y > hH && dy > 6) topbar.classList.add('is-hidden');
      else if (dy < -6 || y < hH) topbar.classList.remove('is-hidden');
    }
    lastY = y;
  }
  window.addEventListener('scroll', function () {
    if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener('resize', function () { vh = window.innerHeight; onScroll(); }, { passive: true });
  if (topbar) topbar.addEventListener('focusin', function () { topbar.classList.remove('is-hidden'); });
  onScroll();

  /* Item ativo do menu */
  var navLinks = $$('.nav a');
  if ('IntersectionObserver' in window && navLinks.length) {
    var navIo = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.setAttribute('aria-current', a.getAttribute('href') === '#' + en.target.id ? 'true' : 'false'); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(function (a) { var s = $(a.getAttribute('href')); if (s) navIo.observe(s); });
  }

  /* ─────────── Visão: a bolha passa pelos estados e olha para cada um ─────────── */
  var bubble = $('#bubble');
  if (bubble) {
    var chips = $$('.chip', bubble);
    var bOrb = $('#bubble-orb');
    var bPupil = $('.orb-pupil', bOrb);
    var state = 0, timer = null;

    var show = function (i) {
      chips.forEach(function (c, k) { c.classList.toggle('is-on', k === i); });
      var o = bOrb.getBoundingClientRect(), c = chips[i].getBoundingClientRect();
      var dx = (c.left + c.width / 2) - (o.left + o.width / 2);
      var dy = (c.top + c.height / 2) - (o.top + o.height / 2);
      var len = Math.hypot(dx, dy) || 1, max = o.width * 0.17;
      bPupil.style.transform = 'translate(' + (dx / len * max).toFixed(1) + 'px,' + (dy / len * max).toFixed(1) + 'px)';
    };
    show(0);
    if (!reduce && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) {
          if (!timer) timer = setInterval(function () { state = (state + 1) % chips.length; show(state); }, 1700);
        } else if (timer) { clearInterval(timer); timer = null; }
      }, { threshold: 0.3 }).observe(bubble);
    }
  }

  /* ─────────── Toque: miniaturas animam quando estão na tela ─────────── */
  if (!canHover && !reduce && 'IntersectionObserver' in window) {
    var liveIo = new IntersectionObserver(function (es) {
      es.forEach(function (en) { en.target.classList.toggle('live', en.isIntersecting); });
    }, { threshold: 0.55 });
    $$('.card').forEach(function (c) { liveIo.observe(c); });
  }
})();
