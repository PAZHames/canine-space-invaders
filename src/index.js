let tileSize = 32;
let rows = 16;
let columns = 16;

let board;
let boardWidth = tileSize * columns;
let boardHeight = tileSize * rows;
let context;

// ship

let shipWidth = tileSize*2;
let shipHeight = tileSize; // do i want to play with this? how big want dog to be?
let shipX = tileSize * columns/2 - tileSize;
let shipY = tileSize * rows - tileSize*2; // sets y axis for ship - so it stays in bottom 2 rows 

let ship = {
    x : shipX,
    y : shipY,
    width : shipWidth,
    height : shipHeight
}

let shipImg;
let shipVelocityX = tileSize; //speed ship moves - alwasy moves along x plain


// humans

let humanArray = [];
let humanWidth = tileSize * 2;
let humanHeight = tileSize;
let humanX = tileSize;
let humanY = tileSize;


window.onload = function() {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d"); // used for drawing on board 


// draw initial ship

//load images 
    shipImg = new Image();
    shipImg.src = "src/images/dogShip.png";
    shipImg.onload = function() {
    // console.log("Image loaded successfully.");
        context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
    }


    requestAnimationFrame(update);
    document.addEventListener("keydown", moveShip);
}

function update() {
    requestAnimationFrame(update);

    context.clearRect(0,0,board.width,board.height); //clears previous board so don't have multiple ships
    // repeatedly drawing ship
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);


}

function moveShip(e) {
// e = event
    if (e.code == "ArrowLeft" && ship.x - shipVelocityX >=0) { //ensures ship will not go off the page 
        ship.x -= shipVelocityX; //move left - shipVeloctyX = tileSize of 1
    }
    else if (e.code == "ArrowRight" && ship.x + shipVelocityX + shipWidth <= board.width) { // not v clear why need both shipVel and shipWidth??
        ship.x += shipVelocityX; //move right
    }
}