
document.addEventListener("DOMContentLoaded", async function () {
    const productsGrid = document.querySelector(".products-grid");

    if (!productsGrid) {
        console.error("Не знайдено .products-grid");
        return;
    }

    try {
        const response = await fetch("./catalog/catalog.html", {
    cache: "no-store"
});
        if (!response.ok) {
            throw new Error("Не вдалося завантажити каталог");
        }

        const html = await response.text();
        const wrapper = document.createElement("div");
        wrapper.innerHTML = html.trim();

        const panel = wrapper.firstElementChild;

        if (!panel) return;

        productsGrid.insertAdjacentElement("afterend", panel);

        const closeButton = panel.querySelector("#catalogClose");
        const colorButtons = panel.querySelectorAll(".catalog-color");
        const profileImages = panel.querySelectorAll(".catalog-type-image");

        function openCatalog() {
            panel.classList.add("open");
        }

        function closeCatalog() {
            panel.classList.remove("open");
        }

        // Відкриття каталогу при натисканні на картку
        productsGrid.addEventListener("click", function (event) {
            const card = event.target.closest(".product-card");

            if (!card) return;

            event.preventDefault();

            if (panel.classList.contains("open")) {
                closeCatalog();
            } else {
                openCatalog();
            }
        });

        // Закриття каталогу
        closeButton?.addEventListener("click", closeCatalog);

        // Перемикання кольорів
        colorButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                const color = button.dataset.color;
                const ral = button.dataset.ral;
                const name = button.dataset.name;

                // Змінюємо активну кнопку
                colorButtons.forEach(function (item) {
                    item.classList.remove("active");
                });

                button.classList.add("active");

                // Змінюємо колір усіх профілів
                profileImages.forEach(function (image) {
                    image.style.setProperty("--metal-color", color);
                });

                // Оновлюємо інформацію про колір
                panel.querySelector("#selectedRal").textContent = ral;
                panel.querySelector("#selectedColorName").textContent = name;

                panel.querySelector(".selected-color-preview").style.background = color;
            });
        });

        console.log("Каталог успішно завантажено!");

    } catch (error) {
        console.error("Помилка каталогу:", error);
    }
});
