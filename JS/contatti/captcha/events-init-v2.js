window.addEventListener("DOMContentLoaded", () => {
  generateCaptcha();
  restoreFormData();
  bindAutoSave();

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

