
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime=0;
var invisibleGround;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
 createCanvas(600, 600);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
   
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  invisibleGround = createSprite(400,350,900,10);
  invisibleGround.visible = false;
  
  FoodGroup= new Group();
  obstacleGroup= new Group();
  
  score=0;
}


function draw() {
  background("white");
  
  stroke("red");
  textSize(20);
  fill("red ");
  text("Score:" + score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime= Math.ceil(frameCount/frameRate());
  text("survival Time:" + survivalTime,100,50)
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
     ground.velocityX = -(6 + 3*score/100);
    monkey.changeAnimation("moving",monkey_running);
  
  
  if(keyDown("space") && monkey.y >= 180) {
     monkey.velocityY = -12;
    monkey.gravityY=12;
      
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  monkey.collide(invisibleGround);
  
    Food();
  Obstacles();
    
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
    
  }
  
   else if (gameState === END) {
        
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
      }
 
  drawSprites();
}


function Food() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    banana = createSprite(200,200,20,20);
    banana.addImage("banana",bananaImage);
    banana.scale=0.1;   
    banana.y = Math.round(random(120,200));
    
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
  
}

function Obstacles() {
  if(frameCount % 80 === 0) {
    obstacle= createSprite(300,325,20,20);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale=0.15;
    obstacle.velocityX = -3;
    //generate random obstacles
    var rand = Math.round(random(1,6));
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}





