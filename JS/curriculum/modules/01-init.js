document.addEventListener("DOMContentLoaded", async () => {
  console.log("Curriculum.js: Initializing...");

  // Check if we're on mobile
  checkMobileState();

  // Add resize listener for responsive adjustments
  window.addEventListener("resize", handleResize);

  // Initialize the section structure first
  initializeSections();

  // Add mobile-specific styles
  if (STATE.isMobile) {
    applyMobileStyles();
  }

  // Show loading state
  showLoading(true);

  try {
    // Load categories data first
    await loadCategoriesData();

    // Then load curriculum data
    await loadCurriculumData();

    // Render all sections with the loaded data
    renderAllSections();

    // Add animation to cards
    animateCards();

    // Hide loading state
    showLoading(false);
  } catch (error) {
    console.error("Curriculum.js: Error during initialization:", error);
    showError(
      "Si è verificato un errore durante l'inizializzazione: " + error.message,
    );
  }
});
