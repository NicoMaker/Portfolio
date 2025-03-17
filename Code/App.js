function sendEmail(event) {
  event.preventDefault(); // Preveniamo il comportamento predefinito del form (invio)

  // Recupera i valori dal modulo
  const name = getInputValue("name"),
    email = getInputValue("email"),
    oggetto = getInputValue("oggetto"),
    message = getInputValue("message");

  // Crea il corpo del messaggio
  const subject = createSubject(oggetto),
    body = createBody(name, email, message);

  // Crea il link mailto
  const mailtoLink = createMailtoLink(subject, body);

  // Reindirizza l'utente al link mailto
  window.location.href = mailtoLink;
}

// Funzione per ottenere il valore di un input
const getInputValue = (inputId) => document.getElementById(inputId).value;

// Funzione per creare l'oggetto dell'email
const createSubject = (oggetto) => encodeURIComponent(oggetto);

// Funzione per creare il corpo dell'email
const createBody = (name, email, message) =>
  encodeURIComponent(`Nome: ${name}\nEmail: ${email}\nMessaggio: ${message}`);

// Funzione per creare il link mailto
const createMailtoLink = (subject, body) =>
  `mailto:nicola.marano02@gmail.com?subject=${subject}&body=${body}`;
