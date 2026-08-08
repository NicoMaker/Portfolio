function validateCaptcha() {
  const input = document.getElementById("captchaInput");
  const status = document.getElementById("captchaStatus");
  const inputValue = input.value;

  if (inputValue.length === 0) {
    input.className = "";
    status.className = "input-status";
    status.textContent = "";
    return false;
  }

  if (inputValue.toUpperCase() === generatedCaptcha.toUpperCase()) {
    input.className = "valid";
    status.className = "input-status valid";
    status.textContent = "✓";
    return true;
  } else {
    input.className = "invalid";
    status.className = "input-status invalid";
    status.textContent = "✗";

    // Se ha scritto 8 caratteri, rigenera CAPTCHA
    if (inputValue.length >= 8) {
      setTimeout(() => {
        generateCaptcha();
        input.focus();
      }, 500);
    }
    return false;
  }
}
