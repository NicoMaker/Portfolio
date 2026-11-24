import { renderSection } from "../shared/render-section.js";
import { LINGUE } from "./lingue.config.js";
import { lingueTemplate } from "./lingue.template.js";

/** Sezione Competenze linguistiche (dati in lingue.json). */
export const initLingue = () =>
  renderSection({ ...LINGUE, template: lingueTemplate });
