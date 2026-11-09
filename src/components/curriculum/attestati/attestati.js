import { ext } from "../../../shared/dom.js";
import { renderSection } from "../shared/card.js";

const template = (d) =>
  `<h3>${d.titolo}</h3>${d.ente ? `<span class="tag">${d.ente}</span>` : ""}<p>${d.descrizione || ""}</p><div class="links">${ext(d.link, "Visualizza")}</div>`;

export const initAttestati = () =>
  renderSection({
    id: "attestati",
    json: new URL("./attestati.json", import.meta.url),
    template,
  });
