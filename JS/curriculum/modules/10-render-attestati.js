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
    /Rilasciat[oa]\s+(?:da|dall['’‘ʼ]|dallo|dalla)\s*(.+?)\s+il\s+\d{1,2}\/\d{1,2}\/\d{2,4}/i,
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

  let attestatiSearchStarted = false;

  function filterAttestati() {
    const query = searchInput.value.trim().toLowerCase();
    const cards = cardsContainer.querySelectorAll(".card");

    // Al primo carattere digitato, torna all'inizio della categoria
    if (query && !attestatiSearchStarted) {
      attestatiSearchStarted = true;
      scrollToCurriculumPart("attestati");
    } else if (!query) {
      attestatiSearchStarted = false;
    }

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
      <br>
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

