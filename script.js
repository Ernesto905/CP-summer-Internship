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

var clueHoldTime = 1000; //how long to hold each clue's light/sound

//toggle challenges
var doubleIt = false;
var speedIt = false;

function startGame() {
  //initialize game variables
  progress = 0;
  gamePlaying = true;
  clueHoldTime = 1000;
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  document.getElementById("doubleItButton").classList.add("hidden");
  document.getElementById("speedItButton").classList.add("hidden");

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
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("doubleItButton").classList.remove("hidden");
  document.getElementById("speedItButton").classList.remove("hidden");
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
  context.resume();
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
    //GAME OVER: LOSE!
    loseGame();
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

// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2,
  5: 500,
  6: 550,
  7: 600,
  8: 650,
};

// sound settings for the game butttons
function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  context.resume();
  tonePlaying = true;
  setTimeout(function () {
    stopTone();
  }, len);
}

function startTone(btn) {
  if (!tonePlaying) {
    context.resume();
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    context.resume();
    tonePlaying = true;
  }
}
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);
