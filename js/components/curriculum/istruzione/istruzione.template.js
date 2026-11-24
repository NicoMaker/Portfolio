import { ext, list } from "../../../shared/dom/html.js";
import { LINK_LABEL } from "./istruzione.config.js";

const logo = (d) =>
  d.logo
    ? `<img class="lg" loading="lazy" src="${d.logo}" alt="${d.istituto}">`
    : "";

const meta = (d) =>
  `<div class="meta"><span class="tag">${d.periodo || ""}</span>${
    d.livello ? `<span class="tag">${d.livello}</span>` : ""
  }</div>`;

const skills = (d) =>
  `<ul>${list(d.competenze)
    .map((a) => `<li>${a}</li>`)
    .join("")}</ul>`;

/** HTML interno della card di un percorso di istruzione. */
export const istruzioneTemplate = (d) =>
  [
    logo(d),
    `<h3>${d.titolo}</h3>`,
    `<p><b>${d.istituto}</b> · ${d.luogo || ""}</p>`,
    meta(d),
    skills(d),
    `<div class="links">${ext(d.sito, LINK_LABEL)}</div>`,
  ].join("");
