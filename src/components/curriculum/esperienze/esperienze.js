import { ext, list } from "../../../shared/dom.js";
import { renderSection } from "../shared/card.js";

const template = (d) =>
  `${d.logo ? `<img class="lg" loading="lazy" src="${d.logo}" alt="${d.azienda}">` : ""}<h3>${d.ruolo}</h3><p><b>${d.azienda}</b> · ${d.luogo || ""}</p><div class="meta"><span class="tag">${d.periodo || ""}</span></div><ul>${list(d.attivita).map((a) => `<li>${a}</li>`).join("")}</ul><div class="links">${ext(d.sito, "Sito")}</div>`;

export const initEsperienze = () =>
  renderSection({ id: "esperienze", json: new URL("./esperienze.json", import.meta.url), template });
