import { $ } from "../../../shared/dom/selectors.js";
import { load } from "../../../shared/utils/data.js";
import { reveal } from "../../../shared/reveal/reveal.js";
import { card } from "./card.js";
import { LOAD_ERROR_HTML } from "./messages.js";

/**
 * Carica il JSON di una sezione e la disegna nella sua griglia.
 * `template` trasforma un elemento del JSON nell'HTML interno della card.
 */
export async function renderSection({ id, json, template }) {
  const grid = $(`#${id} .grid`);
  try {
    const items = await load(json);
    grid.innerHTML = items.map((d) => card(template(d))).join("");
    reveal(grid);
  } catch {
    grid.innerHTML = LOAD_ERROR_HTML;
  }
}
