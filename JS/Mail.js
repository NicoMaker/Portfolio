function sendEmail(event) {
  event.preventDefault(); // Previene il comportamento predefinito del form

  const fields = ["name", "cognome", "email", "telefono", "oggetto", "message"],
    [name, surname, email, telefono, oggetto, message] =
      fields.map(getInputValue);

  if (!isValidPhone(telefono)) {
    alert("Per favore, inserisci un numero di telefono valido.");
    return;
  }

  const subject = encodeURIComponent(oggetto),
    body = encodeURIComponent(
      `Gentile Nicola Marano,\n\n` +
        `Mi chiamo ${name} ${surname}, il mio indirizzo email è ${email}, e il mio numero di telefono è ${telefono}.\n\n` +
        `Desidero contattarla per il seguente motivo:\n\n${message}\n\n` +
        `Resto a disposizione per eventuali chiarimenti.\n` +
        `Cordiali saluti,\n${name}`
    );

  window.location.href = `mailto:nicola.marano02@gmail.com?subject=${subject}&body=${body}`;
}

// Funzione per ottenere il valore di un input
const getInputValue = (id) => document.getElementById(id)?.value.trim() || "";

// Valida un numero di telefono internazionale
const isValidPhone = (number) => /^\+?[0-9]{10,15}$/.test(number);
