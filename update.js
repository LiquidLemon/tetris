var Tetromino = require("./tetromino.js");
var draw = require("./draw.js");
function update () {
    window.addEventListener("keydown", function (event) {
      if (event.defaultPrevented)
        return;

      switch (event.key) {
        case "ArrowRight":
          tetromino.moveRight();
          break;
        case "ArrowLeft":
          tetromino.moveLeft();
          break;
        case "ArrowDown":
          if (!tetromino.moveDown()) {
            tetromino.fill();
            if (bag.length === 0)
              bag = ["o", "i", "t", "s", "z", "j", "l"];
            tetromino = new Tetromino(bag);
          }
          break;
        case "ArrowUp":
          tetromino.rotate();
          break;
      }

      draw();
      event.preventDefault();
    }, true);
}   
module.exports = update;
