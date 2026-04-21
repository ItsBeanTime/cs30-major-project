// Undertale
// Ben H and Zeyad M
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cutscene;
let title;
let titleNumber = 1;
let gameState = "cutscene";

function setup() {
  createCanvas(640, 480);
}

function draw() {
  background(0);
  playCutscene();
  startTitle();
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
  // redHeartImg = loadImage("red-heart.png");
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

// What is you doing bruh 

// function fight(fightBorderSize, heartSize, x, y, speed) { //Foo's Function DO NOT TOUCH
//   fightBorderSize = 400;
//   heartSize = 30;
//   x = width/2;
//   y = height/2;
//   speed = 5;

//   x = constrain(x, width/2 - fightBorderSize/2, width/2 + fightBorderSize/2);
//   y = constrain(y, height/2 - fightBorderSize/2, height/2 + fightBorderSize/2);

//   function draw() {
//     background(0);
//     strokeWeight(20);
//     stroke(255);
//     noFill();
//     rect(width/2 - fightBorderSize/2, height/2 - fightBorderSize/2, fightBorderSize, fightBorderSize);
    
//     image(redHeartImg, x - heartSize/2, y - heartSize/2, heartSize, heartSize);
//   }
// }