import { sleep, reducedMotion } from "./dom.js";

/** Effetto "digitazione" da terminale: parts = [[classeCss, testo], ...] */
export async function type(el, parts, speed = 18, loop = false) {
  do {
    el.textContent = "";
    for (const [c, t] of parts) {
      const s = document.createElement("span");
      if (c) s.className = c;
      el.append(s);
      for (const ch of t) {
        s.textContent += ch;
        await sleep(speed);
      }
    }
    if (loop) await sleep(4000);
  } while (loop && !reducedMotion());
}
