(function () {
  'use strict';

  /* Generic single-open accordion helper.
     itemSelector: the toggleable row (li)
     activeClass:  class toggled on the item
     triggerSelector: the clickable element inside the item */
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

  /* services-02.html: numbered "How it works" step accordion */
  setupAccordion('step-accordion', '.step-accordion-item', '.step-accordion-title');

  /* services-02.html: "Solutions Challenge" FAQ-style accordion */
  setupAccordion('faq-accordion', '.faq-accordion-item', '.faq-accordion-title');
})();
