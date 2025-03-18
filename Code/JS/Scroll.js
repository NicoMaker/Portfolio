document.querySelector(".scroll-arrow").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector("#curriculum").scrollIntoView({
    behavior: "smooth",
  });
});
