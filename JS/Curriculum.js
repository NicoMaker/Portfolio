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

// Configuration
const CONFIG = {
  jsonPath: "JSON/Curriculum.json",
  categoriesJsonPath: "JSON/categories.json",
  fallbackJsonPath: "JSON/Curriculum.json",
  animationDuration: 500,
  animationDelay: 100,
  debugMode: true,
  mobileBreakpoint: 768,
  siteImageMaxHeight: 120,
  removeScrollableContainers: true,
};

// State management
const STATE = {
  curriculumData: null,
  categoriesData: null,
  expandedSections: {},
  categorizedSkills: null,
  isLoading: true,
  hasError: false,
  errorMessage: "",
  isMobile: window.innerWidth <= CONFIG.mobileBreakpoint,
};

// DOM Elements cache
const DOM = {};

/**
 * Check if we're on mobile and update state
 */
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
async function loadCategoriesData() {
  try {
    console.log(
      `Curriculum.js: Attempting to load categories from ${CONFIG.categoriesJsonPath}`,
    );
    const response = await fetch(CONFIG.categoriesJsonPath);

    if (!response.ok) {
      console.warn(
        `Curriculum.js: Failed to load categories from ${CONFIG.categoriesJsonPath}`,
      );
      STATE.categoriesData = {
        skillCategories: {
          Programmazione: [
            "C",
            "C#",
            "C++",
            "Python",
            "JavaScript",
            "HTML5",
            "CSS3",
            "React JS",
            "Node.js",
            "Vite",
          ],
          "DevOps & Tools": [
            "Git",
            "VS Code",
            "Docker",
            "PostgreSQL",
            "Linux",
            "Windows",
          ],
          "IoT & Protocolli": [
            "MQTT",
            "AMQP",
            "CoAP",
            "HTTP",
            "OPC-UA",
            "Raspberry Pi",
            "Node-RED",
          ],
          Visualizzazione: ["Mermaid", "Chart.js", "MathJax"],
        },
        defaultProjectTags: [
          "HTML",
          "CSS",
          "JavaScript",
          "Responsive",
          "Frontend",
          "UI/UX",
        ],
      };
    } else {
      STATE.categoriesData = await response.json();
      console.log("Curriculum.js: Categories data loaded successfully");
    }

    return STATE.categoriesData;
  } catch (error) {
    console.error("Curriculum.js: Error loading categories data:", error);
    STATE.categoriesData = {
      skillCategories: {
        Programmazione: [
          "C",
          "C#",
          "C++",
          "Python",
          "JavaScript",
          "HTML5",
          "CSS3",
          "React JS",
          "Node.js",
          "Vite",
        ],
        "DevOps & Tools": [
          "Git",
          "VS Code",
          "Docker",
          "PostgreSQL",
          "Linux",
          "Windows",
        ],
        "IoT & Protocolli": [
          "MQTT",
          "AMQP",
          "CoAP",
          "HTTP",
          "OPC-UA",
          "Raspberry Pi",
          "Node-RED",
        ],
        Visualizzazione: ["Mermaid", "Chart.js", "MathJax"],
      },
      defaultProjectTags: [
        "HTML",
        "CSS",
        "JavaScript",
        "Responsive",
        "Frontend",
        "UI/UX",
      ],
    };
  }
}

