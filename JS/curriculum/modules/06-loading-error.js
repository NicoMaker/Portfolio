function showLoading(isLoading) {
  STATE.isLoading = isLoading;
  if (isLoading) {
    console.log("Curriculum.js: Loading...");
  } else {
    console.log("Curriculum.js: Loading complete");
  }
}

/**
 * Show error message.
 */
function showError(message) {
  STATE.hasError = true;
  STATE.errorMessage = message;

  const curriculumSection = document.getElementById("curriculum");
  if (!curriculumSection) return;

  const container = curriculumSection.querySelector(".container");
  if (!container) return;

  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.innerHTML = `
    <i class='bx bx-error-circle'></i>
    <p>${message}</p>
    <button onclick="location.reload()" class="reload-btn">
      <i class='bx bx-refresh'></i> Ricarica
    </button>
  `;

  container.appendChild(errorDiv);
}

/**
 * Load categories data from JSON file.
 */
