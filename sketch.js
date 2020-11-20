
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var ground;
var foodGroup, obstacleGroup;
var score =0;
var gameState
var PLAY,END

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  
 
  monkey = createSprite(50,330,10,10);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(0,360,1200,5);
  ground.velocityX = -(4+3*score /100);
  ground.x = ground.width/2;
  ground.shapeColor = "black";
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
  background("white");
  
  
  if(gameState===PLAY){
     food();
     spawnObstacles();
     
     if(keyDown("space")&&monkey.y>=120){
     monkey.velocityY = -12;
     }
     monkey.velocityY = monkey.velocityY + 0.8;
    
    if(monkey.isTouching(foodGroup)){
     foodGroup.destroyEach();
     score = score+1;
     }   
  
    switch(score){
    
      case 10: monkey.scale = 0.12;
        break;
      case 20:monkey.scale = 0.14;
        break;
      case 30:monkey.scale = 0.16;
        break;
      case 40:monkey.scale = 0.18;
        break;
        
        default:break;
    
    }
    
    if(monkey.isTouching(obstacleGroup)){
      pause();
     gameState = END;
      monkey.scale = 0.08; 
     }
  
    textSize(20);
  fill("black");
  text("Score :"+score,490,50);

  
}
  
 else if(gameState===END){
     pause();
     textSize(20);
     text("GAME OVER",300,200);
    if(keyDown("space")){
       food();
       spawnObstacles();
       }
 }
  
  if(ground.x<0){
     ground.x = ground.width/2;
     }
  
  
  var survivalTime = 0;
   

  drawSprites();
  monkey.collide(ground);
  
  
}

function food(){
  if(frameCount%30===0){
      banana = createSprite(600,180,10,10);
      banana.addImage(bananaImage);
      banana.y = Math.round(random(120,200));
      banana.scale = 0.1;
      banana.velocityX = -(12+12*score/100);
      banana.lifetime = 100;
    
      banana.depth = monkey.depth;
      monkey.depth = monkey.depth+1;
    
      foodGroup.add(banana);
  
     }
}

function spawnObstacles(){
  if(frameCount%300===0){
      obstacle = createSprite(600,335,20,20);
      obstacle.addImage(obstacleImage);
      obstacle.velocityX = -(12+12*score/100);
      obstacle.lifetime = 100;
      obstacle.scale = 0.1;
      obstacleGroup.add(obstacle);
     }
}

function pause(){
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
  score = 0;
  survivalTime = 0;
}