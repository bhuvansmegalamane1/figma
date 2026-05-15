DOCUMENTATION — Mangalam HDPE Pipes Website
============================================
Last Updated: May 2026
Project Type: Static Multi-Page Website
Technologies: HTML5, CSS3, Vanilla JavaScript


-------------------------------------------------------------------
SECTION 1: PROJECT OVERVIEW
-------------------------------------------------------------------

This project is a multi-page website for Mangalam HDPE Pipes, a pipe
manufacturing company based in India. The website was built as part of
a Figma-to-code assignment and expanded into a fully functional site.

The project uses no frameworks, no libraries, and no build tools.
Every page is a plain HTML file. Styling is done in a single CSS file
(styles.css) and all interactive behaviour is handled in a single
JavaScript file (script.js).

All pages share the same header, footer, navigation, and quote modal.
The script and stylesheet are linked at the bottom / head of each page.


-------------------------------------------------------------------
SECTION 2: FILE STRUCTURE
-------------------------------------------------------------------

index.html
    The main homepage. Contains the hero section with a background
    image, a statistics bar, a trust/partners section, three feature
    cards, and a call-to-action banner.

about.html
    The About Us page. Contains a hero banner, a two-column layout
    with company history text on the left and a factory image on
    the right, followed by a statistics section.

products.html
    The product catalog page. Displays a grid of three product cards,
    each with an image, a tag, a title, a short description, and a
    button linking to the product detail page.

product-details.html
    The detailed view for a single product (Two For One Twister).
    Contains a breadcrumb trail, a two-column layout with an image
    carousel on the left and product info on the right, a trust
    section, and a technical specifications table at the bottom.

contact.html
    The contact page. Contains a two-column layout: a contact form
    on the left, and office address, phone, email, and an embedded
    OpenStreetMap on the right.

styles.css
    Contains all visual styles for the entire site. Uses CSS custom
    properties (variables) for colours, spacing, and shadows so that
    design tokens can be changed in one place. Includes media queries
    for responsive layouts at four breakpoints (1200px, 1080px,
    768px, 480px).

script.js
    Contains all JavaScript for the site. Handles the sticky header,
    mobile hamburger navigation, scroll reveal animations, quote modal
    open/close behaviour, image carousel, image zoom, contact form
    submission, and toast notification display.

images/
    A folder containing six locally stored PNG images used across the
    site. Using local images avoids any dependency on external CDNs
    like Unsplash that may fail if the URL changes or access is blocked.


-------------------------------------------------------------------
SECTION 3: CSS DESIGN SYSTEM (styles.css)
-------------------------------------------------------------------

At the top of styles.css, a :root block defines all design tokens
as CSS custom properties. These include:

    --primary-blue      The main dark navy colour used for headings,
                        buttons, and borders.

    --accent-orange     A warm orange used for call-to-action buttons,
                        highlight text, and hover states on links.

    --accent-teal       A teal green used for stat card left-border
                        accents on the about and homepage.

    --gradient-brand    A left-to-right gradient from navy to electric
                        blue, used for primary buttons and CTA banners.

    --gradient-hero     A darker gradient used as the background for
                        inner page hero sections.

    --padding-x         The horizontal padding applied to all container
                        elements. Reduces at smaller screen sizes.

    --shadow-xl         A large box shadow used on modals, cards on
                        hover, and the zoom panel.

Button styles (.btn, .btn-primary, .btn-orange, .btn-secondary) share
a base class and extend it. Hover states use a slight upward translate
and an increased box shadow to create a lift effect.

The .animate-on-scroll class sets elements to opacity 0 and translateY
30px by default. When JavaScript adds the .is-visible class, a CSS
transition fades them in and slides them up.

The .sticky-header class uses translateY(-100%) to keep the header off
screen. When JavaScript adds .visible, it moves to translateY(0) with
a smooth cubic-bezier transition.

The .mobile-nav class is hidden on desktop using display: none. On
screens 768px and below, it becomes display: flex. It uses max-height
set to 0 by default and 500px when .open is added, which allows a
smooth slide-down transition (height: auto cannot be transitioned
directly in CSS, so max-height is used as a workaround).

The .modal-overlay class covers the full screen with a semi-transparent
dark background. Its opacity is 0 and visibility is hidden by default.
When JavaScript adds .open, both are restored, and the inner modal
content box scales up from 95% to 100% with an ease transition.

The .dropdown-menu class is positioned absolutely below the Products
nav link. It is invisible by default (opacity: 0, visibility: hidden)
and becomes visible when the parent .dropdown-container is hovered,
using a CSS-only hover trigger.

The specs table on the product detail page is not a real HTML table.
It is built using div elements with CSS Grid (grid-template-columns:
1fr 2fr) to create two-column rows. This makes it easier to style
and animate than a native table element.


-------------------------------------------------------------------
SECTION 4: JAVASCRIPT BEHAVIOUR (script.js)
-------------------------------------------------------------------

All code is wrapped inside a DOMContentLoaded event listener. This
ensures the script runs only after the full HTML has been parsed.
Every DOM element is null-checked before being used, so the script
does not throw errors on pages where a particular element does not
exist (for example, the zoom code only runs on product-details.html).

4.1 Sticky Header

The main header height is measured once on load. A scroll event
listener then checks on every scroll whether window.scrollY has
exceeded that height plus 60 pixels. If it has, the class .visible
is added to the sticky header element, which triggers the CSS slide-in
transition. The event listener uses { passive: true } to avoid blocking
browser paint during scroll.

4.2 Mobile Hamburger Navigation

