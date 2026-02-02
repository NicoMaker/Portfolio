document.addEventListener("DOMContentLoaded", async () => {
  console.log("Curriculum.js: Initializing...")

  // Check if we're on mobile
  checkMobileState()

  // Add resize listener for responsive adjustments
  window.addEventListener("resize", handleResize)

  // Initialize the section structure first
  initializeSections()

  // Add mobile-specific styles
  if (STATE.isMobile) {
    applyMobileStyles()
  }

  // Show loading state
  showLoading(true)

  try {
    // Load categories data first
    await loadCategoriesData()

    // Then load curriculum data
    await loadCurriculumData()

    // Render all sections with the loaded data
    renderAllSections()

    // Open the default section
    setTimeout(() => {
      const sections = document.querySelectorAll("#curriculum .section h3")
      if (sections.length > CONFIG.defaultOpenSection) {
        sections[CONFIG.defaultOpenSection].click()
      }
    }, 300)

    // Add animation to cards
    animateCards()

    // Hide loading state
    showLoading(false)
  } catch (error) {
    console.error("Curriculum.js: Error during initialization:", error)
    showError("Si è verificato un errore durante l'inizializzazione: " + error.message)
  }
})

// Configuration
const CONFIG = {
  jsonPath: "JSON/Curriculum.json",
  categoriesJsonPath: "JSON/categories.json",
  fallbackJsonPath: "JSON/Curriculum.json", // Fallback in case of typo in filename
  animationDuration: 500,
  animationDelay: 100,
  defaultOpenSection: 2, // Index of section to open by default (2 = Esperienze Lavorative)
  debugMode: true,
  // Mobile configuration
  mobileBreakpoint: 768,
  siteImageMaxHeight: 120, // Smaller site images for better visibility
  removeScrollableContainers: true, // Remove scrollable containers for better UX
}

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
}

// DOM Elements cache
const DOM = {}

/**
 * Check if we're on mobile and update state
 */
function checkMobileState() {
  STATE.isMobile = window.innerWidth <= CONFIG.mobileBreakpoint
  console.log(`Curriculum.js: Device detected as ${STATE.isMobile ? "mobile" : "desktop"}`)
}

/**
 * Handle window resize events
 */
function handleResize() {
  const wasMobile = STATE.isMobile
  checkMobileState()

  // If we crossed the mobile breakpoint, apply or remove mobile styles
  if (wasMobile !== STATE.isMobile) {
    if (STATE.isMobile) {
      applyMobileStyles()
    } else {
      removeMobileStyles()
    }

    // Re-render sections that need responsive adjustments
    if (STATE.curriculumData) {
      renderWebSite(STATE.curriculumData.sites)

      // Re-render competenze section for better mobile experience
      if (STATE.categorizedSkills) {
        renderCompetenze(STATE.curriculumData.competenze)
      }

      // Re-render esperienze section for better mobile experience
      if (STATE.curriculumData.esperienze) {
        renderEsperienze(STATE.curriculumData.esperienze)
      }
    }
  }
}

/**
 * Apply mobile-specific styles
 */
function applyMobileStyles() {
  // Center curriculum title on mobile
  const sectionTitle = document.querySelector("#curriculum .section-title")
  if (sectionTitle) {
    sectionTitle.style.textAlign = "center"
    sectionTitle.style.width = "100%"
    sectionTitle.style.left = "auto"
    sectionTitle.style.transform = "none"
  }

  // Remove scrollable containers if configured
  if (CONFIG.removeScrollableContainers) {
    document.querySelectorAll(".card-container").forEach((container) => {
      container.style.maxHeight = "none"
      container.style.overflowY = "visible"
    })
  }

  // Adjust skill tabs for better mobile experience
  document.querySelectorAll(".skill-tab").forEach((tab) => {
    tab.style.width = STATE.isMobile ? "calc(50% - 0.4rem)" : ""
    tab.style.justifyContent = STATE.isMobile ? "center" : ""
  })

  // Adjust role badges for better mobile experience
  document.querySelectorAll(".role-badge").forEach((badge) => {
    badge.style.margin = STATE.isMobile ? "0.3rem" : ""
    badge.style.display = STATE.isMobile ? "inline-block" : ""
  })
}

/**
 * Remove mobile-specific styles
 */
