import { renderSection } from "../shared/render-section.js";
import { SITI_WEB } from "./siti-web.config.js";
import { sitiWebTemplate } from "./siti-web.template.js";

/** Sezione Siti web (dati in siti-web.json). */
export const initSitiWeb = () =>
  renderSection({ ...SITI_WEB, template: sitiWebTemplate });
