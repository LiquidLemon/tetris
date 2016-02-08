require("./index.css");
var draw = require("./draw.js");
var tetrominoLoader = require("./tetromino.js");

var grid = require("./grid.js");
var Tetromino = tetrominoLoader(grid);
var tetromino = new Tetromino();
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented)
    return;

  switch (event.code) {
    case "ArrowRight":
      tetromino.moveRight();
      break;
    case "ArrowLeft":
      tetromino.moveLeft();
      break;
    case "ArrowDown":
      if (!tetromino.moveDown()) {
        tetromino = new Tetromino();
      }
      break;
    case "ArrowUp":
      tetromino.rotate();
      break;
  }

  draw(grid, tetromino);
  event.preventDefault();
}, true);

window.setInterval(function () {
  if (!tetromino.moveDown())
    tetromino = new Tetromino();
  draw(grid, tetromino);
}, 1000);

draw(grid, tetromino);
