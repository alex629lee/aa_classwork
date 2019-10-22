/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\nconst DEFAULTS = {\n  COLOR: \"#505050\",\n  RADIUS: 25,\n  SPEED: 4\n};\n\nfunction Asteroid (options) {\n  options.color = DEFAULTS.COLOR;\n  options.radius = DEFAULTS.RADIUS;\n  options.pos = options.pos || options.game.randomPosition();\n  options.vel = Util.randomVec(DEFAULTS.SPEED);\n  // options.game = options.game;\n  MovingObject.call(this, options);\n}\n\n// Asteroid.prototype.collideWith = function(otherObject) {\n//   if (otherObject.isShip()) {\n//     console.log(\"ASTEROID COLLIDEWITH INTO RELOCATE\")\n//     otherObject.relocate();\n//   } else {\n//     MovingObject.call(this, otherObject);\n//   }\n// }\n\nUtil.inherits(Asteroid, MovingObject);\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nconst DEFAULTS = {\n  COLOR: \"#ffedf5\",\n  RADIUS: 2,\n  SPEED: 5\n};\n\nfunction Bullet (options) {\n  options.color = DEFAULTS.COLOR;\n  options.radius = DEFAULTS.RADIUS;\n  \n  options.vel = Util.scale(options.vel, DEFAULTS.SPEED);\n  MovingObject.call(this, options); \n  this.game = options.game;\n\n  this.collideWith = function (otherObject) {\n    // this.game.remove(otherObject);\n    // this.game.remove(this);\n    console.log(\"BULLET COLLIDEWITH\");\n    if (otherObject === this.game.ship) {\n      return null\n    } else {\n      this.game.remove(otherObject);\n    }\n  }\n\n  this.move = function () {\n    let newX = this.pos[0] + this.vel[0];\n    let newY = this.pos[1] + this.vel[1];\n    this.pos = [newX, newY];\n    if (newX > 1000 || newY > 600) {\n      for (let i = 0; i < this.game.bullets.length; i++) {\n        if (this.game.bullets[i] === this) {\n          this.game.bullets.splice(i,1);\n          return null; \n        }\n      }\n    } else if (newX < 0 || newY < 0) {\n      for (let j = 0; j < this.game.bullets.length; j++) {\n        if (this.game.bullets[j] === this) {\n          this.game.bullets.splice(j, 1);\n          return null;\n        }\n      }\n    }\n  }\n}\n\nUtil.inherits(Bullet, MovingObject);\n\nmodule.exports = Bullet;\n\n\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\nconst Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\nconst Bullet = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\");\n\nfunction Game (canvas) {\n  this.ctx = canvas.getContext(\"2d\");\n  this.asteroids = [];\n  this.addAsteroids();\n  this.addShip();\n  this.bullets = [];\n}\n\nGame.DIM_X = 1000;\nGame.DIM_Y = 600;\nGame.NUM_ASTEROIDS = 10;\n\n\n\nGame.prototype.addAsteroids = function () {\n  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {\n    let randomPos = this.randomPosition();\n    let newAsteroid = new Asteroid({pos: randomPos, game: this});\n    this.asteroids.push(newAsteroid);\n  }\n}\n\nGame.prototype.addShip = function () {\n  let randomPos = this.randomPosition();\n  let newShip = new Ship({pos: randomPos, game: this});\n  this.ship = newShip;\n}\n\nGame.prototype.allObjects = function () {\n  let allObjs = [...this.asteroids]; \n  allObjs.push(this.ship);\n  if (this.bullets.length > 0) {\n    this.bullets.forEach (bullet => {\n      allObjs.push(bullet);\n    })\n  }\n  return allObjs;\n}\n\nGame.prototype.addBullet = function (bullet) {\n  this.bullets.push(bullet);\n}\n\nGame.prototype.remove = function (asteroid) {\n  if (this.ship === asteroid) {\n    console.log(\"RELOCATING\");\n    this.ship.pos = this.randomPosition();\n    this.ship.vel = [0,0];\n  } \n  \n}\n\nGame.prototype.randomPosition = function () {\n  return [Game.DIM_X * Math.random(), Game.DIM_Y * Math.random()];\n}\n\nGame.prototype.draw = function (ctx) {\n  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n  ctx.fillStyle = \"black\";\n  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n  let allObjects = this.allObjects();\n  allObjects.forEach(object => {\n    object.draw(this.ctx);\n  })\n}\n\nGame.prototype.moveObjects = function () {\n  let allObjects = this.allObjects();\n  allObjects.forEach(object => {\n    object.move();\n  })\n}\n\nGame.prototype.wrap = function (pos) {\n  //returns a \"wrapped position\"\n  let x = pos[0];\n  let y = pos[1]; \n  if (x < 0) {\n    x = Game.DIM_X - (x % Game.DIM_X);\n  } else if (x > Game.DIM_X) {\n    x = (x % Game.DIM_X);\n  } \n  if (y < 0) {\n    y = Game.DIM_Y - (y % Game.DIM_Y);\n  } else if (y > Game.DIM_Y) {\n    y = (y % Game.DIM_Y);\n  }\n  return [x, y];\n}\n\nGame.prototype.checkCollisions = function () {\n  let allObjects = this.allObjects();\n  for (let i = 0; i < allObjects.length - 1; i++) {\n    for (let j = i + 1; j < allObjects.length; j++) {\n      let object1 = allObjects[i];\n      let object2 = allObjects[j]; \n      if (object1.isCollidedWith(object2)) {\n        // alert(\"COLLISION\");\n        // continue;\n        if (object1 === this.ship && this.bullets.includes(object2)) {\n          continue \n        } else if (object2 === this.ship && this.bullets.includes(object1)) {\n          continue \n        } else {\n          object1.collideWith(object2);\n        }\n      }\n    }\n  }\n}\n\nGame.prototype.step = function () {\n  this.moveObjects(); \n  this.checkCollisions();\n}\n\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function GameView (game, ctx) {\n  this.game = game;\n  this.ctx = ctx;\n  this.ship = this.game.ship;\n}\n\nGameView.KEYS = {\n  w: [0, -1],\n  a: [-1, 0],\n  s: [0, 1],\n  d: [1, 0],\n};\n\nGameView.prototype.start = function () {\n  this.bindKeyHandlers();\n  let that = this;\n  window.setInterval(function () { \n    that.game.step();\n    that.game.draw(that.ctx);\n  }, 20);\n}\n\nGameView.prototype.bindKeyHandlers = function () {\n  const ship = this.ship;\n  console.log(this.ship.__proto__);\n\n  Object.keys(GameView.KEYS).forEach(function (k) {\n    const move = GameView.KEYS[k];\n    key(k, function () { ship.power(move); });\n  });\n  key(\"space\", function () { ship.fireBullet(); });\n}\n\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  \n  const canvasEl = document.getElementById(\"game-canvas\");\n  const ctx = canvasEl.getContext(\"2d\");\n  const game = new Game(canvasEl);\n  canvasEl.width = Game.DIM_X;\n  canvasEl.height = Game.DIM_Y;\n  ctx.fillStyle = \"black\";\n  ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);\n\n  \n  // console.log(game);\n  const view = new GameView(game, ctx);\n  view.start();\n\n  \n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n// const Bullet = require(\"./bullet.js\");\n// const Ship = require(\"./ship.js\");\n\nfunction MovingObject (options) {\n  this.pos = options[\"pos\"];\n  this.vel = options[\"vel\"];\n  this.radius = options[\"radius\"]; \n  this.color = options[\"color\"]; \n  this.game = options[\"game\"];\n}\n\n\nMovingObject.prototype.draw = function (ctx) {\n  ctx.beginPath();\n  ctx.arc(\n    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false\n  );\n  ctx.strokeStyle = this.color;\n  ctx.fillStyle = this.color;\n  ctx.stroke();\n  ctx.fill();\n}\n\n\nMovingObject.prototype.move = function move() {\n  let newX = this.pos[0] + this.vel[0];\n  let newY = this.pos[1] + this.vel[1];\n  this.pos = this.game.wrap([newX, newY]);\n}\n\nMovingObject.prototype.isCollidedWith = function (otherObject) {\n  //collided if dist between center points < sum of radii\n  let center1 = this.pos; \n  let radius1 = this.radius; \n\n  let center2 = otherObject.pos; \n  let radius2 = otherObject.radius;\n\n  //srqt = Math.sqrt(value)\n  let dist = Math.sqrt(((center1[0] - center2[0])**2) + (center1[1] - center2[1])**2);\n  return (dist < (radius1 + radius2));\n}\n\nMovingObject.prototype.collideWith = function(otherObject) {\n  // this.game.remove(otherObject);\n  // this.game.remove(this);\n\n  if (otherObject === this.game.ship) {\n    this.game.remove(otherObject);\n  }\n  if (this === this.game.ship) {\n    this.game.remove(this);\n  }\n}\n\nMovingObject.prototype.power = function(impulse) {\n  this.vel[0] += impulse[0];\n  this.vel[1] += impulse[1];\n}\n\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Bullet = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\");\n\nconst DEFAULTS = {\n  COLOR: \"#ffc2dd\",\n  RADIUS: 15,\n  SPEED: 0\n};\n\nfunction Ship (options) {\n  options.color = DEFAULTS.COLOR;\n  options.radius = DEFAULTS.RADIUS;\n  options.pos = options.pos || options.game.randomPosition();\n  options.vel = Util.randomVec(DEFAULTS.SPEED);\n  this.vel = options.vel;\n  this.pos = options.pos;\n  MovingObject.call(this, options);\n  this.game = options.game;\n\n  this.fireBullet = function () {\n    let newBullet = new Bullet({ vel: this.vel, pos: this.pos, game: this.game });\n    this.game.addBullet(newBullet);\n  }\n}\n\nShip.prototype.power = function (impulse) {\n  this.vel[0] += impulse[0];\n  this.vel[1] += impulse[1];\n}\n\n// Ship.prototype.relocate = function () {\n//   console.log(\"SHIP RELOCATING\");\n//   this.pos = this.game.randomPosition();\n//   this.vel = [0, 0];\n// }\n\nUtil.inherits(Ship, MovingObject);\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n\n  inherits(childClass, parentClass) {\n    let Surrogate = function () {};\n    Surrogate.prototype = parentClass.prototype; \n    childClass.prototype = new Surrogate();\n    childClass.prototype.constructor = childClass;\n  },\n\n\n  randomVec(length) {\n    const deg = 2 * Math.PI * Math.random();\n    return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n  },\n\n\n  // Scale the length of a vector by the given amount.\n  scale(vec, m) {\n    return [vec[0] * m, vec[1] * m];\n  }\n\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ });