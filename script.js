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
const phrases = ['Java Full Stack Developer', 'NEURAL_NET.ARCHITECT', 'ZERO_BUG_PROTOCOL // ACTIVE', 'SYS.WEB.ENGINEER'];
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

// ═══════════ RADAR CHART ═══════════
const radarData = [
    { label: 'Java', value: 0.85 },
    { label: 'Python', value: 0.70 },
    { label: 'SQL', value: 0.80 },
    { label: 'Front-End', value: 0.90 },
    { label: 'Back-End', value: 0.80 },
    { label: 'Git/GitHub', value: 0.75 },
    { label: 'Algorithms', value: 0.75 },
    { label: 'System Design', value: 0.65 }
];
let radarDrawn = false;

function drawRadarChart(progress = 1) {
    const canvas = document.getElementById('radar-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 80;
    const sides = radarData.length;
    const angleStep = (Math.PI * 2) / sides;

    ctx.clearRect(0, 0, width, height);

    // Draw web (background grid)
    ctx.lineWidth = 1;
    for (let level = 1; level <= 5; level++) {
        const r = radius * (level / 5);
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
            const x = centerX + r * Math.cos(i * angleStep - Math.PI / 2);
            const y = centerY + r * Math.sin(i * angleStep - Math.PI / 2);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
        ctx.stroke();
    }

    // Draw axes & labels
    ctx.font = 'bold 13px "Share Tech Mono", monospace';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < sides; i++) {
        const x = centerX + radius * Math.cos(i * angleStep - Math.PI / 2);
        const y = centerY + radius * Math.sin(i * angleStep - Math.PI / 2);
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
        ctx.stroke();

        // Draw dot at end of axis
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI*2);
        ctx.fillStyle = '#00f0ff';
        ctx.fill();

        // Draw label
        const labelX = centerX + (radius + 20) * Math.cos(i * angleStep - Math.PI / 2);
        const labelY = centerY + (radius + 25) * Math.sin(i * angleStep - Math.PI / 2);
        
        // Dynamic text alignment
        if (Math.abs(labelX - centerX) < 10) {
            ctx.textAlign = 'center';
        } else if (labelX < centerX) {
            ctx.textAlign = 'right';
        } else {
            ctx.textAlign = 'left';
        }

        ctx.fillStyle = '#e0e0f0';
        ctx.fillText(radarData[i].label, labelX, labelY);
    }

    // Draw data polygon
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
        const val = radarData[i].value * progress;
        const x = centerX + (radius * val) * Math.cos(i * angleStep - Math.PI / 2);
        const y = centerY + (radius * val) * Math.sin(i * angleStep - Math.PI / 2);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    
    // Fill and stroke
    ctx.fillStyle = 'rgba(255, 0, 60, 0.2)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ff003c';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff003c';
    ctx.stroke();
    ctx.shadowBlur = 0; // reset
    
    // Draw data points
    for (let i = 0; i < sides; i++) {
        const val = radarData[i].value * progress;
        const x = centerX + (radius * val) * Math.cos(i * angleStep - Math.PI / 2);
        const y = centerY + (radius * val) * Math.sin(i * angleStep - Math.PI / 2);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI*2);
        ctx.fillStyle = '#ff003c';
        ctx.fill();
    }
}

function animateRadarChart() {
    if (radarDrawn) return;
    radarDrawn = true;
    let start = null;
    const duration = 1500;
    
    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        // Easing out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        drawRadarChart(easeProgress);
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

// ═══════════ SCROLL ANIMATIONS ═══════════
const fadeEls = document.querySelectorAll('.cyber-project,.section-header,.cta-content,.about-text-card,.skills-card,.bounty-card,.biometric-card');
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

// Trigger radar chart on visible
const skillsObs = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) { animateRadarChart(); skillsObs.disconnect(); }
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

// ═══════════ DECRYPT TEXT EFFECT ═══════════
const decryptElements = document.querySelectorAll('.decrypt-text');
const hexAlphabet = '0123456789ABCDEF';

function scrambleText(text) {
    let scrambled = '';
    for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
            scrambled += ' ';
        } else {
            scrambled += hexAlphabet[Math.floor(Math.random() * hexAlphabet.length)];
        }
    }
    return scrambled;
}

decryptElements.forEach(el => {
    const originalText = el.getAttribute('data-original');
    if (!originalText) return;
    
    // Initially scramble
    el.textContent = scrambleText(originalText);
    el.classList.add('scrambled');
    
    let isDecrypting = false;
    let isDecrypted = false;
    
    el.addEventListener('mouseenter', () => {
        if (isDecrypting || isDecrypted) return;
        isDecrypting = true;
        
        let iteration = 0;
        const interval = setInterval(() => {
            let newText = '';
            for (let i = 0; i < originalText.length; i++) {
                if (i < iteration) {
                    newText += originalText[i];
                } else if (originalText[i] === ' ') {
                    newText += ' ';
                } else {
                    // Inject occasional 0x prefix to mimic hex bytes without breaking layout completely
                    if (Math.random() > 0.95 && i < originalText.length - 3) {
                       newText += '0x' + hexAlphabet[Math.floor(Math.random() * 16)];
                       i += 3; // Skip ahead to balance string length roughly
                    } else {
                       newText += hexAlphabet[Math.floor(Math.random() * hexAlphabet.length)];
                    }
                }
            }
            
            el.textContent = newText;
            iteration += 3; // Reveal 3 chars per tick
            
            if (iteration >= originalText.length) {
                clearInterval(interval);
                el.textContent = originalText;
                el.classList.remove('scrambled');
                isDecrypting = false;
                isDecrypted = true;
            }
        }, 30);
    });
});

// ═══════════ TERMINAL FORM SUBMISSION ═══════════
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Hide inputs and change button state
        const inputs = contactForm.querySelectorAll('.form-group');
        inputs.forEach(input => input.style.display = 'none');
        submitBtn.innerHTML = 'UPLOADING_DATA... <span class="blink-cursor">_</span>';
        
        const data = new FormData(contactForm);
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                submitBtn.style.display = 'none';
                formStatus.className = 'form-status success';
                formStatus.innerHTML = '> TRANSMISSION SUCCESSFUL.<br>> CONNECTION SEVERED.<br><br>I will get back to you shortly.';
                contactForm.reset();
            } else {
                submitBtn.innerHTML = './transmit.sh <span class="blink-cursor">_</span>';
                inputs.forEach(input => input.style.display = 'flex');
                formStatus.className = 'form-status error';
                formStatus.innerHTML = '> ERR: TRANSMISSION FAILED. NODE UNREACHABLE.';
            }
        } catch (error) {
            submitBtn.innerHTML = './transmit.sh <span class="blink-cursor">_</span>';
            inputs.forEach(input => input.style.display = 'flex');
            formStatus.className = 'form-status error';
            formStatus.innerHTML = '> ERR: FATAL NETWORK EXCEPTION.';
        }
    });
}
