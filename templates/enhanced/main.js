/* Maple & Stone — main.js */
(function () {
  'use strict';

  const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Body / html class for CSS targeting ──────────────── */
  document.documentElement.classList.remove('no-js');
  document.body.classList.remove('no-js');
  document.body.classList.add('js-loaded');

  /* ── Mobile Menu ──────────────────────────────────────── */
  const toggle   = document.getElementById('nav-toggle');
  const overlay  = document.getElementById('nav-overlay');
  const menuLinks = document.querySelectorAll('.nav-menu-link');

  if (toggle && overlay) {
    toggle.addEventListener('click', function () {
      const isOpen = overlay.classList.toggle('is-open');
      toggle.classList.toggle('is-active', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';

      if (isOpen && motionOK && typeof gsap !== 'undefined') {
        gsap.fromTo('.nav-menu-link',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out', delay: 0.05 }
        );
      } else if (isOpen) {
        menuLinks.forEach(function (l) { l.style.opacity = '1'; });
      }
    });

    menuLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        overlay.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    /* Close overlay on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
        overlay.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  /* ── FAQ Accordion ────────────────────────────────────── */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    const btn    = item.querySelector('.faq-summary');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', function () {
      const isOpen = item.classList.contains('is-open');

      /* Close all */
      document.querySelectorAll('.faq-item.is-open').forEach(function (openItem) {
        openItem.classList.remove('is-open');
        openItem.querySelector('.faq-summary').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      if (motionOK) {
        var inner = answer.querySelector('.faq-answer-inner');
        var target = inner || answer;
        target.animate(
          [{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 300, easing: 'cubic-bezier(0.32,0.72,0,1)', fill: 'forwards' }
        );
      }
      }
    });
  });

  /* ── GSAP Animations ──────────────────────────────────── */
  if (typeof gsap === 'undefined') return;

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ── Hero entrance (index only) ─────────────────────── */
  const heroH1 = document.querySelector('.hero-h1');
  if (heroH1 && motionOK) {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.set('.hero-content', { opacity: 1 });

    tl.fromTo('.hero-badge',
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.1 }
    )
    .fromTo('.hero-h1',
      { y: 64, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.05 },
      '-=0.3'
    )
    .fromTo('.hero-sub',
      { y: 32, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.72 },
      '-=0.55'
    )
    .fromTo('.hero-cta-group .btn',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, stagger: 0.12 },
      '-=0.45'
    );

    /* Hero image clip-path reveal */
    gsap.fromTo('.hero-img-clip',
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1.35, ease: 'power4.inOut', delay: 0.05 }
    );

  }

  /* ── Inner page hero ───────────────────────────────────── */
  const pageHero = document.querySelector('.page-hero');
  if (pageHero && motionOK) {
    const els = pageHero.querySelectorAll('.eyebrow, h1, .section-sub');
    gsap.fromTo(els,
      { y: 36, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
    );
  }

  /* ── Generic scroll reveal ───────────────────────────── */
  if (motionOK && typeof ScrollTrigger !== 'undefined') {
    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      var yVal  = parseFloat(el.dataset.revealY)   || 40;
      var dur   = parseFloat(el.dataset.revealDur) || 0.75;
      var delay = parseFloat(el.dataset.revealDelay) || 0;

      gsap.fromTo(el,
        { opacity: 0, y: yVal },
        {
          opacity: 1, y: 0, duration: dur, ease: 'power3.out', delay: delay,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        }
      );
    });

    /* Stagger reveals for grids / lists */
    gsap.utils.toArray('[data-reveal-stagger]').forEach(function (container) {
      var items = container.querySelectorAll('[data-stagger-item]');
      if (!items.length) return;

      gsap.fromTo(items,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: container, start: 'top 85%', once: true }
        }
      );
    });

    /* Section headings with a slight clip-path */
    gsap.utils.toArray('[data-reveal-heading]').forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.85, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        }
      );
    });
  }

  /* ── Smooth scroll for hash links ─────────────────────── */
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

  /* ── Phone click tracking ─────────────────────────────── */
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

  /* ── Contact form (demo / non-Netlify) ─────────────────── */
  var form = document.getElementById('contact-form');
  var success = document.getElementById('form-success');
  if (form) {
    form.addEventListener('submit', function (e) {
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (form.getAttribute('data-netlify') === 'true') return;
      var action = (form.getAttribute('action') || '').trim();
      if (action && action !== '#' && !/^javascript:/i.test(action)) {
        try {
          var u = new URL(action, window.location.href);
          if (u.origin !== window.location.origin) return;
        } catch (err) {
          return;
        }
      }
      e.preventDefault();
      form.style.display = 'none';
      if (success) success.style.display = 'block';
    });
  }

  /* ── Nav active state (extensionless paths) ───────────── */
  function pathKeyFromPathname(p) {
    var pathOnly = (p || '').split(/[?#]/)[0];
    var trimmed = pathOnly.replace(/\/+$/, '');
    if (!trimmed) return 'index';
    var segs = trimmed.split('/');
    var last = segs[segs.length - 1] || '';
    if (last.endsWith('.html')) last = last.slice(0, -5);
    return last || 'index';
  }

  var path = pathKeyFromPathname(window.location.pathname);
  document.querySelectorAll('.nav-link, .nav-menu-link').forEach(function (a) {
    var h = a.getAttribute('href');
    if (!h || h.charAt(0) === '#' || /^tel:/i.test(h)) return;
    try {
      var file = pathKeyFromPathname(new URL(h, window.location.href).pathname);
      if (file === path) a.setAttribute('aria-current', 'page');
    } catch (err) {}
  });

  /* ── Articles hub (placeholder cards) ─────────────────── */
  function isArticleHubPlaceholder(title, excerpt) {
    var t = (title || '').toLowerCase();
    var x = (excerpt || '').toLowerCase();
    if (t.indexOf('planned topic') !== -1) return true;
    if (t.indexOf('add a page under articles') !== -1) return true;
    if (x.indexOf('planned topic') !== -1) return true;
    if (x.indexOf('add a page under articles') !== -1) return true;
    return false;
  }

  function initArticlesHub() {
    var grid = document.getElementById('ahana-articles-posts');
    var emptyEl = document.getElementById('ahana-articles-empty');
    if (!grid) return;
    var cards = grid.querySelectorAll('.js-ahana-article-card');
    var visible = 0;
    cards.forEach(function (card) {
      var url = (card.getAttribute('data-article-url') || '').trim();
      var titleEl = card.querySelector('h2');
      var title = titleEl ? titleEl.textContent.replace(/\s+/g, ' ').trim() : '';
      var excerptEl = card.querySelector('.excerpt');
      var excerpt = excerptEl ? excerptEl.textContent.replace(/\s+/g, ' ').trim() : '';
      var urlBad =
        !url ||
        url === '#' ||
        url.indexOf('{{') !== -1 ||
        /^javascript:/i.test(url);
      var titleBad = !title || title.indexOf('{{') !== -1;
      if (urlBad || titleBad || isArticleHubPlaceholder(title, excerpt)) {
        card.setAttribute('hidden', '');
        return;
      }
      visible++;
      card.setAttribute('href', url);
    });
    if (emptyEl) {
      emptyEl.hidden = visible !== 0;
    }
    if (visible === 0) {
      grid.setAttribute('hidden', '');
    } else {
      grid.removeAttribute('hidden');
    }
  }

  initArticlesHub();

  /* ── Image carousel ───────────────────────────────────── */
  document.querySelectorAll('[data-carousel]').forEach(function (root) {
    var track = root.querySelector('[data-track]');
    var prev = root.querySelector('[data-prev]');
    var next = root.querySelector('[data-next]');
    var idxEl = root.querySelector('[data-index]');
    var totalEl = root.querySelector('[data-total]');
    if (!track || !prev || !next || !idxEl || !totalEl) return;
    var slides = Array.from(track.children);
    if (!slides.length) return;
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
  });

  /* ── Service worker ─────────────────────────────────────── */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js').catch(function () {});
    });
  }

})();
