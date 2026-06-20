# Prompt — Refazer `portfolio.html` em grid com hover expansível

## Contexto
Estamos refazendo a página `portfolio.html` (Nossos Produtos) da Equipamec. A tentativa anterior usou carrossel fullscreen estilo Lamborghini, mas foi revertida (não atendeu a expectativa). A nova direção é um **grid de cards estáticos com efeito de hover**, inspirado em https://ryazbek.com.br/portfolio/, mantendo a identidade visual da Equipamec (teal escuro `#0a1f1a`, laranja `#e07b2a`, Inter).

## Referência de comportamento (confirmado por prints do usuário)
- Grid de cards com imagem de produto como fundo
- Em repouso: uma faixa inferior pequena mostra apenas o nome do produto
- No **hover**: a faixa inferior sobe e expande, revelando categoria, nome, specs curtas e botão "Confira" / "Ver Especificações"
- A imagem de fundo do card sofre um leve **zoom out** (scale down) no hover, dando profundidade
- Grid de **3 colunas** no desktop

---

## Estrutura HTML a implementar

### 1. Manter o hero e a barra de filtros existentes (sem alteração):

```html
<section class="portfolio-hero">
  <div class="portfolio-hero-bg"></div>
  <div class="portfolio-hero-overlay"></div>
  <div class="container portfolio-hero-content">
    <span class="section-eyebrow">Linha Completa</span>
    <h1 class="portfolio-hero-title">NOSSOS<br><em>PRODUTOS</em></h1>
    <p class="portfolio-hero-sub">Equipamentos projetados e fabricados para operações onde a falha não é opção.</p>
  </div>
  <div class="portfolio-cat-nav">
    <button class="portfolio-cat-btn active" data-cat="all">Todos</button>
    <button class="portfolio-cat-btn" data-cat="hpu">Unidades Hidráulicas</button>
    <button class="portfolio-cat-btn" data-cat="cleaning">Máquinas de Limpeza</button>
    <button class="portfolio-cat-btn" data-cat="accessories">Acessórios</button>
    <a href="assets/catalogo.pdf" class="portfolio-download-btn" download>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Baixar Catálogo Completo
    </a>
  </div>
</section>
```

### 2. Substituir `<section class="produtos-showcase">` (ou o que estiver lá da tentativa anterior) por um grid:

```html
<section class="produtos-grid-section" id="produtos-grid">
  <div class="container">
    <div class="produtos-grid" id="produtos-grid-list">

      <!-- Card padrão — repetir para os 10 produtos -->
      <div class="produto-card" data-cat="hpu">
        <div class="pc-media">
          <img src="assets/CH1S/ch1s_1.jpg" alt="CH1S Unidade Hidráulica" loading="lazy">
        </div>
        <div class="pc-info">
          <span class="pc-info-category">Unidades Hidráulicas</span>
          <h3 class="pc-info-title">CH1S</h3>
          <p class="pc-info-desc">Unidade hidráulica a combustão de 1 tomada, compacta e robusta.</p>
          <a href="produto_ch1s.html" class="pc-info-btn">
            Ver Especificações
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- ... repetir estrutura para os outros 9 produtos, ver tabela abaixo -->

    </div>
  </div>
</section>
```

### Dados completos dos 10 produtos para gerar os cards

| data-cat | imagem | título | categoria label | descrição curta | link |
|---|---|---|---|---|---|
| hpu | assets/CH1S/ch1s_1.jpg | CH1S | Unidades Hidráulicas | Unidade hidráulica a combustão de 1 tomada, compacta e robusta. | produto_ch1s.html |
| hpu | assets/CH2S/ch2s_1.jpeg | CH2S | Unidades Hidráulicas | Unidade hidráulica a combustão de 2 tomadas, alta pressão e vazão. | produto_ch2s.html |
| hpu | assets/CH3SD/ch3sd_1.jpg | CH3SD | Unidades Hidráulicas | Unidade a combustão de 3 tomadas com motor 27HP. | produto_ch3sd.html |
| hpu | assets/CHE2S/che2s_1.jpeg | CHE2S | Unidades Hidráulicas | Unidade hidráulica elétrica de 2 tomadas, ambientes confinados. | produto_che2s.html |
| hpu | assets/produtos/unidade_fundo_preto.jpg | CAMC30 | Unidades Hidráulicas | Compressor de ar para mergulho autônomo. | produto_camc30.html |
| cleaning | assets/hpj40/hpj40_1.png | HPJ-40 | Máquinas de Limpeza | Máquina de limpeza de casco subaquática de alta pressão. | produto_hpj40.html |
| cleaning | assets/hpj41/hpj41_1.png | HPJ-41 | Máquinas de Limpeza | Sistema de fixação magnética para cascos verticais e curvos. | produto_hpj41.html |
| cleaning | assets/hpj25/hpj25_1.png | HPJ-25 | Máquinas de Limpeza | Máquina de limpeza compacta para embarcações menores. | produto_hpj25.html |
| accessories | assets/mangote/mangote_1.png | MANGOTES MHTP | Acessórios | Mangueiras hidráulicas de alta pressão para uso subaquático. | produto_mangote.html |
| accessories | assets/produtos/hpj_deck.jpg | LINHA ECA | Acessórios | Escovas de aço e nylon para limpeza de casco. | produto_escovas.html |

---

## CSS a adicionar em `css/style.css`

Remover (ou comentar) qualquer CSS relacionado a `.portfolio-carousel-section`, `.pcarousel-*`, `.produtos-showcase` da tentativa anterior, e adicionar:

