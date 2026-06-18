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
            const email = (formData.get('email') || '').toString().trim();
            const message = (formData.get('message') || '').toString().trim();
            if (!message && !fullName) return;
            const finalMessage = [
                message ? message : '(sem mensagem)',
                fullName ? `\nNome: ${fullName}` : '',
                email ? `\nEmail: ${email}` : ''
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
            ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // --- IntersectionObserver para .gallery-item (portfolio apenas) ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px 0px -30px 0px', threshold: 0.01 });
        galleryItems.forEach(el => observer.observe(el));
    }

    // --- Parallax helpers ---
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
        setTimeout(() => {
            pageLoader.style.opacity = '0';
            pageLoader.style.visibility = 'hidden';
            document.body.classList.remove('js-loading');
        }, 1200);
    }

});

// ================================================================
// GSAP: executa após DOM + scripts carregados
// ================================================================
function runGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // ---- HERO CARROSSEL ----
    (function () {
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.hero-dot');
        if (!slides.length) return;

        let current = 0;
        let autoplayTimer = null;
        const INTERVAL = 7000;

        // Garantir visibilidade imediata do conteúdo hero
        document.querySelectorAll('.hero-eyebrow, .hero-title, .hero-subtitle, .hero-buttons, .hero-bar').forEach(el => {
            el.style.opacity = '1';
        });

        function safePlay(video) {
            if (!video) return;
            video.muted = true;
            const p = video.play();
            if (p !== undefined) {
                p.catch(() => {
                    const retry = () => {
                        video.play().catch(() => {});
                        document.removeEventListener('click', retry);
                        document.removeEventListener('touchstart', retry);
                    };
                    document.addEventListener('click', retry, { once: true });
                    document.addEventListener('touchstart', retry, { once: true });
                });
            }
        }

        // Iniciar vídeo do primeiro slide
        safePlay(slides[0].querySelector('.hero-video'));

        function goToSlide(index) {
            slides[current].classList.remove('active');
            dots[current].classList.remove('active');

            const prevVideo = slides[current].querySelector('.hero-video');
            if (prevVideo) prevVideo.pause();

            current = (index + slides.length) % slides.length;

            slides[current].classList.add('active');
            dots[current].classList.add('active');

            const nextVideo = slides[current].querySelector('.hero-video');
            safePlay(nextVideo);

            const content = slides[current].querySelector('.hero-slide-content');
            if (content && typeof gsap !== 'undefined') {
                gsap.timeline()
                    .fromTo(content.querySelector('.hero-bar'),
                        { scaleY: 0, transformOrigin: 'top' },
                        { scaleY: 1, opacity: 1, duration: 0.3, ease: 'power2.out' })
                    .fromTo(content.querySelector('.hero-eyebrow'),
                        { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35 }, '-=0.05')
                    .fromTo(content.querySelector('.hero-title'),
                        { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.15')
                    .fromTo(content.querySelector('.hero-subtitle'),
                        { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.25')
                    .fromTo(content.querySelectorAll('.hero-buttons .btn'),
                        { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.35 }, '-=0.2');
            }

            resetAutoplay();
        }

        function resetAutoplay() {
            clearInterval(autoplayTimer);
            autoplayTimer = setInterval(() => goToSlide(current + 1), INTERVAL);
        }

        // Animação inicial do primeiro slide
        const firstContent = slides[0].querySelector('.hero-slide-content');
        if (firstContent && typeof gsap !== 'undefined') {
            gsap.timeline({ delay: 1.3 })
                .fromTo(firstContent.querySelector('.hero-bar'),
                    { scaleY: 0, transformOrigin: 'top' },
                    { scaleY: 1, opacity: 1, duration: 0.4, ease: 'power2.out' })
                .fromTo(firstContent.querySelector('.hero-eyebrow'),
                    { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45 }, '-=0.1')
                .fromTo(firstContent.querySelector('.hero-title'),
                    { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.2')
                .fromTo(firstContent.querySelector('.hero-subtitle'),
                    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
                .fromTo(firstContent.querySelectorAll('.hero-buttons .btn'),
                    { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.4 }, '-=0.2');
        }

        // Fallback: forçar visibilidade após 3s se GSAP falhar
        setTimeout(() => {
            document.querySelectorAll(
                '.hero-slide.active .hero-eyebrow, .hero-slide.active .hero-title, .hero-slide.active .hero-subtitle, .hero-slide.active .hero-buttons'
            ).forEach(el => {
                if (window.getComputedStyle(el).opacity === '0') {
                    el.style.opacity = '1';
                    el.style.transform = 'none';
                }
            });
        }, 3000);

        // Navegação
        document.getElementById('heroPrev')?.addEventListener('click', () => goToSlide(current - 1));
        document.getElementById('heroNext')?.addEventListener('click', () => goToSlide(current + 1));
        dots.forEach(dot => {
            dot.addEventListener('click', () => goToSlide(parseInt(dot.getAttribute('data-goto'))));
        });

        // Pausar autoplay no hover
        const heroEl = document.querySelector('.hero');
        heroEl?.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
        heroEl?.addEventListener('mouseleave', () => resetAutoplay());

        // Fallback Chrome: tentar safePlay no primeiro clique/toque no hero
        const heroPlayFallback = () => {
            safePlay(slides[current].querySelector('.hero-video'));
            heroEl?.removeEventListener('click', heroPlayFallback);
            heroEl?.removeEventListener('touchstart', heroPlayFallback);
        };
        heroEl?.addEventListener('click', heroPlayFallback, { once: true });
        heroEl?.addEventListener('touchstart', heroPlayFallback, { once: true });

        resetAutoplay();
    })();

    // ---- SCROLL ANIMATIONS (slide-*) ----
    const slideEls = gsap.utils.toArray('[class*="slide-"]');
    console.log('Elementos slide encontrados:', slideEls.length);

    slideEls.forEach(el => {
        // Pular service cards, produto cards e carrossel de parceiros
        if (
            el.closest('.service-card') ||
            el.classList.contains('service-card') ||
            el.closest('.produto-card') ||
            el.closest('.partners-track-wrapper') ||
            el.closest('#parceiros') ||
            el.closest('.parceiros')
        ) return;

        const dir = el.classList.contains('slide-right') ? { x: -50 }
            : el.classList.contains('slide-left') ? { x: 50 }
                : { y: 50 };

        gsap.set(el, { opacity: 1, ...dir });
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top bottom-=50px',
                toggleActions: 'play none none none',
                once: true
            },
            opacity: 1, x: 0, y: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // ---- CONTADORES DE STATS ----
    const statEls = gsap.utils.toArray('.stat-value[data-target]');
    console.log('Stat elements encontrados:', statEls.length);

    statEls.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const obj = { val: 0 };
        ScrollTrigger.create({
            trigger: el,
            start: 'top bottom-=50px',
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
    if (document.querySelector('.service-card')) {
        gsap.set('.service-card', { opacity: 1, y: 0 });
        ScrollTrigger.create({
            trigger: '.services-grid',
            start: 'top bottom-=50px',
            once: true,
            onEnter: () => {
                gsap.fromTo('.service-card',
                    { opacity: 0, y: 60 },
                    { opacity: 1, y: 0, stagger: 0.2, duration: 0.7, ease: 'back.out(1.2)' }
                );
            }
        });
    }

    // ---- IDENTITY PANELS ----
    if (document.querySelector('.identity-grid')) {
        gsap.set('.identity-panel', { opacity: 1, y: 0 });
        ScrollTrigger.create({
            trigger: '.identity-grid',
            start: 'top 80%',
            once: true,
            onEnter: () => {
                gsap.fromTo('.identity-panel',
                    { opacity: 0, y: 60 },
                    { opacity: 1, y: 0, stagger: 0.2, duration: 0.7, ease: 'power2.out' }
                );
            }
        });
    }

    // ---- FEATURE LIST ----
    if (document.querySelector('.feature-list')) {
        gsap.set('.feature-list li', { opacity: 1, x: 0 });
        ScrollTrigger.create({
            trigger: '.feature-list',
            start: 'top 80%',
            once: true,
            onEnter: () => {
                gsap.fromTo('.feature-list li',
                    { opacity: 0, x: -30 },
                    { opacity: 1, x: 0, stagger: 0.12, duration: 0.5, ease: 'power2.out' }
                );
            }
        });
    }

    // ---- PRODUTO CARDS ----
    if (document.querySelector('.produto-card')) {
        gsap.set('.produto-card', { opacity: 1, x: 0 });
        ScrollTrigger.create({
            trigger: '.produtos-destaque',
            start: 'top bottom-=50px',
            once: true,
            onEnter: () => {
                gsap.fromTo('.produto-card',
                    { opacity: 0, x: 60 },
                    { opacity: 1, x: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' }
                );
            }
        });
    }

    // ---- PARTNERS: proteger de gsap.set vazando para elementos de parceiros ----
    document.querySelectorAll(
        '.parceiros, #parceiros, .partners-section, .partners-track-wrapper, .partners-track'
    ).forEach(el => {
        el.style.cssText += '; opacity:1 !important; visibility:visible !important;';
        gsap.set(el, { clearProps: 'all' });
    });

    // ---- FADE-IN (via ScrollTrigger; CSS opacity:0 é o estado inicial) ----
    document.querySelectorAll('.fade-in').forEach(el => {
        if (el.closest('.partners-track-wrapper') || el.closest('#parceiros')) return;
        ScrollTrigger.create({
            trigger: el,
            start: 'top bottom-=30px',
            once: true,
            onEnter: () => {
                gsap.fromTo(el,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
                );
            }
        });
    });

    // ---- CARROSSEL DE PRODUTOS (dots + navegação) ----
    (function () {
        const track = document.getElementById('produtosTrack');
        const dotsWrap = document.getElementById('produtosDots');
        if (!track || !dotsWrap) return;

        const cards = track.querySelectorAll('.produto-card');
        let current = 0;

        cards.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(dot);
        });

        function goTo(index) {
            current = Math.max(0, Math.min(index, cards.length - 1));
            track.scrollTo({ left: current * cards[0].offsetWidth, behavior: 'smooth' });
            dotsWrap.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
        }

        document.querySelector('.prod-nav-prev')?.addEventListener('click', () => goTo(current - 1));
        document.querySelector('.prod-nav-next')?.addEventListener('click', () => goTo(current + 1));
    })();

    ScrollTrigger.refresh();
    console.log('ScrollTriggers registrados:', ScrollTrigger.getAll().length);
}

// Executar quando DOM estiver pronto E scripts carregados
if (document.readyState === 'complete') {
    runGSAPAnimations();
} else {
    window.addEventListener('load', runGSAPAnimations);
}
