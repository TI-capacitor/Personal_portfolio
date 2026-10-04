/* =========================================
   script.js
   ========================================= */

// ---- Mobile menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function setMenu(open) {
  mobileMenu.classList.toggle('open', open);
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

hamburger.addEventListener('click', () => {
  setMenu(!mobileMenu.classList.contains('open'));
});

document.querySelectorAll('.mm-link').forEach(link => {
  link.addEventListener('click', () => setMenu(false));
});

// ---- Accordion + diamond hack icon ----
// The diamond trace animation is handled in CSS: it only transitions
// while .open is set, so closing resets it instantly and every open replays it.
document.querySelectorAll('.accordion-header').forEach(header => {
  const status = header.querySelector('.acc-status-text');
  const lockedText = status ? (status.dataset.locked || 'STATUS: LOCKED') : '';

  header.addEventListener('click', () => {
    const accordion = header.closest('.accordion');
    const isOpen = accordion.classList.toggle('open');
    header.setAttribute('aria-expanded', isOpen);
    if (status) status.textContent = isOpen ? 'STATUS: ACCESSED' : lockedText;
  });
});

// ---- Nav border once the page scrolls ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });