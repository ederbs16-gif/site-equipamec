# Prompt — Refazer servico_fabricacao.html + Corrigir menu

## Referência de padrão
Seguir EXATAMENTE a mesma estrutura do servico_caldeiraria.html já aprovado:
- Hero com vídeo de fundo (ou imagem como poster se não houver vídeo específico)
- Seções .servico-bloco com .servico-bloco-header, listas, galeria GLightbox
- Tabela de capacidade técnica
- CTA simples no final
- Mesma navbar, footer, WhatsApp float

NÃO usar o layout anterior de servico_fabricacao.html (steps horizontais, grid de diferenciais).
Reescrever do zero seguindo o padrão da caldeiraria.

---

## CORREÇÃO 1 — Menu de navegação (TODAS as páginas)

O menu atual tem "Soluções ▼" com dropdown contendo "Nossos Produtos" dentro.
Isso está errado. Corrigir para ter DOIS itens separados no menu:

```html
<ul class="nav-links">
    <li><a href="index.html#hero">Início</a></li>
    <li><a href="index.html#about">Sobre Nós</a></li>
    <li><a href="index.html#services">Serviços</a></li>
    <li><a href="portfolio.html">Galeria</a></li>
    <li class="dropdown" id="nav-dropdown-produtos">
        <a href="portfolio.html">Nossos Produtos ▼</a>
        <ul class="dropdown-menu">
            <li><a href="produto_ch1s.html">CH1S</a></li>
            <li><a href="produto_ch2s.html">CH2S</a></li>
            <li><a href="produto_ch3sd.html">CH3SD</a></li>
            <li><a href="produto_che2s.html">CHE2S</a></li>
            <li><a href="produto_camc30.html">CAMC30</a></li>
            <li><a href="produto_hpj25.html">HPJ-25</a></li>
            <li><a href="produto_hpj40.html">HPJ-40</a></li>
            <li><a href="produto_hpj41.html">HPJ-41</a></li>
            <li><a href="produto_escovas.html">Linha ECA</a></li>
            <li><a href="produto_mangote.html">Mangotes MHTP</a></li>
        </ul>
    </li>
    <li class="dropdown" id="nav-dropdown-solucoes">
        <a href="servico_fabricacao.html">Soluções ▼</a>
        <ul class="dropdown-menu">
            <li><a href="servico_fabricacao.html">Fabricação Hidráulica</a></li>
            <li><a href="servico_caldeiraria.html">Caldeiraria &amp; Retrofit</a></li>
            <li><a href="servico_tornearia.html">Tornearia &amp; Usinagem</a></li>
            <li><a href="servico_mergulho.html">Limpeza de Casco</a></li>
        </ul>
    </li>
    <li><a href="index.html#contact" class="btn btn-outline">Contato</a></li>
</ul>
```

Aplicar essa estrutura de menu em TODAS as páginas do site:
index.html, portfolio.html, servico_caldeiraria.html, servico_fabricacao.html,
servico_tornearia.html, servico_mergulho.html, todos os produto_*.html,
e todas as versões en/ e es/ (com links ajustados para ../ e traduções dos labels).

---

## CORREÇÃO 2 — Reescrever servico_fabricacao.html

Usar como hero o vídeo `assets/videos/hero_tornearia.webm` / `hero_tornearia.mp4`
com poster `assets/videos/poster_tornearia.jpg` (são as imagens mais próximas
da fábrica disponíveis).

