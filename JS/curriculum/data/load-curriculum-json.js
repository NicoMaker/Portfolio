async function loadCurriculumData() {
  try {
    console.log(
      `Curriculum.js: Attempting to load data from ${CONFIG.jsonPath}`,
    );
    const response = await fetch(CONFIG.jsonPath);

    if (!response.ok) {
      console.warn(
        `Curriculum.js: Failed to load from ${CONFIG.jsonPath}, trying fallback...`,
      );
      const fallbackResponse = await fetch(CONFIG.fallbackJsonPath);

      if (!fallbackResponse.ok) {
        throw new Error(
          `Failed to load data: ${response.status} ${response.statusText}`,
        );
      }

      STATE.curriculumData = await fallbackResponse.json();
      console.log("Curriculum.js: Data loaded from fallback path successfully");
    } else {
      STATE.curriculumData = await response.json();
      console.log("Curriculum.js: Data loaded successfully");
    }

    if (STATE.curriculumData.competenze) {
      STATE.categorizedSkills = categorizeSkillsFromJson(
        STATE.curriculumData.competenze,
      );
    }

    return STATE.curriculumData;
  } catch (error) {
    console.error("Curriculum.js: Error loading data:", error);
    STATE.hasError = true;
    STATE.errorMessage = error.message;

    STATE.curriculumData = generateFallbackData();
    STATE.categorizedSkills = categorizeSkillsFromJson(
      STATE.curriculumData.competenze,
    );

    throw error;
  }
}

/**
 * Render all sections with the loaded data.
 */
