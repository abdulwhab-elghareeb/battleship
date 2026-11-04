import { renderPlayersBoard } from "../components/board.js";
import { renderDragContainer } from "../components/drag.js";
import { gameState } from "../classes/GameState.js";

export let isVertical = false;

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
      e.dataTransfer.setData("text/plain", e.target.dataset.size);
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

    const size = +e.dataTransfer.getData("text/plain");
    const gameboard = player.gameboard;
    const oldShipCount = gameboard.shipCount;

    gameboard.placeShip(size, [row, col], isVertical);
    if (gameboard.shipCount > oldShipCount) {
      loadDrag(playerNumber);
    }
  }
  playerBoard.addEventListener("drop", dropHandler);
}

export function randomizeBoardShips(number) {
  const player = number === 1 ? gameState.player1 : gameState.player2;
  player.gameboard.randomizeShips();
  loadDrag(number);
}

export function resetShips(playerNumber) {
  const player = playerNumber === 1 ? gameState.player1 : gameState.player2;
  player.gameboard.createNewBoard();
  loadDrag(playerNumber);
}

export function changeShipsDirection(e, playerNumber) {
  isVertical = isVertical === false ? true : false;
  e.target.textContent =
    e.target.textContent === "Horizontal" ? "Vertical" : "Horizontal";
  loadDrag(playerNumber);
}

function loadDrag(playerNumber) {
  renderDragContainer(playerNumber);
  renderPlayersBoard(playerNumber);
}
