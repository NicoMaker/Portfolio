import { renderSection } from "../shared/render-section.js";
import { ESPERIENZE } from "./esperienze.config.js";
import { esperienzeTemplate } from "./esperienze.template.js";

/** Sezione Esperienze (dati in esperienze.json). */
export const initEsperienze = () =>
  renderSection({ ...ESPERIENZE, template: esperienzeTemplate });
