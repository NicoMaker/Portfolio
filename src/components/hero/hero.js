import { $, load } from "../../shared/dom.js";
import { initHeroCodePanel } from "./hero-code-panel/hero-code-panel.js";

const FALLBACK = ["Programmatore", "Risolutore di problemi", "Designer UI/UX", "Codice pulito"];

/** Frase che si scrive e si cancella ("Sono un ...") */
async function initTypingPhrases() {
  let phrases = FALLBACK;
  try {
    phrases = (await load(new URL("./typing-phrases.json", import.meta.url))).typingPhrases;
  } catch {}
  const el = $("#typed");
  let i = 0,
    j = 0,
    deleting = false;
  (function tick() {
    const w = phrases[i];
    el.textContent = w.slice(0, j);
    if (!deleting && j === w.length) {
      deleting = true;
      return setTimeout(tick, 1600);
    }
    if (deleting && j === 0) {
      deleting = false;
      i = (i + 1) % phrases.length;
    }
    j += deleting ? -1 : 1;
    setTimeout(tick, deleting ? 40 : 85);
  })();
}

export async function initHero() {
  initHeroCodePanel();
  await initTypingPhrases();
}
