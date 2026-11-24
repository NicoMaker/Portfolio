/** HTML di un singolo link social; i link http si aprono in una nuova scheda. */
export const socialTemplate = (s) =>
  `<a href="${s.url}" title="${s.title}" aria-label="${s.name}" ${
    s.url.startsWith("http") ? 'target="_blank" rel="noopener"' : ""
  }><img loading="lazy" src="${s.icon}" alt="${s.alt}"></a>`;
