var Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  var grid = Array(8);
  var i;
  for (i = 0; i < grid.length; i++) {
    grid[i] = ["*", "*", "*", "*", "*", "*", "*", "*"];
  }
  grid[3][4] = new Piece("black");
  grid[4][3] = new Piece("black");
  grid[3][3] = new Piece("white");
  grid[4][4] = new Piece("white");

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
  if (this.isValidPos(pos)) {
    return this.grid[pos[0]][pos[1]];
  } else {
    console.log("Position invalid");
    return undefined;
  }
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  var i;
  var j;
  var pos;
  var movePos;
  var moveBool = false;
  var b = this;
  var eachCallback = function(dir) {
    movePos = [i + dir[0], j + dir[1]];
    if ( b.isValidPos(movePos) && !b.isOccupied(movePos)) {
      moveBool = true;
      console.log(movePos);
      console.log("FLIPPED " + moveBool);
    }
  };
  console.log(Board.DIRS);
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      if (moveBool === true) {
        return true;
      } else {
        pos = [i, j];
        if ( this.getPiece(pos) != "*" ) {
          if ( !this.isMine(pos, color) ) {
            console.log(pos);
            Board.DIRS.forEach(function(dir) {
              eachCallback(dir);
            });
          }
        }
      }
    }
  }
  return moveBool;
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  if (this.getPiece(pos) !== undefined) {
    if (this.getPiece(pos).pieceColor === color) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  if (this.grid[pos[0]][pos[1]] === "*") {
    return false;
  } else {
    return true;
  }
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  if (pos[0] >= 0 && pos[0] <= 7 && pos[1] >= 0 && pos[1] <= 7) {
    return true;
  } else {
    return false;
  }
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
  var newPos = [pos[0] + dir[0], pos[1] + dir[1]];
  if ( board.isValidPos(pos) && board.isOccupied(pos) ) {
    if ( board.isMine(pos, color) ) {
      return piecesToFlip;
    } else {
      piecesToFlip.push(board.getPiece(pos));
      return _positionsToFlip(board, newPos, color, dir, piecesToFlip);
    }
  } else {
    return null;
  }
}

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {

};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
  var row;
  for (i = 0; i < 8; i++) {
    row = [];
    for (j = 0; j < 8; j++) {
      row.push(this.grid[i][j].toString());
    }
    console.log(row);
  }
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
};

boord = new Board();
//
boord.grid[3][5] = new Piece("white");
boord.print();
// console.log(boord.getPiece([3,4]).toString());
// console.log(boord.getPiece([3,3]).toString());
// console.log(boord.getPiece([3,5]).toString());
// console.log(_positionsToFlip(boord, [3,4], "white", [0,1] , []));
// console.log(_positionsToFlip(boord, [4,3], "black", [1,0] , []));

module.exports = Board;
