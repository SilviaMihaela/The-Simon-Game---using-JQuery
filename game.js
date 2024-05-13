
let gamePattern = [];
let userClickedPatterns = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let gameStarted = [];
let level = -1;

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  level += 1;
  $("h1").text("Level " + level)
  userClickedPatterns = [];
}

$(".btn").click(function() {
let userChosenColour = this.id;
userClickedPatterns.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
if (userClickedPatterns.length === gamePattern.length) {
  checkAnswer()
}
});

function playSound(name) {
let audio = new Audio("sounds/" + name  + ".mp3");
audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$("body").keypress(function(event) {
  setTimeout(function () {
    gameStarted.push("tasta")
    if (gameStarted.length === 1) {
      nextSequence();
  };
  }, 1000);

})

function checkAnswer(currentLevel) {
  if (userClickedPatterns.toString() === gamePattern.toString()) {
    setTimeout(function () {
      nextSequence();
    }, 1000);
  } else gameOver();
  }


  function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
  }, 200);
    $("h1").text("Game Over, press any key to restart!");
    gameStarted = [];
    level = -1;
    gamePattern = [];
  }
