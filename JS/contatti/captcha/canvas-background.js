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

