import { renderPlayersBoard } from "../components/board.js";
import { gameState } from "../gameState.js";

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
    col = +e.target.dataset.col;
  }
  playerBoard.addEventListener("dragover", dragOverHandler);

  function dropHandler(e) {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/javascript"));
    const size = +data[0];
    const id = data[1];
    const gameboard = player.gameboard;
    console.log(
      [row, col],
      gameboard.isValidPlacement(size, [row, col], gameState.isVertical),
    );

    if (
      gameboard.isValidPlacement(size, [row, col], gameState.isVertical) &&
      gameboard.shipCount < 5
    ) {
      gameboard.placeShip(size, [row, col], gameState.isVertical);
      renderPlayersBoard(`p${playerNumber}`);

      document.querySelector(`[data-id="${id}"]`).remove();
    }
  }

  playerBoard.addEventListener("drop", dropHandler);
}
