import { $$ } from "../dom/selectors.js";
import { revealObserver } from "./reveal.observer.js";

/** Osserva gli elementi .reveal dentro `root` e li mostra quando entrano in vista. */
export const reveal = (root = document) =>
  $$(".reveal:not(.in)", root).forEach((el) => revealObserver.observe(el));
