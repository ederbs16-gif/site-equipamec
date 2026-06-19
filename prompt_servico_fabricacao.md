# Prompt — Página de Serviço: Fabricação de Equipamentos Hidráulicos

## Contexto
Criar a página servico_fabricacao.html como apresentação institucional da capacidade
de fabricação da Equipamec. Não é página de produto — é apresentação do processo e
diferencial competitivo. Mesma navbar e footer do restante do site.

Criar também en/servico_fabricacao.html e es/servico_fabricacao.html com traduções.

## Fotos disponíveis
Copiar os arquivos abaixo para assets/fabricacao/ antes de criar a página:
- fab_galpao_teto.jpg (galpão amplo visto de cima, pé direito alto)
- fab_galpao_amplo.jpg (galpão completo com setores visíveis)
- fab_galpao_setores.jpg (setores: Solda, Usinagem, Tornearia, Central de Teste)
- fab_galpao_maquinas.jpg (tornos e equipamentos alinhados)
- fab_galpao_caldeiraria.jpg (setor de caldeiraria)
- fab_solda_close.jpg (soldador com máscara Balmer, faísca azul)
- fab_tornearia_operador.jpg (operador no torno mecânico)
- fab_estrutura_motor.jpg (chassis em aço sendo montado com motor)
- fab_painel_bruto.jpg (painel frontal em aço bruto com manômetros)
- fab_motor_chassis.jpg (motor integrado ao chassis aberto)
- fab_motor_detalhe.jpg (motor com ferramentas na bancada)
- fab_compressor_chassis.jpg (compressor no chassis, vista interna)
- fab_unidade_pronta.jpg (unidade hidráulica finalizada no galpão)
- fab_unidade_finalizada.jpg (unidade CH3SD finalizada, vista lateral)

---

## HTML completo: servico_fabricacao.html

Usar o mesmo padrão de cabeçalho/rodapé do index.html (navbar, footer, GSAP CDN,
botão flutuante WhatsApp, bandeiras de idioma).

### Estrutura da página:

**Seção 1 — Hero da página**
```html
<section class="servico-hero">
  <div class="servico-hero-bg" style="background-image: url('assets/fabricacao/fab_galpao_teto.jpg')"></div>
  <div class="servico-hero-overlay"></div>
  <div class="container servico-hero-content">
    <span class="section-eyebrow">Nossas Capacidades</span>
    <h1 class="servico-hero-title">Fabricação de<br><em>Equipamentos Hidráulicos</em></h1>
    <p class="servico-hero-sub">Do projeto à entrega. Tudo fabricado na nossa planta em Caraguatatuba, com tecnologia desenvolvida internamente ao longo de 15 anos.</p>
  </div>
</section>
```

**Seção 2 — Linha do tempo do processo (horizontal no desktop, vertical no mobile)**

Narrativa: o visitante vê o equipamento nascer em etapas. Cada etapa tem foto + número + título + texto curto.

