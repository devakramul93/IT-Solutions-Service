(function () {
  'use strict';

  /* Generic single-open accordion helper (one open item per container). */
  function setupAccordion(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var items = container.querySelectorAll('.faq-accordion-item');
    items.forEach(function (item) {
      var trigger = item.querySelector('.faq-accordion-title');
      if (!trigger) return;
      trigger.addEventListener('click', function () {
        var isActive = item.classList.contains('is-active');
        items.forEach(function (other) {
          other.classList.remove('is-active');
        });
        if (!isActive) {
          item.classList.add('is-active');
        }
      });
    });
  }

  setupAccordion('faq-accordion-1');
  setupAccordion('faq-accordion-2');
  setupAccordion('faq-accordion-3');
})();
