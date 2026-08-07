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

  let esperienzeSearchStarted = false;

  function filterEsperienze() {
    const query = searchInput.value.trim().toLowerCase();
    const cards = cardsContainer.querySelectorAll(".card");

    // Al primo carattere digitato, torna all'inizio della categoria
    if (query && !esperienzeSearchStarted) {
      esperienzeSearchStarted = true;
      scrollToCurriculumPart("esperienze");
    } else if (!query) {
      esperienzeSearchStarted = false;
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

