
// Основний JavaScript сайту

document.addEventListener('DOMContentLoaded', () => {
    console.log('ProfMetDah website loaded!');
});

/* =================================
   HERO PRODUCT SLIDER
================================= */

document.addEventListener("DOMContentLoaded", function () {

    const slides = document.querySelectorAll(".hero-slide");
    const currentNumber = document.getElementById("currentSlide");
    const prevButton = document.querySelector(".hero-prev");
    const nextButton = document.querySelector(".hero-next");

    if (!slides.length) return;

    let currentIndex = 0;
    let sliderTimer;

    function showSlide(index) {
        slides[currentIndex].classList.remove("active");

        currentIndex = (index + slides.length) % slides.length;

        slides[currentIndex].classList.add("active");

        if (currentNumber) {
            currentNumber.textContent =
                String(currentIndex + 1).padStart(2, "0");
        }
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startSlider() {
        clearInterval(sliderTimer);
        sliderTimer = setInterval(nextSlide, 5000);
    }

    if (nextButton) {
        nextButton.addEventListener("click", function () {
            nextSlide();
            startSlider();
        });
    }

    if (prevButton) {
        prevButton.addEventListener("click", function () {
            prevSlide();
            startSlider();
        });
    }

    startSlider();

});