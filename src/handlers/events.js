import { renderPlayersBoard } from "../components/board.js";
import { renderRestartBtn } from "../components/restartBtn.js";

import { Human } from "../classes/Human.js";
import { Computer } from "../classes/Computer.js";
import { renderRandomizeBtn } from "../components/randomizeBtn.js";
import { renderStartBtn } from "../components/startBtn.js";

export function onAttack(e, attackingPlayer, toBeAttacked) {
  if (e.target.parentNode.className !== "board") return;

  const target = e.target;
  const cord = [target.dataset.row, target.dataset.col];
  const attackedPlayerNumber = target.closest(".player").className.includes("1")
    ? 1
    : 2;

  if (!toBeAttacked.gameboard.isValidAttack(cord)) return;
  attackingPlayer.attackPlace(cord, toBeAttacked);

  if (toBeAttacked.type === "CPU") {
    toBeAttacked.attackRandomPlace(attackingPlayer);
  }

  attackedPlayerNumber === 2
    ? renderPlayersBoard(attackingPlayer, toBeAttacked)
    : renderPlayersBoard(toBeAttacked, attackingPlayer);

  checkWinCondition(attackingPlayer, toBeAttacked);
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

  renderPlayersBoard(player1, computer);
  renderRandomizeBtn(player1);
  renderStartBtn(computer, player1);

  e.target.remove();
}

export function onStartClick(e, player) {
  const randomizeBtn = document.querySelector(".randomize");
  if (player.gameboard.shipCount === 0) randomizeBtn.click();

  randomizeBtn.remove();
  document.querySelector(".result").textContent = "";
  e.target.remove();
}

export function onRandomizeClick(player1) {
  player1.gameboard.randomizeShips();
  renderPlayersBoard(player1);
}
