var buttonColour = ["red", "green", "blue", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColour[randomNumber];

    level++;   
    $("h1").text("Level " + level);

    userClickedPattern = [];

    gamePattern.push(randomChoosenColor);
    
    playSound(randomChoosenColor);

}

var started = false ;

$(document).on("keypress", function(event) { 
    
    if (!started) {
        nextSequence();
        started = true;
    }

    console.log(event);
    console.log("Game Started:", gamePattern);
});


function playSound(name) {
    var newAudio = new Audio("sounds/" + name + ".mp3");
    newAudio.play();
    $("#" + name).fadeOut(100).fadeIn(100);
}



$(".btn").on("click", function(event){

    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);

    playSound(userChoosenColor);

    $("#level-title").text("Level " + level);

    checkAnswer(userClickedPattern.length - 1);
    console.log("Game Pattern:", gamePattern);
    console.log("User Pattern:", userClickedPattern);    
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (gamePattern.length === userClickedPattern.length) {
        setTimeout(nextSequence, 1000);
        console.log("success");
    }
         
    }  else {
        console.log("wrong");
        $("h1").text("Game over!! Press any key to Restart.");
        $("body").addClass("flash-body").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100, function() {
            $("body").removeClass("flash-body");
        });
        startOver();
    }
}

function startOver() {
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        started = false;
    }













    










