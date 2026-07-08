// Année courante dans le footer
document.getElementById('year').textContent = new Date().getFullYear();

// Curseur personnalisé (souris fine uniquement)
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (finePointer) {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    if (!document.body.classList.contains('cursor-ready')) {
      document.body.classList.add('cursor-ready');
    }
  });

  // La bague suit avec un léger retard (effet de traînée)
  (function follow() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(follow);
  })();

  // Grossissement au survol des éléments interactifs
  const interactive = 'a, button, .btn, .skill-card, .project-card, .stat, .edu-card, input, textarea';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactive)) ring.classList.add('hovering');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactive)) ring.classList.remove('hovering');
  });
  document.addEventListener('mousedown', () => ring.classList.add('clicking'));
  document.addEventListener('mouseup', () => ring.classList.remove('clicking'));
  document.addEventListener('mouseleave', () => document.body.classList.remove('cursor-ready'));
  document.addEventListener('mouseenter', () => document.body.classList.add('cursor-ready'));
}

// Nav, barre de progression et bouton retour au scroll
const nav = document.getElementById('nav');
const progress = document.getElementById('scrollProgress');
const toTop = document.getElementById('toTop');

function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 20);
  const h = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
  if (toTop) toTop.classList.toggle('show', y > 500);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

if (toTop) {
  toTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
}

// Navigation active (scrollspy)
const navAnchors = [...document.querySelectorAll('.nav__links a[href^="#"]')];
const sections = navAnchors
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);
const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a =>
        a.classList.toggle('active', a.getAttribute('href') === '#' + id)
      );
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => spy.observe(s));

// Menu mobile
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => navLinks.classList.remove('open'))
);

// Animation d'apparition au scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
