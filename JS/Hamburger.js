document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger"),
    menu = document.getElementById("menu"),
    homeLink = menu.querySelector("a[href='#home']"); // Seleziona il link "Home"

  // Initially hide the menu on mobile and Home link
  if (window.innerWidth <= 768) {
    menu.style.display = "none";
    homeLink.style.display = "block"; // Mostra il link Home su mobile
  }

  hamburger.addEventListener("click", () => {
    // Toggle menu visibility
    if (menu.style.display === "none" || menu.style.display === "") {
      menu.style.display = "flex";
      hamburger.textContent = "close"; // X icon
      menu.classList.add("show");
      homeLink.style.display = "block"; // Mostra il link Home quando il menu è visibile
    } else {
      menu.style.display = "none";
      hamburger.textContent = "menu"; // = icon (hamburger)
      menu.classList.remove("show");
      homeLink.style.display = "none"; // Nasconde il link Home quando il menu è nascosto
    }
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      menu.style.display = "flex";
      homeLink.style.display = "none"; // Nasconde il link Home quando il menu è visibile su desktop
    } else if (!menu.classList.contains("show")) {
      menu.style.display = "none";
      homeLink.style.display = "block"; // Mostra il link Home su mobile se il menu è nascosto
    }
  });

  // Close menu when clicking on a link
  const menuLinks = document.querySelectorAll("#menu a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        menu.style.display = "none";
        hamburger.textContent = "menu"; // = icon
        menu.classList.remove("show");
        homeLink.style.display = "none"; // Nasconde il link Home quando un altro link è cliccato
      }
    });
  });
});
