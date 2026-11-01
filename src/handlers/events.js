import { renderPlayersBoard } from "../components/board.js";

export function onAttack(e, player) {
  if (e.target.parentNode.className !== "board") return;

  const target = e.target;
  const playerNumber = target.closest(".player").className.includes("1")
    ? 1
    : 2;

  player.gameboard.receiveAttack([target.dataset.row, target.dataset.col]);

  playerNumber === 1
    ? renderPlayersBoard(player)
    : renderPlayersBoard(null, player);

  document
    .querySelector(".player2")
    .classList.toggle("disabled", playerNumber === 2);
  document
    .querySelector(".player1")
    .classList.toggle("disabled", playerNumber === 1);
}
