//definitions
let audio1 = new Audio(); //create new instance of built in JS audio class
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

function testing(btn) {
  var buttonToPlay = audioMap[btn];
  buttonToPlay.play();
  console.log(
    "currently playign button" + btn + "the audio location is " + buttonToPlay
  );
}

function testing2(btn) {
  var buttonToPause = audioMap[btn];

  buttonToPause.pause();
  buttonToPause.currentTime = 0;
}

//********************************************************** */
// global constants
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

//Global Variables
var pattern = [];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5; //must be between 0.0 and 1.0
var guessCounter = 0;
var mistakeCounter = 0;
var clueHoldTime = 1000; //how long to hold each clue's light/sound

//toggle challenges
var doubleIt = false;
var speedIt = false;

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
  document.getElementById("livesLeft").classList.remove("hidden");

  //determine which pattern to use
  pattern = [];
  createPattern();

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
  document.getElementById("livesLeft").classList.add("hidden");
  document.getElementById("Life1").style.display = "inline";
  document.getElementById("Life2").style.display = "inline";
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

  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;

    // speed up the game if the Speed it up challenge is activated
    if (clueHoldTime > 200 && speedIt) {
      clueHoldTime -= 50;
      console.log("current delay is is" + delay);
    }
  }
}

function guess(btn) {
  if (!gamePlaying) {
    return;
  }

  if (pattern[guessCounter] == btn) {
    //Guess was correct!
    if (guessCounter == progress) {
      if (progress == pattern.length - 1) {
        //GAME OVER: WIN!
        winGame();
      } else {
        //Pattern correct. Add next segment
        progress++;
        playClueSequence();
      }
    } else {
      //so far so good... check the next guess
      guessCounter++;
    }
  } else {
    //Guess was incorrect
    if (mistakeCounter != 2) {
      mistakeCounter++;
      var currentLives = "Life" + mistakeCounter;

      document.getElementById(currentLives).style.display = "none";
    } else loseGame();
  }
}

//configure optional challenges
function toggleChallenge(challenge) {
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

  //hides or shows challenge message on the screen
  document.getElementById(challenge).classList.toggle("hidden");
}

// sound settings for the game butttons
function playTone(btn, len) {
  tonePlaying = true;
  testing(btn);

  setTimeout(function () {
    testing2(btn);
  }, len);
}

function startTone(btn) {
  if (!tonePlaying) {
    // context.resume();
    // o.frequency.value = freqMap[btn];
    // g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    // context.resume();
    tonePlaying = true;
    testing(btn);
  }
}
function stopTone(btn) {
  //   g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
  testing2(btn);
}
