import { sleep } from "../../../shared/utils/timing.js";
import { CODE_PANEL } from "./hero-code-panel.config.js";

/** Scrive una riga di codice carattere per carattere. */
async function typeLine(body, line, delay) {
  const row = document.createElement("div");
  body.append(row);
  body.scrollTop = body.scrollHeight;

  for (const token of line) {
    if (!token.v) continue;
    const span = document.createElement("span");
    if (token.t) span.className = token.t;
    row.append(span);
    for (let c = 1; c <= token.v.length; c++) {
      span.textContent = token.v.slice(0, c);
      await sleep(delay);
    }
  }
}

/** Scrive un intero file nel pannello, poi aggiunge il cursore e aspetta. */
async function typeFile({ body, nameEl, panel }, file, delay) {
  body.innerHTML = "";
  nameEl.textContent = file.name;
  panel.classList.toggle("compact", file.lines.length > CODE_PANEL.compactAfterLines);

  for (const line of file.lines) await typeLine(body, line, delay);

  body.insertAdjacentHTML("beforeend", '<span class="caret"></span>');
  body.scrollTop = body.scrollHeight;
  await sleep(CODE_PANEL.endPause);
}

/** Cicla all'infinito i file del pannello, uno dopo l'altro. */
export async function loopFiles(els, files, delay) {
  for (let i = 0; ; i = (i + 1) % files.length) {
    await typeFile(els, files[i], delay);
  }
}
