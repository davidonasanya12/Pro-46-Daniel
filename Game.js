class Game {
  constructor() {         
    this.resetTitle = createElement("h2")
    this.resetButton = createButton("")

    this.leaderboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    this.playerMoving = false
    this.leftKeyActive = false
    this.blast = false
  }
  
  start() {
   
    player = new Player();
    playerCount = player.getCount()
    form = new Form();
    form.display();

    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: ob2Img },
      { x: width / 2 - 150, y: height - 1300, image: ob3Img },
      { x: width / 2 + 250, y: height - 1800, image: ob1Img },
      { x: width / 2 - 180, y: height - 2300, image: ob2Img },
      { x: width / 2, y: height - 2800, image: ob3Img },
      { x: width / 2 - 180, y: height - 3300, image: ob1Img},
      { x: width / 2 + 180, y: height - 3300, image: ob2Img },
      { x: width / 2 + 250, y: height - 3800, image: ob3Img },
      { x: width / 2 - 150, y: height - 4300, image: ob1Img },
      { x: width / 2 + 250, y: height - 4800, image: ob2Img },
      { x: width / 2, y: height - 5300, image: ob3Img },
      { x: width / 2 - 180, y: height - 5500, image: ob1Img }
    ];
   
  }
  addSprite(spriteGroup , numberOfSprites , spritesImage , scale, positions=[]){
      for (let i = 0; i < numberOfSprites; i++) {
      var x , y
          if (positions.length > 0) {
            x=positions[i].x
            y=positions[i].y
            spritesImage=positions[i].image
            
          } else {
            x = random(width / 2 + 150 , width / 2 - 150)
            y = random(- height * 4.5 , height - 400)
          }
      
      var sprite = createSprite(x,y)
      sprite.addImage("sprite" , spritesImage)
      sprite.scale = scale 
      spriteGroup.add(sprite)
  
}
  }
 // handleFuel(index){
/*dragons[index - 1].overlap(food,function(collecter,collected){
  player.fuel = 185
  collected.remove()
})
if (player.food > 0 && this.playerMoving) {
  player.food -= 0.3
}
if (player.food <= 0) {
  gameState = 2
  this.gameOver()
}*/
 // }
  gameOver(){
    swal ({
      title:` GAMEOVER ` ,
      text:" OOOPS YOU LOST THE RACE HAHAHAHAHAHA LOL LOL LOLOLOLOLOLOLOL",
      imageUrl:"https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize:"100x100",
      confirmButtonText:" THANKS FOR PLAYING "
    })
  }
  //handlePowerCoins(index){
    //cars[index - 1].overlap(powerCoins,function(collecter,collected){
      //player.score += 21 
      //collected.remove()
    //})
  //    }
    
  getState() {
    database.ref("gameState").on("value",(data) => {
      gameState = data.val()
    })
  }
  update(state){
    database.ref("/").update({
      gameState:state
    })
  }
   handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    this.resetTitle.html("RESET GAME")
    this.resetTitle.class("resetText")
    this.resetTitle.position(width / 2 + 200 , 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);

    this.leaderboardTitle.html("LEADERBOARD")
    this.leaderboardTitle.class("resetText")
    this.leaderboardTitle.position(width / 3 - 60 , 40);

    this.leader1.class("leadersText")
    this.leader1.position(width / 3 - 50 , 80)

    this.leader2.class("leadersText")
    this.leader2.position(width / 3 - 50 , 130)
  }
  showLeaderboard() {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      // &emsp;    This tag is used for displaying four spaces.
      leader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;

      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
    }

    if (players[1].rank === 1) {
      leader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;

      leader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }
  play(){
    this.handleElements()
    this.handleResetButton()
    Player.getPlayerInfo()
    player.getPlayerRank()
    if (allPlayers !== undefined ) {
      image(bg , 0 , -height * 5  , width , height * 6)
      this.showLeaderboard()
     // this.showFuelBar()
     // this.showLife()
      var index = 0
      for(var plr in allPlayers){
      index = index + 1
      var x = allPlayers[plr].positionX
      var y = height - allPlayers[plr].positionY
      var currentLife = allPlayers[plr].life

        if (index == player.index) {
        stroke(10)
        fill ("blue")
        ellipse(x , y , 60 , 60)
       
        if (player.life <= 0) {
          this.blast = true
          this.playerMoving = false
        }
        camera.position.y = cars[index - 1].position.y
        }
      }
       if (this.playerMoving) {
        player.positionY += 5;
        player.update();
      }
      this.handlePlayerControls()
      const finishLine = height * 6 - 100
      if (player.positionY > finishLine) {
        gameState = 2
        player.rank +=1
        Player.updatePlayerRank(player.rank)
        player.update()
        this.showRank()
      }
      drawSprites()
    }
  }
  showRank(){
    swal ({
      title:`AWESOME!!!${"\n"}Rank${"\n"}${player.rank} `,
      text:"CONGRATULATIONS YOU REACHED THE FINISHED LINE SUCCESSFULLY",
      imageUrl:"https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize:"100x100",
      confirmButtonText:"Okay"
    })

    
  }
  handleResetButton(){
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
      playerCount:0,
      gameState:0,
      playerRank:0,
      players:{}
      })
      window.location.reload();
    })
  } 

  handlePlayerControls() {
    if (!this.blast) {
      
    
    // handling keyboard events
    if (keyIsDown(UP_ARROW)) {
      this.playerMoving = true
      player.positionY += 10;
      player.update();
    }
    if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
      this.leftKeyActive = false
      player.positionX += 5;
      player.update();
    }
    if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
      this.leftKeyActive = true
      player.positionX += -5;
      player.update();
    }
  }
  }
  /*showLife(){
    push ()
    image (lifeImage , width / 2 - 130 , height - player.positionY - 400 , 20 , 20)
    fill("white")
    rect(width / 2 - 100 , height - player.positionY - 400 , 185 , 20)
    fill("#f50057")
    rect(width / 2 - 100 , height - player.positionY - 400 , player.life , 20)
    pop ()
  }

  showFuelBar(){
    push ()
    image (fuelImage , width / 2 - 130 , height - player.positionY - 350 , 20 , 20)
    fill("white")
    rect(width / 2 - 100 , height - player.positionY - 350 , 185 , 20)
    fill("#ffc400")
    rect(width / 2 - 100 , height - player.positionY - 350 , player.fuel , 20)
    pop ()
  }*

  handleObstacleCollision(index){
    if (dragons [index - 1].collide(obstacles)) {
      if (this.leftKeyActive) {
        player.positionX += 100
      } else {
        player.positionX -= 100
      }
      if (player.life > 0) {
        player.life -= 185 / 4
      }
      player.update()
    }
  }
  handleCarACollisionWithCarB(index){
    if (index == 1) {
      if (cars[index - 1].collide(cars[1])) {
        if (this.leftKeyActive) {
          player.positionX += 100
        }
        else{
          player.positionX -= 100
        }
        if (player.life > 0) {
          player.life -= 185 / 4
        }
        player.update()
      }
    }
  if (index == 2) {
      if (cars[index - 1].collide(cars[0])) {
        if (this.leftKeyActive) {
          player.positionX += 100
        }
        else{
          player.positionX -= 100
        }
        if (player.life > 0) {
          player.life -= 185 / 4
        }
        player.update()
      }
    }

  }*/
}


