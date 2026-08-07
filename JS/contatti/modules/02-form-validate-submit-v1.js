function validateCaptcha() {
  const input = document.getElementById("captchaInput");
  const status = document.getElementById("captchaStatus");
  const inputValue = input.value.trim();

  if (inputValue.length === 0) {
    input.className = "";
    status.className = "input-status";
    status.textContent = "";
    return false;
  }

  if (inputValue.toUpperCase() === generatedCaptcha.toUpperCase()) {
    input.className = "valid";
    status.className = "input-status valid";
    status.textContent = "✓";
    return true;
  } else {
    input.className = "invalid";
    status.className = "input-status invalid";
    status.textContent = "✗";
    return false;
  }
}

// Event listeners
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
function sendEmail(event) {
  event.preventDefault();

  const fields = ["name", "cognome", "email", "telefono", "oggetto", "message"];
  const [name, surname, email, telefono, oggetto, message] =
    fields.map(getInputValue);
  const captchaInput = getInputValue("captchaInput");

  // Validazione dei campi
  if (!name || !surname || !email || !telefono || !oggetto || !message) {
    generateCaptcha(); // ✅ CAPTCHA si rigenera anche se altri campi sono errati
    return;
  }

  if (!isValidEmail(email) || !isValidPhone(telefono)) {
    generateCaptcha(); // ✅ CAPTCHA si rigenera anche in caso di email o telefono errati
    return;
  }

  if (captchaInput.toUpperCase() !== generatedCaptcha.toUpperCase()) {
    generateCaptcha();
    const input = document.getElementById("captchaInput");
    input.className = "invalid";
    setTimeout(() => input.focus(), 100);
    return;
  }

  // ✅ Pulisci i dati dal localStorage e dal form
  clearFormData();
  fields.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  document.getElementById("captchaInput").value = "";
  validateCaptcha();
  generateCaptcha();

  // ✅ Invia email
  const subject = encodeURIComponent(oggetto);
  const body = encodeURIComponent(
    `Gentile Nicola Marano,\n\n` +
      `Mi chiamo ${name} ${surname}, il mio indirizzo email è ${email}, e il mio numero di telefono è ${telefono}.\n\n` +
      `Desidero contattarla per il seguente motivo:\n\n${message}\n\n` +
      `Resto a disposizione per eventuali chiarimenti.\n` +
      `Cordiali saluti,\n${name} ${surname}`,
  );

  window.location.href = `mailto:nicola.marano02@gmail.com?subject=${subject}&body=${body}`;
}

