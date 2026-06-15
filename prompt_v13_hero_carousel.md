# Prompt v13 — Hero Carrossel: 3 slides com vídeo

## Contexto
Substituir o hero estático atual por um carrossel de 3 slides fullscreen.
Cada slide tem vídeo de fundo diferente, textos próprios e troca automática a cada 7s.
Navegação por dots e setas. Transição suave entre slides (crossfade).

Stack: HTML/CSS/JS puro + GSAP. Sem bibliotecas externas de carrossel.

---

## Arquivos de vídeo
Colocar em assets/videos/ (já existem hero_equipamec.mp4 e .webm):
- hero_tornearia.mp4 + hero_tornearia.webm (slide 2)
- hero_caldeiraria.mp4 + hero_caldeiraria.webm (slide 3)

---

## HTML — substituir a seção .hero atual em index.html por:

```html
<section class="hero" id="home">

  <!-- SLIDES -->
  <div class="hero-slides" id="heroSlides">

    <!-- Slide 1: Mergulho / Limpeza de Casco -->
    <div class="hero-slide active" data-slide="0">
      <div class="hero-video-wrap">
        <video class="hero-video" autoplay muted loop playsinline preload="auto">
          <source src="assets/videos/hero_equipamec.webm" type="video/webm">
          <source src="assets/videos/hero_equipamec.mp4" type="video/mp4">
        </video>
        <div class="hero-overlay"></div>
        <div class="hero-watermark-cover"></div>
      </div>
      <div class="hero-slide-content">
        <div class="hero-bar"></div>
        <span class="hero-eyebrow">Tecnologia Naval & Offshore</span>
        <h1 class="hero-title">Potência Hidráulica para<br><em>Onde Ninguém Chega.</em></h1>
        <p class="hero-subtitle">Equipamentos navais e offshore projetados e fabricados em Caraguatatuba. 15 anos movendo operações onde a falha não é opção.</p>
        <div class="hero-buttons">
          <a href="#produtos-destaque" class="btn btn-primary">Nossos Produtos</a>
          <a href="#contato" class="btn btn-outline">Falar com Engenharia</a>
        </div>
      </div>
    </div>

    <!-- Slide 2: Tornearia -->
    <div class="hero-slide" data-slide="1">
      <div class="hero-video-wrap">
        <video class="hero-video" muted loop playsinline preload="none">
          <source src="assets/videos/hero_tornearia.webm" type="video/webm">
          <source src="assets/videos/hero_tornearia.mp4" type="video/mp4">
        </video>
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-slide-content">
        <div class="hero-bar"></div>
        <span class="hero-eyebrow">Tornearia & Usinagem</span>
        <h1 class="hero-title">Precisão no Detalhe,<br><em>Confiabilidade no Campo.</em></h1>
        <p class="hero-subtitle">Peças e componentes usinados com tolerâncias industriais para aplicação naval, offshore e portuária.</p>
        <div class="hero-buttons">
          <a href="#produtos-destaque" class="btn btn-primary">Ver Produtos</a>
          <a href="#contato" class="btn btn-outline">Solicitar Orçamento</a>
        </div>
      </div>
    </div>

    <!-- Slide 3: Caldeiraria -->
    <div class="hero-slide" data-slide="2">
      <div class="hero-video-wrap">
        <video class="hero-video" muted loop playsinline preload="none">
          <source src="assets/videos/hero_caldeiraria.webm" type="video/webm">
          <source src="assets/videos/hero_caldeiraria.mp4" type="video/mp4">
        </video>
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-slide-content">
        <div class="hero-bar"></div>
        <span class="hero-eyebrow">Caldeiraria & Retrofit</span>
        <h1 class="hero-title">Estruturas que Sustentam<br><em>Operações Críticas.</em></h1>
        <p class="hero-subtitle">Fabricação de estruturas metálicas sob medida e retrofit de geradores navais. Da especificação à entrega, com rastreabilidade técnica completa.</p>
        <div class="hero-buttons">
          <a href="#produtos-destaque" class="btn btn-primary">Ver Projetos</a>
          <a href="#contato" class="btn btn-outline">Falar com Engenharia</a>
        </div>
      </div>
    </div>

  </div><!-- /hero-slides -->

  <!-- Navegação: dots -->
  <div class="hero-dots" id="heroDots">
    <button class="hero-dot active" data-goto="0" aria-label="Slide 1"></button>
    <button class="hero-dot" data-goto="1" aria-label="Slide 2"></button>
    <button class="hero-dot" data-goto="2" aria-label="Slide 3"></button>
  </div>

  <!-- Navegação: setas -->
  <button class="hero-nav hero-nav-prev" id="heroPrev" aria-label="Slide anterior">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  </button>
  <button class="hero-nav hero-nav-next" id="heroNext" aria-label="Próximo slide">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  </button>

  <!-- Scroll indicator -->
  <div class="hero-scroll-indicator">
    <span></span>
  </div>

</section>
```

