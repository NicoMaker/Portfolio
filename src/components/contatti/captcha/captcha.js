import { $ } from "../../../shared/dom.js";

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
let code = "";

/** Genera e disegna un nuovo captcha sul canvas. */
export function renderCaptcha() {
  const c = $("#captchaCanvas"),
    x = c.getContext("2d");
  code = Array.from({ length: 6 }, () => CHARS[(Math.random() * CHARS.length) | 0]).join("");

  x.fillStyle = "#10213f";
  x.fillRect(0, 0, c.width, c.height);
  for (let i = 0; i < 70; i++) {
    x.fillStyle = `hsla(${Math.random() * 360},70%,65%,.5)`;
    x.fillRect(Math.random() * c.width, Math.random() * c.height, 2, 2);
  }
  for (let i = 0; i < 5; i++) {
    x.strokeStyle = `hsla(${Math.random() * 360},70%,65%,.6)`;
    x.beginPath();
    x.moveTo(0, Math.random() * 70);
    x.lineTo(400, Math.random() * 70);
    x.stroke();
  }
  x.font = "700 38px JetBrains Mono, monospace";
  x.textBaseline = "middle";
  [...code].forEach((ch, i) => {
    x.save();
    x.translate(30 + i * 58, 35);
    x.rotate((Math.random() - 0.5) * 0.5);
    x.fillStyle = "#64ffda";
    x.fillText(ch, 0, 0);
    x.restore();
  });
}

export const isCaptchaValid = (value) => value.trim().toUpperCase() === code;

export function initCaptcha() {
  renderCaptcha();
  $("#refreshCaptcha").onclick = renderCaptcha;
}