function removeMobileStyles() {
  // Restore curriculum title styles
  const sectionTitle = document.querySelector("#curriculum .section-title")
  if (sectionTitle) {
    sectionTitle.style.textAlign = ""
    sectionTitle.style.width = ""
    sectionTitle.style.left = ""
    sectionTitle.style.transform = ""
  }

  // Restore scrollable containers if they were removed
  if (CONFIG.removeScrollableContainers) {
    document.querySelectorAll(".card-container").forEach((container) => {
      container.style.maxHeight = ""
      container.style.overflowY = ""
    })
  }

  // Reset skill tabs for desktop experience
  document.querySelectorAll(".skill-tab").forEach((tab) => {
    tab.style.width = ""
    tab.style.justifyContent = ""
  })

  // Reset role badges for desktop experience
  document.querySelectorAll(".role-badge").forEach((badge) => {
    badge.style.margin = ""
    badge.style.display = ""
  })
}

/**
 * Initialize the section structure in the DOM
 */
function initializeSections() {
  const sectionContainer = document.getElementById("sectiion")
  if (!sectionContainer) {
    console.error("Curriculum.js: Section container 'sectiion' not found!")
    return
  }

  sectionContainer.innerHTML = `
    <div id="attestati" class="section">
      <h3><i class='bx bx-medal'></i> Attestati <span class="toggle-icon">▶</span></h3>
      <div class="card-container">
      </div>
    </div>

    <div id="linguistiche" class="section">
      <h3><i class='bx bx-globe'></i> Competenze Linguistiche <span class="toggle-icon">▶</span></h3>
      <div class="card-container">
      </div>
    </div>

    <div id="esperienze" class="section">
      <h3><i class='bx bx-briefcase'></i> Esperienze Lavorative <span class="toggle-icon">▶</span></h3>
      <div class="card-container">
      </div>
    </div>

    <div id="istruzione" class="section">
      <h3><i class='bx bx-book'></i> Istruzione <span class="toggle-icon">▶</span></h3>
      <div class="card-container">
      </div>
    </div>

    <div id="competenze" class="section">
      <h3><i class='bx bx-code-block'></i> Competenze <span class="toggle-icon">▶</span></h3>
      <div class="card-container">
      </div>
    </div>

    <div id="sites" class="section">
      <h3><i class='bx bx-laptop'></i> Siti Web <span class="toggle-icon">▶</span></h3>
      <div class="card-container">
      </div>
    </div>
  `

  // Cache DOM elements for later use
  DOM.sections = {
    attestati: document.querySelector("#attestati .card-container"),
    linguistiche: document.querySelector("#linguistiche .card-container"),
    esperienze: document.querySelector("#esperienze .card-container"),
    istruzione: document.querySelector("#istruzione .card-container"),
    competenze: document.querySelector("#competenze .card-container"),
    sites: document.querySelector("#sites .card-container"),
  }

  // Add click event listeners to section headers
  document.querySelectorAll("#curriculum .section h3").forEach((header, index) => {
    header.addEventListener("click", () => toggleSection(index))
  })
}

/**
 * Toggle section visibility
 */
function toggleSection(sectionIndex) {
  const sections = document.querySelectorAll("#curriculum .section")
  const section = sections[sectionIndex]
  const cardContainer = section.querySelector(".card-container")
  const toggleIcon = section.querySelector(".toggle-icon")

  // Close all sections first
  document.querySelectorAll("#curriculum .section .card-container").forEach((container) => {
    container.style.display = "none"
  })

  document.querySelectorAll("#curriculum .section .toggle-icon").forEach((icon) => {
    icon.textContent = "▶"
  })

  // Toggle the selected section
  if (STATE.expandedSections[sectionIndex]) {
    // Close section
    cardContainer.style.display = "none"
    toggleIcon.textContent = "▶"
    STATE.expandedSections[sectionIndex] = false
  } else {
    // Open section with animation
    cardContainer.style.display = "flex"
    cardContainer.style.opacity = "0"
    cardContainer.style.transform = "translateY(20px)"

    setTimeout(() => {
      cardContainer.style.opacity = "1"
      cardContainer.style.transform = "translateY(0)"
    }, 10)

    toggleIcon.textContent = "▼"
    STATE.expandedSections[sectionIndex] = true

    // Animate cards inside the section
    animateCardsInSection(cardContainer)

    // Initialize skill animations if this is the competenze section
    if (sectionIndex === 4) {
      setTimeout(() => {
        initializeSkillAnimations()
      }, 300)
    }
  }
}

