/**
 * Nicola Marano Portfolio - Sistema di traduzione automatica IT/EN
 * -----------------------------------------------------------------
 * - Al primo accesso rileva la lingua del dispositivo (navigator.language)
 *   e traduce l'intera pagina di conseguenza.
 * - Se l'utente sceglie una lingua, la preferenza viene salvata in
 *   localStorage e mantenuta su TUTTE le pagine del sito.
 * - La traduzione usa "Google Website Translator", pilotato in automatico:
 *   l'interfaccia di Google è nascosta e sostituita dal selettore IT/EN.
 *
 * Da includere in OGNI pagina .html con <script type="module">.
 * CSS: css/components/language-switcher/language-switcher.css
 *
 * Moduli (uno per funzione):
 *   i18n.config.js    costanti e liste
 *   i18n.storage.js   lettura/scrittura preferenza (localStorage)
 *   i18n.detect.js    rilevamento lingua del dispositivo
 *   i18n.cookie.js    cookie "googtrans"
 *   i18n.language.js  lingua attiva, cambio lingua, API globale
 *   i18n.google.js    caricamento del traduttore di Google
 *   i18n.switcher.js  selettore IT / EN
 *   i18n.protect.js   contenuti da non tradurre
 */
import { initLanguage, exposeApi } from "./i18n.language.js";
import { buildLanguageSwitcher } from "./i18n.switcher.js";
import {
  protectNonTranslatableContent,
  watchDynamicContent,
} from "./i18n.protect.js";
import { scheduleGoogleTranslate } from "./i18n.google.js";

/* Lingua e cookie subito, prima che lo script di Google venga caricato */
initLanguage();
exposeApi();

function init() {
  protectNonTranslatableContent();
  buildLanguageSwitcher();
  watchDynamicContent();
  scheduleGoogleTranslate();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
