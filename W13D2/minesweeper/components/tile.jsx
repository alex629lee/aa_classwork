import React from 'react';

class Tile extends React.Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const flagged = e.altKey ? true : false;
    this.props.updateGame(this.props.tile, flagged);
  }

  render () {
    let text, klass;
    if (this.props.tile.explored === true) {
      if (this.props.tile.bombed) {
        text = '\ud83d\udca3';
        klass = "bombed";
      } else{
        klass = "explored";
        let bombs = this.props.tile.adjacentBombCount();
        text = bombs > 0 ? `${bombs}` : "";
      }
    } else if (this.props.tile.flagged) {
      klass = "flagged";
      text = '\u2691';
    } else {
      klass = "unclicked";
      text = "";
    }
    console.log("tile");
    return (
      <div className={klass} onClick={this.handleClick}>{text}</div>
    );
  }
}
export default Tile;