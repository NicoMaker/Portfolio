import { HEADER } from "./header.config.js";

/** Menu mobile (hamburger): si apre col pulsante, si chiude con un click su un link o con Esc. */
export function initMenu(nav, hamburger) {
  const toggle = (open) => {
    nav.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", open);
    hamburger.firstElementChild.className =
      open ? HEADER.icons.open : HEADER.icons.closed;
  };

  hamburger.onclick = () => toggle(!nav.classList.contains("open"));
  nav.onclick = (e) => e.target.closest("a") && toggle(false);
  addEventListener("keydown", (e) => e.key === "Escape" && toggle(false));
}
