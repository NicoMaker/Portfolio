function updateFooterYear() {
  document.getElementById("footer").innerHTML = `
    <footer>
      <div class="container">
        <p>&copy; ${new Date().getFullYear()} Nicola Marano. Tutti i diritti riservati.</p>
      </div>
    </footer>
  `;
}

function scheduleYearUpdate() {
  const now = new Date();
  const nextYear = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0, 0); // 1° gennaio anno prossimo ore 00:00:00
  const msUntilNewYear = nextYear - now;

  setTimeout(() => {
    updateFooterYear();
    // Ripeti ogni anno
    setInterval(updateFooterYear, 365.25 * 24 * 60 * 60 * 1000);
  }, msUntilNewYear);
}

// Imposta subito l'anno corrente
updateFooterYear();

// Pianifica l'aggiornamento automatico a mezzanotte del 1° gennaio
scheduleYearUpdate();