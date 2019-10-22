const Util = require("./utils.js");
const MovingObject = require("./moving_object");
const Ship = require('./ship');

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 25,
  SPEED: 4
};

function Asteroid (options) {
  options.color = DEFAULTS.COLOR;
  options.radius = DEFAULTS.RADIUS;
  options.pos = options.pos || options.game.randomPosition();
  options.vel = Util.randomVec(DEFAULTS.SPEED);
  // options.game = options.game;
  MovingObject.call(this, options);
}

// Asteroid.prototype.collideWith = function(otherObject) {
//   if (otherObject.isShip()) {
//     console.log("ASTEROID COLLIDEWITH INTO RELOCATE")
//     otherObject.relocate();
//   } else {
//     MovingObject.call(this, otherObject);
//   }
// }

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;