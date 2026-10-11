/* ORBITAL — Hidden World
   © Saim Patel. Vanilla JS, no build step.
   Features: 3D ring, budget explorer, filters, quiz, food finder, favourites + trip planner,
   place detail modal, community submissions (localStorage), global search, share links, PWA. */

(function () {
  'use strict';

  var DATA = window.ORBITAL_DATA || [];
  var SEEDS = window.ORBITAL_SEED_SUBMISSIONS || [];
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var MONTHS_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var STYLE_NAME = { low: 'Backpacker', mid: 'Comfortable', high: 'Treat yourself' };
  var VIBE_LABEL = { mountain: '⛰ Mountains', beach: '🏖 Beaches', culture: '🏛 Culture', nature: '🌿 Nature', trek: '🥾 Trekking', adventure: '🧗 Adventure', spiritual: '🕉 Spiritual', food: '🍜 Food', desert: '🏜 Desert' };
  var NOW_MONTH = new Date().getMonth() + 1;

  /* ---------- helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function inr(n) { return '₹' + Math.round(n).toLocaleString('en-IN'); }
  function byId(id) { return DATA.filter(function (d) { return d.id === id; })[0]; }
  function store(key, val) {
    try {
      if (val === undefined) { var raw = localStorage.getItem('orbital.' + key); return raw ? JSON.parse(raw) : null; }
      localStorage.setItem('orbital.' + key, JSON.stringify(val));
    } catch (e) { return null; }
  }
  function hash(str) { var h = 0; for (var i = 0; i < str.length; i++) { h = (h * 31 + str.charCodeAt(i)) | 0; } return Math.abs(h); }
  function stars(n) { return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n); }

  var toastTimer;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return fallbackCopy(text); });
    }
    return Promise.resolve(fallbackCopy(text));
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    var ok = false; try { ok = document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta); return ok;
  }

  /* ---------- generated artwork (no external images needed) ---------- */
  function art(d, uid) {
    var h = hash(d.id), c0 = d.colors[0], c1 = d.colors[1];
    var sunX = 70 + (h % 260), sunY = d.art === 'beach' ? 150 : 62 + (h % 30);
    var g = 'g' + uid + d.id;
    var out = '<svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<defs><linearGradient id="' + g + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + c0 + '"/><stop offset="1" stop-color="' + c1 + '"/></linearGradient>' +
      '<radialGradient id="' + g + 's"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>' +
      '<rect width="400" height="240" fill="url(#' + g + ')"/>';
    for (var i = 0; i < 14; i++) { out += '<circle cx="' + ((h * (i + 3)) % 400) + '" cy="' + ((h * (i + 7)) % 110) + '" r="' + (0.6 + (i % 3) * 0.4) + '" fill="#fff" opacity="' + (0.25 + (i % 4) * 0.12) + '"/>'; }
    out += '<circle cx="' + sunX + '" cy="' + sunY + '" r="46" fill="url(#' + g + 's)"/><circle cx="' + sunX + '" cy="' + sunY + '" r="17" fill="#fff" opacity=".92"/>';
    var j = h % 30;
    switch (d.art) {
      case 'mountain':
        out += '<polygon points="0,190 ' + (60 + j) + ',100 130,165 ' + (200 - j) + ',70 280,170 ' + (340 + j / 2) + ',108 400,180 400,240 0,240" fill="#000" opacity=".32"/>' +
          '<polygon points="' + (190 - j) + ',70 ' + (170 - j) + ',96 ' + (186 - j) + ',90 ' + (200 - j) + ',100 ' + (214 - j) + ',90" fill="#fff" opacity=".7"/>' +
          '<polygon points="0,215 90,150 160,200 250,140 330,195 400,160 400,240 0,240" fill="#000" opacity=".5"/>' +
          '<polygon points="0,232 120,196 230,226 330,200 400,222 400,240 0,240" fill="#000" opacity=".7"/>';
        break;
      case 'beach':
        out += '<rect y="165" width="400" height="75" fill="#000" opacity=".25"/>' +
          '<path d="M0 185 Q50 172 100 185 T200 185 T300 185 T400 185 V240 H0Z" fill="#fff" opacity=".12"/>' +
          '<path d="M0 205 Q60 192 120 205 T240 205 T360 205 T480 205 V240 H0Z" fill="#fff" opacity=".16"/>' +
          '<path d="M0 225 Q100 212 200 226 T400 222 V240 H0Z" fill="#fde68a" opacity=".55"/>' +
          '<path d="M' + (300 + j) + ' 225 q2 -40 -10 -62 M' + (300 + j) + ' 225 q10 -30 28 -46" stroke="#000" stroke-opacity=".6" stroke-width="3" fill="none"/>' +
          '<path d="M' + (290 + j) + ' 163 q-22 -6 -34 8 M' + (290 + j) + ' 163 q16 -16 36 -6 M' + (290 + j) + ' 163 q-4 -20 14 -28" stroke="#000" stroke-opacity=".55" stroke-width="3" fill="none"/>';
        break;
      case 'desert':
        out += '<path d="M0 170 Q90 120 170 165 T400 150 V240 H0Z" fill="#000" opacity=".22"/>' +
          '<path d="M0 205 Q120 150 230 200 T400 185 V240 H0Z" fill="#000" opacity=".38"/>' +
          '<path d="M0 232 Q140 190 260 226 T400 215 V240 H0Z" fill="#000" opacity=".55"/>';
        break;
      case 'forest':
        out += '<polygon points="0,170 100,120 190,168 290,110 400,165 400,240 0,240" fill="#000" opacity=".28"/>';
        for (var t = 0; t < 18; t++) {
          var tx = t * 24 + (h % 12), ty = 200 + (t % 3) * 8, th = 50 + ((h >> t) % 28);
          out += '<polygon points="' + tx + ',' + ty + ' ' + (tx + 14) + ',' + (ty - th) + ' ' + (tx + 28) + ',' + ty + '" fill="#000" opacity="' + (0.5 + (t % 3) * 0.1) + '"/>';
        }
        out += '<rect y="228" width="400" height="12" fill="#000" opacity=".7"/>';
        break;
      case 'river':
        out += '<path d="M0 170 Q100 120 200 160 T400 140 V240 H0Z" fill="#000" opacity=".3"/>' +
          '<path d="M0 210 Q100 180 200 205 T400 190 V240 H0Z" fill="#000" opacity=".5"/>' +
          '<path d="M' + (150 + j) + ' 240 C' + (120 + j) + ' 205 ' + (230 + j) + ' 195 ' + (190 + j) + ' 165 S' + (210 + j) + ' 150 ' + (200 + j) + ' 140" stroke="#bae6fd" stroke-opacity=".7" stroke-width="10" fill="none" stroke-linecap="round"/>';
        break;
      case 'canyon':
        out += '<polygon points="0,150 60,150 60,175 120,175 120,195 175,195 175,240 0,240" fill="#000" opacity=".4"/>' +
          '<polygon points="400,140 330,140 330,170 280,170 280,192 225,192 225,240 400,240" fill="#000" opacity=".5"/>' +
          '<polygon points="0,205 80,205 80,222 150,222 150,240 0,240" fill="#000" opacity=".6"/>' +
          '<path d="M175 240 Q200 205 225 240Z" fill="#7dd3fc" opacity=".6"/>';
        break;
      case 'heritage':
        out += '<rect y="198" width="400" height="42" fill="#000" opacity=".6"/>';
        var base = [[40, 70, 22], [120, 96, 28], [200, 120, 34], [290, 92, 26], [350, 66, 20]];
        base.forEach(function (b) {
          var x = b[0] + (j % 10), top = 198 - b[1];
          out += '<rect x="' + (x - b[2]) + '" y="' + top + '" width="' + (b[2] * 2) + '" height="' + b[1] + '" fill="#000" opacity=".55"/>' +
            '<path d="M' + (x - b[2]) + ' ' + top + ' Q' + x + ' ' + (top - b[2] * 1.5) + ' ' + (x + b[2]) + ' ' + top + 'Z" fill="#000" opacity=".55"/>' +
            '<rect x="' + (x - 3) + '" y="' + (top - b[2] * 1.5 - 12) + '" width="6" height="14" fill="#000" opacity=".55"/>' +
            '<path d="M' + (x - 6) + ' 198 v-22 a6 6 0 0 1 12 0 v22Z" fill="' + c1 + '" opacity=".75"/>';
        });
        break;
    }
    return out + '</svg>';
  }

  /* ---------- state ---------- */
  var saved = store('saved') || [];
  var votes = store('votes') || {};
  var userSubs = store('subs') || [];
  var plan = store('plan') || { days: 4, people: 2, style: 'mid', travel: 4000 };

  /* ---------- ring (hero) ---------- */
  var ring = $('#ring');
  var ringPlaces = DATA.slice().sort(function (a, b) { return b.hidden - a.hidden || a.name.localeCompare(b.name); }).slice(0, 10);
  ringPlaces.forEach(function (d, i) {
    var num = (i < 9 ? '0' : '') + (i + 1);
    var p = document.createElement('button');
    p.type = 'button'; p.className = 'panel'; p.setAttribute('data-id', d.id); p.setAttribute('aria-label', 'Open ' + d.name);
    p.innerHTML =
      '<div class="panel-face panel-face--text"><div class="p-num">' + num + '</div><div><div class="p-label">' + esc(d.name.toUpperCase()) + '</div><div class="p-meta">' + esc(d.state.toUpperCase()) + '</div></div></div>' +
      '<div class="panel-face panel-face--image">' + art(d, 'r') + '<div class="panel-scrim"></div><div class="panel-cap"><span class="p-num">' + num + '</span>' + esc(d.name) + '<small>FROM ' + inr(d.budget.low) + ' / DAY</small></div></div>';
    ring.appendChild(p);
  });

  var panels = $$('.panel', ring), count = panels.length;
  var spacingLevels = [0.74, 0.92, 1.08], spacingIndex = 1;
  function baseRadius() { return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ring-radius')) || 360; }
  function effectiveRadius() { return baseRadius() * spacingLevels[spacingIndex]; }
  function positionPanels() {
    var r = effectiveRadius();
    panels.forEach(function (panel, i) {
      panel.style.setProperty('--ry', (360 / count) * i + 'deg');
      panel.style.setProperty('--tz', r + 'px');
      panel.style.setProperty('--rz', (Math.sin((i / count) * Math.PI * 2) * 8).toFixed(2) + 'deg');
      panel.style.setProperty('--i', i);
    });
  }
  positionPanels();
  var resizeTimer;
  window.addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(positionPanels, 200); });

  var spacingSteps = $$('.spacing-step');
  spacingSteps.forEach(function (b) {
    b.addEventListener('click', function () {
      spacingIndex = parseInt(b.getAttribute('data-space'), 10);
      positionPanels();
      spacingSteps.forEach(function (x) { x.classList.toggle('is-active', x === b); });
    });
  });

  var stage = $('.stage'), parallax = $('.parallax');
  var rotation = 0, velocity = 0, baseDrift = reduceMotion ? 0 : 0.12, friction = 0.94, MAXV = 7, DRAG = 0.32, WHEEL = 0.05;
  var dragging = false, lastX = 0, dragDist = 0;
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  var targetX = 0, targetY = 0, curX = 0, curY = 0;
  if (!reduceMotion) {
    window.addEventListener('mousemove', function (e) {
      targetY = ((e.clientX / window.innerWidth) - 0.5) * 28;
      targetX = (-((e.clientY / window.innerHeight) - 0.5) * 30) + 10;
    });
  }
  stage.addEventListener('pointerdown', function (e) { dragging = true; lastX = e.clientX; velocity = 0; dragDist = 0; stage.classList.add('dragging'); });
  window.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var dx = e.clientX - lastX; lastX = e.clientX; dragDist += Math.abs(dx);
    rotation += dx * DRAG; velocity = clamp(dx * DRAG, -MAXV, MAXV);
  });
  function endDrag() { if (!dragging) return; dragging = false; stage.classList.remove('dragging'); }
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);
  stage.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); velocity = clamp(velocity + e.deltaX * WHEEL, -MAXV, MAXV); }
  }, { passive: false });
  /* click vs drag: open place only when the pointer barely moved */
  ring.addEventListener('click', function (e) {
    var p = e.target.closest('.panel');
    if (p && dragDist < 6) openModal(p.getAttribute('data-id'));
  });
  var heroVisible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { heroVisible = en[0].isIntersecting; }).observe($('.hero'));
  }
  function frame() {
    if (heroVisible) {
      if (!dragging) { rotation += baseDrift + velocity; velocity *= friction; if (Math.abs(velocity) < 0.0015) velocity = 0; }
      ring.style.transform = 'rotateY(' + rotation.toFixed(3) + 'deg)';
      if (!reduceMotion) {
        curX += (targetX - curX) * 0.06; curY += (targetY - curY) * 0.06;
        parallax.style.transform = 'rotateX(' + curX.toFixed(2) + 'deg) rotateY(' + curY.toFixed(2) + 'deg)';
      }
    }
    requestAnimationFrame(frame);
  }
  frame();

  $('#visualsSwitch').addEventListener('click', function () {
    var on = this.getAttribute('aria-checked') !== 'true';
    this.setAttribute('aria-checked', on); document.body.classList.toggle('visuals-on', on);
  });
  $('#zoomSwitch').addEventListener('click', function () {
    var on = this.getAttribute('aria-checked') !== 'true';
    this.setAttribute('aria-checked', on); $('.ring-tilt').style.setProperty('--zoom', on ? '1.24' : '1');
  });

  /* ---------- nav, menu, progress, reveal ---------- */
  var toggle = $('.menu-toggle'), mobileMenu = $('#mobileMenu');
  toggle.addEventListener('click', function () {
    var open = mobileMenu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open); document.body.classList.toggle('no-scroll', open);
  });
  $$('a', mobileMenu).forEach(function (a) { a.addEventListener('click', function () { mobileMenu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); document.body.classList.remove('no-scroll'); }); });

  var prog = $('#progress');
  window.addEventListener('scroll', function () {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  }, { passive: true });

  var revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('visible'); io.unobserve(x.target); } }); }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
    var navLinks = $$('.nav-links a');
    var spy = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { navLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + x.target.id); }); } });
    }, { rootMargin: '-40% 0px -55% 0px' });
    $$('section[id]').forEach(function (s) { spy.observe(s); });
  } else { revealEls.forEach(function (el) { el.classList.add('visible'); }); }
  setTimeout(function () { revealEls.forEach(function (el) { el.classList.add('visible'); }); }, 4000);

  /* ---------- stats ---------- */
  function countUp(el, to) {
    if (reduceMotion) { el.textContent = to; return; }
    var start = null;
    function step(ts) { if (!start) start = ts; var p = Math.min((ts - start) / 1100, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  function allSubs() { return SEEDS.concat(userSubs); }
  function updateStats() {
    countUp($('#statPlaces'), DATA.length);
    countUp($('#statGems'), DATA.reduce(function (n, d) { return n + d.gems.length; }, 0));
    countUp($('#statDishes'), DATA.reduce(function (n, d) { return n + d.food.length; }, 0));
    $('#statCommunity').textContent = allSubs().length;
  }

  /* ---------- explorer ---------- */
  var vibes = [];
  DATA.forEach(function (d) { d.vibes.forEach(function (v) { if (vibes.indexOf(v) < 0) vibes.push(v); }); });
  vibes.sort();
  var activeVibes = [];
  $('#vibeChips').innerHTML = vibes.map(function (v) { return '<button type="button" class="chip" data-v="' + v + '" aria-pressed="false">' + (VIBE_LABEL[v] || v) + '</button>'; }).join('');
  $('#vibeChips').addEventListener('click', function (e) {
    var c = e.target.closest('.chip'); if (!c) return;
    var v = c.getAttribute('data-v'), i = activeVibes.indexOf(v);
    if (i < 0) activeVibes.push(v); else activeVibes.splice(i, 1);
    c.classList.toggle('on', i < 0); c.setAttribute('aria-pressed', i < 0);
    renderCards();
  });
  $('#monthSel').innerHTML = '<option value="0">Any month</option>' + MONTHS_FULL.map(function (m, i) { return '<option value="' + (i + 1) + '">' + m + (i + 1 === NOW_MONTH ? ' (now)' : '') + '</option>'; }).join('');

  var F = { budget: $('#budgetRange'), style: $('#styleSel'), region: $('#regionSel'), month: $('#monthSel'), sort: $('#sortSel'), q: $('#searchInput'), fav: $('#favOnly'), hid: $('#hiddenOnly') };
  function searchText(d) {
    return [d.name, d.state, d.country, d.region, d.tagline, d.vibes.join(' '),
      d.food.map(function (f) { return f.dish + ' ' + f.note; }).join(' '), d.gems.map(function (g) { return g.name; }).join(' ')].join(' ').toLowerCase();
  }
  function filtered() {
    var budget = +F.budget.value, style = F.style.value, region = F.region.value, month = +F.month.value, q = F.q.value.trim().toLowerCase();
    var list = DATA.filter(function (d) {
      if (d.budget[style] > budget) return false;
      if (region !== 'all' && d.region !== region) return false;
      if (month && d.months.indexOf(month) < 0) return false;
      if (activeVibes.length && !activeVibes.some(function (v) { return d.vibes.indexOf(v) >= 0; })) return false;
      if (F.fav.checked && saved.indexOf(d.id) < 0) return false;
      if (F.hid.checked && d.hidden < 4) return false;
      if (q && searchText(d).indexOf(q) < 0) return false;
      return true;
    });
    var sort = F.sort.value;
    list.forEach(function (d) {
      var s = d.hidden * 10 + (d.months.indexOf(month || NOW_MONTH) >= 0 ? 15 : 0) + (1 - d.budget[style] / budget) * 20;
      d._score = s;
    });
    list.sort(function (a, b) {
      if (sort === 'hidden') return b.hidden - a.hidden || a.budget[style] - b.budget[style];
      if (sort === 'cheap') return a.budget[style] - b.budget[style];
      if (sort === 'name') return a.name.localeCompare(b.name);
      return b._score - a._score;
    });
    return list;
  }
  function cardHTML(d, style, i) {
    var on = saved.indexOf(d.id) >= 0, inSeason = d.months.indexOf(NOW_MONTH) >= 0;
    return '<article class="card" data-id="' + d.id + '" tabindex="0" role="button" aria-label="Open ' + esc(d.name) + '" style="animation-delay:' + Math.min(i, 12) * 40 + 'ms">' +
      '<div class="card-art">' + art(d, 'c') +
      '<span class="badge gem">' + stars(d.hidden).replace(/☆/g, '') + ' HIDDEN</span>' +
      (inSeason ? '<span class="badge season">IN SEASON NOW</span>' : '') +
      '<button type="button" class="fav' + (on ? ' on' : '') + '" data-fav="' + d.id + '" aria-pressed="' + on + '" aria-label="' + (on ? 'Remove ' : 'Save ') + esc(d.name) + '">' + (on ? '♥' : '♡') + '</button></div>' +
      '<div class="card-body"><div class="card-meta">' + esc(d.state) + ' · ' + esc(d.country) + '</div><h3>' + esc(d.name) + '</h3><p>' + esc(d.tagline) + '</p>' +
      '<div class="card-foot"><span class="price">' + inr(d.budget[style]) + ' <small>/ day</small></span><span class="match">' + d.vibes.slice(0, 2).join(' · ') + '</span></div></div></article>';
  }
  function renderCards() {
    var style = F.style.value, list = filtered();
    $('#budgetVal').textContent = inr(F.budget.value);
    $('#cards').innerHTML = list.map(function (d, i) { return cardHTML(d, style, i); }).join('');
    $('#emptyState').hidden = list.length > 0;
    $('#resultCount').textContent = list.length + ' of ' + DATA.length + ' places';
  }
  ['input', 'change'].forEach(function (ev) { Object.keys(F).forEach(function (k) { F[k].addEventListener(ev, renderCards); }); });
  $('#resetBtn').addEventListener('click', function () {
    F.budget.value = 2500; F.style.value = 'mid'; F.region.value = 'all'; F.month.value = 0; F.sort.value = 'match'; F.q.value = ''; F.fav.checked = false; F.hid.checked = false;
    activeVibes = []; $$('.chip').forEach(function (c) { c.classList.remove('on'); c.setAttribute('aria-pressed', 'false'); });
    renderCards();
  });
  $('#cards').addEventListener('click', function (e) {
    var f = e.target.closest('.fav');
    if (f) { e.stopPropagation(); toggleSave(f.getAttribute('data-fav')); return; }
    var c = e.target.closest('.card'); if (c) openModal(c.getAttribute('data-id'));
  });
  $('#cards').addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('card')) { e.preventDefault(); openModal(e.target.getAttribute('data-id')); }
  });

  /* ---------- favourites + planner ---------- */
  function toggleSave(id) {
    var i = saved.indexOf(id), d = byId(id);
    if (i < 0) { saved.push(id); toast('♥ ' + d.name + ' added to My Orbit'); } else { saved.splice(i, 1); toast(d.name + ' removed from My Orbit'); }
    store('saved', saved); syncSaved();
  }
  function syncSaved() {
    $('#savedCount').textContent = saved.length;
    var keep = document.activeElement && document.activeElement.getAttribute && document.activeElement.getAttribute('data-fav');
    renderCards(); renderPlanner();
    if (keep) { var again = $('[data-fav="' + keep + '"]'); if (again) again.focus(); }
    var mSave = $('#mSave');
    if (!$('#modal').hidden && currentId) mSave.textContent = saved.indexOf(currentId) >= 0 ? '♥ SAVED' : '♡ SAVE';
  }
  var P = { days: $('#plDays'), people: $('#plPeople'), style: $('#plStyle'), travel: $('#plTravel') };
  P.days.value = plan.days; P.people.value = plan.people; P.style.value = plan.style; P.travel.value = plan.travel;
  function readPlan() {
    plan = { days: clamp(+P.days.value || 1, 1, 30), people: clamp(+P.people.value || 1, 1, 20), style: P.style.value, travel: Math.max(0, +P.travel.value || 0) };
    store('plan', plan);
  }
  function planTotals() {
    var rows = saved.map(byId).filter(Boolean).map(function (d) {
      var stay = d.budget[plan.style] * plan.days * plan.people, travel = plan.travel * plan.people;
      return { d: d, stay: stay, travel: travel, total: stay + travel };
    });
    return { rows: rows, total: rows.reduce(function (n, r) { return n + r.total; }, 0) };
  }
  function renderPlanner() {
    var t = planTotals();
    $('#plannerList').innerHTML = t.rows.length ? t.rows.map(function (r) {
      return '<div class="pl-row"><div class="thumb">' + art(r.d, 'p') + '</div><div><b data-open="' + r.d.id + '">' + esc(r.d.name) + '</b><small>' + esc(r.d.state) + ' · ' + plan.days + ' days · ' + plan.people + ' traveler' + (plan.people > 1 ? 's' : '') + '</small></div>' +
        '<span class="pl-cost">' + inr(r.total) + '</span><button class="rm" data-rm="' + r.d.id + '" aria-label="Remove ' + esc(r.d.name) + '">×</button></div>';
    }).join('') : '<div class="pl-empty">Nothing saved yet. Tap ♡ on any place to build your orbit.</div>';
    var perPerson = plan.people ? t.total / plan.people : 0;
    $('#plannerTotal').innerHTML = t.rows.length
      ? '<div><span>Estimated total</span><br><b>' + inr(t.total) + '</b></div><div><span>Per person</span><br><b>' + inr(perPerson) + '</b></div><div><span>Places · days</span><br><b>' + t.rows.length + ' · ' + t.rows.length * plan.days + '</b></div>'
      : '<span>Add places to see your estimate.</span>';
  }
  Object.keys(P).forEach(function (k) { P[k].addEventListener('input', function () { readPlan(); renderPlanner(); }); });
  $('#plannerList').addEventListener('click', function (e) {
    var rm = e.target.closest('[data-rm]'); if (rm) { toggleSave(rm.getAttribute('data-rm')); return; }
    var op = e.target.closest('[data-open]'); if (op) openModal(op.getAttribute('data-open'));
  });
  function planText() {
    var t = planTotals();
    if (!t.rows.length) return '';
    return 'My Orbit trip plan (Orbital by Saim Patel)\n' + plan.days + ' days per place · ' + plan.people + ' traveler(s) · ' + STYLE_NAME[plan.style] + '\n\n' +
      t.rows.map(function (r, i) { return (i + 1) + '. ' + r.d.name + ', ' + r.d.state + ' — ' + inr(r.total) + ' (stay+food ' + inr(r.stay) + ', travel ' + inr(r.travel) + ')'; }).join('\n') +
      '\n\nTotal: ' + inr(t.total) + ' (' + inr(t.total / plan.people) + ' per person)\nPrices are approximate.';
  }
  $('#copyPlan').addEventListener('click', function () {
    var txt = planText(); if (!txt) { toast('Save a place first'); return; }
    copyText(txt).then(function (ok) { toast(ok ? 'Plan copied to clipboard' : 'Could not copy — select and copy manually'); });
  });
  $('#clearPlan').addEventListener('click', function () { if (saved.length && confirm('Remove all saved places?')) { saved = []; store('saved', saved); syncSaved(); } });
  $('#printPlan').addEventListener('click', function () {
    var t = planTotals(); if (!t.rows.length) { toast('Save a place first'); return; }
    var old = $('#printArea'); if (old) old.remove();
    var div = document.createElement('div'); div.id = 'printArea';
    div.innerHTML = '<h1>My Orbit trip plan</h1><p>' + plan.days + ' days per place · ' + plan.people + ' traveler(s) · ' + STYLE_NAME[plan.style] + '</p><table><tr><th>Place</th><th>Stay + food</th><th>Travel</th><th>Total</th></tr>' +
      t.rows.map(function (r) { return '<tr><td>' + esc(r.d.name) + ', ' + esc(r.d.state) + '</td><td>' + inr(r.stay) + '</td><td>' + inr(r.travel) + '</td><td>' + inr(r.total) + '</td></tr>'; }).join('') +
      '</table><h3 style="margin-top:14px">Total: ' + inr(t.total) + '</h3><p>Prices are approximate. Orbital by Saim Patel.</p>';
    document.body.appendChild(div); window.print();
  });

  /* ---------- modal ---------- */
  var currentId = null, currentTab = 'overview', lastFocus = null, calc = { days: 4, people: 2, style: 'mid', travel: 4000 };
  var modal = $('#modal');
  function openModal(id, tab) {
    var d = byId(id); if (!d) return;
    currentId = id; currentTab = tab || 'overview'; lastFocus = document.activeElement;
    calc = { days: plan.days, people: plan.people, style: plan.style, travel: plan.travel };
    $('#mArt').innerHTML = art(d, 'm');
    $('#mMeta').textContent = (d.state + ' · ' + d.country).toUpperCase();
    $('#mTitle').textContent = d.name; $('#mTag').textContent = d.tagline;
    $('#mSave').textContent = saved.indexOf(id) >= 0 ? '♥ SAVED' : '♡ SAVE';
    modal.hidden = false; document.body.classList.add('no-scroll');
    $('.modal-card', modal).scrollTop = 0;
    renderTab();
    try { history.replaceState(null, '', '#p/' + id); } catch (e) {}
    $('.modal-close', modal).focus();
  }
  function closeModal() {
    modal.hidden = true; currentId = null; document.body.classList.remove('no-scroll');
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function renderTab() {
    var d = byId(currentId), b = $('#mBody'), html = '';
    $$('#mTabs button').forEach(function (t) { t.classList.toggle('on', t.getAttribute('data-tab') === currentTab); });
    if (currentTab === 'overview') {
      html = '<p>' + esc(d.desc) + '</p><div class="kv"><div><small>Hidden score</small><b>' + stars(d.hidden) + '</b></div><div><small>From</small><b>' + inr(d.budget.low) + ' / day</b></div><div><small>Region</small><b>' + esc(d.region) + '</b></div><div><small>Vibes</small><b>' + d.vibes.join(', ') + '</b></div></div>' +
        '<p style="margin-top:20px"><b style="color:#fff">Best months</b></p><div class="months">' + MONTHS.map(function (m, i) { return '<span class="' + (d.months.indexOf(i + 1) >= 0 ? 'ok' : '') + (i + 1 === NOW_MONTH ? ' now' : '') + '" title="' + MONTHS_FULL[i] + '">' + m + '</span>'; }).join('') + '</div>' +
        '<p style="margin-top:20px"><b style="color:#fff">How to get there</b><br>' + esc(d.from) + '</p>' +
        '<a class="maplink" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(d.name + ' ' + d.state + ' ' + d.country) + '">Open in Google Maps ↗</a>';
    } else if (currentTab === 'gems') {
      html = '<ul class="list">' + d.gems.map(function (g) { return '<li><b>💎 ' + esc(g.name) + '</b>' + esc(g.note) + '</li>'; }).join('') + '</ul>';
    } else if (currentTab === 'food') {
      html = '<ul class="list">' + d.food.map(function (f) { return '<li><b>🍽 ' + esc(f.dish) + '</b>' + esc(f.note) + ' <em>' + esc(f.price) + '</em></li>'; }).join('') + '</ul>';
    } else if (currentTab === 'tips') {
      html = '<ul class="list tips">' + d.tips.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>';
    } else if (currentTab === 'cost') {
      html = '<div class="cost-calc"><div class="field"><label for="cDays">Days</label><input id="cDays" type="number" min="1" max="30" value="' + calc.days + '"></div>' +
        '<div class="field"><label for="cPeople">Travelers</label><input id="cPeople" type="number" min="1" max="20" value="' + calc.people + '"></div>' +
        '<div class="field"><label for="cStyle">Style</label><select id="cStyle">' + ['low', 'mid', 'high'].map(function (s) { return '<option value="' + s + '"' + (s === calc.style ? ' selected' : '') + '>' + STYLE_NAME[s] + '</option>'; }).join('') + '</select></div></div>' +
        '<div class="field" style="margin-bottom:16px"><label for="cTravel">Travel cost per person to get there (₹)</label><input id="cTravel" type="number" min="0" step="500" value="' + calc.travel + '"></div><div id="costOut"></div>';
    } else if (currentTab === 'community') {
      var subs = allSubs().filter(function (s) { return s.place.toLowerCase() === d.name.toLowerCase(); });
      html = (subs.length ? subs.map(commItemHTML).join('') : '<p>No tips yet for ' + esc(d.name) + '. Be the first to share one.</p>') + '<p style="margin-top:14px"><button class="btn btn-sm" id="addTipHere" type="button">ADD A TIP</button></p>';
    }
    b.innerHTML = html;
    if (currentTab === 'cost') { bindCost(); updateCost(); }
    if (currentTab === 'community') {
      $('#addTipHere').addEventListener('click', function () { var n = byId(currentId).name; closeModal(); $('#gPlace').value = n; $('#community').scrollIntoView(); setTimeout(function () { $('#gTitle').focus(); }, 600); });
    }
  }
  function bindCost() {
    [['cDays', 'days'], ['cPeople', 'people'], ['cStyle', 'style'], ['cTravel', 'travel']].forEach(function (p) {
      $('#' + p[0]).addEventListener('input', function () {
        var v = this.value; calc[p[1]] = p[1] === 'style' ? v : (+v || 0); updateCost();
      });
    });
  }
  function updateCost() {
    var d = byId(currentId), days = clamp(calc.days || 1, 1, 30), ppl = clamp(calc.people || 1, 1, 20);
    var perDay = d.budget[calc.style], stay = perDay * 0.45 * days * ppl, food = perDay * 0.3 * days * ppl, local = perDay * 0.15 * days * ppl, act = perDay * 0.1 * days * ppl, travel = (calc.travel || 0) * ppl;
    var total = stay + food + local + act + travel;
    var seg = [['Stay', stay, '#8b5cf6'], ['Food', food, '#06b6d4'], ['Local transport', local, '#f59e0b'], ['Activities', act, '#ec4899'], ['Getting there', travel, '#64748b']];
    $('#costOut').innerHTML = '<div class="kv"><div><small>Total</small><b>' + inr(total) + '</b></div><div><small>Per person</small><b>' + inr(total / ppl) + '</b></div><div><small>Per day / person</small><b>' + inr(perDay) + '</b></div></div>' +
      '<div class="cost-bar">' + seg.map(function (s) { return '<i style="width:' + (total ? s[1] / total * 100 : 0) + '%;background:' + s[2] + '" title="' + s[0] + '"></i>'; }).join('') + '</div>' +
      '<div class="kv">' + seg.map(function (s) { return '<div><small style="color:' + s[2] + '">● ' + s[0] + '</small><b>' + inr(s[1]) + '</b></div>'; }).join('') + '</div>' +
      '<p style="margin-top:14px;font-size:.85rem">Estimates are approximate and for planning only. Check current prices before booking.</p>';
  }
  $('#mTabs').addEventListener('click', function (e) { var t = e.target.closest('button'); if (t) { currentTab = t.getAttribute('data-tab'); renderTab(); } });
  $('#mSave').addEventListener('click', function () { if (currentId) toggleSave(currentId); });
  $('#mShare').addEventListener('click', function () {
    var url = location.origin + location.pathname + '#p/' + currentId, d = byId(currentId);
    if (navigator.share) { navigator.share({ title: d.name + ' — Orbital', text: d.tagline, url: url }).catch(function () {}); return; }
    copyText(url).then(function (ok) { toast(ok ? 'Link copied' : url); });
  });
  modal.addEventListener('click', function (e) { if (e.target.hasAttribute('data-close')) closeModal(); });

  /* ---------- quiz ---------- */
  var QUIZ = [
    { q: 'What kind of trip are you craving?', key: 'vibe', opts: [['⛰', 'Mountains & trekking', ['mountain', 'trek']], ['🏖', 'Beaches & sea', ['beach']], ['🏛', 'Culture & history', ['culture', 'spiritual']], ['🌿', 'Nature & wildlife', ['nature', 'adventure']], ['🍜', 'Food first', ['food']]] },
    { q: 'What is your daily budget per person?', key: 'budget', opts: [['💸', 'Under ₹1,500', 1500], ['👍', '₹1,500 – ₹2,500', 2500], ['✨', '₹2,500 – ₹4,000', 4000], ['💎', 'No limit', 99999]] },
    { q: 'When are you travelling?', key: 'season', opts: [['❄️', 'Winter (Dec–Feb)', [12, 1, 2]], ['🌸', 'Spring (Mar–May)', [3, 4, 5]], ['🌧', 'Monsoon (Jun–Aug)', [6, 7, 8]], ['🍂', 'Autumn (Sep–Nov)', [9, 10, 11]], ['🗓', 'Right now', [NOW_MONTH]]] },
    { q: 'How off-the-beaten-path do you want it?', key: 'hidden', opts: [['🙂', 'Some tourists are fine', 1], ['🧭', 'Fairly quiet', 3], ['🕵️', 'Truly hidden', 4]] }
  ];
  var quizState = { i: 0, a: {} };
  function renderQuiz() {
    var box = $('#quizBox');
    if (quizState.i >= QUIZ.length) {
      var a = quizState.a;
      var scored = DATA.map(function (d) {
        var s = 0;
        var vm = d.vibes.filter(function (v) { return a.vibe.indexOf(v) >= 0; }).length; s += Math.min(vm, 2) * 25;
        var price = d.budget.mid; s += price <= a.budget ? 25 : Math.max(0, 25 - (price - a.budget) / 100);
        var sm = d.months.filter(function (m) { return a.season.indexOf(m) >= 0; }).length / a.season.length; s += sm * 15;
        s += d.hidden >= a.hidden ? 10 : 0;
        return { d: d, s: Math.min(100, Math.round(s)) };
      }).sort(function (x, y) { return y.s - x.s; }).slice(0, 4);
      box.innerHTML = '<div class="q-step">YOUR TOP MATCHES</div><h3 class="q-title">Your orbit is ready</h3><div class="q-results">' + scored.map(function (r) {
        return '<button type="button" class="q-res" data-open="' + r.d.id + '"><span class="thumb">' + art(r.d, 'q') + '</span><span><b>' + esc(r.d.name) + '</b><em>' + esc(r.d.state) + ' · from ' + inr(r.d.budget.low) + ' / day</em></span><span class="pct">' + r.s + '% match</span></button>';
      }).join('') + '</div><button class="btn btn-sm" id="quizRestart" type="button">RETAKE QUIZ</button>';
      $('#quizRestart').addEventListener('click', function () { quizState = { i: 0, a: {} }; renderQuiz(); });
      return;
    }
    var q = QUIZ[quizState.i];
    box.innerHTML = '<div class="q-bar"><i style="width:' + (quizState.i / QUIZ.length * 100) + '%"></i></div><div class="q-step">QUESTION ' + (quizState.i + 1) + ' OF ' + QUIZ.length + '</div><h3 class="q-title">' + q.q + '</h3><div class="q-opts">' +
      q.opts.map(function (o, idx) { return '<button type="button" class="q-opt" data-idx="' + idx + '"><span>' + o[0] + '</span>' + o[1] + '</button>'; }).join('') + '</div>' +
      (quizState.i ? '<p style="margin-top:16px"><button class="link-btn" id="quizBack" type="button">← Back</button></p>' : '');
    var back = $('#quizBack'); if (back) back.addEventListener('click', function () { quizState.i--; renderQuiz(); });
  }
  $('#quizBox').addEventListener('click', function (e) {
    var o = e.target.closest('.q-opt');
    if (o) { var q = QUIZ[quizState.i]; quizState.a[q.key] = q.opts[+o.getAttribute('data-idx')][2]; quizState.i++; renderQuiz(); return; }
    var r = e.target.closest('.q-res'); if (r) openModal(r.getAttribute('data-open'));
  });
  renderQuiz();

  /* ---------- food ---------- */
  var dishColors = ['#06b6d4', '#8b5cf6', '#f59e0b', '#ec4899', '#22c55e'];
  var dishes = [];
  DATA.forEach(function (d) { d.food.forEach(function (f, i) { dishes.push({ d: d, f: f, c: dishColors[(hash(d.id) + i) % dishColors.length] }); }); });
  function renderFood() {
    var q = $('#foodSearch').value.trim().toLowerCase(), r = $('#foodRegion').value;
    var list = dishes.filter(function (x) { return (r === 'all' || x.d.region === r) && (!q || (x.f.dish + ' ' + x.f.note + ' ' + x.d.name + ' ' + x.d.state).toLowerCase().indexOf(q) >= 0); });
    $('#foodGrid').innerHTML = list.length ? list.map(function (x) {
      return '<button type="button" class="dish" style="--dc:' + x.c + '" data-id="' + x.d.id + '"><div class="where">' + esc(x.d.name) + ' · ' + esc(x.d.state) + '</div><h4>' + esc(x.f.dish) + '</h4><p>' + esc(x.f.note) + '</p><div class="dp">' + esc(x.f.price) + '</div></button>';
    }).join('') : '<div class="empty" style="grid-column:1/-1">No dishes match. Try “fish”, “millet” or “tea”.</div>';
  }
  $('#foodSearch').addEventListener('input', renderFood);
  $('#foodRegion').addEventListener('change', renderFood);
  $('#foodGrid').addEventListener('click', function (e) { var c = e.target.closest('.dish'); if (c) openModal(c.getAttribute('data-id'), 'food'); });

  /* ---------- community ---------- */
  var rating = 0, starsBox = $('#starsInput');
  starsBox.innerHTML = [1, 2, 3, 4, 5].map(function (n) { return '<button type="button" data-n="' + n + '" role="radio" aria-checked="false" aria-label="' + n + ' star' + (n > 1 ? 's' : '') + '">★</button>'; }).join('');
  function paintStars(n) { $$('button', starsBox).forEach(function (b) { var on = +b.getAttribute('data-n') <= n; b.classList.toggle('on', on); b.setAttribute('aria-checked', +b.getAttribute('data-n') === rating); }); }
  starsBox.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) { rating = +b.getAttribute('data-n'); paintStars(rating); } });
  starsBox.addEventListener('mouseover', function (e) { var b = e.target.closest('button'); if (b) paintStars(+b.getAttribute('data-n')); });
  starsBox.addEventListener('mouseleave', function () { paintStars(rating); });
  $('#placeList').innerHTML = DATA.map(function (d) { return '<option value="' + esc(d.name) + '">'; }).join('');
  var cats = ['Hidden gem', 'Food', 'Local tip', 'Culture', 'Budget hack', 'Warning'];
  $('#commFilter').innerHTML += cats.map(function (c) { return '<option>' + c + '</option>'; }).join('');
  $('#gNote').addEventListener('input', function () { $('#gCount').textContent = this.value.length + ' / 500'; });

  function commItemHTML(s) {
    var voted = votes[s.id], mine = !s.seed;
    return '<div class="c-item" data-cid="' + esc(s.id) + '"><div class="c-top"><span>' + esc(s.place) + '</span><span class="tag">' + esc(s.category) + '</span><span class="stars-row" style="color:#fbbf24">' + stars(s.rating || 0) + '</span></div>' +
      '<h4>' + esc(s.title) + '</h4><p>' + esc(s.note) + '</p><div class="c-foot"><span>by ' + esc(s.author || 'Anonymous') + ' · ' + esc(s.date) + '</span>' +
      '<button type="button" class="vote' + (voted ? ' on' : '') + '" data-vote="' + esc(s.id) + '" aria-pressed="' + !!voted + '">▲ ' + ((s.votes || 0) + (voted ? 1 : 0)) + '</button>' +
      (mine ? '<button type="button" class="c-del" data-del="' + esc(s.id) + '">Delete</button>' : '') + '</div></div>';
  }
  function renderComm() {
    var f = $('#commFilter').value, sort = $('#commSort').value;
    var list = allSubs().filter(function (s) { return f === 'all' || s.category === f; });
    list.sort(function (a, b) { return sort === 'votes' ? ((b.votes || 0) + (votes[b.id] ? 1 : 0)) - ((a.votes || 0) + (votes[a.id] ? 1 : 0)) : String(b.date).localeCompare(String(a.date)) || b.id.localeCompare(a.id); });
    $('#commList').innerHTML = list.length ? list.map(commItemHTML).join('') : '<div class="empty">Nothing here yet. Share the first one.</div>';
    $('#statCommunity').textContent = allSubs().length;
  }
  function bindVotes(root) {
    root.addEventListener('click', function (e) {
      var v = e.target.closest('[data-vote]');
      if (v) { var id = v.getAttribute('data-vote'); if (votes[id]) delete votes[id]; else votes[id] = 1; store('votes', votes); renderComm(); if (!modal.hidden && currentTab === 'community') renderTab(); return; }
      var del = e.target.closest('[data-del]');
      if (del && confirm('Delete your entry?')) { var did = del.getAttribute('data-del'); userSubs = userSubs.filter(function (s) { return s.id !== did; }); store('subs', userSubs); renderComm(); toast('Entry deleted'); }
    });
  }
  bindVotes($('#commList'));
  bindVotes($('#mBody'));
  $('#commFilter').addEventListener('change', renderComm);
  $('#commSort').addEventListener('change', renderComm);
  $('#gemForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var place = $('#gPlace').value.trim(), title = $('#gTitle').value.trim(), note = $('#gNote').value.trim(), msg = $('#formMsg');
    msg.className = 'form-msg';
    if (!place || !title || note.length < 15) { msg.textContent = 'Please add a place, a title and at least 15 characters of details.'; return; }
    if (!rating) { msg.textContent = 'Please choose a rating.'; return; }
    var entry = { id: 'u' + Date.now(), place: place, title: title, note: note, category: $('#gCat').value, rating: rating, author: $('#gName').value.trim() || 'Anonymous', votes: 0, date: new Date().toISOString().slice(0, 10) };
    userSubs.unshift(entry); store('subs', userSubs);
    this.reset(); rating = 0; paintStars(0); $('#gCount').textContent = '0 / 500';
    msg.className = 'form-msg ok'; msg.textContent = 'Thanks! Your tip is live below.';
    $('#commSort').value = 'new'; renderComm();
    toast('Tip added to Orbital');
  });
  $('#exportBtn').addEventListener('click', function () {
    var blob = new Blob([JSON.stringify(allSubs(), null, 2)], { type: 'application/json' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'orbital-community.json';
    document.body.appendChild(a); a.click(); document.body.removeChild(a); setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });

  /* ---------- global search (Ctrl/Cmd+K or "/") ---------- */
  var overlay = $('#searchOverlay'), gInput = $('#gSearch'), gResults = $('#gResults'), searchFocus = null;
  function openSearch() { searchFocus = document.activeElement; overlay.hidden = false; document.body.classList.add('no-scroll'); gInput.value = ''; renderSearch(); gInput.focus(); }
  function closeSearch() { overlay.hidden = true; if (modal.hidden) document.body.classList.remove('no-scroll'); if (searchFocus && searchFocus.focus) searchFocus.focus(); }
  function renderSearch() {
    var q = gInput.value.trim().toLowerCase(), out = [];
    DATA.forEach(function (d) {
      if (!q || searchText(d).indexOf(q) >= 0) {
        var why = '';
        if (q) {
          d.food.forEach(function (f) { if (!why && f.dish.toLowerCase().indexOf(q) >= 0) why = '🍽 ' + f.dish; });
          d.gems.forEach(function (g) { if (!why && g.name.toLowerCase().indexOf(q) >= 0) why = '💎 ' + g.name; });
        }
        out.push({ d: d, why: why || d.tagline });
      }
    });
    gResults.innerHTML = out.length ? out.slice(0, 12).map(function (r) {
      return '<button type="button" class="g-res" data-open="' + r.d.id + '"><span class="thumb">' + art(r.d, 's') + '</span><span><b>' + esc(r.d.name) + '</b><small>' + esc(r.d.state) + ' · ' + esc(r.why) + '</small></span></button>';
    }).join('') : '<div class="hint">No matches. Try a place, state or dish.</div>';
  }
  $('#searchBtn').addEventListener('click', openSearch);
  gInput.addEventListener('input', renderSearch);
  gInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') { var f = $('.g-res', gResults); if (f) f.click(); } });
  gResults.addEventListener('click', function (e) { var b = e.target.closest('.g-res'); if (b) { var id = b.getAttribute('data-open'); closeSearch(); openModal(id); } });
  overlay.addEventListener('click', function (e) { if (e.target.hasAttribute('data-close-search')) closeSearch(); });
  document.addEventListener('keydown', function (e) {
    var typing = /INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || '');
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); overlay.hidden ? openSearch() : closeSearch(); }
    else if (e.key === '/' && !typing && overlay.hidden && modal.hidden) { e.preventDefault(); openSearch(); }
    else if (e.key === 'Escape') { if (!overlay.hidden) closeSearch(); else if (!modal.hidden) closeModal(); else if (mobileMenu.classList.contains('open')) toggle.click(); }
    else if (e.key === 'Tab' && !modal.hidden) { /* keep focus inside modal */
      var f = $$('button, a[href], input, select, textarea', modal).filter(function (x) { return x.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- surprise me ---------- */
  function surprise() { var d = DATA[Math.floor(Math.random() * DATA.length)]; toast('🎲 ' + d.name + ' — ' + d.tagline); openModal(d.id); }
  $('#surpriseBtn').addEventListener('click', surprise);
  $('#surprise2').addEventListener('click', surprise);

  /* ---------- init ---------- */
  $('#year').textContent = new Date().getFullYear();
  updateStats(); renderCards(); renderFood(); renderComm(); syncSaved();
  var m = location.hash.match(/^#p\/([\w-]+)/);
  if (m && byId(m[1])) openModal(m[1]);

  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }
})();
