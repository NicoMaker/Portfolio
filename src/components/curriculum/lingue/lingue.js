import { ext } from "../../../shared/dom.js";
import { renderSection } from "../shared/card.js";

const template = (d) =>
  `<img class="flag" loading="lazy" src="${d.immagine}" alt="${d.lingua}"><h3>${d.lingua}</h3><span class="tag">${d.livello}</span><div class="links">${ext(d.link, "Impara")}</div>`;

export const initLingue = () =>
  renderSection({
    id: "linguistiche",
    json: new URL("./lingue.json", import.meta.url),
    template,
  });
