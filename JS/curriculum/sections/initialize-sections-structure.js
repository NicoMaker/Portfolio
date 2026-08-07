function initializeSections() {
  const parts = [
    { id: "attestati", icon: "bx-medal", label: "Attestati" },
    { id: "linguistiche", icon: "bx-globe", label: "Competenze Linguistiche" },
    { id: "esperienze", icon: "bx-briefcase", label: "Esperienze Lavorative" },
    { id: "istruzione", icon: "bx-book", label: "Istruzione" },
    { id: "competenze", icon: "bx-code-block", label: "Competenze" },
    { id: "sites", icon: "bx-laptop", label: "Siti Web" },
  ];

  STATE.currTabs = parts;

  const quickNav = document.getElementById("curriculumQuickNav");
  if (quickNav) {
    quickNav.innerHTML = parts
      .map(
        (part) =>
          `<button type="button" class="curr-nav-pill" data-target="${part.id}">
            <i class='bx ${part.icon}'></i><span>${part.label}</span>
          </button>`,
      )
      .join("");

    quickNav.querySelectorAll(".curr-nav-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        scrollToCurriculumPart(pill.dataset.target);
      });
    });
  }

  DOM.sections = {};
  parts.forEach((part) => {
    DOM.sections[part.id] = document.querySelector(
      `#${part.id} .card-container`,
    );
  });

  setupQuickNavScrollSpy(parts);
}

/**
 * Smooth scroll to a curriculum section.
 */
function scrollToCurriculumPart(targetId) {
  const section = document.getElementById(targetId);
  if (!section) return;

  const header = document.querySelector("header");
  const headerOffset = header ? header.offsetHeight + 16 : 16;
  const targetY =
    section.getBoundingClientRect().top + window.scrollY - headerOffset;

  window.scrollTo({ top: targetY, behavior: "smooth" });
}

/**
 * Scroll spy for quick navigation pills.
 */
function setupQuickNavScrollSpy(parts) {
  const pills = document.querySelectorAll(".curr-nav-pill");
  if (!pills.length) return;

  const updateActivePill = () => {
    let currentId = null;

    parts.forEach((part) => {
      const section = document.getElementById(part.id);
      if (!section) return;
      const top = section.getBoundingClientRect().top;
      if (top <= window.innerHeight / 3) {
        currentId = part.id;
      }
    });

    pills.forEach((pill) => {
      pill.classList.toggle("active", pill.dataset.target === currentId);
    });
  };

  window.addEventListener("scroll", updateActivePill, { passive: true });
  updateActivePill();
}

/**
 * Animate cards in a section.
 */
