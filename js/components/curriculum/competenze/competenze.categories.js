import { COMPETENZE } from "./competenze.config.js";

const { allLabel, otherLabel } = COMPETENZE;

/** Ordine alfabetico italiano (ignora maiuscole/accenti, numeri naturali). */
const az = (a, b) =>
  a.localeCompare(b, "it", { sensitivity: "base", numeric: true });

/** Categoria di una competenza; "Altro" se non è in nessuna lista. */
export const categoryOf = (cats, name) =>
  Object.keys(cats).find((c) =>
    cats[c].some((s) => s.toLowerCase() === name.toLowerCase()),
  ) || otherLabel;

/** Competenze in ordine alfabetico (copia, l'originale non cambia). */
export const sortSkills = (skills) =>
  [...skills].sort((a, b) => az(a.nome, b.nome));

/** Nomi dei filtri: "Tutte" + categorie in ordine, con "Altro" sempre in fondo. */
export const buildTabNames = (sorted, cats) => [
  allLabel,
  ...[...new Set(sorted.map((s) => categoryOf(cats, s.nome)))].sort(
    (a, b) => (a === otherLabel) - (b === otherLabel) || az(a, b),
  ),
];
