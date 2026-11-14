import { $ } from "../../shared/dom.js";

export function initScrollProgress() {
  const bar = $("#progress");
  addEventListener(
    "scroll",
    () => {
      const h = document.documentElement;
      bar.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`;
    },
    { passive: true },
  );
}