```css
/* ===================================================
   PORTFOLIO GRID — Cards com hover expansível
   =================================================== */

.produtos-grid-section {
  padding: 4rem 0 6rem;
  background: #fff;
}

.produtos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
}

.produto-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 4/5;
  cursor: pointer;
  background: var(--color-primary-dark, #0a1f1a);
}

/* Imagem de fundo com zoom out no hover */
.pc-media {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.pc-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1.08);
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.produto-card:hover .pc-media img {
  transform: scale(1);
}

/* Faixa de informação inferior */
.pc-info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to top,
    rgba(10,31,26,0.97) 0%,
    rgba(10,31,26,0.88) 70%,
    rgba(10,31,26,0) 100%
  );
  padding: 2.5rem 1.25rem 1rem;
  transform: translateY(calc(100% - 4.5rem));
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.produto-card:hover .pc-info {
  transform: translateY(0);
}

.pc-info-category {
  display: block;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent-orange, #e07b2a);
  margin-bottom: 0.35rem;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.35s ease 0.05s, transform 0.35s ease 0.05s;
}

.pc-info-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  margin: 0 0 0.5rem;
}

.pc-info-desc {
  font-size: 0.8rem;
  line-height: 1.5;
  color: rgba(255,255,255,0.75);
  margin: 0 0 1rem;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.35s ease, opacity 0.35s ease 0.1s;
}

.pc-info-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-accent-orange, #e07b2a);
  text-decoration: none;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.35s ease 0.12s, transform 0.35s ease 0.12s, gap 0.2s ease;
}

.pc-info-btn:hover {
  gap: 0.75rem;
}

.produto-card:hover .pc-info-category,
.produto-card:hover .pc-info-desc,
.produto-card:hover .pc-info-btn {
  opacity: 1;
  transform: translateY(0);
}

.produto-card:hover .pc-info-desc {
  max-height: 80px;
}

/* Botão de download do catálogo, ao lado dos filtros */
.portfolio-download-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
  padding: 0.6rem 1.1rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-primary-dark, #0a1f1a);
  background: var(--color-accent-orange, #e07b2a);
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;
}

.portfolio-download-btn:hover {
  background: #c96819;
  color: #fff;
  transform: translateY(-1px);
}

/* Ajuste no container de filtros para acomodar o botão de download */
.portfolio-cat-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

/* Card oculto pelo filtro */
.produto-card.is-hidden {
  display: none;
}

/* Mobile */
@media (max-width: 900px) {
  .produtos-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
}

@media (max-width: 600px) {
  .produtos-grid {
    grid-template-columns: 1fr;
  }

  .pc-info {
    transform: translateY(0);
    padding: 1.5rem 1rem 1rem;
    background: linear-gradient(
      to top,
      rgba(10,31,26,0.95) 0%,
      rgba(10,31,26,0.4) 100%
    );
  }

  .pc-info-category,
  .pc-info-desc,
  .pc-info-btn {
    opacity: 1;
    transform: none;
  }

  .pc-info-desc {
    max-height: 80px;
  }

  .pc-media img {
    transform: scale(1);
  }

  .portfolio-download-btn {
    margin-left: 0;
    width: 100%;
    justify-content: center;
  }
}
```

**Nota de design:** em mobile o hover não existe, então a faixa de informação fica sempre visível (sem a animação de expansão), garantindo que o conteúdo não fique escondido atrás de um gesto que não existe em touch.

---

## JavaScript a adicionar em `js/script.js`

Substituir qualquer JS relacionado ao carrossel anterior (`.pcarousel-*`) por este filtro simples:

```javascript
/* ===================================================
   PORTFOLIO GRID — Filtro por categoria
   =================================================== */

(function () {
  const grid = document.getElementById('produtos-grid-list');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.produto-card'));
  const filterBtns = document.querySelectorAll('.portfolio-cat-btn');

  function applyFilter(cat) {
    cards.forEach(card => {
      const match = cat === 'all' || card.dataset.cat === cat;
      card.classList.toggle('is-hidden', !match);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.cat);
    });
  });
})();
```

---

## GSAP — entrada dos cards ao rolar a página

Adicionar também em `js/script.js`:

```javascript
/* Entrada dos cards do portfolio ao scroll */
if (document.querySelector('.produto-card')) {
  gsap.utils.toArray('.produto-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: (i % 3) * 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}
```

---

## Arquivo do catálogo

O botão de download aponta para `assets/catalogo.pdf`. Esse arquivo já existe no projeto (confirmado pelo usuário). Não criar nem alterar o PDF, apenas referenciar o caminho.

---

## Paridade PT / EN / ES

Replicar a mesma estrutura em `en/portfolio.html` e `es/portfolio.html`:

- Botão de download: EN "Download Full Catalog" / ES "Descargar Catálogo Completo"
- Botão "Ver Especificações": EN "View Specifications" / ES "Ver Especificaciones"
- Categorias e descrições: reaproveitar as traduções já usadas na tentativa anterior do carrossel (estão no histórico do projeto), ajustando apenas para o formato curto de `pc-info-desc`.

---

## Arquivos a modificar
- `portfolio.html`
- `en/portfolio.html`
- `es/portfolio.html`
- `css/style.css` (remover CSS do carrossel antigo, adicionar CSS do grid)
- `js/script.js` (remover JS do carrossel antigo, adicionar JS do grid)

## Não fazer
- Não criar arquivo `catalogo.pdf` — ele já existe
- Não modificar outros HTMLs do site
- Não alterar a seção de hero nem a barra de filtros além de adicionar o botão de download
