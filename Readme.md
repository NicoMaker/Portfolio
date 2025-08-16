### Documentazione Portfolio di Nicola Marano github

## Indice

1. [Panoramica](#panoramica)
2. [Struttura del Progetto](#struttura-del-progetto)
3. [Componenti Principali](#componenti-principali)
4. [Funzionalità](#funzionalità)
5. [Tecnologie Utilizzate](#tecnologie-utilizzate)
6. [Architettura](#architettura)
7. [Responsive Design](#responsive-design)
8. [Animazioni](#animazioni)
9. [Gestione Dati](#gestione-dati)
10. [Istruzioni per lo Sviluppo](#istruzioni-per-lo-sviluppo)
11. [File di Riferimento](#file-di-riferimento)

## Panoramica

Il portfolio di Nicola Marano è un sito web personale che presenta le competenze, l'esperienza lavorativa, l'istruzione e i progetti sviluppati. Il sito è strutturato in tre sezioni principali: Home, Curriculum e Contatti. Il design è moderno, responsivo e include numerose animazioni ed effetti interattivi per migliorare l'esperienza utente.

## Struttura del Progetto

Il progetto è organizzato nei seguenti file e cartelle principali:

- **index.html**: Struttura principale del sito
- **style.css**: Stili e layout responsivo
- **JS/**: Cartella contenente tutti gli script JavaScript

- Animation.js: Gestisce le animazioni e gli effetti di caricamento
- Arrow.js: Gestisce la funzionalità di scorrimento
- Colore_sezione.js: Cambia il menu attivo in base alla posizione di scorrimento
- Curriculum.js: Carica e visualizza i dati del curriculum
- Fotter.js: Renderizza il footer
- Hamburger.js: Gestisce il menu mobile
- mailto.js: Gestisce il modulo di contatto
- Social.js: Carica i link ai social media
- Toggle-section.js: Gestisce l'espansione/compressione delle sezioni del curriculum

- **JSON/**: Cartella contenente i file di dati

- Categories.json: Dati sulle categorie di competenze
- Social.json: Dati sui link ai social media
- Curriculum.json: Dati dettagliati sul curriculum

## Componenti Principali

### 1. Header

Il header contiene il logo, la navigazione principale e un menu hamburger per dispositivi mobili. È fissato nella parte superiore della pagina e include link alle sezioni principali del sito.

```html
<header>
  <div class="container">
    <div class="header-content">
      <a href="index.html" class="logo">
        <img src="Icons/Logo_Chiaro.jpg" alt="Logo Nicola Marano" />
      </a>
      <nav>
        <ul id="menu">
          <li>
            <div class="avatar-container">
              <img
                class="avatar-menu"
                src="Icons/Avatar.jpg"
                alt="Nicola Marano"
              />
            </div>
          </li>
          <li><a class="header nav-link" href="#home">Home</a></li>
          <li><a class="header nav-link" href="#curriculum">Curriculum</a></li>
          <li><a class="header nav-link" href="#contacts">Contatti</a></li>
        </ul>
      </nav>
      <button id="hamburger" class="hamburger" aria-label="Menu">
        <i class="bx bx-menu" id="hamburger-icon"></i>
      </button>
    </div>
  </div>
</header>
```

### 2. Sezione Home

La sezione Home presenta una breve introduzione personale con un'immagine del profilo, un titolo con effetto glitch, un testo dinamico che cambia automaticamente e una descrizione personale. Include anche un pulsante per scaricare il CV.

### 3. Sezione Curriculum

La sezione Curriculum è organizzata in sottosezioni espandibili:

- Attestati
- Competenze Linguistiche
- Esperienze Lavorative
- Istruzione
- Competenze
- Siti Web

Ogni sottosezione carica i dati dinamicamente dal file Curriculum.json.

### 4. Sezione Contatti

La sezione Contatti include un modulo per inviare messaggi e una lista di link ai social media.

## Funzionalità

### Loader Animato

Il sito include un loader animato che viene visualizzato durante il caricamento iniziale della pagina.

```javascript
// Funzione per avviare la barra di progresso
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
```

### Cursore Personalizzato

Il sito implementa un cursore personalizzato che segue il movimento del mouse con effetti di hover sui link e pulsanti.

```javascript
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
```

### Effetto Typing

Un effetto di digitazione automatica che mostra diverse frasi nella sezione Home.

```javascript
const typeEffect = () => {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    dynamicText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    dynamicText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  // Logica per gestire la digitazione e cancellazione
};
```

### Sezioni Espandibili nel Curriculum

Le sezioni del curriculum possono essere espanse e compresse cliccando sui titoli.

```javascript
function toggleSection(sectionIndex) {
  const sections = document.querySelectorAll("#curriculum .section");
  const section = sections[sectionIndex];
  const cardContainer = section.querySelector(".card-container");
  const toggleIcon = section.querySelector(".toggle-icon");

  // Chiudi tutte le sezioni prima
  document
    .querySelectorAll("#curriculum .section .card-container")
    .forEach((container) => {
      container.style.display = "none";
    });

  // Logica per espandere/comprimere la sezione selezionata
}
```

### Invio Email

Il modulo di contatto permette di inviare email direttamente dal sito.

```javascript
function sendEmail(event) {
  event.preventDefault();

  // Ottieni i valori dei campi
  const fields = ["name", "cognome", "email", "telefono", "oggetto", "message"],
    [name, surname, email, telefono, oggetto, message] =
      fields.map(getInputValue);

  // Validazione e invio email
}
```

## Tecnologie Utilizzate

- **HTML5**: Struttura semantica del sito
- **CSS3**: Stili, animazioni e layout responsivo
- **JavaScript**: Interattività e funzionalità dinamiche
- **JSON**: Archiviazione e gestione dei dati
- **Boxicons**: Libreria di icone
- **AOS (Animate On Scroll)**: Animazioni al scroll
- **Vanilla-tilt.js**: Effetti di inclinazione 3D

## Architettura

Il sito segue un'architettura modulare con separazione tra:

- **Struttura** (HTML)
- **Presentazione** (CSS)
- **Comportamento** (JavaScript)
- **Dati** (JSON)

### Gestione degli Eventi

Il sito utilizza diversi event listener per gestire l'interazione dell'utente:

```javascript
// Esempio di gestione eventi
document.addEventListener("DOMContentLoaded", () => {
  // Inizializzazione componenti
  setupToggleSections();
  openSectionFromHash();

  // Event listeners
  window.addEventListener("hashchange", openSectionFromHash);
  window.addEventListener("scroll", changeActiveMenu);
  window.addEventListener("resize", handleResize);
});
```

## Responsive Design

Il sito è completamente responsivo e si adatta a diverse dimensioni di schermo:

```css
/* Responsive Design */
@media (max-width: 1024px) {
  .card {
    width: calc(50% - 1rem);
  }

  .card-container {
    max-height: 500px;
  }
}

@media (max-width: 768px) {
  .hamburger {
    display: block;
  }

  nav ul {
    display: none;
    flex-direction: column;
    position: fixed;
    /* Altri stili per il menu mobile */
  }

  /* Altri adattamenti per mobile */
}
```

## Animazioni

Il sito include numerose animazioni per migliorare l'esperienza utente:

1. **Animazioni di caricamento**: Loader iniziale con progressione
2. **Effetto Glitch**: Sul titolo principale
3. **Effetto Typing**: Testo che si digita automaticamente
4. **Animazioni al Scroll**: Elementi che appaiono durante lo scroll
5. **Hover Effects**: Su pulsanti, card e link
6. **Animazioni delle Card**: Quando si espandono le sezioni del curriculum

```css
/* Esempio di animazione */
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

.avatar {
  animation: float 6s ease-in-out infinite;
}
```

## Gestione Dati

I dati del sito sono gestiti tramite file JSON che vengono caricati dinamicamente:

### Curriculum.json

Contiene tutte le informazioni relative a:

- Attestati
- Competenze linguistiche
- Esperienze lavorative
- Istruzione
- Competenze tecniche
- Siti Web 

### Categories.json

Definisce le categorie di competenze e i tag predefiniti per i progetti.

### Social.json

Contiene i link ai social media e le relative icone.

```javascript
// Esempio di caricamento dati
async function loadCurriculumData() {
  try {
    console.log(
      `Curriculum.js: Attempting to load data from ${CONFIG.jsonPath}`
    );
    const response = await fetch(CONFIG.jsonPath);

    if (!response.ok) {
      // Gestione errori
    } else {
      STATE.curriculumData = await response.json();
      console.log("Curriculum.js: Data loaded successfully");
    }

    return STATE.curriculumData;
  } catch (error) {
    // Gestione eccezioni
  }
}
```

## Istruzioni per lo Sviluppo

### Prerequisiti

- Editor di testo (VS Code consigliato)
- Browser moderno
- Conoscenza di HTML, CSS e JavaScript

### Struttura delle Cartelle

```plaintext
portfolio/
├── index.html
├── style.css
├── JS/
│   ├── Animation.js
│   ├── Arrow.js
│   ├── Colore_sezione.js
│   ├── Curriculum.js
│   ├── Fotter.js
│   ├── Hamburger.js
│   ├── mailto.js
│   ├── Social.js
│   └── Toggle-section.js
├── JSON/
│   ├── Categories.json
│   ├── Curriculum.json
│   └── Social.json
├── Icons/
│   └── [varie icone e immagini]
├── Loghi/
│   └── [loghi aziende e istituzioni]
└── Web_Site/
    └── [screenshot dei progetti]
```

### Modificare i Contenuti

Per aggiornare i contenuti del sito, modificare i file JSON corrispondenti:

1. **Curriculum.json**: Per aggiornare esperienze, competenze, istruzione, ecc.
2. **Social.json**: Per aggiornare i link ai social media
3. **Categories.json**: Per modificare le categorie di competenze

### Personalizzazione dello Stile

Il file `style.css` contiene tutte le regole di stile del sito. Le variabili CSS all'inizio del file permettono di modificare facilmente i colori e altri aspetti visivi:

```css
:root {
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --primary-light: #60a5fa;
  --secondary: white;
  --text-dark: #1e293b;
  --text-light: #f8fafc;
  --text-muted: #64748b;
  --background: white;
  --card-bg: #ffffff;
  --border-radius: 12px;
  /* altre variabili */
}
```

## File di Riferimento

Di seguito sono elencati i link ai file principali del progetto:

### File HTML

- [index.html](index.html) - File HTML principale del sito

### File CSS

- [style.css](style.css) - File CSS con tutti gli stili del sito

### File JavaScript

- [Animation.js](Js/Animation.js) - Gestisce le animazioni del sito
- [Arrow.js](JS/Arrow.js) - Gestisce la funzionalità di scorrimento
- [Colore_sezione.js](JS/Colore_sezione.js) - Gestisce il cambio di colore delle sezioni
- [Curriculum.js](JS/Curriculum.js) - Carica e visualizza i dati del curriculum
- [Fotter.js](JS/Fotter.js) - Renderizza il footer
- [Hamburger.js](JS/Hamburger.js) - Gestisce il menu hamburger per dispositivi mobili
- [mailto.js](JS/mailto.js) - Gestisce l'invio di email dal modulo di contatto
- [Social.js](JS/Social.js) - Carica i link ai social media
- [Toggle-section.js](JS/Toggle-section.js) - Gestisce l'espansione/compressione delle sezioni del curriculum

### File JSON

- [Categories.json](JSON/Categories.json) - Contiene le categorie di competenze
- [Social.json](JSON/Social.json) - Contiene i link ai social media
- [Curriculum.json](JSON/Curriculum.json) - Contiene tutti i dati del curriculum

