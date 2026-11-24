import { SECTIONS } from "./curriculum.sections.js";

/** Orchestratore: ogni sezione del curriculum è un componente indipendente. */
export const initCurriculum = () =>
  Promise.allSettled(SECTIONS.map((init) => init()));
