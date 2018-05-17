//var audio = new Audio('assets/beep-02.wav');

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
    while (currentTime + miliseconds >= new Date().getTime()) {}
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

function clearLoad() {
    document.getElementById("menu").style.display = "none";
}

function startGame() {
    var rndNo;
    var chain = 6;
    var chainGen = [];
    var singleElement;
    var d = 1000;
    var animQueue = "";
    var delayChain = [];
    for (var i = 0; i < chain; i++) {
        rndNo = Math.floor(Math.random() * 4) + 1;
        chainGen += rndNo;
        delayChain[i]=d*i;
    }
    $("#gameLog").text(chainGen);
    $("#log2").text(delayChain);
    for (var i = 0; i < chain + 1; i++) {
        $("#b" + chainGen[i]).delay(delayChain[i]).animate({ opacity: "0" },200).animate({ opacity: "1" },200);
    }
}

//All jQuery animation functions have a complete callback. Because they are asyncronous you can't wait for them, you have to use callbacks.
