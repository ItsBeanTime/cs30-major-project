
// Undertale
// Ben H and Zeyad M
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//GAMESTATE
let gameState = "title";
let menuState = "instruction"

//player variables
let playerX, playerY;
let currentSprites;
let frameIndex = 0;
let frameDelay = 10;
let frameCountAnim = 0;
let direction = "front";


let screenPosY;
let screenPosX = 0;
let scrollSpeed = 4;


//sprites
let playerSpriteFront = [];
let playerSpriteLeft = [];
let playerSpriteRight = [];
let playerSpriteBack = [];

//MUSIC
let startMenuTheme;
let onceUponATime;
let oUATStartingVolume = 0.3;
let ruinsMusic;

//SFX
let undertaleBoom;
let textSound;
let musCymbal;

//FONTS
let determinationFont;

//cutscene variables
let scrollCutY = -1023;
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
let speed = 4;
let choices = ["none", "fight", "act", "item", "mercy"];
let selections = ["none", "fight", "act", "item", "mercy"];
let choice = 0;
let selection = 0;

let mapSize = 12;
let ruinsMap;

let playersName = "";
let letterJitterX = [];
let letterJitterY = [];
let nameJitterX = 0;
let nameJitterY = 0;
let selectedLetter = 0;
let letterCols = 7;

let capitals = [
  "A","B","C","D","E","F","G","H","I",
  "J","K","L","M","N","O","P","Q","R",
  "S","T","U","V","W","X","Y","Z",
];
let lowercase = [
  "a","b","c","d","e","f","g","h","i",
  "j","k","l","m","n","o","p","q","r",
  "s","t","u","v","w","x","y","z",
]
let letters = capitals.concat(lowercase);
let buttons = ["Quit", "Backspace", "Done"];
let totalSlots = letters.length + buttons.length;

let confirmSelection = 0;
let textSizeIncrease = 33;

let playerNameMoveY = 0;
let playerNameMoveReady = false;

let walls = [];

function setup() {
  noSmooth();
  createCanvas(640 * 1.5, 480 * 1.5); 
  //createCanvas(windowWidth, windowHeight);

  setupSound();

  x = width/2;
  y = height/2;

  playerX = width / 2;
  playerY = height / 2;
  currentSprites = playerSpriteFront;

  screenPosY = -height * (mapSize - 5);

  for (let i = 0; i < letters.length; i++){
    letterJitterX.push(0);
    letterJitterY.push(0);
  }

  setupWalls();
}

function draw() {
  noSmooth();
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
  ruinsMusic = loadSound("assets/music/Ruins.mp3");

  //sfx
  undertaleBoom = loadSound("assets/sound effects/undertale.mp3");
  textSound = loadSound("assets/sound effects/SND_TXT2.wav");
  musCymbal = loadSound("assets/sound effects/mus-cymbal.mp3");

  ruinsMap = loadImage("assets/map sprites/ruins-1.png");
  determinationFont = loadFont("assets/fonts/determination.otf");
  title = loadImage("assets/title sprites/undertale-title-5.png");
  redHeartImg = loadImage("assets/player sprites/red-heart.png");

  for(let i = 1; i <= 11; i++){
    cutscene.push(loadImage(`assets/title sprites/undertale-title-${i}.png`));
  }

  cutscene.push(loadImage("assets/title sprites/undertale-titlescreen.png"));
}

function setupSound(){
  userStartAudio();
  textSound.setVolume(0.2);
  onceUponATime.setVolume(oUATStartingVolume);
  startMenuTheme.setVolume(0.5);
  ruinsMusic.setVolume (0.5);
}



