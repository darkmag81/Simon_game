var game = {
    difficulty: "easy",
    move: [],
    player: [],
};

var settingsCard = false;
var $chain = 1;
var endgame = false;
var dif = 4;
let b1 = $("#red");
let b2 = $("#yellow");
let b3 = $("#white");
let b4 = $("#green");
let b5 = $("#blue");
let b6 = $("#purple");
$("#chain").text($chain);
$("#menu").on("click", function() { start() });
$("#settingsButton").on("click", function() {settings()});
$("#top10Button").on("click", function() {top10()});

function top10() {
    
}

function settings() {
    if (settingsCard == false) {
        $("#sc").animate({opacity: 1},500);
        $("#sc").css("z-index","10");
        settingsCard = true;
        $("#menu").off("click");
        $("#menu").toggleClass("active", "");
    } else if (settingsCard == true) {
        $("#sc").animate({opacity: 0},500);
        setTimeout(function(){ 
            $("#sc").css("z-index","-10");
            $("#menu").on("click", function() { start() });
        },500);
        $("#menu").toggleClass("active", "");
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
    var elem = document.documentElement;
    if (document.webkitIsFullScreen == false) {

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
        else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        }
        else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    }
    else if (document.webkitIsFullScreen == true) {
        document.webkitExitFullscreen();
    }
}

function diff() {
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

function start() {
    $("#menu").off("click");
    $("#settingsButton").off("click");
    $("#settingsButton").animate({opacity: 0},200);
    $("#top10Button").animate({opacity: 0},200);
    setDif();
    game.move = [];
    for (var i = 0; i < $chain; i++) {
        var rnd = Math.floor(Math.random() * dif) + 1;
        game.move.push("b" + rnd);
    }
    $("#move").text(game.move);

    $("#menu").toggleClass("active", "");
    $("#menu p").text("");
    setTimeout(function() { $("#menu p").text("Watch") }, 100);
    setTimeout(function() { $("#menu p").text("Remember") }, 1100);
    setTimeout(function() { $("#menu p").text("Repeat") }, 2100);
    setTimeout(function() { $("#menu p").text("") }, 4100);
    setTimeout(function() { $("#menu p").text("Round: " + $chain) }, 5100);
    var del = 6000;
    
    game.move.forEach(function(element, x) {
        setTimeout(function() {flash(element, "white")}, 1000 * x + del);
        setTimeout(function() {flash(element, "black")}, 1000 * x + 200 + del);
    });

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

    setTimeout(function() { $("#menu p").html('<i class="fas fa-play"></i>') }, del + (game.move.length * 1000) + 200);
    setTimeout(function() { $("#menu").toggleClass("active", "") }, del + (game.move.length * 1000) + 200);
    setTimeout(function() {
        $chain++;
        $("#chain").text($chain);
        $("#menu").on("click", function() { start() });
        $("#settingsButton").on("click", function() {settings()});
        $("#settingsButton").animate({opacity: 1},200);
        $("#top10Button").animate({opacity: 1},200);
        $("#top10Button").on("click", function() {top10()});
    }, del + (game.move.length * 1000) + 200);
}
