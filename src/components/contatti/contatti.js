import { $ } from "../../shared/dom.js";
import { initCaptcha, renderCaptcha, isCaptchaValid } from "./captcha/captcha.js";

const EMAIL = "nicola.marano02@gmail.com";

/** Form contatti: validazione, captcha e apertura del client di posta. */
export function initContatti() {
  initCaptcha();
  const f = $("#contactForm"),
    m = $("#formMsg"),
    say = (t, k) => {
      m.textContent = t;
      m.className = "full msg " + k;
    };

  f.telefono.addEventListener("input", (e) => (e.target.value = e.target.value.replace(/[^\d+\s]/g, "")));

  f.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!f.checkValidity()) {
      f.reportValidity();
      return say("Compila correttamente tutti i campi.", "err");
    }
    if (!isCaptchaValid($("#captchaInput").value)) {
      renderCaptcha();
      $("#captchaInput").value = "";
      return say("Captcha errato, riprova.", "err");
    }
    const d = Object.fromEntries(new FormData(f)),
      body = `Nome: ${d.name} ${d.cognome}\nEmail: ${d.email}\nTelefono: ${d.telefono}\n\n${d.message}`;
    say("Apertura del client di posta…", "ok");
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(d.oggetto)}&body=${encodeURIComponent(body)}`;
    f.reset();
    renderCaptcha();
  });
}