A click listener on the hamburger button toggles the .open class on
the mobile nav panel. When toggled, the CSS max-height transition
animates the panel open or closed. The hamburger icon SVG is replaced
with a close icon (X) when the menu is open, and restored when closed.
The aria-expanded attribute on the button is also updated for
accessibility. Any link inside the mobile nav, when clicked, closes
the panel automatically.

4.3 Scroll Reveal Animations

An IntersectionObserver watches all elements with the class
.animate-on-scroll. When 12% of an element enters the viewport, the
observer adds .is-visible to that element. The CSS transition then
fades it in and slides it upward. Once the class is added, the element
is unobserved so the animation only plays once (not on scroll back up).
Elements that are already visible when the page loads are handled by a
separate function that checks their position immediately.

4.4 Quote Modal

Any element with the class .trigger-quote-modal opens the modal when
clicked. This class is placed on buttons across all pages so the same
modal works everywhere without duplicating JavaScript. When the modal
opens, document.body.overflow is set to hidden to prevent the page
scrolling behind it.

The modal can be closed in three ways:
    - Clicking the X button in the top-right corner
    - Clicking anywhere on the dark overlay outside the modal box
    - Pressing the Escape key

When the form inside the modal is submitted, the default form action
is prevented. The submit button is disabled and shows a loading message.
After 1.5 seconds (simulating a server call), the form resets, the
modal closes, and a toast notification appears confirming the request
was sent.

4.5 Image Carousel (product-details.html only)

An array of thumbnail elements is tracked along with a currentIndex
variable. Three interactions can change the active image:

    - Clicking a thumbnail sets currentIndex to that thumbnail's index.
    - Clicking the left or right arrow decrements or increments
      currentIndex. If it goes below 0, it wraps to the last image.
      If it exceeds the last index, it wraps to 0.
    - Pressing the ArrowLeft or ArrowRight keyboard keys does the same.

On each change, the active thumbnail gets the .active class (for the
blue border highlight), and the main image src is updated to the
thumbnail image's src.

4.6 Image Zoom (product-details.html only, desktop only)

This feature is only enabled on screens wider than 1200px. When the
mouse enters the main image container, a circular lens div becomes
visible overlaying the image, and a zoom result panel appears to the
right of the image.

As the mouse moves over the image, the lens follows the cursor. Its
position is clamped to the image boundaries so it cannot go outside.
The zoom panel displays the same image as a CSS background, scaled to
250% of its normal size. The background-position of the zoom panel is
calculated as a percentage based on where the lens is within the image.
This makes the zoomed view track the lens position accurately.

4.7 Contact Form (contact.html only)

The contact form on the contact page is handled separately from the
modal form. When submitted, it prevents the default action, disables
the submit button, and after 1.5 seconds resets the form and shows a
toast notification.

4.8 Toast Notification

A function called showToast creates a div element, injects it into
the bottom of the page, and animates it in using a double
requestAnimationFrame call. The double requestAnimationFrame is needed
because browsers batch style changes: without it, the browser would
skip the initial invisible state and go straight to visible without
animating. After 4 seconds the element fades out and is removed from
the DOM.


-------------------------------------------------------------------
SECTION 5: PAGES IN DETAIL
-------------------------------------------------------------------

5.1 Homepage (index.html)

The hero section uses a local background image with a multi-stop
dark gradient overlay to keep text readable. The heading uses a large
font size (68px) with tight letter-spacing. The stat cards at the
bottom of the hero use glassmorphism: a semi-transparent background
with backdrop-filter blur, giving a frosted glass appearance over
the background image.

The feature cards section uses CSS Grid with auto-fill and a minimum
column width of 300px, so the number of columns adapts automatically
to screen width without JavaScript.

5.2 About Page (about.html)

The two-column layout reuses the .product-section grid class. On
screens below 1080px this collapses to a single column.

5.3 Products Page (products.html)

The card image zoom on hover is pure CSS. The card has overflow hidden
and the image inside has a transition on transform. On hover, the image
scale increases slightly, creating a zoom-in effect contained within
the card border radius.

5.4 Product Detail Page (product-details.html)

The breadcrumb trail at the top helps users understand where they are
in the site hierarchy. The zoom panel is positioned using absolute
positioning with left: calc(100% + 40px) so it appears to the right
of the image container without disrupting the page layout.

5.5 Contact Page (contact.html)

The map is an OpenStreetMap iframe. The bounding box and marker
coordinates are set to Okhla Industrial Area, New Delhi, which is
a real industrial district consistent with the company profile. No
API key or account is required to use OpenStreetMap embeds.


-------------------------------------------------------------------
SECTION 6: HOW PAGES LINK TOGETHER
-------------------------------------------------------------------

The navigation menu on every page links to all other pages. The
dropdown under Products links directly to product-details.html.

From the homepage, users can reach:
    - About page via the nav link or the Learn More / See certifications
      links on the feature cards
    - Products page via the nav link or the Explore Products button
    - Product detail page via the Products dropdown
    - Contact page via the Contact Us button in the nav

From the products page, each card links to product-details.html.

From product-details.html, the breadcrumb links back to the homepage
and to the products page.

All pages share an identical footer with links to all sections.


-------------------------------------------------------------------
SECTION 7: KNOWN LIMITATIONS
-------------------------------------------------------------------

Form submission is front-end only. The quote modal form and the contact
form both simulate a server response with a 1.5 second timeout. In a
production deployment these would need to send data to a backend
endpoint or a service like Formspree or EmailJS.

The map shows a fixed location in Delhi. It is not dynamically
generated from an address and does not reflect the actual company
location.

Images were AI-generated. They should be replaced with real product
photography for a production deployment.


-------------------------------------------------------------------
END OF DOCUMENTATION
-------------------------------------------------------------------
