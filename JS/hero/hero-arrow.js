document.querySelector(".scroll-arrow").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#curriculum").scrollIntoView({
    behavior: "smooth",
  });
});
