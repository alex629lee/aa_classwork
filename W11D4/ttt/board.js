class Board {
  constructor() {
    this.grid = this.constructGrid();
  }

  constructGrid() {
    const grid = [];

    for (let i = 0; i < 3; i++) {
      grid.push([]);
      for (let j = 0; j < 3; j++) {
        grid[i].push(null);
      }
    }
    return grid;
  }

  won() {
    const winningCombos = [
      [[0,0], [1,0], [2,0]],
      [[0,1], [1,1], [2,1]],
      [[0,2], [1,2], [2,2]],
      [[0,0], [0,1], [0,2]],
      [[1,0], [1,1], [1,2]],
      [[2,0], [2,1], [2,2]],
      [[0,0], [1,1], [2,2]],
      [[2,0], [1,1], [0,2]]
    ]

    for(let i = 0; i < winningCombos.length; i++) {
      let combo = winningCombos[i];
      if (this.getMark(combo[0]) === this.getMark(combo[1]) && 
      this.getMark(combo[1]) === this.getMark(combo[2])) {
        let mark = this.getMark(combo[0]);
        return [true, mark];
      }
    }

    return [false, null];
  }

  getMark(pos) {
    return this.grid[pos[0]][pos[1]]
  }

  winner() {
    let winnerParams = this.won();
    if (winnerParams[0]) {
      return winnerParams[1];
    }

    return null;
  }

  empty(pos) {
    
    if (!this.validPos(pos)) {
      throw new Error('Invalid position!')
    }

    return (this.grid[pos[0]][pos[1]] === null);
  }

  validPos(pos) {
    return ((pos[0] >= 0) && (pos[0] < 3) && (pos[1] >= 0) && (pos[1] < 3));
  }

  placeMark(pos, mark) {
    if (!this.empty(pos)) {
      throw new Error('Not an empty position!')
    }

    this.grid[pos[0]][pos[1]] = mark;
  }

  over() {
    if (this.winner() !== null) {
      return true;
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.empty([i, j])) {
          return false;
        }
      }
    }

    return true;
  }

  print() {
    const rows = [[], [], []];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let mark = this.grid[i][j] ? this.grid[i][j] : " ";
        rows[i].push(mark);
      }
    }

    console.log(rows[0]);
    console.log(rows[1]);
    console.log(rows[2]);
  }
}
module.exports = Board;

// board = new Board();
// board.placeMark([0,0], 'x');
// board.placeMark([2,2], 'o');
// board.placeMark([0, 1], 'x');
// board.placeMark([0, 2], 'x');
// board.print();
// console.log(board.over());
// console.log(board.winner());