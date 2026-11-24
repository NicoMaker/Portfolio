import { NO_TRANSLATE_SELECTORS } from "./i18n.config.js";

/**
 * Marca come "notranslate" i contenuti che non vanno tradotti (nome, logo,
 * telefoni, email, nome file del terminale): Google a volte li altera
 * quando sono dentro frasi.
 */
export function protectNonTranslatableContent() {
  NO_TRANSLATE_SELECTORS.forEach((selector) => {
    document.querySelectorAll(selector).forEach((node) => {
      node.classList.add("notranslate");
      node.setAttribute("translate", "no");
    });
  });
}

/**
 * Footer e altri blocchi sono generati via JS dopo il caricamento:
 * osserva il DOM e riapplica la protezione quando compare nuovo contenuto.
 */
export function watchDynamicContent() {
  if (!("MutationObserver" in window)) return;
  new MutationObserver(protectNonTranslatableContent).observe(document.body, {
    childList: true,
    subtree: true,
  });
}
