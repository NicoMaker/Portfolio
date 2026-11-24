import { ext } from "../../../shared/dom/html.js";
import { COMPETENZE } from "./competenze.config.js";

/** HTML interno della card di una competenza (logo, nome, categoria, link). */
export const competenzeTemplate = (s, category) =>
  [
    `<img loading="lazy" src="${s.immagine}" alt="" onerror="this.remove()">`,
    `<h3>${s.nome}</h3>`,
    `<span class="tag">${category}</span>`,
    `<p>${s.descrizione || ""}</p>`,
    `<div class="links">${ext(s.link, COMPETENZE.linkLabel)}</div>`,
  ].join("");
