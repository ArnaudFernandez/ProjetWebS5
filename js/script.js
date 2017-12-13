document.onload = init;

let canvas = document.getElementById("canvasGame");
context = canvas.getContext("2d");

let game = new GameEngine("Keke", "Dplaj", 1000, 1000, context, 50);

init();

function init()
{
    // On check les event clavier
    document.onkeyup = checkArrowKeysUp;

    animation = requestAnimationFrame(draw);

    game.init();
}

function draw()
{
    context.save();

    context.clearRect(0,0, canvas.width, canvas.height);

    game.buildMap();
    context.restore();

    requestAnimationFrame(draw);
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