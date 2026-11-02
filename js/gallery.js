/* =========================================================
   Kele's Beauty Therapy - gallery filters and lightbox
   ========================================================= */

function initGallery() {
    const items = [...document.querySelectorAll(".gallery-item")];
    const lightbox = document.getElementById("lightbox");
    if (!items.length || !lightbox) return;

    const image = lightbox.querySelector(".lightbox-image");
    const caption = lightbox.querySelector(".lightbox-caption");
    const counter = lightbox.querySelector(".lightbox-counter");
    const credit = lightbox.querySelector(".lightbox-credit");
    const filterButtons = [...document.querySelectorAll("[data-gallery-filter]")];
    const count = document.getElementById("gallery-count");

    let visible = items;   // the photos the current filter is showing
    let current = 0;       // index into `visible`
    let opener = null;     // button that opened the lightbox, to return focus to

    /* ----- Category filter ----- */

    function applyFilter(category) {
        items.forEach((item) => {
            item.hidden = category !== "all" && item.dataset.category !== category;
        });
        visible = items.filter((item) => !item.hidden);
        filterButtons.forEach((button) => {
            button.setAttribute("aria-pressed", String(button.dataset.galleryFilter === category));
        });
        count.textContent = `Showing ${visible.length} of ${items.length} photos`;
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => applyFilter(button.dataset.galleryFilter));
    });

    /* ----- Lightbox ----- */

    function show(index) {
        current = (index + visible.length) % visible.length;
        const item = visible[current];
        const trigger = item.querySelector("button");
        const thumbnail = item.querySelector("img");

        lightbox.classList.add("is-loading");
        image.onload = () => lightbox.classList.remove("is-loading");
        image.onerror = () => {
            // Fall back to the thumbnail if the large photo cannot load
            lightbox.classList.remove("is-loading");
            if (image.src !== thumbnail.src) image.src = thumbnail.src;
        };
        image.src = trigger.dataset.full;
        image.alt = thumbnail.alt;

        caption.textContent = item.querySelector("figcaption").firstChild.textContent.trim();
        counter.textContent = `${current + 1} of ${visible.length}`;
        credit.textContent = trigger.dataset.credit || "";

        // Preload the neighbours so next/previous feel instant
        [current + 1, current - 1].forEach((i) => {
            const neighbour = visible[(i + visible.length) % visible.length];
            new Image().src = neighbour.querySelector("button").dataset.full;
        });
    }

    function open(item) {
        opener = item.querySelector("button");
        show(visible.indexOf(item));
        lightbox.showModal();
        document.body.classList.add("no-scroll");
    }

    function close() {
        if (lightbox.open) lightbox.close();
    }

    items.forEach((item) => {
        item.querySelector("button").addEventListener("click", () => open(item));
    });

    lightbox.querySelector(".lightbox-close").addEventListener("click", close);
    lightbox.querySelector(".lightbox-prev").addEventListener("click", () => show(current - 1));
    lightbox.querySelector(".lightbox-next").addEventListener("click", () => show(current + 1));

    // Esc is handled by <dialog> itself; this adds the arrow keys
    lightbox.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") show(current + 1);
        if (event.key === "ArrowLeft") show(current - 1);
    });

    // Click on the dark area around the photo to close
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox || event.target.classList.contains("lightbox-stage")) close();
    });

    lightbox.addEventListener("close", () => {
        document.body.classList.remove("no-scroll");
        if (opener) opener.focus();
    });

    // Swipe left or right on touch screens
    let startX = null;
    lightbox.addEventListener("touchstart", (event) => { startX = event.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener("touchend", (event) => {
        if (startX === null) return;
        const distance = event.changedTouches[0].clientX - startX;
        if (Math.abs(distance) > 50) show(current + (distance < 0 ? 1 : -1));
        startX = null;
    });

    applyFilter("all");
}

document.addEventListener("DOMContentLoaded", initGallery);
