var userClickedPattern = []


// 5. At the top of the game.js file, create a new empty array called gamePattern.
var gamePattern = []


// 3. At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var buttonColors = ["red", "blue", "green", "yellow"]

var started = false;

var level = 0;

$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Level " + level)
    nextSequence();
    started = true;
  }
})


function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success")

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence()
      }, 1000)
    }
  }
  else {
    console.log("wrong")

    playSound("wrong")

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200)


    $("#level-title").text("Game Over, Press Any Key To Restart")

    startOver();
  }

}


$(".btn").click(function () {

  var userChosenColor = $(this).attr("id")
  userClickedPattern.push(userChosenColor)
  console.log(userClickedPattern)

  playSound(userChosenColor)
  animatePress(userChosenColor)

  checkAnswer(userClickedPattern.length-1)

})  //handler function


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed")

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100)
}

// 1. Inside game.js create a new function called nextSequence()
function nextSequence() {

  userClickedPattern = []

  level++;
  $("#level-title").text("Level " + level)


// 2. Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
//
// You can use the Chrome console to verify that your code creates random numbers between the correct range.
  var randomNumber = Math.floor(Math.random() * 4)  //here we didnt added "+1" because we want to include 0 to access the array
  console.log(randomNumber)

// 4. Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
  var randomChosenColor = buttonColors[randomNumber]
  console.log(randomChosenColor)


// 6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
  gamePattern.push(randomChosenColor)

  $("#" + randomChosenColor).fadeOut(200).fadeIn(200)


  playSound(randomChosenColor)

}

function startOver() {

  level = 0;
  gamePattern = [];
  started = false;
}
