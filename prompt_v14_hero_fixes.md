# Prompt v14 — Hero carrossel: mobile sobreposição + Chrome autoplay

## Problema 1 — Mobile: slides sobrepostos
Os slides não estão se escondendo corretamente no mobile.
O slide 2 aparece abaixo do slide 1 em vez de ficar oculto.

### Correção CSS:
```css
.hero-slides {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
}

.hero-slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease;
  pointer-events: none;
  visibility: hidden; /* adicionar isso */
}

.hero-slide.active {
  opacity: 1;
  pointer-events: auto;
  visibility: visible; /* adicionar isso */
}
```

Também garantir que .hero tenha:
```css
.hero {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  /* NÃO usar height: auto — causa sobreposição no mobile */
}
```

## Problema 2 — Chrome: vídeo não toca (autoplay bloqueado)

Chrome bloqueia autoplay de vídeo mesmo com muted em algumas situações.
A solução é tentar play() via JS com fallback para poster (imagem estática).

### Correção JS — adicionar função de play seguro:

No js/script.js, dentro da função do carrossel, substituir a lógica de play por:

```js
function safePlay(video) {
  if (!video) return;
  video.muted = true; // garantir muted antes de tentar
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Autoplay bloqueado — mostrar poster ou tentar no próximo evento
      // Tentar novamente no primeiro clique/toque do usuário
      const retryPlay = () => {
        video.play().catch(() => {});
        document.removeEventListener('click', retryPlay);
        document.removeEventListener('touchstart', retryPlay);
      };
      document.addEventListener('click', retryPlay, { once: true });
      document.addEventListener('touchstart', retryPlay, { once: true });
    });
  }
}
```

Substituir todas as chamadas `video.play().catch(() => {})` e `nextVideo.play()` por `safePlay(nextVideo)`.

Para o primeiro slide, dentro do DOMContentLoaded ou no início do carrossel:
```js
const firstVideo = slides[0]?.querySelector('.hero-video');
safePlay(firstVideo);
```

### Correção HTML — adicionar atributos extras no video tag:

Para cada `<video class="hero-video">` nos 3 slides, garantir:
```html
<video class="hero-video" autoplay muted loop playsinline
       disablepictureinpicture disableremoteplayback
       webkit-playsinline x5-playsinline>
```

O primeiro slide já deve ter autoplay. Os slides 2 e 3 devem ter preload="metadata" 
(não "none" — isso pode bloquear o play no Chrome mobile).

### Adicionar poster nos vídeos (fallback visual se não tocar):

Extrair frame de cada vídeo como imagem de poster e adicionar:
```html
<!-- Slide 1 -->
<video ... poster="assets/videos/poster_mergulho.jpg">

<!-- Slide 2 -->  
<video ... poster="assets/videos/poster_tornearia.jpg">

<!-- Slide 3 -->
<video ... poster="assets/videos/poster_caldeiraria.jpg">
```

Se não tiver os posters ainda, usar as imagens já existentes:
- Slide 1: poster="assets/hero-bg.png" (ou a foto do mergulhador)
- Slide 2: poster="assets/produtos/unidade_fundo_preto.jpg"
- Slide 3: poster="assets/produtos/hpj_deck.jpg"

## Problema 3 — Mobile: texto cortado na esquerda

O print mostra textos como "nde Ninguém" cortados na esquerda.
O padding-left está insuficiente no mobile.

```css
@media (max-width: 768px) {
  .hero-slide-content {
    padding: 100px 20px 80px 20px; /* padding simétrico */
    max-width: 100%;
  }
  
  .hero-title {
    font-size: clamp(1.8rem, 7vw, 2.8rem);
    word-break: break-word;
  }
}
```

## Ordem de execução
1. CSS: visibility hidden/visible nos slides + overflow hidden no hero
2. CSS: corrigir padding mobile do hero-slide-content
3. HTML: adicionar atributos webkit-playsinline, disablepictureinpicture, preload="metadata" nos slides 2 e 3
4. HTML: adicionar poster nos 3 vídeos usando imagens já existentes
5. JS: criar função safePlay() e substituir todas as chamadas de play
6. Aplicar em en/index.html e es/index.html também
7. Commit: "fix: hero carousel mobile overlap, Chrome autoplay, text padding"
