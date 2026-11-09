/* Utility DOM e dati condivise da tutti i componenti */
export const $ = (s, e = document) => e.querySelector(s);
export const $$ = (s, e = document) => [...e.querySelectorAll(s)];
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const load = (u) => fetch(u).then((r) => (r.ok ? r.json() : Promise.reject(u)));
export const reducedMotion = () => matchMedia("(prefers-reduced-motion:reduce)").matches;

export const list = (v) =>
  Array.isArray(v) ? v : typeof v === "string" ? v.split(/\n|;/).filter(Boolean) : [];

export const ext = (h, t) =>
  h ? `<a href="${h}" target="_blank" rel="noopener"><i class="bx bx-link-external"></i>${t}</a>` : "";