Estrutura seguindo o padrão caldeiraria:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="description" content="Fabricação própria de equipamentos hidráulicos navais e offshore. Caldeiraria, tornearia, montagem e testes na nossa fábrica em Caraguatatuba SP.">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fabricação de Equipamentos Hidráulicos — Equipamec</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <!-- favicons iguais ao servico_caldeiraria.html -->
</head>
<body>
    <!-- navbar com menu corrigido acima -->

    <main>

        <!-- HERO -->
        <section class="servico-hero" id="servico-hero">
            <div class="servico-hero-bg">
                <video class="servico-hero-video" autoplay muted loop playsinline preload="auto"
                       poster="assets/fabricacao/fab_galpao_teto.jpg">
                    <source src="assets/videos/hero_tornearia.webm" type="video/webm">
                    <source src="assets/videos/hero_tornearia.mp4" type="video/mp4">
                </video>
                <div class="servico-hero-overlay"></div>
            </div>
            <div class="container servico-hero-content">
                <span class="section-eyebrow">Fábrica Equipamec</span>
                <h1 class="servico-hero-title">FABRICAÇÃO<br><em>HIDRÁULICA</em></h1>
                <p class="servico-hero-sub">Do projeto à entrega. Tudo fabricado na nossa planta em Caraguatatuba, com tecnologia desenvolvida internamente ao longo de 15 anos de operação naval e offshore.</p>
                <a href="#contato-servico" class="btn btn-primary">Solicitar Orçamento</a>
            </div>
        </section>

        <!-- SEÇÃO 1: PROCESSO DE FABRICAÇÃO -->
        <section class="servico-bloco" id="fabricacao">
            <div class="container">

                <div class="servico-bloco-header fade-in">
                    <span class="section-eyebrow">Como Fazemos</span>
                    <h2>Fabricação Própria do Início ao Fim</h2>
                    <p class="servico-bloco-lead">A Equipamec é uma das poucas empresas do setor naval brasileiro que fabrica seus próprios equipamentos hidráulicos. Do chassi ao painel, da soldagem ao teste de pressão, cada etapa acontece dentro da nossa fábrica em Caraguatatuba.</p>
                </div>

                <div class="servico-dois-blocos fade-in">
                    <div class="sdb-bloco">
                        <h3>O que fabricamos internamente</h3>
                        <ul class="servico-lista">
                            <li>Chassis e estrutura metálica em aço carbono</li>
                            <li>Painéis frontais fresados e usinados</li>
                            <li>Tanques e reservatórios hidráulicos</li>
                            <li>Bandejas de contenção de óleo</li>
                            <li>Adaptadores e peças especiais em torno mecânico</li>
                            <li>Carenagens e tampas dobradas em chapa</li>
                            <li>Montagem e integração do sistema hidráulico</li>
                            <li>Teste de pressão e vazão antes da entrega</li>
                        </ul>
                    </div>
                    <div class="sdb-bloco">
                        <h3>Por que isso é um diferencial</h3>
                        <ul class="servico-lista">
                            <li>Rastreabilidade total: sabemos quem fez cada peça</li>
                            <li>Customização real sem depender de fornecedor</li>
                            <li>Prazo sob controle: produção própria, sem espera</li>
                            <li>Correção imediata se houver qualquer não-conformidade</li>
                            <li>Suporte pós-venda com acesso à documentação de fabricação</li>
                            <li>Peças de reposição fabricadas internamente quando necessário</li>
                        </ul>
                    </div>
                </div>

                <div class="servico-galeria fade-in">
                    <a href="assets/fabricacao/fab_galpao_amplo.jpg" class="glightbox servico-gal-item">
                        <img src="assets/fabricacao/fab_galpao_amplo.jpg" alt="Galpão Equipamec" loading="lazy">
                    </a>
                    <a href="assets/fabricacao/fab_galpao_setores.jpg" class="glightbox servico-gal-item">
                        <img src="assets/fabricacao/fab_galpao_setores.jpg" alt="Setores da fábrica" loading="lazy">
                    </a>
                    <a href="assets/fabricacao/fab_estrutura_motor.jpg" class="glightbox servico-gal-item">
                        <img src="assets/fabricacao/fab_estrutura_motor.jpg" alt="Chassis sendo montado" loading="lazy">
                    </a>
                    <a href="assets/fabricacao/fab_painel_bruto.jpg" class="glightbox servico-gal-item">
                        <img src="assets/fabricacao/fab_painel_bruto.jpg" alt="Painel em fabricação" loading="lazy">
                    </a>
                    <a href="assets/fabricacao/fab_motor_chassis.jpg" class="glightbox servico-gal-item">
                        <img src="assets/fabricacao/fab_motor_chassis.jpg" alt="Motor integrado ao chassis" loading="lazy">
                    </a>
                    <a href="assets/fabricacao/fab_unidade_finalizada.jpg" class="glightbox servico-gal-item">
                        <img src="assets/fabricacao/fab_unidade_finalizada.jpg" alt="Unidade finalizada" loading="lazy">
                    </a>
                </div>

                <div class="capacidade-tecnica fade-in">
                    <h3>Nossa Estrutura</h3>
                    <table class="cap-table">
                        <tr><td class="cap-label">ÁREA FABRIL</td><td>Mais de 400m² em Caraguatatuba SP</td></tr>
                        <tr><td class="cap-label">SETORES</td><td>Caldeiraria, Solda, Usinagem, Tornearia, Central de Testes</td></tr>
                        <tr><td class="cap-label">SOLDAGEM</td><td>MIG/MAG (aço carbono) e TIG (inox)</td></tr>
                        <tr><td class="cap-label">USINAGEM</td><td>Torno mecânico, fresadora, furadeira de bancada</td></tr>
                        <tr><td class="cap-label">TESTE</td><td>Central de testes com carga real antes de cada entrega</td></tr>
                        <tr><td class="cap-label">DOCUMENTAÇÃO</td><td>Relatório fotográfico do processo disponível sob solicitação</td></tr>
                    </table>
                </div>

            </div>
        </section>

        <!-- SEÇÃO 2: LINHA DE PRODUTOS -->
        <section class="servico-bloco" id="linha-produtos">
            <div class="container">

                <div class="servico-bloco-header fade-in">
                    <span class="section-eyebrow">Linha Própria</span>
                    <h2>Equipamentos Desenvolvidos pela Equipamec</h2>
                    <p class="servico-bloco-lead">Toda a linha de unidades hidráulicas e máquinas de limpeza de casco foi projetada e desenvolvida internamente. Não somos revendedores: cada produto tem tecnologia Equipamec.</p>
                </div>

                <div class="servico-dois-blocos fade-in">
                    <div class="sdb-bloco">
                        <h3>Unidades Hidráulicas</h3>
                        <ul class="servico-lista">
                            <li><a href="produto_ch1s.html">CH1S — 1 tomada, motor Branco 25HP</a></li>
                            <li><a href="produto_ch2s.html">CH2S — 2 tomadas, motor Branco 35HP</a></li>
                            <li><a href="produto_ch3sd.html">CH3SD — 3 tomadas, motor Terramar 27HP</a></li>
                            <li><a href="produto_che2s.html">CHE2S — Versão elétrica, 2 tomadas</a></li>
                            <li><a href="produto_camc30.html">CAMC30 — Compressor para mergulho</a></li>
                        </ul>
                    </div>
                    <div class="sdb-bloco">
                        <h3>Máquinas de Limpeza</h3>
                        <ul class="servico-lista">
                            <li><a href="produto_hpj25.html">HPJ-25 — Limpeza de casco compacta</a></li>
                            <li><a href="produto_hpj40.html">HPJ-40 — Alta pressão para embarcações</a></li>
                            <li><a href="produto_hpj41.html">HPJ-41 — Com fixação magnética</a></li>
                            <li><a href="produto_escovas.html">Linha ECA — Escovas e consumíveis</a></li>
                            <li><a href="produto_mangote.html">Mangotes MHTP — Alta pressão subaquática</a></li>
                        </ul>
                    </div>
                </div>

                <div class="servico-galeria fade-in">
                    <a href="assets/fabricacao/fab_unidade_pronta.jpg" class="glightbox servico-gal-item">
                        <img src="assets/fabricacao/fab_unidade_pronta.jpg" alt="Unidade hidráulica pronta" loading="lazy">
                    </a>
                    <a href="assets/fabricacao/fab_galpao_maquinas.jpg" class="glightbox servico-gal-item">
                        <img src="assets/fabricacao/fab_galpao_maquinas.jpg" alt="Máquinas no galpão" loading="lazy">
                    </a>
                    <a href="assets/fabricacao/fab_motor_detalhe.jpg" class="glightbox servico-gal-item">
                        <img src="assets/fabricacao/fab_motor_detalhe.jpg" alt="Detalhe do motor integrado" loading="lazy">
                    </a>
                    <a href="assets/fabricacao/fab_compressor_chassis.jpg" class="glightbox servico-gal-item">
                        <img src="assets/fabricacao/fab_compressor_chassis.jpg" alt="Compressor no chassis" loading="lazy">
                    </a>
                    <a href="assets/fabricacao/fab_galpao_caldeiraria.jpg" class="glightbox servico-gal-item">
                        <img src="assets/fabricacao/fab_galpao_caldeiraria.jpg" alt="Setor de caldeiraria" loading="lazy">
                    </a>
                    <a href="assets/fabricacao/fab_solda_close.jpg" class="glightbox servico-gal-item">
                        <img src="assets/fabricacao/fab_solda_close.jpg" alt="Soldagem estrutural" loading="lazy">
                    </a>
                </div>

            </div>
        </section>

        <!-- CTA -->
        <section class="servico-cta" id="contato-servico">
            <div class="container text-center">
                <h2>Precisa de um equipamento fora do padrão?</h2>
                <p>Fale com nossa equipe técnica. Se a aplicação exige algo que não está no catálogo, a fábrica está aqui para desenvolver.</p>
                <a href="https://wa.me/5512991654319?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Equipamec%20e%20gostaria%20de%20discutir%20um%20projeto%20especial%20de%20fabrica%C3%A7%C3%A3o."
                   class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    Falar no WhatsApp
                </a>
            </div>
        </section>

    </main>

    <!-- footer igual ao servico_caldeiraria.html -->
    <!-- scripts iguais ao servico_caldeiraria.html -->
    <!-- WhatsApp float igual ao servico_caldeiraria.html -->

