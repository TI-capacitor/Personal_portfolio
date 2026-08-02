/* =========================================
   script.js — Interactions
   ========================================= */

// ---- Hamburger / Mobile Menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

document.querySelectorAll('.mm-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ---- Accordion with lock/unlock toggle (from Stitch) ----
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const accordion = header.closest('.accordion');
    const isOpen = accordion.classList.toggle('open');
    header.setAttribute('aria-expanded', isOpen);

    // Swap lock icons
    const lockIcon   = header.querySelector('.icon-lock');
    const unlockIcon = header.querySelector('.icon-unlock');
    const statusText = header.querySelector('.acc-status-text');

    if (lockIcon && unlockIcon) {
      lockIcon.style.display   = isOpen ? 'none'  : 'block';
      unlockIcon.style.display = isOpen ? 'block' : 'none';
    }

    if (statusText) {
      statusText.textContent = isOpen ? 'STATUS: OPEN' : 'STATUS: LOCKED';
    }
  });
});

// ---- Scroll Reveal ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
      siblings.forEach((el, idx) => {
        setTimeout(() => el.classList.add('visible'), idx * 80);
      });
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- Nav shadow on scroll ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 10
    ? '0 4px 24px rgba(0,0,0,0.5)'
    : 'none';
}, { passive: true });

// ---- Live clock in nav (optional, from Stitch concept) ----
// Uncomment to show a live UTC clock in the nav
// const clockEl = document.createElement('span');
// clockEl.className = 'nav-clock';
// clockEl.style.cssText = 'font-family:var(--font-mono);font-size:0.72rem;color:rgba(255,255,255,0.3);letter-spacing:0.1em;';
// document.querySelector('.nav').insertBefore(clockEl, document.querySelector('.btn-nav'));
// setInterval(() => {
//   clockEl.textContent = new Date().toISOString().slice(11,19) + '_UTC';
// }, 1000);