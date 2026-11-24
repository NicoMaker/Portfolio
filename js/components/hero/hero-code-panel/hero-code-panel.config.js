import { jsonUrl } from "../../../shared/utils/paths.js";

/* Configurazione del pannello "codice" dell'hero */

export const CODE_PANEL = {
  json: jsonUrl("components/hero/hero-code-panel/panels.json"),
  selectors: {
    body: "#heroCodeBody",
    name: ".code .bar span",
    panel: ".code",
  },
  mobileQuery: "(max-width:480px)",
  /** Ritardo (ms) tra un carattere e l'altro */
  charDelay: { mobile: 6, desktop: 10 },
  /** Oltre queste righe il pannello passa alla versione compatta */
  compactAfterLines: 14,
  /** Pausa (ms) a file completo, prima del successivo */
  endPause: 1400,
};
