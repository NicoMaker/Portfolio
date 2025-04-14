document.addEventListener("DOMContentLoaded", () => {
  // Loader animation
  const loader = document.querySelector(".loader");
  const progress = document.querySelector(".progress");

  let width = 0;
  const interval = setInterval(() => {
    width += 1;
    progress.style.width = width + "%";

    if (width >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.style.display = "none";
          animateElements();
        }, 500);
      }, 500);
    }
  }, 20);

  // Custom cursor
  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px";
      cursorFollower.style.top = e.clientY + "px";
    }, 100);
  });

  // Hover effect on links and buttons
  const links = document.querySelectorAll("a, button");
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursorFollower.style.width = "40px";
      cursorFollower.style.height = "40px";
      cursorFollower.style.borderColor = "rgba(37, 99, 235, 0.2)";
    });

    link.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursorFollower.style.width = "30px";
      cursorFollower.style.height = "30px";
      cursorFollower.style.borderColor = "var(--primary)";
    });
  });

  // Typing effect
  const dynamicText = document.querySelector(".dynamic-text");
  const phrases = [
    "Web Developer",
    "UI/UX Designer",
    "Frontend Developer",
    "Programmatore",
    "Grafico Digitale",
    "Appassionato di Videomaking",
    "Creativo",
    "Problem Solver",
    "Esperto HTML, CSS e JavaScript",
  ];

  // Funzione per mescolare le frasi
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  shuffle(phrases); // Mescola le frasi

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeEffect = () => {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      dynamicText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      dynamicText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeEffect, 500);
    } else {
      setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
  };

  setTimeout(typeEffect, 1000);

  // Scroll reveal animation
  const revealElements = document.querySelectorAll(
    ".reveal-left, .reveal-right, .reveal-top, .reveal-bottom"
  );

  const revealOnScroll = () => {
    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);

  // Back to top button
  const backToTopBtn = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Initial animation of elements
  function animateElements() {
    document.querySelector(".reveal-left").classList.add("active");
    document.querySelector(".reveal-right").classList.add("active");

    // Add animation delay to cards
    const sections = document.querySelectorAll(".section");
    sections.forEach((section, sectionIndex) => {
      const cards = section.querySelectorAll(".card");
      cards.forEach((card, cardIndex) => {
        card.style.setProperty("--i", cardIndex + 1);
      });
    });
  }

  // Modify hamburger.js to use boxicons
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");
  if (hamburger) {
    const originalClickHandler = hamburger.onclick;
    hamburger.onclick = function () {
      if (menu.classList.contains("show")) {
        hamburger.innerHTML = "<i class='bx bx-menu'></i>";
      } else {
        hamburger.innerHTML = "<i class='bx bx-x'></i>";
      }
      if (originalClickHandler) originalClickHandler.call(this);
    };
  }
});
