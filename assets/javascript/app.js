$(document).ready(function () {
  //questions
  var game =
    questions: [{
        question: 'Question 1',
        answer: 'Answer 1',
        choices: ['Answer 1', "Answer 2", "Answer 3"],
        userAnswer: ""
      },
      {
        question: 'Question 2',
        answer: 'Answer 2',
        choices: ['Answer 1', "Answer 2", "Answer 3"],
        userAnswer: ""
      },
      {
        question: 'Question 3',
        answer: 'Answer 3',
        choices: ['Answer 1', "Answer 2", "Answer 3"],
        userAnswer: ""
      },
      {
        question: 'Question 4',
        answer: 'Answer 3',
        choices: ['Answer 1', "Answer 2", "Answer 3"],
        userAnswer: ""
      },
      {
        question: 'Question 5',
        answer: 'Answer 1',
        choices: ['Answer 1', "Answer 2", "Answer 3"],
        userAnswer: ""
      },
      {
        question: 'Question 6',
        answer: 'Answer 2',
        choices: ['Answer 1', "Answer 2", "Answer 3"],
        userAnswer: ""
      },
      {
        question: 'Question 7',
        answer: 'Answer 3',
        choices: ['Answer 1', "Answer 2", "Answer 3"],
        userAnswer: ""
      },
      {
        question: 'Question 8',
        answer: 'Answer 1',
        choices: ['Answer 1', "Answer 2", "Answer 3"],
        userAnswer: ""
      },
      {
        question: 'Question 9',
        answer: 'Answer 2',
        choices: ['Answer 1', "Answer 2", "Answer 3"],
        userAnswer: ""
      },
      {
        question: 'Question 10',
        answer: 'Answer 3',
        choices: ['Answer 1', "Answer 2", "Answer 3"],
        userAnswer: ""
      }
    ]
};

$(".startGame").on("click", function () {
  // when the start button clicked, the div with the questions that was hidden is shown
  $('.wrapper').show();
  console.log('hello');

  $(this).hide();
});


// create timer count variables //
var counter = 60
var intervalId;

// on click function to start //
$("#start").on("click", start);

function start() {
  clearInterval(intervalId);
  intervalId = setInterval(decrement, 1000);
}

function decrement() {
  counter--;

  $("#gameTimer").html("Time Remaining: " + counter);

  if (counter === 0) {
    stop();
    alert("Time is up!");
  }
}

function stop() {
  clearInterval(intervalId);
}









//don't delete
});