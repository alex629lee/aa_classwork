const Util = require("./utils");
const MovingObject = require("./moving_object");
const Bullet = require("./bullet.js");

const DEFAULTS = {
  COLOR: "#ffc2dd",
  RADIUS: 15,
  SPEED: 0
};

function Ship (options) {
  options.color = DEFAULTS.COLOR;
  options.radius = DEFAULTS.RADIUS;
  options.pos = options.pos || options.game.randomPosition();
  options.vel = Util.randomVec(DEFAULTS.SPEED);
  this.vel = options.vel;
  this.pos = options.pos;
  MovingObject.call(this, options);
  this.game = options.game;

  this.fireBullet = function () {
    let newBullet = new Bullet({ vel: this.vel, pos: this.pos, game: this.game });
    this.game.addBullet(newBullet);
  }
}

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
}

// Ship.prototype.relocate = function () {
//   console.log("SHIP RELOCATING");
//   this.pos = this.game.randomPosition();
//   this.vel = [0, 0];
// }

Util.inherits(Ship, MovingObject);

module.exports = Ship;