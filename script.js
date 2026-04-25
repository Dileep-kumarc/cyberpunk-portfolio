// ═══════════ PARTICLES ═══════════
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '0,240,255' : (Math.random() > 0.5 ? '252,238,10' : '255,0,60');
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
    ctx.fill();
  }
}
for (let i = 0; i < 80; i++) particles.push(new Particle());

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0,240,255,${0.06 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawLines();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ═══════════ NAVBAR SCROLL ═══════════
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 60));

// ═══════════ MOBILE NAV ═══════════
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
navToggle.addEventListener('click', () => navLinks.classList.toggle('active'));

// ═══════════ TYPING EFFECT ═══════════
const phrases = ['Java Full Stack Developer', 'Problem Solver', 'Clean Code Enthusiast', 'Web Developer'];
let phraseIdx = 0, charIdx = 0, isDeleting = false;
const typingEl = document.getElementById('typing-text');

function typeEffect() {
  const current = phrases[phraseIdx];
  typingEl.textContent = isDeleting ? current.substring(0, charIdx--) : current.substring(0, charIdx++);
  let speed = isDeleting ? 30 : 60;
  if (!isDeleting && charIdx === current.length + 1) { speed = 2000; isDeleting = true; }
  if (isDeleting && charIdx < 0) { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; speed = 400; }
  setTimeout(typeEffect, speed);
}
typeEffect();

// ═══════════ COUNTER ANIMATION ═══════════
function animateCounters() {
  document.querySelectorAll('.hero-stat-num').forEach(el => {
    const target = +el.dataset.target;
    const duration = 1500;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  });
}

// ═══════════ SKILL BARS ═══════════
function animateSkillBars() {
  document.querySelectorAll('.skill-bar-fill').forEach(bar => bar.classList.add('animated'));
}

// ═══════════ SCROLL ANIMATIONS ═══════════
const fadeEls = document.querySelectorAll('.project-card,.section-header,.cta-content,.about-text-card,.skills-card,.timeline-item,.edu-card');
fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
fadeEls.forEach(el => observer.observe(el));

// Trigger counters on hero visible
const heroObs = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) { animateCounters(); heroObs.disconnect(); }
}, { threshold: 0.3 });
heroObs.observe(document.querySelector('.hero-stats'));

// Trigger skill bars on visible
const skillsObs = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) { animateSkillBars(); skillsObs.disconnect(); }
}, { threshold: 0.3 });
const skillsCard = document.querySelector('.skills-card');
if (skillsCard) skillsObs.observe(skillsCard);

// ═══════════ SMOOTH SCROLL ═══════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); navLinks.classList.remove('active'); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
