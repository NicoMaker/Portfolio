document.addEventListener("DOMContentLoaded", () => {
  // Aggiungi icona e funzionalità di toggle a tutte le sezioni
  setupToggleSections();
});

function setupToggleSections() {
  // Seleziona tutti i titoli h3 all'interno delle sezioni
  const sectionTitles = document.querySelectorAll("#curriculum .section h3");

  sectionTitles.forEach((title) => {
    // Trova il container delle card associato a questo titolo
    const cardContainer = title
      .closest(".section")
      .querySelector(".card-container");

    // Nasconde il container all'inizio
    cardContainer.style.display = "none";

    // Aggiungi l'icona di toggle accanto al titolo
    title.innerHTML += ' <span class="toggle-icon">▶</span>';

    // Aggiungi la classe per lo stile del cursore e altre proprietà
    title.classList.add("toggleable");

    // Aggiungi l'event listener per il click
    title.addEventListener("click", () => {
      // Toggle della visibilità
      if (cardContainer.style.display === "none") {
        cardContainer.style.display = "flex";
        title.querySelector(".toggle-icon").textContent = "▼";
      } else {
        cardContainer.style.display = "none";
        title.querySelector(".toggle-icon").textContent = "▶";
      }
    });
  });
}
