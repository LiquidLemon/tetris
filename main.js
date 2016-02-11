require("./index.css");

var game = require("./game.js");

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented)
    return;
  if (game.over && event.code == "KeyR") {
    game.restart();
    game.over = false;
  } else {

    switch (event.code) {
      case "ArrowRight":
        game.tetromino.moveRight();
        break;
      case "ArrowLeft":
        game.tetromino.moveLeft();
        break;
      case "ArrowDown":
        game.moveDown(); // additional logic for moving down 
        break;
      case "ArrowUp":
        game.tetromino.rotate();
        break;
    }
  } 

  game.draw();
  event.preventDefault();
}, true);

game.restart();
game.draw();
