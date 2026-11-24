/** Rende innocui i "<" nel codice mostrato. */
const esc = (s) => s.replace(/</g, "&lt;");

/** Mostra un file già completo, senza animazione (per chi riduce il movimento). */
export function renderStatic(body, nameEl, file) {
  nameEl.textContent = file.name;
  body.innerHTML = file.lines
    .map(
      (line) =>
        "<div>" +
        line.map((t) => `<span class="${t.t}">${esc(t.v)}</span>`).join("") +
        "</div>",
    )
    .join("");
}
