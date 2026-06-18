# Prompt — Portfolio: Carrossel estilo Lamborghini com filtro por categoria

## Contexto
Estamos redesenhando a página `portfolio.html` (e suas versões `en/portfolio.html` e `es/portfolio.html`) do site institucional da Equipamec. O layout atual exibe os produtos em scroll linear, seção por seção. O novo layout deve ser um **carrossel fullscreen estilo Lamborghini** (referência: https://www.lamborghini.com/en-en/models), onde:

- A página carrega mostrando **todos os produtos no carrossel**
- Os **botões de filtro** (Todos / Unidades Hidráulicas / Máquinas de Limpeza / Acessórios) reposicionam o carrossel para mostrar apenas os itens daquela categoria
- A navegação entre slides é feita por **setas laterais** (esquerda/direita) e opcionalmente por **dots/indicadores** na parte inferior
- O carrossel ocupa **100vw × 100vh** (ou pelo menos 90vh), imagem do produto em destaque total

---

## Estrutura HTML a implementar

### 1. Substituir `<section class="produtos-showcase">` por:

```html
<section class="portfolio-carousel-section" id="portfolio-carousel">

  <!-- Seta esquerda -->
  <button class="pcarousel-arrow pcarousel-prev" aria-label="Anterior">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  </button>

  <!-- Seta direita -->
  <button class="pcarousel-arrow pcarousel-next" aria-label="Próximo">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  </button>

  <!-- Track do carrossel -->
  <div class="pcarousel-track">

    <!-- Cada slide: estrutura idêntica para todos os 10 produtos -->
    <!-- data-cat: "hpu" | "cleaning" | "accessories" -->

    <div class="pcarousel-slide active" data-cat="hpu" data-index="0">
      <div class="pcs-bg">
        <img src="assets/CH1S/ch1s_1.jpg" alt="CH1S" loading="lazy">
        <div class="pcs-bg-overlay"></div>
      </div>
      <div class="pcs-content">
        <div class="pcs-meta">
          <span class="pcs-category">Unidades Hidráulicas</span>
          <span class="pcs-counter">01 / <span class="pcs-total">10</span></span>
        </div>
        <h2 class="pcs-title">CH1S</h2>
        <p class="pcs-desc">Unidade hidráulica a combustão de 1 tomada. Compacta, robusta e projetada para operações navais em espaços reduzidos.</p>
        <div class="pcs-actions">
          <a href="produto_ch1s.html" class="btn btn-primary">Ver Especificações</a>
          <a href="assets/catalogos/CH1S_25HP.pdf" class="btn btn-outline" download>Catálogo PDF</a>
        </div>
      </div>
    </div>

    <div class="pcarousel-slide" data-cat="hpu" data-index="1">
      <div class="pcs-bg">
        <img src="assets/CH2S/ch2s_1.jpeg" alt="CH2S" loading="lazy">
        <div class="pcs-bg-overlay"></div>
      </div>
      <div class="pcs-content">
        <div class="pcs-meta">
          <span class="pcs-category">Unidades Hidráulicas</span>
          <span class="pcs-counter">02 / <span class="pcs-total">10</span></span>
        </div>
        <h2 class="pcs-title">CH2S</h2>
        <p class="pcs-desc">Unidade hidráulica a combustão de 2 tomadas. Alta pressão e vazão para operações simultâneas de limpeza de casco.</p>
        <div class="pcs-actions">
          <a href="produto_ch2s.html" class="btn btn-primary">Ver Especificações</a>
          <a href="assets/catalogos/CH2S_35HP.pdf" class="btn btn-outline" download>Catálogo PDF</a>
        </div>
      </div>
    </div>

    <div class="pcarousel-slide" data-cat="hpu" data-index="2">
      <div class="pcs-bg">
        <img src="assets/CH3SD/ch3sd_1.jpg" alt="CH3SD" loading="lazy">
        <div class="pcs-bg-overlay"></div>
      </div>
      <div class="pcs-content">
        <div class="pcs-meta">
          <span class="pcs-category">Unidades Hidráulicas</span>
          <span class="pcs-counter">03 / <span class="pcs-total">10</span></span>
        </div>
        <h2 class="pcs-title">CH3SD</h2>
        <p class="pcs-desc">Unidade hidráulica a combustão de 3 tomadas com motor 27HP. Para operações de grande escala com múltiplas ferramentas simultâneas.</p>
        <div class="pcs-actions">
          <a href="produto_ch3sd.html" class="btn btn-primary">Ver Especificações</a>
          <a href="assets/catalogos/CH3SD_27HP.pdf" class="btn btn-outline" download>Catálogo PDF</a>
        </div>
      </div>
    </div>

    <div class="pcarousel-slide" data-cat="hpu" data-index="3">
      <div class="pcs-bg">
        <img src="assets/CHE2S/che2s_1.jpeg" alt="CHE2S" loading="lazy">
        <div class="pcs-bg-overlay"></div>
      </div>
      <div class="pcs-content">
        <div class="pcs-meta">
          <span class="pcs-category">Unidades Hidráulicas</span>
          <span class="pcs-counter">04 / <span class="pcs-total">10</span></span>
        </div>
        <h2 class="pcs-title">CHE2S</h2>
        <p class="pcs-desc">Unidade hidráulica elétrica de 2 tomadas. Ideal para ambientes confinados e plataformas onde motores a combustão são restritos.</p>
        <div class="pcs-actions">
          <a href="produto_che2s.html" class="btn btn-primary">Ver Especificações</a>
          <a href="assets/catalogos/CHE2S.pdf" class="btn btn-outline" download>Catálogo PDF</a>
        </div>
      </div>
    </div>

    <div class="pcarousel-slide" data-cat="hpu" data-index="4">
      <div class="pcs-bg">
        <img src="assets/produtos/unidade_fundo_preto.jpg" alt="CAMC30" loading="lazy">
        <div class="pcs-bg-overlay"></div>
      </div>
      <div class="pcs-content">
        <div class="pcs-meta">
          <span class="pcs-category">Unidades Hidráulicas</span>
          <span class="pcs-counter">05 / <span class="pcs-total">10</span></span>
        </div>
        <h2 class="pcs-title">CAMC30</h2>
        <p class="pcs-desc">Compressor de ar para mergulho autônomo. Equipamento de suporte crítico para operações subaquáticas com segurança certificada.</p>
        <div class="pcs-actions">
          <a href="produto_camc30.html" class="btn btn-primary">Ver Especificações</a>
          <a href="assets/catalogos/CAMC30.pdf" class="btn btn-outline" download>Catálogo PDF</a>
        </div>
      </div>
    </div>

    <div class="pcarousel-slide" data-cat="cleaning" data-index="5">
      <div class="pcs-bg">
        <img src="assets/hpj40/hpj40_1.png" alt="HPJ-40" loading="lazy">
        <div class="pcs-bg-overlay"></div>
      </div>
      <div class="pcs-content">
        <div class="pcs-meta">
          <span class="pcs-category">Máquinas de Limpeza</span>
          <span class="pcs-counter">06 / <span class="pcs-total">10</span></span>
        </div>
        <h2 class="pcs-title">HPJ-40</h2>
        <p class="pcs-desc">Máquina de limpeza de casco subaquática de alta pressão. Reduz tempo de doca seca e melhora eficiência de combustível da embarcação.</p>
        <div class="pcs-actions">
          <a href="produto_hpj40.html" class="btn btn-primary">Ver Especificações</a>
          <a href="assets/catalogos/PHJ-40.pdf" class="btn btn-outline" download>Catálogo PDF</a>
        </div>
      </div>
    </div>

    <div class="pcarousel-slide" data-cat="cleaning" data-index="6">
      <div class="pcs-bg">
        <img src="assets/hpj41/hpj41_1.png" alt="HPJ-41" loading="lazy">
        <div class="pcs-bg-overlay"></div>
      </div>
      <div class="pcs-content">
        <div class="pcs-meta">
          <span class="pcs-category">Máquinas de Limpeza</span>
          <span class="pcs-counter">07 / <span class="pcs-total">10</span></span>
        </div>
        <h2 class="pcs-title">HPJ-41</h2>
        <p class="pcs-desc">Versão avançada da linha HPJ com sistema de fixação magnética. Opera em cascos verticais e curvos sem suporte de mergulhador.</p>
        <div class="pcs-actions">
          <a href="produto_hpj41.html" class="btn btn-primary">Ver Especificações</a>
          <a href="assets/catalogos/PHJ-41.pdf" class="btn btn-outline" download>Catálogo PDF</a>
        </div>
      </div>
    </div>

    <div class="pcarousel-slide" data-cat="cleaning" data-index="7">
      <div class="pcs-bg">
        <img src="assets/hpj25/hpj25_1.png" alt="HPJ-25" loading="lazy">
        <div class="pcs-bg-overlay"></div>
      </div>
      <div class="pcs-content">
        <div class="pcs-meta">
          <span class="pcs-category">Máquinas de Limpeza</span>
          <span class="pcs-counter">08 / <span class="pcs-total">10</span></span>
        </div>
        <h2 class="pcs-title">HPJ-25</h2>
        <p class="pcs-desc">Máquina de limpeza compacta para embarcações de menor porte. Mesma tecnologia HPJ em formato portátil para operações ágeis.</p>
        <div class="pcs-actions">
          <a href="produto_hpj25.html" class="btn btn-primary">Ver Especificações</a>
        </div>
      </div>
    </div>

    <div class="pcarousel-slide" data-cat="accessories" data-index="8">
      <div class="pcs-bg">
        <img src="assets/mangote/mangote_1.png" alt="Mangotes MHTP" loading="lazy">
        <div class="pcs-bg-overlay"></div>
      </div>
      <div class="pcs-content">
        <div class="pcs-meta">
          <span class="pcs-category">Acessórios</span>
          <span class="pcs-counter">09 / <span class="pcs-total">10</span></span>
        </div>
        <h2 class="pcs-title">MANGOTES MHTP</h2>
        <p class="pcs-desc">Conjunto de mangueiras hidráulicas de alta pressão para uso subaquático. Desenvolvidos para trabalhar em conjunto com as unidades Equipamec.</p>
        <div class="pcs-actions">
          <a href="produto_mangote.html" class="btn btn-primary">Ver Especificações</a>
          <a href="assets/catalogos/mangote_mhtp.pdf" class="btn btn-outline" download>Catálogo PDF</a>
        </div>
      </div>
    </div>

    <div class="pcarousel-slide" data-cat="accessories" data-index="9">
      <div class="pcs-bg">
        <img src="assets/produtos/hpj_deck.jpg" alt="Linha ECA Escovas" loading="lazy">
        <div class="pcs-bg-overlay"></div>
      </div>
      <div class="pcs-content">
        <div class="pcs-meta">
          <span class="pcs-category">Acessórios</span>
          <span class="pcs-counter">10 / <span class="pcs-total">10</span></span>
        </div>
        <h2 class="pcs-title">LINHA ECA</h2>
        <p class="pcs-desc">Escovas de aço e nylon para limpeza de casco em diferentes condições de incrustação. Compatíveis com as máquinas HPJ-40 e HPJ-41.</p>
        <div class="pcs-actions">
          <a href="produto_escovas.html" class="btn btn-primary">Ver Especificações</a>
          <a href="assets/catalogos/LINHA_ECA.pdf" class="btn btn-outline" download>Catálogo PDF</a>
        </div>
      </div>
    </div>

  </div><!-- /.pcarousel-track -->

  <!-- Dots de navegação -->
  <div class="pcarousel-dots" id="pcarousel-dots"></div>

</section>
```

---

## CSS a adicionar em `css/style.css`

Adicionar ao final do arquivo, após os estilos existentes do portfolio:

```css
/* ===================================================
   PORTFOLIO CAROUSEL — Estilo Lamborghini
   =================================================== */

.portfolio-carousel-section {
  position: relative;
  width: 100%;
  height: 90vh;
  min-height: 600px;
  overflow: hidden;
  background: #000;
}

/* Track: empilha os slides via opacity/z-index, não translate */
.pcarousel-track {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Cada slide: ocupa 100% do container, empilhado */
.pcarousel-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.7s ease;
  z-index: 1;
}

.pcarousel-slide.active {
  opacity: 1;
  pointer-events: auto;
  z-index: 2;
}

/* Imagem de fundo do slide */
.pcs-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.pcs-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* Overlay escuro sobre a imagem */
.pcs-bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0,0,0,0.75) 0%,
    rgba(0,0,0,0.45) 50%,
    rgba(0,0,0,0.15) 100%
  );
}

/* Conteúdo textual: canto inferior esquerdo */
.pcs-content {
  position: absolute;
  bottom: 10%;
  left: 6%;
  z-index: 3;
  max-width: 520px;
  color: #fff;
}

.pcs-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 0.75rem;
}

.pcs-category {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent-orange, #e07b2a);
  border-left: 2px solid var(--color-accent-orange, #e07b2a);
  padding-left: 0.6rem;
}

.pcs-counter {
  font-size: 0.75rem;
  font-weight: 300;
  color: rgba(255,255,255,0.5);
  letter-spacing: 0.08em;
}

.pcs-title {
  font-size: clamp(2.8rem, 6vw, 5rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: #fff;
  margin: 0 0 1rem 0;
}

.pcs-desc {
  font-size: 0.95rem;
  font-weight: 300;
  line-height: 1.65;
  color: rgba(255,255,255,0.8);
  margin-bottom: 1.75rem;
  max-width: 420px;
}

.pcs-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Setas de navegação */
.pcarousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 52px;
  height: 52px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  transition: background 0.25s, border-color 0.25s;
}

.pcarousel-arrow:hover {
  background: var(--color-accent-orange, #e07b2a);
  border-color: var(--color-accent-orange, #e07b2a);
}

.pcarousel-arrow svg {
  width: 22px;
  height: 22px;
}

.pcarousel-prev { left: 2%; }
.pcarousel-next { right: 2%; }

/* Dots */
.pcarousel-dots {
  position: absolute;
  bottom: 2rem;
  right: 6%;
  z-index: 10;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.pcarousel-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background 0.25s, transform 0.25s;
}

.pcarousel-dot.active {
  background: var(--color-accent-orange, #e07b2a);
  transform: scale(1.4);
}

/* Ocultar seção antiga caso ainda exista no HTML */
.produtos-showcase {
  display: none !important;
}

/* Mobile */
@media (max-width: 768px) {
  .portfolio-carousel-section {
    height: 100svh;
  }

  .pcs-content {
    bottom: 14%;
    left: 5%;
    right: 5%;
    max-width: 100%;
  }

  .pcs-title {
    font-size: clamp(2rem, 10vw, 3rem);
  }

  .pcs-bg-overlay {
    background: linear-gradient(
      to top,
      rgba(0,0,0,0.85) 0%,
      rgba(0,0,0,0.3) 60%,
      rgba(0,0,0,0.1) 100%
    );
  }

  .pcarousel-arrow {
    width: 40px;
    height: 40px;
  }

  .pcs-desc {
    font-size: 0.875rem;
  }

  .pcarousel-dots {
    bottom: 1.25rem;
    right: 50%;
    transform: translateX(50%);
  }
}
```

---

## JavaScript a adicionar em `js/script.js`

Adicionar ao final do arquivo, após o bloco de código existente:

```javascript
/* ===================================================
   PORTFOLIO CAROUSEL com FILTRO POR CATEGORIA
   =================================================== */

(function () {
  const section = document.querySelector('.portfolio-carousel-section');
  if (!section) return;

  const allSlides = Array.from(section.querySelectorAll('.pcarousel-slide'));
  const prevBtn   = section.querySelector('.pcarousel-prev');
  const nextBtn   = section.querySelector('.pcarousel-next');
  const dotsWrap  = section.querySelector('#pcarousel-dots');
  const filterBtns = document.querySelectorAll('.portfolio-cat-btn');

  let visibleSlides = [...allSlides]; // começa com todos
  let currentIdx    = 0;

  // --- Funções auxiliares ---

  function buildDots() {
    dotsWrap.innerHTML = '';
    visibleSlides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'pcarousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Produto ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  }

  function updateCounters() {
    const total = visibleSlides.length;
    visibleSlides.forEach((slide, i) => {
      const counterEl = slide.querySelector('.pcs-counter');
      if (counterEl) {
        const num = String(i + 1).padStart(2, '0');
        const tot = String(total).padStart(2, '0');
        counterEl.innerHTML = `${num} / <span class="pcs-total">${tot}</span>`;
      }
    });
  }

  function goTo(idx) {
    // Remove active do slide atual
    if (visibleSlides[currentIdx]) {
      visibleSlides[currentIdx].classList.remove('active');
    }

    currentIdx = Math.max(0, Math.min(idx, visibleSlides.length - 1));

    // Ativa o novo slide
    if (visibleSlides[currentIdx]) {
      visibleSlides[currentIdx].classList.add('active');
    }

    // Atualiza dots
    dotsWrap.querySelectorAll('.pcarousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIdx);
    });
  }

  function applyFilter(cat) {
    // Desativa todos
    allSlides.forEach(s => {
      s.classList.remove('active');
      s.style.display = 'none'; // esconde fisicamente os não filtrados
    });

    // Filtra
    visibleSlides = cat === 'all'
      ? [...allSlides]
      : allSlides.filter(s => s.dataset.cat === cat);

    // Reexibe os filtrados
    visibleSlides.forEach(s => {
      s.style.display = '';
    });

    currentIdx = 0;
    updateCounters();
    buildDots();
    goTo(0);
  }

  // --- Inicialização ---

  // Garante que todos estão visíveis inicialmente
  allSlides.forEach(s => { s.style.display = ''; });

  applyFilter('all');

  // --- Setas ---
  prevBtn.addEventListener('click', () => {
    goTo(currentIdx - 1 < 0 ? visibleSlides.length - 1 : currentIdx - 1);
  });

  nextBtn.addEventListener('click', () => {
    goTo(currentIdx + 1 >= visibleSlides.length ? 0 : currentIdx + 1);
  });

  // --- Filtros ---
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.cat);
    });
  });

  // --- Teclado ---
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  goTo(currentIdx - 1 < 0 ? visibleSlides.length - 1 : currentIdx - 1);
    if (e.key === 'ArrowRight') goTo(currentIdx + 1 >= visibleSlides.length ? 0 : currentIdx + 1);
  });

  // --- Swipe touch ---
  let touchStartX = 0;
  section.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  section.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 40) {
      diff > 0
        ? goTo(currentIdx + 1 >= visibleSlides.length ? 0 : currentIdx + 1)
        : goTo(currentIdx - 1 < 0 ? visibleSlides.length - 1 : currentIdx - 1);
    }
  }, { passive: true });

})();
```

---

## O que remover do HTML

Remover completamente do `portfolio.html` a `<section class="produtos-showcase" id="produtos-showcase">` e todo seu conteúdo interno (os 10 `<div class="produto-showcase-item">`). Ela é substituída integralmente pela `<section class="portfolio-carousel-section">` acima.

---

## Paridade PT / EN / ES

Depois de ajustar `portfolio.html`, replicar as mesmas mudanças de estrutura HTML e JS em:
- `en/portfolio.html` com textos traduzidos para inglês:
  - "Ver Especificações" -> "View Specifications"
  - "Catálogo PDF" -> "PDF Catalog"
  - Categorias nos `<span class="pcs-category">`:
    - "Unidades Hidráulicas" -> "Hydraulic Units"
    - "Máquinas de Limpeza" -> "Cleaning Machines"
    - "Acessórios" -> "Accessories"
  - Descrições dos produtos traduzidas (ver abaixo)
- `es/portfolio.html` com textos em espanhol (ver abaixo)

### Traduções EN dos `pcs-desc`

| Produto | EN |
|---|---|
| CH1S | Single-outlet combustion hydraulic unit. Compact, rugged, and designed for naval operations in confined spaces. |
| CH2S | Dual-outlet combustion hydraulic unit. High pressure and flow for simultaneous hull cleaning operations. |
| CH3SD | Three-outlet combustion hydraulic unit with 27HP engine. For large-scale operations with multiple simultaneous tools. |
| CHE2S | Dual-outlet electric hydraulic unit. Ideal for confined environments and platforms where combustion engines are restricted. |
| CAMC30 | Air compressor for autonomous diving. Critical support equipment for underwater operations with certified safety. |
| HPJ-40 | High-pressure underwater hull cleaning machine. Reduces dry dock time and improves vessel fuel efficiency. |
| HPJ-41 | Advanced HPJ line with magnetic attachment system. Operates on vertical and curved hulls without diver support. |
| HPJ-25 | Compact cleaning machine for smaller vessels. Same HPJ technology in portable format for agile operations. |
| MANGOTES MHTP | High-pressure hydraulic hose set for underwater use. Designed to work alongside Equipamec units. |
| LINHA ECA | Steel and nylon brushes for hull cleaning under various encrustation conditions. Compatible with HPJ-40 and HPJ-41. |

### Traduções ES dos `pcs-desc`

| Produto | ES |
|---|---|
| CH1S | Unidad hidráulica a combustión de 1 toma. Compacta, robusta y diseñada para operaciones navales en espacios reducidos. |
| CH2S | Unidad hidráulica a combustión de 2 tomas. Alta presión y caudal para operaciones simultáneas de limpieza de casco. |
| CH3SD | Unidad hidráulica a combustión de 3 tomas con motor 27HP. Para operaciones a gran escala con múltiples herramientas simultáneas. |
| CHE2S | Unidad hidráulica eléctrica de 2 tomas. Ideal para ambientes confinados y plataformas donde los motores a combustión están restringidos. |
| CAMC30 | Compresor de aire para buceo autónomo. Equipo de soporte crítico para operaciones subacuáticas con seguridad certificada. |
| HPJ-40 | Máquina de limpieza de casco subacuática de alta presión. Reduce el tiempo en dique seco y mejora la eficiencia de combustible de la embarcación. |
| HPJ-41 | Versión avanzada de la línea HPJ con sistema de fijación magnética. Opera en cascos verticales y curvos sin soporte del buzo. |
| HPJ-25 | Máquina de limpieza compacta para embarcaciones más pequeñas. La misma tecnología HPJ en formato portátil para operaciones ágiles. |
| MANGOTES MHTP | Conjunto de mangueras hidráulicas de alta presión para uso subacuático. Desarrollados para trabajar junto con las unidades Equipamec. |
| LINHA ECA | Cepillos de acero y nylon para limpieza de casco en diferentes condiciones de incrustación. Compatibles con HPJ-40 y HPJ-41. |

---

## Comportamento esperado

1. Página carrega com o carrossel ativo no primeiro produto (CH1S), filtro "Todos" ativo.
2. Usuário clica em "Máquinas de Limpeza": carrossel exibe apenas HPJ-40, HPJ-41, HPJ-25 (3 slides, contador 01/03, 02/03, 03/03).
3. Usuário clica seta direita: avança para HPJ-41.
4. Usuário clica "Todos": volta para os 10 produtos a partir do primeiro.
5. Em mobile: swipe horizontal troca o slide. Dots ficam centralizados na base.
6. Setas do teclado (← →) funcionam quando o foco está na página.

---

## Arquivos a modificar

- `portfolio.html`
- `en/portfolio.html`
- `es/portfolio.html`
- `css/style.css` (append)
- `js/script.js` (append)

**Não criar arquivos novos. Não modificar nenhum outro HTML.**
