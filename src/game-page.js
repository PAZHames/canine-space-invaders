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
let humanWidth = tileSize/2; // adapted tile width to make image work better! from * 2
let humanHeight = tileSize;
let humanX = tileSize;
let humanY = tileSize;
// let humanImg; moved inside loop 

let humanRows = 2;
let humanColumns = 3;
let humanCount = 0; // no of humans to defeat 
let humanVelocityX = 1; // human moving speed

// balls
let ballArray = [];
let ballVelocityY = -10; // ball moving speed - minus bc moving up 
let ballImg;

let score = 0;
let gameOver = false;
let gameWon = false;

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

    createHumans();

    ballImg = new Image();
    ballImg.src= "src/images/tennisBall.png";

    requestAnimationFrame(update);
    document.addEventListener("keydown", moveShip); // why is this in this place specifically?
    document.addEventListener("keyup", shoot); // keyup bc means have to let key go - can't just hold it down
}





function update() {
    requestAnimationFrame(update);

    if (gameOver) {
       return gameOverScreen();
    }

    if (gameWon) {
        return gameWonScreen();
    }

    context.clearRect(0,0,board.width,board.height); //clears previous board so don't have multiple ships
    
    // dog
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);

    // human
    for (let i = 0; i<humanArray.length; i++) {
        let human = humanArray[i];
        if (human.alive) {
            human.x += humanVelocityX;

            //if human touches borders
            if (human.x + human.width > board.width || human.x <= 0 ) {
                humanVelocityX *= -1;
                human.x += humanVelocityX*2; //solves humans becoming out of sync/out of line - fix
                
                // move humans forward by 1 row
                for (let j=0; j< humanArray.length; j++) {
                    humanArray[j].y += humanHeight;
                }
            }
            context.drawImage(human.img, human.x, human.y, human.width, human.height); //human.img defined in createHumans for loop

            if(human.y >= ship.y) {
                gameOver = true;
            }
        }
    }

    // balls

    for (let i=0; i < ballArray.length; i++) {
        let ball = ballArray[i];
        ball.y += ballVelocityY;

        context.drawImage(ballImg, ball.x, ball.y, ball.width, ball.height); //used tennis ball image rather than fillstyle

        //ball collision with humans
        for ( let j = 0; j< humanArray.length; j++) {
            let human = humanArray[j];
            if (!ball.used && human.alive && detectCollision(ball, human)) {
                ball.used = true;
                human.alive = false;
                humanCount--;
                score += 100;
            }
        }
    }



    // clear balls
    while (ballArray.length > 0 && (ballArray[0].used || ballArray[0].y<0)) {
        ballArray.shift(); // as soon as ball goes above canvas, deletes one from ballArray - stops them accumulating and slowing game down 
    }

    // next cohort
    if (humanCount==0) {
        //increase number of humans in columns and rows by 1
        humanColumns = Math.min(humanColumns +1, columns - 2); // didn't divide columns by y2 as human is only one tileSize wide - cap at 16 - 2 - max 14 columsn of humans?
        humanRows = Math.min(humanRows + 1, rows-4); // cap at 16-4 - max 12 rows of humans
        humanVelocityX += 0.2; //increase human speed with each level 
        humanArray = [];
        ballArray = []; // clear balls so ball used previously doesn't accidentally touch next bank of humans 
        createHumans();
    }

    //score
    context.fillStyle="white";
    context.font="16px courier";
    context.fillText(score, 5, 20);

    //levels
    
    if (score<6800){
        document.getElementById("level-number").innerHTML="Level 1"; //changes level number
        document.getElementById("prize-image").src="src/images/shoe.jpg"; //changes prize image
    }
    else if (score>6800 && score<23800) {
        document.getElementById("level-number").innerHTML="Level 2"
        document.getElementById("prize-image").src="src/images/roast.jpg";

    }
    else if (score>23800 && score<40000) {
        document.getElementById("level-number").innerHTML="Level 3"
        document.getElementById("prize-image").src="src/images/passport.jpg";

    }
    else if (score === 40000) {
            gameWon = "true";
    }

}

function moveShip(e) { // e = event
    if (gameOver) {
        return gameOverScreen();
    }
    if (e.code == "ArrowLeft" && ship.x - shipVelocityX >=0) { //ensures ship will not go off the page 
        ship.x -= shipVelocityX; //move left - shipVeloctyX = tileSize of 1
    }
    else if (e.code == "ArrowRight" && ship.x + shipVelocityX + shipWidth <= board.width) { // not v clear why need both shipVel and shipWidth??
        ship.x += shipVelocityX; //move right
    }
}

//randomise humans

