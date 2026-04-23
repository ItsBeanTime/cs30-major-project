// Undertale
// Ben H and Zeyad M
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cutscene;
let title;
let titleNumber = 1;
let gameState = "cutscene";

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
  createCanvas(640, 480); //how does one fullscreen
  x = width/2;
  y = height/2;
}

function draw() {
  
  // playCutscene();
  // startTitle();
  fight();
}

function keyPressed(){
  if (key === "z" && gameState === "cutscene"){
    titleNumber += 1;
  }
  if (titleNumber > 10){
    gameState = "title";
  }
}

function preload() {
  title = loadImage("assets/title sprites/undertale-title-3.png");
  redHeartImg = loadImage("assets/player sprites/red-heart.png");
  if (titleNumber === 1){
    cutscene = loadImage("assets/title sprites/undertale-title-1.png");
  }
  if (titleNumber === 2){
    cutscene = loadImage("assets/title sprites/undertale-title-2.png");
  }
  if (titleNumber === 3){
    cutscene = loadImage("assets/title sprites/undertale-title-3.png");
  }
  if (titleNumber === 4){
    cutscene = loadImage("assets/title sprites/undertale-title-4.png");
  }
  if (titleNumber === 5){
    cutscene = loadImage("assets/title sprites/undertale-title-5.png");
  }
  if (titleNumber === 6){
    cutscene = loadImage("assets/title sprites/undertale-title-6.png");
  }
  if (titleNumber === 7){
    cutscene = loadImage("assets/title sprites/undertale-title-7.png");
  }
  if (titleNumber === 8){
    cutscene = loadImage("assets/title sprites/undertale-title-8.png");
  }
  if (titleNumber === 9){
    cutscene = loadImage("assets/title sprites/undertale-title-9.png");
  }
  if (titleNumber === 10){
    cutscene = loadImage("assets/title sprites/undertale-titlescreen.png");
  }
}

function playCutscene(){
  if (gameState === "cutscene"){
    image(cutscene, 0, 0, 640, 480);
    preload();    
  }
}

function startTitle(){
  if (gameState === "title"){
    image(title, 0, 0, 640, 480);
  }
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
