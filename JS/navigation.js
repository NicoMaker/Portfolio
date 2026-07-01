/**
 * navigation.js – Scroll spy, aggiornamento hash e scroll da hash
 * Unisce le funzionalità di Colore_sezione.js, scroll.js e Toggle-section.js
 */
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav ul li a");
  const header = document.querySelector("header");

  // ---- 1. Scroll spy: attiva il link corretto nel menu ----
  function updateActiveMenu() {
    let currentSection = "home";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      // Se lo scroll ha superato la parte superiore della sezione (con offset)
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        // Usa l'ID reale della sezione (attestati, linguistiche, esperienze, ...)
        currentSection = section.getAttribute("id") || "home";
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active-link");
      link.style.color = ""; // rimuove eventuali stili inline

      const href = link.getAttribute("href");
      const target = href ? href.replace("#", "") : "";
      if (target === currentSection) {
        link.classList.add("active-link");
      }
    });
  }

  // ---- 2. Aggiorna l'hash nell'URL durante lo scroll ----
  function updateURLHash() {
    let scrollPosition = window.scrollY + 100; // piccolo offset

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.clientHeight;
      const id = section.getAttribute("id");

      if (scrollPosition >= top && scrollPosition < top + height) {
        // Sostituisce l'hash senza creare una nuova voce nella cronologia
        history.replaceState(null, null, `#${id}`);
      }
    });
  }

  // ---- 3. Scroll alla sezione indicata dall'hash all'avvio ----
  function scrollToHash() {
    const hash = window.location.hash;
    if (!hash || !hash.startsWith("#")) return;

    const sectionId = hash.substring(1);
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Aspetta che il layout sia pronto (per l'offset dell'header)
    setTimeout(() => {
      const headerOffset = header ? header.offsetHeight + 16 : 16;
      const targetY = section.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }, 300);
  }

  // ---- Event listeners ----
  window.addEventListener("scroll", () => {
    updateActiveMenu();
    updateURLHash();
  }, { passive: true });

  window.addEventListener("hashchange", scrollToHash);

  // Esegui subito per lo stato iniziale
  updateActiveMenu();
  updateURLHash();
  scrollToHash();
});