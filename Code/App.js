document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Preleva i valori dal modulo
    const name = document.getElementById("name").value,
      email = document.getElementById("email").value,
      subject = document.getElementById("oggetto").value,
      message = document.getElementById("message").value;

    // Creazione dell'oggetto con i dati del form
    const formData = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    };

    // Richiesta al server per inviare l'email
    fetch("/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Email inviata con successo!");
          document.getElementById("contactForm").reset();
        } else {
          alert("Errore nell'invio dell'email!");
        }
      })
      .catch((error) => {
        console.error("Errore:", error);
        alert("Errore nel contatto con il server!");
      });
  });