/**
 * Animate cards in a section
 */
function animateCardsInSection(container) {
  if (!container) return

  const cards = container.querySelectorAll(".card")
  cards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(50px)"

    setTimeout(
      () => {
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      },
      100 + index * 50,
    )
  })
}

/**
 * Animate all cards
 */
function animateCards() {
  const cards = document.querySelectorAll(".card")
  cards.forEach((card, index) => {
    card.style.setProperty("--i", (index % 5) + 1)
    card.classList.add("animated")
  })
}

/**
 * Initialize skill progress bar animations
 */
function initializeSkillAnimations() {
  const progressBars = document.querySelectorAll(".progress-bar")
  if (!progressBars || progressBars.length === 0) {
    console.log("Curriculum.js: No progress bars found to animate")
    return
  }

  console.log(`Curriculum.js: Initializing animations for ${progressBars.length} progress bars`)

  progressBars.forEach((bar) => {
    const progress = bar.getAttribute("data-progress") || "75"
    const fill = bar.querySelector(".progress-fill")

    if (fill) {
      // Reset first
      fill.style.width = "0%"

      // Animate after a short delay
      setTimeout(() => {
        fill.style.width = `${progress}%`
      }, 100)
    }
  })
}

/**
 * Show loading state
 */
function showLoading(isLoading) {
  STATE.isLoading = isLoading

  // You could add a loading spinner here if needed
  if (isLoading) {
    console.log("Curriculum.js: Loading...")
  } else {
    console.log("Curriculum.js: Loading complete")
  }
}

/**
 * Show error message
 */
function showError(message) {
  STATE.hasError = true
  STATE.errorMessage = message

  const curriculumSection = document.getElementById("curriculum")
  if (!curriculumSection) return

  const container = curriculumSection.querySelector(".container")
  if (!container) return

  const errorDiv = document.createElement("div")
  errorDiv.className = "error-message"
  errorDiv.innerHTML = `
    <i class='bx bx-error-circle'></i>
    <p>${message}</p>
    <button onclick="location.reload()" class="reload-btn">
      <i class='bx bx-refresh'></i> Ricarica
    </button>
  `

  container.appendChild(errorDiv)
}

/**
 * Load categories data from JSON file
 */
async function loadCategoriesData() {
  try {
    console.log(`Curriculum.js: Attempting to load categories from ${CONFIG.categoriesJsonPath}`)
    const response = await fetch(CONFIG.categoriesJsonPath)

    if (!response.ok) {
      console.warn(`Curriculum.js: Failed to load categories from ${CONFIG.categoriesJsonPath}`)
      // Use hardcoded categories as fallback
      STATE.categoriesData = {
        skillCategories: {
          Programmazione: ["C", "C#", "C++", "Python", "JavaScript", "HTML5", "CSS3", "React JS", "Node.js", "Vite"],
          "DevOps & Tools": ["Git", "VS Code", "Docker", "PostgreSQL", "Linux", "Windows"],
          "IoT & Protocolli": ["MQTT", "AMQP", "CoAP", "HTTP", "OPC-UA", "Raspberry Pi", "Node-RED"],
          Visualizzazione: ["Mermaid", "Chart.js", "MathJax"],
        },
        defaultProjectTags: ["HTML", "CSS", "JavaScript", "Responsive", "Frontend", "UI/UX"],
      }
    } else {
      STATE.categoriesData = await response.json()
      console.log("Curriculum.js: Categories data loaded successfully")
    }

    return STATE.categoriesData
  } catch (error) {
    console.error("Curriculum.js: Error loading categories data:", error)

    // Use hardcoded categories as fallback
    STATE.categoriesData = {
      skillCategories: {
        Programmazione: ["C", "C#", "C++", "Python", "JavaScript", "HTML5", "CSS3", "React JS", "Node.js", "Vite"],
        "DevOps & Tools": ["Git", "VS Code", "Docker", "PostgreSQL", "Linux", "Windows"],
        "IoT & Protocolli": ["MQTT", "AMQP", "CoAP", "HTTP", "OPC-UA", "Raspberry Pi", "Node-RED"],
        Visualizzazione: ["Mermaid", "Chart.js", "MathJax"],
      },
      defaultProjectTags: ["HTML", "CSS", "JavaScript", "Responsive", "Frontend", "UI/UX"],
    }
  }
}

