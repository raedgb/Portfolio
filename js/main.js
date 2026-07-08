// Année courante dans le footer
document.getElementById('year').textContent = new Date().getFullYear();

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

// Effet de frappe sur le titre du hero
const typed = document.getElementById('typed');
if (typed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const words = ['Fintech & Assurance', 'API & Automatisation', 'Actuariat & Data'];
  let wi = 0, ci = 0, deleting = false;
  (function tick() {
    const word = words[wi];
    typed.textContent = word.slice(0, ci);
    if (!deleting && ci < word.length) {
      ci++;
    } else if (deleting && ci > 0) {
      ci--;
    } else {
      deleting = !deleting;
      if (!deleting) wi = (wi + 1) % words.length;
    }
    const delay = deleting ? 45 : ci === word.length ? 1600 : 90;
    setTimeout(tick, delay);
  })();
} else if (typed) {
  typed.textContent = 'Fintech & Assurance';
}

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
