import { jsonUrl } from "../../shared/utils/paths.js";

/* Configurazione dell'hero (frase "Sono un ...") */

export const HERO = {
  typedSelector: "#typed",
  phrasesJson: jsonUrl("components/hero/typing-phrases.json"),
  /** Frasi usate se typing-phrases.json non si carica */
  fallbackPhrases: [
    "Programmatore",
    "Risolutore di problemi",
    "Designer UI/UX",
    "Codice pulito",
  ],
  typeSpeed: 85,
  deleteSpeed: 40,
  /** Pausa (ms) a frase completa, prima di cancellarla */
  holdMs: 1600,
};
