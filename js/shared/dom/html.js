/* Piccoli helper per costruire HTML a partire dai dati dei JSON */

/** Normalizza un valore in array: accetta un array o una stringa separata da a capo / ";". */
export const list = (v) =>
  Array.isArray(v)
    ? v
    : typeof v === "string"
      ? v.split(/\n|;/).filter(Boolean)
      : [];

/** Link esterno con icona; stringa vuota se manca l'indirizzo. */
export const ext = (h, t) =>
  h
    ? `<a href="${h}" target="_blank" rel="noopener"><i class="bx bx-link-external"></i>${t}</a>`
    : "";
