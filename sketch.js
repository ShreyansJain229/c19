var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  //spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3; 
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  if(gameState === "play"){

  
  if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown(LEFT_ARROW)){
      ghost.x -= 3;
    }

    if(keyDown(RIGHT_ARROW)){
      ghost.x += 3;
    }

    if(keyDown("space")){
      ghost.velocityY = -5;
    }

    ghost.velocityY += 0.8;
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }
    spawndoors();
    drawSprites();
  }
  if(gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GameOver",230,250);

  }
  }

function spawndoors() {
 if (frameCount % 240 === 0){
   door = createSprite(200,-50);
   climber = createSprite(200,10);
   invisibleBlock = createSprite(200,15);
   
   invisibleBlock.visible = false;
   invisibleBlock.width = climber.width;
   invisibleBlock.height = 2;

   door.addImage(doorImg);
   climber.addImage(climberImg);

   door.x = Math.round(random(120,400));
   door.velocityY = 2;
   climber.x = door.x;
   climber.velocityY = 2;
   invisibleBlock.x = door.x;
   invisibleBlock.velocityY = 2; 
   
   door.lifetime = 300;
   climber.lifetime = 300;
   invisibleBlock.lifetime = 300;

   doorsGroup.add(door); 
   climbersGroup.add(climber);
   invisibleBlockGroup.add(invisibleBlock);
   
   ghost.depth = door.depth;
   ghost.depth += 1;
  }

}