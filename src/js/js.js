"use strict";

const startBtn = document.querySelector(".start-button");
const startMenu = document.querySelector(".start-menu");
const endMenu = document.querySelector(".end-menu");
const contBtn = document.querySelector(".continue-button");
const concedeBtn = document.querySelector(".concede-button");
const yourCount = document.querySelector(".end-menu__count");
const totalCount = document.querySelector(".end-menu__total");
const exitBtn = document.querySelector(".exit-button");
const noteBox = document.querySelector(".note-box");
const okBtn = document.querySelector(".ok-btn");

let ansBtn;
let correctAns;
let corrSevAns;
let currentQue;
let checkUnCorr = 0;
let count = 0;
let index = 0;

startBtn.addEventListener("click", () => {
  startBtn.style.opacity = "0";
  startMenu.style.cssText = `
  opacity: 1;
  transform: translate(-50%, -50%)
  `;
  showQuestions(index);
});

contBtn.addEventListener("click", () => {
  checkUnCorr = 0;
  if (!(currentQue == listOfQuestions.length)) {
    document.querySelector(`section[id='active']`).remove();
    showQuestions(++index);
    contBtn.style.display = "none";
  } else {
    yourCount.textContent = count;
    totalCount.textContent = listOfQuestions.length;
    startMenu.style.cssText = `
    transition: 775ms;
    opacity: 1
    transform: translate(-50%, -800%);
  `;
    endMenu.style.cssText = `
    transition: 775ms;
    transform: translate(-50%, -50%);
    `;
    document.querySelector(`section[id='active']`).remove();
    index = 0;
  }
});

concedeBtn.addEventListener("click", () => {
  startMenu.style.cssText = `
    transition: 775ms;
    opacity: 0;
    transform: translate(-50%, -700%);
  `;
  startBtn.style.cssText = `
    opacity: 1;
    transition: 650ms;
  `;
  noteBox.style.cssText = `
    opacity: 0;
  `;
  document.querySelector(`section[id='active']`).remove();
  checkUnCorr = 0;
  count = 0;
  index = 0;
});

exitBtn.addEventListener("click", () => {
  count = 0;
  endMenu.style.cssText = `
    transition: 575ms;
    transform: translate(-350%, -50%);
  `;
  startBtn.style.cssText = `
    opacity: 1;
    transition: 650ms;
  `;
  contBtn.style.display = "none";
});

okBtn.addEventListener("click", () => {
  noteBox.style.cssText = `
    opacity: 0;
  `;
});

class Quiz {
  constructor(number, question, correctAnswer, answers, total) {
    this.number = number;
    this.question = question;
    this.correctAnswer = correctAnswer;
    this.answers = answers;
    this.total = total;
  }
  showQuest() {
    startMenu.insertAdjacentHTML(
      "afterbegin",
      `
        <section class="start-menu__text" id="active">
          <h1>${this.question}?</h1>
          <div class="start-menu__curr-of-total">${this.number} of ${this.total}</div>
          <div class="answers-box">
          <button class="btn-answer">${this.answers[0]}</button>
          <button class="btn-answer">${this.answers[1]}</button>
          <button class="btn-answer">${this.answers[2]}</button>
          <button class="btn-answer">${this.answers[3]}</button>
          </div>
        </section>
    `
    );
    startMenu.insertAdjacentHTML("beforebegin", "");
    correctAns = this.correctAnswer[0];
    corrSevAns = this.correctAnswer;
    currentQue = this.number;
  }
}

