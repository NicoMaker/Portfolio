import { sleep } from "../utils/timing.js";

/**
 * Scrive un singolo pezzo di testo lettera per lettera
 * dentro uno <span> con la classe css indicata.
 * `part` = [classeCss, testo]
 */
export async function writePart(el, [cls, text], speed) {
  const span = document.createElement("span");
  if (cls) span.className = cls;
  el.append(span);
  for (const ch of text) {
    span.textContent += ch;
    await sleep(speed);
  }
}
