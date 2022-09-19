const x_class = "x";
const o_class = "o";
const board = document.querySelector(".ticTacToe-container");
const squares = document.querySelectorAll("[data-square]");
const undoButton = document.querySelector("[data-undo-button]");
const redoButton = document.querySelector("[data-redo-button]");
const restartButton = document.querySelector("[data-restart-button]");
const resultMessage = document.querySelector(".result");
const winningMessage = document.querySelector("[data-winner]");
const restartButtonInResults = document.querySelector("#restartBtnInResults");
const xPlayerScore = document.querySelector(".xScore");
const oPlayerScore = document.querySelector(".oScore");
const xPlayerName = document.querySelector(".xPlayerName");
const oPlayerName = document.querySelector(".oPlayerName");
const xSymbol = document.querySelector(".fa-solid.fa-x");
const oSymbol = document.querySelector(".fa-solid.fa-o");
const swapButton = document.querySelector("[data-swap-button]");
const swapLogo = document.querySelector(".fa-solid.fa-arrow-right-arrow-left");
const winning_combinations = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

const deepClone = (items) =>
  items.map((item) => (Array.isArray(item) ? deepClone(item) : item));

// let board_data = [
//   [0, 0, 0],
//   [0, 0, 0],
//   [0, 0, 0],
// ];

// let history_data = [];
// let xTurn;
let player = 1;
let moves = 0;
let xScore = 0;
let oScore = 0;

gameStart();
readBoardData();

swapButton.addEventListener("click", () => {
  swapNames();
  swapScores();
});

undoButton.addEventListener("click", () => {
  undoMove();
});

redoButton.addEventListener("click", () => {
  redoMove();
});

restartButton.addEventListener("click", gameStart);
restartButtonInResults.addEventListener("click", gameStart);

function clickEvent(e) {
  const cell = e.target;
  const currentClass = xTurn ? x_class : o_class;
  // placeMark(cell, currentClass);
  storeBoardData(cell);
  readBoardData();
  if (checkForWin(currentClass)) {
    gameEnd(false);
  } else if (checkForDraw()) {
    gameEnd(true);
  } else {
    changeTurns();
    showHoverClass();
  }
  console.log("clicked - board", board_data);
  console.log("clicked - history", history_data);
}

function storeBoardData(cell) {
  let indexPos = [...squares].indexOf(cell);
  let col = indexPos % 3;
  let row = (indexPos - col) / 3;
  board_data[row][col] = player;
  player *= -1;
  history_data[moves] = deepClone(board_data);
  moves++;
  readHistoryData();
  console.log("board", board_data);
  console.log("history", history_data);
}

function readBoardData() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board_data[row][col] === 1) {
        squares[row * 3 + col].classList.add(x_class);
      } else if (board_data[row][col] === -1) {
        squares[row * 3 + col].classList.add(o_class);
      } else if (board_data[row][col] === 0) {
        squares[row * 3 + col].classList.remove(o_class) ||
          squares[row * 3 + col].classList.remove(x_class);
      }
    }
  }
}

function readHistoryData() {
  if (history_data.length > 0) {
    undoButton.style.pointerEvents = "auto";
    undoButton.style.opacity = "1";
    swapButton.innerText = "V.S.";
    swapButton.style.pointerEvents = "none";
  }
}

function undoMove() {
  console.log("undo");
  // history_data[moves] = deepClone(board_data);
  moves--;
  board_data = history_data[moves - 1];
  readBoardData();
  console.log(moves);
  console.log("board", board_data);
  console.log("history", history_data);
  console.log("moves", history_data[moves]);
  // moves--;
  // board_data = history_data[moves];
  // readBoardData();
  // console.log("moves undo", moves);
  // console.log(board_data);
  // console.log(history_data[moves]);
  // history_data[moves] = deepClone(board_data);
  // moves--;
  // board_data_flatten = board_data.flat();
  // console.log("board flattened", board_data.flat());
  // console.log(board_data_flatten.lastIndexOf(1));
  // const currentClass = xTurn ? x_class : o_class;
  // readBoardData();
  // history_data[moves] = deepClone(board_data);
  // moves--;
  // console.log("before", [history_data[moves]].flat());
  // for (let row = 0; row < 3; row++) {
  //   for (let col = 0; col < 3; col++) {
  //     squares[row * 3 + col].classList.remove(currentClass);
  //   }
  // }
  // history = history_data.pop();
  // console.log("history after", history_data);
  // history_data.lastIndexOf(moves) - 1;
  // console.log(board_data);
}

