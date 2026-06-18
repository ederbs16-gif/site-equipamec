# Prompt v15 — Redesign portfolio.html: estilo Lamborghini Models

## Contexto
Substituir completamente o conteúdo do <main> do portfolio.html.
Manter: navbar, footer, imports de CSS/JS, GLightbox (para galeria de fotos).
Remover: Isotope, imagesloaded (não serão mais necessários).
Stack: HTML/CSS/JS puro + GSAP.

Aplicar o mesmo redesign em en/portfolio.html e es/portfolio.html com traduções.

---

## Estrutura da nova página

### 1. Hero da página (fullscreen, sem vídeo)

```html
<section class="portfolio-hero">
  <div class="portfolio-hero-bg"></div>
  <div class="portfolio-hero-overlay"></div>
  <div class="container portfolio-hero-content">
    <span class="section-eyebrow">Linha Completa</span>
    <h1 class="portfolio-hero-title">NOSSOS<br><em>PRODUTOS</em></h1>
    <p class="portfolio-hero-sub">Equipamentos projetados e fabricados para operações onde a falha não é opção.</p>
  </div>
  <!-- Navegação por categoria -->
  <div class="portfolio-cat-nav">
    <button class="portfolio-cat-btn active" data-cat="all">Todos</button>
    <button class="portfolio-cat-btn" data-cat="hpu">Unidades Hidráulicas</button>
    <button class="portfolio-cat-btn" data-cat="cleaning">Máquinas de Limpeza</button>
    <button class="portfolio-cat-btn" data-cat="accessories">Acessórios</button>
  </div>
</section>
```

CSS do hero da página:
```css
.portfolio-hero {
  position: relative;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--color-primary-dark);
}

.portfolio-hero-bg {
  position: absolute;
  inset: 0;
  background: url('assets/produtos/unidade_fundo_preto.jpg') center/cover no-repeat;
  filter: brightness(0.25);
}

.portfolio-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(5,20,15,0.3) 0%, rgba(5,20,15,0.95) 100%);
}

.portfolio-hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding-top: 140px;
  padding-bottom: 40px;
}

.portfolio-hero-title {
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.02em;
  line-height: 1;
  margin-bottom: 20px;
}

.portfolio-hero-title em {
  color: var(--color-accent-orange);
  font-style: normal;
}

.portfolio-hero-sub {
  font-size: 1rem;
  color: rgba(255,255,255,0.55);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.7;
}

/* Navegação por categoria */
.portfolio-cat-nav {
  position: relative;
  z-index: 2;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 32px 24px 48px;
}

.portfolio-cat-btn {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  background: transparent;
  border: 1px solid rgba(255,255,255,0.15);
  padding: 8px 20px;
  cursor: pointer;
  transition: all 0.25s ease;
  border-radius: 2px;
}

.portfolio-cat-btn:hover,
.portfolio-cat-btn.active {
  color: #fff;
  border-color: var(--color-accent-orange);
  background: rgba(224,123,42,0.12);
}
```

---

### 2. Carrossel de produtos fullwidth (estilo Lamborghini)

Após o hero, inserir o carrossel principal:

