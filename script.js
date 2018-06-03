var game = {
    difficulty: "easy",
    move: [],
    player: [],
    count: 0,
    score: 0,
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
var settingsCard = false;
var top10Card = false;
var dif = 4;
var del = 3000;
var sound = true;
var endG = false;
var rndPattern = false;
var inGameDelay = 3000;
$("#chain").text(game.count);
$("#menu").on("click", function() { start() });
$("#settingsButton").on("click", function() { settings() });
$("#top10Button").on("click", function() { top10() });
$("#top10Card").on("click", function() { top10() });
$("#soundButton").on("click", function() { soundToggle() });

$(document).ready(function() {
    $(".loadingScreen").css("display", "none");
});

function top10() {
    playSound("click");
    if (!top10Card) {
        $("#top10Card").css("z-index", "10");
        $("#top10Card").animate({ opacity: .9 }, 500);
        $("#top10Card").css("cursor", "pointer");
        $("#top10Card").off("click");
        $("#top10Card").on("click", function() { top10() });
        $("#menu").off("click");
        $("#menu").toggleClass("active", "");
        top10Card = true;
    }
    else if (top10Card) {
        $("#top10Card").css("z-index", "-100");
        $("#top10Card").animate({ opacity: 0 }, 500);
        $("#top10Card").css("cursor", "default");
        $("#top10Card").off("click");
        $("#menu").toggleClass("active", "");
        $("#menu").on("click", function() { start() });
        top10Card = false;
    }
}

function randomPattern() {
    playSound("click");
    if (!rndPattern) {
        rndPattern = true;
        $("#rndPattern").text("Yes");
    }
    else if (rndPattern) {
        rndPattern = false;
        $("#rndPattern").text("No");
    }
}

function soundToggle() {
    if (sound) {
        $("#nosound").css("visibility", "visible");
        sound = false;
    }
    else if (!sound) {
        $("#nosound").css("visibility", "hidden");
        sound = true;
    }
}

function settings() {
    playSound("click");
    if (settingsCard == false) {
        $("#sc").animate({ opacity: 1 }, 500);
        $("#sc").css("z-index", "10");
        settingsCard = true;
    }
    else if (settingsCard == true) {
        $("#sc").animate({ opacity: 0 }, 500);
        setTimeout(function() {
            $("#sc").css("z-index", "-10");
            $("#menu").off("click");
            $("#menu").on("click", function() { start() });
        }, 500);
        settingsCard = false;
    }

}

function flash(pad, color) {
    if (pad == "b1") {
        $("#b1").css("background-color", color);
    }
    else if (pad == "b2") {
        $("#b2").css("background-color", color);
    }
    else if (pad == "b3") {
        $("#b3").css("background-color", color);
    }
    else if (pad == "b4") {
        $("#b4").css("background-color", color);
    }
    else if (pad == "b5") {
        $("#b5").css("background-color", color);
    }
    else if (pad == "b6") {
        $("#b6").css("background-color", color);
    }
    else {
        console.log("flash function failed...");
    }
}

function isTouchDevice() {
    if ("ontouchstart" in document.documentElement) {
        return true;
    }
    else {
        return false;
    }
}

function hoverEffectsOn() {
    function b1hoverin() {
        $("#b1").css("border", "20px solid red");
    }

    function b1hoverout() {
        $("#b1").css("border", "3px solid red");
    }

    function b2hoverin() {
        $("#b2").css("border", "20px solid yellow");
    }

    function b2hoverout() {
        $("#b2").css("border", "3px solid yellow");
    }

    function b3hoverin() {
        $("#b3").css("border", "20px solid white");
    }

    function b3hoverout() {
        $("#b3").css("border", "3px solid white");
    }

    function b4hoverin() {
        $("#b4").css("border", "20px solid green");
    }

    function b4hoverout() {
        $("#b4").css("border", "3px solid green");
    }

    function b5hoverin() {
        $("#b5").css("border", "20px solid blue");
    }

    function b5hoverout() {
        $("#b5").css("border", "3px solid blue");
    }

    function b6hoverin() {
        $("#b6").css("border", "20px solid purple");
    }

    function b6hoverout() {
        $("#b6").css("border", "3px solid purple");
    }
    $("#b1").on("mouseover", b1hoverin);
    $("#b1").on("mouseout", b1hoverout);
    $("#b5").on("mouseover", b5hoverin);
    $("#b5").on("mouseout", b5hoverout);
    $("#b4").on("mouseover", b4hoverin);
    $("#b4").on("mouseout", b4hoverout);
    $("#b6").on("mouseover", b6hoverin);
    $("#b6").on("mouseout", b6hoverout);
    $("#b3").on("mouseover", b3hoverin);
    $("#b3").on("mouseout", b3hoverout);
    $("#b2").on("mouseover", b2hoverin);
    $("#b2").on("mouseout", b2hoverout);
}

function hoverEffectsOff() {
    $(".pad").off("mouseover");
    $(".pad").off("mouseout");
}

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
}