function redoMove() {
  console.log("redo");
  moves++;
  board_data = history_data[moves - 1];
  readBoardData();
  console.log(moves);
  console.log("board", board_data);
  console.log("history", history_data);
  console.log("moves", history_data[moves]);
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function changeTurns() {
  xTurn = !xTurn;
}

function showHoverClass() {
  board.classList.remove(x_class);
  board.classList.remove(o_class);
  if (xTurn) {
    board.classList.add(x_class);
  } else {
    board.classList.add(o_class);
  }
}

function gameStart() {
  console.log("restart");
  board_data = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  history_data = [];
  moves = 0;
  player = 1;
  xTurn = true;
  if (history_data.length === 0) {
    undoButton.style.pointerEvents = "none";
    undoButton.style.opacity = "0.5";
    swapButton.innerHTML = "&#8644";
    swapButton.style.pointerEvents = "auto";
  }
  squares.forEach((square) => {
    square.classList.remove(x_class);
    square.classList.remove(o_class);
    square.removeEventListener("click", clickEvent);
    square.addEventListener("click", clickEvent, { once: true });
  });
  showHoverClass();
  resultMessage.classList.remove("show");
  console.log("board", board_data);
  console.log("start history", history_data);
}

function gameEnd(draw) {
  if (draw) {
    winningMessage.innerText = "Draw!";
  } else {
    checkPlayerNames();
    addScore();
  }
  resultMessage.classList.add("show");
  // setTimeout(() => {
  //   resultMessage.classList.add("show");
  // }, 3000);
}

function checkForWin(currentClass) {
  return winning_combinations.some((combination) => {
    return combination.every((index) => {
      return squares[index].classList.contains(currentClass);
    });
  });
}

function checkForDraw() {
  return [...squares].every((square) => {
    return (
      square.classList.contains(x_class) || square.classList.contains(o_class)
    );
  });
}

function addScore() {
  if (xTurn) {
    xScore++;
    xPlayerScore.innerText = xScore;
  } else if (!xTurn) {
    oScore++;
    oPlayerScore.innerText = oScore;
  }
}

function checkPlayerNames() {
  noPlayerNameInputs = xPlayerName.value === "" && oPlayerName.value === "";
  xPlayerNameInput = xPlayerName.value !== "";
  oPlayerNameInput = oPlayerName.value !== "";
  bothPlayerNameInput = xPlayerNameInput && oPlayerNameInput;
  winningMessage.innerText = noPlayerNameInputs
    ? `${xTurn ? "X" : "O"} Wins!`
    : xPlayerNameInput && !oPlayerNameInput
    ? `${xTurn ? xPlayerName.value : "O"} Wins!`
    : oPlayerNameInput && !xPlayerNameInput
    ? `${xTurn ? "X" : oPlayerName.value} Wins!`
    : bothPlayerNameInput
    ? `${xTurn ? xPlayerName.value : oPlayerName.value} Wins!`
    : "";
}

// function swapSymbols() {
//   if (xSymbol.className === "fa-solid fa-x") {
//     xSymbol.classList.remove("fa-x");
//     xSymbol.classList.add("fa-o");
//     oSymbol.classList.remove("fa-o");
//     oSymbol.classList.add("fa-x");
//   } else {
//     xSymbol.classList.remove("fa-o");
//     xSymbol.classList.add("fa-x");
//     oSymbol.classList.remove("fa-x");
//     oSymbol.classList.add("fa-o");
//   }
// }

function swapNames() {
  let xNameSaver = xPlayerName.value;
  let oNameSaver = oPlayerName.value;
  if (xPlayerName.className === "xPlayerName") {
    xPlayerName.classList.remove("xPlayerName");
    xPlayerName.classList.add("oPlayerName");
    oPlayerName.classList.remove("oPlayerName");
    oPlayerName.classList.add("xPlayerName");
    xPlayerName.value = oNameSaver;
    oPlayerName.value = xNameSaver;
  } else if (xPlayerName.className === "oPlayerName") {
    xPlayerName.classList.remove("oPlayerName");
    xPlayerName.classList.add("xPlayerName");
    oPlayerName.classList.remove("xPlayerName");
    oPlayerName.classList.add("oPlayerName");
    xPlayerName.value = oNameSaver;
    oPlayerName.value = xNameSaver;
  }
}
function swapScores() {
  let xCurrentScore = xScore;
  let oCurrentScore = oScore;
  if (xPlayerScore.className === "xScore") {
    xPlayerScore.classList.remove("xScore");
    xPlayerScore.classList.add("oScore");
    oPlayerScore.classList.remove("oScore");
    oPlayerScore.classList.add("xScore");
    xScore = oCurrentScore;
    oScore = xCurrentScore;
    xPlayerScore.innerText = xScore;
    oPlayerScore.innerText = oScore;
  } else if (xPlayerScore.className === "oScore") {
    xPlayerScore.classList.remove("oScore");
    xPlayerScore.classList.add("xScore");
    oPlayerScore.classList.remove("xScore");
    oPlayerScore.classList.add("oScore");
    xScore = oCurrentScore;
    oScore = xCurrentScore;
    xPlayerScore.innerText = xScore;
    oPlayerScore.innerText = oScore;
  }
}