```html
<section class="fab-processo" id="processo">
  <div class="container">
    <span class="section-eyebrow">Como Fazemos</span>
    <h2 class="section-title">Do Aço Bruto ao Equipamento Pronto</h2>
  </div>

  <div class="fab-steps">

    <div class="fab-step">
      <div class="fab-step-num">01</div>
      <div class="fab-step-img">
        <img src="assets/fabricacao/fab_estrutura_motor.jpg" alt="Fabricação do chassis em aço" loading="lazy">
      </div>
      <div class="fab-step-content">
        <h3>Chassis & Caldeiraria</h3>
        <p>Toda estrutura metálica é fabricada internamente em aço carbono. O chassi é projetado para suportar operações em ambientes de alta vibração e exposição marinha, com dimensionamento feito pelos nossos técnicos para cada modelo.</p>
      </div>
    </div>

    <div class="fab-step">
      <div class="fab-step-num">02</div>
      <div class="fab-step-img">
        <img src="assets/fabricacao/fab_solda_close.jpg" alt="Soldagem estrutural" loading="lazy">
      </div>
      <div class="fab-step-content">
        <h3>Soldagem Estrutural</h3>
        <p>Soldagem MIG/MAG realizada por profissionais capacitados, com equipamentos Balmer. Cada ponto de solda é inspecionado antes de seguir para a etapa seguinte. Não terceirizamos essa etapa — ela define a integridade do equipamento.</p>
      </div>
    </div>

    <div class="fab-step">
      <div class="fab-step-num">03</div>
      <div class="fab-step-img">
        <img src="assets/fabricacao/fab_painel_bruto.jpg" alt="Usinagem do painel frontal" loading="lazy">
      </div>
      <div class="fab-step-content">
        <h3>Usinagem & Painel</h3>
        <p>O painel frontal é fresado e furado com tolerâncias precisas para acomodar manômetros, válvulas e passagem de mangueiras. Nosso setor de usinagem permite fabricar peças personalizadas sem depender de fornecedores externos.</p>
      </div>
    </div>

    <div class="fab-step">
      <div class="fab-step-num">04</div>
      <div class="fab-step-img">
        <img src="assets/fabricacao/fab_motor_chassis.jpg" alt="Integração do motor" loading="lazy">
      </div>
      <div class="fab-step-content">
        <h3>Integração do Motor</h3>
        <p>Motores a combustão (Branco, Terramar) ou elétricos são acoplados ao chassis com alinhamento milimétrico. A transmissão hidráulica é montada e ajustada nessa etapa, garantindo que pressão e vazão estejam dentro das especificações antes de fechar o equipamento.</p>
      </div>
    </div>

    <div class="fab-step">
      <div class="fab-step-num">05</div>
      <div class="fab-step-img">
        <img src="assets/fabricacao/fab_tornearia_operador.jpg" alt="Tornearia de peças" loading="lazy">
      </div>
      <div class="fab-step-content">
        <h3>Tornearia & Peças Especiais</h3>
        <p>Peças que não existem no mercado ou que precisam de adaptação específica são torneadas internamente. Isso nos permite atender demandas customizadas sem prazo de fornecedor e sem custo extra de importação.</p>
      </div>
    </div>

    <div class="fab-step">
      <div class="fab-step-num">06</div>
      <div class="fab-step-img">
        <img src="assets/fabricacao/fab_unidade_finalizada.jpg" alt="Unidade finalizada e testada" loading="lazy">
      </div>
      <div class="fab-step-content">
        <h3>Teste & Entrega</h3>
        <p>Antes de sair da fábrica, cada unidade passa pela Central de Teste, onde é operada em carga real. Pressão, vazão, temperatura e vedação são verificados. O equipamento só é liberado quando atinge as especificações de projeto.</p>
      </div>
    </div>

  </div>
</section>
```

**Seção 3 — Galeria da fábrica (grid de fotos com GLightbox)**

```html
<section class="fab-galeria" id="galeria-fabrica">
  <div class="container">
    <span class="section-eyebrow">Nossa Fábrica</span>
    <h2 class="section-title">Estrutura Própria em Caraguatatuba</h2>
    <p class="section-sub">Mais de 400m² de área fabril com setores especializados: Caldeiraria, Solda, Usinagem, Tornearia e Central de Testes.</p>
  </div>

  <div class="fab-grid">
    <a href="assets/fabricacao/fab_galpao_amplo.jpg" class="glightbox fab-grid-item fab-grid-large">
      <img src="assets/fabricacao/fab_galpao_amplo.jpg" alt="Galpão Equipamec" loading="lazy">
      <div class="fab-grid-overlay"><span>Área Fabril</span></div>
    </a>
    <a href="assets/fabricacao/fab_galpao_setores.jpg" class="glightbox fab-grid-item">
      <img src="assets/fabricacao/fab_galpao_setores.jpg" alt="Setores da fábrica" loading="lazy">
      <div class="fab-grid-overlay"><span>Setores Especializados</span></div>
    </a>
    <a href="assets/fabricacao/fab_galpao_maquinas.jpg" class="glightbox fab-grid-item">
      <img src="assets/fabricacao/fab_galpao_maquinas.jpg" alt="Equipamentos da fábrica" loading="lazy">
      <div class="fab-grid-overlay"><span>Máquinas e Equipamentos</span></div>
    </a>
    <a href="assets/fabricacao/fab_galpao_caldeiraria.jpg" class="glightbox fab-grid-item">
      <img src="assets/fabricacao/fab_galpao_caldeiraria.jpg" alt="Setor de caldeiraria" loading="lazy">
      <div class="fab-grid-overlay"><span>Caldeiraria</span></div>
    </a>
    <a href="assets/fabricacao/fab_unidade_pronta.jpg" class="glightbox fab-grid-item">
      <img src="assets/fabricacao/fab_unidade_pronta.jpg" alt="Equipamento pronto" loading="lazy">
      <div class="fab-grid-overlay"><span>Produto Finalizado</span></div>
    </a>
    <a href="assets/fabricacao/fab_galpao_teto.jpg" class="glightbox fab-grid-item">
      <img src="assets/fabricacao/fab_galpao_teto.jpg" alt="Vista aérea do galpão" loading="lazy">
      <div class="fab-grid-overlay"><span>Estrutura do Galpão</span></div>
    </a>
  </div>
</section>
```

