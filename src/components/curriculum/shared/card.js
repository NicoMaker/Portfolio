import { $ } from "../../../shared/dom.js";
import { reveal } from "../../../shared/reveal.js";

export const card = (html) => `<article class="card reveal">${html}</article>`;

/**
 * Carica il JSON di una sezione e la disegna nella sua griglia.
 * `template` trasforma un elemento del JSON nell'HTML interno della card.
 */
export async function renderSection({ id, json, template }) {
  const grid = $(`#${id} .grid`);
  try {
    const items = await fetch(json).then((r) => (r.ok ? r.json() : Promise.reject(json)));
    grid.innerHTML = items.map((d) => card(template(d))).join("");
    reveal(grid);
  } catch {
    grid.innerHTML = "<p>Impossibile caricare i contenuti.</p>";
  }
}
