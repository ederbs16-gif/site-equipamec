# Prompt v3 — Carrossel de Produtos + Correções Gerais

## Contexto
Site estático Equipamec. Stack: HTML5, CSS3, Vanilla JS + GSAP 3.12.5.
Ler skills antes de executar: .claude/skills/ui-ux-pro-max/SKILL.md e demais em .claude/skills/

---

## PARTE 1 — Correções dos bugs reportados

### 1.1 — Hero: responsividade mobile
O vídeo do hero está desproporcional no mobile. Corrigir:
```css
@media (max-width: 768px) {
  .hero {
    min-height: 100svh;
  }
  .hero-video {
    object-fit: cover;
    object-position: 60% center;
  }
  .hero-content {
    padding-top: 100px;
    padding-bottom: 60px;
    max-width: 100%;
  }
  .hero-title {
    font-size: clamp(2rem, 8vw, 3rem);
  }
}
```

### 1.2 — Stats: corrigir valor de 12 para 15 anos
Localizar todos os data-target com valor "12" referente a anos de experiência e substituir por "15".
Aplicar em index.html, en/index.html, es/index.html.

### 1.3 — Google Maps: largura excessiva
O iframe do mapa está ocupando largura total da página. Corrigir o layout da seção de contato:
```css
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

.map-wrapper {
  width: 100%;
  max-width: 100%;
  border-radius: 12px;
  overflow: hidden;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
```
Se a estrutura atual não usar .contact-grid, inspecionar o HTML da seção #contato e ajustar para colocar formulário e mapa lado a lado no desktop, empilhados no mobile.

### 1.4 — Bandeiras de idioma não aparecem
Se as flags emoji não renderizarem, usar imagens SVG inline via CDN do flagcdn:
```html
<a href="/index.html" class="lang-btn active">
  <img src="https://flagcdn.com/16x12/br.png" width="16" height="12" alt="Português"> PT
</a>
<a href="/en/index.html" class="lang-btn">
  <img src="https://flagcdn.com/16x12/us.png" width="16" height="12" alt="English"> EN
</a>
<a href="/es/index.html" class="lang-btn">
  <img src="https://flagcdn.com/16x12/es.png" width="16" height="12" alt="Español"> ES
</a>
```
Aplicar em TODOS os 36 arquivos HTML (index.html, en/index.html, es/index.html e todas as páginas de produto).