function randomiseHumans() {
    var randomHumans = ["src/images/angryMan.png", "src/images/angryWoman1.png"]; //populate array

    var randomNumber = Math.floor(Math.random() * randomHumans.length); //create random number
    var randomImage = randomHumans[randomNumber]; //set random image

    return randomImage; //return random element

}

function createHumans() {
    for (let c=0; c < humanColumns; c++) {
        for (let r=0; r < humanRows; r++) {
            let randomHuman = randomiseHumans(); //call randomiseHumans function 
            let human = {
                img : new Image(), //moved to inside the loop, so each individual human is randomised - was previosuly outsdie the loop
                x : humanX + c*humanWidth,
                y : humanY + r*humanHeight,
                width : humanWidth,
                height : humanHeight,
                alive : true
            }
            human.img.onload = function () { // adds onload to ensure the image loaded before drawing
                context.drawImage(human.img, human.x, human.y, human.width, human.height);
              };
            human.img.src = randomHuman;
            humanArray.push(human);
        }
    }
    humanCount = humanArray.length; //keeping track of how many gone
}

function shoot (e) {
    if (gameOver) {
        return gameOverScreen();
    }
    if (e.code == "Space") {
       //shoot
       let ball = {
        x : ship.x + shipWidth *15/32,
        y : ship.y,
        width : tileSize/8,
        height : tileSize/8, //changed to keep shape round
        used : false
       } 
       ballArray.push(ball);
    }
}

//condition for checking collsion between two objects 

function detectCollision (a,b) {
    return a.x < b.x + b.width && //a's top left doesn't reach b's top right
    a.x + a.width > b.x && // a's top right corner passes b's top left corner 
    a.y < b.y + b.height && //a's top left corner doesn't reach b's bottom left corner
    a.y + a.height > b.y; //a's bottom left corner passes b's top left corner
}

//game over screen

function gameOverScreen() {
    context.fillStyle="white";
    context.font="72px courier";
    let text = "GAME OVER";
    let textWidth = context.measureText(text).width; // to ensure the text is in centre of board regardless of screen size
    let textX = (board.width - textWidth) / 2;
    let textY = board.height / 2;
    context.fillText(text, textX, textY); 
    setGamePlayed();
}

// win screen

function gameWonScreen() {
    context.fillStyle="white";
    context.font="72px courier";
    let text = "YOU WIN! 🎉🐶👑";
    let textWidth = context.measureText(text).width; // to ensure the text is in centre of board regardless of screen size
    let textX = (board.width - textWidth) / 2;
    let textY = board.height / 2;
    context.fillText(text, textX, textY);
    setGamePlayed();
}



// LEADERBOARD


// Leaderboard data structure
let leaderboard = [];

let gamePlayed = false; // Flag to indicate if the game has been played




// Function to add a player to the leaderboard
function addPlayerToLeaderboard(name, image, score) {
  let player = {
    name: name,
    image: image,
    score: score
  };
  leaderboard.push(player);
  sortLeaderboard();
  saveLeaderboard();
  displayLeaderboard();
}

// Function to save leaderboard data to local storage
function saveLeaderboard() {
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  }

// Function to sort the leaderboard
function sortLeaderboard() {
  leaderboard.sort((a, b) => b.score - a.score);
}

// Function to display the leaderboard
function displayLeaderboard() {
  let leaderboardContainer = document.getElementById('leaderboard');
  leaderboardContainer.innerHTML = '';

  leaderboard.forEach((player, index) => {
    let playerElement = document.createElement('div');
    playerElement.innerHTML = `${index + 1}. ${player.name} - Score: ${player.score}`;
    leaderboardContainer.appendChild(playerElement);
  });
}

// Function to set the game played flag
function setGamePlayed() {
    gamePlayed = true;
    openPopup();
  }

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent form from submitting and refreshing the page
  
    let playerName = document.getElementById('playerName').value;
    let imageSelect = document.getElementById('imageSelect');
    let selectedImage = imageSelect.options[imageSelect.selectedIndex].value;
    let score = localStorage.getItem('score');
  
    addPlayerToLeaderboard(playerName, selectedImage, score);
    console.log('open');
    // Clear form inputs
    document.getElementById('playerName').value = '';
    imageSelect.selectedIndex = 0;
  
    closePopup();
  
    window.location.href = '../leaderboard.html';
  }

// Function to open the popup
function openPopup() {
  document.getElementById('leaderboardPopup').style.display = 'block';
  document.getElementById('leaderboardForm').addEventListener('submit', handleSubmit);
}



// Function to close the popup
function closePopup() {
  document.getElementById('leaderboardPopup').style.display = 'none';
}

