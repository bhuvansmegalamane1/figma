<div align="center">

# 🔩 Mangalam HDPE Pipes

**A premium multi-page website for an industrial pipe manufacturer — built with vanilla HTML, CSS & JS. No frameworks. No dependencies.**

[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[**Live Demo**](https://bhuvansmegalamane1.github.io/figma/) &nbsp;·&nbsp; [**View Repo**](https://github.com/bhuvansmegalamane1/figma)

</div>

---

## ✨ What's in this project

A fully responsive, production-quality website for Mangalam HDPE Pipes — a pipe manufacturer based in India. The site was built from a Figma design and expanded into a complete multi-page experience.

No React. No Tailwind. No npm. Just clean HTML, CSS, and vanilla JS.

---

## 📄 Pages

| Page | File | Description |
|---|---|---|
| 🏠 Home | `index.html` | Hero with stat bar, feature cards, trust logos, CTA |
| 🏭 About | `about.html` | Company story, factory image, stats section |
| 📦 Products | `products.html` | Product grid with tags and custom quote CTA |
| 🔍 Product Detail | `product-details.html` | Image carousel, zoom-on-hover, specs table |
| 📞 Contact | `contact.html` | Contact form + office info |

---

## ⚡ Features

- **Sticky header** — slides in after scrolling past the hero, hides on scroll up
- **Mobile hamburger nav** — smooth slide-down panel, closes on link click
- **Products dropdown** — mega-menu on desktop, flat list on mobile
- **Image carousel** — thumbnail navigation + arrow buttons + keyboard arrows
- **Zoom on hover** — magnifying lens that follows your cursor (desktop only)
- **Quote modal** — opens from any page, dismisses on Escape or outside click
- **Scroll reveal** — elements animate in as they enter the viewport
- **Toast notifications** — replaces ugly `alert()` with a smooth pill toast
- **Fully responsive** — tested at 1440px, 1080px, 768px, 480px
- **No external image dependencies** — all images are local (AI-generated)

---

## 🎨 Design System

```
Colors
──────
Primary Blue   #1E3A5F    (deep navy)
Accent Orange  #F97316    (CTAs, highlights)
Accent Teal    #0D9488    (stat accents)
Electric Blue  #2563EB    (gradient, hover)
Dark BG        #06101F    (footer)

Typography
──────────
Font: Inter (Google Fonts)
Weights: 400 · 500 · 600 · 700 · 800
```

---

## 🗂️ Project Structure

```
gushwork-assignment/
│
├── index.html            # Homepage
├── about.html            # About Us
├── products.html         # Product catalog
├── product-details.html  # Single product view
├── contact.html          # Contact page
│
├── styles.css            # All styles (CSS variables, responsive breakpoints)
├── script.js             # All interactivity (modal, carousel, zoom, nav)
│
└── images/
    ├── hero_pipes.png
    ├── product_installation.png
    ├── factory_about.png
    ├── pipe_coils.png
    ├── pipe_fittings.png
    └── team_engineering.png
```

---

## 🚀 Running locally

No build step needed. Just open the file:

```bash
# Option 1 — open directly
start index.html

# Option 2 — serve with Python (recommended, fixes some browser quirks)
python -m http.server 8000
# then visit http://localhost:8000

# Option 3 — serve with Node
npx serve .
```

---

## 🛠️ Built with

| Tool | Purpose |
|---|---|
| HTML5 | Structure and semantics |
| CSS3 | Styling, animations, glassmorphism, responsive grid |
| Vanilla JS | Carousel, zoom, sticky header, modal, toast, scroll reveal |
| Google Fonts (Inter) | Typography |
| IntersectionObserver API | Scroll reveal, no library needed |

---

## 📋 Functionality checklist

- [x] Sticky header (scroll-triggered, smooth slide-in)
- [x] Mobile hamburger menu
- [x] Products dropdown mega-menu
- [x] Image carousel (thumbnail + arrows + keyboard)
- [x] Magnifying glass zoom on product image
- [x] Quote modal (Escape to close, click outside to close)
- [x] Form submit with toast feedback
- [x] Scroll reveal animations
- [x] Fully responsive (5 breakpoints)
- [x] Local images (no CDN dependency)
- [ ] Backend form submission (front-end only for now)
- [x] OpenStreetMap embed on Contact page (Okhla Industrial Area, New Delhi)

---

## 📌 Notes

- This project started as a Figma implementation assignment and grew into a full multi-page site
- All copy was written to sound human — no AI marketing fluff
- Images were AI-generated but feel free to swap them with real product photos

---

<div align="center">

Made with 🔧 for Mangalam HDPE Pipes &nbsp;·&nbsp; Est. 1996

</div>
