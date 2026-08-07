function animateCardsInSection(container) {
  if (!container) return;

  const cards = container.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";

    setTimeout(
      () => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      },
      100 + index * 50,
    );
  });
}

/**
 * Animate all cards.
 */
function animateCards() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.style.setProperty("--i", (index % 5) + 1);
    card.classList.add("animated");
  });
}

/**
 * Initialize skill progress bar animations.
 */
function initializeSkillAnimations() {
  const progressBars = document.querySelectorAll(".progress-bar");
  if (!progressBars || progressBars.length === 0) {
    console.log("Curriculum.js: No progress bars found to animate");
    return;
  }

  console.log(
    `Curriculum.js: Initializing animations for ${progressBars.length} progress bars`,
  );

  progressBars.forEach((bar) => {
    const progress = bar.getAttribute("data-progress") || "75";
    const fill = bar.querySelector(".progress-fill");

    if (fill) {
      fill.style.width = "0%";
      setTimeout(() => {
        fill.style.width = `${progress}%`;
      }, 100);
    }
  });
}

/**
 * Show loading state.
 */
