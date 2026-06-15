# Prompt v6 — Fix definitivo: ScrollTriggers não registrados

## Diagnóstico confirmado
- GSAP e ScrollTrigger estão carregados
- ScrollTrigger.getAll().length === 0 — nenhum trigger foi criado
- Causa: os seletores gsap.utils.toArray('.slide-up') etc. retornam
  arrays vazios porque o DOM ainda não tem esses elementos quando
  initGSAP() executa, OU o script.js está no <head> sem defer/async

## Correção 1 — Verificar posição do script.js no HTML

Abrir index.html e verificar onde está o <script src="js/script.js">.

Se estiver no <head>:
```html
<!-- ERRADO -->
<head>
  <script src="js/script.js"></script>
</head>
```

Mover para o final do <body>, APÓS todos os elementos HTML e APÓS os scripts do GSAP:
```html
  <!-- Final do body, nesta ordem exata: -->
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
  <script src="js/script.js"></script>
</body>
```

Aplicar essa ordem em TODOS os 36 arquivos HTML do projeto.

## Correção 2 — Substituir initGSAP por versão que usa DOMContentLoaded garantido

No js/script.js, substituir a função initGSAP e sua chamada por:

```js
function runGSAPAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance
  const heroBar = document.querySelector('.hero-bar');
  if (heroBar) {
    const heroTl = gsap.timeline({ delay: 1.4 });
    heroTl
      .from('.hero-bar', { scaleY: 0, transformOrigin: 'top', duration: 0.4, ease: 'power2.out' })
      .from('.hero-eyebrow', { opacity: 0, y: 16, duration: 0.45 }, '-=0.1')
      .from('.hero-title', { opacity: 0, y: 40, duration: 0.7, ease: 'power3.out' }, '-=0.2')
      .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
      .from('.hero-buttons .btn', { opacity: 0, y: 20, stagger: 0.15, duration: 0.4 }, '-=0.2');
  }

  // Scroll animations para slide-*
  const slideEls = gsap.utils.toArray('[class*="slide-"]');
  console.log('Elementos slide encontrados:', slideEls.length); // debug

  slideEls.forEach(el => {
    // Pular elementos dentro do carrossel de parceiros
    if (el.closest('.partners-track-wrapper') || el.closest('#parceiros') || el.closest('.parceiros')) return;

    const dir = el.classList.contains('slide-right') ? { x: -50 }
              : el.classList.contains('slide-left')  ? { x: 50 }
              : { y: 50 };

    gsap.set(el, { opacity: 0, ...dir });

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

  // Contadores
  const statEls = gsap.utils.toArray('.stat-value[data-target]');
  console.log('Stat elements encontrados:', statEls.length); // debug

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

  // Proteger carrossel de parceiros
  document.querySelectorAll(
    '.parceiros, #parceiros, .partners-section, .partners-track-wrapper, .partners-track'
  ).forEach(el => {
    el.style.cssText += '; opacity:1 !important; visibility:visible !important;';
    gsap.set(el, { clearProps: 'all' });
  });

  ScrollTrigger.refresh();

  console.log('ScrollTriggers registrados:', ScrollTrigger.getAll().length); // debug
}

// Executar quando DOM estiver pronto E scripts carregados
if (document.readyState === 'complete') {
  runGSAPAnimations();
} else {
  window.addEventListener('load', runGSAPAnimations);
}
```

## Correção 3 — CSS: garantir que slide-* não têm opacity:0

No css/style.css, buscar por `.slide-up`, `.slide-right`, `.slide-left` e
garantir que NÃO há `opacity: 0` nem `transform` definidos nessas classes.
O GSAP aplica `opacity:0` via `gsap.set()` apenas no momento de criar a animação.

Se houver `opacity: 0` no CSS nessas classes, remover.

## Verificação após execução

Após aplicar, abrir o DevTools no PC e verificar no console:
- "Elementos slide encontrados: X" — deve ser > 0
- "Stat elements encontrados: 4" — deve ser 4
- "ScrollTriggers registrados: X" — deve ser > 0

Se ainda retornar 0, há um problema estrutural no HTML que precisará de inspeção direta.

## Ordem de execução

1. Correção 1 — verificar e corrigir posição dos scripts em todos os HTMLs
2. Correção 3 — remover opacity:0 do CSS das classes slide-*
3. Correção 2 — substituir initGSAP por runGSAPAnimations
4. Commit: "fix: script load order, GSAP selectors on DOMContentLoaded"