</body>
</html>
```

## CSS necessário (se não existir ainda no style.css)

Verificar se as classes abaixo já existem (vieram do servico_caldeiraria.html).
Se existirem, não duplicar. Se não existirem, adicionar:

```css
.servico-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.servico-hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.servico-hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.servico-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(5,20,15,0.85) 0%, rgba(5,20,15,0.5) 100%);
}

.servico-hero-content {
  position: relative;
  z-index: 2;
  padding-top: 140px;
  padding-bottom: 80px;
  max-width: 700px;
}

.servico-hero-title {
  font-size: clamp(2.8rem, 6vw, 5rem);
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin-bottom: 20px;
}

.servico-hero-title em {
  color: var(--color-accent-orange);
  font-style: normal;
}

.servico-hero-sub {
  font-size: 1rem;
  color: rgba(255,255,255,0.65);
  line-height: 1.7;
  max-width: 520px;
  margin-bottom: 32px;
}

.servico-bloco {
  padding: 80px 0;
  border-top: 1px solid rgba(255,255,255,0.06);
}

.servico-bloco-header {
  max-width: 760px;
  margin-bottom: 48px;
}

.servico-bloco-header h2 {
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
}

.servico-bloco-lead {
  font-size: 1rem;
  color: rgba(255,255,255,0.55);
  line-height: 1.75;
}

