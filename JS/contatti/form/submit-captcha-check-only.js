function sendEmail(event) {
  event.preventDefault();

  const fields = ["name", "cognome", "email", "telefono", "oggetto", "message"];
  const [name, surname, email, telefono, oggetto, message] =
    fields.map(getInputValue);
  const captchaInput = getInputValue("captchaInput");

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
