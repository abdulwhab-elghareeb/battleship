import { Computer } from "../classes/Computer.js";
import { Human } from "../classes/Human.js";
import { renderPlayersBoard } from "../components/board.js";
import { renderDragContainer } from "../components/dragContainer.js";
import { renderMainMarkup } from "../components/mainMarkup.js";
import { renderRandomizeBtn } from "../components/randomizeBtn.js";
import { renderRestartBtn } from "../components/restartBtn.js";

export function loadRegularMode() {
  renderMainMarkup();

  const player1 = new Human();
  const computer = new Computer();
  computer.gameboard.randomizeShips();

  renderDragContainer();
  renderPlayersBoard(player1, computer);
  renderRandomizeBtn(player1);
  renderRestartBtn(player1);
}
