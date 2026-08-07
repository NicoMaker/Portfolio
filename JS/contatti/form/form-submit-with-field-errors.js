function sendEmail(event) {
  event.preventDefault();

  const fields = ["name", "cognome", "email", "telefono", "oggetto", "message"];
  const [name, surname, email, telefono, oggetto, message] =
    fields.map(getInputValue);
  const captchaInput = getInputValue("captchaInput");

  let hasError = false;

  // Resetta errori visivi
  fields.forEach((id) => {
    const errorEl = document.getElementById(`error-${id}`);
    if (errorEl) errorEl.textContent = "";
  });
  const captchaError = document.getElementById("error-captchaInput");
  if (captchaError) captchaError.textContent = "";

  // ⚠️ Campi vuoti
  fields.forEach((id) => {
    const value = getInputValue(id);
    const errorEl = document.getElementById(`error-${id}`);
    if (!value) {
      if (errorEl) errorEl.textContent = "Questo campo è obbligatorio.";
      hasError = true;
    }
  });

  if (hasError) {
    alert("Compila tutti i campi obbligatori.");
    generateCaptcha();
    return;
  }

  // ⚠️ Email non valida
  if (!isValidEmail(email)) {
    const errorEl = document.getElementById("error-email");
    if (errorEl) errorEl.textContent = "Inserisci un indirizzo email valido.";
    alert("L'indirizzo email inserito non è valido.");
    generateCaptcha();
    return;
  }

  // ⚠️ Telefono non valido
  if (!isValidPhone(telefono)) {
    const errorEl = document.getElementById("error-telefono");
    if (errorEl)
      errorEl.textContent = "Numero non valido (usa +39 e almeno 10 cifre).";
    alert("Il numero di telefono non è valido.");
    generateCaptcha();
    return;
  }

  // ⚠️ CAPTCHA errato
  if (captchaInput.toUpperCase() !== generatedCaptcha.toUpperCase()) {
    const input = document.getElementById("captchaInput");
    const errorEl = document.getElementById("error-captchaInput");
    if (errorEl) errorEl.textContent = "Il codice CAPTCHA è errato.";
    input.className = "invalid";
    setTimeout(() => input.focus(), 100);
    alert("Codice CAPTCHA errato. Inserisci quello corretto.");
    generateCaptcha();
    return;
  }

  // ✅ Tutto corretto
  clearFormData();
  fields.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  document.getElementById("captchaInput").value = "";
  validateCaptcha();
  generateCaptcha();

  alert("Messaggio inviato correttamente!");

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
