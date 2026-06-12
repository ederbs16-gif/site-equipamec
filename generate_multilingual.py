import os
import json
import re
import urllib.parse

# Configurações de caminhos
BASE_DIR = r'c:\ERP_Equipamec\site_institucional'
ASSETS_DIR = os.path.join(BASE_DIR, 'assets')
LANGS = ['pt', 'en', 'es']

ASSET_DIRS = {
    'ch1s': 'CH1S',
    'ch2s': 'CH2S',
    'ch3sd': 'CH3SD',
    'che2s': 'CHE2S',
}

# Carrega as traduções
with open(os.path.join(BASE_DIR, 'js', 'translations.json'), 'r', encoding='utf-8') as f:
    tr = json.load(f)

# Estrutura de produtos (usada para o Dropdown e Portfólio)
product_cats = {
    'pt': {
        'cat_hpu': 'Unidades Hidráulicas',
        'cat_cleaning': 'Máquinas de Limpeza',
        'cat_accessories': 'Acessórios'
    },
    'en': {
        'cat_hpu': 'Hydraulic Power Units',
        'cat_cleaning': 'Cleaning Machines',
        'cat_accessories': 'Accessories'
    },
    'es': {
        'cat_hpu': 'Unidades Hidráulicas',
        'cat_cleaning': 'Máquinas de Limpieza',
        'cat_accessories': 'Accesorios'
    }
}

structure = {
    'cat_hpu': {
        'ch1s': 'CH1S', 
        'ch2s': 'CH2S', 
        'ch3sd': 'CH3SD', 
        'che2s': 'CHE2S', 
        'camc30': 'CAMC30'
    },
    'cat_cleaning': {
        'hpj40': 'HPJ40', 
        'hpj41': 'HPJ41', 
        'hpj25': 'HPJ25'
    },
    'cat_accessories': {
        'mangote': 'Mangotes', 
        'escovas': 'Escovas'
    }
}

# --- HELPERS ---

def get_rel_prefix(lang):
    return "" if lang == 'pt' else "../"

def get_asset_dir(folder):
    return ASSET_DIRS.get(folder, folder)

def html_lang(lang):
    return 'pt-BR' if lang == 'pt' else lang

def build_lang_switcher(lang, current_page):
    # current_page: 'index.html', 'portfolio.html', 'produto_ch1s.html'
    links = []
    for l in LANGS:
        prefix = ""
        if l == 'pt':
            path = current_page
            if lang != 'pt': prefix = "../"
        else:
            path = f"{l}/{current_page}"
            if lang != 'pt':
                if lang == l: prefix = ""
                else: prefix = f"../{l}/"
        
        # Simpler logic:
        dest = ""
        if l == 'pt':
            dest = f"../{current_page}" if lang != 'pt' else current_page
        else:
            dest = f"index.html" if lang == l else (f"{l}/index.html" if lang == 'pt' else f"../{l}/{current_page}")
            # wait, this is getting complex. Let's use absolute routes relative to root? No, we need relative for file local viewing.
            
            if lang == 'pt':
                dest = f"{l}/{current_page}"
            else:
                if l == lang:
                    dest = current_page
                elif l == 'pt':
                    dest = f"../{current_page}"
                else:
                    dest = f"../{l}/{current_page}"
                             
        active = "active" if l == lang else ""
        links.append(f'<a href="{dest}" class="lang-link {active}">{l}</a>')
    
    return f'<div class="lang-switcher">{" | ".join(links)}</div>'

