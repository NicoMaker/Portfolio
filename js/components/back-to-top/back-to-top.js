import { $ } from "../../shared/dom.js";

export function initBackToTop() {
  const up = $("#toTop");
  addEventListener(
    "scroll",
    () => up.classList.toggle("show", document.documentElement.scrollTop > 600),
    { passive: true },
  );
  up.onclick = () => scrollTo({ top: 0, behavior: "smooth" });
}
