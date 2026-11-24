import { $ } from "../../shared/dom/selectors.js";
import { load } from "../../shared/utils/data.js";
import { SOCIAL } from "./social.config.js";
import { socialTemplate } from "./social.template.js";

/** Icone social: carica social.json e le disegna. Se il JSON manca, non fa nulla. */
export async function initSocial() {
  try {
    const { socialLinks } = await load(SOCIAL.json);
    $(SOCIAL.selector).innerHTML = socialLinks.map(socialTemplate).join("");
  } catch {}
}
