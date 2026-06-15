# Prompt v10 — Fix definitivo: .fade-in opacity:0 não resolve no PC

## Diagnóstico confirmado
O CSS tem `.fade-in { opacity: 0 }` na linha ~830 do style.css.
O IntersectionObserver no DOMContentLoaded adiciona `.visible` para revelar,
mas no PC falha porque elementos na viewport com threshold 0.1 não disparam
quando já estão parcialmente visíveis no carregamento.

As classes slide-up/right/left estão corretas (opacity:1 no CSS).
O problema é exclusivamente a classe .fade-in.

## Verificação necessária primeiro

Abrir index.html e produto_*.html e inspecionar quais elementos têm classe .fade-in:
- Hero title, hero subtitle, hero eyebrow?
- Diferenciais nas páginas de produto?
- Feature list items?

## Correção 1 — Substituir IntersectionObserver por GSAP ScrollTrigger para .fade-in

No js/script.js, dentro do DOMContentLoaded, localizar e REMOVER este bloco:
```js
const fadeElements = document.querySelectorAll('.fade-in, .gallery-item');
if (fadeElements.length) {
    const observer = new IntersectionObserver((entries, obs) => { ... });
    fadeElements.forEach(el => observer.observe(el));
}
```

Substituir por nada — o GSAP vai controlar .fade-in também.

Adicionar dentro da função runGSAPAnimations(), após os blocos existentes:

```js
// ---- FADE-IN via GSAP (substitui IntersectionObserver) ----
const fadeEls = document.querySelectorAll('.fade-in');
fadeEls.forEach(el => {
    // Pular elementos do carrossel de parceiros
    if (el.closest('.partners-track-wrapper') || el.closest('#parceiros')) return;
    // Garantir visível como fallback
    gsap.set(el, { opacity: 1 });
    // Animar com ScrollTrigger
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
```

## Correção 2 — CSS: adicionar .fade-in.visible como fallback

No style.css, na definição .fade-in, garantir que o estado padrão seja visível
quando JS não roda (acessibilidade e SEO):

```css
.fade-in {
    opacity: 0;
    transition: opacity var(--transition-slow);
}

.fade-in.visible {
    opacity: 1;
}

/* Fallback: se JS demorar ou falhar, tornar visível após 3s */
@media (prefers-reduced-motion: no-preference) {
    .fade-in {
        animation: fadeInFallback 0.01s 3s forwards;
    }
    @keyframes fadeInFallback {
        to { opacity: 1; }
    }
}
```

## Correção 3 — Threshold do IntersectionObserver estava muito alto para PC

Se decidir manter o IntersectionObserver como backup (ao invés de remover),
alterar o threshold de 0.1 para 0.01 e adicionar rootMargin:

```js
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, {
    root: null,
    rootMargin: '0px 0px -30px 0px',
    threshold: 0.01  // era 0.1, muito restritivo para PC
});
```

## Ordem de execução
1. Verificar quais elementos têm .fade-in no HTML (index.html e produto_*.html)
2. Correção 2 (CSS fallback)
3. Correção 1 (substituir observer por GSAP no script.js)
4. Commit: "fix: fade-in elements invisible on PC, replace IntersectionObserver with GSAP"

## Regra
Não alterar nenhum layout ou design — somente lógica de animação.
