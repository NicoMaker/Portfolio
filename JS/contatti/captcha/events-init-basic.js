window.addEventListener("DOMContentLoaded", () => {
  generateCaptcha();

  const refreshBtn = document.getElementById("refreshCaptcha");
  const captchaInput = document.getElementById("captchaInput");
  const canvas = document.getElementById("captchaCanvas");

  if (refreshBtn) {
    refreshBtn.addEventListener("click", generateCaptcha);
  }

  if (captchaInput) {
    captchaInput.addEventListener("input", validateCaptcha);
    captchaInput.addEventListener("paste", (e) => {
      e.preventDefault(); // Impedisce l'incollaggio
    });
  }

  if (canvas) {
    canvas.addEventListener("click", generateCaptcha);
  }
});

// Funzione aggiornata per la validazione nel form