```html
<section class="produtos-showcase" id="produtos-showcase">

  <!-- Produto 1: CH1S -->
  <div class="produto-showcase-item" data-cat="hpu" data-index="0">
    <div class="psi-media">
      <img src="assets/CH1S/ch1s_1.jpg" alt="CH1S Unidade Hidráulica" loading="lazy">
      <div class="psi-media-overlay"></div>
    </div>
    <div class="psi-content">
      <div class="psi-counter">01</div>
      <span class="psi-category">Unidades Hidráulicas</span>
      <h2 class="psi-title">CH1S</h2>
      <p class="psi-desc">Unidade hidráulica a combustão de 1 tomada. Compacta, robusta e projetada para operações navais em espaços reduzidos.</p>
      <div class="psi-actions">
        <a href="produto_ch1s.html" class="btn btn-primary">Ver Especificações</a>
        <a href="assets/catalogos/CH1S_25HP.pdf" class="btn btn-outline" download>Catálogo PDF</a>
      </div>
    </div>
  </div>

  <!-- Produto 2: CH2S -->
  <div class="produto-showcase-item" data-cat="hpu" data-index="1">
    <div class="psi-media">
      <img src="assets/CH2S/ch2s_1.jpeg" alt="CH2S Unidade Hidráulica" loading="lazy">
      <div class="psi-media-overlay"></div>
    </div>
    <div class="psi-content">
      <div class="psi-counter">02</div>
      <span class="psi-category">Unidades Hidráulicas</span>
      <h2 class="psi-title">CH2S</h2>
      <p class="psi-desc">Unidade hidráulica a combustão de 2 tomadas. Alta pressão e vazão para operações simultâneas de limpeza de casco.</p>
      <div class="psi-actions">
        <a href="produto_ch2s.html" class="btn btn-primary">Ver Especificações</a>
        <a href="assets/catalogos/CH2S_35HP.pdf" class="btn btn-outline" download>Catálogo PDF</a>
      </div>
    </div>
  </div>

  <!-- Produto 3: CH3SD -->
  <div class="produto-showcase-item" data-cat="hpu" data-index="2">
    <div class="psi-media">
      <img src="assets/CH3SD/ch3sd_1.jpg" alt="CH3SD Unidade Hidráulica" loading="lazy">
      <div class="psi-media-overlay"></div>
    </div>
    <div class="psi-content">
      <div class="psi-counter">03</div>
      <span class="psi-category">Unidades Hidráulicas</span>
      <h2 class="psi-title">CH3SD</h2>
      <p class="psi-desc">Unidade hidráulica a combustão de 3 tomadas com motor 27HP. Para operações de grande escala com múltiplas ferramentas simultâneas.</p>
      <div class="psi-actions">
        <a href="produto_ch3sd.html" class="btn btn-primary">Ver Especificações</a>
        <a href="assets/catalogos/CH3SD_27HP.pdf" class="btn btn-outline" download>Catálogo PDF</a>
      </div>
    </div>
  </div>

  <!-- Produto 4: CHE2S -->
  <div class="produto-showcase-item" data-cat="hpu" data-index="3">
    <div class="psi-media">
      <img src="assets/CHE2S/che2s_1.jpeg" alt="CHE2S Unidade Elétrica" loading="lazy">
      <div class="psi-media-overlay"></div>
    </div>
    <div class="psi-content">
      <div class="psi-counter">04</div>
      <span class="psi-category">Unidades Hidráulicas</span>
      <h2 class="psi-title">CHE2S</h2>
      <p class="psi-desc">Unidade hidráulica elétrica de 2 tomadas. Ideal para ambientes confinados e plataformas onde motores a combustão são restritos.</p>
      <div class="psi-actions">
        <a href="produto_che2s.html" class="btn btn-primary">Ver Especificações</a>
        <a href="assets/catalogos/CHE2S.pdf" class="btn btn-outline" download>Catálogo PDF</a>
      </div>
    </div>
  </div>

  <!-- Produto 5: CAMC30 -->
  <div class="produto-showcase-item" data-cat="hpu" data-index="4">
    <div class="psi-media">
      <img src="assets/produtos/unidade_fundo_preto.jpg" alt="CAMC30 Compressor" loading="lazy">
      <div class="psi-media-overlay"></div>
    </div>
    <div class="psi-content">
      <div class="psi-counter">05</div>
      <span class="psi-category">Unidades Hidráulicas</span>
      <h2 class="psi-title">CAMC30</h2>
      <p class="psi-desc">Compressor de ar para mergulho autônomo. Equipamento de suporte crítico para operações subaquáticas com segurança certificada.</p>
      <div class="psi-actions">
        <a href="produto_camc30.html" class="btn btn-primary">Ver Especificações</a>
        <a href="assets/catalogos/CAMC30.pdf" class="btn btn-outline" download>Catálogo PDF</a>
      </div>
    </div>
  </div>

  <!-- Produto 6: HPJ40 -->
  <div class="produto-showcase-item" data-cat="cleaning" data-index="5">
    <div class="psi-media">
      <img src="assets/hpj40/hpj40_1.png" alt="HPJ40 Máquina de Limpeza" loading="lazy">
      <div class="psi-media-overlay"></div>
    </div>
    <div class="psi-content">
      <div class="psi-counter">06</div>
      <span class="psi-category">Máquinas de Limpeza</span>
      <h2 class="psi-title">HPJ-40</h2>
      <p class="psi-desc">Máquina de limpeza de casco subaquática de alta pressão. Reduz tempo de doca seca e melhora eficiência de combustível da embarcação.</p>
      <div class="psi-actions">
        <a href="produto_hpj40.html" class="btn btn-primary">Ver Especificações</a>
        <a href="assets/catalogos/PHJ-40.pdf" class="btn btn-outline" download>Catálogo PDF</a>
      </div>
    </div>
  </div>

  <!-- Produto 7: HPJ41 -->
  <div class="produto-showcase-item" data-cat="cleaning" data-index="6">
    <div class="psi-media">
      <img src="assets/hpj41/hpj41_1.png" alt="HPJ41 Máquina de Limpeza" loading="lazy">
      <div class="psi-media-overlay"></div>
    </div>
    <div class="psi-content">
      <div class="psi-counter">07</div>
      <span class="psi-category">Máquinas de Limpeza</span>
      <h2 class="psi-title">HPJ-41</h2>
      <p class="psi-desc">Versão avançada da linha HPJ com sistema de fixação magnética. Opera em cascos verticais e curvos sem suporte de mergulhador.</p>
      <div class="psi-actions">
        <a href="produto_hpj41.html" class="btn btn-primary">Ver Especificações</a>
        <a href="assets/catalogos/PHJ-41.pdf" class="btn btn-outline" download>Catálogo PDF</a>
      </div>
    </div>
  </div>

  <!-- Produto 8: HPJ25 -->
  <div class="produto-showcase-item" data-cat="cleaning" data-index="7">
    <div class="psi-media">
      <img src="assets/hpj25/hpj25_1.png" alt="HPJ25 Máquina de Limpeza" loading="lazy">
      <div class="psi-media-overlay"></div>
    </div>
    <div class="psi-content">
      <div class="psi-counter">08</div>
      <span class="psi-category">Máquinas de Limpeza</span>
      <h2 class="psi-title">HPJ-25</h2>
      <p class="psi-desc">Máquina de limpeza compacta para embarcações de menor porte. Mesma tecnologia HPJ em formato portátil para operações ágeis.</p>
      <div class="psi-actions">
        <a href="produto_hpj25.html" class="btn btn-primary">Ver Especificações</a>
      </div>
    </div>
  </div>

  <!-- Produto 9: Mangotes -->
  <div class="produto-showcase-item" data-cat="accessories" data-index="8">
    <div class="psi-media">
      <img src="assets/mangote/mangote_1.png" alt="Mangotes MHTP" loading="lazy">
      <div class="psi-media-overlay"></div>
    </div>
    <div class="psi-content">
      <div class="psi-counter">09</div>
      <span class="psi-category">Acessórios</span>
      <h2 class="psi-title">MANGOTES MHTP</h2>
      <p class="psi-desc">Conjunto de mangueiras hidráulicas de alta pressão para uso subaquático. Desenvolvidos para trabalhar em conjunto com as unidades Equipamec.</p>
      <div class="psi-actions">
        <a href="produto_mangote.html" class="btn btn-primary">Ver Especificações</a>
        <a href="assets/catalogos/mangote_mhtp.pdf" class="btn btn-outline" download>Catálogo PDF</a>
      </div>
    </div>
  </div>

  <!-- Produto 10: Escovas -->
  <div class="produto-showcase-item" data-cat="accessories" data-index="9">
    <div class="psi-media">
      <img src="assets/produtos/hpj_deck.jpg" alt="Linha ECA Escovas" loading="lazy">
      <div class="psi-media-overlay"></div>
    </div>
    <div class="psi-content">
      <div class="psi-counter">10</div>
      <span class="psi-category">Acessórios</span>
      <h2 class="psi-title">LINHA ECA</h2>
      <p class="psi-desc">Escovas de aço e nylon para limpeza de casco em diferentes condições de incrustação. Compatíveis com as máquinas HPJ-40 e HPJ-41.</p>
      <div class="psi-actions">
        <a href="produto_escovas.html" class="btn btn-primary">Ver Especificações</a>
        <a href="assets/catalogos/LINHA_ECA.pdf" class="btn btn-outline" download>Catálogo PDF</a>
      </div>
    </div>
  </div>

</section>
```

