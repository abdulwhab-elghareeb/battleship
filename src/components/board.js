import { createDOMElement } from "../helpers/domHelpers.js";

function renderBoard(playerNumber, board) {
  const gridContainer = createDOMElement({
    elemType: "div",
    className: "board",
    parent: document.querySelector(`.player${playerNumber}`),
  });

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const grid = createDOMElement({ elemType: "div", parent: gridContainer });
      if (board[y][x]) grid.classList.add("ship");
    }
  }
}

export function renderPlayersBoard(player1Board, player2Board) {
  if (player1Board) renderBoard(1, player1Board);
  if (player2Board) renderBoard(2, player2Board);
}
