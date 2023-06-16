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

window.onload = function() {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d"); // used for drawing on board 
}

// draw initial ship

// no fillStyle - needed?
// context.fillRect(ship.x, ship.y, ship.width, ship.height);

//load images
shipImg = new Image();
shipImg.src = "./images/ship-dog.jpeg";
shipImg.onload = function() {
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
}
