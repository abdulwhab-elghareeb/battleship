import { Computer } from "./classes/Computer.js";
import { Human } from "./classes/Human.js";
import { renderPlayersBoard } from "./components/board.js";
import { renderRandomizeBtn } from "./components/randomizeBtn.js";
import { renderStartBtn } from "./components/startBtn.js";

const player1 = new Human();
const computer = new Computer();
computer.gameboard.randomizeShips();

renderPlayersBoard(player1, computer);
renderRandomizeBtn(player1);
renderStartBtn(player1);