---

### CSS do showcase:

```css
/* ===== PRODUTOS SHOWCASE ===== */
.produtos-showcase {
  background: var(--color-primary-dark);
}

.produto-showcase-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 90vh;
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(255,255,255,0.06);
}

/* Alternar lado da imagem */
.produto-showcase-item:nth-child(even) {
  direction: rtl;
}
.produto-showcase-item:nth-child(even) > * {
  direction: ltr;
}

/* Estado oculto para filtro */
.produto-showcase-item.hidden {
  display: none;
}

/* Mídia */
.psi-media {
  position: relative;
  overflow: hidden;
}

.psi-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.8s ease;
  filter: brightness(0.8);
}

.produto-showcase-item:hover .psi-media img {
  transform: scale(1.04);
  filter: brightness(0.95);
}

.psi-media-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    transparent 60%,
    var(--color-primary-dark) 100%
  );
}

.produto-showcase-item:nth-child(even) .psi-media-overlay {
  background: linear-gradient(
    to left,
    transparent 60%,
    var(--color-primary-dark) 100%
  );
}

/* Conteúdo */
.psi-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px 64px;
  position: relative;
}

.psi-counter {
  font-size: 5rem;
  font-weight: 900;
  color: rgba(255,255,255,0.05);
  line-height: 1;
  position: absolute;
  top: 32px;
  right: 40px;
  letter-spacing: -0.04em;
  user-select: none;
}

.produto-showcase-item:nth-child(even) .psi-counter {
  right: auto;
  left: 40px;
}

.psi-category {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-accent-orange);
  margin-bottom: 16px;
}

.psi-title {
  font-size: clamp(2.5rem, 4vw, 4rem);
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.02em;
  line-height: 1;
  margin-bottom: 20px;
  position: relative;
}

.psi-title::after {
  content: '';
  display: block;
  width: 48px;
  height: 4px;
  background: var(--color-accent-orange);
  margin-top: 16px;
}

.psi-desc {
  font-size: 0.95rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.75;
  max-width: 420px;
  margin-bottom: 36px;
}

.psi-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* Mobile */
@media (max-width: 900px) {
  .produto-showcase-item {
    grid-template-columns: 1fr;
    grid-template-rows: 50vw auto;
    min-height: auto;
    direction: ltr !important;
  }

  .produto-showcase-item > * {
    direction: ltr !important;
  }

  .psi-media-overlay {
    background: linear-gradient(
      to top,
      var(--color-primary-dark) 0%,
      transparent 60%
    ) !important;
  }

  .psi-content {
    padding: 32px 24px 48px;
  }

  .psi-counter {
    font-size: 3rem;
    top: 16px;
    right: 16px;
    left: auto !important;
  }

  .psi-title { font-size: clamp(2rem, 7vw, 3rem); }
}
```

