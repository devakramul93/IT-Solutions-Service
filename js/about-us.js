(function () {
  var track = document.getElementById('history-track');
  var carousel = document.getElementById('history-carousel');
  var dotsWrap = document.getElementById('history-dots');
  var prevBtn = document.getElementById('history-prev');
  var nextBtn = document.getElementById('history-next');
  if (!track || !carousel) return;

  var slides = Array.prototype.slice.call(track.children);
  var index = 0;
  var timer = null;

  function perView() {
    var w = window.innerWidth;
    if (w <= 768) return 1;
    if (w <= 1024) return 2;
    if (w <= 1300) return 3;
    return 4;
  }

  function pageCount() {
    return Math.max(1, slides.length - perView() + 1);
  }

  function renderDots() {
    dotsWrap.innerHTML = '';
    var pages = pageCount();
    for (var i = 0; i < pages; i++) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      if (i === index) b.classList.add('is-active');
      (function (i) {
        b.addEventListener('click', function () { goTo(i); });
      })(i);
      dotsWrap.appendChild(b);
    }
  }

  function update() {
    var pages = pageCount();
    if (index >= pages) index = pages - 1;
    if (index < 0) index = 0;
    var slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = 'translateX(-' + (slideWidth * index) + 'px)';
    var dots = dotsWrap.children;
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('is-active', i === index);
    }
  }

  function goTo(i) {
    index = i;
    update();
    restartAutoplay();
  }

  function next() {
    index = (index + 1) % pageCount();
    update();
  }

  function prev() {
    index = (index - 1 + pageCount()) % pageCount();
    update();
  }

  function restartAutoplay() {
    if (timer) clearInterval(timer);
    var delay = parseInt(carousel.getAttribute('data-autoplay'), 10) || 5000;
    timer = setInterval(next, delay);
  }

  if (nextBtn) nextBtn.addEventListener('click', function () { next(); restartAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', function () { prev(); restartAutoplay(); });

  carousel.addEventListener('mouseenter', function () { if (timer) clearInterval(timer); });
  carousel.addEventListener('mouseleave', restartAutoplay);

  window.addEventListener('resize', function () {
    renderDots();
    update();
  });

  renderDots();
  update();
  restartAutoplay();
})();
