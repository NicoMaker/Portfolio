/* Configurazione del captcha disegnato su canvas */

export const CAPTCHA = {
  selectors: { canvas: "#captchaCanvas", refresh: "#refreshCaptcha" },
  /** Caratteri ammessi (senza O/0/I/1 per evitare ambiguità) */
  chars: "ABCDEFGHJKLMNPQRSTUVWXYZ23456789",
  length: 6,
  colors: { background: "#10213f", text: "#64ffda" },
  font: "700 38px JetBrains Mono, monospace",
  noiseDots: 70,
  noiseLines: 5,
  /** Posizione e spaziatura dei caratteri sul canvas */
  layout: { startX: 30, step: 58, centerY: 35 },
};
