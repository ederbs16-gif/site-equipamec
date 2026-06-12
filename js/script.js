// ================================================================
// NON-GSAP: DOM-ready code (navbar, forms, UI helpers)
// ================================================================
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
            const email    = (formData.get('email')    || '').toString().trim();
            const message  = (formData.get('message')  || '').toString().trim();
            if (!message && !fullName) return;
            const finalMessage = [
                message  ? message              : '(sem mensagem)',
                fullName ? `\nNome: ${fullName}` : '',
                email    ? `\nEmail: ${email}`   : ''
            ].filter(Boolean).join('');
            window.open(`https://wa.me/5512991654319?text=${encodeURIComponent(finalMessage)}`, '_blank');
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
    document.querySelectorAll('.lang-switcher .lang-btn, .lang-switcher .lang-link').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.lang-switcher .lang-btn, .lang-switcher .lang-link')
                    .forEach(s => s.classList.remove('active'));
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
        imagesLoaded(portfolioGrid, () => {
            const iso = new Isotope(portfolioGrid, {
                itemSelector: '.gallery-item',
                layoutMode: 'fitRows',
                percentPosition: true,
            });
            document.querySelectorAll('#img-filters .filter-btn').forEach(button => {
                button.addEventListener('click', () => {
                    iso.arrange({ filter: button.getAttribute('data-filter') });
                    document.querySelectorAll('#img-filters .filter-btn')
                            .forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                });
            });
        });
    }

    const mainGalleryGrid = document.querySelector('.gallery-grid');
    if (mainGalleryGrid && typeof Isotope !== 'undefined' && typeof imagesLoaded !== 'undefined') {
        imagesLoaded(mainGalleryGrid, () => {
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
            ripple.style.left  = `${event.clientX - rect.left  - size / 2}px`;
            ripple.style.top   = `${event.clientY - rect.top   - size / 2}px`;
            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
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

    // --- Parallax helpers ---
    const aboutParallax  = document.querySelector('.parallax-image');
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
        setTimeout(() => {
            pageLoader.style.opacity     = '0';
            pageLoader.style.visibility  = 'hidden';
            document.body.classList.remove('js-loading');
        }, 1200);
    }

});

// ================================================================
// GSAP: inicializa com retry até CDN estar disponível
// ================================================================
function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        setTimeout(initGSAP, 50);
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // ---- HERO ENTRANCE ----
    if (document.querySelector('.hero-bar')) {
        const heroTl = gsap.timeline({ delay: 1.4 });
        heroTl
            .from('.hero-bar',              { scaleY: 0, transformOrigin: 'top', duration: 0.4, ease: 'power2.out' })
            .from('.hero-eyebrow',          { opacity: 0, y: 16, duration: 0.45 }, '-=0.1')
            .from('.hero-title',            { opacity: 0, y: 40, duration: 0.7,  ease: 'power3.out' }, '-=0.2')
            .from('.hero-subtitle',         { opacity: 0, y: 20, duration: 0.5  }, '-=0.3')
            .from('.hero-buttons .btn',     { opacity: 0, y: 20, stagger: 0.15, duration: 0.4 }, '-=0.2')
            .from('.hero-scroll-indicator', { opacity: 0, duration: 0.5 }, '-=0.1');
    }

    // ---- SCROLL ANIMATIONS (slide-*) ----
    gsap.utils.toArray('[class*="slide-"]').forEach(el => {
        const dir = el.classList.contains('slide-right') ? { x: -50 }
                  : el.classList.contains('slide-left')  ? { x:  50 }
                  : { y: 50 };
        gsap.set(el, { opacity: 0, ...dir });
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                toggleActions: 'play none none none'
            },
            opacity: 1, x: 0, y: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // ---- CONTADORES DE STATS ----
    gsap.utils.toArray('.stat-value[data-target]').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const obj = { val: 0 };
        ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to(obj, {
                    val: target,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; }
                });
            }
        });
    });

    // ---- SERVICE CARDS ----
    if (document.querySelector('.services-grid')) {
        gsap.from('.service-card', {
            scrollTrigger: { trigger: '.services-grid', start: 'top 75%' },
            opacity: 0, y: 60, stagger: 0.2, duration: 0.7, ease: 'back.out(1.2)'
        });
    }

    // ---- IDENTITY PANELS ----
    if (document.querySelector('.identity-grid')) {
        gsap.from('.identity-panel', {
            scrollTrigger: { trigger: '.identity-grid', start: 'top 80%' },
            opacity: 0, y: 60, stagger: 0.2, duration: 0.7, ease: 'power2.out'
        });
    }

    // ---- FEATURE LIST ----
    if (document.querySelector('.feature-list')) {
        gsap.from('.feature-list li', {
            scrollTrigger: { trigger: '.feature-list', start: 'top 80%' },
            opacity: 0, x: -30, stagger: 0.12, duration: 0.5, ease: 'power2.out'
        });
    }

    // ---- PRODUTO CARDS ----
    if (document.querySelector('.produtos-destaque')) {
        gsap.from('.produto-card', {
            scrollTrigger: { trigger: '.produtos-destaque', start: 'top 80%' },
            opacity: 0, x: 60, stagger: 0.15, duration: 0.8, ease: 'power2.out'
        });
    }

    // ---- PARTNERS: forçar visibilidade (protege contra gsap.set vazando) ----
    document.querySelectorAll('.partners-track-wrapper, .partners-track, .partner-logo').forEach(el => {
        el.style.opacity    = '1';
        el.style.visibility = 'visible';
    });

    // ---- CARROSSEL DE PRODUTOS (dots + navegação) ----
    (function() {
        const track   = document.getElementById('produtosTrack');
        const dotsWrap = document.getElementById('produtosDots');
        if (!track || !dotsWrap) return;

        const cards = track.querySelectorAll('.produto-card');
        const total = cards.length;
        let current = 0;

        cards.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(dot);
        });

        function goTo(index) {
            current = Math.max(0, Math.min(index, total - 1));
            track.scrollTo({ left: current * cards[0].offsetWidth, behavior: 'smooth' });
            dotsWrap.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
        }

        document.querySelector('.prod-nav-prev')?.addEventListener('click', () => goTo(current - 1));
        document.querySelector('.prod-nav-next')?.addEventListener('click', () => goTo(current + 1));
    })();

    ScrollTrigger.refresh();
}

// Iniciar logo que o DOM estiver pronto (CDN pode ainda não ter carregado — initGSAP faz retry)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGSAP);
} else {
    initGSAP();
}
