import { $ } from "../../shared/dom/selectors.js";
import { BACK_TO_TOP } from "./back-to-top.config.js";
import { updateVisibility, scrollToTop } from "./back-to-top.actions.js";

/** Pulsante "torna su": compare dopo lo scroll e riporta in cima. */
export function initBackToTop() {
  const button = $(BACK_TO_TOP.selector);
  addEventListener("scroll", () => updateVisibility(button), { passive: true });
  button.onclick = scrollToTop;
}
