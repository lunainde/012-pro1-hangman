//console.log("test");+

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
  // Random selected item, word & hint from array
  const randomIndex = Math.floor(Math.random() * wordList.length);
  selectedWord = wordList[randomIndex].word; // declared outside (fut changes)
  const hint = wordList[randomIndex].hint;

  console.log(hint);

  // Resets any game state variables, like the number of incorrect guesses.
  incorrectGuesses = 0;
  guessedLetters = [];

  // Hidden word w/ underscore "_ _ _ _"
  // const arr = new Array(LEN).fill(0);
  wordDisplay = new Array(selectedWord.length).fill("_");

  console.log("Selected word: " + selectedWord);
  console.log("Word display: " + wordDisplay.join(" "));
}
startGame();

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
}

// 2. F(X) MANANGE KEYBOARD ==================
// check if the clciked letter is:
// in the selectedWord & corresponding '_'  wordDisplay => replace it
// if not => update incorrectGuesses

function keyboardClick(clickedLetter) {
  console.warn(clickedLetter);
  console.log(selectedWord);
  //check if clickLetter is in selectedWord
  if (selectedWord.toLowerCase().includes(clickedLetter)) {
    console.log("letter exists");
    //iterate through selectedWord:
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === clickedLetter) {
        wordDisplay[i] = clickedLetter;
      }
    }
    // if yes connect to updateWordDisplay();
    updateWordDisplay();
  } else {
    // update incorrectGuesses VS guessedLetters
    incorrectGuesses++;
    // ==================upadate image
  }
  // Add the clickedLetter to the guessedLetters array to keep track of it
  guessedLetters.push(clickedLetter);
  // Disable the clicked keyboard button so it can't be clicked again
  // setupKeyboard function
}

// assign events to all buttons
function setupKeyboard() {
  // get all the button elememts from keyboard
  const buttons = document.querySelectorAll("#keyboard button");
  // iterate through each of all buttons and click
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      keyboardClick(button.textContent);
      button.disable = true;
    });
  });
}
setupKeyboard();

// keyButtons.forEach((keyButton) => {
//   keyButton.addEventListener("click", (e) => {
//     const clickedLetter = keyButton.innerHTML;
//     keyboardClick(clickedLetter);
//   });
// });
