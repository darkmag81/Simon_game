var game = {
    difficulty: "easy",
    move: [],
    player: [],
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
var $chain = 0;
var dif = 4;
var del = 3000;
var sound = true;
var rndPattern = false;
$("#chain").text($chain);
$("#menu").on("click", function() { start() });
$("#settingsButton").on("click", function() { settings() });
$("#top10Button").on("click", function() { top10() });
$(".top10Card").on("click", function() { top10() });
$("#soundButton").on("click", function() { soundToggle() });

function top10() {
    if (sound) { aud.sound.click.play(); }
    if (!top10Card) {
        $(".top10Card").css("z-index", "10");
        $(".top10Card").animate({ opacity: .8 }, 500);
        $(".top10Card").css("cursor", "pointer");
        $(".top10Card").off("click");
        $(".top10Card").on("click", function() { top10() });
        $("#menu").off("click");
        $("#menu").toggleClass("active", "");
        top10Card = true;
    }
    else if (top10Card) {
        $(".top10Card").css("z-index", "-100");
        $(".top10Card").animate({ opacity: 0 }, 500);
        $(".top10Card").css("cursor", "default");
        $(".top10Card").off("click");
        $("#menu").toggleClass("active", "");
        $("#menu").on("click", function() { start() });
        top10Card = false;
    }
}

function randomPattern() {
    if (sound) { aud.sound.click.play(); }
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
    if (sound) { aud.sound.click.play(); }
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

function go_full_screen() {
    if (sound) { aud.sound.click.play(); }
    var docElm = document.documentElement;
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    }
    else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    }
    else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    }
    else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
    }
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function diff() {
    if (sound) { aud.sound.click.play(); }
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

function playerRound() {
    game.player = [];
    $("#b1").on("click", function() { player(this.id) });
    $("#b2").on("click", function() { player(this.id) });
    $("#b3").on("click", function() { player(this.id) });
    $("#b4").on("click", function() { player(this.id) });
    $("#b5").on("click", function() { player(this.id) });
    $("#b6").on("click", function() { player(this.id) });
}

function player(box) {
    game.player.push(box);
    game.player.forEach(function(elem, t) {
        console.log(elem, t);
    });
}

function addMoveToPattern() {
    if (!rndPattern) {
        var rnd = Math.floor(Math.random() * dif) + 1;
        game.move.push("b" + rnd);
    }
    else if (rndPattern) {
        for (var r = 0; r < $chain + 1; r++) {
            var rnd = Math.floor(Math.random() * dif) + 1;
            game.move[r] = ("b" + rnd);
        }
    }
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
    $(".top10Card").off("click");
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
        $("#menu").toggleClass("active", "");
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
    game.move.forEach(function(element, x) {
        setTimeout(function() {
            flash(element, colorPick(element));
            if (sound) { aud.sound[element].play(); }
        }, 1000 * x + del);
        setTimeout(function() { flash(element, "black") }, 1000 * x + 200 + del);
    });
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
    $("#menu").toggleClass("active", "");
    $("#menu p").text("");
}

function DisplayCountdown() {
    setTimeout(function() { $("#menu p").text("Watch") }, 100);
    setTimeout(function() { $("#menu p").text("Remember") }, 600);
    setTimeout(function() { $("#menu p").text("Repeat") }, 1200);
    setTimeout(function() { $("#menu p").text("") }, 1800);
    setTimeout(function() { $("#menu p").text("Round: " + $chain) }, 2400);
}

function start() {
    if (sound) { aud.sound.advance.play(); }
    deactivateButtons();
    setDif();
    checkIfSettingsOpen();
    addMoveToPattern();
    updateDisplay();
    DisplayCountdown();
    showMoves();
    activateButtons();
    $chain++;
}
