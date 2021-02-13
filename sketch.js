var backgroundImg;

var playerShip;
var playerShipSprite;

var enemyShip;
var enemyShip2;
var enemyShip3;
var enemyShipSprite;
var enemyShipGroup;

var lazerBeam;
var lazerBeamSprite;
var lazerGroup;

var score;
var lives;
var im_heart;
function preload(){

  backgroundImg = loadImage("background.jpg");

  playerShipSprite = loadImage("spaceshipMain.png");

  enemyShipSprite = loadImage("spaceshipEnemy.png");

  lazerBeamSprite = loadImage("lazerBeam.png");

  im_heart = loadImage('heart.png');

}

function setup() {
  createCanvas(displayWidth - 15 ,displayHeight - 110);

  playerShip = createSprite(displayWidth/2, displayHeight - 150 , 50, 50);
  playerShip.addImage(playerShipSprite);
  playerShip.scale = 0.25;

  enemyShipGroup = new Group();
  lazerGroup = new Group();
  score = 0;
  lives = 5;

  invisibleground = createSprite(displayWidth/2,displayHeight-50,displayWidth,80);
  invisibleground.visible = false;
  console.log(lives);

}

function draw() {
  background(backgroundImg);

  playerShip.x = mouseX;

  if(keyDown("space")){
    lazer();
  } 

  spawnEnemies();

  createEdgeSprites();

  if(lazerGroup.isTouching(enemyShip)){
    enemyShip.destroy();
    lazerGroup.destroyEach();
    score = score + 1;
  }

  if(enemyShipGroup.collide(invisibleground)){
    lives--;
    enemyShipGroup.destroyEach();
   }

   for (var i = 0 ; i < lives ; i++) {
    image(im_heart, 10 + (i*50), 30,40,40);
  }

  if (lives === 0) {
    noLoop();
  
    textSize(60);
    textFont("Arial");
    textStyle(BOLD);
    textAlign(CENTER);
    fill(255);
    text('GAME OVER',displayWidth/2, displayHeight/2);
  }
  
  drawSprites();


  textSize(30);
  fill("white");
  text("Score: " + score, 50, 100);
  //text("Lives: " + lives, displayWidth - 20, 50);


}

function lazer(){

  lazerBeam = createSprite(playerShip.x - 3 , playerShip.y - 52, 50, 50);
  //lazerbeam.x = playerShip.x
  lazerBeam.addImage(lazerBeamSprite);
  lazerBeam.scale = 0.25;
  lazerBeam.velocityY = -8;
  velocityX = 0;
  lazerGroup.add(lazerBeam);

}

function spawnEnemies(){

if(frameCount % 50 === 0){
  enemyShip = createSprite( displayWidth, displayHeight/8, 20, 20);
  enemyShip.x = Math.round(random(20, displayWidth - 100))
  enemyShip.velocityY = (4.5 + 3*score/10);
  enemyShip.addImage(enemyShipSprite);
  enemyShip.scale = 0.25;
  enemyShip.lifetime = Math.round(displayHeight/5);
  enemyShipGroup.add(enemyShip);

  
}

}