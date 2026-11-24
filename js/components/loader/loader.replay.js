import { $, $$ } from "../../shared/dom/selectors.js";
import { sleep } from "../../shared/utils/timing.js";
import { reveal } from "../../shared/reveal/reveal.js";
import { LOADER } from "./loader.config.js";
import { boot } from "./loader.boot.js";

/** Click sul logo: riavvia loader + entrata dell'hero. */
export function initLogoReplay() {
  const { loader: loaderSel, logo, heroReveal } = LOADER.selectors;
  let replaying = false;

  $(logo).addEventListener("click", async (e) => {
    e.preventDefault();
    if (replaying) return;
    replaying = true;

    const loader = $(loaderSel);
    loader.classList.remove("done");
    $$(heroReveal).forEach((el) => el.classList.remove("in"));
    scrollTo({ top: 0, behavior: "instant" });
    history.replaceState(null, "", "#home");

    await Promise.race([boot(), sleep(LOADER.replayTimeout)]);
    await sleep(300);
    loader.classList.add("done");
    await sleep(350);
    reveal(document);
    replaying = false;
  });
}
