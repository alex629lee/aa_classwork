const Game = require('./game');
const GameView = require('./game_view');

document.addEventListener("DOMContentLoaded", function () {
  
  const canvasEl = document.getElementById("game-canvas");
  const ctx = canvasEl.getContext("2d");
  const game = new Game(canvasEl);
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

  
  // console.log(game);
  const view = new GameView(game, ctx);
  view.start();

  
});
