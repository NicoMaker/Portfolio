const button = document.getElementById("cv-button");
const fileUrl = "CV/CV.pdf";

button.addEventListener("click", (e) => {
  e.preventDefault(); // Evita il comportamento standard del link

  // 1. Apri il PDF in una nuova scheda
  window.open(fileUrl, "_blank");

  // 2. Crea un link temporaneo per forzare il download
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileUrl;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});
