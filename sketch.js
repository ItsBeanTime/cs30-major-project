// Undertale
// Ben H and Zeyad M
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//GAMESTATE
let gameState ="ruins";  //"start";
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
let yourBestFriend

//SFX
let undertaleBoom;
let textSound;
let musCymbal;
let floweyTalk;

//FONTS
let determinationFont;

//NPC Sprites
let floweySprites = [];
let floweyIdleSprites = [];
let floweyPortSprites = [];
let floweyFrame = 0;
let floweyAnimTimer = 0;
let floweyMet = false;
let floweyGone = false;

//dialogue system
let dialogue = {
  active: false,
  lines: [],
  lineIndex:0,
  charIndex:0,
  text:"",
  textSpeed:3,
  done:false,
  portraitSprites:[],
  portraitFrame:0,
  portraitTimer:0,
  portraitDelay: 15,
  onFinish: null
};

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
let fightBorderWidth = 25;
let fightBorderHeight = 520;
let heartSize = 20;
let speed = 5;
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
let playersName = " ";
let playerLevel = 1;
let levelThresh = 10;
let playerNextLevel = 10;
let playerCurHealth = 20;
let playerHealthMax = 20;
let playerGuap = 0;
let playerAttackStat = 0;
let playerAttackModify = 0;
let playerDefenseStat = 0;
let playerDefenseModify = 0;
let playerExp = 2700;
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

let cameraZones = [];
let activeCameraZone = null;

let covers = [];

let fadeScreen = 0;
let fadeDirection = 0;
let fadeSpeed = 8;
let onFadeDone = null;

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
  setupCameraZones();
  setupCovers();
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

  //npc sprites
  floweyPortSprites.push(loadImage("assets/npc overworld sprites/floweybattle1.png"));
  floweyPortSprites.push(loadImage("assets/npc overworld sprites/floweybattle2.png")); 
  floweyIdleSprites.push(loadImage("assets/npc overworld sprites/floweyow1.png"));
  floweyIdleSprites.push(loadImage("assets/npc overworld sprites/floweyow2.png"));

  //music
  onceUponATime = loadSound("assets/music/Once Upon A Time.mp3");
  startMenuTheme = loadSound("assets/music/Start Menu.mp3");
  ruinsMusic = loadSound("assets/music/Ruins.mp3");
  yourBestFriend = loadSound("assets/music/your best friend.mp3");

  //sfx
  undertaleBoom = loadSound("assets/sound effects/undertale.mp3");
  textSound = loadSound("assets/sound effects/SND_TXT2.wav");
  musCymbal = loadSound("assets/sound effects/mus-cymbal.mp3");
  floweyTalk = loadSound("assets/sound effects/flowey-normal-voice.mp3");

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

  if (dialogue.active && (keyCode === 90 || keyCode === ENTER)){
    if (!dialogue.done){
      dialogue.charIndex = dialogue.lines[dialogue.lineIndex].length;
      dialogue.text = dialogue.lines[dialogue.lineIndex];
      dialogue.done = true;
    }
    else{
      dialogue.lineIndex++;
      if (dialogue.lineIndex >= dialogue.lines.length){
        dialogue.active = false;
        if (dialogue.onFinish){
          dialogue.onFinish();
        }
      }
      else{
        dialogue.charIndex = 0;
        dialogue.text = "";
        dialogue.done = false;
      }
    }
    return;
  }


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

function mouseWheel(event){
  speed = constrain(speed - event.delta * 0.01, 1, 30);
}

