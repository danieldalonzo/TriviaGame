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
var timer;
var gameLogic = {
  correct: 0,
  incorrect: 0,
  counter: 60,
  countDown: function () {
    gameLogic.counter--;
    $("#gameTimer").text(gameLogic.counter);
    if (gameLogic.counter === 0) {
      console.log("times up");
      gameLogic.done();
    }
  },

  //create start game function
  start: function () {
    timer = setInterval(gameLogic.countDown, 60000);
    $("#trivia-form").prepend("<h2>Time Remaining: <span id='gameTimer'>120</span> Seconds</h2>")
    $("#start").remove();

    for (var i = 0; i < questionArray.length; i++) {
      card.append("<h2>" + questionArray[i].question + "</h2>");
      for (var j = 0; j < questionArray[i].choices.length; j++) {
        card.append("<input type='radio' name='question-" + i +
          "' value='" + questionArray[i].choices[j] + "''>" + questionArray[i].choices[j]);
      }
    }
    card.append("<button id='done'>Done</button>");
  },

  done: function () {
    var inputs = card.children("input:checked");
    for (var i = 0; i < inputs.length; i++) {
      if ($(inputs[i]).val() === questionArray[i].answer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    }
    this.result();
  },

  //create results function
  result: function () {
    clearInterval(timer);

    $("#sub-wrapper h2").remove();

    card.html("<h2>All Done!</h2>");
    card.append("<h3>Correct Answers: " + this.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    card.append("<h3>UnAnswered: " + (questionArray.length - (this.incorrect + this.correct)) + "</h3>");
  }
};

$("#start").remove();

for (var i = 0; i < questionArray.length; i++) {
  card.append("<h2>" + questionArray[i].question + "</h2>");
  for (var j = 0; j < questionArray[i].choices.length; j++) {
    card.append("<input type='radio' name='question-" + i +
      "' value='" + questionArray[i].choices[j] + "''>" + questionArray[i].choices[j]);
  }
}

card.append("<button id='done'>Done</button>");