.servico-dois-blocos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}

.sdb-bloco h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--color-accent-orange);
  display: inline-block;
}

.servico-lista {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.servico-lista li {
  color: rgba(255,255,255,0.6);
  font-size: 0.92rem;
  line-height: 1.5;
  padding-left: 16px;
  position: relative;
}

.servico-lista li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent-orange);
}

.servico-lista a {
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  transition: color 0.2s;
}

.servico-lista a:hover {
  color: var(--color-accent-orange);
}

.servico-galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 48px;
}

.servico-gal-item {
  aspect-ratio: 4/3;
  overflow: hidden;
  display: block;
  border-radius: 6px;
}

.servico-gal-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease, filter 0.3s ease;
  filter: brightness(0.8);
}

.servico-gal-item:hover img {
  transform: scale(1.05);
  filter: brightness(1);
}

.capacidade-tecnica {
  margin-top: 8px;
}

.capacidade-tecnica h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.cap-table {
  width: 100%;
  border-collapse: collapse;
}

.cap-table tr {
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.cap-table td {
  padding: 12px 8px;
  font-size: 0.88rem;
  color: rgba(255,255,255,0.55);
  line-height: 1.5;
}

.cap-label {
  font-weight: 700;
  color: var(--color-accent-orange) !important;
  width: 160px;
  letter-spacing: 0.06em;
  font-size: 0.78rem !important;
}

.servico-cta {
  padding: 80px 0;
  background: linear-gradient(135deg, #0d2a20 0%, #0a1f1a 100%);
  border-top: 1px solid rgba(255,255,255,0.06);
}

.servico-cta h2 {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 700;
  color: #fff;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.servico-cta p {
  font-size: 0.95rem;
  color: rgba(255,255,255,0.5);
  margin-bottom: 32px;
  line-height: 1.65;
}

.servico-img-placeholder {
  background: rgba(255,255,255,0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  border-radius: 6px;
}

.servico-img-placeholder span {
  color: rgba(255,255,255,0.2);
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .servico-dois-blocos {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .servico-galeria {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

## Ordem de execução

1. Corrigir menu em TODAS as páginas (separar "Nossos Produtos" e "Soluções")
2. Verificar se classes servico-* já existem no style.css (vieram da caldeiraria); adicionar apenas as que faltarem
3. Reescrever servico_fabricacao.html do zero seguindo o padrão acima
4. Testar no browser — deve ter visual idêntico ao servico_caldeiraria.html em termos de estrutura
5. Commit: "fix: menu nossos produtos e solucoes separados; refaz servico_fabricacao no padrao caldeiraria"
