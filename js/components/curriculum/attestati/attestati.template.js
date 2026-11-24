import { ext } from "../../../shared/dom/html.js";
import { LINK_LABEL } from "./attestati.config.js";

/** HTML interno della card di un attestato. */
export const attestatiTemplate = (d) =>
  [
    `<h3>${d.titolo}</h3>`,
    d.ente ? `<span class="tag">${d.ente}</span>` : "",
    `<p>${d.descrizione || ""}</p>`,
    `<div class="links">${ext(d.link, LINK_LABEL)}</div>`,
  ].join("");
