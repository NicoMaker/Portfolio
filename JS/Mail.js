function sendEmail(event) {
  event.preventDefault(); // Preveniamo il comportamento predefinito del form (invio)

  // Recupera i valori dal modulo
  const name = getInputValue("name"),
    email = getInputValue("email"),
    telefono = getInputValue("telefono"), // Recupera il valore del telefono
    oggetto = getInputValue("oggetto"),
    message = getInputValue("message");

  // Verifica se il numero di telefono è valido
  if (!telefono.match(/^\+?[0-9]{10,15}$/)) {
    alert("Per favore, inserisci un numero di telefono valido.");
    return; // Ferma l'invio dell'email se il numero non è valido
  }

  // Crea l'oggetto e il corpo del messaggio
  const subject = createSubject(oggetto),
    body = createBody(name, email, telefono, message);

  // Crea il link mailto
  const mailtoLink = createMailtoLink(subject, body);

  // Reindirizza l'utente al link mailto
  window.location.href = mailtoLink;
}

// Funzione per ottenere il valore di un input
const getInputValue = (inputId) => document.getElementById(inputId).value;

// Funzione per creare l'oggetto dell'email
const createSubject = (oggetto) => encodeURIComponent(oggetto);

// Funzione per creare il corpo dell'email in modo formale
const createBody = (name, email, telefono, message) =>
  encodeURIComponent(
    `Gentile Nicola Marano,\n\n` +
      `Mi chiamo ${name}, il mio indirizzo email è ${email}, e il mio numero di telefono è ${telefono}.\n\n` +
      `Desidero contattarla per il seguente motivo:\n\n` +
      `${message}\n\n` +
      `Resto a disposizione per eventuali chiarimenti.\n` +
      `Cordiali saluti,\n` +
      `${name}`
  );

// Funzione per creare il link mailto
const createMailtoLink = (subject, body) =>
  `mailto:nicola.marano02@gmail.com?subject=${subject}&body=${body}`;
