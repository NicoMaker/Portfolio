document.addEventListener("DOMContentLoaded", () => {
  // INTERCETTA I CLICK SUL LOGO NEL MENU HAMBURGER A LIVELLO GLOBALE
  document.addEventListener(
    "click",
    (e) => {
      if (e.target.closest(".avatar-menu")) {
        e.preventDefault();
        e.stopImmediatePropagation();
        startLoaderAnimation();
        return false;
      }
    },
    true,
  );

  // Rimuovi hash dall'URL e vai all'inizio
  if (window.location.hash) {
    window.scrollTo(0, 0);
    history.replaceState(null, document.title, window.location.pathname);
  }

  // Riferimenti DOM
  const loader = document.querySelector(".loader");
  const progress = document.querySelector(".progress");
  const terminalBody = document.querySelector("#terminalBody");
  const loaderPortfolio = document.querySelector(".loader-portfolio");

  // ----- RIGHE DI CODICE COMPLETE (con sede, stack, contatti, disponibile, cv, progetti) -----
  const codeLines = [
    [
      { t: "tk-keyword", v: "const" },
      { t: "", v: " " },
      { t: "tk-key", v: "developer" },
      { t: "tk-punct", v: " = {" },
    ],
    [
      { t: "", v: "  " },
      { t: "tk-key", v: "name" },
      { t: "tk-punct", v: ": " },
      { t: "tk-string", v: "'Nicola Marano'" },
      { t: "tk-punct", v: "," },
    ],
    [
      { t: "", v: "  " },
      { t: "tk-key", v: "role" },
      { t: "tk-punct", v: ": " },
      { t: "tk-string", v: "'Full-Stack Developer'" },
      { t: "tk-punct", v: "," },
    ],
    // ---- sede ----
    [
      { t: "", v: "  " },
      { t: "tk-key", v: "sede" },
      { t: "tk-punct", v: ": " },
      { t: "tk-string", v: "'Italia'" },
      { t: "tk-punct", v: "," },
    ],
    // ---- stack ----
    [
      { t: "", v: "  " },
      { t: "tk-key", v: "stack" },
      { t: "tk-punct", v: ": [" },
      { t: "tk-string", v: "'JavaScript'" },
      { t: "tk-punct", v: ", " },
      { t: "tk-string", v: "'Node.js'" },
      { t: "tk-punct", v: ", " },
      { t: "tk-string", v: "'Express'" },
      { t: "tk-punct", v: ", " },
      { t: "tk-string", v: "'SQLite3'" },
      { t: "tk-punct", v: "]," },
    ],
    [
      { t: "", v: "  " },
      { t: "tk-key", v: "focus" },
      { t: "tk-punct", v: ": " },
      { t: "tk-string", v: "'UI/UX & clean code'" },
      { t: "tk-punct", v: "," },
    ],
    // ---- disponibile ----
    [
      { t: "", v: "  " },
      { t: "tk-key", v: "disponibile" },
      { t: "tk-punct", v: ": " },
      { t: "tk-bool", v: "true" },
      { t: "tk-punct", v: "," },
    ],
    // ---- contatti ----
    [
      { t: "", v: "  " },
      { t: "tk-key", v: "contatti" },
      { t: "tk-punct", v: ": {" },
    ],
    [
      { t: "", v: "    " },
      { t: "tk-key", v: "email" },
      { t: "tk-punct", v: ": " },
      { t: "tk-string", v: "'nicola.marano@email.com'" },
      { t: "tk-punct", v: "," },
    ],
    [
      { t: "", v: "    " },
      { t: "tk-key", v: "telefono" },
      { t: "tk-punct", v: ": " },
      { t: "tk-string", v: "'+39 333 702 4320'" },
      { t: "tk-punct", v: "," },
    ],
    [
      { t: "", v: "  " },
      { t: "tk-punct", v: "}," },
    ],
    // ---- cv ----
    [
      { t: "", v: "  " },
      { t: "tk-key", v: "cv" },
      { t: "tk-punct", v: ": " },
      { t: "tk-string", v: "'/CV/CV.pdf'" },
      { t: "tk-punct", v: "," },
    ],
    // ---- progetti ----
    [
      { t: "", v: "  " },
      { t: "tk-key", v: "progetti" },
      { t: "tk-punct", v: ": [" },
      { t: "tk-string", v: "'Gestione Fiscale'" },
      { t: "tk-punct", v: ", " },
      { t: "tk-string", v: "'Gestione Magazzino'" },
      { t: "tk-punct", v: ", " },
      { t: "tk-string", v: "'Gestione Preventivi'" },
      { t: "tk-punct", v: ", " },
      { t: "tk-string", v: "'Macelleria Da Ketti'" },
      { t: "tk-punct", v: ", " },
      { t: "tk-string", v: "'Da Prat Falegnameria'" },
      { t: "tk-punct", v: ", " },
      { t: "tk-string", v: "'IdeaLegno'" },
      { t: "tk-punct", v: "]," },
    ],
    [{ t: "tk-punct", v: "};" }],
    [{ t: "tk-comment", v: "// caricamento portfolio in corso..." }],
  ];

  // Funzione per avviare l'animazione del loader
  function startLoaderAnimation() {
    loader.style.display = "flex";
    loader.style.opacity = "1";
    progress.style.width = "0%";
    if (loaderPortfolio) loaderPortfolio.style.opacity = "0.6";
    if (terminalBody) terminalBody.innerHTML = "";

    typeCodeLines(0, () => {
      setTimeout(() => {
        startProgressBar();
      }, 350);
    });
  }

  // Effetto "macchina da scrivere"
  function typeCodeLines(lineIndex, onComplete) {
    if (!terminalBody) {
      onComplete();
      return;
    }
    if (lineIndex >= codeLines.length) {
      onComplete();
      return;
    }

    const lineEl = document.createElement("div");
    terminalBody.appendChild(lineEl);
    const tokens = codeLines[lineIndex];
    let tokenIndex = 0;
    let charIndex = 0;

    function typeNextChar() {
      if (tokenIndex >= tokens.length) {
        typeCodeLines(lineIndex + 1, onComplete);
        return;
      }
      const token = tokens[tokenIndex];
      const span =
        lineEl.lastElementChild &&
        lineEl.lastElementChild.dataset.tokenIndex == tokenIndex
          ? lineEl.lastElementChild
          : (() => {
              const s = document.createElement("span");
              if (token.t) s.className = token.t;
              s.dataset.tokenIndex = tokenIndex;
              lineEl.appendChild(s);
              return s;
            })();

      charIndex++;
      span.textContent = token.v.substring(0, charIndex);

      if (charIndex >= token.v.length) {
        tokenIndex++;
        charIndex = 0;
        setTimeout(typeNextChar, 14);
      } else {
        setTimeout(typeNextChar, 14);
      }
    }

    typeNextChar();
  }

  // Avvia loader iniziale
  startLoaderAnimation();

  // Barra di progresso
  function startProgressBar() {
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
            navigateToHome();
          }, 500);
        }, 500);
      }
    }, 20);
  }

  // Naviga alla home
  function navigateToHome() {
    history.replaceState(null, document.title, window.location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) homeLink.click();

    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === "#home") {
        link.classList.add("active-link");
      } else {
        link.classList.remove("active-link");
      }
    });

    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");
    const hamburgerIcon = document.getElementById("hamburger-icon");
    if (menu && menu.classList.contains("active")) {
      menu.classList.remove("active");
      hamburger.classList.remove("active");
      hamburgerIcon.classList.remove("bx-x");
      hamburgerIcon.classList.add("bx-menu");
    }
  }

  // Click sul logo header
  const headerLogo = document.querySelector("header .logo");
  if (headerLogo) {
    headerLogo.addEventListener("click", (e) => {
      e.preventDefault();
      startLoaderAnimation();
    });
  }

  // Caricamento frasi per il typing effect
  async function loadPhrasesAndStartTyping() {
    try {
      const response = await fetch("JSON/phares.json");
      const data = await response.json();
      startTypingEffect(data.typingPhrases);
    } catch (error) {
      console.error("Errore nel caricamento del file phrases.json:", error);
      const fallbackPhrases = [
        "Web Developer",
        "Frontend Developer",
        "Programmatore",
        "Problem Solver",
        "Programmatore base HTML, CSS e JavaScript",
      ];
      startTypingEffect(fallbackPhrases);
    }
  }

  // Typing effect
  function startTypingEffect(phrases) {
    const dynamicText = document.querySelector(".dynamic-text");
    if (!dynamicText) return;

    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };
    shuffle(phrases);

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
      const currentPhrase = phrases[phraseIndex];
      if (!currentPhrase) return;

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
  }

  loadPhrasesAndStartTyping();

  // Scroll reveal
  const revealElements = document.querySelectorAll(
    ".reveal-left, .reveal-right, .reveal-top, .reveal-bottom",
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

  // Back to top
  const backToTopBtn = document.querySelector(".back-to-top");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      backToTopBtn.classList.toggle("visible", window.scrollY > 300);
    });
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Animazione iniziale elementi
  function animateElements() {
    const left = document.querySelector(".reveal-left");
    const right = document.querySelector(".reveal-right");
    if (left) left.classList.add("active");
    if (right) right.classList.add("active");

    const sections = document.querySelectorAll(".curriculum-part");
    sections.forEach((section) => {
      const cards = section.querySelectorAll(".card");
      cards.forEach((card, cardIndex) => {
        card.style.setProperty("--i", cardIndex + 1);
      });
    });
  }

  // Gestione link interni
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (this.getAttribute("href") === "#home") {
        history.replaceState(null, document.title, window.location.pathname);
      }
    });
  });

  // Evento beforeunload (opzionale)
  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("reloading", "true");
  });

  if (sessionStorage.getItem("reloading") === "true") {
    sessionStorage.removeItem("reloading");
    window.scrollTo(0, 0);
  }
});
