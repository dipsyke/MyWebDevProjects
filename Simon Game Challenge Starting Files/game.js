let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let level = 0;
let wasGameStarted = false


nextSequence()

$(document).on("keydown", function () {
    if (wasGameStarted) {
        return
    }
    wasGameStarted = true
    displaySequence()
})


$(".btn").on("click", function () {
    let clickedElement = this;
    userClickedPattern.push(clickedElement.id);
    animatePress(this);
    playSound(clickedElement.id);

    console.log("gamePattern", gamePattern)
    console.log("userClickedPattern", userClickedPattern)

    let result = checkAnswer();
    console.log("result of checkAnswer: " + result)

    if (result == "goNextLevel") {
        nextSequence();
        level++;
        setTimeout(function (){
            displaySequence()
        }, 100)

    } else if (result == "good") {
        console.log("do good")
    } else {
        displayGameOver();
    }
})

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor)
    userClickedPattern = [];
}

function displaySequence() {
    $("h1").text("Level " + level)
    let color = gamePattern[gamePattern.length - 1]
    $("#" + color).fadeOut(100).fadeIn(100);
    playSound(color)
}
function doesUserPatternMatchGamePatternSoFar() {
    for (let i = 0; i < userClickedPattern.length; ++i) {
        if (userClickedPattern[i] !== gamePattern[i]) {
            return false
        }
    }
    return true
}

function checkAnswer() {
    if(doesUserPatternMatchGamePatternSoFar()) {
        if(gamePattern.length === userClickedPattern.length){
            return "goNextLevel"
        }
        return "good"
    }
    return "wrong"
}

function playSound(name) {
    let buttonAudio = new Audio("sounds/" + name + ".mp3");
    buttonAudio.play();
}

function animatePress(currentColor) {
    currentColor.classList.add("pressed");
    setTimeout(function () {
        currentColor.classList.remove("pressed")
    }, 100)
};

function displayGameOver() {
    let gameOverAudio = new Audio("sounds/wrong.mp3")
    gameOverAudio.play();

    $("h1").text("Game Over")

    document.body.classList.add("game-over")
    setTimeout(function () {
        document.body.classList.remove("game-over")
        clearGameState();
    }, 1000)


}

function clearGameState() {
    level = 0;
    gamePattern = [];
    userClickedPattern=[];
    wasGameStarted = false;
    $("h1").text("Press A Key To Start")
    nextSequence()

}


// function outerFunction() {
//     let outerLet = 5;
//
//     function middleFunction1() {
//         let middleLet = 2
//
//         function innerFunction() {
//             let innerLet = 16
//             console.log(outerLet)
//             console.log(middleLet)
//             console.log(innerLet)
//         }
//
//         console.log(outerLet)
//         console.log(middleLet)
//     }
//
//     function middleFunction2() {
//         let middleLet = 28
//         console.log(outerLet)
//         console.log(middleLet)
//
//     }
//
//     console.log(outerLet)
// }