def build_nav(lang, rel_prefix, current_page):
    # Dropdown
    cat_tr = product_cats[lang]
    dropdown = f'''<li class="dropdown" id="nav-dropdown-produtos">
                    <a href="{rel_prefix}portfolio.html">{tr[lang]['nav_products']} ▼</a>
                    <ul class="dropdown-menu">'''
    
    for cat_key, items in structure.items():
        cat_name = cat_tr[cat_key]
        dropdown += f'''
                        <li class="dropdown-submenu">
                            <a href="#">{cat_name} ▶</a>
                            <ul class="dropdown-menu">'''
        for folder, title in items.items():
            dropdown += f'''
                                <li><a href="{rel_prefix}produto_{folder}.html">{title}</a></li>'''
        dropdown += '''
                            </ul>
                        </li>'''
    dropdown += '''
                    </ul>
                </li>'''
    
    home_link = f"{rel_prefix}index.html"
    nav = f'''
                <ul class="nav-links">
                    <li><a href="{home_link}#hero">{tr[lang]['nav_home']}</a></li>
                    <li><a href="{home_link}#about">{tr[lang]['nav_about']}</a></li>
                    <li><a href="{home_link}#services">{tr[lang]['nav_services']}</a></li>
                    <li><a href="{home_link}#gallery">{tr[lang]['nav_gallery']}</a></li>
                    {dropdown}
                    <li><a href="{home_link}#contact" class="btn btn-outline">{tr[lang]['nav_contact']}</a></li>
                </ul>
                {build_lang_switcher(lang, current_page)}
    '''
    return nav

def get_head(lang, rel_prefix, title_key=None, custom_title=None):
    title = tr[lang][title_key] if title_key else (custom_title if custom_title else "Equipamec")
    head = f"""
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <!-- GLightbox CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{rel_prefix}css/style.css">
    """
    # Hreflangs
    # For now we assume the structure is simple.
    return head

# --- GENERATORS ---