/**
 * Load curriculum data from JSON file
 */
async function loadCurriculumData() {
  try {
    console.log(`Curriculum.js: Attempting to load data from ${CONFIG.jsonPath}`)
    const response = await fetch(CONFIG.jsonPath)

    if (!response.ok) {
      console.warn(`Curriculum.js: Failed to load from ${CONFIG.jsonPath}, trying fallback...`)
      // Try fallback path
      const fallbackResponse = await fetch(CONFIG.fallbackJsonPath)

      if (!fallbackResponse.ok) {
        throw new Error(`Failed to load data: ${response.status} ${response.statusText}`)
      }

      STATE.curriculumData = await fallbackResponse.json()
      console.log("Curriculum.js: Data loaded from fallback path successfully")
    } else {
      STATE.curriculumData = await response.json()
      console.log("Curriculum.js: Data loaded successfully")
    }

    // Categorize skills based on JSON data
    if (STATE.curriculumData.competenze) {
      STATE.categorizedSkills = categorizeSkillsFromJson(STATE.curriculumData.competenze)
    }

    return STATE.curriculumData
  } catch (error) {
    console.error("Curriculum.js: Error loading data:", error)
    STATE.hasError = true
    STATE.errorMessage = error.message

    // Load fallback data
    STATE.curriculumData = generateFallbackData()
    STATE.categorizedSkills = categorizeSkillsFromJson(STATE.curriculumData.competenze)

    throw error
  }
}

/**
 * Render all sections with the loaded data
 */
function renderAllSections() {
  if (!STATE.curriculumData) {
    console.error("Curriculum.js: No data available to render")
    return
  }

  console.log("Curriculum.js: Rendering all sections")

  // Render each section
  renderAttestati(STATE.curriculumData.attestati)
  renderLinguistiche(STATE.curriculumData.linguistiche)
  renderEsperienze(STATE.curriculumData.esperienze)
  renderIstruzione(STATE.curriculumData.istruzione)
  renderCompetenze(STATE.curriculumData.competenze)
  renderWebSite(STATE.curriculumData.sites)

  // Make sections visible with animation
  document.querySelectorAll("#curriculum .section").forEach((section, index) => {
    setTimeout(() => {
      section.style.opacity = "1"
      section.style.transform = "translateY(0)"
    }, 100 * index)
  })
}

/**
 * Render attestati section
 */
function renderAttestati(attestati) {
  if (!attestati || !Array.isArray(attestati) || !DOM.sections.attestati) {
    console.warn("Curriculum.js: Invalid attestati data or container not found")
    return
  }

  DOM.sections.attestati.innerHTML = ""

  attestati.forEach((attestato, index) => {
    const card = document.createElement("div")
    card.className = "card"
    card.setAttribute("data-aos", "fade-up")
    card.setAttribute("data-aos-delay", (index * 100).toString())

    let html = `
      <div class="card-header">
        <div class="certificate-icon">
          <i class='bx bx-certification'></i>
        </div>
        <h4>${attestato.titolo || "Titolo non disponibile"}</h4>
      </div>
      <div class="card-body">
        <p>${attestato.descrizione || "Descrizione non disponibile"}</p>
      </div>
    `

    // Add certificate download link if available
    if (attestato.certificato) {
      html += `
        <div class="card-footer">
          <a href="${attestato.certificato}" class="testo" download>
            <span>Scarica Certificato</span>
            <i class='bx bx-download'></i>
          </a>
        </div>
      `
    }

    card.innerHTML = html
    DOM.sections.attestati.appendChild(card)
  })
}

/**
 * Render competenze linguistiche section
 */
