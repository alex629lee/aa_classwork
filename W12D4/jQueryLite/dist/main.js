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

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DomNodeCollection {\n\n  constructor(array) {\n    this.nodesArray = array;\n  }\n\n\n  html(str) {\n    if (str) {\n      this.nodesArray.forEach( node => node.innerHTML = str );\n    } else if (this.nodesArray.length > 0) {\n      return this.nodesArray[0].innerHTML;\n    }\n  }\n\n  empty() {\n    this.nodesArray.forEach( node => node.innerHTML = \"\" );\n  }\n\n  append(ele) {\n    if (typeof ele === \"string\") {\n      this.nodesArray.forEach( node => node.innerHTML += ele )\n    } else if (ele instanceof DomNodeCollection) {\n      this.nodesArray.forEach ( node => {\n        ele.forEach( childNode => {\n          node.appendChild(childNode.cloneNode(true))\n        })\n      })\n    } else if (typeof ele === \"object\" && !(ele instanceof DomNodeCollection)) {\n      ele = $l(ele);\n    }\n  }\n\n  attr(key, val) {\n    if (val) {\n      return this.nodesArray.forEach( node => node.setAttribute(key, val) );\n    } else {\n      return this.nodesArray[0].getAttribute(key);\n    }\n  }\n\n\n  addClass(className) {\n    this.nodesArray.forEach( node => node.classList.add(className));\n  }\n\n\n  removeClass(className) {\n    this.nodesArray.forEach( node => node.classList.remove(className) );\n  }\n\n\n  children() {\n    let newArr = [];\n    this.nodesArray.forEach(node => {\n      let childNodes = Array.from(node.children);\n      newArr.concat(childNodes);\n    })\n    return new DomNodeCollection(newArr);\n\n  }\n\n  parent() {\n    let newArr = [];\n    this.nodesArray.forEach(node => {\n      let parentNode = Array.from(node.parentNode);\n      newArr.concat(parentNode);\n    })\n    return new DomNodeCollection(newArr);\n  }\n\n\n  find(selector) {\n    let newArr = [];\n    this.nodesArray.forEach( node => {\n      newArr.concat(Array.from(node.querySelectorAll(selector)));\n    } )\n    return new DomNodeCollection(newArr);\n  }\n\n  remove() {\n    this.nodesArray.forEach( node => {\n      node.parentNode.removeChild(node)\n    } )\n  }\n\n\n  on(e, cb) {\n    this.nodesArray.forEach(node => {\n      node.addEventListener(e, cb);\n      node.cb = cb;\n    })\n  }\n\n  off(e) {\n    this.nodesArray.forEach( node => {\n      node.removeEventListener(e, node.cb)\n    } )\n  }\n}\n\n\nmodule.exports = DomNodeCollection;\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DomNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./src/dom_node_collection.js\");\n\nconst _afterReadyCbs = [];\nlet _isReady = false;\n\nwindow.$l = function (arg) {\n  if (arg instanceof HTMLElement) {\n    return new DomNodeCollection(Array.from(arg))\n  }\n  if (typeof(arg) === \"function\") {\n\n    return storeCallback(arg);\n  }\n}\n\n$l.extend = function (mainObj, ...otherObjs) {\n  let objs = Array.from(otherObjs);\n  objs.forEach(obj => {\n    let keys = Object.keys(obj);\n    keys.forEach(key => {\n      mainObj.key = obj.key;\n    })\n  })\n  return mainObj;\n}\n\nconst defaultOptions = {\n  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',\n  success: () => {},\n  error: () => {},\n  url: \"\",\n  method: \"GET\",\n  data: {}\n}\n\n$l.ajax = function (options) {\n  options = $l.extend(defaultOptions, options);\n\n  const xhr = new XMLHttpRequest();\n  xhr.open(options.method, options.url);\n\n  xhr.onload = function () {\n    if(xhr.status === 200) {\n      options.success(xhr.response);\n    } else {\n      options.error(xhr.response);\n    }\n  }\n  xhr.send(JSON.parse(options.data));\n}\n\n\nstoreCallback = func => {\n  if (!_isReady) {\n    _afterReadyCbs.push(func);\n  } else {\n    func();\n    $(() => alert(\"the document is ready\"));\n  }\n};\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  _isReady = true;\n  _afterReadyCbs.forEach(func => func());\n});\n\n\ngetDomNodes = (selector) => {\n  const nodeList = document.querySelectorAll(selector);\n  const nodeListArray = Array.from(nodeList);\n  return new DomNodeCollection(nodeListArray);\n};\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });