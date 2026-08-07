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

  let sitesSearchStarted = false;

  function filterSites() {
    const query = searchInput.value.trim().toLowerCase();
    const cards = cardsContainer.querySelectorAll(".card");

    // Al primo carattere digitato, torna all'inizio della categoria
    if (query && !sitesSearchStarted) {
      sitesSearchStarted = true;
      scrollToCurriculumPart("sites");
    } else if (!query) {
      sitesSearchStarted = false;
    }

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
