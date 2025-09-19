buttonColors = ["red", "green", "blue", "yellow"];
gamePattern = [];
userClickedPattern = [];
var level = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    level++;
    $("h1").text("level " + level);
    playSooundAndAnimate(randomChosenColor);
    gamePattern.push(randomChosenColor);
}

var started = false;

$(document).on("keypress", function() {
    if (!started) {
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSooundAndAnimate(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function playSooundAndAnimate(name) {
    $("#" + name).fadeOut(100).fadeIn(100);
    $("#" + name).addClass("newstyle");
    setTimeout(function() {
        $("#" + name).removeClass("newstyle");
    }, 200);
    new Audio("audio/" + name + ".mp3").play();
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
            console.log("success");
        }
    } else {
        $("#main-title").text("Wrong Color! Game Over!!! Press any key to restart");
        userClickedPattern = [];
        gamePattern = [];
        level = 0; 
        started = false;
        $("body").addClass("new-body");
        setTimeout(function() {
            $("body").removeClass("new-body");
        }, 400);
    }
}