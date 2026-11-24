import { initHeroCodePanel } from "./hero-code-panel/hero-code-panel.js";
import { initTypingPhrases } from "./hero.typing.js";

/** Hero: pannello codice animato + frase che si scrive. */
export async function initHero() {
  initHeroCodePanel();
  await initTypingPhrases();
}
