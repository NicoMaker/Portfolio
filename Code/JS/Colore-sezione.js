document.addEventListener("DOMContentLoaded", () => {
  // Seleziona tutte le sezioni che hanno un ID
  const sections = document.querySelectorAll("section[id]"),
    navLinks = document.querySelectorAll("nav ul li a.header"),
    getScrollPosition = () => window.scrollY + 100; // Offset di 100px per migliorare l'UX

  // Funzione per determinare quale sezione è attualmente visibile
  function getActiveSection() {
    return Array.from(sections).find((section) => {
      const sectionTop = section.offsetTop,
        sectionHeight = section.offsetHeight;

      return (
        getScrollPosition() >= sectionTop &&
        getScrollPosition() < sectionTop + sectionHeight
      );
    });
  }

  // Funzione per aggiornare il link attivo nel menu
  function updateActiveLink() {
    const activeSection = getActiveSection();

    if (activeSection) {
      const activeId = activeSection.getAttribute("id");

      navLinks.forEach((link) => {
        // Rimuovi la classe active da tutti i link
        link.classList.remove("active");

        // Aggiungi la classe active al link che corrisponde alla sezione corrente
        if (link.getAttribute("href") === `#${activeId}`)
          link.classList.add("active");
      });
    }
  }

  // Aggiungi l'event listener per lo scroll
  window.addEventListener("scroll", updateActiveLink);

  // Chiama la funzione una volta al caricamento della pagina per impostare lo stato iniziale
  updateActiveLink();
});
