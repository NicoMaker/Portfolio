document.addEventListener("DOMContentLoaded", () => {
  // INTERCETTA I CLICK SUL LOGO NEL MENU HAMBURGER A LIVELLO GLOBALE
  document.addEventListener('click', (e) => {
    // Se il click è sul logo avatar nel menu hamburger
    if (e.target.closest('.avatar-menu')) {
      e.preventDefault()
      e.stopImmediatePropagation()

      // Avvia direttamente l'animazione del loader
      startLoaderAnimation()
      return false
    }
  }, true) // Capture phase - si attiva PRIMA di tutti gli altri handler

  // Assicurati che la pagina venga sempre caricata all'inizio (home page)
  if (window.location.hash) {
    // Se c'è un hash nell'URL (ad esempio #curriculum), lo rimuoviamo
    window.scrollTo(0, 0)
    history.replaceState(null, document.title, window.location.pathname)
  }

  // Loader animation
  const loader = document.querySelector(".loader")
  const progress = document.querySelector(".progress")
  const loaderLogo = document.querySelector(".loader-logo img")
  const loaderAvatar = document.querySelector(".loader-avatar-img")
  const loaderPortfolio = document.querySelector(".loader-portfolio")

  // Funzione per avviare l'animazione del loader
  function startLoaderAnimation() {
    // Reset degli stili del loader
    loader.style.display = "flex"
    loader.style.opacity = "1"
    progress.style.width = "0%"

    // Reset degli elementi del loader
    loaderAvatar.style.opacity = "0"
    loaderAvatar.style.transform = "translateY(20px)"
    loaderLogo.style.opacity = "0"
    loaderLogo.style.transform = "scale(0.8)"
    loaderPortfolio.style.opacity = "0"
    loaderPortfolio.style.transform = "translateY(20px)"

    // Anima l'avatar dopo 300ms
    setTimeout(() => {
      loaderAvatar.style.transition = "all 0.8s ease"
      loaderAvatar.style.opacity = "1"
      loaderAvatar.style.transform = "translateY(0)"

      // Anima il logo dopo che l'avatar è apparso
      setTimeout(() => {
        loaderLogo.style.transition = "all 0.8s ease"
        loaderLogo.style.opacity = "1"
        loaderLogo.style.transform = "scale(1)"

        // Anima la scritta Portfolio dopo che il logo è apparso
        setTimeout(() => {
          loaderPortfolio.style.transition = "all 0.8s ease"
          loaderPortfolio.style.opacity = "1"
          loaderPortfolio.style.transform = "translateY(0)"

          // Inizia la barra di progresso dopo che tutti gli elementi sono apparsi
          setTimeout(() => {
            startProgressBar()
          }, 500)
        }, 600)
      }, 600)
    }, 300)
  }

  // Avvia l'animazione del loader iniziale
  startLoaderAnimation()

  // Funzione per avviare la barra di progresso
  function startProgressBar() {
    let width = 0
    const interval = setInterval(() => {
      width += 1
      progress.style.width = width + "%"

      if (width >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          loader.style.opacity = "0"
          setTimeout(() => {
            loader.style.display = "none"
            animateElements()

            // Naviga esplicitamente alla home page
            navigateToHome()
          }, 500)
        }, 500)
      }
    }, 20)
  }

  // Aggiungi questa nuova funzione per navigare alla home page
  function navigateToHome() {
    // Rimuovi qualsiasi hash dall'URL
    history.replaceState(null, document.title, window.location.pathname)

    // Scorri all'inizio della pagina
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })

    // Se esiste un link alla home page, simulane il click
    const homeLink = document.querySelector('a[href="#home"]')
    if (homeLink) {
      homeLink.click()
    }

    // Attiva la classe active sul link della home nel menu di navigazione
    const navLinks = document.querySelectorAll("nav ul li a")
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === "#home") {
        link.classList.add("active-link")
      } else {
        link.classList.remove("active-link")
      }
    })

    // Chiudi il menu hamburger se è aperto
    const hamburger = document.getElementById("hamburger")
    const menu = document.getElementById("menu")
    const hamburgerIcon = document.getElementById("hamburger-icon")

    if (menu && menu.classList.contains("active")) {
      menu.classList.remove("active")
      hamburger.classList.remove("active")
      hamburgerIcon.classList.remove("bx-x")
      hamburgerIcon.classList.add("bx-menu")
    }
  }

  // Gestione click sui loghi (header)
  const headerLogo = document.querySelector('header .logo')

  // Click sul logo nell'header
  if (headerLogo) {
    headerLogo.addEventListener('click', (e) => {
      e.preventDefault()
      startLoaderAnimation()
    })
  }

  // Il click sul logo nell'hamburger menu è già gestito dall'event listener globale sopra

  // Custom cursor
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px"
      cursorFollower.style.top = e.clientY + "px"
    }, 100)
  })

  // Hover effect on links and buttons
  const links = document.querySelectorAll("a, button")
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorFollower.style.width = "40px"
      cursorFollower.style.height = "40px"
      cursorFollower.style.borderColor = "rgba(37, 99, 235, 0.2)"
    })

    link.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.width = "30px"
      cursorFollower.style.height = "30px"
      cursorFollower.style.borderColor = "var(--primary)"
    })
  })

  // Carica le frasi dal file JSON e avvia l'effetto typing
  async function loadPhrasesAndStartTyping() {
    try {
      const response = await fetch('JSON/phrases.json')
      const data = await response.json()
      startTypingEffect(data.typingPhrases)
    } catch (error) {
      console.error('Errore nel caricamento del file phrases.json:', error)
      // Fallback con frasi predefinite
      const fallbackPhrases = [
        "Web Developer",
        "UI/UX Designer",
        "Frontend Developer",
        "Programmatore",
        "Grafico Digitale",
        "Appassionato di Videomaking",
        "Creativo",
        "Problem Solver",
        "Programmatore base HTML, CSS e JavaScript"
      ]
      startTypingEffect(fallbackPhrases)
    }
  }

  // Typing effect
  function startTypingEffect(phrases) {
    const dynamicText = document.querySelector(".dynamic-text")

    // Funzione per mescolare le frasi
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
          ;[array[i], array[j]] = [array[j], array[i]]
      }
    }

    shuffle(phrases) // Mescola le frasi

    let phraseIndex = 0
    let charIndex = 0
    let isDeleting = false

    const typeEffect = () => {
      const currentPhrase = phrases[phraseIndex]

      if (isDeleting) {
        dynamicText.textContent = currentPhrase.substring(0, charIndex - 1)
        charIndex--
      } else {
        dynamicText.textContent = currentPhrase.substring(0, charIndex + 1)
        charIndex++
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true
        setTimeout(typeEffect, 1500)
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        phraseIndex = (phraseIndex + 1) % phrases.length
        setTimeout(typeEffect, 500)
      } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100)
      }
    }

    setTimeout(typeEffect, 1000)
  }

  // Avvia il caricamento delle frasi e l'effetto typing
  loadPhrasesAndStartTyping()

  // Scroll reveal animation
  const revealElements = document.querySelectorAll(".reveal-left, .reveal-right, .reveal-top, .reveal-bottom")

  const revealOnScroll = () => {
    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementTop < windowHeight - 100) {
        element.classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", revealOnScroll)

  // Back to top button
  const backToTopBtn = document.querySelector(".back-to-top")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible")
    } else {
      backToTopBtn.classList.remove("visible")
    }
  })

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Initial animation of elements
  function animateElements() {
    document.querySelector(".reveal-left").classList.add("active")
    document.querySelector(".reveal-right").classList.add("active")

    // Add animation delay to cards
    const sections = document.querySelectorAll(".section")
    sections.forEach((section, sectionIndex) => {
      const cards = section.querySelectorAll(".card")
      cards.forEach((card, cardIndex) => {
        card.style.setProperty("--i", cardIndex + 1)
      })
    })
  }

  // Gestisci i link interni per assicurarti che tornino alla home quando si ricarica la pagina
  const internalLinks = document.querySelectorAll('a[href^="#"]')
  internalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Salva l'hash nella cronologia, ma non impedisce il comportamento predefinito
      // Questo permette di navigare normalmente all'interno della pagina
      const hash = this.getAttribute("href")
      if (hash === "#home") {
        // Se è un link alla home, rimuovi qualsiasi hash
        history.replaceState(null, document.title, window.location.pathname)
      }
    })
  })

  // Aggiungi un listener per l'evento beforeunload per assicurarti che la pagina venga ricaricata all'inizio
  window.addEventListener("beforeunload", () => {
    // Questo non fa nulla direttamente, ma quando la pagina si ricarica,
    // il codice all'inizio di questo script rimuoverà qualsiasi hash e scorrerà all'inizio
    sessionStorage.setItem("reloading", "true")
  })

  // Controlla se stiamo ricaricando la pagina
  if (sessionStorage.getItem("reloading") === "true") {
    sessionStorage.removeItem("reloading")
    // Assicurati che siamo all'inizio della pagina
    window.scrollTo(0, 0)
  }
})