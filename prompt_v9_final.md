# Prompt v9 — Fix definitivo: abandonar seletor genérico slide-*

## Diagnóstico raiz
O seletor `gsap.utils.toArray('[class*="slide-"]')` está capturando
elementos em excesso no PC (hero content, feature-list items, diferenciais
nas páginas de produto) e aplicando gsap.set(opacity:0) neles.
No mobile o timing é diferente e o trigger dispara antes do usuário ver.
No PC a tela é maior, os elementos já estão parcialmente visíveis
e o trigger nunca dispara corretamente.

## Solução definitiva
Remover completamente o loop genérico `[class*="slide-"]` do JS.
Substituir por animações explícitas apenas para seções específicas.
As classes slide-up/slide-right/slide-left no HTML ficam como hooks
semânticos mas sem nenhuma lógica JS ou CSS que as torne invisíveis.

## Correção no js/script.js

Localizar e DELETAR completamente este bloco (ou qualquer variação dele):
```js
gsap.utils.toArray('[class*="slide-"]').forEach(el => { ... });
```

Substituir por animações explícitas por seção:

```js
// ---- SOBRE / ABOUT ----
if (document.querySelector('#sobre, #about')) {
  const sobreSection = document.querySelector('#sobre') || document.querySelector('#about');

  // Feature list items
  const featureItems = sobreSection?.querySelectorAll('.feature-list li, .feature-item');
  if (featureItems?.length) {
    gsap.set(featureItems, { opacity: 1, x: 0 }); // garantir visível
    ScrollTrigger.create({
      trigger: sobreSection,
      start: 'top bottom-=100px',
      once: true,
      onEnter: () => {
        gsap.fromTo(featureItems,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' }
        );
      }
    });
  }

  // Identity panels / diferenciais dentro do sobre
  const identityPanels = sobreSection?.querySelectorAll('.identity-panel, .diferencial-item, [class*="diferencial"]');
  if (identityPanels?.length) {
    gsap.set(identityPanels, { opacity: 1, y: 0 }); // garantir visível
    ScrollTrigger.create({
      trigger: identityPanels[0],
      start: 'top bottom-=50px',
      once: true,
      onEnter: () => {
        gsap.fromTo(identityPanels,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.2, duration: 0.7, ease: 'power2.out' }
        );
      }
    });
  }
}

// ---- SERVIÇOS ----
if (document.querySelector('.services-grid, .service-card')) {
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

// ---- PRODUTOS CARROSSEL ----
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

// ---- STATS / CONTADORES ----
document.querySelectorAll('.stat-value[data-target]').forEach(el => {
  gsap.set(el, { opacity: 1 }); // garantir visível
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

// ---- PARCEIROS ----
document.querySelectorAll('.parceiros, #parceiros, .partners-section, .partners-track-wrapper, .partners-track').forEach(el => {
  gsap.set(el, { clearProps: 'all' });
  el.style.cssText += '; opacity:1 !important; visibility:visible !important;';
});
```

## Correção nas páginas de produto

Nas páginas produto_*.html, a seção "Diferenciais" também usa slide-up.
O mesmo problema ocorre: gsap.set aplica opacity:0 e o trigger não dispara.

Adicionar no js/script.js, dentro do runGSAPAnimations(), detecção de página de produto:

```js
// ---- PÁGINAS DE PRODUTO: DIFERENCIAIS ----
const diferenciais = document.querySelectorAll(
  '.diferencial, .diferencial-item, .product-feature, [class*="diferencial"], .feature-box'
);
if (diferenciais.length) {
  gsap.set(diferenciais, { opacity: 1, y: 0 }); // garantir visível
  ScrollTrigger.create({
    trigger: diferenciais[0],
    start: 'top bottom-=50px',
    once: true,
    onEnter: () => {
      gsap.fromTo(diferenciais,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out' }
      );
    }
  });
}
```

## Correção no CSS

No css/style.css, verificar se .slide-up, .slide-right, .slide-left
têm opacity:0 ou transform definidos. Se tiverem, remover completamente:

```css
/* REMOVER qualquer definição como esta: */
/* .slide-up { opacity: 0; transform: translateY(30px); } */
/* .slide-right { opacity: 0; transform: translateX(-30px); } */
/* .slide-left { opacity: 0; transform: translateX(30px); } */

/* As classes ficam vazias — só o JS controla via gsap.set() + fromTo */
.slide-up, .slide-right, .slide-left {
  /* intencialmente vazio */
}
```

## Regra crítica
Nunca usar gsap.utils.toArray('[class*="slide-"]') neste projeto.
Cada seção tem seu próprio ScrollTrigger explícito com gsap.set() de segurança antes.

## Ordem de execução
1. CSS: limpar .slide-up, .slide-right, .slide-left
2. JS: deletar loop genérico [class*="slide-"]
3. JS: adicionar blocos explícitos por seção
4. JS: adicionar bloco de diferenciais para páginas de produto
5. Commit: "fix: remove generic slide selector, explicit ScrollTrigger per section"