/**
 * Load curriculum data from JSON file.
 */
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
function getAttestatoEnte(attestato) {
  // Se esiste il campo "ente", usalo direttamente
  if (attestato?.ente && typeof attestato.ente === "string") {
    return attestato.ente.trim();
  }

  // Fallback: se manca "ente", prova a estrarlo dalla descrizione (come prima)
  const plainText = String(attestato?.descrizione || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const match = plainText.match(
    /Rilasciat[oa]\s+(?:da|dall['’‘ʼ]|dallo|dalla)\s*(.+?)\s+il\s+\d{1,2}\/\d{1,2}\/\d{2,4}/i
  );

  if (match && match[1]) {
    return match[1].trim();
  }

  return "Altro";
}

// ------------------------------------------------------------------------
//  RENDER ATTESTATI (con barra di ricerca sticky, layout originale)
// ------------------------------------------------------------------------
function renderAttestati(attestati) {
  if (!attestati || !Array.isArray(attestati) || !DOM.sections.attestati) {
    console.warn(
      "Curriculum.js: Invalid attestati data or container not found",
    );
    return;
  }

  DOM.sections.attestati.innerHTML = "";

  // Wrapper con barra di ricerca sticky
  const sectionWrapper = document.createElement("div");
  sectionWrapper.className = "section-search-wrapper";

  const searchBar = document.createElement("div");
  searchBar.className = "search-bar sticky-search";
  searchBar.innerHTML = `
    <div class="search-input-group">
      <i class='bx bx-search'></i>
      <input type="search" class="search-input" placeholder="Cerca attestato (titolo, ente, descrizione...)">
      <button class="search-reset-btn" type="button"><i class='bx bx-x'></i></button>
    </div>
    <br>
    <br>
  `;
  sectionWrapper.appendChild(searchBar);

  // Contenitore con la classe originale "attestati-list" (senza card-container)
  const cardsContainer = document.createElement("div");
  cardsContainer.className = "attestati-list";
  sectionWrapper.appendChild(cardsContainer);

  DOM.sections.attestati.appendChild(sectionWrapper);

  const searchInput = searchBar.querySelector(".search-input");
  const resetBtn = searchBar.querySelector(".search-reset-btn");

  function filterAttestati() {
    const query = searchInput.value.trim().toLowerCase();
    const cards = cardsContainer.querySelectorAll(".card");

    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? "" : "none";
    });

    // Messaggio "nessun risultato"
    const visibleCards = cardsContainer.querySelectorAll(
      ".card[style*='display: none']",
    );
    const noResultMsg = cardsContainer.querySelector(".no-results");
    if (visibleCards.length === cards.length && cards.length > 0) {
      if (!noResultMsg) {
        const msg = document.createElement("div");
        msg.className = "no-results";
        msg.innerHTML = `<i class='bx bx-info-circle'></i><p>Nessun attestato trovato per "${query}".</p>`;
        cardsContainer.appendChild(msg);
      }
    } else {
      if (noResultMsg) noResultMsg.remove();
    }
  }

  attestati.forEach((attestato, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-aos", "fade-up");
    card.setAttribute("data-aos-delay", (index * 100).toString());

    let html = `
      <div class="card-header">
        <div class="certificate-icon"><i class='bx bx-certification'></i></div>
        <h4>${attestato.titolo || "Titolo non disponibile"}</h4>
      </div>
      <div class="skill-category-badge">${getAttestatoEnte(attestato)}</div>
      <div class="card-body">
        <p>${attestato.descrizione || "Descrizione non disponibile"}</p>
      </div>
    `;
    if (attestato.certificato) {
      html += `
        <div class="card-footer">
          <a href="${attestato.certificato}" class="testo" download>
            <span>Scarica Certificato</span>
            <i class='bx bx-download'></i>
          </a>
        </div>
      `;
    }
    card.innerHTML = html;
    cardsContainer.appendChild(card);
  });

  searchInput.addEventListener("input", filterAttestati);
  resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    filterAttestati();
    searchInput.focus();
  });
}

/**
 * Create visual language level indicator.
 */
function createLevelIndicator(level) {
  const levels = {
    A1: 1,
    A2: 2,
    B1: 3,
    B2: 4,
    C1: 5,
    C2: 6,
    Madrelingua: 6,
  };

  const levelValue = levels[level] || 0;
  let indicators = "";

  for (let i = 1; i <= 6; i++) {
    const active = i <= levelValue ? "active" : "";
    indicators += `<div class="level-dot ${active}" data-level="${i}"></div>`;
  }

  return `
    <div class="level-dots">
      ${indicators}
    </div>
    <div class="level-labels">
      <span>A1</span>
      <span>A2</span>
      <span>B1</span>
      <span>B2</span>
      <span>C1</span>
      <span>C2</span>
    </div>
  `;
}

