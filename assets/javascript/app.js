//create questionArray
var questionArray = [{
    question: 'Which planet is nearest the sun?',
    answer: 'Mercury',
    choices: ['Mars', "Jupitor", "Mercury"],
  },
  {
    question: 'Who said E=mc2?',
    answer: 'Albert Einstein',
    choices: ['Albert Einstein', "Bill Gates", "Stephen Hawking"],
  },
  {
    question: 'Where is the smallest bone in the body?',
    answer: 'Ear',
    choices: ['Ear', "Hand", "Foot"],
  },
  {
    question: 'When did the New York Jets win their first and only Super Bowl?',
    answer: '1968',
    choices: ['1965', "1968", "1972"],
  },
  {
    question: '2 + 2 = ?',
    answer: '4',
    choices: ['6', "10", "4"],
  }
]

//create timer 
var card = $("#trivia-form");
var results = $("#results");
var timer;
var gameLogic = {
  correct: 0,
  incorrect: 0,
  counter: 5,
  countDown: function () {
    gameLogic.counter--;
    console.log(gameLogic.counter);
    $("#gameTimer").text(gameLogic.counter);
    if (gameLogic.counter === 0) {
      console.log("times up");
      gameLogic.done();
    }
  },

  //create start game function
  start: function () {
    $("#trivia-form").empty();
/* 
    // reset game info
    gameLogic.correct = 0;
    gameLogic.incorrect = 0;
    gameLogic.counter = 5; */

    timer = setInterval(gameLogic.countDown, 1000);
    // $("#trivia-form").prepend("<h2>Time Remaining: <span id='gameTimer'>120</span> Seconds</h2>")
    $("#start-button").hide();

    for (var i = 0; i < questionArray.length; i++) {
      card.append("<h2>" + questionArray[i].question + "</h2>");
      for (var j = 0; j < questionArray[i].choices.length; j++) {
        card.append("<input type='radio' class='mx-1' name='question" + i +
          "'value='" + questionArray[i].choices[j] + "''>" + questionArray[i].choices[j]);
      }
    }
    
    card.append("<button id='done'>Done</button>");
  },

  done: function (event) {
    // event.preventDefault();
    var inputs = card.children("input:checked");
    console.log(inputs);
    $("#start-button").show();
    for (var i = 0; i < inputs.length; i++) {
      if ($(inputs[i]).val() === questionArray[i].answer) {
        gameLogic.correct++;
      } else {
        gameLogic.incorrect++;
      }
    }
    gameLogic.result();
  },

  //create results function
  result: function () {
    clearInterval(timer);

    $("#trivia-form").remove();

    results.html("<h2>All Done!</h2>");
    results.append("<h3>Correct Answers: " + this.correct + "</h3>");
    results.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    results.append("<h3>UnAnswered: " + (questionArray.length - (this.incorrect + this.correct)) + "</h3>");
  }
};


$(document).ready(function() {
  // bind start button
  $("#start-button").on("click", gameLogic.start);

  // bind done button
  $(document).on("click", "#done", gameLogic.done);
})
