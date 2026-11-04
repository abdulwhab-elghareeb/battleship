import { renderPlayersBoard } from "../components/board.js";
import { renderDragContainer } from "../components/drag.js";
import { gameState } from "../gameState.js";

export function applyDragAndDrop(playerNumber) {
  let row = 0;
  let col = 0;

  const player = playerNumber === 1 ? gameState.player1 : gameState.player2;
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
    const oldShipCount = gameboard.shipCount;

    gameboard.placeShip(size, [row, col], gameState.isVertical);
    if (gameboard.shipCount > oldShipCount) {
      renderPlayersBoard(playerNumber);
      document.querySelector(`[data-id="${id}"]`).remove();
    }
  }
  playerBoard.addEventListener("drop", dropHandler);
}

export function onRandomizeClick(number) {
  const player = number === 1 ? gameState.player1 : gameState.player2;
  player.gameboard.randomizeShips();
  loadDrag(number);
}

export function onResetShipsClick(playerNumber) {
  const player = playerNumber === 1 ? gameState.player1 : gameState.player2;
  player.gameboard.createNewBoard();
  loadDrag(playerNumber);
}

export function onDirectionClick(e, playerNumber) {
  gameState.isVertical = gameState.isVertical === true ? false : true;
  e.target.textContent =
    e.target.textContent === "Horizontal" ? "Vertical" : "Horizontal";
  loadDrag(playerNumber);
}

function loadDrag(playerNumber) {
  renderDragContainer(playerNumber);
  renderPlayersBoard(playerNumber);
}
