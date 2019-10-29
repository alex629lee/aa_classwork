import React from "react";
import Board from "./board";
import * as Minesweeper from '../minesweeper';

class Game extends React.Component {
  constructor (props) {
    super(props)

    const board = new Minesweeper.Board(8, 10);
    this.state = {board: board};
    this.updateGame = this.updateGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }


  restartGame() {
    const board = new Minesweeper.Board(8, 10);
    this.setState({ board: board});
    // console.log(this.state.board.won() || this.state.board.lost());
  }

  updateGame (tile, flagged) {
    if (flagged) {
      tile.toggleFlag();
    } else {
      tile.explore();
    }
    this.setState({board: this.state.board});
  }

  render () {
    let newgame;
    if (this.state.board.won() || this.state.board.lost()) {
      const text = this.state.board.won() ? "You win!!!" : "You lost!!!";
      newgame = 
        <div className="screen">
          <div className="box"> 
            <p>{text}</p>
            <button onClick={this.restartGame}>Play Again</button>
          </div>
        </div>
    }

    return (
      <div className="game">
        {newgame}
        <Board board={this.state.board} updateGame={this.updateGame}/>
      </div>
    );
  }
}

export default Game;