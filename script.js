// Seletores para o carrossel
const slides = document.querySelector('.slides');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;

// Função para exibir o slide atual
function showSlide(index) {
    const slideWidth = slides.children[0].clientWidth;
    slides.style.transform = `translateX(${-index * (slideWidth + 20)}px)`;
    slides.style.transition = 'transform 0.3s ease'; // Transição suave
}

// Função para ajustar o slide ao redimensionar a janela
function handleResize() {
    showSlide(currentIndex); // Garante que o slide atual seja redimensionado corretamente
}

// Função para iniciar ou reiniciar o intervalo automático
function startAutoSlide() {
    return setInterval(() => {
        currentIndex = (currentIndex < slides.children.length - 1) ? currentIndex + 1 : 0;
        showSlide(currentIndex);
    }, 3000); // Muda de slide a cada 3 segundos
}

// Evento para o botão anterior (esquerda)
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.children.length - 1;
    showSlide(currentIndex);
    clearInterval(autoSlide); // Pausa o intervalo automático
    autoSlide = startAutoSlide(); // Reinicia o intervalo
});

// Evento para o botão próximo (direita)
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < slides.children.length - 1) ? currentIndex + 1 : 0;
    showSlide(currentIndex);
    clearInterval(autoSlide); // Pausa o intervalo automático
    autoSlide = startAutoSlide(); // Reinicia o intervalo
});

// Intervalo automático para troca de slides
let autoSlide = startAutoSlide();

// Ajusta o slide atual ao redimensionar a janela
window.addEventListener('resize', handleResize);
