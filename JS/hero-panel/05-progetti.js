// hero-panel/04-progetti.js
// Funzionalità isolata: solo la lista progetti.
window.HeroFiles = window.HeroFiles || [];

window.HeroFiles.push({
  name: "progetti.js",
  lines: [
    [{ t: "tk-comment", v: "// ultimi progetti pubblicati" }],
    [
      { t: "tk-keyword", v: "function" },
      { t: "", v: " " },
      { t: "tk-func", v: "progettiRecenti" },
      { t: "tk-punct", v: "() {" },
    ],
    [
      { t: "", v: "  " },
      { t: "tk-keyword", v: "return" },
      { t: "", v: " [" },
      { t: "tk-string", v: "'Gestione Fiscale'" },
      { t: "tk-punct", v: ", " },
      { t: "tk-string", v: "'Gestione Magazzino'" },
      { t: "tk-punct", v: ", " },
      { t: "tk-string", v: "'Gestione Preventivi'" },
      { t: "tk-punct", v: ", " },
      { t: "tk-string", v: "'Macelleria Da Ketti'" },
      { t: "tk-punct", v: ", " },
      { t: "tk-string", v: "'IdeaLegno'" },
      { t: "tk-punct", v: "];" },
    ],
    [{ t: "tk-punct", v: "}" }],
  ],
});
