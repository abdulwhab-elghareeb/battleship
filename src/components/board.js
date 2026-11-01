import { onAttack } from "../handlers/events.js";
import { createDOMElement } from "../helpers/domHelpers.js";

function renderBoard(playerNumber, player) {
  document.querySelector(`.player${playerNumber} .board`)?.remove();

  const board = player.gameboard.board;
  const missedHits = player.gameboard.missedHits;

  const gridContainer = createDOMElement({
    elemType: "div",
    className: "board",
    parent: document.querySelector(`.player${playerNumber}`),
    event: { type: "click", callback: (e) => onAttack(e, player) },
  });

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const grid = createDOMElement({ elemType: "div", parent: gridContainer });
      grid.dataset.row = row;
      grid.dataset.col = col;

      if (board[row][col]) grid.classList.add("ship");
      if (missedHits.has([row, col].toString())) grid.classList.add("missed");
    }
  }
}

export function renderPlayersBoard(player1, player2) {
  if (player1) renderBoard(1, player1);
  if (player2) renderBoard(2, player2);
}
