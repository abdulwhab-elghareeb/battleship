import { Player } from "./classes/Player.js";
import { renderPlayersBoard } from "./components/board.js";

function playGame() {
  const player1 = new Player("Player");
  const player2 = new Player("CPU");
  player1.gameboard.placeShips();
  player2.gameboard.placeShips();

  renderPlayersBoard(player1.gameboard.board, player2.gameboard.board);
}

playGame();
