// create variables
var correct = 0;
var incorrect = 0;
var counter = 2 * 60;
var currentTime;
var $choice;

// create trivia array
var quizBank = [{
    question: "Which of the following is not a primary color?",
    choices: [
      "Green",
      "Blue",
      "Yellow",
      "Red"
    ],
    answer: "Green",
    userAnswer: ""
  },
  {
    question: "What is the answer of 10 / (2 + 3) * 6?",
    choices: [
      "12",
      "23",
      "48",
      "0.33"
    ],
    answer: "12",
    userAnswer: ""
  },
  {
    question: "Which of the following vegetables is botanically considered a fruit?",
    choices: [
      "Carrot",
      "Tomato",
      "Broccoli",
      "Celery"
    ],
    answer: "Tomato",
    userAnswer: ""
  },
  {
    question: "How many teeth does the average adult human have?",
    choices: [
      "32",
      "26",
      "18",
      "24"
    ],
    answer: "32",
    userAnswer: ""
  },
  {
    question: "Which of the following films was directed by James Cameron?",
    choices: [
      "Ready Player One",
      "The Terminator",
      "Big Fish",
      "Adventures of Tintin"
    ],
    answer: "The Terminator",
    userAnswer: ""
  }
]

// create run function
function run() {
  // clear interval
  clearInterval(gameTimer);

  // empty timer div
  $("#gameTimer").empty();

  // restart interval
  timer = setInterval(decrement, 1000);

  // empty results div
  $("#results").empty()

  // reset correct and incorrect
  correct = 0;
  incorrect = 0;

  // reset counter
  counter = 2 * 60

  // print current time to page
  $("#timer").text(`Time Remaining: 1:00`);

  // hide start-quiz button
  $("#start-button").hide()
}

// create decrement function to lower counter by one every second
function decrement() {
  counter--;

  // convert the counter to time and print to page
  var $counter = counter * 1000;
  currentTime = timeConverter($counter);

  // print to page
  $("#timer").text(`Time Remaining: ${currentTime}`);

  // if counter runs out, run gradeQuiz function
  if (counter === 0) {
    gradeQuiz();
    clearInterval(timer);
    $("#start-button").show();
    $("#timer").empty();
    $("#quiz-form").empty();
  };
};

function timeConverter(t) {
  var minutes = Math.floor((t / 1000) / 60);
  var seconds = (t / 1000) - (minutes * 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  };

  if (minutes === 0) {
    minutes = "00"
  };

  return minutes + ":" + seconds

};

// Create quiz creation function for each question in the quiz bank
function renderQuiz() {
  // clear #quiz-form div
  $('#quiz-form').empty();

  // loop through quizBank array
  quizBank.forEach(function (question, index) {
    // create div to hold question
    var $question = $('<div>').addClass('form-group my-4');

    // add question to div
    var $label = $("<h5>")
      .text((index + 1) + ") " + question.question)
      .addClass("question")
      .appendTo($question);

    // shuffle answer choices
    question.choices = question.choices.sort(function () {
      return .5 - Math.random();
    });

    // create a loop to iterate through quizBank's choices and create radio buttons for each one
    for (var i = 0; i < question.choices.length; i++) {
      // create a div for choice and add bootstrap classes
      $choice = $('<div>').addClass('form-check form-check-inline');

      // create an input tag for radio buttons
      var $radio = $('<input>');

      // add attributes to radio buttons
      $radio
        .attr({
          type: "radio",
          value: question.choices[i],
          name: index,
          class: "form-check-input"
        })
        .appendTo($choice);

      // create label to print choice to page
      var $choiceLabel = $('<label>');
      $choiceLabel
        .text(question.choices[i])
        .addClass('form-check-label')
        .appendTo($choice);

      // add whole radio button to question
      $choice.appendTo($question);

    };

    // add question to page
    $question.appendTo($("#quiz-form"));

  });

  // create a submit button
  var $submitBtn = $('<button>')
  $submitBtn
    .attr({
      id: "submit-button",
      class: "btn btn-success btn-lg col-12 col-md-4 col-lg-3 my-4"
    })
    .text('Submit')
    .appendTo($("#quiz-form"));

};

// create a "change" listener for all radio buttons but bind them to quiz-form since it's permanently on the page
$("#quiz-form").on("change", ".form-check-input", function () {

  console.log(quizBank)
  // Get question index out of "name" attribute so we know what question you answered
  var questionIndex = $(this).attr("name")

  // get value out of radio button you selected
  var answer = $(this).val()

  // set answer to quizBank's userAnswer property
  quizBank[questionIndex].userAnswer = answer

});

function gradeQuiz() {
  // check to see if userAnswer === answer
  for (var i = 0; i < quizBank.length; i++) {
    var $userAnswer = quizBank[i].userAnswer;
    var $answer = quizBank[i].answer;

    if ($userAnswer === $answer) {
      correct++;
    } else {
      incorrect++;
    };
  };

  // create div to hold results
  var $results = $("<div>").addClass("mb-5")

  // create h2 for correct and incorrect
  var $correct = $("<h2>").text(`Correct: ${correct}`);
  var $incorrect = $("<h2>").text(`Incorrect: ${incorrect}`);

  $results.append($correct, $incorrect);


  if (correct >= 7) {
    var $message = $("<h2>")
    $message
      .addClass("font-italic mt-5")
      .text(`You know a lot of random and useless information!`)
      .appendTo($results);
  } else {
    var $message = $("<h2>")
    $message
      .addClass("font-italic mt-5")
      .text(`You have a lot to learn!`)
      .appendTo($results);
  }

  $("#results").append($results)
};

$("#start-button").on("click", function () {
  run();
  renderQuiz();
});

$(document).on("click", "#submit-button", function (event) {
  event.preventDefault();
  gradeQuiz();
  clearInterval(timer);
  $("#start-button").show();
  $("#timer").empty();
  $("#quiz-form").empty()
});

// trying to make answer choices stack on screen size < 1024px
$(window).on('load, resize', function () {
  var viewportWidth = $(window).width();
  if (viewportWidth < 1024) {
    // change $choice class
    $choice
      .removeClass("form-check form-check-inline")
      .addClass("form-check")
  };
});