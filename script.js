/* =====================================================
   PETRA DUJKOVÁ — script.js
   ===================================================== */

/* === PRELOADER ======================================== */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 500);
});

/* === TYPING EFEKT ===================================== */
const typedPhrases = [
  'Marketingová generalistka',
  'Aplikace AI v marketingu',
  'Vaše marketingová posila',
  'Průvodkyně světem AI nástrojů pro začátečníky',
];

const typedEl = document.getElementById('typed-text');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function type() {
  const currentPhrase = typedPhrases[phraseIndex];

  if (!isDeleting) {
    typedEl.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      typingTimeout = setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % typedPhrases.length;
      typingTimeout = setTimeout(type, 400);
      return;
    }
  }

  typingTimeout = setTimeout(type, isDeleting ? 45 : 90);
}

type();

/* === NAVIGACE: sticky background při scrollu ========= */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* === HAMBURGER MENU ================================== */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navMenu.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* === FADE-IN se staggerem při scrollu ================ */
const fadeEls = document.querySelectorAll('.fade-in');

// Přiřaď stagger delay kartám uvnitř gridu
document.querySelectorAll('.skoleni__karty, .projekty__karty, .sluzby__list').forEach(grid => {
  grid.querySelectorAll('.fade-in, .skoleni__karta, .sluzba').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
    el.classList.add('fade-in');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* === PARALLAX na hero fotce ========================== */
const heroImg = document.querySelector('.hero__img');

function parallax() {
  if (!heroImg) return;
  const scrollY = window.scrollY;
  const heroSection = document.getElementById('hero');
  if (!heroSection) return;
  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
  if (scrollY < heroBottom) {
    heroImg.style.transform = `scaleX(-1) translateY(${scrollY * 0.12}px)`;
  }
}

window.addEventListener('scroll', parallax, { passive: true });

/* === SMOOTH SCROLL ================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
