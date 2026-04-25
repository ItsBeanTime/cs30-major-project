// Undertale
// Ben H and Zeyad M
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//GAMESTATE
let gameState = "ruins";

//player variables
let playerX, playerY;
let currentSprites;
let frameIndex = 0;
let frameDelay = 10;
let frameCountAnim = 0;
let direction = "front";


//sprites
let playerSpriteFront = [];
let playerSpriteLeft = [];
let playerSpriteRight = [];
let playerSpriteBack = [];

//MUSIC
let startMenuTheme;
let onceUponATime;
let oUATStartingVolume = 0.3;

//SFX
let undertaleBoom;
let textSound;

//FONTS
let determinationFont;

//cutscene variables
let scrollCutY = -682;
let currentFrame = 0;
let frameDuration = 300;
let frameTimer = 0;

let cutsceneDialogue = [
  "long ago, two races ruled over Earth: HUMANS and MONSTERS.",
  "One day, war broke out between the two races.",
  "After a long battle, the humans were victorious.",
  "They sealed the monsters underground with a magic spell.",
  "Many years later. . .",
  "MT. Ebott               201X",
  "Legends say that those who climb the mountain never return.",
];

let showText = "";
let charIndex = 0;
let textSpeed = 4;
let playerName;
let cutscene = [];
let title;
let titleNumber = 1;
let fadeAlpha = 0;
let fadeState = "in";

// Foo's Variables DO NOT TOUCH
let fightStrokeWeight = 5;
let fightBorderSize = 200; 
let heartSize = 20;
let x;
let y;
let speed = 5;
let choices = ["none", "fight", "act", "item", "mercy"];
let selections = ["none", "fight", "act", "item", "mercy"];
let choice = 0;
let selection = 0;

let ruinsMap;

function setup() {
  userStartAudio();

  createCanvas(640, 480); 
  //createCanvas(windowWidth, windowHeight);

  noSmooth();

  textSound.setVolume(0.2);
  onceUponATime.setVolume(oUATStartingVolume);
  startMenuTheme.setVolume(0.5);

  x = width/2;
  y = height/2;

  playerX = width / 2;
  playerY = height / 2;
  currentSprites = playerSpriteFront;
}

function draw() {
  if (gameState === "start"){
    clickToStart();
  }
  if (gameState === "cutscene"){
    playCutscene();   
  }

  if (gameState === "title"){
    startTitle();    
  }

  if (gameState === "chooseWhatToDoWithEnemy"){
    chooseWhatToDoWithEnemy();
  }

  if (gameState === "dodge"){
    dodge();
  }
  if (gameState === "ruins"){
    startRuins();
  }
}

function preload() {
  //player sprite
  for(let i = 1; i < 5; i++){
    playerSpriteFront.push(loadImage(`assets/player sprites/frisk${i}.png`));
  }
  for(let i = 5; i < 7; i++){
    playerSpriteLeft.push(loadImage(`assets/player sprites/frisk${i}.png`));
  }
  for(let i = 7; i < 9; i++){
    playerSpriteRight.push(loadImage(`assets/player sprites/frisk${i}.png`));
  }
  for(let i = 9; i < 13; i++){
    playerSpriteBack.push(loadImage(`assets/player sprites/frisk${i}.png`));
  }

  //music
  onceUponATime = loadSound("assets/music/Once Upon A Time.mp3");
  startMenuTheme = loadSound("assets/music/Start Menu.mp3");

  //sfx
  undertaleBoom = loadSound("assets/sound effects/undertale.mp3");
  textSound = loadSound("assets/sound effects/SND_TXT2.wav");

  ruinsMap = loadImage("assets/map sprites/ruins-1.png");
  determinationFont = loadFont("assets/fonts/determination.otf");
  title = loadImage("assets/title sprites/undertale-title-5.png");
  redHeartImg = loadImage("assets/player sprites/red-heart.png");

  for(let i = 1; i <= 11; i++){
    cutscene.push(loadImage(`assets/title sprites/undertale-title-${i}.png`));
  }

  cutscene.push(loadImage("assets/title sprites/undertale-titlescreen.png"));
}

