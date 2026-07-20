/* ==========================================================================
   1. SISTEMA ANIMADO DE REDES (CANVAS MESH BACKGROUND)
   ========================================================================== */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 65;
const connectionDistance = 120;
let mouse = { x: null, y: null, radius: 150 };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Classe Partícula
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4; // Movimento suave e devagar
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
        this.baseY = this.y;
        this.density = (Math.random() * 20) + 10;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 135, 0.7)';
        ctx.fill();
    }

    update(time) {
        // Movimento de onda lento usando seno
        this.y += Math.sin(time + this.x * 0.01) * 0.15;
        this.x += this.vx;
        this.y += this.vy;

        // Limites da tela
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        // Interação com o Mouse (Repulsão Leve)
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.hypot(dx, dy);
        if (distance < mouse.radius) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density * 0.1;
            let directionY = forceDirectionY * force * this.density * 0.1;
            this.x -= directionX;
            this.y -= directionY;
        }
    }
}

// Inicializar Partículas
function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}
initParticles();

// Render Loop
function animateParticles(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const time = timestamp * 0.001;

    for (let i = 0; i < particles.length; i++) {
        particles[i].update(time);
        particles[i].draw();

        // Relação de linhas entre nós próximos
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.hypot(dx, dy);

            if (dist < connectionDistance) {
                const alpha = (1 - dist / connectionDistance) * 0.15;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0, 255, 135, ${alpha})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}
requestAnimationFrame(animateParticles);

// Rastrear Mouse
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});
window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

/* ==========================================================================
   2. CONTROLE DO MENU CASCATA (MOBILE)
   ========================================================================== */
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.className = navMenu.classList.contains('active') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').className = 'fa-solid fa-bars';
        }
    });
});

/* ==========================================================================
   3. EFEITO DE ROLAGEM SUAVE E ANIMAÇÃO DE SURGIMENTO (FADE-IN)
   ========================================================================== */
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { root: null, threshold: 0.12 });

sections.forEach(section => sectionObserver.observe(section));

document.querySelectorAll('nav a, .btn').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        if (targetSection) window.scrollTo({ top: targetSection.offsetTop, behavior: 'smooth' });
    });
});
