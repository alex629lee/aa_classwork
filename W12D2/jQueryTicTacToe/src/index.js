const View = require("./ttt-view");
const Game = require("../../tttNodeSolutions/game.js");

  $(() => {

    const $container = $(".ttt");
    const game = new Game(); 
    new View(game, $container);

  });