function clickToStart(){
  background(0);
  textFont(determinationFont);
  fill(255);
  textSize(40);
  text("Click To Start", width /5, height /4);  
}

function keyPressed() {
  if (currentFrame === 11){
    if (keyCode === 90){
      gameState = "title";
    }
  }
  if (gameState === "cutscene"){
    if (keyCode === 13){
      onceUponATime.stop();
      currentFrame = 11;
    }
  }

  if (keyCode === LEFT_ARROW && selection > 0 && choice === 0 && gameState === "chooseWhatToDoWithEnemy") {
    selection --;
  }
  if (keyCode === RIGHT_ARROW && selection < selections.length && choice === 0 && gameState === "chooseWhatToDoWithEnemy") {
    selection ++;
  }
  if (key === " " && choice === 0 && gameState === "chooseWhatToDoWithEnemy") {
    choice = selection;
  }
  if (keyCode === 115) { // doesnt work for some reason 
    fullscreen();
  }
}



function mousePressed(){
  if (gameState === "start"){
    gameState = "cutscene";
  }
}


function playCutscene(){
  if (!onceUponATime.isPlaying() && currentFrame !== 11){
    onceUponATime.play();
  }
  background(0);

  if (currentFrame < 10 || currentFrame > 10 && currentFrame !== 11){
    tint(255, fadeAlpha);
    image(cutscene[currentFrame], 0, 0, width, height);
    noTint();
    
    frameTimer++;

    if (fadeState === "in"){
      fadeAlpha += 6;
      if (fadeAlpha >= 255){
        fadeAlpha = 255;
        fadeState = "hold";
      }
    }
    else if (fadeState === "hold"){
      if (frameTimer > frameDuration){
        fadeState = "out";
      }
    }
    else if (fadeState === "out"){
      fadeAlpha -= 6;

      if (fadeAlpha <= 0){
        fadeAlpha = 0;
        fadeState = "in";

        currentFrame++;
        frameTimer = 0;
        charIndex = 0;
        showText = "";
      }
    }
    let currentText = cutsceneDialogue[currentFrame] || "";

    if (charIndex < currentText.length){
      if (frameCount % textSpeed === 0){
        charIndex++;
        let newChar = currentText.charAt(charIndex - 1);
        showText =  currentText.substring(0, charIndex);

        if(textSound.isLoaded() && newChar !== " "){
          textSound.stop();
          textSound.play();
        }
      }      
    }

    drawCutsceneText(showText);
  }
  if (currentFrame === 10){
    background(0);

    let img = cutscene[currentFrame];

    if (frameTimer > 200 && frameTimer < 560){
      scrollCutY += 2;
      if (oUATStartingVolume > 0 && frameTimer > 300){
        oUATStartingVolume -= 0.0009;
        onceUponATime.setVolume(oUATStartingVolume); 
      }
    }
    image(img, 0, scrollCutY, width, height * 2);

    fill(0);
    rect(0, 0, width, height /9);
    rect(0, height / 1.75, width, height);
    frameTimer++;

    if (frameTimer > 700){
      onceUponATime.stop();
      currentFrame++;
      frameTimer = 0;
      undertaleBoom.play();
    }
  }
  if (currentFrame === 11){
    image(cutscene[currentFrame], 0, 0, width, height);
    frameTimer++;
    if (frameTimer > 120){
      if (frameTimer % 60  >= 20){
        textFont(determinationFont);
        fill(170);
        textSize("30");
        text("[z]", width/2 - 50, height - 100);
      }
      else{
        fill(0);
      }

    }
  }
}

function startRuins(){
  let mapSize = 12;
  image(ruinsMap, 0, -height * (mapSize - 5), width * (mapSize + 10), height * (mapSize  -4));

  playerMove();
  displayPlayer();
}