//SETUP FUNCTIONS//
function setupSound(){
  userStartAudio();
  yourBestFriend.setLoop(true);
  ruinsMusic.setLoop(true);
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

    //ruins first puzzel room
    makeWall(492,721,88,100),
    makeWall(490, 750, 30, 90),
    makeWall(490, 765,10, 161),
    makeWall(620,721,541,100),

    //ruins hall with water
    makeWall(491, 508, 9, 221),
    makeWall(489, 512, 671, 68),
    makeWall(1160, 512, 78, 128),
    makeWall(1160, 682, 99, 51),
    makeWall(700, 681, 40, 55),
    makeWall(700, 563, 40, 77),
    makeWall(940, 682, 40, 64),
    makeWall(940, 562, 40, 78),

    //ruins dummy room
    makeWall(1250, 701, 29, 41),
    makeWall(1270,721,179, 20),
    makeWall(1440, 702, 36, 29),
    makeWall(1459, 682, 37, 37),
    makeWall(1230, 552, 29, 68),
    makeWall(1250, 532, 29, 69),
    makeWall(1270, 512, 68, 69),
    makeWall(1380, 511, 61, 70),
    makeWall(1440, 512, 47, 89),
    makeWall(1459, 601, 33, 20),
    makeWall(1479, 620, 10, 63),

    //random room above dummy room
    makeWall(1231, 461, 107, 53),
    makeWall(1379, 461, 221, 60),
    makeWall(1600, 421, 78, 50),
    makeWall(1671, 461, 240, 10),
    makeWall(1900, 442, 79, 21),
    makeWall(1230, 273, 370, 68),
    makeWall(1600, 341, 120, 40),
    makeWall(1720, 381, 140, 39),
    makeWall(1859, 341, 121, 60),
    makeWall(1229,339,9,136),

    //spikey room
    makeWall(1980, 441, 369, 28),
    makeWall(1980, 280, 41, 121),
    makeWall(2021, 280, 399, 81),
    makeWall(2300, 403, 40, 39),

    //hallway run room
    makeWall(2340, 285, 81, 75),
    makeWall(2338, 402, 82, 68),
    makeWall(2410, 441, 1301, 20),
    makeWall(2419, 280, 1292, 60),
    makeWall(3711, 300, 99, 61),
    makeWall(3712, 401, 98, 294),

    //room with 1 npc froggit and a save
    makeWall(3804, 221, 85, 120),
    makeWall(3930, 221, 96, 120),
    makeWall(4010, 272, 10, 329),
    makeWall(3800, 681, 225, 17),
    makeWall(4010, 642, 80, 49),
    makeWall(4011, 531, 393, 70),
    makeWall(4081, 661, 260, 22),
    makeWall(4330,641, 74, 93),

    //candy room
    makeWall(3821,27, 50, 204),
    makeWall(3950, 33, 48, 197),
    makeWall(3865,30,94,70),

    //first room with push rock
    makeWall(4394, 702, 396, 14),
    makeWall(4399, 513, 386, 68),
    makeWall(4784, 641, 279, 188),
    makeWall(4785, 540, 406, 61),

    //fall down room
    makeWall(5185, 569, 184, 112),
    makeWall(5054, 801, 318, 17),
    makeWall(5364, 761, 117, 74),
    makeWall(5364, 669, 117,52),

    //push rock room 2
    makeWall(5472, 821, 425, 9),
    makeWall(5478, 612, 410, 69),
    makeWall(5882, 761, 158, 75),
    makeWall(5883, 643, 456, 78),
    makeWall(6032, 801, 184, 26),
    makeWall(5782, 782, 38, 57),
    makeWall(5782, 674, 40, 47),

    //cheese and ghost room
    makeWall(6200, 761, 139, 65),
    makeWall(6328, 801, 221, 16),
    makeWall(6419, 761, 41, 56),
    makeWall(6420, 633, 39, 87),
    makeWall(6330, 540, 148, 141),
    makeWall(6519, 541, 37, 140),
    makeWall(6540, 761, 138, 58),
    makeWall(6540, 630, 138, 98),

    //web room
    makeWall(6675, 617, 174, 84),
    makeWall(6666, 781, 196, 17),
    makeWall(6838, 628, 21, 178),

    //ruins area 1 final room
    makeWall(6520, 541, 440, 24),
    makeWall(6420, 328, 19, 238),
    makeWall(6435, 325, 530, 96),
    makeWall(6939, 502, 43, 53),
    makeWall(6940, 367, 43, 94),

    //falling room 1
    makeWall(4090, 760, 25, 61),
    makeWall(4147, 761, 128, 60),
    makeWall(4307, 766, 27, 55),
    makeWall(4082, 789, 9, 148),
    makeWall(4076, 922, 273, 10),
    makeWall(4336, 768, 17, 158),

    //falling room 2
    makeWall(4868, 916, 115, 70),
    makeWall(4868, 982, 10, 58),
    makeWall(4863, 1026, 215, 175),
    makeWall(5015, 918, 193, 69),
    makeWall(5199, 984, 204, 82),
    makeWall(5068, 1187, 325, 18),
    makeWall(5380, 1015, 21, 175),



    //other walls
    //ruins start room
    makeWallM(54, 5128, 30, 700),
    makeWallM(84, 5450 + 80, 60, 500),
    makeWallM(84 + 60, 5450 + 140, 60, 500),
    makeWallM(204, 5560 + 90, 60, 500),
    makeWallM(84, 5164, 120, 75),
    makeWallM(204, 5088, 600, 85),
    makeWallM(264, 5715, 450, 100),
    makeWallM(686,5624 + 30, 70, 80,),
    makeWallM(749, 5508 + 86,1300,80,),
    makeWallM(749,5157,200,80,),
    makeWallM(870,5165,950,310,),
    makeWallM(2008,5165,500,600,),
    makeWallM(1947,5165,60,310,),

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


    
  ];
}

