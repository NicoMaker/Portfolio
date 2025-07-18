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

  // Aggiungere altri 5 caratteri casuali per un totale di  8
  while (captchaArray.length < 8)
    captchaArray.push(allChars[Math.floor(Math.random() * allChars.length)]);


  // Mischiare i caratteri
  generatedCaptcha = captchaArray.sort(() => 0.5 - Math.random()).join("");

  // Pulire il canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Disegnare sfondo con pattern
  drawBackground(ctx, canvas.width, canvas.height);

  // Disegnare il testo con effetti
  drawCaptchaText(ctx, generatedCaptcha, canvas.width, canvas.height);

  // Aggiungere disturbi
  addNoise(ctx, canvas.width, canvas.height);

  // Reset input status
  const input = document.getElementById("captchaInput");
  const status = document.getElementById("captchaStatus");
  input.value = "";
  input.className = "";
  status.className = "input-status";
  status.textContent = "";
}

function drawBackground(ctx, width, height) {
  // Gradiente di sfondo più chiaro
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#ffffff");
  gradient.addColorStop(0.5, "#f8fafc");
  gradient.addColorStop(1, "#f1f5f9");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Pattern di punti molto leggero
  ctx.fillStyle = "rgba(100, 116, 139, 0.05)";
  for (let i = 0; i < 15; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawCaptchaText(ctx, text, width, height) {
  const colors = ["#1e293b", "#374151", "#4338ca", "#7c3aed", "#dc2626"];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const x = (width / (text.length + 1)) * (i + 1);
    const y = height / 2 + 5;

    // Rotazione molto leggera per mantenere leggibilità
    const angle = (Math.random() - 0.5) * 0.15;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    // Stile del testo più leggibile
    ctx.font = `bold ${24 + Math.random() * 4}px 'Arial', 'Helvetica', sans-serif`;
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Ombra più leggera
    ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
    ctx.shadowBlur = 1;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    ctx.fillText(char, 0, 0);

    ctx.restore();
  }
}

function addNoise(ctx, width, height) {
  // Linee di disturbo molto leggere
  ctx.strokeStyle = "rgba(100, 116, 139, 0.15)";
  ctx.lineWidth = 0.5;

  // Solo 2 linee sottili
  for (let i = 0; i < 2; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * width, Math.random() * height);
    ctx.bezierCurveTo(
      Math.random() * width, Math.random() * height,
      Math.random() * width, Math.random() * height,
      Math.random() * width, Math.random() * height
    );
    ctx.stroke();
  }

  // Pochi punti di disturbo
  ctx.fillStyle = "rgba(100, 116, 139, 0.1)";
  for (let i = 0; i < 8; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    ctx.beginPath();
    ctx.arc(x, y, 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

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
  const [name, surname, email, telefono, oggetto, message] = fields.map(getInputValue);
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
  fields.forEach(id => {
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
    `Cordiali saluti,\n${name} ${surname}`
  );

  window.location.href = `mailto:nicola.marano02@gmail.com?subject=${subject}&body=${body}`;
}


function drawCaptchaText(ctx, text, width, height) {
  const colors = ["#1e293b", "#374151", "#4338ca", "#7c3aed", "#dc2626"];

  // Calcola spaziatura più precisa per mobile
  const padding = 20; // Margini laterali
  const availableWidth = width - (padding * 2);
  const charSpacing = availableWidth / (text.length + 1); // +1 per spaziatura uniforme

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    // Migliore distribuzione: padding + spaziatura per ogni carattere
    const x = padding + charSpacing * (i + 1);
    const y = height / 2 + 5;

    // Rotazione molto leggera per mantenere leggibilità
    const angle = (Math.random() - 0.5) * 0.15;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    // Stile del testo più leggibile
    ctx.font = `bold ${24 + Math.random() * 4}px 'Arial', 'Helvetica', sans-serif`;
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Ombra più leggera
    ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
    ctx.shadowBlur = 1;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    ctx.fillText(char, 0, 0);

    ctx.restore();
  }
}

// Alternativa ancora migliore per mobile:
function drawCaptchaTextMobile(ctx, text, width, height) {
  const colors = ["#1e293b", "#374151", "#4338ca", "#7c3aed", "#dc2626"];

  // Per mobile, usa un approccio diverso
  const isMobile = width <= 320;
  const fontSize = isMobile ? 20 : 24;
  const padding = isMobile ? 15 : 20;

  // Calcola larghezza effettiva di ogni carattere
  ctx.font = `bold ${fontSize}px 'Arial', 'Helvetica', sans-serif`;
  const charWidths = [];
  let totalCharWidth = 0;

  for (let i = 0; i < text.length; i++) {
    const charWidth = ctx.measureText(text[i]).width;
    charWidths.push(charWidth);
    totalCharWidth += charWidth;
  }

  // Calcola spaziatura dinamica
  const availableWidth = width - (padding * 2);
  const totalSpacingNeeded = availableWidth - totalCharWidth;
  const spaceBetweenChars = totalSpacingNeeded / (text.length - 1);

  let currentX = padding;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const charWidth = charWidths[i];
    const x = currentX + (charWidth / 2); // Centro del carattere
    const y = height / 2 + 5;

    // Rotazione molto leggera per mantenere leggibilità
    const angle = (Math.random() - 0.5) * 0.15;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    // Stile del testo più leggibile
    ctx.font = `bold ${fontSize + Math.random() * 4}px 'Arial', 'Helvetica', sans-serif`;
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Ombra più leggera
    ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
    ctx.shadowBlur = 1;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    ctx.fillText(char, 0, 0);

    ctx.restore();

    // Muovi alla posizione successiva
    currentX += charWidth + spaceBetweenChars;
  }
}

// Helpers (mantieni quelli esistenti)
const getInputValue = (id) => document.getElementById(id)?.value.trim() || "";
const isValidPhone = (number) => /^\+?[0-9]{10,15}$/.test(number);
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// === Auto-salvataggio dei dati ===
const formFieldIds = ["name", "cognome", "email", "telefono", "oggetto", "message"];

function saveFormData() {
  const formData = {};
  formFieldIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) formData[id] = el.value;
  });
  localStorage.setItem("formData", JSON.stringify(formData));
}

