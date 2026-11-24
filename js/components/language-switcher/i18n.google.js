import {
  SUPPORTED_LANGS,
  SITE_SOURCE_LANG,
  GOOGLE_SCRIPT_URL,
  GOOGLE_LOAD_DELAY,
} from "./i18n.config.js";

/** Carica il motore "Google Website Translator" (nascosto, pilotato dal selettore IT/EN). */
function loadGoogleTranslateWidget() {
  if (window.__nicolamaranoGTLoaded) return;
  window.__nicolamaranoGTLoaded = true;

  const container = document.createElement("div");
  container.id = "google_translate_element";
  container.setAttribute("aria-hidden", "true");
  document.body.appendChild(container);

  window.googleTranslateElementInit = function () {
    /* eslint-disable no-undef */
    new google.translate.TranslateElement(
      {
        pageLanguage: SITE_SOURCE_LANG,
        includedLanguages: SUPPORTED_LANGS.join(","),
        autoDisplay: false,
      },
      "google_translate_element",
    );
    /* eslint-enable no-undef */
  };

  const script = document.createElement("script");
  script.src = GOOGLE_SCRIPT_URL;
  script.async = true;
  document.body.appendChild(script);
}

/**
 * Avvia il traduttore solo a pagina completamente caricata (più un piccolo
 * margine): molti contenuti arrivano in modo asincrono dai JSON/JS e Google
 * deve trovarli già in pagina per tradurli.
 */
export function scheduleGoogleTranslate() {
  const start = () => setTimeout(loadGoogleTranslateWidget, GOOGLE_LOAD_DELAY);
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start);
}
