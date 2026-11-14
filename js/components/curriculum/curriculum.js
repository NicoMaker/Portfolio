import { initAttestati } from "./attestati/attestati.js";
import { initLingue } from "./lingue/lingue.js";
import { initEsperienze } from "./esperienze/esperienze.js";
import { initIstruzione } from "./istruzione/istruzione.js";
import { initCompetenze } from "./competenze/competenze.js";
import { initSitiWeb } from "./siti-web/siti-web.js";

/** Orchestratore: ogni sezione del curriculum è un componente indipendente. */
export const initCurriculum = () =>
  Promise.allSettled([
    initAttestati(),
    initLingue(),
    initEsperienze(),
    initIstruzione(),
    initCompetenze(),
    initSitiWeb(),
  ]);
