//console.log("test");+
const hangmanImage = document.getElementById("hangmanImage");
// Selecting HTML elements
// const wordDisplay = document.getElementById('wordDisplay');
// const hintDisplay = document.getElementById('hintDisplay');

// Define variables to use throughout the game, like the selected word, the number of incorrect guesses, and an array to keep track of which letters have been guessed and all status
let selectedWord = " "; // word to guess?
let guessedLetters = []; // " word "
let incorrectGuesses = 0; // 0/6
const maxIncorrect = 6; // skeleton parts
let wordDisplay = []; // what user sees "_ _ _ _"

// 1. F(X) START GAME =================
function startGame() {
  // Assure that game over screen is hidden
  document.querySelector(".game-modal").style.display = "none";
  document.querySelector(".game-win").style.display = "none";
  // to do - reset the image to no body parts

  // Random selected item, word & hint from array
  const randomIndex = Math.floor(Math.random() * wordList.length);
  selectedWord = wordList[randomIndex].word.toUpperCase(); // declared outside (fut changes)
  const hint = wordList[randomIndex].hint;

  console.log(hint);

  // Resets any game state variables, like the number of incorrect guesses.
  incorrectGuesses = 0;
  guessedLetters = [];
  hangmanImage.src = "images/hm-0.png";
  document.querySelectorAll("#keyboard button").forEach(button => {
    button.disabled = false;
  });
  document.getElementById("incorrectDisplay").textContent = `Incorrect guesses: 0 | ${maxIncorrect}`;

  // Hidden word w/ underscore "_ _ _ _"
  // const arr = new Array(LEN).fill(0);
  wordDisplay = new Array(selectedWord.length).fill("_");
  // Display the hint
  document.getElementById("hintDisplay").textContent = "Hint: " + hint;

  // console.log("Selected word: " + selectedWord);
  // console.log("Word display: " + wordDisplay.join(" "));

  updateWordDisplay();
}

//2. F(X) DISPLAY ON INTERFACE '_' & 'A'

function updateWordDisplay() {
  //get ul _ _ _ from html
  const display = document.getElementById("wordDisplay");
  // set back to empty string, clear previous games.
  display.innerHTML = "";

  // FLICC => F L I C C
  // Loop the wordDisplay =>
  wordDisplay.forEach((letter) => {
    // CREATE an li element for each letter.
    const letterElement = document.createElement("li");
    // add a class to style li in CSS
    letterElement.classList.add("letter");
    // inject the txt('a' or '_') that will be displayed inside ea. li
    letterElement.textContent = letter;
    // INTERFACE: call display⬆ or displayWord(html) and append the letter of selected word.
    display.appendChild(letterElement);
  });
  if(!wordDisplay.includes("_")) {
    gameOver(true);
  }
}

// 2. F(X) MANANGE KEYBOARD ==================
// check if the clciked letter is:
// in the selectedWord & corresponding '_'  wordDisplay => replace it
// if not => update incorrectGuesses

function keyboardClick(clickedLetter) {
  // console.warn(clickedLetter);
  // console.log(selectedWord);
  //clickedLetter is in lowercase for comparison
  clickedLetter = clickedLetter.toLowerCase();
  //check if clickLetter is in selectedWord
  if (selectedWord.toLowerCase().includes(clickedLetter)) {
    console.log("letter exists");
    //iterate through selectedWord:
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i].toLowerCase() === clickedLetter) {
        wordDisplay[i] = selectedWord[i];
      }
    }
    // if yes connect to updateWordDisplay();
    updateWordDisplay();
  } else {
    // if letter doesn't exist, update the incorrectGuesses & image
    // update incorrectGuesses VS guessedLetters
    incorrectGuesses++;
    hangmanImage.src = `images/hm-${incorrectGuesses}.png`;
    document.getElementById(
      "incorrectDisplay"
    ).textContent = `Incorrect guesses: ${incorrectGuesses} | ${maxIncorrect}`;

    // document.getElementById("hangmanImage").src = "images/hm-0.png";
    // document.getElementById("hangmanImage").src = "hm-" + incorrectGuesses + ".png";
    if (incorrectGuesses === maxIncorrect) return gameOver(false);
  }

  // Add the clickedLetter to the guessedLetters array to keep track of it
  guessedLetters.push(clickedLetter);
  // Disable the clicked keyboard button so it can't be clicked again
  // setupKeyboard function
}

function gameOver(hasWon) {
  console.log("game over call");
  //display answer => selectedWord
  document.getElementById("endGameWord").textContent = selectedWord;
  // Define the sound file paths
  const winSound = new Audio("audio/win-sound.wav");
  const loseSound = new Audio("audio/game-over.wav");

    if (hasWon) {
      hangmanImage.src = "images/hm-win.png";
      winSound.play();

      setTimeout(function() {
      document.querySelector(".game-win").style.display = "block"; // Show win modal
      document.querySelector(".game-modal").style.display = "none"; // Hide lose modal if necessary
      }, 2000);
    } else {
      loseSound.play();
      
      setTimeout(function() {
      document.querySelector(".game-modal").style.display = "block";
      }, 2000);
    }
}

// assign events to all buttons
function setupKeyboard() {
  // get all the button elememts from keyboard
  const buttons = document.querySelectorAll("#keyboard button");
  // iterate through each of all buttons and click
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      keyboardClick(button.textContent);
      button.disabled = true;
    });
  });
}

// setupKeyboard and startGame are called after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", (event) => {
  startGame();
  generateKeyboard();
});

// keyButtons.forEach((keyButton) => {
//   keyButton.addEventListener("click", (e) => {
//     const clickedLetter = keyButton.innerHTML;
//     keyboardClick(clickedLetter);
//   });
// });

// Dynamic Keyboard
function generateKeyboard() {
  const keyboardDiv = document.getElementById("keyboard");
  keyboardDiv.innerHTML = ""; // Clear existing buttons if any

  // Generate A-Z
  for (let i = 65; i <= 90; i++) {
    const button = document.createElement("button");
    // Convert ASCII code to letter between 0 and 65535
    button.textContent = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
  }

  // Generate 0-9
  for (let i = 0; i <= 9; i++) {
    const button = document.createElement("button");
    // Number to string
    button.textContent = i.toString();
    keyboardDiv.appendChild(button);
  }

  // Setup event listeners for the generated buttons
  setupKeyboard();
}
//note: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode
