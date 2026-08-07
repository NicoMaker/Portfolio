function generateFallbackData() {
  console.log("Curriculum.js: Generating fallback data");
  return {
    attestati: [
      {
        titolo: "Esempio Attestato",
        descrizione: "Questo è un esempio di attestato generato come fallback.",
        certificato: "",
      },
    ],
    linguistiche: [
      {
        lingua: "Inglese",
        livello: "B1",
        immagine: "/placeholder.svg?height=100&width=100",
        link: "#",
      },
    ],
    esperienze: [
      {
        azienda: "Azienda Esempio",
        ruolo: "Sviluppatore",
        periodo: "2023 - Presente",
        luogo: "Italia",
        attivita: ["Sviluppo web", "Programmazione"],
        logo: "/placeholder.svg?height=64&width=64",
        sito: "#",
      },
    ],
    istruzione: [
      {
        titolo: "Laurea in Informatica",
        istituto: "Università",
        periodo: "2020 - 2023",
        luogo: "Italia",
        logo: "/placeholder.svg?height=64&width=64",
        sito: "#",
      },
    ],
    competenze: [
      {
        nome: "HTML",
        descrizione: "Competenze in HTML",
        immagine: "/placeholder.svg?height=64&width=64",
        link: "#",
        categoria: "Frontend",
      },
      {
        nome: "CSS",
        descrizione: "Competenze in CSS",
        immagine: "/placeholder.svg?height=64&width=64",
        link: "#",
        categoria: "Frontend",
      },
      {
        nome: "JavaScript",
        descrizione: "Competenze in JavaScript",
        immagine: "/placeholder.svg?height=64&width=64",
        link: "#",
        categoria: "Frontend",
      },
    ],
    sites: [
      {
        nome: "Portfolio",
        immagine: "/placeholder.svg?height=200&width=300",
        link: "#",
        codice: "#",
      },
    ],
  };
}
