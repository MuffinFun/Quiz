const startBtn = document.querySelector(".start-button");
const startMenu = document.querySelector(".start-menu");
const contBtn = document.querySelector(".continue-button");
const exitBtn = document.querySelector(".exit-button");

startBtn.addEventListener("click", () => {
  startBtn.style.opacity = "0";
  startMenu.style.transform = "translate(-50%, -50%)";
});

contBtn.addEventListener("click", () => {
  startMenu.style.transition = "1s";
  startMenu.style.transform = "translate(-500%, -50%)";
});

exitBtn.addEventListener("click", () => {
  startBtn.style.opacity = "1";
  startBtn.style.transition = "550ms";
  startMenu.style.transform = "translate(-50%, -300%)";
});

const tag = document.querySelector(".star-menu__text p");
console.log(tag);
