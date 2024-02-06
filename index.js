const questions= [
    {
        question: "What is the time complexity of the quicksort algorithm in the worst case?",
        answers: [
          { text: "O(n)", correct: false },
          { text: "O(n log n)", correct: false },
          { text: "O(n^2)", correct: true },
          { text: "O(log n)", correct: false },
        ],
    },
    {
        question: "What is the purpose of dynamic programming in algorithm design?",
        answers: [
          { text: "Minimizing memory usage", correct: false },
          { text: "Solving problems by breaking them into smaller subproblems", correct: true },
          { text: "Optimizing code execution speed", correct: false },
          { text: "Handling exceptions in code", correct: false },
        ],
    },
    {
    question: "What is the purpose of the 'this' keyword in OOP?",
    answers: [
      { text: "Referring to the current function", correct: false },
      { text: "Referring to the global object", correct: false },
      { text: "Referring to the object that is currently executing the function", correct: true },
      { text: "Creating a new instance of an object", correct: false },
    ],
  },
  {
    question: "What is the difference between breadth-first search (BFS) and depth-first search (DFS) in graph traversal?",
    answers: [
      { text: "BFS uses a stack, and DFS uses a queue", correct: false },
      { text: "BFS explores nodes level by level, and DFS explores nodes deeper before moving on", correct: true },
      { text: "BFS always finds the shortest path, while DFS may not", correct: false },
      { text: "DFS is more memory-efficient than BFS", correct: false },
    ],
  },
  {
    question: "What is the purpose of the 'Big O' notation in algorithm analysis?",
    answers: [
      { text: "Expressing the maximum runtime of an algorithm", correct: true },
      { text: "Representing the minimum runtime of an algorithm", correct: false },
      { text: "Describing the average case performance of an algorithm", correct: false },
      { text: "Calculating the size of input data", correct: false },
    ],
  },
  {
    question: "What is the purpose of a hash function in data structures?",
    answers: [
      { text: "Sorting elements in an array", correct: false },
      { text: "Converting data into a fixed-size string of characters", correct: true },
      { text: "Allocating memory for variables", correct: false },
      { text: "Executing recursive algorithms", correct: false },
    ],
  },
];

const questionElement =document.getElementById("question");
const answerButtons =document.getElementById("answer-buttons");
const nextButton =document.getElementById("next-btn");

let currQuestionIndex=0;
let score=0;
function startquiz()
{
    currQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion()
{
    resetState();
    let currentQuestion=questions[currQuestionIndex];
    let questionNo=currQuestionIndex+1;
    questionElement.innerHTML=questionNo + ". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;         
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState()
{
    nextButton.style.display="none";
    while(answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;

    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct==="true")
        {
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function handleNextbutton(){
    currQuestionIndex++;
    if(currQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
function showScore()
{
    resetState();
    questionElement.innerHTML =`You score ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block"
}

nextButton.addEventListener("click",()=>{
    if(currQuestionIndex < questions.length){
        handleNextbutton();
    }
    else{
        startquiz();
    }
})

startquiz();