function getProp(check) {
  let answered = false;
  let tempArr = [];
  ansBtn = document.querySelectorAll(".btn-answer");
  ansBtn.forEach((item) => {
    item.addEventListener("click", () => {
      if (check == 0) {
        if (item.textContent === correctAns && checkUnCorr == 0 && !answered) {
          answered = true;
          count++;
          contBtn.style.display = "inline";
          item.style.background = "#05b305cf";
        } else if (
          checkUnCorr != 0 &&
          item.textContent === correctAns &&
          !answered
        ) {
          item.style.background = "#997c7cd1";
        } else if (answered && item.textContent === correctAns) {
          item.style.background = "#05b305cf";
        } else {
          item.style.background = "#b10d0d";
          checkUnCorr = 1;
          contBtn.style.display = "inline";
        }
      } else {
        if (
          corrSevAns.includes(item.textContent) &&
          checkUnCorr == 0 &&
          !tempArr.includes(item.textContent)
        ) {
          tempArr.push(item.textContent);
          item.style.background = "#05b305cf";
          if (tempArr.length == corrSevAns.length) {
            count++;
            contBtn.style.display = "inline";
          }
          console.log(tempArr);
        } else if (
          corrSevAns.includes(item.textContent) &&
          tempArr.includes(item.textContent) &&
          tempArr.length == corrSevAns.length
        ) {
          item.style.background = "#05b305cf";
        } else if (corrSevAns.includes(item.textContent) && checkUnCorr != 0) {
          item.style.background = "#997c7cd1";
        } else if (!corrSevAns.includes(item.textContent)) {
          item.style.background = "#b10d0d";
          contBtn.style.display = "inline";
          checkUnCorr = 1;
        }
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
  if (listOfQuestions[index].several == 1) {
    noteBox.style.cssText = `
    opacity: 1;
  `;
    getProp(1);
  } else {
    noteBox.style.cssText = `
    opacity: 0;
  `;
    getProp(0);
  }
}

const listOfQuestions = [
  {
    several: 0,
    number: 1,
    question: "The capital of Great Britain?",
    correctAnswer: ["London"],
    answers: ["Minsk", "London", "USA", "England"],
  },
  {
    several: 0,
    number: 2,
    question: "How many national languages are there in India?",
    correctAnswer: ["22"],
    answers: ["3", "25", "22", "112"],
  },
  {
    several: 0,
    number: 3,
    question: "HTML is...",
    correctAnswer: ["HyperText Markup Language"],
    answers: [
      "Her Tea My Lie",
      "HyperText Marks Lofi",
      "History Make  Minimal Language",
      "HyperText Markup Language",
    ],
  },
  {
    several: 0,
    number: 4,
    question: "2+2",
    correctAnswer: ["4"],
    answers: ["2", "4", "8", "22"],
  },
  {
    several: 0,
    number: 5,
    question: "DOTA is...",
    correctAnswer: ["Defence Of The Ancients"],
    answers: [
      "DOKA",
      "Legue Of Legends",
      "Defence Of The Ancients",
      "Dots Our Tanks Awfull",
    ],
  },
  {
    several: 0,
    number: 6,
    question: "Integral distribution function is...",
    correctAnswer: [
      "a function F(x) that determines for each possible value of x the probability that a random variable X will take a value less than x",
    ],
    answers: [
      "a function F(x) that determines for each possible value of x the probability that a random variable X will take a value less than x",
      "several related specific functions, related functions of the second kind Q 0 (z)",
      "this is the area of a curved figure. The indefinite integral is the entire area. A definite integral is the area in a given area.",
      "the base of the natural logarithm, mathematical constant, irrational and transcendental number",
    ],
  },
  {
    several: 1,
    number: 7,
    question: "cigarette brands",
    correctAnswer: ["Camel", "Minsk"],
    answers: ["Camel", "Minsk", "pgU", "JS"],
  },
  {
    several: 0,
    number: 8,
    question: "pi",
    correctAnswer: ["3.14"],
    answers: ["9.8", "3.14", "6.62", "2.8"],
  },
  {
    several: 1,
    number: 9,
    question: "Which digit is less than 5?",
    correctAnswer: ["1", "0", "2", "4"],
    answers: ["1", "0", "2", "4"],
  },
  {
    several: 0,
    number: 10,
    question: "How many primitive data types in JavaScript",
    correctAnswer: ["8"],
    answers: ["4", "10", "8", "5"],
  },
];
