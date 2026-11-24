import { $ } from "../../../shared/dom/selectors.js";
import { load } from "../../../shared/utils/data.js";
import { reducedMotion } from "../../../shared/utils/motion.js";
import { CODE_PANEL } from "./hero-code-panel.config.js";
import { renderStatic } from "./hero-code-panel.render.js";
import { loopFiles } from "./hero-code-panel.animation.js";

/** Pannello "codice" ciclico (dati in panels.json). */
export async function initHeroCodePanel() {
  let files;
  try {
    files = await load(CODE_PANEL.json);
  } catch {
    return;
  }

  const { body, name, panel } = CODE_PANEL.selectors;
  const bodyEl = $(body);
  const els = { body: bodyEl, nameEl: $(name), panel: bodyEl.closest(panel) };

  if (reducedMotion()) return renderStatic(els.body, els.nameEl, files[0]);

  const { mobile, desktop } = CODE_PANEL.charDelay;
  await loopFiles(els, files, matchMedia(CODE_PANEL.mobileQuery).matches ? mobile : desktop);
}
