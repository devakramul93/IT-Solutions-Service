(function () {
  'use strict';

  /* About: Our Mission / Our Vision / Plan & Goals tabs.
     Real widget (tab-effect-slide) animates height with jQuery's
     slideUp/slideDown (300ms) instead of an instant show/hide - the
     incoming panel slides down while the outgoing one collapses. */
  var SLIDE_DURATION = 300;

  function slideDown(el) {
    el.classList.add('is-active');
    el.style.transition = 'none';
    el.style.height = '0px';
    var target = el.scrollHeight;
    el.offsetHeight; // eslint-disable-line no-unused-expressions -- force reflow
    el.style.transition = 'height ' + SLIDE_DURATION + 'ms ease, padding ' + SLIDE_DURATION + 'ms ease';
    requestAnimationFrame(function () { el.style.height = target + 'px'; });
    window.setTimeout(function () {
      el.style.height = '';
      el.style.transition = '';
    }, SLIDE_DURATION);
  }

  function slideUp(el) {
    el.style.transition = 'none';
    el.style.height = el.scrollHeight + 'px';
    el.offsetHeight; // eslint-disable-line no-unused-expressions -- force reflow
    el.style.transition = 'height ' + SLIDE_DURATION + 'ms ease, padding ' + SLIDE_DURATION + 'ms ease';
    el.classList.remove('is-active');
    requestAnimationFrame(function () { el.style.height = '0px'; });
    window.setTimeout(function () {
      el.style.height = '';
      el.style.transition = '';
    }, SLIDE_DURATION);
  }

  var aboutTabs = document.querySelectorAll('#home2-about-tabs .home2-about-tab');
  var aboutPanels = document.querySelectorAll('#home2-about-panels .home2-about-panel');
  aboutTabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
      if (tab.classList.contains('is-active')) return;
      aboutTabs.forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');
      aboutPanels.forEach(function (p, j) {
        if (j === i) { slideDown(p); }
        else if (p.classList.contains('is-active')) { slideUp(p); }
      });
    });
  });

  /* Our IT Approach: each accordion step has its own photo (real page
     swaps photos per step, not one static image) - the open/close
     itself is handled generically by services.js's setupAccordion(),
     this just swaps the photo alongside it. */
  var approachAccordion = document.getElementById('step-accordion');
  var approachPhoto = document.getElementById('home2-approach-photo');
  if (approachAccordion && approachPhoto) {
    approachAccordion.querySelectorAll('.step-accordion-item').forEach(function (item) {
      var trigger = item.querySelector('.step-accordion-title');
      var photo = item.getAttribute('data-photo');
      if (!trigger || !photo) return;
      trigger.addEventListener('click', function () {
        approachPhoto.style.backgroundImage = "url('" + photo + "')";
      });
    });
  }

  /* Click-and-drag (not just touch/trackpad) scrolling, shared by the
     Latest Case Studies strip and the Testimonials carousel, since both
     overflow with a mouse and have no other nav (no scrollbar, no
     arrows/dots). scrollLeft is written inside requestAnimationFrame
     rather than directly in the mousemove handler - writing it
     synchronously on every mousemove (which can fire well above 60Hz)
     forces a layout read/write each time and is what actually made the
     real WordPress/Swiper drag feel smoother than this one. */
  function setupDragScroll(el) {
    if (!el) return;
    var isDown = false;
    var dragged = false;
    var startX = 0;
    var startScroll = 0;
    var pendingLeft = null;

    function applyScroll() {
      if (pendingLeft !== null) {
        el.scrollLeft = pendingLeft;
        pendingLeft = null;
      }
      if (isDown) requestAnimationFrame(applyScroll);
    }

    el.addEventListener('mousedown', function (e) {
      isDown = true;
      dragged = false;
      el.classList.add('is-dragging');
      startX = e.pageX;
      startScroll = el.scrollLeft;
      requestAnimationFrame(applyScroll);
    });

    window.addEventListener('mouseup', function () {
      isDown = false;
      el.classList.remove('is-dragging');
    });

    window.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      var delta = e.pageX - startX;
      if (Math.abs(delta) > 5) dragged = true;
      pendingLeft = startScroll - delta;
    });

    el.addEventListener('click', function (e) {
      if (dragged) { e.preventDefault(); dragged = false; }
    });
  }

  setupDragScroll(document.getElementById('home2-cases-scroll'));
  setupDragScroll(document.getElementById('home2-testi-cards'));
})();
