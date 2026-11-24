import { $ } from "../../shared/dom/selectors.js";
import {
  initCaptcha,
  renderCaptcha,
  isCaptchaValid,
} from "./captcha/captcha.js";
import { CONTATTI } from "./contatti.config.js";
import { createFeedback } from "./contatti.feedback.js";
import { bindPhoneFilter, isFormValid } from "./contatti.validation.js";
import { openMailClient } from "./contatti.mail.js";

/** Form contatti: validazione, captcha e apertura del client di posta. */
export function initContatti() {
  const { form, message, captchaInput } = CONTATTI.selectors;
  const { messages } = CONTATTI;

  initCaptcha();
  const f = $(form);
  const say = createFeedback($(message));
  bindPhoneFilter(f);

  f.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!isFormValid(f)) return say(messages.invalid, "err");

    if (!isCaptchaValid($(captchaInput).value)) {
      renderCaptcha();
      $(captchaInput).value = "";
      return say(messages.captcha, "err");
    }

    const data = Object.fromEntries(new FormData(f));
    say(messages.opening, "ok");
    openMailClient(data);
    f.reset();
    renderCaptcha();
  });
}
