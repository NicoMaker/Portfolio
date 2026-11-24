/* Selettori DOM abbreviati, usati da tutti i componenti */

/** Primo elemento che corrisponde al selettore (dentro `e`, default document). */
export const $ = (s, e = document) => e.querySelector(s);

/** Tutti gli elementi che corrispondono al selettore, come array vero. */
export const $$ = (s, e = document) => [...e.querySelectorAll(s)];
