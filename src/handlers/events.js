import { renderPlayersBoard } from "../components/board.js";

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
}
