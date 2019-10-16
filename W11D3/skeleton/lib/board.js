let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  let grid = [];
  for (let i = 0; i < 8; i++) {
    let row = new Array(8);
    grid.push(row);   
  }
  grid[3][3] = new Piece('white');
  grid[4][4] = new Piece('white');
  grid[3][4] = new Piece('black');
  grid[4][3] = new Piece('black');

  return grid;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  let x = pos[0];
  let y = pos[1]; 
  if (!(x >= 0 && x <= 7)) {
    throw new Error("boxes are for squares, go play outside you triangle");
  } else if (!(y >= 0 && y <= 7)) {
    throw new Error("invalid position");
  };

  let piece = this.grid[x][y];
  return piece;
};

/**
 * Checks if there are any valid moves for the given color.
 * 
 */
Board.prototype.hasMove = function (color) {
  let grid = this.grid;
  if (this.validMoves(color).length > 0) {
    return true;
  } else {
    return false;
  }
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  let piece = this.getPiece(pos);
  
  return (piece && piece.color === color);
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  if (this.getPiece(pos)) {
    return true;
  } else {
    return false;
  }
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  if (this.hasMove('white') || this.hasMove('black')) {
    return false;
  } else {
    return true;
  }
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  let x = pos[0];
  let y = pos[1]; 
  if (!(x >= 0 && x <= 7)) {
    return false;
  } else if (!(y >= 0 && y <= 7)) {
    return false;
  };
  return true;
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns null if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns null if it hits an empty position.
 *
 * Returns null if no pieces of the opposite color are found.
 */
function _positionsToFlip (board, pos, color, dir, piecesToFlip) {
  if (piecesToFlip) {
    piecesToFlip.push(pos);
  } else {
    piecesToFlip = [];
  }
  let nextPos = [(pos[0] + dir[0]), (pos[1] + dir[1])];
  if (!board.isValidPos(nextPos)) {
    return null;
  } else if (!board.isOccupied(nextPos)) {
    return null; 
  } else if (board.isMine(nextPos, color)) {
    if (piecesToFlip.length > 0) {
      return piecesToFlip;
    } else {
      return null;
    }
  } else {
    return _positionsToFlip(board, nextPos, color, dir, piecesToFlip);
  }
}

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  if (!this.validMove(pos, color)) {
    throw new Error("Not valid move");
  }
  let allPositions = [];
  for(let i = 0; i < Board.DIRS.length; i++) {
    let positions = (_positionsToFlip(this, pos, color, Board.DIRS[i]));
    if (positions) {
      for (let j = 0; j < positions.length; j++) {
        allPositions.push(positions[j]);
      }
    }
  };
  allPositions.forEach(pos => {
    this.getPiece(pos).color = color;
  });
  x = pos[0];
  y = pos[1];

  this.grid[x][y] = new Piece(color);
}




/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
  let grid = this.grid;
  // grid.forEach(row => {
  //   for()
  //   let array = [];
  //   row.forEach(col => {
      
  //   });
  // });
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if (this.isOccupied(pos)) {
    return false;
  } 

  for(let i = 0; i < Board.DIRS.length; i++) {
    if(_positionsToFlip(this, pos, color, Board.DIRS[i])) {
      return true;
    }
  }
  return false;
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  let valMoves = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (!this.isOccupied([i, j]) && this.validMove([i, j], color)) {
        valMoves.push([i, j]);  
      }
    }
  }
  return valMoves;
};

module.exports = Board;
