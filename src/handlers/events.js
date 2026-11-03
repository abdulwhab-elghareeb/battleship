import { renderBoard, renderPlayersBoard } from "../components/board.js";
import { renderRestartBtn } from "../components/restartBtn.js";
import { renderRandomizeBtn } from "../components/randomizeBtn.js";
import { renderStartBtn } from "../components/startBtn.js";
import { renderDragContainer } from "../components/dragContainer.js";
import { gameState } from "../gameState.js";
import { hidePassDevice, showPassDevice } from "../components/passDevice.js";
import { renderNextBtn } from "../components/nextBtn.js";
import { renderModeSelection } from "../components/modeSelection.js";
import { updateVisualTurn } from "../components/mainMarkup.js";

export function onAttack(e, attackingPlayer, toBeAttacked) {
  if (e.target.parentNode.className !== "board") return;

  const target = e.target;
  const cord = [target.dataset.row, target.dataset.col];
  const attackedPlayerNumber = target.closest(".player").className.includes("1")
    ? 1
    : 2;

  if (!toBeAttacked.gameboard.isValidAttack(cord)) return;

  attackingPlayer.attackPlace(cord, toBeAttacked);
  checkWinCondition(attackingPlayer, toBeAttacked);

  if (toBeAttacked.type === "CPU") {
    toBeAttacked.attackRandomPlace(attackingPlayer);
    checkWinCondition(attackingPlayer, toBeAttacked);
  }

  if (attackedPlayerNumber === 2) {
    gameState.player1Attacked = true;
    gameState.player2Attacked = false;
    renderPlayersBoard("p2");
  } else {
    gameState.player2Attacked = true;
    gameState.player1Attacked = false;
    renderPlayersBoard("p1");
  }
}

function checkWinCondition(player1, player2) {
  if (player1.gameboard.areAllShipsSunk()) {
    document.querySelector(".result").textContent = "Player 2 wins";
  } else if (player2.gameboard.areAllShipsSunk()) {
    document.querySelector(".result").textContent = "Player 1 wins";
  } else {
    return;
  }

  renderRestartBtn(player1);
}

export function onRestartClick() {
  gameState.reset();
  renderModeSelection();
}

export function onStartClick(e, player) {
  if (gameState.phase !== "NOT_STARTED" || player.gameboard.shipCount < 5) {
    return;
  }

  const randomizeBtn = document.querySelector(".randomize");

  if (gameState.mode === "Multi" && gameState.turn === "P1") {
    showPassDevice();
  } else {
    gameState.nextPhase();
    renderNextBtn();
  }

  gameState.swapTurns();

  randomizeBtn.remove();
  document.querySelector(".drag-container").remove();
  document.querySelector(".result").textContent = "";

  if (gameState.phase === "STARTED") {
    e.target.remove();
    showPassDevice();
  }
}

export function onRandomizeClick(number, player) {
  player.gameboard.randomizeShips();
  renderBoard(number, player);
}

export function onContinueClick() {
  hidePassDevice();
  if (gameState.phase === "NOT_STARTED") {
    renderDragContainer(2);
    renderRandomizeBtn(2, gameState.player2);
    renderStartBtn(gameState.player2);
  }

  renderPlayersBoard("both");
  updateVisualTurn();
}

export function onNextClick() {
  const currPlayer = gameState[`player${gameState.turn.at(-1)}Attacked`];
  if (currPlayer) {
    gameState.swapTurns();
    showPassDevice();
  }
}
