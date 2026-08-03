/* =========================================
   script.js
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
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = ''; s.style.opacity = '';
    });
  });
});

// ---- Accordion with Watch Dogs diamond ----
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const accordion = header.closest('.accordion');
    const isOpen = accordion.classList.toggle('open');
    header.setAttribute('aria-expanded', isOpen);

    // Status text swap
    const statusText = header.querySelector('.acc-status-text');
    if (statusText) {
      statusText.textContent = isOpen ? 'STATUS: ACCESSED' : 'STATUS: LOCKED';
    }

    // Diamond trace: reset then re-trigger so animation replays each open
    const trace = header.querySelector('.diamond-trace');
    if (trace && isOpen) {
      // Force reflow to restart the CSS transition
      trace.style.transition = 'none';
      trace.style.strokeDashoffset = '62';
      trace.getBoundingClientRect(); // flush
      trace.style.transition = '';  // restore — CSS takes over
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