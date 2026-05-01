// Undertale
// Ben H and Zeyad M
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//GAMESTATE
let gameState = "chooseWhatToDoWithEnemy"; //"ruins";
let menuState = "instruction";
let pauseState = "no";
let pauseSelection = "stat";

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
let ruinsMusic;

//SFX
let undertaleBoom;
let textSound;
let musCymbal;

//FONTS
let determinationFont;

//cutscene / title variables
let scrollCutY = -1023;
let currentFrame = 0;
let frameDuration = 300;
let frameTimer = 0;
let showText = "";
let charIndex = 0;
let textSpeed = 4;
let cutscene = [];
let title;
let titleNumber = 1;
let fadeAlpha = 0;
let fadeState = "in";
let cutsceneDialogue = [
  "long ago, two races ruled over Earth: HUMANS and MONSTERS.",
  "One day, war broke out between the two races.",
  "After a long battle, the humans were victorious.",
  "They sealed the monsters underground with a magic spell.",
  "Many years later. . .",
  "MT. Ebott               201X",
  "Legends say that those who climb the mountain never return.",
];

// Foo's Variables DO NOT TOUCH
let fightStrokeWeight = 5;
let fightBorderWidth = 500;
let fightBorderHeight = 500;
let heartSize = 20;
let x;
let y;


let choices = ["fight", "act", "item", "mercy"];
let selections = ["fight", "act", "item", "mercy"];
let theMonsters = ["Froggit", "Whimsun", "Loox", "Vegetoid", "Migosp", "Moldsmal"];
let choice;
let selection = 0;

// map variables
let mapSize = 12;
let ruinsMap;
let screenPosY;
let screenPosX = 0;
let scrollSpeed = 4;

//pause screen variables
let playersName = "Player";
let playerLevel = 1;
let playerNextLevel = 10;
let playerCurHealth = 0;
let playerHealthMax = 0;
let playerGuap = 0;
let playerAttackStat = 0;
let playerAttackModify = 0;
let playerDefenseStat = 0;
let playerDefenseModify = 0;
let playerExp = 0;
let playerKills = 0;
let playerWeaponEquip = "Stick";
let playerArmorEquip = "Bandage";

//player name screen variables

let capitals = [
  "A","B","C","D","E","F","G","H","I",
  "J","K","L","M","N","O","P","Q","R",
  "S","T","U","V","W","X","Y","Z",
];
let lowercase = [
  "a","b","c","d","e","f","g","h","i",
  "j","k","l","m","n","o","p","q","r",
  "s","t","u","v","w","x","y","z",
];
let letterJitterX = [];
let letterJitterY = [];
let nameJitterX = 0;
let nameJitterY = 0;
let selectedLetter = 0;
let letterCols = 7;
let letters = capitals.concat(lowercase);
let buttons = ["Quit", "Backspace", "Done"];
let totalSlots = letters.length + buttons.length;
let confirmSelection = 0;
let textSizeIncrease = 33;
let playerNameMoveY = 0;
let playerNameMoveReady = false;

//triggers/wall variables
let walls = [];
let triggers = [];
let triggerCooldown = false;

function setup() {
  noSmooth();
  createCanvas(640 * 1.5, 480 * 1.5); 
  //createCanvas(windowWidth, windowHeight);

  setupSound();

  x = width/2;
  y = height/2;

  playerX =  width /2 - 35;
  playerY =  height / 2 - 60;
  currentSprites = playerSpriteFront;

  screenPosY = -height * (mapSize - 5);

  for (let i = 0; i < letters.length; i++){
    letterJitterX.push(0);
    letterJitterY.push(0);
  }

  setupWalls();
  setupTriggers();
}

function draw() { //check game states
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
  
  //UI
  for(let i = 1; i <= 2; i++){
    fightButton = loadImage(`assets/battle menu/fightbutton${i}.png`);
  }
  for(let i = 1; i <= 2; i++){
    actButton = loadImage(`assets/battle menu/actbutton${i}.png`);
  }
  for(let i = 1; i <= 2; i++){
    itemButton = loadImage(`assets/battle menu/itembutton${i}.png`);
  }
  for(let i = 1; i <= 2; i++){
    mercyButton = loadImage(`assets/battle menu/mercybutton${i}.png`);
  }
}

