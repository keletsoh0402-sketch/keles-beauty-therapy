/* =========================================================
   Kele's Beauty Therapy - services page
   Renders SERVICES (js/services-data.js) and adds live search,
   category filters and sorting.
   ========================================================= */

function escapeHTML(text) {
    return text.replace(/[&<>"']/g, (char) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
}

// Wrap each match of the search term in <mark> (case-insensitive)
function highlight(text, term) {
    if (!term) return escapeHTML(text);
    const pattern = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    // split() with a capture group puts the matches at the odd positions
    return text.split(pattern)
        .map((part, index) => (index % 2 ? `<mark>${escapeHTML(part)}</mark>` : escapeHTML(part)))
        .join("");
}

function serviceCard(service, term) {
    return `
        <article class="service-card" id="${service.id}">
            <img src="${service.image}" alt="${escapeHTML(service.alt)}" width="600" height="400" loading="lazy">
            <div class="service-card-body">
                <span class="badge">${SERVICE_CATEGORIES[service.category]}</span>
                <h3>${highlight(service.name, term)}</h3>
                <p>${highlight(service.description, term)}</p>
                <div class="service-meta">
                    <span class="price">${formatPrice(service)}</span>
                    <span class="duration"><span aria-hidden="true">&#9201;</span> ${formatDuration(service.duration)}</span>
                </div>
                <a href="enquiry.html?service=${service.id}" class="btn btn-small">Get a quote<span class="visually-hidden"> for ${escapeHTML(service.name)}</span></a>
            </div>
        </article>`;
}

function initServices() {
    const list = document.getElementById("service-list");
    if (!list) return;

    const searchInput = document.getElementById("service-search");
    const sortSelect = document.getElementById("service-sort");
    const filterButtons = [...document.querySelectorAll("[data-filter]")];
    const count = document.getElementById("service-count");
    const empty = document.getElementById("no-results");

    // Start from ?category=...&q=... so links from the home page open pre-filtered
    const params = new URLSearchParams(window.location.search);
    let category = SERVICE_CATEGORIES[params.get("category")] ? params.get("category") : "all";
    searchInput.value = params.get("q") || "";

    function render() {
        const term = searchInput.value.trim();
        const needle = term.toLowerCase();

        let results = SERVICES.filter((service) => {
            const inCategory = category === "all" || service.category === category;
            const haystack = [service.name, service.description, SERVICE_CATEGORIES[service.category], ...service.tags]
                .join(" ")
                .toLowerCase();
            return inCategory && haystack.includes(needle);
        });

        const sorts = {
            "price-asc": (a, b) => a.price - b.price,
            "price-desc": (a, b) => b.price - a.price,
            name: (a, b) => a.name.localeCompare(b.name)
        };
        if (sorts[sortSelect.value]) results = [...results].sort(sorts[sortSelect.value]);

        list.innerHTML = results.map((service) => serviceCard(service, term)).join("");
        empty.hidden = results.length > 0;
        if (!results.length) {
            const where = category === "all" ? "" : ` in ${SERVICE_CATEGORIES[category]}`;
            document.getElementById("no-results-text").textContent =
                `We couldn't find any services matching "${term}"${where}.`;
        }

        const label = category === "all" ? "all categories" : SERVICE_CATEGORIES[category];
        count.textContent = `Showing ${results.length} of ${SERVICES.length} services (${label})`;

        filterButtons.forEach((button) => {
            button.setAttribute("aria-pressed", String(button.dataset.filter === category));
        });

        // Keep the address bar in sync so filtered results can be shared
        const next = new URLSearchParams();
        if (category !== "all") next.set("category", category);
        if (term) next.set("q", term);
        const query = next.toString();
        history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
    }

    searchInput.addEventListener("input", render);
    sortSelect.addEventListener("change", render);
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            category = button.dataset.filter;
            render();
        });
    });

    // Search on Enter should not reload the page
    document.getElementById("service-search-form").addEventListener("submit", (event) => event.preventDefault());

    document.getElementById("clear-filters").addEventListener("click", () => {
        searchInput.value = "";
        category = "all";
        render();
        searchInput.focus();
    });

    render();
}

function initPriceList() {
    const body = document.getElementById("price-list-body");
    if (!body) return;

    body.innerHTML = Object.entries(SERVICE_CATEGORIES).map(([key, label]) => {
        const rows = SERVICES.filter((service) => service.category === key).map((service) => `
            <tr>
                <td>${escapeHTML(service.name)}</td>
                <td>${formatDuration(service.duration)}</td>
                <td class="amount">${formatPrice(service)}</td>
            </tr>`).join("");
        return `<tr class="table-group"><th scope="rowgroup" colspan="3">${label}</th></tr>${rows}`;
    }).join("");
}

document.addEventListener("DOMContentLoaded", () => {
    initServices();
    initPriceList();
});
