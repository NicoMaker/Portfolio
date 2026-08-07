function checkMobileState() {
  STATE.isMobile = window.innerWidth <= CONFIG.mobileBreakpoint;
  console.log(
    `Curriculum.js: Device detected as ${STATE.isMobile ? "mobile" : "desktop"}`,
  );
}

/**
 * Handle window resize events
 */
function handleResize() {
  const wasMobile = STATE.isMobile;
  checkMobileState();

  if (wasMobile !== STATE.isMobile) {
    if (STATE.isMobile) {
      applyMobileStyles();
    } else {
      removeMobileStyles();
    }

    // Re-render sections that need responsive adjustments
    if (STATE.curriculumData) {
      renderWebSite(STATE.curriculumData.sites);
      if (STATE.curriculumData.competenze) {
        renderCompetenze(STATE.curriculumData.competenze);
      }
      if (STATE.curriculumData.esperienze) {
        renderEsperienze(STATE.curriculumData.esperienze);
      }
    }
  }
}

/**
 * Apply mobile-specific styles
 */
function applyMobileStyles() {
  document
    .querySelectorAll(".curriculum-part .section-title")
    .forEach((sectionTitle) => {
      sectionTitle.style.textAlign = "center";
      sectionTitle.style.width = "100%";
      sectionTitle.style.left = "auto";
      sectionTitle.style.transform = "none";
    });

  if (CONFIG.removeScrollableContainers) {
    document.querySelectorAll(".card-container").forEach((container) => {
      container.style.maxHeight = "none";
      container.style.overflowY = "visible";
    });
  }
}

/**
 * Remove mobile-specific styles
 */
function removeMobileStyles() {
  document
    .querySelectorAll(".curriculum-part .section-title")
    .forEach((sectionTitle) => {
      sectionTitle.style.textAlign = "";
      sectionTitle.style.width = "";
      sectionTitle.style.left = "";
      sectionTitle.style.transform = "";
    });

  if (CONFIG.removeScrollableContainers) {
    document.querySelectorAll(".card-container").forEach((container) => {
      container.style.maxHeight = "";
      container.style.overflowY = "";
    });
  }
}

/**
 * Initialize the section structure in the DOM.
 */
