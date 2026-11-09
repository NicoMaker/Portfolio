import { ext } from "../../../shared/dom.js";
import { renderSection } from "../shared/card.js";

const template = (d) =>
  `<img class="cover" loading="lazy" src="${d.immagine}" alt="${d.nome}"><h3>${d.nome}</h3><div class="links">${ext(d.link, "Visita")}${ext(d.codice, "Codice")}</div>`;

export const initSitiWeb = () =>
  renderSection({ id: "sites", json: new URL("./siti-web.json", import.meta.url), template });
