# 📘 Code Documentation — Mangalam HDPE Pipes Website

> This document explains the key functionality behind each file in the project. Written for developers picking this up for the first time.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [File Structure](#2-file-structure)
3. [styles.css — Design System](#3-stylescss--design-system)
4. [script.js — All Interactivity](#4-scriptjs--all-interactivity)
5. [index.html — Homepage](#5-indexhtml--homepage)
6. [about.html — About Page](#6-abouthtml--about-page)
7. [products.html — Product Catalog](#7-productshtml--product-catalog)
8. [product-details.html — Product Detail View](#8-product-detailshtml--product-detail-view)
9. [contact.html — Contact Page](#9-contacthtml--contact-page)
10. [How Pages Connect](#10-how-pages-connect)

---

## 1. Project Overview

This is a **purely static website** — no build tools, no npm, no framework. Every page is a self-contained `.html` file that shares:

- One stylesheet: `styles.css`
- One script file: `script.js`
- One folder of images: `images/`

The script is loaded at the **bottom of every page** (`<script src="script.js">`) so the DOM is ready before JS runs. It uses `DOMContentLoaded` as a safety wrapper anyway.

---

## 2. File Structure

```
gushwork-assignment/
│
├── index.html            → Homepage (hero, feature cards, CTA)
├── about.html            → Company story, stats
├── products.html         → Product grid
├── product-details.html  → Single product, carousel, zoom, specs table
├── contact.html          → Contact form + OpenStreetMap embed
│
├── styles.css            → All visual styles
├── script.js             → All JavaScript behaviour
│
└── images/               → Local images (no external CDN)
    ├── hero_pipes.png
    ├── product_installation.png
    ├── factory_about.png
    ├── pipe_coils.png
    ├── pipe_fittings.png
    └── team_engineering.png
```

---

## 3. `styles.css` — Design System

### CSS Variables (`:root`)

All colours, spacing, and shadows are defined as CSS custom properties at the top of the file. This means changing `--accent-orange` in one place updates it everywhere.

```css
:root {
    --primary-blue: #1E3A5F;       /* main brand navy */
    --accent-orange: #F97316;      /* CTA buttons, highlights */
    --accent-teal: #0D9488;        /* stat card accents */
    --gradient-brand: linear-gradient(135deg, #1E3A5F, #2563EB);
    --gradient-hero: linear-gradient(135deg, #0C1628, #1E3A5F, #1d4ed8);
    --padding-x: 100px;            /* horizontal page padding */
    --shadow-xl: ...;              /* used for cards and modals */
}
```

### Key Class Groups

| Class | What it does |
|---|---|
| `.btn`, `.btn-primary`, `.btn-orange` | Button variants with hover lift + glow |
| `.animate-on-scroll` | Initially invisible; JS adds `.is-visible` to fade in |
| `.sticky-header` | Fixed position, hidden by default; JS adds `.visible` |
| `.mobile-nav` | Hidden on desktop; shown below 768px via media query |
| `.modal-overlay` | Full-screen overlay; JS toggles `.open` to show/hide |
| `.card:hover` | Lifts + shows deeper shadow + border highlight |
| `.page-hero` | Dark gradient banner used on inner page headers |
| `.stat-grid` / `.stat-card` | 4-column grid with coloured left-border accents |
| `.dropdown-menu` | Positioned dropdown, shown on `.dropdown-container:hover` |
| `.specs-row:hover` | Table row highlight in the dark specs section |

### Responsive Breakpoints

```
≤ 1200px  — Hide zoom panel, reduce font sizes
≤ 1080px  — Stack product section to single column
≤ 768px   — Show hamburger, hide desktop nav, mobile layout
≤ 480px   — Smallest phones, further size reductions
```

---

## 4. `script.js` — All Interactivity

Everything runs inside a single `DOMContentLoaded` listener so the script is safe on all pages even if a feature's HTML doesn't exist on that page (all selectors are null-checked before use).

---

### 4.1 Sticky Header

```js
function handleScroll() {
    const threshold = mainHeader.offsetHeight + 60;
    stickyHeader.classList.toggle('visible', window.scrollY > threshold);
}
window.addEventListener('scroll', handleScroll, { passive: true });
```

**How it works:**
- Gets the height of the main header on load.
- On every scroll event, checks if the user has scrolled past `header height + 60px`.
- Toggles the `.visible` class which triggers a CSS `translateY(0)` slide-in transition.
- `passive: true` is set so the browser doesn't wait for JS before painting scroll frames.

---

### 4.2 Mobile Hamburger Nav

```js
hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
    // swap ☰ icon ↔ ✕ icon
});
```

**How it works:**
- Clicking the button toggles `.open` on `#mobile-nav`.
- CSS uses `max-height: 0 → 500px` transition for the slide-down animation (height: auto can't be transitioned directly).
- The hamburger icon SVG is swapped to a close (✕) icon when open.
- Any link inside the nav closes it automatically.
- `aria-expanded` is updated for screen reader accessibility.

---

### 4.3 Scroll Reveal Animations

```js
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target); // only animate once
        }
    });
}, { threshold: 0.12 });
```

**How it works:**
- Every element with `.animate-on-scroll` starts at `opacity: 0; transform: translateY(30px)`.
- `IntersectionObserver` watches each element.
- When 12% of the element enters the viewport, `.is-visible` is added, triggering a CSS fade+slide transition.
- Elements already visible on page load are handled by `revealIfVisible()` which checks immediately without waiting for scroll.
- Observer is disconnected after first trigger so it doesn't re-animate on scroll back.

---

### 4.4 Quote Modal

```js
// Open
openModalBtns.forEach(btn => btn.addEventListener('click', openModal));

// Close — three ways:
closeModalBtn.addEventListener('click', closeModal);          // × button
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); }); // backdrop
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); }); // Escape key
```

**How it works:**
- Any element with class `.trigger-quote-modal` opens the modal — this works across all pages.
- `document.body.style.overflow = 'hidden'` prevents the page scrolling behind the modal.
- Three close mechanisms: button click, backdrop click, `Escape` key.
- On submit, the form is simulated (1.5s delay), then a toast notification appears.

---

### 4.5 Image Carousel

```js
function goTo(index) {
    // wrap around: last → first, first → last
    if (index < 0) index = thumbEls.length - 1;
    if (index >= thumbEls.length) index = 0;
    currentIndex = index;

    thumbEls.forEach(t => t.classList.remove('active'));
    thumbEls[currentIndex].classList.add('active');
    mainImage.src = highResSrc(thumbEls[currentIndex].querySelector('img'));
}
```

**How it works:**
- Tracks `currentIndex` (which thumbnail is active).
- Three ways to navigate: click a thumbnail, click left/right arrows, or press `ArrowLeft`/`ArrowRight` keyboard keys.
- Wraps around at both ends (circular navigation).
- `highResSrc()` returns the image src directly for local files; for Unsplash URLs it would swap `w=300` to `w=1200`.

---

### 4.6 Image Zoom (Product Detail Page)

```js
imageContainer.addEventListener('mousemove', (e) => {
    // calculate lens position clamped to image bounds
    let x = e.clientX - rect.left - lens.offsetWidth / 2;
    let y = e.clientY - rect.top  - lens.offsetHeight / 2;
    x = Math.max(0, Math.min(x, rect.width  - lens.offsetWidth));
    y = Math.max(0, Math.min(y, rect.height - lens.offsetHeight));

    lens.style.left = `${x}px`;
    lens.style.top  = `${y}px`;

    // map lens position to background-position percentage in zoom panel
    const xPct = (x / (rect.width  - lens.offsetWidth))  * 100;
    const yPct = (y / (rect.height - lens.offsetHeight)) * 100;
    zoomResult.style.backgroundPosition = `${xPct}% ${yPct}%`;
});
```

**How it works:**
- On hover, a circular lens div appears over the image and a zoom panel appears to the right.
- The zoom panel uses `background-image` + `background-size: 250% 250%` to display a 2.5× magnified version of the same image.
- As the mouse moves, the lens position maps to a `background-position` percentage in the zoom panel, keeping the zoomed view aligned to the cursor.
- Only activates on screens wider than 1200px (no zoom on mobile).

---

### 4.7 Toast Notification

```js
function showToast(message, duration = 4000) {
    const toast = document.createElement('div');
    toast.textContent = message;
    // inject styles directly so it works without any CSS class
    document.body.appendChild(toast);
    // double rAF trick to ensure transition fires after element is in DOM
    requestAnimationFrame(() => requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }));
    setTimeout(() => { /* fade out and remove */ }, duration);
}
```

**How it works:**
- Creates a `<div>` dynamically, appends to `<body>`, then animates it in using a double `requestAnimationFrame` (needed because browsers batch style changes — the double rAF ensures the initial `opacity: 0` state is painted before the transition to `opacity: 1` fires).
- Auto-removes from the DOM after `duration` ms.
- Replaces `alert()` throughout the site — no browser chrome, matches the site's design.

---

## 5. `index.html` — Homepage

**Key sections:**
- **Hero** — full-viewport background image with a dark overlay and 4 stat cards overlaid at the bottom. Stats use glassmorphism (`backdrop-filter: blur`).
- **Trust bar** — logos of partner companies, styled with `.partner-logo` (grey by default, orange on hover).
- **Feature cards** — 3 cards using `.grid-container` (CSS Grid, auto-fill columns).
- **CTA banner** — dark blue gradient section with an orange button, triggers the quote modal.
- **Modal** — hidden by default at bottom of `<body>`, shown via JS.

---

## 6. `about.html` — About Page

**Key sections:**
- **Hero** — uses `.page-hero` class (dark gradient background, white text).
- **Two-column layout** — uses `.product-section` (a 2-column CSS grid) to place text left, image right.
- **Stats band** — full-width dark blue section with 4 stat cards using the brand gradient.

---

## 7. `products.html` — Product Catalog

**Key sections:**
- **Product grid** — `.grid-container` auto-fills cards at min 300px width each.
- **Card image zoom** — CSS only: `.card:hover .card-img { transform: scale(1.04) }` with `overflow: hidden` on the card.
- **CTA banner** — same pattern as homepage, triggers modal.

---

## 8. `product-details.html` — Product Detail View

**Key sections:**
- **Breadcrumbs** — simple `Home > Products > Product Name` navigation trail.
- **Two-column layout** — `.product-section` grid: carousel left, details right.
- **Carousel** — `.product-carousel` contains the main image, left/right arrows, and thumbnail strip. All wired in `script.js`.
- **Zoom panel** — `.zoom-container` positioned `left: calc(100% + 40px)` so it floats to the right of the image, hidden by default.
- **Pricing card** — `.pricing-card` with a `::before` pseudo-element blue left border.
- **Specs table** — custom div-based table (not `<table>`) using CSS Grid for columns.

---

## 9. `contact.html` — Contact Page

**Key sections:**
- **Two-column grid** — `.contact-grid`: contact form on the left, office info + map on the right.
- **Form** — `id="contact-page-form"` is picked up by `script.js` which intercepts submit, shows a loading state, then fires a toast.
- **Map** — OpenStreetMap `<iframe>` embed centred on Okhla Industrial Area, New Delhi. No API key required. Coordinates: `28.5450°N, 77.2750°E`.

```html
<iframe
  src="https://www.openstreetmap.org/export/embed.html
       ?bbox=77.26,28.535,77.29,28.555
       &layer=mapnik
       &marker=28.545,77.275">
</iframe>
```

---

## 10. How Pages Connect

```
index.html
  ├── → about.html         (nav link + card links)
  ├── → products.html      (nav link + "Explore Products" button)
  ├── → product-details.html  (dropdown menu)
  └── → contact.html       (nav "Contact Us" button)

products.html
  └── → product-details.html  (each card's "View Details" button)

product-details.html
  └── → products.html      (breadcrumb + nav)
```

All pages share:
- The same sticky header + mobile nav structure
- The same footer with 4-column links
- The same `#quote-modal` at the bottom of `<body>`
- `styles.css` and `script.js` loaded identically

---

*Last updated: May 2026*
