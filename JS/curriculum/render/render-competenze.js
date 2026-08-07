function getSkillCategoryLabel(skill) {
  if (!STATE.categorizedSkills) return "Altro";

  const skillName = (skill?.nome || "").trim();
  if (!skillName) return "Altro";

  const foundCategory = Object.keys(STATE.categorizedSkills).find((category) =>
    (STATE.categorizedSkills[category] || []).some(
      (item) => (item.nome || "").trim() === skillName,
    ),
  );

  return foundCategory || "Altro";
}

// ------------------------------------------------------------------------
//  RENDER COMPETENZE (con barra di ricerca)
// ------------------------------------------------------------------------
function renderCompetenze(competenze) {
  if (!competenze || !Array.isArray(competenze) || !DOM.sections.competenze) {
    console.warn(
      "Curriculum.js: Invalid competenze data or container not found",
    );
    return;
  }

  DOM.sections.competenze.innerHTML = "";

  const sectionWrapper = document.createElement("div");
  sectionWrapper.className = "section-search-wrapper";

  const searchBar = document.createElement("div");
  searchBar.className = "search-bar sticky-search";
  searchBar.innerHTML = `
    <div class="search-input-group">
      <i class='bx bx-search'></i>
      <input type="search" class="search-input" placeholder="Cerca competenza (nome, categoria, descrizione...)">
      <button class="search-reset-btn" type="button"><i class='bx bx-x'></i></button>
    </div>
  `;
  sectionWrapper.appendChild(searchBar);

  const skillsContainer = document.createElement("div");
  skillsContainer.className = "card-container skills-container";
  sectionWrapper.appendChild(skillsContainer);

  DOM.sections.competenze.appendChild(sectionWrapper);

  const searchInput = searchBar.querySelector(".search-input");
  const resetBtn = searchBar.querySelector(".search-reset-btn");

  let competenzeSearchStarted = false;

  function filterCompetenze() {
    const query = searchInput.value.trim().toLowerCase();
    const cards = skillsContainer.querySelectorAll(".card");

    // Al primo carattere digitato, torna all'inizio della categoria
    if (query && !competenzeSearchStarted) {
      competenzeSearchStarted = true;
      scrollToCurriculumPart("competenze");
    } else if (!query) {
      competenzeSearchStarted = false;
    }

    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? "" : "none";
    });

    const visibleCards = skillsContainer.querySelectorAll(
      ".card[style*='display: none']",
    );
    const noResultMsg = skillsContainer.querySelector(".no-results");
    if (visibleCards.length === cards.length && cards.length > 0) {
      if (!noResultMsg) {
        const msg = document.createElement("div");
        msg.className = "no-results";
        msg.innerHTML = `<i class='bx bx-info-circle'></i><p>Nessuna competenza trovata per "${query}".</p>`;
        skillsContainer.appendChild(msg);
      }
    } else {
      if (noResultMsg) noResultMsg.remove();
    }
  }

  // Ordina alfabeticamente
  const sorted = [...competenze].sort((a, b) =>
    (a.nome || "").localeCompare(b.nome || "", "it"),
  );

  sorted.forEach((skill, index) => {
    const card = document.createElement("div");
    card.className = "card skill-card";
    card.setAttribute("data-aos", "zoom-in");
    card.setAttribute("data-aos-delay", (index * 50).toString());

    const hue = Math.floor(Math.random() * 360);
    const progressColor = `hsl(${hue}, 70%, 60%)`;
    const imgSrc = skill.immagine || "/placeholder.svg?height=80&width=80";

    card.innerHTML = `
      <br>
      <br>
      <div class="skill-icon" style="background-color: ${progressColor}20;">
        <img src="${imgSrc}" alt="${skill.nome}" onerror="this.src='/placeholder.svg?height=80&width=80'; this.onerror=null;" />
      </div>
      <h4>${skill.nome || "Competenza non specificata"}</h4>
      <div class="skill-category-badge">${getSkillCategoryLabel(skill)}</div>
      <div class="skill-progress">
        <div class="progress-bar" data-progress="85" style="--progress-color: ${progressColor};">
          <div class="progress-fill"></div>
        </div>
      </div>
      <p>${skill.descrizione || "Descrizione non disponibile"}</p>
      ${skill.link ? `<button class="go-live-btn" onclick="window.open('${skill.link}', '_blank')"><span>Scopri di più</span><i class='bx bx-link-external'></i></button>` : ""}
    `;
    skillsContainer.appendChild(card);
  });

  // Inizializza le barre di progresso dopo il rendering
  setTimeout(() => initializeSkillAnimations(), 300);

  searchInput.addEventListener("input", filterCompetenze);
  resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    filterCompetenze();
    searchInput.focus();
  });
}

/**
 * Determine site category (with code or live only).
 */
