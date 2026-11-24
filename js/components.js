/* Registro dei componenti: main.js sa SOLO in che ordine avviarli */

import { initLogoReplay } from "./components/loader/loader.js";
import { initHeader } from "./components/header/header.js";
import { initScrollProgress } from "./components/scroll-progress/scroll-progress.js";
import { initBackToTop } from "./components/back-to-top/back-to-top.js";
import { initFooter } from "./components/footer/footer.js";
import { initHero } from "./components/hero/hero.js";
import { initCurriculum } from "./components/curriculum/curriculum.js";
import { initSocial } from "./components/social/social.js";
import { initContatti } from "./components/contatti/contatti.js";

/** Componenti che lavorano solo sul DOM già presente (immediati). */
export function initUiComponents() {
  initHeader();
  initScrollProgress();
  initBackToTop();
  initFooter();
  initLogoReplay();
}

/** Componenti che caricano i propri dati dai JSON. */
export const initDataComponents = () =>
  Promise.allSettled([initHero(), initCurriculum(), initSocial()]);

/** Componenti con form e interazione dell'utente. */
export const initFormComponents = () => initContatti();
