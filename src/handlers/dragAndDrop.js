import { renderBoard } from "../components/board.js";

export function applyDragAndDrop(player, playerNumber) {
  let row = 0;
  let col = 0;

  const playerBoard = document.querySelector(`.player${playerNumber} .board`);
  const draggableElements = [
    ...document.querySelectorAll(".drag-container .drag-ships"),
  ];

  draggableElements.forEach((dragElem) => {
    dragElem.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData(
        "text/javascript",
        JSON.stringify([e.target.dataset.size, e.target.dataset.id]),
      );
    });
  });

  playerBoard.addEventListener("dragover", (e) => {
    e.preventDefault();
    row = +e.target.dataset.row;
    col = +e.target.dataset.col - 1;
  });

  playerBoard.addEventListener("drop", (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/javascript"));
    const size = +data[0];
    const id = data[1];
    const gameboard = player.gameboard;

    if (
      gameboard.isValidPlacement(size, [row, col]) &&
      gameboard.shipCount < 5
    ) {
      gameboard.placeShip(size, [row, col]);
      renderBoard(playerNumber, player);

      document.querySelector(`[data-id="${id}"]`).remove();
    }
  });
}
