function sendEmail(event) {
  event.preventDefault();

  // Get form and create notification container if it doesn't exist
  const form = document.getElementById("contactForm");
  let notificationContainer = document.querySelector(".notification-container");

  if (!notificationContainer) {
    notificationContainer = document.createElement("div");
    notificationContainer.className = "notification-container";
    form.prepend(notificationContainer);
  }

  // Clear previous notifications
  notificationContainer.innerHTML = "";

  // Get form fields
  const fields = ["name", "cognome", "email", "telefono", "oggetto", "message"];
  const [name, surname, email, phone, subject, message] =
    fields.map(getInputValue);

  // Validate phone number
  if (!isValidPhone(phone)) {
    showNotification(
      notificationContainer,
      "error",
      "Per favore, inserisci un numero di telefono valido con prefisso internazionale (es. +39 123456789)."
    );
    highlightField("telefono");
    return;
  }

  // Show loading state
  const submitBtn = document.querySelector(".submit-btn");
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner"></span> Invio in corso...';

  // Send the form data
  fetch("/send-mail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, surname, email, phone, subject, message }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Errore ${res.status}: ${res.statusText}`);
      }
      return res.text();
    })
    .then((data) => {
      // Success case
      showNotification(
        notificationContainer,
        "success",
        "Messaggio inviato con successo! Ti risponderemo al più presto."
      );
      form.reset();

      // Visual success feedback
      const formElements = form.querySelectorAll("input, textarea");
      formElements.forEach((el) => {
        el.classList.add("success-field");
        setTimeout(() => el.classList.remove("success-field"), 2000);
      });

      // Scroll to notification
      notificationContainer.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    })
    .catch((err) => {
      // Error case
      console.error("Errore:", err);
      showNotification(
        notificationContainer,
        "error",
        "Si è verificato un errore durante l'invio del messaggio. Riprova più tardi o contattaci direttamente via email."
      );

      // Scroll to notification
      notificationContainer.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    })
    .finally(() => {
      // Reset button state
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    });
}

// Helper functions
const getInputValue = (id) => document.getElementById(id)?.value.trim() || "";
const isValidPhone = (number) =>
  /^\+([1-9][0-9]{0,3})([0-9]{6,14})$/.test(number.replace(/\s+/g, ""));

function showNotification(container, type, message) {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;

  // Add appropriate icon based on type
  const icon =
    type === "success"
      ? '<i class="bx bx-check-circle" aria-hidden="true"></i>'
      : '<i class="bx bx-error-circle" aria-hidden="true"></i>';

  notification.innerHTML = `
    ${icon}
    <span class="notification-message">${message}</span>
    <button class="notification-close" aria-label="Chiudi notifica">
      <i class="bx bx-x"></i>
    </button>
  `;

  // Add close button functionality
  notification
    .querySelector(".notification-close")
    .addEventListener("click", () => {
      notification.classList.add("notification-hiding");
      setTimeout(() => notification.remove(), 300);
    });

  // Auto-dismiss success notifications after 5 seconds
  if (type === "success") {
    setTimeout(() => {
      if (notification.parentNode) {
        notification.classList.add("notification-hiding");
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  // Add to container with animation
  notification.style.opacity = "0";
  notification.style.transform = "translateY(-20px)";
  container.appendChild(notification);

  // Trigger animation
  setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateY(0)";
  }, 10);
}

function highlightField(fieldId) {
  const field = document.getElementById(fieldId);
  field.classList.add("error-field");
  field.focus();

  // Add shake animation
  field.classList.add("shake-animation");

  // Remove animation and highlight after delay
  setTimeout(() => {
    field.classList.remove("shake-animation");

    // Add event listener to remove error class when user starts typing
    field.addEventListener("input", function removeErrorClass() {
      field.classList.remove("error-field");
      field.removeEventListener("input", removeErrorClass);
    });
  }, 500);
}

// Add form validation on input
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const inputs = form.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    // Add validation on blur
    input.addEventListener("blur", () => {
      if (input.required && !input.value.trim()) {
        input.classList.add("error-field");
      } else if (
        input.id === "email" &&
        input.value.trim() &&
        !isValidEmail(input.value)
      ) {
        input.classList.add("error-field");
      } else if (
        input.id === "telefono" &&
        input.value.trim() &&
        !isValidPhone(input.value)
      ) {
        input.classList.add("error-field");
      } else {
        input.classList.remove("error-field");
      }
    });

    // Remove error class on input
    input.addEventListener("input", () => {
      input.classList.remove("error-field");
    });
  });
});

// Email validation helper
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
