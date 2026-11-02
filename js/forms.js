/* =========================================================
   Kele's Beauty Therapy - form validation and processing
   - Real-time validation shared by the enquiry and contact forms
   - Enquiry form: instant estimate and availability check
   - Contact form: sends an email through Formspree
   ========================================================= */

// Formspree endpoint for the contact form. Replace YOUR_FORM_ID with the
// ID from https://formspree.io (see README > "How the forms work").
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const GROUP_DISCOUNT_MIN_PEOPLE = 5;
const GROUP_DISCOUNT_RATE = 0.1;
const BRIDAL_NOTICE_DAYS = 14;

// Time slots offered on the enquiry form (24-hour "HH:MM")
const TIME_SLOTS = {
    morning: { label: "Morning (08:00 - 12:00)", start: "08:00" },
    afternoon: { label: "Afternoon (12:00 - 16:00)", start: "12:00" },
    late: { label: "Late afternoon (from 16:00)", start: "16:00" }
};

/* ---------- Validation rules ---------- */

const NAME_PATTERN = /^[A-Za-zÀ-ÿ' -]+$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

function normalisePhone(value) {
    return value.replace(/[\s()-]/g, "");
}

const rules = {
    name(value) {
        const name = value.trim();
        if (!name) return "Please enter your name.";
        if (name.length < 2) return "Your name must be at least 2 characters.";
        if (!NAME_PATTERN.test(name)) return "Please use letters only (spaces, hyphens and apostrophes are fine).";
        return "";
    },
    email(value) {
        const email = value.trim();
        if (!email) return "Please enter your email address.";
        if (!EMAIL_PATTERN.test(email)) return "Please enter a valid email address, e.g. name@example.com.";
        return "";
    },
    phone(value) {
        if (!value.trim()) return "Please enter your phone number.";
        // South African numbers: 0XX XXX XXXX or +27 XX XXX XXXX
        if (!/^(\+27|0)[1-8]\d{8}$/.test(normalisePhone(value))) {
            return "Please enter a valid South African number, e.g. 071 234 5678 or +27 71 234 5678.";
        }
        return "";
    },
    select(label) {
        return (value) => (value ? "" : `Please choose ${label}.`);
    },
    message(min, max) {
        return (value) => {
            const length = value.trim().length;
            if (!length) return "Please write a message.";
            if (length < min) return `Please add a little more detail (at least ${min} characters, ${min - length} to go).`;
            if (length > max) return `Please keep your message under ${max} characters.`;
            return "";
        };
    }
};

/* ---------- Date helpers ---------- */

function todayAtMidnight() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}

// Parse "YYYY-MM-DD" as a local date (new Date("YYYY-MM-DD") would be UTC)
function parseDate(value) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
}

function toDateValue(date) {
    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0")
    ].join("-");
}

