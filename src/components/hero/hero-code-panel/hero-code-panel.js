import { $, load, sleep, reducedMotion } from "../../../shared/dom.js";

const esc = (s) => s.replace(/</g, "&lt;");

/** Pannello "codice" ciclico (dati in panels.json). */
export async function initHeroCodePanel() {
  let files = [];
  try {
    files = await load(new URL("./panels.json", import.meta.url));
  } catch {
    return;
  }
  const body = $("#heroCodeBody"),
    name = $(".code .bar span"),
    panel = body.closest(".code"),
    delay = matchMedia("(max-width:480px)").matches ? 6 : 10;

  if (reducedMotion()) {
    name.textContent = files[0].name;
    body.innerHTML = files[0].lines
      .map(
        (l) =>
          "<div>" +
          l.map((t) => `<span class="${t.t}">${esc(t.v)}</span>`).join("") +
          "</div>",
      )
      .join("");
    return;
  }

  for (let i = 0; ; i = (i + 1) % files.length) {
    const f = files[i];
    body.innerHTML = "";
    name.textContent = f.name;
    panel.classList.toggle("compact", f.lines.length > 14);
    for (const line of f.lines) {
      const row = document.createElement("div");
      body.append(row);
      body.scrollTop = body.scrollHeight;
      for (const t of line) {
        if (!t.v) continue;
        const sp = document.createElement("span");
        if (t.t) sp.className = t.t;
        row.append(sp);
        for (let c = 1; c <= t.v.length; c++) {
          sp.textContent = t.v.slice(0, c);
          await sleep(delay);
        }
      }
    }
    body.insertAdjacentHTML("beforeend", '<span class="caret"></span>');
    body.scrollTop = body.scrollHeight;
    await sleep(1400);
  }
}
