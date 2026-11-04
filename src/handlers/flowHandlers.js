import { renderPlayersBoard } from "../components/board.js";
import { createNewState, gameState } from "../classes/GameState.js";
import { hidePassDevice, showPassDevice } from "../components/passDevice.js";
import { renderNextBtn } from "../components/nextBtn.js";
import { renderModeSelection } from "../components/modeSelection.js";
import { updateVisualTurn } from "../components/mainMarkup.js";
import { loadShipPlacingContent } from "./modeHandlers.js";

export function startGame(e, player) {
  if (gameState.phase !== "notStarted" || player.gameboard.shipCount < 5) {
    return;
  }

  switch (gameState.mode) {
    case "multi":
      if (gameState.currentTurn !== 1) {
        gameState.toNextPhase();
        renderNextBtn();
        e.target.remove();
      }

      showPassDevice();
      gameState.swapTurns();
      break;

    case "single":
      gameState.toNextPhase();
      e.target.remove();
      renderPlayersBoard("both");
  }

  document.querySelector(".randomize").remove();
  document.querySelector(".reset-ships").remove();
  document.querySelector(".drag-container").remove();
  document.querySelector(".direction").remove();
  document.querySelector(".result").textContent = "";
}
export function hidePassDeviceScreen() {
  hidePassDevice();
  if (gameState.phase === "notStarted") {
    loadShipPlacingContent(2);
  }

  renderPlayersBoard("both");
  updateVisualTurn();
}

export function startNextTurn() {
  const playerAttacked = gameState[`didPlayer${gameState.currentTurn}Attack`];
  if (playerAttacked) {
    gameState.swapTurns();
    showPassDevice();
  }
}

export function restartGame() {
  createNewState();
  renderModeSelection();
}
