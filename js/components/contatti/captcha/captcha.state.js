import { CAPTCHA } from "./captcha.config.js";

let code = "";

/** Genera e memorizza un nuovo codice casuale. */
export function generateCode() {
  code = Array.from(
    { length: CAPTCHA.length },
    () => CAPTCHA.chars[(Math.random() * CAPTCHA.chars.length) | 0],
  ).join("");
  return code;
}

/** True se il testo scritto dall'utente coincide col codice mostrato. */
export const isCaptchaValid = (value) => value.trim().toUpperCase() === code;
