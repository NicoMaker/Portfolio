import { reveal } from "../../../shared/reveal/reveal.js";
import { card } from "../shared/card.js";
import { COMPETENZE } from "./competenze.config.js";
import { categoryOf } from "./competenze.categories.js";
import { competenzeTemplate } from "./competenze.template.js";

/** Disegna le card delle competenze della categoria scelta ("Tutte" = tutte). */
export function drawSkills(box, skills, cats, category) {
  box.innerHTML = skills
    .filter(
      (s) =>
        category === COMPETENZE.allLabel ||
        categoryOf(cats, s.nome) === category,
    )
    .map((s) => card(competenzeTemplate(s, categoryOf(cats, s.nome))))
    .join("");
  reveal(box);
}
