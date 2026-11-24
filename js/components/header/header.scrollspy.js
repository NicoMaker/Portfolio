import { $$ } from "../../shared/dom/selectors.js";
import { HEADER } from "./header.config.js";

/** Evidenzia nel menu il link della sezione visibile e aggiorna l'hash dell'URL. */
export function initScrollSpy(links) {
  const spy = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) =>
          a.classList.toggle("on", a.hash === "#" + e.target.id),
        );
        history.replaceState(null, "", "#" + e.target.id);
      }),
    { rootMargin: HEADER.spyMargin },
  );
  $$(HEADER.selectors.sections).forEach((s) => spy.observe(s));
}
