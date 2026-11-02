# Kele's Beauty Therapy Website

A responsive website for **Kele's Beauty Therapy**, a beauty salon in Eastbank, Johannesburg, offering hair, makeup, nails and massage services since 2022.

| | |
|---|---|
| **Student** | Natasha Keletso Moremi |
| **Student number** | ST10533676 |
| **Module** | Web Development (WEDE5020w) |
| **Assessment** | POE Part 1 |
| **Technologies** | HTML5, CSS3, JavaScript |
| **Hosting** | GitHub Pages |

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Website Goals](#website-goals)
3. [Pages](#pages)
4. [Features](#features)
5. [Folder Structure](#folder-structure)
6. [Design](#design)
7. [How to Run the Website](#how-to-run-the-website)
8. [Deploying to GitHub Pages](#deploying-to-github-pages)
9. [Testing](#testing)
10. [Updating the Website](#updating-the-website)
11. [Known Limitations](#known-limitations)
12. [Changelog](#changelog)
13. [References](#references)

---

## Project Overview

Kele's Beauty Therapy was founded by Keletso in March 2022. The salon offers:

- Hair washing, cutting and plaiting
- Makeup (bridal, events and photo shoots)
- Nails (manicures and pedicures)
- Massage

**Mission:** To empower individuals by enhancing their natural beauty through personalised and innovative beauty treatments, in a relaxing and luxurious environment using high-quality products.

**Vision:** To be a leading beauty salon known for exceptional service and transformative beauty experiences, creating a community where everyone feels valued and beautiful.

### Business Details

| | |
|---|---|
| **Address** | 772 Starling Crescent, Eastbank, Johannesburg (next to Eastbank Clinic) |
| **Phone / WhatsApp** | 071 531 1476 |
| **Monday - Friday** | 08:00 - 19:00 |
| **Saturday** | 08:00 - 17:00 |
| **Sunday** | Closed |

---

## Website Goals

- Attract new customers and increase website traffic
- Make it easy for customers to book appointments and send enquiries
- Give customers clear information about services, prices, hours and location
- Showcase the salon's work in a gallery
- Build brand awareness in the local community

---

## Pages

| Page | File | Content |
|---|---|---|
| Home | `home.html` | Welcome banner, open/closed status, featured services, why choose us, opening hours, call to action |
| About Us | `about.html` | Salon history, mission and vision, target audience |
| Services | `services.html` | All six services with descriptions, prices and "Book this" buttons, plus a price list table |
| Gallery | `gallery.html` | Photo grid of completed work with a click-to-enlarge viewer |
| Contact Us | `contact.html` | Contact details, opening hours, booking form, enquiry form and map |
| (Redirect) | `index.html` | Sends visitors to `home.html`, because GitHub Pages loads `index.html` first |

### Price List

| Service | Price |
|---|---|
| Washing Hair | R300 |
| Hair Cutting | R350 |
| Hair Plaiting | From R500 |
| Massage | R120 |
| Makeup | On request |
| Nails | On request |

---

## Features

### Responsive Design
The layout adapts to desktop, tablet and mobile screens. On small screens the navigation collapses into a menu button (&#9776;).

### Live Open / Closed Status
The Home and Contact pages show whether the salon is open right now, based on Johannesburg time, so the status is correct for visitors in any timezone. Today's row in the opening-hours table is highlighted.

### Online Booking Form
The booking form on the Contact page:

- Checks that the name, phone number, service, date and time are filled in correctly
- Accepts South African phone numbers (e.g. `071 234 5678` or `+27 71 234 5678`)
- Rejects past dates and Sundays (the salon is closed)
- Only allows times within opening hours. The last appointment starts one hour before closing.
- Pre-selects the service when the visitor clicks **Book this** on the Services page
- Opens WhatsApp with the booking details already written, ready for the customer to send to the salon

### Enquiry Form
Customers can send a question with their name, optional email and message. Like the booking form, it is validated and sent via WhatsApp.

### Gallery Viewer
Clicking a gallery photo opens it in a larger view. Close it with the &times; button, by clicking outside the photo, or by pressing **Esc**.

### Accessibility
- Every image has descriptive `alt` text
- Form fields have labels, and error messages are read out by screen readers
- The current page is marked in the navigation
- Buttons and links can be used with the keyboard

---

## Folder Structure

```
DISD1 KELE'S BEAUTY THERAPY/
├── index.html          Redirects to home.html
├── home.html           Home page
├── about.html          About Us page
├── services.html       Services and prices
├── gallery.html        Gallery
├── contact.html        Contact details, booking and enquiry forms
├── css/
│   └── style.css       All styling (colours, layout, responsive rules)
├── js/
│   └── script.js       Menu, open/closed status, forms, gallery viewer
├── images/
│   ├── logo.jpg        Salon logo (used in the header)
│   ├── Logo.webp       Hairstyle photo (used on Home, About and Gallery)
│   └── gallery.webp    Not currently used
├── Documents/
│   └── Proposal.docx   Website proposal (POE Part 1)
└── README.md           This file
```

---

## Design

### Colour Scheme

| Colour | Hex | Meaning |
|---|---|---|
| Gold | `#b08d57` | Luxury and professionalism |
| Black | `#1b1b1b` | Sophisticated and stylish |
| White | `#ffffff` | Clean and simple |
| Soft Pink | `#f9e4ea` | Feminine, beauty-focused touch |

The colours are defined once at the top of `css/style.css` as CSS variables (e.g. `--gold`), so the whole site can be re-coloured by changing a single line.

### Typography

| Use | Font |
|---|---|
| Headings | Playfair Display (fallback: Georgia) |
| Body text | Poppins (fallback: Arial) |

Fonts are loaded from Google Fonts.

---

## How to Run the Website

No installation is needed.

1. Download or clone this project.
2. Open the project folder.
3. Double-click `home.html` (or `index.html`) to open it in any modern browser (Chrome, Edge, Firefox or Safari).

The Google Fonts and the map need an internet connection. Everything else works offline.

---

## Deploying to GitHub Pages

1. Create a new repository on GitHub, e.g. `keles-beauty-therapy`.
2. Upload all the project files, keeping the `css`, `js` and `images` folders.
3. In the repository, go to **Settings → Pages**.
4. Under **Source**, choose **Deploy from a branch**, select `main` and `/ (root)`, then click **Save**.
5. After a minute or two, the site is live at:
   `https://<your-github-username>.github.io/keles-beauty-therapy/`

> **Note:** GitHub Pages is case-sensitive. File names in links must match exactly, e.g. `images/Logo.webp` is not the same as `images/logo.webp`.

---

## Testing

The website was tested as follows:

| Test | Result |
|---|---|
| HTML validation with HTML Tidy on all pages | Passed (no errors) |
| JavaScript syntax check | Passed |
| All pages load in Google Chrome with no console errors | Passed |
| All images load (no broken images) | Passed |
| No sideways scrolling on a 390px-wide phone screen | Passed |
| Mobile menu opens and closes | Passed |
| Booking form shows errors when submitted empty | Passed |
| Booking form rejects Sundays | Passed |
| Booking form rejects times after the last Saturday slot | Passed |
| "Book this" pre-selects the correct service | Passed |
| Valid booking opens WhatsApp with the correct message | Passed |
| Enquiry form opens WhatsApp with the correct message | Passed |
| Gallery photo opens in the enlarged viewer | Passed |

---

## Updating the Website

### Add a photo to the gallery
1. Put the photo in the `images` folder.
2. In `gallery.html`, copy an existing `<figure class="gallery-item">` block.
3. Change the `src`, `alt` text and `<figcaption>` to match the new photo.

### Change a price
Prices appear in three places. Update all three:
1. The service card and price list table in `services.html`
2. The service dropdown in the booking form in `contact.html`
3. The featured service cards in `home.html` (hair and massage only)

### Change opening hours
1. Update `OPENING_HOURS` at the top of `js/script.js`. This controls the open/closed status and booking times.
2. Update the hours tables in `home.html` and `contact.html`, and the footer on every page.

### Change the WhatsApp number
Update `WHATSAPP_NUMBER` at the top of `js/script.js`, and the phone links (`tel:` and `wa.me`) in the HTML pages.

---

## Known Limitations

- **Bookings are sent through WhatsApp.** GitHub Pages only hosts static files and cannot store form data, so customers must press **Send** in WhatsApp for the salon to receive the booking. Bookings are not confirmed automatically.
- **The gallery has only one photo.** More photos of hair, makeup, nails and the salon still need to be added.
- **Makeup and nails prices** are shown as "on request" until prices are confirmed.
- **Social media links and customer reviews** (planned in the proposal) have not been added yet.

---

## Changelog

### Version 2 (November 2026)
- Fixed invalid HTML on all pages: unclosed `<header>` and `<footer>` tags, a malformed `<h1>`, an invalid `<picture>` tag and spelling mistakes
- Added `alt` text to all images and `meta charset` and viewport tags to every page
- Moved the welcome section from the Contact page to the Home page
- Removed the video, because the video file (`images/Download.Mp4`) did not exist
- Added full content to every page using the information in the proposal
- Added an external stylesheet (`css/style.css`) using the proposal's colour scheme and fonts
- Added JavaScript (`js/script.js`) for the mobile menu, open/closed status, form validation, WhatsApp booking and the gallery viewer
- Added a booking form and an enquiry form
- Added `index.html` for GitHub Pages
- Added this README

### Version 1
- Initial page structure: Home, About Us, Services, Gallery and Contact Us

---

## References

- SOHO NYC Salon. 2020. *SOHO NYC Salon*. Available at: https://www.sohonycsalon.com
- Sorbet. 2014. *Sorbet Salon*. Available at: https://www.sorbet.co.za/salon
- Google Fonts. *Playfair Display* and *Poppins*. Available at: https://fonts.google.com
- MDN Web Docs. *HTML, CSS and JavaScript reference*. Available at: https://developer.mozilla.org
