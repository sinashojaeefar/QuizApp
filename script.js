const questions = [
    {
        question: "CSS stands for?",
        answers: [
            {text: "Cascading Style Sheets", correct: true},
            {text: "Casting Style Sheets", correct: false},
            {text: "Cascading Selection Styles", correct: false},
            {text: "Cascading Some Styles", correct: false},
        ]
    },

    {
        question: "What is JavaScript?",
        answers: [
            {text: "a web browser", correct: false},
            {text: "an operating system", correct: false},
            {text: "a very popular programming language", correct: true},
            {text: "an android application", correct: false},
        ]
    },

    {
        question: "What is Bootstrap?",
        answers: [
            {text: "A programming language", correct: false},
            {text: "A version control system", correct: false},
            {text: "A database management system", correct: false},
            {text: "A front-end development framework", correct: true},
        ]
    },

    {
        question: "Which of the following is NOT a JavaScript data type?",
        answers: [
            {text: "Boolean", correct: false},
            {text: "Integer", correct: true},
            {text: "Object", correct: false},
            {text: "String", correct: false},
        ]
    },

    {
        question: "What is ReactJS?",
        answers: [
            {text: "A front-end development framework", correct: true},
            {text: "A database management system", correct: false},
            {text: "A back-end programming language", correct: false},
            {text: "A version control system", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answerbtn");
const nextBtn = document.getElementById("nextbtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.innerHTML = answer.text;
        btn.classList.add("btn");
        answerBtns.appendChild(btn);

        if(answer.correct) {
            btn.dataset.correct = answer.correct;
        }
        btn.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while(answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
}


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;

    } else {
        selectedBtn.classList.add("inCorrect");
    }

    Array.from(answerBtns.children).forEach(btn => {
        if(btn.dataset.correct === "true") {
            btn.classList.add("correct");
        }
        btn.disabled = true;
    });

    nextBtn.style.display = "block";
}

    function showScore() {
        resetState();
        questionElement.innerHTML = `You score ${score} form question ${questions.length}`;
        nextBtn.innerHTML = 'play Again';
        nextBtn.style.display = "block";
    }

    function handleNextButton() {
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }

    nextBtn.addEventListener("click", () => {
        if(currentQuestionIndex < questions.length) {
            handleNextButton();
        } else {
            startQuiz();
        }
    });

    startQuiz();

