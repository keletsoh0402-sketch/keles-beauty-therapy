# Kele's Beauty Therapy Website

A responsive, multi-page website for **Kele's Beauty Therapy**, a beauty salon in Eastbank, Johannesburg, offering hair, makeup, nails and massage since 2022.

**Live site:** https://keletsoh0402-sketch.github.io/keles-beauty-therapy/ 

| | |
|---|---|
| **Author** | Natasha Keletso Moremi |
| **Student number** | ST10533676 |
| **Module** | Web Development (WEDE5020w) |
| **Assessment** | Portfolio of Evidence (POE) |
| **Technologies** | HTML5, CSS3, vanilla JavaScript, Leaflet.js, Formspree |
| **Hosting** | GitHub Pages |

---

## Table of Contents

1. [Project Overview and Purpose](#project-overview-and-purpose)
2. [Pages](#pages)
3. [Features](#features)
4. [Technologies Used](#technologies-used)
5. [Folder Structure](#folder-structure)
6. [Setup and Running Locally](#setup-and-running-locally)
7. [How the Forms Work](#how-the-forms-work)
8. [SEO](#seo)
9. [Deployment (GitHub Pages)](#deployment-github-pages)
10. [Testing](#testing)
11. [Screenshots](#screenshots)
12. [Updating the Website](#updating-the-website)
13. [Known Limitations](#known-limitations)
14. [Changelog](#changelog)
15. [References](#references)
16. [Author](#author)

---

## Project Overview and Purpose

Kele's Beauty Therapy was founded by Keletso in March 2022. The salon offers hair washing, cutting and plaiting (box braids and cornrows), makeup (soft glam, bridal, photo shoots), nails (manicures, pedicures, gel) and massage.

**Mission:** To empower individuals by enhancing their natural beauty through personalised and innovative beauty treatments, in a relaxing and luxurious environment using high-quality products.

**Purpose of the website:**

- Attract new customers and grow the salon's online presence (SEO)
- Show services and prices clearly, with search and filters
- Let customers get an **instant price estimate and availability check** and send an enquiry
- Let customers **email the salon** through a contact form
- Help customers find the salon with an **interactive map**
- Showcase styles in a **gallery** with a lightbox

### Business details

| | |
|---|---|
| **Address** | 772 Starling Crescent, Eastbank, Johannesburg (next to Eastbank Clinic) |
| **Phone / WhatsApp** | 071 531 1476 |
| **Monday to Friday** | 08:00 to 19:00 |
| **Saturday** | 08:00 to 17:00 |
| **Sunday** | Closed |

---

## Pages

| Page | File | Content |
|---|---|---|
| Home | `index.html` | Hero, live open/closed status, featured services, image slider, why choose us, opening hours |
| About Us | `about.html` | Salon story, mission/vision/values tabs, who we serve |
| Services | `services.html` | 13 services rendered from JavaScript with live search, category filters, sorting and a generated price list |
| Gallery | `gallery.html` | 13-photo grid with category filters and a lightbox |
| Book & Enquire | `enquiry.html` | Enquiry form with validation, instant cost estimate and availability check |
| Contact | `contact.html` | Contact details, hours, contact form (sends email via Formspree), Leaflet map, FAQ accordion |
| References | `references.html` | Harvard references for all images, libraries, tutorials and AI tools |

---

## Features

### 1. Interactive elements
| Feature | Where | Details |
|---|---|---|
| Responsive hamburger menu | All pages | Animated icon; closes on Esc, outside click or link click; `aria-expanded` |
| Image slider | Home | Prev/next buttons, dots, swipe, arrow keys, auto-play with pause/play, pauses on hover/focus, respects reduced-motion |
| Tabs | About | Mission / Vision / Values; WAI-ARIA tabs with arrow, Home and End keys |
| FAQ accordion | Contact | 6 questions, `aria-expanded` / `aria-controls` |
| Back-to-top button | All pages | Appears after scrolling 500px |
| Scroll-reveal animations | All pages | IntersectionObserver; disabled for `prefers-reduced-motion` |
| Live open/closed status | Home, Contact | Uses Johannesburg time; highlights today's hours |
| Hover effects | Cards, buttons, gallery | Lift, zoom and colour transitions |
| Skip link and focus styles | All pages | Keyboard-friendly navigation |

### 2. Interactive map (Leaflet + OpenStreetMap)
- Gold branded pin at 772 Starling Crescent (-26.10833, 28.11306) with a popup: name, address, landmark, phone and **Get directions** links (Google Maps and OpenStreetMap)
- Eastbank Clinic landmark marker, scale bar and a **Back to salon** button
- Zoom and pan; mouse-wheel zoom is enabled only after clicking the map, so the page doesn't scroll-trap
- Responsive, styled to match the site, and shows a fallback link if Leaflet can't load

### 3. Gallery lightbox
- Responsive grid of 13 compressed WebP thumbnails (600px) with `loading="lazy"`
- Lightbox (native `<dialog>`) with a 1400px image, caption, counter, photo credit, next/previous, close button
- **Esc** closes, **← →** browse, **click outside** closes, **swipe** on mobile, focus returns to the photo
- Loading spinner, preloading of neighbouring photos, thumbnail fallback if a large photo fails
- Category filter buttons; the lightbox browses only the filtered photos

### 4. Dynamic content and search
- All services are stored in **one JavaScript array** (`js/services-data.js`) and rendered with JavaScript
- **Live, case-insensitive search** across name, description, category and tags, with matches highlighted
- **Category filter buttons**, **sort** (price or name), a live result count (announced to screen readers)
- Friendly **no-results message** with a "Clear search & filters" button
- Filters are saved in the URL (`services.html?category=nails&q=gel`) so links from the home page open pre-filtered
- The price list table and the enquiry form's service dropdown are generated from the same array

### 5. Enquiry form (`enquiry.html`)
See [How the forms work](#how-the-forms-work).

### 6. Contact form with email (`contact.html`)
See [How the forms work](#how-the-forms-work).

### 7. Accessibility
Semantic HTML, one `<h1>` per page, labelled form controls, `aria-invalid` and `aria-describedby` on errors, error summary with jump links, visible focus styles, skip link, alt text on every image, and reduced-motion support.

---

## Technologies Used

| Technology | Use |
|---|---|
| HTML5 | Semantic page structure (`header`, `nav`, `main`, `section`, `footer`, `dialog`) |
| CSS3 | Custom properties, Grid, Flexbox, media queries, animations |
| JavaScript (ES2020, no frameworks) | All interactivity, validation, rendering and search |
| [Leaflet 1.9.4](https://leafletjs.com/) | Interactive map (loaded from unpkg with SRI integrity hashes) |
| [OpenStreetMap](https://www.openstreetmap.org/) | Map tiles and data |
| [Formspree](https://formspree.io/) | Sends contact-form messages by email |
| [Google Fonts](https://fonts.google.com/) | Playfair Display (headings), Poppins (body) |
| Git and GitHub Pages | Version control and hosting |

---

## Folder Structure

```
DISD1 KELE'S BEAUTY THERAPY/
├── index.html            Home page
├── about.html            About Us
├── services.html         Services, search and price list
├── gallery.html          Gallery and lightbox
├── enquiry.html          Book & enquire form with estimate
├── contact.html          Contact form, map and FAQ
├── references.html       Harvard references and image credits
├── sitemap.xml           Sitemap for search engines
├── robots.txt            Crawler rules
├── css/
│   └── style.css         All styles (colours as CSS variables at the top)
├── js/
│   ├── script.js         Shared: menu, scroll effects, slider, tabs, accordion, opening hours
│   ├── services-data.js  SERVICES array (single source of prices)
│   ├── services.js       Services rendering, search, filters and price list
│   ├── gallery.js        Gallery filters and lightbox
│   ├── map.js            Leaflet map
│   └── forms.js          Validation, enquiry estimate, contact form (Formspree)
├── images/
│   ├── keles-beauty-therapy-logo.jpg
│   ├── keles-beauty-therapy-og-image.jpg   Social-sharing image (1200x630)
│   └── gallery/          13 photos (1400px WebP) + thumbs/ (600px WebP)
├── Documents/
│   └── Proposal.docx     Website proposal
├── CHANGELOG.md          Dated development history
└── README.md             This file
```

---

## Setup and Running Locally

No installation or build step is needed.

**Option 1: open the file.** Double-click `index.html` to open it in Chrome, Edge, Firefox or Safari.

**Option 2: run a local server (recommended, matches GitHub Pages).**

```bash
cd "DISD1 KELE'S BEAUTY THERAPY"
python3 -m http.server 8000
```

Then open http://localhost:8000. In VS Code you can also use the **Live Server** extension.

An internet connection is needed for Google Fonts, the map tiles and sending the contact form.

---

## How the Forms Work

### Enquiry form (`enquiry.html`, `js/forms.js`)

**Fields:** full name, email, phone, enquiry type (Book an appointment, Bridal or wedding party, Group or event booking, Price quote, General question), service, preferred date, preferred time, number of people, message and consent checkbox.

**Validation (JavaScript, every field):**

| Field | Rule |
|---|---|
| Name | Required, at least 2 characters, letters, spaces, hyphens and apostrophes |
| Email | Required, valid format (`name@example.com`) |
| Phone | Required, South African format: `0XX XXX XXXX` or `+27 XX XXX XXXX` |
| Enquiry type, service, time | Must be chosen |
| Date | Required, not in the past, not a Sunday, within 6 months |
| Time | Must start at least 30 minutes before closing that day; not already passed today |
| People | Whole number from 1 to 20 |
| Message | 20 to 1000 characters, with a live character counter |
| Consent | Must be ticked |

Errors appear **next to each field in real time** (on blur, then live as you type). Invalid fields turn red with `aria-invalid="true"`, valid fields show a green tick, and an error summary with jump links appears on submit. **The form will not submit until every field is valid.**

**Processing and response:** on a valid submit the page shows, immediately:

- A **summary** of the enquiry and a **reference number** (e.g. `KBT-20261116-4821`)
- An **estimated cost**: price × people, with **10% off for 5 or more people**
- An **availability check**: whether the booking fits in that day's opening hours from the chosen time, or suggests a morning start or two visits
- Notes such as "from" pricing and bridal notice (14 days)
- A **Send to us on WhatsApp** button with the enquiry pre-written

The form is then cleared.

### Contact form (`contact.html`, `js/forms.js`) — sends a real email

**Fields:** name, email, phone, subject (dropdown) and message, with the same real-time validation. A hidden "honeypot" field blocks spam bots.

On submit the form sends the data with `fetch()` to **Formspree**, which emails it to the salon. The button shows a **spinner and "Sending…"** while sending, then a **success** message (the form clears) or an **error** message with a WhatsApp fallback.

#### Formspree setup (one ID needed)

1. Go to https://formspree.io and sign up (free plan: 50 submissions/month).
2. Click **+ New Form**, name it "Kele's Beauty Therapy contact", and enter the email address that should receive messages.
3. Copy the **form ID** from the endpoint, e.g. `https://formspree.io/f/xyzabcde` → ID is `xyzabcde`.
4. Replace `YOUR_FORM_ID` with your ID in **two places**:
   - `js/forms.js` → `const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";`
   - `contact.html` → `<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" ...>`
5. Publish the site, send a test message, and **confirm your email** when Formspree asks (the first submission activates the form).
6. Optional: in Formspree → Settings, add your GitHub Pages domain under **Restrict to domain**.

Until the ID is set, the form shows a friendly "not connected yet" message instead of failing silently.

---

## SEO

| Item | Implementation |
|---|---|
| Titles | Unique on every page, 54 to 60 characters, include "Kele's Beauty Therapy" and the main keyword |
| Meta descriptions | Unique, 150 to 156 characters, match the page content |
| Meta keywords | 5 to 6 relevant keywords per page, tailored to each page |
| Images | Descriptive hyphenated file names (e.g. `red-box-braids-being-plaited.webp`) and meaningful alt text |
| Structure | `lang="en"`, viewport meta, semantic HTML, exactly one `<h1>` per page |
| Social | Open Graph and Twitter card tags with a 1200x630 image |
| Extras | Canonical URLs, schema.org `BeautySalon` JSON-LD, `sitemap.xml`, `robots.txt` |

---

## Deployment (GitHub Pages)

1. **Create the repository:** on GitHub click **New repository**, name it `keles-beauty-therapy`, set it to **Public**, and don't add a README.
2. **Replace the URL placeholder** with your GitHub username (lower case) in all files:
   ```bash
   grep -rl "keletsoh0402-sketch" . --exclude-dir=.git | xargs sed -i '' 's/keletsoh0402-sketch/your-username/g'
   ```
   (On Windows, use VS Code's **Find and Replace in Files**: Ctrl+Shift+H.) Commit the change.
3. **Push the code:**
   ```bash
   git remote add origin https://github.com/your-username/keles-beauty-therapy.git
   git push -u origin main
   ```
4. **Turn on Pages:** in the repository go to **Settings → Pages**. Under **Source** choose **Deploy from a branch**, select **main** and **/ (root)**, then click **Save**.
5. After 1 to 2 minutes the site is live at `https://your-username.github.io/keles-beauty-therapy/`. Add this link at the top of the README.

> GitHub Pages is **case-sensitive**: all file names are lower case and every link has been checked to match exactly.

---

## Testing

| Test | Tool | Result |
|---|---|---|
| HTML validity, all 7 pages | html-validate | Passed, 0 errors |
| JavaScript syntax | `node --check` | Passed |
| No console errors or warnings, all pages, desktop (1280px) and mobile (390px) | Headless Chrome (DevTools Protocol) | Passed |
| No failed requests / broken images | Headless Chrome | Passed |
| No horizontal scrolling at 390px | Headless Chrome | Passed |
| Every internal link, image path and `#anchor` exists (case-sensitive) | Python link checker | Passed |
| Every `<img>` has alt text; every form control has a `<label>` | Python checker | Passed |
| Services: case-insensitive search, filters, no-results message, URL sync, sorting | Scripted browser test | Passed |
| Gallery: open, next/prev, arrow keys, wrap-around, click-outside close, focus return, filtered browsing | Scripted browser test | Passed |
| Map: Leaflet loads, tiles load, popup with directions link | Scripted browser test | Passed |
| Enquiry form: empty submit blocked (error summary), bad phone/email, past date, Sunday, >20 people, short message, valid submit shows estimate and clears the form | Scripted browser test | Passed |
| Contact form: validation, loading state, success, server error and offline error | Scripted browser test (mocked network) | Passed |

---

## Screenshots

Add screenshots to `docs/screenshots/` with these names (Windows: Win+Shift+S; Mac: Cmd+Shift+4) and they will appear below.

| Home (desktop) | Services search |
|---|---|
| ![Home page](docs/screenshots/home-desktop.png) | ![Services search](docs/screenshots/services-search.png) |

| Gallery lightbox | Enquiry estimate |
|---|---|
| ![Gallery lightbox](docs/screenshots/gallery-lightbox.png) | ![Enquiry estimate](docs/screenshots/enquiry-estimate.png) |

| Contact map | Mobile menu |
|---|---|
| ![Contact map](docs/screenshots/contact-map.png) | ![Mobile menu](docs/screenshots/mobile-menu.png) |

---

## Updating the Website

- **Change a price or add a service:** edit `js/services-data.js` only. The services page, price list and enquiry form update automatically. Also update the "from" prices on the four home-page cards in `index.html`.
- **Add a gallery photo:** add a 1400px WebP to `images/gallery/` and a 600px version to `images/gallery/thumbs/`, copy a `<figure class="gallery-item">` block in `gallery.html`, and add the photo's reference to `references.html`.
- **Change opening hours:** update `OPENING_HOURS` in `js/script.js`, the hours tables in `index.html` and `contact.html`, and the footer.
- **Change the map location:** edit `SALON_LOCATION` in `js/map.js` and the coordinates in the directions links in `contact.html`.
- **Change the group discount:** edit `GROUP_DISCOUNT_MIN_PEOPLE` and `GROUP_DISCOUNT_RATE` in `js/forms.js`.

---

## Known Limitations

- **Gallery photos are licensed stock images** from Wikimedia Commons used for style inspiration; they should be replaced with real photos of the salon's work.
- **Prices for cornrows, kids' plaits, makeup, nails and facial massage are indicative** and must be confirmed by the salon (edit `js/services-data.js`).
- **The map pin** uses OpenStreetMap's position for Starling Crescent; the exact house position should be checked.
- **The contact form needs a Formspree form ID** before it can send email.
- **Enquiries are not stored**: the estimate is calculated in the browser, and the customer sends the details via WhatsApp.

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full, dated history. Summary:

| Date | Version | Change |
|---|---|---|
| 2 Nov 2026 | 3.0 | Licensed images, interactive features, dynamic services and search, gallery lightbox, Leaflet map, enquiry and contact forms, SEO, references, testing |
| 1 Nov 2026 | 2.0 | Fixed HTML, added CSS, JavaScript, booking and enquiry forms, README |
| Aug 2026 | 1.0 | Initial page structure |

---

## References

Full Harvard references with URLs and access dates are on the [References page](references.html). Summary:

**Images** (Wikimedia Commons, accessed 2 November 2026; resized and converted to WebP):

- Alvinategyeka (2021) *Emotions Spa Facial Massage Parlour* [Photograph]. CC BY-SA 4.0. Available at: https://commons.wikimedia.org/wiki/File:Emotions_Spa_Facial_Massage_Parlour.jpg (Accessed: 2 November 2026).
- Breveglieri, L. (2011) *Dark violete nail polish and shimmer* [Photograph]. CC BY 2.0. Available at: https://commons.wikimedia.org/wiki/File:Dark_violete_nail_polish_and_shimmer.jpg (Accessed: 2 November 2026).
- Daderot (2024) *Hair salon - Arlington, MA* [Photograph]. CC0 1.0. Available at: https://commons.wikimedia.org/wiki/File:Hair_salon_-_Arlington,_MA.jpg (Accessed: 2 November 2026).
- Hair Spies (2021) *Washing hair at salon* [Photograph]. CC BY 2.0. Available at: https://commons.wikimedia.org/wiki/File:Washing_hair_at_salon_(51213255408).jpg (Accessed: 2 November 2026).
- Kamali mohan kumar (2020) *French tip nail art* [Photograph]. CC BY-SA 4.0. Available at: https://commons.wikimedia.org/wiki/File:French_tip_nail_art.jpg (Accessed: 2 November 2026).
- Nwonwu Uchechukwu P (2026) *Cornrow Hairstyling* [Photograph]. CC BY-SA 4.0. Available at: https://commons.wikimedia.org/wiki/File:Cornrow_Hairstyling.jpg (Accessed: 2 November 2026).
- Onojeghuo, C. (2017) *Cornrow style* [Photograph]. CC0 1.0. Available at: https://commons.wikimedia.org/wiki/File:Cornrow_style_(Unsplash).jpg (Accessed: 2 November 2026).
- Otomeonoge (2018) *Bridal makeup in Calabar* [Photograph]. CC BY-SA 4.0. Available at: https://commons.wikimedia.org/wiki/File:Bridal_makeup_in_calabar.jpg (Accessed: 2 November 2026).
- @photosbyphab (2017) *Cornrows* [Photograph]. CC0 1.0. Available at: https://commons.wikimedia.org/wiki/File:Cornrows.jpg (Accessed: 2 November 2026).
- Sarah_Ackerman (2011) *Pedicure NYC* [Photograph]. CC BY 2.0. Available at: https://commons.wikimedia.org/wiki/File:Pedicure_NYC.jpg (Accessed: 2 November 2026).
- Umshushima (2026a) *A woman braiding hair* [Photograph]. CC BY-SA 4.0. Available at: https://commons.wikimedia.org/wiki/File:A_woman_braiding_hair.jpg (Accessed: 2 November 2026).
- Umshushima (2026b) *A woman braiding hair 02* [Photograph]. CC BY-SA 4.0. Available at: https://commons.wikimedia.org/wiki/File:A_woman_braiding_hair_02.jpg (Accessed: 2 November 2026).
- Yemi festus (2024) *Make up artist* [Photograph]. CC BY-SA 4.0. Available at: https://commons.wikimedia.org/wiki/File:Make_up_artist.jpg (Accessed: 2 November 2026).

**Libraries, data and tools:**

- Agafonkin, V. and Leaflet contributors (2023) *Leaflet* (Version 1.9.4) [JavaScript library]. Available at: https://leafletjs.com/ (Accessed: 2 November 2026).
- OpenStreetMap contributors (2026) *OpenStreetMap* [Map data]. Available at: https://www.openstreetmap.org/copyright (Accessed: 2 November 2026).
- OpenStreetMap Foundation (2026) *Nominatim* [Geocoding service]. Available at: https://nominatim.openstreetmap.org/ (Accessed: 2 November 2026).
- Formspree (2026) *Formspree*. Available at: https://formspree.io/ (Accessed: 2 November 2026).
- Google Fonts (2026) *Playfair Display* and *Poppins*. Available at: https://fonts.google.com/ (Accessed: 2 November 2026).
- Wikimedia Commons (2026) *Wikimedia Commons*. Available at: https://commons.wikimedia.org/ (Accessed: 2 November 2026).

**Tutorials and documentation:**

- GitHub (2026) *Creating a GitHub Pages site*. Available at: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site (Accessed: 2 November 2026).
- Google (2026) *SEO Starter Guide*. Available at: https://developers.google.com/search/docs/fundamentals/seo-starter-guide (Accessed: 2 November 2026).
- Leaflet (2023) *Leaflet Quick Start Guide*. Available at: https://leafletjs.com/examples/quick-start/ (Accessed: 2 November 2026).
- Mozilla (2026) *MDN Web Docs*. Available at: https://developer.mozilla.org/ (Accessed: 2 November 2026).
- Mozilla (2026) *Client-side form validation*. Available at: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation (Accessed: 2 November 2026).
- Open Graph (2026) *The Open Graph protocol*. Available at: https://ogp.me/ (Accessed: 2 November 2026).
- W3C (2024) *ARIA Authoring Practices Guide: Patterns*. Available at: https://www.w3.org/WAI/ARIA/apg/patterns/ (Accessed: 2 November 2026).
- SOHO NYC Salon (2020) *SOHO NYC Salon*. Available at: https://www.sohonycsalon.com (Accessed: 2 November 2026).
- Sorbet (2014) *Sorbet Salon*. Available at: https://www.sorbet.co.za/salon (Accessed: 2 November 2026).

**AI tools:**

- Anthropic (2026) *Claude Code* (Claude Opus 5.5) [AI coding assistant]. Used to help write and test the code, find and credit licensed images, and draft this README. Available at: https://claude.com/claude-code (Accessed: 2 November 2026).

---

## Author

**Natasha Keletso Moremi** (ST10533676)
Web Development (WEDE5020w)
