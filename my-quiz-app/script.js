const questions = [
  {
    question: "Which language adds structure to a web page?",
    answers: ["CSS", "HTML", "Python", "SQL"],
    correctAnswer: "HTML"
  },
  {
    question: "Which language is mainly used to style web pages?",
    answers: ["CSS", "Java", "C++", "Ruby"],
    correctAnswer: "CSS"
  },
  {
    question: "Which keyword declares a variable that can be reassigned in JavaScript?",
    answers: ["const", "fixed", "let", "static"],
    correctAnswer: "let"
  },
  {
    question: "Which HTML tag creates a clickable link?",
    answers: ["<link>", "<a>", "<href>", "<button-link>"],
    correctAnswer: "<a>"
  },
  {
    question: "Which method selects an element by its CSS selector in JavaScript?",
    answers: [
      "document.find()",
      "document.querySelector()",
      "document.getStyle()",
      "document.selectCSS()"
    ],
    correctAnswer: "document.querySelector()"
  }
];

const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const questionCount = document.querySelector("#question-count");
const scoreLabel = document.querySelector("#score-label");
const progressBar = document.querySelector("#progress-bar");
const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const resultMessage = document.querySelector("#result-message");
const restartButton = document.querySelector("#restart-button");

let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  questionCount.textContent =
    `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  scoreLabel.textContent = `Score: ${score}`;
  progressBar.style.width =
    `${(currentQuestionIndex / questions.length) * 100}%`;
  questionElement.textContent = currentQuestion.question;

  answerButtons.replaceChildren();
  feedback.textContent = "";
  feedback.className = "feedback";
  nextButton.hidden = true;
  answerSelected = false;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(button, answer));
    answerButtons.append(button);
  });
}

function selectAnswer(selectedButton, selectedAnswer) {
  if (answerSelected) return;

  answerSelected = true;
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;
  const buttons = answerButtons.querySelectorAll("button");

  buttons.forEach((button) => {
    button.disabled = true;

    if (button.textContent === correctAnswer) {
      button.classList.add("correct");
    }
  });

  if (selectedAnswer === correctAnswer) {
    score += 1;
    scoreLabel.textContent = `Score: ${score}`;
    feedback.textContent = "Correct! Nice work.";
    feedback.classList.add("correct-text");
  } else {
    selectedButton.classList.add("incorrect");
    feedback.textContent = `Not quite. The correct answer is ${correctAnswer}.`;
    feedback.classList.add("incorrect-text");
  }

  progressBar.style.width =
    `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
  nextButton.hidden = false;
}

function showResults() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;

  resultMessage.textContent =
    `You got ${score} out of ${questions.length} questions correct.`;
}

function goToNextQuestion() {
  currentQuestionIndex += 1;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  answerSelected = false;

  resultScreen.hidden = true;
  quizScreen.hidden = false;
  showQuestion();
}

nextButton.addEventListener("click", goToNextQuestion);
restartButton.addEventListener("click", restartQuiz);

showQuestion();