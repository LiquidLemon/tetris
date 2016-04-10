var Brick = require("./brick.js");

function loader (grid) {
  var pool = [];
  function Tetromino () {
    if (pool.length === 0) {
      pool = [
        {
          color: "cyan",
          position: {x: 3, y: 0},
          center: {x: 1.5, y: 0.5},
          bricks: [new Brick(0,0), new Brick(1,0), new Brick(2,0), new Brick(3,0)]
        }, {
          color: "yellow",
          position: {x: 4, y: 0},
          center: {x: 0.5, y: 0.5},
          bricks: [new Brick(0,0), new Brick(1,0), new Brick(0,1), new Brick(1,1)] 
        }, {
          color: "purple",
          position: {x: 3, y: 0},
          center: {x: 1, y: 1},
          bricks: [new Brick(1,0), new Brick(0,1), new Brick(1,1), new Brick(2,1)]
        }, {
          color: "green",
          position: {x: 3, y: 0},
          center: {x: 1, y: 1},
          bricks: [new Brick(1,0), new Brick(2,0), new Brick(0,1), new Brick(1,1)]
        }, {
          color: "red",
          position: {x: 3, y: 0},
          center: {x: 1, y: 1},
          bricks: [new Brick(0,0), new Brick(1,0), new Brick(1,1), new Brick(2,1)]
        }, {
          color: "blue",
          position: {x: 3, y: 0},
          center: {x: 1, y: 1},
          bricks: [new Brick(0,0), new Brick(0,1), new Brick(1,1), new Brick(2,1)]
        }, {
          color: "orange",
          position: {x: 3, y: 0},
          center: {x: 1, y: 1},
          bricks: [new Brick(2,0), new Brick(0,1), new Brick(1,1), new Brick(2,1)]
        } 
      ];
    }

    var index = Math.floor(pool.length * Math.random()); 
    var template = pool[index];
    pool.splice(index, 1);

    Object.keys(template).forEach(function (key) {
      this[key] = template[key];
    }, this);

    if (this.bricks.some(function (brick) { 
      var x = brick.position.x + this.position.x;
      var y = brick.position.y + this.position.y;
      return grid.obstructed({x: x, y: y}); 
    }, this)) {
      this.obstructed = true;
    }
    
    this.canMove = function (x, y) {
      var direction = {};
      direction.x = x | 0;
      direction.y = y | 0;
      for (var i = 0; i < 4; ++i) {
        var x = this.position.x + this.bricks[i].position.x + direction.x;
        var y = this.position.y + this.bricks[i].position.y + direction.y;

        if (grid.obstructed({x: x, y: y}))
          return false;
      }
      return true;
    };

    this.move = function (x, y) {
      if(this.canMove(x, y)) {
        this.position.x += x;
        this.position.y += y;
        return true;
      } else {
        return false;
      }
    };

    this.rotate = function () {
      var new_bricks = [];
      this.bricks.forEach(function (brick) {
        new_bricks.push(new Brick(-brick.position.y + this.center.y + this.center.x, brick.position.x - this.center.x + this.center.y)); // maths!
      }, this);
      var obstructed;
      new_bricks.forEach(function (brick) {
        var x = brick.position.x + this.position.x;
        var y = brick.position.y + this.position.y;
        obstructed = grid.obstructed({x: x, y: y});
      }, this);
      if (!obstructed) {
        this.bricks = new_bricks;
      }
    };
  }
  return Tetromino;
}

module.exports = loader;