function keyPressed() {

  if (gameState === "title" && menuState === "instruction"){
    if (keyCode === 90 || keyCode === ENTER){
      menuState = "name";
      return;
    }
  }

  if (currentFrame === 11){
    if (keyCode === 90 || keyCode === ENTER){
      gameState = "title";
    }
  }
  if (gameState === "cutscene"){
    if (keyCode === 13){
      onceUponATime.stop();
      currentFrame = 11;
    }
  }
  
  if (menuState === "confirm"){
    if (keyCode === LEFT_ARROW){
      confirmSelection = 0;
    }
    if (keyCode === RIGHT_ARROW){
      confirmSelection = 1;
    }
    if (keyCode === 90 || keyCode === ENTER){
      if (confirmSelection === 1){
        startMenuTheme.stop();
        fadeAlpha = 0;
        menuState = "startinggame"
      }
      else{
        menuState = "name";
        playerNameMoveReady = false;
        textSizeIncrease = 33;
      }
    }
    return;
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

  if (menuState === "name"){
    let onButton = selectedLetter >= letters.length;

    if (keyCode === RIGHT_ARROW){
      if (onButton){
        selectedLetter = min(selectedLetter + 1, letters.length + buttons.length - 1)
      }
      else{
        selectedLetter = min(selectedLetter + 1, letters.length - 1);
      }
    }

    if (keyCode === LEFT_ARROW){
      if (onButton){
        selectedLetter = max(selectedLetter - 1, letters.length);
      }
      else{
        selectedLetter = max(selectedLetter - 1, 0);
      }
    }

    if (keyCode === DOWN_ARROW){
      if (!onButton){
        let nextIndex = selectedLetter + letterCols;

        if (nextIndex >= letters.length){
          selectedLetter = letters.length;
        }
        else if(selectedLetter < capitals.length && nextIndex >= capitals.length){
          let currentCol = selectedLetter % letterCols;
          selectedLetter = capitals.length + currentCol;
        }
        else{
          selectedLetter = nextIndex;
        }
      }
    }

    if (keyCode === UP_ARROW){
      if (onButton){
        selectedLetter = letters.length - 1;
      }
      else{
        let prevIndex = selectedLetter - letterCols;

        if (selectedLetter >= capitals.length && selectedLetter < capitals.length + letterCols){
          let lastCapRow = Math.floor((capitals.length - 1) / letterCols);
          let currentCol = (selectedLetter - capitals.length) % letterCols;
          let target = lastCapRow * letterCols + currentCol;
          selectedLetter = lastCapRow * letterCols + currentCol;
          selectedLetter = min(target, capitals.length - 1)
        }
        else{
          selectedLetter = max(prevIndex, 0);
        }
      }
    }

    if (keyCode === 90 || keyCode === ENTER){
      if (onButton){
        let buttonIndex = selectedLetter - letters.length;
        if (buttonIndex === 0){
          menuState = "instruction";
          selectedLetter = 0;
          playersName = "";
        }
        if (buttonIndex === 1){
          playersName = playersName.slice(0, -1);
        }
        if (buttonIndex === 2){
          if (playersName.length > 0){
            menuState = "confirm"
            playerNameMoveY = height/5 + 36;
            playerNameMoveReady = true;
          }
        }
      }
      else{
        if (playersName.length < 6){
          playersName += letters[selectedLetter];
        }
      }
    }
  }
}


function mousePressed(){
  if (gameState === "start"){
    gameState = "cutscene";
  }
}

function clickToStart(){
  background(0);
  textFont(determinationFont);
  fill(255);
  textSize(40);
  text("Click To Start", width /5, height /4);  
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
      scrollCutY += 3;
      if (oUATStartingVolume > 0 && frameTimer > 400){
        oUATStartingVolume -= 0.0018;
        onceUponATime.setVolume(oUATStartingVolume);
      }
    }

    if (fadeAlpha < 255 && frameTimer < 200){
      fadeAlpha += 6;
    }
    if (frameTimer > 600){
      fadeAlpha -= 4;
    }

    tint(255, fadeAlpha);
    image(img, 0, scrollCutY, width, height * 2);
    noTint();

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
        textSize("33");
        textAlign(CENTER);
        text("[Press z or ENTER]", width/2, height - 200);
      }
      else{
        fill(0);
      }

    }
  }
}

function drawCutsceneText(txt){
  textFont(determinationFont);
  textSize(40.5);
  textAlign(LEFT,TOP);

  let xPos = 180;
  let yPos = height - 225;
  let boxWidth = width -390;

  fill(255);
  text(txt, xPos, yPos, boxWidth);

}

function startTitle(){
  image(title, 0, 0, width, height);
  if (!startMenuTheme.isPlaying() && !musCymbal.isPlaying()){
    startMenuTheme.play();   
  }
  if (menuState === "instruction"){
    instructionScreen();
  }
  if (menuState === "name"){
    playerNameScreen();
  }
  if (menuState === "confirm"){
    confirmNameScreen();
  }
  if (menuState === "startinggame"){
    startGameFade();
  }
}

function instructionScreen(){
  fill(190);
  textSize(33);
  textFont(determinationFont);
  textAlign(LEFT);

  text(
    " ---Instruction---\n" +
    "\n" +
    "[Z or ENTER]-Confirm\n" +
    "[X or SHIFT]-Cancel\n" +
    "[WASD]-Movement\n" +
    "[C or CTRL]-Menu(In-game)\n" +
    "[F]-Fullscreen\n" +
    "[Hold Q]-Quit\n" +
    "When HP is 0, you lose.",
    width /3.5, height /4
  )
}