---

## CSS — adicionar após os estilos de hero existentes:

```css
/* ===== HERO CARROSSEL ===== */
.hero {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.hero-slides {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
}

.hero-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 1s ease;
  pointer-events: none;
}

.hero-slide.active {
  opacity: 1;
  pointer-events: auto;
}

.hero-video-wrap {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

@media (max-width: 768px) {
  .hero-video {
    object-position: 60% center;
  }
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(5, 20, 15, 0.82) 0%,
    rgba(5, 20, 15, 0.50) 60%,
    rgba(5, 20, 15, 0.25) 100%
  );
}

.hero-watermark-cover {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 220px;
  height: 60px;
  background: linear-gradient(to top left, rgba(5,20,15,0.95) 0%, transparent 100%);
}

.hero-slide-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding: 120px 6vw 80px;
  max-width: 760px;
}

.hero-bar {
  width: 4px;
  height: 52px;
  background: var(--color-accent-orange);
  border-radius: 2px;
  margin-bottom: 24px;
  transform-origin: top;
  opacity: 1;
}

.hero-eyebrow {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent-orange);
  margin-bottom: 16px;
  opacity: 1;
}

.hero-title {
  font-size: clamp(2.6rem, 5.5vw, 4.8rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
  opacity: 1;
}

.hero-title em {
  color: var(--color-accent-orange);
  font-style: normal;
}

.hero-subtitle {
  font-size: 1rem;
  color: rgba(255,255,255,0.65);
  line-height: 1.7;
  max-width: 520px;
  margin-bottom: 40px;
  opacity: 1;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  opacity: 1;
}

/* Dots */
.hero-dots {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  gap: 10px;
}

.hero-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.3);
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  padding: 0;
}

.hero-dot.active {
  background: var(--color-accent-orange);
  transform: scale(1.4);
}

/* Setas */
.hero-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 48px;
  height: 48px;
  background: rgba(5,20,15,0.5);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: background 0.2s ease;
  border-radius: 0;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}

.hero-nav:hover {
  background: var(--color-accent-orange);
  border-color: var(--color-accent-orange);
}

.hero-nav svg { width: 20px; height: 20px; }
.hero-nav-prev { left: 24px; }
.hero-nav-next { right: 24px; }

@media (max-width: 768px) {
  .hero-nav { display: none; }
  .hero-slide-content { padding: 100px 24px 80px; }
  .hero-title { font-size: clamp(2rem, 8vw, 3rem); }
}

/* Scroll indicator */
.hero-scroll-indicator {
  position: absolute;
  bottom: 32px;
  right: 40px;
  z-index: 10;
}

.hero-scroll-indicator span {
  display: block;
  width: 24px;
  height: 38px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 12px;
  position: relative;
}

.hero-scroll-indicator span::before {
  content: '';
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 8px;
  background: var(--color-accent-orange);
  border-radius: 2px;
  animation: scroll-dot 2s ease-in-out infinite;
}

@keyframes scroll-dot {
  0% { opacity: 1; top: 6px; }
  100% { opacity: 0; top: 20px; }
}
```

---

## JS — substituir o bloco do hero em runGSAPAnimations() e adicionar lógica do carrossel:

No js/script.js, substituir o bloco hero entrance por:

