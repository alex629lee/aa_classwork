class View {
  constructor(game, $el) {
    this.game = game; 
    this.$el = $el; 
    this.setupBoard();
    this.bindEvents();
  }
  
  bindEvents() {
    this.$el.on("click", "li", (event => {
      let currentTarget = $(event.currentTarget);
      console.log(currentTarget);
      this.makeMove(currentTarget);
    }))
  }

  makeMove($square) {
    let pos = $square.data("pos");
    let mark = this.game.currentPlayer;
    this.game.playMove(pos);
    $square.append(`<div>${mark}</div>`);
    if (this.game.isOver()) {
      let winner = this.game.winner();
      if (winner) {
        alert(`${winner} won the game!`);
      } else {
        alert("Game ended in a tie.");
      }
    }
  }

  setupBoard() {
    const $ul = $("<ul>");
    
    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
      for (let colIdx = 0; colIdx < 3; colIdx++) {
        let $li = $("<li>");
        $li.data("pos", [rowIdx, colIdx]);
        $ul.append($li);
      }
    }
    this.$el.append($ul)
  }
}

module.exports = View;
