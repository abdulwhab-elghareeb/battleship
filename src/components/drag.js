import { gameState } from "../gameState.js";
import { onDirectionClick } from "../handlers/events.js";
import { createDOMElement } from "../helpers/domHelpers.js";

export function renderDragContainer(playerNumber) {
  document.querySelector(`.player${playerNumber} .drag-container`)?.remove();

  const playerGameboard =
    playerNumber === 1
      ? gameState.player1.gameboard
      : gameState.player2.gameboard;

  const container = createDOMElement({
    elemType: "div",
    className: "drag-container",
    parent: document.querySelector(`.player${playerNumber}`),
  });

  const remainingSizes = [5, 4, 3, 3, 2].filter(
    (size) => !playerGameboard.currentShipSizes.includes(size),
  );
  const numbersToWords = {
    2: "two",
    3: "three",
    4: "four",
    5: "five",
  };

  for (let i = 1; i <= 5 - playerGameboard.shipCount; i++) {
    const size = remainingSizes.shift();
    const grid = createDOMElement({
      elemType: "div",
      className: `drag-ships ${numbersToWords[size]}`,
      data: { size: size, id: i },
      draggable: true,
      parent: container,
    });
    if (gameState.isVertical) {
      grid.style.height = `${size * 57}px`;
      grid.style.width = "57px";
    } else {
      grid.style.width = `${size * 57}px`;
      grid.style.height = "57px";
    }
  }
}

export function renderDirectionToggle(playerNumber) {
  createDOMElement({
    elemType: "button",
    className: "direction",
    textContent: "Horizontal",
    event: {
      type: "click",
      callback: (e) => onDirectionClick(e, playerNumber),
    },
    parent: document.querySelector(`.player${playerNumber}`),
  });
}
