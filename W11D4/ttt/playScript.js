let Game = require('./game.js');
let HumanPlayer = require('./humanPlayer.js');
let ComputerPlayer = require('./computerPlayer.js');
const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let player1 = new HumanPlayer("Kevin", "x");
let player2 = new HumanPlayer("Alex", "o");
let g = new Game(player1, player2);
g.run(reader, completion);

function completion() {
  reader.question("Play again? y or n: ", restartGame => {
    if (restartGame === "y") {
      g = new Game();
      g.run(reader, completion);
    } else {
      reader.close();
    }
  });
};
