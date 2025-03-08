//Função do menu mobile
function onToggleMenu(button) {
    const navLinks = document.querySelector('.nav-links');
    const mainLogo = document.querySelector('.main-header-content');

    if (!navLinks) return;

    if (button.name === 'menu') {
        // Abre o menu
        navLinks.style.right = '0';
        mainLogo.style.opacity = '0';
        addOverlay();
    } else {
        // Fecha o menu
        navLinks.style.right = '-100%';
        mainLogo.style.opacity = '1';
        removeOverlay();
    }
}

// Adiciona overlay semi-transparente
function addOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay fixed inset-0 bg-black bg-opacity-50 z-40';
    overlay.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        const mainLogo = document.querySelector('.main-header-content');
        navLinks.style.right = '-100%';
        mainLogo.style.opacity = '1';
        removeOverlay();
    });
    document.body.appendChild(overlay);
}

// Remove overlay
function removeOverlay() {
    const overlay = document.querySelector('.menu-overlay');
    if (overlay) overlay.remove();
}

// Fechar menu ao clicar em um link
document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.nav-links a');
    const mainLogo = document.querySelector('.main-header-content');

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.right = '-100%';
            mainLogo.style.opacity = '1';
            removeOverlay();
        });
    });
});

// Variáveis do carousel
let currentPosition = 0;
const carousel = document.getElementById('carousel');
const totalItems = document.querySelectorAll('#carousel > div').length;
const itemsPerView = window.innerWidth >= 768 ? 2 : 1;

function moveCarousel() {
    currentPosition = (currentPosition + 1) % (totalItems - 1);

    const itemWidth = carousel.querySelector('div').offsetWidth;
    const translateX = -(currentPosition * itemWidth);

    carousel.style.transform = `translateX(${translateX}px)`;
}

//Auto-play do carousel com intervalo mais longo
function startAutoPlay() {
    return setInterval(() => {
        moveCarousel();
    }, 3000); // Muda a cada 3 segundos
}


// Inicia o carousel quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    let autoPlayInterval = startAutoPlay();

    // Reinicia o carousel quando a janela é redimensionada
    window.addEventListener('resize', () => {
        const newItemsPerView = window.innerWidth >= 768 ? 2 : 1;
        if (newItemsPerView !== itemsPerView) {
            currentPosition = 0;
            carousel.style.transform = 'translateX(0)';
            clearInterval(autoPlayInterval);
            autoPlayInterval = startAutoPlay();
        }
    });
});


// Controle do header no scroll pageYOffset
const headerBg = document.getElementById('header-bg');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Adiciona background quando rolar
    if (currentScroll > 100) {
        headerBg.classList.add('bg-opacity-50');
    } else {
        headerBg.classList.remove('bg-opacity-50');
    }
});

// MODAL
function openModal(imgElement) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    modalImg.src = imgElement.src;
    modal.classList.remove('hidden');
}

function closeModal(event, isButton = false) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');

    // Fecha o modal apenas se o clique for fora da imagem ou no botão "X"
    if (isButton || event.target !== modalImg) {
        modal.classList.add('hidden');
    }
}


// Intersection Observer
function observeElements() {
    const elements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // Observa a viewport
        rootMargin: '0px',
        threshold: 0.4 // 40% do elemento visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Para de observar após a animação
            }
        });
    }, observerOptions);

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Chama a função quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', observeElements);



