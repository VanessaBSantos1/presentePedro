const questions = [
  {
    question: "Qual o maior medo do Pedro?",
    answers: [
      { text: "Impostos", correct: false },
      { text: "Coisas caras", correct: false },
      { text: "Ser clt", correct: false },
      { text: "Ele é o Batman, não tem medo de nada", correct: true }
    ]
  },
  {
    question: "O que o Pedro faz quando está com sono?",
    answers: [
      { text: "Fica nervoso", correct: false },
      { text: "Fica lerdinho", correct: true },
      { text: "Dorme", correct: false },
      { text: "Fecha a cara", correct: false }
    ]
  },
  {
    question: "O Pedro já...",
    answers: [
      { text: "Consquistou meu coração", correct: false },
      { text: "Comprou muitos canivetes", correct: false },
      { text: "Todas as alternativas", correct: true },
      { text: "Subiu a escada sem fazer barulho", correct: false }
    ]
  }
];

const btn = document.getElementById('tecla');
const mensagem = document.getElementById('mensagem');
let tentativas = 0;

btn.addEventListener('mouseover', () => {
  if (tentativas < 5) {
    const btnWidth = btn.offsetWidth;
    const btnHeight = btn.offsetHeight;

    const x = Math.random() * (window.innerWidth - btnWidth);
    const y = Math.random() * (window.innerHeight - btnHeight);
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
    tentativas++;
  } else {
    btn.style.display = 'none';
    mensagem.style.display = 'block';
    document.getElementById("quiz-container").classList.remove("hidden");
    startQuiz();
  }
});

const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const finalScreen = document.getElementById("final-screen");
const scoreText = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("quiz-container").classList.remove("hidden");
  finalScreen.classList.add("hidden");
  showQuestion();
}

function showQuestion() {
  resetState();
  let q = questions[currentQuestionIndex];
  questionContainer.innerText = q.question;

  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.innerText = answer.text;
    btn.classList.add("btn");
    btn.onclick = () => selectAnswer(answer.correct);
    answerButtons.appendChild(btn);
  });
}

function resetState() {
  answerButtons.innerHTML = "";
  nextButton.classList.add("hidden");
}

function selectAnswer(correct) {
  if (correct) score++;
  nextButton.classList.remove("hidden");
  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === "Todas as anteriores") {
      btn.style.background = "#ffa";
    }
  });
}

nextButton.onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
};

function endQuiz() {
  document.getElementById("quiz-container").classList.add("hidden");
  finalScreen.classList.remove("hidden");
  scoreText.innerText = `Você acertou ${score} de ${questions.length} perguntas! 🎯`;
  startSlideshow();
  startConfetti();
  playMusic();


}



function startSlideshow() {
  const slides = document.querySelectorAll(".slide");
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 2000);
}

function startConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");

  const confetti = Array.from({ length: 200 }).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 5 + 5,
    speed: Math.random() * 3 + 2,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
      c.y += c.speed;
      if (c.y > canvas.height) c.y = 0;
      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.size, 0, 2 * Math.PI);
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

function playMusic() {
  const musica = document.getElementById("musica");
  musica.play();
}

// Remova a chamada startQuiz() daqui para o quiz começar só após o botão sumir
