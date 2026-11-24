import { renderSection } from "../shared/render-section.js";
import { ATTESTATI } from "./attestati.config.js";
import { attestatiTemplate } from "./attestati.template.js";

/** Sezione Attestati (dati in attestati.json). */
export const initAttestati = () =>
  renderSection({ ...ATTESTATI, template: attestatiTemplate });
