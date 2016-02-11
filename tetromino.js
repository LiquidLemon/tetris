var Brick = require("./brick.js");

function loader (grid) {
  var pool = ["o", "i", "t", "s", "z", "j", "l"];

  function Tetromino () {
    if (pool.length === 0)
      pool = ["o", "i", "t", "s", "z", "j", "l"];

    var type = pool[Math.floor(pool.length * Math.random())];
    pool.splice(pool.indexOf(type), 1);

    this.bricks = [];
    switch (type) {
      case "i":
      case "I":
        this.color = "cyan";
        this.position = {x:3, y:0};
        this.center = {x:1.5, y:0.5};
        this.bricks.push(
            new Brick({x:0, y:0}),
            new Brick({x:1, y:0}),
            new Brick({x:2, y:0}),
            new Brick({x:3, y:0})
        );
        break;
      case "o":
      case "O":
        this.color = "yellow";
        this.position = {x:4, y:0};
        this.center = {x: 0.5, y: 0.5};
        this.bricks.push(
            new Brick({x:0,y:0}),
            new Brick({x:1,y:0}),
            new Brick({x:0,y:1}),
            new Brick({x:1,y:1})
        );
        break;
      case "t":
      case "T":
        this.color = "purple";
        this.position = {x:3, y:0};
        this.center = {x:1,y:1};
        this.bricks.push(
            new Brick({x:1,y:0}),
            new Brick({x:0,y:1}),
            new Brick({x:1,y:1}),
            new Brick({x:2,y:1})
        );
        break;
      case "s":
      case "S":
        this.color = "green";
        this.position = {x:3, y:0};
        this.center = {x:1, y:1};
        this.bricks.push(
            new Brick({x:1,y:0}),
            new Brick({x:2,y:0}),
            new Brick({x:0,y:1}),
            new Brick({x:1,y:1})
        );
        break;
      case "z":
      case "Z":
        this.color = "red";
        this.position = {x:3, y:0};
        this.center = {x:1, y:1};
        this.bricks.push(
            new Brick({x:0,y:0}),
            new Brick({x:1,y:0}),
            new Brick({x:1,y:1}),
            new Brick({x:2,y:1})
        );
        break;
      case "j":
      case "J":
        this.color = "blue";
        this.position = {x:3, y:0};
        this.center = {x:1, y:1};
        this.bricks.push(
            new Brick({x:0,y:0}),
            new Brick({x:0,y:1}),
            new Brick({x:1,y:1}),
            new Brick({x:2,y:1})
        );
        break;
      case "l":
      case "L":
        this.color = "orange";
        this.position = {x:3, y:0};
        this.center = {x:1, y:1};
        this.bricks.push(
            new Brick({x:2, y:0}),
            new Brick({x:0, y:1}),
            new Brick({x:1, y:1}),
            new Brick({x:2, y:1})
        );
        break;
    }

    if (this.bricks.some(function (brick) { 
      var x = brick.position.x + this.position.x;
      var y = brick.position.y + this.position.y;
      return grid.obstructed({x: x, y: y}); 
    }, this)) {
      this.obstructed = true;
    }
    
    this.canMove = function (direction) {
      direction.x = direction.x | 0;
      direction.y = direction.y | 0;
      for (var i = 0; i < 4; ++i) {
        var x = this.position.x + this.bricks[i].position.x + direction.x;
        var y = this.position.y + this.bricks[i].position.y + direction.y;
        //check if in bounds
        if (x > 9 || x < 0 || y > 21 || y < 0)
          return false;
        //check if not obstructed
        if (grid.bricks.some(function (brick) {return brick.position.x == x && brick.position.y == y}))
          return false;
      }
      return true;
    };

    this.moveRight = function () {
      if (this.canMove({x: 1}))
        this.position.x += 1;
    };

    this.moveLeft = function () {
      if (this.canMove({x: -1}))
        this.position.x -= 1;
    };

    this.moveDown = function () {
      if (this.canMove({y: 1})) {
        this.position.y += 1;
      } else {
        this.fill();
        grid.update();
        return false;
      }
      return true;
    };

    this.fill = function () {
      for (var i = 0; i < 4; ++i) {
        var x = this.position.x + this.bricks[i].position.x;
        var y = this.position.y + this.bricks[i].position.y;
        grid.bricks.push(new Brick({x:x,y:y}, this.color));
      }
    };

    this.rotate = function () {
      var new_bricks = [];
      this.bricks.forEach(function (brick) {
        new_bricks.push(new Brick({x: -brick.position.y + this.center.y + this.center.x, y: brick.position.x - this.center.x + this.center.y})); // maths!
      }, this);
      var obstructed;
      new_bricks.forEach(function (brick) {
        var x = brick.position.x + this.position.x;
        var y = brick.position.y + this.position.y;
        if (x > 9 || x < 0 || y > 21 || y < 0)
          obstructed = true;
        if (grid.bricks.some(function (brick) {return brick.position.x == x && brick.position.y == y}))
          obstructed = true;
      }, this);
      if (!obstructed) {
        this.bricks = new_bricks;
      }
    };
  }
  return Tetromino;
}

module.exports = loader;
