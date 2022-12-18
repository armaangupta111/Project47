var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, zombieGroup
var bullet, bulletImg, bulletGroup
var lives

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")

  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("spookyforest.png")
  
  bulletImg = loadImage("assets/bullet.png")

  lives3Img = loadImage("assets/heart_3.png")

  lives2Img = loadImage("assets/heart_2.png")

  lives1Img = loadImage("assets/heart_1.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
bg = createSprite(displayWidth/2+30,displayHeight/2-40,500,500)
//bg = createSprite(windowWidth, windowHeight, 20,20)
bg.addImage(bgImg)
bg.scale = 2.4
  
lives3 = createSprite(100,30,50,50)
lives3.addImage(lives3Img)
lives3.scale = 0.3

lives2 = createSprite(-100,30,50,50)
lives2.addImage(lives2Img)
lives2.scale = 0.3

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

bulletGroup = new Group()

  zombieGroup = new Group()

}

function draw() {
  background(0); 


spawnZombies()
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-15
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+15
}
if(keyDown("RIGHT_ARROW")||touches.length>0){
  player.x = player.x+15
}
if(keyDown("LEFT_ARROW")||touches.length>0){
  player.x = player.x-15
}
//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  bullet = createSprite(player.x+20, player.y-25, 20, 20)
  bullet.addImage(bulletImg)
  bullet.scale = 0.1
  bullet.velocityX = 8
 bulletGroup.add(bullet)
}



//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
 
}

if(zombieGroup.isTouching(bulletGroup)){
  //for(var i = 0; i<=zombieGroup.length; i++){
  //if(zombieGroup.isTouching(bulletGroup)){
  zombieGroup.destroyEach()
  bulletGroup.destroyEach()

  }  
  
  

drawSprites();

}

function spawnZombies(){
if(frameCount%70===0){
zombie = createSprite(1500,random(0,800),50,50)
zombie.addImage(zombieImg)
zombie.velocityX = random(-1,-5)
zombie.scale = 0.15
zombieGroup.add(zombie)
}
}

function changeLives(){
if(zombieGroup.isTouching(player)){
lives3.destroy()
lives2.move(100,30,50,50)
}  
}