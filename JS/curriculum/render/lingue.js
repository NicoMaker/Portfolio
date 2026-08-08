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
