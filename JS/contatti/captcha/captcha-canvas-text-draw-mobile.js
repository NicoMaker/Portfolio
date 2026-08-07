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
  const availableWidth = width - padding * 2;
  const totalSpacingNeeded = availableWidth - totalCharWidth;
  const spaceBetweenChars = totalSpacingNeeded / (text.length - 1);

  let currentX = padding;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const charWidth = charWidths[i];
    const x = currentX + charWidth / 2; // Centro del carattere
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
