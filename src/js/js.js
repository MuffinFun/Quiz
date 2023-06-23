"use strict";

const startBtn = document.querySelector(".start-button");

const startMenu = document.querySelector(".start-menu");

const contBtn = document.querySelector(".continue-button");
const exitBtn = document.querySelector(".exit-button");

//let getAnswer = document.querySelector('p[name="answer"]');

startBtn.addEventListener("click", () => {
  startBtn.style.opacity = "0";
  startMenu.style.transform = "translate(-50%, -50%)";
  new Quiz(
    objOfQuestions.number,
    objOfQuestions.question,
    objOfQuestions.correctAnswer,
    objOfQuestions.answers,
    1,
    1
  ).showQuest();
});

// contBtn.addEventListener("click", () => {
//   startMenu.style.cssText = `
//     transition: 1s;
//     width: 450px;
//     height: 470px;
//     transform: translate(-50%,-50%);
//   `;
// });

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
});

class Quiz {
  constructor(number, question, correctAnswer, answers, total, count) {
    this.number = number;
    this.question = question;
    this.correctAnswer = correctAnswer;
    this.answers = answers;
    this.total = total;
    this.count = 1;
  }
  // showQuest() {
  //   startMenu.insertAdjacentHTML(
  //     "afterbegin",
  //     `
  //       <section class="start-menu__text" id="${this.count}">
  //         <h1>${this.question}? ${this.number} of ${this.total}</h1>
  //         <p name="answer">${this.answers.first}</p>
  //         <p name="answer">${this.answers.second}</p>
  //         <p name="answer">${this.answers.third}</p>
  //         <p name="answer">${this.answers.fourth}</p>
  //       </section>
  //   `
  //   );
  //}
  checkCorrectAnswer(answer) {
    return answer === this.correctAnswer ? true : false;
  }
  // deleteQuestion(){

  // }
}

const objOfQuestions = {
  number: 1,
  question: "2+2",
  correctAnswer: "4",
  answers: {
    first: "5",
    second: "6",
    third: "7",
    fourth: "4",
  },
};
