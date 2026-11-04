import { Computer } from "../classes/Computer.js";
import { Human } from "../classes/Human.js";
import { renderPlayersBoard } from "../components/board.js";
import {
  renderDirectionToggle,
  renderDragContainer,
} from "../components/drag.js";
import { renderMainMarkup } from "../components/mainMarkup.js";
import {
  renderRandomizeShipsBtn,
  renderResetShipsBtn,
} from "../components/randomizeShips.js";
import { renderStartBtn } from "../components/startBtn.js";
import { gameState } from "../gameState.js";

export function loadSingleMode() {
  gameState.setMode("Single");
  renderMainMarkup();

  const player = new Human();
  const computer = new Computer();
  computer.gameboard.randomizeShips();
  gameState.setPlayer(1, player);
  gameState.setPlayer(2, computer);

  renderDragContainer(1);
  renderDirectionToggle(1);

  renderPlayersBoard("both");
  renderRandomizeShipsBtn(1, player);
  renderResetShipsBtn(1);
  renderStartBtn(player, computer);
}

export function loadMultiMode() {
  gameState.setMode("Multi");
  renderMainMarkup();

  const player1 = new Human();
  const player2 = new Human();

  gameState.setPlayer(1, player1);
  gameState.setPlayer(2, player2);

  renderDragContainer(1);
  renderDirectionToggle(1);
  renderPlayersBoard("both");
  renderRandomizeShipsBtn(1, player1);
  renderResetShipsBtn(1);
  renderStartBtn(player1, player2);
}
