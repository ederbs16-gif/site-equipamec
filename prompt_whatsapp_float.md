# Prompt — Botão Flutuante WhatsApp com Mini-Formulário

## O que fazer
Adicionar em TODAS as páginas do site (index.html, portfolio.html, galeria.html, produto_*.html e todas as versões en/ e es/) um botão flutuante do WhatsApp no canto inferior direito. Ao clicar, abre um mini-formulário popup com campos: Nome, Empresa, Telefone e Email. Ao submeter, abre o WhatsApp com os dados preenchidos na mensagem.

## HTML — adicionar antes do </body> em todas as páginas

```html
<!-- WhatsApp Float -->
<div class="wa-float" id="waFloat">

  <!-- Botão principal -->
  <button class="wa-float-btn" id="waFloatBtn" aria-label="Falar pelo WhatsApp">
    <svg class="wa-icon-whatsapp" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
    <span class="wa-float-pulse"></span>
  </button>

  <!-- Mini formulário -->
  <div class="wa-form-popup" id="waFormPopup" aria-hidden="true">
    <div class="wa-form-header">
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <div>
        <strong>Fale com a Equipamec</strong>
        <span>Resposta em minutos</span>
      </div>
      <button class="wa-form-close" id="waFormClose" aria-label="Fechar">✕</button>
    </div>
    <form class="wa-form" id="waContactForm">
      <input type="text" name="wa_nome" placeholder="Nome *" required autocomplete="name">
      <input type="text" name="wa_empresa" placeholder="Empresa" autocomplete="organization">
      <input type="tel" name="wa_telefone" placeholder="Telefone *" required autocomplete="tel">
      <input type="email" name="wa_email" placeholder="E-mail" autocomplete="email">
      <button type="submit" class="wa-form-submit">
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Enviar pelo WhatsApp
      </button>
    </form>
  </div>

</div>
```

## CSS — adicionar no final do style.css

```css
/* ===== WHATSAPP FLUTUANTE ===== */
.wa-float {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

/* Botão principal */
.wa-float-btn {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #25d366;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.45);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
}

.wa-float-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 28px rgba(37, 211, 102, 0.6);
}

.wa-icon-whatsapp {
  width: 30px;
  height: 30px;
  color: #fff;
  position: relative;
  z-index: 1;
}

/* Pulso animado */
.wa-float-pulse {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(37, 211, 102, 0.4);
  animation: wa-pulse 2.5s ease-out infinite;
}

@keyframes wa-pulse {
  0% { transform: scale(1); opacity: 0.7; }
  100% { transform: scale(1.9); opacity: 0; }
}

/* Popup formulário */
.wa-form-popup {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.18);
  width: 300px;
  overflow: hidden;
  transform: scale(0.85) translateY(12px);
  transform-origin: bottom right;
  opacity: 0;
  pointer-events: none;
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.wa-form-popup.open {
  transform: scale(1) translateY(0);
  opacity: 1;
  pointer-events: auto;
}

/* Header do popup */
.wa-form-header {
  background: #075e54;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
}

.wa-form-header svg { flex-shrink: 0; }

.wa-form-header div {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.wa-form-header strong {
  font-size: 0.85rem;
  font-weight: 700;
}

.wa-form-header span {
  font-size: 0.72rem;
  opacity: 0.75;
}

.wa-form-close {
  background: none;
  border: none;
  color: rgba(255,255,255,0.7);
  font-size: 1rem;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  transition: color 0.15s;
  flex-shrink: 0;
}

.wa-form-close:hover { color: #fff; }

/* Campos do formulário */
.wa-form {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.wa-form input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.85rem;
  font-family: inherit;
  color: #222;
  outline: none;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
  background: #fafafa;
}

.wa-form input:focus {
  border-color: #25d366;
  background: #fff;
}

.wa-form input::placeholder { color: #aaa; }

.wa-form-submit {
  background: #25d366;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 11px 16px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.2s ease, transform 0.15s ease;
  font-family: inherit;
  margin-top: 2px;
}

.wa-form-submit:hover {
  background: #1db954;
  transform: translateY(-1px);
}

/* Mobile */
@media (max-width: 480px) {
  .wa-float {
    bottom: 20px;
    right: 16px;
  }

  .wa-form-popup {
    width: calc(100vw - 32px);
    max-width: 300px;
  }
}
```

## JavaScript — adicionar no DOMContentLoaded em js/script.js

```js
// --- WhatsApp Flutuante ---
(function() {
  const floatBtn = document.getElementById('waFloatBtn');
  const popup = document.getElementById('waFormPopup');
  const closeBtn = document.getElementById('waFormClose');
  const form = document.getElementById('waContactForm');

  if (!floatBtn || !popup) return;

  const WA_NUMBER = '5512991654319';

  function openPopup() {
    popup.classList.add('open');
    popup.setAttribute('aria-hidden', 'false');
    popup.querySelector('input').focus();
  }

  function closePopup() {
    popup.classList.remove('open');
    popup.setAttribute('aria-hidden', 'true');
  }

  floatBtn.addEventListener('click', () => {
    popup.classList.contains('open') ? closePopup() : openPopup();
  });

  closeBtn.addEventListener('click', closePopup);

  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.wa-float')) closePopup();
  });

  // Fechar com Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePopup();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nome = (data.get('wa_nome') || '').trim();
    const empresa = (data.get('wa_empresa') || '').trim();
    const telefone = (data.get('wa_telefone') || '').trim();
    const email = (data.get('wa_email') || '').trim();

    const lines = [
      'Olá! Vim pelo site da Equipamec e gostaria de mais informações.',
      '',
      nome ? `Nome: ${nome}` : '',
      empresa ? `Empresa: ${empresa}` : '',
      telefone ? `Telefone: ${telefone}` : '',
      email ? `E-mail: ${email}` : '',
    ].filter(l => l !== null);

    const msg = lines.join('\n').trim();
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');

    form.reset();
    closePopup();
  });
})();
```

## Traduções EN e ES

Para páginas em en/, o placeholder do botão e textos do header mudam:
- Header strong: "Talk to Equipamec"
- Header span: "Response in minutes"
- Campos: "Name *", "Company", "Phone *", "Email"
- Botão submit: "Send via WhatsApp"

Para páginas em es/:
- Header strong: "Habla con Equipamec"
- Header span: "Respuesta en minutos"
- Campos: "Nombre *", "Empresa", "Teléfono *", "Correo electrónico"
- Botão submit: "Enviar por WhatsApp"

Implementar textos corretos por idioma em cada versão HTML.

## Ordem de execução
1. CSS: adicionar bloco WhatsApp no final do style.css
2. HTML: adicionar o bloco `.wa-float` antes de `</body>` em index.html
3. JS: adicionar o bloco no DOMContentLoaded em script.js
4. Replicar HTML em TODOS os outros arquivos PT (portfolio.html, produto_*.html)
5. Replicar em EN com textos em inglês (en/*.html)
6. Replicar em ES com textos em espanhol (es/*.html)
7. Commit: "feat: botao flutuante whatsapp com formulario em todas as paginas"
