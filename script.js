// Slider de Portfólio
const slides = document.querySelector('.slides');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;

function showSlide(index) {
    const slideWidth = slides.children[0].clientWidth;
    slides.style.transform = `translateX(${-index * (slideWidth + 20)}px)`;
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.children.length - 1;
    showSlide(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < slides.children.length - 1) ? currentIndex + 1 : 0;
    showSlide(currentIndex);
});
