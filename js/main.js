(function () {
  'use strict';

  function closeAllPanels(except) {
    document.querySelectorAll('.search-panel.is-open, .cart-panel.is-open').forEach(function (panel) {
      if (panel !== except) {
        panel.classList.remove('is-open');
        var btn = panel.previousElementSibling;
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function toggleDropdownPanel(btnId, panelId) {
    var btn = document.getElementById(btnId);
    var panel = document.getElementById(panelId);
    if (!btn || !panel) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = panel.classList.contains('is-open');
      closeAllPanels(isOpen ? null : panel);
      panel.classList.toggle('is-open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
      if (!isOpen) {
        var input = panel.querySelector('input');
        if (input) input.focus();
      }
    });
  }

  toggleDropdownPanel('search-toggle', 'search-panel');
  toggleDropdownPanel('cart-toggle', 'cart-panel');

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.dropdown-holder')) closeAllPanels(null);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllPanels(null);
  });

  /* Mobile off-canvas nav */
  var mobileToggle = document.getElementById('mobile-menu-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  var mobileBackdrop = document.getElementById('mobile-nav-backdrop');
  var mobileClose = document.getElementById('mobile-nav-close');

  function openMobileNav() {
    mobileNav.classList.add('is-open');
    mobileBackdrop.classList.add('is-open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
  }
  function closeMobileNav() {
    mobileNav.classList.remove('is-open');
    mobileBackdrop.classList.remove('is-open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }
  if (mobileToggle) mobileToggle.addEventListener('click', openMobileNav);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileNav);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileNav();
  });

  /* Mobile submenu accordion */
  document.querySelectorAll('.mobile-nav-caret').forEach(function (caret) {
    caret.addEventListener('click', function () {
      var li = caret.closest('li');
      var isOpen = li.classList.contains('is-open');
      li.parentElement.querySelectorAll(':scope > li.is-open').forEach(function (openLi) {
        if (openLi !== li) openLi.classList.remove('is-open');
      });
      li.classList.toggle('is-open', !isOpen);
    });
  });

  /* Desktop dropdown: click-to-toggle as a fallback alongside hover (keyboard/touch friendly) */
  document.querySelectorAll('.header-nav > li.has-dropdown > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.matchMedia('(hover: none)').matches) {
        e.preventDefault();
        var li = link.closest('li');
        var wasOpen = li.classList.contains('force-open');
        document.querySelectorAll('.header-nav > li.force-open').forEach(function (openLi) {
          openLi.classList.remove('force-open');
        });
        li.classList.toggle('force-open', !wasOpen);
      }
    });
  });
})();
