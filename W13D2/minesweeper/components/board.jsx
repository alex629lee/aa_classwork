import Tile from './tile';
import React from 'react';

class Board extends React.Component {

  constructor(props) {
    super(props);

    this.renderRows = this.renderRows.bind(this);
    this.renderTiles = this.renderTiles.bind(this);
  }

  renderRows() {
    let board = this.props.board;
    return board.grid.map((row, i) => {
      return (
        <div className="row" key={`row-${i}`}> 
          {this.renderTiles(row, i)}
        </div>
      )
    });
  }

  renderTiles(row, i) {
    return row.map((el, j) => {
      return (
        <Tile 
          updateGame={this.props.updateGame} 
          tile={el} 
          key={(i*this.props.board.gridSize) + j}
        />       
      )
    })
  }

  render() {
   const board = this.props.board;
   return (
   <div id="board">
      {this.renderRows()}
   </div>
   )
  };
}

export default Board;