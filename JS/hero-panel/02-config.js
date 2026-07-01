// hero-panel/01-config.js
// Un solo pezzo del "profilo": solo i dati base, niente funzioni qui.
window.HeroFiles = window.HeroFiles || [];

window.HeroFiles.push({
  name: "config.js",
  lines: [
    [
      { t: "tk-keyword", v: "const" },
      { t: "", v: " " },
      { t: "tk-key", v: "NicolaMarano" },
      { t: "tk-punct", v: " = {" },
    ],
    [
      { t: "", v: "  " },
      { t: "tk-key", v: "ruolo" },
      { t: "tk-punct", v: ": " },
      { t: "tk-string", v: "'Web Developer'" },
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
    [{ t: "tk-punct", v: "};" }],
  ],
});
