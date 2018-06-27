/*----------Game and sounds variables -----------*/
var game = {
    difficulty: "easy",
    move: [],
    player: [],
    count: 0,
    score: 0,
    state: 0,
    rndPattern: false,
    random: 0,
    settingsCard: false,
    settingsButton: true,
    dif: 1,
    del: 3000,
    sound: false,
    endG: false,
    inGameDelay: 3000,
    showMovesDelay: 4000,
    record: {
        difficulty: "easy",
        random: false,
        round: 1,
        score: 0
    } // top score variable
}; // game variable
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
}; // sound variable
/*------------- DOM Elements ---------------*/
var randomPatternLabel = $("#rndPattern");
var settingsCard = $("#sc");
var middleCircle = $("#middleCircle");
var display = $("#middleCircle p");
var settingsCard = $("#settingsCard");
var settingsButton = $("#settingsButton");
var soundButton = $("#soundButton");
var topLink = $("#topLink");
var loadingScreen = $(".loadingScreen");
var difficultyLabel = $("#diffic");
var scoreLabel = $("#score");
var quickParagraph = $("#quickBar p");
var quickCard = $("#quickBar");
var roundCounter = $("#roundCounter");
var pads = $(".pad");
var b1 = $("#b1");
var b2 = $("#b2");
var b3 = $("#b3");
var b4 = $("#b4");
var b5 = $("#b5");
var b6 = $("#b6");
var highScoreA = $("#highScoreA");
var highScoreB = $("#highScoreB");
var highScoreC = $("#highScoreC");
//Preparing game when all page is loaded
$(document).ready(function() {
    loadingScreen.css("display", "none");
    middleCircle.on("click", function() { start() });
    settingsButton.on("click", function() { settingsButtonToggle() });
    soundButton.on("click", function() { soundButtonToggle() });
    topLink.on("click", function() {
        var win = window.open("https://en.wikipedia.org/wiki/Simon_(game)", '_blank');
        win.focus();
    });
});
/*------------ Button Functions -------------------*/
function randomPatternButtonToggle() {
    playSound("click");
    if (!game.rndPattern) {
        game.rndPattern = true;
        game.random = 2;
        randomPatternLabel.text("Yes");
    }
    else if (game.rndPattern) {
        game.rndPattern = false;
        game.random = 0;
        randomPatternLabel.text("No");
    }
} // Toggle game option for random Pattern, update display
function soundButtonToggle() {
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
function settingsButtonToggle() {
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
function difficultyButtonToggle() {
    playSound("click");
    if (game.difficulty == "hard") {
        b5.toggle(200);
        b6.toggle(200);
        difficultyLabel.text("Easy");
        game.difficulty = "easy";
        game.dif = 3;
    }
    else if (game.difficulty == "easy") {
        b5.toggle(200);
        difficultyLabel.text("Normal");
        game.difficulty = "normal";
        game.dif = 1;
    }
    else if (game.difficulty == "normal") {
        b6.toggle(200);
        difficultyLabel.text("Hard");
        game.difficulty = "hard";
        game.dif = 2;
    }
} // toggle difficulty, update screen
/*------------ Special Functions -----------------*/
function isTouchDevice() {
    if ("ontouchstart" in document.documentElement) {
        return true;
    }
    else {
        return false;
    }
} // check if device is touch
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
function playSound(snd) {
    if (game.sound) { aud.sound[snd].play(); }

} // Play sound if global sound is on
function quick(text, delay) {
    quickParagraph.text(text);
    quickCard.animate({ top: "0" }, 300).delay(delay).animate({ top: "-16vw" }, 200);
} // Shows 'text' in sliding bar for 'delay' ms
/*------------------ Game functions ---------------*/
function start() {
    playSound("advance");
    prepareNewGame();
} // Start button clicked
function prepareNewGame() {
    game.showMovesDelay = 4000;
    game.move = [];
    game.player = [];
    game.count = 0;
    game.score = 0;
    settingsButtonHide();
    addCount();
} // Clearing game variables
function addCount() {
    game.count++;
    deactivateMiddleButton();
    if (game.settingsCard) settingsButtonToggle();
    addMoveToPattern();
} // Add round
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
function showMoves() {
    updateDisplay();
    deactivatePadHandlers();
    displayCountdown();
    game.state = 3;
    game.move.forEach(function(element, x) {
        setTimeout(function() {
            flash(element);
            playSound(element);
        }, 900 * x + game.del);
    });
    game.player = [];
    playerRound();
} // setTimeout function for showing move pattern to player
function flash(pad) {
    var chosenPad = $("#" + pad);
    var padColor = chosenPad.css("border-left-color");
    chosenPad.animate({backgroundColor: padColor},200).delay(200).animate({backgroundColor: "black"},200);
} // changes pad background color for border color, after delay of 200ms reverse to black backgound;
function playerRound() {
    setTimeout(function() {
        pads.on("click", function() {
            game.player.push(this.id);
            playSound(this.id);
            checkPlayer();
        });
        checkPlayer();
        if (!isTouchDevice()) { hoverEffectsOn() }
    }, game.inGameDelay + game.move.length * 1000);
    middleCircle.removeClass("active");
} // Adding click events to pads
function checkPlayer() {

    if ((game.player[game.player.length - 1] == game.move[game.player.length - 1]) && game.player.length > 0) {
        display.text(game.player.length + " of " + game.move.length);
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
function nextLevel() {
    game.showMovesDelay += 1000;
    updateScore();
    addCount();
} // Next round
function endGame() {
    game.move = [];
    game.player = [];
    game.count = 0;
    game.state = 4;
    game.endG = false;
    roundCounter.text("--");
    scoreLabel.text("--");
    deactivatePadHandlers();
    settingsButtonShow();
    hoverEffectsOff();
    activateMiddleButton();
} // End game
function checkIfRecord() {
    if (game.score > game.record.score) {
        quick("!!! NEW RECORD !!!", 2000);
        game.record.difficulty = game.difficulty;
        game.record.random = game.rndPattern;
        game.record.round = game.count;
        game.record.score = game.score;
        updateRecord();
    }
    else {
        quick("No Record This time...", 1000);
    }
} // Check if current score is higher than best run score
function updateRecord() {
    highScoreA.text(game.record.score + " points on " + game.record.difficulty);
    highScoreB.text(game.record.round + " Rounds");
    if (game.rndPattern) {
        highScoreC.text("Random Pattern.");
    }
    else {
        highScoreC.text("Standard Pattern.");
    }
} // Update Record on display
function updateScore() {
    game.score += game.move.length * (game.dif + game.random);
    scoreLabel.text(game.score);
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
function updateDisplay() {
    middleCircle.addClass("active");
    display.text("");
    roundCounter.text(game.count);
} // Update display
function displayTextInMiddleButton(text, delay) {
    setTimeout(function() { display.text(text) }, delay);
} // Displays 'text' in middle button for 'delay' miliseconds
function displayCountdown() {
    game.state = 2;
    if (!isTouchDevice()) { hoverEffectsOff() }
    displayTextInMiddleButton("Watch", 100);
    displayTextInMiddleButton("Remember", 600);
    displayTextInMiddleButton("Repeat", 1100);
    displayTextInMiddleButton("", 1600);
    displayTextInMiddleButton("Round: " + game.count, 2000);
    displayTextInMiddleButton("", 2800);
    displayTextInMiddleButton("GO!!!", game.showMovesDelay);
} // setTimeout function for middle menu countdownn
/*--------------Buttons Control-----------------------*/
function hoverEffectsOn() {
    pads.hover(function(){
        $(this).css("background-color", $(this).css("border-left-color"));
    }, function() {
        pads.css("background-color", "black");
    })
    
    
} // add hover effects to pads
function hoverEffectsOff() {
    pads.off("mouseenter");
    pads.off("mouseleave");
} // remove mouse effects over pads
function deactivatePadHandlers() {
    pads.off("click").off("mouseover").off("mouseenter");
} // Remove click event from pads
function settingsButtonHide() {

    settingsButton.off("click");
    settingsButton.css("cursor", "default");
    settingsButton.animate({ opacity: 0 }, 200);
    game.settingsButton = false;
} // Hide setting Button
function settingsButtonShow() {
    settingsButton.on("click", function() { settingsButtonToggle() });
    settingsButton.css("cursor", "pointer");
    settingsButton.animate({ opacity: 1 }, 200);
    game.settingsButton = true;
} // Show setting Button
function activateMiddleButton() {
    setTimeout(function() {
        display.html('<i class="fas fa-play"></i>');
        middleCircle.addClass("active");
        middleCircle.on("click", function() { start() });
    }, game.del + (game.move.length * 1000) + 200);
} // Activate middle button hover and event
function deactivateMiddleButton() {
    display.html("");
    middleCircle.removeClass("active");
    middleCircle.off("click");
} // Deactivate middle button hover and event