// ------------------------------------------------------------------------
//  RENDER LINGUISTICHE (senza barra di ricerca, layout originale)
// ------------------------------------------------------------------------
function renderLinguistiche(linguistiche) {
  if (
    !linguistiche ||
    !Array.isArray(linguistiche) ||
    !DOM.sections.linguistiche
  ) {
    console.warn(
      "Curriculum.js: Invalid linguistiche data or container not found",
    );
    return;
  }

  DOM.sections.linguistiche.innerHTML = "";

  // Solo il contenitore delle card, senza barra di ricerca
  const cardsContainer = document.createElement("div");
  cardsContainer.className = "linguistiche-list";
  DOM.sections.linguistiche.appendChild(cardsContainer);

  linguistiche.forEach((lingua, index) => {
    const card = document.createElement("div");
    card.className = "card language-card";
    card.setAttribute("data-aos", "zoom-in");
    card.setAttribute("data-aos-delay", (index * 100).toString());

    const levelIndicator = createLevelIndicator(lingua.livello);
    const imgSrc = lingua.immagine || "/placeholder.svg?height=100&width=100";

    card.innerHTML = `
      <br>
      <br>
      <div class="language-flag">
        <img src="${imgSrc}" alt="Bandiera ${lingua.lingua}" onerror="this.src='/placeholder.svg?height=100&width=100'; this.onerror=null;" />
      </div>
      <h4>${lingua.lingua || "Lingua non specificata"}</h4>
      <div class="language-level"><strong>Livello:</strong> ${lingua.livello || "Non specificato"}</div>
      <div class="level-indicator">${levelIndicator}</div>
      ${lingua.link ? `<button class="go-live-btn" onclick="window.open('${lingua.link}', '_blank')"><span>Impara la lingua</span><i class='bx bx-book-open'></i></button>` : ""}
    `;
    cardsContainer.appendChild(card);
  });
}

