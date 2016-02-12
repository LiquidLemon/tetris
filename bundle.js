/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

	var game = __webpack_require__(5);

	window.addEventListener("keydown", function (event) {
	  if (event.defaultPrevented)
	    return;
	  if (game.over && event.code == "KeyR") {
	    game.restart();
	    game.over = false;
	  } else {

	    switch (event.code) {
	      case "ArrowRight":
	        game.tetromino.moveRight();
	        break;
	      case "ArrowLeft":
	        game.tetromino.moveLeft();
	        break;
	      case "ArrowDown":
	        game.moveDown(); // additional logic for moving down 
	        break;
	      case "ArrowUp":
	        game.tetromino.rotate();
	        break;
	    }
	  } 

	  game.draw();
	  event.preventDefault();
	}, true);

	game.restart();
	game.draw();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./index.css", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "body {\n  text-align: center;\n}\n#display {\n  border: 1px solid black;\n}\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var game = {};

	game.grid = __webpack_require__(6);
	var Tetromino = __webpack_require__(8)(game.grid);

	game.canvas = document.getElementById('display');
	if (game.canvas.getContext) {
	  game.context = game.canvas.getContext('2d');
	  game.context.font = "16px sans-serif";
	  game.context.textAlign = "center";
	}

	game.moveDown = function () {
	  if (!this.tetromino.moveDown()) {
	    this.score += Math.pow(this.grid.update(), 2);
	    this.tetromino = new Tetromino();
	    if (this.tetromino.obstructed) {
	      this.over = true;
	    }
	  }
	};

	game.draw = function () {
	  this.context.clearRect(0,0,this.canvas.width,this.canvas.height);

	  if (!game.over) {
	    this.grid.bricks.forEach(function (brick) {
	      this.context.fillStyle = brick.color;
	      this.context.fillRect(brick.position.x*16, brick.position.y*16,16,16);
	    }, this);
	    this.context.fillStyle = this.tetromino.color;
	    this.tetromino.bricks.forEach(function (brick) {
	      this.context.fillRect((this.tetromino.position.x+brick.position.x)*16,(this.tetromino.position.y+brick.position.y)*16,16,16);
	    }, this);
	    document.getElementById("score").innerHTML = "Your score is: " + this.score;
	  } else {
	    this.context.fillStyle = "black";
	    var text = [
	      "Press \"R\" to restart",
	      "Score: " + this.score
	    ];
	    text.forEach(function (string, index) {
	      this.context.fillText(string, this.canvas.width / 2, this.canvas.height * ((index + 1) / (text.length + 1)));
	    }, this);
	  }
	};
	game.getInterval = function () {
	  return 1000 - this.score * 4;
	};

	game.restart = function () {
	  this.over = false;
	  this.score = 0;
	  this.grid.clear();
	  this.tetromino = new Tetromino();
	  window.setTimeout(function step(game) {
	    game.moveDown();
	    if(!game.over) 
	      window.setTimeout(step, game.getInterval(), game);
	    game.draw();
	  }, this.getInterval(), this);
	};
	module.exports = game;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Brick = __webpack_require__(7);
	var grid = {};
	grid.bricks = [];

	grid.obstructed = function (position) {
	  return this.bricks.some(function (brick) {
	    return brick.position.x == position.x && brick.position.y == position.y;
	  });
	};
	grid.getRow = function (id) {
	  return this.bricks.filter(function (brick) {
	    if (brick.position.y == id)
	      return true;
	    else
	      return false;
	  });
	}
	grid.removeRow = function (id) {
	  this.bricks = this.bricks.filter(function (brick) {
	    if (brick.position.y == id)
	      return false;
	    return true;
	  });
	};
	grid.moveDown = function (rowsAmount) {
	  this.bricks.forEach(function (brick) {
	    if (brick.position.y < rowsAmount)
	      ++brick.position.y;
	  });
	};
	grid.update = function () {
	  var removedRows = 0;
	  for (var i = 0; i < 22; ++i) {
	    if (this.getRow(i).length == 10) {
	      ++removedRows;
	      this.removeRow(i);
	      this.moveDown(i);
	    }
	  }
	  return removedRows;
	};
	grid.clear = function () {
	  this.bricks = new Array();
	};
	module.exports = grid;


