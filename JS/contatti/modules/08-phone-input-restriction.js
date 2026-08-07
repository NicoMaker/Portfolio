function bindPhoneInputRestriction() {
  const telefonoInput = document.getElementById("telefono");
  if (!telefonoInput) return;

  telefonoInput.addEventListener("input", () => {
    let value = telefonoInput.value;

    // Rimuove tutti i caratteri non numerici, eccetto +
    value = value.replace(/[^\d+]/g, "");

    // Mantiene solo il primo + se è all'inizio
    if (value.includes("+")) {
      value = "+" + value.replace(/\+/g, "").replace(/[^\d]/g, "");
    }

    telefonoInput.value = value;
  });
}

window.addEventListener("DOMContentLoaded", () => {
  generateCaptcha();
  restoreFormData();
  bindAutoSave();

  // 👉 AGGIUNGI QUESTO
  bindPhoneInputRestriction();

  const refreshBtn = document.getElementById("refreshCaptcha");
  const captchaInput = document.getElementById("captchaInput");
  const canvas = document.getElementById("captchaCanvas");
  const form = document.getElementById("contactForm");

  if (refreshBtn) refreshBtn.addEventListener("click", generateCaptcha);

  if (captchaInput) {
    captchaInput.addEventListener("input", validateCaptcha);
    captchaInput.addEventListener("paste", (e) => e.preventDefault());
  }

  if (canvas) canvas.addEventListener("click", generateCaptcha);
  if (form) form.addEventListener("submit", sendEmail);
});

