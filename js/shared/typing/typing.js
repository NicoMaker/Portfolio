import { sleep } from "../utils/timing.js";
import { reducedMotion } from "../utils/motion.js";
import { writePart } from "./typing.writer.js";

const LOOP_PAUSE = 4000;

/** Effetto "digitazione" da terminale: parts = [[classeCss, testo], ...] */
export async function type(el, parts, speed = 18, loop = false) {
  do {
    el.textContent = "";
    for (const part of parts) await writePart(el, part, speed);
    if (loop) await sleep(LOOP_PAUSE);
  } while (loop && !reducedMotion());
}
