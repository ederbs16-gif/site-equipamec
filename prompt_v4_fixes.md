# Prompt v4 — Correções Cirúrgicas PC + Mobile

## Diagnóstico
Os contadores e animações de scroll funcionam no mobile mas não no PC.
Causa: GSAP está sendo inicializado antes do ScrollTrigger carregar via CDN,
ou o window load dispara cedo demais no desktop. O carrossel de parceiros
também não move no PC pelo mesmo motivo (opacity:0 aplicado pelo GSAP).

---

## Correção 1 — Inicialização GSAP: usar callback de carregamento do CDN

Substituir o padrão atual de inicialização por uma função que aguarda
GSAP e ScrollTrigger estarem disponíveis antes de executar qualquer código.

No js/script.js, localizar TODA a inicialização GSAP e substituir pelo padrão abaixo:

```js
function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    setTimeout(initGSAP, 50);
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ---- HERO ENTRANCE ----
  const heroTl = gsap.timeline({ delay: 1.4 });
  heroTl
    .from('.hero-bar', { scaleY: 0, transformOrigin: 'top', duration: 0.4, ease: 'power2.out' })
    .from('.hero-eyebrow', { opacity: 0, y: 16, duration: 0.45 }, '-=0.1')
    .from('.hero-title', { opacity: 0, y: 40, duration: 0.7, ease: 'power3.out' }, '-=0.2')
    .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
    .from('.hero-buttons .btn', { opacity: 0, y: 20, stagger: 0.15, duration: 0.4 }, '-=0.2')
    .from('.hero-scroll-indicator', { opacity: 0, duration: 0.5 }, '-=0.1');

  // ---- SCROLL ANIMATIONS ----
  // Garantir visibilidade padrão — GSAP controla via gsap.set()
  gsap.utils.toArray('[class*="slide-"]').forEach(el => {
    const dir = el.classList.contains('slide-right') ? { x: -50 }
              : el.classList.contains('slide-left')  ? { x: 50 }
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
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix;
          }
        });
      }
    });
  });

  // ---- SERVICE CARDS STAGGER ----
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

  // ---- PRODUTO CARDS ----
  if (document.querySelector('.produtos-destaque')) {
    gsap.from('.produto-card', {
      scrollTrigger: { trigger: '.produtos-destaque', start: 'top 80%' },
      opacity: 0, x: 60, stagger: 0.15, duration: 0.8, ease: 'power2.out'
    });
  }

  // ---- PARTNERS: proteger de opacity:0 ----
  const partnersEls = document.querySelectorAll(
    '.partners-section, .partners-track-wrapper, .partners-track, .partner-logo, .partners-track-wrapper *'
  );
  partnersEls.forEach(el => {
    el.style.opacity = '1';
    el.style.visibility = 'visible';
    el.style.transform = 'none';
  });

  // ---- REFRESH ----
  ScrollTrigger.refresh();
}

// Iniciar após DOM pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGSAP);
} else {
  initGSAP();
}
```

IMPORTANTE: remover qualquer outro `window.addEventListener('load', ...)` que contenha código GSAP.
Todo o código GSAP deve estar SOMENTE dentro da função initGSAP acima.

---

## Correção 2 — CSS: remover opacity:0 das classes slide-*

No css/style.css, localizar as definições de .slide-up, .slide-right, .slide-left e
garantir que NÃO tenham opacity:0 nem transform como estado inicial.
O GSAP aplica via gsap.set() apenas antes de animar:

```css
.slide-up,
.slide-right,
.slide-left {
  /* Sem opacity nem transform aqui — controlado pelo GSAP */
}
```

---

## Correção 3 — Mobile: espaço em branco entre título "Nossos Serviços" e primeiro card

O gap enorme no mobile entre o título da seção e os cards de serviço é causado
por altura mínima ou padding excessivo no container da seção.

Inspecionar a seção #servicos (ou .services) e aplicar:

```css
@media (max-width: 768px) {
  .services,
  #servicos,
  [class*="services"] {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .services-grid {
    gap: 16px;
  }

  .section-header,
  .services .section-header {
    margin-bottom: 24px;
  }
}
```

Se o problema for que os cards têm opacity:0 e o container mantém o espaço reservado
antes de animar, a Correção 1 resolve junto (os cards ficam visíveis imediatamente
e animam ao entrar no viewport).

---

## Correção 4 — Carrossel de parceiros: garantir movimento no PC

O carrossel usa CSS animation. Verificar se há algum JS aplicando
`animation-play-state: paused` ou `opacity: 0` nos elementos do carrossel
fora do hover. Corrigir:

```css
.partners-track {
  animation: partners-scroll 30s linear infinite !important;
  animation-play-state: running !important;
  opacity: 1 !important;
  visibility: visible !important;
}

.partners-track:hover {
  animation-play-state: paused !important;
}

/* Garantir que nenhum elemento pai esteja invisível */
.parceiros,
.partners-section,
#parceiros,
[class*="partner"] {
  opacity: 1 !important;
  visibility: visible !important;
}
```

---

## Correção 5 — Stats data-target: garantir valor 15 para anos

Verificar em index.html, en/index.html, es/index.html se o stat de anos
tem data-target="15". Se ainda estiver com "12", corrigir para "15".

---

## Ordem de execução

1. Correção 2 (CSS primeiro — base limpa)
2. Correção 1 (substituir toda inicialização GSAP)
3. Correção 3 (mobile padding serviços)
4. Correção 4 (carrossel parceiros CSS)
5. Correção 5 (stats 15 anos)
6. Testar mentalmente: abrir index.html no browser, rolar a página,
   verificar se contadores sobem, se cards animam, se carrossel gira
7. Commit: "fix: GSAP init race condition, mobile services gap, partners carousel, stats 15"

## Regra crítica
Não usar window.addEventListener('load') para GSAP.
Usar apenas a função initGSAP() com o retry por setTimeout descrito acima.
