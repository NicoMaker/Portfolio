// hero-panel/01-avvio-db.js
// Primo pezzo del ciclo: cosa succede all'avvio, la connessione al db.
window.HeroFiles = window.HeroFiles || [];

window.HeroFiles.push({
  name: "avvio-db.js",
  lines: [
    [
      { t: "tk-comment", v: "// avvio server: connessione al database" },
    ],
    [
      { t: "tk-keyword", v: "const" },
      { t: "", v: " " },
      { t: "tk-key", v: "sqlite3" },
      { t: "", v: " = " },
      { t: "tk-key", v: "require" },
      { t: "tk-punct", v: "(" },
      { t: "tk-string", v: "'sqlite3'" },
      { t: "tk-punct", v: ").verbose();" },
    ],
    [{ t: "", v: "" }],
    [
      { t: "tk-keyword", v: "const" },
      { t: "", v: " " },
      { t: "tk-key", v: "db" },
      { t: "", v: " = " },
      { t: "tk-keyword", v: "new" },
      { t: "", v: " " },
      { t: "tk-func", v: "sqlite3.Database" },
      { t: "tk-punct", v: "(" },
      { t: "tk-string", v: "'magazzino.db'" },
      { t: "tk-punct", v: ", (" },
      { t: "tk-key", v: "err" },
      { t: "tk-punct", v: ") => {" },
    ],
    [
      { t: "", v: "  " },
      { t: "tk-keyword", v: "if" },
      { t: "tk-punct", v: " (" },
      { t: "tk-key", v: "err" },
      { t: "tk-punct", v: ")" },
      { t: "", v: " " },
      { t: "tk-key", v: "console" },
      { t: "tk-punct", v: "." },
      { t: "tk-func", v: "error" },
      { t: "tk-punct", v: "(" },
      { t: "tk-string", v: "'Connessione fallita'" },
      { t: "tk-punct", v: ", " },
      { t: "tk-key", v: "err" },
      { t: "tk-punct", v: ".message);" },
    ],
    [
      { t: "", v: "  " },
      { t: "tk-key", v: "console" },
      { t: "tk-punct", v: "." },
      { t: "tk-func", v: "log" },
      { t: "tk-punct", v: "(" },
      { t: "tk-string", v: "'Connesso al database SQLite'" },
      { t: "tk-punct", v: ");" },
    ],
    [{ t: "tk-punct", v: "});" }],
  ],
});
