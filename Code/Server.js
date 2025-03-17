const express = require("express"),
  nodemailer = require("nodemailer"),
  bodyParser = require("body-parser"),
  app = express(),
  port = 3000;

// Usa body-parser per analizzare i dati JSON
app.use(bodyParser.json());

// Endpoint per l'invio dell'email
app.post("/send-email", (req, res) => {
  const { name, email, subject, message } = req.body;

  // Crea un trasportatore con il servizio SMTP di Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nicola.marano02@gmail.com", // La tua email
      pass: "TUO_PASSWORD_APP", // La tua password per le app di Gmail
    },
  });

  // Configura i dettagli dell'email
  const mailOptions = {
    from: "nicola.marano02@gmail.com", // La tua email
    to: "nicola.marano02@gmail.com", // Dove inviare l'email (puoi cambiare destinatario)
    subject: subject,
    text: `Nome: ${name}\nEmail: ${email}\n\nMessaggio:\n${message}`,
  };

  // Invia l'email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Errore nell'invio dell'email:", error);
      return res.json({ success: false, message: error.message });
    }
    console.log("Email inviata:", info.response);
    res.json({ success: true, message: "Email inviata con successo!" });
  });
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