def generate_index():
    # We'll use index.html as a master template or just define it here since it's the most custom
    # Actually, let's read the current index.html and replace placeholders.
    # I'll manually prepare a generic template below.
    
    for lang in LANGS:
        rel = get_rel_prefix(lang)
        t = tr[lang]
        
        html = f"""<!DOCTYPE html>
<html lang="{html_lang(lang)}">
<head>
    {get_head(lang, rel, custom_title=t['hero_title'])}
</head>
<body>
    <header class="navbar">
        <div class="container nav-container">
            <a href="{rel}index.html" class="logo">
                <img src="{rel}assets/logo.png" alt="Equipamec Logo" class="brand-logo" loading="lazy">
            </a>
            <nav id="nav-menu" class="nav-menu">
                {build_nav(lang, rel, 'index.html')}
            </nav>
            <button class="hamburger" id="hamburger" aria-label="Menu">
                <span class="bar"></span><span class="bar"></span><span class="bar"></span>
            </button>
        </div>
    </header>

    <main>
        <section id="hero" class="hero fade-in">
            <div class="hero-bg">
                <img src="{rel}assets/hero-bg.png" alt="Industrial Plant" aria-hidden="true">
                <div class="overlay"></div>
            </div>
            <div class="container hero-content">
                <h1 class="slide-up">{t['hero_title']}</h1>
                <p class="slide-up delay-1">{t['hero_subtitle']}</p>
                <div class="hero-buttons slide-up delay-2">
                    <a href="#services" class="btn btn-primary">{t['hero_btn_services']}</a>
                    <a href="#about" class="btn btn-secondary">{t['hero_btn_about']}</a>
                </div>
            </div>
        </section>

        <section id="about" class="about section fade-in">
            <div class="container">
                <div class="section-header text-center slide-up">
                    <h2 style="color: var(--color-white); font-size: 2.8rem; margin-bottom: 0.5rem;">{t['about_title']}</h2>
                    <p style="font-size: 1.25rem; font-weight: 600; color: var(--color-text-light);">{t['about_subtitle']}</p>
                </div>
                <div class="split-layout" style="margin-bottom: 4rem;">
                    <div class="about-text p-right slide-right">
                        <p>{t['about_text_1']}</p>
                        <p>{t['about_text_2']}</p>
                    </div>
                    <div class="about-image slide-left">
                        <img src="{rel}assets/Sobre/35HP.png" alt="HPU 35HP" class="rounded-img shadow-lg">
                    </div>
                </div>
                <div class="identity-grid slide-up">
                    <article class="identity-panel">
                        <span>{t['about_mission_title']}</span>
                        <p>{t['about_mission_text']}</p>
                    </article>
                    <article class="identity-panel">
                        <span>{t['about_vision_title']}</span>
                        <p>{t['about_vision_text']}</p>
                    </article>
                </div>
                <div class="split-layout" style="direction: rtl;">
                    <div class="about-text slide-left" style="direction: ltr; padding-right: 0; padding-left: 1.5rem;">
                        <h3 style="color: var(--color-white); font-size: 1.8rem; margin-bottom: 1rem;">{t['about_features_title']}</h3>
                        <ul class="feature-list" style="margin-top: 1rem;">
                            <li>{t['about_feature_1']}</li>
                            <li>{t['about_feature_2']}</li>
                            <li>{t['about_feature_3']}</li>
                        </ul>
                        <h3 style="color: var(--color-white); font-size: 1.8rem; margin-top: 2.5rem; margin-bottom: 1rem;">{t['about_values_title']}</h3>
                        <ul class="values-list">
                            <li>{t['about_value_1']}</li>
                            <li>{t['about_value_2']}</li>
                            <li>{t['about_value_3']}</li>
                            <li>{t['about_value_4']}</li>
                            <li>{t['about_value_5']}</li>
                            <li>{t['about_value_6']}</li>
                            <li>{t['about_value_7']}</li>
                        </ul>
                        <p style="margin-top: 2rem; border-left: 4px solid var(--color-accent-orange); padding-left: 1rem; font-size: 1.15rem; font-style: italic;">{t['about_quote']}</p>
                        <h4 style="margin-top: 2rem; color: var(--color-accent-blue); font-size: 1.2rem;">{t['about_tagline']}</h4>
                    </div>
                    <div class="about-image slide-right" style="direction: ltr;">
                        <img src="{rel}assets/Sobre/equipe.jpeg" alt="Equipamec Team" class="rounded-img shadow-lg">
                    </div>
                </div>
            </div>
        </section>

        <section id="services" class="services section bg-alt fade-in">
            <div class="container">
                <div class="section-header text-center slide-up">
                    <h2>{t['services_title']}</h2>
                    <p>{t['services_subtitle']}</p>
                </div>
                <div class="services-grid">
                    <div class="service-card slide-up delay-1"><h3>{t['service_1_title']}</h3><p>{t['service_1_desc']}</p></div>
                    <div class="service-card slide-up delay-2"><h3>{t['service_2_title']}</h3><p>{t['service_2_desc']}</p></div>
                    <div class="service-card slide-up delay-3"><h3>{t['service_3_title']}</h3><p>{t['service_3_desc']}</p></div>
                </div>
            </div>
        </section>

        <section id="contact" class="contact section bg-alt fade-in">
            <div class="container split-layout">
                <div class="contact-info slide-right">
                    <h2>{t['contact_title']}</h2>
                    <p>{t['contact_subtitle']}</p>
                    <div class="contact-details" style="margin-bottom: 2rem;">
                         <p><strong>Email:</strong> comercial@equipamec.com.br</p>
                         <p><strong>Tel:</strong> (12) 99165-4319</p>
                    </div>
                </div>
                <div class="contact-form slide-left">
                    <form action="#" method="POST" id="main-contact-form">
                        <div class="form-group">
                            <label>{t['contact_form_name']}</label>
                            <input type="text" required>
                        </div>
                        <div class="form-group">
                            <label>{t['contact_form_email']}</label>
                            <input type="email" required>
                        </div>
                        <div class="form-group">
                            <label>{t['contact_form_message']}</label>
                            <textarea rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">{t['contact_form_btn']}</button>
                    </form>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container text-center"><p>{t['footer_copy']}</p></div>
    </footer>
    <script src="https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.min.js"></script>
    <script src="https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/mcstudios/glightbox/dist/js/glightbox.min.js"></script>
    <script src="{rel}js/script.js"></script>
</body>
</html>"""
        
        dest_dir = BASE_DIR if lang == 'pt' else os.path.join(BASE_DIR, lang)
        if not os.path.exists(dest_dir): os.makedirs(dest_dir)
        with open(os.path.join(dest_dir, 'index.html'), 'w', encoding='utf-8') as f:
            f.write(html)