function playerNameScreen(){
  background(0);
  textFont(determinationFont);
  textAlign(CENTER);
  fill(255);

  textSize(33);
  text("Name the fallen human.", width / 2, height / 8);
  

  fill(255);
  textSize(33);
  textAlign(CENTER);
  text(playersName, width/2+ 10, height/5 + 36);


  let capStartY = height/3;
  let lowStartY = capStartY + 3.5 * 45 + 40;
  let cellWidth = 80;
  let cellHeight = 45;
  let startX = width/2 - (letterCols * cellWidth)/2;

  for (let i = 0; i < letters.length; i++){

    let col = i % letterCols;
    let row = Math.floor(i / letterCols);
    let lx;
    let ly;

    if (i < capitals.length){
      lx = startX + col * cellWidth;
      ly = capStartY + row * cellHeight;
    }
    else{

      let li = i - capitals.length;
      let lcol = li % letterCols;
      let lrow = Math.floor(li / letterCols);

      lx = startX + lcol * cellWidth;
      ly = lowStartY + lrow * cellHeight;
    }

    if (frameCount % 4 === 0){
      letterJitterX[i] = random(-1, 1);
      letterJitterY[i] = random(-1, 1);
    }

    let jx = letterJitterX[i];
    let jy = letterJitterY[i];

    if (i === selectedLetter){
      fill(255, 255, 0);
    }
    else{
      fill(255);
    }

    textSize(33);
    textAlign(LEFT);
    text(letters[i], lx + jx, ly + jy);
  }

  let buttonY = height - height/8;
  let buttonSpacing = width/4;

  textSize(33);
  textAlign(CENTER);
  for (let i = 0; i < buttons.length; i++){
    let buttonIndex = letters.length + i;
    if (buttonIndex === selectedLetter){
      fill(255, 255, 0);
    }
    else{
      fill(255);
    }
    text(buttons[i], buttonSpacing * (i + 1), buttonY);
  }
}

function confirmNameScreen(){
  background(0);
  textFont(determinationFont);
  textAlign(CENTER);

  if (frameCount % 4 === 0){
    nameJitterX = random(-2, 2);
    nameJitterY = random(-2, 2);
  }

  let targetY = height - 300;

  if (playerNameMoveReady && playerNameMoveY < targetY){
    playerNameMoveY += 1;
  }
  fill(255);
  textSize(33);
  text("The true name.", width/2.2, height/8);

  textSize(textSizeIncrease);
  text(playersName, width/2 + nameJitterX, playerNameMoveY + nameJitterY);
  if (textSizeIncrease < 140){
    textSizeIncrease += 0.35;
  }


  textSize(33);
  if (confirmSelection === 0){
    fill(255,255,0);
  }
  else{
    fill(255);
  }
  text("No", width /2 - 150, height - 100);

  if (confirmSelection === 1){
    fill(255, 255, 0);
  }
  else{
    fill(255);
  }
  text("Yes", width/2 + 150, height - 100);
}

function startGameFade(){
  startMenuTheme.stop();
  background(0);
  textFont(determinationFont);
  textAlign(CENTER);

  if (fadeAlpha === 0 && !musCymbal.isPlaying()){
    musCymbal.play()
  }

  fadeAlpha += 255 / 300;

  fill(255);
  textSize(textSizeIncrease);
  text(playersName, width/2, playerNameMoveY);

  fill(255, fadeAlpha);
  rect(0,0,width, height);

  if (fadeAlpha >= 255){
    fadeAlpha = 0;
    gameState = "ruins";
  }
}


function startRuins(){
  background(0);
  image(ruinsMap, screenPosX, screenPosY, width * (mapSize + 10), height * (mapSize -4));
  if (!ruinsMusic.isPlaying()){
    ruinsMusic.play();
  }
  playerMove();
  displayPlayer();
}

function playerMove(){
  let moving = false;
  let newDirection = direction;

  if (keyIsDown(65)){
    if (playerX > width/4){
      playerX -= speed;
   }
   else{
      screenPosX += speed;
    }

    currentSprites = playerSpriteLeft;
    newDirection = "left";
    moving = true;
  }

  if (keyIsDown(68)){ 
    if (playerX < width - width/4){
      playerX += speed; // move player freely
    }
    else{
      screenPosX -= speed; // scroll world instead
   }

    currentSprites = playerSpriteRight;
    newDirection = "right";
    moving = true;
  }
  if (keyIsDown(87)){
    if (playerY > height/4){
     playerY -= speed;
    }
    else{
     screenPosY += speed;
   }

    currentSprites = playerSpriteBack;
    newDirection = "back";
    moving = true;
  }
  if (keyIsDown(83)){
    if (playerY < height - height/4){
     playerY += speed;
   }
    else{
     screenPosY -= speed;
    }

    currentSprites = playerSpriteFront;
    newDirection = "front";
    moving = true;
  }

  if (newDirection !== direction){
    frameIndex = 0;
    frameCountAnim = 0;
  }
  direction = newDirection;

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
      image(currentSprites[frameIndex], playerX, playerY, 40 * 1.5, 60 * 1.5);
    }
  }
}

function setupWalls(){
  walls = [
    {x: 0, y:0, w:9999, h:50},
    {x: 0, y: 0, w: 50, h: 9999},
    {x: 0, y: 1900, w:9999, h:50},
    {x: 2800, y:0,w:50, h:9999},
  ];

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

