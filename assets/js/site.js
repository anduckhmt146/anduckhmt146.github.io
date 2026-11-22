(function () {
  'use strict';
  var cfg = window.SITE || { baseurl: '', pdf: '' };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  document.body.classList.add('dark-mode');

  // ---- Active nav link, dropdown groups + mobile menu ----
  var path = location.pathname.replace(/\/$/, '') || '/';
  $$('.main-nav a[data-match]').forEach(function (a) {
    var m = a.getAttribute('data-match');
    if ((m === '/' && path === '/') || (m !== '/' && path.indexOf(m) === 0)) {
      a.classList.add('active');
      var g = a.closest('.nav-group'); if (g) $('.nav-group__btn', g).classList.add('active');
    }
  });
  var groups = $$('.nav-group');
  function closeGroups(except) {
    groups.forEach(function (g) {
      if (g === except) return;
      g.classList.remove('is-open'); $('.nav-group__btn', g).setAttribute('aria-expanded', 'false');
    });
  }
  groups.forEach(function (g) {
    var btn = $('.nav-group__btn', g);
    btn.addEventListener('click', function (e) {
      e.stopPropagation(); var open = !g.classList.contains('is-open');
      closeGroups(g); g.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', open);
    });
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.nav-group')) closeGroups(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeGroups(); });
  var toggle = $('#nav-toggle'), nav = $('#main-nav');
  if (toggle && nav) toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });

  // ---- CV modal ----
  // Desktop: native PDF viewer in an iframe. Phones: render pages with PDF.js
  // scaled to the screen width (mobile browsers don't fit PDFs inside iframes).
  var overlay = $('#pdf-modal-overlay'), iframe = $('#pdf-viewer-iframe'), pages = $('#pdf-pages');
  var useCanvas = function () { return window.matchMedia('(max-width: 760px)').matches || /iPhone|iPad|Android/i.test(navigator.userAgent); };
  var rendered = false;
  function renderPdf() {
    if (rendered) return; rendered = true;
    var lib = window.pdfjsLib;
    if (!lib) { rendered = false; window.open(cfg.pdf, '_blank'); return; }
    lib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    pages.innerHTML = '<p class="pdf-loading">Loading…</p>';
    lib.getDocument(cfg.pdf).promise.then(function (pdf) {
      pages.innerHTML = '';
      var width = pages.clientWidth - 16, ratio = Math.min(window.devicePixelRatio || 1, 2);
      var chain = Promise.resolve();
      for (var n = 1; n <= pdf.numPages; n++) (function (n) {
        chain = chain.then(function () { return pdf.getPage(n); }).then(function (page) {
          var base = page.getViewport({ scale: 1 }), scale = (width / base.width) * ratio;
          var vp = page.getViewport({ scale: scale });
          var cv = document.createElement('canvas'); cv.width = vp.width; cv.height = vp.height;
          cv.style.width = width + 'px'; cv.style.height = (vp.height / ratio) + 'px';
          pages.appendChild(cv);
          return page.render({ canvasContext: cv.getContext('2d'), viewport: vp }).promise;
        });
      })(n);
      return chain;
    }).catch(function () { rendered = false; pages.innerHTML = '<p class="pdf-loading">Could not load the CV. Use "Open" above.</p>'; });
  }
  function closePdf() {
    overlay.classList.remove('is-open'); overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; iframe.src = ''; pages.innerHTML = ''; rendered = false;
  }
  if (overlay) {
    $('#pdf-review-btn').addEventListener('click', function () {
      overlay.classList.add('is-open'); overlay.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
      if (useCanvas()) { iframe.hidden = true; pages.hidden = false; renderPdf(); }
      else { pages.hidden = true; iframe.hidden = false; iframe.src = cfg.pdf; }
    });
    $('#pdf-modal-close').addEventListener('click', closePdf);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closePdf(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) closePdf();
    });
  }

  // ---- Social / connect modal with QR ----
  var sOverlay = $('#social-modal-overlay');
  if (sOverlay) {
    var qrBox = $('#qr-box'), qrLabel = $('#qr-label'), items = $$('.social-item', sOverlay);
    var closeSocial = function () { sOverlay.classList.remove('is-open'); sOverlay.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
    var NS = 'http://www.w3.org/2000/svg';
    // Render QR as styled SVG: rounded dots, brand gradient, coloured finder eyes
    var brandQr = function (url, colors) {
      var qr = qrcode(0, 'H'); qr.addData(url); qr.make();
      var n = qr.getModuleCount(), q = 2, size = n + q * 2, id = 'g' + Date.now();
      var stops = colors.map(function (c, i) {
        return '<stop offset="' + (colors.length === 1 ? 0 : (i / (colors.length - 1)) * 100) + '%" stop-color="' + c + '"/>';
      }).join('');
      var inFinder = function (r, c) { return (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7); };
      var mid = n / 2, hole = Math.max(3, Math.round(n * 0.17)) / 2; // centre area for logo
      var dots = '', eyes = '';
      for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) {
        if (!qr.isDark(r, c) || inFinder(r, c)) continue;
        if (Math.abs(r + 0.5 - mid) < hole && Math.abs(c + 0.5 - mid) < hole) continue;
        dots += '<circle cx="' + (c + q + 0.5) + '" cy="' + (r + q + 0.5) + '" r="0.54"/>';
      }
      [[0, 0], [0, n - 7], [n - 7, 0]].forEach(function (p) {
        var x = p[1] + q, y = p[0] + q;
        eyes += '<rect x="' + (x + 0.5) + '" y="' + (y + 0.5) + '" width="6" height="6" rx="1.8" fill="none" stroke="url(#' + id + ')" stroke-width="1"/>' +
                '<rect x="' + (x + 2) + '" y="' + (y + 2) + '" width="3" height="3" rx="1" fill="url(#' + id + ')"/>';
      });
      var logo = '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + (hole + 0.3) + '" fill="#fff"/>';
      return '<svg xmlns="' + NS + '" viewBox="0 0 ' + size + ' ' + size + '">' +
        '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1">' + stops + '</linearGradient></defs>' +
        '<g fill="url(#' + id + ')">' + dots + '</g>' + eyes + logo + '</svg>';
    };
    var showQr = function (item) {
      items.forEach(function (i) { i.classList.toggle('is-selected', i === item); });
      if (!window.qrcode) return;
      var colors = item.dataset.colors.split(',');
      qrBox.innerHTML = brandQr(item.dataset.url, (item.dataset.qr || item.dataset.colors).split(',')) +
        '<span class="qr-badge" style="color:' + colors[0] + '"><i class="' + item.dataset.icon + '"></i></span>';
      qrBox.style.setProperty('--brand', 'linear-gradient(135deg,' + colors.join(',') + ')');
      qrLabel.textContent = 'Scan to open ' + $('strong', item).textContent;
    };
    $('#social-btn').addEventListener('click', function () {
      sOverlay.classList.add('is-open'); sOverlay.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
      if (items.length && !$('.is-selected', sOverlay)) showQr(items[0]);
    });
    items.forEach(function (it) { it.addEventListener('click', function (e) { if (!e.target.closest('.go')) showQr(it); }); });
    $('#social-modal-close').addEventListener('click', closeSocial);
    sOverlay.addEventListener('click', function (e) { if (e.target === sOverlay) closeSocial(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSocial(); });
  }

  // ---- Reading progress + back-to-top ----
  var bar = $('.progress'), top = $('.to-top');
  function onScroll() {
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    if (bar) bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    if (top) top.classList.toggle('show', h.scrollTop > 600);
  }
  document.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if (top) top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  // ---- Post: table of contents + copy buttons ----
  var entry = $('.post .entry');
  if (entry) {
    var heads = $$('h1, h2, h3', entry);
    var tocBox = $('#toc');
    if (tocBox && heads.length >= 3) {
      var ul = document.createElement('ul');
      heads.forEach(function (h, i) {
        if (!h.id) h.id = 'sec-' + i;
        var li = document.createElement('li');
        if (h.tagName === 'H3') li.className = 'l3';
        var a = document.createElement('a'); a.href = '#' + h.id; a.textContent = h.textContent;
        li.appendChild(a); ul.appendChild(li);
      });
      tocBox.appendChild(ul); tocBox.hidden = false;
    }
    $$('.highlighter-rouge', entry).forEach(function (box) {
      var b = document.createElement('button');
      b.className = 'icon-btn copy-btn'; b.type = 'button'; b.textContent = 'Copy';
      b.addEventListener('click', function () {
        var code = $('code', box);
        navigator.clipboard.writeText(code.textContent).then(function () {
          b.textContent = 'Copied'; setTimeout(function () { b.textContent = 'Copy'; }, 1500);
        });
      });
      box.appendChild(b);
    });
  }

  // ---- Image viewer ----
  if (window.Viewer) {
    $$('.post .entry').forEach(function (c) { if ($('img', c)) new Viewer(c, { navbar: true, title: true }); });
  }

  // ---- Category list: search + pagination (state kept in URL) ----
  var list = $('#post-list');
  if (list) {
    var PER = 8;
    var cards = $$('.post-card', list), pag = $('#pagination'), input = $('#search-input'),
        none = $('#no-results'), count = $('#result-count');
    var params = new URLSearchParams(location.search);
    var q = params.get('q') || '', page = parseInt(params.get('page'), 10) || 1;
    input.value = q;

    function btn(text, target, cls) {
      var b = document.createElement('button'); b.textContent = text; b.type = 'button';
      if (cls) b.className = cls;
      if (!cls) b.addEventListener('click', function () { page = target; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
      return b;
    }
    function render() {
      var term = q.replace(/^\s*\/+/, '').trim().toLowerCase(); // ignore stray '/' from the focus shortcut
      var hits = cards.filter(function (c) { return !term || c.dataset.search.indexOf(term) !== -1; });
      var pages = Math.max(1, Math.ceil(hits.length / PER));
      page = Math.min(Math.max(page, 1), pages);
      cards.forEach(function (c) { c.hidden = true; });
      hits.slice((page - 1) * PER, page * PER).forEach(function (c) { c.hidden = false; });
      none.hidden = hits.length > 0;
      count.textContent = hits.length + (hits.length === 1 ? ' post' : ' posts') + (term ? ' found' : '');
      pag.innerHTML = '';
      if (pages > 1) {
        pag.appendChild(btn('‹', page - 1, page === 1 ? 'disabled' : ''));
        for (var i = 1; i <= pages; i++) {
          if (i === 1 || i === pages || Math.abs(i - page) <= 1) pag.appendChild(btn(i, i, i === page ? 'active' : ''));
          else if (Math.abs(i - page) === 2) pag.appendChild(btn('…', 0, 'disabled'));
        }
        pag.appendChild(btn('›', page + 1, page === pages ? 'disabled' : ''));
      }
      var p = new URLSearchParams();
      if (term) p.set('q', q); if (page > 1) p.set('page', page);
      history.replaceState(null, '', location.pathname + (p.toString() ? '?' + p : ''));
    }
    input.addEventListener('input', function () { q = input.value; page = 1; render(); });
    document.addEventListener('keydown', function (e) {
      var t = e.target, typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
      if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) { e.preventDefault(); input.focus(); input.select(); }
    });
    render();
  }
})();