function renderLinguistiche(linguistiche) {
  if (!linguistiche || !Array.isArray(linguistiche) || !DOM.sections.linguistiche) {
    console.warn("Curriculum.js: Invalid linguistiche data or container not found")
    return
  }

  DOM.sections.linguistiche.innerHTML = ""

  linguistiche.forEach((lingua, index) => {
    const card = document.createElement("div")
    card.className = "card language-card"
    card.setAttribute("data-aos", "zoom-in")
    card.setAttribute("data-aos-delay", (index * 100).toString())

    // Create visual level indicator
    const levelIndicator = createLevelIndicator(lingua.livello)

    // Handle potential missing image
    const imgSrc = lingua.immagine || "/placeholder.svg?height=100&width=100"

    card.innerHTML = `
      <div class="language-flag">
        <img src="${imgSrc}" alt="Bandiera ${
          lingua.lingua
        }" onerror="this.src='/placeholder.svg?height=100&width=100'; this.onerror=null;" />
      </div>
      <h4>${lingua.lingua || "Lingua non specificata"}</h4>
      <div class="language-level">
        <strong>Livello:</strong> ${lingua.livello || "Non specificato"}
      </div>
      <div class="level-indicator">
        ${levelIndicator}
      </div>
      ${
        lingua.link
          ? `
        <button class="go-live-btn" onclick="window.open('${lingua.link}', '_blank')">
          <span>Impara la lingua</span>
          <i class='bx bx-book-open'></i>
        </button>
      `
          : ""
      }
    `

    DOM.sections.linguistiche.appendChild(card)
  })
}

/**
 * Create visual language level indicator
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
  }

  const levelValue = levels[level] || 0
  let indicators = ""

  for (let i = 1; i <= 6; i++) {
    const active = i <= levelValue ? "active" : ""
    indicators += `<div class="level-dot ${active}" data-level="${i}"></div>`
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
  `
}

/**
 * Render esperienze lavorative section with improved layout
 */
function renderEsperienze(esperienze) {
  if (!esperienze || !Array.isArray(esperienze) || !DOM.sections.esperienze) {
    console.warn("Curriculum.js: Invalid esperienze data or container not found")
    return
  }

  DOM.sections.esperienze.innerHTML = ""

  // Use standard card container for better consistency with other sections
  DOM.sections.esperienze.className = "card-container"

  esperienze.forEach((esperienza, index) => {
    const card = document.createElement("div")
    card.className = "card experience-card"
    card.setAttribute("data-aos", index % 2 === 0 ? "fade-right" : "fade-left")
    card.setAttribute("data-aos-delay", (index * 150).toString())

    // Create activities list
    const attivitaList = Array.isArray(esperienza.attivita)
      ? esperienza.attivita.map((attivita) => `<li><i class='bx bx-check'></i> ${attivita}</li>`).join("")
      : "<li><i class='bx bx-check'></i> Informazioni non disponibili</li>"

    // Handle potential missing logo
    const logoSrc = esperienza.logo || "/placeholder.svg?height=64&width=64"

    card.innerHTML = `
      <div class="experience-header">
        <div class="company-logo">
          <img class="azienda" src="${logoSrc}" alt="Logo ${
            esperienza.azienda
          }" onerror="this.src='/placeholder.svg?height=64&width=64'; this.onerror=null;" />
        </div>
        <div class="company-info">
          <h4>${esperienza.azienda || "Azienda non specificata"}</h4>
          <div class="role-badge">${esperienza.ruolo || "Ruolo non specificato"}</div>
        </div>
      </div>
      <div class="experience-period">
        <i class='bx bx-calendar'></i>
        <span>${esperienza.periodo || "Periodo non specificato"}</span>
      </div>
      <div class="experience-location">
        <i class='bx bx-map'></i>
        <span>${esperienza.luogo || "Luogo non specificato"}</span>
      </div>
      <div class="experience-activities">
        <h5>Attività svolte:</h5>
        <ul class="activities-list">
          ${attivitaList}
        </ul>
      </div>
      ${
        esperienza.sito
          ? `
        <button class="go-live-btn" onclick="window.open('${esperienza.sito}', '_blank')">
          <span>Visita il sito</span>
          <i class='bx bx-link-external'></i>
        </button>
      `
          : ""
      }
    `

    DOM.sections.esperienze.appendChild(card)
  })
}

/**
 * Render competenze section with improved mobile experience
 */
