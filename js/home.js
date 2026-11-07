(function () {
  'use strict';

  /* Step-by-step accordion */
  var steps = document.querySelectorAll('#home-step-accordion .step-accordion-item');
  steps.forEach(function (item) {
    var btn = item.querySelector('.step-accordion-title');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var wasActive = item.classList.contains('is-active');
      steps.forEach(function (i) { i.classList.remove('is-active'); });
      if (!wasActive) item.classList.add('is-active');
    });
  });

  /* Case studies flex gallery: click to pin a panel open (hover already expands via CSS) */
  var caseItems = document.querySelectorAll('#home-cases-flex .home-case-flex-item');
  caseItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      caseItems.forEach(function (i) { i.classList.remove('is-active'); });
      item.classList.add('is-active');
    });
  });

  /* Team flex gallery: the photo must hold its exact pixel width through the
     expand animation (only the text panel should grow, then fade in), so
     pin it to its just-before-hover size the instant a card opens, and
     release the pin the instant it closes so it can fill back out again. */
  var teamItems = document.querySelectorAll('#home-team-flex .home-team-item');
  function pinTeamAvatar(item) {
    var avatar = item.querySelector('.home-team-avatar');
    if (!avatar) return;
    var w = avatar.getBoundingClientRect().width;
    avatar.style.flexGrow = '0';
    avatar.style.flexShrink = '0';
    avatar.style.flexBasis = w + 'px';
  }
  function unpinTeamAvatar(item) {
    var avatar = item.querySelector('.home-team-avatar');
    if (!avatar) return;
    avatar.style.flexGrow = '';
    avatar.style.flexShrink = '';
    avatar.style.flexBasis = '';
  }
  teamItems.forEach(function (item) {
    item.addEventListener('mouseenter', function () { pinTeamAvatar(item); });
    item.addEventListener('mouseleave', function () { unpinTeamAvatar(item); });
    item.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      if (item.classList.contains('is-active')) return;
      teamItems.forEach(function (i) {
        if (i !== item) { i.classList.remove('is-active'); unpinTeamAvatar(i); }
      });
      pinTeamAvatar(item);
      item.classList.add('is-active');
    });
  });

  /* Technology tabs (all tabs show the same logo grid in this build) */
  var techTabs = document.querySelectorAll('#tech-tabs-nav .tech-tab');
  techTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      techTabs.forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');
    });
  });

  /* Hero globe scroll parallax: drifts down up to 120px as the hero
     scrolls past, matching the live site's data-parallax="{y:120}" motion. */
  var globe = document.querySelector('.home-hero-globe');
  if (globe && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var current = 0;
    var target = 0;
    var ticking = false;

    var updateTarget = function () {
      var top = globe.getBoundingClientRect().top + window.scrollY;
      var windowHeight = window.innerHeight;
      var scrollFrom = Math.max(0, top - windowHeight);
      var scrollTo = scrollFrom + windowHeight;
      var progress = (window.scrollY - scrollFrom) / (scrollTo - scrollFrom);
      progress = Math.min(1, Math.max(0, progress));
      target = progress * 120;
    };

    var render = function () {
      current += (target - current) / 8;
      if (Math.abs(target - current) < 0.05) current = target;
      globe.style.setProperty('--parallax-y', current.toFixed(2) + 'px');
      if (current !== target) {
        requestAnimationFrame(render);
      } else {
        ticking = false;
      }
    };

    var onScroll = function () {
      updateTarget();
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(render);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateTarget);
    updateTarget();
    render();
  }

  /* Client testimonials: prev/next carousel between the quote slides */
  var testimonialCarousel = document.getElementById('home-testimonial-carousel');
  if (testimonialCarousel) {
    var testimonialSlides = testimonialCarousel.querySelectorAll('.home-testimonial-slide');
    var activeSlide = 0;
    testimonialCarousel.querySelectorAll('.home-testimonial-arrow').forEach(function (btn) {
      btn.addEventListener('click', function () {
        testimonialSlides[activeSlide].classList.remove('is-active');
        activeSlide = (activeSlide + parseInt(btn.dataset.dir, 10) + testimonialSlides.length) % testimonialSlides.length;
        testimonialSlides[activeSlide].classList.add('is-active');
      });
    });
  }
})();
