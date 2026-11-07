(function () {
  var filterBar = document.getElementById('case-filter');
  var grid = document.getElementById('case-grid');
  if (!filterBar || !grid) return;

  var buttons = filterBar.querySelectorAll('.filter-item');
  var cards = grid.querySelectorAll('.case-card');

  filterBar.addEventListener('click', function (e) {
    var btn = e.target.closest('.filter-item');
    if (!btn) return;

    buttons.forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');

    var filter = btn.getAttribute('data-filter');
    cards.forEach(function (card) {
      var cats = (card.getAttribute('data-categories') || '').split(' ');
      var show = filter === 'all' || cats.indexOf(filter) !== -1;
      card.hidden = !show;
    });
  });
})();