### 1.5 — Favicon: usar engrenagem do logo
O favicon atual não é a engrenagem. Substituir o favicon em todos os HTMLs para apontar para assets/favicon.svg.
Verificar se assets/favicon.svg existe. Se existir e for a engrenagem do logo, apenas garantir que todos os HTMLs tenham:
```html
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
<link rel="alternate icon" href="/assets/favicon.ico">
```
Se favicon.svg não existir ou não for a engrenagem, criar um SVG simples da engrenagem nas cores da marca (teal #1a5c4a, laranja #e07b2a).

### 1.6 — Carrossel de parceiros: não aparece em EN e ES
Verificar por que o carrossel some nas versões en/ e es/. O carrossel usa imagens com caminho relativo (../assets/parceiros/). Garantir que os caminhos estejam corretos para arquivos dentro de subpastas. Corrigir todos os caminhos de assets nas páginas multilíngues que estiverem usando caminho sem ../

---

## PARTE 2 — Nova seção: Carrossel de Produtos (estilo Lamborghini)

### Posicionamento
Inserir APÓS a seção hero e ANTES da seção stats/sobre. Esta será a primeira seção de conteúdo que o usuário vê ao rolar.

### Estrutura HTML (inserir em index.html, en/index.html, es/index.html):

```html
<section class="produtos-destaque" id="produtos-destaque">
  <div class="produtos-header container">
    <h2 class="produtos-titulo">PRODUTOS</h2>
    <a href="portfolio.html" class="produtos-ver-todos">
      VER TODOS OS PRODUTOS <span class="arrow">→</span>
    </a>
  </div>

  <div class="produtos-carrossel-wrap">
    <button class="prod-nav prod-nav-prev" aria-label="Anterior">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>

    <div class="produtos-track" id="produtosTrack">

      <!-- Card 1: Unidades Hidráulicas -->
      <div class="produto-card">
        <div class="produto-img-wrap">
          <img src="assets/produtos/unidade_fundo_preto.jpg"
               alt="Unidade Hidráulica Equipamec"
               loading="lazy">
          <div class="produto-img-overlay"></div>
        </div>
        <div class="produto-info">
          <span class="produto-categoria">Linha Hidráulica</span>
          <h3 class="produto-nome">UNIDADES<br>HIDRÁULICAS</h3>
          <p class="produto-desc">CH1S · CH2S · CH3SD · CHE2S · CAMC30</p>
          <a href="produto_ch2s.html" class="produto-link">
            Ver linha completa <span>→</span>
          </a>
        </div>
      </div>

      <!-- Card 2: Segunda Unidade -->
      <div class="produto-card">
        <div class="produto-img-wrap">
          <img src="assets/produtos/unidade_galpao.jpg"
               alt="Unidade Hidráulica CH3SD Equipamec"
               loading="lazy">
          <div class="produto-img-overlay"></div>
        </div>
        <div class="produto-info">
          <span class="produto-categoria">Alta Potência</span>
          <h3 class="produto-nome">UNIDADE<br>CH3SD 27HP</h3>
          <p class="produto-desc">3 tomadas · Motor Branco · Uso offshore</p>
          <a href="produto_ch3sd.html" class="produto-link">
            Ver especificações <span>→</span>
          </a>
        </div>
      </div>

      <!-- Card 3: Limpeza de Casco -->
      <div class="produto-card">
        <div class="produto-img-wrap">
          <img src="assets/produtos/hpj_deck.jpg"
               alt="Máquina HPJ Limpeza de Casco Equipamec"
               loading="lazy">
          <div class="produto-img-overlay"></div>
        </div>
        <div class="produto-info">
          <span class="produto-categoria">Limpeza Naval</span>
          <h3 class="produto-nome">MÁQUINAS<br>HPJ</h3>
          <p class="produto-desc">HPJ-40 · HPJ-41 · Alta pressão subaquática</p>
          <a href="produto_hpj40.html" class="produto-link">
            Ver linha completa <span>→</span>
          </a>
        </div>
      </div>

      <!-- Card 4: Placeholder Caldeiraria (comentado até ter foto) -->
      <!--
      <div class="produto-card">
        <div class="produto-img-wrap">
          <img src="assets/produtos/caldeiraria.jpg" alt="Caldeiraria Equipamec" loading="lazy">
          <div class="produto-img-overlay"></div>
        </div>
        <div class="produto-info">
          <span class="produto-categoria">Estruturas Metálicas</span>
          <h3 class="produto-nome">CALDEIRARIA<br>& RETROFIT</h3>
          <p class="produto-desc">Estruturas sob medida · Retrofit de geradores</p>
          <a href="portfolio.html" class="produto-link">Ver projetos <span>→</span></a>
        </div>
      </div>
      -->

    </div><!-- /produtos-track -->

    <button class="prod-nav prod-nav-next" aria-label="Próximo">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>
  </div>

  <div class="produtos-dots" id="produtosDots"></div>
</section>
```

### CSS:
```css
/* ===== SEÇÃO PRODUTOS DESTAQUE ===== */
.produtos-destaque {
  background: var(--color-primary-dark);
  padding: 60px 0 40px;
  overflow: hidden;
}

.produtos-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 32px;
  padding: 0 40px;
}

.produtos-titulo {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.02em;
  position: relative;
  display: inline-block;
}

.produtos-titulo::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 5px;
  background: var(--color-accent-orange);
}

.produtos-ver-todos {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  padding-bottom: 2px;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.produtos-ver-todos:hover {
  color: var(--color-accent-orange);
  border-color: var(--color-accent-orange);
}

.produtos-ver-todos .arrow {
  transition: transform 0.2s ease;
}

.produtos-ver-todos:hover .arrow {
  transform: translateX(4px);
}

/* Wrapper do carrossel */
.produtos-carrossel-wrap {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0;
}

.produtos-track {
  display: flex;
  gap: 0;
  overflow-x: hidden;
  scroll-behavior: smooth;
  width: 100%;
}

/* Cards */
.produto-card {
  flex: 0 0 calc(100% / 2.5);
  min-width: 0;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

@media (max-width: 768px) {
  .produto-card {
    flex: 0 0 85%;
  }
}

.produto-img-wrap {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
}

.produto-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
  filter: brightness(0.75);
}

.produto-card:hover .produto-img-wrap img {
  transform: scale(1.04);
  filter: brightness(0.9);
}

.produto-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(5, 20, 15, 0.92) 0%,
    rgba(5, 20, 15, 0.3) 50%,
    transparent 100%
  );
}

.produto-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  transform: translateY(8px);
  transition: transform 0.3s ease;
}

.produto-card:hover .produto-info {
  transform: translateY(0);
}

.produto-categoria {
  display: block;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-accent-orange);
  margin-bottom: 8px;
}

.produto-nome {
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.01em;
  line-height: 1.05;
  margin-bottom: 8px;
}

.produto-desc {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.55);
  margin-bottom: 16px;
  letter-spacing: 0.03em;
}

.produto-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.3);
  padding-bottom: 2px;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s, color 0.2s ease;
}

.produto-card:hover .produto-link {
  opacity: 1;
  transform: translateY(0);
}

.produto-link:hover {
  color: var(--color-accent-orange);
  border-color: var(--color-accent-orange);
}

/* Botões de navegação */
.prod-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 48px;
  height: 48px;
  border: 1px solid rgba(255,255,255,0.25);
  background: rgba(5, 20, 15, 0.7);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: background 0.2s ease, border-color 0.2s ease;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}

.prod-nav svg {
  width: 20px;
  height: 20px;
}

.prod-nav:hover {
  background: var(--color-accent-orange);
  border-color: var(--color-accent-orange);
}

.prod-nav-prev { left: 16px; }
.prod-nav-next { right: 16px; }

/* Dots */
.produtos-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
}

.produtos-dots .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.produtos-dots .dot.active {
  background: var(--color-accent-orange);
  transform: scale(1.3);
}
```

### JavaScript (adicionar dentro do window load, junto com o GSAP):
```js
// Carrossel de produtos
(function() {
  const track = document.getElementById('produtosTrack');
  const dotsWrap = document.getElementById('produtosDots');
  if (!track) return;

  const cards = track.querySelectorAll('.produto-card');
  const total = cards.length;
  let current = 0;

  // Criar dots
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(index) {
    current = Math.max(0, Math.min(index, total - 1));
    const cardWidth = cards[0].offsetWidth;
    track.scrollTo({ left: current * cardWidth, behavior: 'smooth' });
    dotsWrap.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  document.querySelector('.prod-nav-prev')?.addEventListener('click', () => goTo(current - 1));
  document.querySelector('.prod-nav-next')?.addEventListener('click', () => goTo(current + 1));

  // Animação GSAP de entrada
  gsap.from('.produto-card', {
    scrollTrigger: { trigger: '.produtos-destaque', start: 'top 80%' },
    opacity: 0,
    x: 60,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power2.out'
  });
})();
```

---

## PARTE 3 — Botões de download de catálogo em todas as páginas de produto

O CH2S já tem o botão de download funcionando. Replicar o mesmo padrão para todos os outros produtos.

Mapeamento produto → arquivo de catálogo (todos em assets/catalogos/):

| Página | Arquivo do catálogo |
|---|---|
| produto_ch1s.html | CH1S_25HP.pdf |
| produto_ch3sd.html | CH3SD_27HP.pdf |
| produto_che2s.html | CHE2S.pdf |
| produto_camc30.html | CAMC30.pdf |
| produto_hpj40.html | PHJ-40.pdf |
| produto_hpj41.html | PHJ-41.pdf |
| produto_hpj25.html | — (sem catálogo, não adicionar botão) |
| produto_escovas.html | LINHA_ECA.pdf |
| produto_mangote.html | mangote_mhtp.pdf |

Para cada página, inspecionar como o botão está implementado no CH2S (produto_ch2s.html) e replicar exatamente o mesmo HTML e CSS, apenas trocando o href para o arquivo correspondente.

Aplicar também nas versões en/ e es/ de cada página, ajustando o texto do botão:
- PT: "Baixar Catálogo"
- EN: "Download Catalog"
- ES: "Descargar Catálogo"

---

## PARTE 4 — Copiar fotos para a pasta correta

Copiar os arquivos de imagem de produto para assets/produtos/:
- unidade_fundo_preto.jpg
- unidade_galpao.jpg
- hpj_deck.jpg

Se a pasta assets/produtos/ não existir, criar.

---

## Ordem de execução

1. Ler skills (.claude/skills/)
2. Parte 4 (criar pasta e copiar fotos)
3. Parte 1.1 (hero mobile)
4. Parte 1.2 (stats 15 anos)
5. Parte 1.3 (mapa largura)
6. Parte 1.4 (bandeiras CDN)
7. Parte 1.5 (favicon engrenagem)
8. Parte 1.6 (carrossel parceiros multilíngue)
9. Parte 2 (carrossel de produtos)
10. Parte 3 (botões catálogo)
11. Commit: "feat: carrossel produtos, fixes mobile hero, stats 15 anos, mapa, bandeiras, catálogos"

## Regras
- Não alterar o hero além do CSS de responsividade
- Manter paridade PT/EN/ES em todas as alterações
- Não remover funcionalidades existentes
- Usar /impeccable audit ao final
