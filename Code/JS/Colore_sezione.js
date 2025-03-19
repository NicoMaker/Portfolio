document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section"),
    navLinks = document.querySelectorAll("nav ul li a");

  function changeActiveMenu() {
    let currentSection = "home";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3)
        currentSection = section.getAttribute("id");
    });

    navLinks.forEach((link) => {
      link.classList.remove("active-link");
      link.style.color = "white";
      if (link.getAttribute("href").includes(currentSection)) {
        link.classList.add("active-link");
        link.style.color = "yellow"; 
      }
    });
  }

  window.addEventListener("scroll", changeActiveMenu);
  changeActiveMenu();
});
