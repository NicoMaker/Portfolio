import { BACK_TO_TOP } from "./back-to-top.config.js";

/** Mostra o nasconde il pulsante in base alla posizione di scroll. */
export const updateVisibility = (button) =>
  button.classList.toggle(
    "show",
    document.documentElement.scrollTop > BACK_TO_TOP.threshold,
  );

/** Torna all'inizio della pagina con scroll fluido. */
export const scrollToTop = () => scrollTo({ top: 0, behavior: "smooth" });
