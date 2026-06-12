document.addEventListener('DOMContentLoaded', () => {
    // --- Efeito de Scroll na Navbar ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            handleParallax();
        });
    }

    // --- Toggle do Menu Hambúrguer (Mobile) ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = navMenu ? navMenu.querySelector('.nav-links') : null;

    if (hamburger && navMenu && navLinks) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Fecha o menu ao clicar em um link (útil em mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // --- Contato: envio via WhatsApp (fallback sem backend) ---
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
            const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`;
            window.open(whatsappUrl, '_blank');
            contactForm.reset();

            // Feedback visual de sucesso
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

    // --- Seletor de Idioma (visual) ---
    const langSwitchers = document.querySelectorAll('.lang-switcher .lang-link');
    langSwitchers.forEach(switcher => {
        switcher.addEventListener('click', (e) => {
            // Permite navegação normal entre páginas (pt/en/es)
            langSwitchers.forEach(s => s.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });


    // --- Inicialização do GLightbox (Galeria de Imagens/Vídeos) ---
    // Verifica se a biblioteca GLightbox está carregada antes de inicializar
    if (typeof GLightbox !== 'undefined') {
        GLightbox({
            selector: '.glightbox' // Seleciona todos os elementos com a classe 'glightbox'
        });
    }

    // --- Inicialização do Isotope para o Portfólio e Galeria ---
    // Para portfolio.html (com ID 'portfolio-grid') - usado principalmente para filtragem
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (portfolioGrid && typeof Isotope !== 'undefined' && typeof imagesLoaded !== 'undefined') {
        imagesLoaded(portfolioGrid, function () {
            const iso = new Isotope(portfolioGrid, {
                itemSelector: '.gallery-item',
                layoutMode: 'fitRows', // 'fitRows' é adequado para filtragem em um grid CSS
                percentPosition: true,
            });

            const filterBtns = document.querySelectorAll('#img-filters .filter-btn');
            filterBtns.forEach(button => {
                button.addEventListener('click', () => {
                    const filterValue = button.getAttribute('data-filter');
                    iso.arrange({ filter: filterValue });
                    // Atualiza a classe 'active' nos botões de filtro
                    filterBtns.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                });
            });
        });
    }

    // Para index.html (com classe 'gallery-grid') - usado para layout masonry e filtragem
    const mainGalleryGrid = document.querySelector('.gallery-grid');
    if (mainGalleryGrid && typeof Isotope !== 'undefined' && typeof imagesLoaded !== 'undefined') {
        imagesLoaded(mainGalleryGrid, function () {
            new Isotope(mainGalleryGrid, {
                itemSelector: '.gallery-item',
                layoutMode: 'masonry', // Layout em alvenaria
                percentPosition: true,
                masonry: {
                    columnWidth: '.grid-sizer' // Define a largura da coluna para o layout masonry
                }
            });
        });
    }

    // --- Duplicação da Faixa de Marquee para Scroll Infinito ---
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
        marqueeTrack.innerHTML += marqueeTrack.innerHTML; // Duplica o conteúdo para criar um loop contínuo
    }

    // Duplicação para o carrossel de parceiros (usa classe partners-track)
    const partnersTrack = document.querySelector('.partners-track');
    if (partnersTrack) {
        // O HTML já tem a duplicação embutida (20 logos = 10 originais + 10 cópias)
        // Certificar que a animação CSS cuida do loop via partners-scroll keyframe
    }

    // --- Animações de Scroll com IntersectionObserver ---
    const animateElements = document.querySelectorAll('.slide-up, .slide-right, .slide-left, .fade-in, .gallery-item');
    const observerOptions = {
        root: null, // O viewport é o elemento raiz
        rootMargin: '0px',
        threshold: 0.1 // O elemento se torna visível quando 10% dele está no viewport (ajustado para 0.1)
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Adiciona a classe 'visible' para ativar a animação
                observer.unobserve(entry.target); // Para de observar o elemento depois que ele se torna visível
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element); // Começa a observar cada elemento animado
    });

    // --- Ripple effect for buttons ---
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - (size / 2);
            const y = event.clientY - rect.top - (size / 2);

            ripple.className = 'ripple';
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            button.appendChild(ripple);

            window.setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // --- Stats counters ---
    const statsSection = document.querySelector('#stats');
    const statItems = document.querySelectorAll('.stat-item');
    if (statsSection && statItems.length) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statItems.forEach(item => animateStatCount(item));
                    observer.unobserve(entry.target);
                }
            });
        }, { root: null, threshold: 0.25 });
        statsObserver.observe(statsSection);
    }

    function animateStatCount(item) {
        const valueEl = item.querySelector('.stat-value');
        const target = Number(item.dataset.target);
        if (!valueEl || Number.isNaN(target)) return;

        const duration = 2000;
        const easeOut = t => 1 - Math.pow(1 - t, 3);
        let start = null;

        requestAnimationFrame(function step(timestamp) {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            valueEl.textContent = Math.ceil(easeOut(progress) * target);
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        });
    }

    // --- Parallax helpers ---
    const heroVideo = document.querySelector('.hero-video');
    const aboutParallax = document.querySelector('.parallax-image');
    const partnerSection = document.querySelector('.parceiros');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function handleParallax() {
        if (prefersReducedMotion) return;

        if (heroVideo) {
            const offset = Math.min(window.scrollY * 0.2, heroVideo.clientHeight * 0.3);
            heroVideo.style.transform = `translateY(${offset}px)`;
        }

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

    // --- Page loader fadeout ---
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
        document.body.classList.add('js-loading');
        window.setTimeout(() => {
            pageLoader.style.opacity = '0';
            pageLoader.style.visibility = 'hidden';
            document.body.classList.remove('js-loading');
        }, 1200);
    }
});
