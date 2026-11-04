import { renderPlayersBoard } from "../components/board.js";
import { renderRestartBtn } from "../components/restartBtn.js";
import {
  renderRandomizeShipsBtn,
  renderResetShipsBtn,
} from "../components/randomizeShips.js";
import { renderStartBtn } from "../components/startBtn.js";
import {
  renderDirectionToggle,
  renderDragContainer,
} from "../components/drag.js";
import { gameState } from "../gameState.js";
import { hidePassDevice, showPassDevice } from "../components/passDevice.js";
import { renderNextBtn } from "../components/nextBtn.js";
import { renderModeSelection } from "../components/modeSelection.js";
import { updateVisualTurn } from "../components/mainMarkup.js";
import { loadShipPlacingContent } from "./modeHandlers.js";

export function onStartClick(e, player) {
  if (gameState.phase !== "NOT_STARTED" || player.gameboard.shipCount < 5) {
    return;
  }

  switch (gameState.mode) {
    case "Multi":
      if (gameState.playerTurn !== 1) {
        gameState.nextPhase();
        renderNextBtn();
        e.target.remove();
      }

      showPassDevice();
      gameState.swapTurns();
      break;

    case "Single":
      gameState.nextPhase();
      e.target.remove();
      renderPlayersBoard("both");
  }

  document.querySelector(".randomize").remove();
  document.querySelector(".reset-ships").remove();
  document.querySelector(".drag-container").remove();
  document.querySelector(".direction").remove();
  document.querySelector(".result").textContent = "";
}
export function onContinueClick() {
  hidePassDevice();
  if (gameState.phase === "NOT_STARTED") {
    loadShipPlacingContent(2);
  }

  renderPlayersBoard("both");
  updateVisualTurn();
}

export function onNextClick() {
  const playerAttacked = gameState[`player${gameState.playerTurn}Attacked`];
  if (playerAttacked) {
    gameState.swapTurns();
    showPassDevice();
  }
}

export function onRestartClick() {
  gameState.reset();
  renderModeSelection();
}
