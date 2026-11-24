import { $ } from "../../../shared/dom/selectors.js";
import { CAPTCHA } from "./captcha.config.js";
import { generateCode } from "./captcha.state.js";
import { drawCaptcha } from "./captcha.draw.js";

export { isCaptchaValid } from "./captcha.state.js";

/** Genera e disegna un nuovo captcha sul canvas. */
export const renderCaptcha = () =>
  drawCaptcha($(CAPTCHA.selectors.canvas), generateCode());

/** Prima visualizzazione + pulsante "ricarica". */
export function initCaptcha() {
  renderCaptcha();
  $(CAPTCHA.selectors.refresh).onclick = renderCaptcha;
}
