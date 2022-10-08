import { rgb, print } from "./utils.js";
import { canvas, c, line } from "./canvas.js";
import { rows, columns } from "./setup.js";

// model
const board = [
  [],
  [],
  []
];

var turnCount = 0;

function notUndefinedEquals3(a, b, c) {
  return (a == b && b == c && a !== undefined);
}

function checkWin() {
  var winner = "no one won yet";

  for (let i = 0; i < 3; i++) {
    // vertical
    if (notUndefinedEquals3(board[0][i], board[1][i], board[2][i]))
      winner = board[0][i];
    
    // horizontal
    if (notUndefinedEquals3(board[i][0], board[i][1], board[i][2])) 
      winner = board[i][0];
  }
  
  // diagonal
  if (notUndefinedEquals3(board[0][0], board[1][1], board[2][2]))
    winner = board[0][0];
  
  if (notUndefinedEquals3(board[0][2], board[1][1], board[2][0]))
    winner = board[0][2];
  
  if (winner == "no one won yet" && turnCount == 9)
    print("tie");
  
  if (winner !== "no one won yet")
    print(winner)
}



function addX(x,y) {
  board[y - 1][x - 1] = 'x';
  turnCount++;
}

function addO(x,y) {
  board[y - 1][x - 1] = 'o';
  turnCount++;
}

var isPlayerX = true;

function changeCurrentPlayer() {
  if (isPlayerX) {
    isPlayerX = false;
  } else {
    isPlayerX = true;
  }
}

// view
 function o(column, row) {
  const xStepSize = canvas.width / columns;
  const yStepSize = canvas.height / rows;
 
  const min = Math.min(yStepSize, xStepSize);
  const padding = min / 8;

  const x = column * xStepSize - xStepSize / 2;
  const y = row * yStepSize - yStepSize / 2;
  const radius = min / 2;
  
  c.beginPath();
  c.arc(x, y, radius - padding, 0, 2 * Math.PI);
  c.stroke();
}

function x(column, row) {
  const xStepSize = canvas.width / columns;
  const yStepSize = canvas.height / rows;
  
  const min = Math.min(xStepSize, yStepSize);
  const padding = min / 8;
  const x = column * xStepSize - xStepSize / 2;
  const y = row * yStepSize - yStepSize / 2;
  
  const xi = x - min / 2 + padding;
  const yi = y - min / 2 + padding;
  const xf = x + min / 2 - padding;
  const yf = y + min / 2 - padding;
  
  line(xi, yi, xf, yf);
  line(xi, yf, xf, yi);
}

function render() {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] == 'x')
        x(j + 1, i + 1);
      if (board[i][j] == 'o')
        o(j + 1, i + 1);
    }
  }
} 



// controller
canvas.addEventListener('click', (event) => {
  let x = Math.ceil(
    event.clientX / (canvas.width / columns));
  let y = Math.ceil(
    event.clientY / (canvas.height / rows));
  
  if (isPlayerX) {
    addX(x, y);
    changeCurrentPlayer();
  } else {
    addO(x, y);
    changeCurrentPlayer();
  }
  
  render();
  checkWin();
  console.log(board)
}); // was: `} , false);`