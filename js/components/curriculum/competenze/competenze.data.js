import { load } from "../../../shared/utils/data.js";
import { COMPETENZE } from "./competenze.config.js";

/** Elenco delle competenze (competenze.json). Rifiuta se non si carica. */
export const loadSkills = () => load(COMPETENZE.json.skills);

/** Mappa categoria -> competenze (categorie.json). Se manca, nessuna categoria. */
export async function loadCategories() {
  try {
    return (await load(COMPETENZE.json.categories)).skillCategories;
  } catch {
    return {};
  }
}
