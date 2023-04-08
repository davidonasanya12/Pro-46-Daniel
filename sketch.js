var d1;
var d2;
var ob1;
var ob2;
var ob3;
var obsarr
var backgroundImage;
var database;
var form, player;
var playerCount;
var gameState
var allPlayers
var bg

function preload(){
  backgroundImage = loadImage("background.png");
 d1= loadAnimation("d1.png","d2.png","d3.png");
 d2= loadAnimation("d4.png","d5.png","d6.png","d7.png","d8.png");
 bg= loadImage("sky.png");
 ob1Img= loadImage("obstacle1.png");
 ob2Img= loadImage("obstacle2.png");
 ob3Img= loadImage("obstacle3.png");
}

function setup() {
   
  createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
 // bg1=createSprite(400,200,800,400)
  //bg1.addImage("bg",bg)
  //bg1.velocityY=1
  dragon=createSprite(500, 300, 50, 50);
  dragon.addAnimation("dragons",d1);
  dragon2=createSprite(250, 300, 50, 50);
  dragon2.addAnimation("dragons",d2);
  obsarr=[dragon,dragon2]
}

function spawnobstacles(){
  if (frameCount%400==0) {
    ob1=createSprite(random(50,150),0,20,20)
ob1.velocityY=1
ob1.addImage("ob1",ob1Img)
ob1.scale=0.3
  }
 
}

function spawwnobstacles2(){
   if (frameCount%450==0) {
    ob2=createSprite(random(400,1180),0,20,50)
ob2.velocityY=2
ob2.addImage("ob2",ob2Img)
ob2.scale=0.3
  }
}

function spawnobstacles3(){
  if (frameCount%350==0) {
    ob3=createSprite(random(200,750),0,40,30)
ob3.velocityY=0.8
ob3.addImage("ob3",ob3Img)
ob3.scale=0.3
  }
}


function draw() {
  background(backgroundImage);
  if (playerCount == 2 ) {
    game.update(1)
  }
  if (gameState == 1) {
    game.play()
  }

 /* if (bg1.y>350) {
    bg1.y=height/2
  }*/
  spawnobstacles()
  spawwnobstacles2()
  spawnobstacles3()
  //drawSprites();
}