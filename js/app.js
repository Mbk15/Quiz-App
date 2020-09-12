//get all entries
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const questionlen = document.querySelector(".total-question");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;
// set question number at instruction page
questionlen.innerHTML = quiz.length;
// push in questions into availableQuestions Array
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i =0; i<totalQuestion; i++) {
     availableQuestions.push(quiz[i]);
    }
    
}
//set question numbers, text and options
function getNewQuestion(){
//set question number
questionNumber.innerHTML = "Question "  + (questionCounter + 1) + " of " + quiz.length;
// set question text
//get random question

const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
currentQuestion = questionIndex

 questionText.innerHTML = currentQuestion.q;
// get the position of the question index from availableQuestion Array
 const index1 = availableQuestions.indexOf(questionIndex);

 // remove thequestion index from the availableQuestion Array to avoid repetition
  availableQuestions.splice(index1,1);

  //set options
  //get the length of options
  const optionLen = currentQuestion.options.length
  //push options in to availableOptions Array
   for(let i =0; i<optionLen; i++){
       availableOptions.push(i)
   }
   optionContainer.innerHTML =''
   let animationDelay = 0.15;
   // parse options into html
   for(let i =0; i<optionLen; i++){
       //random options 
       const optionIndex = availableOptions[i]
       //get the position of ption index from available options
     
       const option = document.createElement('div');
       option.innerHTML = currentQuestion.options[optionIndex];
       option.id= optionIndex;
       option.style.animationDelay = animationDelay + 's';
       animationDelay = animationDelay + 0.15;
       option.className = "option"
       optionContainer.appendChild(option);
       option.setAttribute("onclick", "getResult(this)")
   }
 questionCounter++
}
// get the result of current attempt
function getResult(element){
    const id =parseInt(element.id);
    //get answer by comparing id of clicked option
    if(id === currentQuestion.answer){
        //set green color to corect answer
        element.classList.add("correct")
        // add indicator to right ticks
        updateAnswerIndicator("correct")
        correctAnswers++;
    }else{
         //set red color for wrong answer
        element.classList.add("wrong");
         // add indicator to wrong ticks 
         updateAnswerIndicator("wrong")

        //if answer is incorrect then mark the correct answer green
        const optionLen = optionContainer.children.length;
        for(let i =0; i<optionLen;i++){
            if(parseInt(optionContainer.children[i].id)=== currentQuestion.answer){
                optionContainer.children[i].classList.add("correct")  
            }
        }
    } 
    attempt++
    unclickableOptions();

}
 // make all options unclickable after selecting correct answer

function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i =0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered")
    }
}
//show tick boxes to illustrate clicked options
    function answersIndicator(){
        answersIndicatorContainer.innerHTML ='';
        const totalQuestion = quiz.length
        for(let i = 0; i<totalQuestion; i++){
            const indicator = document.createElement("div");
            answersIndicatorContainer.appendChild(indicator)

        }
    }
    function updateAnswerIndicator(markType){
        console.log(markType);
        answersIndicatorContainer.children[questionCounter-1].classList.add(markType);

    }
// next button
function next(){
    if(questionCounter === quiz.length){
        console.log("quiz is over");
        quizOver();
    }else{
        getNewQuestion();
    }
}
    function  quizOver(){
        //hide quiz quizBox
        quizBox.classList.add("hide")
        //show result box

        resultBox.classList.remove("hide");

        quizResult();

    }
    //get the quiz result
    function quizResult(){
        resultBox.querySelector('.total-question').innerHTML = quiz.length;
        resultBox.querySelector('.total-attempt').innerHTML =attempt;
        resultBox.querySelector('.total-correct').innerHTML = correctAnswers;
        resultBox.querySelector('.total-wrong').innerHTML = attempt - correctAnswers;
        const percent = (correctAnswers/quiz.length)*100;
        resultBox.querySelector('.Percentage').innerHTML = percent.toFixed() + " %"
        resultBox.querySelector('.total-score').innerHTML = correctAnswers + " / " + quiz.length;
    }
    resetQuiz = () =>{
                
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
    }

    tryAgainQuiz = () =>{
        //hide resultbox
        resultBox.classList.add("hide");

        //show quizBox
        quizBox.classList.remove("hide");

        resetQuiz();
        startQuiz();
     }
    startQuiz = () =>{
        //hide home box
        homeBox.classList.add("hide")
        //show quiz-box
        quizBox.classList.remove("hide");
        //set available question
        questionCounter = 0;
        setAvailableQuestions();
        // get  new questions
        getNewQuestion();
        //create answers indicator
        answersIndicator();

    }
    goHome =() =>{
        // hide result box
        resultBox.classList.add("hide");
        //show home box
        homeBox.classList.remove("hide");
        resetQuiz();
    }
    
window.onload = function(){
    setAvailableQuestions();
    getNewQuestion();
    answersIndicator();
    
}