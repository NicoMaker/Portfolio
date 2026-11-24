import { CAPTCHA } from "./captcha.config.js";

const randomHue = () => Math.random() * 360;

/** Disegna sul canvas lo sfondo, i disturbi (puntini e linee) e il codice. */
export function drawCaptcha(canvas, code) {
  const x = canvas.getContext("2d");
  const { colors, layout } = CAPTCHA;

  x.fillStyle = colors.background;
  x.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < CAPTCHA.noiseDots; i++) {
    x.fillStyle = `hsla(${randomHue()},70%,65%,.5)`;
    x.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      2,
      2,
    );
  }

  for (let i = 0; i < CAPTCHA.noiseLines; i++) {
    x.strokeStyle = `hsla(${randomHue()},70%,65%,.6)`;
    x.beginPath();
    x.moveTo(0, Math.random() * 70);
    x.lineTo(400, Math.random() * 70);
    x.stroke();
  }

  x.font = CAPTCHA.font;
  x.textBaseline = "middle";
  [...code].forEach((ch, i) => {
    x.save();
    x.translate(layout.startX + i * layout.step, layout.centerY);
    x.rotate((Math.random() - 0.5) * 0.5);
    x.fillStyle = colors.text;
    x.fillText(ch, 0, 0);
    x.restore();
  });
}
