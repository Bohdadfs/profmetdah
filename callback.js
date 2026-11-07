document.addEventListener("DOMContentLoaded", async function () {

    const response = await fetch("callback.html");

    if (!response.ok) {
        console.error("Не вдалося завантажити форму дзвінка");
        return;
    }

    const html = await response.text();

    document.body.insertAdjacentHTML("beforeend", html);

    const button = document.getElementById("floatingCall");
    const overlay = document.getElementById("callbackOverlay");
    const close = document.getElementById("callbackClose");

    const day = document.getElementById("callbackDay");
    const date = document.getElementById("callbackDate");

    const form = document.getElementById("callbackForm");
    const message = document.getElementById("callbackMessage");

    function openModal() {
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    button.addEventListener("click", openModal);
    close.addEventListener("click", closeModal);

    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            closeModal();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    day.addEventListener("change", function () {
        date.hidden = day.value !== "other";
        date.required = day.value === "other";

        if (day.value === "other") {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            date.min = tomorrow.toISOString().split("T")[0];
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        message.textContent =
            "Форму заповнено. Для отримання заявки потрібно підключити відправлення на сервер.";

    });

});