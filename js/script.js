/* =========================================================
   Kele's Beauty Therapy - site scripts
   ========================================================= */

// Salon phone number in international format (071 531 1476)
const WHATSAPP_NUMBER = "27715311476";

// Opening hours per day (0 = Sunday ... 6 = Saturday). null = closed.
const OPENING_HOURS = {
    0: null,
    1: { open: "08:00", close: "19:00" },
    2: { open: "08:00", close: "19:00" },
    3: { open: "08:00", close: "19:00" },
    4: { open: "08:00", close: "19:00" },
    5: { open: "08:00", close: "19:00" },
    6: { open: "08:00", close: "17:00" }
};

function toMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

// Current day and time in Johannesburg, whatever the visitor's timezone
function getSalonNow() {
    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Johannesburg",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }).formatToParts(new Date());

    const get = (type) => parts.find((part) => part.type === type).value;
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return {
        day: days.indexOf(get("weekday")),
        minutes: Number(get("hour")) % 24 * 60 + Number(get("minute"))
    };
}

/* ---------- Mobile navigation ---------- */

function initNavigation() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    const setOpen = (isOpen) => {
        nav.classList.toggle("open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
    };

    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("open")));

    // Close the menu with Esc, by tapping outside it, or after choosing a link
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && nav.classList.contains("open")) {
            setOpen(false);
            toggle.focus();
        }
    });
    document.addEventListener("click", (event) => {
        if (!nav.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));

    // Reset when the screen is resized to desktop width
    window.matchMedia("(min-width: 861px)").addEventListener("change", () => setOpen(false));
}

/* ---------- Header shadow and back-to-top button ---------- */

function initScrollEffects() {
    const header = document.querySelector(".site-header");
    const backToTop = document.querySelector(".back-to-top");

    const update = () => {
        const scrolled = window.scrollY;
        if (header) header.classList.toggle("is-scrolled", scrolled > 10);
        if (backToTop) backToTop.hidden = scrolled < 500;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
            document.querySelector(".skip-link")?.focus({ preventScroll: true });
        });
    }
}

function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ---------- Fade sections in as they scroll into view ---------- */

function initReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length || prefersReducedMotion() || !("IntersectionObserver" in window)) return;

    // Only hide content once we know JavaScript can show it again
    document.documentElement.classList.add("reveal-ready");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // Also reveal anything already scrolled past (e.g. after jumping to an anchor)
            if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: "0px 0px -60px 0px" });

    items.forEach((item) => observer.observe(item));
}

/* ---------- Image slider (home page) ---------- */

function initSlider() {
    const slider = document.querySelector("[data-slider]");
    if (!slider) return;

    const track = slider.querySelector(".slider-track");
    const slides = [...slider.querySelectorAll(".slide")];
    const dotsWrap = slider.querySelector(".slider-dots");
    const pauseButton = slider.querySelector(".slider-pause");
    let current = 0;
    let timer = null;
    let userPaused = prefersReducedMotion();

    const dots = slides.map((slide, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "slider-dot";
        dot.setAttribute("aria-label", `Show slide ${index + 1}: ${slide.querySelector("h3").textContent}`);
        dot.addEventListener("click", () => goTo(index));
        dotsWrap.append(dot);
        return dot;
    });

    function goTo(index) {
        current = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${current * 100}%)`;
        slides.forEach((slide, i) => {
            const active = i === current;
            slide.setAttribute("aria-hidden", String(!active));
            slide.querySelectorAll("a").forEach((link) => { link.tabIndex = active ? 0 : -1; });
        });
        dots.forEach((dot, i) => dot.setAttribute("aria-current", i === current ? "true" : "false"));
    }

    const stop = () => { clearInterval(timer); timer = null; };
    const start = () => {
        stop();
        if (!userPaused) timer = setInterval(() => goTo(current + 1), 6000);
    };

    slider.querySelector(".slider-prev").addEventListener("click", () => { goTo(current - 1); start(); });
    slider.querySelector(".slider-next").addEventListener("click", () => { goTo(current + 1); start(); });

    pauseButton.addEventListener("click", () => {
        userPaused = !userPaused;
        pauseButton.setAttribute("aria-pressed", String(userPaused));
        pauseButton.textContent = userPaused ? "Play" : "Pause";
        start();
    });
    pauseButton.setAttribute("aria-pressed", String(userPaused));
    pauseButton.textContent = userPaused ? "Play" : "Pause";

    // Pause while the visitor is reading or using the controls
    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", start);

    slider.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") goTo(current - 1);
        if (event.key === "ArrowRight") goTo(current + 1);
    });

    // Swipe on touch screens
    let startX = null;
    slider.addEventListener("touchstart", (event) => { startX = event.touches[0].clientX; }, { passive: true });
    slider.addEventListener("touchend", (event) => {
        if (startX === null) return;
        const distance = event.changedTouches[0].clientX - startX;
        if (Math.abs(distance) > 40) goTo(current + (distance < 0 ? 1 : -1));
        startX = null;
        start();
    });

    goTo(0);
    start();
}

/* ---------- Tabs (about page) ---------- */

function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach((container) => {
        const tabs = [...container.querySelectorAll('[role="tab"]')];

        const select = (tab) => {
            tabs.forEach((other) => {
                const selected = other === tab;
                other.setAttribute("aria-selected", String(selected));
                other.tabIndex = selected ? 0 : -1;
                document.getElementById(other.getAttribute("aria-controls")).hidden = !selected;
            });
            tab.focus();
        };

        tabs.forEach((tab, index) => {
            tab.addEventListener("click", () => select(tab));
            tab.addEventListener("keydown", (event) => {
                const moves = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: tabs.length - 1 };
                if (!(event.key in moves)) return;
                event.preventDefault();
                select(tabs[(moves[event.key] + tabs.length) % tabs.length]);
            });
        });
    });
}

/* ---------- Accordion (FAQ) ---------- */

function initAccordion() {
    document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
        const panel = document.getElementById(trigger.getAttribute("aria-controls"));

        trigger.addEventListener("click", () => {
            const isOpen = trigger.getAttribute("aria-expanded") === "true";
            trigger.setAttribute("aria-expanded", String(!isOpen));
            panel.hidden = isOpen;
        });
    });
}

/* ---------- Open / closed status and today's hours ---------- */

function initOpeningHours() {
    const now = getSalonNow();
    const today = OPENING_HOURS[now.day];

    document.querySelectorAll("[data-open-status]").forEach((element) => {
        const isOpen = today !== null &&
            now.minutes >= toMinutes(today.open) &&
            now.minutes < toMinutes(today.close);

        element.classList.add(isOpen ? "is-open" : "is-closed");
        element.textContent = isOpen
            ? `Open now - closes at ${today.close}`
            : "Closed now - see our opening hours";
    });

    document.querySelectorAll(`[data-day="${now.day}"]`).forEach((row) => {
        row.classList.add("today");
    });
}

/* ---------- Footer year ---------- */

function initYear() {
    document.querySelectorAll("[data-year]").forEach((element) => {
        element.textContent = new Date().getFullYear();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initScrollEffects();
    initReveal();
    initSlider();
    initTabs();
    initAccordion();
    initOpeningHours();
    initYear();
});
