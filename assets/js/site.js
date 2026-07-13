/* ==========================================================================
   Site behaviour: responsive nav, news timeline, BibTeX copy.

   This MUST stay an external file. The site builds through Jekyll's
   compress.html layout, which strips newlines from the HTML — including inside
   inline <script> tags, which turns any `//` comment into a comment that eats
   the rest of the script.
   ========================================================================== */

(function () {
  'use strict';

  // --- Responsive nav: hamburger below 768px --------------------------------
  (function () {
    var nav = document.getElementById('site-nav');
    var toggle = document.querySelector('[data-nav-toggle]');
    var menu = document.getElementById('site-nav-menu');
    if (!nav || !toggle || !menu) return;

    // Tells the CSS that JS is live, so it stops falling back to an open menu.
    nav.classList.add('has-js');

    function setOpen(open) {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) setOpen(false);
    });
  })();

  // --- News timeline: show the first N, reveal the rest ---------------------
  (function () {
    var VISIBLE = 4;

    var list = document.querySelector('[data-timeline]');
    var toggle = document.querySelector('[data-timeline-toggle]');
    if (!list || !toggle) return;

    var items = list.querySelectorAll('.timeline__item');
    if (items.length <= VISIBLE) return;

    for (var i = VISIBLE; i < items.length; i++) {
      items[i].classList.add('is-collapsed');
    }

    toggle.textContent = 'More';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.classList.add('is-visible');

    toggle.addEventListener('click', function () {
      var expanded = list.classList.toggle('is-expanded');
      toggle.setAttribute('aria-expanded', String(expanded));
      toggle.textContent = expanded ? 'Less' : 'More';
    });
  })();

  // --- BibTeX copy button ---------------------------------------------------
  (function () {
    if (!navigator.clipboard) return;

    var buttons = document.querySelectorAll('[data-copy-bibtex]');
    Array.prototype.forEach.call(buttons, function (btn) {
      var code = btn.parentNode.querySelector('code');
      if (!code) return;

      btn.addEventListener('click', function () {
        navigator.clipboard.writeText(code.textContent.trim()).then(function () {
          btn.textContent = 'Copied';
          btn.classList.add('is-copied');
          setTimeout(function () {
            btn.textContent = 'Copy';
            btn.classList.remove('is-copied');
          }, 2000);
        });
      });
    });
  })();
})();