// ------------------------------------------------------------------------
//  RENDER ESPERIENZE (con barra di ricerca)
// ------------------------------------------------------------------------
function renderEsperienze(esperienze) {
  if (!esperienze || !Array.isArray(esperienze) || !DOM.sections.esperienze) {
    console.warn(
      "Curriculum.js: Invalid esperienze data or container not found",
    );
    return;
  }

  DOM.sections.esperienze.innerHTML = "";

  const sectionWrapper = document.createElement("div");
  sectionWrapper.className = "section-search-wrapper";

  const searchBar = document.createElement("div");
  searchBar.className = "search-bar sticky-search";
  searchBar.innerHTML = `
    <div class="search-input-group">
      <i class='bx bx-search'></i>
      <input type="search" class="search-input" placeholder="Cerca azienda, ruolo, luogo, attività...">
      <button class="search-reset-btn" type="button"><i class='bx bx-x'></i></button>
    </div>
  `;
  sectionWrapper.appendChild(searchBar);

  const cardsContainer = document.createElement("div");
  cardsContainer.className = "card-container experience-list";
  sectionWrapper.appendChild(cardsContainer);

  DOM.sections.esperienze.appendChild(sectionWrapper);

  const searchInput = searchBar.querySelector(".search-input");
  const resetBtn = searchBar.querySelector(".search-reset-btn");

  function filterEsperienze() {
    const query = searchInput.value.trim().toLowerCase();
    const cards = cardsContainer.querySelectorAll(".card");

    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? "" : "none";
    });

    const visibleCards = cardsContainer.querySelectorAll(
      ".card[style*='display: none']",
    );
    const noResultMsg = cardsContainer.querySelector(".no-results");
    if (visibleCards.length === cards.length && cards.length > 0) {
      if (!noResultMsg) {
        const msg = document.createElement("div");
        msg.className = "no-results";
        msg.innerHTML = `<i class='bx bx-info-circle'></i><p>Nessuna esperienza trovata per "${query}".</p>`;
        cardsContainer.appendChild(msg);
      }
    } else {
      if (noResultMsg) noResultMsg.remove();
    }
  }

  esperienze.forEach((esperienza, index) => {
    const card = document.createElement("div");
    card.className = "card experience-card";
    card.setAttribute("data-aos", index % 2 === 0 ? "fade-right" : "fade-left");
    card.setAttribute("data-aos-delay", (index * 150).toString());

    const attivitaList = Array.isArray(esperienza.attivita)
      ? esperienza.attivita
          .map((attivita) => `<li><i class='bx bx-check'></i> ${attivita}</li>`)
          .join("")
      : "<li><i class='bx bx-check'></i> Informazioni non disponibili</li>";

    const logoSrc = esperienza.logo || "/placeholder.svg?height=64&width=64";

    card.innerHTML = `
      <div class="experience-header">
        <div class="company-logo">
          <img class="azienda" src="${logoSrc}" alt="Logo ${esperienza.azienda}" onerror="this.src='/placeholder.svg?height=64&width=64'; this.onerror=null;" />
        </div>
        <div class="company-info">
          <h4>${esperienza.azienda || "Azienda non specificata"}</h4>
          <div class="role-badge">${esperienza.ruolo || "Ruolo non specificato"}</div>
        </div>
      </div>
      <div class="experience-period"><i class='bx bx-calendar'></i><span>${esperienza.periodo || "Periodo non specificato"}</span></div>
      <div class="experience-location"><i class='bx bx-map'></i><span>${esperienza.luogo || "Luogo non specificato"}</span></div>
      <div class="experience-activities"><h5>Attività svolte:</h5><ul class="activities-list">${attivitaList}</ul></div>
      ${esperienza.sito ? `<button class="go-live-btn" onclick="window.open('${esperienza.sito}', '_blank')"><span>Visita il sito</span><i class='bx bx-link-external'></i></button>` : ""}
    `;
    cardsContainer.appendChild(card);
  });

  searchInput.addEventListener("input", filterEsperienze);
  resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    filterEsperienze();
    searchInput.focus();
  });
}

