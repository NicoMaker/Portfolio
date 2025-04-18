const express = require("express");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const emailAddresses = require("email-addresses");
const dotenv = require("dotenv");

dotenv.config(); // Carica variabili da .env

const app = express();

// Middleware per servire file statici e gestire JSON/form
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotta GET per servire l'index.html
app.get("/", (req, res) => {
  const index = fs.readFileSync(path.join(__dirname, "index.html"), "utf-8");
  res.send(index);
});

// Rotta POST per invio email
app.post("/send-mail", (req, res) => {
  const { name, surname, email, phone, subject, message } = req.body;

  // ✅ Controllo campi obbligatori
  if (!name || !surname || !email || !subject || !message) {
    return res
      .status(400)
      .send("Tutti i campi obbligatori devono essere compilati.");
  }

  // ✅ Validazione email
  const parsedEmail = emailAddresses.parseOneAddress(email);
  if (!parsedEmail) {
    return res.status(400).send("Indirizzo email non valido.");
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

  // ✅ Invio email
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Errore invio email:", err);
      return res.status(500).send("Errore durante l'invio dell'email.");
    }

    console.log("Email inviata con successo:", info.response);
    res.status(200).send("Email inviata con successo!");
  });
});

// Avvio server
app.listen(3000, () => {
  console.log("Server avviato su http://localhost:3000");
});
