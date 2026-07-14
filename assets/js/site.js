/* ==========================================================================
   Site behaviour: responsive nav, news timeline, BibTeX copy.

   This MUST stay an external file. The site builds through Jekyll's
   compress.html layout, which strips newlines from the HTML — including inside
   inline <script> tags, which turns any `//` comment into a comment that eats
   the rest of the script.
   ========================================================================== */

(function () {
  'use strict';

  // The nav is CSS-only by design — see _includes/masthead.html.

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
