document.addEventListener("DOMContentLoaded", () => {
  // Aggiungi funzionalità di toggle a tutte le sezioni
  setupToggleSections();

  // Apri la sezione dall'hash URL se presente
  openSectionFromHash();

  // Gestisci i cambiamenti dell'hash URL
  window.addEventListener("hashchange", openSectionFromHash);
});

function setupToggleSections() {
  // Seleziona tutti i titoli h3 all'interno delle sezioni
  const sectionTitles = document.querySelectorAll("#curriculum .section h3");

  sectionTitles.forEach((title, index) => {
    // Trova il container delle card associato a questo titolo
    const cardContainer = title
      .closest(".section")
      .querySelector(".card-container");

    // Nascondi tutti i container inizialmente
    cardContainer.style.display = "none";
    title.querySelector(".toggle-icon").textContent = "▶";
    title.setAttribute("data-expanded", "false");

    // Aggiungi la classe per lo stile del cursore e altre proprietà
    title.classList.add("toggleable");

    // Aggiungi l'event listener per il click
    title.addEventListener("click", () => {
      const isExpanded = title.getAttribute("data-expanded") === "true";

      if (!isExpanded) {
        // Chiudi tutte le altre sezioni
        document
          .querySelectorAll("#curriculum .section .card-container")
          .forEach((container) => {
            container.style.display = "none";
          });
        document
          .querySelectorAll("#curriculum .section h3")
          .forEach((header) => {
            header.querySelector(".toggle-icon").textContent = "▶";
            header.setAttribute("data-expanded", "false");
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
        title.setAttribute("data-expanded", "true");

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

        // Inizializza le animazioni delle skill se questa è la sezione competenze
        if (title.closest("#competenze")) {
          setTimeout(() => {
            initializeSkillAnimations();
          }, 300);
        }
      } else {
        // Chiudi questa sezione con animazione
        cardContainer.style.opacity = "0";
        cardContainer.style.transform = "translateY(20px)";

        setTimeout(() => {
          cardContainer.style.display = "none";
        }, 300);

        title.querySelector(".toggle-icon").textContent = "▶";
        title.setAttribute("data-expanded", "false");
      }
    });
  });

  // Apri immediatamente la sezione esperienze lavorative
  const workExperienceSection = document.querySelector("#esperienze h3");
  if (workExperienceSection) {
    workExperienceSection.click();
  }
}

// Funzione per aprire una sezione specifica tramite URL hash
function openSectionFromHash() {
  const hash = window.location.hash;
  if (hash && hash.startsWith("#")) {
    const sectionId = hash.substring(1);
    const section = document.getElementById(sectionId);

    // Evita di aprire automaticamente la sezione 'attestati'
    if (
      section &&
      section.classList.contains("section") &&
      section.id !== "attestati"
    ) {
      const title = section.querySelector("h3");
      if (title) {
        setTimeout(() => {
          title.click();
          section.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    }
  }
}

// Inizializza le animazioni delle barre di progresso delle competenze
function initializeSkillAnimations() {
  const progressBars = document.querySelectorAll(".progress-bar");

  if (!progressBars || progressBars.length === 0) return;

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
