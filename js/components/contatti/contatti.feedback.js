/**
 * Crea la funzione che scrive un messaggio sotto al form.
 * `kind` = "ok" | "err" (classe css del messaggio).
 */
export const createFeedback = (el) => (text, kind) => {
  el.textContent = text;
  el.className = "full msg " + kind;
};