function setupTriggers(){
  triggers = [

    //flowey interact
    {
      x:1480, y:5000, w:2250 - 1480, h:5120 - 4926, onWalk: true,
      action: () => {
        if (!floweyMet){
          floweyMet = true;
          yourBestFriend.play();
          startDialogue(
            [
              " * Howdy!                           * I'm FLOWEY.                               * FLOWEY the FLOWER!",
              " * Hmmm...",
              " * You're new to the UNDERGROUND, aren'tcha?",
              " * Golly, you must be so confused.",
              " * Someone ought to teach you how things work around here!",
              " * I guess little old me will have to do.",
              " * Ready? Here we go!",
            ],
            floweyPortSprites,
            () => {
              floweyGone = true;
              yourBestFriend.stop();
            }
          );
        }
      }
    },

    //door 1 flowey room ent
    {
      x:1825,y:5360,w:120,h:100,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(0, -230);
          setCover("floweyRoom", false);
          setCover("startRoom", true);          
        });
      }
    },
    {
      x:1825, y:5260, w: 120, h: 100,
      onWalk: true,
      action: () => {
        triggerFade(() =>{
          teleportPlayer(0, 220);
          setCover("floweyRoom", true);
          setCover("startRoom", false);
        });
      }
    },

    //door 2 flowey ext
    {
      x:1790,y:4490,w:150,h:100,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          if (!ruinsMusic.isPlaying()){
            ruinsMusic.play();
          }
          teleportPlayer(0, -420);        
        });
      }
    },
    {
      x:1790,y:4300,w:150,h:100,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(0, 360);       
        });
      }
    },

    //door 3 save room 1
    {
      x:1836,y:3132,w:80,h:100,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(0, -350);    
        });
      }
    },
    {
      x:1810,y:2920,w:150,h:20,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(0, 350);        
        });
      }
    },
    //door 4 bridge room 1
    {
      x:1750,y:2425,w:140,h:30,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(0, -340);       
        });
      }
    },
    {
      x:1750,y:2185,w:140,h:30,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(0, 340);     
        });
      }
    },

    //door 5 
    {
      x:4043,y:1690,w:140,h:30,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(0, -300);      
        });
      }
    },
    {
      x:4043,y:1490,w:140,h:30,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(0, 350);       
        });
      }
    },

    //door 6 candy door
    {
      x:11760,y:980,w:140,h:30,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(0, -350);        
        });
      }
    },
    {
      x:11760,y:752,w:140,h:30,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(0, 350);        
        });
      }
    },
    {
      x:19590,y:1991,w:140,h:30,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(0, -350);      
        });
      }
    },

    {
      x:19590,y:1730,w:140,h:30,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(0, 350);        
        });
      }
    },
    //hallway
    //hallway 1 puzzel
    {
      x:3560,y:1888,w:30,h:140,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(200, 0);        
        });
      }
    },

    {
      x:3651,y:1888,w:30,h:140,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(-200, 0);     
        });
      }
    },

    //hallway 2 spikey
    {
      x:7108,y:1074,w:30,h:140,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(230, 0);        
        });
      }
    },
    {
      x:7231,y:1074,w:30,h:140,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(-230, 0);        
        });
      }
    },

    //hallway 3 longggg hall
    {
      x:11250,y:1074,w:30,h:140,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(270, 0);        
        });
      }
    },
    {
      x:11420,y:1074,w:30,h:140,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(-260, 0);       
        });
      }
    },

    //hallway 4
    {
      x:13129,y:1768,w:30,h:200,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(230, 0);         
        });
      }
    },
       {
      x:13250,y:1768,w:30,h:200,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(-240, 0);         
        });
      }
    },
    
    //hallway 5 rock room 1
    {
      x:14500,y:1768,w:30,h:200,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(200, 0);        
        });
      }
    },
    {
      x:14611,y:1768,w:30,h:200,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(-200, 0);        
        });
      }
    },
    
    //hallway 6 fall hallway
    {
      x:16250,y:2145,w:30,h:200,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(250, 0);        
        });
      }
    },
    {
      x:16371,y:2145,w:30,h:200,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(-220, 0);       
        });
      }
    },

    //hallway 7 3 rocks
    {
      x:17940,y:2145,w:30,h:200,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(300, 0);       
        });
      }
    },
    {
      x:18022,y:2145,w:30,h:200,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(-200, 0);        
        });
      }
    },

    //hallway 8 cheese
    {
      x:18920,y:2150,w:30,h:200,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(200, 0);      
        });
      }
    },
    {
      x:19000,y:2150,w:30,h:200,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(-300, 0);       
        });
      }
    },

    //hallway 9 ghost
    {
      x:19920,y:2150,w:30,h:200,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(200, 0);       
        });
      }
    },
    {
      x:20038,y:2150,w:30,h:200,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(-250, 0);        
        });
      }
    },

    //hall 10 hoing into candy
    {
      x:12186,y:1762,w:30,h:200,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(200, 0);       
        });
      }
    },
    {
      x:12233,y:1762,w:30,h:200,
      onWalk: true,
      action: () => {
        triggerFade(() => {
          teleportPlayer(-200, 0);       
        });
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

function setupCameraZones(){
  cameraZones = [
    //flowey room
    {
      x: 1453, y: 4350, w: 877, h: 950,
      camX: 1876, camY: 5300, lockedX: true, lockedY:false
    },

    //start room
    {
      x: 40, y:5000, w: 2000, h:800, camX:435,camY:5400, lockedX:false, lockedY:true
    },

    // first save room
    {
      x: 1417, y:2945, w: 2281 - 1417, h: 4298 - 2945, 
      camX:1879, camY:3587, lockedX:true, lockedY: false,
    },

    //switch room
    {
      x:1417, y:2217, w:2281 - 1417, h:2946 - 2217, camX:1887, camY:2582, lockedX:true, lockedY: true
    },

    //switches hall
    {
      x:1399, y:1482, w:3541 - 1320, h:2220 - 1482, camX:2200, camY:1849, lockedX:false, lockedY:true
    },

    //dummy room
    {
      x: 3591, y:1463, w:4542 - 3591, h:2246 - 1463, camX:4139, camY:1864, lockedX:true, lockedY:true
    },

    //spikey room
    {
      x:3630, y:754, w:7133 - 3590, h:1474 - 754, camX:5685, camY:1140, lockedX:false, lockedY:true
    },

    //really long hall
    {
      x:7168, y:716, w:11342 - 7168, h:1379 - 716, camX:9521, camY:1136, lockedX:false, lockedY:true
    },

    //going into candy room
    {
      x:11430, y:790, w: 12260 - 11490, h:2116 - 790, camX:11830, camY:1180, lockedX:true, lockedY:false
    },

    //candy room
    {
      x:11484, y:0, w:12138 - 11484, h:782, camX:11823, camY:395, lockedX:true, lockedY:true
    },

    //falling room
    {
      x:12222, y:1505, w: 13163 - 12222, h:2110 - 1505, camX:12721, camY:1815, lockedX:true, lockedY: true
    },

    //rock room 1
    {
      x:13176, y:1420, w:14563 - 13176, h:2189 - 1420, camX:13904, camY:1860, lockedX:false, lockedY:true
    },

    //fall room 2
    {
      x:14600, y:1474, w:16315 - 14600, h:2518 - 1474, camX:15580, camY:2059, lockedX:false, lockedY:false
    },

    //3 rocks
    {
      x:16349, y:1735, w:17993 - 16349, h:2566 - 1735, camX:17224, camY:2174, lockedX:false, lockedY:true
    },

    //cheese
    {
      x:17998, y:1846, w:18972 - 17998, h:2535 - 1846, camX:18513, camY:2182, lockedX:true, lockedY:true
    },

    //ghost room
    {
      x:18984, y:1797, w: 19948 - 18984, h:2505 - 1797, camX:19482, camY:2172,lockedX:true, lockedY:true
    },

    //spider web room
    {
      x:19955, y:1830, w:20813 - 19955, h:2473 - 1830, camX:20450, camY:2126, lockedX:true, lockedY:true
    },

    //ruins 1 last room
    {
      x:19382, y:828, w:21137 - 19400, h:1769 - 828, camX:20286, camY:1355, lockedX:false, lockedY:true
    },
  ]
}

function setupCovers(){
  covers = [

    { id: "floweyRoom", x: 1480, y:4570, w: 877, h: 650, visible:true},
    { id: "startRoom", x: 1480, y: 5200, w: 1500, h: 1100, visible:false},
  ]
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

function triggerFade(onDone){
  fadeDirection = 1;
  onFadeDone = onDone;
}

function setCover(id, visible){
  for(let cover of covers){
    if (cover.id === id){
      cover.visible = visible;
    }
  }
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
  playerLevelIncrease();
  background(0);
  image(ruinsMap, screenPosX, screenPosY, width * (mapSize + 10), height * (mapSize -4));

  drawFloweyWorld();
  noStroke();
  fill(0)
  for (let cover of covers){
    if(cover.visible){
      rect(cover.x + screenPosX, cover.y + screenPosY, cover.w, cover.h)
    }
  }
  noFill();
  stroke(255,0,0);
  strokeWeight(2);
  noStroke();
  for (let wall of walls){
    rect(wall.x + screenPosX, wall.y + screenPosY, wall.w, wall.h);
  }

  stroke(180, 0, 255);
  noStroke(); // hide hitbox
  for (let trigger of triggers){
    rect(trigger.x + screenPosX, trigger.y + screenPosY, trigger.w, trigger.h);
  }

  stroke(0, 255, 255);
  noStroke();
  for(let zone of cameraZones){
    rect(zone.x + screenPosX, zone.y + screenPosY, zone.w, zone.h);
  }
  



  stroke(0, 255, 0);
  strokeWeight(2);
  noFill();
  noStroke();
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



  pauseScreen();
  if (pauseState === "no"){
    playerMove();
    displayPlayer();
  }
  updateDialogue();

  if (fadeDirection !== 0 || fadeScreen > 0){
    noStroke();
    fill(0, fadeScreen);
    rect(0, 0, width, height);

    fadeScreen += fadeDirection * fadeSpeed;

    if (fadeScreen >= 255){
      fadeScreen = 255;
      if (onFadeDone){
        onFadeDone();
        onFadeDone = null;
      }
      fadeDirection = -1;
    }
    if (fadeScreen <= 0){
      fadeScreen = 0;
      fadeDirection = 0;
    }
  }
}

function playerMove(){
  if (dialogue.active){
    return;
  }
  if (fadeDirection === 1){
    return;

  }
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

  if (keyIsDown(68)){ 
    newMapX += speed;
    currentSprites = playerSpriteRight;
    newDirection = "right";
    moving = true;
  }
  if (keyIsDown(65)){
    newMapX -= speed;
    currentSprites = playerSpriteLeft;
    newDirection = "left";
    moving = true;
  }

  if (!collidesWithWall(newMapX, mapPlayerY)){
    mapPlayerX = newMapX;
  }
  if (!collidesWithWall(mapPlayerX, newMapY)){
    mapPlayerY = newMapY;
  }

  activeCameraZone = null;
  for(let zone of cameraZones){
    if (mapPlayerX > zone.x &&
       mapPlayerX < zone.x + zone.w
       && mapPlayerY > zone.y &&
        mapPlayerY < zone.y + zone.h)
      {
      activeCameraZone = zone;
      break;
    }
  }

  if (activeCameraZone){
    if (activeCameraZone.lockedX){
      screenPosX = width / 2 - activeCameraZone.camX;
    }
    else{
      let zoneLeftScroll = -(activeCameraZone.x);
      let zoneRightScroll = -(activeCameraZone.x + activeCameraZone.w - width);
      screenPosX = constrain(width / 2 - mapPlayerX, zoneRightScroll, zoneLeftScroll);
    }

    if (activeCameraZone.lockedY){
      screenPosY = height / 2 - activeCameraZone.camY;
    }
    else{
      let zoneTopScroll = -(activeCameraZone.y);
      let zoneBottomScroll = -(activeCameraZone.y + activeCameraZone.h - height)
      screenPosY = constrain(height / 2 - mapPlayerY, zoneBottomScroll, zoneTopScroll);
    }
  }
  else{
    screenPosX = constrain(width / 2 - mapPlayerX, minScrollX, maxScrollX);
    screenPosY = constrain(height / 2 - mapPlayerY, minScrollY, maxScrollY);
  }

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

  let destZone = null;
  for (let zone of cameraZones){
    if (mapPlayerX > zone.x &&
       mapPlayerX < zone.x + zone.w &&
       mapPlayerY > zone.y && mapPlayerY < zone.y + zone.h
    ){
      destZone = zone;
      break;
    }
  }

  if (destZone){
     if (destZone.lockedX) {
      screenPosX = width / 2 - destZone.camX;
      }
      else {
        let zoneLeftScroll = -(destZone.x);
        let zoneRightScroll = -(destZone.x + destZone.w - width);
        screenPosX = constrain(width / 2 - mapPlayerX, zoneRightScroll, zoneLeftScroll);
      }
      if (destZone.lockedY) {
        screenPosY = height / 2 - destZone.camY;
      } 
      else {
        let zoneTopScroll = -(destZone.y);
        let zoneBottomScroll = -(destZone.y + destZone.h - height);
        screenPosY = constrain(height / 2 - mapPlayerY, zoneBottomScroll, zoneTopScroll);
      }
  }
  else{
    screenPosX = constrain(width / 2 -mapPlayerX, -(mapW - width),0);
    screenPosY = constrain(height / 2 -mapPlayerY, -(mapH - height),0);
  }
 
  playerX = mapPlayerX + screenPosX;
  playerY = mapPlayerY + screenPosY;
}

function startDialogue(lines, portraits, onFinish = null){
  dialogue.active = true;
  dialogue.lines = lines;
  dialogue.portraitSprites = portraits;
  dialogue.lineIndex = 0;
  dialogue.charIndex = 0;
  dialogue.text = "";
  dialogue.done = false;
  dialogue.portraitFrame = 0;
  dialogue.onFinish = onFinish;
}

function updateDialogue(){
  if (!dialogue.active){
    return;
  }

  if (!dialogue.done){
    dialogue.portraitTimer++;
    if (dialogue.portraitTimer > dialogue.portraitDelay){
      dialogue.portraitTimer = 0;
      dialogue.portraitFrame = (dialogue.portraitFrame + 1) % dialogue.portraitSprites.length;
    }

    if (frameCount % dialogue.textSpeed === 0){
      let line = dialogue.lines[dialogue.lineIndex];
      if (dialogue.charIndex < line.length) {
        dialogue.charIndex++;
        dialogue.text = line.substring(0, dialogue.charIndex);
        let sound;
        if (floweyMet){
          sound = floweyTalk;
        }
        else{
          sound = textSound;
        }
        let ch = line.charAt(dialogue.charIndex - 1);
        if (ch !== " " && ch !== "\n" && textSound.isLoaded()) {
          sound.stop();
          sound.play();
        }
      }
      else{
        dialogue.done = true;
      }
    }
  }
  drawDialogueBox();
}

function drawDialogueBox(){
  let boxX = 40;
  let boxY = 30;
  let boxW = width - 80;
  let boxH = 180;

  let portraitSize = 150;

  fill(0);
  stroke(255);
  strokeWeight(5);
  rect(boxX, boxY, boxW, boxH);

  let portrait = dialogue.portraitSprites[dialogue.portraitFrame];
  if (portrait) {
    image(portrait, boxX + 15, boxY + 15, portraitSize, portraitSize);
  }

  noStroke();
  fill(255);
  textFont(determinationFont);
  textSize(32);
  textAlign(LEFT, TOP);
  text(dialogue.text, boxX + portraitSize + 30, boxY + 20, boxW - portraitSize - 50, boxH - 30);
}

function drawFloweyWorld(){
  if (floweyGone){
    return;
  }
  let floweyX = 1845 + screenPosX;
  let floweyY = 4970 + screenPosY;

  let img = floweyIdleSprites[floweyFrame];

  if (img){
    image(img, floweyX, floweyY, 50 * 1.5, 50 * 1.5);
  }

  if (dialogue.active && !dialogue.done){
    if (frameCount % 15 === 0){
      floweyFrame = (floweyFrame + 1) % 2;
    }
  }
  else{
    floweyFrame = 0;
  }
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

function playerLevelIncrease(){
  //https://www.reddit.com/r/Underminers/comments/3u5z71/undertale_lvexpatdf_table/
  playerNextLevel = levelThresh - playerExp;
  if (playerExp >= levelThresh){
    playerLevel = 2;
    levelThresh = 30;
    playerHealthMax += 4;
    playerCurHealth += 4;
    playerAttackStat += 2;
  }
  if (playerExp >= levelThresh){
    playerLevel = 3;
    levelThresh = 70;
    playerHealthMax += 4;
    playerCurHealth += 4;
    playerAttackStat += 2;
  }
  if (playerExp >= levelThresh){
    playerLevel = 4;
    levelThresh = 120;
    playerHealthMax += 4;
    playerCurHealth += 4;
    playerAttackStat += 2;
  }
  if (playerExp >= levelThresh){
    playerLevel = 5;
    levelThresh = 200;
    playerHealthMax += 4;
    playerCurHealth += 4;
    playerAttackStat += 2;
    playerDefenseStat += 1;
  }
  if (playerExp >= levelThresh){
    playerLevel = 6;
    levelThresh = 300;
    playerHealthMax += 4;
    playerCurHealth += 4;
    playerAttackStat += 2;
  }
  if (playerExp >= levelThresh){
    playerLevel = 7;
    levelThresh = 500;
    playerHealthMax += 4;
    playerCurHealth += 4;
    playerAttackStat += 2;
  }
  if (playerExp >= levelThresh){
    playerLevel = 8;
    levelThresh = 800;
    playerHealthMax += 4;
    playerCurHealth += 4;
    playerAttackStat += 2;
  }
  if (playerExp >= levelThresh){
    playerLevel = 9;
    levelThresh = 1200;
    playerHealthMax += 4;
    playerCurHealth += 4;
    playerAttackStat += 2;
    playerDefenseStat += 1;
  }
  if (playerExp >= levelThresh){
    playerLevel = 10;
    levelThresh = 1700;
    playerHealthMax += 4;
    playerCurHealth += 4;
    playerAttackStat += 2;
  }
  if (playerExp >= levelThresh){
    playerLevel = 11;
    levelThresh = 2500;
    playerHealthMax += 4;
    playerCurHealth += 4;
    playerAttackStat += 2;
  }
  if (playerExp >= levelThresh){
    playerLevel = 12;
    levelThresh = 3500;
    playerHealthMax += 4;
    playerCurHealth += 4;
    playerAttackStat += 2;
  }
  if (playerExp >= levelThresh){
    playerLevel = 13;
    levelThresh = 5000;
    playerHealthMax += 4;
    playerCurHealth += 4;
    playerAttackStat += 2;
    playerDefenseStat += 1;
  }
  if (playerExp >= levelThresh){
    playerLevel = 14;
    levelThresh = 7000;
    playerHealthMax += 4;
    playerCurHealth += 4;
    playerAttackStat += 2;
  }
  if (playerExp >= levelThresh){
    playerLevel = 15;
    levelThresh = 10000;
    playerHealthMax += 4;
    playerCurHealth += 4;
    playerAttackStat += 2;
  }
  if (playerExp >= levelThresh){
    playerLevel = 16;
    levelThresh = 15000;
    playerHealthMax += 4;
    playerCurHealth += 4;
    playerAttackStat += 2;
  }
  if (playerExp >= levelThresh){
    playerLevel = 17;
    levelThresh = 25000;
    playerHealthMax += 4;
    playerCurHealth += 4;
    playerAttackStat += 2;
    playerDefenseStat += 1;
  }
  if (playerExp >= levelThresh){
    playerLevel = 18;
    levelThresh = 50000;
    playerHealthMax += 4;
    playerCurHealth += 4;
    playerAttackStat += 2;
  }
  if (playerExp >= levelThresh){
    playerLevel = 19;
    levelThresh = 99999;
    playerHealthMax += 4;
    playerCurHealth += 4;
    playerAttackStat += 2;
  }
  if (playerExp >= levelThresh){
    playerLevel = 20;
    playerHealthMax += 7;
    playerCurHealth += 7;
    playerAttackStat += 2;
  }
}

function weaponStats(){
  if (playerWeaponEquip === "Stick"){
    playerAttackModify = 0;
    //single hit
  }
  if (playerWeaponEquip === "Toy Knife"){
    playerAttackModify = 3;
    //single hit
  }
  if (playerArmorEquip === "Tough Glove"){
    playerAttackModify = 5;
    //single hit then mash
  }
  if (playerArmorEquip === "Ballet Shoes"){
    playerAttackModify = 7;
    //3 hits
  }
  if (playerArmorEquip === "Torn Notebook"){
    playerAttackModify = 2;
    //increases inv by 6 | 2 hits
  }
  if (playerArmorEquip === "Burnt Pan"){
    playerAttackModify = 10;
    //items heal 4 more hp | 4 hits
  }
  if (playerArmorEquip === "Empty Gun"){
    playerAttackModify = 12;
    //4 hits very fast
  }
  if (playerArmorEquip === "Worn Dagger"){
    playerAttackModify = 15;
    //single hit
  }
  if (playerArmorEquip === "Real Knife"){
    playerAttackModify = 99;
    //single hit
  }
}

function armorStats(){
  if (playerArmorEquip === "Bandage"){
    playerDefenseModify = 0;
  }
  if (playerArmorEquip === "Faded Ribbon"){
    playerDefenseModify = 3;
  }
  if (playerArmorEquip === "Manly Bandanna"){
    playerDefenseModify = 7;
  }
  if (playerArmorEquip === "Old Tutu"){
    playerDefenseModify = 10;
  }
  if (playerArmorEquip === "Cloudy Glasses"){
    playerDefenseModify = 5;
    //increases inv by 9
  }
  if (playerArmorEquip === "Temmie Armor"){
    playerDefenseModify = 20;
    //raises attack when worn, recover hp every other turn, inv slightly increase
  }
  if (playerArmorEquip === "Stained Apron"){
    playerDefenseModify = 11;
    //heals 1 hp every other turn
  }
  if (playerArmorEquip === "Cowboy Hat"){
    playerDefenseModify = 12;
    //increases attack by 5
  }
  if (playerArmorEquip === "Heart Locket"){
    playerDefenseModify = 15;
  }
  if (playerArmorEquip === "The Locket"){
    playerDefenseModify = 99;
  }
  if (playerArmorEquip === "God Armor"){
    playerDefenseModify = 1000;
  }
}

function itemStats(){
  
}

