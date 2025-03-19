document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Carica i dati dal file JSON
    const response = await fetch("JSON/Currculum.json");
    if (!response.ok) throw new Error("Errore nel caricamento dei dati");
    const data = await response.json();

    // Renderizza le diverse sezioni
    renderAttestati(data.attestati);
    renderLinguistiche(data.linguistiche);
    renderEsperienze(data.esperienze);
    renderIstruzione(data.istruzione);
    renderCompetenze(data.competenze);
    renderWebSite(data.sites);
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
});

// Funzione per renderizzare gli attestati
function renderAttestati(attestati) {
  const container = document.querySelector(
    "#curriculum .section:nth-of-type(1) .card-container"
  );
  if (!container) return;

  container.innerHTML = "";

  attestati.forEach((attestato) => {
    const card = document.createElement("div");
    card.className = "card";

    let html = `
        <h4>${attestato.titolo}</h4>
        <p>${attestato.descrizione}</p>
      `;

    // Aggiungi il link per scaricare il certificato solo se esiste
    if (attestato.certificato)
      html += `<a href="${attestato.certificato}" download>Scarica Certificato</a>`;
    else html += `<a href="" download>Scarica Certificato</a>`;

    card.innerHTML = html;
    container.appendChild(card);
  });
}

// Funzione per renderizzare le competenze linguistiche
function renderLinguistiche(linguistiche) {
  const container = document.querySelector(
    "#curriculum .section:nth-of-type(2) .card-container"
  );
  if (!container) return;

  container.innerHTML = "";

  linguistiche.forEach((lingua) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <img src="${lingua.immagine}" alt="Bandiera ${lingua.lingua}" />
        <h4>${lingua.lingua}</h4>
        <p><strong>Livello:</strong> ${lingua.livello}</p>
        <a href="${lingua.link}" target="_blank">Impara la lingua</a>
      `;

    container.appendChild(card);
  });
}

// Funzione per renderizzare le esperienze lavorative
function renderEsperienze(esperienze) {
  const container = document.querySelector(
    "#curriculum .section:nth-of-type(3) .card-container"
  );
  if (!container) return;

  container.innerHTML = "";

  esperienze.forEach((esperienza) => {
    const card = document.createElement("div");
    card.className = "card";

    // Crea la lista delle attività
    const attivitaList = esperienza.attivita
      .map((attivita) => `<li>${attivita}</li>`)
      .join("");

    card.innerHTML = `
        <img class="azienda" src="${esperienza.logo}" alt="Logo ${esperienza.azienda}" />
        <h4>${esperienza.azienda} (${esperienza.ruolo})</h4>
        <p>
          <strong>Periodo:</strong> ${esperienza.periodo} -
          <br>
          ${esperienza.luogo}
        </p>
        <ul>
          ${attivitaList}
        </ul>
        <br />
        <a href="${esperienza.sito}" target="_blank">Visita il sito</a>
      `;

    container.appendChild(card);
  });
}

// Funzione per renderizzare l'istruzione
function renderIstruzione(istruzione) {
  const container = document.querySelector(
    "#curriculum .section:nth-of-type(4) .card-container"
  );
  if (!container) return;

  container.innerHTML = "";

  istruzione.forEach((corso) => {
    const card = document.createElement("div");
    card.className = "card";

    let html = `
        <img src="${corso.logo}" alt="Logo ${corso.istituto}" />
        <h4>${corso.titolo}</h4>
        <p>
          <strong>${corso.istituto}</strong>
          ${corso.periodo} ${corso.luogo}
        </p>
      `;

    // Aggiungi il livello EQF se presente
    if (corso.livello) {
      html += `<p><strong>Livello EQF:</strong> ${corso.livello}</p>`;
    }

    // Aggiungi le competenze se presenti
    if (corso.competenze && corso.competenze.length > 0) {
      html += "<ul>";
      corso.competenze.forEach((competenza) => {
        html += `<li>${competenza}</li>`;
      });
      html += "</ul>";
    }

    // Aggiungi la descrizione se presente
    if (corso.descrizione) {
      html += `<p>${corso.descrizione}</p>`;
    }

    html += `
        <br />
        <a href="${corso.sito}" target="_blank">Visita il sito</a>
      `;

    // Aggiungi il link per scaricare il diploma solo se esiste
    if (corso.diploma)
      html += `<br /><a href="${corso.diploma}" download>Scarica Diploma</a>`;

    card.innerHTML = html;
    container.appendChild(card);
  });
}

// Funzione per renderizzare le competenze
function renderCompetenze(competenze) {
  const container = document.querySelector(
    "#curriculum .section:nth-of-type(5) .card-container"
  );
  if (!container) return;

  container.innerHTML = "";

  competenze.forEach((competenza) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <img src="${competenza.immagine}" alt="${competenza.nome}" />
        <h4>${competenza.nome}</h4>
        <p>${competenza.descrizione}</p>
        <a href="${competenza.link}" target="_blank">Visita la piattaforma</a>
      `;

    container.appendChild(card);
  });
}

// Funzione per renderizzare i siti web
// Funzione per renderizzare i siti web
function renderWebSite(sites) {
  const container = document.querySelector(
    "#curriculum .section:nth-of-type(6) .card-container" // Cambia il selettore se necessario
  );
  if (!container) return;

  container.innerHTML = "";

  sites.forEach((site) => {
    const card = document.createElement("div");
    card.className = "card";

    // Crea l'HTML base
    let html = `
      <img src="${site.immagine}" alt="${site.nome}" class="site-image" />
      <h4>${site.nome}</h4>
      <div class="site-links">
        <button class="btn go-live-btn" onclick="window.open('${site.link}', '_blank')">Go Live</button>
    `;

    // Aggiungi il bottone per "Visualizza il codice" solo se presente
    if (site.codice)
      html += `<button class="btn view-code-btn" onclick="window.open('${site.codice}', '_blank')">Visualizza il codice</button>`;

    html += `</div>`;

    card.innerHTML = html;

    // Aggiungi la card al container
    container.appendChild(card);
  });
}

document.getElementById("sectiion").innerHTML = `
  <div id="attestati" class="section">
    <h3>Attestati</h3>
    <div class="card-container">
    </div>
    <br />
  </div>

  <div id="linguistiche" class="section">
    <h3>Competenze Linguistiche</h3>
    <div class="card-container">
    </div>
    <br />
  </div>

  <div id="esperienze" class="section">
    <h3>Esperienze Lavorative</h3>
    <div class="card-container">
    </div>
    <br />
  </div>

  <div id="istruzione" class="section">
    <h3>Istruzione</h3>
    <div class="card-container">
    </div>
    <br />
  </div>

  <div id="competenze" class="section">
    <h3>Competenze</h3>
    <div class="card-container">
    </div>
    <br />
  </div>

  <div id="sites" class="section">
    <h3>Siti Web</h3>
    <div class="card-container">
    </div>
    <br />
  </div>
`;
