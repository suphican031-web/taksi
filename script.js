// =========================================
// LAPTA TAKSİ – JavaScript
// =========================================

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --- Hamburger menu ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// --- Scroll reveal animation ---
const revealElements = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Staggered delay based on position in parent
      const siblings = Array.from(entry.target.parentElement.children);
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, idx * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// --- Car photo switcher ---
function changeCarPhoto(src, thumbEl) {
  const mainPhoto = document.getElementById('activeCarPhoto');
  if (mainPhoto) {
    mainPhoto.style.opacity = '0';
    mainPhoto.style.transform = 'scale(0.98)';
    setTimeout(() => {
      mainPhoto.src = src;
      mainPhoto.style.opacity = '1';
      mainPhoto.style.transform = 'scale(1)';
    }, 250);
  }
  document.querySelectorAll('.car-thumb').forEach(t => t.classList.remove('active'));
  if (thumbEl) thumbEl.classList.add('active');
}

// Add transition to car photo
const activePhoto = document.getElementById('activeCarPhoto');
if (activePhoto) {
  activePhoto.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
}

// --- Number counter animation ---
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      el.textContent = target.toLocaleString('tr-TR');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start).toLocaleString('tr-TR');
    }
  }, 16);
}

// Trigger counters when stats section is visible
const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
  const counterObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      const statNums = document.querySelectorAll('.stat-number');
      statNums.forEach(el => {
        const text = el.textContent.trim();
        const num = parseInt(text.replace(/[^0-9]/g, ''));
        if (!isNaN(num) && num > 0 && !text.includes('★')) {
          animateCounter(el, num);
        }
      });
      counterObserver.disconnect();
    }
  }, { threshold: 0.5 });
  counterObserver.observe(statsBar);
}

// --- Active nav link on scroll ---
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinkEls.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--gold)';
    }
  });
});

// --- Float call button hide on scroll up / show on scroll down ---
let lastScroll = 0;
const floatCall = document.querySelector('.float-call');
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (floatCall) {
    if (currentScroll < 200) {
      floatCall.style.opacity = '0';
      floatCall.style.pointerEvents = 'none';
    } else {
      floatCall.style.opacity = '1';
      floatCall.style.pointerEvents = 'auto';
    }
  }
  lastScroll = currentScroll;
}, { passive: true });

// --- Parallax subtle effect on hero ---
const heroBg = document.querySelector('.hero-bg-img');
window.addEventListener('scroll', () => {
  if (heroBg && window.scrollY < window.innerHeight) {
    heroBg.style.transform = `scale(1.06) translateY(${window.scrollY * 0.12}px)`;
  }
}, { passive: true });

console.log('%c🚖 Lapta Taksi Website Loaded', 'color: #C9A84C; font-weight: bold; font-size: 16px;');