function diff() {
    playSound("click");
    if (game.difficulty == "hard") {
        $("#b5").toggle(200);
        $("#b6").toggle(200);
        $("#diffic").text("Easy");
        game.difficulty = "easy";
    }
    else if (game.difficulty == "easy") {
        $("#b5").toggle(200);
        $("#diffic").text("Normal");
        game.difficulty = "normal";
    }
    else if (game.difficulty == "normal") {
        $("#b6").toggle(200);
        $("#diffic").text("Hard");
        game.difficulty = "hard";
    }
}

function setDif() {
    if (game.difficulty == "easy") { dif = 4 }
    else if (game.difficulty == "normal") { dif = 5 }
    else if (game.difficulty == "hard") { dif = 6 }
}

function deactivatePadHandlers() {
    $("#b1").off("click");
    $("#b2").off("click");
    $("#b3").off("click");
    $("#b4").off("click");
    $("#b5").off("click");
    $("#b6").off("click");
}

function playSound(snd) {
    if (sound) { aud.sound[snd].play(); }

}

function playerRound() {
    game.player = [];
    setTimeout(function() {
        $("#b1").on("click", function() {
            addMove(this.id);
            playSound(this.id)
        });
        $("#b2").on("click", function() {
            addMove(this.id);
            playSound(this.id)
        });
        $("#b3").on("click", function() {
            addMove(this.id);
            playSound(this.id)
        });
        $("#b4").on("click", function() {
            addMove(this.id);
            playSound(this.id)
        });
        $("#b5").on("click", function() {
            addMove(this.id);
            playSound(this.id)
        });
        $("#b6").on("click", function() {
            addMove(this.id);
            playSound(this.id)
        });
        checkPlayer();
        if (!isTouchDevice()) { hoverEffectsOn() }
    }, inGameDelay + game.move.length * 1000);
}

function addMove(pad) {
    game.player.push(pad);
    checkPlayer();
}

function addMoveToPattern() {
    if (!rndPattern) {
        var rnd = Math.floor(Math.random() * dif) + 1;
        game.move.push("b" + rnd);
    }
    else if (rndPattern) {
        for (var r = 0; r < game.count; r++) {
            var rnd = Math.floor(Math.random() * dif) + 1;
            game.move[r] = ("b" + rnd);
        }
    }
    showMoves();
}

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
}

function deactivateButtons() {
    $("#menu").off("click");
    $("#top10Card").off("click");
    $("#top10Button").off("click");
    $("#settingsButton").off("click");
    $("#settingsButton").css("cursor", "default");
    $("#settingsButton").animate({ opacity: 0 }, 200);
    $("#top10Button").css("cursor", "default");
    $("#top10Button").animate({ opacity: 0 }, 200);
}

