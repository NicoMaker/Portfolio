/* Observer condiviso: aggiunge la classe "in" quando l'elemento entra in vista */

export const revealObserver = new IntersectionObserver(
  (es) =>
    es.forEach(
      (e) =>
        e.isIntersecting &&
        (e.target.classList.add("in"), revealObserver.unobserve(e.target)),
    ),
  { threshold: 0.12 },
);
