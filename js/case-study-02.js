(function () {
  var buttons = document.querySelectorAll('.case-filter .filter-item');
  var cards = document.querySelectorAll('.case-grid .case-card');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');
      cards.forEach(function (card) {
        var categories = (card.getAttribute('data-category') || '').split(' ');
        var matches = filter === '*' || categories.indexOf(filter.replace('.', '')) !== -1;
        card.classList.toggle('is-hidden', !matches);
      });
    });
  });
})();
