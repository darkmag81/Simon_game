var game = {
    difficulty: "easy",
    move: [],
    player: [],
    count: 0,
    score: 0,
    state: 0,
    rndPattern: false,
    settingsCard: false,
    dif: 4,
    del: 3000,
    sound: false,
    endG: false,
    inGameDelay: 3000,
};
var aud = {
    sound: {
        b1: new Audio('assets/sound/sound1.wav'),
        b2: new Audio('assets/sound/sound2.wav'),
        b3: new Audio('assets/sound/sound3.wav'),
        b4: new Audio('assets/sound/sound4.wav'),
        b5: new Audio('assets/sound/sound5.wav'),
        b6: new Audio('assets/sound/sound6.wav'),
        click: new Audio('assets/sound/click.wav'),
        lose: new Audio('assets/sound/lose.wav'),
        advance: new Audio('assets/sound/advance.wav'),
        win: new Audio('assets/sound/win.wav')
    },
};
var record = {
    difficulty: "easy",
    random: false,
    round: 1,
    score: 0
};

var randomPatternLabel = document.getElementById("rndPattern");
var settingsCard = $("#sc");
var middleCircle = $("#middleCircle");
var display = $("#middleCircle p");
var settingsCard = $("#settingsCard");
var settingsButton = $("#settingsButton");
var soundButton = $("#soundButton");
var topLink = $("#topLink");
var loadingScreen = $(".loadingScreen");
var difficultyLabel = $("#diffic");
var b1 = $("#b1");
var b2 = $("#b2");
var b3 = $("#b3");
var b4 = $("#b4");
var b5 = $("#b5");
var b6 = $("#b6");


$(document).ready(function() {

    loadingScreen.css("display", "none");
    middleCircle.on("click", function() { start() });
    settingsButton.on("click", function() { settings() });
    soundButton.on("click", function() { soundToggle() });
    topLink.on("click", function() {
        var win = window.open("https://en.wikipedia.org/wiki/Simon_(game)", '_blank');
        win.focus();
    });
});

function randomPattern() {
    playSound("click");
    if (!game.rndPattern) {
        game.rndPattern = true;
        randomPatternLabel.innerHTML = "Yes";
    }
    else if (game.rndPattern) {
        game.rndPattern = false;
        randomPatternLabel.innerHTML = "No";
    }
} // Toggle game option for random Pattern, update display

function soundToggle() {
    var icon = document.getElementById('soundIcon');
    if (!game.sound) {
        icon.innerHTML = '<i class="fas fa-volume-up"></i>';
        game.sound = true;
        icon.style.paddingRight = "0";
    }
    else if (game.sound) {
        icon.innerHTML = '<i class="fas fa-volume-off"></i>';
        game.sound = false;
        icon.style.paddingRight = "1.7vw";
    }
} // Toggle sound on/off - changes icon 

function settings() {
    playSound("click");
    if (!game.settingsCard) {
        settingsCard.animate({ opacity: 1 }, 500);
        settingsCard.css("z-index", "10");
        game.settingsCard = true;
    }
    else if (game.settingsCard) {
        settingsCard.animate({ opacity: 0 }, 500);
        setTimeout(function() {
            settingsCard.css("z-index", "-10");
            middleCircle.on("click", function() { start() });
        }, 500);
        game.settingsCard = false;
    }

} // Toggle Settings menu opacity 1/0 

function checkIfRecord() {
    if (game.score > record.score) {
        quick("!!! NEW RECORD !!!", 2000);
        record.difficulty = game.difficulty;
        record.random = game.rndPattern;
        record.round = game.count;
        record.score = game.score;
        updateRecord();
    }
    else {
        quick("No Record This time...", 1000);
    }
} // Check if current score is higher than best run score

function updateRecord() {
    var recordString = "";
    var secondString = "";
    recordString = record.score + " points on " + record.difficulty + "  (" + record.round + "R)";
    if (game.rndPattern) {
        secondString = "Random Pattern.";
    }
    else {
        secondString = "Standard Pattern.";
    }

    document.getElementById("highScore").innerHTML = recordString;
    document.getElementById("highScoreB").innerHTML = secondString;
} // Update Record on display

function flash(pad, color) {
    if (pad == "b1") {
        b1.css("background-color", color);
    }
    else if (pad == "b2") {
        b2.css("background-color", color);
    }
    else if (pad == "b3") {
        b3.css("background-color", color);
    }
    else if (pad == "b4") {
        b4.css("background-color", color);
    }
    else if (pad == "b5") {
        b5.css("background-color", color);
    }
    else if (pad == "b6") {
        b6.css("background-color", color);
    }
    else {
        console.log("flash function failed...");
    }
} // changes pad background color to different color !!!!!!!!!!!!!! to change 

function isTouchDevice() {
    if ("ontouchstart" in document.documentElement) {
        return true;
    }
    else {
        return false;
    }
} // check if device is touch

