// Ogni parte del curriculum (Attestati, Istruzione, Competenze...) è ora
// una sezione reale e indipendente, sempre visibile. Questo file gestisce
// solo lo scorrimento fino alla sezione giusta quando si arriva da un
// link con hash (es. index.html#istruzione), tenendo conto dell'header
// fisso in alto.
document.addEventListener("DOMContentLoaded", () => {
  openSectionFromHash();
  window.addEventListener("hashchange", openSectionFromHash);
});

function openSectionFromHash() {
  const hash = window.location.hash;
  if (!hash || !hash.startsWith("#")) return;

  const sectionId = hash.substring(1);
  const section = document.getElementById(sectionId);

  if (
    section &&
    section.classList.contains("curriculum-part") &&
    typeof scrollToCurriculumPart === "function"
  ) {
    setTimeout(() => {
      scrollToCurriculumPart(sectionId);
    }, 400);
  }
}
