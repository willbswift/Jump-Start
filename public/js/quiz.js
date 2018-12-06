
//load stuff
$(document).ready(function () {

  //establish questions as objects
  let question0 = {
    question: "What song rhythm should you do CPR to?",
    choice: ["Stayin' Alive", "Another One Bites The Dust", "Don't You Want Me", "Rock Your Body"],
    correctButton: "aChoice",
    correct: "aChoice",
  };

  let question1 = {
    question: "What do you do when someone suddenly dies?",
    choice: ["Bury them", "Harvest their organs", "Shove them in a closet", "Run around and scream"],
    correct: "bChoice",
  };

  let question2 = {
    question: "What is the name of the security guard?",
    choice: ["Erin", "Ryan", "Kelly", "Hank"],
    correct: "dChoice"
  };

  let question3 = {
    question: "How many people get their arms cut off in a recycling baler each year?",
    choice: ["0", "5", "10", "20"],
    correct: "cChoice"
  };

  let question4 = {
    question: "Who doesn't have full internet access?",
    choice: ["Kevin", "Phyllis", "Dwight", "Jim."],
    correct: "aChoice"
  };

  //** REST OF QUESTIONS GO HERE

  //establish variables
  let allQuestions = [question0, question1, question2, question3, question4];
  let currentQuestion;
  let questionAnswered = false;
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let i = -1;

  // function shuffle(array) {
  //   let currentIndex = array.length, temporaryValue, randomIndex;
  //   // While there remain elements to shuffle...
  //   while (0 !== currentIndex) {
  //     // Pick a remaining element...
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex -= 1;
  //     // And swap it with the current element.
  //     temporaryValue = array[currentIndex];
  //     array[currentIndex] = array[randomIndex];
  //     array[randomIndex] = temporaryValue;
  //   }
  //   return array;
  // }

  //game reset code
  function initializeGame() {
    //code to allow answers to be picked
    i = -1;
    correctAnswers = 0;
    wrongAnswers = 0;
    $(".question").show();
    $(".instructions").show();
    $(".instructions1").hide();
    $(".status").hide();
    $(".failure").hide();
    $(".success").hide();
    //shuffle questions
    // allQuestions = shuffle(allQuestions);
  };

  //question reset code
  function initializeQuestion() {
    //create a function to select each question and present it
    //create code to present each question and answers in turn
    i = i + 1;
    console.log(i);
    $(".answer").show();
    $(".answer").prop('disabled', false);
    $(".status").hide();
    $(".failure").hide();
    $(".success").hide();
    if (questionAnswered === true) {
      questionAnswered = false;
    }
    $(".seal").show();
    //code to allow answers to be picked
    currentQuestion = allQuestions[i].question;
    console.log(currentQuestion);
    $(".question").html(currentQuestion);
    currentAChoice = allQuestions[i].choice[0];
    console.log(currentAChoice);
    $("#aChoice").html(currentAChoice);
    currentBChoice = allQuestions[i].choice[1];
    console.log(currentBChoice);
    $("#bChoice").html(currentBChoice);
    currentCChoice = allQuestions[i].choice[2];
    console.log(currentCChoice);
    $("#cChoice").html(currentCChoice);
    currentDChoice = allQuestions[i].choice[3];
    console.log(currentDChoice);
    $("#dChoice").html(currentDChoice);
    correctChoice = allQuestions[i].correct;
    console.log(correctChoice);
  };

  function chosen() {
    //code to prevent more questions being picked
    $(".answer").prop('disabled', true);
    //hide other answers
    $(".answer").hide();
    //show correct answer
    $("[value='" + correctChoice + "']").show();
    //show result info
    $(".status").show();
  };

  function gameOver() {
    console.log("GAME OVER");
    setTimeout(function () {
      $(".instructions").hide();
      $(".question").hide();
      $(".answer").hide();
      $(".success").hide();
      $(".failure").hide();
      $(".current").hide();
      $(".status").hide();
      $(".startgame").text("You're all finished! Don't forget to log out");
      // $(".startgame").html("Start Exam Again");
      $("#startgame").show();
      // $("#startgame").click(function () {
        // initializeGame();
        // initializeQuestion();
        // $(".startgame").hide();
      // });
    }, 2000);
  }

  //start game (over)
  $(".instructions").hide();
  $(".question").hide();
  $(".answer").hide();
  $(".success").hide();
  $(".failure").hide();
  $(".current").hide();
  $(".status").hide();
  $(".instructions1").show();
  $(".startgame").html("Start Quiz");
  $("#startgame").show();
  $("#startgame").click(function () {
    initializeGame();
    initializeQuestion();
    $(".startgame").hide();
  });

  $('.answer').bind('click', function (evt) {

    if ($(this).val() === correctChoice) {
      console.log("Correct!");
      correctAnswers = correctAnswers + 1;
      chosen();
      $(".status").html("<h2>Correct!</h2>");
        questionAnswered = true;
        console.log(questionAnswered);

    }
    else {
      wrongAnswers = wrongAnswers + 1;
      console.log("loser!");
      chosen();
      $(".status").html("<h2>Incorrect. See above for correct answer.</h2>");
      //code for duration
      questionAnswered = true;
      console.log(questionAnswered);
    }

    if (questionAnswered === true && i < allQuestions.length - 1) {
      setTimeout(function () {
        //code to activate next question
        initializeQuestion();
      }, 2000);
    }
    //code to reset game
    if (questionAnswered === true && i >= allQuestions.length - 1) {
      gameOver();
    }
  });
});








