const Util = require("./utils.js");
// const Bullet = require("./bullet.js");
// const Ship = require("./ship.js");

function MovingObject (options) {
  this.pos = options["pos"];
  this.vel = options["vel"];
  this.radius = options["radius"]; 
  this.color = options["color"]; 
  this.game = options["game"];
}


MovingObject.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false
  );
  ctx.strokeStyle = this.color;
  ctx.fillStyle = this.color;
  ctx.stroke();
  ctx.fill();
}


MovingObject.prototype.move = function move() {
  let newX = this.pos[0] + this.vel[0];
  let newY = this.pos[1] + this.vel[1];
  this.pos = this.game.wrap([newX, newY]);
}

MovingObject.prototype.isCollidedWith = function (otherObject) {
  //collided if dist between center points < sum of radii
  let center1 = this.pos; 
  let radius1 = this.radius; 

  let center2 = otherObject.pos; 
  let radius2 = otherObject.radius;

  //srqt = Math.sqrt(value)
  let dist = Math.sqrt(((center1[0] - center2[0])**2) + (center1[1] - center2[1])**2);
  return (dist < (radius1 + radius2));
}

MovingObject.prototype.collideWith = function(otherObject) {
  // this.game.remove(otherObject);
  // this.game.remove(this);

  if (otherObject === this.game.ship) {
    this.game.remove(otherObject);
  }
  if (this === this.game.ship) {
    this.game.remove(this);
  }
}

MovingObject.prototype.power = function(impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
}


module.exports = MovingObject;