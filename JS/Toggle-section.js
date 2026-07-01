// Le sezioni del curriculum sono schede (tab): un solo bottone alla volta è
// attivo e mostra il proprio contenuto, tutti gli altri sono nascosti.
// Questo file gestisce solo l'apertura della scheda giusta quando si arriva
// da un link con hash (es. index.html#istruzione).
document.addEventListener("DOMContentLoaded", () => {
  openSectionFromHash();
  window.addEventListener("hashchange", openSectionFromHash);
});

// Se l'URL contiene un hash che corrisponde a una parte del curriculum,
// apri quella scheda (le altre sezioni restano chiuse).
function openSectionFromHash() {
  const hash = window.location.hash;
  if (hash && hash.startsWith("#")) {
    const sectionId = hash.substring(1);
    const section = document.getElementById(sectionId);

    if (section && section.classList.contains("curr-block") && typeof activateCurrTab === "function") {
      setTimeout(() => {
        activateCurrTab(sectionId);
      }, 400);
    }
  }
}
