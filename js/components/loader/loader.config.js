/* Configurazione del loader (animazione terminale all'avvio) */

export const LOADER = {
  selectors: {
    loader: "#loader",
    terminal: "#terminalBody",
    logo: ".logo",
    heroReveal: ".hero .reveal",
  },
  /** Righe digitate nel terminale: [classeCss, testo] */
  bootParts: [
    ["k", "$ "],
    ["f", "npm run"],
    [0, " portfolio\n"],
    ["c", "// avvio...\n"],
    ["s", "✔ pronto"],
  ],
  typeSpeed: 14,
  /** Attesa massima (ms) del boot prima di nascondere il loader */
  hideTimeout: 1800,
  /** Attesa massima (ms) del boot quando si clicca sul logo */
  replayTimeout: 2500,
};
