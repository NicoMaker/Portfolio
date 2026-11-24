import { $, $$ } from "../../../shared/dom/selectors.js";
import { COMPETENZE } from "./competenze.config.js";

/**
 * Pulsanti di filtro per categoria: il primo parte attivo.
 * `onSelect(nomeCategoria)` viene chiamato a ogni click.
 */
export function initTabs(names, onSelect) {
  const tabsSel = COMPETENZE.selectors.tabs;
  const tabs = $(tabsSel);

  tabs.innerHTML = names
    .map((n, i) => `<button class="${i ? "" : "on"}">${n}</button>`)
    .join("");

  tabs.onclick = (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    $$(`${tabsSel} button`).forEach((x) => x.classList.toggle("on", x === b));
    onSelect(b.textContent);
  };
}
