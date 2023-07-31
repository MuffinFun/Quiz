"use strict";

const mainContainer = document.querySelector(".container");
const startMenu = document.querySelector(".start-menu");
const endMenu = document.querySelector(".end-menu");
const noteBox = document.querySelector(".note-box");

const labelTimer = document.querySelector(".question-timer");

const totalCount = document.querySelector(".end-menu__total");
const yourCount = document.querySelector(".end-menu__count");

const startBtn = document.querySelector(".start-button");
const contBtn = document.querySelector(".continue-button");
const concedeBtn = document.querySelector(".concede-button");
const exitBtn = document.querySelector(".exit-button");
const okBtn = document.querySelector(".ok-button");

let timer;

const inputViolet = document
  .querySelector("#violet")
  .addEventListener("click", () => {
    changeTheme(0);
  });
const inputGreen = document
  .querySelector("#green")
  .addEventListener("click", () => {
    changeTheme(1);
  });
const inputDark = document
  .querySelector("#dark")
  .addEventListener("click", () => {
    changeTheme(2);
  });

class Quiz {
  _corrSevAns;
  constructor(number, question, correctAnswer, answers) {
    this.number = number;
    this.question = question;
    this.correctAnswer = correctAnswer;
    this.answers = answers;
  }
  _showQuest() {
    labelTimer.classList.add("show-timer");
    if (timer) clearInterval(timer);
    timer = startTimer();
    startMenu.insertAdjacentHTML(
      "afterbegin",
      `
            <section class="start-menu__text" id="active">
              <h1>${this.question}?</h1>
              <div class="start-menu__curr-of-total">${this.number} of ${listOfQuestions.length}</div>
              <div class="answers-box">
              <button class="btn-answer">${this.answers[0]}</button>
              <button class="btn-answer">${this.answers[1]}</button>
              <button class="btn-answer">${this.answers[2]}</button>
              <button class="btn-answer">${this.answers[3]}</button>
              </div>
            </section>
        `
    );
  }
  _corrSevAns = this.correctAnswer;
}

class App {
  _quizApp;
  _index = 0;
  _scoreCount = 0;

  _answerButton;

  constructor() {
    startBtn.addEventListener("click", this._startQuiz.bind(this));

    contBtn.addEventListener("click", this._nextQuestions.bind(this));

    concedeBtn.addEventListener("click", this._concedeQuiz.bind(this));

    exitBtn.addEventListener("click", this._exitQuiz.bind(this));

    okBtn.addEventListener("click", () => {
      noteBox.classList.toggle("note-box_show");
    });
  }
  _startQuiz(e) {
    e.preventDefault();
    classManagment("startBtn");
    this._setQuestions(this._index);
  }
  _setQuestions(_index) {
    this._quizApp = new Quiz(
      listOfQuestions[_index].number,
      listOfQuestions[_index].question,
      listOfQuestions[_index].correctAnswer,
      listOfQuestions[_index].answers
    );

    this._quizApp._showQuest();

    if (listOfQuestions[this._index].several == 1) {
      noteBox.classList.add("note-box_show");
      this._getAnswer(1);
    } else {
      noteBox.classList.remove("note-box_show");
      this._getAnswer(0);
    }
  }
  _getAnswer(checkSeveral) {
    let tempArr = [];
    const getThis = this;

    const answerBox = document.querySelector(".answers-box");

    this._answerButton = document.querySelectorAll(".btn-answer");

    answerBox.addEventListener("click", function (e) {
      e.preventDefault();

      const clicked = e.target.closest(".btn-answer");

      if (!clicked) return;

      switch (checkSeveral) {
        case 0:
          if (clicked.textContent === getThis._quizApp.correctAnswer[0]) {
            getThis._scoreCount++;

            clicked.classList.add("green-correct-answer");
            labelTimer.classList.add("show-pink-timer");
            getThis._answerButton.forEach((btn) => {
              btn.classList.add("disable-button");
            });
          } else {
            clicked.classList.add("red-uncorrect-answer");
            labelTimer.classList.add("show-red-timer");

            getThis._answerButton.forEach((btn) => {
              if (getThis._quizApp.correctAnswer[0] === btn.textContent)
                btn.classList.add("disable-button__correct");
              btn.classList.add("disable-button");
            });
          }
          break;
        case 1:
          if (
            getThis._quizApp._corrSevAns.includes(clicked.textContent) &&
            !tempArr.includes(clicked.textContent)
          ) {
            tempArr.push(clicked.textContent);
            clicked.classList.add("green-correct-answer");
            if (tempArr.length == getThis._quizApp._corrSevAns.length) {
              getThis._scoreCount++;
            }
          } else {
            clicked.classList.add("red-uncorrect-answer");
            labelTimer.classList.add("show-red-timer");
            if (tempArr.length == getThis._quizApp._corrSevAns.length)
              getThis._scoreCount--;
            getThis._answerButton.forEach((btn) => {
              if (corrSevAns.includes(btn.textContent))
                btn.classList.add("disable-button__correct");
              btn.classList.add("disable-button");
            });
          }
          break;
      }
      clearInterval(timer);
      contBtn.classList.add("continue-button_show");
    });
  }
  _nextQuestions(e) {
    e.preventDefault();
    if (!(this._quizApp.currentQuestion == listOfQuestions.length)) {
      document.querySelector(`section[id='active']`).remove();
      classManagment("contBtn", "during");
      this._setQuestions(++this._index);
    } else {
      index = 0;
      yourCount.textContent = this._scoreCount;
      totalCount.textContent = listOfQuestions.length;
      document.querySelector(`section[id='active']`).remove();
      clearInterval(timer);
      classManagment("contBtn", "end");
    }
  }
  _concedeQuiz(e) {
    e.preventDefault();
    document.querySelector(`section[id='active']`).remove();
    if (timer) clearInterval(timer);
    classManagment("concedeBtn");
    this._scoreCount = 0;
    this._index = 0;
  }
  _exitQuiz(e) {
    e.preventDefault();
    this._scoreCount = 0;
    if (timer) clearInterval(timer);
    classManagment("exitBtn");
  }
}

