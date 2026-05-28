/* ============================================================
   MAJED AL-SHAMMARI — GRC PORTFOLIO
   ============================================================ */

/* ── Navbar scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Active nav link on scroll ── */
const secs  = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(a =>
        a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id)
      );
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
secs.forEach(s => io.observe(s));

/* ── Mobile drawer ── */
const toggle = document.getElementById('nav-toggle');
const drawer = document.getElementById('nav-drawer');
toggle.addEventListener('click', () => {
  const open = drawer.classList.toggle('open');
  toggle.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
drawer.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    drawer.classList.remove('open');
    toggle.classList.remove('open');
    document.body.style.overflow = '';
  })
);

/* ── Scroll reveal ── */
const reveal = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      reveal.unobserve(e.target);
    }
  });
}, { threshold: 0.07 });
document.querySelectorAll('.fade-up').forEach(el => reveal.observe(el));

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a =>
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: t.offsetTop - 76, behavior: 'smooth' });
  })
);
