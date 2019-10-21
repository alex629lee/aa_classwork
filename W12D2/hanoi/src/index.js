const HanoiView = require("./hanoiView.js");
const HanoiGame = require("./game.js");

$(() => {
  const rootEl = $('.hanoi');
  // console.log($('hanoi'))
  const game = new HanoiGame();
  new HanoiView(game, rootEl);
});