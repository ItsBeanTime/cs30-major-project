// Undertale
// Ben H and Zeyad M
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let startMenuTheme;
let undertaleBoom;
let onceUponATime;
let oUATStartingVolume = 0.3;
let textSound;
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
]

let showText = "";
let charIndex = 0;
let textSpeed = 4;

let determinationFont;
let playerName;
let cutscene = [];
let title;
let titleNumber = 1;
let gameState = "start";

let fadeAlpha = 0;
let fadeState = "in";

// Foo's Variables DO NOT TOUCH
let fightStrokeWeight = 20;
let fightBorderSize = 200;  
let heartSize = 20;
let x;
let y;
let speed = 5;
let choices = ["none", "fight", "act", "item", "mercy"];
let selections = ["none", "fight", "act", "item", "mercy"];
let choice = 0;
let selection = 0;

function setup() {
  userStartAudio();
  createCanvas(640, 480); //how does one fullscreen
  textSound.setVolume(0.2);
  onceUponATime.setVolume(oUATStartingVolume);
  startMenuTheme.setVolume(0.5);
  x = width/2;
  y = height/2;
}

function draw() {
  if (gameState === "start"){
    background(0);
    textFont(determinationFont);
    fill(255);
    textSize(40);
    text("Click To Start", width /5, height /4);
  }
  if (gameState === "cutscene"){
    playCutscene();   
  }

  if (gameState === "title"){
    startTitle();    
  }

  // fight();
}

function mousePressed(){
  if (gameState === "start"){
    gameState = "cutscene";
  }
}

function preload() {
  startMenuTheme = loadSound("assets/music/Start Menu.mp3");
  undertaleBoom = loadSound("assets/sound effects/undertale.mp3");
  onceUponATime = loadSound("assets/music/Once Upon A Time.mp3");
  textSound = loadSound("assets/sound effects/SND_TXT2.wav");
  determinationFont = loadFont("assets/fonts/determination.otf");
  title = loadImage("assets/title sprites/undertale-title-5.png");
  redHeartImg = loadImage("assets/player sprites/red-heart.png");

  for(let i = 1; i <= 11; i++){
    cutscene.push(loadImage(`assets/title sprites/undertale-title-${i}.png`));
  }

  cutscene.push(loadImage("assets/title sprites/undertale-titlescreen.png"));
}

function playCutscene(){
  if (!onceUponATime.isPlaying() && currentFrame !== 11){
    onceUponATime.play();
  }
    background(0);


    if (currentFrame < 10 || currentFrame > 10){
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

      if (currentFrame >= cutscene.length){
        gameState = "title";
      }
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
}


function drawCutsceneText(txt){
  textFont(determinationFont);
  textSize(27);
  textAlign(LEFT,TOP);

  let xPos = 120;
  let yPos = height - 150;
  let boxWidth = width -260

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

function fight() { //Foo's Function DO NOT TOUCH
  if (choice === 0) {
    // code for options menu
    function keyPressed() {
      if (key === LEFT_ARROW && selection > 0) {
        selection --;
      }
      if (key === RIGHT_ARROW && selection < selections.length) {
        selection ++;
      }
      if (key === " ") {
        choice = selection;
      }
    }
  }

  if (selection === 1 && choice === 1) { // not working
    if (keyIsDown(LEFT_ARROW)) {
      x -= speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      x += speed;
    }
    if (keyIsDown(UP_ARROW)) {
      y -= speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      y += speed;
    }
    // keep player inside the fight border
    x = constrain(x, width/2 - fightBorderSize/2 + fightStrokeWeight , width/2 + fightBorderSize/2 - fightStrokeWeight);
    y = constrain(y, height/2 - fightBorderSize/2 + fightStrokeWeight , height/2 + fightBorderSize/2 - fightStrokeWeight);

    // display fight
    background(0);
    strokeWeight(fightStrokeWeight);
    stroke(255);
    noFill();
    rectMode(CENTER);
    rect(width/2 , height/2 , fightBorderSize, fightBorderSize);


    image(redHeartImg, x - heartSize/2, y - heartSize/2, heartSize, heartSize);
  }

  background(0);
  fill(255);
  text(70);
  text(`selection: ${selection}
    choice ${choice} `, width/2, height/2);
}
