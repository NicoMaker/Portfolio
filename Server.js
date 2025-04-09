const express = require("express"),
  path = require("path"),
  app = express(),
  PORT = 3000;

// Servire file statici dalla cartella corrente
app.use(express.static(__dirname));

// Rotta principale che serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server Express attivo su http://localhost:${PORT}`);
});
