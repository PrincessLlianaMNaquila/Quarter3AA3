const questions = [
  { question: "What is the main goal of our SDG?", answers: ["Education", "Zero Hunger", "Equality", "Climate Action"], correct: 0 },
  { question: "What is one major issue seen in Education?", answers: ["Smart students", "Low quality of teaching", "Excessive government funding", "Overqualified students"], correct: 1 },
  { question: "How can technology help improve education access?", answers: ["By providing online learning platforms", "By making education more expensive", "By replacing teachers completely", "By limiting student creativity"], correct: 0 },
  { question: "Which of the following is a strategy to ensure inclusive education?", answers: ["Restricting education to top students", "Not building more accessible schools", "Higher-quality of education", "Reducing teacher training"], correct: 2 },
  { question: "What role do governments play in improving education?", answers: ["Banning online learning", "Closing public schools", "Reducing student enrollment", "Funding schools and training teachers"], correct: 3 }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 90;
let timer;
let answered = false;

function startQuiz() {
  // Personalized greeting
  const name = localStorage.getItem("firstName") || "user";
  document.getElementById("personal-greeting").textContent = `Hello, ${name}! Take the quiz below.`;

  showQuestion();
  timer = setInterval(updateTimer, 1000);
}

function showQuestion() {
  const questionContainer = document.getElementById("question-container");
  const answerButtons = document.getElementById("answer-buttons");
  questionContainer.innerHTML = `<h2>${questions[currentQuestionIndex].question}</h2>`;
  answerButtons.innerHTML = "";
  answered = false;

  questions[currentQuestionIndex].answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerText = answer;
    button.classList.add("btn");
    button.onclick = () => selectAnswer(index, button);
    answerButtons.appendChild(button);
  });

  document.getElementById("prev-btn").style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
  document.getElementById("next-btn").style.display = "inline-block";
}

function selectAnswer(index, button) {
  if (!answered) {
    const correct = questions[currentQuestionIndex].correct;
    if (index === correct) {
      score++;
      button.style.backgroundColor = "#28a745";
    } else {
      button.style.backgroundColor = "#dc3545";
    }
    answered = true;
  }
}

function nextQuestion() {
  if (!answered) {
    alert("Kindly answer this question before you proceed to the next one, thank you.");
    return;
  }
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    endQuiz();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;
  } else {
    clearInterval(timer);
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer);
  document.getElementById("question-container").innerHTML =
    `<h2>Your results are submitted, thank you for answering!</h2><h3>Your Score: ${score}/${questions.length}</h3>`;
  document.getElementById("answer-buttons").innerHTML = "";
  document.getElementById("prev-btn").style.display = "none";
  document.getElementById("next-btn").style.display = "none";
  document.getElementById("submit-btn").style.display = "none";
}

document.getElementById("submit-btn").addEventListener("click", endQuiz);
document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("prev-btn").addEventListener("click", prevQuestion);

// Start the quiz when page loads
startQuiz();
