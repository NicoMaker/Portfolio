import { $$ } from "./dom.js";

const io = new IntersectionObserver(
  (es) =>
    es.forEach(
      (e) =>
        e.isIntersecting &&
        (e.target.classList.add("in"), io.unobserve(e.target)),
    ),
  { threshold: 0.12 },
);

/** Osserva gli elementi .reveal dentro `root` e li mostra quando entrano in vista. */
export const reveal = (root = document) =>
  $$(".reveal:not(.in)", root).forEach((el) => io.observe(el));
