function renderAllSections() {
  if (!STATE.curriculumData) {
    console.error("Curriculum.js: No data available to render");
    return;
  }

  console.log("Curriculum.js: Rendering all sections");

  renderAttestati(STATE.curriculumData.attestati);
  renderLinguistiche(STATE.curriculumData.linguistiche);
  renderEsperienze(STATE.curriculumData.esperienze);
  renderIstruzione(STATE.curriculumData.istruzione);
  renderCompetenze(STATE.curriculumData.competenze);
  renderWebSite(STATE.curriculumData.sites);

  document
    .querySelectorAll(".curriculum-part .card-container")
    .forEach((container) => {
      animateCardsInSection(container);
    });

  setTimeout(() => {
    initializeSkillAnimations();
  }, 300);
}

/**
 * Extract the issuing entity from an attestato description.
 */
