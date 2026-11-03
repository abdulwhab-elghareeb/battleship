import { renderBoard, renderPlayersBoard } from "../components/board.js";
import { renderRestartBtn } from "../components/restartBtn.js";
import { Human } from "../classes/Human.js";
import { Computer } from "../classes/Computer.js";
import { renderRandomizeBtn } from "../components/randomizeBtn.js";
import { renderStartBtn } from "../components/startBtn.js";
import { renderDragContainer } from "../components/dragContainer.js";
import { gameState } from "../gameState.js";
import { hidePassDevice, showPassDevice } from "../components/passDevice.js";

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

  attackedPlayerNumber === 2
    ? renderPlayersBoard(attackingPlayer, toBeAttacked)
    : renderPlayersBoard(toBeAttacked, attackingPlayer);
}

function checkWinCondition(player1, player2) {
  if (player1.gameboard.areAllShipsSunk()) {
    document.querySelector(".result").textContent = "Player 2 wins";
  } else if (player2.gameboard.areAllShipsSunk()) {
    document.querySelector(".result").textContent = "Player 1 wins";
  } else {
    return;
  }

  [...document.querySelectorAll(".player .board")].forEach((board) => {
    board.classList.add("disabled");
  });
  renderRestartBtn(player1);
}

export function onRestartClick(e) {
  [...document.querySelectorAll(".player .board")].forEach((board) => {
    board.classList.remove("disabled");
  });
  document.querySelector(".result").textContent = "";

  const player1 = new Human();
  const computer = new Computer();
  computer.gameboard.randomizeShips();

  renderDragContainer(1);
  renderPlayersBoard(player1, computer);
  renderRandomizeBtn(1, player1);
  renderStartBtn(player1);

  e.target.remove();
}

export function onStartClick(e, player, computer) {
  if (gameState.phase !== "NOT_STARTED") return;

  const randomizeBtn = document.querySelector(".randomize");

  if (player.gameboard.shipCount === 0) {
    randomizeBtn.click();
  } else if (player.gameboard.shipCount < 5) {
    return;
  }

  if (gameState.mode === "Multi" && gameState.turn === "P1") {
    gameState.swapTurns();
    showPassDevice();
  } else {
    gameState.nextPhase();
  }

  randomizeBtn.remove();
  document.querySelector(".drag-container").remove();
  document.querySelector(".result").textContent = "";

  if (gameState.phase === "STARTED") {
    e.target.remove();
    renderPlayersBoard(player, computer);
  }
}

export function onRandomizeClick(number, player) {
  player.gameboard.randomizeShips();
  renderBoard(number, player);
}

export function onContinueClick() {
  hidePassDevice();
  renderDragContainer(2);
  renderPlayersBoard(gameState.player1, gameState.player2);
  renderRandomizeBtn(2, gameState.player2);
}
