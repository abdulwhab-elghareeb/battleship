import { renderPlayersBoard } from "../components/board.js";

export function applyDragAndDrop(player, playerNumber) {
  let row = 0;
  let col = 0;

  const playerBoard = document.querySelector(`.player${playerNumber} .board`);
  const draggableElements = [
    ...document.querySelectorAll(
      `.player${playerNumber} .drag-container .drag-ships`,
    ),
  ];

  draggableElements.forEach((dragElem) => {
    dragElem.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData(
        "text/javascript",
        JSON.stringify([e.target.dataset.size, e.target.dataset.id]),
      );
    });
  });

  function dragOverHandler(e) {
    e.preventDefault();
    row = +e.target.dataset.row;
    col = +e.target.dataset.col - 1;
  }
  playerBoard.addEventListener("dragover", dragOverHandler);

  function dropHandler(e) {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/javascript"));
    const size = +data[0];
    const id = data[1];
    const gameboard = player.gameboard;

    if (
      gameboard.isValidPlacement(size, [row, col]) &&
      gameboard.shipCount < 5
    ) {
      console.log(size, [row, col])
      gameboard.placeShip(size, [row, col]);
      console.log(player)
      renderPlayersBoard(`p${playerNumber}`);

      document.querySelector(`[data-id="${id}"]`).remove();
    }
  }

  playerBoard.addEventListener("drop", dropHandler);
}
