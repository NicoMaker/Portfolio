// hero-panel/03-dati-personali.js
// Unico blocco dati: profilo + contatti + cv + progetti.
window.HeroFiles = window.HeroFiles || [];

window.HeroFiles.push({
  name: "dati-personali.js",
  lines: [
    [
      { t: "tk-keyword", v: "const" },
      { t: "", v: " " },
      { t: "tk-key", v: "NicolaMarano" },
      { t: "tk-punct", v: " = {" },
    ],
    // ---- profilo (come in config.js) ----
    [
      { t: "", v: "  " },
      { t: "tk-key", v: "ruolo" },
      { t: "tk-punct", v: ": " },
      { t: "tk-string", v: "'Full Stack Developer'" },
      { t: "tk-punct", v: "," },
    ],
    [
      { t: "", v: "  " },
      { t: "tk-key", v: "sede" },
      { t: "tk-punct", v: ": " },
      { t: "tk-string", v: "'Italia'" },
      { t: "tk-punct", v: "," },
    ],
    [
      { t: "", v: "  " },
      { t: "tk-key", v: "stack" },
      { t: "tk-punct", v: ": [" },
      { t: "tk-string", v: "'JavaScript'" },
      { t: "tk-punct", v: ", " },
      { t: "tk-string", v: "'Node.js'" },
      { t: "tk-punct", v: ", " },
      { t: "tk-string", v: "'Express'" },
      { t: "tk-punct", v: ", " },
      { t: "tk-string", v: "'SQLite3'" },
      { t: "tk-punct", v: "]," },
    ],
    [
      { t: "", v: "  " },
      { t: "tk-key", v: "focus" },
      { t: "tk-punct", v: ": " },
      { t: "tk-string", v: "'UI/UX & clean code'" },
      { t: "tk-punct", v: "," },
    ],
    [
      { t: "", v: "  " },
      { t: "tk-key", v: "disponibile" },
      { t: "tk-punct", v: ": " },
      { t: "tk-bool", v: "true" },
      { t: "tk-punct", v: "," },
    ],
    // ---- contatti ----
    [
      { t: "", v: "  " },
      { t: "tk-key", v: "contatti" },
      { t: "tk-punct", v: ": {" },
    ],
    [
      { t: "", v: "    " },
      { t: "tk-key", v: "email" },
      { t: "tk-punct", v: ": " },
      { t: "tk-string", v: "'nicola.marano@email.com'" },
      { t: "tk-punct", v: "," },
    ],
    [
      { t: "", v: "    " },
      { t: "tk-key", v: "telefono" },
      { t: "tk-punct", v: ": " },
      { t: "tk-string", v: "'+39 333 702 4320'" },
      { t: "tk-punct", v: "," },
    ],
    [
      { t: "", v: "  " },
      { t: "tk-punct", v: "}," },
    ],
    // ---- cv ----
    [
      { t: "", v: "  " },
      { t: "tk-key", v: "cv" },
      { t: "tk-punct", v: ": " },
      { t: "tk-string", v: "'/CV/CV.pdf'" },
      { t: "tk-punct", v: "," },
    ],
    // ---- progetti ----
    [
      { t: "", v: "  " },
      { t: "tk-key", v: "progetti" },
      { t: "tk-punct", v: ": [" },
      { t: "tk-string", v: "'Gestione Fiscale'" },
      { t: "tk-punct", v: ", " },
      { t: "tk-string", v: "'Gestione Magazzino'" },
      { t: "tk-punct", v: ", " },
      { t: "tk-string", v: "'Gestione Preventivi'" },
      { t: "tk-punct", v: ", " },
      { t: "tk-string", v: "'Macelleria Da Ketti'" },
      { t: "tk-punct", v: ", " },
      { t: "tk-string", v: "'Da Prat Falegnameria'" },
      { t: "tk-punct", v: ", " },
      { t: "tk-string", v: "'IdeaLegno'" },
      { t: "tk-punct", v: "]," },
    ],
    [{ t: "tk-punct", v: "};" }],
  ],
});