function activateButtons() {
    setTimeout(function() {
        $("#menu p").html('<i class="fas fa-play"></i>');
        $("#menu").addClass("active");
        $("#menu").on("click", function() { start() });
        $("#settingsButton").on("click", function() { settings() });
        $("#settingsButton").animate({ opacity: 1 }, 200);
        $("#settingsButton").css("cursor", "pointer");
        $("#top10Button").animate({ opacity: 1 }, 200);
        $("#top10Button").on("click", function() { top10() });
        $("#top10Button").css("cursor", "pointer");
        $("#chain").text(game.move.length);
    }, del + (game.move.length * 1000) + 200);
}

function showMoves() {
    updateDisplay();
    deactivatePadHandlers();
    DisplayCountdown();
    game.move.forEach(function(element, x) {
        setTimeout(function() {
            flash(element, colorPick(element));
            //shadowTwist(this.game.move, colorPick(element));
            playSound(element);
        }, 1000 * x + del);
        setTimeout(function() { flash(element, "black") }, 1000 * x + 200 + del);
    });
    clearPlayer();
    playerRound();
}

function clearPlayer() {
    game.player = [];
}

function checkIfSettingsOpen() {
    if (settingsCard == true) {
        $("#sc").animate({ opacity: 0 }, 500);
        setTimeout(function() {
            $("#sc").css("z-index", "-10");
        }, 500);
        settingsCard = false;
    }
}

function updateDisplay() {
    $("#move").text(game.move);
    $("#menu").addClass("active");
    $("#menu p").text("");
    $("#roundCounter").text(game.count);
}

function DisplayCountdown() {
    if (!isTouchDevice()) { hoverEffectsOff() }
    setTimeout(function() { $("#menu p").text("Watch") }, 100);
    setTimeout(function() { $("#menu p").text("Remember") }, 600);
    setTimeout(function() { $("#menu p").text("Repeat") }, 1200);
    setTimeout(function() { $("#menu p").text("") }, 1800);
    setTimeout(function() { $("#menu p").text("Round: " + game.count) }, 2000);
    setTimeout(function() { $("#menu p").text("GO!!!") }, 2500);
}

function quick(text) {
    $("#quickBar p").text(text);
    $("#quickBar").animate({ top: 0 }, 200).delay(300).animate({ top: -70 }, 200);
}

function checkPlayer() {

    if ((game.player[game.player.length - 1] == game.move[game.player.length - 1]) && game.player.length > 0) {
        $("#menu p").text("Good");
        setTimeout(function() { $("#menu p").text(""); }, 400)
    }
    else if (game.player[game.player.length - 1] !== game.move[game.player.length - 1]) {
        $("#menu p").text("Game Over");
        quick("Bad Move... :(")
        setTimeout(function() {
            if (!isTouchDevice()) {
                hoverEffectsOff();
            }
            endGame();
            endG = true;
        }, 1300);
    }
    if (!endG) {
        var check = game.player.length === game.move.length;
        if (check) {
            setTimeout(function() {
                $("#menu p").text("Next Round");
                nextLevel();
            }, 1300);
        }
    }
}

function updateScore() {
    game.score += game.move.length * (dif - 3);
    $("#score").text(game.score);
    switch (game.player.length) {
        case 1:
            quick("Good Start");
            break;
        case 3:
            quick("Keep going");
            break;
        case 5:
            quick("Well Done");
            break;
    }
}

function nextLevel() {
    updateScore();
    addCount();
}

function prepareNewGame() {
    game.move = [];
    game.player = [];
    game.count = 0;
    game.score = 0;
    addCount();
}

function addCount() {
    game.count++;
    deactivateButtons();
    setDif();
    checkIfSettingsOpen();
    addMoveToPattern();

}

function endGame() {
    game.move = [];
    game.player = [];
    game.count = 0;
    endG = false;
    deactivatePadHandlers();
    activateButtons();
}

function start() {
    playSound("advance");
    prepareNewGame();
}
