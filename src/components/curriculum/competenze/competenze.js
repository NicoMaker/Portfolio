import { $, $$, ext, load } from "../../../shared/dom.js";
import { reveal } from "../../../shared/reveal.js";
import { card } from "../shared/card.js";

const az = (a, b) =>
  a.localeCompare(b, "it", { sensitivity: "base", numeric: true });

/** Competenze con filtro per categoria (competenze.json + categorie.json). */
export async function initCompetenze() {
  const box = $("#competenze .skills");
  let skills;
  try {
    skills = await load(new URL("./competenze.json", import.meta.url));
  } catch {
    box.innerHTML = "<p>Impossibile caricare i contenuti.</p>";
    return;
  }
  let cats = {};
  try {
    cats = (await load(new URL("./categorie.json", import.meta.url)))
      .skillCategories;
  } catch {}

  const categoryOf = (name) =>
    Object.keys(cats).find((c) =>
      cats[c].some((s) => s.toLowerCase() === name.toLowerCase()),
    ) || "Altro";

  const sorted = [...skills].sort((a, b) => az(a.nome, b.nome));
  const names = [
    "Tutte",
    ...[...new Set(sorted.map((s) => categoryOf(s.nome)))].sort(
      (a, b) => (a === "Altro") - (b === "Altro") || az(a, b),
    ),
  ];

  const draw = (c) => {
    box.innerHTML = sorted
      .filter((s) => c === "Tutte" || categoryOf(s.nome) === c)
      .map((s) =>
        card(
          `<img loading="lazy" src="${s.immagine}" alt="" onerror="this.remove()"><h3>${s.nome}</h3><span class="tag">${categoryOf(s.nome)}</span><p>${s.descrizione || ""}</p><div class="links">${ext(s.link, "Docs")}</div>`,
        ),
      )
      .join("");
    reveal(box);
  };

  const tabs = $("#tabs");
  tabs.innerHTML = names
    .map((n, i) => `<button class="${i ? "" : "on"}">${n}</button>`)
    .join("");
  tabs.onclick = (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    $$("#tabs button").forEach((x) => x.classList.toggle("on", x === b));
    draw(b.textContent);
  };
  draw("Tutte");
}