function restoreFormData() {
  const saved = localStorage.getItem("formData");
  if (saved) {
    const data = JSON.parse(saved);
    formFieldIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && data[id] !== undefined) {
        el.value = data[id];
      }
    });
  }
}

function clearFormData() {
  localStorage.removeItem("formData");
}

function bindAutoSave() {
  formFieldIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", saveFormData);
  });
}

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

    // NUOVO: se l’utente ha scritto 8 caratteri ma sbaglia, rigenera CAPTCHA
    if (inputValue.length >= 8) {
      setTimeout(() => {
        generateCaptcha();
        input.focus();
      }, 500);
    }
    return false;
  }
}

function sendEmail(event) {
  event.preventDefault();

  const fields = ["name", "cognome", "email", "telefono", "oggetto", "message"];
  const [name, surname, email, telefono, oggetto, message] = fields.map(getInputValue);
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
  fields.forEach(id => {
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
    `Cordiali saluti,\n${name} ${surname}`
  );

  window.location.href = `mailto:nicola.marano02@gmail.com?subject=${subject}&body=${body}`;
}

function validateCaptcha() {
  const input = document.getElementById("captchaInput");
  const status = document.getElementById("captchaStatus");
  const inputValue = input.value;

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

    // Se ha scritto 8 caratteri, rigenera CAPTCHA
    if (inputValue.length >= 8) {
      setTimeout(() => {
        generateCaptcha();
        input.focus();
      }, 500);
    }
    return false;
  }
}

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
    captchaInput.addEventListener("paste", e => e.preventDefault());
  }

  if (canvas) canvas.addEventListener("click", generateCaptcha);
  if (form) form.addEventListener("submit", sendEmail);
});


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
    captchaInput.addEventListener("paste", e => e.preventDefault());
  }

  if (canvas) canvas.addEventListener("click", generateCaptcha);
  if (form) form.addEventListener("submit", sendEmail);
});


function sendEmail(event) {
  event.preventDefault();

  const fields = ["name", "cognome", "email", "telefono", "oggetto", "message"];
  const [name, surname, email, telefono, oggetto, message] = fields.map(getInputValue);
  const captchaInput = getInputValue("captchaInput");

  let hasError = false;

  // Resetta errori visivi
  fields.forEach(id => {
    const errorEl = document.getElementById(`error-${id}`);
    if (errorEl) errorEl.textContent = "";
  });
  const captchaError = document.getElementById("error-captchaInput");
  if (captchaError) captchaError.textContent = "";

  // ⚠️ Campi vuoti
  fields.forEach(id => {
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
    if (errorEl) errorEl.textContent = "Numero non valido (usa +39 e almeno 10 cifre).";
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
  fields.forEach(id => {
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
    `Cordiali saluti,\n${name} ${surname}`
  );

  window.location.href = `mailto:nicola.marano02@gmail.com?subject=${subject}&body=${body}`;
}
