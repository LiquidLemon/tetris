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
        game.move(1,0);
        break;
      case "ArrowLeft":
        game.move(-1,0);
        break;
      case "ArrowDown":
        game.move(0,1);
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