def generate_product_pages():
    for lang in LANGS:
        rel = get_rel_prefix(lang)
        t = tr[lang]
        cat_tr = product_cats[lang]
        
        for cat_key, items in structure.items():
            cat_name = cat_tr[cat_key]
            for fldr, title in items.items():
                asset_dir = get_asset_dir(fldr)
                folder_path = os.path.join(ASSETS_DIR, asset_dir)
                files = []
                if os.path.isdir(folder_path):
                    files = [f for f in os.listdir(folder_path) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp'))]
                if not files: continue

                main_img = files[0]
                main_img_html = f'''<a href="{rel}assets/{asset_dir}/{main_img}" class="glightbox" data-gallery="gallery-{fldr}"><img src="{rel}assets/{asset_dir}/{main_img}" alt="{title}" style="width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);"></a>'''
                
                thumbs_html = ""
                for thumb in files[1:]:
                    thumbs_html += f'''<a href="{rel}assets/{asset_dir}/{thumb}" class="glightbox" data-gallery="gallery-{fldr}"><img src="{rel}assets/{asset_dir}/{thumb}" style="width: 100%; aspect-ratio: 1/1; object-fit: cover; border-radius: 4px; border: 2px solid transparent;"></a>'''
                
                wa_url = f"https://wa.me/5512991654319?text={urllib.parse.quote(t['whatsapp_text'])} {title}"
                
                html = f"""<!DOCTYPE html>
<html lang="{html_lang(lang)}">
<head>
    {get_head(lang, rel, custom_title=f"{title} - Equipamec")}
</head>
<body>
    <header class="navbar">
        <div class="container nav-container">
            <a href="{rel}index.html" class="logo"><img src="{rel}assets/logo.png" class="brand-logo"></a>
            <nav id="nav-menu" class="nav-menu">{build_nav(lang, rel, f'produto_{fldr}.html')}</nav>
        </div>
    </header>

    <main style="padding-top: 120px; padding-bottom: 60px;">
        <section class="section">
            <div class="container">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 3rem;">
                    <div class="product-gallery">
                        {main_img_html}
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-top: 1rem;">{thumbs_html}</div>
                    </div>
                    <div class="product-details">
                        <p style="text-transform: uppercase; color: var(--color-accent-orange); font-weight: bold;">{cat_name}</p>
                        <h1 style="font-size: 2.5rem; margin-bottom: 1.5rem; color: var(--color-white);">{title}</h1>
                        <p>{t['product_desc']}</p>
                        <h3 style="color: var(--color-white); margin-top: 2rem;">{t['tech_features']}</h3>
                        <ul class="feature-list">
                            <li>{t['feature_1']}</li><li>{t['feature_2']}</li><li>{t['feature_3']}</li>
                        </ul>
                        <a href="{wa_url}" target="_blank" class="btn btn-primary" style="display: block; text-align: center; margin-top: 2rem;">{t['whatsapp_btn']}</a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer"><div class="container text-center"><p>{t['footer_copy']}</p></div></footer>
    <script src="https://cdn.jsdelivr.net/gh/mcstudios/glightbox/dist/js/glightbox.min.js"></script>
    <script src="{rel}js/script.js"></script>
</body>
</html>"""
                
                dest_dir = BASE_DIR if lang == 'pt' else os.path.join(BASE_DIR, lang)
                if not os.path.exists(dest_dir): os.makedirs(dest_dir)
                with open(os.path.join(dest_dir, f'produto_{fldr}.html'), 'w', encoding='utf-8') as f:
                    f.write(html)

def generate_portfolio():
    for lang in LANGS:
        rel = get_rel_prefix(lang)
        t = tr[lang]
        cat_tr = product_cats[lang]
        
        # Build Portfolio Cards
        cards = []
        for cat_key, items in structure.items():
            cat_name = cat_tr[cat_key]
            for fldr, title in items.items():
                asset_dir = get_asset_dir(fldr)
                folder_path = os.path.join(ASSETS_DIR, asset_dir)
                files = []
                if os.path.isdir(folder_path):
                    files = [f for f in os.listdir(folder_path) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp'))]
                if not files: continue
                
                main_img = files[0]
                gallery_id = f"gallery-{fldr}"
                
                card = f'''
                    <div class="gallery-item {cat_key}">
                        <a href="{rel}assets/{asset_dir}/{main_img}" class="glightbox" data-gallery="{gallery_id}" data-title="{title}">
                            <img src="{rel}assets/{asset_dir}/{main_img}" alt="{title}" loading="lazy">
                            <div class="gallery-overlay">
                                <div class="overlay-content">
                                    <h4>{title}</h4>
                                    <p>{cat_name}</p>
                                </div>
                            </div>
                        </a>
                        <!-- Hidden images -->
                '''
                for other in files[1:]:
                    card += f'                        <a href="{rel}assets/{asset_dir}/{other}" class="glightbox" data-gallery="{gallery_id}" style="display: none;"></a>'
                
                card += '                    </div>'
                cards.append(card)

        html = f"""<!DOCTYPE html>
<html lang="{html_lang(lang)}">
<head>
    {get_head(lang, rel, custom_title=f"Portfolio - Equipamec")}
</head>
<body>
    <header class="navbar">
        <div class="container nav-container">
            <a href="{rel}index.html" class="logo"><img src="{rel}assets/logo.png" class="brand-logo"></a>
            <nav id="nav-menu" class="nav-menu">{build_nav(lang, rel, 'portfolio.html')}</nav>
        </div>
    </header>

    <main style="padding-top: 120px;">
        <section class="section">
            <div class="container">
                <div class="section-header text-center">
                    <h2>{tr[lang]['nav_products']}</h2>
                    <p>{tr[lang]['gallery_subtitle']}</p>
                </div>
                
                <div class="portfolio-filters text-center" style="margin-bottom: 2rem;">
                    <button class="filter-btn active" data-filter="*">Todos</button>
                    <button class="filter-btn" data-filter=".cat_hpu">{cat_tr['cat_hpu']}</button>
                    <button class="filter-btn" data-filter=".cat_cleaning">{cat_tr['cat_cleaning']}</button>
                    <button class="filter-btn" data-filter=".cat_accessories">{cat_tr['cat_accessories']}</button>
                </div>

                <div id="portfolio-grid" class="portfolio-standard-grid">
                    {''.join(cards)}
                </div>
            </div>
        </section>
    </main>

    <footer class="footer"><div class="container text-center"><p>{t['footer_copy']}</p></div></footer>
    <script src="https://cdn.jsdelivr.net/gh/mcstudios/glightbox/dist/js/glightbox.min.js"></script>
    <script src="{rel}js/script.js"></script>
</body>
</html>"""

        dest_dir = BASE_DIR if lang == 'pt' else os.path.join(BASE_DIR, lang)
        if not os.path.exists(dest_dir): os.makedirs(dest_dir)
        with open(os.path.join(dest_dir, 'portfolio.html'), 'w', encoding='utf-8') as f:
            f.write(html)

if __name__ == "__main__":
    generate_index()
    generate_product_pages()
    generate_portfolio()
    print("Multilingual site successfully generated (PT, EN, ES).")
