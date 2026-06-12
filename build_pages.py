import os
import re

base_path = r'c:\ERP_Equipamec\site_institucional'
assets_path = os.path.join(base_path, 'assets')
index_path = os.path.join(base_path, 'index.html')
portfolio_path = os.path.join(base_path, 'portfolio.html')

asset_dirs = {
    'ch1s': 'CH1S',
    'ch2s': 'CH2S',
    'ch3sd': 'CH3SD',
    'che2s': 'CHE2S',
}

structure = {
    'Unidades Hidráulicas': {
        'ch1s': 'CH1S', 
        'ch2s': 'CH2S', 
        'ch3sd': 'CH3SD', 
        'che2s': 'CHE2S', 
        'camc30': 'CAMC30'
    },
    'Máquinas de Limpeza': {
        'hpj40': 'HPJ40', 
        'hpj41': 'HPJ41', 
        'hpj25': 'HPJ25'
    },
    'Acessórios': {
        'mangote': 'Mangotes', 
        'escovas': 'Escovas'
    }
}

whatsapp_link = "https://wa.me/5512991654319?text=Olá, gostaria de saber mais informações sobre o produto"

# 1. Build the Dropdown HTML
dropdown_html = '''<li class="dropdown" id="nav-dropdown-produtos">
                    <a href="portfolio.html">Nossos Produtos ▼</a>
                    <ul class="dropdown-menu">'''

for cat_name, items in structure.items():
    dropdown_html += f'''
                        <li class="dropdown-submenu">
                            <a href="#">{cat_name} ▶</a>
                            <ul class="dropdown-menu">'''
    for folder, title in items.items():
        dropdown_html += f'''
                                <li><a href="produto_{folder}.html">{title}</a></li>'''
    dropdown_html += '''
                            </ul>
                        </li>'''

dropdown_html += '''
                    </ul>
                </li>'''

# Function to replace exactly the old Portfolio item or an old Dropdown
def update_nav(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # regex to find either the old link or the existing dropdown
    # We replace from <li ...> to Nossos Produtos/Portfólio to closing </li>
    # But carefully only targeting the Portfolio item
    
    # Try replacing simple link
    if '<li><a href="portfolio.html">Portfólio</a></li>' in content:
        content = content.replace('<li><a href="portfolio.html">Portfólio</a></li>', dropdown_html)
    elif '<li class="dropdown" id="nav-dropdown-produtos">' in content:
        pattern = re.compile(r'<li class="dropdown" id="nav-dropdown-produtos">.*?</ul\s*>\s*</li\s*>', re.DOTALL)
        content = re.sub(pattern, dropdown_html, content)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

update_nav(index_path)
update_nav(portfolio_path)

# 2. Build Individual Product Pages
html_template = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>produto_title - Equipamec</title>
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
                    <li><a href="index.html#gallery">Galeria</a></li>
                    <!--NAV_REPLACE-->
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

    <main style="padding-top: 120px; padding-bottom: 60px;">
        <section class="section">
            <div class="container">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 3rem; align-items: start;">
                    <!-- Galeria Lado Esquerdo -->
                    <div class="product-gallery slide-right">
                        <!--MAIN_IMG_REPLACE-->
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-top: 1rem;">
                            <!--THUMBNAILS_REPLACE-->
                        </div>
                    </div>
                    
                    <!-- Info Lado Direito -->
                    <div class="product-details slide-left">
                        <p style="text-transform: uppercase; color: var(--color-accent-orange); font-weight: bold; letter-spacing: 1px; margin-bottom: 0.5rem;">CAT_REPLACE</p>
                        <h1 style="font-size: 2.5rem; margin-bottom: 1.5rem; color: var(--color-white);">produto_title</h1>
                        <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem;">Desenvolvido com tecnologia Equipamec, este equipamento entrega máxima eficiência e confiabilidade para operações industriais de alta demanda. Sua estrutura robusta garante vida útil prolongada mesmo em ambientes extremos como plantas offshore ou setores navais.</p>
                        
                        <h3 style="color: var(--color-white); margin-bottom: 1rem;">Características Técnicas</h3>
                        <ul class="feature-list" style="margin-bottom: 2.5rem;">
                            <li>Engenharia de precisão e testes rigorosos</li>
                            <li>Materiais de altíssima resistência e durabilidade</li>
                            <li>Integração perfeita com sistemas automatizados</li>
                        </ul>
                        
                        <a href="LINK_REPLACE" target="_blank" class="btn btn-primary" style="display: inline-block; width: 100%; text-align: center; font-size: 1.1rem; padding: 15px;">Falar com Consultor via WhatsApp</a>
                    </div>
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

# Now loop and generate
for cat_name, items in structure.items():
    for fldr, title in items.items():
        # Get all images from that folder
        asset_dir = asset_dirs.get(fldr, fldr)
        folder_path = os.path.join(assets_path, asset_dir)
        files = []
        if os.path.isdir(folder_path):
            files = [f for f in os.listdir(folder_path) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp'))]
            
        if not files:
            continue
            
        main_img = files[0]
        main_img_html = f'''<a href="assets/{asset_dir}/{main_img}" class="glightbox" data-gallery="gallery-{fldr}"><img src="assets/{asset_dir}/{main_img}" alt="{title}" style="width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);"></a>'''
        
        thumbs_html = ""
        for thumb in files[1:]:
            thumbs_html += f'''<a href="assets/{asset_dir}/{thumb}" class="glightbox" data-gallery="gallery-{fldr}"><img src="assets/{asset_dir}/{thumb}" style="width: 100%; aspect-ratio: 1/1; object-fit: cover; border-radius: 4px; border: 2px solid transparent; transition: border 0.3s;" onmouseover="this.style.borderColor='var(--color-accent-orange)'" onmouseout="this.style.borderColor='transparent'"></a>'''
            
        whatsapp_full = whatsapp_link + f" {title}"
        
        final_html = html_template.replace("produto_title", title)
        final_html = final_html.replace("CAT_REPLACE", cat_name)
        final_html = final_html.replace("<!--MAIN_IMG_REPLACE-->", main_img_html)
        final_html = final_html.replace("<!--THUMBNAILS_REPLACE-->", thumbs_html)
        final_html = final_html.replace("LINK_REPLACE", whatsapp_full)
        final_html = final_html.replace("<!--NAV_REPLACE-->", dropdown_html)
        
        output_filepath = os.path.join(base_path, f"produto_{fldr}.html")
        with open(output_filepath, 'w', encoding='utf-8') as f:
            f.write(final_html)
            
print("Dropdown navbar injected and all individual product pages successfully built.")
