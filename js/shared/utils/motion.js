/* Preferenze di movimento dell'utente */

/** True se l'utente ha chiesto di ridurre le animazioni (accessibilità). */
export const reducedMotion = () =>
  matchMedia("(prefers-reduced-motion:reduce)").matches;
