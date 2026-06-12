/* ================================================
   XIV Coloquio de Estudiantes de Economía – JS
   ================================================ */

// ---- Navbar: scroll effect + mobile toggle ----
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ---- Gallery tabs ----
const galleryTabs = document.querySelectorAll('.gallery-tab');
const galleryGrid = document.getElementById('galleryGrid');

// Sample placeholder configurations per year
const yearContent = {
  '2026': {
    label: 'XIV Coloquio – Mayo 2026',
    note: 'Las fotos del evento se publicarán aquí próximamente.',
    empty: 5,
  },
  '2025': {
    label: 'XIII Coloquio – Mayo 2025',
    note: 'Las fotos de esta edición se publicarán próximamente.',
    empty: 5,
  },
  '2024': {
    label: 'XII Coloquio – Mayo 2024',
    note: 'Las fotos de esta edición se publicarán próximamente.',
    empty: 5,
  },
};

function renderGallery(year) {
  const cfg = yearContent[year];
  const emptyCards = Array.from({ length: cfg.empty }, () =>
    `<div class="gallery-item-empty"></div>`
  ).join('');

  galleryGrid.innerHTML = `
    <div class="gallery-placeholder">
      <div class="placeholder-icon">📷</div>
      <p>${cfg.note}</p>
      <span>${cfg.label}</span>
    </div>
    ${emptyCards}
  `;
}

galleryTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    galleryTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderGallery(tab.dataset.year);
  });
});

// ---- Intersection Observer: fade-in sections ----
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(
  '.info-card, .area-card, .reg-card, .org-card, .contact-card, .gallery-placeholder, .date-row'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ---- Page Navigation (Tabbed) ----
function navigateToHash() {
  let hash = window.location.hash || '#inicio';
  
  // Allow anchor links within the same page if there's any? Currently all are sections.
  let targetSec = document.querySelector(hash);
  
  if (targetSec && targetSec.classList.contains('page-section')) {
    document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
    targetSec.classList.add('active');
  } else if (!targetSec) {
    // Default to inicio if not found
    document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById('inicio').classList.add('active');
    hash = '#inicio';
  }
  
  // Update nav active state
  document.querySelectorAll('.nav-links a, .footer-nav a').forEach(a => {
    if (a.getAttribute('href') === hash) {
      a.classList.add('nav-active');
    } else {
      a.classList.remove('nav-active');
    }
  });
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('hashchange', navigateToHash);
window.addEventListener('DOMContentLoaded', navigateToHash);
// ---- Countdown Timer ----
const countdownDate = new Date("Jun 16, 2026 00:00:00 GMT-0500").getTime();
const cdDays = document.getElementById("cd-days");
const cdHours = document.getElementById("cd-hours");
const cdMins = document.getElementById("cd-minutes");
const cdSecs = document.getElementById("cd-seconds");

if (cdDays) {
  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
      if (typeof cdInterval !== 'undefined') clearInterval(cdInterval);
      cdDays.innerText = "00";
      cdHours.innerText = "00";
      cdMins.innerText = "00";
      cdSecs.innerText = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    cdDays.innerText = days.toString().padStart(2, '0');
    cdHours.innerText = hours.toString().padStart(2, '0');
    cdMins.innerText = minutes.toString().padStart(2, '0');
    cdSecs.innerText = seconds.toString().padStart(2, '0');
  };

  updateCountdown(); // Call once immediately
  const cdInterval = setInterval(updateCountdown, 1000);
}

// ---- Particles.js Configuration (Hero Section) ----
if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
  particlesJS('particles-js', {
    "particles": {
      "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
      "color": { "value": ["#ffffff", "#F2D7EE", "#D3BCC0"] },
      "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" } },
      "opacity": { "value": 0.4, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
      "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
      "line_linked": { "enable": true, "distance": 150, "color": "#F2D7EE", "opacity": 0.25, "width": 1 },
      "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } }
    },
    "interactivity": {
      "detect_on": "window",
      "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
      "modes": {
        "grab": { "distance": 180, "line_linked": { "opacity": 0.6 } },
        "push": { "particles_nb": 3 }
      }
    },
    "retina_detect": true
  });
}

// ---- Particles.js Configuration (Organizadores Section) ----
if (typeof particlesJS !== 'undefined' && document.getElementById('particles-org')) {
  particlesJS('particles-org', {
    "particles": {
      "number": { "value": 45, "density": { "enable": true, "value_area": 800 } },
      "color": { "value": ["#A5668B", "#69306D"] },
      "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" } },
      "opacity": { "value": 0.5, "random": false, "anim": { "enable": false } },
      "size": { "value": 4, "random": true, "anim": { "enable": false } },
      "line_linked": { "enable": true, "distance": 160, "color": "#A5668B", "opacity": 0.35, "width": 1.5 },
      "move": { "enable": true, "speed": 1.2, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false } }
    },
    "interactivity": {
      "detect_on": "window",
      "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
      "modes": {
        "grab": { "distance": 160, "line_linked": { "opacity": 0.6 } },
        "push": { "particles_nb": 3 }
      }
    },
    "retina_detect": true
  });
}
