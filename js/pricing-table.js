(function () {
  'use strict';

  /* Generic single-open accordion helper (same pattern as js/services.js). */
  function setupAccordion(containerId, itemSelector, triggerSelector) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var items = container.querySelectorAll(itemSelector);
    items.forEach(function (item) {
      var trigger = item.querySelector(triggerSelector);
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

  setupAccordion('pricing-faq-accordion', '.faq-accordion-item', '.faq-accordion-title');

  /* Monthly / Yearly pricing toggle */
  var toggleSwitch = document.getElementById('pricing-toggle-switch');
  var monthlyGrid = document.getElementById('pricing-grid-monthly');
  var yearlyGrid = document.getElementById('pricing-grid-yearly');
  var labels = document.querySelectorAll('.pricing-toggle-label');

  if (toggleSwitch && monthlyGrid && yearlyGrid) {
    toggleSwitch.addEventListener('click', function () {
      var isYearly = toggleSwitch.getAttribute('aria-checked') === 'true';
      var next = !isYearly;
      toggleSwitch.setAttribute('aria-checked', String(next));
      toggleSwitch.classList.toggle('is-yearly', next);
      monthlyGrid.hidden = next;
      yearlyGrid.hidden = !next;
      labels.forEach(function (label) {
        var isYearlyLabel = label.getAttribute('data-toggle-label') === 'yearly';
        label.classList.toggle('is-active', isYearlyLabel === next);
      });
    });
  }
})();
