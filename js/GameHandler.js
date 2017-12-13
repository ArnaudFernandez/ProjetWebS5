document.onload = init;

let canvas = document.getElementById("canvasGame");
context = canvas.getContext("2d");

let playerName1 = "Arnaud";
let playerName2 = "Anais";

let game;

init();

function init()
{
    // On check les event clavier
    document.onkeyup = checkArrowKeysUp;

    createGame(playerName1, playerName2);

    game.init();
    // Draw the map
    game.buildMap();

    animation = requestAnimationFrame(draw);
}

function draw()
{
    context.save();

    context.clearRect(0,0, canvas.width, canvas.height);

    // Draw the map
    game.buildMap();




    context.restore();

    requestAnimationFrame(draw);
}

function createGame(playerName1, playerName2)
{
    game = new GameEngine(playerName1, playerName2, 1000, 1000, context, 50)
}

















function checkArrowKeysUp(e){
    let arrs= [], key= window.event? event.keyCode: e.keyCode;
    arrs[37]= 'left';
    arrs[38]= 'up';
    arrs[39]= 'right';
    arrs[40]= 'down';

    if(arrs[key] == 'up') {
        game.moveCursorY(0);
    }
    if(arrs[key] == 'down') {
        game.moveCursorY(1);
    }
    if(arrs[key] == 'left') {
        game.moveCursorX(0);
    }
    if(arrs[key] == 'right') {
        game.moveCursorX(1);
    }
}