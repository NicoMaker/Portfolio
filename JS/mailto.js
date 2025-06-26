let generatedCaptcha = "";

function generateCaptcha() {
  const canvas = document.getElementById("captchaCanvas");
  const ctx = canvas.getContext("2d");

  const uppercase = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lowercase = "abcdefghjkmnpqrstuvwxyz";
  const digits = "23456789";
  const allChars = uppercase + lowercase + digits;

  // Garantire almeno 1 maiuscola, 1 minuscola e 1 numero
  let captchaArray = [
    uppercase[Math.floor(Math.random() * uppercase.length)],
    lowercase[Math.floor(Math.random() * lowercase.length)],
    digits[Math.floor(Math.random() * digits.length)],
  ];

  // Aggiungere altri 5 caratteri casuali
  while (captchaArray.length < 8) {
    captchaArray.push(allChars[Math.floor(Math.random() * allChars.length)]);
  }

  // Mischiare i caratteri
  generatedCaptcha = captchaArray.sort(() => 0.5 - Math.random()).join("");

  // Disegnare il CAPTCHA
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "24px Poppins";
  ctx.fillStyle = "#1e293b";
  ctx.fillText(generatedCaptcha, 10, 30);
}

window.addEventListener("DOMContentLoaded", () => {
  generateCaptcha();
  const refreshBtn = document.getElementById("refreshCaptcha");
  if (refreshBtn) refreshBtn.addEventListener("click", generateCaptcha);
});

function sendEmail(event) {
  event.preventDefault();

  const fields = ["name", "cognome", "email", "telefono", "oggetto", "message"];
  const [name, surname, email, telefono, oggetto, message] = fields.map(getInputValue);
  const captchaInput = getInputValue("captchaInput");

  if (!name || !surname || !email || !telefono || !oggetto || !message) {
    alert("Tutti i campi devono essere compilati.");
    return;
  }

  if (!isValidEmail(email)) {
    alert("L'indirizzo email non è valido.");
    return;
  }

  if (!isValidPhone(telefono)) {
    alert("Per favore, inserisci un numero di telefono valido nel formato internazionale (es. +39...).");
    return;
  }

  if (captchaInput.toUpperCase() !== generatedCaptcha.toUpperCase()) {
    alert("Captcha errato. Riprova.");
    generateCaptcha();
    return;
  }

  const subject = encodeURIComponent(oggetto);
  const body = encodeURIComponent(
    `Gentile Nicola Marano,\n\n` +
    `Mi chiamo ${name} ${surname}, il mio indirizzo email è ${email}, e il mio numero di telefono è ${telefono}.\n\n` +
    `Desidero contattarla per il seguente motivo:\n\n${message}\n\n` +
    `Resto a disposizione per eventuali chiarimenti.\n` +
    `Cordiali saluti,\n${name} ${surname}`
  );

  window.location.href = `mailto:nicola.marano02@gmail.com?subject=${subject}&body=${body}`;
}

// Helpers
const getInputValue = (id) => document.getElementById(id)?.value.trim() || "";

const isValidPhone = (number) => /^\+?[0-9]{10,15}$/.test(number);

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
