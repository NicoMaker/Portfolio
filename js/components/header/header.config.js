/* Configurazione dell'header (menu mobile + scrollspy) */

export const HEADER = {
  selectors: {
    links: "nav a",
    nav: "#menu",
    hamburger: "#hamburger",
    sections: "main section",
  },
  /** Fascia centrale dello schermo in cui una sezione risulta "attiva" */
  spyMargin: "-45% 0px -50% 0px",
  icons: { open: "bx bx-x", closed: "bx bx-menu" },
};
