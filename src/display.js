import { Player } from "./classes/Player.js";
import { renderPlayersBoard } from "./components/board.js";

const player1 = new Player("Player");
player1.gameboard.placeShips();

const player2 = new Player("CPU");
player2.gameboard.placeShips();

renderPlayersBoard(player1, player2);
