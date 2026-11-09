import { ext, list } from "../../../shared/dom.js";
import { renderSection } from "../shared/card.js";

const template = (d) =>
  `${d.logo ? `<img class="lg" loading="lazy" src="${d.logo}" alt="${d.istituto}">` : ""}<h3>${d.titolo}</h3><p><b>${d.istituto}</b> · ${d.luogo || ""}</p><div class="meta"><span class="tag">${d.periodo || ""}</span>${d.livello ? `<span class="tag">${d.livello}</span>` : ""}</div><ul>${list(
    d.competenze,
  )
    .map((a) => `<li>${a}</li>`)
    .join("")}</ul><div class="links">${ext(d.sito, "Sito")}</div>`;

export const initIstruzione = () =>
  renderSection({
    id: "istruzione",
    json: new URL("./istruzione.json", import.meta.url),
    template,
  });
