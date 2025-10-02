const questions = [
    {
        question: "which is largest animal in the world ",
        answers:[
            {text: "Shark", correct:false},
            {text: "Blue whale", correct:true},
            {text: "Elephant", correct:false},
            {text: "Giraffe", correct:false},
        ]
    },
    {
         question: "Combien de faces, un cube possède-t-il ?",
        answers:[
            {text: "4", correct:false},
            {text: "6 ", correct:true},
            {text: "8", correct:false},
            {text: "10", correct:false},
        ]
    },
    {
        question: "Quel est le numéro de téléphone des urgences pour le Canada et les États-Unis d'Amérique ? ",
        answers:[
            {text: "911", correct:true},
            {text: "555", correct:false},
            {text: "112", correct:false},
            {text: "999", correct:false},
        ]
    },
    {
        question: "Quel est le nom de la partie colorée des yeux ?",
        answers:[
            {text: "La puppille", correct:false},
            {text: "La rétine", correct:false},
            {text: "La cornée", correct:false},
            {text: "L'iris", correct:true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuizz(){
    currentQuestionIndex = 0 ;
    score = 0 ;
    nextButton.innerHTML = "Next";
    ShowQuestions();
}

function ShowQuestions(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML=answers.text;
        button.classList.add("btn");
        answerButton.appendChild(button)
        if(answers.correct){
            button.dataset.correct=answers.correct;
        }
        button.addEventListener("click", selectAnwser);
    });
}

function resetState(){
    nextButton.style.display= "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnwser(e){
    const selectdBtn = e.target;
    const isCorrect = selectdBtn.dataset.correct === "true";
    if(isCorrect){
        selectdBtn.classList.add("correct");
        score++;
    }else{
        selectdBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if (button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        ShowQuestions();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuizz();
    }
})
startQuizz();