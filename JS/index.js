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
const xPlayerName = document.querySelector(".xPlayer");
const oPlayerName = document.querySelector(".oPlayer");
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
  console.log("moves clicked", moves);
  console.log("history", history_data);
  readHistoryData();
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
  // history_data = history_data;
  if (history_data.length > 0) {
    undoButton.style.pointerEvents = "auto";
    undoButton.style.opacity = "1";
  }
}

function undoMove() {
  // console.log("undo");
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
  readBoardData();
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
  if (history_data.length === 0) {
    undoButton.style.pointerEvents = "none";
    undoButton.style.opacity = "0.5";
  }
  squares.forEach((square) => {
    square.classList.remove(x_class);
    square.classList.remove(o_class);
    square.removeEventListener("click", clickEvent);
    square.addEventListener("click", clickEvent, { once: true });
  });
  showHoverClass();
  resultMessage.classList.remove("show");
  // console.log("board", board_data);
  console.log("start history", history_data);
}

function gameEnd(draw) {
  if (draw) {
    winningMessage.innerText = "Draw!";
  } else {
    addScore();
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

function addScore() {
  if (xTurn) {
    xScore++;
    xPlayerScore.innerText = xScore;
    xCurrentScore = xScore;
    console.log(xCurrentScore);
  } else if (!xTurn) {
    oScore++;
    oPlayerScore.innerText = oScore;
    oCurrentScore = oScore;
  }
}
