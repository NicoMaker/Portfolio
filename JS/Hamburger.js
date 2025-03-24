document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger"),
    menu = document.getElementById("menu");

  // Initially hide the menu on mobile
  if (window.innerWidth <= 768) menu.style.display = "none";

  hamburger.addEventListener("click", () => {
    // Toggle menu visibility
    if (menu.style.display === "none" || menu.style.display === "") {
      menu.style.display = "flex";
      hamburger.innerHTML = "close"; // X icon
      menu.classList.add("show");
    } else {
      menu.style.display = "none";
      hamburger.innerHTML = "menu"; // = icon (hamburger)
      menu.classList.remove("show");
    }
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) menu.style.display = "flex";
    else if (!menu.classList.contains("show")) menu.style.display = "none";
  });

  // Close menu when clicking on a link
  const menuLinks = document.querySelectorAll("#menu a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        menu.style.display = "none";
        hamburger.innerHTML = "menu"; // = icon
        menu.classList.remove("show");
      }
    });
  });
});
