import { renderPlayersBoard } from "../components/board.js";
import { renderRestartBtn } from "../components/restartBtn.js";
import { gameState } from "../classes/GameState.js";

export function receiveAttack(e, toBeAttackedNumber) {
  if (e.target.parentNode.className !== "board") return;

  const toBeAttacked =
    toBeAttackedNumber === 1 ? gameState.player1 : gameState.player2;

  const attackingPlayer =
    toBeAttackedNumber === 1 ? gameState.player2 : gameState.player1;

  const target = e.target;
  const cord = [+target.dataset.row, +target.dataset.col];

  if (!toBeAttacked.gameboard.isValidAttack(cord)) return;

  attackingPlayer.attackPlace(cord, toBeAttacked);
  checkWinCondition(attackingPlayer, toBeAttacked);

  if (toBeAttacked.type === "computer") {
    toBeAttacked.attackRandomPlace(attackingPlayer);
    checkWinCondition(attackingPlayer, toBeAttacked);
    renderPlayersBoard("both");
  }

  if (toBeAttackedNumber === 2) {
    gameState.setPlayer1AsAttacked();
    renderPlayersBoard(2);
  } else {
    gameState.setPlayer2AsAttacked();
    renderPlayersBoard(1);
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

  gameState.toNextPhase();
  renderRestartBtn(player1);
  document.querySelector(".next")?.remove();
}
