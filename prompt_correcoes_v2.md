# Prompt — Correções e Hero com Vídeo

## Contexto
Site estático da Equipamec. Stack: HTML5, CSS3, Vanilla JS + GSAP 3.12.5 com ScrollTrigger.
Todas as correções abaixo devem manter paridade multilíngue (pt / en / es).

Antes de qualquer alteração, ler os arquivos de skill em:
- .claude/skills/ui-ux-pro-max/SKILL.md
- .claude/skills/ (redesign-existing-projects, design-taste-frontend)

---

## Correção 1 — Hero: substituir split-layout por hero com vídeo de fundo

Substituir o hero atual por hero fullscreen com vídeo de fundo.

### Estrutura HTML:
```html
<section class="hero" id="home">
  <div class="hero-video-wrap">
    <video class="hero-video" autoplay muted loop playsinline preload="auto">
      <source src="assets/videos/hero_equipamec.webm" type="video/webm">
      <source src="assets/videos/hero_equipamec.mp4" type="video/mp4">
    </video>
    <!-- Overlay escuro geral -->
    <div class="hero-overlay"></div>
    <!-- Overlay extra canto inferior direito para cobrir watermark -->
    <div class="hero-watermark-cover"></div>
  </div>

  <div class="hero-content container">
    <div class="hero-bar"></div>
    <span class="hero-eyebrow">Tecnologia Naval & Offshore</span>
    <h1 class="hero-title">
      Potência Hidráulica para<br>
      <em>Onde Ninguém Chega.</em>
    </h1>
    <p class="hero-subtitle">
      Equipamentos navais e offshore projetados e fabricados em Caraguatatuba.
      12 anos movendo operações onde a falha não é opção.
    </p>
    <div class="hero-buttons">
      <a href="#produtos" class="btn btn-primary">Nossos Serviços</a>
      <a href="#contato" class="btn btn-outline">Conheça a Equipamec</a>
    </div>
  </div>

  <!-- Scroll indicator -->
  <div class="hero-scroll-indicator">
    <span></span>
  </div>
</section>
```

