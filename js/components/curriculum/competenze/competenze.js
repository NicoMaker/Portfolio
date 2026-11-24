import { $ } from "../../../shared/dom/selectors.js";
import { LOAD_ERROR_HTML } from "../shared/messages.js";
import { COMPETENZE } from "./competenze.config.js";
import { loadSkills, loadCategories } from "./competenze.data.js";
import { sortSkills, buildTabNames } from "./competenze.categories.js";
import { drawSkills } from "./competenze.render.js";
import { initTabs } from "./competenze.tabs.js";

/** Competenze con filtro per categoria (competenze.json + categorie.json). */
export async function initCompetenze() {
  const box = $(COMPETENZE.selectors.skills);

  let skills;
  try {
    skills = await loadSkills();
  } catch {
    box.innerHTML = LOAD_ERROR_HTML;
    return;
  }

  const cats = await loadCategories();
  const sorted = sortSkills(skills);
  const draw = (category) => drawSkills(box, sorted, cats, category);

  initTabs(buildTabNames(sorted, cats), draw);
  draw(COMPETENZE.allLabel);
}