function hoverEffectsOn() {
    function b1hoverin() {
        b1.css("border", "20px solid red");
    }

    function b1hoverout() {
        b1.css("border", "3px solid red");
    }

    function b2hoverin() {
        b2.css("border", "20px solid yellow");
    }

    function b2hoverout() {
        b2.css("border", "3px solid yellow");
    }

    function b3hoverin() {
        b3.css("border", "20px solid white");
    }

    function b3hoverout() {
        b3.css("border", "3px solid white");
    }

    function b4hoverin() {
        b4.css("border", "20px solid green");
    }

    function b4hoverout() {
        b4.css("border", "3px solid green");
    }

    function b5hoverin() {
        b5.css("border", "20px solid blue");
    }

    function b5hoverout() {
        b5.css("border", "3px solid blue");
    }

    function b6hoverin() {
        b6.css("border", "20px solid purple");
    }

    function b6hoverout() {
        b6.css("border", "3px solid purple");
    }


    b1.on("mouseenter", flash("b1", "red"));
    b1.on("mouseleave", flash("b1", "black"));
    b1.on("mouseover", b1hoverin);
    b1.on("mouseout", b1hoverout);
    b5.on("mouseover", b5hoverin);
    b5.on("mouseout", b5hoverout);
    b4.on("mouseover", b4hoverin);
    b4.on("mouseout", b4hoverout);
    b6.on("mouseover", b6hoverin);
    b6.on("mouseout", b6hoverout);
    b3.on("mouseover", b3hoverin);
    b3.on("mouseout", b3hoverout);
    b2.on("mouseover", b2hoverin);
    b2.on("mouseout", b2hoverout);
} // add hover effects to pads

function hoverEffectsOff() {
    $(".pad").off("mouseenter");
    $(".pad").off("mouseleave");
} // remove mouse effects over pads

function goFullScreen() {
    playSound("click");
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        }
        else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        }
        else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    }
    else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
} // toggle full-screen 

function diff() {
    playSound("click");
    if (game.difficulty == "hard") {
        b5.toggle(200);
        b6.toggle(200);
        difficultyLabel.text("Easy");
        game.difficulty = "easy";
    }
    else if (game.difficulty == "easy") {
        b5.toggle(200);
        difficultyLabel.text("Normal");
        game.difficulty = "normal";
    }
    else if (game.difficulty == "normal") {
        b6.toggle(200);
        difficultyLabel.text("Hard");
        game.difficulty = "hard";
    }
} // toggle difficulty, update screen

function setDif() {
    if (game.difficulty == "easy") { game.dif = 4 }
    else if (game.difficulty == "normal") { game.dif = 5 }
    else if (game.difficulty == "hard") { game.dif = 6 }
} // set Global Difficulity

function deactivatePadHandlers() {
    b1.off("click");
    b2.off("click");
    b3.off("click");
    b4.off("click");
    b5.off("click");
    b6.off("click");
} // Remove click event from pads

function playSound(snd) {
    if (game.sound) { aud.sound[snd].play(); }

} // Play sound if global sound is on

function playerRound() {
    game.player = [];
    setTimeout(function() {
        b1.on("click", function() {
            addMove(this.id);
            playSound(this.id);
        });
        b2.on("click", function() {
            addMove(this.id);
            playSound(this.id);
        });
        b3.on("click", function() {
            addMove(this.id);
            playSound(this.id);
        });
        b4.on("click", function() {
            addMove(this.id);
            playSound(this.id);
        });
        b5.on("click", function() {
            addMove(this.id);
            playSound(this.id);
        });
        b6.on("click", function() {
            addMove(this.id);
            playSound(this.id);
        });
        checkPlayer();
        if (!isTouchDevice()) { hoverEffectsOn() }
    }, game.inGameDelay + game.move.length * 1000);
    middleCircle.removeClass("active");
} // Adding click events to pads

function addMove(pad) {
    game.player.push(pad);
    checkPlayer();
} // Pushing player move into array

function addMoveToPattern() {
    if (!game.rndPattern) {
        var rnd = Math.floor(Math.random() * game.dif) + 1;
        game.move.push("b" + rnd);
    }
    else if (game.rndPattern) {
        for (var r = 0; r < game.count; r++) {
            rnd = Math.floor(Math.random() * game.dif) + 1;
            game.move[r] = ("b" + rnd);
        }
    }
    showMoves();
} // Adding move to pattern or creating new pattern for n moves

function colorPick(step) {
    var colorPicked = "";
    switch (step) {
        case "b1":
            {
                return colorPicked = "red";
            }
        case "b2":
            {
                return colorPicked = "yellow";
            }
        case "b3":
            {
                return colorPicked = "white";
            }
        case "b4":
            {
                return colorPicked = "green";
            }
        case "b5":
            {
                return colorPicked = "blue";
            }
        case "b6":
            {
                return colorPicked = "purple";
            }
        default:
            {
                console.log("colorPick failed...");
            }
    }
} // Color pick !!!!!!!!! to change