function renderCompetenze(competenze) {
  if (!competenze || !Array.isArray(competenze) || !DOM.sections.competenze) {
    console.warn("Curriculum.js: Invalid competenze data or container not found")
    return
  }

  DOM.sections.competenze.innerHTML = ""

  // Create tabs for categories
  const tabsContainer = document.createElement("div")
  tabsContainer.className = "skills-tabs"

  // Create container for skill cards
  const skillsContainer = document.createElement("div")
  skillsContainer.className = "skills-container"

  // Ordina le categorie in ordine alfabetico
  const sortedCategories = Object.keys(STATE.categorizedSkills).sort((a, b) => {
    return a.localeCompare(b, 'it')
  })

  // Add tabs for each category
  sortedCategories.forEach((category, index) => {
    const tab = document.createElement("div")
    tab.className = `skill-tab ${index === 0 ? "active" : ""}`
    tab.setAttribute("data-category", category)

    // Apply mobile-specific styles if needed
    if (STATE.isMobile) {
      tab.style.width = "calc(50% - 0.4rem)"
      tab.style.justifyContent = "center"
    }

    tab.innerHTML = `
      <i class='bx ${getCategoryIcon(category)}'></i>
      <span>${category}</span>
    `

    tab.addEventListener("click", () => {
      // Update active tab
      document.querySelectorAll(".skill-tab").forEach((t) => {
        t.classList.remove("active")
      })
      tab.classList.add("active")

      // Update skills display with animation
      skillsContainer.classList.add("fade-out")

      setTimeout(() => {
        renderSkillCategory(STATE.categorizedSkills[category], skillsContainer)
        skillsContainer.classList.remove("fade-out")

        // Initialize progress bar animations
        setTimeout(() => {
          initializeSkillAnimations()
        }, 100)
      }, 300)
    })

    tabsContainer.appendChild(tab)
  })

  DOM.sections.competenze.appendChild(tabsContainer)
  DOM.sections.competenze.appendChild(skillsContainer)

  // Show first category by default
  const firstCategory = sortedCategories[0]
  if (firstCategory) {
    renderSkillCategory(STATE.categorizedSkills[firstCategory], skillsContainer)
  }
}

/**
 * Render skills for a specific category with improved layout
 */
function renderSkillCategory(skills, container) {
  if (!container) return

  container.innerHTML = ""

  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    container.innerHTML = `
      <div class="empty-category">
        <i class='bx bx-info-circle'></i>
        <p>Nessuna competenza in questa categoria.</p>
      </div>
    `
    return
  }

  // Ordina le competenze in ordine alfabetico per nome
  const sortedSkills = [...skills].sort((a, b) => {
    const nameA = (a.nome || "").toLowerCase()
    const nameB = (b.nome || "").toLowerCase()
    return nameA.localeCompare(nameB, 'it')
  })

  sortedSkills.forEach((skill, index) => {
    const card = document.createElement("div")
    card.className = "card skill-card"
    card.setAttribute("data-aos", "zoom-in")
    card.setAttribute("data-aos-delay", (index * 50).toString())

    // Generate random color for progress bar
    const hue = Math.floor(Math.random() * 360)
    const progressColor = `hsl(${hue}, 70%, 60%)`

    // Handle potential missing image
    const imgSrc = skill.immagine || "/placeholder.svg?height=80&width=80"

    card.innerHTML = `
      <div class="skill-icon" style="background-color: ${progressColor}20;">
        <img src="${imgSrc}" alt="${
          skill.nome
        }" onerror="this.src='/placeholder.svg?height=80&width=80'; this.onerror=null;" />
      </div>
      <h4>${skill.nome || "Competenza non specificata"}</h4>
      <div class="skill-progress">
        <div class="progress-bar" data-progress="85" style="--progress-color: ${progressColor};">
          <div class="progress-fill"></div>
        </div>
      </div>
      <p>${skill.descrizione || "Descrizione non disponibile"}</p>
      ${
        skill.link
          ? `
        <button class="go-live-btn" onclick="window.open('${skill.link}', '_blank')">
          <span>Scopri di più</span>
          <i class='bx bx-link-external'></i>
        </button>
      `
          : ""
      }
    `

    container.appendChild(card)
  })
}

/**
 * Render siti web section with mobile optimizations
 */
