// Project Title

//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
}

function preload() {
  redHeartImg = loadImage("red-heart.png");
}

function fight(fightBorderSize, heartSize, x, y, speed) { //Foo's Function DO NOT TOUCH
  fightBorderSize = 400;
  heartSize = 30;
  x = width/2;
  y = height/2;
  speed = 5;

  x = constrain(x, width/2 - fightBorderSize/2, width/2 + fightBorderSize/2);
  y = constrain(y, height/2 - fightBorderSize/2, height/2 + fightBorderSize/2);

  function draw() {
    background(0);
    strokeWeight(20);
    stroke(255);
    noFill();
    rect(width/2 - fightBorderSize/2, height/2 - fightBorderSize/2, fightBorderSize, fightBorderSize);
    
    image(redHeartImg, x - heartSize/2, y - heartSize/2, heartSize, heartSize);
  }
}