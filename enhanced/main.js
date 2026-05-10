(function () {
  document.documentElement.classList.add('js');

  function initMobileMenu() {
    var menuToggle = document.getElementById('menu-toggle');
    var mobileMenu = document.getElementById('mobile-menu');
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute('aria-controls', 'mobile-menu');
    function setOpen(open) {
      mobileMenu.classList.toggle('open', open);
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    setOpen(false);
    menuToggle.addEventListener('click', function () {
      setOpen(!mobileMenu.classList.contains('open'));
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        setOpen(false);
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var hash = a.getAttribute('href');
      if (!hash || hash === '#') return;
      var target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  function initTelTracking() {
    document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
      a.addEventListener('click', function () {
        if (typeof gtag === 'function') {
          gtag('event', 'phone_click', {
            event_category: 'Contact',
            event_label: a.href
          });
        }
      });
    });
  }

  function initActiveNav() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    var sticky = document.getElementById('sticky-header');
    var sel = sticky
      ? '#sticky-header .nav-links a[href], #mobile-menu a[href]'
      : 'header nav a[href], #mobile-menu a[href]';
    document.querySelectorAll(sel).forEach(function (a) {
      var h = a.getAttribute('href');
      if (!h || h.charAt(0) === '#' || /^tel:/i.test(h)) return;
      try {
        var file = new URL(h, window.location.href).pathname.split('/').pop() || 'index.html';
        if (file === path) a.classList.add('nav-current');
      } catch (err) {}
    });
  }

  initMobileMenu();
  initSmoothScroll();
  initTelTracking();
  initActiveNav();

  (function () {
    var root = document.querySelector('[data-carousel]');
    if (!root) return;
    var track = root.querySelector('[data-track]');
    var prev = root.querySelector('[data-prev]');
    var next = root.querySelector('[data-next]');
    var idxEl = root.querySelector('[data-index]');
    var totalEl = root.querySelector('[data-total]');
    if (!track || !prev || !next || !idxEl || !totalEl) return;
    var slides = Array.from(track.children);
    var idx = 0;
    totalEl.textContent = String(slides.length);
    function render() {
      track.style.transform = 'translateX(' + -idx * 100 + '%)';
      idxEl.textContent = String(idx + 1);
    }
    prev.addEventListener('click', function () {
      idx = (idx - 1 + slides.length) % slides.length;
      render();
    });
    next.addEventListener('click', function () {
      idx = (idx + 1) % slides.length;
      render();
    });
    render();
  })();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js').catch(function () {});
    });
  }
})();
