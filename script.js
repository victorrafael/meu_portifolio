/* 1. Controle Avançado do Workspace de BI (Troca Coordenada de Links) */
function changeLiveDashboard(desktopUrl, mobileUrl) {
    const desktopIframe = document.getElementById('desktopIframe');
    const mobileIframe = document.getElementById('mobileIframe');
    
    if (desktopIframe) desktopIframe.src = desktopUrl;
    if (mobileIframe) mobileIframe.src = mobileUrl;
    
    // Atualiza as classes ativas dos botões estruturais
    const buttons = document.querySelectorAll('.hub-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    event.currentTarget.classList.add('active');
}

// Inicializa o primeiro painel com links padrão ao carregar
document.addEventListener('DOMContentLoaded', () => {
    const defaultBtn = document.querySelector('.hub-btn');
    if (defaultBtn) {
        // Altere aqui dentro os links padrão iniciais do seu primeiro projeto
        changeLiveDashboard('URL_DO_PAINEL_1_DESKTOP', 'URL_DO_PAINEL_1_MOBILE');
    }
});

/* 2. Controle do Menu Cascata (Hambúrguer Mobile) */
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

/* 3. Efeito de Rolagem Suave e Animação de Surgimento (Fade-In) */
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
