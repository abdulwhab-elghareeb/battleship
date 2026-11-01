import { Computer } from "./classes/Computer.js";
import { Human } from "./classes/Human.js";
import { renderPlayersBoard } from "./components/board.js";

const player1 = new Human();
player1.gameboard.placeShips();

const player2 = new Computer();
player2.gameboard.placeShips();

renderPlayersBoard(player1, player2);
