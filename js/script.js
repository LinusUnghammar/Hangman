// Array: med spelets alla ord
const wordList = [
  "RUSSIA",
  "FRANCE",
  "SWEDEN",
  "SPAIN",
  "NORWAY",
  "GERMANY",
  "ICELAND",
  "KAZAKHSTAN",
  "CZECHIA",
  "HUNGARY",
  "PORTUGAL",
  "CROATIA",
  "ESTONIA",
  "LIECHTENSTEIN",
  "BELGIUM",
  "USA",
  "BRAZIL",
  "COLOMBIA",
  "VENEZUELA",
  "CUBA",
  "JAMAICA",
  "BAHAMAS",
  "CHINA",
  "INDIA",
  "THAILAND",
  "TAJIKISTAN",
  "MALDIVES",
  "AUSTRALIA",
];
let selectedWord; // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan
let wrongGuesses; // Number: håller antalet gissningar som var fel
let correctGuesses; // Number: håller antalet gissningar som var korrekt
let hangmanImg = document.querySelector("#hangman"); // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`
let msgHolderEl = document.querySelector("#message"); // DOM-nod: Ger meddelande när spelet är över
let letterBoxEls; // Boxarna som bokstäverna ska stå i

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
function initialize() {
  deactivateAllBtns();
  document.querySelector("#startGameBtn").addEventListener("click", startGame);
}

window.onload = initialize;

function startGame() {
  wrongGuesses = 0;
  correctGuesses = 0;
  activateAllBtns();
  updateHangmanimg();
  generateRandomWord();
  createLetterBoxes();
  winOrLose();
}

// Funktion som slumpar fram ett ord
function generateRandomWord() {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
}

// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram
function createLetterBoxes() {
  letterBoxEls = document.querySelector("#listOfboxes");
  deleteBoxes();
  for (let i = 0; i < selectedWord.length; i++) {
    let list = document.createElement("li");
    let box = document.createElement("input");
    box.setAttribute("type", "text");
    box.setAttribute("disabled", "disabled");
    box.setAttribute("value", "");
    list.appendChild(box);
    letterBoxEls.appendChild(list);
  }
}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav
function handleLetter(clickedItem) {
  let nodeChildrens = document.querySelector("#listOfboxes").children;
  for (let i = 0; i < selectedWord.length; i++) {
    if (clickedItem === selectedWord[i]) {
      nodeChildrens[i].firstChild.setAttribute("value", clickedItem);
      correctGuesses++;
    }
  }
  let j = selectedWord.indexOf(clickedItem);
  if (j === -1) {
    wrongGuesses++;
    updateHangmanimg();
  }
  if (correctGuesses === selectedWord.length) {
    winOrLose();
  } else if (wrongGuesses === 6) {
    winOrLose();
  }
  deactivateButton(clickedItem);
}

// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
function winOrLose() {
  if (correctGuesses === selectedWord.length) {
    deactivateAllBtns();
    msgHolderEl.textContent = "Gratulations! you guessed the correct country";
  } else if (wrongGuesses === 6) {
    deactivateAllBtns();
    let msgWord = selectedWord.toLowerCase();
    msgWord = msgWord.charAt(0).toUpperCase() + msgWord.slice(1);
    msgHolderEl.textContent = `You lost! the country was ${msgWord}`;
  } else {
    msgHolderEl.textContent = "";
  }
}

// Funktion som inaktiverar knappen man trycker på
function deactivateButton(clickedItem) {
  let letterBtn = document.querySelectorAll("#letterButtons button");
  for (let i = 0; i < letterBtn.length; i++) {
    if (letterBtn[i].value == clickedItem) {
      letterBtn[i].disabled = true;
    }
  }
}

// Funktion som aktiverar alla knappar när man startar nytt spel
function activateAllBtns() {
  let allBtns = document.querySelectorAll("#letterButtons button");
  for (let i = 0; i < allBtns.length; i++) {
    if (allBtns[i].disabled === true) {
      allBtns[i].disabled = false;
    }
  }
}

// Funktion som inaktiverar alla knappar beroende på vart i spelet man befinner sig
function deactivateAllBtns() {
  let allBtns = document.querySelectorAll("#letterButtons button");
  for (let i = 0; i < allBtns.length; i++) {
    allBtns[i].disabled = true;
  }
}

// Funktion som tar bort boxarna är man startar nytt spel
function deleteBoxes() {
  let deleteBox = letterBoxEls.querySelectorAll("li");
  if (deleteBox.length > 0 || null) {
    for (let i = 0; i < deleteBox.length; i++) {
      let deleteLi = deleteBox[i];
      letterBoxEls.removeChild(deleteLi);
    }
  }
}

// Funktion som upptaterar hangman bilderna beroende på hur många fel man haft
function updateHangmanimg() {
  if (wrongGuesses === 0) {
    hangmanImg.src = "images/h0.png";
  } else if (wrongGuesses === 1) {
    hangmanImg.src = "images/h1.png";
  } else if (wrongGuesses === 2) {
    hangmanImg.src = "images/h2.png";
  } else if (wrongGuesses === 3) {
    hangmanImg.src = "images/h3.png";
  } else if (wrongGuesses === 4) {
    hangmanImg.src = "images/h4.png";
  } else if (wrongGuesses === 5) {
    hangmanImg.src = "images/h5.png";
  } else if (wrongGuesses === 6) {
    hangmanImg.src = "images/h6.png";
  }
}
