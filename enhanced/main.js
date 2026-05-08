(function () {
  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
      });
    });
  }

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
