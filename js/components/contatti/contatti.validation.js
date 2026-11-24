/** Nel campo telefono lascia solo cifre, "+" e spazi. */
export function bindPhoneFilter(form) {
  form.telefono.addEventListener(
    "input",
    (e) => (e.target.value = e.target.value.replace(/[^\d+\s]/g, "")),
  );
}

/** Validazione nativa del form; se non è valida mostra i messaggi del browser. */
export function isFormValid(form) {
  if (form.checkValidity()) return true;
  form.reportValidity();
  return false;
}
