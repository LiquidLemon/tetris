var canvas = document.getElementById('display');
if (canvas.getContext) {
  var context = canvas.getContext('2d');
}
function draw(grid, tetromino) {
  context.clearRect(0,0,canvas.width,canvas.height);

  grid.bricks.forEach(function (brick) {
    context.fillStyle = brick.color;
    context.fillRect(brick.position.x*16, brick.position.y*16,16,16);
  });
  context.fillStyle = tetromino.color;
  tetromino.bricks.forEach(function (brick) {
    context.fillRect((tetromino.position.x+brick.position.x)*16,(tetromino.position.y+brick.position.y)*16,16,16);
  });
}
module.exports = draw;
