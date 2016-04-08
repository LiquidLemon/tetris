var game = {};

game.grid = require("./grid.js");
var Tetromino = require("./tetromino.js")(game.grid);

game.canvas = document.getElementById('display');
if (game.canvas.getContext) {
  game.context = game.canvas.getContext('2d');
  game.context.font = "16px sans-serif";
  game.context.textAlign = "center";
}

game.moveDown = function () {
  if (!this.tetromino.moveDown()) {
    this.score += Math.pow(this.grid.update(), 2);
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
    document.getElementById("score").innerHTML = "Your score is: " + this.score;
  } else {
    this.context.fillStyle = "black";
    var text = [
      "Press \"R\" to restart",
      "Score: " + this.score
    ];
    text.forEach(function (string, index) {
      this.context.fillText(string, this.canvas.width / 2, this.canvas.height * ((index + 1) / (text.length + 1)));
    }, this);
  }
};
game.getInterval = function () {
  return 1000 - this.score * 4;
};

game.restart = function () {
  this.over = false;
  this.score = 0;
  this.grid.clear();
  this.tetromino = new Tetromino();
  window.setTimeout(function step(game) {
    game.moveDown();
    if(!game.over) 
      window.setTimeout(step, game.getInterval(), game);
    game.draw();
  }, this.getInterval(), this);
};
module.exports = game;
