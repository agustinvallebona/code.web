
// Partículas animadas 
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
let width, height;
let particlesArray;

function initCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

window.addEventListener('resize', () => {
  initCanvas();
  initParticles();
});

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.7;
    this.speedY = (Math.random() - 0.5) * 0.7;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > width) this.speedX *= -1;
    if (this.y < 0 || this.y > height) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = '#00e0ff';
    ctx.shadowColor = '#ff0040';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function connectParticles() {
  const maxDistance = 100;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a + 1; b < particlesArray.length; b++) {
      const dx = particlesArray[a].x - particlesArray[b].x;
      const dy = particlesArray[a].y - particlesArray[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < maxDistance) {
        ctx.strokeStyle = `rgba(0, 224, 255, ${1 - distance / maxDistance})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function initParticles() {
  particlesArray = [];
  let numParticles = Math.floor(width / 12);
  for (let i = 0; i < numParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animate);
}

initCanvas();
initParticles();
animate();

// ScrollReveal
document.addEventListener("DOMContentLoaded", () => {
  ScrollReveal().reveal('.section', {
    duration: 1000,
    origin: 'bottom',
    distance: '50px',
    easing: 'ease-out',
    reset: true
  });

  ScrollReveal().reveal('.contacto', {
    duration: 1200,
    origin: 'bottom',
    distance: '60px',
    opacity: 0,
    easing: 'ease-in-out',
    reset: true
  });
});