```js
// ---- HERO CARROSSEL ----
(function() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let current = 0;
  let autoplayTimer = null;
  const INTERVAL = 7000;

  // Garantir visibilidade de todo conteúdo do hero
  document.querySelectorAll('.hero-eyebrow, .hero-title, .hero-subtitle, .hero-buttons, .hero-bar').forEach(el => {
    el.style.opacity = '1';
  });

  function goToSlide(index) {
    // Desativar slide atual
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');

    // Pausar vídeo do slide anterior
    const prevVideo = slides[current].querySelector('.hero-video');
    if (prevVideo) prevVideo.pause();

    current = (index + slides.length) % slides.length;

    // Ativar novo slide
    slides[current].classList.add('active');
    dots[current].classList.add('active');

    // Iniciar vídeo do novo slide
    const nextVideo = slides[current].querySelector('.hero-video');
    if (nextVideo) {
      nextVideo.play().catch(() => {});
    }

    // Animar conteúdo do novo slide com GSAP
    const content = slides[current].querySelector('.hero-slide-content');
    if (content && typeof gsap !== 'undefined') {
      const tl = gsap.timeline();
      tl.fromTo(content.querySelector('.hero-bar'),
          { scaleY: 0, transformOrigin: 'top' },
          { scaleY: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
        )
        .fromTo(content.querySelector('.hero-eyebrow'),
          { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35 }, '-=0.05'
        )
        .fromTo(content.querySelector('.hero-title'),
          { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.15'
        )
        .fromTo(content.querySelector('.hero-subtitle'),
          { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.25'
        )
        .fromTo(content.querySelectorAll('.hero-buttons .btn'),
          { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.35 }, '-=0.2'
        );
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
    const tl = gsap.timeline({ delay: 1.3 });
    tl.fromTo(firstContent.querySelector('.hero-bar'),
        { scaleY: 0, transformOrigin: 'top' },
        { scaleY: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
      .fromTo(firstContent.querySelector('.hero-eyebrow'),
        { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45 }, '-=0.1'
      )
      .fromTo(firstContent.querySelector('.hero-title'),
        { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.2'
      )
      .fromTo(firstContent.querySelector('.hero-subtitle'),
        { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3'
      )
      .fromTo(firstContent.querySelectorAll('.hero-buttons .btn'),
        { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.4 }, '-=0.2'
      );
  }

  // Fallback: garantir visibilidade após 3s
  setTimeout(() => {
    document.querySelectorAll('.hero-slide.active .hero-eyebrow, .hero-slide.active .hero-title, .hero-slide.active .hero-subtitle, .hero-slide.active .hero-buttons').forEach(el => {
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

  // Parar autoplay no hover
  const heroEl = document.querySelector('.hero');
  heroEl?.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
  heroEl?.addEventListener('mouseleave', () => resetAutoplay());

  // Iniciar autoplay
  resetAutoplay();
})();
```

---

## Aplicar em EN e ES também

Após aplicar no index.html, replicar o mesmo HTML do carrossel em:
- en/index.html (traduzir textos dos slides 2 e 3)
- es/index.html (traduzir textos dos slides 2 e 3)

Traduções slide 2 (Tornearia):
- EN eyebrow: "Machining & Turning"
- EN title: "Precision in Detail,<br><em>Reliability in the Field.</em>"
- EN subtitle: "Machined parts and components with industrial tolerances for naval, offshore and port applications."
- ES eyebrow: "Tornería & Mecanizado"
- ES title: "Precisión en el Detalle,<br><em>Confiabilidad en el Campo.</em>"
- ES subtitle: "Piezas y componentes mecanizados con tolerancias industriales para aplicaciones navales, offshore y portuarias."

Traduções slide 3 (Caldeiraria):
- EN eyebrow: "Boilermaking & Retrofit"
- EN title: "Structures that Sustain<br><em>Critical Operations.</em>"
- EN subtitle: "Custom metal structures and naval generator retrofits. From specification to delivery, with full technical traceability."
- ES eyebrow: "Calderería & Retrofit"
- ES title: "Estructuras que Sostienen<br><em>Operaciones Críticas.</em>"
- ES subtitle: "Fabricación de estructuras metálicas a medida y retrofit de generadores navales. De la especificación a la entrega, con trazabilidad técnica completa."

---

## Ordem de execução
1. Copiar hero_tornearia.mp4, hero_tornearia.webm, hero_caldeiraria.mp4, hero_caldeiraria.webm para assets/videos/
2. CSS: adicionar/substituir estilos do hero
3. HTML index.html: substituir seção .hero pelo carrossel
4. JS script.js: substituir bloco hero entrance pelo carrossel JS
5. HTML en/index.html e es/index.html: replicar com traduções
6. Commit: "feat: hero carrossel 3 slides mergulho/tornearia/caldeiraria"
