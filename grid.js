var Brick = require("./brick.js");
var grid = {};
grid.bricks = [];

grid.getRow = function (id) {
  return this.bricks.filter(function (brick) {
    if (brick.position.y == id)
      return true;
    else
      return false;
  });
}
grid.removeRow = function (id) {
  this.bricks = this.bricks.filter(function (brick) {
    if (brick.position.y == id)
      return false;
    return true;
  });
};
grid.moveDown = function (rowsAmount) {
  this.bricks.forEach(function (brick) {
    if (brick.position.y < rowsAmount)
      ++brick.position.y;
  });
};
grid.update = function () {
  for (var i = 0; i < 22; ++i) {
    if (this.getRow(i).length == 10) {
      this.removeRow(i);
      this.moveDown(i);
    }
  }
};
module.exports = grid;
