/* Caricamento dei dati */

/** Scarica un JSON; rifiuta la promessa (con l'URL) se la risposta non è ok. */
export const load = (u) =>
  fetch(u).then((r) => (r.ok ? r.json() : Promise.reject(u)));