// ------------------------------------------------------------------------
//  RENDER ISTRUZIONE (con barra di ricerca)
// ------------------------------------------------------------------------
function renderIstruzione(istruzione) {
  if (!istruzione || !Array.isArray(istruzione) || !DOM.sections.istruzione) {
    console.warn(
      "Curriculum.js: Invalid istruzione data or container not found",
    );
    return;
  }

  DOM.sections.istruzione.innerHTML = "";

  const sectionWrapper = document.createElement("div");
  sectionWrapper.className = "section-search-wrapper";

  const searchBar = document.createElement("div");
  searchBar.className = "search-bar sticky-search";
  searchBar.innerHTML = `
    <div class="search-input-group">
      <i class='bx bx-search'></i>
      <input type="search" class="search-input" placeholder="Cerca titolo, istituto, livello, luogo...">
      <button class="search-reset-btn" type="button"><i class='bx bx-x'></i></button>
    </div>
  `;
  sectionWrapper.appendChild(searchBar);

  const cardsContainer = document.createElement("div");
  cardsContainer.className = "card-container istruzione-list";
  sectionWrapper.appendChild(cardsContainer);

  DOM.sections.istruzione.appendChild(sectionWrapper);

  const searchInput = searchBar.querySelector(".search-input");
  const resetBtn = searchBar.querySelector(".search-reset-btn");

  function filterIstruzione() {
    const query = searchInput.value.trim().toLowerCase();
    const cards = cardsContainer.querySelectorAll(".card");

    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? "" : "none";
    });

    const visibleCards = cardsContainer.querySelectorAll(
      ".card[style*='display: none']",
    );
    const noResultMsg = cardsContainer.querySelector(".no-results");
    if (visibleCards.length === cards.length && cards.length > 0) {
      if (!noResultMsg) {
        const msg = document.createElement("div");
        msg.className = "no-results";
        msg.innerHTML = `<i class='bx bx-info-circle'></i><p>Nessuna esperienza formativa trovata per "${query}".</p>`;
        cardsContainer.appendChild(msg);
      }
    } else {
      if (noResultMsg) noResultMsg.remove();
    }
  }

  istruzione.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card istruzione-card";
    card.setAttribute("data-aos", "fade-up");
    card.setAttribute("data-aos-delay", (index * 100).toString());

    const logoSrc = item.logo || "/placeholder.svg?height=64&width=64";

    let competenzeHtml = "";
    if (Array.isArray(item.competenze)) {
      competenzeHtml = `<ul class="competenze">${item.competenze.map((comp) => `<li>${comp}</li>`).join("")}</ul>`;
    } else if (item.descrizione) {
      competenzeHtml = `<p class="descrizione">${item.descrizione}</p>`;
    }

    const downloadButton = item.diploma
      ? `<a href="${item.diploma}" class="go-live-btn" download><span>Scarica diploma</span><i class='bx bx-download'></i></a>`
      : "";
    const siteButton = item.sito
      ? `<button class="go-live-btn" onclick="window.open('${item.sito}', '_blank')"><span>Visita il sito</span><i class='bx bx-link-external'></i></button>`
      : "";

    card.innerHTML = `
      <div class="istruzione-header">
        <div class="istituto-logo"><img class="azienda" src="${logoSrc}" alt="Logo ${item.istituto}" onerror="this.src='/placeholder.svg?height=64&width=64'; this.onerror=null;" /></div>
        <div class="istituto-info">
          <h4>${item.titolo || "Titolo non specificato"}</h4>
          <div>${item.istituto || "Istituto non specificato"}</div>
          <div class="livello-eqf">${item.livello || ""}</div>
        </div>
      </div>
      <div class="istruzione-period"><i class='bx bx-calendar'></i><span>${item.periodo || "Periodo non specificato"}</span></div>
      <div class="istruzione-location"><i class='bx bx-map'></i><span>${item.luogo || "Luogo non specificato"}</span></div>
      ${competenzeHtml}
      <div class="istruzione-buttons">${siteButton}${downloadButton}</div>
    `;
    cardsContainer.appendChild(card);
  });

  searchInput.addEventListener("input", filterIstruzione);
  resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    filterIstruzione();
    searchInput.focus();
  });
}

