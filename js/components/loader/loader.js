import { $ } from "../../shared/dom/selectors.js";
import { sleep } from "../../shared/utils/timing.js";
import { LOADER } from "./loader.config.js";

export { boot } from "./loader.boot.js";
export { initLogoReplay } from "./loader.replay.js";

/** Nasconde il loader (attende al massimo `hideTimeout` ms la fine del boot). */
export async function hideLoader(bootPromise) {
  await Promise.race([bootPromise, sleep(LOADER.hideTimeout)]);
  $(LOADER.selectors.loader).classList.add("done");
}
