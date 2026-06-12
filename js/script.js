document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 80);
            handleParallax();
        });
    }

    // --- Hamburger menu ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = navMenu ? navMenu.querySelector('.nav-links') : null;

    if (hamburger && navMenu && navLinks) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // --- Contato via WhatsApp ---
    const contactForm = document.getElementById('main-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const fullName = (formData.get('fullName') || '').toString().trim();
            const email = (formData.get('email') || '').toString().trim();
            const message = (formData.get('message') || '').toString().trim();
            if (!message && !fullName) return;
            const finalMessage = [
                message ? message : '(sem mensagem)',
                fullName ? `\nNome: ${fullName}` : '',
                email ? `\nEmail: ${email}` : ''
            ].filter(Boolean).join('');
            const phone = '5512991654319';
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`, '_blank');
            contactForm.reset();
            const btn = contactForm.querySelector('button[type="submit"]');
            if (btn) {
                const original = btn.textContent;
                btn.textContent = 'Mensagem enviada!';
                btn.disabled = true;
                btn.style.backgroundColor = '#2d7a5f';
                setTimeout(() => {
                    btn.textContent = original;
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                }, 4000);
            }
        });
    }

    // --- Seletor de idioma ---
    const langSwitchers = document.querySelectorAll('.lang-switcher .lang-link');
    langSwitchers.forEach(switcher => {
        switcher.addEventListener('click', (e) => {
            langSwitchers.forEach(s => s.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });

    // --- GLightbox ---
    if (typeof GLightbox !== 'undefined') {
        GLightbox({ selector: '.glightbox' });
    }

    // --- Isotope (portfolio + gallery) ---
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (portfolioGrid && typeof Isotope !== 'undefined' && typeof imagesLoaded !== 'undefined') {
        imagesLoaded(portfolioGrid, function () {
            const iso = new Isotope(portfolioGrid, {
                itemSelector: '.gallery-item',
                layoutMode: 'fitRows',
                percentPosition: true,
            });
            const filterBtns = document.querySelectorAll('#img-filters .filter-btn');
            filterBtns.forEach(button => {
                button.addEventListener('click', () => {
                    const filterValue = button.getAttribute('data-filter');
                    iso.arrange({ filter: filterValue });
                    filterBtns.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                });
            });
        });
    }

    const mainGalleryGrid = document.querySelector('.gallery-grid');
    if (mainGalleryGrid && typeof Isotope !== 'undefined' && typeof imagesLoaded !== 'undefined') {
        imagesLoaded(mainGalleryGrid, function () {
            new Isotope(mainGalleryGrid, {
                itemSelector: '.gallery-item',
                layoutMode: 'masonry',
                percentPosition: true,
                masonry: { columnWidth: '.grid-sizer' }
            });
        });
    }

    // --- Marquee duplication ---
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
        marqueeTrack.innerHTML += marqueeTrack.innerHTML;
    }

    // --- Ripple effect ---
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            ripple.className = 'ripple';
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
            button.appendChild(ripple);
            window.setTimeout(() => ripple.remove(), 600);
        });
    });

    // --- IntersectionObserver para .fade-in e .gallery-item ---
    const fadeElements = document.querySelectorAll('.fade-in, .gallery-item');
    if (fadeElements.length) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px', threshold: 0.1 });
        fadeElements.forEach(el => observer.observe(el));
    }

    // --- Stats counter ---
    function animateStatCount(item) {
        const valueEl = item.querySelector('.stat-value');
        const target = Number(item.dataset.target);
        const suffix = item.dataset.suffix || '';
        if (!valueEl || Number.isNaN(target)) return;
        const duration = 2000;
        const easeOut = t => 1 - Math.pow(1 - t, 3);
        let start = null;
        requestAnimationFrame(function step(timestamp) {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            valueEl.textContent = Math.ceil(easeOut(progress) * target) + (progress === 1 ? suffix : '');
            if (progress < 1) requestAnimationFrame(step);
        });
    }

    // --- Parallax helpers (mantidos para compatibilidade) ---
    const aboutParallax = document.querySelector('.parallax-image');
    const partnerSection = document.querySelector('.parceiros');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function handleParallax() {
        if (prefersReducedMotion) return;
        if (aboutParallax) {
            const rect = aboutParallax.getBoundingClientRect();
            const offset = -Math.min(Math.max((window.innerHeight - rect.top) * 0.03, 0), 20);
            aboutParallax.style.setProperty('--parallax-offset', `${offset}px`);
        }
        if (partnerSection) {
            const rect = partnerSection.getBoundingClientRect();
            const offset = Math.max(Math.min((rect.top - window.innerHeight * 0.5) * 0.04, 20), -20);
            partnerSection.style.setProperty('--partners-parallax', `${offset}px`);
        }
    }
    handleParallax();

    // --- Page loader ---
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
        document.body.classList.add('js-loading');
        window.setTimeout(() => {
            pageLoader.style.opacity = '0';
            pageLoader.style.visibility = 'hidden';
            document.body.classList.remove('js-loading');
        }, 1200);
    }

    // ================================================================
    // GSAP ANIMATIONS (prefers-reduced-motion safe)
    // ================================================================
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {

        // --- Hero entrance (dispara após o page loader) ---
        const heroBar = document.querySelector('.hero-bar');
        if (heroBar) {
            const heroTl = gsap.timeline({ delay: 1.3 });
            heroTl
                .from('.hero-bar',      { scaleY: 0, duration: 0.4, ease: 'power2.out' })
                .from('.hero-eyebrow',  { opacity: 0, y: 20, duration: 0.5 }, '-=0.1')
                .from('.hero-title',    { opacity: 0, y: 40, duration: 0.7, ease: 'power3.out' }, '-=0.2')
                .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
                .from('.hero-buttons .btn', { opacity: 0, y: 20, stagger: 0.15, duration: 0.4 }, '-=0.2')
                .from('.hero-image-wrap', { opacity: 0, x: 60, duration: 0.8, ease: 'power2.out' }, '-=0.6');
        }

        // --- ScrollTrigger: slide-up ---
        gsap.utils.toArray('.slide-up').forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, y: 50 },
                {
                    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
                    opacity: 1, y: 0, duration: 0.8, ease: 'power2.out'
                }
            );
        });

        // --- ScrollTrigger: slide-right (entra da esquerda) ---
        gsap.utils.toArray('.slide-right').forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, x: -50 },
                {
                    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
                    opacity: 1, x: 0, duration: 0.8, ease: 'power2.out'
                }
            );
        });

        // --- ScrollTrigger: slide-left (entra da direita) ---
        gsap.utils.toArray('.slide-left').forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, x: 50 },
                {
                    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
                    opacity: 1, x: 0, duration: 0.8, ease: 'power2.out'
                }
            );
        });

        // --- Sobre: identity-panels em stagger ---
        if (document.querySelector('.identity-grid')) {
            gsap.from('.identity-panel', {
                scrollTrigger: { trigger: '.identity-grid', start: 'top 80%' },
                opacity: 0, y: 60, stagger: 0.2, duration: 0.7, ease: 'power2.out'
            });
        }

        // --- Sobre: feature-list items em stagger ---
        if (document.querySelector('.feature-list')) {
            gsap.from('.feature-list li', {
                scrollTrigger: { trigger: '.feature-list', start: 'top 80%' },
                opacity: 0, x: -30, stagger: 0.12, duration: 0.5, ease: 'power2.out'
            });
        }

        // --- Serviços: service-cards em stagger ---
        if (document.querySelector('.services-grid')) {
            gsap.from('.service-card', {
                scrollTrigger: { trigger: '.services-grid', start: 'top 75%' },
                opacity: 0, y: 60, stagger: 0.2, duration: 0.7, ease: 'back.out(1.2)'
            });
        }

        // --- Parceiros: entrada da seção ---
        if (document.querySelector('#parceiros')) {
            gsap.from('.partners-track-wrapper', {
                scrollTrigger: { trigger: '#parceiros', start: 'top 85%' },
                opacity: 0, y: 30, duration: 0.8, ease: 'power2.out'
            });
        }

        // --- Stats counter via ScrollTrigger ---
        if (document.querySelector('#stats')) {
            ScrollTrigger.create({
                trigger: '#stats',
                start: 'top 75%',
                once: true,
                onEnter: () => {
                    document.querySelectorAll('.stat-item').forEach(item => animateStatCount(item));
                }
            });
        }
    });

});
