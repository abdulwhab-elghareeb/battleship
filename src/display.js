import { Player } from "./classes/Player.js";
import { createBoard } from "./components/board.js";

function playGame() {
  const player1 = new Player("Player");
  const player2 = new Player("CPU");

  createBoard(1);
  createBoard(2);
}

playGame();
