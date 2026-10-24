// Arrows, counter and dots for .kb-carousel. Swipe works without JS (CSS scroll-snap).
document.querySelectorAll('.kb-carousel').forEach(function (c) {
  var track = c.querySelector('.kb-track');
  var slides = c.querySelectorAll('.kb-slide');
  var prev = c.querySelector('.kb-prev'), next = c.querySelector('.kb-next');
  var cur = c.querySelector('.kb-cur'), dots = c.querySelectorAll('.kb-dots span');
  var n = slides.length;
  function idx() { return Math.round(track.scrollLeft / track.clientWidth); }
  function go(i) { track.scrollTo({ left: Math.max(0, Math.min(n - 1, i)) * track.clientWidth }); }
  function update() {
    var i = idx();
    cur.textContent = i + 1;
    prev.hidden = i === 0; next.hidden = i === n - 1;
    dots.forEach(function (d, k) { d.classList.toggle('on', k === i); });
  }
  prev.addEventListener('click', function () { go(idx() - 1); });
  next.addEventListener('click', function () { go(idx() + 1); });
  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(idx() + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx() - 1); }
  });
  var t; track.addEventListener('scroll', function () { clearTimeout(t); t = setTimeout(update, 60); }, { passive: true });
  window.addEventListener('resize', update);
  update();
});
