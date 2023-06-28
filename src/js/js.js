"use strict";

const startBtn = document.querySelector(".start-button");

const startMenu = document.querySelector(".start-menu");

const contBtn = document.querySelector(".continue-button");
const exitBtn = document.querySelector(".exit-button");

let ansBtn;
let correctAns;
let currentQue;
let index = 0;

startBtn.addEventListener("click", () => {
  startBtn.style.opacity = "0";
  startMenu.style.transform = "translate(-50%, -50%)";
  showQuestions(index);
});

contBtn.addEventListener("click", () => {
  if (!(currentQue == listOfQuestions.length)) {
    document.querySelector(`section[id='active']`).remove();
    showQuestions(++index);
    contBtn.style.display = "none";
  } else {
    startMenu.style.cssText = `
    transition: 575ms;
    transform: translate(-50%, -300%);
    width: 400px;
    height: 400px
  `;
    startBtn.style.cssText = `
    opacity: 1;
    transition: 650ms;
  `;
    document.querySelector(`section[id='active']`).remove();
    index = 0;
  }
});

exitBtn.addEventListener("click", () => {
  startMenu.style.cssText = `
    transition: 575ms;
    transform: translate(-50%, -300%);
    width: 400px;
    height: 400px
  `;
  startBtn.style.cssText = `
    opacity: 1;
    transition: 650ms;
  `;
  document.querySelector(`section[id='active']`).remove();
  index = 0;
});

class Quiz {
  constructor(number, question, correctAnswer, answers, total) {
    this.number = number;
    this.question = question;
    this.correctAnswer = correctAnswer;
    this.answers = answers;
    this.total = total;
    this.count = 1;
  }
  showQuest() {
    startMenu.insertAdjacentHTML(
      "afterbegin",
      `
        <section class="start-menu__text" id="active">
          <h1>${this.question}? ${this.number} of ${this.total}</h1>
          <div class="answers-box"></div>
          <button class="btn__answer">${this.answers[0]}</button>
          <button class="btn__answer">${this.answers[1]}</button>
          <button class="btn__answer">${this.answers[2]}</button>
          <button class="btn__answer">${this.answers[3]}</button>
        </section>
    `
    );
    correctAns = this.correctAnswer;
    currentQue = this.number;
  }
}

function getProp() {
  ansBtn = document.querySelectorAll(".btn__answer");
  ansBtn.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.textContent === correctAns) {
        contBtn.style.display = "inline";
        item.style.background = "green";
      } else {
        item.style.background = "red";
      }
    });
  });
}

function showQuestions(index) {
  new Quiz(
    listOfQuestions[index].number,
    listOfQuestions[index].question,
    listOfQuestions[index].correctAnswer,
    listOfQuestions[index].answers,
    listOfQuestions.length
  ).showQuest();
  getProp();
}

const listOfQuestions = [
  {
    number: 1,
    question: "2+2",
    correctAnswer: "4",
    answers: ["2", "4", "7", "22"],
  },
  {
    number: 2,
    question: "3+3",
    correctAnswer: "6",
    answers: ["6", "4", "7", "22"],
  },
  {
    number: 3,
    question: "4+4",
    correctAnswer: "8",
    answers: ["2", "4", "8", "22"],
  },
];