**Seção 4 — Diferenciais (3 cards)**

```html
<section class="fab-diferenciais">
  <div class="container">
    <span class="section-eyebrow">Por que isso importa</span>
    <h2 class="section-title">Fabricação Própria como Diferencial</h2>

    <div class="fab-diff-grid">

      <div class="fab-diff-card">
        <div class="fab-diff-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
        </div>
        <h3>Rastreabilidade Total</h3>
        <p>Cada equipamento tem histórico completo de fabricação: quem soldou, quais peças foram usadas, data de teste e resultado. Sem terceirizações que quebram essa cadeia.</p>
      </div>

      <div class="fab-diff-card">
        <div class="fab-diff-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/>
          </svg>
        </div>
        <h3>Customização Real</h3>
        <p>Quando o cliente precisa de uma tomada extra, de uma configuração diferente de painel ou de uma adaptação de chassi, a gente faz. Não existe "não está no catálogo" quando a fábrica é sua.</p>
      </div>

      <div class="fab-diff-card">
        <div class="fab-diff-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3>Prazo Sob Controle</h3>
        <p>Com produção própria não dependemos de fornecedor com prazo indeterminado. Sabemos exatamente em que etapa está cada pedido e conseguimos antecipar quando o cliente precisa com urgência.</p>
      </div>

    </div>
  </div>
</section>
```

**Seção 5 — CTA final**

```html
<section class="fab-cta">
  <div class="container fab-cta-inner">
    <div>
      <h2>Precisa de um equipamento fora do padrão?</h2>
      <p>Fale com nossa equipe técnica. Se a aplicação exige algo que não está no catálogo, a fábrica está aqui para desenvolver.</p>
    </div>
    <div class="fab-cta-actions">
      <a href="portfolio.html" class="btn btn-outline">Ver Produtos Padrão</a>
      <a href="https://wa.me/5512991654319?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20discutir%20um%20projeto%20especial." target="_blank" class="btn btn-primary">Falar com Engenharia</a>
    </div>
  </div>
</section>
```

---

## CSS — adicionar no final do style.css

