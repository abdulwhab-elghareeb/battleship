import { renderPlayersBoard } from "../components/board.js";

export function applyDragAndDrop(player1) {
  let row = 0;
  let col = 0;

  const player1Board = document.querySelector(".player1 .board");
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

  player1Board.addEventListener("dragover", (e) => {
    e.preventDefault();
    row = +e.target.dataset.row;
    col = +e.target.dataset.col - 1;
  });

  player1Board.addEventListener("drop", (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/javascript"));
    const size = +data[0];
    const id = data[1];
    const gameboard = player1.gameboard;

    if (
      gameboard.isValidPlacement(size, [row, col]) &&
      gameboard.shipCount < 5
    ) {
      gameboard.placeShip(size, [row, col]);
      renderPlayersBoard(player1);

      document.querySelector(`[data-id="${id}"]`).remove();
    }
  });
}