/***/ },
/* 7 */
/***/ function(module, exports) {

	var Brick = function (position, color) {
	  this.position = position;
	  this.color = color;
	};
	module.exports = Brick;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Brick = __webpack_require__(7);

	function loader (grid) {
	  var pool = ["o", "i", "t", "s", "z", "j", "l"];

	  function Tetromino () {
	    if (pool.length === 0)
	      pool = ["o", "i", "t", "s", "z", "j", "l"];

	    var type = pool[Math.floor(pool.length * Math.random())];
	    pool.splice(pool.indexOf(type), 1);

	    this.bricks = [];
	    switch (type) {
	      case "i":
	      case "I":
	        this.color = "cyan";
	        this.position = {x:3, y:0};
	        this.center = {x:1.5, y:0.5};
	        this.bricks.push(
	            new Brick({x:0, y:0}),
	            new Brick({x:1, y:0}),
	            new Brick({x:2, y:0}),
	            new Brick({x:3, y:0})
	        );
	        break;
	      case "o":
	      case "O":
	        this.color = "yellow";
	        this.position = {x:4, y:0};
	        this.center = {x: 0.5, y: 0.5};
	        this.bricks.push(
	            new Brick({x:0,y:0}),
	            new Brick({x:1,y:0}),
	            new Brick({x:0,y:1}),
	            new Brick({x:1,y:1})
	        );
	        break;
	      case "t":
	      case "T":
	        this.color = "purple";
	        this.position = {x:3, y:0};
	        this.center = {x:1,y:1};
	        this.bricks.push(
	            new Brick({x:1,y:0}),
	            new Brick({x:0,y:1}),
	            new Brick({x:1,y:1}),
	            new Brick({x:2,y:1})
	        );
	        break;
	      case "s":
	      case "S":
	        this.color = "green";
	        this.position = {x:3, y:0};
	        this.center = {x:1, y:1};
	        this.bricks.push(
	            new Brick({x:1,y:0}),
	            new Brick({x:2,y:0}),
	            new Brick({x:0,y:1}),
	            new Brick({x:1,y:1})
	        );
	        break;
	      case "z":
	      case "Z":
	        this.color = "red";
	        this.position = {x:3, y:0};
	        this.center = {x:1, y:1};
	        this.bricks.push(
	            new Brick({x:0,y:0}),
	            new Brick({x:1,y:0}),
	            new Brick({x:1,y:1}),
	            new Brick({x:2,y:1})
	        );
	        break;
	      case "j":
	      case "J":
	        this.color = "blue";
	        this.position = {x:3, y:0};
	        this.center = {x:1, y:1};
	        this.bricks.push(
	            new Brick({x:0,y:0}),
	            new Brick({x:0,y:1}),
	            new Brick({x:1,y:1}),
	            new Brick({x:2,y:1})
	        );
	        break;
	      case "l":
	      case "L":
	        this.color = "orange";
	        this.position = {x:3, y:0};
	        this.center = {x:1, y:1};
	        this.bricks.push(
	            new Brick({x:2, y:0}),
	            new Brick({x:0, y:1}),
	            new Brick({x:1, y:1}),
	            new Brick({x:2, y:1})
	        );
	        break;
	    }

	    if (this.bricks.some(function (brick) { 
	      var x = brick.position.x + this.position.x;
	      var y = brick.position.y + this.position.y;
	      return grid.obstructed({x: x, y: y}); 
	    }, this)) {
	      this.obstructed = true;
	    }
	    
	    this.canMove = function (direction) {
	      direction.x = direction.x | 0;
	      direction.y = direction.y | 0;
	      for (var i = 0; i < 4; ++i) {
	        var x = this.position.x + this.bricks[i].position.x + direction.x;
	        var y = this.position.y + this.bricks[i].position.y + direction.y;
	        //check if in bounds
	        if (x > 9 || x < 0 || y > 21 || y < 0)
	          return false;
	        //check if not obstructed
	        if (grid.bricks.some(function (brick) {return brick.position.x == x && brick.position.y == y}))
	          return false;
	      }
	      return true;
	    };

	    this.moveRight = function () {
	      if (this.canMove({x: 1}))
	        this.position.x += 1;
	    };

	    this.moveLeft = function () {
	      if (this.canMove({x: -1}))
	        this.position.x -= 1;
	    };

	    this.moveDown = function () {
	      if (this.canMove({y: 1})) {
	        this.position.y += 1;
	      } else {
	        this.fill();
	        return false;
	      }
	      return true;
	    };

	    this.fill = function () {
	      for (var i = 0; i < 4; ++i) {
	        var x = this.position.x + this.bricks[i].position.x;
	        var y = this.position.y + this.bricks[i].position.y;
	        grid.bricks.push(new Brick({x:x,y:y}, this.color));
	      }
	    };

	    this.rotate = function () {
	      var new_bricks = [];
	      this.bricks.forEach(function (brick) {
	        new_bricks.push(new Brick({x: -brick.position.y + this.center.y + this.center.x, y: brick.position.x - this.center.x + this.center.y})); // maths!
	      }, this);
	      var obstructed;
	      new_bricks.forEach(function (brick) {
	        var x = brick.position.x + this.position.x;
	        var y = brick.position.y + this.position.y;
	        if (x > 9 || x < 0 || y > 21 || y < 0)
	          obstructed = true;
	        if (grid.bricks.some(function (brick) {return brick.position.x == x && brick.position.y == y}))
	          obstructed = true;
	      }, this);
	      if (!obstructed) {
	        this.bricks = new_bricks;
	      }
	    };
	  }
	  return Tetromino;
	}

	module.exports = loader;


/***/ }
/******/ ]);