```css
/* ===== PÁGINA DE SERVIÇO: FABRICAÇÃO ===== */

/* Hero */
.servico-hero {
  position: relative;
  min-height: 65vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.servico-hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: brightness(0.3);
}

.servico-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(5,20,15,0.2) 0%, rgba(5,20,15,0.85) 100%);
}

.servico-hero-content {
  position: relative;
  z-index: 2;
  padding-top: 140px;
  padding-bottom: 60px;
  max-width: 700px;
}

.servico-hero-title {
  font-size: clamp(2.4rem, 5vw, 4rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 20px;
}

.servico-hero-title em {
  color: var(--color-accent-orange);
  font-style: normal;
}

.servico-hero-sub {
  font-size: 1rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.7;
  max-width: 560px;
}

/* Processo: steps */
.fab-processo {
  padding: 80px 0;
  background: var(--color-primary-dark);
}

.fab-steps {
  margin-top: 60px;
}

.fab-step {
  display: grid;
  grid-template-columns: 80px 1fr 1fr;
  gap: 0 40px;
  align-items: center;
  padding: 48px 6vw;
  border-top: 1px solid rgba(255,255,255,0.06);
  transition: background 0.3s ease;
}

.fab-step:hover {
  background: rgba(255,255,255,0.02);
}

.fab-step:nth-child(even) {
  grid-template-columns: 80px 1fr 1fr;
  direction: rtl;
}

.fab-step:nth-child(even) > * {
  direction: ltr;
}

.fab-step-num {
  font-size: 4.5rem;
  font-weight: 900;
  color: rgba(255,255,255,0.06);
  line-height: 1;
  letter-spacing: -0.04em;
  user-select: none;
}

.fab-step-img {
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 4/3;
}

.fab-step-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
  filter: brightness(0.85);
}

.fab-step:hover .fab-step-img img {
  transform: scale(1.04);
  filter: brightness(1);
}

.fab-step-content {
  padding: 0 20px;
}

.fab-step-content h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 12px;
  position: relative;
}

.fab-step-content h3::after {
  content: '';
  display: block;
  width: 36px;
  height: 3px;
  background: var(--color-accent-orange);
  margin-top: 10px;
}

.fab-step-content p {
  font-size: 0.95rem;
  color: rgba(255,255,255,0.55);
  line-height: 1.75;
}

/* Galeria da fábrica */
.fab-galeria {
  padding: 80px 0;
  background: #08191400;
}

.fab-galeria .section-sub {
  color: rgba(255,255,255,0.5);
  max-width: 600px;
  margin: 12px auto 48px;
  text-align: center;
  line-height: 1.7;
}

.fab-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 4px;
  padding: 0 4px;
}

.fab-grid-large {
  grid-column: span 2;
}

.fab-grid-item {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/3;
  display: block;
  cursor: pointer;
}

.fab-grid-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease, filter 0.3s ease;
  filter: brightness(0.75);
}

.fab-grid-item:hover img {
  transform: scale(1.05);
  filter: brightness(0.95);
}

.fab-grid-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 16px 16px;
  background: linear-gradient(to top, rgba(5,20,15,0.85) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.fab-grid-item:hover .fab-grid-overlay {
  opacity: 1;
}

.fab-grid-overlay span {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent-orange);
}

/* Diferenciais */
.fab-diferenciais {
  padding: 80px 0;
  background: var(--color-primary-dark);
  border-top: 1px solid rgba(255,255,255,0.06);
}

.fab-diff-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 48px;
}

.fab-diff-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px;
  padding: 32px 28px;
  transition: border-color 0.3s ease, transform 0.3s ease;
  position: relative;
  overflow: hidden;
}

.fab-diff-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 0; height: 3px;
  background: var(--color-accent-orange);
  transition: width 0.4s ease;
}

.fab-diff-card:hover::before { width: 100%; }

.fab-diff-card:hover {
  border-color: rgba(224,123,42,0.25);
  transform: translateY(-4px);
}

.fab-diff-icon {
  width: 48px;
  height: 48px;
  background: rgba(224,123,42,0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.fab-diff-icon svg {
  width: 24px;
  height: 24px;
  color: var(--color-accent-orange);
}

.fab-diff-card h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 12px;
}

.fab-diff-card p {
  font-size: 0.88rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
}

/* CTA */
.fab-cta {
  padding: 72px 0;
  background: linear-gradient(135deg, #0d2a20 0%, #0a1f1a 100%);
  border-top: 1px solid rgba(255,255,255,0.06);
}

.fab-cta-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
}

.fab-cta h2 {
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
  letter-spacing: -0.02em;
}

.fab-cta p {
  font-size: 0.95rem;
  color: rgba(255,255,255,0.5);
  max-width: 480px;
  line-height: 1.6;
}

.fab-cta-actions {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
  flex-wrap: wrap;
}

/* Responsivo */
@media (max-width: 900px) {
  .fab-step,
  .fab-step:nth-child(even) {
    grid-template-columns: 1fr;
    direction: ltr;
    gap: 20px;
    padding: 32px 24px;
  }

  .fab-step:nth-child(even) > * { direction: ltr; }

  .fab-step-num {
    font-size: 2.5rem;
  }

  .fab-diff-grid {
    grid-template-columns: 1fr;
  }

  .fab-grid {
    grid-template-columns: 1fr 1fr;
  }

  .fab-grid-large { grid-column: span 2; }

  .fab-cta-inner {
    flex-direction: column;
    text-align: center;
    align-items: flex-start;
  }
}

@media (max-width: 600px) {
  .fab-grid {
    grid-template-columns: 1fr;
  }
  .fab-grid-large { grid-column: span 1; }
}
```

