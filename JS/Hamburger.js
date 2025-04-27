document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");

  // Inizialmente nascondi il menu su mobile
  if (window.innerWidth <= 768) {
    menu.style.display = "none";
  }

  hamburger.addEventListener("click", () => {
    // Toggle menu visibility
    if (menu.style.display === "none" || menu.style.display === "") {
      menu.style.display = "flex";
      hamburger.innerHTML = '<i class="bx bx-x"></i>'; // Icona X
      menu.classList.add("show");
    } else {
      menu.style.display = "none";
      hamburger.innerHTML = '<i class="bx bx-menu"></i>'; // Icona hamburger
      menu.classList.remove("show");
    }
  });

  // Gestisci il ridimensionamento della finestra
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      menu.style.display = "flex";
      hamburger.innerHTML = '<i class="bx bx-menu"></i>';
    } else if (!menu.classList.contains("show")) {
      menu.style.display = "none";
    }
  });

  // Chiudi il menu quando si clicca su un link
  const menuLinks = document.querySelectorAll("#menu a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        menu.style.display = "none";
        hamburger.innerHTML = '<i class="bx bx-menu"></i>';
        menu.classList.remove("show");
      }
    });
  });
});
