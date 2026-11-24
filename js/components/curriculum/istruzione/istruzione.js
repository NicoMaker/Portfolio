import { renderSection } from "../shared/render-section.js";
import { ISTRUZIONE } from "./istruzione.config.js";
import { istruzioneTemplate } from "./istruzione.template.js";

/** Sezione Istruzione (dati in istruzione.json). */
export const initIstruzione = () =>
  renderSection({ ...ISTRUZIONE, template: istruzioneTemplate });
