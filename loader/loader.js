document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("site-loader");

    if (!loader) return;

    // Час анімації логотипа
    const logoAnimationTime = 2500;

    setTimeout(() => {
        loader.classList.add("loader-hidden");

        setTimeout(() => {
            loader.remove();
        }, 800);

    }, logoAnimationTime);
});