function deactivateButtons() {
    middleCircle.off("click");
    settingsButton.off("click");
    settingsButton.css("cursor", "default");
    settingsButton.animate({ opacity: 0 }, 200);
} // Remove handlers from buttons

function activateButtons() {
    setTimeout(function() {
        display.html('<i class="fas fa-play"></i>');
        middleCircle.addClass("active");
        middleCircle.on("click", function() { start() });
        settingsButton.on("click", function() { settings() });
        settingsButton.animate({ opacity: 1 }, 200);
        settingsButton.css("cursor", "pointer");
    }, game.del + (game.move.length * 1000) + 200);
} // Adding handlers to buttons

function showMoves() {
    updateDisplay();
    deactivatePadHandlers();
    displayCountdown();
    game.state = 3;
    game.move.forEach(function(element, x) {
        setTimeout(function() {
            flash(element, colorPick(element));
            playSound(element);
        }, 1000 * x + game.del);
        setTimeout(function() { flash(element, "black") }, 1000 * x + 400 + game.del);
    });
    clearPlayer();
    playerRound();
} // setTimeout function for showing move pattern to player

function clearPlayer() {
    game.player = [];
} // Clear player score

function checkIfSettingsOpen() {
    if (game.settingsCard == true) {
        settingsCard.animate({ opacity: 0 }, 500);
        setTimeout(function() {
            settingsCard.css("z-index", "-10");
        }, 500);
        game.settingsCard = false;
    }
} // Checking if Settings card is open and visible

function updateDisplay() {
    $("#move").text(game.move);
    middleCircle.addClass("active");
    display.text("");
    $("#roundCounter").text(game.count);
} // Update display

function displayCountdown() {
    game.state = 2;
    if (!isTouchDevice()) { hoverEffectsOff() }
    setTimeout(function() { display.text("Watch") }, 100);
    setTimeout(function() { display.text("Remember") }, 600);
    setTimeout(function() { display.text("Repeat") }, 1200);
    setTimeout(function() { display.text("") }, 1800);
    setTimeout(function() { display.text("Round: " + game.count) }, 2000);
    setTimeout(function() { display.text("GO!!!") }, 2500);
} // setTimeout function for middle menu countdownn

function quick(text, delay) {
    $("#quickBar p").text(text);
    $("#quickBar").animate({ top: "0" }, 300).delay(delay).animate({ top: "-20vw" }, 200);
} // Shows 'text' in sliding bar for 'delay' ms

function checkPlayer() {

    if ((game.player[game.player.length - 1] == game.move[game.player.length - 1]) && game.player.length > 0) {
        display.text("Good");
        setTimeout(function() { display.text(""); }, 400);
    }
    else if (game.player[game.player.length - 1] !== game.move[game.player.length - 1]) {
        display.text("Game Over");
        checkIfRecord();
        game.endG = true;
        game.count = 0;
        game.state = 4;
        setTimeout(function() {
            if (!isTouchDevice()) {
                hoverEffectsOff();
            }

            endGame();

        }, 1300);
    }
    if (!game.endG) {
        var check = game.player.length === game.move.length;
        if (check) {
            setTimeout(function() {
                display.text("Next Round");
                nextLevel();
            }, 1300);
        }
    }
    else if (game.endG) {

    }
} // Checking player move and chosing how to proced

function updateScore() {
    game.score += game.move.length * (game.dif - 3);
    $("#score").text(game.score);
    switch (game.player.length) {
        case 1:
            quick("Good Start", 300);
            break;
        case 3:
            quick("Keep going", 300);
            break;
        case 5:
            quick("Well Done", 300);
            break;
    }
} // Update score. Extra quick bar comments on special move count

function nextLevel() {
    updateScore();
    addCount();
} // Next round

function prepareNewGame() {
    game.move = [];
    game.player = [];
    game.count = 0;
    game.score = 0;
    addCount();
} // Clearing game variables

function addCount() {
    game.count++;
    deactivateButtons();
    setDif();
    checkIfSettingsOpen();
    addMoveToPattern();

} // Add round

function endGame() {
    game.move = [];
    game.player = [];
    game.count = 0;
    game.state = 4;
    game.endG = false;
    deactivatePadHandlers();
    hoverEffectsOff();
    activateButtons();

} // End game

function start() {
    playSound("advance");
    prepareNewGame();
} // Start button clicked





// $(window).on('scroll', _.debounce(doSomething, 200));
//
//
// var debounced_version = _.debounce(doSomething, 200);
// $(window).on('scroll', debounced_version);
//
// If you need it
// debounced_version.cancel();
//
// function throttled_version() {
//   item[1].style.width = window.scrollY + 100 + 'px';
// }
//
// window.addEventListener('scroll', _.throttle(throttled_version, 16), false);
//
//
//