function renderWebSite(sites) {
  if (!sites || !Array.isArray(sites) || !DOM.sections.sites) {
    console.warn("Curriculum.js: Invalid sites data or container not found")
    return
  }

  DOM.sections.sites.innerHTML = ""

  // Use different layout for mobile vs desktop
  if (STATE.isMobile) {
    DOM.sections.sites.className = "card-container"
  } else {
    DOM.sections.sites.className = "card-container portfolio-grid"
  }

  sites.forEach((site, index) => {
    const card = document.createElement("div")
    card.className = "card portfolio-card"
    card.setAttribute("data-aos", "fade-up")
    card.setAttribute("data-aos-delay", (index * 100).toString())

    // Handle potential missing image
    const imgSrc = site.immagine || "/placeholder.svg?height=200&width=300"

    // Determine image size based on device
    const imageHeight = STATE.isMobile ? CONFIG.siteImageMaxHeight : 200

    const html = `
      <div class="portfolio-image" style="height: ${imageHeight}px;">
        <img src="${imgSrc}" alt="${site.nome}" class="site-image" 
             style="max-height: ${imageHeight}px;" 
             onerror="this.src='/placeholder.svg?height=${imageHeight}&width=${
               imageHeight * 1.5
             }'; this.onerror=null;" />
        <div class="portfolio-overlay">
          <div class="portfolio-buttons">
            ${
              site.link
                ? `
              <a href="${site.link}" target="_blank" class="portfolio-btn view-btn">
                <i class='bx bx-link-external'></i>
                <span class="white">Visita</span>
              </a>
            `
                : ""
            }
            ${
              site.codice
                ? `
              <a href="${site.codice}" target="_blank" class="portfolio-btn code-btn">
                <i class='bx bx-code-alt'></i>
                <span class="white">Codice</span>
              </a>
            `
                : ""
            }
          </div>
        </div>
      </div>
      <div class="portfolio-info">
        <h4>${site.nome || "Progetto non specificato"}</h4>
        <div class="portfolio-tags">
          ${generateProjectTags()}
        </div>
      </div>
    `

    card.innerHTML = html
    DOM.sections.sites.appendChild(card)
  })
}

/**
 * Generate tags for projects using the default project tags from categories.json
 */
function generateProjectTags() {
  // Use default tags from categories.json if available
  let defaultTags = ["HTML", "CSS", "JavaScript", "Responsive", "Frontend", "UI/UX"]

  if (STATE.categoriesData && STATE.categoriesData.defaultProjectTags) {
    defaultTags = STATE.categoriesData.defaultProjectTags
  }

  // Always include all tags as requested
  return defaultTags.map((tag) => `<span class="portfolio-tag">${tag}</span>`).join("")
}

/**
 * Get icon for skill category
 */
function getCategoryIcon(category) {
  const icons = {
    Programmazione: "bx-code-alt",
    "DevOps & Tools": "bx-wrench",
    "IoT & Protocolli": "bx-network-chart",
    Visualizzazione: "bx-bar-chart-alt-2",
    Frontend: "bx-layout",
    Backend: "bx-server",
    Database: "bx-data",
    Mobile: "bx-mobile-alt",
    Cloud: "bx-cloud",
    Security: "bx-shield-quarter",
    Altro: "bx-category",
  }

  return icons[category] || "bx-category"
}

/**
 * Categorize skills directly from JSON data
 * This function prioritizes the 'categoria' property in the JSON
 */
function categorizeSkillsFromJson(competenze) {
  if (!competenze || !Array.isArray(competenze)) {
    return {}
  }

  // First, collect all unique categories from the JSON data
  const uniqueCategories = new Set()
  competenze.forEach((skill) => {
    if (skill.categoria) {
      uniqueCategories.add(skill.categoria)
    }
  })

  // If no categories found in JSON, use default categorization
  if (uniqueCategories.size === 0) {
    return categorizeSkillsByName(competenze)
  }

  // Create categorized object based on JSON categories
  const categorized = {}

  // First, add skills with explicit categories
  uniqueCategories.forEach((category) => {
    categorized[category] = competenze.filter((skill) => skill.categoria === category)
  })

  // Then add any uncategorized skills to "Altro"
  const categorizedSkillIds = Object.values(categorized)
    .flat()
    .map((skill) => skill.nome)

  const uncategorizedSkills = competenze.filter(
    (skill) => !skill.categoria && !categorizedSkillIds.includes(skill.nome),
  )

  if (uncategorizedSkills.length > 0) {
    // Try to categorize remaining skills by name
    const remainingCategorized = categorizeSkillsByName(uncategorizedSkills)

    // Merge with existing categories
    Object.keys(remainingCategorized).forEach((category) => {
      if (categorized[category]) {
        categorized[category] = [...categorized[category], ...remainingCategorized[category]]
      } else {
        categorized[category] = remainingCategorized[category]
      }
    })
  }

  return categorized
}

