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
      Math.random() * width,
      Math.random() * height,
      Math.random() * width,
      Math.random() * height,
      Math.random() * width,
      Math.random() * height,
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

