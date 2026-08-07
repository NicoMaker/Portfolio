const getInputValue = (id) => document.getElementById(id)?.value.trim() || "";
const isValidPhone = (number) => /^\+?[0-9]{10,15}$/.test(number);
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// === Auto-salvataggio dei dati ===
const formFieldIds = [
  "name",
  "cognome",
  "email",
  "telefono",
  "oggetto",
  "message",
];

function saveFormData() {
  const formData = {};
  formFieldIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) formData[id] = el.value;
  });
  localStorage.setItem("formData", JSON.stringify(formData));
}

function restoreFormData() {
  const saved = localStorage.getItem("formData");
  if (saved) {
    const data = JSON.parse(saved);
    formFieldIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el && data[id] !== undefined) {
        el.value = data[id];
      }
    });
  }
}

function clearFormData() {
  localStorage.removeItem("formData");
}

function bindAutoSave() {
  formFieldIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", saveFormData);
  });
}

