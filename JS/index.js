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

let board_data = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let history_data = [];
// let xTurn;
let player = 1;
let moves = 0;

gameStart();
readBoardData();

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
  storeBoardData(cell);
  readBoardData();
  placeMark(cell, currentClass);
  if (checkForWin(currentClass)) {
    gameEnd(false);
  } else if (checkForDraw()) {
    gameEnd(true);
  } else {
    changeTurns();
    showHoverClass();
  }
}

function storeBoardData(cell) {
  let indexPos = [...squares].indexOf(cell);
  let col = indexPos % 3;
  let row = (indexPos - col) / 3;
  board_data[row][col] = player;
  player *= -1;
  console.log("board", board_data);
  history_data[moves] = deepClone(board_data);
  moves++;
  console.log("history", history_data);
}

function readBoardData() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board_data[row][col] === 1) {
        squares[row * 3 + col].classList.add(x_class);
      } else if (board_data[row][col] === -1) {
        squares[row * 3 + col].classList.add(o_class);
      }
    }
  }
}

function undoMove() {
  console.log("undo");
}

function redoMove() {
  console.log("redo");
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
  readBoardData();
  squares.forEach((square) => {
    square.classList.remove(x_class);
    square.classList.remove(o_class);
    square.removeEventListener("click", clickEvent);
    square.addEventListener("click", clickEvent, { once: true });
  });
  showHoverClass();
  resultMessage.classList.remove("show");
}

function gameEnd(draw) {
  if (draw) {
    winningMessage.innerText = "Draw!";
  } else {
    winningMessage.innerText = `${xTurn ? "X" : "O"} Wins!`;
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
