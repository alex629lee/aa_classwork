const Util = require("./utils");
const MovingObject = require("./moving_object");

const DEFAULTS = {
  COLOR: "#ffedf5",
  RADIUS: 2,
  SPEED: 5
};

function Bullet (options) {
  options.color = DEFAULTS.COLOR;
  options.radius = DEFAULTS.RADIUS;
  
  options.vel = Util.scale(options.vel, DEFAULTS.SPEED);
  MovingObject.call(this, options); 
  this.game = options.game;

  this.collideWith = function (otherObject) {
    // this.game.remove(otherObject);
    // this.game.remove(this);
    console.log("BULLET COLLIDEWITH");
    if (otherObject === this.game.ship) {
      return null
    } else {
      this.game.remove(otherObject);
    }
  }

  this.move = function () {
    let newX = this.pos[0] + this.vel[0];
    let newY = this.pos[1] + this.vel[1];
    this.pos = [newX, newY];
    if (newX > 1000 || newY > 600) {
      for (let i = 0; i < this.game.bullets.length; i++) {
        if (this.game.bullets[i] === this) {
          this.game.bullets.splice(i,1);
          return null; 
        }
      }
    } else if (newX < 0 || newY < 0) {
      for (let j = 0; j < this.game.bullets.length; j++) {
        if (this.game.bullets[j] === this) {
          this.game.bullets.splice(j, 1);
          return null;
        }
      }
    }
  }
}

Util.inherits(Bullet, MovingObject);

module.exports = Bullet;

