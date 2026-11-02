# Changelog

All notable changes to the Kele's Beauty Therapy website, newest first.

## [3.0.0] - 2026-11-02

### Added
- **Licensed images**: 13 Wikimedia Commons photos (CC0, CC BY, CC BY-SA), renamed descriptively (e.g. `red-box-braids-being-plaited.webp`), compressed to WebP at 1400px plus 600px thumbnails; 1200x630 Open Graph image.
- **Interactive features**: animated hamburger menu (closes on Esc, outside click or link click), back-to-top button, header shadow on scroll, scroll-reveal animations, accessible home-page image slider, About page tabs, Contact page FAQ accordion, skip link, focus styles, reduced-motion support.
- **Dynamic services**: all services in `js/services-data.js`; services page, price list and enquiry dropdown generated from it; live case-insensitive search with highlighting, category filters, sorting, result count, no-results message, URL-synced filters.
- **Gallery lightbox**: `<dialog>` lightbox with caption, counter, credit, next/previous, Esc, arrow keys, click outside, swipe, spinner, preloading; gallery category filters.
- **Interactive map**: Leaflet 1.9.4 + OpenStreetMap with a branded pin, popup with directions links, landmark marker, scale bar, "Back to salon" control and fallback.
- **Enquiry page** (`enquiry.html`): full form with real-time validation, error summary, estimated cost (10% off for 5+ people), availability check, booking reference and WhatsApp hand-off.
- **Contact form**: Formspree email sending with loading, success and error states, honeypot spam protection.
- **References page** with Harvard references; **SEO**: unique titles and descriptions, keywords, canonical, Open Graph, Twitter cards, JSON-LD, `sitemap.xml`, `robots.txt`.
- `CHANGELOG.md` and a rewritten `README.md`.

### Changed
- `home.html` renamed to `index.html` (removed the redirect page).
- Booking moved from the Contact page to the new Enquiry page.
- Google Maps iframe replaced with the Leaflet map.
- `logo.jpg` renamed to `keles-beauty-therapy-logo.jpg` and trimmed.

### Removed
- `images/Logo.webp` and `images/gallery.webp` (unknown sources; `gallery.webp` was another salon's logo).

### Fixed
- Images stretching to their `height` attribute (`height: auto`).
- Horizontal scroll on mobile caused by the map hint.
- All pages now pass html-validate with 0 errors (native `<section>` landmarks, valid ARIA, labelled dialog).

## [2.0.0] - 2026-11-01

### Added
- External stylesheet and JavaScript; mobile menu, live open/closed status, booking and enquiry forms sent via WhatsApp, gallery viewer, README.

### Fixed
- Invalid HTML (unclosed `header`/`footer`, malformed `h1`, invalid `picture` tag), missing alt text and meta tags, missing video file.

## [1.0.0] - 2026-08-20

### Added
- Initial page structure: Home, About Us, Services, Gallery and Contact Us.
