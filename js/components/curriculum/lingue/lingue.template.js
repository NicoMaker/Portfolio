import { ext } from "../../../shared/dom/html.js";
import { LINK_LABEL } from "./lingue.config.js";

/** HTML interno della card di una lingua (bandiera, livello, link). */
export const lingueTemplate = (d) =>
  [
    `<img class="flag" loading="lazy" src="${d.immagine}" alt="${d.lingua}">`,
    `<h3>${d.lingua}</h3>`,
    `<span class="tag">${d.livello}</span>`,
    `<div class="links">${ext(d.link, LINK_LABEL)}</div>`,
  ].join("");
