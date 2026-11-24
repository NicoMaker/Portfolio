/* Percorsi centralizzati: i componenti non calcolano più "../../../" a mano */

/**
 * Risolve un file dentro la cartella /json partendo dalla radice del sito.
 * Esempio: jsonUrl("components/social/social.json")
 */
export const jsonUrl = (path) =>
  new URL(`../../../json/${path}`, import.meta.url);