//INPUT FUNCTIONS//
function keyPressed() {

  if (pauseState === "no" && keyCode === 67){
    pauseState = "yes";
  }

  else if (pauseState === "yes" && keyCode === 67){
    pauseState = "no";
  }
  
  if (gameState === "ruins" && keyCode === 90){
    let mapPlayerX = playerX - screenPosX;
    let mapPlayerY = playerY - screenPosY;
    checkTriggers(mapPlayerX, mapPlayerY, true);
  }


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
      if (!undertaleBoom.isPlaying()){
        undertaleBoom.play();
      }
      currentFrame = 11;
    }
  }
  
  if (menuState === "confirm"){
    if (keyCode === LEFT_ARROW || keyCode === 65){
      confirmSelection = 0;
    }
    if (keyCode === RIGHT_ARROW || keyCode === 68){
      confirmSelection = 1;
    }
    if (keyCode === 90 || keyCode === ENTER){
      if (confirmSelection === 1){
        startMenuTheme.stop();
        fadeAlpha = 0;
        menuState = "startinggame";
      }
      else{
        menuState = "name";
        playerNameMoveReady = false;
        textSizeIncrease = 33;
      }
    }
    return;
  }
  // selection with arrow keys, confirm with space and if goes off screen it starts from the beginning or end depending on the direction
  if (keyCode === LEFT_ARROW || keyCode === 65){
    selection = (selection - 1 + selections.length) % selections.length;
  }
  if (keyCode === RIGHT_ARROW || keyCode === 68){
    selection = (selection + 1) % selections.length;
  } 



  if (key === " " && gameState === "chooseWhatToDoWithEnemy") {
    choice = selection;
  }

  if (menuState === "name"){
    let onButton = selectedLetter >= letters.length;

    if (keyCode === RIGHT_ARROW || keyCode === 68){
      if (onButton){
        selectedLetter = min(selectedLetter + 1, letters.length + buttons.length - 1);
      }
      else{
        selectedLetter = min(selectedLetter + 1, letters.length - 1);
      }
    }

    if (keyCode === LEFT_ARROW || keyCode === 65){
      if (onButton){
        selectedLetter = max(selectedLetter - 1, letters.length);
      }
      else{
        selectedLetter = max(selectedLetter - 1, 0);
      }
    }

    if (keyCode === DOWN_ARROW || keyCode === 83){
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

    if (keyCode === UP_ARROW || keyCode === 87){
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
          selectedLetter = min(target, capitals.length - 1);
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
            menuState = "confirm";
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

//SETUP FUNCTIONS//
function setupSound(){
  userStartAudio();
  textSound.setVolume(0.2);
  onceUponATime.setVolume(oUATStartingVolume);
  startMenuTheme.setVolume(0.5);
  ruinsMusic.setVolume (0.5);
}

function setupWalls(){
  walls = [
    //edge of map
    makeWall(0,0,6981,0),
    makeWall(0,0,0,1921),
    makeWall(0,1921,6981,0),
    makeWall(6950,0,0,1921),


    makeWall(490,722,98,38),
    makeWall(490, 750, 30, 90),
    makeWall(490, 765,10, 161),

    //other walls
    //ruins start room
    // makeWallM(54, 5128, 30, 700),
    // makeWallM(84, 5450 + 80, 60, 500),
    // makeWallM(84 + 60, 5450 + 140, 60, 500),
    // makeWallM(204, 5560 + 90, 60, 500),
    // makeWallM(84, 5164, 120, 75),
    // makeWallM(204, 5088, 600, 85),
    // makeWallM(264, 5715, 450, 100),
    // makeWallM(686,5624 + 30, 70, 80,),
    // makeWallM(749, 5508 + 86,1300,80,),
    // makeWallM(749,5157,200,80,),
    // makeWallM(870,5165,950,310,),
    // makeWallM(2008,5165,500,600,),
    // makeWallM(1947,5165,60,310,),
    // makeWallM(1821,5250,150,30,),

    //ruins flowey room
    makeWallM(1453,4570, 30, 800),
    makeWallM(2300,4570, 30, 800),
    makeWallM(1480,4570, 320, 30),
    makeWallM(1939,4570, 400, 30),

    //ruins stairs roomd
    makeWallM(1786,4320, 200, 20),
    makeWallM(1783, 4200, 30, 200),
    makeWallM(1935, 4200, 30, 200),

    makeWallM(1624, 4140, 128,20),
    makeWallM(1995, 4140, 128,20),

    makeWallM(1510, 3465, 60, 550),
    makeWallM(2182, 3465, 60, 550),
    makeWallM(1453, 2865, 60, 1300),
    makeWallM(2240, 2865, 60, 1300),
    makeWallM(1516, 3040, 324, 200),
    makeWallM(1912, 3040, 324, 200),

    makeWallM(1705, 3300, 355, 60),
    makeWallM(1705, 3339, 10, 80),
    makeWallM(2050, 3339, 10, 80),

    //ruins first puzzle room

    makeWallM(1813,2937,130, 30),
    makeWallM(1695, 2883, 119, 80),
    makeWallM(1937, 2883, 210, 80),

    makeWallM(2245, 2397, 30, 400),
    makeWallM(2182, 2235, 60, 350),
    makeWallM(2119, 2168, 60, 350),
    makeWallM(1876, 2226 - 37, 300, 270),


    
  ];
}

function setupTriggers(){
  triggers = [
    {
      x:1825,y:5260,w:120,h:200,
      onWalk: true,
      action: () => {
        teleportPlayer(0, -220);
        console.log("walked onto trigger");
      }
    },

    {
      x:0,y:0,w:0,h:0,
      onInteract: true,
      action: () => {
        console.log("interacted");
      }
    }
  ];
}

//WALL / TRIGGER FUNCTIONS//
function checkTriggers(px, py, pressed){
  let pw = 60;
  let ph = 20;
  let offsetY = 70;

  let inAnyTrigger = false;

  for (let trigger of triggers){
    if (px < trigger.x + trigger.w && px + pw > trigger.x && py + offsetY < trigger.y + trigger.h && py + offsetY + ph > trigger.y){
      inAnyTrigger = true;
      if (trigger.onWalk && !pressed && !triggerCooldown){
        triggerCooldown = true;
        trigger.action();
      }
      if (trigger.onInteract && pressed){
        trigger.action();
      }
    }
  }
  if (!inAnyTrigger){
    triggerCooldown = false;
  }
}

function makeWall(px, py, pw, ph){
  let scaleX = width * (mapSize + 10) / 6981;
  let scaleY = height * (mapSize - 4) / 1921;
  return {
    x: px * scaleX,
    y: py * scaleY,
    w: pw * scaleX,
    h: ph * scaleY
  };
}

function makeWallM(mx, my, mw, mh){
  return {x:mx, y: my, w: mw, h: mh};
}

function collidesWithWall(px, py){
  let pw = 60;
  let ph = 20;
  let offsetY = 69;

  for (let wall of walls){
    if (px + 10 < wall.x + wall.w && px - 10 + pw > wall.x && py + offsetY < wall.y + wall.h && py + offsetY + ph > wall.y){
      return true;
    }
  }
  return false;
}

//TITLE/MENU FUNCTIONS//
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

function pauseScreen(){
  if (pauseState === "yes"){
    fill(0);
    stroke(255);
    strokeWeight(9);
    rect(width/8, height/5, width/5, height/6);
    rect(width/8, height/2.7 + 30, width/5, height/4);
    rect(width/2 - width/7, height/5, width/2.6, height/1.5);

    strokeWeight(0);
    textSize(32);
    fill(255);
    textFont(determinationFont);
    text(`${playersName}`, width/8 + 20, height/4);
    textSize(20);
    text(`LV ${playerLevel}`, width/8 + 20, height/3 - 35);
    text(`HP ${playerCurHealth} / ${playerHealthMax}`, width/8 + 20, height/3 - 12);
    text(`G ${playerGuap}`, width/8 + 20, height/2 -   110);

    //temp
    textSize(32);
    text("ITEM", 175, 350);
    text("STAT", 175, 390);
    text("CELL", 175, 430);

    if (pauseSelection === "stat"){
      textFont(determinationFont);
      textSize(32);
      text(`"${playersName}"`, 380, 205 );

      text(`LV ${playerLevel}`, 380, 265);
      text(`HP ${playerCurHealth} / ${playerHealthMax}`, 380, 300);

      text(`AT ${playerAttackStat}(${playerAttackModify})`, 380, 365);
      text(`DF ${playerDefenseStat}(${playerDefenseModify})`, 380, 400);

      text(`EXP:${playerExp}`, 540, 365);
      text(`NEXT:${playerNextLevel}`, 540, 400);

      text(`WEAPON:${playerWeaponEquip}`, 380, 465);
      text(`ARMOR:${playerArmorEquip}`, 380, 500);

      text(`GOLD:${playerGuap}`, 380, 565);

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
  );
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
  let startX = width/2 - letterCols * cellWidth/2;

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
    musCymbal.play();
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

//ACTUAL GAME FUNCTIONS//
function startRuins(){
  background(0);
  image(ruinsMap, screenPosX, screenPosY, width * (mapSize + 10), height * (mapSize -4));

  noFill();
  stroke(255,0,0);
  strokeWeight(2);
  //noStroke();
  for (let wall of walls){
    rect(wall.x + screenPosX, wall.y + screenPosY, wall.w, wall.h);
  }

  stroke(180, 0, 255);
  //noStroke(); // hide hitbox
  for (let trigger of triggers){
    rect(trigger.x + screenPosX, trigger.y + screenPosY, trigger.w, trigger.h);
  }

  stroke(0, 255, 0);
  strokeWeight(2);
  noFill();
  //noStroke();
  rect(playerX + 10, playerY + 69, 40, 20);

  noStroke();

  fill(255);
  noStroke();
  textSize(20);
  textFont(determinationFont);
  textAlign(LEFT);
  text(`mapX: ${floor(playerX - screenPosX)} mapY: ${floor(playerY - screenPosY)}`, 10, 30);
  text(`screenPosY: ${floor(screenPosY)}`, 10, 55);
  text(`startY: ${floor(-height * (mapSize - 5))}`, 10, 80);
  text(`mouseX: ${mouseX}`, 10, 100);
  text(`mouseY: ${mouseY}`, 10, 115);


  if (!ruinsMusic.isPlaying()){
    ruinsMusic.play();
  }
  pauseScreen();
  if (pauseState === "no"){
    playerMove();
    displayPlayer();
  }

  
}

function playerMove(){
  let moving = false;
  let newDirection = direction;

  let mapW = width * (mapSize + 10);
  let mapH = height * (mapSize - 4);

  let minScrollX = -(mapW - width);
  let minScrollY = -(mapH - height);
  let maxScrollX = 0;
  let maxScrollY = 0;

  let mapPlayerX = playerX - screenPosX;
  let mapPlayerY = playerY - screenPosY;

  let newMapX = mapPlayerX;
  let newMapY = mapPlayerY;

  if (keyIsDown(65)){
    newMapX -= speed;
    currentSprites = playerSpriteLeft;
    newDirection = "left";
    moving = true;
  }

  if (keyIsDown(68)){ 
    newMapX += speed;
    currentSprites = playerSpriteRight;
    newDirection = "right";
    moving = true;
  }
  if (keyIsDown(87)){
    newMapY -= speed;
    currentSprites = playerSpriteBack;
    newDirection = "back";
    moving = true;
  }
  if (keyIsDown(83)){
    newMapY += speed;
    currentSprites = playerSpriteFront;
    newDirection = "front";
    moving = true;
  }

  if (!collidesWithWall(newMapX, mapPlayerY)){
    mapPlayerX = newMapX;
  }
  if (!collidesWithWall(mapPlayerX, newMapY)){
    mapPlayerY = newMapY;
  }

 

  screenPosX = constrain(width / 2 - mapPlayerX, minScrollX, maxScrollX);
  screenPosY = constrain(height / 2 - mapPlayerY, minScrollY, maxScrollY);

  playerX = mapPlayerX + screenPosX;
  playerY = mapPlayerY + screenPosY;

  checkTriggers(mapPlayerX, mapPlayerY, false);

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

function teleportPlayer(dx, dy){
  let mapW = width * (mapSize + 10);
  let mapH = height * (mapSize - 4);
  let mapPlayerX = playerX - screenPosX + dx;
  let mapPlayerY = playerY - screenPosY + dy;
  screenPosX = constrain(width / 2 -mapPlayerX, -(mapW - width),0);
  screenPosY = constrain(height / 2 -mapPlayerY, -(mapH - height),0);
  playerX = mapPlayerX + screenPosX;
  playerY = mapPlayerY + screenPosY;
}

function chooseWhatToDoWithEnemy() { //Foo's Function DO NOT TOUCH

  
  background(0);
  fill(255);
  textSize(20);
  textFont(determinationFont);
  text(`selection: ${selections[selection]}
  choice: ${choice}`, width/2, height/2);
  let selectionSize = 50;
  image(fightButton[1], width/2 - 200, height - 200, selectionSize, selectionSize); // broken
  let undefined;
  if (choice === 0){ 
    gameState = "dodge";
    choice = 0;
  }
}

function dodge() { //Foo's Function DO NOT TOUCH
  // if dodge state, move the heart with arrow keys
  let speed = 9;
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
  let boxHeight = fightBorderHeight + fightStrokeWeight;
  let boxWidth = fightBorderWidth + fightStrokeWeight;
  let innerHeight = boxHeight - fightStrokeWeight;
  let innerWidth = boxWidth - fightStrokeWeight;

  x = constrain(x,
    width/2 - innerWidth/2 + heartSize/2,
    width/2 + innerWidth/2 - heartSize/2
  );

  y = constrain(y,
    height/2 - innerHeight/2 + heartSize/2,
    height/2 + innerHeight/2 - heartSize/2
  );



  // display fight
  background(0);
  strokeWeight(fightStrokeWeight);
  stroke(255);
  noFill();
  rectMode(CENTER);
  rect(width/2 , height/2 , boxWidth, boxHeight);
  // display heart
  image(redHeartImg, x - heartSize/2, y - heartSize/2, heartSize, heartSize);
  
}

function fight() { //Foo's Function DO NOT TOUCH
  background(255, 0, 0);
}

function playerLevelIncrease(){ //https://www.reddit.com/r/Underminers/comments/3u5z71/undertale_lvexpatdf_table/
  if (playerExp >= 10){
    playerLevel = 2;
  }
  if (playerExp >= 30){
    playerLevel = 3;
  }
}

