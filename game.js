var game = {};

game.grid = require("./grid.js");
var Tetromino = require("./tetromino.js")(game.grid);
game.tetromino = new Tetromino();
game.over = false;

game.canvas = document.getElementById('display');
if (game.canvas.getContext) {
  game.context = game.canvas.getContext('2d');
  game.context.font = "16px sans-serif";
  game.context.textAlign = "center";
}
game.restart = function () {
  this.over = false;
  this.grid.clear();
  this.tetromino = new Tetromino();
};

game.moveDown = function () {
  if (!this.tetromino.moveDown()) {
    this.tetromino = new Tetromino();
    if (this.tetromino.obstructed) {
      this.over = true;
    }
  }
};

game.draw = function () {
  this.context.clearRect(0,0,this.canvas.width,this.canvas.height);

  if (!game.over) {
    this.grid.bricks.forEach(function (brick) {
      this.context.fillStyle = brick.color;
      this.context.fillRect(brick.position.x*16, brick.position.y*16,16,16);
    }, this);
    this.context.fillStyle = this.tetromino.color;
    this.tetromino.bricks.forEach(function (brick) {
      this.context.fillRect((this.tetromino.position.x+brick.position.x)*16,(this.tetromino.position.y+brick.position.y)*16,16,16);
    }, this);
  } else {
    this.context.fillText("Press any key to restart", this.canvas.width / 2, this.canvas.height / 2);
  }
};
module.exports = game;
