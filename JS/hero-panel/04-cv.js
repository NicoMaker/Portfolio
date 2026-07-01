// hero-panel/03-cv.js
// Funzionalità isolata: solo il download del CV.
window.HeroFiles = window.HeroFiles || [];

window.HeroFiles.push({
  name: "cv.js",
  lines: [
    [{ t: "tk-comment", v: "// scarica il CV in pdf" }],
    [
      { t: "tk-keyword", v: "function" },
      { t: "", v: " " },
      { t: "tk-func", v: "scaricaCV" },
      { t: "tk-punct", v: "() {" },
    ],
    [
      { t: "", v: "  " },
      { t: "tk-keyword", v: "return" },
      { t: "", v: " " },
      { t: "tk-string", v: "'/CV/CV.pdf'" },
      { t: "tk-punct", v: ";" },
    ],
    [{ t: "tk-punct", v: "}" }],
  ],
});
