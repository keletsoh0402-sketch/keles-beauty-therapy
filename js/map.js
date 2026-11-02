/* =========================================================
   Kele's Beauty Therapy - interactive map (Leaflet + OpenStreetMap)
   ========================================================= */

const SALON_LOCATION = {
    name: "Kele's Beauty Therapy",
    address: "772 Starling Crescent, Eastbank, Johannesburg",
    landmark: "Next to Eastbank Clinic",
    phone: "071 531 1476",
    lat: -26.10833,
    lng: 28.11306
};

// Eastbank Clinic, the landmark customers are told to look for
const CLINIC_LOCATION = { lat: -26.10682, lng: 28.11087 };

function initMap() {
    const container = document.getElementById("salon-map");
    if (!container) return;

    // Leaflet is loaded from a CDN; show a helpful fallback if it fails
    if (typeof L === "undefined") {
        container.classList.add("map-fallback");
        container.innerHTML = `<p>The map could not load. <a href="https://www.openstreetmap.org/?mlat=${SALON_LOCATION.lat}&amp;mlon=${SALON_LOCATION.lng}#map=17/${SALON_LOCATION.lat}/${SALON_LOCATION.lng}" target="_blank" rel="noopener">Open the location on OpenStreetMap</a>.</p>`;
        return;
    }

    const salon = [SALON_LOCATION.lat, SALON_LOCATION.lng];
    const map = L.map(container, {
        center: salon,
        zoom: 16,
        scrollWheelZoom: false  // don't trap the page scroll; enabled after a click
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.control.scale({ metric: true, imperial: false }).addTo(map);

    // Gold pin that matches the site colours
    const salonIcon = L.divIcon({
        className: "map-pin",
        html: '<span class="map-pin-inner" aria-hidden="true"><span>K</span></span>',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -36]
    });

    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${SALON_LOCATION.lat},${SALON_LOCATION.lng}`;
    const osmUrl = `https://www.openstreetmap.org/directions?to=${SALON_LOCATION.lat},${SALON_LOCATION.lng}`;

    const marker = L.marker(salon, { icon: salonIcon, title: SALON_LOCATION.name, alt: `${SALON_LOCATION.name} location` })
        .addTo(map)
        .bindPopup(`
            <div class="map-popup">
                <strong>${SALON_LOCATION.name}</strong>
                <span>${SALON_LOCATION.address}</span>
                <span>${SALON_LOCATION.landmark}</span>
                <a href="tel:+27715311476">${SALON_LOCATION.phone}</a>
                <a href="${directionsUrl}" target="_blank" rel="noopener" class="map-popup-btn">Get directions</a>
                <a href="${osmUrl}" target="_blank" rel="noopener">Directions on OpenStreetMap</a>
            </div>`)
        .openPopup();

    L.circleMarker([CLINIC_LOCATION.lat, CLINIC_LOCATION.lng], {
        radius: 8,
        color: "#8a6b3d",
        fillColor: "#f9e4ea",
        fillOpacity: 1,
        weight: 2
    }).addTo(map).bindTooltip("Eastbank Clinic (landmark)");

    // "Back to salon" button inside the map
    const RecenterControl = L.Control.extend({
        options: { position: "topright" },
        onAdd() {
            const button = L.DomUtil.create("button", "map-recenter");
            button.type = "button";
            button.textContent = "Back to salon";
            L.DomEvent.disableClickPropagation(button);
            L.DomEvent.on(button, "click", () => {
                map.flyTo(salon, 16);
                marker.openPopup();
            });
            return button;
        }
    });
    map.addControl(new RecenterControl());

    // Let the mouse wheel zoom only once the visitor has clicked the map
    const hint = document.getElementById("map-hint");
    map.on("click focus", () => {
        map.scrollWheelZoom.enable();
        if (hint) hint.hidden = true;
    });
    map.on("mouseout", () => map.scrollWheelZoom.disable());

    // Keep the map sized correctly if its container changes (e.g. rotating a phone)
    if ("ResizeObserver" in window) {
        new ResizeObserver(() => map.invalidateSize()).observe(container);
    }
}

document.addEventListener("DOMContentLoaded", initMap);
