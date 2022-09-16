const x_class = "x";
const o_class = "o";
const board = document.querySelector(".ticTacToe-container");
const squares = document.querySelectorAll(".squares");
const undoButton = document.querySelector("undo");
const redoButton = document.querySelector("redo");
const resultMessage = document.querySelector(".result");
const winningMessage = document.querySelector("[data-winner]");
const restartButton = document.querySelector("[data-restart-button]");
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

let board_data = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
// let xTurn;
let player = 1;

gameStart();

restartButton.addEventListener("click", gameStart);
restartButtonInResults.addEventListener("click", gameStart);

function clickEvent(e) {
  const cell = e.target;
  const currentClass = xTurn ? x_class : o_class;
  storeBoardData(cell);
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
  // clearBoardDataOnRestart(row, col);
  console.log(board_data);
}

// function clearBoardDataOnRestart(row,col) {
//   board_data[row][col] = 0;
// }

function undoMove() {}
function redoMove() {}

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
  // clearBoardDataOnRestart();
  board_data = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  xTurn = true;
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
