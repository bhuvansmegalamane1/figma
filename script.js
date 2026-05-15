document.addEventListener('DOMContentLoaded', () => {

    // sticky header - show after scrolling past the main nav
    const stickyHeader = document.getElementById('sticky-header');
    const mainHeader   = document.querySelector('.main-header');

    function handleScroll() {
        if (!mainHeader || !stickyHeader) return;
        const threshold = mainHeader.offsetHeight + 60;
        stickyHeader.classList.toggle('visible', window.scrollY > threshold);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();


    // hamburger menu toggle
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNav    = document.getElementById('mobile-nav');

    if (hamburgerBtn && mobileNav) {
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = mobileNav.classList.toggle('open');
            hamburgerBtn.setAttribute('aria-expanded', isOpen);
            hamburgerBtn.innerHTML = isOpen
                ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>'
                : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
        });

        // close the menu when a link is clicked
        mobileNav.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                hamburgerBtn.setAttribute('aria-expanded', false);
                hamburgerBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
            });
        });
    }


    // scroll reveal - fade in elements as they enter the viewport
    const revealEls = document.querySelectorAll('.animate-on-scroll');

    function revealIfVisible(el) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) {
            el.classList.add('is-visible');
            return true;
        }
        return false;
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => {
        if (!revealIfVisible(el)) {
            revealObserver.observe(el);
        }
    });


    // quote modal
    const modal         = document.getElementById('quote-modal');
    const openModalBtns = document.querySelectorAll('.trigger-quote-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const quoteForm     = document.getElementById('quote-form');

    function openModal() {
        if (!modal) return;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        const firstInput = modal.querySelector('input, textarea');
        if (firstInput) setTimeout(() => firstInput.focus(), 50);
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    openModalBtns.forEach(btn => btn.addEventListener('click', openModal));

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('open')) closeModal();
    });

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = quoteForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending…';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                quoteForm.reset();
                closeModal();
                showToast('✅ Quote request sent! We\'ll reach out within 24 hours.');
            }, 1500);
        });
    }


    // smooth scroll to specs section
    const viewSpecsBtn = document.getElementById('view-specs-btn');
    const specsSection = document.getElementById('specs-section');

    if (viewSpecsBtn && specsSection) {
        viewSpecsBtn.addEventListener('click', () => {
            specsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }


    // image carousel
    const mainImage  = document.getElementById('main-image');
    const thumbEls   = document.querySelectorAll('.thumb');
    const leftArrow  = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const zoomResult = document.getElementById('zoom-result');

    if (mainImage && thumbEls.length > 0) {
        let currentIndex = 0;

        function highResSrc(thumbImg) {
            const src = thumbImg.src;
            if (src.includes('unsplash.com')) return src.replace('w=300', 'w=1200');
            return src;
        }

        function goTo(index) {
            if (index < 0) index = thumbEls.length - 1;
            if (index >= thumbEls.length) index = 0;
            currentIndex = index;

            thumbEls.forEach(t => t.classList.remove('active'));
            thumbEls[currentIndex].classList.add('active');

            const src = highResSrc(thumbEls[currentIndex].querySelector('img'));
            mainImage.src = src;
            if (zoomResult) {
                zoomResult.style.backgroundImage = `url('${src}')`;
            }
        }

        thumbEls.forEach((thumb, i) => {
            thumb.addEventListener('click', () => goTo(i));
        });

        if (leftArrow)  leftArrow.addEventListener('click',  () => goTo(currentIndex - 1));
        if (rightArrow) rightArrow.addEventListener('click', () => goTo(currentIndex + 1));

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft')  goTo(currentIndex - 1);
            if (e.key === 'ArrowRight') goTo(currentIndex + 1);
        });
    }


    // image zoom on hover - desktop only
    const imageContainer = document.getElementById('main-image-container');
    const zoomContainer  = document.getElementById('zoom-container');
    const lens           = document.getElementById('zoom-lens');

    if (imageContainer && zoomContainer && zoomResult && lens && mainImage) {
        const ZOOM_FACTOR = 2.5;
        zoomResult.style.backgroundSize = `${ZOOM_FACTOR * 100}% ${ZOOM_FACTOR * 100}%`;

        imageContainer.addEventListener('mouseenter', () => {
            if (window.innerWidth <= 1200) return;
            lens.style.display = 'block';
            zoomContainer.style.display = 'block';
            zoomResult.style.backgroundImage = `url('${mainImage.src}')`;
        });

        imageContainer.addEventListener('mouseleave', () => {
            lens.style.display = 'none';
            zoomContainer.style.display = 'none';
        });

        imageContainer.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 1200) return;

            const rect = imageContainer.getBoundingClientRect();
            let x = e.clientX - rect.left - lens.offsetWidth  / 2;
            let y = e.clientY - rect.top  - lens.offsetHeight / 2;

            // keep lens inside the image
            x = Math.max(0, Math.min(x, rect.width  - lens.offsetWidth));
            y = Math.max(0, Math.min(y, rect.height - lens.offsetHeight));

            lens.style.left = `${x}px`;
            lens.style.top  = `${y}px`;

            const xPct = (x / (rect.width  - lens.offsetWidth))  * 100;
            const yPct = (y / (rect.height - lens.offsetHeight)) * 100;
            zoomResult.style.backgroundPosition = `${xPct}% ${yPct}%`;
        });
    }


    // contact form submit
    const contactForm = document.getElementById('contact-page-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending…';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
                showToast('✅ Message sent! We\'ll get back to you shortly.');
            }, 1500);
        });
    }


    // toast notification
    function showToast(message, duration = 4000) {
        const existing = document.getElementById('app-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = 'app-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 32px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            background: #1A365D;
            color: white;
            padding: 14px 28px;
            border-radius: 50px;
            font-size: 15px;
            font-weight: 600;
            font-family: 'Inter', sans-serif;
            box-shadow: 0 10px 40px rgba(0,0,0,0.25);
            z-index: 9999;
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            white-space: nowrap;
        `;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                toast.style.opacity = '1';
                toast.style.transform = 'translateX(-50%) translateY(0)';
            });
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(() => toast.remove(), 400);
        }, duration);
    }

});
