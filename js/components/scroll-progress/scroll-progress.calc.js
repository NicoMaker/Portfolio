/** Avanzamento dello scroll della pagina, da 0 a 1. */
export function getScrollRatio() {
  const h = document.documentElement;
  return h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
}
