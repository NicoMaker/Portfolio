// hero-panel/02-contatti.js
// Funzionalità isolata: solo il contatto rapido.
window.HeroFiles = window.HeroFiles || [];

window.HeroFiles.push({
  name: "contatti.js",
  lines: [
    [
      { t: "tk-comment", v: "// contatti rapidi" },
    ],
    [
      { t: "tk-keyword", v: "function" },
      { t: "", v: " " },
      { t: "tk-func", v: "contattami" },
      { t: "tk-punct", v: "() {" },
    ],
    [
      { t: "", v: "  " },
      { t: "tk-keyword", v: "return" },
      { t: "", v: " {" },
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
    [{ t: "", v: "  " }, { t: "tk-punct", v: "};" }],
    [{ t: "tk-punct", v: "}" }],
  ],
});
