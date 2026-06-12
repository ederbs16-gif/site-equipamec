import os
import urllib.parse
from html import escape

base_path = r'c:\ERP_Equipamec\site_institucional'
assets_path = os.path.join(base_path, 'assets')
output_path = os.path.join(base_path, 'portfolio.html')
index_path = os.path.join(base_path, 'index.html')

# Product categories mapping based on user description
categories = {
    'CH1S': {'class': 'cat_hpu', 'title': 'Conjunto Hidráulico CH1S', 'desc': 'Unidade hidráulica de alta performance.'},
    'CH2S': {'class': 'cat_hpu', 'title': 'Conjunto Hidráulico CH2S', 'desc': 'Unidade hidráulica robusta avançada.'},
    'CH3SD': {'class': 'cat_hpu', 'title': 'Conjunto Hidráulico CH3SD', 'desc': 'Unidade hidráulica de série pesada.'},
    'CHE2S': {'class': 'cat_hpu', 'title': 'Conjunto Hidroelétrico CHE2S', 'desc': 'Solução híbrida e elétrica para acionamento.'},
    'camc30': {'class': 'cat_hpu', 'title': 'Conjunto CAMC30', 'desc': 'Conjunto auxiliar de manutenção.'},
    'hpj40': {'class': 'cat_cleaning', 'title': 'Máquina de Limpeza HPJ40', 'desc': 'Limpeza de ultra-alta pressão.'},
    'hpj41': {'class': 'cat_cleaning', 'title': 'Máquina de Limpeza HPJ41', 'desc': 'Limpeza industrial robusta com mobilidade.'},
    'hpj25': {'class': 'cat_cleaning', 'title': 'Máquina de Limpeza HPJ25', 'desc': 'Limpeza de média/alta pressão versátil.'},
    'mangote': {'class': 'cat_accessories', 'title': 'Mangotes Trama de Aço', 'desc': 'Mangotes com resistência extrema.'},
    'escovas': {'class': 'cat_accessories', 'title': 'Escovas Industriais', 'desc': 'Escovas rotativas para tratamento e limpeza.'}
}

html_start = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfólio de Produtos - Equipamec</title>
    <!-- GLightbox CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header class="navbar">
        <div class="container nav-container">
            <a href="index.html" class="logo">
                <img src="assets/logo.png" alt="Equipamec Logo" class="brand-logo" loading="lazy">
            </a>
            <nav id="nav-menu" class="nav-menu">
                <ul class="nav-links">
                    <li><a href="index.html#hero">Início</a></li>
                    <li><a href="index.html#about">Sobre Nós</a></li>
                    <li><a href="index.html#services">Serviços</a></li>
                    <li><a href="portfolio.html">Galeria</a></li>
                    <li><a href="index.html#contact" class="btn btn-outline">Contato</a></li>
                </ul>
            </nav>
            <button class="hamburger" id="hamburger" aria-label="Abrir menu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </button>
        </div>
    </header>

    <main style="padding-top: 100px;">
        <section class="section" style="padding-top:2rem;">
            <div class="container">
                <div class="section-header text-center slide-up">
                    <h2>Catálogo de Equipamentos</h2>
                    <p>Navegue pelo nosso acervo de Máquinas de Limpeza, Unidades Hidráulicas e Acessórios.</p>
                </div>

                <div class="gallery-filters text-center slide-up delay-1" id="img-filters">
                    <button class="filter-btn active" data-filter="*">Todos</button>
                    <button class="filter-btn" data-filter=".cat_hpu">Conjuntos Hidráulicos</button>
                    <button class="filter-btn" data-filter=".cat_cleaning">Máquinas de Limpeza</button>
                    <button class="filter-btn" data-filter=".cat_accessories">Acessórios</button>
                </div>

                <!-- Grid Tradicional -->
                <div class="portfolio-standard-grid slide-up delay-2" id="portfolio-grid">