const app = new App();

function getProp() {}

function startTimer() {
  let time = 10;
  labelTimer.textContent = `${time}`;
  labelTimer.classList.remove("show-pink-timer");
  labelTimer.classList.remove("show-red-timer");
  const timer = setInterval(tick, 1000);
  function tick() {
    labelTimer.textContent = `${time}`;
    if (time == 0) {
      clearInterval(timer);
      labelTimer.classList.toggle("show-red-timer");
      answerButton.forEach((item) => {
        if (corrSevAns.includes(item.textContent)) {
          item.classList.add("disable-button__correct");
        } else {
          item.classList.add("disable-button");
        }
      });
      contBtn.classList.add("continue-button_show");
    }
    time--;
  }
  return timer;
}

function changeTheme(themeNumber) {
  mainContainer.style.background = listOfThemes[themeNumber].container;
  startMenu.style.background = listOfThemes[themeNumber].startEndMenuNoteBox;
  endMenu.style.background = listOfThemes[themeNumber].startEndMenuNoteBox;
  noteBox.style.background = listOfThemes[themeNumber].startEndMenuNoteBox;
  startBtn.style.background = listOfThemes[themeNumber].startButton;
  contBtn.style.background = listOfThemes[themeNumber].contConcedeExitOkBtn;
  concedeBtn.style.background = listOfThemes[themeNumber].contConcedeExitOkBtn;
  exitBtn.style.background = listOfThemes[themeNumber].contConcedeExitOkBtn;
  okBtn.style.background = listOfThemes[themeNumber].contConcedeExitOkBtn;
}

function classManagment(element, moment) {
  switch (element) {
    case "startBtn":
      startBtn.classList.add("start-button_deactivate");
      startMenu.classList.add("start-menu_show-menu");
      break;
    case "contBtn":
      switch (moment) {
        case "during":
          labelTimer.classList.add("show-timer");
          contBtn.classList.remove("continue-button_show");
          break;
        case "end":
          labelTimer.classList.remove("show-timer");
          startMenu.classList.remove("start-menu_show-menu");
          endMenu.classList.add("end-menu_show-menu");
          break;
        default:
          alert(`something not found at: ${element.toString()} ${moment}`);
      }
      break;
    case "concedeBtn":
      labelTimer.classList.remove("show-timer");
      startMenu.classList.remove("start-menu_show-menu");
      startBtn.classList.remove("start-button_deactivate");
      noteBox.classList.remove("note-box_show");
      contBtn.classList.remove("continue-button_show");
      break;
    case "exitBtn":
      labelTimer.classList.remove("show-timer");
      endMenu.classList.remove("end-menu_show-menu");
      startBtn.classList.remove("start-button_deactivate");
      contBtn.classList.remove("continue-button_show");
      break;
    default:
      alert(`not found case: ${element}`);
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
    correctAnswer: ["1", "2", "4"],
    answers: ["1", "10", "2", "4"],
  },
  {
    several: 0,
    number: 10,
    question: "How many primitive data types in JavaScript",
    correctAnswer: ["8"],
    answers: ["4", "10", "8", "5"],
  },
];

const listOfThemes = [
  {
    container: "rgb(232, 138, 234)",
    startEndMenuNoteBox: `linear-gradient(
      316deg,
      rgba(36, 5, 38, 1) 0%,
      rgba(82, 9, 91, 1) 16%,
      rgba(138, 14, 157, 1) 79%,
      rgba(163, 18, 185, 1) 90%
    )`,
    startButton: `linear-gradient(
      74deg,
      rgba(187, 18, 193, 1) 9%,
      rgba(187, 18, 193, 1) 46%,
      rgba(103, 10, 122, 1) 77%,
      rgba(65, 6, 90, 1) 87%,
      rgba(0, 12, 36, 1) 99%
    )`,
    contConcedeExitOkBtn: `linear-gradient(
      316deg,
      rgba(77, 10, 66, 1) 0%,
      rgba(120, 14, 93, 1) 1%,
      rgba(190, 16, 118, 1) 40%,
      rgba(221, 18, 138, 1) 90%
    )`,
  },
  {
    container: "rgb(77, 201, 77)",
    startEndMenuNoteBox: `linear-gradient(
      316deg,
      rgba(3, 57, 6, 1) 0%,
      rgba(8, 96, 29, 1) 16%,
      rgba(5, 153, 65, 1) 79%,
      rgba(9, 179, 78, 1) 90%
    )`,
    startButton: `linear-gradient(
      74deg,
      rgba(6, 194, 100, 1) 9%,
      rgba(22, 143, 70, 1) 46%,
      rgba(27, 129, 68, 1) 63%,
      rgba(13, 95, 31, 1) 87%,
      rgba(7, 69, 10, 1) 100%
    )`,
    contConcedeExitOkBtn: `linear-gradient(
      316deg,
      rgba(3, 57, 6, 1) 0%,
      rgba(8, 96, 29, 1) 1%,
      rgba(5, 153, 65, 1) 40%,
      rgba(9, 179, 78, 1) 90%
    )`,
  },
  {
    container: "rgb(18, 18, 18)",
    startEndMenuNoteBox: `rgb(26, 24, 24)`,
    startButton: `rgb(26, 24, 24)`,
    contConcedeExitOkBtn: `rgb(18, 18, 18)`,
  },
];

document.addEventListener("DOMContentLoaded", changeTheme(0));
