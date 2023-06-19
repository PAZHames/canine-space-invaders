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
let humanWidth = tileSize; // adapted tile width to make image work better! from * 2
let humanHeight = tileSize;
let humanX = tileSize;
let humanY = tileSize;
let humanImg;

let humanRows = 2;
let humanColumns = 3;
let humanCount = 0; // no of humans to defeat 
let humanVelocityX = 1; // human moving speed


// on load function

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

    humanImg = new Image();
    humanImg.src = "src/images/angryMan.png";

    createHumans();

    requestAnimationFrame(update);
    document.addEventListener("keydown", moveShip); // why is this in this place specifically?
}





function update() {
    requestAnimationFrame(update);

    context.clearRect(0,0,board.width,board.height); //clears previous board so don't have multiple ships
    
    // dog
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);

    // human
    for (let i = 0; i<humanArray.length; i++) {
        let human = humanArray[i];
        if (human.alive) {
            human.x += humanVelocityX;

            //if human touches borders
            if (human.x + human.width >= board.width || human.x <= 0 ) {
                humanVelocityX *= -1;
                human.x += humanVelocityX*2; //solves humans becoming out of sync/out of line
                // move humans forward by 1 row
                for (let j=0; j< humanArray.length; j++) {
                    humanArray[j].y += humanHeight;
                }
            }
            context.drawImage(humanImg, human.x, human.y, human.width, human.height);
        }
    }
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

function createHumans() {
    for (let c=0; c < humanColumns; c++) {
        for (let r=0; r < humanRows; r++) {
            let human = {
                img : humanImg,
                x : humanX + c*humanWidth,
                y : humanY + r*humanHeight,
                width : humanWidth,
                height : humanHeight,
                alive : true
            }

            humanArray.push(human);
        }
    }
    humanCount = humanArray.length; //keeping track of how many gone
}