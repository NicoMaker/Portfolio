document.addEventListener("DOMContentLoaded", () => {
  // Aggiungi icona e funzionalità di toggle a tutte le sezioni
  setupToggleSections();
});

function setupToggleSections() {
  // Seleziona tutti i titoli h3 all'interno delle sezioni
  const sectionTitles = document.querySelectorAll("#curriculum .section h3");

  sectionTitles.forEach((title, index) => {
    // Trova il container delle card associato a questo titolo
    const cardContainer = title
      .closest(".section")
      .querySelector(".card-container");

    // Nasconde il container all'inizio, tranne il primo che sarà aperto
    if (index !== 0) {
      cardContainer.style.display = "none";
    } else {
      title.querySelector(".toggle-icon").textContent = "▼";
    }

    // Aggiungi la classe per lo stile del cursore e altre proprietà
    title.classList.add("toggleable");

    // Aggiungi l'event listener per il click
    title.addEventListener("click", () => {
      // Toggle della visibilità
      if (cardContainer.style.display === "none") {
        // Chiudi tutte le altre sezioni
        document
          .querySelectorAll("#curriculum .section .card-container")
          .forEach((container) => {
            container.style.display = "none";
          });
        document
          .querySelectorAll("#curriculum .section h3 .toggle-icon")
          .forEach((icon) => {
            icon.textContent = "▶";
          });

        // Apri questa sezione con animazione
        cardContainer.style.display = "flex";
        cardContainer.style.opacity = "0";
        cardContainer.style.transform = "translateY(20px)";

        setTimeout(() => {
          cardContainer.style.opacity = "1";
          cardContainer.style.transform = "translateY(0)";
        }, 10);

        title.querySelector(".toggle-icon").textContent = "▼";

        // Anima le card all'interno
        const cards = cardContainer.querySelectorAll(".card");
        cards.forEach((card, i) => {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";

          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 100 + i * 50);
        });
      } else {
        // Chiudi questa sezione con animazione
        cardContainer.style.opacity = "0";
        cardContainer.style.transform = "translateY(20px)";

        setTimeout(() => {
          cardContainer.style.display = "none";
        }, 300);

        title.querySelector(".toggle-icon").textContent = "▶";
      }
    });
  });
}

// Funzione per aprire una sezione specifica tramite URL hash
function openSectionFromHash() {
  const hash = window.location.hash;
  if (hash && hash.startsWith("#")) {
    const sectionId = hash.substring(1);
    const section = document.getElementById(sectionId);

    if (section && section.classList.contains("section")) {
      const title = section.querySelector("h3");
      if (title) {
        // Simula un click sul titolo per aprire la sezione
        setTimeout(() => {
          title.click();

          // Scorri alla sezione
          section.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    }
  }
}

// Esegui quando il DOM è caricato
document.addEventListener("DOMContentLoaded", () => {
  // Apri la sezione dall'hash URL se presente
  openSectionFromHash();

  // Gestisci i cambiamenti dell'hash URL
  window.addEventListener("hashchange", openSectionFromHash);
});
