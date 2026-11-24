import { $ } from "../../shared/dom/selectors.js";
import { load } from "../../shared/utils/data.js";
import { HERO } from "./hero.config.js";

/** Frasi da JSON, con ripiego sulle frasi di default. */
async function loadPhrases() {
  try {
    return (await load(HERO.phrasesJson)).typingPhrases;
  } catch {
    return HERO.fallbackPhrases;
  }
}

/** Frase che si scrive e si cancella ("Sono un ..."). */
export async function initTypingPhrases() {
  const phrases = await loadPhrases();
  const el = $(HERO.typedSelector);
  let i = 0,
    j = 0,
    deleting = false;

  (function tick() {
    const w = phrases[i];
    el.textContent = w.slice(0, j);
    if (!deleting && j === w.length) {
      deleting = true;
      return setTimeout(tick, HERO.holdMs);
    }
    if (deleting && j === 0) {
      deleting = false;
      i = (i + 1) % phrases.length;
    }
    j += deleting ? -1 : 1;
    setTimeout(tick, deleting ? HERO.deleteSpeed : HERO.typeSpeed);
  })();
}
