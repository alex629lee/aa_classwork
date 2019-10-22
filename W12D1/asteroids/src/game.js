const Util = require("./utils.js");
const Asteroid = require("./asteroid.js");
const Ship = require("./ship.js");
const Bullet = require("./bullet.js");

function Game (canvas) {
  this.ctx = canvas.getContext("2d");
  this.asteroids = [];
  this.addAsteroids();
  this.addShip();
  this.bullets = [];
}

Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 10;



Game.prototype.addAsteroids = function () {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    let randomPos = this.randomPosition();
    let newAsteroid = new Asteroid({pos: randomPos, game: this});
    this.asteroids.push(newAsteroid);
  }
}

Game.prototype.addShip = function () {
  let randomPos = this.randomPosition();
  let newShip = new Ship({pos: randomPos, game: this});
  this.ship = newShip;
}

Game.prototype.allObjects = function () {
  let allObjs = [...this.asteroids]; 
  allObjs.push(this.ship);
  if (this.bullets.length > 0) {
    this.bullets.forEach (bullet => {
      allObjs.push(bullet);
    })
  }
  return allObjs;
}

Game.prototype.addBullet = function (bullet) {
  this.bullets.push(bullet);
}

Game.prototype.remove = function (asteroid) {
  if (this.ship === asteroid) {
    console.log("RELOCATING");
    this.ship.pos = this.randomPosition();
    this.ship.vel = [0,0];
  } 
  
}

Game.prototype.randomPosition = function () {
  return [Game.DIM_X * Math.random(), Game.DIM_Y * Math.random()];
}

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
  let allObjects = this.allObjects();
  allObjects.forEach(object => {
    object.draw(this.ctx);
  })
}

Game.prototype.moveObjects = function () {
  let allObjects = this.allObjects();
  allObjects.forEach(object => {
    object.move();
  })
}

Game.prototype.wrap = function (pos) {
  //returns a "wrapped position"
  let x = pos[0];
  let y = pos[1]; 
  if (x < 0) {
    x = Game.DIM_X - (x % Game.DIM_X);
  } else if (x > Game.DIM_X) {
    x = (x % Game.DIM_X);
  } 
  if (y < 0) {
    y = Game.DIM_Y - (y % Game.DIM_Y);
  } else if (y > Game.DIM_Y) {
    y = (y % Game.DIM_Y);
  }
  return [x, y];
}

Game.prototype.checkCollisions = function () {
  let allObjects = this.allObjects();
  for (let i = 0; i < allObjects.length - 1; i++) {
    for (let j = i + 1; j < allObjects.length; j++) {
      let object1 = allObjects[i];
      let object2 = allObjects[j]; 
      if (object1.isCollidedWith(object2)) {
        // alert("COLLISION");
        // continue;
        if (object1 === this.ship && this.bullets.includes(object2)) {
          continue 
        } else if (object2 === this.ship && this.bullets.includes(object1)) {
          continue 
        } else {
          object1.collideWith(object2);
        }
      }
    }
  }
}

Game.prototype.step = function () {
  this.moveObjects(); 
  this.checkCollisions();
}


module.exports = Game;