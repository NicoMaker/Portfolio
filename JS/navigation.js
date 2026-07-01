/**
 * navigation.js – Scroll spy, aggiornamento hash e scroll da hash
 * Versione unificata e migliorata.
 */
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav ul li a");
  const header = document.querySelector("header");
  const headerOffset = header ? header.offsetHeight + 16 : 16; // offset fisso

  // ---- 1. Scroll spy: attiva il link corretto nel menu ----
  function updateActiveMenu() {
    let currentSection = "home";
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      // Se lo scroll ha superato la parte superiore della sezione (con offset)
      if (
        scrollY + headerOffset >= sectionTop &&
        scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id") || "home";
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active-link");
      link.style.color = ""; // reset stili inline

      const href = link.getAttribute("href");
      const target = href ? href.replace("#", "") : "";
      if (target === currentSection) {
        link.classList.add("active-link");
      }
    });
  }

  // ---- 2. Aggiorna l'hash nell'URL durante lo scroll ----
  function updateURLHash() {
    const scrollY = window.scrollY + 100; // piccolo offset per evitare cambi anticipati

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.clientHeight;
      const id = section.getAttribute("id");

      if (scrollY >= top && scrollY < top + height) {
        // Sostituisce l'hash senza creare una nuova voce nella cronologia
        if (window.location.hash !== `#${id}`) {
          history.replaceState(null, null, `#${id}`);
        }
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
      const targetY =
        section.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }, 300);
  }

  // ---- 4. Event listeners ----
  window.addEventListener(
    "scroll",
    () => {
      updateActiveMenu();
      updateURLHash();
    },
    { passive: true },
  );

  window.addEventListener("hashchange", scrollToHash);

  // ---- 5. Esecuzione iniziale ----
  updateActiveMenu();
  updateURLHash();
  scrollToHash();
});
