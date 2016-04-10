var grid = {};
grid.bricks = [];

grid.obstructed = function (position) {
  var isTaken = this.bricks.some(function (brick) {
    return brick.position.x == position.x && brick.position.y == position.y;
  });
  var isOutOfBounds = position.x > 9 || position.x < 0 || position.y > 21 || position.y < 0;
  return isTaken || isOutOfBounds;
};
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
grid.collapse = function (rowsAmount) {
  this.bricks.forEach(function (brick) {
    if (brick.position.y < rowsAmount)
      ++brick.position.y;
  });
};
grid.update = function () {
  var removedRows = 0;
  for (var i = 0; i < 22; ++i) {
    if (this.getRow(i).length == 10) {
      ++removedRows;
      this.removeRow(i);
      this.collapse(i);
    }
  }
  return removedRows;
};
grid.clear = function () {
  this.bricks = new Array();
};
module.exports = grid;
