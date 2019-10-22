function GameView (game, ctx) {
  this.game = game;
  this.ctx = ctx;
  this.ship = this.game.ship;
}

GameView.KEYS = {
  w: [0, -1],
  a: [-1, 0],
  s: [0, 1],
  d: [1, 0],
};

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  let that = this;
  window.setInterval(function () { 
    that.game.step();
    that.game.draw(that.ctx);
  }, 20);
}

GameView.prototype.bindKeyHandlers = function () {
  const ship = this.ship;
  console.log(this.ship.__proto__);

  Object.keys(GameView.KEYS).forEach(function (k) {
    const move = GameView.KEYS[k];
    key(k, function () { ship.power(move); });
  });
  key("space", function () { ship.fireBullet(); });
}


module.exports = GameView;