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
import { gameState } from "../classes/GameState.js";

export function loadShipPlacingContent(playerNumber) {
  renderDragContainer(playerNumber);
  renderDirectionToggle(playerNumber);
  renderPlayersBoard("both");
  renderRandomizeShipsBtn(playerNumber);
  renderResetShipsBtn(playerNumber);
  renderStartBtn(playerNumber);
}

export function loadSingleMode() {
  gameState.setMode("single");
  renderMainMarkup();

  const player = new Human();
  const computer = new Computer();
  computer.gameboard.randomizeShips();

  gameState.setPlayer1(player);
  gameState.setPlayer2(computer);

  loadShipPlacingContent(1);
}

export function loadMultiMode() {
  gameState.setMode("multi");
  renderMainMarkup();

  const player1 = new Human();
  const player2 = new Human();

  gameState.setPlayer1(player1);
  gameState.setPlayer2(player2);

  loadShipPlacingContent(1);
}
