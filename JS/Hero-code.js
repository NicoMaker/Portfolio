// Hero-code.js
// Anima il pannello "codice" nella hero, al posto della classica
// illustrazione/cubo 3D.
//
// Non contiene più i dati: legge solo window.HeroFiles, popolato dai file
// in JS/hero-panel/*.js (uno per ogni funzionalità: config, contatti, cv,
// progetti, api-movimenti). Basta caricare quegli script PRIMA di questo
// in index.html.
document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("heroCodeBody");
  const files = window.HeroFiles || [];
  if (!body || files.length === 0) return;

  const panel = body.closest(".code-float-panel");
  const filenameEl = panel
    ? panel.querySelector(".terminal-filename")
    : document.querySelector(".terminal-filename");

  // Digitazione più rapida su schermi piccoli, così il ciclo tra i 5 file
  // non risulta troppo lungo su mobile.
  const isSmallScreen = window.matchMedia("(max-width: 480px)").matches;
  const CHAR_DELAY = isSmallScreen ? 8 : 12;
  const TOKEN_DELAY = isSmallScreen ? 8 : 12;
  const PAUSE_BETWEEN_FILES = 1400;

  function clearBody() {
    body.innerHTML = "";
  }

  function addBlinkCursor() {
    const old = body.querySelector(".code-cursor-blink");
    if (old) old.remove();
    const cursor = document.createElement("span");
    cursor.className = "code-cursor-blink";
    body.appendChild(cursor);
  }

  function typeLines(lines, lineIndex, onComplete) {
    if (lineIndex >= lines.length) {
      onComplete();
      return;
    }

    const lineEl = document.createElement("div");
    body.appendChild(lineEl);
    body.scrollTop = body.scrollHeight;
    const tokens = lines[lineIndex];
    let tokenIndex = 0;

    function typeToken() {
      if (tokenIndex >= tokens.length) {
        typeLines(lines, lineIndex + 1, onComplete);
        return;
      }
      const token = tokens[tokenIndex];

      if (!token.v) {
        tokenIndex++;
        typeToken();
        return;
      }

      const span = document.createElement("span");
      if (token.t) span.className = token.t;
      lineEl.appendChild(span);

      let charIndex = 0;
      function typeChar() {
        charIndex++;
        span.textContent = token.v.substring(0, charIndex);
        if (charIndex < token.v.length) {
          setTimeout(typeChar, CHAR_DELAY);
        } else {
          tokenIndex++;
          setTimeout(typeToken, TOKEN_DELAY);
        }
      }
      typeChar();
    }

    typeToken();
  }

  function runFile(fileIndex) {
    const file = files[fileIndex];
    clearBody();
    if (filenameEl) filenameEl.textContent = file.name;

    // File con molte righe (es. la query SQL) -> modalità compatta,
    // così entra meglio nel pannello senza deformarlo o far scrollare troppo.
    const COMPACT_THRESHOLD = 14;
    if (panel) {
      panel.classList.toggle(
        "code-compact",
        file.lines.length > COMPACT_THRESHOLD,
      );
    }

    typeLines(file.lines, 0, () => {
      addBlinkCursor();
      // Mentre digita, se il contenuto supera l'altezza visibile,
      // tiene lo scroll ancorato in fondo (dove sta scrivendo il cursore).
      body.scrollTop = body.scrollHeight;
      setTimeout(() => {
        const nextIndex = (fileIndex + 1) % files.length;
        runFile(nextIndex);
      }, PAUSE_BETWEEN_FILES);
    });
  }

  // Avvia la digitazione poco dopo il caricamento, così è pronta quando
  // il loader iniziale si dissolve.
  setTimeout(() => {
    runFile(0);
  }, 600);
});
