# Prompt — Substituir hero estático por vídeo em `servico_caldeiraria.html`

## Objetivo
Substituir a imagem estática `hero_soldagem.jpeg` do hero da página `servico_caldeiraria.html` por vídeo em loop, seguindo o mesmo padrão dos heroes do `index.html`.

---

## Arquivos de vídeo disponíveis
- `assets/videos/hero_caldeirariaretro.mp4`
- `assets/videos/hero_caldeirariaretro.webm`

---

## Alteração no `servico_caldeiraria.html`

Localizar este trecho:

```html
<div class="servico-hero-bg">
  <img src="assets/servicos/caldeiraria/hero_soldagem.jpeg"
       alt="Soldagem industrial Equipamec" loading="eager">
  <div class="servico-hero-overlay"></div>
</div>
```

Substituir por:

```html
<div class="servico-hero-bg">
  <video class="servico-hero-video" autoplay muted loop playsinline preload="auto" poster="assets/servicos/caldeiraria/hero_soldagem.jpeg">
    <source src="assets/videos/hero_caldeirariaretro.webm" type="video/webm">
    <source src="assets/videos/hero_caldeirariaretro.mp4" type="video/mp4">
  </video>
  <div class="servico-hero-overlay"></div>
</div>
```

---

## CSS a adicionar em `css/style.css`

Dentro do bloco `PÁGINAS DE SERVIÇO` já existente, adicionar após `.servico-hero-bg img`:

```css
.servico-hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}
```

E remover ou sobrescrever a regra `.servico-hero-bg img` para que a imagem não ocupe espaço quando o vídeo carrega — transformá-la em poster apenas:

```css
.servico-hero-bg img {
  display: none;
}
```

---

## JS — autoplay seguro

No `js/script.js`, dentro do IIFE do WhatsApp flutuante ou após ele, adicionar:

```javascript
/* Autoplay seguro — hero vídeo caldeiraria */
(function () {
  const heroVid = document.querySelector('.servico-hero-video');
  if (!heroVid) return;
  heroVid.play().catch(() => {
    heroVid.muted = true;
    heroVid.play();
  });
})();
```

---

## Arquivos a modificar
- `servico_caldeiraria.html`
- `css/style.css`
- `js/script.js`

## Não fazer
- Não modificar nenhum outro HTML
- Não remover o arquivo `hero_soldagem.jpeg` — ele continua sendo usado como `poster` do vídeo
