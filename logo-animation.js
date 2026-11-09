document.addEventListener("DOMContentLoaded", function () {

    const logo = document.querySelector(".header .logo");
    const animation = document.querySelector(".logo-animation");

    if (!logo || !animation) {
        console.warn("Логотип для анімації не знайдено");
        return;
    }

    // Профілі ПС-7, ПС-12, ПК-20
    const profiles = [
        {
            name: "ПС-7",
            path: "M0 35 L12 35 L18 12 L42 12 L50 35 L72 35 L80 12 L104 12 L112 35 L134 35 L142 12 L166 12 L174 35 L196 35 L204 12 L228 12 L236 35 L258 35 L266 12 L290 12 L298 35 L320 35"
        },
        {
            name: "ПС-12",
            path: "M0 45 L15 45 L25 10 L45 10 L55 45 L75 45 L85 10 L105 10 L115 45 L135 45 L145 10 L165 10 L175 45 L195 45 L205 10 L225 10 L235 45 L255 45 L265 10 L285 10 L295 45 L320 45"
        },
        {
            name: "ПК-20",
            path: "M0 55 L15 55 L30 5 L55 5 L70 55 L90 55 L105 5 L130 5 L145 55 L165 55 L180 5 L205 5 L220 55 L240 55 L255 5 L280 5 L295 55 L320 55"
        }
    ];

    let isAnimating = false;
    let autoTimer = null;
    let animationTimer = null;

    // Створюємо область анімації
    function createPresentation() {
        const presentation = document.createElement("div");

        presentation.className = "logo-profile-presentation";

        presentation.innerHTML = `
            <svg viewBox="0 0 340 90" aria-hidden="true">
                <path class="profile-line" d=""></path>
            </svg>
            <span class="profile-name"></span>
        `;

        animation.appendChild(presentation);

        return presentation;
    }

    // Малювання профілю
    function drawProfile(presentation, profile) {
        const line = presentation.querySelector(".profile-line");
        const name = presentation.querySelector(".profile-name");

        line.style.animation = "none";
        line.setAttribute("d", profile.path);

        name.textContent = profile.name;

        void line.getBoundingClientRect();

        line.style.animation = "drawProfile 1.1s ease forwards";

        presentation.classList.add("visible");
animation.classList.add("show-profiles");
    }

    // Планування наступного автоматичного запуску
    function scheduleNextAnimation() {
        clearTimeout(autoTimer);

        autoTimer = setTimeout(function () {
            startAnimation();
        }, 20000);
    }

    // Запуск анімації
    function startAnimation(event) {

        if (event) {
            event.preventDefault();
        }

        if (isAnimating) return;

        isAnimating = true;

        // Скасовуємо очікуваний автоматичний запуск
        clearTimeout(autoTimer);

        const presentation = createPresentation();

        let index = 0;

        function next() {

            if (index < profiles.length) {

                drawProfile(presentation, profiles[index]);

                index++;

                animationTimer = setTimeout(next, 1500);

            } else {
                animation.classList.remove("show-profiles");

                presentation.classList.remove("visible");

                animationTimer = setTimeout(function () {

                    presentation.remove();

                    isAnimating = false;

                    // Наступний автоматичний запуск через 20 секунд
                    scheduleNextAnimation();

                }, 500);
            }
        }

        next();
    }

    // Запуск при натисканні на логотип
    logo.addEventListener("click", startAnimation);

    // Перший автоматичний запуск через 5 секунд
    autoTimer = setTimeout(function () {
        startAnimation();
    }, 5000);

});