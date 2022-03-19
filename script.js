// global constants
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence
const countDown = document.getElementById("timer");


//Global Variables
var pattern = [];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5; //must be between 0.0 and 1.0
var guessCounter = 0;
var mistakeCounter = 0;
var clueHoldTime = 1000; //how long to hold each clue's light/sound
var time = 3;
var test = false;

//toggle challenges
var doubleIt = false;
var speedIt = false;
var timeIt = false;


//create instances of JS inbuilt Audio class
let audio1 = new Audio(); 
let audio2 = new Audio();
let audio3 = new Audio();
let audio4 = new Audio();
let audio5 = new Audio();
let audio6 = new Audio();
let audio7 = new Audio();
let audio8 = new Audio();
let audio9 = new Audio();

audio1.src =
  "https://cdn.glitch.global/b151c312-91ad-48ac-acd2-886670b98ba1/Sound1.mp3?v=1647354651420";
audio2.src =
  "https://cdn.glitch.global/b151c312-91ad-48ac-acd2-886670b98ba1/Sound2.mp3?v=1647354661325";
audio3.src =
  "https://cdn.glitch.global/b151c312-91ad-48ac-acd2-886670b98ba1/Sound3.mp3?v=1647354664804";
audio4.src =
  "https://cdn.glitch.global/b151c312-91ad-48ac-acd2-886670b98ba1/Sound4.mp3?v=1647623084279";
audio5.src =
  "https://cdn.glitch.global/b151c312-91ad-48ac-acd2-886670b98ba1/Sound5.mp3?v=1647623084350";
audio6.src =
  "https://cdn.glitch.global/b151c312-91ad-48ac-acd2-886670b98ba1/Sound6.mp3?v=1647623084642";
audio7.src =
  "https://cdn.glitch.global/b151c312-91ad-48ac-acd2-886670b98ba1/Sound7.mp3?v=1647623084370";
audio8.src =
  "https://cdn.glitch.global/b151c312-91ad-48ac-acd2-886670b98ba1/Sound8.mp3?v=1647623084464";

const audioMap = {
  1: audio1,
  2: audio2,
  3: audio3,
  4: audio4,
  5: audio5,
  6: audio6,
  7: audio7,
  8: audio8,
};



//********************************************************** */
function startGame() {
  //initialize game variables
  progress = 0;
  gamePlaying = true;
  clueHoldTime = 1000;
  mistakeCounter = 0;
  // Hide or Show buttons/texts for the game
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  document.getElementById("doubleItButton").classList.add("hidden");
  document.getElementById("speedItButton").classList.add("hidden");
  document.getElementById("timeItButton").classList.add("hidden");
  document.getElementById("livesLeft").classList.remove("hidden");

  //determine which pattern to use
  pattern = [];
  createPattern();
  
  
  if(timeIt){
    time=3;
    countDown.innerHTML = `${time}`;
    document.getElementById("timer").classList.remove("hidden")
  }

  playClueSequence();
}

//Creates a pattern in accordance with the currently toggled challenges.
function createPattern() {
  if (!doubleIt) {
    for (let i = 0; i < 8; i++) {
      pattern.push(Math.floor(Math.random() * 4 + 1));
    }
  } else {
    for (let i = 0; i < 16; i++) {
      pattern.push(Math.floor(Math.random() * 8 + 1));
    }
  }
}

function stopGame() {
  gamePlaying = false;
  // Hide or show buttons/texts for the main menu
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("doubleItButton").classList.remove("hidden");
  document.getElementById("speedItButton").classList.remove("hidden");
  document.getElementById("timeItButton").classList.remove("hidden");
  document.getElementById("livesLeft").classList.add("hidden");
  document.getElementById("Life1").style.display = "inline";
  document.getElementById("timer").classList.add("hidden");
  document.getElementById("Life2").style.display = "inline";
  if(timeIt){

    configureInterval(false);
  }
}

//handle game-overs
function loseGame() {
  stopGame();
  alert("Game Over. You lost.");
}