function playerMove(){
  let moving = false;

  if (keyIsDown(65)){ //left
    playerX -= speed;
    currentSprites = playerSpriteLeft;
    direction = "left";
    moving = true
  }
  if (keyIsDown(68)){ //right
    playerX += speed;
    currentSprites = playerSpriteRight;
    direction = "right";
    moving = true
  }
  if (keyIsDown(87)){  //up
    playerY -= speed;
    currentSprites = playerSpriteBack;
    direction = "back";
    moving = true
  }
  if (keyIsDown(83)){ //down
    playerY += speed;
    currentSprites = playerSpriteFront;
    direction = "front";
    moving = true
  }

  //do the animation if moving
  if (moving){
    frameCountAnim++;
    if (frameCountAnim > frameDelay){
      frameIndex = (frameIndex + 1) % currentSprites.length;
      frameCountAnim = 0;
    }
  }
  else{
    frameIndex = 0;
  }
}

function displayPlayer(){
  if (currentSprites && currentSprites.length > 0){
    let img = currentSprites[frameIndex];

    if (img){
      image(currentSprites[frameIndex], playerX, playerY, 40, 60);
    }
  }
}

function drawCutsceneText(txt){
  textFont(determinationFont);
  textSize(27);
  textAlign(LEFT,TOP);

  let xPos = 120;
  let yPos = height - 150;
  let boxWidth = width -260;

  fill(255);
  text(txt, xPos, yPos, boxWidth);

}

function startTitle(){
  image(title, 0, 0, 640, 480);
  if (!startMenuTheme.isPlaying()){
    startMenuTheme.play();   
  }
  playerNameScreen(); 
}

function playerNameScreen(){
  fill(255);
  textSize(22);
  textFont(determinationFont);
  text("Name the fallen human.", width /3.7, height/7);
  text("Quit", width/5, height - height /10);
  text("Backspace", width/2.5, height - height /10);
  text("Done", width/1.5, height - height/10);

  //display the letters (temporary: will make them jiggle later)
  text("A    B    C    D    E    F    G", width /5, height/4);
  text("H    I    J    K    L    M    N", width /5, height/3.3);
  text("O    P    Q    R    S    T    U", width /5, height/2.8);
  text("V    W    X    Y    Z          ", width /5, height/2.4);
}

function chooseWhatToDoWithEnemy() { //Foo's Function DO NOT TOUCH

  if (gameState === "chooseWhatToDoWithEnemy"){ 
    background(0);
    fill(255);
    textSize(20);
    textFont(determinationFont);
    text(`selection: ${selection}
  choice: ${choice}`, width/2, height/2);
  }

  if (choice === 1){
    gameState = "dodge";
  }
}

function dodge() { //Foo's Function DO NOT TOUCH
  // if dodge state, move the heart with arrow keys
  if (keyIsDown(37)) { // left arrow
    x -= speed;
  }
  if (keyIsDown(39)) { //right arrow
    x += speed;
  }
  if (keyIsDown(38)) { // up arrow
    y -= speed;
  }
  if (keyIsDown(40)) { // down arrow
    y += speed;
  }

  // keep player inside the fight border
  let boxSize = fightBorderSize + fightStrokeWeight;
  let innerSize = boxSize - fightStrokeWeight;    

  x = constrain(x,
    width/2 - innerSize/2 + heartSize/2,
    width/2 + innerSize/2 - heartSize/2
  );

  y = constrain(y,
    height/2 - innerSize/2 + heartSize/2,
    height/2 + innerSize/2 - heartSize/2
  );



  // display fight
  background(0);
  strokeWeight(fightStrokeWeight);
  stroke(255);
  noFill();
  rectMode(CENTER);
  rect(width/2 , height/2 , boxSize, boxSize);
  // display heart
  image(redHeartImg, x - heartSize/2, y - heartSize/2, heartSize, heartSize);
  
}

function fight() { //Foo's Function DO NOT TOUCH
  background(255, 0, 0);
}
