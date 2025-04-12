document.addEventListener("DOMContentLoaded", () => {
  // Animate the sea waves
  animateSeaWaves();
});

function animateSeaWaves() {
  const waves = document.querySelectorAll(".wave");

  if (!waves.length) return;

  // Set different animation properties for each wave
  waves.forEach((wave, index) => {
    // Create random animation parameters for more natural movement
    const duration = 3 + Math.random() * 2; // 3-5 seconds
    const delay = index * 0.5; // Stagger the animations

    wave.style.animationDuration = `${duration}s`;
    wave.style.animationDelay = `${delay}s`;
  });

  // Add scroll parallax effect to the sea
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const seaBackground = document.querySelector(".sea-background");

    if (seaBackground) {
      // Move the sea background slightly based on scroll position
      seaBackground.style.transform = `translateY(${scrollY * 0.1}px)`;
    }
  });
}