function formatLongDate(date) {
    return date.toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function formatTime(minutes) {
    return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

function formatRand(amount) {
    return `R${Math.round(amount).toLocaleString("en-ZA")}`;
}

/* ---------- Real-time validator ---------- */

class FormValidator {
    constructor(form, fieldRules) {
        this.form = form;
        this.fieldRules = fieldRules;
        this.summary = form.querySelector(".form-errors");

        Object.keys(fieldRules).forEach((name) => {
            const field = form.elements[name];
            const eventName = field.type === "checkbox" || field.tagName === "SELECT" || field.type === "date" ? "change" : "input";

            // Validate when the visitor leaves a field...
            field.addEventListener("blur", () => {
                field.dataset.touched = "true";
                this.validateField(name);
            });
            // ...and update live while they fix it
            field.addEventListener(eventName, () => {
                if (field.dataset.touched || field.type === "checkbox") {
                    field.dataset.touched = "true";
                    this.validateField(name);
                }
            });
        });
    }

    validateField(name) {
        const field = this.form.elements[name];
        const value = field.type === "checkbox" ? field.checked : field.value;
        const message = this.fieldRules[name](value, field);
        const group = field.closest(".form-group");
        const error = group.querySelector(".error-message");

        group.classList.toggle("has-error", Boolean(message));
        group.classList.toggle("is-valid", !message && field.dataset.touched === "true");
        field.setAttribute("aria-invalid", String(Boolean(message)));
        error.textContent = message;
        return message;
    }

    validateAll() {
        const errors = Object.keys(this.fieldRules)
            .map((name) => {
                this.form.elements[name].dataset.touched = "true";
                return { name, message: this.validateField(name) };
            })
            .filter((result) => result.message);

        if (this.summary) {
            this.summary.hidden = errors.length === 0;
            if (errors.length) {
                const plural = errors.length === 1 ? "1 field needs" : `${errors.length} fields need`;
                this.summary.innerHTML = `<strong>${plural} your attention:</strong><ul>${errors
                    .map((e) => `<li><a href="#${this.form.elements[e.name].id}">${this.labelFor(e.name)}</a></li>`)
                    .join("")}</ul>`;
            }
        }

        if (errors.length) this.form.elements[errors[0].name].focus();
        return errors.length === 0;
    }

    labelFor(name) {
        const label = this.form.querySelector(`label[for="${this.form.elements[name].id}"]`);
        return label ? label.firstChild.textContent.trim() : name;
    }

    reset() {
        this.form.reset();
        if (this.summary) this.summary.hidden = true;
        Object.keys(this.fieldRules).forEach((name) => {
            const field = this.form.elements[name];
            delete field.dataset.touched;
            field.removeAttribute("aria-invalid");
            const group = field.closest(".form-group");
            group.classList.remove("has-error", "is-valid");
            group.querySelector(".error-message").textContent = "";
        });
    }
}

function initCharacterCounter(textarea, min) {
    const counter = document.getElementById(`${textarea.id}-count`);
    if (!counter) return;
    const update = () => {
        const length = textarea.value.trim().length;
        counter.textContent = `${length} / ${textarea.maxLength} characters${length < min ? ` (minimum ${min})` : ""}`;
    };
    textarea.addEventListener("input", update);
    textarea.form.addEventListener("reset", () => setTimeout(update));
    update();
}

/* =========================================================
   Enquiry form
   ========================================================= */

const ENQUIRY_TYPES = {
    booking: "Book an appointment",
    bridal: "Bridal or wedding party",
    group: "Group or event booking",
    quote: "Price quote",
    general: "General question"
};

function populateServiceSelect(select) {
    Object.entries(SERVICE_CATEGORIES).forEach(([key, label]) => {
        const group = document.createElement("optgroup");
        group.label = label;
        SERVICES.filter((service) => service.category === key).forEach((service) => {
            group.append(new Option(`${service.name} - ${formatPrice(service)}`, service.id));
        });
        select.append(group);
    });

    // Pre-select from enquiry.html?service=... (the "Get a quote" buttons)
    const requested = new URLSearchParams(window.location.search).get("service");
    if (SERVICES.some((service) => service.id === requested)) select.value = requested;
}

function validateEnquiryDate(value) {
    if (!value) return "Please choose your preferred date.";
    const chosen = parseDate(value);
    const today = todayAtMidnight();
    const latest = new Date(today);
    latest.setMonth(latest.getMonth() + 6);

    if (Number.isNaN(chosen.getTime())) return "Please enter a valid date.";
    if (chosen < today) return "That date has already passed. Please choose today or a later date.";
    if (chosen > latest) return "We take bookings up to 6 months ahead. Please choose an earlier date.";
    if (OPENING_HOURS[chosen.getDay()] === null) return "We're closed on Sundays. Please choose Monday to Saturday.";
    return "";
}

function validateTimeSlot(value, form) {
    if (!value) return "Please choose a preferred time.";
    const dateValue = form.elements.date.value;
    if (!dateValue || validateEnquiryDate(dateValue)) return "";

    const chosen = parseDate(dateValue);
    const hours = OPENING_HOURS[chosen.getDay()];
    const slotStart = toMinutes(TIME_SLOTS[value].start);

    if (slotStart >= toMinutes(hours.close) - 30) return "This time is too close to closing on that day. Please pick an earlier slot.";

    // A slot later today that has already started is not bookable
    if (chosen.getTime() === todayAtMidnight().getTime()) {
        const now = new Date();
        if (now.getHours() * 60 + now.getMinutes() > slotStart + 60) {
            return "That time has already passed today. Please choose a later slot or another day.";
        }
    }
    return "";
}

// Work out the estimated cost and whether the booking fits the chosen day
function calculateEstimate(data) {
    const service = SERVICES.find((item) => item.id === data.service);
    const people = data.people;
    const subtotal = service.price * people;
    const discount = people >= GROUP_DISCOUNT_MIN_PEOPLE ? subtotal * GROUP_DISCOUNT_RATE : 0;
    const total = subtotal - discount;

    const date = parseDate(data.date);
    const hours = OPENING_HOURS[date.getDay()];
    const start = toMinutes(TIME_SLOTS[data.timeSlot].start);
    const close = toMinutes(hours.close);
    const minutesNeeded = service.duration * people;
    const finish = start + minutesNeeded;
    const daysAway = Math.round((date - todayAtMidnight()) / 86400000);

    let availability;
    if (finish <= close) {
        availability = {
            status: "available",
            text: `Good news: ${formatDuration(minutesNeeded)} starting at ${TIME_SLOTS[data.timeSlot].start} finishes by about ${formatTime(finish)}, before we close at ${hours.close}.`
        };
    } else if (toMinutes(hours.open) + minutesNeeded <= close) {
        availability = {
            status: "limited",
            text: `Your booking needs about ${formatDuration(minutesNeeded)}, which runs past closing (${hours.close}) from this slot. We'll suggest a morning start on ${formatLongDate(date)} instead.`
        };
    } else {
        availability = {
            status: "limited",
            text: `Your booking needs about ${formatDuration(minutesNeeded)}, which is longer than one day's opening hours. We'll contact you to split it over two visits or add an extra stylist.`
        };
    }

    const notes = [];
    if (service.priceFrom) notes.push(`${service.name} is priced "from" ${formatRand(service.price)}, so the final price depends on length and style.`);
    if (discount) notes.push(`A ${GROUP_DISCOUNT_RATE * 100}% group discount has been applied for ${people} people.`);
    else if (people > 1) notes.push(`Book for ${GROUP_DISCOUNT_MIN_PEOPLE} or more people to get ${GROUP_DISCOUNT_RATE * 100}% off.`);
    if (data.type === "bridal" && daysAway < BRIDAL_NOTICE_DAYS) {
        notes.push(`Bridal bookings usually need ${BRIDAL_NOTICE_DAYS} days' notice for a trial. Your date is ${daysAway} day${daysAway === 1 ? "" : "s"} away, so we'll call you to confirm.`);
    }

    return { service, people, subtotal, discount, total, date, daysAway, availability, notes };
}

function bookingReference(date) {
    const random = Math.floor(1000 + Math.random() * 9000);
    return `KBT-${toDateValue(date).replace(/-/g, "")}-${random}`;
}

function renderEnquiryResult(container, data, estimate, reference) {
    const whatsappText = [
        `Hello Kele's Beauty Therapy, I'd like to follow up on my enquiry (${reference}).`,
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        `Email: ${data.email}`,
        `Enquiry: ${ENQUIRY_TYPES[data.type]}`,
        `Service: ${estimate.service.name}`,
        `Date: ${formatLongDate(estimate.date)}, ${TIME_SLOTS[data.timeSlot].label}`,
        `People: ${data.people}`,
        `Estimate: ${formatRand(estimate.total)}`,
        `Message: ${data.message}`
    ].join("\n");

    container.innerHTML = `
        <div class="result-header">
            <span class="result-icon" aria-hidden="true">&#10003;</span>
            <div>
                <h2 id="enquiry-result-title" tabindex="-1">Thank you, ${escapeHTML(data.name.split(" ")[0])}!</h2>
                <p>Your enquiry has been received. Your reference is <strong>${reference}</strong>.</p>
            </div>
        </div>

        <div class="result-grid">
            <div>
                <h3>Your enquiry</h3>
                <dl class="summary-list">
                    <dt>Enquiry type</dt><dd>${ENQUIRY_TYPES[data.type]}</dd>
                    <dt>Service</dt><dd>${escapeHTML(estimate.service.name)}</dd>
                    <dt>Preferred date</dt><dd>${formatLongDate(estimate.date)} (${estimate.daysAway === 0 ? "today" : `in ${estimate.daysAway} day${estimate.daysAway === 1 ? "" : "s"}`})</dd>
                    <dt>Preferred time</dt><dd>${TIME_SLOTS[data.timeSlot].label}</dd>
                    <dt>Number of people</dt><dd>${data.people}</dd>
                    <dt>We'll contact you on</dt><dd>${escapeHTML(data.phone)}<br>${escapeHTML(data.email)}</dd>
                </dl>
            </div>
            <div>
                <h3>Estimated cost</h3>
                <table class="estimate-table">
                    <caption class="visually-hidden">Estimated cost breakdown</caption>
                    <tbody>
                        <tr><th scope="row">${escapeHTML(estimate.service.name)}</th><td class="amount">${formatPrice(estimate.service)}</td></tr>
                        <tr><th scope="row">Number of people</th><td class="amount">&times; ${estimate.people}</td></tr>
                        <tr><th scope="row">Subtotal</th><td class="amount">${formatRand(estimate.subtotal)}</td></tr>
                        ${estimate.discount ? `<tr><th scope="row">Group discount (${GROUP_DISCOUNT_RATE * 100}%)</th><td class="amount">- ${formatRand(estimate.discount)}</td></tr>` : ""}
                        <tr class="estimate-total"><th scope="row">Estimated total${estimate.service.priceFrom ? " (from)" : ""}</th><td class="amount">${formatRand(estimate.total)}</td></tr>
                    </tbody>
                </table>
                <p class="availability availability-${estimate.availability.status}">
                    <strong>${estimate.availability.status === "available" ? "Likely available" : "Needs a quick chat"}</strong>
                    ${estimate.availability.text}
                </p>
            </div>
        </div>

        ${estimate.notes.length ? `<ul class="result-notes">${estimate.notes.map((note) => `<li>${escapeHTML(note)}</li>`).join("")}</ul>` : ""}

        <p>Kele will confirm your booking by phone or WhatsApp. For the fastest reply, send your enquiry to us on WhatsApp now.</p>
        <div class="btn-group">
            <a class="btn" href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}" target="_blank" rel="noopener">Send to us on WhatsApp</a>
            <button type="button" class="btn btn-outline" data-new-enquiry>Make another enquiry</button>
        </div>`;
}

function initEnquiryForm() {
    const form = document.getElementById("enquiry-form");
    if (!form) return;

    const result = document.getElementById("enquiry-result");
    populateServiceSelect(form.elements.service);
    form.elements.date.min = toDateValue(todayAtMidnight());
    initCharacterCounter(form.elements.message, 20);

    const validator = new FormValidator(form, {
        name: rules.name,
        email: rules.email,
        phone: rules.phone,
        type: rules.select("an enquiry type"),
        service: rules.select("a service"),
        date: validateEnquiryDate,
        timeSlot: (value) => validateTimeSlot(value, form),
        people(value) {
            if (value === "") return "Please enter the number of people.";
            const number = Number(value);
            if (!Number.isInteger(number)) return "Please enter a whole number.";
            if (number < 1 || number > 20) return "Please enter between 1 and 20 people. For bigger groups, call us.";
            return "";
        },
        message: rules.message(20, 1000),
        consent: (checked) => (checked ? "" : "Please agree so we can contact you about your enquiry.")
    });

    // The slot check depends on the date, so re-check it when the date changes
    form.elements.date.addEventListener("change", () => {
        if (form.elements.timeSlot.dataset.touched) validator.validateField("timeSlot");
    });

    // Bridal and group enquiries are for more than one person by default
    form.elements.type.addEventListener("change", () => {
        const people = form.elements.people;
        if (form.elements.type.value === "group" && Number(people.value) < 2) people.value = 5;
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!validator.validateAll()) return;

        const data = {
            name: form.elements.name.value.trim(),
            email: form.elements.email.value.trim(),
            phone: form.elements.phone.value.trim(),
            type: form.elements.type.value,
            service: form.elements.service.value,
            date: form.elements.date.value,
            timeSlot: form.elements.timeSlot.value,
            people: Number(form.elements.people.value),
            message: form.elements.message.value.trim()
        };

        const estimate = calculateEstimate(data);
        renderEnquiryResult(result, data, estimate, bookingReference(estimate.date));
        result.hidden = false;
        validator.reset();
        form.elements.people.value = 1;

        const heading = document.getElementById("enquiry-result-title");
        result.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
        heading.focus({ preventScroll: true });

        result.querySelector("[data-new-enquiry]").addEventListener("click", () => {
            result.hidden = true;
            form.elements.name.focus();
        });
    });
}

/* =========================================================
   Contact form (Formspree)
   ========================================================= */

function setStatus(element, type, html) {
    element.className = `form-status form-status-${type}`;
    element.innerHTML = html;
    element.hidden = false;
}

function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const status = document.getElementById("contact-status");
    const button = form.querySelector('button[type="submit"]');
    const buttonText = button.querySelector(".btn-text");
    initCharacterCounter(form.elements.message, 20);

    const validator = new FormValidator(form, {
        name: rules.name,
        email: rules.email,
        phone: rules.phone,
        subject: rules.select("a subject"),
        message: rules.message(20, 1000)
    });

    const setLoading = (loading) => {
        button.disabled = loading;
        button.classList.toggle("is-loading", loading);
        form.setAttribute("aria-busy", String(loading));
        buttonText.textContent = loading ? "Sending..." : "Send Message";
    };

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        status.hidden = true;
        if (!validator.validateAll()) return;

        // Spam trap: real visitors never fill in the hidden field
        if (form.elements._gotcha.value) return;

        if (FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID")) {
            setStatus(status, "error", "<strong>The contact form is not connected yet.</strong> The site owner needs to add a Formspree form ID in js/forms.js. In the meantime, please WhatsApp us on <a href=\"https://wa.me/27715311476\">071 531 1476</a>.");
            status.focus();
            return;
        }

        const name = form.elements.name.value.trim();
        const formData = new FormData(form);
        formData.set("_subject", `Website message: ${form.elements.subject.value} from ${name}`);

        setLoading(true);
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
                signal: controller.signal
            });

            if (!response.ok) {
                const body = await response.json().catch(() => ({}));
                const detail = body.errors ? body.errors.map((e) => e.message).join(" ") : `Server error ${response.status}.`;
                throw new Error(detail);
            }

            setStatus(status, "success", `<strong>Thank you, ${escapeHTML(name.split(" ")[0])}! Your message has been sent.</strong> We've received your message about "${escapeHTML(form.elements.subject.value)}" and will reply to ${escapeHTML(form.elements.email.value.trim())} during opening hours.`);
            validator.reset();
        } catch (error) {
            let reason = error.name === "AbortError" ? "The request timed out." : escapeHTML(error.message);
            if (!/[.!?]$/.test(reason)) reason += ".";
            setStatus(status, "error", `<strong>Sorry, your message could not be sent.</strong> ${reason} Please check your internet connection and try again, or WhatsApp us on <a href="https://wa.me/27715311476">071 531 1476</a>.`);
        } finally {
            clearTimeout(timeout);
            setLoading(false);
            status.focus();
        }
    });
}

function escapeHTML(text) {
    return String(text).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
}

document.addEventListener("DOMContentLoaded", () => {
    initEnquiryForm();
    initContactForm();
});