"""

cards = []

# Generate product cards based on images in folders
for folder, attr in categories.items():
    folder_path = os.path.join(assets_path, folder)
    if os.path.isdir(folder_path):
        # find the first image
        files = [f for f in os.listdir(folder_path) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp'))]
        if files:
            first_img = files[0]
            rel_path = f"assets/{folder}/{first_img}"
            url_path = urllib.parse.quote(rel_path)
            title = attr['title']
            desc = attr['desc']
            filt_class = attr['class']
            gallery_id = f"gallery-{folder.lower()}"
            
            card = f'''
                    <div class="gallery-item {filt_class}">
                        <!-- Capa Visível -->
                        <a href="{url_path}" class="glightbox" data-gallery="{gallery_id}" data-title="{title}">
                            <img src="{url_path}" alt="{title}" loading="lazy">
                            <div class="gallery-overlay">
                                <div class="overlay-content">
                                    <h4>{title}</h4>
                                    <p>{desc}</p>
                                </div>
                            </div>
                        </a>
                        <!-- Imagens Ocultas da Mesma Pasta -->
'''
            # Generate hidden anchor tags for the rest of the images
            for other_file in files[1:]:
                other_rel_path = f"assets/{folder}/{other_file}"
                other_url_path = urllib.parse.quote(other_rel_path)
                card += f'                        <a href="{other_url_path}" class="glightbox" data-gallery="{gallery_id}" style="display: none;"></a>\n'

            card += '                    </div>'
            cards.append(card)

html_mid = """
                </div>
            </div>
        </section>

        <section class="section bg-alt" style="padding-top:4rem; padding-bottom: 4rem;">
            <div class="container">
                <div class="section-header text-center slide-up">
                    <h2>Galeria de Vídeos</h2>
                    <p>Assista aos nossos equipamentos operando na prática.</p>
                </div>
                <!-- Grid Exclusivo para Videos -->
                <div class="portfolio-standard-grid slide-up delay-1" id="video-grid">
"""

video_cards = []
# Generate video cards
video_path = os.path.join(assets_path, 'videos')
if os.path.isdir(video_path):
    vfiles = [f for f in os.listdir(video_path) if f.lower().endswith('.mp4')]
    cover = [f for f in os.listdir(video_path) if f.lower().endswith('.jpg')]
    cover_img = f"assets/videos/{cover[0]}" if cover else "assets/logo.png"
    cover_url = urllib.parse.quote(cover_img)
    
    for v in vfiles:
        vid_title = "Vídeo " + v.replace('.mp4', '').capitalize()
        vid_url = urllib.parse.quote(f"assets/videos/{v}")
        
        card = f'''
                    <div class="gallery-item">
                        <a href="{vid_url}" class="glightbox" data-gallery="portfolio-vids" data-type="video" data-title="{vid_title}">
                            <img src="{cover_url}" alt="{vid_title}" loading="lazy" style="filter: brightness(0.6);">
                            <div class="gallery-overlay">
                                <div class="overlay-content">
                                    <h4 style="color:#FF6B00;">▶ {vid_title}</h4>
                                    <p>Clique para dar Play</p>
                                </div>
                            </div>
                        </a>
                    </div>'''
        video_cards.append(card)
        
html_end = """
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container text-center">
            <p>&copy; 2026 Equipamec. Todos os direitos reservados. Feito com tecnologia industrial.</p>
        </div>
    </footer>

    <!-- Vendor JS: Isotope, ImagesLoaded, GLightbox -->
    <script src="https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.min.js"></script>
    <script src="https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/mcstudios/glightbox/dist/js/glightbox.min.js"></script>

    <script src="js/script.js"></script>
</body>
</html>
"""

# write logic
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html_start + "".join(cards) + html_mid + "".join(video_cards) + html_end)

# Also update index.html to add Portfolio link to its navbar
with open(index_path, 'r', encoding='utf-8') as f:
    index_content = f.read()
    
# Simplistic replace, checking if not already added
if '<li><a href="portfolio.html">Portfólio</a></li>' not in index_content:
    old_contact = '<li><a href="#contact" class="btn btn-outline">Contato</a></li>'
    new_contact = '<li><a href="portfolio.html">Portfólio</a></li>\n                    ' + old_contact
    index_content = index_content.replace(old_contact, new_contact)

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(index_content)
    
print("Successfully generated portfolio.html and updated index.html")
