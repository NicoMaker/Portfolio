import { $, $$ } from "../../shared/dom.js";

/** Menu mobile (hamburger) + evidenziazione link attivo (scrollspy). */
export function initHeader() {
  const links = $$("nav a"),
    nav = $("#menu"),
    hb = $("#hamburger");

  const spy = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.toggle("on", a.hash === "#" + e.target.id));
        history.replaceState(null, "", "#" + e.target.id);
      }),
    { rootMargin: "-45% 0px -50% 0px" },
  );
  $$("main section").forEach((s) => spy.observe(s));

  const toggle = (open) => {
    nav.classList.toggle("open", open);
    hb.setAttribute("aria-expanded", open);
    hb.firstElementChild.className = "bx " + (open ? "bx-x" : "bx-menu");
  };
  hb.onclick = () => toggle(!nav.classList.contains("open"));
  nav.onclick = (e) => e.target.closest("a") && toggle(false);
  addEventListener("keydown", (e) => e.key === "Escape" && toggle(false));
}
