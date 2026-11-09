import { $, $$, sleep } from "../../shared/dom.js";
import { reveal } from "../../shared/reveal.js";
import { type } from "../../shared/typing.js";

/** Avvia l'animazione del terminale nel loader. */
export const boot = () =>
  type(
    $("#terminalBody"),
    [["k", "$ "], ["f", "npm run"], [0, " portfolio\n"], ["c", "// avvio...\n"], ["s", "✔ pronto"]],
    14,
  );

/** Nasconde il loader (attende al massimo 1.8s la fine del boot). */
export async function hideLoader(bootPromise) {
  await Promise.race([bootPromise, sleep(1800)]);
  $("#loader").classList.add("done");
}

/** Click sul logo: riavvia loader + entrata hero. */
export function initLogoReplay() {
  let replaying = false;
  $(".logo").addEventListener("click", async (e) => {
    e.preventDefault();
    if (replaying) return;
    replaying = true;
    const loader = $("#loader");
    loader.classList.remove("done");
    $$(".hero .reveal").forEach((el) => el.classList.remove("in"));
    scrollTo({ top: 0, behavior: "instant" });
    history.replaceState(null, "", "#home");
    await Promise.race([boot(), sleep(2500)]);
    await sleep(300);
    loader.classList.add("done");
    await sleep(350);
    reveal(document);
    replaying = false;
  });
}
