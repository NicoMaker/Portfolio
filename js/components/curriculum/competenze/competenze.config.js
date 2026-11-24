import { jsonUrl } from "../../../shared/utils/paths.js";

/* Configurazione della sezione Competenze (con filtro per categoria) */

export const COMPETENZE = {
  selectors: { skills: "#competenze .skills", tabs: "#tabs" },
  json: {
    skills: jsonUrl("components/curriculum/competenze/competenze.json"),
    categories: jsonUrl("components/curriculum/competenze/categorie.json"),
  },
  /** Etichetta del filtro che mostra tutto */
  allLabel: "Tutte",
  /** Categoria delle competenze non presenti in categorie.json */
  otherLabel: "Altro",
  linkLabel: "Docs",
};
