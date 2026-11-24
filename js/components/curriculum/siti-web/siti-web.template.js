import { ext } from "../../../shared/dom/html.js";
import { LINK_LABELS } from "./siti-web.config.js";

/** HTML interno della card di un sito web (anteprima, link al sito e al codice). */
export const sitiWebTemplate = (d) =>
  [
    `<img class="cover" loading="lazy" src="${d.immagine}" alt="${d.nome}">`,
    `<h3>${d.nome}</h3>`,
    `<div class="links">${ext(d.link, LINK_LABELS.visit)}${ext(d.codice, LINK_LABELS.code)}</div>`,
  ].join("");