### CSS:
```css
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
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

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(5, 20, 15, 0.85) 0%,
    rgba(5, 20, 15, 0.55) 60%,
    rgba(5, 20, 15, 0.3) 100%
  );
}

/* Cobre watermark KlingAI no canto inferior direito */
.hero-watermark-cover {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 220px;
  height: 60px;
  background: linear-gradient(
    to top left,
    rgba(5, 20, 15, 0.95) 0%,
    transparent 100%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  padding-top: 120px;
  padding-bottom: 80px;
  max-width: 720px;
}

.hero-bar {
  width: 4px;
  height: 52px;
  background: var(--color-accent-orange);
  border-radius: 2px;
  margin-bottom: 24px;
  transform-origin: top;
}

.hero-eyebrow {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent-orange);
  margin-bottom: 16px;
}

.hero-title {
  font-size: clamp(2.8rem, 6vw, 5rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
}

.hero-title em {
  color: var(--color-accent-orange);
  font-style: normal;
}

.hero-subtitle {
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.7;
  max-width: 520px;
  margin-bottom: 40px;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

/* Scroll indicator animado */
.hero-scroll-indicator {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
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

### GSAP — animação de entrada do hero (substituir qualquer heroTl existente):
```js
window.addEventListener('load', () => {
  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance
  const heroTl = gsap.timeline({ delay: 1.4 });
  heroTl
    .from('.hero-bar', { scaleY: 0, transformOrigin: 'top', duration: 0.4, ease: 'power2.out' })
    .from('.hero-eyebrow', { opacity: 0, y: 16, duration: 0.45 }, '-=0.1')
    .from('.hero-title', { opacity: 0, y: 40, duration: 0.7, ease: 'power3.out' }, '-=0.2')
    .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
    .from('.hero-buttons .btn', { opacity: 0, y: 20, stagger: 0.15, duration: 0.4 }, '-=0.2')
    .from('.hero-scroll-indicator', { opacity: 0, duration: 0.5 }, '-=0.1');
```

---

## Correção 2 — GSAP ScrollTrigger: consertar seções invisíveis

Todo o código GSAP de scroll DEVE estar dentro do mesmo `window.addEventListener('load', () => { ... })` do hero, após o heroTl.

Padrão a aplicar em TODOS os blocos com .slide-up, .slide-right, .slide-left:

```js
  // Garantir que elementos sejam visíveis por padrão via CSS antes do JS rodar
  // No CSS: .slide-up, .slide-right, .slide-left { opacity: 1; transform: none; }
  // GSAP usa gsap.set() para ocultar ANTES de animar

  gsap.utils.toArray('[class*="slide-"]').forEach(el => {
    const dir = el.classList.contains('slide-right') ? { x: -50 }
              : el.classList.contains('slide-left') ? { x: 50 }
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

  ScrollTrigger.refresh();
}); // fechar o window load
```

No CSS, remover qualquer `opacity: 0` ou `transform` das classes .slide-up, .slide-right, .slide-left — essas propriedades agora são controladas 100% pelo GSAP via gsap.set().

---

## Correção 3 — Contadores de stats

Substituir o animateStatCount atual por versão controlada pelo ScrollTrigger:

```js
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
        onUpdate: () => {
          el.textContent = Math.round(obj.val) + suffix;
        }
      });
    }
  });
});
```

Garantir que cada `.stat-value` tenha `data-target="12"`, `data-target="200"`, `data-target="98"` e `data-suffix="+"` ou `data-suffix="%"` conforme o caso.

---

## Correção 4 — Botão "Contato" na navbar sumindo o texto no hover

Localizar no CSS o estilo do botão de contato na navbar (provavelmente `.nav-cta`, `.btn-contact` ou similar com background laranja).

O bug é que o `color` está sendo sobrescrito por uma regra de hover para branco sobre fundo laranja, tornando o texto invisível.

Corrigir para:
```css
.nav-cta:hover {
  background: var(--color-accent-orange-dark, #c46a1e);
  color: #ffffff !important;
}
```

---

## Correção 5 — Carrossel de parceiros parado

Verificar se a animação CSS `partners-scroll` está sendo pausada por conflito com GSAP ou por classe adicionada via JS.

Garantir que o carrossel use CSS animation puro, sem interferência do GSAP:

```css
.partners-track {
  animation: partners-scroll 30s linear infinite;
  will-change: transform;
}

.partners-track:hover {
  animation-play-state: paused;
}

/* Remover qualquer opacity:0 ou visibility:hidden aplicado pelo GSAP nesta seção */
.partners-section,
.partners-track-wrapper,
.partners-track {
  opacity: 1 !important;
  visibility: visible !important;
}
```

Se o problema for que o GSAP aplicou `opacity: 0` via .slide-up em algum elemento pai do carrossel, remover a classe slide-up desses elementos.

---

## Correção 6 — Seletor de idiomas com bandeiras

Substituir o seletor de idiomas atual por versão com emoji de bandeira:

```html
<div class="lang-switcher">
  <a href="/index.html" class="lang-btn active" data-lang="pt">
    <span class="flag">🇧🇷</span> PT
  </a>
  <span class="lang-divider">|</span>
  <a href="/en/index.html" class="lang-btn" data-lang="en">
    <span class="flag">🇺🇸</span> EN
  </a>
  <span class="lang-divider">|</span>
  <a href="/es/index.html" class="lang-btn" data-lang="es">
    <span class="flag">🇪🇸</span> ES
  </a>
</div>
```

```css
.lang-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  transition: color 0.2s ease;
  padding: 2px 0;
}

.lang-btn:hover,
.lang-btn.active {
  color: #fff;
}

.flag {
  font-size: 14px;
  line-height: 1;
}

.lang-divider {
  color: rgba(255,255,255,0.2);
  margin: 0 4px;
  font-size: 0.7rem;
}
```

Aplicar o mesmo padrão em TODOS os arquivos multilíngues: en/index.html, es/index.html e todas as páginas de produto.

---

## Correção 7 — Botões: efeito de glow no hover

Adicionar efeito de iluminação nos botões primários e outline:

```css
.btn-primary {
  transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.15s ease;
}

.btn-primary:hover {
  background: var(--color-accent-orange);
  box-shadow: 0 0 20px rgba(224, 123, 42, 0.55), 0 0 40px rgba(224, 123, 42, 0.2);
  transform: translateY(-2px);
}

.btn-outline:hover,
.btn-ghost:hover {
  border-color: rgba(255,255,255,0.6);
  box-shadow: 0 0 16px rgba(255,255,255,0.08);
  transform: translateY(-2px);
}
```

---

## Ordem de execução

1. Ler skills em .claude/skills/
2. Correção 2 (CSS das classes slide — base para tudo funcionar)
3. Correção 1 (Hero com vídeo)
4. Correção 3 (Contadores)
5. Correção 5 (Carrossel)
6. Correção 4 (Botão navbar)
7. Correção 6 (Bandeiras)
8. Correção 7 (Glow nos botões)
9. Commit: "fix: hero video, GSAP scroll animations, partners carousel, nav button, language flags"

## Regras
- Todo GSAP dentro de um único window.addEventListener('load', () => { ... })
- Não alterar estrutura de seções além do especificado
- Manter paridade multilíngue em todos os arquivos
- Usar /impeccable audit ao final
