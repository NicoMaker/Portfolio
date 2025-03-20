document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section"),
    navLinks = document.querySelectorAll("nav ul li a");

  function changeActiveMenu() {
    let currentSection = "home";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop,
        sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3)
        currentSection = section.getAttribute("id");
    });

    navLinks.forEach((link) => {
      link.classList.remove("active-link");
      link.style.color = ""; // Reset to default CSS value
      if (link.getAttribute("href").includes(currentSection))
        link.classList.add("active-link");
    });
  }

  window.addEventListener("scroll", changeActiveMenu);
  changeActiveMenu();
});