/**
 * Fallback categorization by skill name
 */
function categorizeSkillsByName(competenze) {
  // Use categories from the loaded JSON if available
  let categories = {}

  if (STATE.categoriesData && STATE.categoriesData.skillCategories) {
    categories = STATE.categoriesData.skillCategories
  } else {
    // Fallback to hardcoded categories
    categories = {
      Programmazione: ["C", "C#", "C++", "Python", "JavaScript", "HTML5", "CSS3", "React JS", "Node.js", "Vite"],
      "DevOps & Tools": ["Git", "VS Code", "Docker", "PostgreSQL", "Linux", "Windows"],
      "IoT & Protocolli": ["MQTT", "AMQP", "CoAP", "HTTP", "OPC-UA", "Raspberry Pi", "Node-RED"],
      Visualizzazione: ["Mermaid", "Chart.js", "MathJax"],
    }
  }

  const categorized = {}

  // Categorize based on predefined categories
  Object.keys(categories).forEach((category) => {
    categorized[category] = competenze.filter((skill) => categories[category].includes(skill.nome))
  })

  // Add "Altro" category for uncategorized skills
  const categorizedSkillNames = Object.values(categorized)
    .flat()
    .map((skill) => skill.nome)

  const otherSkills = competenze.filter((skill) => !categorizedSkillNames.includes(skill.nome))

  if (otherSkills.length > 0) {
    categorized["Altro"] = otherSkills
  }

  return categorized
}

/**
 * Generate fallback data in case of loading failure
 */
function generateFallbackData() {
  console.log("Curriculum.js: Generating fallback data")
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
  }
}

/**
 * Render istruzione section
 */function renderIstruzione(istruzione) {
  if (!istruzione || !Array.isArray(istruzione) || !DOM.sections.istruzione) {
    console.warn("Curriculum.js: Invalid istruzione data or container not found");
    return;
  }

  DOM.sections.istruzione.innerHTML = "";

  istruzione.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card istruzione-card";
    card.setAttribute("data-aos", "fade-up");
    card.setAttribute("data-aos-delay", (index * 100).toString());

    const logoSrc = item.logo || "/placeholder.svg?height=64&width=64";

    // Genera lista competenze se presenti
    let competenzeHtml = "";
    if (Array.isArray(item.competenze)) {
      competenzeHtml = `
        <ul class="competenze">
          ${item.competenze.map(comp => `<li>${comp}</li>`).join("")}
        </ul>
      `;
    } else if (item.descrizione) {
      competenzeHtml = `<p class="descrizione">${item.descrizione}</p>`;
    }

    // Aggiunta bottone per scaricare il diploma
    const downloadButton = item.diploma
      ? `<a href="${item.diploma}" class="go-live-btn" download>
          <span>Scarica diploma</span>
          <i class='bx bx-download'></i>
        </a>`
      : "";

    // Bottone per il sito dell’istituto
    const siteButton = item.sito
      ? `<button class="go-live-btn" onclick="window.open('${item.sito}', '_blank')">
          <span>Visita il sito</span>
          <i class='bx bx-link-external'></i>
        </button>`
      : "";

    card.innerHTML = `
      <div class="istruzione-header">
        <div class="istituto-logo">
          <img class="azienda" src="${logoSrc}" alt="Logo ${item.istituto}" 
               onerror="this.src='/placeholder.svg?height=64&width=64'; this.onerror=null;" />
        </div>
        <div class="istituto-info">
          <h4>${item.titolo || "Titolo non specificato"}</h4>
          <div>${item.istituto || "Istituto non specificato"}</div>
          <div class="livello-eqf">${item.livello || ""}</div>
        </div>
      </div>
      <div class="istruzione-period">
        <i class='bx bx-calendar'></i>
        <span>${item.periodo || "Periodo non specificato"}</span>
      </div>
      <div class="istruzione-location">
        <i class='bx bx-map'></i>
        <span>${item.luogo || "Luogo non specificato"}</span>
      </div>
      ${competenzeHtml}
      <div class="istruzione-buttons">
        ${siteButton}
        ${downloadButton}
      </div>
    `;

    DOM.sections.istruzione.appendChild(card);
  });
}