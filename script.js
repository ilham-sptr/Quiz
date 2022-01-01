const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-buttons');


let shuffledQuestions, currectQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame)

nextButton.addEventListener('click', () => {
    currectQuestionIndex++
    setnextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - 0.5)
    currectQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setnextQuestion()
    quizScore=0
}



function setnextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currectQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach((answer) => {
        const button =  document.createElement('button')
        button.innerText=answer.text
        button.classList.add('btn')
        if(answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct

    setStatusClass(document.body, correct)
    Array.from (answerButtonElement.children).forEach((button) => {
        setStatusClass(button,button.dataset.correct)
    })  
    if(shuffledQuestions.length > currectQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }
    if(selectedButton.dataset = correct) {
        quizScore++
    }

    document.getElementById('right-answers').innerText=quizScore
}


function setStatusClass(element, correct) {
    clearStatusClass(element) 
        if(correct) {
            element.classList.add("correct");
        } else {
            element.classList.add("wrong");
        }
    
}




function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'Framework Javascript yang pernah dipakai oleh Facebook ?',
        answers : [
            {text: 'Python', correct: false},
            {text: 'Django', correct: false},
            {text: 'React', correct: true},
            {text: 'Eclipse', correct: false},
        ],
    },
    {
        question: 'Siapa presiden pertama di Indonesia',
        answers : [
            {text: 'Ir.Soekarno', correct: true},
            {text: 'Ki.Hj. Abdurrohman', correct: false},
        ],
    },
    {
        question: 'What is the 4 x 3 ?',
        answers : [
            {text: '6', correct: false},
            {text: '12', correct: true},
        ],
    },
    {
        question: 'Bahasa Pemograman untuk Mobile Development ?',
        answers : [
            {text: 'Laravel', correct: false},
            {text: 'Flutter', correct: true},
        ],
    },
]

