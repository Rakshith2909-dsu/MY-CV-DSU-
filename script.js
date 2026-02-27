/* ─────────────────────────────────────────
   RAKSHITH KP – CV WEBSITE  |  script.js
───────────────────────────────────────── */

"use strict";

/* ── helpers ── */
const qs  = s => document.querySelector(s);
const qsa = s => document.querySelectorAll(s);

/* ─────────────────────────────────────────
   NAVBAR – scroll & active link
───────────────────────────────────────── */
const navbar    = qs('#navbar');
const navLinks  = qsa('.nav-links a');
const hamburger = qs('#hamburger');
const navMenu   = qs('.nav-links');

window.addEventListener('scroll', () => {
  /* scrolled class */
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  /* back-to-top */
  qs('#back-to-top').classList.toggle('visible', window.scrollY > 400);

  /* active nav link */
  let current = '';
  qsa('section').forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
  });
});

/* hamburger toggle */
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

/* close menu on link click */
navLinks.forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('open');
  navMenu.classList.remove('open');
}));

/* ─────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

qsa('.reveal').forEach(el => revealObserver.observe(el));

/* ─────────────────────────────────────────
   COUNTER ANIMATION
───────────────────────────────────────── */
function animateCounter(el, target, duration = 1600) {
  let start = 0;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target; clearInterval(timer); }
    else el.textContent = start;
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      qsa('.stat-num').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target, 10));
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.4 });

const statsRow = qs('.stats-row');
if (statsRow) statsObserver.observe(statsRow);

/* ─────────────────────────────────────────
   SKILL BAR ANIMATION
───────────────────────────────────────── */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

qsa('.skills-block').forEach(block => barObserver.observe(block));

/* ─────────────────────────────────────────
   BACK-TO-TOP
───────────────────────────────────────── */
qs('#back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────── */
function handleFormSubmit(e) {
  e.preventDefault();
  const msg = qs('#form-msg');
  msg.textContent = 'Thank you! Your message has been noted.';
  msg.style.color = '#1d4ed8';
  e.target.reset();
  setTimeout(() => { msg.textContent = ''; }, 4000);
}

/* ─────────────────────────────────────────
   TYPING EFFECT – hero tagline
───────────────────────────────────────── */
(function typingEffect() {
  const el  = qs('.hero-tagline');
  if (!el) return;
  const words = ['B.Tech CSE', 'DSA Expert', 'Java & C', 'Web Developer', 'Problem Solver'];
  const static_part = ' · ';
  let wi = 0, ci = 0, deleting = false;

  function tick() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ci + 1) + static_part + '100+ LeetCode';
      ci++;
      if (ci === word.length) { deleting = true; setTimeout(tick, 1800); return; }
    } else {
      el.textContent = word.slice(0, ci - 1) + static_part + '100+ LeetCode';
      ci--;
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(tick, deleting ? 60 : 100);
  }
  tick();
})();

/* ─────────────────────────────────────────
   SMOOTH SECTION TRANSITIONS
───────────────────────────────────────── */
qsa('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = qs(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─────────────────────────────────────────
   CERTIFICATE LIGHTBOX
───────────────────────────────────────── */
function openCert(filename, title) {
  const modal    = qs('#cert-modal');
  const img      = qs('#cert-modal-img');
  const ttl      = qs('#cert-modal-title');
  const missing  = qs('#cert-modal-missing');
  const fname    = qs('#cert-modal-filename');

  ttl.textContent  = title;
  fname.textContent = filename;
  img.style.display    = 'block';
  missing.style.display = 'none';

  img.onload  = () => { missing.style.display = 'none'; img.style.display = 'block'; };
  img.onerror = () => { img.style.display = 'none'; missing.style.display = 'block'; };
  img.src = filename;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCert(e) {
  if (e && e.target !== qs('#cert-modal') && e.target !== qs('.cert-modal-close') && !e.target.closest('.cert-modal-close')) return;
  qs('#cert-modal').classList.remove('open');
  document.body.style.overflow = '';
  qs('#cert-modal-img').src = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCert({ target: qs('#cert-modal') }); });

/* ─────────────────────────────────────────
   PARTICLE BACKGROUND (subtle dots)
───────────────────────────────────────── */
(function particles() {
  const hero = qs('#hero');
  if (!hero) return;
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.35;';
  hero.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let W, H, dots;

  function resize() {
    W = canvas.width  = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
    createDots();
  }

  function createDots() {
    dots = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.5 + .5,
      vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(147,197,253,0.7)';
    dots.forEach(d => {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > W) d.vx *= -1;
      if (d.y < 0 || d.y > H) d.vy *= -1;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
    });

    /* draw lines between nearby dots */
    ctx.strokeStyle = 'rgba(147,197,253,0.15)';
    ctx.lineWidth = .8;
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();
