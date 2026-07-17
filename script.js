/* 1. Controle Avançado do Workspace de BI (Troca de Links, Títulos e Descrições) */
function changeLiveDashboard(desktopUrl, mobileUrl, title, description) {
    const desktopIframe = document.getElementById('desktopIframe');
    const mobileIframe = document.getElementById('mobileIframe');
    const projectTitle = document.getElementById('projectLiveTitle');
    const projectDesc = document.getElementById('projectLiveDesc');
    
    if (desktopIframe) desktopIframe.src = desktopUrl;
    if (mobileIframe) mobileIframe.src = mobileUrl;
    if (projectTitle) projectTitle.innerText = title;
    if (projectDesc) projectDesc.innerText = description;
    
    const buttons = document.querySelectorAll('.hub-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }
}

// Inicializa o primeiro painel com o link real fornecido ao carregar
document.addEventListener('DOMContentLoaded', () => {
    const defaultBtn = document.querySelector('.hub-btn');
    if (defaultBtn) {
        changeLiveDashboard(
            'https://app.powerbi.com/view?r=eyJrIjoiZmY5ZTE1ZDMtZTIyNS00YTMzLWFjZjItZTkzNDY2N2EwYmUxIiwidCI6ImRhM2U3ZWE3LTUxMTctNDQwZS1hNzg2LWM1NDg1MjFlYTFjZSJ9', 
            'https://app.powerbi.com/view?r=eyJrIjoiZmY5ZTE1ZDMtZTIyNS00YTMzLWFjZjItZTkzNDY2N2EwYmUxIiwidCI6ImRhM2U3ZWE3LTUxMTctNDQwZS1hNzg2LWM1NDg1MjFlYTFjZSJ9',
            'Dashboard LogiExpress Operational',
            'Análise de performance de cadeia logística de entregas rápida. O painel centraliza indicadores estratégicos como total de pedidos e entregas efetuadas, taxa percentual de eficiência por região, ranking de origens de canais integrados (E-commerce e Marketplaces) e avaliação de performance de entregadores por base regional.'
        );
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
