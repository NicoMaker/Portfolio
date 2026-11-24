import { $ } from "../../shared/dom/selectors.js";
import { SCROLL_PROGRESS } from "./scroll-progress.config.js";
import { getScrollRatio } from "./scroll-progress.calc.js";

/** Barra in alto che si allarga man mano che si scorre la pagina. */
export function initScrollProgress() {
  const bar = $(SCROLL_PROGRESS.selector);
  addEventListener(
    "scroll",
    () => (bar.style.transform = `scaleX(${getScrollRatio()})`),
    { passive: true },
  );
}
