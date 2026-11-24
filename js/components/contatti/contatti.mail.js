import { CONTATTI } from "./contatti.config.js";

/** Testo della mail costruito con i dati del form. */
export const buildMailBody = (d) =>
  `Nome: ${d.name} ${d.cognome}\nEmail: ${d.email}\nTelefono: ${d.telefono}\n\n${d.message}`;

/** Apre il client di posta con destinatario, oggetto e testo già compilati. */
export function openMailClient(d) {
  location.href =
    `mailto:${CONTATTI.email}` +
    `?subject=${encodeURIComponent(d.oggetto)}` +
    `&body=${encodeURIComponent(buildMailBody(d))}`;
}
