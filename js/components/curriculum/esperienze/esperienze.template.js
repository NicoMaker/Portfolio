import { ext, list } from "../../../shared/dom/html.js";
import { LINK_LABEL } from "./esperienze.config.js";

const logo = (d) =>
  d.logo
    ? `<img class="lg" loading="lazy" src="${d.logo}" alt="${d.azienda}">`
    : "";

const activities = (d) =>
  `<ul>${list(d.attivita)
    .map((a) => `<li>${a}</li>`)
    .join("")}</ul>`;

/** HTML interno della card di un'esperienza lavorativa. */
export const esperienzeTemplate = (d) =>
  [
    logo(d),
    `<h3>${d.ruolo}</h3>`,
    `<p><b>${d.azienda}</b> · ${d.luogo || ""}</p>`,
    `<div class="meta"><span class="tag">${d.periodo || ""}</span></div>`,
    activities(d),
    `<div class="links">${ext(d.sito, LINK_LABEL)}</div>`,
  ].join("");
