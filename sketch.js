
var player, player_running;
var ground;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacleImage;

var score=0;


var survivalTime=0;

function preload(){
  monkeyImage = loadAnimation("images/Monkey_01.png","images/Monkey_02.png","images/Monkey_03.png","images/Monkey_04.png",
  "images/Monkey_05.png","images/Monkey_06.png","images/Monkey_07.png","images/Monkey_08.png","images/Monkey_09.png","images/Monkey_10.png")
  stoneImg = loadImage("images/stone.png")
  jungleimg = loadImage("images/jungle.jpg")
  bananaimg = loadImage("images/banana.png")
}
function setup(){

createCanvas(800,400)

player = createSprite(100,340,20,50);
player.addAnimation("monkey",monkeyImage);
player.scale=0.1;

ground = createSprite(400,350,800,10);
ground.velocityX=-4;
ground.x=ground.width/2;

secne= createSprite(0,0,800,400)
secne.addImage(jungleimg)
secne.velocityX = -4
secne.x=secne.width/2
FoodGroup = new Group();
obstaclesGroup = new Group();

score = 0;

}



function draw() {
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(secne.x<0) {
    secne.x=secne.width/2;
  }
   console.log(player.y)
    if(keyDown("space") && (player.y>314) ) {
      player.velocityY = -18;
    }
    player.velocityY = player.velocityY + 0.8;
    
    player.collide(ground);   
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("black");
  text("Score: "+ score, 500,50);        
  if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach()
      score+=1
    }
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/60) 
  text("Survival Time: "+ survivalTime, 100,50);
}

function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaimg);
    banana.scale=0.05;
    

    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(stoneImg);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