/**
 * Resolve category label for a skill.
 */
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

  function filterCompetenze() {
    const query = searchInput.value.trim().toLowerCase();
    const cards = skillsContainer.querySelectorAll(".card");

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
function getSiteCategory(site) {
  return site && site.codice ? "Con Codice" : "Solo Live";
}

/**
 * Generate project tags.
 */
function generateProjectTags() {
  let defaultTags = [
    "HTML",
    "CSS",
    "JavaScript",
    "Responsive",
    "Frontend",
    "UI/UX",
  ];

  if (STATE.categoriesData && STATE.categoriesData.defaultProjectTags) {
    defaultTags = STATE.categoriesData.defaultProjectTags;
  }

  return defaultTags
    .map((tag) => `<span class="portfolio-tag">${tag}</span>`)
    .join("");
}

// ------------------------------------------------------------------------
//  RENDER SITI WEB (con barra di ricerca)
// ------------------------------------------------------------------------
function renderWebSite(sites) {
  if (!sites || !Array.isArray(sites) || !DOM.sections.sites) {
    console.warn("Curriculum.js: Invalid sites data or container not found");
    return;
  }

  DOM.sections.sites.innerHTML = "";
  DOM.sections.sites.className = "card-container sites-list";

  const sectionWrapper = document.createElement("div");
  sectionWrapper.className = "section-search-wrapper";

  const searchBar = document.createElement("div");
  searchBar.className = "search-bar sticky-search";
  searchBar.innerHTML = `
    <div class="search-input-group">
      <i class='bx bx-search'></i>
      <input type="search" class="search-input" placeholder="Cerca sito (nome, link, codice...)">
      <button class="search-reset-btn" type="button"><i class='bx bx-x'></i></button>
    </div>
  `;
  sectionWrapper.appendChild(searchBar);

  const cardsContainer = document.createElement("div");
  cardsContainer.className = "sites-list";
  sectionWrapper.appendChild(cardsContainer);

  DOM.sections.sites.appendChild(sectionWrapper);

  const searchInput = searchBar.querySelector(".search-input");
  const resetBtn = searchBar.querySelector(".search-reset-btn");

  function filterSites() {
    const query = searchInput.value.trim().toLowerCase();
    const cards = cardsContainer.querySelectorAll(".card");

    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? "" : "none";
    });

    const visibleCards = cardsContainer.querySelectorAll(
      ".card[style*='display: none']",
    );
    const noResultMsg = cardsContainer.querySelector(".no-results");
    if (visibleCards.length === cards.length && cards.length > 0) {
      if (!noResultMsg) {
        const msg = document.createElement("div");
        msg.className = "no-results";
        msg.innerHTML = `<i class='bx bx-info-circle'></i><p>Nessun sito trovato per "${query}".</p>`;
        cardsContainer.appendChild(msg);
      }
    } else {
      if (noResultMsg) noResultMsg.remove();
    }
  }

  sites.forEach((site, index) => {
    const card = document.createElement("div");
    card.className = "card portfolio-card";
    card.setAttribute("data-aos", "fade-up");
    card.setAttribute("data-aos-delay", (index * 100).toString());

    const imgSrc = site.immagine || "/placeholder.svg?height=200&width=300";
    const imageHeight = STATE.isMobile ? CONFIG.siteImageMaxHeight : 200;

    const html = `
      <div class="portfolio-image" style="height: ${imageHeight}px;">
        <img src="${imgSrc}" alt="${site.nome}" class="site-image" 
             style="max-height: ${imageHeight}px;" 
             onerror="this.src='/placeholder.svg?height=${imageHeight}&width=${imageHeight * 1.5}'; this.onerror=null;" />
        <div class="portfolio-overlay">
          <div class="portfolio-buttons">
            ${site.link ? `<a href="${site.link}" target="_blank" class="portfolio-btn view-btn"><i class='bx bx-link-external'></i><span class="white">Visita</span></a>` : ""}
            ${site.codice ? `<a href="${site.codice}" target="_blank" class="portfolio-btn code-btn"><i class='bx bx-code-alt'></i><span class="white">Codice</span></a>` : ""}
          </div>
        </div>
      </div>
      <div class="portfolio-info">
        <h4>${site.nome || "Progetto non specificato"}</h4>
        <div class="skill-category-badge">${getSiteCategory(site)}</div>
        <div class="portfolio-tags">${generateProjectTags()}</div>
      </div>
    `;
    card.innerHTML = html;
    cardsContainer.appendChild(card);
  });

  searchInput.addEventListener("input", filterSites);
  resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    filterSites();
    searchInput.focus();
  });
}

/**
 * Categorize skills directly from JSON data.
 */
function categorizeSkillsFromJson(competenze) {
  if (!competenze || !Array.isArray(competenze)) {
    return {};
  }

  const uniqueCategories = new Set();
  competenze.forEach((skill) => {
    if (skill.categoria) {
      uniqueCategories.add(skill.categoria);
    }
  });

  if (uniqueCategories.size === 0) {
    return categorizeSkillsByName(competenze);
  }

  const categorized = {};

  uniqueCategories.forEach((category) => {
    categorized[category] = competenze.filter(
      (skill) => skill.categoria === category,
    );
  });

  const categorizedSkillIds = Object.values(categorized)
    .flat()
    .map((skill) => skill.nome);

  const uncategorizedSkills = competenze.filter(
    (skill) => !skill.categoria && !categorizedSkillIds.includes(skill.nome),
  );

  if (uncategorizedSkills.length > 0) {
    const remainingCategorized = categorizeSkillsByName(uncategorizedSkills);
    Object.keys(remainingCategorized).forEach((category) => {
      if (categorized[category]) {
        categorized[category] = [
          ...categorized[category],
          ...remainingCategorized[category],
        ];
      } else {
        categorized[category] = remainingCategorized[category];
      }
    });
  }

  return categorized;
}