---

## JS — adicionar no runGSAPAnimations() em script.js

```js
// Fabricação: steps de processo
if (document.querySelector('.fab-step')) {
  document.querySelectorAll('.fab-step').forEach((step, i) => {
    gsap.set(step, { opacity: 1 });
    ScrollTrigger.create({
      trigger: step,
      start: 'top bottom-=80px',
      once: true,
      onEnter: () => {
        gsap.fromTo(step,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: i * 0.05 }
        );
      }
    });
  });
}

// Diferenciais
if (document.querySelector('.fab-diff-card')) {
  gsap.set('.fab-diff-card', { opacity: 1 });
  ScrollTrigger.create({
    trigger: '.fab-diff-grid',
    start: 'top bottom-=80px',
    once: true,
    onEnter: () => {
      gsap.fromTo('.fab-diff-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: 'power2.out' }
      );
    }
  });
}

// Grid da galeria
if (document.querySelector('.fab-grid-item')) {
  gsap.set('.fab-grid-item', { opacity: 1 });
  ScrollTrigger.create({
    trigger: '.fab-grid',
    start: 'top bottom-=80px',
    once: true,
    onEnter: () => {
      gsap.fromTo('.fab-grid-item',
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, stagger: 0.08, duration: 0.6, ease: 'power2.out' }
      );
    }
  });
}
```

---

## Atualizar menu de navegação

No index.html e em todas as páginas, o menu "Nossos Produtos" deve se tornar "Soluções"
com dropdown contendo:

```html
<li class="nav-dropdown">
  <a href="portfolio.html">Soluções <span class="dropdown-arrow">▾</span></a>
  <ul class="dropdown-menu">
    <li><a href="portfolio.html">Nossos Produtos</a></li>
    <li><a href="servico_fabricacao.html">Fabricação Hidráulica</a></li>
    <li><a href="servico_caldeiraria.html">Caldeiraria & Retrofit</a></li>
    <li><a href="servico_tornearia.html">Tornearia & Usinagem</a></li>
    <li><a href="servico_mergulho.html">Limpeza de Casco</a></li>
  </ul>
</li>
```

(Os links servico_caldeiraria.html, servico_tornearia.html e servico_mergulho.html
serão criados nas próximas sessões, mas os links já ficam no menu desde agora.)

---

## Traduções EN

- Título hero: "Hydraulic Equipment<br><em>Manufacturing</em>"
- Sub hero: "From design to delivery. Everything manufactured at our facility in Caraguatatuba, with technology developed in-house over 15 years."
- Seção processo título: "From Raw Steel to Finished Equipment"
- Steps: traduzir títulos e textos de cada etapa
- Diferenciais: "Full Traceability", "Real Customization", "Controlled Lead Time"
- CTA: "Need custom equipment?" / "Talk to our engineering team"

## Traduções ES

- Título hero: "Fabricación de<br><em>Equipos Hidráulicos</em>"
- Sub hero: "Del proyecto a la entrega. Todo fabricado en nuestra planta en Caraguatatuba, con tecnología desarrollada internamente durante 15 años."
- Aplicar padrão análogo nas demais seções

---

## Ordem de execução

1. Criar pasta assets/fabricacao/ e copiar os 14 arquivos fab_*.jpg
2. Criar servico_fabricacao.html com HTML completo acima (mesma navbar/footer do index.html)
3. Adicionar CSS no final do style.css
4. Adicionar JS no runGSAPAnimations() do script.js
5. Atualizar menu de navegação em index.html e demais páginas
6. Criar en/servico_fabricacao.html com traduções EN
7. Criar es/servico_fabricacao.html com traduções ES
8. Commit: "feat: pagina servico fabricacao hidraulica com processo e galeria"
