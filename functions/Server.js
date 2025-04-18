const nodemailer = require("nodemailer");
const emailAddresses = require("email-addresses");
const dotenv = require("dotenv");

dotenv.config(); // Carica variabili da .env

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Metodo non permesso!" }),
    };
  }

  const { name, surname, email, phone, subject, message } = JSON.parse(
    event.body
  );

  // ✅ Controllo campi obbligatori
  if (!name || !surname || !email || !subject || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Tutti i campi obbligatori devono essere compilati.",
      }),
    };
  }

  // ✅ Validazione email
  const parsedEmail = emailAddresses.parseOneAddress(email);
  if (!parsedEmail) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Indirizzo email non valido." }),
    };
  }

  // ✅ Configurazione Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.mail,
      pass: process.env.password_mail,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.mail,
    subject: subject,
    text: `Gentile Nicola Marano,

Mi chiamo ${name} ${surname}, il mio indirizzo email è ${email}, e il mio numero di telefono è ${phone}.

Desidero contattarla per il seguente motivo:

${message}

Resto a disposizione per eventuali chiarimenti.
Cordiali saluti,
${name}`,
  };

  try {
    // ✅ Invio email
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email inviata con successo!" }),
    };
  } catch (err) {
    console.error("Errore invio email:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Errore durante l'invio dell'email." }),
    };
  }
};