---

### JavaScript — filtro por categoria + animações GSAP:

Adicionar em script.js dentro do DOMContentLoaded (não no runGSAPAnimations):

```js
// Portfolio showcase filter
const catBtns = document.querySelectorAll('.portfolio-cat-btn');
const showcaseItems = document.querySelectorAll('.produto-showcase-item');

if (catBtns.length && showcaseItems.length) {
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-cat');

      showcaseItems.forEach((item, i) => {
        const itemCat = item.getAttribute('data-cat');
        const show = cat === 'all' || itemCat === cat;

        if (show) {
          item.classList.remove('hidden');
          // Renumerar contadores visíveis
          const visibleItems = [...showcaseItems].filter(it => !it.classList.contains('hidden'));
          visibleItems.forEach((vi, idx) => {
            const counter = vi.querySelector('.psi-counter');
            if (counter) counter.textContent = String(idx + 1).padStart(2, '0');
          });
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}
```

Adicionar em runGSAPAnimations() (já existe no script.js):

```js
// Portfolio showcase scroll animations
if (document.querySelector('.produto-showcase-item')) {
  document.querySelectorAll('.produto-showcase-item').forEach((item, i) => {
    const content = item.querySelector('.psi-content');
    const media = item.querySelector('.psi-media');
    const isEven = i % 2 === 1;

    gsap.set([content, media], { opacity: 1 });

    ScrollTrigger.create({
      trigger: item,
      start: 'top bottom-=100px',
      once: true,
      onEnter: () => {
        gsap.fromTo(media,
          { opacity: 0, x: isEven ? 40 : -40 },
          { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out' }
        );
        gsap.fromTo(content,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.15 }
        );
      }
    });
  });
}
```

---

## Remover do portfolio.html

- Todo o bloco `<div id="img-filters" ...>` (filtros antigos)
- Todo o bloco `<div id="portfolio-grid" ...>` (grid Isotope)
- Scripts: `imagesloaded` e `isotope` (não são mais necessários)
- Manter: GLightbox (pode ser usado nas páginas de produto individuais)

## Aplicar em EN e ES

Após concluir portfolio.html, replicar em en/portfolio.html e es/portfolio.html
com textos traduzidos. As categorias e nomes de produto permanecem em inglês/espanhol
conforme padrão já estabelecido no projeto.

## Ordem de execução
1. Substituir <main> do portfolio.html pelo novo HTML
2. Adicionar CSS do showcase no style.css (após os estilos existentes)
3. Adicionar JS do filtro no DOMContentLoaded em script.js
4. Adicionar animações GSAP no runGSAPAnimations() em script.js
5. Remover scripts desnecessários do portfolio.html
6. Replicar em en/portfolio.html e es/portfolio.html
7. Commit: "feat: portfolio redesign estilo showcase fullwidth com filtros por categoria"
