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

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Game {\n  constructor() {\n    this.towers = [[3, 2, 1], [], []];\n  }\n\n  isValidMove(startTowerIdx, endTowerIdx) {\n      const startTower = this.towers[startTowerIdx];\n      const endTower = this.towers[endTowerIdx];\n\n      if (startTower.length === 0) {\n        return false;\n      } else if (endTower.length == 0) {\n        return true;\n      } else {\n        const topStartDisc = startTower[startTower.length - 1];\n        const topEndDisc = endTower[endTower.length - 1];\n        return topStartDisc < topEndDisc;\n      }\n  }\n\n  isWon() {\n      // move all the discs to the last or second tower\n      return (this.towers[2].length == 3) || (this.towers[1].length == 3);\n  }\n\n  move(startTowerIdx, endTowerIdx) {\n      if (this.isValidMove(startTowerIdx, endTowerIdx)) {\n        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());\n        return true;\n      } else {\n        return false;\n      }\n  }\n\n  print() {\n      console.log(JSON.stringify(this.towers));\n  }\n\n  promptMove(reader, callback) {\n      this.print();\n      reader.question(\"Enter a starting tower: \", start => {\n        const startTowerIdx = parseInt(start);\n        reader.question(\"Enter an ending tower: \", end => {\n          const endTowerIdx = parseInt(end);\n          callback(startTowerIdx, endTowerIdx);\n        });\n      });\n  }\n\n  run(reader, gameCompletionCallback) {\n      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {\n        if (!this.move(startTowerIdx, endTowerIdx)) {\n          console.log(\"Invalid move!\");\n        }\n\n        if (!this.isWon()) {\n          // Continue to play!\n          this.run(reader, gameCompletionCallback);\n        } else {\n          this.print();\n          console.log(\"You win!\");\n          gameCompletionCallback();\n        }\n      });\n  }\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/hanoiView.js":
/*!**************************!*\
  !*** ./src/hanoiView.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class HanoiView {\n\n  constructor (game, $el) {\n    this.$el = $el; \n    this.game = game; \n    this.setupTowers();\n    this.bindEvents();\n    this.render();\n    this.startTower = null;\n  }\n\n  setupTowers() {\n    for (let i = 1; i < 4; i++) {\n      let $ul = $(\"<ul>\");\n      $ul.attr(\"pos\", i);\n      for (let j = 1; j < 4; j++) {\n        let $li = $(\"<li>\");\n        $li.attr(\"pos\", [i,j]);  // setting attribute: attr(name, value);\n        $ul.append($li);\n      }\n      this.$el.append($ul);\n    }\n    console.log(this.game.towers);\n  }\n\n  bindEvents() {\n    this.$el.on(\"click\", \"ul\", event => {\n      console.log($(event.currentTarget))\n      let $currentTarget = $(event.currentTarget);\n      this.clickTower($currentTarget);\n    })\n  }\n\n  clickTower(target) {\n    let pos = target.attr(\"pos\"); \n    console.log(pos-1);\n    if (this.startTower === null) {\n      this.startTower = pos-1;\n      target.addClass(\"checked\");\n    } else {\n      let endTower = pos-1;\n      this.game.move(this.startTower, endTower);\n      console.log(this.game.towers);\n      this.startTower = null;\n      this.render();\n    }\n  }\n\n  render() {\n    let towers = this.game.towers;\n    console.log(this.game.towers);\n    let $lis = $(\"li\");\n\n    $lis.each(function(index, value) {\n      let $el = $(value);\n      if ($el.hasClass(\"disc-1\")) {\n        $el.removeClass(\"disc-1\");\n      } else if ($el.hasClass(\"disc-2\")) {\n        $el.removeClass(\"disc-2\");\n      } else if ($el.hasClass(\"disc-3\")) {\n        $el.removeClass(\"disc-3\");\n      } \n    })\n\n    $(\"ul\").each(function(index, value) {\n      let $tower = $(value);\n      if ($tower.hasClass(\"checked\") && !this.startPos) {\n        $tower.removeClass(\"checked\");\n      }\n    })\n\n    $lis.each(function(index, value) {\n      let pos = $(value).attr(\"pos\");\n      let i = parseInt(pos[0]);\n      let j = parseInt(pos[2]);\n      if (towers[i-1].includes(j)) {\n        $(value).addClass(`disc-${j}`)\n      }\n    }); \n\n    if (this.game.isWon()) {\n      alert(\"YOU WIN :)\");\n    }\n  }\n}\n\nmodule.exports = HanoiView;\n\n//# sourceURL=webpack:///./src/hanoiView.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const HanoiView = __webpack_require__(/*! ./hanoiView.js */ \"./src/hanoiView.js\");\nconst HanoiGame = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\n$(() => {\n  const rootEl = $('.hanoi');\n  // console.log($('hanoi'))\n  const game = new HanoiGame();\n  new HanoiView(game, rootEl);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });