let ballVelocityY = -10; // ball moving speed - minus bc moving up 
let ballImg;

// load images

ballImg = new Image();
ballImg.src= "src/images/tennisBall.png";

context.drawImage(ballImg, ball.x, ball.y, ball.width, ball.height); 
