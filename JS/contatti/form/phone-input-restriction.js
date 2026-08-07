function bindPhoneInputRestriction() {
  const telefonoInput = document.getElementById("telefono");
  if (!telefonoInput) return;

  telefonoInput.addEventListener("input", () => {
    let value = telefonoInput.value;

    // Rimuove tutti i caratteri non numerici, eccetto +
    value = value.replace(/[^\d+]/g, "");

    // Mantiene solo il primo + se è all'inizio
    if (value.includes("+")) {
      value = "+" + value.replace(/\+/g, "").replace(/[^\d]/g, "");
    }

    telefonoInput.value = value;
  });
}
