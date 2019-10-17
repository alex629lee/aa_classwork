const Board = require("./board");

class Game {
  constructor(player1, player2) {
    this.board = new Board();
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = player1;
  }

  run(reader, completionCallback) {
    this.completionCallback = completionCallback;
    this.reader = reader;
    // while (!this.board.over()) {
    this.getMove(reader, this.playMove.bind(this));
    // }

    // if (this.board.won()[0]) {
    //   console.log(`${this.board.winner()} is the winner!`);
    // } else {
    //   console.log("Game is a tie.")
    // }

    // completionCallback();
  }

  swapTurns() {
    this.currentPlayer = (this.currentPlayer === this.player1) ? this.player2 : this.player1;
  }

  getMove(reader, callback) {
    console.clear();
    this.board.print();
    console.log(`It is ${this.currentPlayer.name}'s turn!`);

    reader.question('Enter an x coordinate: ', xStr => {
      console.log("Got the input")
      const x = parseInt(xStr);
      reader.question('Enter a y coordinate: ', yStr => {
        const y = parseInt(yStr);
        let pos = [x, y];
        callback(pos);
      });
    });
  } 

  playMove(pos) {
    this.board.placeMark(pos, this.currentPlayer.mark);
    this.swapTurns();
    if (!this.board.over()) {
      this.getMove(this.reader, this.playMove.bind(this));
    } else {    
      if (this.board.won()[0]) {
        console.clear();
        this.board.print();
        console.log(`${this.board.winner()} is the winner!`);
      } else {
        console.log("Game is a tie.")
      }

      this.completionCallback();
    }
  }
}


module.exports = Game;