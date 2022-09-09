const questions = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "22", correct: false },
      { text: "3", correct: false },
      { text: "12", correct: false },
    ],
  },
  {
    question: "What is 5 * 5?",
    answers: [
      { text: "25", correct: true },
      { text: "10", correct: false },
      { text: "55", correct: false },
      { text: "30", correct: false },
    ],
  },
  {
    question: "What is 4^2?",
    answers: [
      { text: "8", correct: false },
      { text: "12", correct: false },
      { text: "6", correct: false },
      { text: "16", correct: true },
    ],
  },
  {
    question: "What is 4 * 2?",
    answers: [
      { text: "6", correct: false },
      { text: "8", correct: true },
      { text: "16", correct: false },
      { text: "42", correct: false },
    ],
  },
  {
    question: "What is 7 * 4?",
    answers: [
      { text: "11", correct: false },
      { text: "28", correct: true },
      { text: "74", correct: false },
      { text: "49", correct: false },
    ],
  },
];
// set variables
const startButton = document.getElementById('start-btn');
startButton.addEventListener('click', startGame);
const getQuestion = document.getElementById('question');
const getAnswersButtons = document.getElementsByClassName('btn');
const answers = document.getElementById('answers');
const quizTitle = document.getElementById('quiz-title');
const resetButton = document.getElementById('reset-btn');
const finalScore = document.getElementById('final-score');
const scoreAdd = document.getElementById('score-add');
const yourScore = document.getElementById('your-score');
const endScore = document.getElementById('end-score');
//   currentQuestionIndex++;
//   nextQuestion();
// });
let questions_array = [];
let anArrayOfUniqueNumbers = [];
// setting number generator 
let numberGenerator = function (arr) {
  if (arr.length >= 5) return;
  // generates random number
  let newNumber = Math.floor(Math.random() * 5)  
  if (arr.indexOf(newNumber) < 0) {
    arr.push(newNumber);
  }
  numberGenerator(arr);
};
// selecting questions from above to decide which pops up
numberGenerator(anArrayOfUniqueNumbers);
console.log(anArrayOfUniqueNumbers);
for (let index = 0; index < 5; index++) {
  let result = questions[anArrayOfUniqueNumbers[index]];
  questions_array.push(result);
}
console.log(questions_array);
let currentQuestionIndex, shuffledQuestions;
// start game
function startGame() {
  getQuestion.classList.remove('hide');
  answers.classList.remove('hide');
  startButton.classList.add('hide');
  quizTitle.classList.add('hide');
  resetButton.classList.add('hide');
  yourScore.classList.add('hide');
  scoreAdd.classList.remove('hide');
  shuffledQuestions = questions_array.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  finalScore.innerHTML = 0;
  // calling next question function
  nextQuestion();
}
function nextQuestion() {
  // 
  if (currentQuestionIndex === questions_array.length) {
    endScore.innerHTML = (score / questions_array.length) * 100 + '%';
    endGame();
  } else {
    showQuestion(currentQuestionIndex);
    currentQuestionIndex + 1;
  }
}
function showQuestion(current) {
  const currentQuestion = questions_array[current];
  getQuestion.innerText = currentQuestion.question;
  // looping through questions to know what answer and buttons to show
  currentQuestion.answers.forEach((answer, index) => {
    getAnswersButtons[index].innerText = answer.text;
    getAnswersButtons[index].addEventListener('click', checkAnswer);
  });
}
let score = 0;
// if questions correct adds 1 to score
function checkAnswer(event) {
  const currentQuestion = questions_array[currentQuestionIndex];
  currentQuestion.answers.forEach((answer) => {
    if (answer.correct) {
      if (answer.text === event.target.innerText) {
        score++;
      }
    }
  });
  finalScore.innerHTML = score;
  currentQuestionIndex++;
  nextQuestion();
}
// ends game
function endGame() {
  resetButton.classList.remove('hide');
  yourScore.classList.remove('hide');
  getQuestion.classList.add('hide');
  answers.classList.add('hide');
  scoreAdd.classList.add('hide');
  $("#body").css("background-color", "green")
  resetButton.addEventListener('click', () => {
    resetGame();
  });
}
function resetGame() {
  currentQuestionIndex = 0;
  score = 0;
  startButton.classList.remove('hide');
  quizTitle.classList.remove('hide');
  resetButton.classList.add('hide');
  yourScore.classList.add('hide');
  scoreAdd.classList.add('hide');
  $("#body").css("background-color", "blue")
}