import { onAttack } from "../handlers/events.js";
import { createDOMElement } from "../helpers/domHelpers.js";

function renderBoard(playerNumber, player, against) {
  document.querySelector(`.player${playerNumber} .board`)?.remove();

  const board = player.gameboard.board;
  const missedHits = player.gameboard.missedHits;
  const directHits = player.gameboard.directHits;

  const gridContainer = createDOMElement({
    elemType: "div",
    className: "board",
  });
  document.querySelector(`.player${playerNumber} h1`).after(gridContainer);

  if (player.type === "CPU") {
    gridContainer.addEventListener("click", (e) =>
      onAttack(e, against, player),
    );
  }

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const grid = createDOMElement({ elemType: "div", parent: gridContainer });
      grid.dataset.row = row;
      grid.dataset.col = col;

      if (board[row][col] && player.type === "Real") grid.classList.add("ship");
      if (missedHits.has([row, col].toString())) grid.classList.add("missed");
      if (directHits.has([row, col].toString())) grid.classList.add("hit");
      if (board[row][col] && board[row][col].isSunk())
        grid.classList.add("sunk");
    }
  }
}

export function renderPlayersBoard(player1, player2) {
  if (player1) renderBoard(1, player1, player2);
  if (player2) renderBoard(2, player2, player1);
}
