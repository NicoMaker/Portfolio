document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Carica i dati dal file JSON
    const response = await fetch("JSON/Social.json");
    if (!response.ok) throw new Error("Errore nel caricamento dei dati social");
    const data = await response.json();

    // Renderizza i link social
    renderSocialLinks(data.socialLinks);
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
});

// Funzione per renderizzare i link social
function renderSocialLinks(socialLinks) {
  const container = document.querySelector(".social-links");
  if (!container) return;

  container.innerHTML = "";

  socialLinks.forEach((link) => {
    const socialLink = document.createElement("a");
    socialLink.href = link.url;
    socialLink.target = "_blank";
    (socialLink.className = "icona"), (icon = document.createElement("img"));
    icon.className = "icona";
    icon.src = link.icon;
    icon.alt = link.alt;

    socialLink.appendChild(icon);
    container.appendChild(socialLink);
  });
}
