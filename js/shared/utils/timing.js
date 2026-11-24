/* Utilità di temporizzazione */

/** Attende `ms` millisecondi (da usare con await). */
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
