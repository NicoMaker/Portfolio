let generatedCaptcha = "";

function generateCaptcha() {
  const canvas = document.getElementById("captchaCanvas");
  const ctx = canvas.getContext("2d");

  const uppercase = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lowercase = "abcdefghjkmnpqrstuvwxyz";
  const digits = "23456789";
  const allChars = uppercase + lowercase + digits;

  // Garantire almeno 1 maiuscola, 1 minuscola e 1 numero
  let captchaArray = [
    uppercase[Math.floor(Math.random() * uppercase.length)],
    lowercase[Math.floor(Math.random() * lowercase.length)],
    digits[Math.floor(Math.random() * digits.length)],
  ];

  // Aggiungere altri 5 caratteri casuali per un totale di  8
  while (captchaArray.length < 8)
    captchaArray.push(allChars[Math.floor(Math.random() * allChars.length)]);

  // Mischiare i caratteri
  generatedCaptcha = captchaArray.sort(() => 0.5 - Math.random()).join("");

  // Pulire il canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Disegnare sfondo con pattern
  drawBackground(ctx, canvas.width, canvas.height);

  // Disegnare il testo con effetti
  drawCaptchaText(ctx, generatedCaptcha, canvas.width, canvas.height);

  // Aggiungere disturbi
  addNoise(ctx, canvas.width, canvas.height);

  // Reset input status
  const input = document.getElementById("captchaInput");
  const status = document.getElementById("captchaStatus");
  input.value = "";
  input.className = "";
  status.className = "input-status";
  status.textContent = "";
}
