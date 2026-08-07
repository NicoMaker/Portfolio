function drawCaptchaText(ctx, text, width, height) {
  const colors = ["#1e293b", "#374151", "#4338ca", "#7c3aed", "#dc2626"];

  // Calcola spaziatura più precisa per mobile
  const padding = 20; // Margini laterali
  const availableWidth = width - padding * 2;
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
