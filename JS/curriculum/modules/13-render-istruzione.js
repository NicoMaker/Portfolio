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

  let istruzioneSearchStarted = false;

  function filterIstruzione() {
    const query = searchInput.value.trim().toLowerCase();
    const cards = cardsContainer.querySelectorAll(".card");

    // Al primo carattere digitato, torna all'inizio della categoria
    if (query && !istruzioneSearchStarted) {
      istruzioneSearchStarted = true;
      scrollToCurriculumPart("istruzione");
    } else if (!query) {
      istruzioneSearchStarted = false;
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