/**
 * Fallback categorization by skill name.
 */
function categorizeSkillsByName(competenze) {
  let categories = {};

  if (STATE.categoriesData && STATE.categoriesData.skillCategories) {
    categories = STATE.categoriesData.skillCategories;
  } else {
    categories = {
      Programmazione: [
        "C",
        "C#",
        "C++",
        "Python",
        "JavaScript",
        "HTML5",
        "CSS3",
        "React JS",
        "Node.js",
        "Vite",
      ],
      "DevOps & Tools": [
        "Git",
        "VS Code",
        "Docker",
        "PostgreSQL",
        "Linux",
        "Windows",
      ],
      "IoT & Protocolli": [
        "MQTT",
        "AMQP",
        "CoAP",
        "HTTP",
        "OPC-UA",
        "Raspberry Pi",
        "Node-RED",
      ],
      Visualizzazione: ["Mermaid", "Chart.js", "MathJax"],
    };
  }

  const categorized = {};

  Object.keys(categories).forEach((category) => {
    categorized[category] = competenze.filter((skill) =>
      categories[category].includes(skill.nome),
    );
  });

  const categorizedSkillNames = Object.values(categorized)
    .flat()
    .map((skill) => skill.nome);

  const otherSkills = competenze.filter(
    (skill) => !categorizedSkillNames.includes(skill.nome),
  );

  if (otherSkills.length > 0) {
    categorized["Altro"] = otherSkills;
  }

  return categorized;
}

/**
 * Generate fallback data in case of loading failure.
 */
function generateFallbackData() {
  console.log("Curriculum.js: Generating fallback data");
  return {
    attestati: [
      {
        titolo: "Esempio Attestato",
        descrizione: "Questo è un esempio di attestato generato come fallback.",
        certificato: "",
      },
    ],
    linguistiche: [
      {
        lingua: "Inglese",
        livello: "B1",
        immagine: "/placeholder.svg?height=100&width=100",
        link: "#",
      },
    ],
    esperienze: [
      {
        azienda: "Azienda Esempio",
        ruolo: "Sviluppatore",
        periodo: "2023 - Presente",
        luogo: "Italia",
        attivita: ["Sviluppo web", "Programmazione"],
        logo: "/placeholder.svg?height=64&width=64",
        sito: "#",
      },
    ],
    istruzione: [
      {
        titolo: "Laurea in Informatica",
        istituto: "Università",
        periodo: "2020 - 2023",
        luogo: "Italia",
        logo: "/placeholder.svg?height=64&width=64",
        sito: "#",
      },
    ],
    competenze: [
      {
        nome: "HTML",
        descrizione: "Competenze in HTML",
        immagine: "/placeholder.svg?height=64&width=64",
        link: "#",
        categoria: "Frontend",
      },
      {
        nome: "CSS",
        descrizione: "Competenze in CSS",
        immagine: "/placeholder.svg?height=64&width=64",
        link: "#",
        categoria: "Frontend",
      },
      {
        nome: "JavaScript",
        descrizione: "Competenze in JavaScript",
        immagine: "/placeholder.svg?height=64&width=64",
        link: "#",
        categoria: "Frontend",
      },
    ],
    sites: [
      {
        nome: "Portfolio",
        immagine: "/placeholder.svg?height=200&width=300",
        link: "#",
        codice: "#",
      },
    ],
  };
}