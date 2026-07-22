/* ==========================================================================
   1. CONTROLE DO MENU CASCATA (MOBILE)
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
   2. EFEITO DE ROLAGEM SUAVE E ANIMAÇÃO DE SURGIMENTO (FADE-IN)
   ========================================================================== */
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { root: null, threshold: 0.12 });

sections.forEach(section => sectionObserver.observe(section));

// Seleciona apenas os links internos que começam com '#' para evitar quebrar links externos como o do Power BI
document.querySelectorAll('nav a[href^="#"], .btn[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        if (targetSection) window.scrollTo({ top: targetSection.offsetTop, behavior: 'smooth' });
    });
});