function winGame() {
  stopGame();
  alert("Game Over. You won!");
}

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}
function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

//configure clues
function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence() {
  guessCounter = 0;

  let delay = nextClueWaitTime; //set delay to initial wait time

  // for each clue that is revealed so far
  for (let i = 0; i <= progress; i++) {
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;

    // speed up the game if the Speed it up challenge is activated
    if (clueHoldTime > 200 && speedIt) {
      clueHoldTime -= 50;
    }
  }
  //wait until clues are played back and then begins countdown 
  if (timeIt) {
    time = 3;
    setTimeout(configureInterval, delay, true);
  }
}



function guess(btn) {
  if (!gamePlaying) {
    return;
  }

  if (pattern[guessCounter] == btn) {
    //Guess was correct!
    if (timeIt) {
      time = 3;
      countDown.innerHTML = `${time}`;
    }

    if (guessCounter == progress) {
      if (progress == pattern.length - 1) {
        //GAME OVER: WIN!
        winGame();
      } else {
        //Pattern correct. Add next segment
        progress++;
        if (timeIt){
          configureInterval(false);
          time = 3;
          countDown.innerHTML = `${time}`;
        }
        playClueSequence();
        
        
      }
    } else {
      //so far so good... check the next guess
      guessCounter++;
    }
  } else {
    //Guess was incorrect
    if (mistakeCounter != 2) {
      loseALife();

    } else loseGame();
  }
}

function loseALife() {
  mistakeCounter++;
  var currentLives = "Life" + mistakeCounter;
  document.getElementById(currentLives).style.display = "none";
}


function configureInterval(turnOn) {
  if (turnOn){
    myInterval = setInterval(turnOnCountdown, 1000);
  }
  else {
    
    clearInterval(myInterval);
  }
}

//if i hit stop while the timer is going, It continues.

//timer configuration
function turnOnCountdown() {
  
  //creates a timer and updates the html element showing this timer.
  countDown.innerHTML = `${time}`;
  time--;
  
  //user loses a life and timer is reset
  if(time == -1) {
    if (mistakeCounter != 2){
      time=3;  
      loseALife();
    } else {
      document.getElementById("timer").classList.toggle('hidden');
      configureInterval(false);
      if(gamePlaying){
        loseGame();
      }
    }
  }
}



//configure optional challenges
function toggleChallenge(challenge) {
  let visual = document.getElementById("timeItUp").className;
  let counter = document.getElementById("timer").className;

  if (challenge == "doubleItUp") {
    document.getElementById("button5").classList.toggle("hidden");
    document.getElementById("button6").classList.toggle("hidden");
    document.getElementById("button7").classList.toggle("hidden");
    document.getElementById("button8").classList.toggle("hidden");
    doubleIt = !doubleIt;
  }
  if (challenge == "speedItUp") {
    speedIt = !speedIt;
  }
  if (challenge == "timeItUp") {
    
    time = 3;

    document.getElementById("timer").classList.toggle("hidden");
    timeIt = !timeIt
    
    

    //Catches an error. Needs refactoring for cleaner logic.
    if(!timeIt && counter == "hidden" && visual != "hidden"){
      document.getElementById("timer").classList.add("hidden");
      configureInterval(false);
    }
  }

  //hides or shows challenge message on the screen
  document.getElementById(challenge).classList.toggle("hidden");
}


// sound settings for the game butttons
function playTone(btn, len) {
  tonePlaying = true;
  startSound(btn);

  setTimeout(function () {
    stopSound(btn);
  }, len);
  tonePlaying = false;
}

function startTone(btn) {
  if (!tonePlaying) {
    tonePlaying = true;
    startSound(btn);
  } 
  
}
function stopTone(btn) {
  tonePlaying = false;
  stopSound(btn);
}

function startSound(btn) {
  var buttonToPlay = audioMap[btn];
  buttonToPlay.play();
}

function stopSound(btn) {
  var buttonToPause = audioMap[btn];

  buttonToPause.pause();
  buttonToPause.currentTime = 0;
}