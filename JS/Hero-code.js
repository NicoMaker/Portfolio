// Anima il pannello "codice" nella hero con i dati reali del portfolio,
// al posto della classica illustrazione/cubo 3D.
document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("heroCodeBody");
  if (!body) return;

  const codeLines = [
    [
      { t: "tk-keyword", v: "const" },
      { t: "", v: " " },
      { t: "tk-key", v: "nicolaMarano" },
      { t: "tk-punct", v: " = {" },
    ],
    [
      { t: "", v: "  " },
      { t: "tk-key", v: "ruolo" },
      { t: "tk-punct", v: ": " },
      { t: "tk-string", v: "'Web Developer'" },
      { t: "tk-punct", v: "," },
    ],
    [
      { t: "", v: "  " },
      { t: "tk-key", v: "sede" },
      { t: "tk-punct", v: ": " },
      { t: "tk-string", v: "'Italia'" },
      { t: "tk-punct", v: "," },
    ],
    [
      { t: "", v: "  " },
      { t: "tk-key", v: "stack" },
      { t: "tk-punct", v: ": [" },
      { t: "tk-string", v: "'JavaScript'" },
      { t: "tk-punct", v: ", " },
      { t: "tk-string", v: "'React'" },
      { t: "tk-punct", v: ", " },
      { t: "tk-string", v: "'Node.js'" },
      { t: "tk-punct", v: "]," },
    ],
    [
      { t: "", v: "  " },
      { t: "tk-key", v: "focus" },
      { t: "tk-punct", v: ": " },
      { t: "tk-string", v: "'UI/UX & clean code'" },
      { t: "tk-punct", v: "," },
    ],
    [
      { t: "", v: "  " },
      { t: "tk-key", v: "disponibile" },
      { t: "tk-punct", v: ": " },
      { t: "tk-bool", v: "true" },
      { t: "tk-punct", v: "," },
    ],
    [{ t: "tk-punct", v: "};" }],
  ];

  function typeLines(lineIndex, onComplete) {
    if (lineIndex >= codeLines.length) {
      onComplete();
      return;
    }

    const lineEl = document.createElement("div");
    body.appendChild(lineEl);
    const tokens = codeLines[lineIndex];
    let tokenIndex = 0;

    function typeToken() {
      if (tokenIndex >= tokens.length) {
        typeLines(lineIndex + 1, onComplete);
        return;
      }
      const token = tokens[tokenIndex];
      const span = document.createElement("span");
      if (token.t) span.className = token.t;
      lineEl.appendChild(span);

      let charIndex = 0;
      function typeChar() {
        charIndex++;
        span.textContent = token.v.substring(0, charIndex);
        if (charIndex < token.v.length) {
          setTimeout(typeChar, 12);
        } else {
          tokenIndex++;
          setTimeout(typeToken, 12);
        }
      }
      typeChar();
    }

    typeToken();
  }

  function addBlinkCursor() {
    const cursor = document.createElement("span");
    cursor.className = "code-cursor-blink";
    body.appendChild(cursor);
  }

  // Avvia la digitazione poco dopo il caricamento, così è pronta
  // quando il loader iniziale si dissolve.
  setTimeout(() => {
    typeLines(0, addBlinkCursor);
  }, 600);
});
